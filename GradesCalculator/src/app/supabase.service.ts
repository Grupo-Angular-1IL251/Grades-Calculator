import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../environments/environment.development';
import { CreateStudentRequest } from './models/student.interface';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseAnonKey
    );
  }

  insertMateria(data: any) {
    return this.supabase.from('MATERIA').insert(data);
  }

  // Student operations
  insertStudent(data: CreateStudentRequest) {
    return this.supabase.from('estudiante').insert(data).select().single();
  }

  getStudentByEmail(email: string) {
    return this.supabase.from('estudiante').select('*').eq('correo', email).single();
  }

  getStudentByUserId(userId: string) {
    return this.supabase.from('estudiante').select('*').eq('user_id', userId).single();
  }

  updateStudent(id: number, data: any) {
    return this.supabase.from('estudiante').update(data).eq('id', id).select().single();
  }

  deleteStudent(id: number) {
    return this.supabase.from('estudiante').delete().eq('id', id);
  }
}