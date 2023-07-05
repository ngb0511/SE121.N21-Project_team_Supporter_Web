import classNames from 'classnames/bind';
import styles from './ProjectItem.module.scss';
import * as projectServices from '../../apiServices/projectItemServices';
import { useEffect, useState } from 'react';

//{major.length > 0 && major.map((object, key) => <h2>{object.majorName}</h2>)}
const cx = classNames.bind(styles);

//var arr = [{ value: 'Java' }, { value: 'C#' }, { value: 'NodeJs' }];

function ProjectItem({
  projectName,
  projectDetail,
  projectOwner,
  user,
  startDate,
  currentMember,
  maxMember,
  majorID,
  majorName,
  projectID,
}) {
  //const [major, setArr] = useState([]);

  //console.log(projectID);
  // useEffect(() => {
  //   const fetchApi = async () => {
  //     //const result = await projectServices.getAllProjectMajors(projectID);
  //     // //console.log(result.majorName);
  //     // //console.log(leader);
  //     //setArr(result);
  //     //console.log(result);
  //   };
  //   fetchApi();
  // }, []);
  // const fetchApi =
  //   (async () => {
  //     const result = await projectServices.getAllProjectMajors(projectID);

  //     setArr(result);
  //     console.log(arr);
  //     // for (let i = 0; i < result.length; i++) {
  //     //   //console.log(major_result[i]);
  //     //   arr.add(result[i].majorName);
  //     // }
  //     //arr = result.majorName;
  //     //console.log(arr);
  //   },
  //   [projectID]);
  // useEffect(() => {
  //   fetchApi();
  // }, [fetchApi]);

  /*return (
    <div className={cx('wrapper')}>
      <div className={cx('project-name')}>
        <h1>
          {projectName} {projectID}
        </h1>
        <h5 className={cx('leader-time')}>
          <span>Ngày bắt đầu: </span> {startDate}
        </h5>
        <p className={cx('detail')}>{projectDetail}</p>
      </div>
      <div className={cx('project-fee')}>
        <h2>{projectLeader} </h2>

        <div className={cx('member')}>
          <h2>
            {maxMember}&nbsp;
            <FontAwesomeIcon icon={faUsers} />
          </h2>
        </div>
      </div>
    </div>
  );*/
  return (
    <div className={cx('wrapper')}>
      <h2>{projectName}</h2>
      <div>
        <span>Ngày bắt đầu: {startDate} </span>
        ---- Leader: {user}
      </div>
      <p>{projectDetail}</p>
      <span value={majorID}>{majorName}</span>
      <div>Số thành viên tối đa: {maxMember}</div>
    </div>
  );
}

export default ProjectItem;
