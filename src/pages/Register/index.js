//Register page
import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import * as accountServices from '../../apiServices/accountServices';
import * as userServices from '../../apiServices/userServices';
import { useNavigate } from 'react-router-dom';
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
      const checkResult = await accountServices.checkCreatedAccount(document.getElementById('email').value);
      if (checkResult[0].checkExist === 0) {
        accountEx.email = document.getElementById('email').value;
        accountEx.password = document.getElementById('password').value;
        const accountResult = await accountServices.createAccount(accountEx);
        console.log(accountResult);
        accountEx.accountID = accountResult;
        const userResult = await accountServices.updateVerificationCode(accountResult, accountEx);
        console.log(userResult);
        alert('Đăng kí email thành công, vui lòng nhập mã');
        //createAccount();
      } else {
        const accountResult = await accountServices.getAccountSortedByEmail(document.getElementById('email').value);
        console.log(accountResult);
        accountEx.accountID = accountResult[0].accountID;
        const userResult = await accountServices.updateVerificationCode(accountEx.accountID, accountEx);
        console.log(userResult);
        alert('Vui lòng nhập mã');
        //console.log('Tài khoản đã tồn tại');
      }

      //setUser(userResult);
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
        alert('Đăng kí thành công');
      } else {
        console.log('Tài khoản đã tồn tại');
        alert('Tài khoản đã tồn tại');
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
  /*return (
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
  );*/
  const navigate = useNavigate();
  function handleChange(event) {
    //document.getElementById('form').action = 'Home';
    event.preventDefault();
    navigate('/Login');
  }
  function Send(event) {
    event.preventDefault();
  }
  return (
    <div className={cx('wrapper')}>
      <form>
        <h1>Sign up to hire talent</h1>
        <br></br>
        <label>Email:</label>
        <br></br>
        <input id="username"></input>
        <br></br>
        <label>Password:</label>
        <br></br>
        <input id="password"></input>
        <br></br>
        <label>Re-Password:</label>
        <br></br>
        <input id="rePassword"></input>
        <br></br>
        <label>Code:</label>
        <br></br>
        <div className={cx('code-cointainer')}>
          <input id="rePassword"></input>
          <button onClick={Send}>Send</button>
        </div>
        <br></br>
        <div className={cx('check-cointainer')}>
          <input type="checkbox"></input>
          <p>
            Yes, I understand and agree to the Upwork Terms of Service , including the User Agreement and Privacy Policy
          </p>
        </div>
        <br></br>
        <br></br>
        <button onClick={handleChange}>Create my account</button>
      </form>
      <br></br>

      <div className={cx('login')}>
        <p>
          <hr></hr>Already have account? <hr></hr>
        </p>
        <button>
          <a href="Login">Log In</a>
        </button>
      </div>
    </div>
  );
}

export default Register;
