import { TypedUseSelectorHook, useDispatch,useSelector } from "react-redux";
import type { RootState, AppDispatcher } from "./store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatcher>()