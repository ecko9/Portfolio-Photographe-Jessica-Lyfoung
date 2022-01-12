import React from 'react';
import { Image, Transformation } from 'cloudinary-react';

const Picture = ({ image }) => {

  const selectImageSize = () => {
    if ((image.width * 300 / image.height) > Math.floor(window.screen.width)) {
      return (
        <Image publicId={image.public_id} className="photo" key={image.public_id}>
          <Transformation height="300" width={Math.floor(window.screen.width) - 10} crop="scale" />
        </Image>
      );
    }
    else {
      return (
        <Image publicId={image.public_id} className="photo" key={image.public_id}>
          <Transformation height="300" crop="scale" />
        </Image>
      );
    }
  }

  return (
    <div className='Picture'>
      {selectImageSize()}
    </div>
  );
};

export default Picture;