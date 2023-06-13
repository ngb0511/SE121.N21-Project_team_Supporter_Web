import classNames from 'classnames/bind';
import styles from './ChangePassword.module.scss';

const cx = classNames.bind(styles);

function handleChange(event) {
  event.preventDefault();
}

function ChangePassword() {
  const arr = [
    { value: '1', text: 'Your best friend' },
    { value: '2', text: 'Your pet' },
    { value: '3', text: 'Your waifu' },
    { value: '4', text: 'Hail Yuri' },
  ];
  return (
    <div className={cx('wrapper')}>
      <form>
        <h2>Add extra layers of security</h2>
        <span>
          You'll be prompted to enter your unique password and security answer when we need to verify your identity. So
          be sure to choose a password and answer that only you will know.
        </span>
        <br></br>
        <label>Password:</label>
        <br></br>
        <input id="password"></input>
        <br></br>
        <label>New Password:</label>
        <br></br>
        <input id="newPass"></input>
        <br></br>
        <label>Confirm Password:</label>
        <br></br>
        <input id="confirmPass"></input>
        <br></br>
        <br></br>
        <p>
          <hr></hr>Security Question <hr></hr>
        </p>
        <br></br>
        <label>Question:</label>
        <br></br>
        <select id="question">
          <option value="" disabled selected hidden>
            --Select question--
          </option>
          {arr.map((option, index) => (
            <option key={index} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>
        <br></br>
        <label>Answer:</label>
        <br></br>
        <input id="answer"></input>
        <br></br>
        <br></br>
        <div>
          <button className={cx('confirm')} onClick={handleChange}>
            Confirm
          </button>
          <button className={cx('cancel')} onClick={handleChange}>
            Cancel
          </button>
        </div>
      </form>
      <br></br>
    </div>
  );
}

export default ChangePassword;
