import {TOKEN_SECRET} from "../config.js"; // es solo un ejemplo, el token debe venir desde la variable de entorno
import jwt from "jsonwebtoken";


export function createAccessToken(payload){
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            TOKEN_SECRET,
            {
                expiresIn: "1d",
            },
            (err, token) => {
                if (err) reject(err)
                    resolve(token)
            }
        );
    });
}
