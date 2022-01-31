import React from 'react';

const DisplayPicture = ({ focusedImageIndex, setFocusedImageIndex, images, setDisplay }) => {

  const [bigPictureUrl, setBigPictureUrl] = React.useState("")
  const [prevIndex, setPrevIndex] = React.useState(null)
  const [nextIndex, setNextIndex] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [loadingIndex, setLoadingIndex] = React.useState(focusedImageIndex)

  React.useEffect(
    () => {

      const createBigPictureUrl = (image) => {
        return "https://res.cloudinary.com/projects-images/image/upload/" + image.infos.public_id
      }

      if (images && focusedImageIndex !== null) {
        document.querySelector('div.DisplayPicture').style.left = '0%';
        setBigPictureUrl(createBigPictureUrl(images[focusedImageIndex]))

        focusedImageIndex < images.length - 1 ?
          setNextIndex(focusedImageIndex + 1) :
          setNextIndex(null)

        focusedImageIndex === 0 ?
          setPrevIndex(null) :
          setPrevIndex(focusedImageIndex - 1)
      }
      return;
    }, [focusedImageIndex, images]
  )

  const displayNewPicture = (e, index) => {
    setLoadingIndex(index)
    setIsLoading(true)
    e.preventDefault()
    e.stopPropagation()
  }

  const stopDisplay = (e) => {
    setDisplay(false)
    document.querySelector('div.DisplayPicture').style.left = '-100%';
  }

  return (
    <div className='DisplayPicture' onClick={e => stopDisplay(e)}>

      <div className='display-side-block link'>
        {prevIndex !== null && <i className="fas fa-angle-left" onClick={e => displayNewPicture(e, prevIndex)}></i>}
      </div>

      {bigPictureUrl &&
        <div
          className='big-picture'
          style={{ backgroundImage: `url(${bigPictureUrl})` }}
        >
          <div
            className={isLoading ? 'overlay animation-load-big-picture' : 'overlay'}
            onAnimationIteration={e => setFocusedImageIndex(loadingIndex)} onAnimationEnd={e => setIsLoading(false)}
          />
        </div>
      }

      <div className='display-side-block link'>
        {nextIndex !== null && <i className="fas fa-angle-right" onClick={e => displayNewPicture(e, nextIndex)}></i>}
      </div>

    </div>
  );
};

export default DisplayPicture;