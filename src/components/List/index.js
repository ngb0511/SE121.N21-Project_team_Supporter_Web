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
          //lời khuyên nên để thẻ index vào thể cao nhất không nên để ở thẻ thấp hơn
          <li className={cx('project-item')} index={index}>
            <a href={`/project/${projectObj.id}`}>
              <ProjectItem date={date} projectName={projectObj.title} detail={projectObj.body} index={projectObj.id} />
            </a>
          </li>
        ))}
    </div>
  );
}

export default List;
