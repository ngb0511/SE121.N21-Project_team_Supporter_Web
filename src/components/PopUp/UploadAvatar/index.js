import React from 'react';
import classNames from 'classnames/bind';
import styles from './UploadAvatar.module.scss';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk, faLink, faUpload } from '@fortawesome/free-solid-svg-icons';
import { faPersonCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import * as projectItemServices from '../../../apiServices/projectItemServices';
import * as avatarServices from '../../../apiServices/avatarServices';
import * as userServices from '../../../apiServices/userServices';
//import ProfilePop from '../ProfilePop';

//id lấy từ bảng là props.id
const cx = classNames.bind(styles);
const UploadFile = (props) => {
  const [users, setUsers] = useState([]);
  const [image, setImage] = useState(
    'https://static-00.iconduck.com/assets.00/avatar-default-symbolic-icon-512x488-rddkk3u9.png',
  );
  const [test, setTest] = useState(
    'https://t3.ftcdn.net/jpg/03/16/55/44/360_F_316554461_QQ1RVxQgIBIYRa3tq4Sm3Ss1mA7xXUoo.jpg',
  );
  const [file, setFile] = useState(null);
  var userEx = JSON.parse(sessionStorage.getItem('userLogin'));
  useEffect(() => {
    const fetchApi = async () => {
      var account = JSON.parse(sessionStorage.getItem('account'));
      console.log(account);
      const result = await userServices.getUserByID(userEx.userID);
      console.log(result);
      setUsers(result);
    };
    fetchApi();
  }, []);
  function upload(e) {
    //e.preventDefault()
    console.log(file);
    //avatarServices.upload(userEx.userID, file);
    avatarServices.upload(props.id, file);
    //window.location.reload();
  }

  function handleChangeImg(e) {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));
    console.log(image);

    // console.log(file);
  }

  function upload(e) {
    //e.preventDefault()
    if (file === null) {
      alert('Vui lòng chọn ảnh muốn upload');
    } else {
      console.log(file);
      //avatarServices.upload(userEx.userID, file);
      avatarServices.upload(userEx.userID, file);
      alert('Upload thành công');
      window.location.reload();
    }
  }

  function handleChangeImg(e) {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));
    console.log(image);

    // console.log(file);
  }
  return (
    <div className={cx('popup-box')}>
      <div className={cx('box')}>
        <span className={cx('close-icon')} onClick={props.handleClose}>
          x
        </span>
        {props.content}
        <div className={cx('content')}>
          <div className={cx('upload')}>
            <img id="upload-img" className={cx('upload-img')} src={image} alt="error"></img>
            <h2>Thay đổi ảnh đại diện</h2>
            <div className={cx('link-cointainer')}>
              <FontAwesomeIcon icon={faLink} />
              <input className={cx('upload-input')} type="file" onChange={handleChangeImg} />
            </div>

            <button className={cx('upload-btn')} onClick={upload}>
              <FontAwesomeIcon icon={faUpload} />
              &nbsp;Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadFile;
