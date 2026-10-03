import { supabase } from './supabaseClient';
import { Terminal, Route, SavedRoute } from '../types';

export async function getTerminals(): Promise<Terminal[]> {
  const { data, error } = await supabase.from('terminals').select('*');
  if (error) throw error;
  return data || [];
}

export async function getRoutes(): Promise<Route[]> {
  const { data, error } = await supabase.from('routes').select('*');
  if (error) throw error;
  return data || [];
}

export async function getSavedRoutes(userId: string): Promise<SavedRoute[]> {
  const { data, error } = await supabase
    .from('saved_routes')
    .select('*, routes(*)')
    .eq('userId', userId);

  if (error) throw error;

  // Map the joined route data back to the Route type
  return (data || []).map(item => ({
    id: item.id,
    userId: item.userId,
    routeId: item.routeId,
    route: item.routes as unknown as Route,
    savedAt: item.savedAt,
  }));
}

export async function addSavedRoute(userId: string, route: Route): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from('saved_routes')
    .insert({ userId, routeId: route.id });

  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function removeSavedRoute(savedId: string): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from('saved_routes')
    .delete()
    .eq('id', savedId);

  if (error) return { success: false, error: error.message };
  return { success: true };
}
