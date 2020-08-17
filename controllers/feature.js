const { feature, user } = require("../models");
const Joi = require("@hapi/joi");

exports.addFeature = async (req, res) => {
    try {
        const schema = Joi.object({
            name: Joi.string().min(3).required(),
            content: Joi.string().required(),
        });
        const { error } = schema.validate(req.body);
    
        if (error)
            return res.status(400).send({
            error: {
                message: error.details[0].message,
            },
            });
    
        const cekUser = await user.findOne({
            where: {
                id: req.User.id,
            },
        });
    
        if (!cekUser)
            return res.status(400).send({
                message: "You are not a part of database",
            });
    
        const Feature = await feature.create({
            ...req.body,
            userId: req.User.id
        });
    
        if (!Feature)
            return res.status(400).send({
                message: "Feature Not Success Created / Try Again ",
            });
    
        const featureResult = await feature.findOne({
            where: {
                id: Feature.id,
            },
            include: [
                {
                    model: user,
                    attributes: {
                    exclude: ["createdAt","updatedAt","password"],
                    },
                },
            ],
            attributes: {
                exclude: ["createdAt","updatedAt","userId",]
            },
        });
    
        return res.status(200).send({
            status: "success",
            data: featureResult
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

    exports.deleteFeature = async (req, res) => {
        try {
            const { idFeature } = req.params;
        
            const featureResult = await feature.findOne({
                where: {
                    id: idFeature,
                },
                include: [
                    {
                        model: user,
                        attributes: {
                        exclude: ["createdAt","updatedAt","password"],
                        },
                    },
                ],
                attributes: {
                    exclude: ["createdAt","updatedAt","userId",]
                },
            });

            const deletedFeature = await feature.destroy({
                where: {
                    id: idFeature
                }
            });

            if(!deletedFeature){
                return res.status(400).send({
                    message: "delete feature failed",
                });
            }
            
        
            return res.status(200).send({
                status: "success",
                data: featureResult
            });
        } catch (error){
                console.log(error);
            }
        };

    exports.findFeature = async (req, res) => {
        try {
            const { idFeature } = req.params;
        
            const featureResult = await feature.findOne({
                where: {
                    id: idFeature,
                },
                include: [
                    {
                        model: user,
                        attributes: {
                        exclude: ["createdAt","updatedAt","password"],
                        },
                    },
                ],
                attributes: {
                    exclude: ["createdAt","updatedAt","userId",]
                },
            });

            return res.status(200).send({
                status: "success",
                data: featureResult
            });
        } catch (error){
                console.log(error);
            }
        };

    exports.allFeature = async (req, res) => {
        try {

            const featureResult = await feature.findAll({
                include: [
                    {
                        model: user,
                        attributes: {
                        exclude: ["createdAt","updatedAt","password"],
                        },
                    },
                ],
                attributes: {
                    exclude: ["createdAt","updatedAt","userId",]
                },
            });
        
            return res.status(200).send({
                status: "success",
                data: featureResult
            });
        } catch (error){
                console.log(error);
            }
        };

    exports.updateFeature = async (req, res) => {
        try {
            const schema = Joi.object({
                name: Joi.string().min(3).required(),
                content: Joi.string().required(),
            });
            const { error } = schema.validate(req.body);
        
            if (error)
                return res.status(400).send({
                error: {
                    message: error.details[0].message,
                },
                });
        
            const cekUser = await user.findOne({
                where: {
                    id: req.User.id,
                },
            });
        
            if (!cekUser)
                return res.status(400).send({
                    message: "You are not a part of database",
                });
        
            const { idFeature } = req.params;
            const Feature = await feature.findOne({
                where: {
                    id: idFeature
                },
                include: [
                    {
                        model: user,
                        attributes: {
                        exclude: ["createdAt","updatedAt","password"],
                        },
                    },
                ],
                attributes: {
                    exclude: ["createdAt","updatedAt"]
                }
            });
            
            Feature.name = req.body.name;
            Feature.content = req.body.content;
            await Feature.save();
            
            return res.status(200).send({
                status: "success",
                data: Feature
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
    
