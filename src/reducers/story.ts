import { SELECT_STORY, SELECT_PASSAGE } from '../actions/story'


interface IState {
  selectedStory: string | null
  selectedPassage: string | null
}

interface IAction {
  type: string
  payload: string
}

const initialState: IState = {
  selectedStory: null,
  selectedPassage: null
}

export const storyReducer = (state: IState = initialState, action: IAction): IState => {
  switch( action.type) {
    case SELECT_STORY:
      return {...state, selectedStory: action.payload}
    case SELECT_PASSAGE:
      return {...state, selectedPassage: action.payload}
    default:
      return state
  }
}