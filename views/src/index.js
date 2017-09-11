import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';

import { store } from './modules/app';

const root = document.createElement('div');
document.body.appendChild(root);

ReactDOM.render(
  <Provider store={store} />,
  root
);
