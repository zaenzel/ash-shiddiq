/**
 * Example Domain Types
 * 
 * All domain-specific types should be defined here.
 * Types are strongly typed and explicit.
 */

export interface ExampleItem {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateExampleItemDto {
  name: string;
  description: string;
}

export interface UpdateExampleItemDto {
  name?: string;
  description?: string;
}

export interface ExampleItemResponse {
  data: ExampleItem;
}

export interface ExampleItemListResponse {
  data: ExampleItem[];
  total: number;
  page: number;
  limit: number;
}

