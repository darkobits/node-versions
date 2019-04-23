import axios from 'axios';
import semver from 'semver';


/**
 * Shape of the JSON object returned by the Node API.
 */
interface NodeApiReleaseDescriptor {
  /**
   * Release date.
   */
  date: string;

  /**
   * Semver version for the Node release.
   */
  version: string;

  /**
   * Version of NPM included.
   */
  npm: string;

  /**
   * Version of V8 included.
   */
  v8: string;

  /**
   * Version of libuv included.
   */
  uv: string;

  /**
   * Version of zlib included.
   */
  zlib: string;

  /**
   * Version of OpenSSL included.
   */
  openssl: string;

  /**
   * Whether the release is currently in Long Term Support. `false` if not,
   * Node release code-name if so.
   */
  lts: boolean | string;
}


/**
 * Object returned by `parseVersion`.
 */
export interface VersionDescriptor {
  full: string;
  major?: number;
  minor?: number;
  patch?: number;
}


/**
 * Shape of a release descriptor returned by this module.
 */
export interface NodeReleaseDescriptor {
  date: string;
  version: VersionDescriptor;
  npm: VersionDescriptor;
  v8: VersionDescriptor;
  uv: VersionDescriptor;
  zlib: VersionDescriptor;
  openssl: VersionDescriptor;
}


/**
 * Array sorting predicate that sorts Node release descriptors by version.
 */
function releaseComparator(a: string, b: string) {
  return a === b ? 0 : (semver.gt(a, b) ? 1 : -1);
}


/**
 * Parses the provided semver string.
 */
function parseVersion(versionStr: string): VersionDescriptor {
  const semverObj = semver.parse(versionStr);

  if (!semverObj) {
    return {full: versionStr};
  }

  const {major, minor, patch, version} = semverObj;
  return {full: version, major, minor, patch};
}


/**
 * Provided a NodeApiReleaseDescriptor, returns an object with fields of interest
 * and all version strings parsed using semver.parse.
 */
function parseRelease(release: NodeApiReleaseDescriptor) {
  const {date, version, npm, v8, uv, zlib, openssl} = release;

  return {
    date,
    version: parseVersion(version),
    npm: parseVersion(npm),
    v8: parseVersion(v8),
    uv: parseVersion(uv),
    zlib: parseVersion(zlib),
    openssl: parseVersion(openssl)
  };
}


export default async function getCurrentNodeVersions(): Promise<{lts: NodeReleaseDescriptor; latest: NodeReleaseDescriptor}> {
  try {
    const releases: Array<NodeApiReleaseDescriptor> = (await axios.get('https://nodejs.org/dist/index.json')).data;

    const releasesSorted = releases.sort((a, b) => releaseComparator(a.version, b.version)).reverse();

    const ltsRelease = releasesSorted.find(release => release.lts !== false);

    if (!ltsRelease) {
      throw new Error('Could not determine LTS release.');
    }

    const latestRelease = releasesSorted.find(release => release.lts === false);

    if (!latestRelease) {
      throw new Error('Could not determine latest release.');
    }

    return {
      lts: parseRelease(ltsRelease),
      latest: parseRelease(latestRelease)
    };
  } catch (err) {
    throw new Error(`Unable to fetch Node releases: ${err.message}`);
  }
}
