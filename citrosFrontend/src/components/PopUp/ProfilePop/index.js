import React from 'react';
import classNames from 'classnames/bind';
import styles from './ProfilePop.module.scss';

import * as userServices from '../../../apiServices/userServices';
import { useState, useEffect } from 'react';

const cx = classNames.bind(styles);
const ProfilePop = (props) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const result = await userServices.getUserByID(props.id);
      console.log(result);
      setUsers(result);
    };
    fetchApi();
  }, []);
  return (
    <div className={cx('popup-box')}>
      <div className={cx('box')}>
        <span className={cx('close-icon')} onClick={props.handleClose}>
          x
        </span>
        {props.content}
        <div className={cx('content')}>
          <div className={cx('general')}>
            <h2 className={cx('tittle')}>Thông tin cơ bản</h2>
            <ul className={cx('general-cointainer')}>
              <li className={cx('general-item')}>
                <h3 className={cx('tittle')}>Họ và tên:</h3>
                {users.length > 0 ? (
                  <input
                    disabled
                    id={cx('fulName')}
                    className={cx('general-input')}
                    defaultValue={users[0].fullName}
                  ></input>
                ) : (
                  <div></div>
                )}
              </li>
              <li className={cx('general-item')}>
                <h3 className={cx('tittle')}>Giới tính:</h3>
                {users.length > 0 ? (
                  <select disabled id={cx('gender')} className={cx('general-input')} defaultValue={users[0].gender}>
                    <option value="" disabled selected hidden>
                      Chọn giới tính
                    </option>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                  </select>
                ) : (
                  <div></div>
                )}
              </li>
            </ul>
            <ul className={cx('general-cointainer')}>
              <li className={cx('general-item')}>
                <h3 className={cx('tittle')}>Ngày sinh:</h3>
                {users.length > 0 ? (
                  <input
                    disabled
                    id={cx('dateOfBirth')}
                    className={cx('general-input')}
                    type="date"
                    defaultValue={users[0].dateOfBirth}
                  ></input>
                ) : (
                  <div></div>
                )}
              </li>
              <li className={cx('general-item')}>
                <h3 className={cx('tittle')}>Email:</h3>
                {users.length > 0 ? (
                  <input
                    disabled
                    id={cx('email')}
                    className={cx('general-input')}
                    defaultValue={users[0].email}
                  ></input>
                ) : (
                  <div></div>
                )}
              </li>
            </ul>
            <ul className={cx('general-cointainer')}>
              <li className={cx('general-item')}>
                <h3 className={cx('tittle')}>Số điện thoại:</h3>
                {users.length > 0 ? (
                  <input
                    disabled
                    id={cx('phoneNumber')}
                    className={cx('general-input')}
                    defaultValue={users[0].phoneNumber}
                  ></input>
                ) : (
                  <div></div>
                )}
              </li>
              <li className={cx('general-item')}>
                <h3 className={cx('tittle')}>Trình độ:</h3>
                {users.length > 0 ? (
                  <input
                    disabled
                    id={cx('degree')}
                    className={cx('general-input')}
                    defaultValue={users[0].degree}
                  ></input>
                ) : (
                  <div></div>
                )}
              </li>
            </ul>
            <ul className={cx('general-cointainer')}>
              <li className={cx('general-item')}>
                <h3 className={cx('tittle')}>Công việc:</h3>
                {users.length > 0 ? (
                  <input
                    disabled
                    id={cx('idNumber')}
                    className={cx('general-input')}
                    defaultValue={users[0].job}
                  ></input>
                ) : (
                  <div></div>
                )}
              </li>
              <li className={cx('general-item')}>
                <h3 className={cx('tittle')}>Số năm kinh nghiệm:</h3>
                {users.length > 0 ? (
                  <input
                    disabled
                    id={cx('experience')}
                    className={cx('general-input')}
                    defaultValue={users[0].experience}
                  ></input>
                ) : (
                  <div></div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePop;
