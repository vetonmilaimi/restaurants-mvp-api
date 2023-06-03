import { Request, Response, Router } from "express";
import { exceptionHandler } from "../../utils/helpers/exceptionHandler";
import userController from "../../controllers/user.controller";
import { IUser } from "../../utils/types";
import authMiddleware from "../../middleware/auth.middleware";

const router = Router();
router.use(authMiddleware.validateToken);

router.get(
  "/",
  exceptionHandler(async (_req: Request, res: Response) => {
    const result = await userController.getAll();
    res.json(result);
  })
);

router.get(
  "/:_id",
  exceptionHandler(async (req: Request<IUser, {}, {}>, res: Response) => {
    const result = await userController.getOneById(req.params._id as string);
    res.json(result);
  })
);

router.delete(
  "/delete/:_id",
  exceptionHandler(async (req: Request<IUser, {}, {}>, res: Response) => {
    const result = await userController.delete(req.params._id as string);
    res.json(result);
  })
);

export default router;
