import { IAction } from "../../actions/story";

interface IJSXContent {
  JSXType: string
  content: string
  linksTo: string
}

export default interface IPassageProps {
  /**
   * The passage information to be rendered
   */
  passage: IJSXContent[]

  /**
   * A Redux action to advance the story
   */
  selectPassage: (passageName:string) => IAction

  /**
   * The json modules from the Redux store
   */
  passages: IJSXContent[]

  /**
   * The title associated with a specific passage
   */
  selectedPassage: string
}