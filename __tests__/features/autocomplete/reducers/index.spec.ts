import * as expect from 'expect';
import * as deepFreeze from 'deep-freeze';
import * as rewire from 'rewire';

import { rootReducer } from '../../../../src/features/autocomplete/reducers';
import { actionTypes } from '../../../../src/features/autocomplete/constants/actionTypes';

const reducers = rewire('../../../../src/features/autocomplete/reducers');

const requestDataReducer = reducers.__get__('requestDataReducer');
const requestMetaReducer = reducers.__get__('requestMetaReducer');
const responseDataReducer = reducers.__get__('responseDataReducer');
const responseMetaReducer = reducers.__get__('responseMetaReducer');

describe('autocomplete reducers', () => {
  describe('rootReducer', () => {
    it('should return initial state if previous state is not provided', () => {
      expect(rootReducer(undefined, {} as any)).toEqual({
        request: {
          meta: {},
          data: {},
        },
        response: {
          meta: {
            isFetching: false,
          },
          data: {},
        },
      });
    });
  });

  describe('request.data', () => {
    const prevState = {};

    deepFreeze(prevState);

    it('should handle INPUT action', () => {
      const query = 'test';

      expect(requestDataReducer(prevState, {
        type: actionTypes.INPUT,
        payload: {
          query,
        },
      })).toEqual({
        q: query,
      });
    });

    it('should handle REQUEST', () => {
      const payload = {
        itemsLimit: 1,
        suggestionsLimit: 4,
        user: {
          uid: 1,
          sid: 3,
        },
      };

      expect(requestDataReducer(prevState, {
        type: actionTypes.REQUEST,
        payload,
      })).toEqual({
        item_limit: payload.itemsLimit,
        suggestion_limit: payload.suggestionsLimit,
        user: payload.user,
      });
    });
  });

  describe('request.meta', () => {
    const prevState = {};

    deepFreeze(prevState);

    it('should handle REQUEST_TIME_UPDATE action', () => {
      const time = 1;

      expect(requestMetaReducer(prevState, {
        type: actionTypes.REQUEST_TIME_UPDATE,
        payload: {
          time,
        },
      })).toEqual({
        lastUpdated: time,
      });
    });
  });

  describe('response.data', () => {
    const prevState = {};

    deepFreeze(prevState);

    it('should handle RESPONSE_SUCCESS action', () => {
      const response = {
        key: 'someData',
      };

      expect(responseDataReducer(prevState, {
        type: actionTypes.RESPONSE_SUCCESS,
        payload: {
          response,
        },
      })).toEqual(response);
    });
  });

  describe('response.meta', () => {
    const prevState = {};

    deepFreeze(prevState);

    it('should handle REQUEST action', () => {
      expect(responseMetaReducer(prevState, {
        type: actionTypes.REQUEST,
        payload: {},
      })).toEqual({
        isFetching: true,
      });
    });

    it('should handle RESPONSE_SUCCESS action', () => {
      expect(responseMetaReducer(prevState, {
        type: actionTypes.RESPONSE_SUCCESS,
        payload: {
          response: {
            key: 'someData',
          },
          receivedAt: 1,
        },
      })).toEqual({
        isFetching: false,
        lastUpdated: 1,
      });
    });

    it('should handle RESPONSE_FAILURE action', () => {
      const message = 'test message';
      expect(responseMetaReducer(prevState, {
        type: actionTypes.RESPONSE_FAILURE,
        payload: {
          message,
        },
      })).toEqual({
        isFetching: false,
        error: message,
      });
    });
  });
});