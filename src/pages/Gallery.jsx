import React from 'react';
import { CloudinaryContext } from 'cloudinary-react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchImagesError, fetchImagesRequest, getGallerySuccess } from 'redux/images/actions';
import DisplayPicture from 'components/DisplayPicture';
import NavGalleries from 'components/navigation/NavGalleries';
import GalleryImagesListBox from 'components/GalleryImagesListBox';

const Gallery = () => {

  const { name } = useParams()
  const [galleryIndex, setGalleryIndex] = React.useState(null)
  const [imagesGrid, setImagesGrid] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [loadingGalleryUrl, setLoadingGalleryUrl] = React.useState('')

  const [focusedImageIndex, setFocusedImageIndex] = React.useState(null)
  const [display, setDisplay] = React.useState(false)
  const [isNavGalleriesFixed, setIsNavGalleriesFixed] = React.useState(false)

  const galleries = useSelector(state => state.imagesReducer.galleries)
  const dispatch = useDispatch()

  React.useEffect(
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
                dispatch(getGallerySuccess(response.resources, name))
                setupDisplayImageGrid(response.resources, chooseMaxColumn())
              }
              else
                dispatch(fetchImagesError("Problème de chargement des images (collection / images non trouvée(s)"))
            })
        }
      }

      if (isNavGalleriesFixed) {
        setIsNavGalleriesFixed(false)
        window.scrollTo(0, 0)
      }

      fetchGallery()
      return;
      // eslint-disable-next-line
    }, [name]
  )

  const setNavGalleriesPosition = (e) => {
    if (isNavGalleriesFixed === false && Math.floor(window.scrollY) > 500)
      setIsNavGalleriesFixed(true)
    if (isNavGalleriesFixed && Math.floor(window.scrollY) <= 500)
      setIsNavGalleriesFixed(false)
  }

  return (
    <div className='Gallery' onWheel={e => setNavGalleriesPosition(e)} style={isNavGalleriesFixed ? { marginTop: "100px" } : { marginTop: "0px" }}>
      {galleryIndex !== null &&
        <NavGalleries
          index={galleryIndex} isFixed={isNavGalleriesFixed}
          setIsLoading={setIsLoading} setLoadingGalleryUrl={setLoadingGalleryUrl}
        />
      }

      {imagesGrid !== null && display &&
        <DisplayPicture
          focusedImageIndex={focusedImageIndex} setFocusedImageIndex={setFocusedImageIndex}
          images={imagesGrid} setDisplay={setDisplay}
        />
      }

      <CloudinaryContext cloudName="projects-images">
        {imagesGrid !== null && galleryIndex !== null &&
          <GalleryImagesListBox
            images={imagesGrid} galleryIndex={galleryIndex}
            setFocusedImageIndex={setFocusedImageIndex} setDisplay={setDisplay}
            setIsLoading={setIsLoading} isLoading={isLoading} loadingGalleryUrl={loadingGalleryUrl}
          />
        }
      </CloudinaryContext >
    </div >
  );
};

export default Gallery;