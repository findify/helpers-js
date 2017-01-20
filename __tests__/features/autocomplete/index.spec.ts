import * as expect from 'expect';
import * as rewire from 'rewire';
import * as omit from 'lodash/omit';
import * as pick from 'lodash/pick';
import * as keys from 'lodash/keys';
import * as Redux from 'redux';
import configureMockStore from 'redux-mock-store';

import { actionTypes } from '../../../src/features/autocomplete/constants/actionTypes';

const a = rewire('../../../src/features/autocomplete');

const makeCreateAutocomplete = a.__get__('makeCreate');
const mockStore = configureMockStore();

describe('createAutocomplete', () => {
  describe('generic', () => {
    const store = mockStore();
    const createAutocomplete = makeCreateAutocomplete(store);
    const key = 'testApiKey';

    beforeEach(() => {
      store.clearActions();
    });
  });

  describe('emit', () => {
    const store = mockStore();
    const createAutocomplete = makeCreateAutocomplete(store);
    const autocomplete = createAutocomplete({
      key: 'testApiKey',
    });

    beforeEach(() => {
      store.clearActions();
    });

    it('should dispatch "INPUT" action if "input" event was emitted', () => {
      const payload = {
        query: 'testQuery',
      };

      autocomplete.emit({
        name: 'input',
        payload,
      });

      expect(store.getActions()).toEqual([{
        type: actionTypes.INPUT,
        payload,
      }]);
    });

    it('should dispatch "REQUEST" action if "request" event was emitted while "user" was given at config', () => {
      const autocomplete2 = createAutocomplete({
        key: 'testApiKey',
        user: {
          uid: 'testUserId',
          sid: 'testSesstionId',
        },
      });
      const payload = {
        itemsLimit: 2,
      };

      autocomplete2.emit({
        name: 'request',
        payload,
      });

      const actions = store.getActions().map((action) => omit(action, ['service']));

      expect(actions).toEqual([{
        type: actionTypes.REQUEST,
        payload,
      }]);
    });

    it('should dispatch "REQUEST" action if "request" event was emitted while "user" was given at request', () => {
      const payload = {
        itemsLimit: 1,
        suggestionsLimit: 5,
        user: {
          uid: 'testUserId',
          sid: 'testSesstionId',
        },
      };

      autocomplete.emit({
        name: 'request',
        payload,
      });

      const actions = store.getActions().map((action) => omit(action, ['service']));

      expect(actions).toEqual([{
        type: actionTypes.REQUEST,
        payload,
      }]);
    });

    it('should dispatch sdk instance in "REQUEST" action', () => {
      autocomplete.emit({
        name: 'request',
        payload: {
          user: {
            uid: 'testUserId',
            sid: 'testSesstionId',
          },
        },
      });

      const actions = store.getActions();

      expect(actions.length).toEqual(1);

      const methodsNames = keys(actions[0].service.sdk);

      expect(methodsNames).toContain('autocomplete');
      expect(methodsNames).toContain('search');
      expect(methodsNames).toContain('collection');
      expect(methodsNames).toContain('recommendations');
      expect(methodsNames).toContain('feedback');
    });
  });

  describe('subscribe', () => {
    describe('generic', () => {
      const store = mockStore();
      const createAutocomplete = makeCreateAutocomplete(store);
      const autocomplete = createAutocomplete({
        key: 'testApiKey',
      });

      beforeEach(() => {
        store.clearActions();
      });
    });

    describe('notifying listeners', () => {
      const rootReducer = (state = {}, action) => ({ lastAction: action });
      function testNotifying(testFunction, expectFunction) {
        const spy = expect.createSpy();
        const reduxStore = Redux.createStore(rootReducer);
        const autocomplete = makeCreateAutocomplete(reduxStore)({
          key: 'testApiKey',
        });

        autocomplete.subscribe((event) => {
          (spy as any)();

          expectFunction(event);
        });

        testFunction(reduxStore);

        expect(spy.calls.length).toEqual(1);
      }

      it('should notify listeners when "INPUT" action was dispatched', () => {
        const payload = {
          query: 'q',
        };

        testNotifying((store) => {
          store.dispatch({
            type: actionTypes.INPUT,
            payload,
          });
        }, (event) => {
          expect(event).toEqual({
            name: 'input',
            payload,
          });
        });
      });

      it('should notify listeners when "REQUEST" action was dispatched', () => {
        const payload = {
          itemsLimit: 1,
          suggestionsLimit: 2,
          user: {
            uid: 'testUserId',
            sid: 'testSessionId',
          },
        };

        testNotifying((store) => {
          store.dispatch({
            type: actionTypes.REQUEST,
            payload,
          });
        }, (event) => {
          expect(event).toEqual({
            name: 'request',
            payload,
          });
        });
      });

      it('should notify listeners when "RESPONSE_SUCCESS" action was dispatched', () => {
        testNotifying((store) => {
          store.dispatch({
            type: actionTypes.RESPONSE_SUCCESS,
            payload: {
              response: {
                key: 'serverResponse',
              },
              receivedAt: 1,
            },
          });
        }, (event) => {
          expect(event).toEqual({
            name: 'responseSuccess',
          });
        });
      });

      it('should notify listeners when "RESPONSE_FAILURE" action was dispatched', () => {
        testNotifying((store) => {
          store.dispatch({
            type: actionTypes.RESPONSE_FAILURE,
            payload: {
              message: 'testMessage',
            },
          });
        }, (event) => {
          expect(event).toEqual({
            name: 'responseFailure',
          });
        });
      });
    });
  });

  describe('get', () => {
    const meta = {
      isFetching: false,
      lastUpdated: 1,
    };
    const suggestions = [{
      value: 'test suggestion',
      redirect: {
        name: 'redirectName',
        url: 'http://test.com',
      },
    }];
    const products = [{
      id: '1',
    }, {
      id: '2',
    }, {
      id: '3',
    }];
    const query = 'testQuery';
    const reduxState = {
      request: {
        data: {
          q: query,
        },
      },
      response: {
        meta,
        data: {
          suggestions,
          products,
        },
      },
    };
    const store = mockStore(reduxState);
    const createAutocomplete = makeCreateAutocomplete(store);
    const autocomplete = createAutocomplete({
      key: 'testApiKey',
    });

    beforeEach(() => {
      store.clearActions();
    });

    it('should throw an Error if state name is not provided', () => {
      expect(() => autocomplete.get()).toThrow(/Please, provide state name/);
    });

    it('should throw an Error if unrecognized event was provided', () => {
      expect(() => autocomplete.get('testEvent')).toThrow(/Event not found/);
    });

    it('should return "products" data', () => {
      expect(autocomplete.get('products')).toEqual(products);
    });

    it('should return "suggestions" data', () => {
      expect(autocomplete.get('suggestions')).toEqual(suggestions);
    });

    it('should return "query" data', () => {
      expect(autocomplete.get('query')).toEqual(query);
    });

    it('should return "meta" data', () => {
      expect(autocomplete.get('meta')).toEqual(meta);
    });

    it('should return "undefined" if we have no data yet', () => {
      const emptyStore = mockStore();
      const emptyAutocomplete = makeCreateAutocomplete(emptyStore)({
        key: 'testApiKey',
      });

      expect(emptyAutocomplete.get('products')).toBe(undefined);
      expect(emptyAutocomplete.get('suggestions')).toBe(undefined);
      expect(emptyAutocomplete.get('query')).toBe(undefined);
      expect(emptyAutocomplete.get('meta')).toBe(undefined);
    });
  });
});
