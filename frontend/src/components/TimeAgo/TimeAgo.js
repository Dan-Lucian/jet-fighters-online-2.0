import React from 'react';
import PropTypes from 'prop-types';

// utils
import timeAgo from '../../utils/timeAgo';

import styles from './TimeAgo.module.scss';

const propTypes = {
  timestamp: PropTypes.string.isRequired,
};

const TimeAgo = ({ timestamp }) => (
  <span className={styles.wrapper} title={timestamp}>
    {timeAgo(timestamp)}
  </span>
);

TimeAgo.propTypes = propTypes;

export default TimeAgo;
