//Profile page
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk, faLink, faUpload } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import { useState } from 'react';
import * as avatarServices from '../../apiServices/avatarServices';
import * as userServices from '../../apiServices/userServices';
import Confirm from '../../components/PopUp/Confirm';
import Successful from '../../components/PopUp/Successful';

const cx = classNames.bind(styles);
var account = JSON.parse(sessionStorage.getItem('user'));
var name = account.userName;
const email = '12345678 @gmail.com';
const about = 'Otaku for a long time, fan MU, vozer, Uiter, master ';
const arr = [
  { value: '', text: '--Chọn trình độ--' },
  { value: '', text: 'Cao đẳng' },
  { value: '', text: 'Đại học' },
  { value: '', text: 'Tiến sĩ' },
  { value: '', text: 'Thạc sĩ' },
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
function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function formatDate(date = new Date()) {
  return [date.getFullYear(), padTo2Digits(date.getMonth() + 1), padTo2Digits(date.getDate())].join('-');
}

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
  userFirstName: '',
  userName: '',
  gender: '',
  birthDay: '',
  email: '',
  phone: '',
  code: '',
  address: '',
  quality: '',
  specialized: '',
  expirence: '',
  decription: '',
};

function Profile() {
  const [file, setFile] = useState();
  const [isConfirm, setIsConfirm] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const handleChange = (event) => {
    console.log(event.target.value);
  };

  function upload() {
    avatarServices.upload(file);
  }

  function handleChangeImg(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  const toggleConfirm = () => {
    setIsConfirm(!isConfirm);
  };

  const toggleSuccessful = () => {
    setIsSuccessful(!isSuccessful);
  };

  const confirm = () => {
    const fetchApi = async () => {
      const result = await userServices.updateUser(1, user);
      console.log(result);
    };
    fetchApi();
    setIsConfirm(!isConfirm);
    setIsSuccessful(!isSuccessful);
  };

  function Update() {
    setIsConfirm(!isConfirm);
    user.userFirstName = document.getElementById('userFirstName').value;
    user.userName = document.getElementById('userName').value;
    user.gender = document.getElementById('userGender').value;
    user.birthDay = document.getElementById('birthDay').value;
    user.email = document.getElementById('email').value;
    user.phone = document.getElementById('phone').value;
    user.code = document.getElementById('code').value;
    user.address = document.getElementById('address').value;
    user.quality = document.getElementById('quality').value;
    user.specialized = document.getElementById('specialized').value;
    user.expirence = document.getElementById('expirence').value;
    user.decription = document.getElementById('decription').value;
    console.log(user);
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
                <input id={cx('userFirstName')} className={cx('general-input')} placeholder="Nguyễn Văn A"></input>
              </li>
              <li className={cx('general-item')}>
                <h3 className={cx('tittle')}>Tên:</h3>
                <input id={cx('userName')} className={cx('general-input')}></input>
              </li>
            </ul>
            <ul className={cx('general-cointainer')}>
              <li className={cx('general-item')}>
                <h3 className={cx('tittle')}>Giới tính:</h3>
                <select id={cx('userGender')} className={cx('general-input')}>
                  <option value="" disabled selected hidden>
                    Chọn giới tính
                  </option>
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                </select>
              </li>
              <li className={cx('general-item')}>
                <h3 className={cx('tittle')}>Ngày sinh:</h3>
                <input id={cx('birthDay')} value={formatDate()} type="date" className={cx('general-input')}></input>
              </li>
            </ul>
            <ul className={cx('general-cointainer')}>
              <li className={cx('general-item')}>
                <h3 className={cx('tittle')}>Email:</h3>
                <input id={cx('email')} value="" placeholder="Abc@gmai.com" className={cx('general-input')}></input>
              </li>
              <li className={cx('general-item')}>
                <h3 className={cx('tittle')}>Số điện thoại:</h3>
                <input id={cx('phone')} placeholder="12345678" className={cx('general-input')}></input>
              </li>
            </ul>
            <ul className={cx('general-cointainer')}>
              <li className={cx('general-item')}>
                <h3 className={cx('tittle')}>CMND:</h3>
                <input id={cx('code')} className={cx('general-input')}></input>
              </li>
              <li className={cx('general-item')}>
                <h3 className={cx('tittle')}>Địa chỉ:</h3>
                <input id={cx('address')} className={cx('general-input')}></input>
              </li>
            </ul>
          </div>
          <div className={cx('job')}>
            <h2 className={cx('tittle')}>Chuyên môn</h2>
            <ul className={cx('job-cointainer')}>
              <li className={cx('job-item')}>
                <h3 className={cx('tittle')}>Trình độ:</h3>
                <select id={cx('quality')} onChange={handleChange} className={cx('job-input')}>
                  <option value="" disabled selected hidden>
                    --Sắp xếp theo--
                  </option>
                  {arr.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.text}
                    </option>
                  ))}
                </select>
              </li>
              <li className={cx('job-item')}>
                <h3 className={cx('tittle')}>Chuyên ngành:</h3>
                <input id={cx('specialized')} className={cx('job-input')}></input>
              </li>
              <li className={cx('job-item')}>
                <h3 className={cx('tittle')}>Kinh nghiệm:</h3>
                <input id={cx('expirence')} className={cx('job-input')}></input>
              </li>
            </ul>
            <div className={cx('introduce')}>
              <h3 className={cx('tittle')}>Giới thiệu:</h3>
              <textarea id={cx('decription')} className={cx('introduce-input')} cols="40" rows="5"></textarea>
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
            <img id="upload-img" className={cx('upload-img')} src={file} alt="error"></img>
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
