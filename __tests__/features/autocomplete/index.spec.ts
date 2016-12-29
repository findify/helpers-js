import * as expect from 'expect';
import * as rewire from 'rewire';
import configureMockStore from 'redux-mock-store';

const autocomplete = rewire('../../../src/features/autocomplete');

const makeCreateAutocomplete = autocomplete.__get__('makeCreateAutocomplete');
const createMockStore = configureMockStore();

describe('createAutocomplete', () => {
  describe('generic', () => {
    const store = createMockStore();
    const createAutocomplete = makeCreateAutocomplete(store);

    it('should throw an Error if "key" param is not provided at config', () => {
      expect(() => createAutocomplete({})).toThrow(/"key" param is required/);
      expect(() => createAutocomplete()).toThrow(/"key" param is required/);
    });

    it('should throw an Error if "user.uid" param is not provided at config');

    it('should throw an Error if "user.sid" param is not provided at config');
  });

  describe('emit', () => {
    it('should throw an Error if event is not provided');

    it('should throw an Error if "query" param is not provided at "input" event');

    it('should throw an Error if "user.uid" param is not provided at "request" event');

    it('should throw an Error if "user.sid" param is not provided at "request" event');

    it('should throw an Error if "user" param is not provided neither at configuration nor at "request" event');

    it('should dispatch "INPUT" action if "input" event was emitted');

    it('should dispatch "REQUEST" action if "request" event was emitted');

    it('should return object instance');
  });

  describe('subscribe', () => {
    it('should throw an Error if listener function is not provided');

    it('should throw an Error if listener param is not a function');

    it('should return function to unsubscribe from store');

    it('should notify listeners when "INPUT" action was dispatched');

    it('should notify listeners when "REQUEST" action was dispatched');

    it('should notify listeners when "RESPONSE_SUCCESS" action was dispatched');

    it('should notify listeners when "RESPONSE_FAILURE" action was dispatched');
  });

  describe('get', () => {
    it('should throw an Error if unrecognized event was provided');

    it('should return "products" data');

    it('should return "suggestions" data');

    it('should return "query" data');

    it('should return "meta" data');
  });
});
