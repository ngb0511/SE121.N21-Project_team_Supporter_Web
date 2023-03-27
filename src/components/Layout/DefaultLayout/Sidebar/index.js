import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faListCheck, faChartLine, faReceipt, faHome } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Sidebar() {
  return (
    <aside className={cx('wrapper')}>
      <ul className={cx('sidebar-cointainer')}>
        <li className={cx('sidebar-item')}>
          <a href="Home">
            <button className={cx('item-btn')}>
              <FontAwesomeIcon icon={faHome} />
              <div className={cx('item-tittle')}>Home</div>
            </button>
          </a>
        </li>
        <li className={cx('sidebar-item')}>
          <a href="Profile">
            <button className={cx('item-btn')}>
              <FontAwesomeIcon icon={faCircleUser} />
              <div className={cx('item-tittle')}>Profile</div>
            </button>
          </a>
        </li>
        <li className={cx('sidebar-item')}>
          <a href="Project">
            <button className={cx('item-btn')}>
              <FontAwesomeIcon icon={faListCheck} />
              <div className={cx('item-tittle')}>Dự án</div>
            </button>
          </a>
        </li>
        <li className={cx('sidebar-item')}>
          <button className={cx('item-btn')}>
            <FontAwesomeIcon icon={faChartLine} />
            <div className={cx('item-tittle')}>Thống kê</div>
          </button>
        </li>
        <li className={cx('sidebar-item')}>
          <button className={cx('item-btn')}>
            <FontAwesomeIcon icon={faReceipt} />
            <div className={cx('item-tittle')}>Tài nguyên</div>
          </button>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
