const { user } = require("../models");
const dayjs = require("dayjs");

exports.cekSub = async (req, res, next) => {
    try {
        const User = await user.findOne({
            where: {
                id: req.User.id,
            },
        });

        let date = dayjs();
        let now = date.format("YYYY-MM-DD");

        if (User.dueDate < now) {
            await user.update(
                {
                    subscribe: false,
                },
                {
                    where: {
                        id: req.User.id,
                    },
                }
            );
        }

        next();
    } catch (error) {
        res.status(400).send({ message: "Invalid token" });
    }
};