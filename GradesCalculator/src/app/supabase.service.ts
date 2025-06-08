import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://zyfyunmbwfstqynsxrdc.supabase.co', // 🟡 Reemplaza esto con tu URL real
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5Znl1bm1id2ZzdHF5bnN4cmRjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODk5ODg4MSwiZXhwIjoyMDY0NTc0ODgxfQ.kBSYy_4XW1kyVMxHVZdKkL62Zcyq1wP0vIHHV17IPxk'                    // 🔑 Reemplaza esto con tu public key de Supabase
    );
  }

  insertMateria(data: any) {
    return this.supabase.from('MATERIA').insert(data);
  }
}