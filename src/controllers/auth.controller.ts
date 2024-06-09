import { Request, Response, NextFunction } from "express";
import * as userService from "../services/user.service";
import { LoginUserInput, SignupUserInput } from "../schemas/user.schema";
import { hashPassword, validatePassword } from "../utils/password.utils";
import { omit } from "lodash";

export async function signupUser(
    req: Request<{}, {}, SignupUserInput["body"]>,
    res: Response,
    next: NextFunction
) {
    try {
        const hashedPassword = await hashPassword(req.body.password);
        const user = await userService.addOneUser({
            ...req.body,
            password: hashedPassword,
        });

        return res.status(201).json({ data: omit(user.toJSON(), "password") });
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
        // next(error);
    }
}

export async function loginUser(
    req: Request<{}, {}, LoginUserInput["body"]>,
    res: Response,
    next: NextFunction
) {
    try {
        const user = await userService.getOneUserByEmail(req.body.email);
        if (!user) {
            return res
                .status(403)
                .json({ message: "Invalid email or password" });
        }

        if (!(await validatePassword(req.body.password, user.password))) {
            return res
                .status(403)
                .json({ message: "Invalid email or password" });
        }

        // issue tokens

        return res.status(200).json({ data: omit(user.toJSON(), "password") });
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
        // next(error);
    }
}
