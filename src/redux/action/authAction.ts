import { LOGIN } from '../constant/authConstant';
import { ActionLoginDataType } from '../types/authType';

// export const registerUser = (data) => ({
//   type: REGISTER,
//   payload: data,
// });

export const loginUser = (data: ActionLoginDataType) => ({
  type: LOGIN,
  payload: data,
});

// export const logout = () => ({
//   type: LOGOUT,
// });
