// src/api/astro.ts
import { api } from "./axiosClient";

// Типы ответа (упрощенные, под структуру AstronomyAPI)
export interface AstroEvent {
  type: string;
  date: string;
}

export interface AstroBodyRow {
  entry: {
    id: string;
    name: string;
  };
  cells: AstroEvent[];
}

export interface AstroResponse {
  ok: boolean;
  data: {
    table: {
      rows: AstroBodyRow[];
    };
  };
}

// src/api/astro.ts

// ... (интерфейсы остаются как были)

export const fetchAstroEvents = async (lat: number, lon: number, days: number) => {
  // 1. Конечная дата — это СЕГОДНЯ
  const endDate = new Date();
  
  // 2. Начальная дата — это СЕГОДНЯ минус ДНИ
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - days); // <--- БЫЛО +, СТАЛО -

  // Форматируем в YYYY-MM-DD
  const from = startDate.toISOString().split("T")[0];
  const to = endDate.toISOString().split("T")[0];

  // Лог для проверки (посмотришь в консоли браузера)
  console.log(`Запрос событий с ${from} по ${to}`);

  const response = await api.get<AstroResponse>("/astro/events", {
    params: {
      lat,
      lon,
      from,
      to,
    },
  });

  return response.data;
};