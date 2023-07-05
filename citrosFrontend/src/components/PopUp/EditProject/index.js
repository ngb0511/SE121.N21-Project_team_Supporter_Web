import React from 'react';
import classNames from 'classnames/bind';
import styles from './EditProject.module.scss';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import * as projectItemServices from '../../../apiServices/projectItemServices';
import { useState } from 'react';
import Confirm from '../Confirm';
import Successful from '../Successful';
import Error from '../Error';

function Clear() {
  document.getElementById('projectName').value = '';
  document.getElementById('description').value = '';
  document.getElementById('startTime').value = '';
  document.getElementById('endTime').value = '';
  document.getElementById('maxParticipantAmount').value = '';
  document.getElementById('gitHubLink').value = '';
}
const cx = classNames.bind(styles);
const EditProject = (props) => {
  var project = {
    projectName: '',
    projectOwner: '',
    description: '',
    startTime: '',
    endTime: '',
    maxParticipantAmount: '',
    gitHubLink: '',
  };
  function Create() {
    if (document.getElementById('projectName').value !== '') {
      setIsConfirm(!isConfirm);
      project.projectName = document.getElementById('projectName').value;
      project.projectOwner = props.project.projectOwner;
      project.description = document.getElementById('description').value;
      project.startTime = document.getElementById('startTime').value;
      project.endTime = document.getElementById('endTime').value;
      project.maxParticipantAmount = document.getElementById('maxParticipantAmount').value;
      project.gitHubLink = document.getElementById('gitHubLink').value;
      console.log(project);
    } else {
      setIsError(!isError);
    }
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
    Create();
    const fetchApi = async () => {
      const result = await projectItemServices.updateProject(props.projectId, project);
      console.log(result);
    };
    fetchApi();
    setIsConfirm(!isConfirm);
    setIsSuccessful(!isSuccessful);
    props.reload();
    props.handleClose();
  };
  return (
    <div className={cx('popup-box')}>
      <div className={cx('box')}>
        <span className={cx('close-icon')} onClick={props.handleClose}>
          x
        </span>
        {props.content}
        <div className={cx('content')}>
          <ul>
            <li>
              <div>
                <h3>Tên dự án:</h3>
                <input id={cx('projectName')} defaultValue={props.project.projectName}></input>
              </div>
              <div>
                <h3>Trưởng nhóm:</h3>
                <input id={cx('projectOwner')} defaultValue={props.project.user}></input>
              </div>
            </li>
            <li>
              <div>
                <h3>Thời gian bắt đầu:</h3>
                <input type="date" id={cx('startTime')} defaultValue={props.project.startTime}></input>
              </div>
              <div>
                <h3>Thời gian kết thúc:</h3>
                <input type="date" id={cx('endTime')} defaultValue={props.project.endTime}></input>
              </div>
            </li>
            <li>
              <div>
                <h3>Số thành viên tối đa:</h3>
                <input
                  type="number"
                  maxLength={2}
                  id={cx('maxParticipantAmount')}
                  defaultValue={props.project.maxParticipantAmount}
                ></input>
              </div>
              <div>
                <h3>Link github:</h3>
                <input id={cx('gitHubLink')} defaultValue={props.project.gitHubLink}></input>
              </div>
            </li>
            <li>
              <div id={cx('github')}>
                <h3>Mô tả:</h3>
                <input id={cx('description')} defaultValue={props.project.description}></input>
              </div>
            </li>
            <li id={cx('cointainer-btn')}>
              <button onClick={Create}>Xác nhận</button>
              <button onClick={Clear}>Làm mới</button>
            </li>
          </ul>
        </div>
      </div>
      {isConfirm && <Confirm handleClose={toggleConfirm} handleConfirm={confirm} />}
      {isSuccessful && <Successful handleClose={toggleSuccessful} />}
      {isError && <Error handleClose={toggleError} />}
    </div>
  );
};

export default EditProject;
