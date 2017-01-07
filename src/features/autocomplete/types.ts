import * as FindifySDK from '@findify/findify-sdk';
import { Event as GenericEvent, ResponseMeta as MetaStateResult } from '../../generic/types';

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

type ProductsStateResult = FindifySDK.AutocompleteProduct[];
type SuggestionsStateResult = FindifySDK.AutocompleteSuggestion[];
type QueryStateResult = string;

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
  ProductsStateResult |
  SuggestionsStateResult |
  QueryStateResult |
  MetaStateResult
);

export {
  InputEvent,
  RequestEvent,
  ResponseSuccessEvent,
  ResponseFailureEvent,
  Event,
  StateName,
  StateResult,
};
