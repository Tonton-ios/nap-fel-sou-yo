// Shop Product Display Module
import { db } from './firebase.js';
import { 
  collection, 
  getDocs, 
  query, 
  orderBy 
} from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js';

/**
 * Load all products from Firestore and render them
 * @param {string} containerId - HTML element ID to render products into
 * @returns {Promise<array>} - Array of loaded products
 */
export async function loadProducts(containerId = 'products') {
  const container = document.getElementById(containerId);
  if (!container) {
    console.warn(`Conteneur #${containerId} non trouvé`);
    return [];
  }

  try {
    // Query products ordered by creation date (newest first)
    const q = query(
      collection(db, 'products'),
      orderBy('createdAt', 'desc')
    );
    
    const snapshot = await getDocs(q);
    const products = [];

    snapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data()
      });
    });

    console.log(`✅ ${products.length} produit(s) chargé(s) depuis Firestore`);
    
    // Render products
    renderProducts(products, container);
    
    return products;
  } catch (error) {
    console.error('Erreur lors du chargement des produits:', error);
    container.innerHTML = `<p style="color: red;">❌ Erreur: ${error.message}</p>`;
    return [];
  }
}

/**
 * Render products into a container
 * @param {array} products - Array of product objects
 * @param {HTMLElement} container - HTML container element
 */
function renderProducts(products, container) {
  if (!products || products.length === 0) {
    container.innerHTML = '<p>Aucun produit disponible.</p>';
    return;
  }

  container.innerHTML = products.map(product => `
    <div class="product-card" data-id="${product.id}">
      <div class="product-image-wrapper">
        <img 
          src="${product.imageUrl || 'https://via.placeholder.com/250'}" 
          alt="${product.name}" 
          class="product-image"
          loading="lazy"
        />
      </div>
      <div class="product-info">
        <h3 class="product-name">${escapeHtml(product.name)}</h3>
        <p class="product-category">${escapeHtml(product.category)}</p>
        ${product.description ? `<p class="product-description">${escapeHtml(product.description)}</p>` : ''}
        <p class="product-price"><strong>${product.price.toFixed(2)} €</strong></p>
      </div>
    </div>
  `).join('');
}

/**
 * Escape HTML to prevent XSS
 * @param {string} text - Text to escape
 * @returns {string} - Escaped text
 */
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

/**
 * Watch for real-time product updates (optional)
 */
export function watchProducts(containerId = 'products') {
  import('https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js')
    .then(({ onSnapshot }) => {
      const q = query(collection(db, 'products'));
      
      onSnapshot(q, (snapshot) => {
        const products = [];
        snapshot.forEach((doc) => {
          products.push({
            id: doc.id,
            ...doc.data()
          });
        });
        
        const container = document.getElementById(containerId);
        if (container) {
          renderProducts(products, container);
        }
      });
    })
    .catch(err => console.error('Erreur lors du watch:', err));
}

