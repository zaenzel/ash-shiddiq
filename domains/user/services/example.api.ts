/**
 * Example Domain API Service
 * 
 * All HTTP calls for the example domain live here.
 * This service is responsible for making API requests only.
 * No business logic should be in this file.
 */

import type {
  ExampleItem,
  CreateExampleItemDto,
  UpdateExampleItemDto,
  ExampleItemResponse,
  ExampleItemListResponse,
} from '../types/example.types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

/**
 * Get all example items
 */
export async function getExampleItems(params?: {
  page?: number;
  limit?: number;
}): Promise<ExampleItemListResponse> {
  const searchParams = new URLSearchParams();
  if (params?.page) searchParams.set('page', params.page.toString());
  if (params?.limit) searchParams.set('limit', params.limit.toString());

  const url = `${API_BASE_URL}/examples${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store', // Remove if you want to use Next.js caching
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch example items: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Get a single example item by ID
 */
export async function getExampleItemById(id: string): Promise<ExampleItemResponse> {
  const response = await fetch(`${API_BASE_URL}/examples/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch example item: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Create a new example item
 */
export async function createExampleItem(
  dto: CreateExampleItemDto
): Promise<ExampleItemResponse> {
  const response = await fetch(`${API_BASE_URL}/examples`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dto),
  });

  if (!response.ok) {
    throw new Error(`Failed to create example item: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Update an existing example item
 */
export async function updateExampleItem(
  id: string,
  dto: UpdateExampleItemDto
): Promise<ExampleItemResponse> {
  const response = await fetch(`${API_BASE_URL}/examples/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dto),
  });

  if (!response.ok) {
    throw new Error(`Failed to update example item: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Delete an example item
 */
export async function deleteExampleItem(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/examples/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to delete example item: ${response.statusText}`);
  }
}

