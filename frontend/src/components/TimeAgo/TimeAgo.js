import React from 'react';
import PropTypes from 'prop-types';

// utils
import timeAgo from '../../utils/timeAgo';

const propTypes = {
  timestamp: PropTypes.string.isRequired,
};

const TimeAgo = ({ timestamp }) => (
  <span title={timestamp}>
    <i>{timeAgo(timestamp)}</i>
  </span>
);

TimeAgo.propTypes = propTypes;

export default TimeAgo;
