import * as FindifySDK from '@findify/findify-sdk';

type InputEvent = {
  name: 'input',
  payload: {
    query: string,
  },
};
type RequestEvent = {
  name: 'request',
  payload: {
    itemsLimit?: number,
    suggestionsLimit?: number,
    user?: FindifySDK.User,
  },
};
type ResponseSuccessEvent = {
  name: 'responseSuccess',
};
type ResponseFailureEvent = {
  name: 'responseFailure',
};

type StateName = (
  'request' |
  'response' |
  'responseMeta'
);

export {
  InputEvent,
  RequestEvent,
  ResponseSuccessEvent,
  ResponseFailureEvent,
  StateName,
};
