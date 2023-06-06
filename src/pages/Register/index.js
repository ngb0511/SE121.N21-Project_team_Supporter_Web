//Register page
import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import * as accountServices from '../../apiServices/accountServices';
import * as userServices from '../../apiServices/userServices';

const cx = classNames.bind(styles);
function handleSubmit(e) {
  e.preventDefault();
  console.log('You clicked submit.');
}
function Register() {
  //const [user, setUser] = useState();
  //Account mẫu
  var accountEx = {
    accountID: '0',
    email: '',
    password: '',
    permission: '',
    userID: '',
    verificationCode: '',
    isVerified: '',
  };
  var userEx = {
    userID: '0',
    surname: '',
    forename: '',
    gender: '',
    dateOfBirth: '',
    email: '',
    phoneNumber: '',
    idNumber: '',
    address: '',
    job: '',
    degree: '',
    experience: '',
    description: '',
  };
  //const user = { body: 'bar', tittle: 'foo' };

  //Hàm tạo user
  function createAccount() {
    const fetchApi = async () => {
      const accountResult = await accountServices.createAccount(accountEx);
      //setUser(userResult);
      console.log(accountResult);
      accountEx.accountID = accountResult;
      const userResult = await accountServices.updateVerificationCode(accountResult, accountEx);
      console.log(userResult);
    };
    fetchApi();
  }

  //Hàm tạo account
  /*  function createAccount() {
    const fetchApi = async () => {
      console.log(user);
      const accountResult = await accountServices.createAccount(accountEx);
      console.log(accountResult);
    };
    fetchApi();
  } */

  //event đăng kí
  function signUp() {
    if (document.getElementById('password').value !== document.getElementById('repass').value) {
      return;
    }
    const fetchApi = async () => {
      const userResult = await accountServices.checkExistedAccount(document.getElementById('email').value);
      //setUser(userResult);
      console.log(userResult[0].checkExist);

      if (userResult[0].checkExist === 0) {
        accountEx.email = document.getElementById('email').value;
        accountEx.password = document.getElementById('password').value;
        createAccount();
      } else {
        console.log('Tài khoản đã tồn tại');
      }
    };
    fetchApi();
  }

  function createUser() {
    accountEx.email = document.getElementById('email').value;
    userEx.email = document.getElementById('email').value;
    var code = document.getElementById('code').value;
    // console.log(accountEx);
    // console.log('email:' + accountEx.email);
    const fetchApi = async () => {
      // console.log(document.getElementById('code').value);
      console.log(accountEx);

      const userResult = await accountServices.checkVerificationCode(code, accountEx);

      console.log(userResult[0].checkVerificationCode);

      if (userResult[0].checkVerificationCode === 1) {
        const fetchApi = async () => {
          const userResult = await userServices.createUser(userEx);
          //setUser(userResult);
          console.log(userResult);
          accountEx.userID = userResult;
          const accountResult = await accountServices.updateVerifiedAccount(userResult, accountEx);
          console.log(accountResult);
        };
        fetchApi();
      }
    };
    fetchApi();

    /**var test = '';
    const fetchApi = async () => {
      console.log(accountEx.accountID);
      const code = await accountServices.getVerificationCode(accountEx.accountID);
      console.log(code[0].verificationCode);
      if (typeof code[0].verificationCode) {
        test = code[0].verificationCode;
        console.log(test);
      }
    };
    fetchApi();
    console.log(document.getElementById('confirm').value);
    if (test !== document.getElementById('confirm').value) console.log('false');
    else {
      const fetchApi = async () => {
        const userResult = await accountServices.createUser(userEx);
        //setUser(userResult);
        console.log(userResult);
        accountEx.userID = userResult;
        const accountResult = await accountServices.updateAccountOwner(userResult, accountEx);
        console.log(accountResult);
      };
      fetchApi();
    } */
  }
  return (
    <div className={cx('wrapper')}>
      <div className={cx('form-cointainer')}>
        <form className={cx('form')} onSubmit={handleSubmit} action="">
          <h1>Đăng ký</h1>
          <br></br>
          <label for="fname">Email:</label>
          <br></br>
          <input type="text" id="email" className={cx('input-text')}></input>
          <br></br>
          <label for="fname">Mật khẩu:</label>
          <br></br>
          <input type="password" id="password" className={cx('input-text')}></input>
          <br></br>
          <label for="fname">Nhập lại mật khẩu:</label>
          <br></br>
          <input type="password" id="repass" className={cx('input-text')}></input>
          <br></br>
          <label for="fname">Mã xác nhận:</label>
          <br></br>
          <input type="text" id="code" className={cx('input')}></input>
          <button className={cx('btn-confirm')} onClick={signUp}>
            Xác nhận
          </button>
          <div className={cx('register')}>
            Đã có tài khoản, đăng nhập <a href="Login">tại đây</a>
          </div>
          <button className={cx('btn')} onClick={createUser}>
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
