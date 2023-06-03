import { Request, Response, Router } from "express";
import { exceptionHandler } from "../../utils/helpers/exceptionHandler";
import { IUser } from "../../utils/types";
import userController from "../../controllers/user.controller";
import authController from "../../controllers/auth.controller";

const router = Router();

router.post(
  "/register",
  exceptionHandler(async (req: Request<{}, {}, IUser>, res: Response) => {
    const result = await userController.insert(req.body);
    res.json(result);
  })
);

router.post(
  "/login",
  exceptionHandler(async (req: Request<{}, {}, IUser>, res: Response) => {
    const result = await authController.login(req.body);
    res.json(result);
  })
);

export default router;
