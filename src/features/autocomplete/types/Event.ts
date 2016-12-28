import { Event } from '../../../generic/types';

type InputEvent = Event<'input', {
  query: string,
}>

type RequestEvent = Event<'request', {
  itemsLimit?: number,
  suggestionsLimit?: number,
}>

type ResponseSuccessEvent = Event<'responseSuccess', void>
type ResponseFailureEvent = Event<'responseFailure', void>

export {
  InputEvent,
  RequestEvent,
  ResponseSuccessEvent,
  ResponseFailureEvent,
};
