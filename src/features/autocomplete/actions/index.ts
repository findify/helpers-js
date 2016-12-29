import * as FindifySDK from '@findify/findify-sdk';

import { actionTypes } from '../constants/actionTypes';

// make arguments as objects and declare types for actons?
function input(payload: InputPayload): InputAction {
  return {
    type: actionTypes.INPUT,
    payload,
  };
}

function request(payload: RequestPayload, sdk: FindifySDK.Client): RequestAction {
  return {
    type: actionTypes.REQUEST,
    payload,
    service: {
      sdk,
    },
  };
}

function requestTimeUpdate(payload: RequestTimeUpdatePayload): RequestTimeUpdateAction {
  return {
    type: actionTypes.REQUEST_TIME_UPDATE,
    payload,
  };
}

function responseSuccess(payload: ResponseSuccessPayload): ResponseSuccessAction {
  return {
    type: actionTypes.RESPONSE_SUCCESS,
    payload,
  };
}

function responseFailure(payload: ResponseFailurePayload): ResponseFailureAction {
  return {
    type: actionTypes.RESPONSE_FAILURE,
    payload,
  };
}

type InputAction = {
  type: string,
  payload: InputPayload,
};

type RequestAction = {
  type: string,
  payload: RequestPayload,
  service: {
    sdk: FindifySDK.Client,
  },
};

type RequestTimeUpdateAction = {
  type: string,
  payload: RequestTimeUpdatePayload,
};

type ResponseSuccessAction = {
  type: string,
  payload: ResponseSuccessPayload,
};

type ResponseFailureAction = {
  type: string,
  payload: ResponseFailurePayload,
};

type InputPayload = {
  query: string,
};

type RequestPayload = {
  itemsLimit?: number,
  suggestionsLimit?: number,
  user?: FindifySDK.User,
};

type RequestTimeUpdatePayload = {
  time: number,
};

type ResponseSuccessPayload = {
  response: FindifySDK.AutocompleteResponse,
  receivedAt: number,
};

type ResponseFailurePayload = {
  message: string,
};

type Action = (
  InputAction |
  RequestAction |
  RequestTimeUpdateAction |
  ResponseSuccessAction |
  ResponseFailureAction
);

export {
  input,
  request,
  requestTimeUpdate,
  responseSuccess,
  responseFailure,
  Action,
  InputAction,
  RequestAction,
  RequestTimeUpdateAction,
  ResponseSuccessAction,
  ResponseFailureAction,
};
