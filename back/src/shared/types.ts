import { z } from "zod";

export type JSONObject = { [x: string]: JSONValue };

export type JSONValue =
  | string
  | number
  | boolean
  | JSONObject
  | Date
  | Array<JSONValue>;


export type PaginationInput = {
  limit: number;
  offset: number;
}

export class Pagination {

  public static SCHEMA = z.object({
    limit: z.number().min(1).max(100),
    offset: z.number().min(0),
  }).transform(value => new Pagination(value.limit, value.offset));

  private constructor(
    public readonly limit: number,
    public readonly offset: number,
  ) {
  }


  public static from(input: PaginationInput): Pagination {
    return this.SCHEMA.parse(input);
  }

}