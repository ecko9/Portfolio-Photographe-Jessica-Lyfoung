import React from 'react';
import { useNavigate } from 'react-router-dom';

const GalleryPresentationInfos = ({ swapDesign, gallery }) => {

  const navigate = useNavigate()

  const parametrizeGalleryName = (name) => {
    return name.split(" ").join("-").toLowerCase()
  }

  const setGalleryUrl = (name) => {
    return `/galleries/${parametrizeGalleryName(name)}`
  }

  return (
    <div className={swapDesign ?
      'GalleryPresentationInfos template-left animation-load-text-left' :
      'GalleryPresentationInfos template-right animation-load-text-right'
    }>
      <h3>{gallery.name}</h3>
      <p className='btn-gallery' onClick={e => navigate(setGalleryUrl(gallery.name))}>Visiter</p>
      <p className='description-txt'>{gallery.description}</p>
    </div>
  );
};

export default GalleryPresentationInfos;