import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchImagesError, fetchImagesRequest, getGallerySuccess } from 'redux/images/actions';

const GalleryPresentation = ({ swapDesign, gallery }) => {

  const [images, setImages] = React.useState(null)
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
    }, []
  )

  const createUrl = (image) => {
    return "https://res.cloudinary.com/projects-images/image/upload/h_2000,ar_1:1,c_fit/" + image.public_id
  }

  return (
    <div className='GalleryPresentation'>

      {images !== null &&
        <div className={swapDesign ? 'design background-main' : 'design'}>

          <div className={swapDesign ? 'photo-presentation background-body' : 'photo-presentation background-main'}>
            <div className='photo-presentation-lg' style={{ backgroundImage: `url(${createUrl(images[0])})` }} />
          </div>

          <div className={swapDesign ? 'text-presentation template-left' : 'text-presentation template-right'}>
            <h3>{gallery.name}</h3>
            <p>{gallery.description}</p>
          </div>

        </div>
      }
    </div >
  );
};

export default GalleryPresentation;