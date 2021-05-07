# React useRef evalute the initialValue everytime

[![](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/cncolder/demo/master/shields/codesandbox.json)](https://githubbox.com/cncolder/demo/tree/master/react/useref-evalute-initial-value-everytime)

There is a pitfall with the `useRef` hook. The `initialValue` will persist for the full lifetime of the component. However, it will always be evaluated. This is not a bug for React, it's a feature for JS.

The same problem exists with `useState`. But this can be avoided by [Lazy initial state](https://reactjs.org/docs/hooks-reference.html#lazy-initial-state). Pass a initial function to the `useState`.

> `useRef` returns a mutable ref object whose `.current` property is initialized to the passed argument (`initialValue`). The returned object will persist for the full lifetime of the component.

## Links

https://reactjs.org/docs/hooks-reference.html#useref

https://reactjs.org/docs/hooks-reference.html#usestate
