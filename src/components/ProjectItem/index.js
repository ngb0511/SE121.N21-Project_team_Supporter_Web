import classNames from 'classnames/bind';
import styles from './ProjectItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
function ProjectItem({ projectName, projectDetail, projectLeader, startDate, currentMember, maxMember }) {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('project-name')}>
        <h1>{projectName}</h1>
        <h5 className={cx('leader-time')}><span>Ngày bắt đầu: </span> {startDate}</h5>
        <p className={cx('detail')}>{projectDetail}</p>
      </div>
      <div className={cx('project-fee')}>
        <h2>{projectLeader} </h2>
        <div className={cx('member')}>
          <h2>
            {currentMember} / {maxMember}&nbsp;
            <FontAwesomeIcon icon={faUsers} />
          </h2>
        </div>
      </div>
    </div>
  );
}

export default ProjectItem;
