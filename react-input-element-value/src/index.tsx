import React, { FC, useLayoutEffect } from 'react';
import { render } from 'react-dom';

const App: FC = () => {
    useLayoutEffect(() => {
        [...document.getElementsByTagName('input')].forEach((input) => {
            input.parentElement!.lastChild!.textContent = `${input.value}`;
        });
    });

    return (
        <div style={{ margin: 50 }}>
            <div style={{ display: 'flex' }}>
                <input id="radioNumber" type="radio" value={123} />
                <div />
            </div>

            <div style={{ display: 'flex' }}>
                <input id="radioNumber" type="radio" value={'abc'} />
                <div />
            </div>

            <div style={{ display: 'flex' }}>
                <input id="radioNumber" type="radio" value={['uvw', 'xyz']} />
                <div />
            </div>
        </div>
    );
};

render(<App />, document.getElementById('root'));
