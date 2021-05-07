import React, { FC, useRef, useMemo, useState, useEffect } from 'react';
import { render } from 'react-dom';

class Store {
    constructor(owner = '') {
        console.log('Store init by', owner);
    }
}

const App: FC = () => {
    useRef(new Store('useRef'));
    useRef(useMemo(() => new Store('useRef + useMemo'), []));
    useState(new Store('useState'));
    useState(() => new Store('useState lazy initial state'));

    const count = useTick();
    return (
        <div>
            <div>Count: {count}</div>
        </div>
    );
};

function useTick() {
    const [count, setCount] = useState(0);
    useEffect(() => {
        setInterval(() => setCount((prev) => prev + 1), 1000);
    }, []);

    return count;
}

render(<App />, document.getElementById('root'));
