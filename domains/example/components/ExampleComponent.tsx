/**
 * Example Domain Component
 *
 * This is a domain-specific component that can use domain hooks.
 * It's located within the domain folder and is not shared across domains.
 *
 * This component:
 * - Uses the domain hook (useExample)
 * - Handles UI rendering and interactions only
 * - No direct API calls or Zustand access
 */

"use client";

import { useEffect, useState } from "react";
import { useExample } from "../hooks/useExample";
import type { CreateExampleItemDto } from "../types/example.types";

export function ExampleComponent() {
  const {
    items,
    selectedItem,
    isLoading,
    error,
    fetchItems,
    createItem,
    deleteItemById,
    clearError,
  } = useExample();

  const [formData, setFormData] = useState<CreateExampleItemDto>({
    name: "",
    description: "",
  });

  // Fetch items on mount
  useEffect(() => {
    fetchItems().catch((err) => {
      console.error("Failed to fetch items:", err);
    });
  }, [fetchItems]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createItem(formData);
      setFormData({ name: "", description: "" });
    } catch (err) {
      console.error("Failed to create item:", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await deleteItemById(id);
      } catch (err) {
        console.error("Failed to delete item:", err);
      }
    }
  };

  if (isLoading && items.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Example Domain Component</h1>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex justify-between items-center">
          <span>{error}</span>
          <button
            onClick={clearError}
            className="text-red-600 hover:text-red-800 font-semibold"
          >
            ✕
          </button>
        </div>
      )}

      {/* Create Form */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Create New Item</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "Creating..." : "Create Item"}
          </button>
        </form>
      </div>

      {/* Items List */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Items ({items.length})</h2>
        {items.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No items found. Create one above!
          </p>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors flex justify-between items-start"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-gray-600 mt-1">{item.description}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    Created: {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(item.id)}
                  disabled={isLoading}
                  className="ml-4 text-red-600 hover:text-red-800 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Selected Item Display */}
      {selectedItem && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Selected Item</h2>
          <p className="font-medium">{selectedItem.name}</p>
          <p className="text-gray-600">{selectedItem.description}</p>
        </div>
      )}
    </div>
  );
}
