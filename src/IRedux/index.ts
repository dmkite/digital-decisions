export interface IStoryState {
  /**
   * The name of the selected module e.g. CyberSafety
   */
  selectedStory: string | null

  /**
   * The name of the selected passage e.g. Instructions
   */
  selectedPassage: string

  /**
   * An ongoing history of passage names
   */
  passageHistory: string[]

  /**
   * The list of passages associated with a particular module
   */
  passages: IPassageObject
}

export interface IModule {
  title: string
  description: string
  moduleNumber: string
  gradientValues: string[]
  passages: IPassageObject
}

export interface IPassageObject {
  [key: string]: IPassage
}

export interface IPassage {
  pid: string
  name: string
  content: IJSXContent[]
}

export interface IJSXContent {
  JSXType: string
  content: string
  linksTo: string
}

export interface IAction {
  type: string
  payload: string
}

