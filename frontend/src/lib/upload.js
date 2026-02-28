import { supabase } from "./supabase";

export async function uploadInvoice(file) {

  const fileName =
    Date.now() + "_" + file.name;

  const { error } =
    await supabase.storage
      .from("invoices")
      .upload(fileName, file);

  if (error) throw error;

  const { data } =
    supabase.storage
      .from("invoices")
      .getPublicUrl(fileName);

  return data.publicUrl;

}