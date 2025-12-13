// ====================================================================
//      SCRIPT DE MIGRATION AUTOMATIQUE (NODE.JS)
// ====================================================================

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs/promises');
const path = require('path');
const mime = require('mime-types');

// --- VOS INFORMATIONS SUPABASE ---
// (Copiez-collez les mêmes que dans votre fichier supabase-client.js)
// RECOMMANDATION DE SÉCURITÉ : Utilisez des variables d'environnement pour vos clés.
// Créez un fichier .env à la racine de votre projet avec :
// SUPABASE_URL=votre_url
// SUPABASE_SERVICE_KEY=votre_cle_service_role
// Puis, installez dotenv (npm install dotenv) et décommentez les 2 lignes suivantes :
// require('dotenv').config();
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://uqghlxriwntihmimfhob.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxZ2hseHJpd250aWhtaW1maG9iIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTU3NTYyMiwiZXhwIjoyMDgxMTUxNjIyfQ.tiO_kZge1FbL_iLQSBBHOTwN3CcHAFj_hGQDplgo6Hc'; // IMPORTANT: À CHANGER !

// --- ATTENTION ---
// Allez dans votre dashboard Supabase -> Project Settings -> API
// Trouvez la clé nommée "service_role" (elle commence par "eyJ...").
// Copiez-la et collez-la ci-dessus. Cette clé est secrète et donne tous les droits.
// Ne la partagez JAMAIS.

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// Copiez-collez ici votre grand tableau de produits
const productsToMigrate = [



   
];

// Correction d'une faute de frappe dans la liste de produits
const productWithTypo = productsToMigrate.find(p => p.id === 'p120');
if (productWithTypo && productWithTypo.categoùy) { productWithTypo.category = productWithTypo.categoùy; delete productWithTypo.categoùy; }

// Le nom de votre bucket de stockage sur Supabase
const BUCKET_NAME = 'products';

async function main() {
    console.log('🚀 Démarrage de la migration...');

    // Fetch existing product names from Supabase to avoid duplicates
    const productsToInsert = [];
    const skippedProducts = [];
    const processedNamesInThisRun = new Set(); // To track duplicates within the hardcoded list

    let existingProductNames = new Set();
    try {
        const { data, error } = await supabase.from('products').select('name, id');
        if (error) throw error;
        existingProductNames = new Set(data.map(p => p.name));
        console.log(`Found ${existingProductNames.size} existing product names in Supabase.`);
    } catch (e) {
        console.error("Error fetching existing product names from Supabase:", e.message);
        console.warn("Proceeding without checking for existing product names. Duplicates might occur if 'name' has a unique constraint.");
    }

    for (const product of productsToMigrate) {
        // Normalize name for comparison (e.g., trim whitespace, convert to uppercase)
        const normalizedName = product.name.trim().toUpperCase();

        // Check if this product name already exists in Supabase OR has been processed in this batch
        if (existingProductNames.has(product.name) || processedNamesInThisRun.has(normalizedName)) {
            skippedProducts.push({ name: product.name, reason: "Name already exists in Supabase or is a duplicate in the source list." });
            continue; // Skip this product
        }

        let imageUrl = product.image; // Initialize imageUrl for the current product

        // Étape 1: Gérer l'image
        if (product.image && !product.image.startsWith('http')) {
            const localImagePath = path.join(__dirname, product.image);
            
            try {
                // Lire le fichier image depuis le disque
                const fileBuffer = await fs.readFile(localImagePath);
                const contentType = mime.lookup(localImagePath) || 'application/octet-stream';
                const storagePath = product.image; // On garde le même chemin dans le bucket

                console.log(`📤 Upload de : ${storagePath}`);

                // Envoyer l'image vers Supabase Storage
                const { error: uploadError } = await supabase.storage
                    .from(BUCKET_NAME)
                    .upload(storagePath, fileBuffer, {
                        contentType,
                        upsert: true // Remplace l'image si elle existe déjà
                    });

                if (uploadError) {
                    throw new Error(`Erreur d'upload pour ${storagePath}: ${uploadError.message}`);
                }

                // Obtenir l'URL publique de l'image
                const { data: urlData } = supabase.storage.from(BUCKET_NAME).getPublicUrl(storagePath);
                imageUrl = urlData.publicUrl;
                console.log(`✅ URL: ${imageUrl}`);

            } catch (fileError) {
                console.warn(`⚠️ Fichier non trouvé pour "${product.name}" (chemin: ${localImagePath}). L'image ne sera pas migrée. Erreur: ${fileError.message}`);
                imageUrl = null; // ou une image par défaut
            }
        } else if (product.image && product.image.startsWith('http')) {
            // If the image is already an external URL (like unsplash.com), use it directly
            imageUrl = product.image;
        } else {
            imageUrl = null; // ou une image par défaut
        }

        // Étape 2: Préparer les données du produit pour la base de données
        productsToInsert.push({
            name: product.name,
            // Ajout d'une vérification pour les prix invalides ou vides
            price: (typeof product.price === 'string' && product.price.trim() !== '') 
                   ? parseFloat(product.price) 
                   : (typeof product.price === 'number' ? product.price : 0),
            category: product.category,
            image: imageUrl, // CORRIGÉ: Le nom de la colonne est 'image' et non 'image_url'
            description: product.description || ''
        });
        processedNamesInThisRun.add(normalizedName); // Mark this name as processed for this run
    }

    // Étape 3: Insérer tous les produits dans la base de données en une seule fois
    if (productsToInsert.length > 0) {
        console.log(`\n💾 Insertion de ${productsToInsert.length} produits dans la base de données...`);
        const { error: insertError } = await supabase.from('products').insert(productsToInsert);

        if (insertError) {
            console.error('❌ ERREUR lors de l\'insertion dans la base de données:', insertError);
        } else {
            console.log('\n🎉🎉🎉 MIGRATION TERMINÉE AVEC SUCCÈS ! 🎉🎉🎉');
            console.log(`Total ${productsToInsert.length} produits insérés.`);
        }
    } else {
        console.log('Aucun nouveau produit à insérer.');
    }

    if (skippedProducts.length > 0) {
        console.warn(`\n⚠️ ${skippedProducts.length} produits ont été ignorés car leur nom existe déjà dans Supabase ou est dupliqué dans la liste source:`);
        skippedProducts.forEach(p => console.warn(`- ${p.name} (${p.reason})`));
    }
}

main().catch(console.error);
