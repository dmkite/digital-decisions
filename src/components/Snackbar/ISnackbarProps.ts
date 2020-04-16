export default interface ISnackbarProps {
    /**
     * The text content to display in the snackbar
     */
    message: string

    /**
     * The severity and color that the snackbar should have. Defaults to blue
     */
    severity?: 'ERROR' | 'SUCCESS' | null
}