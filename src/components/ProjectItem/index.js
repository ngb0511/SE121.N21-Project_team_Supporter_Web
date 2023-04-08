import classNames from 'classnames/bind';
import styles from './ProjectItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
function ProjectItem({ date, projectName, detail, index }) {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('project-name')}>
        <h1>{projectName}</h1>
        <h5 className={cx('leader-time')}>Leader {date.toISOString().slice(0, 10)}</h5>
        <p className={cx('detail')}>{detail}</p>
      </div>
      <div className={cx('project-fee')}>
        <h2>$15/hour</h2>
        <h2>90 hours</h2>
        <div className={cx('member')}>
          <h2>
            {index} /23 &nbsp;
            <FontAwesomeIcon icon={faUsers} />
          </h2>
        </div>
      </div>
    </div>
  );
}

export default ProjectItem;
