import { object, string } from "zod";

export const categorySchema = object({
  category: string({
    required_error: "Category name is required",
  })
    .min(5)
    .max(30),
  id: string(),
});
