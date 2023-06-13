import classNames from 'classnames/bind';
import styles from './Account.module.scss';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import * as accountServices from '../../apiServices/accountServices';
const cx = classNames.bind(styles);

function Account() {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const result = await accountServices.account();
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
  }
  return (
    <div className={cx('wrapper')}>
      <div className={cx('account-create')}>
        <form>
          <h1>Create Account</h1>
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
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Password</th>
                <th>Tool</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Như Tâm</td>
                <td>18/09/2002</td>
                <td>18/09/2002</td>
                <td>18/09/2002</td>
                <td>
                  <button className={cx('delete')}>Delete</button>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Như Tâm</td>
                <td>18/09/2002</td>
                <td>18/09/2002</td>
                <td>18/09/2002</td>
                <td>
                  <button className={cx('delete')}>Delete</button>
                </td>
              </tr>{' '}
              <tr>
                <td>3</td>
                <td>Như Tâm</td>
                <td>18/09/2002</td>
                <td>18/09/2002</td>
                <td>18/09/2002</td>
                <td>
                  <button className={cx('delete')}>Delete</button>
                </td>
              </tr>
              <tr>
                <td>4</td>
                <td>Như Tâm</td>
                <td>18/09/2002</td>
                <td>18/09/2002</td>
                <td>18/09/2002</td>
                <td>
                  <button className={cx('delete')}>Delete</button>
                </td>
              </tr>
              <tr>
                <td>5</td>
                <td>Như Tâm</td>
                <td>18/09/2002</td>
                <td>18/09/2002</td>
                <td>18/09/2002</td>
                <td>
                  <button className={cx('delete')}>Delete</button>
                </td>
              </tr>
              <tr>
                <td>6</td>
                <td>Như Tâm</td>
                <td>18/09/2002</td>
                <td>18/09/2002</td>
                <td>18/09/2002</td>
                <td>
                  <button className={cx('delete')}>Delete</button>
                </td>
              </tr>
              <tr>
                <td>7</td>
                <td>Như Tâm</td>
                <td>18/09/2002</td>
                <td>18/09/2002</td>
                <td>18/09/2002</td>
                <td>
                  <button className={cx('delete')}>Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Account;
