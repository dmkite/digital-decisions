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
  textContent?: string
}

export interface IPhoneProps {
  /**
   * The name to appear at top of phone
   */
  contactName: string

  /**
   * A list of messages to display
   */
  messages: message[]
}