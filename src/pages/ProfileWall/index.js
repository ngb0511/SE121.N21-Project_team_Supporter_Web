import { useParams } from 'react-router-dom';
import styles from './ProfileWall.module.scss';
import classNames from 'classnames/bind';
import * as projectServices from '../../apiServices/projectItemServices';
import * as accountServices from '../../apiServices/accountServices';
import * as taskServices from '../../apiServices/taskServices';
import React, { useState, useEffect } from 'react';
import Button from '../../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPenToSquare, faStar, faUser, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import EditProject from '../../components/PopUp/EditProject';
import AddTask from '../../components/PopUp/AddTask';
import EditTask from '../../components/PopUp/EditTask';
import AddMember from '../../components/PopUp/AddMember';
import Paginate from '../../components/Paginate';
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

function ProfileWall() {
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [test, setTest] = useState(
    'https://t3.ftcdn.net/jpg/03/16/55/44/360_F_316554461_QQ1RVxQgIBIYRa3tq4Sm3Ss1mA7xXUoo.jpg',
  );
  const [active, setActive] = useState('1');
  const handleClick = (event) => {
    setActive(event.target.id);
  };
  //Test project
  const projectDropDown = [
    {
      projectID: '0',
      projectName: 'tesy',
      projectOwner: 'test',
      description:
        'terrrrrrrrr  rrrrrrrrrrrrrrrrrrrrrrr r r r r r r rr r r r r r rr r r r r r r rr r rr r r r rr r r r r r rr r r r r r  rr   r r r r r r rrrrrrrrrrrrrrrrrrrrrrrrrrrrrasfasfasfasfasfa  a asd ad as das d as d as d as d as d asdasrrrrrrrrrrst',
      startTime: '0/0/2000',
      endTime: '0/0/2000',
      maxParticipantAmount: '5',
      gitHubLink: '1512512522222222222222222222222222',
    },
    {
      projectID: '0',
      projectName: 'tesy',
      projectOwner: 'test',
      description:
        'te  qwrqwrrrrrr rrrrrrrrr  rrrrrrrrrrrrrrrrrrrrrrr r r r r r r rr r r r r r rr r r r r r r rr r rr r r r rr r r r r r rr r r r r r  rr   r r r r r r rrrrrrrrrrrrrrrrrrrrrrrrrrrrrasfasfasfasfasfa  a asd ad as das d as d as d as d as d asdasrrrrrrrrrrst',
      startTime: '0/0/2000',
      endTime: '0/0/2000',
      maxParticipantAmount: '5',
      gitHubLink: '1512512522222222222222222222222222',
    },
    {
      projectID: '0',
      projectName: 'tesy',
      projectOwner: 'test',
      description:
        'te  qwrqwrrrrrr rrrrrrrrr  rrrrrrrrrrrrrrrrrrrrrrr r r r r r r rr r r r r r rr r r r r r r rr r rr r r r rr r r r r r rr r r r r r  rr   r r r r r r rrrrrrrrrrrrrrrrrrrrrrrrrrrrrasfasfasfasfasfa  a asd ad as das d as d as d as d as d asdasrrrrrrrrrrst',
      startTime: '0/0/2000',
      endTime: '0/0/2000',
      maxParticipantAmount: '5',
      gitHubLink: '1512512522222222222222222222222222',
    },
    {
      projectID: '0',
      projectName: 'tesy',
      projectOwner: 'test',
      description:
        'te  qwrqwrrrrrr rrrrrrrrr  rrrrrrrrrrrrrrrrrrrrrrr r r r r r r rr r r r r r rr r r r r r r rr r rr r r r rr r r r r r rr r r r r r  rr   r r r r r r rrrrrrrrrrrrrrrrrrrrrrrrrrrrrasfasfasfasfasfa  a asd ad as das d as d as d as d as d asdasrrrrrrrrrrst',
      startTime: '0/0/2000',
      endTime: '0/0/2000',
      maxParticipantAmount: '5',
      gitHubLink: '1512512522222222222222222222222222',
    },
  ];

  var arr = [{ value: 'Java' }, { value: 'ReactJs' }, { value: 'NodeJs' }];
  const navigate = useNavigate();

  function Back() {
    navigate(-1);
  }

  return (
    <div className={cx('wrapper')}>
      <button className={cx('backBtn')} onClick={Back}>
        <FontAwesomeIcon icon={faArrowAltCircleLeft} /> &nbsp; Back
      </button>
      <div className={cx('profile-wrapper')}>
        <div className={cx('inner')}>
          <div className={cx('edit-inner')}>
            <div className={cx('general')}>
              <h2 className={cx('tittle')}>Thông tin cơ bản</h2>
              <ul className={cx('general-cointainer')}>
                <li className={cx('general-item')}>
                  <h4 className={cx('tittle')}>Họ:</h4>
                  {users.length > 0 ? (
                    <input
                      disabled
                      id={cx('surname')}
                      className={cx('general-input')}
                      defaultValue={users[0].surname}
                    ></input>
                  ) : (
                    <input disabled id={cx('surname')} className={cx('general-input')}></input>
                  )}
                </li>
                <li className={cx('general-item')}>
                  <h4 className={cx('tittle')}>Tên:</h4>
                  {users.length > 0 ? (
                    <input
                      disabled
                      id={cx('forename')}
                      className={cx('general-input')}
                      defaultValue={users[0].forename}
                    ></input>
                  ) : (
                    <input disabled id={cx('forename')} className={cx('general-input')}></input>
                  )}
                </li>
              </ul>
              <ul className={cx('general-cointainer')}>
                <li className={cx('general-item')}>
                  <h4 className={cx('tittle')}>Giới tính:</h4>
                  {users.length > 0 ? (
                    <select disabled id={cx('gender')} className={cx('general-input')} defaultValue={users[0].gender}>
                      <option value="" disabled selected hidden>
                        Chọn giới tính
                      </option>
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                    </select>
                  ) : (
                    <select disabled id={cx('gender')} className={cx('general-input')}>
                      <option value="" disabled selected hidden>
                        Chọn giới tính
                      </option>
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                    </select>
                  )}
                </li>
                <li className={cx('general-item')}>
                  <h4 className={cx('tittle')}>Ngày sinh:</h4>
                  {users.length > 0 ? (
                    <input
                      disabled
                      id={cx('dateOfBirth')}
                      className={cx('general-input')}
                      type="date"
                      defaultValue={users[0].dateOfBirth}
                    ></input>
                  ) : (
                    <input disabled id={cx('dateOfBirth')} className={cx('general-input')} type="date"></input>
                  )}
                </li>
              </ul>
              <ul className={cx('general-cointainer')}>
                <li className={cx('general-item')}>
                  <h4 className={cx('tittle')}>Email:</h4>
                  {users.length > 0 ? (
                    <input
                      disabled
                      id={cx('email')}
                      className={cx('general-input')}
                      defaultValue={users[0].email}
                    ></input>
                  ) : (
                    <input disabled id={cx('email')} className={cx('general-input')}></input>
                  )}
                </li>
                <li className={cx('general-item')}>
                  <h4 className={cx('tittle')}>Số điện thoại:</h4>
                  {users.length > 0 ? (
                    <input
                      disabled
                      id={cx('phoneNumber')}
                      className={cx('general-input')}
                      defaultValue={users[0].phoneNumber}
                    ></input>
                  ) : (
                    <input disabled id={cx('phoneNumber')} className={cx('general-input')}></input>
                  )}
                </li>
              </ul>
              <ul className={cx('general-cointainer')}>
                <li className={cx('general-item')}>
                  <h4 className={cx('tittle')}>CMND:</h4>
                  {users.length > 0 ? (
                    <input
                      disabled
                      id={cx('idNumber')}
                      className={cx('general-input')}
                      defaultValue={users[0].idNumber}
                    ></input>
                  ) : (
                    <input disabled id={cx('idNumber')} className={cx('general-input')}></input>
                  )}
                </li>
                <li className={cx('general-item')}>
                  <h4 className={cx('tittle')}>Địa chỉ:</h4>
                  {users.length > 0 ? (
                    <input
                      disabled
                      id={cx('address')}
                      className={cx('general-input')}
                      defaultValue={users[0].address}
                    ></input>
                  ) : (
                    <input disabled id={cx('address')} className={cx('general-input')}></input>
                  )}
                </li>
              </ul>
            </div>
            <div className={cx('job')}>
              <h2 className={cx('tittle')}>Chuyên môn</h2>
              <ul className={cx('job-cointainer')}>
                <li className={cx('job-item')}>
                  <h4 className={cx('tittle')}>Trình độ:</h4>
                  {users.length > 0 ? (
                    <select disabled id={cx('degree')} className={cx('job-input')} defaultValue={users[0].degree}>
                      <option value="" disabled selected hidden>
                        Chọn trình độ
                      </option>
                      {arr.map((option, index) => (
                        <option key={index} value={option.value}>
                          {option.text}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <select disabled id={cx('degree')} className={cx('job-input')}>
                      <option value="" disabled selected hidden>
                        Chọn trình độ
                      </option>
                      {arr.map((option, index) => (
                        <option key={index} value={option.value}>
                          {option.text}
                        </option>
                      ))}
                    </select>
                  )}
                </li>
                <li className={cx('job-item')}>
                  <h4 className={cx('tittle')}>Nghề nghiệp:</h4>
                  {users.length > 0 ? (
                    <input
                      disabled
                      id={cx('userJob')}
                      className={cx('general-input')}
                      defaultValue={users[0].job}
                    ></input>
                  ) : (
                    <input disabled id={cx('userJob')} className={cx('general-input')}></input>
                  )}
                </li>
                <li className={cx('job-item')}>
                  <h4 className={cx('tittle')}>Số năm kinh nghiệm:</h4>
                  {users.length > 0 ? (
                    <input
                      disabled
                      id={cx('experience')}
                      className={cx('job-input')}
                      defaultValue={users[0].experience}
                    ></input>
                  ) : (
                    <input disabled id={cx('experience')} className={cx('job-input')}></input>
                  )}
                </li>
              </ul>
              <div className={cx('introduce')}>
                <h4 className={cx('tittle')}>Giới thiệu:</h4>
                {users.length > 0 ? (
                  <textarea
                    disabled
                    id={cx('description')}
                    className={cx('introduce-input')}
                    cols="40"
                    rows="5"
                    defaultValue={users[0].description}
                  ></textarea>
                ) : (
                  <textarea
                    disabled
                    id={cx('description')}
                    className={cx('introduce-input')}
                    cols="40"
                    rows="5"
                  ></textarea>
                )}
              </div>
            </div>
          </div>
          <div className={cx('main-inner')}>
            <div className={cx('profile')}>
              <img className={cx('user-img')} src={test} alt="error"></img>
              <br></br>
              <a href="/Home">CV:</a>
            </div>
            <div className={cx('stastics')}>
              <h4>
                Account Created from <p>3 years</p>
              </h4>
              <h4>
                Total projects joined <p>4 projects</p>
              </h4>
              <h4>
                Total projects owner <p>0 projects</p>
              </h4>
              <h4>
                Rating
                <p>
                  4 <FontAwesomeIcon icon={faStar} />
                </p>
              </h4>
              <div className={cx('contact')}>
                <div>
                  <FontAwesomeIcon icon={faFacebook} />
                  <FontAwesomeIcon icon={faTwitter} />
                  <FontAwesomeIcon icon={faGithub} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={cx('project-wrapper')}>
        <div className={cx('project-cointainer')}>
          <div className={cx('work-list')}>
            <h2>Project Report</h2>
            <div className={cx('nav')}>
              <button key={1} className={active === '1' ? cx('active') : cx('nav-btn')} id={'1'} onClick={handleClick}>
                All
              </button>
              <button key={2} className={active === '2' ? cx('active') : cx('nav-btn')} id={'2'} onClick={handleClick}>
                Completed
              </button>
              <button key={3} className={active === '3' ? cx('active') : cx('nav-btn')} id={'3'} onClick={handleClick}>
                In Progress
              </button>
              <button key={4} className={active === '4' ? cx('active') : cx('nav-btn')} id={'4'} onClick={handleClick}>
                Owner
              </button>
            </div>
            <Paginate numItems={6} list={projectDropDown} check={1} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileWall;
