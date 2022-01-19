import React from 'react';

const DisplayPicture = ({ focusedImageIndex, setFocusedImageIndex, images, setDisplay }) => {

  const [bigPictureUrl, setBigPictureUrl] = React.useState("")
  const [prevIndex, setPrevIndex] = React.useState(null)
  const [nextIndex, setNextIndex] = React.useState(null)

  React.useEffect(
    () => {
      const createBigPictureUrl = (image) => {
        return "https://res.cloudinary.com/projects-images/image/upload/" + image.public_id
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

  const bigPicture = (imageUrl) => (
    <div className='big-picture' style={{ backgroundImage: `url(${imageUrl})` }} />
  )

  const displayPrev = (e, prevIndex) => {
    setFocusedImageIndex(prevIndex)
    e.preventDefault()
    e.stopPropagation()
  }

  const transitionAnimation = (index) => {
    document.querySelector('div.big-picture').style.width = '0%';
    setTimeout(() => {
      setFocusedImageIndex(index)
      document.querySelector('div.big-picture').style.width = '80%'
    }, 500)
  }

  const displayNewPicture = (e, index) => {
    transitionAnimation(index)

    e.preventDefault()
    e.stopPropagation()
  }

  const stopDisplay = (e) => {
    setDisplay(false)
    document.querySelector('div.DisplayPicture').style.left = '-100%';
  }

  return (
    <div className='DisplayPicture' onClick={e => stopDisplay(e)}>
      <div className='display-side-block'>
        {prevIndex !== null && <i className="fas fa-angle-left" onClick={e => displayNewPicture(e, prevIndex)}></i>}
      </div>
      {bigPictureUrl && bigPicture(bigPictureUrl)}
      <div className='display-side-block'>
        {nextIndex !== null && <i className="fas fa-angle-right" onClick={e => displayNewPicture(e, nextIndex)}></i>}
      </div>
    </div>
  );
};

export default DisplayPicture;