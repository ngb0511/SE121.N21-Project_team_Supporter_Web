//Home page
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import * as projectServices from '../../apiServices/projectItemServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { faEarthAmerica, faUsers, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Paginate from '../../components/Paginate';

const cx = classNames.bind(styles);
const name = 'kenza toras';

const arr = [
  { value: '', text: 'Tăng dần' },
  { value: '', text: 'Gảm dần' },
];

const handleChange = (event) => {
  console.log(event.target.value);
};
function Home() {
  const [project, setproject] = useState([]);
  const fetchApi = async () => {
    const result = await projectServices.projectAllItem();
    console.log(result);
    setproject(result);
  };
  fetchApi();

  //const childProject = project.slice(0, 6);
  return (
    <div className={cx('wrapper')}>
      <div className={cx('header')}>
        <div className={cx('text-cointainer')}>
          <h1>Một ngày tốt lành, {name}</h1>
          <p>Hãy tìm công việc phù hợp với bạn</p>
          <div className={cx('search')}>
            <button className={cx('search-btn')}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
            <input className={cx('search-input')} placeholder="Search"></input>
          </div>
        </div>
        <div className={cx('img-cointainer')}>
          <FontAwesomeIcon icon={faEarthAmerica} />
          &nbsp;&nbsp;
          <FontAwesomeIcon icon={faUsers} />
        </div>
      </div>
      <div className={cx('inner')}>
        <div className={cx('action-cointainer')}>
          <p className={cx('tittle')}>{project.length} kết quả</p>
          <select onChange={handleChange} className={cx('filter')}>
            <option value="" disabled selected hidden>
              --Sắp xếp--
            </option>
            {arr.map((option, index) => (
              <option key={index} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        </div>
        <div className={cx('project')}>
          <Paginate numItems={6} list={project} />
        </div>
      </div>
    </div>
  );
}

export default Home;
