import classNames from 'classnames/bind';
import styles from './About.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
function About() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('banner1')}>
        <div className={cx('text-cointainer')}>
          <h1>Come change the way the world works</h1>
          <h3>Be part of the team that's bringing this vision to life.</h3>
          <div>
            <button>Join now</button> <a href="/Contact">Contact Us </a>
          </div>
        </div>
        <div className={cx('image-cointainer')}></div>
      </div>
      <div className={cx('banner2')}>
        <div className={cx('text-cointainer')}>
          <h1>Our mission is to create economic opportunities so people have better lives.</h1>
          <h3>
            Upwork is the world’s work marketplace that connects businesses with independent talent. We serve everyone
            from one-person startups to 30% of the Fortune 100 with a powerful, trust-driven platform that enables
            companies and freelancers to work together in new ways that unlock their potential.
          </h3>
        </div>
        <div className={cx('image-cointainer')}></div>
      </div>
      <div className={cx('banner3')}>
        <div className={cx('text-cointainer')}>
          <h1>
            “Upwork's mission - to create economic opportunities so people have better lives - is a global one. It's
            also deeply personal to me as someone who grew up in Appalachia and knows so many talented folks there
            seeking economic opportunities. I am inspired every day by the work we do at Upwork to help break down
            longstanding geographic barriers so that you can build the career you want, whether that's in Appalachia or
            nearly anywhere else. “
          </h1>
          <h3>-- Lucas Deloach -- </h3>
          <span>Director, Employment Counsel</span>
        </div>
        <div className={cx('image-cointainer')}></div>
      </div>
      <div className={cx('banner3')}>
        <div className={cx('text-cointainer')}>
          <h1>
            “There is no ‘typical day’ at Upwork. Each day I get to show up and tackle new challenges. Being able to
            work closely with my teams and cross-functional key partners gives me more visibility into how we work
            together cohesively to further Upwork’s mission. Having this visibility and ability to understand
            department-level key objectives enables me to better support the business and positively accelerate my
            career path.”
          </h1>
          <h3>-- Lucas Deloach -- </h3>
          <span>Director, Employment Counsel</span>
        </div>
        <div className={cx('image-cointainer')}></div>
      </div>
      <div className={cx('banner4')}>
        <div className={cx('text-cointainer')}>
          <h1>Become a part of Upwork</h1>
          <div>
            <button>Join now</button> <a href="/Home">Contact Us </a>
          </div>
        </div>
        <div className={cx('image-cointainer')}></div>
      </div>
      <div className={cx('banner3')}>
        <div className={cx('text-cointainer')}>
          <h1>
            “There is no ‘typical day’ at Upwork. Each day I get to show up and tackle new challenges. Being able to
            work closely with my teams and cross-functional key partners gives me more visibility into how we work
            together cohesively to further Upwork’s mission. Having this visibility and ability to understand
            department-level key objectives enables me to better support the business and positively accelerate my
            career path.”
          </h1>
          <h3>-- Lucas Deloach -- </h3>
          <span>Director, Employment Counsel</span>
        </div>
        <div className={cx('image-cointainer')}></div>
      </div>
      <div className={cx('banner5')}>
        <div className={cx('text-cointainer')}>
          <h1>See more about Upwork</h1>
          <h3>Check out Upwork profiles on other platforms. </h3>
        </div>
        <div className={cx('image-cointainer')}>
          <button>
            <a href="/">
              <FontAwesomeIcon icon={faFacebook} /> &nbsp; FaceBook <FontAwesomeIcon icon={faArrowAltCircleRight} />
            </a>
          </button>
          <button>
            <a href="/">
              <FontAwesomeIcon icon={faLinkedin} /> &nbsp; Linkedin <FontAwesomeIcon icon={faArrowAltCircleRight} />
            </a>
          </button>
          <button>
            <a href="/">
              <FontAwesomeIcon icon={faTwitter} /> &nbsp; Twitter <FontAwesomeIcon icon={faArrowAltCircleRight} />
            </a>
          </button>
        </div>
      </div>
    </div>
  );
}

export default About;
