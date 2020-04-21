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
      height: 208,
      width: 350
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
    'art.gif': {
      source: require('../assets/art.gif'),
      height:275,
      width:400
    },
    'fight.gif': {
      source: require('../assets/fight.gif'),
      height:275,
      width:400
    },
    'img1.png': {
      source: require('../assets/img1.png'),
      height: 525,
      width: 300
    },
    'img2.png': {
      source: require('../assets/img2.png'),
      height: 525,
      width: 300
    },
    'img3.png': {
      source: require('../assets/img3.png'),
      height: 525,
      width: 300
    },
    'img4.png': {
      source: require('../assets/img4.png'),
      height: 525,
      width: 300
    },
    'img5.png': {
      source: require('../assets/img5.png'),
      height: 525,
      width: 300
    },
    'img6.png': {
      source: require('../assets/img6.png'),
      height: 525,
      width: 300
    },
    'img7.png': {
      source: require('../assets/img7.png'),
      height: 525,
      width: 300
    }
  },
  general: {
    'wacc-banner.jpg': {
      source: require('../assets/wacc-banner.jpg'),
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