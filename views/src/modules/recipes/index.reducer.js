import * as actionTypes from './index.actionTypes';
import * as actionUtils from '../../utility/action.utils';

export const INITIAL_STATE = {
  isLoading: false,
  loadingError: undefined,
  recipes: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionUtils.pendingAction(actionTypes.RETRIEVE_RECIPES):
      return {
        ...state,
        isLoading: true,
        loadingError: undefined,
      };
    case actionUtils.fulfilledAction(actionTypes.RETRIEVE_RECIPES):
      return {
        ...state,
        isLoading: false,
        recipes: action.payload,
      };
    case actionUtils.rejectedAction(actionTypes.RETRIEVE_RECIPES):
      return {
        ...state,
        isLoading: false,
        loadingError: action.payload.message,
      };

    default:
      return state;
  }
};
