import classNames from 'classnames/bind';
import ProjectItem from '../../components/ProjectItem';
import styles from './List.module.scss';

const cx = classNames.bind(styles);
function List({ currentItems }) {
  return (
    <div className={cx('cointainer')}>
      {currentItems &&
        currentItems.map((projectObj, index) => (
          //lời khuyên nên để thẻ index vào thể cao nhất không nên để ở thẻ thấp hơn
          <li className={cx('project-item')} index={index}>
            <a href={`/project/${projectObj.projectID}`}>
              <ProjectItem projectName ={projectObj.projectName} projectDetail={projectObj.description} projectLeader={projectObj.leader} startDate ={projectObj.startTime} salary={projectObj.projectID} maxMember={projectObj.maxParticipantAmount} currentMember={projectObj.NumberOfUsers} />
            </a>
          </li>
        ))}
    </div>
  );
}

export default List;
