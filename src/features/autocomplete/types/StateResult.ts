import * as FindifySDK from '@findify/findify-sdk';

import { ResponseMeta as Meta } from '../../../generic/types';

type StateResult = (
  Products |
  Suggestions |
  Query |
  Meta
);

type Products = FindifySDK.Product[];
type Suggestions = FindifySDK.AutocompleteSuggestion[];

type Query = string;

export {
  StateResult,
};
