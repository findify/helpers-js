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

import { eventsNames } from './constants/eventsNames';
import { input, request } from './actions';
import { configureReduxStore } from './configureReduxStore';

// avoid names duplication between redux state/store and lib state/store

function createAutocomplete(config: Config): Store<EmitEvent, SubscribeEvent, State> {
  return {
    emit(event: EmitEvent) {
      // possible validation errors, regarding not full request should be here
      // use reduxStore.getState() for this + may be selectors

      switch (event.name) {
        case eventsNames.input:
          reduxStore.dispatch(input(
            (event as InputEvent).payload.query
          ));
          break;
        case eventsNames.request:
          reduxStore.dispatch(request(
            (event as RequestEvent).payload.itemsLimit,
            (event as RequestEvent).payload.suggestionsLimit
          ));
          break;
      }

      return this;
    },
    subscribe(listener: SubscribeListener<SubscribeEvent, State>) {
      return reduxStore.subscribe(() => {
        // const action = reduxStore.getState().lastAction;
        // don't notify users on any state changes, notify only on their dispatched actions and for example response
        // as we may have some internal actions, users should not care about this
      });
    },
    // get(stateName: StateName) {},
  };
}

const reduxStore = configureReduxStore();

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
