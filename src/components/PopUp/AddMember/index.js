import React from 'react';
import classNames from 'classnames/bind';
import styles from './AddMember.module.scss';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonCirclePlus } from '@fortawesome/free-solid-svg-icons';
import * as userServices from '../../../apiServices/userServices';
import Confirm from '../Confirm';
import Successful from '../Successful';
import Error from '../Error';
import { useState, useEffect } from 'react';

const cx = classNames.bind(styles);
const AddMember = (props) => {
  const [selectedOptions, setSelectedOptions] = useState();
  const [userList, setUserList] = useState([]);
  const [user, setUser] = useState();
  useEffect(() => {
    const fetchApi = async () => {
      const result = await userServices.getUser();
      setUserList(result);
    };
    fetchApi();
  }, []);

  // Function triggered on selection
  function handleSelect(data) {
    setSelectedOptions(data);
    console.log(data.id);
    setUser(data);
  }

  function Add() {
    if (selectedOptions != null) {
      setIsConfirm(!isConfirm);
    } else setIsError(!isError);
  }

  const [isConfirm, setIsConfirm] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isError, setIsError] = useState(false);
  const toggleConfirm = () => {
    setIsConfirm(!isConfirm);
  };

  const toggleSuccessful = () => {
    setIsSuccessful(!isSuccessful);
  };

  const toggleError = () => {
    setIsError(!isError);
  };

  const confirm = () => {
    const fetchApi = async () => {
      const result = await userServices.updateUser(user.id, user);
      console.log(result);
    };
    fetchApi();
    setIsConfirm(!isConfirm);
    setIsSuccessful(!isSuccessful);
  };

  return (
    <div className={cx('popup-box')}>
      <div className={cx('box')}>
        <span className={cx('close-icon')} onClick={props.handleClose}>
          x
        </span>
        {props.content}
        <div className={cx('content')}>
          <div className={cx('icon-container')}>
            <FontAwesomeIcon icon={faPersonCirclePlus} />
          </div>
          <div className={cx('dropdown-container')}>
            <Select
              placeholder="Chọn người dùng"
              options={userList}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.name}
              value={selectedOptions}
              onChange={handleSelect}
              isSearchable={true}
              maxMenuHeight={100}
            />
          </div>
          <div>
            <button id={cx('confirm')} onClick={Add}>
              Đồng ý
            </button>
            <button id={cx('cancel')} onClick={props.handleClose}>
              Hủy bỏ
            </button>
          </div>
        </div>
      </div>
      {isConfirm && <Confirm handleClose={toggleConfirm} handleConfirm={confirm} />}
      {isSuccessful && <Successful handleClose={toggleSuccessful} />}
      {isError && <Error handleClose={toggleError} />}
    </div>
  );
};

export default AddMember;
