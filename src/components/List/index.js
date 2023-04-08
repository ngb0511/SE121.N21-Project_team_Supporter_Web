import classNames from 'classnames/bind';
import ProjectItem from '../../components/ProjectItem';
import styles from './List.module.scss';

const cx = classNames.bind(styles);
function List({ currentItems }) {
  const date = new Date();
  return (
    <div className={cx('cointainer')}>
      {currentItems &&
        currentItems.map((projectObj, index) => (
          <li className={cx('project-item')}>
            <ProjectItem date={date} projectName={projectObj.title} detail={projectObj.body} index={index} />
          </li>
        ))}
    </div>
  );
}

export default List;
