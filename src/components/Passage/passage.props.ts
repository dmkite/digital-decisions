import {IPassageObject, IAction} from '../../Iredux/'

export interface IDispatchProps {
  selectPassage: (passageName: string | null) => IAction
}

export interface IStateProps {
  selectedPassage: string
  passages: IPassageObject
}

export default interface IPassageProps extends IDispatchProps, IStateProps {}