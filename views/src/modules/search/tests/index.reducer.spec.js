import searchReducer, { INITIAL_STATE } from '../index.reducer';
import * as actionTypes from '../index.actionTypes';
import { createAction } from '../../../utility/action.utils';

describe('SEARCH REDUCER TESTS', () => {
  it('should return initial state if not specified', () => {
    const actualState = searchReducer(undefined, {});
    expect(actualState).toEqual(INITIAL_STATE);
  });

  it('should be able to set search text', () => {
    const textInput = 'Chicken';
    const action = createAction(
      actionTypes.SET_TEXT_SEARCH,
      textInput
    );
    const actualState = searchReducer(INITIAL_STATE, action);
    expect(actualState).toEqual({ ...INITIAL_STATE, textSearch: textInput });
  });

  it('should be able to set maximum cooking time', () => {
    const maxCookingTime = 25;
    const action = createAction(
      actionTypes.SET_MAX_COOKING_TIME,
      maxCookingTime
    );
    const actualState = searchReducer(INITIAL_STATE, action);
    expect(actualState).toEqual({ ...INITIAL_STATE, maxCookingTime });
  });
});
