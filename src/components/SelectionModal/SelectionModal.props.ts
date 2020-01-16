import {IAction, INavigationProps} from '../../screens/HomeScreen'
import { NavigationStackProp } from 'react-navigation-stack';

export default interface ISelectionModalProps {
  /**
   * The title of the selected story
   */
  title: string

  /**
   * The description fo the selected story
   */
  description: string

  /**
   * An action to close the modal
   */
  dispatch: (action: IAction) => void

  /**
   * A method to navigate to the story page, provided by React Navigation
   */
  navigation: NavigationStackProp<string>
}