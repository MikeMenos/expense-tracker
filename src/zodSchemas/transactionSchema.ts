import { date, number, object, string } from "zod";

export const transactionsSchema = object({
  receiver: string({
    required_error: `Receiver is required`,
  })
    .min(1)
    .max(30),
  category: string({
    required_error: `Category name is required`,
  }),
  amount: number({
    required_error: `Amount is required`,
  }),
  createdAt: date(),
  id: string(),
});
