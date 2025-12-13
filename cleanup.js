// ====================================================================
//      SCRIPT DE NETTOYAGE DES PRODUITS (NODE.JS)
// ====================================================================
// Ce script supprime les produits de votre base de données Supabase
// qui ont une URL d'image invalide (ex: unsplash, placeholder).
//
// ATTENTION : Cette action est irréversible.
//
// Pour l'exécuter :
// 1. Ouvrez votre terminal.
// 2. Naviguez jusqu'au dossier de votre projet (`cd /chemin/vers/merketnouvo`).
// 3. Exécutez la commande : `node cleanup.js`
// ====================================================================

const { createClient } = require('@supabase/supabase-js');

// --- VOS INFORMATIONS SUPABASE ---
// (Les mêmes que dans votre fichier migrate.js)
const SUPABASE_URL = 'https://uqghlxriwntihmimfhob.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxZ2hseHJpd250aWhtaW1maG9iIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTU3NTYyMiwiZXhwIjoyMDgxMTUxNjIyfQ.tiO_kZge1FbL_iLQSBBHOTwN3CcHAFj_hGQDplgo6Hc';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function cleanupBadProducts() {
    console.log('🧹 Démarrage du nettoyage des produits...');

    try {
        // 1. Récupérer tous les produits
        console.log('🔍 Récupération de tous les produits depuis Supabase...');
        const { data: products, error: fetchError } = await supabase
            .from('products')
            .select('name, image'); // On sélectionne 'name' comme identifiant

        if (fetchError) throw fetchError;

        console.log(`✅ ${products.length} produits trouvés au total.`);

        // 2. Identifier les produits à supprimer
        const productsToDelete = products.filter(product => {
            const imageUrl = product.image;
            // On supprime si l'image est nulle, vide, ou contient une URL invalide
            return !imageUrl || imageUrl.includes('unsplash.com') || imageUrl.includes('placeholder.com');
        });

        if (productsToDelete.length === 0) {
            console.log('🎉 Aucun produit avec une image invalide n\'a été trouvé. Tout est propre !');
            return;
        }

        console.log(`🗑️ ${productsToDelete.length} produits avec des images invalides ont été identifiés pour suppression :`);
        productsToDelete.forEach(p => console.log(`   - ${p.name} (Image: ${p.image})`));

        const namesToDelete = productsToDelete.map(p => p.name);

        // 3. Supprimer les produits identifiés
        const { error: deleteError } = await supabase.from('products').delete().in('name', namesToDelete);

        if (deleteError) throw deleteError;

        console.log(`\n✅ Suppression réussie de ${productsToDelete.length} produits.`);
        console.log('🎉🎉🎉 Nettoyage terminé ! 🎉🎉🎉');

    } catch (error) {
        console.error('❌ ERREUR lors du nettoyage :', error.message);
    }
}

cleanupBadProducts();