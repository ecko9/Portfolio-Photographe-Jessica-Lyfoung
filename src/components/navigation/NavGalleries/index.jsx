import React from 'react';
import { useSelector } from 'react-redux';
import NavGalleryButton from '../NavGalleryButton';

const NavGalleries = ({ index }) => {

  const [prev, setPrev] = React.useState(0);
  const [next, setNext] = React.useState(0);
  const galleries = useSelector(state => state.imagesReducer.galleries);

  React.useEffect(
    () => {
      if (index !== null)
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
      return;
      // eslint-disable-next-line
    }, [index]
  )

  return (
    <>

      {galleries &&
        < div className='NavGalleries' >
          <div className='NavGalleriesButtonBoxLeft'>
            <i className="fas fa-angle-left"></i>
            <NavGalleryButton index={prev} />
          </div>
          <div className='NavGalleriesButtonBoxRight'>
            <NavGalleryButton index={next} />
            <i className="fas fa-angle-right"></i>
          </div>
        </div >
      }
    </>

  );
};

export default NavGalleries;