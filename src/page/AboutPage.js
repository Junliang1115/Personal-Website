import React from 'react';
import profileImage from '../assets/profile-pic.png';

function AboutPage()
{
  return (
    <div style={{ minHeight: '100vh', height: '100vh', overflow: 'hidden', background: 'linear-gradient(265.9deg, #1D1515 16.75%, #342020 57.09%, #1D1515 97.42%)' }} className="flex flex-col lg:flex-row items-center justify-center text-white p-4 sm:p-8">
      <div className="lg:w-1/2 flex justify-center order-2 lg:order-1">
        <div className="text-left w-full max-w-lg" style={{marginLeft: '2vw', marginTop: '4vh'}}>
          <h1 className="text-4xl sm:text-5xl font-medium font-instrument mb-4">
            Greetings,<br />I'm Jun Liang
          </h1>
          <p className="text-base sm:text-lg font-instrument" style={{lineHeight: '1.7', marginTop: '2vh'}}>
            A Computer Science student majoring in Intelligence Computing at Universiti Sains Malaysia (USM) with a curious mind and a builder's spirit. I'm passionate about technology, art, and ideas that solve real problems.<br /><br />
            Right now, I'm sharpening my skills in AI, product design, and system architecture — with a dream to launch my own startup in the near future. Something that blends innovation with real impact.<br /><br />
            This site is my digital lab — a space to explore, create, and share the journey.<br /><br />
            Let's make ideas real.
          </p>
        </div>
      </div>
      <div className="lg:w-1/2 flex justify-center order-1 lg:order-2">
        <img
          src={profileImage}
          alt="Profile"
          className="object-cover w-full max-w-xs sm:max-w-sm lg:max-w-md rounded-lg"
          style={{marginRight: '2vw', marginTop: '8vh'}}
        />
      </div>
    </div>
  );
}

export default AboutPage;
