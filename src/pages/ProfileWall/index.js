import { useParams } from 'react-router-dom';
import styles from './ProfileWall.module.scss';
import classNames from 'classnames/bind';
import * as projectServices from '../../apiServices/projectItemServices';
import * as accountServices from '../../apiServices/accountServices';
import * as avatarServices from '../../apiServices/avatarServices';
import * as userServices from '../../apiServices/userServices';
import React, { useState, useEffect } from 'react';
import Button from '../../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPenToSquare, faStar, faUser, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import EditProject from '../../components/PopUp/EditProject';
import AddTask from '../../components/PopUp/AddTask';
import EditTask from '../../components/PopUp/EditTask';
import AddMember from '../../components/PopUp/AddMember';
import Paginate from '../../components/Paginate';
import { useNavigate } from 'react-router-dom';
/*const data = [
  { name: 'Node js', detail: ' back-end JavaScript runtime environment' },
  { name: 'React js', detail: ' free and open-source front-end JavaScript library' },
  { name: 'Springboot', detail: 'application framework and inversion of control container for the Java platform' },
  { name: 'Springboot', detail: 'application framework and inversion of control container for the Java platform' },
  { name: 'Springboot', detail: 'application framework and inversion of control container for the Java platform' },
  { name: 'Springboot', detail: 'application framework and inversion of control container for the Java platform' },
  { name: 'Springboot', detail: 'application framework and inversion of control container for the Java platform' },
  { name: 'Springboot', detail: 'application framework and inversion of control container for the Java platform' },
  { name: 'Springboot', detail: 'application framework and inversion of control container for the Java platform' },
];*/
const cx = classNames.bind(styles);
/*        <h2>
          Project Details Page {id} - {JSON.stringify(project)}
        </h2> */

function ProfileWall() {
  //var userEx = JSON.parse(sessionStorage.getItem('userLogin'));

  const arr = [
    { value: '', text: '--Chọn trình độ--' },
    { value: 'Cao đẳng', text: 'Cao đẳng' },
    { value: 'Đại học', text: 'Đại học' },
    { value: 'Tiến sĩ', text: 'Tiến sĩ' },
    { value: 'Thạc sĩ', text: 'Thạc sĩ' },
  ];

  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [project, setproject] = useState([]);
  const [joinedNum, setJoinedNum] = useState();
  const [ownedNum, setOwnedNum] = useState();
  const [test, setTest] = useState(
    'https://t3.ftcdn.net/jpg/03/16/55/44/360_F_316554461_QQ1RVxQgIBIYRa3tq4Sm3Ss1mA7xXUoo.jpg',
  );
  const [link, setLink] = useState('http://localhost:3002/files/Bai1_2_TienXuLyDuLieu_Final-converted.pdf');
  const [active, setActive] = useState('1');
  // const handleClick = (event) => {
  //   setActive(event.target.id);
  // };

  useEffect(() => {
    const fetchApi = async () => {
      var newId = Number(id);
      const result = await projectServices.getAllJoinedProject(newId);
      setproject(result);
      const joinedResult = await projectServices.getNumberOfProjectsJoinedForUser(newId);
      //getNumberOfProjectsOwned
      //console.log(joinedResult[0].total);
      setJoinedNum(joinedResult[0].total);
      const ownedResult = await projectServices.getNumberOfProjectsOwned(newId);
      console.log(ownedResult[0].total);
      setOwnedNum(ownedResult[0].total);
    };
    fetchApi();
  }, []);

  useEffect(() => {
    // const fetchApi = async () => {
    //   var account = JSON.parse(sessionStorage.getItem('account'));
    //   console.log(account);
    //   var newId = Number(id);
    //   const result = await userServices.getUserByID(newId);
    //   console.log(result);
    //   setUsers(result);
    // };
    // fetchApi();

    const fetchApi = async () => {
      var account = JSON.parse(sessionStorage.getItem('account'));
      console.log(account);
      var newId = Number(id);
      const result = await userServices.getUserDetailByID(newId);
      if (result[0].majorID === null) {
        setUsers(result);
      } else {
        const userResult = await userServices.getUserByID(newId);
        setUsers(userResult);
      }
      //console.log(result);
    };
    fetchApi();
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      //var account = JSON.parse(sessionStorage.getItem('account'));
      var newId = Number(id);
      const avatar = await avatarServices.getAvatarSortedByUserID(newId);
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
      var newId = Number(id);
      const cv = await userServices.getCVSortedByUserID(newId);
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

  const handleClick = (event) => {
    setActive(event.target.id);

    const fetchApi = async () => {
      var newId = Number(id);
      //var userEx = JSON.parse(sessionStorage.getItem('userLogin'));
      console.log(event.target.id);
      if (event.target.id === '1') {
        const result = await projectServices.getAllJoinedProject(newId);
        console.log(event.target.id);
        setproject(result);
      } else if (event.target.id === '2') {
        const result = await projectServices.getFinishedProject(newId);
        console.log(result);
        setproject(result);
      } else if (event.target.id === '3') {
        const result = await projectServices.getUnfinishedProject(newId);
        console.log(result);
        setproject(result);
      } else if (event.target.id === '4') {
        const result = await projectServices.getOwnedProject(newId);
        console.log(result);
        setproject(result);
      }
      //var account = JSON.parse(sessionStorage.getItem('account'));
    };
    fetchApi();
  };

  useEffect(() => {
    const fetchApi = async () => {
      // var account = JSON.parse(sessionStorage.getItem('account'));
      // console.log(account);
      // const result = await userServices.getUserByID(newId);
      // console.log(result);
      // setUsers(result);
    };
    fetchApi();
  }, []);

  //var arr = [{ value: 'Java' }, { value: 'ReactJs' }, { value: 'NodeJs' }];
  const navigate = useNavigate();

  function Back() {
    navigate(-1);
  }

  return (
    <div className={cx('wrapper')}>
      <button className={cx('backBtn')} onClick={Back}>
        <FontAwesomeIcon icon={faArrowAltCircleLeft} /> &nbsp; Back
      </button>
      <div className={cx('profile-wrapper')}>
        <div className={cx('inner')}>
          <div className={cx('edit-inner')}>
            <div className={cx('general')}>
              <h2 className={cx('tittle')}>Thông tin cơ bản</h2>
              <ul className={cx('general-cointainer')}>
                <li className={cx('general-item')}>
                  <h4 className={cx('tittle')}>Họ:</h4>
                  {users.length > 0 ? (
                    <input
                      id={cx('surname')}
                      className={cx('general-input')}
                      defaultValue={users[0].surname}
                      disabled="1"
                    ></input>
                  ) : (
                    <input id={cx('surname')} className={cx('general-input')} disabled="1"></input>
                  )}
                </li>
                <li className={cx('general-item')}>
                  <h4 className={cx('tittle')}>Tên:</h4>
                  {users.length > 0 ? (
                    <input
                      id={cx('forename')}
                      className={cx('general-input')}
                      defaultValue={users[0].forename}
                      disabled="1"
                    ></input>
                  ) : (
                    <input id={cx('forename')} className={cx('general-input')} disabled="1"></input>
                  )}
                </li>
              </ul>
              <ul className={cx('general-cointainer')}>
                <li className={cx('general-item')}>
                  <h4 className={cx('tittle')}>Giới tính:</h4>
                  {users.length > 0 ? (
                    <input
                      id={cx('gender')}
                      className={cx('general-input')}
                      defaultValue={users[0].gender}
                      disabled="1"
                    ></input>
                  ) : (
                    <input id={cx('gender')} className={cx('general-input')} disabled="1"></input>
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
                      disabled="1"
                    ></input>
                  ) : (
                    <input id={cx('dateOfBirth')} className={cx('general-input')} type="date" disabled="1"></input>
                  )}
                </li>
              </ul>
              <ul className={cx('general-cointainer')}>
                <li className={cx('general-item')}>
                  <h4 className={cx('tittle')}>Email:</h4>
                  {users.length > 0 ? (
                    <input
                      id={cx('email')}
                      className={cx('general-input')}
                      defaultValue={users[0].email}
                      disabled="1"
                    ></input>
                  ) : (
                    <input id={cx('email')} className={cx('general-input')} disabled="1"></input>
                  )}
                </li>
                <li className={cx('general-item')}>
                  <h4 className={cx('tittle')}>Số điện thoại:</h4>
                  {users.length > 0 ? (
                    <input
                      id={cx('phoneNumber')}
                      className={cx('general-input')}
                      defaultValue={users[0].phoneNumber}
                      disabled="1"
                    ></input>
                  ) : (
                    <input id={cx('phoneNumber')} className={cx('general-input')} disabled="1"></input>
                  )}
                </li>
              </ul>
              <ul className={cx('general-cointainer')}>
                <li className={cx('general-item')}>
                  <h4 className={cx('tittle')}>CMND:</h4>
                  {users.length > 0 ? (
                    <input
                      id={cx('idNumber')}
                      className={cx('general-input')}
                      defaultValue={users[0].idNumber}
                      disabled="1"
                    ></input>
                  ) : (
                    <input id={cx('idNumber')} className={cx('general-input')} disabled="1"></input>
                  )}
                </li>
                <li className={cx('general-item')}>
                  <h4 className={cx('tittle')}>Địa chỉ:</h4>
                  {users.length > 0 ? (
                    <input
                      id={cx('address')}
                      className={cx('general-input')}
                      defaultValue={users[0].address}
                      disabled="1"
                    ></input>
                  ) : (
                    <input id={cx('address')} className={cx('general-input')} disabled="1"></input>
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
                    <select id={cx('degree')} className={cx('job-input')} defaultValue={users[0].degree} disabled="1">
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
                    <input
                      id={cx('userJob')}
                      className={cx('general-input')}
                      defaultValue={users[0].majorName}
                      disabled="1"
                    ></input>
                  ) : (
                    <input id={cx('userJob')} className={cx('general-input')} disabled="1"></input>
                  )}
                </li>
                <li className={cx('job-item')}>
                  <h4 className={cx('tittle')}>Số năm kinh nghiệm:</h4>
                  {users.length > 0 ? (
                    <input
                      id={cx('experience')}
                      className={cx('job-input')}
                      defaultValue={users[0].experience}
                      disabled="1"
                    ></input>
                  ) : (
                    <input id={cx('experience')} className={cx('job-input')} disabled="1"></input>
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
                    disabled="1"
                  ></textarea>
                ) : (
                  <textarea
                    id={cx('description')}
                    className={cx('introduce-input')}
                    cols="40"
                    rows="5"
                    disabled="1"
                  ></textarea>
                )}
              </div>
            </div>
          </div>
          <div className={cx('main-inner')}>
            <div className={cx('profile')}>
              <img className={cx('user-img')} src={test} alt="error"></img>
              <br></br>
              <a href={link} target="_blank" rel="noopener noreferrer">
                CV.pdf
              </a>
            </div>
            <div className={cx('stastics')}>
              <h4>
                Total projects joined: <p>{joinedNum} projects </p>
              </h4>
              <h4>
                Total projects owned: <p>{ownedNum} projects</p>
              </h4>

              <div className={cx('contact')}>
                <div>
                  <FontAwesomeIcon icon={faFacebook} />
                  <FontAwesomeIcon icon={faTwitter} />
                  <FontAwesomeIcon icon={faGithub} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={cx('project-wrapper')}>
        <div className={cx('project-cointainer')}>
          <div className={cx('work-list')}>
            <h2>Project Report</h2>
            <div className={cx('nav')}>
              <button key={1} className={active === '1' ? cx('active') : cx('nav-btn')} id={'1'} onClick={handleClick}>
                All
              </button>
              <button key={2} className={active === '2' ? cx('active') : cx('nav-btn')} id={'2'} onClick={handleClick}>
                Completed
              </button>
              <button key={3} className={active === '3' ? cx('active') : cx('nav-btn')} id={'3'} onClick={handleClick}>
                In Progress
              </button>
              <button key={4} className={active === '4' ? cx('active') : cx('nav-btn')} id={'4'} onClick={handleClick}>
                Owned
              </button>
            </div>
            <Paginate numItems={6} list={project} check={1} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileWall;
