interface IAction {
  type: string
  payload?: {
      field: string
      value: string | boolean
  } | string
}

export enum ShortAnswerQuestion {
  q1 = "Here is a sample long answer question.",
  q2 = "Here is a sample long answer question where the content of the question is likely to wrap to the next line due to it's length.",
  q3 = "Here is a short question."
}


export default interface IShortAnswerProps {
   /**
     * The dispatch method from useReducer
     */
    dispatch: (action:IAction) => void
}