import * as FindifySDK from 'findify-sdk';
import * as assign from 'lodash/assign';
import { combineReducers as combine } from 'redux';

import { ResponseMeta, RequestMeta } from '../../../generic/types';
import { actionTypes } from '../constants/actionTypes';

function requestDataReducer(state: RequestDataState, action) {
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

function requestMetaReducer(state: RequestMetaState, action) {
  switch (action.type) {
    case actionTypes.REQUEST_TIME_UPDATE: return assign({}, state, {
      lastUpdated: action.payload.time,
    });
    default: return state;
  }
}

function responseDataReducer(state: ResponseDataState, action) {
  switch (action.type) {
    case actionTypes.RESPONSE_SUCCESS: return assign({}, state, action.payload.response);
    default: return state;
  }
}

function responseMetaReducer(state: ResponseMeta, action) {
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

const rootReducer = combine({
  reqeust: combine({
    data: requestDataReducer,
    meta: requestMetaReducer,
  }),
  response: combine({
    data: responseDataReducer,
    meta: responseMetaReducer,
  }),
});

type RequestDataState = FindifySDK.AutocompleteRequest;
type RequestMetaState = RequestMeta;
type ResponseDataState = FindifySDK.AutocompleteResponse;
type ResponseMetaState = ResponseMeta;

type ReduxState = {
  request: {
    meta: RequestMetaState,
    data?: RequestDataState,
  },
  response: {
    meta: ResponseMetaState,
    data?: ResponseDataState,
  },
};

export {
  rootReducer,
}
