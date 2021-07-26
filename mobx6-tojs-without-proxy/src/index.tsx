import './config';

import React, { FC } from 'react';
import { render } from 'react-dom';
import { makeObservable, observable, ObservableMap, ObservableSet } from 'mobx';

class Store {
  constructor() {
    makeObservable(this);
  }

  @observable number = 1;
  @observable string = 'test';
  @observable boolean = true;
  @observable array = [1];
  @observable object = { a: 1 };
  @observable map = new Map([[1, 1]]);
  @observable set = new Set([1]);
  @observable observableMap = new ObservableMap([[1, 1]]);
  @observable observableSet = new ObservableSet([1]);
}

const store = new Store();

const tryGet = (key: string) => {
  try {
    return (store[key as keyof Store] as any).toJS();
  } catch (err) {
    return err.message;
  }
};

const App: FC = () => {
  return (
    <div style={{ margin: 32 }}>
      <h1>Is there any toJS method in MobX6?</h1>

      <code>
        Store:
        <pre>{JSON.stringify(store, null, 2)}</pre>
      </code>

      <ul>
        {Object.keys(store).map((key) => (
          <li key={key}>
            {key}
            <br />
            {tryGet(key)}
          </li>
        ))}
      </ul>
    </div>
  );
};

render(<App />, document.getElementById('root'));
