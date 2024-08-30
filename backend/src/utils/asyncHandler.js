export const asyncHandler = (func) => {
    return (req, res, next) => {

        Promise.resolve(func(req, res, next))
        .then(() => next())
        .catch((err) => next(err))
    }
}