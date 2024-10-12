"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/lib/supabase";

type Category = {
  id: number;
  name: string;
  menu_name: string;
  is_product_category: boolean;
  icon_name: string;
};

export default function CategoryManager() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState<Partial<Category>>({});

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("is_product_category", { ascending: false });
    if (data) setCategories(data);
    if (error) console.error("Error fetching categories:", error);
  }

  async function addCategory() {
    const { data, error } = await supabase
      .from("categories")
      .insert([newCategory])
      .select();
    if (data) {
      setCategories([...categories, data[0]]);
      setNewCategory({});
    }
    if (error) console.error("Error adding category:", error);
  }

  async function updateCategory(id: number, updates: Partial<Category>) {
    const { error } = await supabase
      .from("categories")
      .update(updates)
      .eq("id", id);
    if (error) console.error("Error updating category:", error);
    else fetchCategories();
  }

  async function deleteCategory(id: number) {
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) console.error("Error deleting category:", error);
    else setCategories(categories.filter((cat) => cat.id !== id));
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Category Manager</h2>

      {/* Add new category form */}
      <div className="mb-8 p-4 border rounded">
        <h3 className="text-xl font-semibold mb-2">Add New Category</h3>
        <Input
          placeholder="Name"
          value={newCategory.name || ""}
          onChange={(e) =>
            setNewCategory({ ...newCategory, name: e.target.value })
          }
          className="mb-2"
        />
        <Input
          placeholder="Menu Name"
          value={newCategory.menu_name || ""}
          onChange={(e) =>
            setNewCategory({ ...newCategory, menu_name: e.target.value })
          }
          className="mb-2"
        />
        <Input
          placeholder="Icon Name"
          value={newCategory.icon_name || ""}
          onChange={(e) =>
            setNewCategory({ ...newCategory, icon_name: e.target.value })
          }
          className="mb-2"
        />
        <div className="flex items-center mb-2">
          <Checkbox
            id="is_product_category"
            checked={newCategory.is_product_category || false}
            onCheckedChange={(checked) =>
              setNewCategory({
                ...newCategory,
                is_product_category: checked as boolean,
              })
            }
          />
          <label htmlFor="is_product_category" className="ml-2">
            Is Product Category
          </label>
        </div>
        <Button onClick={addCategory}>Add Category</Button>
      </div>

      {/* List and edit existing categories */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Existing Categories</h3>
        {categories.map((category) => (
          <div key={category.id} className="mb-4 p-4 border rounded">
            <Input
              value={category.name}
              onChange={(e) =>
                updateCategory(category.id, { name: e.target.value })
              }
              className="mb-2"
            />
            <Input
              value={category.menu_name}
              onChange={(e) =>
                updateCategory(category.id, { menu_name: e.target.value })
              }
              className="mb-2"
            />
            <Input
              value={category.icon_name}
              onChange={(e) =>
                updateCategory(category.id, { icon_name: e.target.value })
              }
              className="mb-2"
            />
            <div className="flex items-center mb-2">
              <Checkbox
                id={`is_product_category_${category.id}`}
                checked={category.is_product_category}
                onCheckedChange={(checked) =>
                  updateCategory(category.id, {
                    is_product_category: checked as boolean,
                  })
                }
              />
              <label
                htmlFor={`is_product_category_${category.id}`}
                className="ml-2"
              >
                Is Product Category
              </label>
            </div>
            <Button
              onClick={() => deleteCategory(category.id)}
              variant="destructive"
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
