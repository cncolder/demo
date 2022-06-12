import type { StylisPlugin } from '@emotion/cache';
import createEmotion from '@emotion/css/create-instance';
import { prefixer } from 'stylis';

const log: StylisPlugin = (element, index, children, callback) => {
  console.log('stylis', element, index, children);
};

const important: StylisPlugin = (element) => {
  if (element.type === 'decl') {
    element.children += '!important';
    element.return = element.value = `${element.props}:${element.children};`;
  }
};

export const {
  flush,
  hydrate,
  cx,
  merge,
  getRegisteredStyles,
  injectGlobal,
  keyframes,
  css,
  sheet,
  cache,
} = createEmotion({
  key: 'css',
  stylisPlugins: [prefixer, important, log],
});
