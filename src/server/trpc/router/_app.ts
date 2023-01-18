import { transactionsRouter } from "./transactions";
import { router } from "../trpc";
import { categoryRouter } from "./category";

export const appRouter = router({
  category: categoryRouter,
  transaction: transactionsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
