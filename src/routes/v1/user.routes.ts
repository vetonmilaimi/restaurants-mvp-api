import { Request, Response, Router } from "express";
import { exceptionHandler } from "../../utils/helpers/exceptionHandler";
import userController from "../../controllers/user.controller";
import { ChangeUserDetailsRequest, UserModel } from "../../utils/types";
import authMiddleware from "../../middleware/auth.middleware";
import validator from "../../middleware/routeValidator.middleware";
import ValidationSchemas from "../../utils/ValidationSchemas";

const router = Router();

router.delete(
  "/delete/:_id",
  validator.headers(ValidationSchemas.accessToken),
  authMiddleware.validateAccessToken,
  exceptionHandler(async (req: Request<UserModel, {}, {}>, res: Response) => {
    const result = await userController.delete(req.params._id as string);
    res.json(result);
  })
);

router.get(
  "/logout",
  validator.headers(ValidationSchemas.accessToken),
  authMiddleware.validateAccessToken,
  exceptionHandler(async (req: Request, res: Response) => {
    const result = await userController.logout(req.session);
    res.json(result);
  })
);

router.post(
  "/change-password",
  validator.headers(ValidationSchemas.accessToken),
  authMiddleware.validateAccessToken,
  validator.body(ValidationSchemas.changePassword),
  exceptionHandler(
    async (req: Request<{}, {}, { password: string }>, res: Response) => {
      const result = await userController.changePassword(req);
      res.json(result);
    }
  )
);

router.post(
  "/change-personal-details",
  validator.headers(ValidationSchemas.accessToken),
  authMiddleware.validateAccessToken,
  validator.body(ValidationSchemas.changeUserDetails),
  exceptionHandler(
    async (req: Request<{}, {}, ChangeUserDetailsRequest>, res: Response) => {
      const result = await userController.changeUserDetails(req);
      res.json(result);
    }
  )
);

router.get(
  "/",
  validator.headers(ValidationSchemas.accessToken),
  authMiddleware.validateAccessToken,
  exceptionHandler(async (_req: Request, res: Response) => {
    const result = await userController.getAll();
    res.json(result);
  })
);

router.get(
  "/:_id",
  validator.headers(ValidationSchemas.accessToken),
  authMiddleware.validateAccessToken,
  exceptionHandler(async (req: Request<UserModel, {}, {}>, res: Response) => {
    const result = await userController.getOneById(req.params._id as string);
    res.json(result);
  })
);

export default router;
