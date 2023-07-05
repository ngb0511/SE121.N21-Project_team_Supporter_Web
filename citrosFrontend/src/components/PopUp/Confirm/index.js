import React from 'react';
import classNames from 'classnames/bind';
import styles from './Confirm.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
const Confirm = (props) => {
  return (
    <div className={cx('popup-box')}>
      <div className={cx('box')}>
        <span className={cx('close-icon')} onClick={props.handleClose}>
          x
        </span>
        {props.content}
        <div className={cx('content')}>
          <div>
            <FontAwesomeIcon icon={faQuestionCircle} />
          </div>
          <h1>Xác nhận?</h1>
          <br></br>
          <p>Bạn đồng ý thực hiện thao tác?</p>
          <div>
            <button id={cx('confirm')} onClick={props.handleConfirm}>
              Đồng ý
            </button>
            <button id={cx('cancel')} onClick={props.handleClose}>
              Hủy bỏ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
