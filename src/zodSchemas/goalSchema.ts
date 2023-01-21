import { number, object, string } from "zod";

export const goalSchema = object({
  title: string(),
  budget: number(),
  id: string(),
});
