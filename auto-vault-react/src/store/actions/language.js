import * as actionTypes from './actionTypes';

export const changeLanguage = (language) => {
  return {
    type: actionTypes.CHANGE_LANGUAGE,
    language: language,
  };
};
