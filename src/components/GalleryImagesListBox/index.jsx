import React from 'react';
import Picture from 'components/Picture';
import GalleryTransition from 'components/GalleryTransition';

const GalleryImagesListBox = ({ images, galleryIndex, setFocusedImageIndex, setDisplay, isLoading, setIsLoading, loadingGalleryUrl }) => {

  return (
    <div className='GalleryImagesListBox'>
      <GalleryTransition setIsLoading={setIsLoading} isLoading={isLoading} loadingGalleryUrl={loadingGalleryUrl} />
      <div className='GalleryImagesList'>
        {images && images.map((image, i) => (
          <Picture key={image.infos.public_id} image={image.infos} widthRatio={image.widthRatio} imageIndex={i} galleryIndex={galleryIndex} setFocusedImageIndex={setFocusedImageIndex} setDisplay={setDisplay} />
        ))}
      </div>
    </div>
  );
};

export default GalleryImagesListBox;