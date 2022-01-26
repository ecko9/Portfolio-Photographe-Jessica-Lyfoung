import React from 'react';

const GalleryPresentationImages = ({ images, index, swapDesign }) => {

  const [indexSwap, setIndexSwap] = React.useState(true)
  const [indexDisplayImage, setIndexDisplayImage] = React.useState(0)
  const [indexDisplayImage2, setIndexDisplayImage2] = React.useState(1)

  const setNewAnimation = (e) => {
    index === 0 || index % 2 === 0 ?
      document.querySelector(`div#GalleryPresentationImages-${index}`).classList.add('animation-swap-img-left') :
      document.querySelector(`div#GalleryPresentationImages-${index}`).classList.add('animation-swap-img-right')
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
    document.querySelector(`div#GalleryPresentationImages-${index}`).classList.add('paused')

    indexSwap ?
      setIndexDisplayImage(loadNextImage(indexDisplayImage)) :
      setIndexDisplayImage2(loadNextImage(indexDisplayImage2))

    setIndexSwap(!indexSwap)

    setTimeout(() => {
      document.querySelector(`div#GalleryPresentationImages-${index}`).classList.remove('paused')
    }, 5000)
  }

  const setImageUrl = (image) => {
    return "https://res.cloudinary.com/projects-images/image/upload/h_2000,ar_1:1,c_fit/" + image.public_id
  }
  return (
    <div
      className={swapDesign ? 'GalleryPresentationImages animation-load-img-right' : 'GalleryPresentationImages animation-load-img-left'}
      id={`GalleryPresentationImages-${index}`}
      onAnimationIteration={e => displayAndLoad(e)} onAnimationEnd={e => setNewAnimation(e)}
    >
      <div
        className='GalleryPresentationImage active'
        style={{ backgroundImage: `url(${setImageUrl(images[indexDisplayImage])})` }}
      />
      <div
        className={swapDesign ? 'GalleryPresentationImage active-right' : 'GalleryPresentationImage active-left'}
        style={{ backgroundImage: `url(${setImageUrl(images[indexDisplayImage2])})` }}
      />
    </div>

  );
};

export default GalleryPresentationImages;