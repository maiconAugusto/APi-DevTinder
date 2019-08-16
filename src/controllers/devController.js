const User = require('../model/user')
const axios = require('axios')


module.exports={
    async Index(req, res){
        const { user } = req.headers

        const LoggedUser = await User.findById(user)
        const users = await User.find({
            $and:[
                {_id: { $ne: user}},
                {_id: { $nin: LoggedUser.like}},
                {_id: { $nin: LoggedUser.deslike}}
            ]
        })
        return res.json(users)
    },
    async Store(req,res){
        const {username} = req.body
        console.log(username)
        const response = await axios.get(`https://api.github.com/users/${username}`)
        const { name , bio, avatar_url: avatar } = response.data 

        //Verificando se o usúario ja existe.
        const checkUser = await User.findOne({user: username})
        if(checkUser) return res.json({checkUser})

        // Criando o novo usúario.
        const user = await User.create({
            name,
            user: username,
            bio,
            avatar
        })
        res.json({user})
    }
}

// Metodo INDEX, STORE, SHOW, DELETE, UPDATE