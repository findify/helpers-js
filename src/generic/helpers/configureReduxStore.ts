import * as Redux from 'redux';
import createSagaMiddleware from 'redux-saga';

function configureReduxStore(rootReducer, rootSaga) {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [
    sagaMiddleware,
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
