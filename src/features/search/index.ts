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

    get(name) {
    },
  };
}

export {
  create,
}
