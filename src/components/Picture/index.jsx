import React from 'react';
import { Image, Transformation } from 'cloudinary-react';

const Picture = ({ image, widthRatio, imageIndex, setFocusedImageIndex, setDisplay }) => {

  const displayFocusedImageIndex = (imageIndex) => {
    setFocusedImageIndex(imageIndex)
    setDisplay(true)
  }

  return (
    <div className='Picture link animation-load-opacity' onClick={e => displayFocusedImageIndex(imageIndex)}>
      <Image publicId={image.public_id} className="photo" key={image.public_id} loading="lazy">
        <Transformation height={Math.floor(window.screen.height * 0.4)} width={Math.floor(window.innerWidth / widthRatio.maxColumn * widthRatio.column)} crop="fill" gravity="center" />
      </Image>
    </div>
  );
};

export default Picture;