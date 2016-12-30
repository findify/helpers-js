import { delay } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import { isExists } from './utils/isExists';
import { runSafe } from './utils/runSafe';

function makeCallApiSaga(success, failure) {
  return function* callApiSaga(request, i = 0) {
    try {
      const response = yield call(request);
      yield put(success(response));
    } catch (err) {
      if (i < 2 && isAxiosError(err)) {
        yield call(delay, 1000);
        yield* callApiSaga(request, i + 1);
      } else {
        yield put(failure(err.message || 'Something bad happened'));
      }
    }
  };
}

function isAxiosError(err: Error) {
  return isExists(runSafe(() => (err as any).config.method));
}

export {
  makeCallApiSaga,
}
