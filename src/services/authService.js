import bcrypt from "bcrypt";
import {findUserByEmail, createUser} from "../repositories/userRepo.js";
import jwt from 'jsonwebtoken';


export async function logIn(email, password)
{
    const JWT_SECRET = process.env.JWT_SECRET;
    const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

    const error = new Error("Invalid credentials");
    error.status = 401;

    const user = await findUserByEmail(email);
    if(!user)
    {
        throw error;
    }
    const match = await bcrypt.compare(password, user.password);

    if(!match)
    {
        throw error;
    }
    const accessToken = jwt.sign({id: user.id, role: user.role}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});

    return accessToken;
}

export async function signUp(email, password, name, address, role)
{
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser({email, password: hashedPassword, name, address, role});
    return newUser;
}