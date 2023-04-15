//Register page
import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import * as userServices from '../../apiServices/userServices';
import * as accountServices from '../../apiServices/accountServices';

const cx = classNames.bind(styles);
function handleSubmit(e) {
  e.preventDefault();
  console.log('You clicked submit.');
}
function Register() {
  //const [user, setUser] = useState([]);

  //Account mẫu
  const account = { account: 'bar', password: 'foo', userId: '' };
  const user = { body: 'bar', tittle: 'foo' };

  //Hàm tạo user
  function createUser() {
    const fetchApi = async () => {
      const userResult = await userServices.createUser(user);
      console.log(userResult.id);
      account.userId = userResult.id;
    };
    fetchApi();
  }

  //Hàm tạo account
  function createAccount() {
    const fetchApi = async () => {
      const accountResult = await accountServices.createAccount(account);
      console.log(accountResult);
    };
    fetchApi();
  }

  //event đăng kí
  function signUp() {
    if (document.getElementById('password').value !== document.getElementById('repass').value) {
      return;
    }
    user.userid = document.getElementById('account').value;
    user.userid = document.getElementById('email').value;
    user.userid = document.getElementById('password').value;
    createUser();
    createAccount();
  }
  return (
    <div className={cx('wrapper')}>
      <div className={cx('form-cointainer')}>
        <form className={cx('form')} onSubmit={handleSubmit} action="">
          <h1>Đăng ký</h1>
          <br></br>
          <label for="fname">Tên đăng nhập:</label>
          <br></br>
          <input type="text" id="account" className={cx('input')}></input>
          <br></br>
          <label for="fname">Email:</label>
          <br></br>
          <input type="text" id="email" className={cx('input')}></input>
          <br></br>
          <label for="fname">Mật khẩu:</label>
          <br></br>
          <input type="password" id="password" className={cx('input')}></input>
          <br></br>
          <label for="fname">Nhập lại mật khẩu:</label>
          <br></br>
          <input type="password" id="repass" className={cx('input')}></input>
          <div className={cx('register')}>
            Đã có tài khoản, đăng nhập <a href="Login">tại đây</a>
          </div>
          <button className={cx('btn')} onClick={signUp}>
            Đăng ký
          </button>
        </form>
      </div>
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
    </div>
  );
}

export default Register;
