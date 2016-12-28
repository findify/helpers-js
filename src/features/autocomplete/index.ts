import {
  InputEvent,
  StateName,
  StateResult,
  RequestEvent,
  ResponseSuccessEvent,
  ResponseFailureEvent,
} from './types';

import {
  Store,
  Config,
  SubscribeListener,
  State as StateGeneric,
} from '../../generic/types';

import {
  input,
  request,
  responseSuccess,
  responseFailure,
} from './actions';

import { eventsNames } from './constants/eventsNames';

// avoid names duplication between redux state/store and lib state/store

function createAutocomplete(config: Config): Store<EmitEvent, SubscribeEvent, State> {
  return {
    emit({ name, payload }: EmitEvent) {
      // switch (name) {
      //   case eventsNames.input:
      //     reduxStore.dispatch(payload.query);
      //     break;
      //   case eventsNames.request:
      //     reduxStore.dispatch(payload.itemsLimit, payload.suggestionsLimit);
      //     break;
      // }

      return this;
    },
    subscribe(listener: SubscribeListener<SubscribeEvent, State>) {
      // reduxStore.subscribe(() => {
      //   const action = reduxStore.getState().lastAction;


      // });
      return () => {};
    },
  };
}

type EmitEvent = (
  InputEvent |
  RequestEvent
);

type SubscribeEvent = (
  InputEvent |
  RequestEvent |
  ResponseSuccessEvent |
  ResponseFailureEvent
);

type State = StateGeneric<StateName, StateResult>;

export {
  createAutocomplete,
}
