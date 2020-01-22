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
  content: IJSXContent[]

  /**
   * A Redux action to advance the story
   */
  selectPassage: (passageName:string) => IAction
}