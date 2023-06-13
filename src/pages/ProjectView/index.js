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
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
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

      var majorString = '';

      for (let i = 0; i < major_result.length; i++) {
        //console.log(major_result[i]);
        majorString = majorString + major_result[i].majorName + '  ';
      }
      console.log(majorString);
      //setRegis(regis_result);
      setMajor(majorString);
    };
    fetchApi();
  }, []);
  var userEx = JSON.parse(sessionStorage.getItem('userEx'));
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
    majorID: '',
  };

  useEffect(() => {
    const fetchApi = async () => {
      var newId = Number(id);
      console.log(newId);
      const result = await projectServices.projectItem(newId);
      console.log(userEx.userID);
      setProject(result);
    };

    fetchApi();
  }, [id]);
  function addRegis() {
    const fetchApi = async () => {
      regis.userID = userEx.userID;
      regis.majorID = 1;
      regis.projectID = project[0].projectID;
      const result = await projectServices.addRegistrant(regis);
      console.log(result);
    };
    fetchApi();
  }
  var arr = [{ value: 'Java' }, { value: 'ReactJs' }, { value: 'NodeJs' }];
  return (
    <div className={cx('wrapper')}>
      <button className={cx('backBtn')} onClick={Back}>
        <FontAwesomeIcon icon={faArrowAltCircleLeft} /> &nbsp; Back
      </button>
      <div className={cx('inner')}>
        <div className={cx('general')}>
          <h2 className={cx('tittle')}>Chi tiết dự án</h2>
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
              <h4 className={cx('tittle')}>Chuyên ngành:</h4>
              {project.length > 0 ? (
                <input disabled id={cx('major')} className={cx('general-input')} defaultValue={major}></input>
              ) : (
                <input disabled id={cx('major')} className={cx('general-input')}></input>
              )}
            </li>
          </ul>
          <br></br>
          {arr.map((option, index) => (
            <span key={index} value={option.value}>
              {option.value}
            </span>
          ))}
          <br></br>
          <br></br>
          {project.length > 0 && project[0].NumberOfUsers < project[0].maxParticipantAmount ? (
            <button className={cx('save-btn')} onClick={addRegis}>
              &nbsp;&nbsp;Ứng tuyển
            </button>
          ) : (
            <button disabled className={cx('disabled-btn')}>
              &nbsp;&nbsp;Đã đủ thành viên
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectView;
