import {createStore, combineReducers} from 'redux'
import {storyReducer} from './reducers/story'

const rootReducer = combineReducers({story:storyReducer})

export type AppState = ReturnType<typeof rootReducer>

const store = createStore(rootReducer)

export default store