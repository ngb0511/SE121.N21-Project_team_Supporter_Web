//Profile page
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk, faLink, faUpload } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import { useState, useEffect } from 'react';
import * as avatarServices from '../../apiServices/avatarServices';
import * as userServices from '../../apiServices/userServices';
import Confirm from '../../components/PopUp/Confirm';
import Successful from '../../components/PopUp/Successful';

const cx = classNames.bind(styles);

const email = '12345678 @gmail.com';
const about = 'Otaku for a long time, fan MU, vozer, Uiter, master ';
const arr = [
  { value: '', text: '--Chọn trình độ--' },
  { value: 'Cao đẳng', text: 'Cao đẳng' },
  { value: 'Đại học', text: 'Đại học' },
  { value: 'Tiến sĩ', text: 'Tiến sĩ' },
  { value: 'Thạc sĩ', text: 'Thạc sĩ' },
];

/*function getLevel() {
  var select = document.getElementById('level');
  var options = ['1', '2', '3', '4', '5'];

  for (var i = 0; i < options.length; i++) {
    var opt = options[i];

    var el = document.createElement('option');
    el.text = opt;
    el.value = opt;

    select.add(el);
  }
}*/

/*function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}
function formatDate(date = new Date()) {
  return [date.getFullYear(), padTo2Digits(date.getMonth() + 1), padTo2Digits(date.getDate())].join('-');
}*/

/*function previewFile() {
  const preview = document.getElementById('upload-img');
  const file = document.querySelector('input[type=file]').files[0];
  const reader = new FileReader();

  reader.addEventListener(
    'load',
    () => {
      // convert image file to base64 string
      preview.src = reader.result;
      console.log(preview.src);
    },
    false,
  );

  if (file) {
    reader.readAsDataURL(file);
  }
}*/
var user = {
  userID: '',
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
  avatar: '',
};

function Profile() {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [isConfirm, setIsConfirm] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [users, setUsers] = useState([]);
  var account = JSON.parse(sessionStorage.getItem('user'));
  var name = account.userName;
  /*const handleChange = (event) => {
    console.log(event.target.value);
  };*/

  //Khởi tạo biến user để lưu user

  //lấy user từ api
  useEffect(() => {
    const fetchApi = async () => {
      var account = JSON.parse(sessionStorage.getItem('account'));
      console.log(account);
      const result = await userServices.getUserByID(account.userID);
      console.log(result);
      setUsers(result);
    };
    fetchApi();
  }, []);

  const toggleConfirm = () => {
    setIsConfirm(!isConfirm);
  };

  const toggleSuccessful = () => {
    setIsSuccessful(!isSuccessful);
  };

  const confirm = () => {
    const fetchApi = async () => {
      user.id = 1;
      const result = await userServices.updateUser(1, user);
      console.log(result);
    };
    fetchApi();
    setIsConfirm(!isConfirm);
    setIsSuccessful(!isSuccessful);
  };

  function Update() {
    setIsConfirm(!isConfirm);
    user.surname = document.getElementById('surname').value;
    user.forename = document.getElementById('forename').value;
    user.gender = document.getElementById('gender').value;
    user.dateOfBirth = document.getElementById('dateOfBirth').value;
    user.email = document.getElementById('email').value;
    user.phoneNumber = document.getElementById('phoneNumber').value;
    user.idNumber = document.getElementById('idNumber').value;
    user.address = document.getElementById('address').value;
    user.job = document.getElementById('userJob').value;
    user.degree = document.getElementById('degree').value;
    user.experience = document.getElementById('experience').value;
    user.description = document.getElementById('description').value;
    console.log(user);
  }

  function upload(e) {
    //e.preventDefault()
    console.log(file);
    avatarServices.upload(1, file);
  }

  function handleChangeImg(e) {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));

    // console.log(file);
  }
  return (
    <div className={cx('wrapper')}>
      <div className={cx('header')}></div>
      <div className={cx('inner')}>
        <div className={cx('edit-inner')}>
          <div className={cx('general')}>
            <h2 className={cx('tittle')}>Thông tin cơ bản</h2>
            <ul className={cx('general-cointainer')}>
              <li className={cx('general-item')}>
                <h3 className={cx('tittle')}>Họ:</h3>
                {users.length > 0 ? (
                  <input id={cx('surname')} className={cx('general-input')} defaultValue={users[0].surname}></input>
                ) : (
                  <div></div>
                )}
              </li>
              <li className={cx('general-item')}>
                <h3 className={cx('tittle')}>Tên:</h3>
                {users.length > 0 ? (
                  <input id={cx('forename')} className={cx('general-input')} defaultValue={users[0].forename}></input>
                ) : (
                  <div></div>
                )}
              </li>
            </ul>
            <ul className={cx('general-cointainer')}>
              <li className={cx('general-item')}>
                <h3 className={cx('tittle')}>Giới tính:</h3>
                {users.length > 0 ? (
                  <select id={cx('gender')} className={cx('general-input')} defaultValue={users[0].gender}>
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
              <li className={cx('general-item')}>
                <h3 className={cx('tittle')}>Ngày sinh:</h3>
                {users.length > 0 ? (
                  <input
                    id={cx('dateOfBirth')}
                    className={cx('general-input')}
                    type="date"
                    defaultValue={users[0].dateOfBirth}
                  ></input>
                ) : (
                  <div></div>
                )}
              </li>
            </ul>
            <ul className={cx('general-cointainer')}>
              <li className={cx('general-item')}>
                <h3 className={cx('tittle')}>Email:</h3>
                {users.length > 0 ? (
                  <input id={cx('email')} className={cx('general-input')} defaultValue={users[0].email}></input>
                ) : (
                  <div></div>
                )}
              </li>
              <li className={cx('general-item')}>
                <h3 className={cx('tittle')}>Số điện thoại:</h3>
                {users.length > 0 ? (
                  <input
                    id={cx('phoneNumber')}
                    className={cx('general-input')}
                    defaultValue={users[0].phoneNumber}
                  ></input>
                ) : (
                  <div></div>
                )}
              </li>
            </ul>
            <ul className={cx('general-cointainer')}>
              <li className={cx('general-item')}>
                <h3 className={cx('tittle')}>CMND:</h3>
                {users.length > 0 ? (
                  <input id={cx('idNumber')} className={cx('general-input')} defaultValue={users[0].idNumber}></input>
                ) : (
                  <div></div>
                )}
              </li>
              <li className={cx('general-item')}>
                <h3 className={cx('tittle')}>Địa chỉ:</h3>
                {users.length > 0 ? (
                  <input id={cx('address')} className={cx('general-input')} defaultValue={users[0].address}></input>
                ) : (
                  <div></div>
                )}
              </li>
            </ul>
          </div>
          <div className={cx('job')}>
            <h2 className={cx('tittle')}>Chuyên môn</h2>
            <ul className={cx('job-cointainer')}>
              <li className={cx('job-item')}>
                <h3 className={cx('tittle')}>Trình độ:</h3>
                {users.length > 0 ? (
                  <select id={cx('degree')} className={cx('job-input')} defaultValue={users[0].degree}>
                    <option value="" disabled selected hidden>
                      Chọn trình độ
                    </option>
                    {arr.map((option, index) => (
                      <option key={index} value={option.value}>
                        {option.text}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div></div>
                )}
              </li>
              <li className={cx('job-item')}>
                <h3 className={cx('tittle')}>Chuyên ngành:</h3>
                {users.length > 0 ? (
                  <input id={cx('userJob')} className={cx('general-input')} defaultValue={users[0].job}></input>
                ) : (
                  <div></div>
                )}
              </li>
              <li className={cx('job-item')}>
                <h3 className={cx('tittle')}>Kinh nghiệm:</h3>
                {users.length > 0 ? (
                  <input id={cx('experience')} className={cx('job-input')} defaultValue={users[0].experience}></input>
                ) : (
                  <div></div>
                )}
              </li>
            </ul>
            <div className={cx('introduce')}>
              <h3 className={cx('tittle')}>Giới thiệu:</h3>
              {users.length > 0 ? (
                <textarea
                  id={cx('description')}
                  className={cx('introduce-input')}
                  cols="40"
                  rows="5"
                  defaultValue={users[0].description}
                ></textarea>
              ) : (
                <div></div>
              )}
            </div>
            <button className={cx('save-btn')} onClick={Update}>
              <FontAwesomeIcon icon={faFloppyDisk} />
              &nbsp;&nbsp;Save
            </button>
          </div>
        </div>
        <div className={cx('main-inner')}>
          <div className={cx('profile')}>
            <div className={cx('img-cointainer')}>
              <div className={cx('user-img')}></div>
              <h1 className={cx('user-profile')}>{name}</h1>
            </div>
            <div className={cx('text-cointainer')}>
              <h3 className={cx('user-profile')}>{email}</h3>
              <p className={cx('user-profile')}>{about}</p>
            </div>
            <div className={cx('action')}>
              <FontAwesomeIcon icon={faFacebook} />
              <FontAwesomeIcon icon={faTwitter} />
              <FontAwesomeIcon icon={faGithub} />
            </div>
          </div>
          <div className={cx('upload')}>
            <img id="upload-img" className={cx('upload-img')} src={image} alt="error"></img>
            <h2>Thay đổi ảnh đại diện</h2>
            <div className={cx('link-cointainer')}>
              <FontAwesomeIcon icon={faLink} />
              <input className={cx('upload-input')} type="file" onChange={handleChangeImg} />
            </div>

            <button className={cx('upload-btn')} onClick={upload}>
              <FontAwesomeIcon icon={faUpload} />
              &nbsp;&nbsp;Upload
            </button>
          </div>
        </div>
      </div>

      {isConfirm && <Confirm handleClose={toggleConfirm} handleConfirm={confirm} />}
      {isSuccessful && <Successful handleClose={toggleSuccessful} />}
    </div>
  );
}

export default Profile;
