import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';

import { store } from './modules/app';
import RecipesList from './modules/recipes/components/RecipesList';
import SearchBar from './modules/search/components/SearchBar';

const root = document.createElement('div');
document.body.appendChild(root);

ReactDOM.render(
  <Provider store={store}>
    <div>
      <SearchBar />
      <RecipesList />
    </div>
  </Provider>,
  root
);
