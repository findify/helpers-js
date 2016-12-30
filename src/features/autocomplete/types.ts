import * as FindifySDK from '@findify/findify-sdk';
import { Event as GenericEvent, ResponseMeta as Meta } from '../../generic/types';

type InputEvent = GenericEvent<'input', {
  query: string,
}>;
type RequestEvent = GenericEvent<'request', {
  itemsLimit?: number,
  suggestionsLimit?: number,
  user?: FindifySDK.User,
}>;
type ResponseSuccessEvent = GenericEvent<'responseSuccess', void>;
type ResponseFailureEvent = GenericEvent<'responseFailure', void>;

type Products = FindifySDK.Product[];
type Suggestions = FindifySDK.AutocompleteSuggestion[];
type Query = string;

type Event = (
  InputEvent |
  RequestEvent |
  ResponseSuccessEvent |
  ResponseFailureEvent
);

type StateName = (
  'products' |
  'suggestions' |
  'query' |
  'meta'
);

type StateResult = (
  Products |
  Suggestions |
  Query |
  Meta
);

export {
  InputEvent,
  RequestEvent,
  ResponseSuccessEvent,
  ResponseFailureEvent,
  StateName,
  StateResult,
};
