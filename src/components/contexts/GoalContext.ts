import { createContext, type Dispatch, type SetStateAction } from "react";

type TGoalsState = [
  { title: string; budget: number }[],
  Dispatch<SetStateAction<{ title: string; budget: number }[]>>
];

type TShowDrawerState = [boolean, Dispatch<SetStateAction<boolean>>];

export const GoalContext = createContext<[TGoalsState, TShowDrawerState]>([
  [[], () => void 0],
  [false, () => void 0],
]);
