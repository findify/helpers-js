import * as FindifySDK from '@findify/findify-sdk';

declare module "@findify/findify-helpers" {
  type Config = FindifySDK.Config;
  type Unsubscribe = () => void;
  type User = FindifySDK.User;

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
    subscribe(listener: AutocompleteSubscribeListener): Unsubscribe,
    get(name: 'request'): AutocompleteServerRequest,
    get(name: 'response'): AutocompleteServerResponse,
  };

  function createAutocomplete(config: Config): AutocompleteStore;
}
