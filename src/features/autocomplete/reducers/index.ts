import * as FindifySDK from 'findify-sdk';

import { ResponseMeta, RequestMeta } from '../../../generic/types';

type ReduxState = {
  request: {
    meta: RequestMeta,
    data?: FindifySDK.AutocompleteRequest,
  },
  response: {
    meta: ResponseMeta,
    data?: FindifySDK.AutocompleteResponse,
  },
};
