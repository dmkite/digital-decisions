interface IImage {
  [key: string]: any
}

const imageMapper: IImage = {
  mod1: {
    'instagram-logo.png': {
      source: require('../assets/instagram-logo.png'),
      height: 75,
      width: 75
    },
    'netflix-logo.png': {
      source: require('../assets/netflix-logo.png'),
      height: 75,
      width: 75
    },
    'snapchat-logo.png': {
      source: require('../assets/snapchat-logo.png'),
      height: 75,
      width: 75
    },
    'jess-bio.png': {
      source: require('../assets/jess-bio.png'),
      height: 400,
      width: 400
    },
    'ok2say.png': {
      source: require('../assets/ok2say.png'),
      height: 75,
      width: 75
    },
    'photoshop.jpg': {
      source: require('../assets/photoshop.jpg'),
      height: 75,
      width: 75
    },
    'photoshop2.jpg': {
      source: require('../assets/photoshop2.jpg'),
      height: 75,
      width: 75
    },
    'track-gif.gif': {
      source: require('../assets/track-gif.gif'),
      height: 75,
      width: 75
    },
    'img1.png': {
      source: require('../assets/img1.png'),
      height: 300,
      width: 150
    },
    'img2.png': {
      source: require('../assets/img2.png'),
      height: 300,
      width: 150
    },
    'img3.png': {
      source: require('../assets/img3.png'),
      height: 300,
      width: 150
    },
    'img4.png': {
      source: require('../assets/img4.png'),
      height: 300,
      width: 150
    },
    'img5.png': {
      source: require('../assets/img5.png'),
      height: 300,
      width: 150
    },
    'img6.png': {
      source: require('../assets/img6.png'),
      height: 300,
      width: 150
    },
    'img7.png': {
      source: require('../assets/img7.png'),
      height: 300,
      width: 150
    }
  },
  general: {
    'wacc-logo.jpg': {
      source: require('../assets/wacc-logo.jpg'),
      height: 85,
      width: 450
    },

    'wacc-logo.png': {
      source: require('../assets/wacc-logo.png'),
      height: 75,
      width: 75
    },
    'wacc-mini-logo.png': {
      source: require('../assets/wacc-logo.png'),
      height: 75,
      width: 75
    },
  }
}

export default imageMapper