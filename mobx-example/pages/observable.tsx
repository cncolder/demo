import Head from 'next/head';
import { makeAutoObservable, autorun } from 'mobx';
import { useStateList } from 'react-use';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import dracula from 'prism-react-renderer/themes/dracula';

const codes = `
() => {
    const store = makeAutoObservable({
        count: 1,
    });

    return <div>{store.count}</div>;
};

---

() => {
    const store = makeAutoObservable({
        count: 1,
    });

    setInterval(() => {
        store.count++;
    }, 1000);

    return <div>{store.count}</div>;
};
`
    .split('---')
    .map((code) => code.trim())
    .filter(Boolean);

// () => {
//     const store = makeAutoObservable({
//         count: 1,
//     });

//     setInterval(() => {
//         store.count++;
//     }, 1000);

//     return <div>{store.count}</div>;
// };

export default function ObservablePage() {
    const { state: code, prev, next, currentIndex } = useStateList(codes);

    return (
        <div className="flex flex-col min-h-screen bg-gray-200">
            <Head>
                <title>Observable</title>
            </Head>

            <header className="p-10">
                <h1 className="text-6xl font-bold">Observable</h1>
            </header>

            <main className="flex flex-1 p-10">
                <LiveProvider theme={dracula} language="tsx" scope={{ makeAutoObservable, autorun }} code={code}>
                    <LiveEditor className="flex-1 m-2 text-xl" />
                    <div className="flex-1 m-2 bg-gray-300">
                        <LivePreview className="p-3 text-4xl" />
                        <LiveError className="p-3 text-xs" />
                    </div>
                </LiveProvider>
            </main>

            <footer className="pl-10 pb-10 text-5xl">
                <button onClick={next}>&larr;</button>
                <button onClick={prev}>&rarr;</button>
            </footer>
        </div>
    );
}
