interface IImage {
  [key: string]: any
}

const imageMapper: IImage = {
  'instagram-logo': require('../assets/instagram-logo.png'),
  'netflix-logo': require('../assets/netflix-logo.png'),
  'snapchat-logo': require('../assets/snapchat-logo.png'),
}

export default imageMapper