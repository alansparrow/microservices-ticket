import express, { Request, Response } from "express";
import { Order } from "../models/order";
import {
  NotAuthorizedError,
  NotFoundError,
  OrderStatus,
} from "@fuzzyrock/common";
import { requireAuth } from "@fuzzyrock/common";

const router = express.Router();

router.delete(
  "/api/orders/:orderId",
  requireAuth,
  async (req: Request, res: Response) => {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);

    if (!order) {
      throw new NotFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    order.status = OrderStatus.Cancelled;
    await order.save();

    // Publish an event saying this was cancelled!

    res.status(204).send(order);
  }
);

export { router as deleteOrderRouter };
