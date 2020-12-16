<a href="#top" id="top">
  <img src="https://user-images.githubusercontent.com/441546/102315714-7ab7b180-3f29-11eb-9329-775c09c79361.png" style="max-width: 100%;">
</a>
<p align="center">
  <a href="https://www.npmjs.com/package/@darkobits/node-versions"><img src="https://img.shields.io/npm/v/@darkobits/node-versions.svg?style=flat-square"></a>
  <a href="https://travis-ci.com/darkobits/node-versions"><img src="https://img.shields.io/travis/com/darkobits/node-versions/master?style=flat-square"></a>
  <a href="https://www.codacy.com/app/darkobits/node-versions"><img src="https://img.shields.io/codacy/coverage/18f563b4662a4ffbb5e452676cb0163d.svg?style=flat-square"></a>
  <a href="https://david-dm.org/darkobits/node-versions"><img src="https://img.shields.io/david/darkobits/node-versions.svg?style=flat-square"></a>
  <a href="https://github.com/conventional-changelog/standard-version"><img src="https://img.shields.io/badge/conventional%20commits-1.0.0-027dc6.svg?style=flat-square"></a>
</p>

## Install

This package is available as a CLI and as a Node API. If only using the Node API, you should install it locally in your project:

```
npm i @darkobits/node-versions
```

If using the CLI, it may be preferable to install it globally:

```
npm i -g @darkobits/node-versions
```

## Use

### Node API

This package exports an [async function](https://ponyfoo.com/articles/understanding-javascript-async-await) that returns a JSON object with 2 keys, `latest` and `lts`, each with the following sub-keys:

```ts
interface VersionDescriptor {
  /**
   * Full semver version. (ex: '10.14.1')
   */
  full: string;

  /**
   * Major version number. (ex: 10)
   */
  major?: number;

  /**
   * Minor version number. (ex: 14)
   */
  minor?: number;

  /**
   * Patch version number. (ex: 1)
   */
  patch?: number;
}

interface NodeReleaseDescriptor {
  /**
   * Release date.
   */
  date: string;

  /**
   * Release version.
   */
  version: VersionDescriptor;

  /**
   * NPM version included in the release.
   */
  npm: VersionDescriptor;

  /**
   * V8 version included in the release.
   */
  v8: VersionDescriptor;

  /**
   * libuv version included in the release.
   */
  uv: VersionDescriptor;

  /**
   * zlib version included in the release.
   */
  zlib: VersionDescriptor;

  /**
   * OpenSSL version included in the release.
   */
  openssl: VersionDescriptor;
}
```

### CLI

```
> node-versions
Latest: 11.14.0
LTS:    10.15.3
```

You may also use `-o json` or `--output json` to have `node-versions` output JSON.

<a href="#top">
  <img src="https://user-images.githubusercontent.com/441546/102322726-5e6d4200-3f34-11eb-89f2-c31624ab7488.png" style="max-width: 100%;">
</a>
