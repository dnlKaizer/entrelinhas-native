import { DB_SCHEMA } from "@/constants/database";
import { Tables, TablesInsert, TablesUpdate } from "./database.types";

const SCHEMA = DB_SCHEMA.BOOKS;

export type IBook = Tables<typeof SCHEMA.TABLE>;
export type IBookInsert = TablesInsert<typeof SCHEMA.TABLE>;
export type IBookUpdate = TablesUpdate<typeof SCHEMA.TABLE>;