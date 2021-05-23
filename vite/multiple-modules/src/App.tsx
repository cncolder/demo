import React, { useState } from 'react';
import { useAsync } from 'react-use';
import { PageModule } from './types';
import './App.css';

const modules = import.meta.glob('./pages/*/index.tsx');

function App() {
  const [value, setValue] = useState('');

  const { loading, value: Module } = useAsync(async () => modules[value]?.() as Promise<PageModule>, [value]);

  return (
    <div className="App">
      <header className="App-header">
        <select value={value} onChange={(e) => setValue(e.target.value)}>
          <option value="" disabled>
            Select module
          </option>
          {Object.keys(modules).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </header>

      <main className="App-body">{loading ? 'Loading...' : Module && <Module.Page {...Module.data} />}</main>
    </div>
  );
}

export default App;
