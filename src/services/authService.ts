import { supabase } from './supabaseClient';
import { User } from '../types';

export async function signUp(email: string, password: string, fullName: string, role: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;

  // Create a profile record in the public.profiles table
  if (data.user) {
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([
        {
          id: data.user.id,
          full_name: fullName,
          role: role,
        },
      ]);
    if (profileError) throw profileError;
  }

  return data;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser(): Promise<User | null> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return null;

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('full_name, role')
    .eq('id', session.user.id)
    .single();

  if (error || !profile) {
    console.warn('User session exists but profile is missing or error occurred:', error);
    // Return a partial user object to indicate session exists but profile is incomplete
    // This prevents the app from thinking the user is completely logged out
    // but allows the app to handle the missing profile state.
    return {
      id: session.user.id,
      email: session.user.email!,
      fullName: 'New User',
      role: 'USER', // Default role to prevent crashes in role-based rendering
    };
  }

  return {
    id: session.user.id,
    email: session.user.email!,
    fullName: profile.full_name,
    role: profile.role,
  };
}
