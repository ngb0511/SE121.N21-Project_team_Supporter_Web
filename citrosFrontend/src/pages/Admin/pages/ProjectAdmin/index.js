import classNames from 'classnames/bind';
import styles from './ProjectAdmin.module.scss';
import Paginate from '../../../../components/Paginate';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchBar from '../../../../components/SearchBar';
import * as projectServices from '../../../../apiServices/projectItemServices';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function ProjectAdmin() {
  const [data, setData] = useState();
  const [project, setproject] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const result = await projectServices.projectAllItem();
      setproject(result);
    };
    fetchApi();
  }, []);

  const childToParent = (project) => {
    setData(project);
  };

  function Search() {
    console.log(active);

    if (document.getElementById('searchInput').value !== '') {
      const fetchApi = async () => {
        if (active === '1') {
          const result = await projectServices.sortProject(document.getElementById('searchInput').value);
          setproject(result);
        } else if (active === '2') {
          const result = await projectServices.getAllFinishedProjectsSortedByName(
            document.getElementById('searchInput').value,
          );
          console.log(result);
          setproject(result);
        } else if (active === '3') {
          const result = await projectServices.getAllUnfinishedProjectsSortedByName(
            document.getElementById('searchInput').value,
          );
          console.log(result);
          setproject(result);
        }

        //setproject(result);
      };
      fetchApi();
    } else {
      const fetchApi = async () => {
        // const result = await projectServices.projectAllItem();
        // setproject(result);

        if (active === '1') {
          const result = await projectServices.projectAllItem();
          console.log(active);
          setproject(result);
        } else if (active === '2') {
          const result = await projectServices.getAllFinishedProjects();
          console.log(result);
          setproject(result);
        } else if (active === '3') {
          const result = await projectServices.getAllUnfinishedProjects();
          console.log(result);
          setproject(result);
        }
      };
      fetchApi();
    }
  }

  const [active, setActive] = useState('1');
  const handleClick = (event) => {
    setActive(event.target.id);

    const fetchApi = async () => {
      //var userEx = JSON.parse(sessionStorage.getItem('userLogin'));
      console.log(event.target.id);
      if (event.target.id === '1') {
        const result = await projectServices.projectAllItem();
        console.log(event.target.id);
        setproject(result);
      } else if (event.target.id === '2') {
        const result = await projectServices.getAllFinishedProjects();
        console.log(result);
        setproject(result);
      } else if (event.target.id === '3') {
        const result = await projectServices.getAllUnfinishedProjects();
        console.log(result);
        setproject(result);
      }
      //var account = JSON.parse(sessionStorage.getItem('account'));
    };
    fetchApi();
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('project-cointainer')}>
        <div className={cx('banner')}>
          <h1>CITRUS</h1>
          <p>
            Join Freelancer Plus to start each month fresh with 80 Connects. You'll get a lot of other perks too! Join
            before June 30th and unlock 6 new features for the next 3 months.
          </p>
        </div>
        <div className={cx('search-wrapper')}>
          <input id="searchInput"></input>
          <button onClick={Search}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
        <div className={cx('work-list')}>
          <h2>Project List</h2>
          <div className={cx('nav')}>
            <button key={1} className={active === '1' ? cx('active') : cx('nav-btn')} id={'1'} onClick={handleClick}>
              All
            </button>
            <button key={2} className={active === '2' ? cx('active') : cx('nav-btn')} id={'2'} onClick={handleClick}>
              Completed
            </button>
            <button key={3} className={active === '3' ? cx('active') : cx('nav-btn')} id={'3'} onClick={handleClick}>
              In progress
            </button>
          </div>
          <p>Browse jobs that match your experience to a client's hiring preferences. Ordered by most relevant.</p>
          <Paginate numItems={6} list={project} check={1} adminCheck={1} />
        </div>
      </div>
    </div>
  );
}

export default ProjectAdmin;
