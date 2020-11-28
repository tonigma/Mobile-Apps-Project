/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React from 'react';

const LoanHoc = (WrappedComponent) => (props) => {
  return <WrappedComponent {...props} />;
};

export default LoanHoc;
