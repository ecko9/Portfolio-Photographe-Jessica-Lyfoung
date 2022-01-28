import GalleriesList from 'components/GalleriesList';
import Loading from 'components/Loading';
import React from 'react';

const Galleries = () => {

  return (
    <div className='Galleries'>
      <Loading />
      <GalleriesList />
    </div>
  );
};

export default Galleries;