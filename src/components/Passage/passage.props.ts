interface IJSXContent {
  JSXType: string
  content: string
  linksTo: string
}

export default interface IPassageProps {
  content: IJSXContent[]
}