const User = require('../model/user')

module.exports={
  async  Store(req,res){
        
    const { devId } = req.params;
    const { user } = req.headers

    const LoggedDev = await User.findById(user)
    const TargetDev = await User.findById(devId)

    if(!TargetDev){ return res.status(400).json({message: 'User Not Exist'}) }


    LoggedDev.deslike.push(TargetDev._id)
    await LoggedDev.save()

        return res.json(LoggedDev)
    }
}