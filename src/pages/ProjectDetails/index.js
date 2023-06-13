import { useParams } from 'react-router-dom';
import styles from './ProjectDetails.module.scss';
import classNames from 'classnames/bind';
import * as projectServices from '../../apiServices/projectItemServices';
import * as accountServices from '../../apiServices/accountServices';
import * as taskServices from '../../apiServices/taskServices';
import React, { useState, useEffect } from 'react';
import Button from '../../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPenToSquare, faStar, faUser, faUpload } from '@fortawesome/free-solid-svg-icons';
import EditProject from '../../components/PopUp/EditProject';
import AddTask from '../../components/PopUp/AddTask';
import EditTask from '../../components/PopUp/EditTask';
import AddMember from '../../components/PopUp/AddMember';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const { id } = useParams();
  const [project, setProject] = useState([]);
  const [user, setUser] = useState([]);
  const [task, setTask] = useState([]);
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

  function View(event, index) {
    console.log(event);
    navigate('/ProfileWall/1');
  }

  function AddMember(event, index) {
    console.log(event);
    //navigate('/ProfileWall/2');
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

  /*return (
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
                <th id={cx('date')}>Chuyên ngành</th>
              </tr>
              {(user.length > 0 &&
                user.map((val, key) => {
                  return (
                    <tr key={key}>
                      <td>{key + 1}</td>
                      <td id={cx('userName')}>{val.user}</td>
                      <td>{val.majorName}</td>
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
      {isAddMember && <AddMember handleClose={toggleAddMember} project={project[0]} projectId={id} />}
    </div>
  );*/
  var arr = [{ value: 'Java' }, { value: 'ReactJs' }, { value: 'NodeJs' }];
  return (
    <div className={cx('wrapper')}>
      <h2>Job Details</h2>
      <div className={cx('project-detail')}>
        <div className={cx('project-detail-information')}>
          {project.length > 0 ? <h3>Project Name {project[0].projectName}</h3> : <h3>Project Name</h3>}
          <p>
            <a href="/Profile">Leader</a>
            <br></br>
            Start Date:
          </p>
          <div>
            <p>
              <h4>Description</h4>
              <textarea
                value="Redesign existing logo to include my phone number below in large writing 0422 335 749 that has
              electrical and 0422 335 749 in white and in black .Also have designs without my number, but also black
              and white electrical .All of the above in high resolution, in EPS preferably, with no background"
              ></textarea>
            </p>
          </div>
          <div>
            <p>
              <h4>Major Requirement</h4>
              <div>
                {arr.map((option, index) => (
                  <span key={index} value={option.value}>
                    {option.value}
                  </span>
                ))}
              </div>
            </p>
          </div>
          <div>
            <p>
              <h4>Attachment</h4>
              <input type="file"></input>
              <button>
                Upload <FontAwesomeIcon icon={faUpload} />
              </button>
            </p>
          </div>
        </div>
        <div className={cx('project-detail-button')}>
          <div>
            <button className={cx('save-button')}>Save</button>
            <button className={cx('delete-button')}>Delete</button>
            <p>
              Max Member: 20 <FontAwesomeIcon icon={faUser} />{' '}
            </p>
            <p>
              Current Member: 12 <FontAwesomeIcon icon={faUser} />
            </p>
          </div>
          <div>
            <h4>About</h4>
            <span>5 account like this project</span>
            <span>
              5 <FontAwesomeIcon icon={faStar} /> of 1 review
            </span>
            <h4>Job link</h4>
            <input value="https://www.upwork.com/jobs/~016896f2182152e00f"></input>
          </div>
        </div>
      </div>
      <h2>Task list</h2>
      <div className={cx('task-detail')}>
        <div className="container">
          <button className={cx('addTask-btn')} onClick={toggleAdd}>
            Add new task
          </button>
          <div className="wrapper-table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Status</th>
                  <th>Member</th>
                  <th>Notice</th>
                  <th>Update</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>FrontEnd</td>
                  <td>18/09/2002</td>
                  <td>10/06/2023</td>
                  <td>Done</td>
                  <td></td>
                  <td></td>
                  <td>
                    <button onClick={(event) => Update(event, 1)}>View</button>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>BackEnd</td>
                  <td>21/10/2002</td>
                  <td></td>
                  <td>In progress</td>
                  <td></td>
                  <td></td>
                  <td>
                    <button onClick={(event) => Update(event, 1)}>View</button>
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>BackEnd</td>
                  <td>21/10/2002</td>
                  <td></td>
                  <td>In progress</td>
                  <td></td>
                  <td></td>
                  <td>
                    <button onClick={(event) => Update(event, 1)}>View</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <h2>Member list</h2>
      <div className={cx('member-detail')}>
        <div className={cx('new-member')}>
          <h4>New User</h4>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Tool</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Nhu</td>
                <td>21</td>
                <td>
                  <button className={cx('view-btn')} onClick={(event) => View(event, 1)}>
                    View
                  </button>
                  &nbsp;
                  <button className={cx('add-btn')} onClick={(event) => AddMember(event, 1)}>
                    Add
                  </button>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Alex</td>
                <td>24</td>
                <td>
                  <button className={cx('view-btn')} onClick={(event) => View(event, 1)}>
                    View
                  </button>
                  &nbsp;
                  <button className={cx('add-btn')} onClick={(event) => AddMember(event, 1)}>
                    Add
                  </button>
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>Nike</td>
                <td>19</td>
                <td>
                  <button className={cx('view-btn')} onClick={(event) => View(event, 1)}>
                    View
                  </button>
                  &nbsp;
                  <button className={cx('add-btn')} onClick={(event) => AddMember(event, 1)}>
                    Add
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={cx('current-member')}>
          <h4>Current Team Member</h4>
          <table class="eg4">
            <tbody>
              <tr class="darkblue">
                <th scope="col" class="darkblue">
                  ID
                </th>
                <th scope="col" class="darkblue">
                  Name
                </th>
                <th scope="col" class="darkblue">
                  Major
                </th>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>

              <tr>
                <td colspan="2">&nbsp;</td>
                <td colspan="2">&nbsp;</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {isAdd && <AddTask handleClose={toggleAdd} projectName={task.task} id={pId} reload={Reload} />}
      {isEdit && <EditTask handleClose={toggleEdit} progress={isTask} id={pId} reload={Reload} />}
    </div>
  );
}

export default ProjectDetails;
