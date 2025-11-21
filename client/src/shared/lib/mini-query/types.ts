import { ACTION } from './interfaces'

export type TDataAction<TR> =
  | { type: typeof ACTION.DATA; payload: TR }
  | { type: typeof ACTION.LOADING; payload: boolean }
  | { type: typeof ACTION.ERROR; payload: boolean }
  | { type: typeof ACTION.REFETCH }
  | { type: typeof ACTION.RESET }

export type TSetFn = (keys: string[], data: unknown) => void
export type TGetFn = (keys: string[]) => unknown
export type TUpdateFn = (keys: string[], data: unknown) => void
export type TDeleteFn = (keys: string[]) => void
