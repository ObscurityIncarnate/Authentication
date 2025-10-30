const isSignedIn =  (req, res, next)=>{
    if(!req.session.user){
       return res.render("/auth/sign-in")
    }
    next();
}

export default isSignedIn;