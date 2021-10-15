import './App.css';

export const App = () => {
  return (
    <div className="app">
      <div className="box undefined">
        <code>background-color: var(--bg-undefined, gray);</code>
      </div>
      <div className="box default">
        <code>--bg-default: lightgreen; background-color: var(--bg-default, gray);</code>
      </div>
    </div>
  );
};
