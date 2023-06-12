import { Request, Response, Router } from "express";
import { exceptionHandler } from "../../utils/helpers/exceptionHandler";
import { LoginRequests, UserModel, UserRequest } from "../../utils/types";
import userController from "../../controllers/user.controller";
import authController from "../../controllers/auth.controller";
import validator from "../../middleware/routeValidator.middleware";
import ValidationSchemas from "../../utils/ValidationSchemas";
import authMiddleware from "../../middleware/auth.middleware";

const router = Router();

router.post(
  "/register",
  validator.body(ValidationSchemas.register),
  exceptionHandler(async (req: Request<{}, {}, UserRequest>, res: Response) => {
    const result = await userController.insert(req.body);
    res.json(result);
  })
);

router.post(
  "/login",
  validator.body(ValidationSchemas.login),
  exceptionHandler(
    async (req: Request<{}, {}, LoginRequests>, res: Response) => {
      const result = await authController.login(req.body);
      res.json(result);
    }
  )
);

router.get(
  "/regenerate-tokens",
  validator.headers(ValidationSchemas.token),
  authMiddleware.validateRefreshToken,
  exceptionHandler(async (req: Request, res: Response) => {
    const result = await userController.regenerateTokens(req.session);
    res.json(result);
  })
);

export default router;
