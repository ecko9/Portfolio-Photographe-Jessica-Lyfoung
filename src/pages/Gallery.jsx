import React from 'react';
import { CloudinaryContext } from 'cloudinary-react';
import DisplayPicture from 'components/DisplayPicture';
import NavGalleries from 'components/navigation/NavGalleries';
import GalleryImagesListBox from 'components/GalleryImagesListBox';

const Gallery = () => {

  const [galleryIndex, setGalleryIndex] = React.useState(null)
  const [imagesGrid, setImagesGrid] = React.useState(null)

  const [focusedImageIndex, setFocusedImageIndex] = React.useState(null)
  const [display, setDisplay] = React.useState(false)

  const [isNavGalleriesFixed, setIsNavGalleriesFixed] = React.useState(false)
  const [scrollYPosition, setScrollYPosition] = React.useState(0)

  React.useEffect(
    () => {
      if (isNavGalleriesFixed) {
        setScrollYPosition(0)
        window.scrollTo(0, 0)
      }
      return
      // eslint-disable-next-line
    }, [galleryIndex]
  )

  React.useEffect(
    () => {
      if (!isNavGalleriesFixed && scrollYPosition > 400)
        setIsNavGalleriesFixed(true)
      if (isNavGalleriesFixed && scrollYPosition <= 400)
        setIsNavGalleriesFixed(false)
      return
    }, [scrollYPosition, isNavGalleriesFixed]
  )

  return (
    <div
      className='Gallery'
      onWheel={e => setScrollYPosition(window.scrollY)}
      style={isNavGalleriesFixed ? { marginTop: "100px" } : { marginTop: "0px" }}
    >
      {galleryIndex !== null &&
        <NavGalleries
          index={galleryIndex} isFixed={isNavGalleriesFixed}
        />
      }

      {imagesGrid !== null && display &&
        <DisplayPicture
          focusedImageIndex={focusedImageIndex} setFocusedImageIndex={setFocusedImageIndex}
          images={imagesGrid} setDisplay={setDisplay}
        />
      }

      <CloudinaryContext cloudName="projects-images">
        <GalleryImagesListBox
          setImagesGrid={setImagesGrid} imagesGrid={imagesGrid}
          setGalleryIndex={setGalleryIndex}
          setFocusedImageIndex={setFocusedImageIndex} setDisplay={setDisplay}
        />
      </CloudinaryContext >
    </div >
  );
};

export default Gallery;