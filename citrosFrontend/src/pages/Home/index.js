//Home page
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import * as projectServices from '../../apiServices/projectItemServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import {
  faEarthAmerica,
  faUsers,
  faMagnifyingGlass,
  faArrowRight,
  faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import Paginate from '../../components/Paginate';
//import SearchBar from '../../components/SearchBar';
import * as avatarServices from '../../apiServices/avatarServices';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);
const name = 'kenza toras';

const arr = [
  { value: 'ASC', text: 'Tăng dần' },
  { value: 'DESC', text: 'Giảm dần' },
];

function Home() {
  const [project, setproject] = useState([]);
  const [avatar, setAvatar] = useState(
    'https://t3.ftcdn.net/jpg/03/16/55/44/360_F_316554461_QQ1RVxQgIBIYRa3tq4Sm3Ss1mA7xXUoo.jpg',
  );
  var userEx = JSON.parse(sessionStorage.getItem('userLogin'));
  useEffect(() => {
    const fetchApi = async () => {
      const result = await projectServices.projectAllItem();
      setproject(result);
    };
    fetchApi();
  }, []);
  useEffect(() => {
    const fetchApi = async () => {
      //var account = JSON.parse(sessionStorage.getItem('account'));
      const avatar = await avatarServices.getAvatarSortedByUserID(userEx.userID);
      var path = avatar[0].avatar.toString().split('\\');
      var avatarName = 'http://localhost:3002/images/' + path[4];
      console.log(avatarName);
      setAvatar(avatarName);
      //document.getElementsByClassName('user-img').style.backgroundImage = "url('${avatarName}')";
      //console.log(e.target.files[0]);
      //setFile(avatarName);
      //setImage(URL.createObjectURL(avatarName));
    };
    fetchApi();
  }, []);
  const handleChange = (event) => {
    console.log(event.target.value);
    if (document.getElementById('sortDate').value === 'ASC') {
      if (document.getElementById('searchInput').value !== '') {
        const fetchApi = async () => {
          const result = await projectServices.sortProjectAsc(document.getElementById('searchInput').value);
          setproject(result);
        };
        fetchApi();
      } else {
        const fetchApi = async () => {
          const result = await projectServices.sortProjectAllAsc();
          setproject(result);
        };
        fetchApi();
      }
    } else {
      if (document.getElementById('searchInput').value !== '') {
        const fetchApi = async () => {
          const result = await projectServices.sortProjectDesc(document.getElementById('searchInput').value);
          setproject(result);
        };
        fetchApi();
      } else {
        const fetchApi = async () => {
          const result = await projectServices.sortProjectAllDesc();
          setproject(result);
        };
        fetchApi();
      }
    }
  };

  function Search() {
    if (document.getElementById('searchInput').value !== '') {
      const fetchApi = async () => {
        const result = await projectServices.sortProject(document.getElementById('searchInput').value);
        setproject(result);
      };
      fetchApi();
    } else {
      const fetchApi = async () => {
        const result = await projectServices.projectAllItem();
        setproject(result);
      };
      fetchApi();
    }
  }

  const [finishStatus, setfinishStatus] = useState(false);
  const navigate = useNavigate();
  const onBackButtonEvent = (e) => {
    e.preventDefault();
    if (!finishStatus) {
      if (window.confirm('Do you want to go back ?')) {
        setfinishStatus(true);
        navigate('/Login');
        //props.history.push('/');
        sessionStorage.clear();
      } else {
        window.history.pushState(null, null, window.location.pathname);
        setfinishStatus(false);
      }
    }
  };
  useEffect(() => {
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener('popstate', onBackButtonEvent);
    return () => {
      window.removeEventListener('popstate', onBackButtonEvent);
    };
  }, []);
  //const childProject = project.slice(0, 6);
  /*return (
    <div className={cx('wrapper')}>
      <div className={cx('header')}>
        <div className={cx('text-cointainer')}>
          <h1>Một ngày tốt lành, {name}</h1>
          <p>Hãy tìm công việc phù hợp với bạn</p>
          <div className={cx('search')}>
            <button className={cx('search-btn')} id={cx('search')} onClick={Search}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
            <input className={cx('search-input')} placeholder="Search" id={cx('searchInput')}></input>
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
          <select id={cx('sortDate')} onChange={handleChange} className={cx('filter')}>
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
          <Paginate numItems={6} list={project} check={1} />
        </div>
      </div>
    </div>
  );*/

  //Lấy dữ liệu từ searchBar
  /*const [data, setData] = useState([]);
  const childToParent = (project) => {
    setData(project);
    console.log(project);
  };*/

  const [active, setActive] = useState('1');
  const handleClick = (event) => {
    setActive(event.target.id);

    const fetchApi = async () => {
      //var userEx = JSON.parse(sessionStorage.getItem('userLogin'));
      console.log(userEx);
      if (event.target.id === '1') {
        const result = await projectServices.projectAllItem();
        console.log(event.target.id);
        setproject(result);
      }
      if (event.target.id === '2') {
        const result = await projectServices.getMatchedProject(userEx.userID);
        console.log(result);
        setproject(result);
      }
      if (event.target.id === '3') {
        const result = await projectServices.getStarredProject(userEx.userID);
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
          <button>
            <a href="/About">Learn More</a>
          </button>
        </div>
        <div className={cx('search-wrapper')}>
          <input id="searchInput"></input>
          <button onClick={Search}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
        <div className={cx('work-list')}>
          <h2>Job might you like</h2>
          <div className={cx('nav')}>
            <button key={1} className={active === '1' ? cx('active') : cx('nav-btn')} id={'1'} onClick={handleClick}>
              All
            </button>
            <button key={2} className={active === '2' ? cx('active') : cx('nav-btn')} id={'2'} onClick={handleClick}>
              Best Match
            </button>
            <button key={3} className={active === '3' ? cx('active') : cx('nav-btn')} id={'3'} onClick={handleClick}>
              Saved
            </button>
          </div>
          <p>Browse jobs that match your experience to a client's hiring preferences. Ordered by most relevant.</p>
          <Paginate numItems={6} list={project} check={1} />
        </div>
      </div>
      <div className={cx('user-cointainer')}>
        <div className={cx('profile')}>
          <img src={avatar}></img>
          <a href="Profile">{userEx.fullName}</a>
          <p>Software Enginner</p>
          <div>
            <p>Ways to stand out to clients right now...</p>
            <div>
              Add a certification to highlight your skills (+%).
              <button>
                <a href="/Profile">
                  Add now <FontAwesomeIcon icon={faArrowRight} />
                </a>
              </button>
            </div>
          </div>
        </div>
        <div className={cx('tool')}>
          <p>Available Tool</p>
          <ul>
            <li>
              Edit Your Profile &nbsp;
              <a href="/Profile">
                <FontAwesomeIcon icon={faPenToSquare} />
              </a>
            </li>
            <li>
              View Your Project &nbsp;
              <a href="/Project">
                <FontAwesomeIcon icon={faPenToSquare} />
              </a>
            </li>

            <li>
              Setting Your Account &nbsp;
              <a href="/ChangePassword">
                <FontAwesomeIcon icon={faPenToSquare} />
              </a>
            </li>
            <li>
              Contact Us &nbsp;
              <a href="/Contact">
                <FontAwesomeIcon icon={faPenToSquare} />
              </a>
            </li>
          </ul>
        </div>
        <div className={cx('contact')}>
          <div>
            <FontAwesomeIcon icon={faFacebook} />
            <FontAwesomeIcon icon={faTwitter} />
            <FontAwesomeIcon icon={faGithub} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
