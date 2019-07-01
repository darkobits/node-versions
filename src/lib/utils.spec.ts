import {
  releaseComparator,
  parseRelease
} from './utils';


describe('#releaseComparator', () => {
  it('should sort releases', () => {
    expect(releaseComparator('1.0.0', '2.0.0')).toBe(-1);
    expect(releaseComparator('2.0.0', '1.0.0')).toBe(1);
    expect(releaseComparator('1.0.0', '1.0.0')).toBe(0);
  });
});

describe('#parseRelease', () => {
  it('should parse release objects', () => {
    const release = {
      date: new Date().toISOString(),
      version: '1.2.3',
      npm: '1.2.3',
      v8: '1.2.3',
      uv: '1.2.3',
      zlib: '1.2.3',
      openssl: '1.2.3',
      lts: false
    };

    const versionResult = {
      full: '1.2.3',
      major: 1,
      minor: 2,
      patch: 3
    };

    expect(parseRelease(release)).toMatchObject({
      date: release.date,
      version: versionResult,
      npm: versionResult,
      v8: versionResult,
      uv: versionResult,
      zlib: versionResult,
      openssl: versionResult
    });
  });
});
