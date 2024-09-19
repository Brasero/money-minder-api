import jwt, {Algorithm} from "jsonwebtoken";
import dotenv from "dotenv";

if (process.env.ENVIRONMENT !== "production") {
    dotenv.config({
        path: [
            '.env.sample',
            '.env'
        ]
    })
}

const {MONEY_JWT_SECRET, MONEY_JWT_REFRESH_SECRET} = process.env

const algorithm: Algorithm = "HS256"
export function createTokens (payload: {id: number, name: string}) {
    const token = jwt.sign(payload, MONEY_JWT_SECRET, {expiresIn: "48h", algorithm});
    const refreshToken = jwt.sign(payload, MONEY_JWT_REFRESH_SECRET, {expiresIn: "7d", algorithm})
    return {token, refreshToken}
}

export function decodeToken (token: string, type: "JWT" | "JWT_REFRESH") {
    return jwt.verify(token, type === 'JWT' ? MONEY_JWT_SECRET : MONEY_JWT_REFRESH_SECRET, {algorithms: [algorithm]}, (err, decoded) => {
        if (err || decoded === null || decoded === undefined) return false
        return decoded
    })
}