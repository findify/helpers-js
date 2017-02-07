import { takeLatest, delay } from 'redux-saga';
import { call, select, put } from 'redux-saga/effects';

import { getRequestData } from '../reducers';
import { actionTypes } from '../constants/actionTypes';
import { makeCallApiSaga } from '../../../generic/sagas';

import {
  responseSuccess,
  responseFailure,
} from '../actions';

const callApiSaga = makeCallApiSaga(responseSuccess, responseFailure);

function* requestSaga() {
  yield takeLatest(actionTypes.REQUEST, function*(action) {
    const sdk = action.service.sdk;
    const requestData = yield select(getRequestData);

    yield* callApiSaga(() => sdk.recommendations(action.payload.type, requestData));
  });
}

function* rootSaga() {
  yield [
    requestSaga(),
  ];
}

export {
  rootSaga,
}
