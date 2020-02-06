export default interface IRadioProps {
    /**
     * An optional question to be printed to the left of the radio buttons
     */
    question?: string

    /**
     * The callback once an input has changed
     */
    callback: (response: boolean | string) => void

    /**
     * The different labels for the radio buttons
     */
    answerValues: any[]
  }