import React from 'react';
import './Skeleton.css';

const Skeleton = ({ type, width, height, className }) => {
  const classes = `skeleton ${type} ${className || ''}`;
  return (
    <div 
      className={classes}
      style={{ width, height }}
    />
  );
};

export default Skeleton; 