export interface Student {
  id?: number;
  user_id: string; // UUID reference to auth.users.id
  nombre: string;
  apellido: string;
  correo: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateStudentRequest {
  user_id: string; // UUID reference to auth.users.id
  nombre: string;
  apellido: string;
  correo: string;
}
