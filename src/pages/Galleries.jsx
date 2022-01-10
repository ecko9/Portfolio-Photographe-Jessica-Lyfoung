import React from 'react';
import { Image, Transformation, CloudinaryContext } from 'cloudinary-react';

const Galleries = () => {

  const createImagesElements = (n) => {
    let elements = [];
    for (let i = 1; i <= n; i++) {
      elements.push(
        <Image publicId={`portfolio-jessica-lyfoung/image${i}`} className="photo" key={`image${i}`}>
          <Transformation height="300" crop="scale" />
        </Image>
      )
    }
    return elements;
  }

  return (
    <div className='Galleries'>
      <CloudinaryContext cloudName="projects-images">
        <div className='photo-gallery'>
          {createImagesElements(10)}
        </div>
      </CloudinaryContext>
    </div>
  );
};

export default Galleries;