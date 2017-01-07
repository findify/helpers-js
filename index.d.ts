import * as FindifySDK from '@findify/findify-sdk';

declare module "@findify/findify-helpers" {
  type Unsubscribe = () => void;

  type AutocompleteProductData = FindifySDK.Product;
  type AutocompleteSuggestionData = FindifySDK.AutocompleteSuggestion;
  type AutocompleteMetaData = {
    isFetching: boolean,
    lastUpdated?: number,
    error?: string,
  };

  type AutocompleteQueryStateResult = string;
  type AutocompleteProductsStateResult = AutocompleteProductData[];
  type AutocompleteSuggestionsStateResult = AutocompleteSuggestionData[];
  type AutocompleteMetaStateResult = AutocompleteMetaData;
  type AutocompleteStateResult = (
    AutocompleteProductsStateResult |
    AutocompleteSuggestionsStateResult |
    AutocompleteQueryStateResult |
    AutocompleteMetaStateResult
  );
  type AutocompleteStateName = (
    'products' |
    'suggestions' |
    'query' |
    'meta'
  );
  type AutocompleteInputEvent = {
    name: 'input',
    payload: {
      query: string,
    },
  };
  type AutocompleteRequestEvent = {
    name: 'request',
    payload?: {
      itemsLimit?: number,
      suggestionsLimit?: number,
      user?: FindifySDK.User,
    },
  };
  type AutocompleteResponseSuccessEvent = {
    name: 'responseSuccess',
  };
  type AutocompleteResponseFailureEvent = {
    name: 'responseFailure',
  };
  type AutocompleteEmitEvent = (
    AutocompleteInputEvent |
    AutocompleteRequestEvent
  );

  type AutocompleteSubscribeEvent = (
    AutocompleteInputEvent |
    AutocompleteRequestEvent |
    AutocompleteResponseSuccessEvent |
    AutocompleteResponseFailureEvent
  );
  type AutocompleteSubscribeListener = (event: AutocompleteSubscribeEvent) => void;
  type AutocompleteStore = {
    emit: (event: AutocompleteEmitEvent) => AutocompleteStore,
    subscribe: (listener: AutocompleteSubscribeListener) => Unsubscribe,
    get: (name: AutocompleteStateName) => AutocompleteStateResult,
  };

  function createAutocomplete(config: FindifySDK.Config): AutocompleteStore;
}
