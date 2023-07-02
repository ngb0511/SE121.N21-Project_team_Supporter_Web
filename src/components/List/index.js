import classNames from 'classnames/bind';
import ProjectItem from '../../components/ProjectItem';
import * as projectServices from '../../apiServices/projectItemServices';
import styles from './List.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';

//import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
//import { useState } from 'react';
const cx = classNames.bind(styles);
var id = '';
function List({ currentItems, test, admin }) {
  //alert(check);
  // console.log(test);
  // console.log(admin);
  // console.log(currentItems);
  //console.log(projectObj.leader);
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

  const handleClick = (event, id) => {
    //setActive(event.target.id);
    console.log(id);
    const fetchApi = async () => {
      const participateResult = await projectServices.deleteAllParticipateOfProject(id);
      const result = await projectServices.deleteProject(id);
      //setMajorList(result);
      console.log(result);
      alert('Xóa thành công');
      window.location.reload();
    };
    fetchApi();
  };

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
                      <button onClick={(event) => handleClick(event, projectObj.projectID)}>Xóa</button>
                    </div>
                    <a href={`/Admin/Project/${projectObj.projectID}`}>
                      <ProjectItem
                        projectID={projectObj.projectID}
                        projectName={projectObj.projectName}
                        projectDetail={projectObj.description}
                        user={projectObj.user}
                        startDate={projectObj.startTime}
                        salary={projectObj.projectID}
                        maxMember={projectObj.maxParticipantAmount}
                        majorID={projectObj.majorID}
                        majorName={projectObj.majorName}

                        //currentMember={projectObj.NumberOfUsers}
                      />
                    </a>
                  </div>
                ) : (
                  <div>
                    <div className={cx('like')}></div>
                    <a href={`/Home/${projectObj.projectID}`}>
                      <ProjectItem
                        projectID={projectObj.projectID}
                        projectName={projectObj.projectName}
                        projectDetail={projectObj.description}
                        user={projectObj.user}
                        startDate={projectObj.startTime}
                        salary={projectObj.projectID}
                        maxMember={projectObj.maxParticipantAmount}
                        majorID={projectObj.majorID}
                        majorName={projectObj.majorName}
                        //currentMember={projectObj.NumberOfUsers}
                      />
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div className={cx('like')}></div>
                <a href={`/project/${projectObj.projectID}`}>
                  <ProjectItem
                    projectID={projectObj.projectID}
                    projectName={projectObj.projectName}
                    projectDetail={projectObj.description}
                    user={projectObj.user}
                    startDate={projectObj.startTime}
                    salary={projectObj.projectID}
                    maxMember={projectObj.maxParticipantAmount}
                    majorID={projectObj.majorID}
                    majorName={projectObj.majorName}
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
