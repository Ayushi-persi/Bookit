import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { LOGIN, LOGIN_SAGA } from '../constant/authConstant';
import { LoginActionType } from '../types/authType';
import { SagaIterator } from 'redux-saga';

function* loginSaga(action: LoginActionType): SagaIterator {
  try {
    const response = yield call(
      axios.post,
      'https://psl-test2-b8593d29856b.herokuapp.com/api/v1/session',
      action.payload,
    );
    console.log('response', response.data.user);
    yield put({
      type: LOGIN_SAGA,
      token: response.data.user.authentication.token,
      role: response.data.user.role,
    });
  } catch (error) {
    console.error('Error fetching login details:', error);
  }
}

function* productSaga() {
  yield takeEvery(LOGIN, loginSaga);
}

export default productSaga;
