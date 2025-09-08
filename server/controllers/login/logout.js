module.exports.logout = (req,res)=>{
    res.clearCookie('jwt')
    return res.status(204).send();
}