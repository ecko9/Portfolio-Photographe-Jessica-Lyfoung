import React from 'react';
import Picture from 'components/Picture';

const GalleryImagesList = ({ images, galleryIndex, setFocusedImageIndex, setDisplay }) => {

  const [imagesGrid, setImagesGrid] = React.useState()
  const [imagesGridColumn, setImagesGridColumn] = React.useState()

  React.useEffect(
    () => {

      let screenWidth = Math.floor(window.screen.width)

      if (screenWidth <= 700)
        setImagesGridColumn(1)
      else if (screenWidth > 700 && screenWidth <= 1500)
        setImagesGridColumn(3)
      else
        setImagesGridColumn(4)

      return;
    }, [images]
  )

  React.useEffect(
    () => {

      const checkLine = (line, col) => {
        let lineSpace = line.content.split("x").length - 1;
        console.log("LINESPACE:::::", lineSpace)
        if (lineSpace > 0 && lineSpace >= col)
          return true
      }


      const selectDisplayImageColumns = (image, column) => {
        let ar = image.width / image.height

        if (ar >= 1.5 && ar < 2.5)
          return 2
        else if (ar >= 2.5 && ar < 3.5)
          return 3
        else if (ar >= 3.5)
          if (column === 4)
            return 4
          else
            return 3
        else
          return 1
      }

      if (imagesGridColumn && imagesGridColumn > 1) {
        let imagesGridTmp = Array.from({ length: images.length }, (v) => ({ content: "x".repeat(imagesGridColumn), imagesInfos: [] }));

        images.map((image, imageIndex) => {
          let col = selectDisplayImageColumns(image, imagesGridColumn)
          let check = false
          imagesGridTmp = imagesGridTmp.map((line, indexLine) => {

            if (check === true)
              return line;

            else {
              check = checkLine(line, col)
              if (check === true)
                return { content: "x".repeat(line.content.length - col), imagesInfos: [...line.imagesInfos, { image: image, col: col, line: indexLine, imageIndex: imageIndex }] }
              else
                return line
            }
          })
          return image
        })
        setImagesGrid(imagesGridTmp)
      }
      return;
    }, [images, imagesGridColumn]
  )

  return (
    <div className='GalleryImagesList'>
      {console.log(imagesGrid)}
      {images && images.map((image, i) => (
        <Picture key={image.public_id} image={image} imageIndex={i} galleryIndex={galleryIndex} setFocusedImageIndex={setFocusedImageIndex} setDisplay={setDisplay} />
      ))}
    </div>
  );
};

export default GalleryImagesList;