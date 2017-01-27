import * as FindifySDK from '@findify/findify-sdk';
import * as Redux from 'redux';

import {
  StateName,
  InputEvent,
  RequestEvent,
  ResponseSuccessEvent,
  ResponseFailureEvent,
} from './types';

import {
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
  getRequestData,
  getResponseData,
  getResponseMeta,
} from './reducers';

import { rootReducer } from './reducers';
import { rootSaga } from './sagas';
import { actionTypes } from './constants/actionTypes';
import { eventsNames } from './constants/eventsNames';
import { stateNames } from './constants/stateNames';
import { runSafe } from '../../generic/utils/runSafe';
import { isExists } from '../../generic/utils/isExists';
import { createStore } from '../../generic/helpers/createStore';

// avoid names duplication between redux state/store and lib state/store

function create(config: Config) {
  return createStore({
    rootReducer,
    rootSaga,
    config,
    eventsNames,
    stateNames,
  }, (reduxStore, sdk) => {
    return {
      emit(event: EmitEvent) {
        if (event.name === eventsNames.input && (
          !isExists(event.payload) || !isExists((event as InputEvent).payload.query)
        )) {
          throw new Error('"query" param is required in "input" event');
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
        const state = reduxStore.getState();

        switch (name) {
          case stateNames.request: return runSafe(() => getRequestData(state));
          case stateNames.response: return runSafe(() => getResponseData(state));
          case stateNames.responseMeta: return runSafe(() => getResponseMeta(state));
        }
      },
    };
  });
}

function createEvent<E>(name, payload?): E {
  return !payload ? {
    name,
  } as any : {
    name,
    payload,
  } as any;
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

export {
  create,
}
