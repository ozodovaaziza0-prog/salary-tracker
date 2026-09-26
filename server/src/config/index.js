import path from 'path';
import { fileURLToPath } from 'url';

// Получаем директорию текущего модуля для корректного построения абсолютных путей
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Конфигурация приложения
export const config = {
  // Порт, на котором будет запущен сервер
  port: process.env.PORT || 3001,
  
  // Настройки CORS для разрешения запросов с фронтенда
  corsOptions: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  },
  
  // Путь к файлу базы данных SQLite (будет создан автоматически)
  dbPath: path.join(__dirname, '../../data/database.sqlite'),
};server/src/db/schema.sql