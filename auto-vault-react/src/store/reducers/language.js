import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
import { LOCALES } from '../../i18n/index';

const initialState = {
  language: LOCALES.ENGLISH,
};

const changeLanguage = (state, action) => {
  return updateObject(state, { language: action.language });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_LANGUAGE:
      return changeLanguage(state, action);
    default:
      return state;
  }
};

export default reducer;
