import * as FindifySDK from 'findify-sdk';

type Store<EE, SE, S> = {
  emit: (event: EE) => Store<EE, SE, S>,
  subscribe: (listener: SubscribeListener<SE, S>) => Unsubscribe,
}

type SubscribeListener<E, S> = (event: E, state: S) => void;

type Unsubscribe = () => void;

type Event<N, P> = {
  name: N,
  payload?: P,
}

type State<N, R> = {
  // we need to provide plain objects without any nesting in ideal
  get: (name: N) => R,
}

type ResponseMeta = {
  isFetching: boolean,
  lastUpdated?: number,
  error?: string,
}

type RequestMeta = {
  lastUpdated?: number,
}

type Config = FindifySDK.Config;

export {
  Store,
  Config,
  RequestMeta,
  ResponseMeta,
  Event,
  State,
  SubscribeListener,
}
