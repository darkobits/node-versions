import semver from 'semver';

import {NodeApiReleaseDescriptor, VersionDescriptor} from 'etc/types';


/**
 * Array sorting predicate that sorts Node release descriptors by version.
 */
export function releaseComparator(a: string, b: string) {
  if (a === b) {
    return 0;
  }

  if (semver.gt(a, b)) {
    return 1;
  }

  return -1;
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
 * Provided a NodeApiReleaseDescriptor, returns an object with fields of
 * interest and all version strings parsed using semver.parse.
 */
export function parseRelease(release: NodeApiReleaseDescriptor) {
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
