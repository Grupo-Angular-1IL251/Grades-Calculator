import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../environments/environment.development';
import { StudentService } from './services/student.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supabase: SupabaseClient;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private studentService: StudentService) {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseAnonKey
    );

    // Check if user is already logged in
    this.supabase.auth.getSession().then(({ data: { session } }) => {
      this.currentUserSubject.next(session?.user ?? null);
    });

    // Listen for auth changes
    this.supabase.auth.onAuthStateChange((event, session) => {
      this.currentUserSubject.next(session?.user ?? null);
    });
  }

  // Sign up new user
  async signUp(email: string, password: string, firstName: string, lastName: string) {
    try {
      const { data, error } = await this.supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName
          }
        }
      });

      if (error) throw error;

      // Only create student record if user was successfully created and has an ID
      if (data.user && data.user.id) {
        console.log('Attempting to create student record for user:', data.user.id);
        
        try {
          // Create student record in estudiante table with user_id reference
          const studentResult = await this.studentService.createStudent({
            user_id: data.user.id,
            nombre: firstName,
            apellido: lastName,
            correo: email
          });

          if (!studentResult.success) {
            console.error('Failed to create student record:', studentResult.error);
            // Temporarily throw error to see what's happening
            throw new Error(`Student creation failed: ${studentResult.error}`);
          } else {
            console.log('Student record created successfully:', studentResult.data);
          }
        } catch (error) {
          console.error('Error creating student record:', error);
          // Temporarily throw error to see what's happening
          throw error;
        }
      } else {
        console.error('No user ID available for student creation');
      }

      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Sign in user
  async signIn(email: string, password: string) {
    try {
      const { data, error } = await this.supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Sign out user
  async signOut() {
    try {
      const { error } = await this.supabase.auth.signOut();
      if (error) throw error;
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Get current user
  getCurrentUser() {
    return this.currentUserSubject.value;
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }
}
