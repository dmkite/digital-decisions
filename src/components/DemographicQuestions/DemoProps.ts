
export enum School {
    MillCreek = "Mill Creek",
    DexterHigh = "Dexter High",
    NotListed = "Not listed"
}

export enum Race {
    Asian = "Asian",
    Black = "Black",
    Latinx = "Latinx",
    MixedRace = "Mixed Race",
    NativeAmerican = "Native American",
    White = "White",
    NotListed = "Not listed",
    preferNot = "Prefer not to say"
}

export enum Gender {
    male = "Male",
    female = "Female",
    NotListed = "Not listed",
    preferNot = "Prefer not to say"
}

interface IAction {
    type: string
    payload?: {
        field: string
        value: string | boolean
    } | string
}

export default interface IDemoProps {
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
     * The portion of state determining whether an explanation for why we're requesting information should be displayed
     */
    isRequestingInfo: {
        race: boolean
        gender: boolean
    }

    /**
     * The portion of state devoted to demograhpic data
     */
    demographics: {
        school: string
        zipCode: string
        age: string
        race: string
        gender: string
        altSchool: string
        altGender: string
        altRace: string
    }
}