import { LOGIN, LOGOUT } from '../constant/authConstant';
import { ActionLoginDataType } from '../types/authType';

// export const registerUser = (data) => ({
//   type: REGISTER,
//   payload: data,
// });

export const loginUser = (data: ActionLoginDataType, user: string) => ({
  type: LOGIN,
  payload: data,
  user: user,
});

export const logoutUser = (token: string) => ({
  type: LOGOUT,
  token: token,
});
