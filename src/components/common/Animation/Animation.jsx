import Lottie from 'react-lottie';
import React from 'react'




function Animation({path,height,width}) {
  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: path,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  return (
    <div className=''>
      <Lottie options={defaultOptions} height={height} width={width} />
    </div>
  )
}

export default Animation



