import { ActionType as ResultsActionType } from '../../../generic/results/interfaces';

type ActionType = ResultsActionType & (
  'fetch'
);

export {
  ActionType,
}