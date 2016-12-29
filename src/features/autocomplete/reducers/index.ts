import * as FindifySDK from 'findify-sdk';
import * as assign from 'lodash/assign';
import { combineReducers as combine } from 'redux';

import { Action } from '../actions';
import { ResponseMeta, RequestMeta } from '../../../generic/types';
import { actionTypes } from '../constants/actionTypes';

// store selectors here if needed

function requestDataReducer(state: RequestDataState = initialRequestDataState, action) {
  switch (action.type) {
    case actionTypes.INPUT: return assign({}, state, {
      q: action.payload.query,
    });
    case actionTypes.REQUEST: return assign({}, state, {
      item_limit: action.payload.itemsLimit,
      suggestion_limit: action.payload.suggestionsLimit,
      user: action.payload.user,
    });
    default: return state;
  }
}

function requestMetaReducer(state: RequestMetaState = initialRequestMetaState, action) {
  switch (action.type) {
    case actionTypes.REQUEST_TIME_UPDATE: return assign({}, state, {
      lastUpdated: action.payload.time,
    });
    default: return state;
  }
}

function responseDataReducer(state: ResponseDataState = initialResponseDataState, action) {
  switch (action.type) {
    case actionTypes.RESPONSE_SUCCESS: return assign({}, state, action.payload.response);
    default: return state;
  }
}

function responseMetaReducer(state: ResponseMeta = initialResponseMetaState, action) {
  switch (action.type) {
    case actionTypes.REQUEST: return assign({}, state, {
      isFetching: true,
    });
    case actionTypes.RESPONSE_SUCCESS: return assign({}, state, {
      lastUpdated: action.payload.receivedAt,
      isFetching: false,
    });
    case actionTypes.RESPONSE_FAILURE: return assign({}, state, {
      isFetching: false,
      error: action.payload.message,
    });
    default: return state;
  }
}

function lastActionReducer(state: Action = initialLastActionState, action: Action) {
  return action;
}

const initialRequestDataState = {} as any;
const initialRequestMetaState = {};
const initialResponseDataState = {} as any;
const initialResponseMetaState = {
  isFetching: false,
};
const initialLastActionState = {} as any;

const getRequestData = (state: State) => state.request.data;

const rootReducer = combine<State>({
  request: combine({
    data: requestDataReducer,
    meta: requestMetaReducer,
  }),
  response: combine({
    data: responseDataReducer,
    meta: responseMetaReducer,
  }),
  lastAction: lastActionReducer,
});

type RequestDataState = FindifySDK.AutocompleteRequest;
type RequestMetaState = RequestMeta;
type ResponseDataState = FindifySDK.AutocompleteResponse;
type ResponseMetaState = ResponseMeta;

type State = {
  request: {
    meta?: RequestMetaState,
    data?: RequestDataState,
  },
  response: {
    meta: ResponseMetaState,
    data?: ResponseDataState,
  },
  lastAction: Action,
};

export {
  rootReducer,
  getRequestData,
}
