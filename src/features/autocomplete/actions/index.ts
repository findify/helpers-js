import * as FindifySDK from 'findify-sdk';

import { actionTypes } from '../constants/actionTypes';

// make arguments as objects and declare types for actons?
function input({
  query,
}) {
  return {
    type: actionTypes.INPUT,
    payload: {
      query,
    },
  };
}

function request({
  itemsLimit,
  suggestionsLimit,
  user,
}) {
  return {
    type: actionTypes.REQUEST,
    payload: {
      itemsLimit,
      suggestionsLimit,
      user,
    },
  };
}

function requestTimeUpdate({
  time,
}) {
  return {
    type: actionTypes.REQUEST_TIME_UPDATE,
    payload: {
      time,
    },
  };
}

function responseSuccess({
  response,
  receivedAt,
}) {
  return {
    type: actionTypes.RESPONSE_SUCCESS,
    payload: {
      response,
      receivedAt,
    },
  };
}

function responseFailure({
  message,
}) {
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
