import React from 'react';
import { areComponentsEqual } from 'react-hot-loader';
import { makeObservable, observable } from 'mobx';
import { observer } from 'mobx-react';

class Store {
  constructor() {
    makeObservable(this);
  }

  @observable value = 'Store value';
}

const store = new Store();

const Content = observer(() => {
  return <div>{store.value}</div>;
});

areComponentsEqual(Content, Content);

export const App = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', margin: 32 }}>
      <div style={{ flex: 1 }}>
        <Content />
      </div>
    </div>
  );
};
