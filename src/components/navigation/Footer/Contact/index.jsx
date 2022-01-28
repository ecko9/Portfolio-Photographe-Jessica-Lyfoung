import React from 'react';

const Contact = () => {

  return (
    <div className='Contact'>

      <h2>Jessica Lyfoung - Photographe</h2>
      <h4>Montpellier</h4>

      <div className='contact-info'>

        <a className='networks' href="https://www.instagram.com/jessicanoodle/">
          <p>JessNoodle</p>
          <i className="fab fa-instagram"></i>
        </a>

        <a className='networks' href="https://www.facebook.com/J.Noodle.photography">
          <p>JiJiNoodle</p>
          <i className="fab fa-facebook-square"></i>
        </a>

        <div className='copyrights'>
          <i className="far fa-copyright"></i>
          <p>Photographies Jessica Lyfoung - Site Jean Ferstler</p>
        </div>
      </div>

    </div>
  );
};

export default Contact;