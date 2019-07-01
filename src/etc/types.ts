/**
 * Shape of the JSON object returned by the Node API.
 */
export interface NodeApiReleaseDescriptor {
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
