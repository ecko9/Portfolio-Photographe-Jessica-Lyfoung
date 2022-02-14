import React from 'react';
import Picture from 'components/Picture';
import { fetchImagesError, fetchImagesRequest, getGallerySuccess } from 'redux/images/actions';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const GalleryImagesListBox = ({ imagesGrid, setImagesGrid, setGalleryIndex, setFocusedImageIndex, setDisplay }) => {

  const { name } = useParams()
  const galleries = useSelector(state => state.imagesReducer.galleries)
  const dispatch = useDispatch()

  React.useLayoutEffect(
    () => {

      const createImageArrayFromGrid = (imagesGridTmp) => {
        let arrayGridTmp = []

        imagesGridTmp.map((line) => {
          if (line.freeSpace < 4)
            arrayGridTmp = arrayGridTmp.concat(line.imagesInfos)
          return line
        })
        return arrayGridTmp
      }

      const checkLineSpace = (line, col) => {
        let lineSpace = line.freeSpace;

        if (lineSpace > 0 && lineSpace >= col)
          return true
      }

      const selectDisplayImageColumns = (image, maxColumn) => {
        let ar = image.width / image.height
        if (maxColumn === 1)
          return 1
        else {
          if (ar >= 1.5 && ar < 2.5)
            if (maxColumn === 3)
              return 2
            else
              return Math.floor(maxColumn / 2)
          else if (ar >= 2.5 && ar < 3)
            if (maxColumn === 3)
              return 3
            else
              return Math.floor(maxColumn * 3 / 4)
          else if (ar >= 3)
            return maxColumn
          else
            return 1
        }
      }

      const createGridFromImages = (images, maxColumn) => {
        let imagesGridTmp = Array.from({ length: images.length }, (v) => ({ freeSpace: maxColumn, imagesInfos: [] }));

        images.map((image) => {
          let column = selectDisplayImageColumns(image, maxColumn)
          if (column > maxColumn)
            column = maxColumn

          let placed = false
          imagesGridTmp = imagesGridTmp.map((line) => {
            if (placed === true)
              return line;
            else {
              placed = checkLineSpace(line, column)
              if (placed === true)
                return { freeSpace: line.freeSpace - column, imagesInfos: [...line.imagesInfos, { infos: image, widthRatio: { column, maxColumn } }] }
              else
                return line
            }
          })
          return image
        })
        return imagesGridTmp
      }

      const setupDisplayImageGrid = (images, maxColumn) => {
        let imagesGridTmp = createGridFromImages(images, maxColumn)
        setImagesGrid(createImageArrayFromGrid(imagesGridTmp))
      }

      const chooseMaxColumn = () => {
        let screenWidth = Math.floor(window.innerWidth)

        if (screenWidth <= 800)
          return 1
        else if (screenWidth > 800 && screenWidth <= 1400)
          return 2
        else if (screenWidth > 1400 && screenWidth <= 1800)
          return 3
        else
          return 5
      }

      const matchName = (titleText, paramsText) => {
        if (titleText.toLowerCase() === paramsText.split("-").join(" "))
          return true;
        return false;
      }

      const isStored = () => {
        for (let i = 0; i < galleries.length; i++) {
          if (matchName(galleries[i].name, name))
            setGalleryIndex(i)
          if (matchName(galleries[i].name, name) && (galleries[i].images.length > 0)) {
            setupDisplayImageGrid(galleries[i].images, chooseMaxColumn())
            return true;
          }
        }
        return false;
      }

      const fetchGallery = async () => {
        if (!isStored()) {
          dispatch(fetchImagesRequest())
          fetch(`https://res.cloudinary.com/projects-images/image/list/${name}.json`)
            .then(response => response.json())
            .then(response => {
              if (response.resources) {
                setupDisplayImageGrid(response.resources, chooseMaxColumn())
                dispatch(getGallerySuccess(response.resources, name))
              }
              else
                dispatch(fetchImagesError("Problème de chargement des images (collection / images non trouvée(s)"))
            })
        }
      }

      fetchGallery()
      return;
      // eslint-disable-next-line
    }, [name]
  )

  return (
    <div className='GalleryImagesListBox'>

      <div className='GalleryImagesList'>
        {imagesGrid && imagesGrid.map((image, i) => (
          <Picture
            key={image.infos.public_id}
            imageIndex={i}
            image={image.infos}
            height={Math.floor(window.screen.height * 0.5)}
            width={Math.floor(window.innerWidth / image.widthRatio.maxColumn * image.widthRatio.column)}
            setFocusedImageIndex={setFocusedImageIndex}
            setDisplay={setDisplay} />
        ))}
      </div>

    </div>
  );
};

export default GalleryImagesListBox;