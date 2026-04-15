import { ApiResponse, SimulationOptions, SimulationRequest, SimulationResult } from './types';

const API_BASE_URL = 'http://localhost:5000'; 

export const apiService = {
  getOptions: async (): Promise<ApiResponse<SimulationOptions>> => {
    try {
      // Si tu compañero aún no crea este endpoint, usaremos datos locales por ahora
      const response = await fetch(`${API_BASE_URL}/options`);
      if (!response.ok) throw new Error();
      return await response.json();
    } catch (error) {
      // Fallback: Si el backend no tiene /options, devolvemos los datos del contrato
      return {
        success: true,
        data: {
          strategies: [
            { id: "conservative", name: "Conservadora" },
            { id: "balanced", name: "Balanceada" },
            { id: "aggressive", name: "Agresiva" }
          ],
          engines: [
            { id: "fast", name: "Rápido" },
            { id: "realistic", name: "Realista" }
          ]
        }
      };
    }
  },

  simulate: async (payload: SimulationRequest): Promise<ApiResponse<SimulationResult>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/simulate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return await response.json();
    } catch (error) {
      return { success: false, error: 'Error al conectar con Flask' };
    }
  }
};