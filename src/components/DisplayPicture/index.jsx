import React from 'react';

const DisplayPicture = ({ focusedImageIndex, setFocusedImageIndex, images }) => {

  const [bigPictureUrl, setBigPictureUrl] = React.useState("")
  const [prevUrl, setPrevUrl] = React.useState(null)
  const [nextUrl, setNextUrl] = React.useState(null)

  React.useEffect(
    () => {
      const createBigPictureUrl = (image) => {
        return "https://res.cloudinary.com/projects-images/image/upload/" + image.public_id
      }

      if (images && focusedImageIndex !== null) {
        setBigPictureUrl(createBigPictureUrl(images[focusedImageIndex]))
        document.querySelector('div.DisplayPicture').style.left = '0%';
      }
      return;
    }, [focusedImageIndex, images]
  )

  const bigPicture = (imageUrl) => (
    <div className='big-picture' style={{ backgroundImage: `url(${imageUrl})` }} />
  )

  const stopDisplay = () => {
    document.querySelector('div.DisplayPicture').style.left = '-100%';
  }

  return (
    <div className='DisplayPicture' onClick={stopDisplay}>
      {console.log("tessst ::: ", focusedImageIndex)}
      <i className="fas fa-angle-left"></i>
      {bigPictureUrl && bigPicture(bigPictureUrl)}
      <i className="fas fa-angle-right"></i>
    </div>
  );
};

export default DisplayPicture;