import { useParams } from 'react-router-dom';
import styles from './ProjectView.module.scss';
import classNames from 'classnames/bind';
import * as projectServices from '../../apiServices/projectItemServices';
//import * as accountServices from '../../apiServices/accountServices';
//import * as taskServices from '../../apiServices/taskServices';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//import Button from '../../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft, faTemperatureEmpty } from '@fortawesome/free-solid-svg-icons';
import Heart from 'react-animated-heart';
//import EditProject from '../../components/PopUp/EditProject';
//import AddTask from '../../components/PopUp/AddTask';
//import EditTask from '../../components/PopUp/EditTask';
//import AddMember from '../../components/PopUp/AddMember';

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

function ProjectView() {
  const { id } = useParams();
  const [project, setProject] = useState([]);
  const [major, setMajor] = useState([]);
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();

  function Back() {
    navigate(-1);
  }
  useEffect(() => {
    const fetchApi = async () => {
      //const regis_result = await projectItemServices.getAllRegis(props.projectId);
      var newId = Number(id);
      console.log(newId);
      const major_result = await projectServices.getAllProjectMajors(newId);
      setMajor(major_result);
      console.log(major);
      // var majorString = '';

      // for (let i = 0; i < major_result.length; i++) {
      //   //console.log(major_result[i]);
      //   majorString = majorString + major_result[i].majorName + '  ';
      // }
      // console.log(majorString);
      // //setRegis(regis_result);
      // setMajor(majorString);
    };
    fetchApi();
  }, []);
  var userEx = JSON.parse(sessionStorage.getItem('userLogin'));
  var projectEx = {
    projectName: '',
    projectOwner: '',
    description: '',
    startTime: '',
    endTime: '',
    maxParticipantAmount: '',
    gitHubLink: '',
  };

  var regis = {
    registrantID: '0',
    userID: '',
    projectID: '',
    projectName: '',
  };

  var participate = {
    userID: '',
    projectID: '',
    rate: '',
  };

  useEffect(() => {
    const fetchApi = async () => {
      var newId = Number(id);
      console.log(newId);
      participate.userID = userEx.userID;
      participate.projectID = newId;

      const result = await projectServices.projectItem(newId);
      console.log(result);
      if (result[0].projectStatus === 'Đã hoàn thành') {
        setCompleted(true);
      }

      setProject(result);

      //console.log(result[0].projectStatus);
      //console.log(project[0]);
      console.log(userEx.userID);
      const checkResult = await projectServices.checkExistedStarred(userEx.userID, result[0]);
      console.log(checkResult[0].checkExist);
      if (checkResult[0].checkExist === 1) {
        setClick(true);
      } else {
        setClick(false);
      }
    };

    fetchApi();
  }, [id]);
  function addRegis() {
    const fetchApi = async () => {
      regis.userID = userEx.userID;

      //regis.majorID = 1;
      // console.log(document.getElementById('majorSelect').value);
      // regis.majorID = document.getElementById('majorSelect').value;
      if (project[0].projectOwner === regis.userID) {
        alert('Chủ dự án không thể đăng ký tham gia dự án của bản thân');
      } else {
        regis.projectID = project[0].projectID;
        regis.projectName = project[0].projectName;

        console.log(regis);
        const checkResult = await projectServices.checkExistedRegistrant(regis);

        console.log(checkResult[0].checkExist);
        if (checkResult[0].checkExist === 1) {
          alert('Bạn đã đăng ký hoặc đang tham gia dự án này rồi');
        } else {
          const result = await projectServices.addRegistrant(regis);
          console.log(result);
          alert('Đăng ký tham gia dự án thành công');
        }
      }
    };
    fetchApi();
  }

  function addSaved() {
    const fetchApi = async () => {
      //regis.userID = userEx.userID;
      console.log(project[0]);
      console.log(userEx.userID);
      const checkResult = await projectServices.checkExistedStarred(userEx.userID, project[0]);
      //console.log(checkResult[0].checkExist);
      if (checkResult[0].checkExist === 0) {
        const result = await projectServices.addStarredProject(userEx.userID, project[0]);
        console.log(result);
        alert('Đã thích dự án');
      } else {
        const result = await projectServices.deleteStarredProject(userEx.userID, project[0]);
        console.log(result);
        alert('Đã bỏ thích dự án');
      }

      //regis.majorID = 1;
      // console.log(document.getElementById('majorSelect').value);
      // regis.majorID = document.getElementById('majorSelect').value;
      // if (project[0].projectOwner === regis.userID) {
      //   alert('May la chu du an ma dang ky qq gi nua');
      // } else {
      //   regis.projectID = project[0].projectID;
      //   console.log(regis);
      //   const result = await projectServices.addRegistrant(regis);
      //   console.log(result);
      //   alert('dang ky thanh cong');
      // }
    };
    fetchApi();
  }

  useEffect(() => {
    const fetchApi = async () => {
      //regis.userID = userEx.userID;
      console.log(project[0]);
      console.log(userEx.userID);
      const checkResult = await projectServices.checkExistedStarred(userEx.userID, project[0]);
      console.log(checkResult[0].checkExist);
      if (checkResult[0].checkExist === 1) {
        setClick(true);
      } else {
        setClick(false);
      }

      //regis.majorID = 1;
      // console.log(document.getElementById('majorSelect').value);
      // regis.majorID = document.getElementById('majorSelect').value;
      // if (project[0].projectOwner === regis.userID) {
      //   alert('May la chu du an ma dang ky qq gi nua');
      // } else {
      //   regis.projectID = project[0].projectID;
      //   console.log(regis);
      //   const result = await projectServices.addRegistrant(regis);
      //   console.log(result);
      //   alert('dang ky thanh cong');
      // }
    };
    fetchApi();
  }, []);

  function Like() {
    const fetchApi = async () => {
      //regis.userID = userEx.userID;
      console.log(project[0]);
      console.log(userEx.userID);
      const checkResult = await projectServices.checkExistedStarred(userEx.userID, project[0]);
      //console.log(checkResult[0].checkExist);
      if (checkResult[0].checkExist === 0) {
        const result = await projectServices.addStarredProject(userEx.userID, project[0]);
        console.log(result);
        setClick(true);
        //alert('Đã thích dự án');
      } else {
        const result = await projectServices.deleteStarredProject(userEx.userID, project[0]);
        console.log(result);
        setClick(false);
        //alert('Đã bỏ thích dự án');
      }

      //regis.majorID = 1;
      // console.log(document.getElementById('majorSelect').value);
      // regis.majorID = document.getElementById('majorSelect').value;
      // if (project[0].projectOwner === regis.userID) {
      //   alert('May la chu du an ma dang ky qq gi nua');
      // } else {
      //   regis.projectID = project[0].projectID;
      //   console.log(regis);
      //   const result = await projectServices.addRegistrant(regis);
      //   console.log(result);
      //   alert('dang ky thanh cong');
      // }
    };
    fetchApi();
  }

  var admin = sessionStorage.getItem('admin');
  const [isClick, setClick] = useState(true);
  //var arr = [{ value: 'Java' }, { value: 'ReactJs' }, { value: 'NodeJs' }];
  return (
    <div className={cx('wrapper')}>
      <button className={cx('backBtn')} onClick={Back}>
        <FontAwesomeIcon icon={faArrowAltCircleLeft} /> &nbsp; Back
      </button>

      <div className={cx('inner')}>
        <div className={cx('general')}>
          <div className={cx('tittle-ccointainer')}>
            <h2 className={cx('tittle')}>Chi tiết dự án</h2>
            <Heart isClick={isClick} onClick={Like} />
          </div>
          <ul className={cx('general-cointainer')}>
            <li className={cx('general-item')}>
              <h4 className={cx('tittle')}>Tên dự án:</h4>
              {project.length > 0 ? (
                <input
                  disabled
                  id={cx('surname')}
                  className={cx('general-input')}
                  defaultValue={project[0].projectName}
                ></input>
              ) : (
                <input disabled id={cx('surname')} className={cx('general-input')}></input>
              )}
            </li>
            <li className={cx('general-item')}>
              <h4 className={cx('tittle')}>Trưởng nhóm:</h4>
              {project.length > 0 ? (
                <input
                  disabled
                  id={cx('forename')}
                  className={cx('general-input')}
                  defaultValue={project[0].user}
                ></input>
              ) : (
                <input disabled id={cx('forename')} className={cx('general-input')}></input>
              )}
            </li>
          </ul>
          <ul className={cx('general-cointainer')}>
            <li className={cx('general-item')}>
              <h4 className={cx('tittle')}>Thời gian bắt đầu:</h4>
              {project.length > 0 ? (
                <input
                  disabled
                  id={cx('dateOfBirth')}
                  className={cx('general-input')}
                  type="date"
                  defaultValue={project[0].startTime}
                ></input>
              ) : (
                <input disabled id={cx('dateOfBirth')} className={cx('general-input')} type="date"></input>
              )}
            </li>
            <li className={cx('general-item')}>
              <h4 className={cx('tittle')}>Thời gian kết thúc:</h4>
              {project.length > 0 ? (
                <input
                  disabled
                  id={cx('dateOfBirth')}
                  className={cx('general-input')}
                  type="date"
                  defaultValue={project[0].endTime}
                ></input>
              ) : (
                <input disabled id={cx('dateOfBirth')} className={cx('general-input')} type="date"></input>
              )}
            </li>
          </ul>
          <ul className={cx('general-cointainer')}>
            <li className={cx('general-item')}>
              <h4 className={cx('tittle')}>Số thành viên tối đa:</h4>
              {project.length > 0 ? (
                <input
                  disabled
                  type="number"
                  id={cx('email')}
                  className={cx('general-input')}
                  defaultValue={project[0].maxParticipantAmount}
                ></input>
              ) : (
                <input disabled type="number" id={cx('email')} className={cx('general-input')}></input>
              )}
            </li>
            <li className={cx('general-item')}>
              <h4 className={cx('tittle')}>Link github:</h4>
              {project.length > 0 ? (
                <input
                  disabled
                  id={cx('phoneNumber')}
                  className={cx('general-input')}
                  defaultValue={project[0].gitHubLink}
                ></input>
              ) : (
                <input disabled id={cx('phoneNumber')} className={cx('general-input')}></input>
              )}
            </li>
          </ul>
          <ul className={cx('general-cointainer')}>
            <li className={cx('general-item')} id={cx('description-coinainer')}>
              <h4 className={cx('tittle')}>Mô tả:</h4>
              {project.length > 0 ? (
                <input
                  disabled
                  id={cx('description')}
                  className={cx('general-input')}
                  defaultValue={project[0].description}
                ></input>
              ) : (
                <input disabled id={cx('description')} className={cx('general-input')}></input>
              )}
            </li>
          </ul>
          <ul className={cx('general-cointainer')}>
            <li className={cx('general-item')} id={cx('description-coinainer')}>
              <h4 className={cx('tittle')}>
                Chuyên ngành: &nbsp;
                {major.map((option, index) => (
                  <span key={index} value={option.majorName}>
                    {option.majorName}
                  </span>
                ))}
              </h4>
            </li>
          </ul>
          {project.length > 0 && project[0].NumberOfUsers < project[0].maxParticipantAmount && completed === false ? (
            <button className={cx('save-btn')} onClick={addRegis}>
              &nbsp;&nbsp;Ứng tuyển
            </button>
          ) : (
            <button disabled className={cx('disabled-btn')}>
              &nbsp;Không thể đăng ký
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectView;
