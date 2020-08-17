const { user } = require("../models");
const Joi = require("@hapi/joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.cekAuth = async (req, res) => {
    try {
    const User = await user.findOne({
        where: {
            id: req.User.id,
        },
        attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
        },
    });
    res.status(200).send({
        status: "success",
        data: User,
    });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

exports.login = async (req, res) => {
        try {
        const schema = Joi.object({
            email: Joi.string().email().min(6).required(),
            password: Joi.string().min(6).required(),
        });
        const { error } = schema.validate(req.body);
    
        if (error)
            res.status(400).send({
                error: {
                    message: error.details[0].message,
                },
            });
    
        const { email, password } = req.body;
        const User = await user.findOne({
            where: {
                email,
            },
        });
    
        if (!user)
            return res.status(400).send({
            error: {
                message: "Wrong Email or Password",
            },
        });
    
        const validPass = await bcrypt.compare(password, User.password);
    
        if (!validPass)
            return res.status(400).send({
            error: {
                message: "Wrong Email or Password"
            },
        });
    
        const token = jwt.sign({ id: User.id }, process.env.SECRET_KEY );
    
        res.status(200).send({
            status: "success",
            data: {
                email,
                token
            },
        });
        } catch (error) {
        console.log(error);
        return res.status(500).send({
            error: {
                message: "Server Error"
            },
        });
    }
};

exports.register = async (req, res) => {
        try {
        const schema = Joi.object({
            name: Joi.string().min(3).required(),
            email: Joi.string().email().min(6).required(),
            password: Joi.string().min(6).required(),
        });
        const { error } = schema.validate(req.body);
    
        console.log(req.body);
    
        if (error)
            return res.status(400).send({
            error: {
                message: error.details[0].message,
            },
            });
    
        const { email, password } = req.body;
    
        const checkEmail = await user.findOne({
            where: {
                email,
            },
        });
        if (checkEmail)
            return res.status(400).send({
            error: {
                message: "Email already exist",
            },
            });
    
        const hashedPassword = await bcrypt.hash(password, 10);
        const User = await user.create({
            ...req.body,
            password: hashedPassword
        });

        const token = jwt.sign({ id: User.id }, process.env.SECRET_KEY );
    
        res.status(200).send({
        status: "success",
            data: {
                email,
                token,
            },
        });
        } catch (error) {
            console.log(error);
            return res.status(500).send({
                error: {
                    message: "Server Error",
            },
        });
        }
    };