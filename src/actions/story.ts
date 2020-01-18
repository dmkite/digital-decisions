export const SELECT_STORY: string = 'SELECT_STORY'
export interface IAction{
    type: string,
    payload: string
}

export const selectStory = (storyName: string): IAction => ({type: SELECT_STORY, payload: storyName})

export const SELECT_PASSAGE: string = 'SELECT_PASSAGE'
export const selectPassage = (passageName: string): IAction => ({type: SELECT_PASSAGE, payload: passageName})

export const ADD_PASSAGE_NAME = 'ADD_PASSAGE_NAME'
export const addPassageName = (passageName: string) => ({
    type: ADD_PASSAGE_NAME,
    payload: passageName
})

export const GO_TO_LAST_PASSAGE = 'GO_TO_LAST_PASSAGE'
export const goToLastPassage = () => ({type: GO_TO_LAST_PASSAGE})

