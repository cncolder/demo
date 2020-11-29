# Jest environment comment banner

[![](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/cncolder/demo/master/shields/codesandbox.json)](https://githubbox.com/cncolder/demo/tree/master/jest/environment-comment-banner)

`@jest-environment` must be place in JSDoc

```js
/** @jest-environment node */
```

The normal comment is invalid

```js
/* @jest-environment node */
// @jest-environment node
```
