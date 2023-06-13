import React from 'react';
import classNames from 'classnames/bind';
import styles from './Error.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
const Error = (props) => {
  return (
    <div className={cx('popup-box')}>
      <div className={cx('box')}>
        <span className={cx('close-icon')} onClick={props.handleClose}>
          x
        </span>
        {props.content}
        <div className={cx('content')}>
          <div>
            <FontAwesomeIcon icon={faCircleExclamation} />
          </div>
          <h1>Lỗi</h1>
          <br></br>
          <p>{props.tittle}</p>
          <div>
            <button id={cx('cancel')} onClick={props.handleClose}>
              Thoát
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
