import {
  ActionPayload,
  ActionType,
  Response,
} from './types';

import { Store } from '../../generic';

class Collection implements Store<ActionType, ActionPayload> {
  public dispatch(type, payload) {
    return this;
  }

  public subscribe(listener) {
    return () => {};
  }

  public submit() {
    return this;
  }
}

export {
  Collection,
}
