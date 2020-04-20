export interface IMultiChoiceQuestions {
  q1: {
    question: string
    answers: {
      [key: string]: string
      a: string
      b: string
      c: string
    }
  }
  q2: {
    question: string
    answers: {
      [key: string]: string
      a: string
      b: string
      c: string
    }
  }
}

interface IAction {
  type: string
  payload?: {
    field: string
    value: string | boolean
  } | string
}

export default interface IMultiChoiceProps {
  /**
   * The dispatch method from useReducer
   */
  dispatch: (action: IAction) => void

  /**
   * The enum for useReducer actions
   */
  Action: {
    [key: string]: string
  }
  /**
   * The portion of state devoted to multiple choice answers
   */
  multiChoice: {
    q1: 'a' | 'b' | 'c' | null
    q2: 'a' | 'b' | 'c' | null
  }
}