import { Request, Response, Router } from "express";
import authMiddleware from "../../middleware/auth.middleware";
import { exceptionHandler } from "../../utils/helpers/exceptionHandler";
import restaurantController from "../../controllers/restaurant.controller";
import { IRestaurant } from "../../utils/restaurantTypes";

const router = Router();
router.use(authMiddleware.validateToken);

router.get(
  "/",
  exceptionHandler(async (_req: Request, res: Response) => {
    const result = await restaurantController.getAll();
    res.json(result);
  })
);

router.post(
  "/",
  exceptionHandler(async (req: Request<{}, {}, IRestaurant>, res: Response) => {
    const result = await restaurantController.insert(req.body);
    res.json(result);
  })
);

router.delete(
  "/:_id",
  exceptionHandler(
    async (req: Request<IRestaurant, {}, {}>, res: Response) => {
      const result = await restaurantController.delete(req.params._id as string);
      res.json(result);
    }
  )
);

router.put(
  "/:_id",
  exceptionHandler(
    async (req: Request<IRestaurant, {}, IRestaurant>, res: Response) => {
      const result = await restaurantController.update(
        req.params._id as string,
        req.body
      );
      res.json(result);
    }
  )
);

export default router;
