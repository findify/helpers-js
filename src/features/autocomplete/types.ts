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

export {
  InputEvent,
  RequestEvent,
};
