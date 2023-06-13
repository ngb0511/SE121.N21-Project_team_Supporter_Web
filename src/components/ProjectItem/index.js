import classNames from 'classnames/bind';
import styles from './ProjectItem.module.scss';

//{major.length > 0 && major.map((object, key) => <h2>{object.majorName}</h2>)}
const cx = classNames.bind(styles);

var arr = [{ value: 'Java' }, { value: 'C#' }, { value: 'NodeJs' }];

function ProjectItem({ projectName, projectDetail, projectLeader, startDate, currentMember, maxMember, projectID }) {
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
        ---- Leader:
      </div>
      <p>{projectDetail}</p>
      {arr.map((option, index) => (
        <span key={index} value={option.value}>
          {option.value}
        </span>
      ))}
      <div>Số thành viên tối đa: {maxMember}</div>
    </div>
  );
}

export default ProjectItem;
