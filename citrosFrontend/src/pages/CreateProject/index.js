import React from 'react';
import classNames from 'classnames/bind';
import styles from './CreateProject.module.scss';
import * as projectItemServices from '../../apiServices/projectItemServices';
import * as tagServices from '../../apiServices/tagServices';
import { useState, useEffect } from 'react';
const cx = classNames.bind(styles);
var userEx = JSON.parse(sessionStorage.getItem('userLogin'));
var project = {
  projectID: '0',
  projectName: '',
  projectOwner: '',
  description: '',
  startTime: '',
  endTime: '',
  maxParticipantAmount: '',
  gitHubLink: '',
  majorID: '',
};

//projectName, projectOwner, description, startTime, endTime, maxParticipantAmount, majorID
function Create() {
  if (
    document.getElementById('projectName').value === '' ||
    document.getElementById('projectOwner').value === '' ||
    document.getElementById('startTime').value === '' ||
    document.getElementById('endTime').value === '' ||
    document.getElementById('maxParticipantAmount').value === '' ||
    document.getElementById('major').value === ''
  ) {
    alert('Vui lòng nhập đầy đủ thông tin');
    return;
  }

  if (Date.parse(document.getElementById('startTime').value) > Date.parse(document.getElementById('endTime').value)) {
    alert('Ngày kết thúc dự kiến không thể trước ngày tạo dự án');
    return;
  }
  if (Date.parse(document.getElementById('endTime').value) < Date.now) {
    alert('Ngày kết thúc dự kiến không thể trước hôm nay');
    return;
  }
  project.projectName = document.getElementById('projectName').value;
  project.projectOwner = userEx.userID;
  project.description = document.getElementById('description').value;
  project.startTime = document.getElementById('startTime').value;
  project.endTime = document.getElementById('endTime').value;
  project.maxParticipantAmount = document.getElementById('maxParticipantAmount').value;
  project.majorID = document.getElementById('major').value;

  console.log(project);
  const fetchApi = async () => {
    const result = await projectItemServices.createProject(project);
    console.log(result);
    project.projectID = result;

    console.log(project);
    addMember(project);
  };
  alert('Tạo dự án thành công');

  fetchApi();
  Clear();
  //window.location.reload();
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
  document.getElementById('major').value = '';
}
function CreateProject() {
  const [major, setMajor] = useState([]);

  useEffect(() => {
    document.getElementById('projectOwner').value = userEx.fullName;

    const fetchApi0 = async () => {
      // var account = JSON.parse(sessionStorage.getItem('account'));
      // console.log(account);
      //var fileArr = [];
      const majorResult = await tagServices.getAll();

      setMajor(majorResult);
    };
    fetchApi0();
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
              <input id={cx('projectOwner')} disabled="1"></input>
            </div>
          </li>
          <li>
            <div>
              <h3>Thời gian bắt đầu:</h3>
              <input type="date" id={cx('startTime')} defaultValue={Date.now}></input>
            </div>
            <div>
              <h3>Thời gian kết thúc dự kiến:</h3>
              <input type="date" id={cx('endTime')}></input>
            </div>
          </li>
          <li>
            <div>
              <h3>Số thành viên tối đa:</h3>
              <input type="number" id={cx('maxParticipantAmount')}></input>
            </div>
            <div>
              <h3>Chuyên ngành:</h3>
              <select id={cx('major')} className={cx('job-input')}>
                <option value="" disabled selected hidden>
                  Chọn chuyên ngành
                </option>
                {major.map((option, index) => (
                  <option key={index} value={option.majorID}>
                    {option.majorName}
                  </option>
                ))}
              </select>
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
