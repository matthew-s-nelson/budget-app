import { createCategory, deleteCategory, fetchCategories } from "@/lib/data/categories/data";
import { Category } from "@/lib/model/domain/Category";
import { z } from "zod";

const FormSchema = z.object({
    name: z.string(),
})

const CreateCategory = FormSchema;

export class CategoriesPresenter {
    public async getCategories(): Promise<Category[]> {
        return await fetchCategories();
    }

    public async createCategory(formData: FormData) {
        const { name } = CreateCategory.parse({
            name: formData.get('name'),
        });

        await createCategory(name);
    }
}