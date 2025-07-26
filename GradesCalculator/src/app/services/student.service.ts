import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';
import { Student, CreateStudentRequest } from '../models/student.interface';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseAnonKey
    );
  }

  /**
   * Create a new student record in the estudiante table
   */
  async createStudent(studentData: CreateStudentRequest): Promise<{ success: boolean; data?: Student; error?: string }> {
    console.log('INSERTING STUDENT DATA:', JSON.stringify(studentData, null, 2));
    
    try {
      const { data, error } = await this.supabase
        .from('estudiante')
        .insert(studentData)
        .select()
        .single();

      console.log('SUPABASE RESPONSE:', { data, error });

      if (error) {
        console.error('SUPABASE ERROR:', error);
        return { success: false, error: error.message };
      }

      console.log('STUDENT CREATED SUCCESSFULLY:', data);
      return { success: true, data: data as Student };
    } catch (error: any) {
      console.error('CATCH ERROR:', error);
      return { success: false, error: error.message || 'An unexpected error occurred' };
    }
  }

  /**
   * Get student by email
   */
  async getStudentByEmail(email: string): Promise<{ success: boolean; data?: Student; error?: string }> {
    try {
      const { data, error } = await this.supabase
        .from('estudiante')
        .select('*')
        .eq('correo', email)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No rows found
          return { success: false, error: 'Student not found' };
        }
        console.error('Error fetching student:', error);
        return { success: false, error: error.message };
      }

      return { success: true, data: data as Student };
    } catch (error: any) {
      console.error('Unexpected error fetching student:', error);
      return { success: false, error: error.message || 'An unexpected error occurred' };
    }
  }

  /**
   * Get student by user ID (auth.users.id)
   */
  async getStudentByUserId(userId: string): Promise<{ success: boolean; data?: Student; error?: string }> {
    try {
      const { data, error } = await this.supabase
        .from('estudiante')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No rows found
          return { success: false, error: 'Student not found' };
        }
        console.error('Error fetching student by user ID:', error);
        return { success: false, error: error.message };
      }

      return { success: true, data: data as Student };
    } catch (error: any) {
      console.error('Unexpected error fetching student by user ID:', error);
      return { success: false, error: error.message || 'An unexpected error occurred' };
    }
  }

  /**
   * Update student information
   */
  async updateStudent(id: number, updates: Partial<Student>): Promise<{ success: boolean; data?: Student; error?: string }> {
    try {
      const { data, error } = await this.supabase
        .from('estudiante')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating student:', error);
        return { success: false, error: error.message };
      }

      return { success: true, data: data as Student };
    } catch (error: any) {
      console.error('Unexpected error updating student:', error);
      return { success: false, error: error.message || 'An unexpected error occurred' };
    }
  }

  /**
   * Delete student by ID
   */
  async deleteStudent(id: number): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await this.supabase
        .from('estudiante')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting student:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error: any) {
      console.error('Unexpected error deleting student:', error);
      return { success: false, error: error.message || 'An unexpected error occurred' };
    }
  }

  /**
   * Get all students (for admin purposes)
   */
  async getAllStudents(): Promise<{ success: boolean; data?: Student[]; error?: string }> {
    try {
      const { data, error } = await this.supabase
        .from('estudiante')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching all students:', error);
        return { success: false, error: error.message };
      }

      return { success: true, data: data as Student[] };
    } catch (error: any) {
      console.error('Unexpected error fetching all students:', error);
      return { success: false, error: error.message || 'An unexpected error occurred' };
    }
  }
}
