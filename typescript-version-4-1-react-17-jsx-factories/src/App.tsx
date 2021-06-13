export default () => (
    <div>
        <h1>React 17 JSX Factories</h1>
        <p>
            TypeScript 4.1 supports React 17’s upcoming jsx and jsxs factory functions through two new options for the
            jsx compiler option:
            <ul>
                <li>react-jsx</li>
                <li>react-jsxdev</li>
            </ul>
        </p>
        <code>{`{ "compilerOptions": { "jsx": "react-jsx" } }`}</code>
    </div>
);
