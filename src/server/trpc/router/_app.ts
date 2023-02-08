import { transactionsRouter } from "./transactions";
import { router } from "../trpc";
import { categoryRouter } from "./categories";
import { goalsRouter } from "./goals";

export const appRouter = router({
  category: categoryRouter,
  transaction: transactionsRouter,
  goal: goalsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
