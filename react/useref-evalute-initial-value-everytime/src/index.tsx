import React, { FC, useRef, useState, useEffect } from 'react';
import { render } from 'react-dom';

class Store {
    constructor() {
        console.log('Store init');
    }
}

const App: FC = () => {
    const storeRef = useRef(new Store());

    const prevStoreRef = useRef(storeRef.current);
    if (prevStoreRef.current !== storeRef.current) {
        console.log('storeRef current changed');
    }

    const [count, setCount] = useState(0);

    useEffect(() => {
        setInterval(() => setCount((prev) => prev + 1), 1000);
    }, []);

    return (
        <div>
            <div>Count: {count}</div>
        </div>
    );
};

render(<App />, document.getElementById('root'));
