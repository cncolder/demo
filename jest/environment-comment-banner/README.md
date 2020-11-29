# Jest environment comment banner

`@jest-environment` must be place in JSDoc

```js
/** @jest-environment node */
```

The normal comment is invalid

```js
/* @jest-environment node */
// @jest-environment node
```
