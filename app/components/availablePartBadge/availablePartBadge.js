import React, {Component, PropTypes} from 'react';
import styles from './styles.scss';

const AvailablePartBadge = props => {
  return (
    <div className={`alert alert-success alert-dismissible ${styles.badge}`}>
      <button type="button" className="close" onClick={props.onRemove}><span aria-hidden="true">&times;</span></button>
      {props.part}
    </div>
  );
};

AvailablePartBadge.propTypes = {
  onRemove: PropTypes.func.isRequired,
  part: PropTypes.string.isRequired
};

export default AvailablePartBadge;
