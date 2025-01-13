import {AbstractData} from "./AbstractData.ts";

export interface PostData extends AbstractData{
  id: number;
  title: string;
  body: string;
}