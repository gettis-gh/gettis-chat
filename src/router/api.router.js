// router/api.router.js
import express from 'express';
import { badRequest, internalError, success } from '../service/response.service.js';
import { createUser, findUserIdByUsername } from '../controller/user.controller.js';

const router = express.Router();

router.get('/ping', (req, res) => {
    return res.send('hello!');
});

router.post('/register', async (req, res) => {
    try {
        const { username } = req.body;

        if (!username) {
            return res
                .status(400)
                .json(
                    badRequest("Username not provided.")
                );
        }

        const result = await createUser(username);

        if (result.error) {
            return res
                .status(result.status || 500)
                .json(
                    internalError(result.message, result)
                );
        }

        return res
            .status(result.status || 200)
            .json(
                success(result.message, result.attachData)
            );
    } catch (error) {
        return res
            .status(500)
            .json(
                internalError(error.message)
            );
    }   
})

router.post('/login', async (req, res) => {
    const { username } = req.body;  

    if (!username) {
        return res 
            .status(400)
            .json(
                badRequest("Username not provided.")
            );
    }

    const userId = await findUserIdByUsername(username);

    if (userId.error || !userId) {
        console.log("usuario no encontrao");
        return res
            .status(500)
            .json(
                internalError("Error trying to obtain userId.", userId || null)
            );
    }

    res.cookie("user", JSON.stringify({ username, userId }));

    return res
        .status(200)
        .json(
            success("Cookie 'user' asigned correctly.")
        );
});

export default router;