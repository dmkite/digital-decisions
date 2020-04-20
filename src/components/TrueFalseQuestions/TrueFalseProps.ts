interface IAction {
    type: string
    payload?: {
        field: string
        value: string | boolean
    } | string
}

export enum TrueFalse {
    q1 = "I know I could encounter cyber risks when I am online.",
    q2 = "I understand it is important to be kind and respectful to others online.",
    q3 = "I will do something differently online to keep myself and others safe.",
    q4 = "I will stand up for someone who is being bullied online.",
    q5 = "I think my school is a safe place for all students.",
    q6 = "I can use some of the strategies I learned to avoid cyber risks."
  }

export default interface ITrueFalseProps {
    /**
     * The dispatch method from useReducer
     */
    dispatch: (action:IAction) => void

    /**
     * The enum for useReducer actions
     */
    Action: {
        [key:string]: string
    }

    /**
     * The portion of state devoted to true or false questions
     */
    trueFalse: {
        q1: boolean | null
        q2: boolean | null
        q3: boolean | null
        q4: boolean | null
        q5: boolean | null,
        q6: boolean | null
    }
}