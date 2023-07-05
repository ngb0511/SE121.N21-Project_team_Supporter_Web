import styles from './SearchBar.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import * as projectServices from '../../apiServices/projectItemServices';
const cx = classNames.bind(styles);

function SearchBar({ project }) {
  //project('325325');
  // const projectDropDown = [
  //   {
  //     projectID: '0',
  //     projectName: 'tesy',
  //     projectOwner: 'test',
  //     description:
  //       'te  qwrqwrrrrrr rrrrrrrrr  rrrrrrrrrrrrrrrrrrrrrrr r r r r r r rr r r r r r rr r r r r r r rr r rr r r r rr r r r r r rr r r r r r  rr   r r r r r r rrrrrrrrrrrrrrrrrrrrrrrrrrrrrasfasfasfasfasfa  a asd ad as das d as d as d as d as d asdasrrrrrrrrrrst',
  //     startTime: '0/0/2000',
  //     endTime: '0/0/2000',
  //     maxParticipantAmount: '5',
  //     gitHubLink: '1512512522222222222222222222222222',
  //   },
  //   {
  //     projectID: '0',
  //     projectName: 'tesy',
  //     projectOwner: 'test',
  //     description:
  //       'te  qwrqwrrrrrr rrrrrrrrr  rrrrrrrrrrrrrrrrrrrrrrr r r r r r r rr r r r r r rr r r r r r r rr r rr r r r rr r r r r r rr r r r r r  rr   r r r r r r rrrrrrrrrrrrrrrrrrrrrrrrrrrrrasfasfasfasfasfa  a asd ad as das d as d as d as d as d asdasrrrrrrrrrrst',
  //     startTime: '0/0/2000',
  //     endTime: '0/0/2000',
  //     maxParticipantAmount: '5',
  //     gitHubLink: '1512512522222222222222222222222222',
  //   },
  //   {
  //     projectID: '0',
  //     projectName: 'tesy',
  //     projectOwner: 'test',
  //     description:
  //       'te  qwrqwrrrrrr rrrrrrrrr  rrrrrrrrrrrrrrrrrrrrrrr r r r r r r rr r r r r r rr r r r r r r rr r rr r r r rr r r r r r rr r r r r r  rr   r r r r r r rrrrrrrrrrrrrrrrrrrrrrrrrrrrrasfasfasfasfasfa  a asd ad as das d as d as d as d as d asdasrrrrrrrrrrst',
  //     startTime: '0/0/2000',
  //     endTime: '0/0/2000',
  //     maxParticipantAmount: '5',
  //     gitHubLink: '1512512522222222222222222222222222',
  //   },
  //   {
  //     projectID: '0',
  //     projectName: 'tesy',
  //     projectOwner: 'test',
  //     description:
  //       'te  qwrqwrrrrrr rrrrrrrrr  rrrrrrrrrrrrrrrrrrrrrrr r r r r r r rr r r r r r rr r r r r r r rr r rr r r r rr r r r r r rr r r r r r  rr   r r r r r r rrrrrrrrrrrrrrrrrrrrrrrrrrrrrasfasfasfasfasfa  a asd ad as das d as d as d as d as d asdasrrrrrrrrrrst',
  //     startTime: '0/0/2000',
  //     endTime: '0/0/2000',
  //     maxParticipantAmount: '5',
  //     gitHubLink: '1512512522222222222222222222222222',
  //   },
  // ];
  //project([{ test: '1' }, { test: '2' }]);
  function Search() {
    if (document.getElementById('searchInput').value !== '') {
      const fetchApi = async () => {
        const result = await projectServices.sortProject(document.getElementById('searchInput').value);
        project(result);
      };
      fetchApi();
    } else {
      const fetchApi = async () => {
        const result = await projectServices.projectAllItem();
        project(result);
      };
      fetchApi();
    }
  }
  return (
    <div className={cx('wrapper')}>
      <input id="searchInput"></input>
      <button onClick={Search}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </div>
  );
}

export default SearchBar;
