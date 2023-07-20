/**
 * Reason to use abstract class:
 * - Cannot be instantiated
 * - Used to set up requirements for subclasses
 * - Do create a Class when translated to JS, 
 * which means we can use it in 'instanceof' checks!
 */
export abstract class CustomError extends Error {
    abstract statusCode: Number;

    constructor(message: string) {
        super(message);

        // Only because we are extending a built in class
        Object.setPrototypeOf(this, CustomError.prototype);
    }

    abstract serializeErrors(): { message: string; field?: string }[];
}
