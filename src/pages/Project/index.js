import classNames from 'classnames/bind';
import styles from './Project.module.scss';
import * as projectServices from '../../apiServices/projectItemServices';
import Paginate from '../../components/Paginate';
import { useState, useEffect } from 'react';
import Button from '../../components/Button';

const cx = classNames.bind(styles);

function Project() {
  const [active, setActive] = useState('1');
  const handleClick = (event) => {
    setActive(event.target.id);
  };
  const [project, setproject] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const result = await projectServices.projectAllItem();
      console.log(result);
      setproject(result);
    };
    fetchApi();
  }, []);
  return (
    <div className={cx('wrapper')}>
      <div className={cx('inner')}>
        <div className={cx('header')}>
          <ul className={cx('header-cointainer')}>
            <li className={cx('header-item')}>
              <div id={cx('i1')} className={cx('img')}></div>
              <h3>Tạo dự án của riêng bạn</h3>
              <p>Khởi tạo dự án và tìm kiếm đồng đội ngay bây giờ</p>
              <Button id="btn" regular to="/CreateProject">
                Xem
              </Button>
            </li>
            <li className={cx('header-item')}>
              <div id={cx('i2')} className={cx('img')}></div>
              <h3>Tìm kiếm dự án phù hợp</h3>
              <p>Khởi tạo dự án và tìm kiếm đồng đội ngay bây giờ</p>
              <Button id="btn" regular to="/Home">
                Xem
              </Button>
            </li>
            <li className={cx('header-item')}>
              <div id={cx('i3')} className={cx('img')}></div>
              <h3>Thống kế </h3>
              <p>Tổng hợp thông tin thành tích của bản thân</p>
              <Button id="btn" regular to="/Statistic">
                Xem
              </Button>
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
            <Paginate numItems={6} list={project} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Project;
