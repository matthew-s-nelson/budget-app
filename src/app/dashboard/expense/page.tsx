'use client'

import { CategoriesPresenter } from "@/app/presenters/CategoriesPresenter";
import TransactionPage from "@/components/ui/transactions/TransactionPage";
import { useState } from "react";

export const dynamic = 'force-dynamic';

export default async function Page() {
  const [presenter] = useState(new CategoriesPresenter());
  const categories = await presenter.getCategories();
  return(
    <TransactionPage categories={categories} />
  );
}