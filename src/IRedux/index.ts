export interface IStoryState {
  /**
   * The name of the selected module e.g. CyberSafety
   */
  selectedStory: string

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
  content: string | IPhoneContent
  linksTo: string | null
}

export interface IPhoneContent {
  name: string
  image?: string
  messages: ITextContent[]
}

export interface ITextContent {
  text: string
  isReceived: boolean
  image?: string
}

export interface IAction {
  type: string
  payload: string
}

