import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchImagesError, fetchImagesRequest, getGallerySuccess } from 'redux/images/actions';
import { Image, Transformation } from 'cloudinary-react';

const GalleryCard = ({ gallery }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [image, setImage] = React.useState("")
  const galleries = useSelector(state => state.imagesReducer.galleries)

  React.useLayoutEffect(
    () => {


      const isStored = () => {
        for (let galleryTmp of galleries)
          if (galleryTmp.name === gallery.name && (galleryTmp.images.length > 0)) {
            setImage(galleryTmp.images[0])
            return true;
          }
        return false;
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
              }
              else
                dispatch(fetchImagesError("Problème de chargement des images (collection / images non trouvée(s)"))
            })
        }
      }

      fetchGallery()
      return;
      // eslint-disable-next-line
    }, [gallery]
  )

  const parametrizeName = (name) => {
    return name.split(" ").join("-").toLowerCase();
  }

  const selectCardWidth = () => {
    let widthScreen = Math.floor(window.screen.width)
    if (widthScreen < 700)
      return widthScreen
    else if (widthScreen >= 700 && widthScreen < 1200)
      return Math.floor(widthScreen / 2)
    else
      return Math.floor(widthScreen / 4)
  }

  return (
    <div
      className='GalleryCard link animation-load-card-right'
      onClick={e => navigate(`/galleries/${parametrizeName(gallery.name)}`)}
    >
      <Image publicId={image.public_id} className="photo-card" key={image.public_id} loading="lazy">
        <Transformation
          height={500}
          width={selectCardWidth()}
          crop="fill"
          gravity="center"
          quality="90"
        />
      </Image>

      <div className='card-overlay'>
        <h2>{gallery.name}</h2>
      </div>

    </div>
  );
};

export default GalleryCard;