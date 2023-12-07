const jwt = require('jsonwebtoken')

const verifyAuth = async(req,res,next)=>{
    try {
        const token = req.headers.authorization

        if (!token) {
            return res
              .status(401)
              .json({ message: "Unauthorized : token not provided" });
          }
      
          const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
          const userId = decodedToken.userId;

          req.userId = userId

          next()

    } catch (error) {
        console.log(error);
        if(error.name === 'JsonWebTokenError'){
            return res.status(401).json({message:"Invalid Token"})
        }else{
            res.status(500).json({message:"Internal Server Error"})
        }
    }
}


module.exports = verifyAuth