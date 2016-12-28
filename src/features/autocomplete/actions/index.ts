import * as FindifySDK from 'findify-sdk';

import { actionTypes } from '../constants/actionTypes';

function input(query: string) {
  return {
    type: actionTypes.INPUT,
    payload: {
      query,
    },
  };
}

function request(itemsLimit?: number, suggestionsLimit?: number) {
  return {
    type: actionTypes.REQUEST,
    payload: {
      itemsLimit,
      suggestionsLimit,
    },
  };
}

function responseSuccess(response: FindifySDK.AutocompleteResponse, receivedAt: number) {
  return {
    type: actionTypes.RESPONSE_SUCCESS,
    payload: {
      response,
      receivedAt,
    },
  };
}

function responseFailure(message: string) {
  return {
    type: actionTypes.RESPONSE_FAILURE,
    payload: {
      message,
    },
  };
}

export {
  input,
  request,
  responseSuccess,
  responseFailure,
};
