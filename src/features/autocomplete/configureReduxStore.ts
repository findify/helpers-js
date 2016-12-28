import * as createLogger from 'redux-logger';
import * as redux from 'redux';

import { rootReducer } from './reducers';

function configureReduxStore() {
  const logger = process.env.NODE_ENV === 'development' && typeof window !== 'undefined' && createLogger(),
  // const sagaMiddleware = createSagaMiddleware();

  const middlewares = [
    // sagaMiddleware,
    logger,
  ].filter(Boolean);

  const store = redux.createStore(
    rootReducer,
    undefined,
    redux.applyMiddleware(...middlewares),
  );

  // sagaMiddleware.run(rootSaga);

  return store;
}

export {
  configureReduxStore,
}
