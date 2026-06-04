import { DB_SCHEMA } from "@/constants/database";
import { supabase } from "@/lib/supabase/client";
import { IBook, IBookInsert, IBookUpdate } from "@/types/book.types";

const SCHEMA = DB_SCHEMA.BOOKS;

class BookService {

  async findAllByUser(userId: string): Promise<IBook[]> {
    const { data, error } = await supabase
      .from(SCHEMA.TABLE)
      .select('*')
      .eq(SCHEMA.COLUMNS.USER_ID, userId);
    if (error) throw error;
    return data || [];
  }

  async findById(id: number): Promise<IBook> {
    const { data, error } = await supabase
      .from(SCHEMA.TABLE)
      .select('*')
      .eq(SCHEMA.COLUMNS.ID, id)
      .single();
    if (error) throw error;
    return data;
  }

  async create(book: IBookInsert): Promise<IBook> {
    const { data, error } = await supabase
      .from(SCHEMA.TABLE)
      .insert(book)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async update(id: number, book: IBookUpdate): Promise<IBook> {
    const { data, error } = await supabase
      .from(SCHEMA.TABLE)
      .update(book)
      .eq(SCHEMA.COLUMNS.ID, id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async delete(id: number): Promise<void> {
    const { error } = await supabase
      .from(SCHEMA.TABLE)
      .delete()
      .eq(SCHEMA.COLUMNS.ID, id);
    if (error) throw error;
  }

}

export const bookService = new BookService();