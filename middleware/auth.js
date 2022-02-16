import jwt from 'jsonwebtoken'

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        // checking if the user is using app auth or google auth

        const isCustomAuth = token.length < 500

        let decoded

        if (token && isCustomAuth) {
            decoded = jwt.verify(token, process.env.SECRET)

            req.userId = decoded?.id
        } else { // Google oauth2
            decode = jwt.decode(token)

            req.userId = decoded?.sub
        }

    } catch (error) {
        console.log(error)
    }
}

export default auth;