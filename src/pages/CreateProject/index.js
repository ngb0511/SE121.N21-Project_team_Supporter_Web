import React from 'react';
import classNames from 'classnames/bind';
import styles from './CreateProject.module.scss';
import * as projectItemServices from '../../apiServices/projectItemServices';
import { useEffect } from 'react';
const cx = classNames.bind(styles);
var userEx = JSON.parse(sessionStorage.getItem('userEx'));
var project = {
  projectID: '0',
  projectName: '',
  projectOwner: '',
  description: '',
  startTime: '',
  endTime: '',
  maxParticipantAmount: '',
  gitHubLink: '',
};
function Create() {
  project.projectName = document.getElementById('projectName').value;
  project.projectOwner = userEx.userID;
  project.description = document.getElementById('description').value;
  project.startTime = document.getElementById('startTime').value;
  project.endTime = document.getElementById('endTime').value;
  project.maxParticipantAmount = document.getElementById('maxParticipantAmount').value;
  project.gitHubLink = document.getElementById('gitHubLink').value;
  console.log(project);
  project.projectID = 0;
  const fetchApi = async () => {
    const result = await projectItemServices.createProject(project);
    console.log(result);
    project.projectID = result;
    console.log(project.projectID);
    addMember(project);
  };
  fetchApi();
}

function addMember() {
  const fetchApi = async () => {
    const result = await projectItemServices.addParticipateWhenCreateProject(project);
    console.log(result);
  };
  fetchApi();
}

function Clear() {
  document.getElementById('projectName').value = '';
  document.getElementById('projectOwner').value = '';
  document.getElementById('description').value = '';
  document.getElementById('startTime').value = '';
  document.getElementById('endTime').value = '';
  document.getElementById('maxParticipantAmount').value = '';
  document.getElementById('gitHubLink').value = '';
}
function CreateProject() {
  useEffect(() => {
    //document.getElementById('projectOwner').value = userEx.fullName;
  }, []);
  return (
    <div className={cx('wrapper')}>
      <div className={cx('banner')}>
        <h1>CITRUS</h1>
        <p>
          Join Freelancer Plus to start each month fresh with 80 Connects. You'll get a lot of other perks too! Join
          before June 30th and unlock 6 new features for the next 3 months.
        </p>
        <button>
          <a href="Home">Learn More</a>
        </button>
      </div>
      <div className={cx('header')}>
        <h2>Khởi tạo dự án </h2>
      </div>
      <div className={cx('cointainer')}>
        <ul>
          <li>
            <div>
              <h3>Tên dự án:</h3>
              <input id={cx('projectName')}></input>
            </div>
            <div>
              <h3>Trưởng nhóm:</h3>
              <input id={cx('projectOwner')}></input>
            </div>
          </li>
          <li>
            <div>
              <h3>Thời gian bắt đầu:</h3>
              <input type="date" id={cx('startTime')}></input>
            </div>
            <div>
              <h3>Thời gian kết thúc:</h3>
              <input type="date" id={cx('endTime')}></input>
            </div>
          </li>
          <li>
            <div>
              <h3>Số thành viên tối đa:</h3>
              <input type="number" id={cx('maxParticipantAmount')}></input>
            </div>
            <div>
              <h3>Link github:</h3>
              <input id={cx('gitHubLink')}></input>
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
  );
}

export default CreateProject;
