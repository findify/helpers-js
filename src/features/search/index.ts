import * as FindifySDK from '@findify/findify-sdk';
import * as Redux from 'redux';

// avoid names duplication between redux state/store and lib state/store
function create(config) {
  return {
    emit(event) {
      return this;
    },

    subscribe(listener) {
      return () => {};
    },

    // ???should have priority. if we are having something in request, returning from there else - from response
    get(name) {
    },
  };
}

export {
  create,
}
