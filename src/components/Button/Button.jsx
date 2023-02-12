import css from './button.module.scss';
import PropTypes from 'prop-types';

const Button = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className={css.button} type="button">
      {children}
    </button>
  );
};

Button.prototype = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};

export default Button;
