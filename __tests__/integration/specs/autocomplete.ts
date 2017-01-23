import * as fauxJax from 'faux-jax';
import * as omit from 'lodash/omit';
import * as expect from 'expect';
import { createAutocomplete } from '../../../src';

const successResponse = {
  items: [{
    id: 'testId',
  }],
  suggestions: [{
    value: 'test',
    redirect: {
      name: 'testName',
      url: 'testUrl',
    },
  }],
  meta: {
    rid: 'testRid',
    q: 'testQuery',
    suggestion_limit: 1,
    item_limit: 1,
  },
};

const autocompleteQuery = 'testQuery';

const emittingEvents = [{
  name: 'input',
  payload: {
    query: autocompleteQuery,
  },
}, {
  name: 'request',
  payload: {
    itemsLimit: 1,
    suggestionsLimit: 1,
  },
}];

const autocompleteSpec = {
  createStore: function(args) {
    return createAutocomplete(args);
  },
  name: 'createAutocomplete',
  searchApi: {
    endpoint: '/autocomplete',
    successResponse,
  },
  events: {
    requestEvent: {
      name: 'request',
    },
    validEvent: {
      name: 'input',
      payload: {
        query: 'test',
      },
    },
  },
  emit: {
    validations: [{
      event: {
        name: 'input',
      },
      message: /"query" param is required in "input" event/,
    }, {
      event: {
        name: 'input',
        payload: {},
      },
      message: /"query" param is required in "input" event/,
    }],
    requests: [{
      events: [{
        name: 'input',
        payload: {
          query: 'test',
        },
      }, {
        name: 'request',
        payload: {
          itemsLimit: 1,
          suggestionsLimit: 2,
        },
      }],
      requestBody: {
        q: 'test',
        item_limit: 1,
        suggestion_limit: 2,
      },
    }],
  },
  subscribe: {
    successEvents: [{
      name: 'request',
    }, {
      name: 'request',
      payload: {
        user: {
          uid: 'testUserId',
          sid: 'testSessionId',
        },
      },
    }, {
      name: 'request',
      payload: {
        itemsLimit: 1,
        suggestionsLimit: 2,
      },
    }, {
      name: 'input',
      payload: {
        query: 'test',
      },
    }],
  },
  get: {
    names: [{
      name: 'products',
      expectingPositiveResult: successResponse.items,
      expectingNegativeResult: undefined,
      emittingEvents,
      successResponse,
    }, {
      name: 'suggestions',
      expectingPositiveResult: successResponse.suggestions,
      expectingNegativeResult: undefined,
      emittingEvents,
      successResponse,
    }, {
      name: 'meta',
      expectingPositiveResult: function(result) {
        expect(result.lastUpdated).toBeA('number');
        expect(omit(result, ['lastUpdated'])).toEqual({
          isFetching: false,
        });
      },
      expectingNegativeResult: {
        isFetching: false,
      },
      emittingEvents,
      successResponse,
    }, {
      name: 'query',
      expectingPositiveResult: autocompleteQuery,
      expectingNegativeResult: undefined,
      emittingEvents,
      successResponse,
    }]
  },
};

export { autocompleteSpec }
