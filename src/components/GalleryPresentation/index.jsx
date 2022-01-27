import GalleryPresentationImages from 'components/GalleryPresentationImages';
import GalleryPresentationInfos from 'components/GalleryPresentationInfos';
import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchImagesError, fetchImagesRequest, getGallerySuccess } from 'redux/images/actions';

const GalleryPresentation = ({ swapDesign, gallery, index }) => {

  const [images, setImages] = React.useState(null)
  const dispatch = useDispatch()

  React.useEffect(
    () => {

      if (gallery.images.length < 1) {
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

  return (
    <div className='GalleryPresentation'>

      {images !== null && <GalleryPresentationImages images={images} index={index} swapDesign={swapDesign} />}
      <GalleryPresentationInfos swapDesign={swapDesign} gallery={gallery} />

    </div>
  );
};

export default GalleryPresentation;