export interface User {
  id: string; // Уникальный идентификатор пользователя
  email: string; // Поле email пользователя
  name: string; // Имя пользователя
  maxScore: number; // Максимальный счет
  role: Role; // Роль пользователя
}

enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}