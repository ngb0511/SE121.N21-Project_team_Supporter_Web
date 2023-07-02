//Profile page
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk, faCamera, faLink, faUpload } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import { useState, useEffect } from 'react';
import * as avatarServices from '../../apiServices/avatarServices';
import * as userServices from '../../apiServices/userServices';
import * as tagServices from '../../apiServices/tagServices';
import Confirm from '../../components/PopUp/Confirm';
import Successful from '../../components/PopUp/Successful';
import UploadFile from '../../components/PopUp/UploadAvatar';

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
  avatar: '',
  majorID: '',
  description: '',
  majorName: '',
};

function Profile() {
  const [file, setFile] = useState(null);
  const [major, setMajor] = useState([]);
  const [image, setImage] = useState(
    'https://static-00.iconduck.com/assets.00/avatar-default-symbolic-icon-512x488-rddkk3u9.png',
  );
  const [CV, setCV] = useState();
  const [isConfirm, setIsConfirm] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [users, setUsers] = useState([]);
  const [isUpload, setIsUpload] = useState(false);
  const [uId, setuId] = useState();
  const [test, setTest] = useState(
    'https://t3.ftcdn.net/jpg/03/16/55/44/360_F_316554461_QQ1RVxQgIBIYRa3tq4Sm3Ss1mA7xXUoo.jpg',
  );
  const [link, setLink] = useState('http://localhost:3002/files/Bai1_2_TienXuLyDuLieu_Final-converted.pdf');
  var userEx = JSON.parse(sessionStorage.getItem('userLogin'));
  //var account = JSON.parse(sessionStorage.getItem('user'));
  var name; //= account.userName;
  /*const handleChange = (event) => {
    console.log(event.target.value);
  };*/

  //Khởi tạo biến user để lưu user

  //lấy user từ api
  useEffect(() => {
    const fetchApi0 = async () => {
      // var account = JSON.parse(sessionStorage.getItem('account'));
      // console.log(account);
      //var fileArr = [];
      const majorResult = await tagServices.getAll();

      setMajor(majorResult);
    };
    fetchApi0();

    const fetchApi = async () => {
      var account = JSON.parse(sessionStorage.getItem('account'));
      console.log(account);
      const result = await userServices.getUserDetailByID(userEx.userID);
      if (result[0].majorID === null) {
        setUsers(result);
      } else {
        const userResult = await userServices.getUserByID(userEx.userID);
        setUsers(userResult);
      }
      //console.log(result);
    };
    fetchApi();
  }, []);

  // useEffect(() => {

  // }, []);

  const toggleConfirm = () => {
    setIsConfirm(!isConfirm);
  };

  const toggleSuccessful = () => {
    setIsSuccessful(!isSuccessful);

    window.location.reload();
  };

  const toggleUpload = (event, index) => {
    setuId(index);
    setIsUpload(!isUpload);
  };

  const confirm = () => {
    const fetchApi = async () => {
      var account = JSON.parse(sessionStorage.getItem('account'));
      const result = await userServices.updateUser(userEx.userID, user);

      sessionStorage.setItem('userLogin', JSON.stringify(user));
      console.log(user);
    };
    fetchApi();

    setIsConfirm(!isConfirm);
    // const fetchApi1 = async () => {
    //   const userLogin = await userServices.getUserDetailByID(userEx.userID);
    //   console.log(userLogin);
    //   user = userLogin[0];
    //   console.log(user);
    //   sessionStorage.setItem('userLogin', JSON.stringify(user));
    // };
    // fetchApi1();
    setIsSuccessful(!isSuccessful);

    //sessionStorage.setItem('userLogin', userEx);
  };

  function Update() {
    setIsConfirm(!isConfirm);
    user.userID = userEx.userID;
    user.surname = document.getElementById('surname').value;
    user.forename = document.getElementById('forename').value;
    user.gender = document.getElementById('gender').value;
    user.dateOfBirth = document.getElementById('dateOfBirth').value;
    user.email = document.getElementById('email').value;
    user.phoneNumber = document.getElementById('phoneNumber').value;
    user.idNumber = document.getElementById('idNumber').value;
    user.address = document.getElementById('address').value;
    user.majorID = document.getElementById('major').value;
    user.degree = document.getElementById('degree').value;
    user.experience = document.getElementById('experience').value;
    user.description = document.getElementById('description').value;
    user.job = '';
    console.log(user);

    // userEx.surname = document.getElementById('surname').value;
    // userEx.forename = document.getElementById('forename').value;
    // userEx.gender = document.getElementById('gender').value;
    // userEx.dateOfBirth = document.getElementById('dateOfBirth').value;
    // userEx.email = document.getElementById('email').value;
    // userEx.phoneNumber = document.getElementById('phoneNumber').value;
    // userEx.idNumber = document.getElementById('idNumber').value;
    // userEx.address = document.getElementById('address').value;
    // userEx.majorID = document.getElementById('major').value;
    // userEx.degree = document.getElementById('degree').value;
    // userEx.experience = document.getElementById('experience').value;
    // userEx.description = document.getElementById('description').value;
  }

  function upload(e) {
    //e.preventDefault()
    console.log(file);
    //avatarServices.upload(userEx.userID, file);
    avatarServices.upload(userEx.userID, file);
    window.location.reload();
  }

  function uploadCV(e) {
    //e.preventDefault()
    console.log(file);
    if (file === null) {
      alert('Vui lòng chọn file muốn upload');
    } else {
      userServices.uploadCV(userEx.userID, file);
      alert('Upload CV thành công');
      //window.local.reload();
      window.location.reload();
    }
    //avatarServices.upload(userEx.userID, file);
  }

  function reload() {
    //e.preventDefault()
    window.local.reload();
    //window.location.reload();
  }

  useEffect(() => {
    const fetchApi = async () => {
      //var account = JSON.parse(sessionStorage.getItem('account'));
      const avatar = await avatarServices.getAvatarSortedByUserID(userEx.userID);
      var path = avatar[0].avatar.toString().split('\\');
      var avatarName = 'http://localhost:3002/images/' + path[4];
      console.log(avatarName);
      setTest(avatarName);
      //document.getElementsByClassName('user-img').style.backgroundImage = "url('${avatarName}')";
      //console.log(e.target.files[0]);
      //setFile(avatarName);
      //setImage(URL.createObjectURL(avatarName));
    };
    fetchApi();
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      //var account = JSON.parse(sessionStorage.getItem('account'));
      const cv = await userServices.getCVSortedByUserID(userEx.userID);
      console.log(cv);
      var path = cv[0].CV.toString().split('\\');
      var cvLink = 'http://localhost:3002/files/' + path[4];
      console.log(cvLink);
      setLink(cvLink);
      //setTest(avatarName);
      //document.getElementsByClassName('user-img').style.backgroundImage = "url('${avatarName}')";
      //console.log(e.target.files[0]);
      //setFile(avatarName);
      //setImage(URL.createObjectURL(avatarName));
    };
    fetchApi();
  }, []);

  /*function checkImage() {
    const fetchApi = async () => {
      //var account = JSON.parse(sessionStorage.getItem('account'));
      const avatar = await avatarServices.getAvatarSortedByUserID(1);
      var path = avatar[0].avatarLink.toString().split('\\');
      var avatarName = 'http://localhost:3002/images/' + path[4];
      console.log(avatarName);
      //console.log(e.target.files[0]);
      //setImage(URL.createObjectURL(avatarName));

      document.getElementsByClassName('user-img').style.backgroundImage =
        'url(http://localhost:3002/images/877a9bc40150f7785e3eacfec9860af4.jpg)';
    };
    fetchApi();
  }*/

  function handleChangeImg(e) {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));
    console.log(image);

    // console.log(file);
  }

  function handleChangeCV(e) {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
    setCV(URL.createObjectURL(e.target.files[0]));
    console.log(CV);

    // console.log(file);
  }
  return (
    <div className={cx('wrapper')}>
      <div className={cx('inner')}>
        <div className={cx('edit-inner')}>
          <div className={cx('general')}>
            <h2 className={cx('tittle')}>Thông tin cơ bản</h2>
            <ul className={cx('general-cointainer')}>
              <li className={cx('general-item')}>
                <h4 className={cx('tittle')}>Họ:</h4>
                {users.length > 0 ? (
                  <input id={cx('surname')} className={cx('general-input')} defaultValue={users[0].surname}></input>
                ) : (
                  <input id={cx('surname')} className={cx('general-input')}></input>
                )}
              </li>
              <li className={cx('general-item')}>
                <h4 className={cx('tittle')}>Tên:</h4>
                {users.length > 0 ? (
                  <input id={cx('forename')} className={cx('general-input')} defaultValue={users[0].forename}></input>
                ) : (
                  <input id={cx('forename')} className={cx('general-input')}></input>
                )}
              </li>
            </ul>
            <ul className={cx('general-cointainer')}>
              <li className={cx('general-item')}>
                <h4 className={cx('tittle')}>Giới tính:</h4>
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
                <h4 className={cx('tittle')}>Ngày sinh:</h4>
                {users.length > 0 ? (
                  <input
                    id={cx('dateOfBirth')}
                    className={cx('general-input')}
                    type="date"
                    defaultValue={users[0].dateOfBirth}
                  ></input>
                ) : (
                  <input id={cx('dateOfBirth')} className={cx('general-input')} type="date"></input>
                )}
              </li>
            </ul>
            <ul className={cx('general-cointainer')}>
              <li className={cx('general-item')}>
                <h4 className={cx('tittle')}>Email:</h4>
                {users.length > 0 ? (
                  <input id={cx('email')} className={cx('general-input')} defaultValue={users[0].email}></input>
                ) : (
                  <input id={cx('email')} className={cx('general-input')}></input>
                )}
              </li>
              <li className={cx('general-item')}>
                <h4 className={cx('tittle')}>Số điện thoại:</h4>
                {users.length > 0 ? (
                  <input
                    id={cx('phoneNumber')}
                    className={cx('general-input')}
                    defaultValue={users[0].phoneNumber}
                  ></input>
                ) : (
                  <input id={cx('phoneNumber')} className={cx('general-input')}></input>
                )}
              </li>
            </ul>
            <ul className={cx('general-cointainer')}>
              <li className={cx('general-item')}>
                <h4 className={cx('tittle')}>CMND:</h4>
                {users.length > 0 ? (
                  <input id={cx('idNumber')} className={cx('general-input')} defaultValue={users[0].idNumber}></input>
                ) : (
                  <input id={cx('idNumber')} className={cx('general-input')}></input>
                )}
              </li>
              <li className={cx('general-item')}>
                <h4 className={cx('tittle')}>Địa chỉ:</h4>
                {users.length > 0 ? (
                  <input id={cx('address')} className={cx('general-input')} defaultValue={users[0].address}></input>
                ) : (
                  <input id={cx('address')} className={cx('general-input')}></input>
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
                <h4 className={cx('tittle')}>Chuyên ngành:</h4>
                {users.length > 0 ? (
                  <select id={cx('major')} className={cx('job-input')} defaultValue={users[0].majorID}>
                    <option value="" disabled selected hidden>
                      Chọn chuyên ngành
                    </option>
                    {major.map((option, index) => (
                      <option key={index} value={option.majorID}>
                        {option.majorName}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div></div>
                )}
              </li>
              <li className={cx('job-item')}>
                <h4 className={cx('tittle')}>Số năm kinh nghiệm:</h4>
                {users.length > 0 ? (
                  <input id={cx('experience')} className={cx('job-input')} defaultValue={users[0].experience}></input>
                ) : (
                  <input id={cx('experience')} className={cx('job-input')}></input>
                )}
              </li>
            </ul>
            <div className={cx('introduce')}>
              <h4 className={cx('tittle')}>Giới thiệu:</h4>
              {users.length > 0 ? (
                <textarea
                  id={cx('description')}
                  className={cx('introduce-input')}
                  cols="40"
                  rows="5"
                  defaultValue={users[0].description}
                ></textarea>
              ) : (
                <textarea id={cx('description')} className={cx('introduce-input')} cols="40" rows="5"></textarea>
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
            <div>
              <img className={cx('user-img')} src={test} alt="error"></img>
              <button className={cx('upload-img')} onClick={(event) => toggleUpload(event, users[0].userID)}>
                <FontAwesomeIcon icon={faCamera} />
              </button>
            </div>

            {users.length > 0 ? (
              <div>
                {' '}
                <h1 className={cx('user-profile')}>{users[0].forename}</h1>
                <h4 className={cx('user-profile')}>{users[0].email}</h4>
                <p className={cx('user-profile')}>{users[0].description}</p>
              </div>
            ) : (
              <div>
                {' '}
                <h1 className={cx('user-profile')}></h1>
                <h4 className={cx('user-profile')}></h4>
                <p className={cx('user-profile')}></p>
              </div>
            )}

            <div className={cx('cv-upload')}>
              <h2>CV đính kèm:</h2>
              <a href={link} target="_blank" rel="noopener noreferrer">
                cv.pdf
              </a>
              <div className={cx('link-cointainer')}>
                <FontAwesomeIcon icon={faLink} />
                <input className={cx('upload-input')} type="file" onChange={handleChangeCV} />
              </div>

              <button className={cx('upload-btn')} onClick={uploadCV}>
                <FontAwesomeIcon icon={faUpload} />
                &nbsp;&nbsp;Upload
              </button>
            </div>
          </div>
        </div>
      </div>

      {isConfirm && <Confirm handleClose={toggleConfirm} handleConfirm={confirm} />}
      {isSuccessful && <Successful handleClose={toggleSuccessful} />}
      {isUpload && <UploadFile handleClose={toggleUpload} id={uId} />}
    </div>
  );
}

export default Profile;
