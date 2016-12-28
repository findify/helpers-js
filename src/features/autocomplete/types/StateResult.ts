import * as FindifySDK from 'findify-sdk';

import { ResponseMeta } from '../../../generic/types';

type StateResult = (
  Products |
  Suggestions |
  Query |
  ResponseMeta
);

type Products = FindifySDK.Product[];
type Suggestions = FindifySDK.AutocompleteSuggestion[];

type Query = {
  value: string,
  id: string,
};

export {
  StateResult,
};
