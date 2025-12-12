// Admin Product Management Module
import { db, storage } from './firebase.js';
import { 
  collection, 
  addDoc, 
  Timestamp 
} from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js';

/**
 * Add a new product to Firestore with image upload to Firebase Storage
 * @param {string} name - Product name
 * @param {number} price - Product price
 * @param {string} description - Product description
 * @param {string} category - Product category
 * @param {File} file - Image file
 * @returns {Promise<object>} - Created product object with ID
 */
export async function addProduct(name, price, description, category, file) {
  if (!name || !price || !category || !file) {
    throw new Error('Nom, prix, catégorie et image sont requis.');
  }

  try {
    let imageUrl = '';
    
    // Upload image to Firebase Storage
    if (file) {
      const timestamp = Date.now();
      const filename = `${timestamp}-${file.name}`;
      const storageRef = ref(storage, `products/${category}/${filename}`);
      
      await uploadBytes(storageRef, file);
      imageUrl = await getDownloadURL(storageRef);
    }

    // Add product to Firestore
    const docRef = await addDoc(collection(db, 'products'), {
      name: name.trim(),
      price: parseFloat(price),
      description: description.trim(),
      category: category.trim(),
      imageUrl: imageUrl,
      createdAt: Timestamp.now()
    });

    return {
      id: docRef.id,
      name,
      price: parseFloat(price),
      description,
      category,
      imageUrl,
      createdAt: new Date()
    };
  } catch (error) {
    console.error('Erreur lors de l\'ajout du produit:', error);
    throw error;
  }
}

/**
 * Initialize the admin form and handle product submission
 */
export function initAdminForm() {
  const form = document.getElementById('adminProductForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('productName');
    const priceInput = document.getElementById('productPrice');
    const descInput = document.getElementById('productDesc');
    const categoryInput = document.getElementById('productCategory');
    const fileInput = document.getElementById('productImage');
    const submitBtn = form.querySelector('button[type="submit"]');

    if (!nameInput || !priceInput || !fileInput) return;

    const file = fileInput.files[0];
    if (!file) {
      alert('Veuillez sélectionner une image.');
      return;
    }

    try {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Ajout en cours...';

      const product = await addProduct(
        nameInput.value,
        priceInput.value,
        descInput ? descInput.value : '',
        categoryInput ? categoryInput.value : 'alimentaires',
        file
      );

      console.log('✅ Produit ajouté:', product);
      alert(`✅ Produit "${product.name}" ajouté avec succès!`);
      
      // Reset form
      form.reset();
      fileInput.value = '';
      
      // Reload products to show the new one
      if (typeof loadProducts === 'function') {
        await loadProducts();
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert(`❌ Erreur: ${error.message}`);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Ajouter le produit';
    }
  });
}

