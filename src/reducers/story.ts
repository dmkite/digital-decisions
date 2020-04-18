import { SELECT_STORY, SELECT_PASSAGE, ADD_PASSAGE_NAME, GO_TO_LAST_PASSAGE } from '../actions/story'
import modules from '../stories'
import {IStoryState, IAction} from '../Iredux'
 
const initialState: IStoryState = {
  selectedStory: null,
  selectedPassage: "video test",//'Welcome!',
  passageHistory: ["video test"],//['Welcome!'],
  passages: {}
}

export const storyReducer = (state: IStoryState = initialState, action: IAction): IStoryState => {
  switch( action.type) {
    case SELECT_STORY:
      const moduleName: string = action.payload.split(' ').join('')
      const selectedStory = {
        title: moduleName,
        gradientValues: modules[moduleName].gradientValues,
        description: modules[moduleName].description,
        moduleNumber: modules[moduleName].moduleNumber,
      }
      return {...initialState, selectedStory, passages: modules[moduleName].passages}
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