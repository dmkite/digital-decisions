interface IImage {
  [key: string]: any
}

const imageMapper: IImage = {
  'instagram-logo.png': require('../assets/instagram-logo.png'),
  'netflix-logo.png': require('../assets/netflix-logo.png'),
  'snapchat-logo.png': require('../assets/snapchat-logo.png'),
  mod1: {
    'jess-bio.png': require('../assets/jess-bio.png'),
    'ok2say.png': require('../assets/ok2say.png'),
    'photoshop.jpg': require('../assets/photoshop.jpg'),
    'photoshop2.jpg': require('../assets/photoshop2.jpg'),
    'track-gif.gif': require('../assets/track-gif.gif'),
  },
  general: {
    'wacc-logo.jpg': require('../assets/wacc-logo.jpg'),
    'wacc-logo.png': require('../assets/wacc-logo.png'),
  }
}

export default imageMapper