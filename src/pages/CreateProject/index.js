import React from 'react';
import classNames from 'classnames/bind';
import styles from './CreateProject.module.scss';
import * as projectItemServices from '../../apiServices/projectItemServices';
const cx = classNames.bind(styles);

var project = { projectName: '', projectLeader: '', startDate: '', endDate: '', max: '', linkGit: '', decription: '' };
function Create() {
  project.projectName = document.getElementById('projectName').value;
  project.projectLeader = document.getElementById('projectLeader').value;
  project.startDate = document.getElementById('startDate').value;
  project.endDate = document.getElementById('endDate').value;
  project.max = document.getElementById('maxiumMember').value;
  project.linkGit = document.getElementById('linkGit').value;
  project.decription = document.getElementById('description').value;
  console.log(project);
  const fetchApi = async () => {
    const result = await projectItemServices.createProject(project);
    console.log(result);
  };
  fetchApi();
}
function Clear() {
  document.getElementById('projectName').value = '';
  document.getElementById('projectLeader').value = '';
  document.getElementById('startDate').value = '';
  document.getElementById('endDate').value = '';
  document.getElementById('maxiumMember').value = '';
  document.getElementById('linkGit').value = '';
  document.getElementById('description').value = '';
}
function CreateProject() {
  return (
    <div className={cx('wrapper')}>
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
              <input id={cx('projectLeader')}></input>
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
  );
}

export default CreateProject;
