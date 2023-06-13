import classNames from 'classnames/bind';
import ProjectItem from '../../components/ProjectItem';
import styles from './List.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
//import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
//import { useState } from 'react';
const cx = classNames.bind(styles);
function List({ currentItems, test, admin }) {
  //alert(check);
  console.log(test);
  console.log(admin);
  //const [like, setLike] = useState(false);
  var liked = false;
  function check() {
    //document.getElementById('heart').check = true;
    //alert('check');
    //setLike(!like);
    /*if ((document.getElementById('checkbox').checked = true))
      document.getElementById('test').style.backgroundColor = 'red';
    else document.getElementById('test').style.backgroundColor = 'blue';*/
  }
  return (
    <div className={cx('cointainer')}>
      {currentItems &&
        currentItems.map((projectObj, index) => (
          //lời khuyên nên để thẻ index vào thể cao nhất không nên để ở thẻ thấp hơn
          <li className={cx('project-item')} index={index}>
            {test == 1 ? (
              <div>
                {admin == 1 ? (
                  <div>
                    <div className={cx('like')}>
                      <button>Xóa</button>
                    </div>
                    <a href={`/Admin/Project/${projectObj.projectID}`}>
                      <ProjectItem
                        projectID={projectObj.projectID}
                        projectName={projectObj.projectName}
                        projectDetail={projectObj.description}
                        projectLeader={projectObj.leader}
                        startDate={projectObj.startTime}
                        salary={projectObj.projectID}
                        maxMember={projectObj.maxParticipantAmount}
                        //currentMember={projectObj.NumberOfUsers}
                      />
                    </a>
                  </div>
                ) : (
                  <div>
                    <div className={cx('like')}>
                      <FontAwesomeIcon icon={faHeartSolid} /> &nbsp;
                      <input type="checkbox" id="checkbox" onChange={check}></input>
                    </div>
                    <a href={`/Home/${projectObj.projectID}`}>
                      <ProjectItem
                        projectID={projectObj.projectID}
                        projectName={projectObj.projectName}
                        projectDetail={projectObj.description}
                        projectLeader={projectObj.leader}
                        startDate={projectObj.startTime}
                        salary={projectObj.projectID}
                        maxMember={projectObj.maxParticipantAmount}
                        //currentMember={projectObj.NumberOfUsers}
                      />
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div className={cx('like')}>
                  <FontAwesomeIcon icon={faHeartSolid} /> &nbsp;
                  <input type="checkbox" id="checkbox" onChange={check}></input>
                </div>
                <a href={`/project/${projectObj.projectID}`}>
                  <ProjectItem
                    projectID={projectObj.projectID}
                    projectName={projectObj.projectName}
                    projectDetail={projectObj.description}
                    projectLeader={projectObj.leader}
                    startDate={projectObj.startTime}
                    salary={projectObj.projectID}
                    maxMember={projectObj.maxParticipantAmount}
                    //currentMember={projectObj.NumberOfUsers}
                  />
                </a>
              </div>
            )}
          </li>
        ))}
    </div>
  );
}

export default List;
