import { Component } from 'react';
import css from './modal.module.scss';
import PropTypes from 'prop-types';


class Modal extends Component {
  handleEscapeClose = e => {
    if (e.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  handleBackdropClick = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      this.props.onCloseModal();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleEscapeClose);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscapeClose);
  }

  render() {
    return (
      <div onClick={this.handleBackdropClick} className={css.overlay}>
        <div className={css.modal}>
          <img src={this.props.activeImage} alt="" width="800" height="600" />
        </div>
      </div>
    );

    // );
  }
}

export default Modal;
