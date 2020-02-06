interface IAction {
    type: string
    payload?: {
        field: string
        value: string | boolean
    } | string
}

export enum TrueFalse {
    q1 = "I know what to do if I encounter an online predator.",
    q2 = "I have seen behavior on the internet that I am not okay with.",
    q3 = "A place holder question",
    q4 = "I can't remember what all of these questions were for",
    q5 = "This is in the event that there's a really long question that may break from one line to the other."
  
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
        q5: boolean | null
    }
}