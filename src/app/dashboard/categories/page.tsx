import { fetchCategories } from "@/app/lib/data";

export default async function Page() {
    const categories = await fetchCategories();
    return (
        <div>
            <h1>Categories</h1>
            {categories.map(category => (
                <p>{category.name}</p>
            ))}
        </div>
    );
}