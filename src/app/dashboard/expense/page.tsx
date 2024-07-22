import { fetchCategories } from "@/app/lib/categories/data";
import TransactionPage from "@/app/ui/transactions/TransactionPage";

export default async function Page() {
  const categories = await fetchCategories();
  return(
    <TransactionPage categories={categories} />
  );
}