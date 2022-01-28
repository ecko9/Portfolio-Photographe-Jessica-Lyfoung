import Loading from 'components/Loading';
import React from 'react';

const NotFound = () => {
  return (
    <div className='NotFound'>
      <Loading />
      <h2>404</h2>
      <p>Not Found ...</p>
    </div>
  );
};

export default NotFound;