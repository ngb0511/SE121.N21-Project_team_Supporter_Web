import React from 'react';
import classNames from 'classnames/bind';
import styles from './AddTask.module.scss';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import * as projectItemServices from '../../../apiServices/projectItemServices';
import * as userServices from '../../../apiServices/userServices';
import { useEffect, useState } from 'react';
import Confirm from '../Confirm';
import Successful from '../Successful';
import Error from '../Error';

function Clear() {
  document.getElementById('taskName').value = '';
  document.getElementById('taskMem').value = '';
  document.getElementById('startDate').value = '';
  document.getElementById('taskStatus').value = '';
  document.getElementById('taskProgress').value = '';
  document.getElementById('priority').value = '';
  document.getElementById('description').value = '';
}
const cx = classNames.bind(styles);
const AddTask = (props) => {
  var project = {
    taskName: '',
    taskMem: '',
    startDate: '',
    taskStatus: '',
    taskProgress: '',
    priority: '',
    decription: '',
  };
  const [userList, setuserList] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const result = await userServices.getUser();
      setuserList(result);
    };
    fetchApi();
  }, []);
  function Create() {
    if (document.getElementById('taskName').value !== '') {
      setIsConfirm(!isConfirm);
      project.taskName = document.getElementById('taskName').value;
      project.taskMem = document.getElementById('taskMem').value;
      project.startDate = document.getElementById('startDate').value;
      project.taskStatus = document.getElementById('taskStatus').value;
      project.taskProgress = document.getElementById('taskProgress').value;
      project.priority = document.getElementById('priority').value;
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
                <h3>Tên công việc:</h3>
                <input id={cx('taskName')} placeholder={props.projectNames}></input>
              </div>
              <div>
                <h3>Phân công:</h3>
                <select id={cx('taskMem')} className={cx('general-input')}>
                  <option value="" disabled selected hidden>
                    Chọn thành viên
                  </option>
                  {userList.map((option, index) => (
                    <option key={index} value={option.name}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            </li>
            <li>
              <div>
                <h3>Ngày bắt đầu:</h3>
                <input type="date" id={cx('startDate')}></input>
              </div>
              <div>
                <h3>Trạng thái:</h3>
                <select id={cx('taskStatus')}>
                  <option value="" disabled selected hidden>
                    Chọn trạng thái
                  </option>
                  <option value="male">Đã hoàn thành</option>
                  <option value="female">Chưa hoàn thành</option>
                  <option value="female">Hoãn</option>
                </select>
              </div>
            </li>
            <li>
              <div>
                <h3>Tiến độ:</h3>
                <input type="number" id={cx('taskProgress')}></input>
              </div>
              <div>
                <h3>Độ ưu tiên:</h3>
                <input type="number" id={cx('priority')}></input>
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

export default AddTask;
