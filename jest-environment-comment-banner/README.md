# Jest environment comment banner

[![](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/cncolder/demo/main/shields/codesandbox.json)](https://githubbox.com/cncolder/demo/tree/main/jest-environment-comment-banner)

`@jest-environment` must be placed in JSDoc

```js
/** @jest-environment node */

/** @jest-environment jsdom */
```

The normal comment is invalid ❌

```js
/* @jest-environment node */

// @jest-environment node
```

## Links

https://github.com/facebook/jest/pull/10877

https://github.com/facebook/jest/blob/7edfb105f3f377434d30e143a4dbcc86e541b361/packages/jest-docblock/src/index.ts#L15
