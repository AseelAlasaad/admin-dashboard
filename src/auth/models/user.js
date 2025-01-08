'use strict'
const SECRET = process.env.SECRET || 'secrectKey';

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userModel = (sequelize, DataTypes) => {
    const model = sequelize.define('Users', {
        username: { type: DataTypes.STRING, required, unigue: true },
        password: { type: DataTypes.STRING, required: true },
        email: { type: DataTypes.STRING, required, unigue: true },
        phone: { type: DataTypes.INTEGER, allowNull: false, unique: true },
        img: { type: DataTypes.STRING, allowNull: true },
        gender: { type: DataTypes.ENUM('Male', 'Female'), allowNull: true, defaultValue: 'Male' },
        address: { type: DataTypes.STRING, allowNull: true },
        role: { type: DataTypes.ENUM('admin', 'teacher', 'student', 'parent'), required: true, defaultValue: 'student' }
        ,
        token: {
            type: DataTypes.VIRTUAL,
            get() {
                return jwt.sign({ username: this.username }, SECRET)
            },
            set(tokenObj) {
                let token = jwt.sign(tokenObj, SECRET)
                return token
            }
        },

        capabilities: {
            type: DataTypes.VIRTUAL,
            get() {
                const acl = {
                    parent: ['read'],
                    studen: ['read', 'create', 'update'],
                    teacher: ['read', 'create', 'update'],
                    admin: ['read', 'create', 'update', 'delete']
                }
            }
        }
    })
    model.beforeCreate(async (user)=>{
        let hashedPass= await bcrypt.hash(user.password,10)
        user.password=hashedPass;
    })


    model.authenticateBasic= async function (username, password){
        const user= await this.findOne({where:{username}});
        const vaild= await bcrypt.compare(password, user.password);
        if(vaild) return user
        else throw new Error('Invaild User')
    }
    model.authenticateToken = async function(token){
        try {

            const pasedToken= jwt.verify(token , SECRET);
            const user= this.findOne({where:{username:pasedToken.username}});
            if(user) return user
            else throw new Error('Invaild User')
            
        } catch (error) {
             throw new Error(error.message)
        }
    }

}


module.exports = userModel