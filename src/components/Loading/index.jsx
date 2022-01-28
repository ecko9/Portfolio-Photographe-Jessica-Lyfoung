import React from 'react';

const Loading = () => {

  const stopLoad = (e) => {
    document.querySelector('div#Loading').classList.remove('photo-clip')
    document.querySelector('div#load').classList.remove('load')
  }

  return (
    <div className='Loading photo-clip' id="Loading" onAnimationEnd={e => stopLoad(e)}>
      <div className='load' id="load" />
    </div>
  );
};

export default Loading;