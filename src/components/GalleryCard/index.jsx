import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchImagesError, fetchImagesRequest, getGallerySuccess } from 'redux/images/actions';

const GalleryCard = ({ gallery }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [image, setImage] = React.useState()
  const [imageUrl, setImageUrl] = React.useState("")
  const galleries = useSelector(state => state.imagesReducer.galleries)

  React.useEffect(
    () => {


      const isStored = () => {
        for (let galleryTmp of galleries)
          if (galleryTmp.name === gallery.name && (galleryTmp.images.length > 0)) {
            setImage(galleryTmp.images[0])
            setImageUrl(createUrl(galleryTmp.images[0]))
            return true;
          }
        return false;
      }

      const createUrl = (image) => {
        return "https://res.cloudinary.com/projects-images/image/upload/w_300,ar_1:1,c_fill,g_auto/" + image.public_id
      }

      const fetchGallery = async () => {
        let name = gallery.name.split(" ").join("-").toLowerCase()
        if (!isStored()) {
          dispatch(fetchImagesRequest())
          fetch(`https://res.cloudinary.com/projects-images/image/list/${name}.json`)
            .then(response => response.json())
            .then(response => {
              if (response.resources) {
                dispatch(getGallerySuccess(response.resources, name))
                setImage(response.resources[0])
                setImageUrl(createUrl(response.resources[0]))
              }
              else
                dispatch(fetchImagesError("Problème de chargement des images (collection / images non trouvée(s)"))
            })
        }
      }

      fetchGallery()
      return;
    }, []
  )

  const parametrizeName = (name) => {
    return name.split(" ").join("-").toLowerCase();
  }

  return (
    <div className='GalleryCard' onClick={e => navigate(`/galleries/${parametrizeName(gallery.name)}`)} style={{ "backgroundImage": `url(${imageUrl})` }}>
      <div className='card-overlay'>
        <h2>{gallery.name}</h2>
      </div>
    </div>
  );
};

export default GalleryCard;