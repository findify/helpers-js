import * as FindifySDK from 'findify-sdk';

import { actionTypes } from '../constants/actionTypes';

// make arguments as objects and declare types for actons?
function input(query: string) {
  return {
    type: actionTypes.INPUT,
    payload: {
      query,
    },
  };
}

function request(itemsLimit?: number, suggestionsLimit?: number, user?: FindifySDK.User) {
  return {
    type: actionTypes.REQUEST,
    payload: {
      itemsLimit,
      suggestionsLimit,
      user,
    },
  };
}

function requestTimeUpdate(time: number) {
  return {
    type: actionTypes.REQUEST_TIME_UPDATE,
    payload: {
      time,
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
  requestTimeUpdate,
  responseSuccess,
  responseFailure,
};
