// ======================================================
//      FICHIER DE CONFIGURATION SUPABASE
// ======================================================
// Remplacez les valeurs ci-dessous par les vôtres
// que vous trouverez dans Project Settings > API dans votre dashboard Supabase

const SUPABASE_URL = 'https://uqghlxriwntihmimfhob.supabase.co'; // C'est la bonne URL

// ATTENTION: Remplacez la ligne ci-dessous par votre VRAIE clé "anon" (public).
// C'est une longue chaîne de caractères qui se trouve dans la section "Project API keys".
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxZ2hseHJpd250aWhtaW1maG9iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU1NzU2MjIsImV4cCI6MjA4MTE1MTYyMn0.YoZb6qRlWYbHAU9n1PdNmv1lb2JIObqXn16lNj43mYg'; 

// Initialiser le client Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log("✅ Supabase a été initialisé !");