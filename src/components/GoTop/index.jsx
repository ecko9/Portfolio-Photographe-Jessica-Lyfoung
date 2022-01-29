import React from 'react';

const GoTop = () => {

  const goTop = (e) => {
    window.scrollTo(0, 0)
    if (document.querySelector('div.NavGalleries')) {
      document.querySelector('div.NavGalleries').style.position = "relative"
      document.querySelector('div.Gallery').style.marginTop = "0%"
    }
  }

  return (
    <div className='GoTop' onClick={e => goTop(e)}>
      <i className="fas fa-arrow-circle-up fa-2x link"></i>
    </div>
  );
};

export default GoTop;