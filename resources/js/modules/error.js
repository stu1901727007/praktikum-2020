/**
 * Error handler
 */
class ValidationError extends Error {

    /**
     * ValidationError constructor
     * @param message
     */
    constructor(message) {

        super(message)
        // this.message = message;
        // this.name = "Error";
        this.show();
    }

    /**
     *
     * @returns {ValidationError}
     */
    show() {
        app.setHtmlContainer(Handlebars.templates.error({'message': this.message}));

        return this;
    }
}