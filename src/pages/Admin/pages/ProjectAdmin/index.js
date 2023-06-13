import classNames from 'classnames/bind';
import styles from './ProjectAdmin.module.scss';
import Paginate from '../../../../components/Paginate';
import { useState } from 'react';
import SearchBar from '../../../../components/SearchBar';
const cx = classNames.bind(styles);

function ProjectAdmin() {
  //Test project
  const projectDropDown = [
    {
      projectID: '0',
      projectName: 'tesy',
      projectOwner: 'test',
      description:
        'te  qwrqwrrrrrr rrrrrrrrr  rrrrrrrrrrrrrrrrrrrrrrr r r r r r r rr r r r r r rr r r r r r r rr r rr r r r rr r r r r r rr r r r r r  rr   r r r r r r rrrrrrrrrrrrrrrrrrrrrrrrrrrrrasfasfasfasfasfa  a asd ad as das d as d as d as d as d asdasrrrrrrrrrrst',
      startTime: '0/0/2000',
      endTime: '0/0/2000',
      maxParticipantAmount: '5',
      gitHubLink: '1512512522222222222222222222222222',
    },
    {
      projectID: '0',
      projectName: 'tesy',
      projectOwner: 'test',
      description:
        'te  qwrqwrrrrrr rrrrrrrrr  rrrrrrrrrrrrrrrrrrrrrrr r r r r r r rr r r r r r rr r r r r r r rr r rr r r r rr r r r r r rr r r r r r  rr   r r r r r r rrrrrrrrrrrrrrrrrrrrrrrrrrrrrasfasfasfasfasfa  a asd ad as das d as d as d as d as d asdasrrrrrrrrrrst',
      startTime: '0/0/2000',
      endTime: '0/0/2000',
      maxParticipantAmount: '5',
      gitHubLink: '1512512522222222222222222222222222',
    },
    {
      projectID: '0',
      projectName: 'tesy',
      projectOwner: 'test',
      description:
        'te  qwrqwrrrrrr rrrrrrrrr  rrrrrrrrrrrrrrrrrrrrrrr r r r r r r rr r r r r r rr r r r r r r rr r rr r r r rr r r r r r rr r r r r r  rr   r r r r r r rrrrrrrrrrrrrrrrrrrrrrrrrrrrrasfasfasfasfasfa  a asd ad as das d as d as d as d as d asdasrrrrrrrrrrst',
      startTime: '0/0/2000',
      endTime: '0/0/2000',
      maxParticipantAmount: '5',
      gitHubLink: '1512512522222222222222222222222222',
    },
    {
      projectID: '0',
      projectName: 'tesy',
      projectOwner: 'test',
      description:
        'te  qwrqwrrrrrr rrrrrrrrr  rrrrrrrrrrrrrrrrrrrrrrr r r r r r r rr r r r r r rr r r r r r r rr r rr r r r rr r r r r r rr r r r r r  rr   r r r r r r rrrrrrrrrrrrrrrrrrrrrrrrrrrrrasfasfasfasfasfa  a asd ad as das d as d as d as d as d asdasrrrrrrrrrrst',
      startTime: '0/0/2000',
      endTime: '0/0/2000',
      maxParticipantAmount: '5',
      gitHubLink: '1512512522222222222222222222222222',
    },
  ];

  const [data, setData] = useState();
  const childToParent = (project) => {
    setData(project);
  };

  const [active, setActive] = useState('1');
  const handleClick = (event) => {
    setActive(event.target.id);
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
        <SearchBar project={childToParent} />
        {data}
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
          <Paginate numItems={6} list={projectDropDown} check={1} adminCheck={1} />
        </div>
      </div>
    </div>
  );
}

export default ProjectAdmin;
