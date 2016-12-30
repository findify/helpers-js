import * as FindifySDK from '@findify/findify-sdk';
import * as Redux from 'redux';

import {
  StateName,
  StateResult,
  InputEvent,
  RequestEvent,
  ResponseSuccessEvent,
  ResponseFailureEvent,
} from './types';

import {
  Store,
  Config,
  SubscribeListener,
} from '../../generic/types';

import {
  input,
  request,
  InputAction,
  RequestAction,
} from './actions';

import {
  getLastAction,
  getProducts,
  getSuggestions,
  getQuery,
  getMeta,
  State as ReduxState,
} from './reducers';

import { rootReducer } from './reducers';
import { rootSaga } from './sagas';
import { actionTypes } from './constants/actionTypes';
import { eventsNames } from './constants/eventsNames';
import { stateNames } from './constants/stateNames';
import { runSafe } from '../../generic/utils/runSafe';
import { isExists } from '../../generic/utils/isExists';
import { configureReduxStore } from '../../generic/helpers/configureReduxStore';

// avoid names duplication between redux state/store and lib state/store

function makeCreateAutocomplete(reduxStore: Redux.Store<ReduxState>) {
  return (config: Config): Store<EmitEvent, SubscribeEvent, StateName, StateResult> => {
    if (!isExists(config)) {
      throw new Error('Please, provide configuration object');
    }

    if (!isExists(config.key)) {
      throw new Error('"key" param is required');
    }

    if (config.user && !isExists(config.user.uid)) {
      throw new Error('"user.uid" param is required');
    }

    if (config.user && !isExists(config.user.sid)) {
      throw new Error('"user.sid" param is required');
    }

    const sdk = FindifySDK.init(config);

    return {
      emit(event: EmitEvent) {
        if (!isExists(event)) {
          throw new Error('Please, provide event you want to emit');
        }

        if (!isExists(event.name)) {
          throw new Error('Please, provide event "name"');
        }

        if (event.name === eventsNames.input && (
          !isExists(event.payload) || !isExists((event as InputEvent).payload.query)
        )) {
          throw new Error('"query" param is required in "input" event');
        }

        if (event.name === eventsNames.request && !isExists(config.user) && (
          !isExists(event.payload) || !isExists((event as RequestEvent).payload.user)
        )) {
          throw new Error('`user` param should be provided either at request or at library config');
        }

        if (event.name === eventsNames.request && isExists(event.payload)) {
          if (!isExists((event as RequestEvent).payload.user.uid)) {
            throw new Error('"user.uid" param is required');
          }

          if (!isExists((event as RequestEvent).payload.user.sid)) {
            throw new Error('"user.sid" param is required');
          }
        }

        switch (event.name) {
          case eventsNames.input:
            reduxStore.dispatch(input((event as InputEvent).payload));
            break;
          case eventsNames.request:
            reduxStore.dispatch(request((event as RequestEvent).payload, sdk));
            break;
        }

        return this;
      },

      subscribe(listener: SubscribeListener<SubscribeEvent>) {
        if (!isExists(listener)) {
          throw new Error('Please, provide listener function');
        }

        if (typeof listener !== 'function') {
          throw new Error('Listener should be a function');
        }

        return reduxStore.subscribe(() => {
          const action = getLastAction(reduxStore.getState());

          switch (action.type) {
            case actionTypes.INPUT:
              listener(createEvent<InputEvent>(eventsNames.input, (action as InputAction).payload));
              break;
            case actionTypes.REQUEST:
              listener(createEvent<RequestEvent>(eventsNames.request, (action as RequestAction).payload));
              break;
            case actionTypes.RESPONSE_SUCCESS:
              listener(createEvent<ResponseSuccessEvent>(eventsNames.responseSuccess));
              break;
            case actionTypes.RESPONSE_FAILURE:
              listener(createEvent<ResponseFailureEvent>(eventsNames.responseFailure));
              break;
          }
        });
      },

      get(name: StateName) {
        if (!isExists(name)) {
          throw new Error('Please, provide state name');
        }

        if (!isExists(stateNames[name])) {
          throw new Error('Event not found');
        }
        // !!!
        // don't forget about cases when we need to return value by one name but from different
        // sources(from request or either from response)

        const state = reduxStore.getState();

        switch (name) {
          case stateNames.products: return runSafe(() => getProducts(state));
          case stateNames.suggestions: return runSafe(() => getSuggestions(state));
          case stateNames.query: return runSafe(() => getQuery(state));
          case stateNames.meta: return runSafe(() => getMeta(state));
        }
      },
    };
  };
}

function createEvent<E>(name, payload?): E {
  return !payload ? {
    name,
  } as any : {
    name,
    payload,
  } as any;
}

const reduxStore = configureReduxStore(rootReducer, rootSaga);
const createAutocomplete = makeCreateAutocomplete(reduxStore);

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

export {
  createAutocomplete,
}
