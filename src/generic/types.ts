import * as FindifySDK from '@findify/findify-sdk';
import * as Redux from 'redux';

type Store<EE, SE, SN, SR> = {
  emit: (event: EE) => Store<EE, SE, SN, SR>,
  subscribe: (listener: SubscribeListener<SE>) => Unsubscribe,
  get: (name: SN) => SR,
  // we need to provide plain objects without any nesting in ideal
};

// create helpers-redux package, which will be converting helpers stores to redux stores

// we don't need `state` here
type SubscribeListener<E> = (event: E) => void;

type Unsubscribe = () => void;

type Event<N, P> = {
  name: N,
  payload?: P,
};

type ResponseMeta = {
  isFetching: boolean,
  lastUpdated?: number,
  error?: string,
};

type RequestMeta = {
  lastUpdated?: number,
};

type Config = FindifySDK.Config;

export {
  Store,
  Config,
  RequestMeta,
  ResponseMeta,
  Event,
  SubscribeListener,
  Unsubscribe,
};
