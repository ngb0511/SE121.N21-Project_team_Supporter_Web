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
import Rate from '../../components/PopUp/Rate';
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
  const [isRate, setIsRate] = useState(false);
  const [isAddMember, setIsAddMember] = useState(false);
  const [isTask, setIsTask] = useState();
  const [pId, setpId] = useState();
  const [uId, setuId] = useState();
  const [major, setMajor] = useState([]);
  const [regis, setRegis] = useState([]);
  const [liked, setLiked] = useState();
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [link, setLink] = useState([]);
  const [participateUser, setParticipate] = useState([]);
  const [leader, setLeader] = useState(false);
  //const [CV, setCV] = useState();

  var participate = {
    projectID: '',
    userID: '',
    rate: '',
  };

  var projectEx = {
    projectID: '',
    projectName: '',
    projectOwner: '',
    description: '',
    startTime: '',
    endTime: '',
    maxParticipantAmount: '',
    gitHubLink: '',
    majorID: '',
    projectStatus: '',
  };

  const arr = [
    { value: 'Đang tiến hành', text: 'Đang tiến hành' },
    { value: 'Đã hoàn thành', text: 'Đã hoàn thành' },
    { value: 'Hủy', text: 'Hủy' },
  ];

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

  useEffect(() => {
    const fetchApi = async () => {
      var newId = Number(id);
      const regis_result = await projectServices.getAllRegis(newId);
      //const major_result = await projectItemServices.getAllProjectMajors(props.projectId);
      setRegis(regis_result);
      console.log(regis_result);
      //setMajor(major_result);
      //console.log(major_result);
    };
    fetchApi();
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      var newId = Number(id);
      const liked_result = await projectServices.getNumberOfLikedProjects(newId);
      //const major_result = await projectItemServices.getAllProjectMajors(props.projectId);
      setLiked(liked_result[0].liked);
      console.log(liked);
      //setMajor(major_result);
      //console.log(major_result);
    };
    fetchApi();
  }, []);

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

  const toggleRate = (event, index) => {
    setuId(index);
    setIsRate(!isRate);
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
      var user = JSON.parse(sessionStorage.getItem('userLogin'));
      var newId = Number(id);
      //console.log(newId);
      const result = await projectServices.projectItem(newId);

      if (user.userID == result[0].projectOwner) {
        setLeader(true);
        //console.log(result);
      }
      setpId(newId);
      console.log(result);
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
      setParticipate(result);
    };
    fetchApi();
  }, [id]);

  useEffect(() => {
    const fetchApi = async () => {
      var newId = Number(id);
      console.log(newId);
      const major_result = await projectServices.getAllProjectMajors(newId);
      console.log(major_result);
      setMajor(major_result);
    };
    fetchApi();
  }, [id]);

  useEffect(() => {
    const fetchApi = async () => {
      var newId = Number(id);
      console.log(newId);
      //setMajor(major_result);
      var fileArr = [];
      const fileResult = await projectServices.getAllFiles(newId);
      setFiles(fileResult);

      for (var i = 0; i < fileResult.length; i++) {
        console.log(fileResult[i]);
        var path = fileResult[i].file.toString().split('\\');
        var file = 'http://localhost:3002/files/' + path[4];
        console.log(file);
        fileArr[i] = file;
      }

      console.log(fileArr);
      setLink(fileArr);
      // var path = cv[0].CV.toString().split('\\');
      // var file = 'http://localhost:3002/files/' + path[4];
      // console.log(file);
      //setLink(file);
      //setTest(avatarName);
      //document.getElementsByClassName('user-img').style.backgroundImage = "url('${avatarName}')";
      //console.log(e.target.files[0]);
      //setFile(avatarName);
      //setImage(URL.createObjectURL(avatarName));
    };
    fetchApi();
  }, [id]);

  function Update(event, index) {
    console.log(event);
    console.log(index);
    setIsTask(index);
    toggleEdit();
  }

  function View(event, index) {
    console.log(event);
    navigate('/ProfileWall/' + index);
  }

  function Save(event) {
    var newId = Number(id);
    console.log(newId);

    //console.log(document.getElementById('description').value);
    projectEx.description = document.getElementById('description').value;
    projectEx.projectStatus = document.getElementById('projectStatus').value;
    projectEx.gitHubLink = document.getElementById('gitHubLink').value;

    console.log(projectEx);

    const fetchApi = async () => {
      const result = await projectServices.updateProject(newId, projectEx);
      console.log(result);
      alert('Cập nhật dự án thành công');

      //setMajor(major_result);
    };
    fetchApi();
    //projectEx
    window.location.reload();
  }

  function handleChangeFile(e) {
    console.log(e.target.files[0]);
    //setFiles(e.target.files);
    setFile(e.target.files[0]);
    //console.log(file);

    // console.log(file);
  }

  function UploadFile(e) {
    //e.preventDefault()
    var newId = Number(id);
    console.log(file);
    var checkExist = false;
    var updateID = '0';

    for (var i = 0; i < files.length; i++) {
      var path = files[i].file.toString().split('\\');

      if (file.name === path[4]) {
        checkExist = true;
        updateID = files[i].fileID;
      }
    }

    if (checkExist === true) {
      const result = projectServices.updateProjectFile(updateID, file);
      console.log(result);
      alert('Update file cho dự án thành công');
    } else {
      const result = projectServices.uploadFile(newId, file);
      console.log(result);
      alert('Upload file cho dự án thành công');
    }
    window.location.reload();

    // var projectFile = {
    //   fileID: '3',
    //   projectID: '1',
    //   file: '..\\citrosBackend\\src\\files\\Bai8_Kohonen.pdf',
    // };

    // const result = projectServices.deleteProjectFile(3, projectFile);
  }

  function AddMember(event, index) {
    console.log(event);

    const fetchApi = async () => {
      // var newId = Number(id);
      //   console.log(newId);
      const userResult = await accountServices.getAccountSortedByUserID(index);
      participate.projectID = Number(id);
      participate.userID = index;
      regis.projectName = project[0].projectName;
      const result = await projectServices.addParticipate(index, participate);
      console.log(result);

      //alert('Thêm thành viên thành công 1');
    };
    fetchApi();
    const fetchApi3 = async () => {
      // var newId = Number(id);
      //   console.log(newId);
      const userResult = await accountServices.getAccountSortedByUserID(index);
      participate.projectID = Number(id);
      participate.userID = index;
      regis.projectName = project[0].projectName;
      console.log(regis[0]);
      console.log(index);
      const regisResult = await projectServices.deleteRegistrant(index, regis[0]);
      //const major_result = await projectItemServices.getAllProjectMajors(props.projectId);
      console.log(regisResult);
    };
    fetchApi3();
    const fetchApi2 = async () => {
      // var newId = Number(id);
      //   console.log(newId);
      const userResult = await accountServices.getAccountSortedByUserID(index);
      participate.projectID = Number(id);
      participate.userID = index;
      regis.projectName = project[0].projectName;

      const sendEmail = await projectServices.sendAcceptedEmail(userResult[0].email, regis);
      console.log(sendEmail);
      //alert('Thêm thành viên thành công 3');
    };
    fetchApi2();

    alert('Thêm thành viên thành công');
    window.location.reload();
    //Hàm này để add member vô dự án
    //index là userID
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
  //var arr = [{ value: 'Java' }, { value: 'ReactJs' }, { value: 'NodeJs' }];
  return (
    <div className={cx('wrapper')}>
      <h2>Project Details</h2>
      <div className={cx('project-detail')}>
        <div className={cx('project-detail-information')}>
          {project.length > 0 ? <h3>{project[0].projectName}</h3> : <h3>Project Name</h3>}
          <p>
            {project.length > 0 ? <a href="/Profile">Leader: {project[0].user}</a> : <a>Leader</a>}
            <br></br>
            {project.length > 0 ? <a>Start Date: {project[0].startTime}</a> : <a>Start Date</a>}
          </p>
          <div>
            <p>
              <h4>Description</h4>
              {project.length > 0 ? (
                <textarea id={cx('description')} defaultValue={project[0].description}></textarea>
              ) : (
                <textarea></textarea>
              )}
            </p>
          </div>
          <div>
            <p>
              <h4>Major Requirement</h4>
              <div>
                {major.map((option, index) => (
                  <span key={index} value={option.majorName}>
                    {option.majorName}
                  </span>
                ))}
              </div>
            </p>
          </div>
          <div>
            <p>
              <h4>Attachment</h4>
              <input type="file" onChange={handleChangeFile}></input>

              <button id={cx('UploadBtn')} onClick={UploadFile}>
                Upload <FontAwesomeIcon icon={faUpload} />
              </button>

              <div className={cx('linkCointainer')}>
                {link.map((option, index) => (
                  <a className="link" href={option} target="_blank" rel="noopener noreferrer">
                    {option.toString().slice(28)}
                  </a>
                ))}
              </div>
            </p>
          </div>
        </div>
        <div className={cx('project-detail-button')}>
          <div>
            {leader ? (
              <button className={cx('save-button')} onClick={Save}>
                Save
              </button>
            ) : (
              <></>
            )}

            <select id={cx('projectStatus')} className={cx('projectStatus')}>
              {project.length > 0 ? (
                <option defaultValue={project[0].projectStatus} disabled selected>
                  {project[0].projectStatus}
                </option>
              ) : (
                <option disabled selected>
                  Chọn trạng thái
                </option>
              )}
              <option value="Đã hoàn thành">Đã hoàn thành</option>
              <option value="Chưa hoàn thành">Chưa hoàn thành</option>
              <option value="Huỷ">Hủy</option>
            </select>
            {project.length > 0 ? (
              <p>
                Max Member: {project[0].maxParticipantAmount} <FontAwesomeIcon icon={faUser} />
              </p>
            ) : (
              <p>Max Member</p>
            )}
            {project.length > 0 ? (
              <p>
                Current Member: {project[0].NumberOfUsers} <FontAwesomeIcon icon={faUser} />
              </p>
            ) : (
              <p>Current Member</p>
            )}
          </div>
          <div>
            <h4>About</h4>
            <span>{liked} account like this project</span>

            <h4>Job link</h4>
            {leader ? (
              <div>
                {project.length > 0 ? (
                  <div>
                    <input id={cx('gitHubLink')} defaultValue={project[0].gitHubLink}></input>
                  </div>
                ) : (
                  <input></input>
                )}
              </div>
            ) : (
              <div>
                {project.length > 0 ? (
                  <div>
                    <input defaultValue={project[0].gitHubLink} disabled></input>
                  </div>
                ) : (
                  <input disabled></input>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <h2>Task list</h2>
      <div className={cx('task-detail')}>
        <div className="container">
          {leader ? (
            <button className={cx('addTask-btn')} onClick={toggleAdd}>
              Add new task
            </button>
          ) : (
            <></>
          )}

          <div className="wrapper-table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Status</th>
                  <th>Notice</th>
                  <th>Member</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {task.map((option, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{option.task}</td>
                    <td>{option.startTime}</td>
                    <td>{option.endTime}</td>
                    <td>{option.taskStatus}</td>
                    <td>{option.notice}</td>
                    <td>{option.user}</td>
                    <td>
                      {leader ? (
                        <button onClick={(event) => Update(event, option.progressID)}>Edit</button>
                      ) : (
                        <button onClick={(event) => Update(event, option.progressID)} disabled selected hidden>
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <h2>Member list</h2>
      <div className={cx('member-detail')}>
        <div className={cx('new-member')}>
          <h4>Applying Users</h4>
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
              {regis.map((option, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{option.user}</td>
                  <td>{option.age}</td>
                  <td>
                    {leader ? (
                      <div>
                        <button className={cx('view-btn')} onClick={(event) => View(event, option.userID)}>
                          View
                        </button>
                        &nbsp;
                        <button className={cx('add-btn')} onClick={(event) => AddMember(event, option.userID)}>
                          Add
                        </button>
                      </div>
                    ) : (
                      <div>
                        <button className={cx('view-btn')} onClick={(event) => View(event, option.userID)}>
                          View
                        </button>
                        &nbsp;
                        <button className={cx('add-btn')} onClick={(event) => AddMember(event, option.userID)}>
                          Add
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
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
                  Rate
                </th>
              </tr>
              {participateUser.map((option, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{option.user}</td>
                  <td>
                    {leader ? (
                      <button onClick={(event) => toggleRate(event, option.userID)}>Rate</button>
                    ) : (
                      <button onClick={(event) => toggleRate(event, option.userID)} disabled selected hidden>
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isAdd && <AddTask handleClose={toggleAdd} projectName={task.task} id={pId} reload={Reload} />}
      {isEdit && <EditTask handleClose={toggleEdit} progress={isTask} id={pId} reload={Reload} />}
      {isRate && <Rate handleClose={toggleRate} id={uId} pId={pId} />}
    </div>
  );
}

export default ProjectDetails;
