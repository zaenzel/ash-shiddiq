/**
 * Example Domain Hook
 * 
 * This is the main interface for business logic.
 * Components should ONLY use this hook, never:
 * - Call API services directly
 * - Access Zustand store directly
 * 
 * This hook orchestrates:
 * - API calls (via services)
 * - State management (via Zustand)
 * - Loading & error states
 * - Business logic
 */

'use client';

import { useCallback } from 'react';
import { useExampleStore } from '../store/example.store';
import {
  getExampleItems,
  getExampleItemById,
  createExampleItem,
  updateExampleItem,
  deleteExampleItem,
} from '../services/example.api';
import type {
  ExampleItem,
  CreateExampleItemDto,
  UpdateExampleItemDto,
} from '../types/example.types';

export function useExample() {
  // Get state and actions from Zustand store
  const {
    items,
    selectedItem,
    isLoading,
    error,
    setItems,
    addItem,
    updateItem,
    removeItem,
    setSelectedItem,
    setLoading,
    setError,
  } = useExampleStore();

  /**
   * Fetch all example items
   */
  const fetchItems = useCallback(async (params?: { page?: number; limit?: number }) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getExampleItems(params);
      setItems(response.data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch items';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setItems, setLoading, setError]);

  /**
   * Fetch a single example item by ID
   */
  const fetchItemById = useCallback(
    async (id: string) => {
      try {
        setLoading(true);
        setError(null);
        const response = await getExampleItemById(id);
        setSelectedItem(response.data);
        return response.data;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch item';
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [setSelectedItem, setLoading, setError]
  );

  /**
   * Create a new example item
   */
  const createItem = useCallback(
    async (dto: CreateExampleItemDto): Promise<ExampleItem> => {
      try {
        setLoading(true);
        setError(null);
        const response = await createExampleItem(dto);
        addItem(response.data);
        return response.data;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to create item';
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [addItem, setLoading, setError]
  );

  /**
   * Update an existing example item
   */
  const updateItemById = useCallback(
    async (id: string, dto: UpdateExampleItemDto): Promise<ExampleItem> => {
      try {
        setLoading(true);
        setError(null);
        const response = await updateExampleItem(id, dto);
        updateItem(id, response.data);
        return response.data;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to update item';
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [updateItem, setLoading, setError]
  );

  /**
   * Delete an example item
   */
  const deleteItemById = useCallback(
    async (id: string) => {
      try {
        setLoading(true);
        setError(null);
        await deleteExampleItem(id);
        removeItem(id);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to delete item';
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [removeItem, setLoading, setError]
  );

  /**
   * Clear selected item
   */
  const clearSelectedItem = useCallback(() => {
    setSelectedItem(null);
  }, [setSelectedItem]);

  /**
   * Clear error
   */
  const clearError = useCallback(() => {
    setError(null);
  }, [setError]);

  return {
    // State
    items,
    selectedItem,
    isLoading,
    error,

    // Actions
    fetchItems,
    fetchItemById,
    createItem,
    updateItemById,
    deleteItemById,
    clearSelectedItem,
    clearError,
  };
}

