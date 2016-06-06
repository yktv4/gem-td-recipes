import React, {Component, PropTypes} from 'react';

const AvailablePartBadge = props => {
  return (
    <span>
      {props.part} <a href="javascript:void(0)" onClick={props.onRemove}>[x]</a>
    </span>
  );
};

AvailablePartBadge.propTypes = {
  onRemove: PropTypes.func.isRequired,
  part: PropTypes.string.isRequired
};

export default AvailablePartBadge;
