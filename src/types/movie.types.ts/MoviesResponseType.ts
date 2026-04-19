import type { MovieIconType } from "./MovieIconType"

export type MoviesResponse = {
  error: null | string
  data: MovieIconType[]
  count: number
  status: number
  statusText: string
}