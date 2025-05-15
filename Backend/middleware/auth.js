import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.json({ success: false, message: 'Not Authorized Login Again'})
    }
    try{
        const token_decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId= token_decoded.id
        next()
    }
    catch(error){
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export default authUser;


// import jwt from 'jsonwebtoken';

// const authUser = async (req, res, next) => {
//     const { token } = req.headers;

//     if (!token) {
//         return res.status(401).json({ success: false, message: 'Not Authorized. Please log in again.' });
//     }

//     try {
//         const token_decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.userId = token_decoded.id;  // 👈 safer and accessible from any controller
//         next();
//     } catch (error) {
//         console.log(error);
//         return res.status(401).json({ success: false, message: 'Token is invalid or expired' });
//     }
// };

// export default authUser;
