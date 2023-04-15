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
  document.getElementById('projectLeader').value = '';
  document.getElementById('startDate').value = '';
  document.getElementById('endDate').value = '';
  document.getElementById('maxiumMember').value = '';
  document.getElementById('linkGit').value = '';
  document.getElementById('description').value = '';
}
const cx = classNames.bind(styles);
const EditProject = (props) => {
  var project = {
    projectName: '',
    projectLeader: '',
    startDate: '',
    endDate: '',
    max: '',
    linkGit: '',
    decription: '',
  };
  function Create() {
    if (document.getElementById('projectName').value !== '') {
      setIsConfirm(!isConfirm);
      project.projectName = document.getElementById('projectName').value;
      project.projectLeader = document.getElementById('projectLeader').value;
      project.startDate = document.getElementById('startDate').value;
      project.endDate = document.getElementById('endDate').value;
      project.max = document.getElementById('maxiumMember').value;
      project.linkGit = document.getElementById('linkGit').value;
      project.decription = document.getElementById('description').value;
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
    const fetchApi = async () => {
      const result = await projectItemServices.updateProject(props.projectId, project);
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
          <ul>
            <li>
              <div>
                <h3>Tên dự án:</h3>
                <input id={cx('projectName')} placeholder={props.projectName}></input>
              </div>
              <div>
                <h3>Trưởng nhóm:</h3>
                <input id={cx('projectLeader')} placeholder={props.projectId}></input>
              </div>
            </li>
            <li>
              <div>
                <h3>Thời gian bắt đầu:</h3>
                <input type="date" id={cx('startDate')}></input>
              </div>
              <div>
                <h3>Thời gian kết thúc:</h3>
                <input type="date" id={cx('endDate')}></input>
              </div>
            </li>
            <li>
              <div>
                <h3>Số thành viên tối đa:</h3>
                <input type="number" id={cx('maxiumMember')}></input>
              </div>
              <div>
                <h3>Link github:</h3>
                <input id={cx('linkGit')}></input>
              </div>
            </li>
            <li>
              <div id={cx('github')}>
                <h3>Mô tả:</h3>
                <input id={cx('description')}></input>
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
