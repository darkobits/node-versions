import moxios from 'moxios';
import nodeVersions from './node-versions';


// jest.mock('axios', () => {
//   return {
//     get: jest.fn()
//   };
// });


describe('nodeVersions', () => {
  beforeEach(() => {
    moxios.install();
  });

  const latest = {
    date: new Date().toISOString(),
    version: '4.5.6',
    npm: '4.5.6',
    v8: '4.5.6',
    uv: '4.5.6',
    zlib: '4.5.6',
    openssl: '4.5.6',
    lts: false
  };

  const lts = {
    date: new Date().toISOString(),
    version: '1.2.3',
    npm: '1.2.3',
    v8: '1.2.3',
    uv: '1.2.3',
    zlib: '1.2.3',
    openssl: '1.2.3',
    lts: 'foo'
  };

  describe('when receiving a well-formed response', () => {
    it('should get node versions', async () => {
      moxios.stubRequest('https://nodejs.org/dist/index.json', {
        status: 200,
        response: [latest, lts]
      });

      const results = await nodeVersions();

      expect(results.latest.version.full).toBe('4.5.6');
      expect(results.lts.version.full).toBe('1.2.3');
    });

    describe('when receiving a malformed response', () => {
      it('should throw an error if no LTS releases were found', async () => {
        expect.assertions(1);

        moxios.stubRequest('https://nodejs.org/dist/index.json', {
          status: 200,
          response: [latest]
        });

        try {
          await nodeVersions();
        } catch (err) {
          expect(err.message).toMatch('Could not determine LTS release');
        }
      });

      it('should throw an error if no latest releases were found', async () => {
        expect.assertions(1);

        moxios.stubRequest('https://nodejs.org/dist/index.json', {
          status: 200,
          response: [lts]
        });

        try {
          await nodeVersions();
        } catch (err) {
          expect(err.message).toMatch('Could not determine latest release');
        }
      });
    });
  });

  afterEach(() => {
    moxios.uninstall();
  });
});
