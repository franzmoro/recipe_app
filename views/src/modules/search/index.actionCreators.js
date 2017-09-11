import { createAction } from '../../utility/action.utils';
import * as actionTypes from './index.actionTypes';

export const setMaxCookingTime = value => createAction(
  actionTypes.SET_MAX_COOKING_TIME,
  value
);
export const setTextSearch = value => createAction(
  actionTypes.SET_TEXT_SEARCH,
  value
);
