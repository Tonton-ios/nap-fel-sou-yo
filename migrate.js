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
  {
    "name": "pasta",
    "price": 2490,
    "category": "insecticides",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/products/prod_1765655079541_sr7sue1gx.JPG",
    "description": ""
  },
  {
    "name": "Play Red",
    "price": 1000,
    "category": "parfums",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/pafen_foto/playred.jpg",
    "description": ""
  },
  {
    "name": "Play Blue ",
    "price": 1000,
    "category": "parfums",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/pafen_foto/playblue.jpg",
    "description": ""
  },
  {
    "name": "777 VIP Men You Are Exalted ",
    "price": 1000,
    "category": "parfums",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/pafen_foto/777vipmen.jpg",
    "description": ""
  },
  {
    "name": "SPRAY OUD FOR GLORY",
    "price": 1050,
    "category": "parfums",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/pafen_foto/lattafaglory.jpg",
    "description": ""
  },
  {
    "name": "SPRAY AMETHYST LATTAFA",
    "price": 1050,
    "category": "parfums",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/pafen_foto/latafaamethyst.jpg",
    "description": ""
  },
  {
    "name": "SPRAY PRIVE ROSE ",
    "price": 1050,
    "category": "parfums",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/pafen_foto/priverose.jpg",
    "description": ""
  },
  {
    "name": "SPRAY YARA LATTAFA",
    "price": 1050,
    "category": "parfums",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/pafen_foto/yaralattafa.jpg",
    "description": ""
  },
  {
    "name": "SPRAY HAYAATI  ",
    "price": 1050,
    "category": "parfums",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/pafen_foto/lattafahayaati.jpg",
    "description": ""
  },
  {
    "name": "SPRAY PRIDE OF LATTAFA ",
    "price": 1050,
    "category": "parfums",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/pafen_foto/prideoflattafa.jpg",
    "description": ""
  },
  {
    "name": "COROTE SEX ON THE BEACH",
    "price": 180,
    "category": "alcools",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alkol/IMG_3226.WEBP",
    "description": ""
  },
  {
    "name": "EL MAYU 750ML",
    "price": 600,
    "category": "alcools",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alkol/IMG_3227.PNG",
    "description": ""
  },
  {
    "name": "RHUM BARBANCOURT 3*",
    "price": 1750,
    "category": "alcools",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alkol/IMG_3228.JPG",
    "description": ""
  },
  {
    "name": "CAISE BECKS",
    "price": 3750,
    "category": "alcools",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alkol/IMG_3229.WEBP",
    "description": ""
  },
  {
    "name": "JP CHENET ROSE",
    "price": 1750,
    "category": "alcools",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alkol/IMG_3230.JPG",
    "description": ""
  },
  {
    "name": "JP CHENET BLANC",
    "price": 1750,
    "category": "alcools",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alkol/IMG_3234.WEBP",
    "description": ""
  },
  {
    "name": "MOYEN 8PM 180 ML",
    "price": 200,
    "category": "alcools",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alkol/IMG_3231.JPG",
    "description": ""
  },
  {
    "name": "LAGOMAR VIN ROUGE",
    "price": 550,
    "category": "alcools",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alkol/IMG_3235.PNG",
    "description": ""
  },
  {
    "name": "RAJSKA RED FRUITS 1L",
    "price": 910,
    "category": "alcools",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alkol/IMG_3236.JPG",
    "description": ""
  },
  {
    "name": "REMY MARTINS",
    "price": 9500,
    "category": "alcools",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alkol/IMG_3237.WEBP",
    "description": ""
  },
  {
    "name": "HENNESY",
    "price": 7000,
    "category": "alcools",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alkol/IMG_3238.PNG",
    "description": ""
  },
  {
    "name": "WHISKY WHITE LABEL",
    "price": 0,
    "category": "alcools",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alkol/IMG_3239.WEBP",
    "description": ""
  },
  {
    "name": "CORONA BIÈRE",
    "price": 200,
    "category": "alcools",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alkol/IMG_3240.PNG",
    "description": ""
  },
  {
    "name": "JACK DANIELS WHISKY 750 ML 1400.00",
    "price": 1750,
    "category": "alcools",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alkol/IMG_3241.WEBP",
    "description": ""
  },
  {
    "name": "BLUE FINEST",
    "price": 700,
    "category": "alcools",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alkol/IMG_3242.PNG",
    "description": ""
  },
  {
    "name": "KINANM",
    "price": 110,
    "category": "alcools",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alkol/IMG_3243.JPG",
    "description": ""
  },
  {
    "name": "RHUM BARBANCOURT(BLANC)700ML",
    "price": 1400,
    "category": "alcools",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alkol/barbancourt_blanc_55vol_bottle_800-1362.jpg",
    "description": ""
  },
  {
    "name": "PRESTIGE",
    "price": 200,
    "category": "alcools",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alkol/IMG_3244.WEBP",
    "description": ""
  },
  {
    "name": "MONTMERYRAC",
    "price": 700,
    "category": "alcools",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alkol/IMG_3245.WEBP",
    "description": ""
  },
  {
    "name": "BARON ARIGNAC",
    "price": 750,
    "category": "alcools",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alkol/IMG_3246.JPG",
    "description": ""
  },
  {
    "name": "VIN CAVIC BLANC ",
    "price": 0,
    "category": "alcools",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alkol/IMG_3247.JPG",
    "description": ""
  },
  {
    "name": "OFFICIER CHOICE 180ML",
    "price": 150,
    "category": "alcools",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alkol/IMG_3248.JPG",
    "description": ""
  },
  {
    "name": "RAJSKA LEMON 1L",
    "price": 750,
    "category": "alcools",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alkol/IMG_3249.JPG",
    "description": ""
  },
  {
    "name": "IMPERIAL BLUE 750ML",
    "price": 700,
    "category": "alcools",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alkol/IMG_3250.PNG",
    "description": ""
  },
  {
    "name": "OPERA PRIMA MIMOSA",
    "price": 750,
    "category": "alcools",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alkol/IMG_3251.WEBP",
    "description": ""
  },
  {
    "name": "OPERA PRIMA BELLINI",
    "price": 750,
    "category": "alcools",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alkol/IMG_3254.WEBP",
    "description": ""
  },
  {
    "name": "RAJSKA VODKA 1L ",
    "price": 910,
    "category": "alcools",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alkol/IMG_3255.PNG",
    "description": ""
  },
  {
    "name": "BRISE DE FRANCE CABERNET",
    "price": 850,
    "category": "alcools",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alkol/IMG_3256.JPG",
    "description": ""
  },
  {
    "name": "8PM 180ML",
    "price": 155,
    "category": "alcools",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alkol/IMG_3257.WEBP",
    "description": ""
  },
  {
    "name": "BRISE DE FRANCE",
    "price": 850,
    "category": "alcools",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alkol/IMG_3258.JPG",
    "description": ""
  },
  {
    "name": "RHUM BARBANCOURT 5* 700ML",
    "price": 3000,
    "category": "alcools",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alkol/IMG_3259.PNG",
    "description": ""
  },
  {
    "name": "GALIOTTO SUAVE",
    "price": 650,
    "category": "alcools",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alkol/IMG_3260.JPG",
    "description": ""
  },
  {
    "name": "VINO TINTO CAMPEON",
    "price": 250,
    "category": "alcools",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alkol/IMG_3261.PNG",
    "description": ""
  },
  {
    "name": "AMOUR VIN BLANC",
    "price": 800,
    "category": "alcools",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alkol/IMG_3262.JPG",
    "description": ""
  },
  {
    "name": "CAVIC VINO TINTO",
    "price": 750,
    "category": "alcools",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alkol/IMG_3263.WEBP",
    "description": ""
  },
  {
    "name": "UVITA DE PLATA BLEND",
    "price": 650,
    "category": "alcools",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alkol/IMG_3264.WEBP",
    "description": ""
  },
  {
    "name": "AMOUR VIN ROUGE ",
    "price": 800,
    "category": "alcools",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alkol/IMG_3265.JPG",
    "description": ""
  },
  {
    "name": "QUINTA DO MORGADO SUAVE 750ML",
    "price": 650,
    "category": "alcools",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alkol/IMG_3266.JPG",
    "description": ""
  },
  {
    "name": "LA FUERZA",
    "price": 250,
    "category": "alcools",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alkol/IMG_3267.WEBP",
    "description": ""
  },
  {
    "name": "OFFICERS CHOICE 750ML",
    "price": 610,
    "category": "alcools",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alkol/IMG_3268.WEBP",
    "description": ""
  },
  {
    "name": "OFFICIERS CHOICE BLUE 750ML",
    "price": 600,
    "category": "alcools",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alkol/IMG_3269.WEBP",
    "description": ""
  },
  {
    "name": "DEWARS WHITE LABEL 750ML",
    "price": 1765,
    "category": "alcools",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alkol/IMG_3270.JPG",
    "description": ""
  },
  {
    "name": "STOLI VODKAV 0,75L",
    "price": 1750,
    "category": "alcools",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alkol/stolichnaya-premium-vodka.jpg",
    "description": ""
  },
  {
    "name": "RESERVE 750ML",
    "price": 700,
    "category": "alcools",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alkol/IMG_3271.WEBP",
    "description": ""
  },
  {
    "name": "COLD PREMIUN WHISKY",
    "price": 650,
    "category": "alcools",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alkol/cold-zero-whiskey-reserve-bottle.webp",
    "description": ""
  },
  {
    "name": "CAVALIER(ROUGE DOUX) 750ML",
    "price": 1000,
    "category": "alcools",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alkol/images.jpeg",
    "description": ""
  },
  {
    "name": "OPERA BRUT 75CL",
    "price": 1000,
    "category": "alcools",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alkol/B2CD.jpeg",
    "description": ""
  },
  {
    "name": "CHALISE(ROSE SUAVE) 750ML",
    "price": 800,
    "category": "alcools",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alkol/6821-vinho-chalise-tinto-suave-750-ml.jpg",
    "description": ""
  },
  {
    "name": "BARON(REMERO) 750ML",
    "price": 700,
    "category": "alcools",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alkol/baron-remore-wine.jpg.webp",
    "description": ""
  },
  {
    "name": "GOLDEN ICE ROSE",
    "price": 800,
    "category": "alcools",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alkol/157745.png",
    "description": ""
  },
  {
    "name": "CAVALIER(DEMI SEC)",
    "price": 890,
    "category": "alcools",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alkol/images%20copie.jpeg",
    "description": ""
  },
  {
    "name": "MUSCADOR BLANC 75CL",
    "price": 1250,
    "category": "alcools",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alkol/download.jpeg",
    "description": ""
  },
  {
    "name": "DON LUCIANO SEMI SECO 90MM",
    "price": 850,
    "category": "alcools",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alkol/don-luciano-charmat-semi-seco.jpg",
    "description": ""
  },
  {
    "name": "DON LUCIANO GOLD MOSCAT 90MM",
    "price": 850,
    "category": "alcools",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alkol/JGC-003SHOPIFY_JGCDonLucianoGoldMoscato_grande.png.webp",
    "description": ""
  },
  {
    "name": "MUSCADOR (ROSE) 750ML",
    "price": 1250,
    "category": "alcools",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alkol/0_0_orig.webp",
    "description": ""
  },
  {
    "name": "DON LUCIANO PINK 90MM",
    "price": 850,
    "category": "alcools",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alkol/JGC-004_SHOPIFY_JGC_DON_LUCIANO_PINK_MOSCATO_grande.png.webp",
    "description": ""
  },
  {
    "name": "DON LUCIANO BLUE 90MM",
    "price": 850,
    "category": "alcools",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alkol/images%20copie%202.jpeg",
    "description": ""
  },
  {
    "name": "DON LUCIANO BRUT 90MM",
    "price": 850,
    "category": "alcools",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alkol/images%20copie%203.jpeg",
    "description": ""
  },
  {
    "name": "COUNTRY WINE BRANCO 750ML",
    "price": 580,
    "category": "alcools",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alkol/6843-vinho-country-wine-branco-suave-750ml.jpg",
    "description": ""
  },
  {
    "name": "CAVALIER BRUT 75 ML",
    "price": 1000,
    "category": "alcools",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alkol/cavalier-blanc-de-blanc-brut-75cl-cat.jpg.webp",
    "description": ""
  },
  {
    "name": "CHALISE(TINTO SUAVE) 750ML",
    "price": 800,
    "category": "alcools",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alkol/6821-vinho-chalise-tinto-suave-750-ml.jpg",
    "description": ""
  },
  {
    "name": "CAVALIER (ROSE SEC)",
    "price": 725,
    "category": "alcools",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alkol/41mMR5tUffL.jpg",
    "description": ""
  },
  {
    "name": "COUNTRY WINE ROSE 750ML",
    "price": 580,
    "category": "alcools",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alkol/images%20copie%205.jpeg",
    "description": ""
  },
  {
    "name": "COUNTRY WINE TINTO SUAVE 750ML",
    "price": 580,
    "category": "alcools",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alkol/6841-vinho-country-wine-tinto-suave-750ml.jpg",
    "description": ""
  },
  {
    "name": "Mr Noodles Assortis",
    "price": 70,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/mrnoodles.jpg",
    "description": ""
  },
  {
    "name": "Sweet Peas 15 OZ",
    "price": 235,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/sweetpeas15oz.jpg",
    "description": ""
  },
  {
    "name": "Pate de Tomate Bongu 6x3420G",
    "price": 1515,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3122.JPG",
    "description": ""
  },
  {
    "name": "Lays Classicas 16x110G",
    "price": 450,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/foto%20mak/lays.jpeg",
    "description": ""
  },
  {
    "name": "Cheetos Crunchy 110G",
    "price": 450,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/cheetoscrunchy.jpg",
    "description": ""
  },
  {
    "name": "Mayonnaise Manicera",
    "price": 220,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/foto%20mak/manicerabo.jpg",
    "description": ""
  },
  {
    "name": "Yellow Mustard 12x8 OZ",
    "price": 210,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/mustardyellow.jpg",
    "description": ""
  },
  {
    "name": "Premium Mustard 8 OZ",
    "price": 195,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/yellowmustard297g.jpg",
    "description": ""
  },
  {
    "name": "Ragu Sauce Gros",
    "price": 635,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3123.WEBP",
    "description": ""
  },
  {
    "name": "Kernel Corn Gros 15 OZ",
    "price": 255,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/kernelcorn.jpg",
    "description": ""
  },
  {
    "name": "M Mortadel 400G",
    "price": 150,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/mortadella.jpg",
    "description": ""
  },
  {
    "name": "Louisiana 177ML",
    "price": 225,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/louisina.jpg",
    "description": ""
  },
  {
    "name": "Top Ramen",
    "price": 100,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/topramen.jpg",
    "description": ""
  },
  {
    "name": "Cheetos Hot",
    "price": 150,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/cheetoshotcrunchy.jpg",
    "description": ""
  },
  {
    "name": "Funyuns",
    "price": 150,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/funyunsonion.jpg",
    "description": ""
  },
  {
    "name": "Doritos Cool Ranch",
    "price": 150,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/doritoscoolranch.jpg",
    "description": ""
  },
  {
    "name": "Lay's Sour Cream & Onion",
    "price": 150,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/foto%20mak/lays2.jpeg",
    "description": ""
  },
  {
    "name": "Doritos Hot",
    "price": 150,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/doritosnachocheesehot.jpg",
    "description": ""
  },
  {
    "name": "Lay's Barbecue",
    "price": 150,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/laysbarbecue.jpg",
    "description": ""
  },
  {
    "name": "Elle et Vire Tropical",
    "price": 150,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/elleviretropical.jpg",
    "description": ""
  },
  {
    "name": "Elle et Vire Abricot",
    "price": 150,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/vireelleabricot.jpg",
    "description": ""
  },
  {
    "name": "Elle et Vire Mangue",
    "price": 150,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/ellevire.jpg",
    "description": ""
  },
  {
    "name": "Corn Flakes La Perla",
    "price": 320,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/laperlacornflakes.jpg",
    "description": ""
  },
  {
    "name": "Pascual Big Day 125G",
    "price": 125,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/pascualbigday.jpg",
    "description": ""
  },
  {
    "name": "Fritos Original 42.5G",
    "price": 140,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/fritosorigcornchips.jpg",
    "description": ""
  },
  {
    "name": "Cheetos Crunchy 35.4G",
    "price": 140,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/cheetoscrunchy150g.jpg",
    "description": ""
  },
  {
    "name": "Cheeco Jumbo Palitos Cheese",
    "price": 25,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/jumbo.jpg",
    "description": ""
  },
  {
    "name": "Doritos Nacho Cheese",
    "price": 150,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/foto%20mak/doritos.JPG",
    "description": ""
  },
  {
    "name": "Doublemint",
    "price": 75,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/doublemint.jpg",
    "description": ""
  },
  {
    "name": "Winterfresh",
    "price": 75,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/winterfresh.jpg",
    "description": ""
  },
  {
    "name": "Wafers Fraise",
    "price": 120,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/wafersvanilla.jpg",
    "description": ""
  },
  {
    "name": "Toto Cornet Choco",
    "price": 125,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/toto.jpg",
    "description": ""
  },
  {
    "name": "Guarina",
    "price": 150,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/guarina.jpg",
    "description": ""
  },
  {
    "name": "Hershey's Special Dark",
    "price": 250,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/hersheyssd.jpg",
    "description": ""
  },
  {
    "name": "Freegells",
    "price": 230,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/freegells.jpg",
    "description": ""
  },
  {
    "name": "Pringless Original 19G",
    "price": 120,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/foto%20mak/pringless.JPG",
    "description": ""
  },
  {
    "name": "Elvarin Princh",
    "price": 135,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/elvarin.jpg",
    "description": ""
  },
  {
    "name": "Casino (Choco Chill) 258g",
    "price": 200,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/casino.jpg",
    "description": ""
  },
  {
    "name": "Chomp (Naranja) 228g",
    "price": 250,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/chompsabornaranje.jpg",
    "description": ""
  },
  {
    "name": "Nice 33g",
    "price": 180,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/nice.jpg",
    "description": ""
  },
  {
    "name": "Chomp (Chocolate) 228g",
    "price": 250,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/chompchocolat.jpg",
    "description": ""
  },
  {
    "name": "Bonbon Bongu Cheese",
    "price": 250,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/bongusandwichfromage.jpg",
    "description": ""
  },
  {
    "name": "Casino (Sabor Alfajor) 258g",
    "price": 200,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/casinoalfajor.jpg",
    "description": ""
  },
  {
    "name": "Trio 4 Crema 336g",
    "price": 185,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/trio4.jpg",
    "description": ""
  },
  {
    "name": "Corn Flakes Bongu 510g",
    "price": 320,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/bongoucornflakes.jpg",
    "description": ""
  },
  {
    "name": "Casino Bonbon Fraise 258g",
    "price": 200,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/casinofresa.jpg",
    "description": ""
  },
  {
    "name": "Bongu (Sandwich Fromage) 24g",
    "price": 250,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/bongusandwichfromage.jpg",
    "description": ""
  },
  {
    "name": "Siroline (Surettes) 14g",
    "price": 450,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/siroline.jpg",
    "description": ""
  },
  {
    "name": "Pop Boom 408g",
    "price": 400,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/popboom.jpg",
    "description": ""
  },
  {
    "name": "Lasagna Princesa 400g",
    "price": 450,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/princes.jpg",
    "description": ""
  },
  {
    "name": "Famosa Ketchup Boite",
    "price": 400,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/bwatfamosa.jpg",
    "description": ""
  },
  {
    "name": "Brinto Sunflower 1L",
    "price": 600,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/brinto.jpg",
    "description": ""
  },
  {
    "name": "Oil Crisol Gros Gallon 3.78L",
    "price": 1500,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/foto%20mak/huilecristol.jpg",
    "description": ""
  },
  {
    "name": "FROMAGE TETE DE MORT",
    "price": 400,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/foto%20mak/fromagemort.JPG",
    "description": ""
  },
  {
    "name": "ELLE & VIRE ABRICOT 500 g",
    "price": 150,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/ellevireabricot.jpg",
    "description": ""
  },
  {
    "name": "ELLE & VIRE BANANE 500g",
    "price": 120,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/ellevirebanane.jpg",
    "description": ""
  },
  {
    "name": "ELLE & VIRE FRAMBOISE 500g",
    "price": 150,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/ellevireframboise.jpg",
    "description": ""
  },
  {
    "name": "RANCHERO",
    "price": 200,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3117.JPG",
    "description": ""
  },
  {
    "name": "SPAGHETTI GEANT",
    "price": 90,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3118.JPG",
    "description": ""
  },
  {
    "name": "CAISSE CRAKENAS",
    "price": 2750,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3119.JPG",
    "description": ""
  },
  {
    "name": "SAC SUCRE MAYAGUEZ",
    "price": 4000,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/sucremayaguez25kg.jpg",
    "description": ""
  },
  {
    "name": "SPAGHETTI CLASSICO (CAISSE)",
    "price": 1750,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3120.JPG",
    "description": ""
  },
  {
    "name": "SPAGHETTI CLASSICO",
    "price": 80,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3121.JPG",
    "description": ""
  },
  {
    "name": "MACARONI (ARLEQUIN) 350g",
    "price": 90,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3125.JPG",
    "description": ""
  },
  {
    "name": "DORITOS 18g",
    "price": 50,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3126.JPG",
    "description": ""
  },
  {
    "name": "LAYS 16g",
    "price": 50,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3127.JPG",
    "description": ""
  },
  {
    "name": "SAUMON BONGU MACKEREL (Petit)",
    "price": 150,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3129.JPG",
    "description": ""
  },
  {
    "name": "SAUMON BONGU MACKEREL (Gros)",
    "price": 300,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3143.JPG",
    "description": ""
  },
  {
    "name": "Sel Refisal",
    "price": 50,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3131.WEBP",
    "description": ""
  },
  {
    "name": "BEURRE TI MALICE 1livres",
    "price": 250,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3132.JPG",
    "description": ""
  },
  {
    "name": "TI MALICE(ENRICHI EN VITAMINE) 8 LIVRES",
    "price": 1500,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3133.JPG",
    "description": ""
  },
  {
    "name": "Caisse geant",
    "price": 1820,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3137.JPG",
    "description": ""
  },
  {
    "name": "TOMPAC(TOMATE CATCHUP) 875g",
    "price": 350,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3138.JPG",
    "description": ""
  },
  {
    "name": "BONGU(GEANT) 350g",
    "price": 90,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3124.JPG",
    "description": ""
  },
  {
    "name": "EL CRIOLLITO 1200g",
    "price": 1050,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3128.JPG",
    "description": ""
  },
  {
    "name": "KAY LUCIEN BOITE 10g",
    "price": 550,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3141.JPG",
    "description": ""
  },
  {
    "name": "CRISOL 464ml",
    "price": 250,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3142.JPG",
    "description": ""
  },
  {
    "name": "MORTADELA 400G",
    "price": 150,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3145.WEBP",
    "description": ""
  },
  {
    "name": "Ranchero poudre 255g",
    "price": 175,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3150.JPG",
    "description": ""
  },
  {
    "name": "MAZOLA 1.89 L",
    "price": 750,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/Untitled%20design.PNG",
    "description": ""
  },
  {
    "name": "MAZOLA HUILE VEGETALE",
    "price": 1500,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/foto%20mak/huillemazola.jpg",
    "description": ""
  },
  {
    "name": "Hot dog seara",
    "price": 185,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3154.WEBP",
    "description": ""
  },
  {
    "name": "MARIANNE MARGARINE",
    "price": 200,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3155.WEBP",
    "description": ""
  },
  {
    "name": "V8 ORIGINAL VEGETAL JUICE",
    "price": 125,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3156.JPG",
    "description": ""
  },
  {
    "name": "REMIA MARGARINE",
    "price": 225,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3157.WEBP",
    "description": ""
  },
  {
    "name": "LA PERLA IODIZED SALT",
    "price": 200,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3158.WEBP",
    "description": ""
  },
  {
    "name": "RIZ BONGU ( SAC )",
    "price": 3750,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3159.WEBP",
    "description": ""
  },
  {
    "name": "RIZ MEGA ( SAC )",
    "price": 3750,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3160.JPG",
    "description": ""
  },
  {
    "name": "MAZORCA MAIS",
    "price": 75,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3130.JPG",
    "description": ""
  },
  {
    "name": "FROMAGE LA VACHE QUI RIT",
    "price": 210,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/foto%20mak/fromagequirit.JPG",
    "description": ""
  },
  {
    "name": "LA PERLA PATE DE TOMATE",
    "price": 125,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/foto%20mak/laperlemamite.jpg",
    "description": ""
  },
  {
    "name": "CRISOL OIL 1 L",
    "price": 420,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3134.JPG",
    "description": ""
  },
  {
    "name": "PASCUAL YOGIKIDS",
    "price": 125,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3162.PNG",
    "description": ""
  },
  {
    "name": "Yofresh Fresa",
    "price": 225,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3163.JPG",
    "description": ""
  },
  {
    "name": "Yofresh Durazno",
    "price": 225,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3164.WEBP",
    "description": ""
  },
  {
    "name": "Yofresh Vanilla",
    "price": 240,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3165.JPG",
    "description": ""
  },
  {
    "name": "Pascual Fruit Salad",
    "price": 125,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3166.WEBP",
    "description": ""
  },
  {
    "name": "Pascual Vanilla",
    "price": 125,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3167.WEBP",
    "description": ""
  },
  {
    "name": "Pascual Greek",
    "price": 125,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3168.JPG",
    "description": ""
  },
  {
    "name": "Pediasure Vanilla Shake",
    "price": 450,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3161.JPG",
    "description": ""
  },
  {
    "name": "Green Land 900G",
    "price": 1500,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3170.JPG",
    "description": ""
  },
  {
    "name": "Nestle Condensed Milk",
    "price": 325,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3171.AVIF",
    "description": ""
  },
  {
    "name": "Elle & Vire Fraise",
    "price": 150,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3172.JPG",
    "description": ""
  },
  {
    "name": "Elle & Vire Cerise",
    "price": 150,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3173.PNG",
    "description": ""
  },
  {
    "name": "Gallia Calisma 2 830G",
    "price": 2400,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3174.JPG",
    "description": ""
  },
  {
    "name": "Able Farm Condensed",
    "price": 25,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3175.JPG",
    "description": ""
  },
  {
    "name": "Mulik Chocolate",
    "price": 275,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3177.WEBP",
    "description": ""
  },
  {
    "name": "Mulik Strawberry",
    "price": 275,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3178.JPG",
    "description": ""
  },
  {
    "name": "Bongu Lait Concentre Sucre 396G",
    "price": 260,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3179.JPG",
    "description": ""
  },
  {
    "name": "Sport Shake Vanilla 325 ML",
    "price": 300,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3180.PNG",
    "description": ""
  },
  {
    "name": "Ensure Original Vanilla 8 OZ",
    "price": 375,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3181.JPG",
    "description": ""
  },
  {
    "name": "Pascual Banana 125G",
    "price": 125,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3183.WEBP",
    "description": ""
  },
  {
    "name": "Pascual Blueberry 120G",
    "price": 125,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3184.WEBP",
    "description": ""
  },
  {
    "name": "Pascual Strawberry/Fresa 125G",
    "price": 125,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3185.WEBP",
    "description": ""
  },
  {
    "name": "Alacta Plus 800g",
    "price": 3450,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3186.JPG",
    "description": ""
  },
  {
    "name": "Lait Nursie Petit 400G",
    "price": 1100,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3182.PNG",
    "description": ""
  },
  {
    "name": "Bongu (Lait Entier en Poudre) 400g",
    "price": 800,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3188.JPG",
    "description": ""
  },
  {
    "name": "Nido 1+ Lait en Poudre",
    "price": 5000,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3189.AVIF",
    "description": ""
  },
  {
    "name": "Green-Land (Campo Verde) 400g",
    "price": 850,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3190.JPG",
    "description": ""
  },
  {
    "name": "Alaska (Instant 400g)",
    "price": 850,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3191.JPG",
    "description": ""
  },
  {
    "name": "Bongu (Instantane) 900g",
    "price": 1250,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3193.JPG",
    "description": ""
  },
  {
    "name": "Pascual (Vanilla) 120g",
    "price": 125,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3167.WEBP",
    "description": ""
  },
  {
    "name": "Green-Land (Instantane) 2500g",
    "price": 3920,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3201.JPG",
    "description": ""
  },
  {
    "name": "Pascual (Macedonia) 125g",
    "price": 125,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3200.JPG",
    "description": ""
  },
  {
    "name": "Pascual (Big Day) 125g",
    "price": 125,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3199.PNG",
    "description": ""
  },
  {
    "name": "Pascual (Greek) 125g",
    "price": 125,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3198.JPG",
    "description": ""
  },
  {
    "name": "Gloria (Leche Entera) 1L",
    "price": 300,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3197.JPG",
    "description": ""
  },
  {
    "name": "Gloria (Zero Lacto) 1L",
    "price": 300,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3196.WEBP",
    "description": ""
  },
  {
    "name": "Pascual (Whole Milk) 1L",
    "price": 300,
    "category": "alimentaires",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3194.JPG",
    "description": ""
  },
  {
    "name": "SAVON GERMICIDA #2",
    "price": 150,
    "category": "cosmetiques",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/pr_cos/IMG_2835.jpg",
    "description": ""
  },
  {
    "name": "GWO PAW PAW",
    "price": 760,
    "category": "cosmetiques",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/pr_cos/IMG_2837.jpg",
    "description": ""
  },
  {
    "name": " PAW PAW 120ML",
    "price": 410,
    "category": "cosmetiques",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/pr_cos/IMG_2840.jpg",
    "description": ""
  },
  {
    "name": "7 MIRACLES CAROTTE SAVON",
    "price": 110,
    "category": "cosmetiques",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/pr_cos/IMG_2841.jpg",
    "description": ""
  },
  {
    "name": "7 MIRACLES CREMES CAROTTE",
    "price": 185,
    "category": "cosmetiques",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/pr_cos/IMG_2842.jpg",
    "description": ""
  },
  {
    "name": "Ajax 366ml",
    "price": 330,
    "category": "cosmetiques",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/pr_cos/IMG_2850.jpg",
    "description": ""
  },
  {
    "name": "CLEAN&GO ASSOUPLISSANT 1GAL",
    "price": 1500,
    "category": "cosmetiques",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/pr_cos/IMG_2852.jpg",
    "description": ""
  },
  {
    "name": "PERMANENTE PRIMA 212 G",
    "price": 270,
    "category": "cosmetiques",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/pr_cos/IMG_2858.jpg",
    "description": ""
  },
  {
    "name": "RINSE MIEL 474G",
    "price": 300,
    "category": "cosmetiques",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/pr_cos/IMG_2859.jpg",
    "description": ""
  },
  {
    "name": "CLEAN&GO LIQUIDE LESSIVE 1GAL",
    "price": 1500,
    "category": "cosmetiques",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/pr_cos/IMG_2856.jpg",
    "description": ""
  },
  {
    "name": "CLEAN&GO DESINFECTANT 1GAL",
    "price": 1500,
    "category": "cosmetiques",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/pr_cos/IMG_2861.jpg",
    "description": ""
  },
  {
    "name": "COLGATE TOTAL GEL 144G",
    "price": 550,
    "category": "cosmetiques",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/pr_cos/IMG_2863.jpg",
    "description": ""
  },
  {
    "name": "COLGATE TOTAL ACTIVE",
    "price": 550,
    "category": "cosmetiques",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/pr_cos/IMG_2865.jpg",
    "description": ""
  },
  {
    "name": "ACTIMED DENTIFRICE",
    "price": 125,
    "category": "cosmetiques",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/pr_cos/IMG_2866.jpg",
    "description": ""
  },
  {
    "name": "ZOTE PINK 400G",
    "price": 235,
    "category": "cosmetiques",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/pr_cos/IMG_2867.jpg",
    "description": ""
  },
  {
    "name": "AXE BLACK",
    "price": 375,
    "category": "cosmetiques",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_cos/axeblack.JPG",
    "description": ""
  },
  {
    "name": "AXE DARK TEMPTATION",
    "price": 375,
    "category": "cosmetiques",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_cos/axedark.JPG",
    "description": ""
  },
  {
    "name": "TCB HAIR RELAXER 15OZ",
    "price": 540,
    "category": "cosmetiques",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/pr_cos/IMG_2857.jpg",
    "description": ""
  },
  {
    "name": "SPEED STICK FRESH",
    "price": 750,
    "category": "cosmetiques",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_cos/speedfresh.JPG",
    "description": ""
  },
  {
    "name": "SPEED STICK POWER SPORT",
    "price": 750,
    "category": "cosmetiques",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_cos/speedsport.JPG",
    "description": ""
  },
  {
    "name": "AXE APOLLO",
    "price": 600,
    "category": "cosmetiques",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/pr_cos/axeapollo.JPG",
    "description": ""
  },
  {
    "name": "SPEED STICK REGULAR",
    "price": 600,
    "category": "cosmetiques",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_cos/speedregular.JPG",
    "description": ""
  },
  {
    "name": "GILLETTE COOL WAVE",
    "price": 750,
    "category": "cosmetiques",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_cos/gillete.JPG",
    "description": ""
  },
  {
    "name": "GILLETTE DRY COOL WAVE",
    "price": 750,
    "category": "cosmetiques",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_cos/gillettewave.JPG",
    "description": ""
  },
  {
    "name": "AXE ANARCHY DEO",
    "price": 600,
    "category": "cosmetiques",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_cos/axeanachy.JPG",
    "description": ""
  },
  {
    "name": "AXE PHOENIX",
    "price": 600,
    "category": "cosmetiques",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/pr_cos/axephoenix.JPG",
    "description": ""
  },
  {
    "name": "DOVE (TONO UNIFORME COCO) 150 ml",
    "price": 375,
    "category": "cosmetiques",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_cos/dovecoco.JPG",
    "description": ""
  },
  {
    "name": "DOVE (TONO UNIFORME CALENDULA) 150 ml",
    "price": 375,
    "category": "cosmetiques",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_cos/dovetono.JPG",
    "description": ""
  },
  {
    "name": "DOVE (INVISIBLE) 150 ml",
    "price": 375,
    "category": "cosmetiques",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_cos/doveinsi.JPG",
    "description": ""
  },
  {
    "name": "DOVE (TONO UNIFORME) 150 ml",
    "price": 375,
    "category": "cosmetiques",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_cos/dovetono.JPG",
    "description": ""
  },
  {
    "name": "DOVE (EXTRA FRESH) 76 g",
    "price": 490,
    "category": "cosmetiques",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_cos/doveextrafresh.JPG",
    "description": ""
  },
  {
    "name": "Black Hair Shampoo",
    "price": 50,
    "category": "cosmetiques",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_cos/hairblack.JPG",
    "description": ""
  },
  {
    "name": "IDOLE (SAVON) 125 g",
    "price": 150,
    "category": "cosmetiques",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/pr_cos/IMG_2831.jpg",
    "description": ""
  },
  {
    "name": "DOVE (FRESH MOISTURIZERS) 74 g",
    "price": 475,
    "category": "cosmetiques",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_cos/dovegofresh.JPG",
    "description": ""
  },
  {
    "name": "SANOGYL",
    "price": 1000,
    "category": "cosmetiques",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_cos/sanogyl.JPG",
    "description": ""
  },
  {
    "name": "IRISH SPRING (ALOE MIST) 314.4 g",
    "price": 150,
    "category": "cosmetiques",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/pr_cos/irish.JPG",
    "description": ""
  },
  {
    "name": "SAVON IRISH UNITE",
    "price": 130,
    "category": "cosmetiques",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/pr_cos/irish.JPG",
    "description": ""
  },
  {
    "name": "GALLIA (CALISMA) PETIT",
    "price": 1100,
    "category": "cosmetiques",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/alimen/IMG_3195.JPG",
    "description": ""
  },
  {
    "name": "BOD MAN BLACK 8 FL OZ/236",
    "price": 710,
    "category": "cosmetiques",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_cos/bodblack.JPG",
    "description": ""
  },
  {
    "name": "DOVE (ADVANCED CARE) 74 g",
    "price": 500,
    "category": "cosmetiques",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_cos/dovefresh.JPG",
    "description": ""
  },
  {
    "name": "BOD MAN DIAMOND CROWN 8FL OZ/236",
    "price": 710,
    "category": "cosmetiques",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_cos/boddiamond.JPG",
    "description": ""
  },
  {
    "name": "MISTOLINE (CAMPOS DE FLORES NU) 770 ml",
    "price": 335,
    "category": "hygiene",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/pr_cos/IMG_2854.jpg",
    "description": ""
  },
  {
    "name": "GLADE",
    "price": 520,
    "category": "hygiene",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/pr_cos/IMG_2855.jpg",
    "description": ""
  },
  {
    "name": "SANOGYL SOIN GLOBAL",
    "price": 900,
    "category": "hygiene",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/pr_cos/sanogyl.JPG",
    "description": ""
  },
  {
    "name": "ACTIMED(SERVIETTES)",
    "price": 125,
    "category": "hygiene",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/pr_cos/IMG_2868.jpg",
    "description": ""
  },
  {
    "name": "AJAX",
    "price": 270,
    "category": "hygiene",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/pr_cos/IMG_2851.jpg",
    "description": ""
  },
  {
    "name": "KOTEX ACTIMED MAXI LONGUES",
    "price": 125,
    "category": "hygiene",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/pr_cos/IMG_2868.jpg",
    "description": ""
  },
  {
    "name": "Montre Assorti",
    "price": 600,
    "category": "bijoux",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_cos/florida.JPg",
    "description": ""
  },
  {
    "name": "Jeu de Montre Noir Femme ",
    "price": 1000,
    "category": "bijoux",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_cos/florida.JPg",
    "description": ""
  },
  {
    "name": "Jeu de Montre Rouge Femme",
    "price": 1000,
    "category": "bijoux",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_cos/florida.JPg",
    "description": ""
  },
  {
    "name": "Jeu de Montre Beige Homme ",
    "price": 1750,
    "category": "bijoux",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_cos/florida.JPg",
    "description": ""
  },
  {
    "name": "Jeu de Montre Beige Femme ",
    "price": 1750,
    "category": "bijoux",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_cos/florida.JPg",
    "description": ""
  },
  {
    "name": "Montre homme ",
    "price": 1750,
    "category": "bijoux",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_cos/florida.JPg",
    "description": ""
  },
  {
    "name": "Montre femme ",
    "price": 1000,
    "category": "bijoux",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_cos/florida.JPg",
    "description": ""
  },
  {
    "name": "Montre Stainless femme ",
    "price": 1750,
    "category": "bijoux",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_cos/florida.JPg",
    "description": ""
  },
  {
    "name": "PAPIA TOWEL PAPER",
    "price": 310,
    "category": "menagers",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/menaje_pic/papiatowelpaper.JPG",
    "description": ""
  },
  {
    "name": "GOOD FORTUNE INCENSE STICKS",
    "price": 175,
    "category": "menagers",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/menaje_pic/goodfortuneincense.JPG",
    "description": ""
  },
  {
    "name": "LOTUS INCENSE STICKS",
    "price": 175,
    "category": "menagers",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/menaje_pic/lotusincense.JPG",
    "description": ""
  },
  {
    "name": "WHITE ROSE INCENSE STICKS",
    "price": 175,
    "category": "menagers",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/menaje_pic/white_rose_incense.JPG",
    "description": ""
  },
  {
    "name": "AMBER-SANDAL INCENSE STICKS",
    "price": 175,
    "category": "menagers",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/menaje_pic/amber_sandal_incense.JPG",
    "description": ""
  },
  {
    "name": "MONEY DRAWING INCENSE STICKS",
    "price": 175,
    "category": "menagers",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/menaje_pic/money_drawing.jpg",
    "description": ""
  },
  {
    "name": "POSITIVE VIBES INCENSE STICKS",
    "price": 175,
    "category": "menagers",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/menaje_pic/positive_vibes_incense.JPG",
    "description": ""
  },
  {
    "name": "FRANKINCENSE INCENSE STICKS",
    "price": 175,
    "category": "menagers",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/menaje_pic/frankincense_incense.JPG",
    "description": ""
  },
  {
    "name": "ATTRACTS MONEY INCENSE STICKS",
    "price": 175,
    "category": "menagers",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/menaje_pic/attracts_money.jpg",
    "description": ""
  },
  {
    "name": "PRECIOUS FLOWERS INCENSE",
    "price": 175,
    "category": "menagers",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/menaje_pic/precious_gulab_incense.jpg",
    "description": ""
  },
  {
    "name": "MONEY HOUSE INCENSE STICKS",
    "price": 175,
    "category": "menagers",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/menaje_pic/money_house_incense.jpg",
    "description": ""
  },
  {
    "name": "GINGER INCENSE STICKS",
    "price": 175,
    "category": "menagers",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/menaje_pic/ginger_incense.JPG",
    "description": ""
  },
  {
    "name": "PATCHOULI INCENSE STICKS",
    "price": 175,
    "category": "menagers",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/menaje_pic/patchouli_incense.JPG",
    "description": ""
  },
  {
    "name": "CALL CLIENT INCENSE STICKS",
    "price": 175,
    "category": "menagers",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/menaje_pic/call_clients_incense.jpg",
    "description": ""
  },
  {
    "name": "SANDAL-ROSE INCENSE STICKS",
    "price": 175,
    "category": "menagers",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/menaje_pic/sandal_rose_incense.JPG",
    "description": ""
  },
  {
    "name": "SAINT BENOIT INCENSE STICKS",
    "price": 175,
    "category": "menagers",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/menaje_pic/saint_benoit.JPG",
    "description": ""
  },
  {
    "name": "LOVE & SEX INCENSE STICKS",
    "price": 175,
    "category": "menagers",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/menaje_pic/love_sex_incense.JPG",
    "description": ""
  },
  {
    "name": "CITRONELLA (CANDLE) 99 g",
    "price": 410,
    "category": "menagers",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/menaje_pic/candela_cintronella.JPG",
    "description": ""
  },
  {
    "name": "GOOD LUCK INCENSE STICKS",
    "price": 175,
    "category": "menagers",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/menaje_pic/good_luck_incense.jpg",
    "description": ""
  },
  {
    "name": "Saint Antoine De Pardoue",
    "price": 185,
    "category": "maji",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_maji/saintantoinedepadoue.PNG",
    "description": ""
  },
  {
    "name": "Cierge Saint Benoit ",
    "price": 370,
    "category": "maji",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_maji/saintbeoit.PNG",
    "description": ""
  },
  {
    "name": "Cierge Saint Michel Archange",
    "price": 185,
    "category": "maji",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_maji/saintmichel.JPG",
    "description": ""
  },
  {
    "name": "CIERGE IMMACULE CONCEPTION  ",
    "price": 185,
    "category": "maji",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_maji/imakileconception.PNG",
    "description": ""
  },
  {
    "name": "SAINT JOSEPH",
    "price": 185,
    "category": "maji",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_maji/saintjozef.PNG",
    "description": ""
  },
  {
    "name": "Saint Anne ",
    "price": 185,
    "category": "maji",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_maji/Saintanne.PNG",
    "description": ""
  },
  {
    "name": "NOTRE DAME DU PERPETUEL SECOURS ",
    "price": 370,
    "category": "maji",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_maji/notredamealtaga.PNG",
    "description": ""
  },
  {
    "name": "CANADA DRY TONIC WATER",
    "price": 200,
    "category": "glaces",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_glace/tonicwater.JPG",
    "description": ""
  },
  {
    "name": "CANADA DRY GINGER ALE",
    "price": 175,
    "category": "glaces",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_glace/canadadry.JPG",
    "description": ""
  },
  {
    "name": "CANADA DRY CLUB SODA",
    "price": 200,
    "category": "glaces",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_glace/clubsoda.JPG",
    "description": ""
  },
  {
    "name": "SPRITE",
    "price": 100,
    "category": "glaces",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_glace/sprite.JPG",
    "description": ""
  },
  {
    "name": "SPARKLING (WATERMELON)",
    "price": 150,
    "category": "glaces",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_glace/spawatermelon.JPG",
    "description": ""
  },
  {
    "name": "SPARKLING STRAWBERRY",
    "price": 150,
    "category": "glaces",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_glace/spastraw.JPG",
    "description": ""
  },
  {
    "name": "BECKS",
    "price": 0,
    "category": "glaces",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_glace/becks.JPG",
    "description": ""
  },
  {
    "name": "GATORADE CAISSE",
    "price": 4555,
    "category": "glaces",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_glace/gatorade.JPG",
    "description": ""
  },
  {
    "name": "7UP",
    "price": 125,
    "category": "glaces",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_glace/7up.jpg",
    "description": ""
  },
  {
    "name": "MALTA H",
    "price": 150,
    "category": "glaces",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_glace/maltah.JPG",
    "description": ""
  },
  {
    "name": "ROBUSTO",
    "price": 125,
    "category": "glaces",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_glace/robusto.jpg",
    "description": ""
  },
  {
    "name": "RAGAMAN",
    "price": 125,
    "category": "glaces",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_glace/ragaman.jpg",
    "description": ""
  },
  {
    "name": "COCA COLA",
    "price": 125,
    "category": "glaces",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_glace/cocacola.JPG",
    "description": ""
  },
  {
    "name": "GATORADE LEMON LIME",
    "price": 250,
    "category": "glaces",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_glace/gatoradelemon.JPG",
    "description": ""
  },
  {
    "name": "GATORADE GLACIER FREEZE",
    "price": 250,
    "category": "glaces",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_glace/glacier.JPG",
    "description": ""
  },
  {
    "name": "GATORADE FRUIT PUNCH",
    "price": 250,
    "category": "glaces",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_glace/gatoradepunch.JPG",
    "description": ""
  },
  {
    "name": "VITA MALT (COCONUT)",
    "price": 200,
    "category": "glaces",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_glace/vitamaltcoco.jpg",
    "description": ""
  },
  {
    "name": "HYPER MALT",
    "price": 75,
    "category": "glaces",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_glace/hypermalt.jpg",
    "description": ""
  },
  {
    "name": "ALOE VERA (STRAWBERRY)",
    "price": 210,
    "category": "glaces",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_glace/aloestraw.JPG",
    "description": ""
  },
  {
    "name": "ALOE VERA (SANDIA)",
    "price": 210,
    "category": "glaces",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_glace/aloebebida.jpg",
    "description": ""
  },
  {
    "name": "ALOE VERA (PUNCH)",
    "price": 210,
    "category": "glaces",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_glace/aloefruit.jpg",
    "description": ""
  },
  {
    "name": "ALOE VERA (MANGO)",
    "price": 210,
    "category": "glaces",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_glace/aloemango.JPG",
    "description": ""
  },
  {
    "name": "SPARKLING (LEMON)",
    "price": 150,
    "category": "glaces",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_glace/spalemon.jpg",
    "description": ""
  },
  {
    "name": "SPARKLING (PINEAPPLE)",
    "price": 150,
    "category": "glaces",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_glace/spapinea.jpg",
    "description": ""
  },
  {
    "name": "SPARKLING MANGOSTEEN",
    "price": 150,
    "category": "glaces",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_glace/spamangosteen.jpg",
    "description": ""
  },
  {
    "name": "SPARKLING GOLD PEAR",
    "price": 150,
    "category": "glaces",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_glace/spagold.jpg",
    "description": ""
  },
  {
    "name": "ENSURE CHOCOLAT",
    "price": 375,
    "category": "glaces",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_glace/ensure.jpg",
    "description": ""
  },
  {
    "name": "ALOE VERA (BEBIDA)",
    "price": 0,
    "category": "glaces",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_glace/aloebebida.jpg",
    "description": ""
  },
  {
    "name": "VITA MALT (CLASSIC NON ALC)",
    "price": 200,
    "category": "glaces",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_glace/vitamalt.jpg",
    "description": ""
  },
  {
    "name": "MALT HYPER",
    "price": 75,
    "category": "glaces",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_glace/hypermalt.jpg",
    "description": ""
  },
  {
    "name": "ALOE VERA (DRINK)",
    "price": 210,
    "category": "glaces",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_glace/aloedrink.jpg",
    "description": ""
  },
  {
    "name": "POWER MALT (ORIGINAL)",
    "price": 150,
    "category": "glaces",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_glace/powermalt.jpg",
    "description": ""
  },
  {
    "name": "VITA MALT (COCO)",
    "price": 200,
    "category": "glaces",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_glace/vitamaltcoco.jpg",
    "description": ""
  },
  {
    "name": "ALOE VERA (SABORES PINA)",
    "price": 210,
    "category": "glaces",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_glace/aloevera.JPG",
    "description": ""
  },
  {
    "name": "KOOL-AID JAMMERS CHERRY",
    "price": 70,
    "category": "glaces",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_glace/koolaidcherry.jpg",
    "description": ""
  },
  {
    "name": "LITTLE HUG BLEUE",
    "price": 85,
    "category": "glaces",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_glace/hugblue.jpg",
    "description": ""
  },
  {
    "name": "TWIST POMME",
    "price": 300,
    "category": "glaces",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_glace/twistapple.jpg",
    "description": ""
  },
  {
    "name": "KOOL-AID JAMMERS TROPICA",
    "price": 70,
    "category": "glaces",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_glace/koolaidtropi.jpg",
    "description": ""
  },
  {
    "name": "KOOL-AID JAMMERS GRAPE",
    "price": 70,
    "category": "glaces",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_glace/koolaidgrape.jpg",
    "description": ""
  },
  {
    "name": "TWIST COCKTAIL",
    "price": 0,
    "category": "glaces",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_glace/twistcock.jpg",
    "description": ""
  },
  {
    "name": "TWIST GUAVA",
    "price": 0,
    "category": "glaces",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_glace/twistguava.jpg",
    "description": ""
  },
  {
    "name": "TWIST COCKTAIL 1L",
    "price": 300,
    "category": "glaces",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_glace/twistcocktail1L.jpg",
    "description": ""
  },
  {
    "name": "POWERADE",
    "price": 0,
    "category": "glaces",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_glace/powerade.JPG",
    "description": ""
  },
  {
    "name": "TWIST APPLE",
    "price": 75,
    "category": "glaces",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_glace/twistapple.jpg",
    "description": ""
  },
  {
    "name": "TWIST MANGO",
    "price": 75,
    "category": "glaces",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_glace/twistmango.jpg",
    "description": ""
  },
  {
    "name": "LITTLE HUG ROUGE",
    "price": 85,
    "category": "glaces",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_glace/hugred.jpg",
    "description": ""
  },
  {
    "name": "LITTLE HUG MAUVE",
    "price": 85,
    "category": "glaces",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_glace/hugmauve.jpg",
    "description": ""
  },
  {
    "name": "LITTLE HUG VERT",
    "price": 85,
    "category": "glaces",
    "image": "https://uqghlxriwntihmimfhob.supabase.co/storage/v1/object/public/products/Pr_glace/hugvert.jpg",
    "description": ""
  }
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
