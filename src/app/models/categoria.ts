import { Club } from "./club"

export interface Categoria {
  id:number,
  categoria:string,
  rama:string,
  club_id:number,
  club?:Club
}
