import React from 'react';
import { Image, Transformation, CloudinaryContext } from 'cloudinary-react';
import { useParams } from 'react-router-dom';
import NavGalleries from 'components/navigation/NavGalleries';
import { useDispatch } from 'react-redux';
import { fetchImagesError, fetchImagesRequest, getGallerySuccess } from 'redux/images/actions';
import { useSelector } from 'react-redux';

const Gallery = () => {

  const { name } = useParams()
  const dispatch = useDispatch();
  const [images, setImages] = React.useState([])
  const galleries = useSelector(state => state.imagesReducer.galleries)

  React.useEffect(
    () => {

      const matchName = (titleText, paramsText) => {
        if (titleText.toLowerCase() === paramsText.split("-").join(" "))
          return true;
        return false;
      }

      const isStored = () => {
        for (let gallery of galleries)
          if (matchName(gallery.name, name) && (gallery.images.length > 0)) {
            setImages(gallery.images)
            return true;
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
              } else {
                dispatch(fetchImagesError("Problème de chargement des images (collection / images non trouvée(s)"))
              }
            })
        }
      }

      fetchGallery()
      return;
    }, [name]
  )



  return (
    <div className='Gallery'>
      <NavGalleries />
      <CloudinaryContext cloudName="projects-images">
        <div className='photo-gallery'>
          {images ? images.map(image => (
            <Image publicId={image.public_id} className="photo" key={image.public_id}>
              <Transformation height="300" crop="scale" />
            </Image>
          )) : ""}
        </div>
      </CloudinaryContext>
    </div>
  );
};

export default Gallery;