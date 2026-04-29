import {signUp, logIn} from "../services/authService.js";

export async function logInHandler(req, res)
{
    const {email, password} = req.body;
    const accessToken = await logIn(email, password);
    res.status(200).json({accessToken});
}

export async function signUpHandler(req, res)
{
    const {email, password, name, address} = req.body;
    const role = req.body.role == "" ? "USER": (req.body.role === "ADMIN" ? "USER": req.body.role);
    const newUser = await signUp(email, password, name, address, role);
    res.status(201).json(newUser);
}