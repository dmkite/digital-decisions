export const SELECT_STORY: string = 'SELECT_STORY'
export interface IAction{
    type: string,
    payload: string
}
export const selectStory = (storyName: string): IAction => ({type: SELECT_STORY, payload: storyName})

export const SELECT_PASSAGE: string = 'SELECT_PASSAGE'
export const selectPassage = (passageName: string): IAction => ({type: SELECT_PASSAGE, payload: passageName})
