//Login page
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import Button from '../../components/Button';
import * as accountServices from '../../apiServices/accountServices';
import { useState } from 'react';
import Successful from '../../components/PopUp/Successful';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);
var user = { userName: 'admin', password: '12345' };
var account = {
  accountID: '0',
  email: '',
  password: '',
  permission: '',
  userID: '',
  verificationCode: '',
  isVerified: '',
};
function Login() {
  const [isSuccessful, setIsSuccessful] = useState(false);
  const navigate = useNavigate();
  const toggleSuccessful = () => {
    setIsSuccessful(!isSuccessful);
  };
  function handleChange(event) {
    //document.getElementById('form').action = 'Home';

    event.preventDefault();

    /*const username = document.getElementById('username');
    const password = document.getElementById('password');
    if (username.value === 'admin' && password.value === '1') {
      document.getElementById('form').action = 'Home';
    }*/
    /*   user.userName = document.getElementById('username').value;
    user.password = document.getElementById('password').value;*/
    if (document.getElementById('password').value === '' || document.getElementById('username').value === '') {
      return;
    }
    const fetchApi = async () => {
      console.log(document.getElementById('username').value);
      const userResult = await accountServices.checkExistedAccount(document.getElementById('username').value);

      //setUser(userResult);
      if (userResult[0].checkExist === 1) {
        user.userName = document.getElementById('username').value;
        user.password = document.getElementById('password').value;
        account.email = document.getElementById('username').value;
        account.password = document.getElementById('password').value;
        const passResult = await accountServices.checkAccount(account);
        if (passResult === true) {
          const email = await accountServices.getAccountSortedByEmail(user.userName);
          console.log(email[0].user);
          user.userName = email[0].user;
          account = email[0];
          console.log(account);
          sessionStorage.setItem('user', JSON.stringify(user));
          sessionStorage.setItem('account', JSON.stringify(account));
          navigate('/Home');
        } else {
          setIsSuccessful(!isSuccessful);
        }
      } else {
        console.log('Tài khoản eo tồn tại');
      }
    };
    fetchApi();
  }
  return (
    <div className={cx('wrapper')}>
      <div className={cx('text-cointainer')}>
        <div className={cx('text')}>
          <h1>Chào mừng tới website C i t r o s</h1>
          <h3>Website hỗ trợ tìm kiếm dự án nhanh chóng </h3>
          <br></br>
          <p>
            彼女は固まった体をほぐすように目を閉じ、ユフィの情熱的なキスを受け入れた。
            そして、情熱的なキスがピタリと止まった。 「アニス」 その優しい声が僕の名前を呼んだ。 「もう我慢できない」
            ユフィの息遣いは、私を火傷するほど熱く、情熱的な欲望を運んでいた。
          </p>
        </div>
      </div>
      <div className={cx('form-cointainer')}>
        <form className={cx('form')} id="form">
          <h1>Đăng nhập</h1>
          <br></br>
          <label for="fname">Tên đăng nhập:</label>
          <br></br>
          <input type="text" id="username" className={cx('input')}></input>
          <br></br>
          <label for="fname">Mật khẩu:</label>
          <br></br>
          <input type="password" id="password" className={cx('input')}></input>
          <div className={cx('register')}>
            Chưa có tài khoản, đăng kí <a href="Register">tại đây</a>
          </div>
          <Button id="btn" login onClick={handleChange}>
            Đăng nhập
          </Button>
        </form>
      </div>
      {isSuccessful && <Successful handleClose={toggleSuccessful} />}
    </div>
  );
}

export default Login;
