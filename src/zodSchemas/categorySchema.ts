import { object, string } from "zod";

export const categorySchema = object({
  category: string({
    required_error: "Category name is required",
  })
    .min(10)
    .max(40),
  id: string(),
});
