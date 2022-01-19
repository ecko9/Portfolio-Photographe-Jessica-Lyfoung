import React from 'react';
import { CloudinaryContext } from 'cloudinary-react';
import { useParams } from 'react-router-dom';
import NavGalleries from 'components/navigation/NavGalleries';
import { useDispatch } from 'react-redux';
import { fetchImagesError, fetchImagesRequest, getGallerySuccess } from 'redux/images/actions';
import { useSelector } from 'react-redux';
import Picture from 'components/Picture';
import DisplayPicture from 'components/DisplayPicture';
import GalleryTitle from 'components/GalleryTitle';

const Gallery = () => {

  const { name } = useParams()
  const [galleryIndex, setGalleryIndex] = React.useState(null)
  const [images, setImages] = React.useState([])
  const [focusedImageIndex, setFocusedImageIndex] = React.useState(null)
  const [display, setDisplay] = React.useState(false)
  const galleries = useSelector(state => state.imagesReducer.galleries)
  const dispatch = useDispatch()

  React.useEffect(
    () => {

      const matchName = (titleText, paramsText) => {
        if (titleText.toLowerCase() === paramsText.split("-").join(" "))
          return true;
        return false;
      }

      const isStored = () => {
        for (let i = 0; i < galleries.length; i++) {
          if (matchName(galleries[i].name, name))
            setGalleryIndex(i)
          if (matchName(galleries[i].name, name) && (galleries[i].images.length > 0)) {
            setImages(galleries[i].images)
            return true;
          }
        }
        return false;
      }

      const fetchGallery = async () => {
        if (!isStored()) {
          dispatch(fetchImagesRequest())
          fetch(`https://res.cloudinary.com/projects-images/image/list/${name}.json`)
            .then(response => response.json())
            .then(response => {
              if (response.resources) {
                dispatch(getGallerySuccess(response.resources, name))
                setImages(response.resources)
              }
              else
                dispatch(fetchImagesError("Problème de chargement des images (collection / images non trouvée(s)"))
            })
        }
      }

      fetchGallery()
      return;
      // eslint-disable-next-line
    }, [name]
  )



  return (
    <div className='Gallery'>

      {images && display && <DisplayPicture focusedImageIndex={focusedImageIndex} setFocusedImageIndex={setFocusedImageIndex} images={images} setDisplay={setDisplay} />}

      {galleryIndex !== null && <GalleryTitle index={galleryIndex} />}

      {galleryIndex !== null && <NavGalleries index={galleryIndex} />}

      <CloudinaryContext cloudName="projects-images">
        <div className='photo-gallery'>
          {images && images.map((image, i) => (
            <Picture key={image.public_id} image={image} imageIndex={i} galleryIndex={galleryIndex} setFocusedImageIndex={setFocusedImageIndex} setDisplay={setDisplay} />
          ))}
        </div>
      </CloudinaryContext >
    </div >
  );
};

export default Gallery;