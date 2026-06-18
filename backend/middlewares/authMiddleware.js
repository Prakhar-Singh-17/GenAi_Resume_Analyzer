import jwt from "jsonwebtoken"

async function verifyToken(req ,res ,next){
    const token = req.cookies.token;
    if(!token){
        res.status(404).json({
            message : "Token Not Found"
        })
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.user = decoded.userId;
    next();
}

export {verifyToken}