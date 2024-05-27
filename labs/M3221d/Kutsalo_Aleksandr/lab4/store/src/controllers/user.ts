import axios from "axios";
import destroyTokens from "../utility/destroyTokens";
import setTokensInCookies from "../utility/setTokensInCookies";

class UserController {

    get = async (req, res) =>  {
        try {
            const authResponse = await axios.get(
                process.env.AUTH_SERVICE_NAME + "/users/id/" + req.params.id,
            )
            res.status(200).json(authResponse.data)
        } catch (error) {
            res.status(400).send({"response": error.message})
        }
    }

    create = async (req, res) =>  {
        try {
            const authResponse = await axios.post(
                process.env.AUTH_SERVICE_NAME + "/users/create",
                req.body
            )
            setTokensInCookies(res, authResponse.data.jwt, authResponse.data.refreshToken.token)
            res.status(200).json(authResponse.data)
        } catch (error) {
            res.status(400).send({"response": error.message})
        }
    }

    login = async (req, res) =>  {
        try {
            const authResponse = await axios.post(
                process.env.AUTH_SERVICE_NAME + "/users/login",
                req.body
            )
            if (authResponse.status != 200) {
                res.status(authResponse.status).send({"response": "Unauthorized"})
                return
            }
            setTokensInCookies(res, authResponse.data.jwt, authResponse.data.refreshToken.token)
            res.status(200).json({"response": "success"})
        } catch (error) {
            console.log(error.response)
            res.status(400).send({"response": error.message})
            // res.status(400).send({"response": error.response.data.error_message})
        }
    }

    logout = async (req, res) =>  {
        try {
            const authResponse = await axios.post(
                "http://localhost:4002/users/logout",
            )
            destroyTokens(res)
            res.status(200).send({"response": "Logged out"})
        } catch (error) {
            res.status(400).send({"response": error.message})
        }
    }
}

export default UserController;