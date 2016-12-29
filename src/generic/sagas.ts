import { delay } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

function makeCallApiSaga(success, failure) {
  return function* callApiSaga(request, i = 0) {
    try {
      const response = yield call(request);
      yield put(success(response));
    } catch(err) {
      if (i < 2) {
        yield call(delay, 1000);
        yield* callApiSaga(request, i + 1);
      } else {
        yield put(failure(err.message || 'Something bad happened'));
      }
    }
  }
}

export {
  makeCallApiSaga,
}
