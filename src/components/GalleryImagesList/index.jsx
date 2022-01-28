import React from 'react';
import Picture from 'components/Picture';

const GalleryImagesList = ({ images, galleryIndex, setFocusedImageIndex, setDisplay }) => {

  return (
    <div className='GalleryImagesList'>
      {images && images.map((image, i) => (
        <Picture key={image.infos.public_id} image={image.infos} widthRatio={image.widthRatio} imageIndex={i} galleryIndex={galleryIndex} setFocusedImageIndex={setFocusedImageIndex} setDisplay={setDisplay} />
      ))}
    </div>
  );
};

export default GalleryImagesList;