import classNames from 'classnames/bind';
import styles from './ChangePassword.module.scss';
import * as accountServices from '../../apiServices/accountServices';
import * as userServices from '../../apiServices/userServices';

const cx = classNames.bind(styles);

var user = JSON.parse(sessionStorage.getItem('userLogin'));
console.log(user);

var account = {
  accountID: '0',
  email: '',
  password: '',
  permission: '',
  userID: '',
  verificationCode: '',
  isVerified: '',
};

function handleChange(event) {
  event.preventDefault();

  const fetchApi = async () => {
    //console.log(document.getElementById('username').value);
    //console.log(user);
    const accountResult = await accountServices.getAccountSortedByUserID(user.userID);
    //console.log(accountResult[0]);
    account.accountID = accountResult[0].accountID;
    account.email = accountResult[0].email;
    account.password = document.getElementById('password').value;
    const passResult = await accountServices.checkAccount(account);
    //setUser(userResult);
    if (passResult === false) {
      alert('Mật khẩu hiện tại không đúng');
    } else {
      if (document.getElementById('password').value === document.getElementById('newPass').value) {
        alert('Mật khẩu mới không được trùng mật khẩu cũ');
      } else {
        if (document.getElementById('newPass').value !== document.getElementById('confirmPass').value) {
          alert('Vui lòng nhập đúng mật khẩu');
        } else {
          account.password = document.getElementById('newPass').value;
          const result = await accountServices.changePassword(account.accountID, account);
          console.log(result);
          alert('Đổi mật khẩu thành công');
          window.location.reload();
        }
      }
    }
  };
  fetchApi();
}

function ChangePassword() {
  const arr = [
    { value: '1', text: 'Your best friend' },
    { value: '2', text: 'Your pet' },
    { value: '3', text: 'Your waifu' },
    { value: '4', text: 'Hail Yuri' },
  ];
  return (
    <div className={cx('wrapper')}>
      <form>
        <h2>Add extra layers of security</h2>
        <span>
          You'll be prompted to enter your unique password when we need to verify your identity. So be sure to choose a
          password that only you will know.
        </span>
        <br></br>
        <label>Password:</label>
        <br></br>
        <input id="password"></input>
        <br></br>
        <label>New Password:</label>
        <br></br>
        <input id="newPass"></input>
        <br></br>
        <label>Confirm Password:</label>
        <br></br>
        <input id="confirmPass"></input>
        <br></br>
        <br></br>
        <div>
          <button className={cx('confirm')} onClick={handleChange}>
            Confirm
          </button>
          <button className={cx('cancel')}>Cancel</button>
        </div>
      </form>
      <br></br>
    </div>
  );
}

export default ChangePassword;
