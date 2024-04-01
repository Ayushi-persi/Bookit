import { REGISTER, LOGOUT, LOGIN_SAGA } from '../constant/authConstant';
import { UserType } from '../types/authType';

const initialState = {
  token: '',
  role: '',
};

const authReducer = (state = initialState, action: UserType) => {
  switch (action.type) {
    case REGISTER:
      return {
        // ...state,
        // userData: [...state.userData, action.payload],
      };
    case LOGIN_SAGA:
      console.log('reducer', action);
      return {
        ...state,
        token: action.token,
        role: action.type,
      };
    case LOGOUT:
      return {
        // ...state,
        // isAuthenticated: false,
        // isAdmin: false,
      };
    default:
      return state;
  }
};

export default authReducer;
