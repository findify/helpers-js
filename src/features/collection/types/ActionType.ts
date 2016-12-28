import { ActionType as ResultsActionType } from '../../results/types';

type ActionType = ResultsActionType & (
  'fetch'
);

export {
  ActionType,
}
