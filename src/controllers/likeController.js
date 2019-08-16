const User = require('../model/user')


module.exports={
  async  Store(req,res){

    const { devId } = req.params;
    const { user } = req.headers

    const LoggedDev = await User.findById(user)
    const TargetDev = await User.findById(devId)

    if(!TargetDev){ return res.status(400).json({message: 'User Not Exist'}) }

    if(TargetDev.likes.includes(LoggedDev._id)){
        const LoggedSocket = req.connectUsers[user]
        const TargetSocket = req.connectUsers[devId]

        if(LoggedSocket){
            req.io.to(LoggedSocket).emit('match',TargetDev)
        }
        if(TargetSocket){
            req.io.to(TargetSocket).emit('match',LoggedDev)
        }
    }

    LoggedDev.likes.push(TargetDev._id)
    await LoggedDev.save()

        return res.json(LoggedDev)
    }
}