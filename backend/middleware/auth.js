import jwt from 'jsonwebtoken';

// auth middleware has next, which means do something and then move on
// for the purpose of this, the middleware will deny or allow access to the like controller after clicking the like button
const auth = async (req, res, next) => {
    try {
        // check if the user is the user she/he is saying
        const token =  req.headers.authorization.split(" ")[1];
        // check if the token is a google token or not
        const isCustomAuth = token.length < 5000;

        let decodedData;

        // will give us the data from the token, username and id
        if (token && isCustomAuth){
            decodedData = jwt.verify(token, 'test');

            // we now know which user has created a post or liked a post
            req.userId = decodedData?.id;
        }else{
            // for google token
            decodedData = jwt.decode(token);
            // sub is google unique id for the end user
            req.userId = decodedData?.sub;
        }
        next();
    } catch (error) {
        console.log(error)
    }
}

export default auth;