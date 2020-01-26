import {IPassageObject, IAction} from '../../IRedux'

export interface IDispatchProps {
  selectPassage: (passageName: string) => IAction
}

export interface IStateProps {
  selectedPassage: string
  passages: IPassageObject
}

export default interface IPassageProps extends IDispatchProps, IStateProps {}