import React from 'react';
import { gsap } from "gsap";
import './App.css';

import Blob from './svg/Blob';
import boardVector from './assets/board-vector.png';
import collabLogo from './assets/collab.png';
import bagelBoardsText from './assets/bagel-boards-text.png';
import bagelBoardText from './assets/bagel-board-text.png';
import tempBoardVideo from './assets/test.gif';
import cowBoardPic from './assets/cow-board.png';
import instagramIcon from './assets/instagram.png';

const blobSize = 500;
const blobNoise = 10;
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: window.innerWidth,
    }
  }

  componentDidMount() {
    const tween = gsap.to(".blob-container", {
      scale: this.getBlobScale(),
      duration: 1, 
      ease: "bounce"
    });
    tween.play();

    window.addEventListener('resize', this.onWindowResize, true);
    window.addEventListener('scroll', this.onWindowScroll);
  }

  scale(number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
  }

  getBlobScale = () => {
    let scrollScale, widthScale;

    const body = document.body, html = document.documentElement;
    const pageHeight = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );

    const scrollThreshold = pageHeight * 0.2;
    const scrollTopThreshold = scrollThreshold;
    const scrollBottomThreshold =  pageHeight - window.innerHeight - scrollThreshold;

    const maxScale = 1, minScale = 0.5;
    if (window.scrollY < scrollTopThreshold) {
      scrollScale = this.scale(window.scrollY, 0, scrollTopThreshold, maxScale, minScale);
    } else if (window.scrollY > scrollBottomThreshold) {
      scrollScale = this.scale(window.scrollY, scrollBottomThreshold, pageHeight - window.innerHeight, minScale, maxScale);
    } else {
      scrollScale = this.scale(scrollTopThreshold, 0, scrollTopThreshold, maxScale, minScale);
    }

    widthScale = Math.min(this.state.windowWidth * 0.003, 500);
    return widthScale * scrollScale;
  }

  resizeBlob = () => {
    const tween = gsap.to(".blob-container", {
      scale: this.getBlobScale(),
      duration: 0, 
      ease: "linear"
    });
    tween.play();
  }

  onWindowResize = () => {
    this.setState({ windowWidth: window.innerWidth });
    this.resizeBlob();
  }

  onWindowScroll = (event)  => {
    this.resizeBlob();
  }

  render() {
    const { windowWidth } = this.state;

    return (
      <div>
        <div className="header">
          <img 
            className="instagramIcon" 
            src={instagramIcon}
            alt="instagram icon" 
            onClick={() => {
              window.open("http://paperbagel.com/", '_blank');
            }}
          />
        </div>
        <div className="blob-container left-blob-container">
          <div className="blob-inner-container">
            <Blob 
                className="blob left-blob shadow-blob" 
                width={blobSize} 
                height={blobSize} 
                noiseOffset={blobNoise} 
                canvasWidth={blobSize}
                canvasHeight={blobSize}
                color="#000000"
            />
            <Blob 
                className="blob left-blob" 
                width={blobSize} 
                height={blobSize} 
                noiseOffset={blobNoise} 
                canvasWidth={blobSize}
                canvasHeight={blobSize}
                color="#000000"
            />
          </div>
        </div>
        <div className="blob-container right-blob-container">
          <div className="blob-inner-container">
            <Blob 
                className="blob right-blob shadow-blob" 
                width={blobSize} 
                height={blobSize} 
                noiseOffset={blobNoise} 
                canvasWidth={blobSize}
                canvasHeight={blobSize}
                color="#000000"
            />
            <Blob 
                className="blob right-blob" 
                width={blobSize} 
                height={blobSize} 
                noiseOffset={blobNoise} 
                canvasWidth={blobSize}
                canvasHeight={blobSize}
                color="#000000"
            />
          </div>
        </div>
        <div className="landing-outer-container">
          <div className="landing-inner-container">
            <img className="board-vector" src={boardVector} alt="board vector" />
            <img className="bagel-boards-text" src={bagelBoardsText} alt="Bagel Boards" />
            <p className="landing-subtitle">Not your usual breadboard.</p>
          </div>
        </div>
        <div className="product-outer-container">
          <div className="product-inner-container">
            <div className="video-container">
              {/* <video autoPlay muted loop>
                <source src={boardVideo}></source>
              </video> */}
              <img src={tempBoardVideo} alt="video of bagel board" />
              <div className="product-quantity-container">
                <p className="product-quantity-text">ONLY 100</p>
              </div>
              <div className="pricing-info">
                <p className="price">$15.00</p>
              </div>
            </div>
            <p className="bagel-board-type">"Moo" Limited Edition</p>
            <div className="purchase-button">
              <p className="purchase-text">Purchase</p>
            </div>
          </div>
        </div>
        <div className="product-outer-container">
          <div className="product-inner-container">
            <div className="subscribe-container">
              <div className="in-progress-box">
              <p className="in-progress-text">?</p>
              </div>
              <p className="subscribe-text">Stay tuned for our next creation.</p>
              <div className="subscribe-action-container">
                <input className="subscribe-input" placeholder='Email'></input>
                <div className="subscribe-button">
                  <p className="subscribe-button-text">lmk, ty</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
