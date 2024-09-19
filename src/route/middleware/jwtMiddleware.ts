import {Response, Request, NextFunction} from "express";
import {decodeToken} from "../../service/jwt";

export interface IRequestWithUser extends Request {
    user: {id: number, name: string}
}

function extractBearer (req: Request) {
    const authHeader = req.headers.authorization;
    if (authHeader) return authHeader.split(" ")[1]
    return null
}
export function checkJWTToken(req: Request, res: Response, next: NextFunction) {
    const token = extractBearer(req)
    if (token) {
        const decode = decodeToken(token, "JWT")
        if (!decode) return res.status(401).send("Unauthorized");
        (req as IRequestWithUser).user = decode as {id: number, name: string}
        next()
    }
}