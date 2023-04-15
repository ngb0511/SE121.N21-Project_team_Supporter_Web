import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({ id, to, href, regular = false, sidebar = false, login = false, mini = false, children, onClick }) {
  let Comp = 'button';
  const props = {
    onClick,
  };

  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    props.href = href;
    Comp = 'a';
  }
  const classes = cx('wrapper', {
    regular,
    sidebar,
    login,
    mini,
  });
  return (
    <Comp id={id} className={classes} {...props}>
      <span>{children}</span>
    </Comp>
  );
}

export default Button;
