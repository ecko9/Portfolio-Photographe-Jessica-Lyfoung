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
    return "https://res.cloudinary.com/projects-images/image/upload/" + image.public_id
  }

  return (
    <div className='GalleryPresentation'>
      {console.log(images)}
      {images !== null && swapDesign === true &&
        <div className='alternative-design'>

          <div className='photo-presentation background-body'>
            <div className='triple-photo'>
              <div className='photo-presentation-lg' style={{ backgroundImage: `url(${createUrl(images[0])})` }} />
              <div className='double-photo'>
                <div className='photo-presentation-md' style={{ backgroundImage: `url(${createUrl(images[1])})` }} />
                <div className='photo-presentation-md' style={{ backgroundImage: `url(${createUrl(images[2])})` }} />
              </div>
            </div>
          </div>

          <div className='text-presentation background-body'>
            <h3>{gallery.name}</h3>
            <p>{gallery.description}</p>
          </div>

        </div>
      }
      {images !== null && swapDesign === false &&
        <div className='classic-design' >

          <div className='text-presentation background-main'>
            <h3>{gallery.name}</h3>
            <p>{gallery.description}</p>
          </div>

          <div className='photo-presentation background-main'>
            <div className='triple-photo'>
              <div className='photo-presentation-lg' style={{ backgroundImage: `url(${createUrl(images[0])})` }} />
              <div className='double-photo'>
                <div className='photo-presentation-md' style={{ backgroundImage: `url(${createUrl(images[1])})` }} />
                <div className='photo-presentation-md' style={{ backgroundImage: `url(${createUrl(images[2])})` }} />
              </div>
            </div>
          </div>

        </div>
      }
    </div >
  );
};

export default GalleryPresentation;