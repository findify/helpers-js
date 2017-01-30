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
  type ResultsSetSortingEvent = {
    name: 'setSorting',
    payload: {
      field: string,
      order: string,
    },
  };
  type ResultsUnsetSortingEvent = {
    name: 'unsetSorting',
    payload: {
      field: string,
    },
  };
  type ResultsSetNestedListFacetEvent = {
    name: 'setNestedListFacet',
    payload: {
      name: string,
      value: string,
    },
  };
  type ResultsUnsetNestedListFacetEvent = {
    name: 'unsetNestedListFacet',
    payload: {
      name: string,
      value: string,
    },
  };
  type ResultsSetTextFacetEvent = {
    name: 'setTextFacetEvent',
    payload: {
      name: string,
      value: string,
    },
  };
  type ResultsUnsetTextFacetEvent = {
    name: 'unsetTextFacetEvent',
    payload: {
      name: string,
      value: string,
    },
  };
  type ResultsSetRangeFacetEvent = {
    name: 'setRangeFacetEvent',
    payload: {
      from?: number,
      to?: number,
    },
  };
  type ResultsUnsetRangeFacetEvent = {
    name: 'unsetRangeFacetEvent',
    payload: {
      from?: number,
      to?: number,
    },
  };
  type ResultsRequestEvent = {
    name: 'request',
    payload?: {
      limit?: number,
      user?: User,
    },
  };

  type SearchServerRequest = FindifySDK.SearchRequest;
  type SearchServerResponse = FindifySDK.SearchResponse;

  type SearchNextPageEvent = ResultsNextPageEvent;
  type SearchPrevPageEvent = ResultsPrevPageEvent;
  type SearchSetPageEvent = ResultsSetPageEvent;
  type SearchSetSortingEvent = ResultsSetSortingEvent;
  type SearchUnsetSortingEvent = ResultsUnsetSortingEvent;
  type SearchSetNestedListFacetEvent = ResultsSetNestedListFacetEvent;
  type SearchUnsetNestedListFacetEvent = ResultsUnsetNestedListFacetEvent;
  type SearchSetTextFacetEvent = ResultsSetTextFacetEvent;
  type SearchUnsetTextFacetEvent = ResultsUnsetTextFacetEvent;
  type SearchSetRangeFacetEvent = ResultsSetRangeFacetEvent;
  type SearchUnsetRangeFacetEvent = ResultsUnsetRangeFacetEvent;
  type SearchRequestEvent = ResultsRequestEvent;

  type SearchEmitEvent = (
    SearchNextPageEvent |
    SearchPrevPageEvent |
    SearchSetPageEvent |
    SearchSetSortingEvent |
    SearchUnsetSortingEvent |
    SearchSetNestedListFacetEvent |
    SearchUnsetNestedListFacetEvent |
    SearchSetTextFacetEvent |
    SearchUnsetTextFacetEvent |
    SearchSetRangeFacetEvent |
    SearchUnsetRangeFacetEvent |
    SearchRequestEvent
  );
  type SearchSubscribeEvent = (
    SearchEmitEvent |
    ResponseSuccessEvent |
    ResponseFailureEvent
  );

  type SearchSubscribeListener = (event: SearchSubscribeEvent) => void;
  type SearchStore = {
    emit(event: SearchEmitEvent): SearchStore,
    subscribe(listener: SearchSubscribeListener): Unsubscribe,
    get(name: 'request'): SearchServerRequest,
    get(name: 'response'): SearchServerResponse,
  };

  function createSearch(config: Config): SearchStore;
}
