import { useParams } from 'react-router-dom';
import styles from './ProjectDetails.module.scss';
import classNames from 'classnames/bind';
import * as projectServices from '../../apiServices/projectItemServices';
import * as accountServices from '../../apiServices/accountServices';
import React, { useState, useEffect } from 'react';
import Button from '../../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import EditProject from '../../components/PopUp/EditProject';
import AddTask from '../../components/PopUp/AddTask';
import EditTask from '../../components/PopUp/EditTask';
import AddMember from '../../components/PopUp/AddMember';

const data = [
  { name: 'Node js', detail: ' back-end JavaScript runtime environment' },
  { name: 'React js', detail: ' free and open-source front-end JavaScript library' },
  { name: 'Springboot', detail: 'application framework and inversion of control container for the Java platform' },
  { name: 'Springboot', detail: 'application framework and inversion of control container for the Java platform' },
  { name: 'Springboot', detail: 'application framework and inversion of control container for the Java platform' },
  { name: 'Springboot', detail: 'application framework and inversion of control container for the Java platform' },
  { name: 'Springboot', detail: 'application framework and inversion of control container for the Java platform' },
  { name: 'Springboot', detail: 'application framework and inversion of control container for the Java platform' },
  { name: 'Springboot', detail: 'application framework and inversion of control container for the Java platform' },
];
const cx = classNames.bind(styles);
/*        <h2>
          Project Details Page {id} - {JSON.stringify(project)}
        </h2> */

function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState({});
  const [user, setUser] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isAddMember, setIsAddMember] = useState(false);
  const [isTask, setIsTask] = useState();

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const toggleAdd = () => {
    setIsAdd(!isAdd);
  };

  const toggleEdit = () => {
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
      const result = await projectServices.projectItem(newId);
      setProject(result);
    };
    fetchApi();
  }, [id]);

  function Update(index) {
    setIsTask(index);
    setIsEdit(!isEdit);
  }
  return (
    <div className={cx('wrapper')}>
      <div className={cx('header')}>
        <h2>
          Dự án {project.title}
          <button onClick={togglePopup}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </h2>
      </div>
      <div className={cx('context')}>
        <ul>
          <li className={cx('context-work')}>
            <div>
              <h3>Công việc</h3>
              <Button id="btn" mini onClick={toggleAdd}>
                Thêm
              </Button>
              <select>
                <option value="" disabled selected hidden>
                  Phân loại
                </option>
                <option value="male">Chưa hoàn thành</option>
                <option value="female">Hoàn thành</option>
              </select>
            </div>
            <table>
              <tr>
                <th id={cx('stt')}>STT</th>
                <th id={cx('name')}>Công việc</th>
                <th id={cx('date')}>Ngày bắt đầu</th>
                <th id={cx('member')}>Phân công</th>
                <th id={cx('status')}>Trạng thái</th>
                <th id={cx('progress')}>Tiến độ</th>
                <th id={cx('update')}>Cập nhật</th>
              </tr>
              {data.map((val, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{val.detail}</td>
                    <td>{val.name}</td>

                    <td>
                      <button></button>
                    </td>
                    <td>
                      <button></button>
                    </td>
                    <td>
                      <button></button>
                    </td>
                    <td>
                      <button onClick={(event) => Update(event, index)} key={index}></button>
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
                <th id={cx('date')}>Vai trò</th>
              </tr>
              {(user.length > 0 &&
                user.map((val, key) => {
                  return (
                    <tr key={key}>
                      <td>{key + 1}</td>
                      <td>{val.username}</td>
                      <td>{val.name}</td>
                    </tr>
                  );
                })) || <span>No data available</span>}
            </table>
          </li>
        </ul>
      </div>
      {isOpen && <EditProject handleClose={togglePopup} projectName={project.title} projectId={id} />}
      {isAdd && <AddTask handleClose={toggleAdd} projectName={project.title} projectId={id} />}
      {isEdit && <EditTask handleClose={toggleEdit} taskId={isTask} />}
      {isAddMember && <AddMember handleClose={toggleAddMember} />}
    </div>
  );
}

export default ProjectDetails;
