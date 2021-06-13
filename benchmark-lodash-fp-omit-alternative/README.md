# Lodash fp omit alternative

Implement lodash omit function by `_.cloneDeep` or `fp.unset`.

## Background

The `lodash/fp/omit` is buggy. When omit with deep nested path with array indexes, the source object get mutated.

```js
const fp = require("lodash/fp")
const obj = {id: 3, d : [ {id: 4}], j:0}
const res = fp.omit(["id","d[0].id"],x)

console.log(obj);
{id: 3, d: [{}], j: 0}

console.log(res);
{d: [{}], j: 0}
```

## Test & Benchmark

[![](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/cncolder/demo/master/shields/codesandbox.json)](https://githubbox.com/cncolder/demo/tree/master/benchmark-lodash-fp-omit-alternative)

## Links

https://github.com/lodash/lodash/issues/3765
