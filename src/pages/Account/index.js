import classNames from 'classnames/bind';
import styles from './Account.module.scss';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import * as accountServices from '../../apiServices/accountServices';
const cx = classNames.bind(styles);

function Account() {
  const [user, setUser] = useState([]);
  var accountEx = {
    accountID: '0',
    email: '',
    password: '',
    permission: '',
    userID: '',
    verificationCode: '',
    isVerified: '',
  };
  useEffect(() => {
    const fetchApi = async () => {
      const result = await accountServices.getAllAdminAccounts();
      console.log(result);
      setUser(result);
    };
    fetchApi();
  }, []);

  /*return (
    <div className={cx('wrapper')}>
      <div className={cx('inner')}>
        <div className={cx('cointainer')}>
          <h2>Danh sách tài khoản</h2>
          <table>
            <tr>
              <th>Mã tài khoản</th>
              <th>Chủ tài khoản</th>
              <th>Quyền hạn</th>
              <th>Email</th>
              <th>Thao tác</th>
            </tr>
            {user &&
              user.length > 0 &&
              user.map((userObj, index) => (
                <tr key={userObj.id}>
                  <td>{userObj.accountID}</td>
                  <td>{userObj.user}</td>
                  <td>{userObj.permission}</td>
                  <td>{userObj.email}</td>
                  <td>
                    <button>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
          </table>
        </div>
      </div>
    </div>
  );*/

  function handleChange(event) {
    //document.getElementById('form').action = 'Home';
    event.preventDefault();
    //navigate('/Login');

    if (document.getElementById('password').value !== document.getElementById('rePassword').value) {
      alert('Nhap lai mk');
      return;
    }
    const fetchApi = async () => {
      const userResult = await accountServices.checkExistedAccount(document.getElementById('email').value);
      //setUser(userResult);
      console.log(userResult[0].checkExist);

      if (userResult[0].checkExist === 0) {
        accountEx.email = document.getElementById('email').value;
        accountEx.password = document.getElementById('password').value;
        const accountResult = await accountServices.createAdminAccount(accountEx);
        console.log(accountResult);
        alert('Đăng kí thành công');
        window.location.reload();
      } else {
        //console.log('Tài khoản đã tồn tại');
        alert('Tài khoản đã tồn tại');
      }
    };
    fetchApi();
  }

  function Delete(event, index) {
    console.log(index);
    const fetchApi = async () => {
      const result = await accountServices.deleteAccount(index);
      //setMajorList(result);
      console.log(result);
      alert('Xóa thành công');
      window.location.reload();
    };
    fetchApi();
  }

  return (
    <div className={cx('wrapper')}>
      <div className={cx('account-create')}>
        <form>
          <h1>Create Account</h1>
          <br></br>
          <label>Email:</label>
          <br></br>
          <input id="email"></input>
          <br></br>
          <label>Password:</label>
          <br></br>
          <input id="password"></input>
          <br></br>
          <label>Re-Password:</label>
          <br></br>
          <input id="rePassword"></input>

          <br></br>
          <br></br>
          <button onClick={handleChange}>Create account</button>
        </form>
      </div>
      <div className={cx('account-list')}>
        <h2>Account List</h2>
        <div className="wrapper-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Permission</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {user.map((option, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{option.email}</td>
                  <td>{option.permission}</td>
                  <td>
                    <button className={cx('delete')} onClick={(event) => Delete(event, option.accountID)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Account;
