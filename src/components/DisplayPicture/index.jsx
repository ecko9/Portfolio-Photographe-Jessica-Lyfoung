import { CloudinaryContext, Image, Transformation } from 'cloudinary-react';
import React from 'react';
import { useRef } from 'react';

const DisplayPicture = ({ focusedImageIndex, setFocusedImageIndex, images, setDisplay }) => {

  const [prevIndex, setPrevIndex] = React.useState(null)
  const [nextIndex, setNextIndex] = React.useState(null)

  const displayPictureEl = useRef()

  React.useEffect(
    () => {

      if (images && focusedImageIndex !== null) {
        displayPictureEl.current.style.left = '0%';

        focusedImageIndex < images.length - 1 ?
          setNextIndex(focusedImageIndex + 1) :
          setNextIndex(null)

        focusedImageIndex === 0 ?
          setPrevIndex(null) :
          setPrevIndex(focusedImageIndex - 1)
      }
      return;
    }, [focusedImageIndex, images]
  )

  const swapDisplayedImage = (e, index) => {
    e.stopPropagation()
    setFocusedImageIndex(index)
  }

  const stopDisplay = (e) => {
    displayPictureEl.current.style.left = '-100%';
    setDisplay(false)
  }

  return (
    <div className='DisplayPicture' ref={displayPictureEl} onClick={e => stopDisplay(e)}>

      <div className='display-side-block link'>
        {prevIndex !== null && <i className="fas fa-angle-left" onClick={e => swapDisplayedImage(e, prevIndex)}></i>}
      </div>

      <CloudinaryContext cloudName="projects-images" className='big-picture'
      >
        {images !== null && images.map((image, i) => (
          <div className='photo-lg-box' key={i}>
            <Image publicId={image.infos.public_id} className={focusedImageIndex === i ? "photo-lg-active" : "photo-lg-hidden"} >
              <Transformation width={Math.floor(window.innerWidth * 0.8)} height={Math.floor(window.innerHeight * 0.8)} crop="fit" gravity="center" />
            </Image>
          </div>
        ))}
      </CloudinaryContext>

      <div className='display-side-block link'>
        {nextIndex !== null && <i className="fas fa-angle-right" onClick={e => swapDisplayedImage(e, nextIndex)}></i>}
      </div>

    </div>
  );
};

export default DisplayPicture;