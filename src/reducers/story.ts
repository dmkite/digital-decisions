import { SELECT_STORY, SELECT_PASSAGE, ADD_PASSAGE_NAME, GO_TO_LAST_PASSAGE } from '../actions/story'
import { ImageSourcePropType } from 'react-native'
import * as modules from '../stories'

interface IPassage {
  pid: string
  name: string
  content: IJSXContent[]
}

export interface IJSXContent {
  JSXType: string
  content: string | ImageSourcePropType
  linksTo: string
}

interface IStory {
  title: string
  moduleNumber: number
  gradientValues: string[]
  description: string,
  passages: IPassage[]
}

interface IState {
  selectedStory: string | null
  selectedPassage: string
  passageHistory: string[]
  passages: IPassage[]
}

interface IAction {
  type: string
  payload: string
}

const initialState: IState = {
  selectedStory: null,
  selectedPassage: 'Welcome!',
  passageHistory: [],
  passages: []
}

export const storyReducer = (state: IState = initialState, action: IAction): IState => {
  switch( action.type) {
    case SELECT_STORY:
      const moduleName: string = action.payload.split(' ').join('')
      return {...state, selectedStory: moduleName, passages: modules[moduleName].passages}
    case SELECT_PASSAGE:
      return {...state, selectedPassage: action.payload, passageHistory: [...state.passageHistory, action.payload]}
    case ADD_PASSAGE_NAME: 
      return {...state, passageHistory: [...state.passageHistory, action.payload]}
    case GO_TO_LAST_PASSAGE:
      const newHistory: string[] = state.passageHistory.slice(0, state.passageHistory.length - 1)
      return {...state, passageHistory: newHistory, selectedPassage: newHistory[newHistory.length - 1]}
    default:
      return state
  }
}