import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchImagesError, fetchImagesRequest, getGallerySuccess } from 'redux/images/actions';

const GalleryPresentation = ({ swapDesign, gallery, index }) => {

  const [images, setImages] = React.useState(null)
  const [indexSwap, setIndexSwap] = React.useState(true)
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

  const setNewAnimation = (e) => {
    index === 0 || index % 2 === 0 ?
      document.querySelector(`div#photo-presentation-${index}`).classList.add('animation-swap-img-left') :
      document.querySelector(`div#photo-presentation-${index}`).classList.add('animation-swap-img-right')
  }

  const loadNextImage = (index) => {
    if (index + 2 >= images.length) {
      return index + 2 - images.length
    }
    else {
      return index + 2
    }
  }

  const displayAndLoad = (e) => {
    document.querySelector(`div#photo-presentation-${index}`).classList.add('paused')

    indexSwap ?
      setIndexDisplayImage(loadNextImage(indexDisplayImage)) :
      setIndexDisplayImage2(loadNextImage(indexDisplayImage2))

    setIndexSwap(!indexSwap)

    setTimeout(async () => {
      document.querySelector(`div#photo-presentation-${index}`).classList.remove('paused')
    }, 5000)
  }

  const createUrl = (image) => {
    return "https://res.cloudinary.com/projects-images/image/upload/h_2000,ar_1:1,c_fit/" + image.public_id
  }

  return (
    <div className='GalleryPresentation'>

      {images !== null &&
        <div className={swapDesign ? 'design background-main' : 'design'}>

          <div className={swapDesign ?
            'photo-presentation background-body animation-load-img-right' :
            'photo-presentation background-main animation-load-img-left'
          } onAnimationIteration={e => displayAndLoad(e)} onAnimationEnd={e => setNewAnimation(e)} id={`photo-presentation-${index}`}>
            <div className='photo-presentation-lg active' style={{ backgroundImage: `url(${createUrl(images[indexDisplayImage])})` }} />
            <div className={swapDesign ? 'photo-presentation-lg active-right' : 'photo-presentation-lg active-left'} style={{ backgroundImage: `url(${createUrl(images[indexDisplayImage2])})` }} />
          </div>

          <div className={swapDesign ?
            'text-presentation template-left animation-load-text-left' :
            'text-presentation template-right animation-load-text-right'
          }>
            <h3>{gallery.name}</h3>
            <p>{gallery.description}</p>
          </div>

        </div>
      }
    </div >
  );
};

export default GalleryPresentation;