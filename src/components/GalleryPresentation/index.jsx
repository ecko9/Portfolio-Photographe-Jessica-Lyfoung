import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchImagesError, fetchImagesRequest, getGallerySuccess } from 'redux/images/actions';

const GalleryPresentation = ({ swapDesign, gallery }) => {

  const [images, setImages] = React.useState(null)
  const [indexRef, setIndexRef] = React.useState(null)
  const [indexDisplayImage, setIndexDisplayImage] = React.useState(0)
  const [indexDisplayImage2, setIndexDisplayImage2] = React.useState(1)
  const dispatch = useDispatch()

  React.useEffect(
    () => {

      if (gallery.images.length < 3) {
        let name = gallery.name.split(" ").join("-").toLowerCase()
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
      else
        setImages(gallery.images)

      return;
      // eslint-disable-next-line
    }, [gallery]
  )

  React.useEffect(
    () => {

      if (images) {

        if (indexRef === null || indexDisplayImage !== indexRef)
          if (indexDisplayImage + 2 >= images.length) {
            setTimeout(async () => { setIndexDisplayImage(indexDisplayImage + 2 - images.length) }, 5000)
            setIndexRef(indexDisplayImage + 2 - images.length)
          }
          else {
            setTimeout(async () => { setIndexDisplayImage(indexDisplayImage + 2) }, 5000)
            setIndexRef(indexDisplayImage + 2)
          }

        else
          if (indexDisplayImage2 + 2 >= images.length) {
            setTimeout(async () => { setIndexDisplayImage2(indexDisplayImage2 + 2 - images.length) }, 5000)
            setIndexRef(indexDisplayImage2 + 2 - images.length)
          }
          else {
            setTimeout(async () => { setIndexDisplayImage2(indexDisplayImage2 + 2) }, 5000)
            setIndexRef(indexDisplayImage2 + 2)
          }
      }

      return;
    }, [indexDisplayImage, indexDisplayImage2, images]
  )

  const createUrl = (image) => {
    return "https://res.cloudinary.com/projects-images/image/upload/h_1200,ar_1:1,c_fit/" + image.public_id
  }

  return (
    <div className='GalleryPresentation'>

      {images !== null &&
        <div className={swapDesign ? 'design background-main' : 'design'}>

          <div className={swapDesign ? 'photo-presentation background-body animation-load-img-right' : 'photo-presentation background-main animation-load-img-left'}>
            <div className='photo-presentation-lg active' style={{ backgroundImage: `url(${createUrl(images[indexDisplayImage])})` }} />
            <div className='photo-presentation-lg active2' style={{ backgroundImage: `url(${createUrl(images[indexDisplayImage2])})` }} />
          </div>

          <div className={swapDesign ? 'text-presentation template-left animation-load-text-left' : 'text-presentation template-right animation-load-text-right'}>
            <h3>{gallery.name}</h3>
            <p>{gallery.description}</p>
          </div>

        </div>
      }
    </div >
  );
};

export default GalleryPresentation;