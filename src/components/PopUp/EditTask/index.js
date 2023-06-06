import React from 'react';
import classNames from 'classnames/bind';
import styles from './EditTask.module.scss';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import * as projectItemServices from '../../../apiServices/projectItemServices';
import * as taskServices from '../../../apiServices/taskServices';
import { useEffect, useState } from 'react';
import Confirm from '../Confirm';
import Successful from '../Successful';
import Error from '../Error';

function Clear() {
  document.getElementById('task').value = '';
  document.getElementById('userID').value = '';
  document.getElementById('startTime').value = '';
  document.getElementById('taskStatus').value = '';
  document.getElementById('endTime').value = '';
  document.getElementById('notice').value = '';
}
const cx = classNames.bind(styles);
const EditTask = (props) => {
  var project = {
    userID: '',
    task: '',
    startTime: '',
    endTime: '',
    taskStatus: '',
    notice: '',
  };
  //const [userList, setuserList] = useState([]);
  /*useEffect(() => {
    const fetchApi = async () => {
      const result = await userServices.getUser();
      setuserList(result);
    };
    fetchApi();
  }, []);*/
  function Create() {
    if (document.getElementById('task').value !== '') {
      setIsConfirm(!isConfirm);
      project.userID = document.getElementById('userID').value;
      project.task = document.getElementById('task').value;
      project.startTime = document.getElementById('startTime').value;
      project.endTime = document.getElementById('endTime').value;
      project.taskStatus = document.getElementById('taskStatus').value;
      project.notice = document.getElementById('notice').value;
      console.log(project);
    } else {
      setIsError(!isError);
    }
  }
  const [isConfirm, setIsConfirm] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userList, setUser] = useState([]);
  const toggleConfirm = () => {
    setIsConfirm(!isConfirm);
  };

  const toggleSuccessful = () => {
    setIsSuccessful(!isSuccessful);
  };

  const toggleError = () => {
    setIsError(!isError);
  };

  useEffect(() => {
    const fetchApi = async () => {
      console.log(props.id);
      var newId = Number(props.id);
      console.log(newId);
      const result = await projectItemServices.getAllParticipant(newId);
      console.log(result);
      setUser(result);
    };
    fetchApi();
  }, [props.id]);

  const confirm = () => {
    Create();
    const fetchApi = async () => {
      const result = await taskServices.updateTask(props.progress.progressID, project);
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
                <h3>Tên công việc:</h3>
                <input id={cx('task')} defaultValue={props.progress.task}></input>
              </div>
              <div>
                <h3>Phân công:</h3>
                <select id={cx('userID')} className={cx('general-input')}>
                  <option value={props.progress.userID} disabled selected hidden>
                    {props.progress.user}
                  </option>
                  {userList.map((option, index) => (
                    <option key={index} value={option.userID}>
                      {option.user}
                    </option>
                  ))}
                </select>
              </div>
            </li>
            <li>
              <div>
                <h3>Ngày bắt đầu:</h3>
                <input type="date" id={cx('startTime')} defaultValue={props.progress.startTime}></input>
              </div>
              <div>
                <h3>Ngày kết thúc:</h3>
                <input type="date" id={cx('endTime')} defaultValue={props.progress.endTime}></input>
              </div>
            </li>
            <li>
              <div>
                <h3>Mô tả:</h3>
                <input type="text" id={cx('notice')} placeholder={props.progress.notice}></input>
              </div>
              <div>
                <h3>Trạng thái:</h3>
                <select id={cx('taskStatus')}>
                  <option value={props.progress.taskStatus} disabled selected hidden>
                    {props.progress.taskStatus}
                  </option>
                  <option value="Đã hoàn thành">Đã hoàn thành</option>
                  <option value="Chưa hoàn thành">Chưa hoàn thành</option>
                  <option value="Hoãn">Hoãn</option>
                </select>
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

export default EditTask;
