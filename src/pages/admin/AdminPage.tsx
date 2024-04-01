import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/action/authAction';

const AdminPage = () => {
  const dispatch = useDispatch();
  const data = {
    user: {
      email: 'admin3@admin.com',
      password: 'admin50509',
      role: 'admin',
    },
  };

  return (
    <div>
      <button onClick={() => dispatch(loginUser(data))}>Login</button>
    </div>
  );
};

export default AdminPage;
