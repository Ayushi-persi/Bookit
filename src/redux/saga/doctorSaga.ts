// import axios from 'axios';
// import { call, put, takeEvery } from 'redux-saga/effects';
// import {
//   ADD_QUALIFICATION,
//   ADD_QUALIFICATION_SAGA,
//   ADD_QUALIFICATION_SUCCESS,
// } from '../constant/doctorConstants';
// import { QualificationActionType } from '../types/doctorTypes';
// import { SagaIterator } from 'redux-saga';

// function* addQualification(action: QualificationActionType): SagaIterator {
//   try {
//     const response = yield call(
//       axios.post,
//       'https://psl-test2-b8593d29856b.herokuapp.com/api/v1/qualifications',
//       action.payload,
//       {
//         headers: {
//           Authorization: `Bearer ${action.token}`,
//         },
//       },
//     );
//     if(response.status=== true){
// yield put({
//   type: ADD_QUALIFICATION_SUCCESS,
//   token: '',
//   role: '',
// });
//     }

//   } catch (error) {
//     console.error('Error logging out :', error);
//   }
// }

// function* productSaga() {
//   yield takeEvery(ADD_QUALIFICATION, addQualification);
//   yield takeEvery(LOGOUT, logoutSaga);
// }

// export default productSaga;
