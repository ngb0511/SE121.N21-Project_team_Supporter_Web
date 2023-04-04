import classNames from 'classnames/bind';
import styles from './Project.module.scss';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
const date = new Date();
const projectItem = [
  {
    project_name: '',
    project_detail: '',
    project_leader: '',
    project_fee: '',
  },
  {
    project_name: '',
    project_detail: '',
    project_leader: '',
    project_fee: '',
  },
  {
    project_name: '',
    project_detail: '',
    project_leader: '',
    project_fee: '',
  },
];
function Project() {
  const [active, setActive] = useState('1');
  const handleClick = (event) => {
    setActive(event.target.id);
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('inner')}>
        <div className={cx('header')}>
          <ul className={cx('header-cointainer')}>
            <li className={cx('header-item')}>
              <div id={cx('i1')} className={cx('img')}></div>
              <h3>Tạo dự án của riêng bạn</h3>
              <p>Khởi tạo dự án và tìm kiếm đồng đội ngay bây giờ</p>
              <button className={cx('btn')}>Tạo</button>
            </li>
            <li className={cx('header-item')}>
              <div id={cx('i2')} className={cx('img')}></div>
              <h3>Tìm kiếm dự án</h3>
              <p>Khởi tạo dự án và tìm kiếm đồng đội ngay bây giờ</p>
              <a href="Home">
                <button className={cx('btn')}>Xem</button>
              </a>
            </li>
            <li className={cx('header-item')}>
              <div id={cx('i3')} className={cx('img')}></div>
              <h3>Tạo dự án của riêng bạn</h3>
              <p>Khởi tạo dự án và tìm kiếm đồng đội ngay bây giờ</p>
              <button className={cx('btn')}>Xem</button>
            </li>
          </ul>
        </div>
        <div className={cx('body')}>
          <h2>Dự án đã tham gia</h2>
          <div className={cx('nav')}>
            <button key={1} className={active === '1' ? cx('active') : cx('nav-btn')} id={'1'} onClick={handleClick}>
              Tất cả
            </button>
            <button key={2} className={active === '2' ? cx('active') : cx('nav-btn')} id={'2'} onClick={handleClick}>
              Đã hoàn thành
            </button>
            <button key={3} className={active === '3' ? cx('active') : cx('nav-btn')} id={'3'} onClick={handleClick}>
              Chưa hoàn thành
            </button>
          </div>
          <div className={cx('project')}>
            <ul className={cx('project-cointainer')}>
              {projectItem.map((option, index) => (
                <li className={cx('project-item')}>
                  <div className={cx('project-name')}>
                    <h1>Project Name</h1>
                    <h5 className={cx('leader-time')}>Leader {date.toISOString().slice(0, 10)}</h5>
                    <p className={cx('detail')}>
                      Sample about project. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                      doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
                      architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
                      aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
                      sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.
                    </p>
                    <a href="Home">Xem chi tiết</a>
                  </div>
                  <div className={cx('project-fee')}>
                    <h2>$15/hour</h2>
                    <h2>90 hours</h2>
                    <div className={cx('member')}>
                      <h2>
                        14/23 &nbsp;
                        <FontAwesomeIcon icon={faUsers} />
                      </h2>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <h2 className={cx('page')}> &lt;1&nbsp;2&nbsp;3&nbsp;...&nbsp;5&nbsp;&gt; </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Project;
