import React from 'react';
import { Image, Transformation } from 'cloudinary-react';

const Picture = ({ image, setFocusedImageIndex, imageIndex, setDisplay }) => {



  const displayFocusedImageIndex = (imageIndex) => {
    setFocusedImageIndex(imageIndex)
    setDisplay(true)
  }

  return (
    <div className='Picture' onClick={e => displayFocusedImageIndex(imageIndex)}>
      <Image publicId={image.public_id} className="photo" key={image.public_id}>
        <Transformation height={Math.floor(window.screen.height * 0.4)} width={100} crop="fill" />
      </Image>

    </div>
  );
};

export default Picture;