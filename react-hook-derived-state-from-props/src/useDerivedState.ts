import { useRef, useState } from 'react';

/**
 * Hook version getDerivedStateFromProps
 *
 * @see https://reactjs.org/docs/hooks-faq.html#how-do-i-implement-getderivedstatefromprops
 */
export function useDerivedState<T>(prop: T) {
    const [state, setState] = useState(prop);

    const prevPropRef = useRef(prop);

    if (prop !== prevPropRef.current) {
        prevPropRef.current = prop;
        setState(prop);
    }

    return [state, setState] as [T, typeof setState];
}
