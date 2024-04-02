import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/action/authAction';

const LoginPage = () => {
  const dispatch = useDispatch();
  const data1 = {
    user: {
      email: 'admin3@admin.com',
      password: 'admin50509',
      role: 'admin',
    },
  };
  const data2 = {
    user: {
      email: 'admin@admin.com',
      password: 'admin50509',
      role: 'admin',
    },
  };
  const data3 = {
    user: {
      email: 'doctor3@doctor.com',
      password: '12345678',
      role: 'doctor',
    },
  };

  return (
    <div>
      <button onClick={() => dispatch(loginUser(data1, 'admin'))}>
        Login Success
      </button>
      <button onClick={() => dispatch(loginUser(data2, 'admin'))}>
        Login Invalid
      </button>
      <button onClick={() => dispatch(loginUser(data3, 'doctor'))}>
        Login Doctor
      </button>
    </div>
  );
};

export default LoginPage;
