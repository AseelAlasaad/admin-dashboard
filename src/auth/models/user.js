'use strict'

const userModel = (sequelize, DataTypes) => {
    const model = sequelize.define('Users', {
        username: { type: DataTypes.STRING, required, unigue: true },
        password: { type: DataTypes.STRING, required: true },
        email: { type: DataTypes.STRING, required, unigue: true },
        phone: { type: DataTypes.INTEGER, allowNull: false, unique: true },
        img: { type: DataTypes.STRING, allowNull: true},
        gender:{type:DataTypes.ENUM('Male', 'Female'), allowNull: true, defaultValue: 'Male'},
        address:{ type: DataTypes.STRING, allowNull: true },
        role: { type: DataTypes.ENUM('admin', 'teacher', 'student', 'parent'), required: true, defaultValue: 'student' }

    })
}


module.exports= userModel