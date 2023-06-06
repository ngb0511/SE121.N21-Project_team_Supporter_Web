import { useParams } from 'react-router-dom';
import styles from './ProjectDetails.module.scss';
import classNames from 'classnames/bind';
import * as projectServices from '../../apiServices/projectItemServices';
import * as accountServices from '../../apiServices/accountServices';
import * as taskServices from '../../apiServices/taskServices';
import React, { useState, useEffect } from 'react';
import Button from '../../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import EditProject from '../../components/PopUp/EditProject';
import AddTask from '../../components/PopUp/AddTask';
import EditTask from '../../components/PopUp/EditTask';
import AddMember from '../../components/PopUp/AddMember';

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

function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState([]);
  const [user, setUser] = useState([]);
  const [task, setTask] = useState([]);
  const [regis, setRegis] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isAddMember, setIsAddMember] = useState(false);
  const [isTask, setIsTask] = useState();
  const [pId, setpId] = useState();

  const togglePopup = () => {
    const fetchApi = async () => {
      var newId = Number(id);
      console.log(newId);
      const result = await projectServices.projectItem(newId);
      setpId(newId);
      setProject(result);
    };
    fetchApi();
    setIsOpen(!isOpen);
  };

  const toggleAdd = () => {
    const fetchApi = async () => {
      var newId = Number(id);
      console.log(newId);
      const result = await taskServices.getTask(newId);
      console.log(result);
      setTask(result);
    };
    fetchApi();
    setIsAdd(!isAdd);
  };

  const toggleEdit = () => {
    const fetchApi = async () => {
      var newId = Number(id);
      console.log(newId);
      const result = await taskServices.getTask(newId);
      console.log(result);
      setTask(result);
    };
    fetchApi();
    setIsEdit(!isEdit);
  };

  const toggleAddMember = () => {
    setIsAddMember(!isAddMember);
  };

  useEffect(() => {
    const fetchApi = async () => {
      const result = await accountServices.account();
      console.log(result);
      setUser(result);
    };
    fetchApi();
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      var newId = Number(id);
      console.log(newId);
      const result = await projectServices.projectItem(newId);
      setpId(newId);
      setProject(result);
    };

    fetchApi();
  }, [id]);

  useEffect(() => {
    const fetchApi = async () => {
      var newId = Number(id);
      console.log(newId);
      const result = await projectServices.getAllRegis(newId);
      setpId(newId);
      setRegis(result);
    };
    fetchApi();
  }, [id]);

  useEffect(() => {
    const fetchApi = async () => {
      var newId = Number(id);
      console.log(newId);
      const result = await taskServices.getTask(newId);
      console.log(result);
      setTask(result);
    };
    fetchApi();
  }, [id]);

  useEffect(() => {
    const fetchApi = async () => {
      var newId = Number(id);
      console.log(newId);
      const result = await projectServices.getAllParticipant(newId);
      console.log(result);
      setUser(result);
    };
    fetchApi();
  }, [id]);

  function Update(event, index) {
    console.log(event);
    setIsTask(index);
    toggleEdit();
  }
  const handleChange = (event) => {
    console.log(event.target.value);
    if (document.getElementById('sortStatus').value === 'Chưa hoàn thành') {
      const fetchApi = async () => {
        var newId = Number(id);
        console.log(newId);
        const result = await taskServices.getUndoneTasks(newId);
        console.log(result);
        setTask(result);
      };
      fetchApi();
    } else if (document.getElementById('sortStatus').value === 'Đã hoàn thành') {
      const fetchApi = async () => {
        var newId = Number(id);
        console.log(newId);
        const result = await taskServices.getDoneTasks(newId);
        console.log(result);
        setTask(result);
      };
      fetchApi();
    } else if (document.getElementById('sortStatus').value === 'Hoãn') {
      const fetchApi = async () => {
        var newId = Number(id);
        console.log(newId);
        const result = await taskServices.getDelayedTasks(newId);
        console.log(result);
        setTask(result);
      };
      fetchApi();
    } else {
      const fetchApi = async () => {
        var newId = Number(id);
        console.log(newId);
        const result = await taskServices.getTask(newId);
        console.log(result);
        setTask(result);
      };
      fetchApi();
    }
  };

  function Reload() {
    const fetchApi = async () => {
      var newId = Number(id);
      console.log(newId);
      const result = await taskServices.getTask(newId);
      console.log(result);
      setTask(result);
    };
    fetchApi();
  }

  function ReloadProject() {
    const fetchApi = async () => {
      var newId = Number(id);
      console.log(newId);
      const result = await projectServices.projectItem(newId);
      setpId(newId);
      setProject(result);
    };
    fetchApi();
  }

  return (
    <div className={cx('wrapper')}>
      <div className={cx('header')}>
        {project.length > 0 ? (
          <h2>
            Dự án {project[0].projectName}
            <button onClick={togglePopup}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
          </h2>
        ) : (
          <div></div>
        )}
      </div>
      <div className={cx('context')}>
        <ul>
          <li className={cx('context-work')}>
            <div>
              <h3>Công việc</h3>
              <Button id="btn" mini onClick={toggleAdd}>
                Thêm
              </Button>
              <select id={cx('sortStatus')} onChange={handleChange}>
                <option value="" disabled selected hidden>
                  Phân loại
                </option>
                <option value="Tất cả">Tất cả</option>
                <option value="Chưa hoàn thành">Chưa hoàn thành</option>
                <option value="Đã hoàn thành">Hoàn thành</option>
                <option value="Hoãn">Hoãn</option>
              </select>
            </div>
            <table>
              <tr>
                <th id={cx('stt')}>STT</th>
                <th id={cx('name')}>Công việc</th>
                <th id={cx('date')}>Ngày bắt đầu</th>
                <th id={cx('member')}>Ngày kết thúc</th>
                <th id={cx('status')}>Phân công</th>
                <th id={cx('progress')}>Trạng thái</th>
                <th id={cx('update')}>Cập nhật</th>
              </tr>
              {task.map((val, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{val.task}</td>
                    <td>{val.startTime}</td>
                    <td>
                      <td id={cx('test-date')}>{val.endTime}</td>
                    </td>
                    <td>
                      <td>{val.user}</td>
                    </td>
                    <td>
                      <td id={cx('test')}>{val.taskStatus}</td>
                    </td>
                    <td>
                      <button onClick={(event) => Update(event, val)} key={val}></button>
                    </td>
                  </tr>
                );
              })}
            </table>
          </li>
          <li className={cx('context-member')}>
            <div>
              <h3>Thành viên</h3>
              <Button id="btn" mini onClick={toggleAddMember}>
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </div>

            <table>
              <tr>
                <th id={cx('stt')}>STT</th>
                <th id={cx('name')}>Họ tên</th>
                <th id={cx('date')}>Lương</th>
              </tr>
              {(user.length > 0 &&
                user.map((val, key) => {
                  return (
                    <tr key={key}>
                      <td>{key + 1}</td>
                      <td id={cx('userName')}>{val.user}</td>
                      <td>{val.salary}</td>
                    </tr>
                  );
                })) || <span>No data available</span>}
            </table>
          </li>
        </ul>
      </div>
      {isOpen && (
        <EditProject
          handleClose={togglePopup}
          projectName={project[0].projectName}
          project={project[0]}
          projectId={id}
          reload={ReloadProject}
        />
      )}
      {isAdd && <AddTask handleClose={toggleAdd} projectName={task.task} id={pId} reload={Reload} />}
      {isEdit && <EditTask handleClose={toggleEdit} progress={isTask} id={pId} reload={Reload} />}
      {isAddMember && <AddMember handleClose={toggleAddMember} />}
    </div>
  );
}

export default ProjectDetails;
