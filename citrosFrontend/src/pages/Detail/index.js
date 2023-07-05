import styles from './Detail.scss';
import classNames from 'classnames/bind';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faClock } from '@fortawesome/free-solid-svg-icons';
import * as accountServices from '../../apiServices/accountServices';
import React, { useState, useEffect } from 'react';
const data = [
  { name: 'Node js', detail: ' back-end JavaScript runtime environment' },
  { name: 'React js', detail: ' free and open-source front-end JavaScript library' },
  { name: 'Springboot', detail: 'application framework and inversion of control container for the Java platform' },
  { name: 'Springboot', detail: 'application framework and inversion of control container for the Java platform' },
  { name: 'Springboot', detail: 'application framework and inversion of control container for the Java platform' },
  { name: 'Springboot', detail: 'application framework and inversion of control container for the Java platform' },
  { name: 'Springboot', detail: 'application framework and inversion of control container for the Java platform' },
  { name: 'Springboot', detail: 'application framework and inversion of control container for the Java platform' },
  { name: 'Springboot', detail: 'application framework and inversion of control container for the Java platform' },
  { name: 'Springboot', detail: 'application framework and inversion of control container for the Java platform' },
];

const cx = classNames.bind(styles);
function Detail() {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const result = await accountServices.account();
      console.log(result);
      setUser(result);
    };
    fetchApi();
  }, []);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('header')}>
        <h2>Dự án</h2>
      </div>
      <div className={cx('context')}>
        <ul>
          <li className={cx('context-work')}>
            <h2>Bảng công việc</h2>
            <table>
              <tr>
                <th id={cx('stt')}>STT</th>
                <th id={cx('name')}>Công việc</th>
                <th id={cx('date')}>Ngày bắt đầu</th>
                <th id={cx('member')}>Phân công</th>
                <th id={cx('status')}>Trạng thái</th>
                <th id={cx('progress')}>Tiến độ</th>
                <th id={cx('update')}>Cập nhật</th>
              </tr>
              {data.map((val, key) => {
                return (
                  <tr key={key}>
                    <td>{key + 1}</td>
                    <td>{val.detail}</td>
                    <td>{val.name}</td>

                    <td>
                      <button></button>
                    </td>
                    <td>
                      <button></button>
                    </td>
                    <td>
                      <button></button>
                    </td>
                    <td>
                      <button></button>
                    </td>
                  </tr>
                );
              })}
            </table>
          </li>
          <li className={cx('context-member')}>
            <h2>Bảng công việc</h2>
            <table>
              <tr>
                <th id={cx('stt')}>STT</th>
                <th id={cx('name')}>Họ tên</th>
                <th id={cx('date')}>Vai trò</th>
              </tr>
              {(user.length > 0 &&
                user.map((val, key) => {
                  return (
                    <tr key={key}>
                      <td>{key + 1}</td>
                      <td>{val.username}</td>
                      <td>{val.name}</td>
                    </tr>
                  );
                })) || <span>No data available</span>}
            </table>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Detail;
