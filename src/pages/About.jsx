import Loading from 'components/Loading';
import React from 'react';

const About = () => {
  return (
    <div className='About'>
      <Loading />

      <div className='description-bg' >
        <div
          className='img-description  animation-load-opacity'
          style={{ backgroundImage: `url(https://res.cloudinary.com/projects-images/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_white,b_rgb:111415/v1644961273/portfolio-jessica-lyfoung/asset-portfolio/137227455_10223926667937652_3222228531901960305_n_dtqcue.jpg)` }}
        />

        <div className='description animation-load-opacity'>
          <div className='description-txt'>
            <p>Bonjour et bienvenue sur mon site !</p>
            <p>Je vous présente ici mon univers et partage avec vous ce regard parfois dur, parfois tendre, de ce qui me touche au quotidien.</p>
            <p>Il y aura des mots, et surtout des <strong>images</strong>.</p>
            <p>La <strong>photographie</strong> m'a appris à me voir tel que je suis. J'ai compris à travers cette aventure que je pouvais m'amuser avec cette <strong>image</strong> et faire exister d'autres parts de moi même.</p>
            <p>Cette pratique m'accompagne depuis ma tendre (plus ou moins) adolescence. Elle m'a aidé a voir mon corps et mon visage changer au fil du temps. Elle m'a aussi montré ce que j'apprécie le moins.</p>
            <p>Aujourd'hui, je fais de cette pratique une alliée dans ma vie de tous les jours. Elle me ramène à l'essence brut de la vie. Elle redonne de la valeur aux instants présents et transmet l'espoir des jours à venir.</p>
            <p>Je vous souhaite un bon visionnage, et vous remercie de votre visite !</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;