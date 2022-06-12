import React from 'react';
import ReactDOM from 'react-dom/client';
import { css } from './emotion';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div
      className={css`
        margin: 32px;
        color: red;
        font-family: 'monospace';
        font-size: ${12 * 2}px;
      `}
    >
      <div>color: red !important;</div>
      <div>font-size: 48px !important;</div>
    </div>
  </React.StrictMode>
);
