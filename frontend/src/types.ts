// src/types.ts

export interface Strategy {
  id: string;
  name: string;
}

export interface Engine {
  id: string;
  name: string;
}

export interface SimulationOptions {
  strategies: Strategy[];
  engines: Engine[];
}

export interface SimulationRequest {
  strategy: string;
  engine: string;
  amount: number;
  duration: number;
}

export interface HistoryPoint {
  day: number;
  value: number;
}

export interface SimulationResult {
  initial_amount: number;
  final_amount: number;
  profit: number;
  profit_percentage: number;
  history: HistoryPoint[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}