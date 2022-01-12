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
    }, [index]
  )

  return (
    < div className='NavGalleries' >
      {
        console.log("prev", prev),
        console.log("index", index),
        console.log("next", next)
      }
      {galleries &&
        <div className='NavGalleriesButtonBox'>
          <NavGalleryButton index={prev} />
          <NavGalleryButton index={next} />
        </div>
      }
    </div >
  );
};

export default NavGalleries;