import { configure } from 'mobx';

configure({
  enforceActions: 'observed',
  useProxies: 'never',
});
