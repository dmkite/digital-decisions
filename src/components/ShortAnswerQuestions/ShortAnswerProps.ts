interface IAction {
  type: string
  payload?: {
      field: string
      value: string | boolean
  } | string
}

export enum ShortAnswerQuestion {
  q1 = "What is something you learned from today’s presentation?",
  q2 = "What concerns do you have about cyber safety or risk in your school or community?",
}



export default interface IShortAnswerProps {
   /**
     * The dispatch method from useReducer
     */
    dispatch: (action:IAction) => void

    /**
     * The action type enums for useReducer
     */
    Action: {
      [key:string]: string
    }

    /**
     * The short answer portion of state
     */
    shortAnswer: {
      q1: string
      q2: string
    }
}