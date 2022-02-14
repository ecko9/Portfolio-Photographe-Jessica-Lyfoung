import React from 'react';
import { useSelector } from 'react-redux';
import NavGalleryButton from './NavGalleryButton';
import GalleryTitle from 'components/navigation/NavGalleries/GalleryTitle';
import { useNavigate } from 'react-router-dom';

const NavGalleries = ({ index, isFixed }) => {

  const [prev, setPrev] = React.useState(null);
  const [next, setNext] = React.useState(null);
  const galleries = useSelector(state => state.imagesReducer.galleries);

  const navigate = useNavigate()

  React.useEffect(
    () => {

      if (index !== null) {
        if (index === 0) {
          setPrev(galleries.length - 1)
          setNext(1)
        }
        else if (index === galleries.length - 1) {
          setPrev(index - 1)
          setNext(0)
        }
        else {
          setPrev(index - 1)
          setNext(index + 1)
        }
      }

      return;
      // eslint-disable-next-line
    }, [index]
  )

  const parametrizeGalleryName = (gallery) => {
    return gallery.name.split(" ").join("-").toLowerCase()
  }

  return (
    < div className='NavGalleries' style={isFixed ? { position: 'fixed' } : { position: 'relative' }}>
      {prev !== null &&
        <div className='NavGalleriesButtonBoxLeft link' onClick={e => navigate(`/galleries/${parametrizeGalleryName(galleries[prev])}`)}>
          <i className="fas fa-angle-left"></i>
          <NavGalleryButton index={prev} />
        </div>
      }
      <GalleryTitle index={index} />

      {next !== null &&
        <div className='NavGalleriesButtonBoxRight link' onClick={e => navigate(`/galleries/${parametrizeGalleryName(galleries[next])}`)}>
          <NavGalleryButton index={next} />
          <i className="fas fa-angle-right"></i>
        </div>
      }

    </div >
  );
};

export default NavGalleries;