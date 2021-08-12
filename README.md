<a href="#top" id="top">
  <img src="https://user-images.githubusercontent.com/441546/102315714-7ab7b180-3f29-11eb-9329-775c09c79361.png" style="max-width: 100%;">
</a>
<p align="center">
  <a href="https://www.npmjs.com/package/@darkobits/node-versions"><img src="https://img.shields.io/npm/v/@darkobits/node-versions.svg?style=flat-square"></a>
  <a href="https://github.com/darkobits/node-versions/actions?query=workflow%3ACI"><img src="https://img.shields.io/github/workflow/status/darkobits/node-versions/CI/master?style=flat-square"></a>
  <a href="https://app.codecov.io/gh/darkobits/node-versions/branch/master"><img src="https://img.shields.io/codecov/c/github/darkobits/node-versions/master?style=flat-square"></a>
  <a href="https://depfu.com/github/darkobits/node-versions"><img src="https://img.shields.io/depfu/darkobits/node-versions?style=flat-square"></a>
  <a href="https://conventionalcommits.org"><img src="https://img.shields.io/static/v1?label=commits&message=conventional&style=flat-square&color=398AFB"></a>
</p>

## Install

This package is available as a CLI and as a Node API. If only using the Node API, you should install it
locally in your project:

```
npm i @darkobits/node-versions
```

If using the CLI, it may be preferable to install it globally:

```
npm i -g @darkobits/node-versions
```

## Use

### Node API

This package exports an [async function](https://ponyfoo.com/articles/understanding-javascript-async-await)
that returns a JSON object with 2 keys, `latest` and `lts`, each with the
following sub-keys:

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

You may also use `-o json` or `--output json` to have `node-versions` output
JSON.

<br />
<a href="#top">
  <img src="https://user-images.githubusercontent.com/441546/102322726-5e6d4200-3f34-11eb-89f2-c31624ab7488.png" style="max-width: 100%;">
</a>
