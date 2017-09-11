import recipesReducer, { INITIAL_STATE } from '../index.reducer';
import * as actionTypes from '../index.actionTypes';
import { createAction } from '../../../utility/action.utils';
import mockRecipesResponse from './mocks/recipes.json';

describe('RECIPES REDUCER TESTS', () => {
  describe('should return initial state if not specified', () => {
    it('', () => {
      const actualState = recipesReducer(undefined, {});
      expect(actualState).toEqual(INITIAL_STATE);
    });
  });

  describe('should respond to actions', () => {
    let startingState;
    beforeEach(() => {
      startingState = {
        ...INITIAL_STATE,
        isLoading: true,
      };
    });

    it('should be able to set succesfully retrieved recipes', () => {
      const action = createAction(
        actionUtils.fulfilledAction(actionTypes.RETRIEVE_RECIPES),
        mockRecipesResponse
      );
      const actualState = recipesReducer(startingState, action);
      expect(actualState).toEqual({
        ...startingState,
        recipes: mockRecipesResponse,
        isLoading: false,
      });
    });

    it('should be able to respond to non found recipes', () => {
      const error = new Error('not found');
      const action = createAction(
        actionUtils.rejectedAction(actionTypes.RETRIEVE_RECIPES),
        error
      );
      const actualState = recipesReducer(startingState, action);
      expect(actualState).toEqual({
        ...startingState,
        loadingError: error.message,
        isLoading: false,
      });
    });

    it('should be able to set loading status while retrieving recipes', () => {
      const action = createAction(
        actionUtils.pendingAction(actionTypes.RETRIEVE_RECIPES)
      );
      startingState = {
        recipes: [],
        isLoading: false,
        loadingError: 'api error',
      };
      const actualState = recipesReducer(startingState, action);
      expect(actualState).toEqual({
        ...startingState,
        loadingError: undefined,
        isLoading: true,
      });
    });
  });
});
