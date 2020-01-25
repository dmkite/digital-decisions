type message = {
  /**
   * Is message sent or received
   */
  isReceived: boolean

  /**
   * ImageURI if text is image
   */
  imageUri?: string

  /**
   * The words being texted
   */
  text?: string
}

export interface IPhoneProps {
  /**
   * The name to appear at top of phone
   */
  name: string

  /**
   * A list of messages to display
   */
  messages: message[]

  /**
   * The profile image of the recipient
   */
  image?: string
}