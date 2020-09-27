export type Record = {
  icon: string, 
  id?: string, 
  name: string, 
  display: string,
  children: Array<Record>
}