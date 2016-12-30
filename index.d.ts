import * as Types from './src/generic/types';
import * as AutocompleteTypes from './src/features/autocomplete/types';
import * as Autocomplete from './src/features/autocomplete';

declare module "@findify/findify-helpers" {
  type Unsubscribe = Types.Unsubscribe;

  type AutocompleteStateResult = AutocompleteTypes.StateResult;
  type AutocompleteStateName = AutocompleteTypes.StateName;
  type AutocompleteStore = Autocomplete.Store;
  type AutocompleteSubscribeEvent = Autocomplete.SubscribeEvent;
  type AutocompleteEmitEvent = Autocomplete.EmitEvent;
  type AutocompleteSubscribeListener = Types.SubscribeListener<AutocompleteSubscribeEvent>;

  function createAutocomplete(config: Types.Config): AutocompleteStore;
}
