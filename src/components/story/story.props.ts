type storyLink = {
    linkTitle: string,
    linkId: string
}

export interface IStoryProps {
    /**
     * A unique identifier for story pages
     */
    id: string

    /**
     * A URI for images or videos
     */
    mediaUri?: string

    /**
     * An Array of JSX text and link elements
     */
    text: JSX.Element[]
    
    /**
     * An array of text and link values
     */
    linksTo: storyLink[]

}