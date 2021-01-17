const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const User = require('../models/User')
const errorHandler = require('../utils/errorHandler')

module.exports.login = async function(req, res){
    const candidate = await User.findOne({email: req.body.email})
    console.log(candidate)
    if(candidate){
        // Проверка пользователя, пользователь существует
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        if(passwordResult){
            // Генерация токена, пароли совпали
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id,
            }, keys.jwt, {expiresIn: 60 * 60})

            res.status(200).json({
                token: `Bearer ${token}`
            })

        } else {
            // Пароли не совпали
            res.status(401).json({
                message: "Пароли не сопадают, Попробуйте снова"
            })

        }

    } else {
        res.status(404).json({
            // Пользователя нет, ошибка
            message: "Пользователь с таким email не найден"
        })
    }
}

module.exports.register = async function(req, res){
    const candidate = await User.findOne({email: req.body.email})
    if(candidate) {
        // Пользователь существует, отправить ошибку
        res.status(409).json({
            message: 'Такой e-mail занят, попробуйте другой'
        })
    } else {
        // Нужно создать пользователя
        const salt = bcrypt.genSaltSync(10)
        const password = bcrypt.hashSync(req.body.password, salt)
        const user = new User({
            email: req.body.email,
            password
        })
        try {
            await user.save()
            res.status(201).json(user)
        } catch (e) {
            errorHandler(res, e)
        }
        


    }
}