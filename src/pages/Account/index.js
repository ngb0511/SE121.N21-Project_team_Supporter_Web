import classNames from 'classnames/bind';
import styles from './Account.module.scss';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
function Account() {
  const [user, setUser] = useState([]);

  const fetchData = () => {
    return fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => setUser(data));
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className={cx('wrapper')}>
      <div className={cx('inner')}>
        <div className={cx('cointainer')}>
          <h2>Danh sách tài khoản</h2>
          <table>
            <tr>
              <th>STT</th>
              <th>Tên</th>
              <th>Thao tác</th>
            </tr>
            {user &&
              user.length > 0 &&
              user.map((userObj, index) => (
                <tr key={userObj.id}>
                  <td>{userObj.id}</td>
                  <td>{userObj.name}</td>
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
  );
}

export default Account;
