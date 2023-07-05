import classNames from 'classnames/bind';
import styles from './HeaderItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function HeaderItem({ name, link, sort, list }) {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('inner')}>
        <button className={cx('sort-btn')}>
          <a href={link}>
            {name} &nbsp;
            {sort ? <FontAwesomeIcon icon={faSortDown} /> : <></>}
          </a>
        </button>
        {sort ? (
          <div className={cx('content')}>
            {list.map((option, index) => (
              <a href={option.link} key={index}>
                {option.text}
              </a>
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default HeaderItem;
