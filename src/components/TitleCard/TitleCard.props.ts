export interface ITitleCardProps {
    /**
     * The title of the module
     */
    title: string

    /**
     * The number of the module and the order in which it should appear
     */
    moduleNumber: number

    /**
     * The description of the module
     */
    description: string

    /**
     * The hex value for the start of the gradient
     */
    gradientValues: string[],

    dispatch?: (action: any) => any
}