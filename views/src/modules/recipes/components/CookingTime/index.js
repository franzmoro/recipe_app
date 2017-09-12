import React from 'react';
import PropTypes from 'prop-types';
import styles from './style';

const numTimePerClock = 10;

const ClockIcon = () => <span className="glyphicon glyphicon-time" />;

const CookingTime = ({ cookingTimeMinutes }) => {
  const numClocks = Math.round(cookingTimeMinutes / numTimePerClock);

  if (numClocks === 0) {
    return null;
  }
  const clocks = [];
  for (let i = 0; i < numClocks; i += 1) {
    clocks.push(<ClockIcon key={i} />);
  }
  return (
    <div style={styles.cookingTimeContainer}>
      {clocks}
      <div style={styles.cookingTimeNumber}>{cookingTimeMinutes}{'\''}</div>
    </div>
  );
};

CookingTime.propTypes = {
  cookingTimeMinutes: PropTypes.number.isRequired,
};

export default CookingTime;
