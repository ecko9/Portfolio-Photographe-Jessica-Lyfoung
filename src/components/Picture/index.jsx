import React from 'react';
import { Image, Transformation } from 'cloudinary-react';

const Picture = ({ image, width, height, imageIndex, setFocusedImageIndex, setDisplay }) => {

  const displayFocusedImageIndex = (imageIndex) => {
    setFocusedImageIndex(imageIndex)
    setDisplay(true)
  }

  return (
    <div className='Picture link animation-load-opacity' onClick={e => displayFocusedImageIndex(imageIndex)}>
      <Image publicId={image.public_id} className="photo" key={image.public_id} loading="lazy">
        <Transformation
          height={height}
          width={width}
          crop="fill"
          gravity="center"
          quality="90"
        />
      </Image>
    </div>
  );
};

export default Picture;