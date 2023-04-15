//Login page
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import Button from '../../components/Button';

const cx = classNames.bind(styles);
var user = { userName: 'admin', password: '12345' };
function handleChange() {
  /*const username = document.getElementById('username');
  const password = document.getElementById('password');
  if (username.value === 'admin' && password.value === '1') {
    document.getElementById('form').action = 'Home';
  }*/
  user.userName = document.getElementById('username').value;
  user.password = document.getElementById('password').value;
  sessionStorage.setItem('user', JSON.stringify(user));
  document.getElementById('form').action = 'Home';
}
function Login() {
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
        <form className={cx('form')} id="form" action="">
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
    </div>
  );
}

export default Login;
