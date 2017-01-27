import * as FindifySDK from '@findify/findify-sdk';

declare module "@findify/findify-helpers" {
  type Config = FindifySDK.Config;
  type Unsubscribe = () => void;
  type User = FindifySDK.User;

  type ResponseSuccessEvent = {
    name: 'responseSuccess',
  };
  type ResponseFailureEvent = {
    name: 'responseFailure',
  };

  type AutocompleteServerRequest = FindifySDK.AutocompleteRequest;
  type AutocompleteServerResponse = FindifySDK.AutocompleteResponse;

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
      user?: User,
    },
  };
  type AutocompleteEmitEvent = (
    AutocompleteInputEvent |
    AutocompleteRequestEvent
  );

  type AutocompleteSubscribeEvent = (
    AutocompleteEmitEvent |
    ResponseSuccessEvent |
    ResponseFailureEvent
  );
  type AutocompleteSubscribeListener = (event: AutocompleteSubscribeEvent) => void;
  type AutocompleteStore = {
    emit: (event: AutocompleteEmitEvent) => AutocompleteStore,
    subscribe(listener: AutocompleteSubscribeListener): Unsubscribe,
    get(name: 'request'): AutocompleteServerRequest,
    get(name: 'response'): AutocompleteServerResponse,
  };

  function createAutocomplete(config: Config): AutocompleteStore;

  type ResultsNextPageEvent = {
    name: 'nextPage',
  };
  type ResultsPrevPageEvent = {
    name: 'prevPage',
  };
  type ResultsSetPageEvent = {
    name: 'setPage',
    payload: {
      page: number,
    },
  };
  type ResultsChangeSortingEvent = {
    name: 'changeSorting',
    payload: {
      field: string,
      order: string,
    },
  };
  type ResultsToggleNestedListFacetEvent = {
    name: 'toggleNestedListFacet',
    payload: {
      name: string,
      value: string,
    },
  };
  type ResultsToggleTextFacetEvent = {
    name: 'toggleTextFacetEvent',
    payload: {
      name: string,
      value: string,
    },
  };
  type ResultsToggleRangeFacetEvent = {
    name: 'toggleRangleFacetEvent',
    payload: {
      name: string,
      value: string,
    },
  };

  type SearchServerRequest = FindifySDK.SearchRequest;
  type SearchServerResponse = FindifySDK.SearchResponse;

  type SearchNextPageEvent = ResultsNextPageEvent;
  type SearchPrevPageEvent = ResultsPrevPageEvent;
  type SearchSetPageEvent = ResultsSetPageEvent;
  type SearchChangeSortingEvent = ResultsChangeSortingEvent;
  type SearchToggleNestedListFacetEvent = ResultsToggleNestedListFacetEvent;
  type SearchToggleTextFacetEvent = ResultsToggleTextFacetEvent;
  type SearchToggleRangeFacetEvent = ResultsToggleRangeFacetEvent;

  type SearchEmitEvent = (
    SearchNextPageEvent |
    SearchPrevPageEvent |
    SearchSetPageEvent |
    SearchChangeSortingEvent |
    SearchToggleNestedListFacetEvent |
    SearchToggleTextFacetEvent |
    SearchToggleRangeFacetEvent |
  );
  type SearchSubscribeEvent = (
    SearchEmitEvent |
    ResponseSuccessEvent |
    ResponseFailureEvent
  );

  type SearchSubscribeListener = (event: SearchSubscribeEvent) => void;
  type SearchStore = {
    emit: (event: SearchEmitEvent) => SearchStore,
    subscribe(listener: SearchSubscribeListener): Unsubscribe,
    get(name: 'request'): SearchServerRequest,
    get(name: 'response'): SearchServerResponse,
  };

  function createSearch(config: Config): SearchStore;
}
