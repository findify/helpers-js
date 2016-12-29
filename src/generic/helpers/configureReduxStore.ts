import * as createLogger from 'redux-logger';
import * as Redux from 'redux';
import createSagaMiddleware from 'redux-saga';

function configureReduxStore(rootReducer, rootSaga) {
  const logger = process.env.NODE_ENV === 'development' && typeof window !== 'undefined' && createLogger();
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [
    sagaMiddleware,
    logger,
  ].filter(Boolean);

  const store = Redux.createStore(
    rootReducer,
    undefined,
    Redux.applyMiddleware(...middlewares),
  );

  sagaMiddleware.run(rootSaga);

  return store;
}

export {
  configureReduxStore,
}
