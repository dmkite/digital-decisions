import { IAction } from "../../actions/story";
import { IPassage } from "../../reducers/story"

interface IJSXContent {
  JSXType: string
  content: string
  linksTo: string
}

interface IPassageEntries {
  [key:string]: IPassage
}

export interface IDispatchProps {
  selectPassage: any
}

export interface IStateProps {
  selectedPassage: string
  passages: IPassageEntries
}

export default interface IPassageProps extends IDispatchProps, IStateProps {}