import { Request, Response, Router } from "express";
import { exceptionHandler } from "../../utils/helpers/exceptionHandler";
import userController from "../../controllers/user.controller";
import { UserModel } from "../../utils/types";
import authMiddleware from "../../middleware/auth.middleware";
import validator from "../../middleware/routeValidator.middleware";
import ValidationSchemas from "../../utils/ValidationSchemas";

const router = Router();
// router.use(authMiddleware.validateToken);

router.get(
  "/",
  // validator.headers(ValidationSchemas.accessToken),
  authMiddleware.validateAccessToken,
  exceptionHandler(async (_req: Request, res: Response) => {
    const result = await userController.getAll();
    res.json(result);
  })
);

router.get(
  "/:_id",
  exceptionHandler(async (req: Request<UserModel, {}, {}>, res: Response) => {
    const result = await userController.getOneById(req.params._id as string);
    res.json(result);
  })
);

router.delete(
  "/delete/:_id",
  exceptionHandler(async (req: Request<UserModel, {}, {}>, res: Response) => {
    const result = await userController.delete(req.params._id as string);
    res.json(result);
  })
);

export default router;
