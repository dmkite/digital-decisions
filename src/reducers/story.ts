import { SELECT_STORY, SELECT_PASSAGE, ADD_PASSAGE_NAME, GO_TO_LAST_PASSAGE } from '../actions/story'
import * as modules from '../stories'

interface IPassage {
  pid: string
  name: string
  content: IJSXContent[]
}

export interface IJSXContent {
  JSXType: string
  content: string
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
  selectedStory: IStory | null
  selectedPassage: string | null
  storyHistory: string[],
}

interface IAction {
  type: string
  payload: string
}

const initialState: IState = {
  selectedStory: null,
  selectedPassage: null,
  storyHistory: [],
}

export const storyReducer = (state: IState = initialState, action: IAction): IState => {
  switch( action.type) {
    case SELECT_STORY:
      const moduleName = action.payload.split(' ').join('')
      return {...state, selectedStory: modules[moduleName]}
    case SELECT_PASSAGE:
      return {...state, selectedPassage: action.payload}
    case ADD_PASSAGE_NAME: 
      return {...state, storyHistory: [...state.storyHistory, action.payload]}
    case GO_TO_LAST_PASSAGE:
      const newHistory: string[] = state.storyHistory.slice(0, state.storyHistory.length - 1)
      return {...state, storyHistory: newHistory}
    default:
      return state
  }
}