import { fetchCategories } from "@//lib/data/categories/data";
import TransactionPage from "@/components/ui/transactions/TransactionPage";

export const dynamic = 'force-dynamic';

export default async function Page() {
  const categories = await fetchCategories();
  return(
    <TransactionPage categories={categories} />
  );
}