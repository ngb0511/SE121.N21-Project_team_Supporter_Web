import classNames from 'classnames/bind';
import styles from './Contact.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faLocationDot, faPhone, faPaperPlane, faEarthAmerica } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
function Contact() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('address')}>
        <h2>Let's get in touch</h2>
        <span>We're open for any suggestion or just to have a chat</span>
        <p>
          <div>
            <FontAwesomeIcon icon={faLocationDot} />
          </div>
          Address: 198 West 21th Street, Suite 721 New York NY 10016
        </p>
        <p>
          <div>
            <FontAwesomeIcon icon={faPhone} />
          </div>
          Address: 198 West 21th Street, Suite 721 New York NY 10016
        </p>
        <p>
          <div>
            <FontAwesomeIcon icon={faPaperPlane} />
          </div>
          Address: 198 West 21th Street, Suite 721 New York NY 10016
        </p>
        <p>
          <div>
            <FontAwesomeIcon icon={faEarthAmerica} />
          </div>
          Address: 198 West 21th Street, Suite 721 New York NY 10016
        </p>
      </div>
      <div className={cx('email')}>
        <form>
          <h2>Get in touch</h2>
          <br></br>
          <label>Email:</label>
          <br></br>
          <input id="email"></input>
          <br></br>
          <label>Subject:</label>
          <br></br>
          <input id="subjec"></input>
          <br></br>
          <label>Message:</label>
          <br></br>
          <textarea id="message" rows="3"></textarea>
          <br></br>
          <br></br>
          <button>
            Send &nbsp; <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
