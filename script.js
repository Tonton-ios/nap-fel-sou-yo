// State Management
let cart = JSON.parse(localStorage.getItem('marketCart')) || [];
let currentPage = 'home';

// Fonction pour récupérer les données du localStorage avec fallback
function getSafeLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        if (!data) return null;
        return JSON.parse(data);
    } catch (error) {
        console.error(`Erreur lors de la récupération de ${key}:`, error);
        // Retenter avec une petite attente
        return new Promise(resolve => {
            setTimeout(() => {
                try {
                    resolve(JSON.parse(localStorage.getItem(key) || 'null'));
                } catch {
                    resolve(null);
                }
            }, 100);
        });
    }
}

// Fonction pour sauvegarder les données du localStorage avec gestion d'erreur
function setSafeLocalStorage(key, value) {
    try {
        const stringValue = JSON.stringify(value);
        const sizeMB = new Blob([stringValue]).size / 1024 / 1024;
        
        // Augmenter la limite pour les images compressées
        if (sizeMB > 8) {
            console.warn(`Données volumineuses (${sizeMB.toFixed(2)}MB) pour ${key}`);
            return false;
        }
        
        localStorage.setItem(key, stringValue);
        return true;
    } catch (error) {
        if (error.name === 'QuotaExceededError') {
            console.error(`localStorage plein pour ${key}. Taille: ${(new Blob([JSON.stringify(value)]).size / 1024 / 1024).toFixed(2)}MB`);
            
            if (key === 'customProducts') {
                // Garder seulement les 3 derniers produits
                const data = JSON.parse(localStorage.getItem(key) || '[]');
                if (Array.isArray(data) && data.length > 3) {
                    const newData = data.slice(-3);
                    try {
                        localStorage.setItem(key, JSON.stringify(newData));
                        console.log(`✅ Gardé les 3 derniers produits`);
                        return true;
                    } catch (e) {
                        console.error('Impossible même avec 3 produits');
                        return false;
                    }
                }
            }
        } else {
            console.error(`Erreur lors de la sauvegarde de ${key}:`, error);
        }
        return false;
    }
}

// Categories Data
const categories = [
    //{ id: 'poissonnerie', name: 'Poissonnerie', image: 'https://images.unsplash.com/photo-1637679242615-0ddbbb34b7d7?w=400' },
    { id: 'glaces', name: 'Produits glacés', image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400' },
    { id: 'alimentaires', name: 'Produits alimentaires', image: 'https://images.unsplash.com/photo-1714224247661-ee250f55a842?w=400' },
    { id: 'menagers', name: 'Produits ménagers', image: 'https://images.unsplash.com/photo-1758887262204-a49092d85f15?w=400' },
    //{ id: 'lessive', name: 'Lessive', image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400' },
    { id: 'cosmetiques', name: 'Cosmétiques', image: 'https://images.unsplash.com/photo-1623882213146-e60f8b9e8875?w=400' },
    { id: 'parfums', name: 'Parfums', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400' },
    { id: 'bijoux', name: 'Bijoux', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400' },
    { id: 'cartes', name: 'Cartes de vœux', image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400' },
    { id: 'hygiene', name: 'Hygiène', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400' },
    { id: 'maji', name: 'Maji', image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400' },
    { id: 'alcools', name: 'Alcools', image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400' },
    { id: 'paniers', name: 'Paniers cadeaux', image: 'https://images.unsplash.com/photo-1558486012-817176f84c6d?w=400' },
    { id: 'tabac', name: 'Cigares / Cigarettes / Chicha', image: 'https://images.unsplash.com/photo-1594717527116-4b5b8c9a9146?w=400' },
    { id: 'insecticides', name: 'Insecticides', image: 'https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=400' },
];

// Variable globale qui contiendra tous nos produits (chargés depuis Supabase)
let products = [];

// --- Firebase helpers (optional) -------------------------------------------------
function isSupabaseAvailable() {
    return (typeof supabase !== 'undefined');
}

async function saveProductToSupabase(product) {
    if (!isSupabaseAvailable()) throw new Error('Supabase not initialized');
    const { data, error } = await supabase
        .from('products')
        .insert(product)
        .select(); // Demander à Supabase de retourner la ligne complète qui a été insérée

    if (error) {
        console.error('Erreur sauvegarde Supabase:', error);
        throw error;
    }
    return data[0]; // Retourner le premier (et unique) produit créé
}

async function fetchProductsFromSupabase() {
    if (!isSupabaseAvailable()) return [];
    const { data, error } = await supabase
        .from('products')
        .select('*');

    if (error) {
        console.error('Erreur fetch Supabase:', error);
        return [];
    }
    return data;
}

async function updateProductInSupabase(productId, updatedData) {
    if (!isSupabaseAvailable()) throw new Error('Supabase not initialized');
    const { data, error } = await supabase
        .from('products')
        .update(updatedData)
        .eq('id', productId);

    if (error) {
        console.error('Erreur mise à jour Supabase:', error);
        throw error;
    }
    return data;
}

async function deleteProductFromSupabase(productId) {
    if (!isSupabaseAvailable()) throw new Error('Supabase not initialized');
    const { error } = await supabase.from('products').delete().eq('id', productId);
    if (error) {
        console.error('Erreur suppression Supabase:', error);
        throw error;
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    let initialProducts = [];
    // If Supabase is initialized, try to load remote products first
    if (isSupabaseAvailable()) {
        try {
            const remote = await fetchProductsFromSupabase();
            // Remplacer la liste locale par les produits de la base de données
            initialProducts = remote;
            console.log(`✅ ${initialProducts.length} produit(s) chargé(s) depuis Supabase`);
        } catch (e) {
            console.error('Erreur lors du chargement depuis Supabase:', e);
        }
    }
    // Load custom products from localStorage with error handling
    try {
        let customProducts = JSON.parse(localStorage.getItem('customProducts')) || [];
        
        // Filtrer les produits valides
        customProducts = customProducts.filter(p => p.id && p.name && p.price && p.category && p.image);
        
        // Ajouter les produits personnalisés à la liste
        if (customProducts.length > 0) {
            initialProducts.push(...customProducts);
            console.log(`✅ ${customProducts.length} produit(s) personnalisé(s) chargé(s)`);
        }
        
    } catch (e) {
        console.error("Erreur lors du chargement des produits personnalisés depuis localStorage:", e);
    }
    
    // La liste de produits globale est maintenant celle de la base de données
    products = initialProducts;

    updateCartCount();
    navigateTo('home');
});

// --- Supabase Realtime Subscription ---
function subscribeToProductChanges() {
    if (!isSupabaseAvailable()) return;

    const subscription = supabase.channel('public:products')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, payload => {
            console.log('Changement détecté en temps réel!', payload);

            switch (payload.eventType) {
                case 'INSERT':
                    // Ajouter le nouveau produit à la liste locale
                    products.push(payload.new);
                    break;
                case 'UPDATE':
                    // Mettre à jour le produit existant
                    const indexToUpdate = products.findIndex(p => p.id === payload.new.id);
                    if (indexToUpdate > -1) {
                        products[indexToUpdate] = payload.new;
                    }
                    break;
                case 'DELETE':
                    // Supprimer le produit de la liste locale
                    const indexToDelete = products.findIndex(p => p.id === payload.old.id);
                    if (indexToDelete > -1) {
                        products.splice(indexToDelete, 1);
                    }
                    break;
            }

            // Rafraîchir la vue si l'utilisateur est sur la page des produits ou admin
            if (currentPage === 'products' || currentPage === 'admin') {
                navigateTo(currentPage);
            }
        })
        .subscribe();

    console.log('✅ Abonné aux changements des produits en temps réel.');
    return subscription;
}

subscribeToProductChanges();

// Navigation
function navigateTo(page) {
    currentPage = page;
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === page) {
            link.classList.add('active');
        }
    });
    
    // Render page
    const mainContent = document.getElementById('mainContent');
    
    switch(page) {
        case 'home':
            mainContent.innerHTML = renderHomePage();
            break;
        case 'products':
            mainContent.innerHTML = renderProductsPage();
            attachProductsPageListeners();
            break;
        case 'about':
            mainContent.innerHTML = renderAboutPage();
            break;
        case 'contact':
            mainContent.innerHTML = renderContactPage();
            attachContactFormListener();
            break;
        case 'cart':
            mainContent.innerHTML = renderCartPage();
            attachCartListeners();
            break;
        case 'admin':
            mainContent.innerHTML = renderAdminDashboard();
            // Attacher les écouteurs d'événements pour la page admin
            setTimeout(() => {
                const addProductForm = document.getElementById('adminProductForm');
                if (addProductForm) {
                    addProductForm.addEventListener('submit', handleAddProductSubmit);
                }

                // Attacher l'écouteur pour le formulaire de connexion s'il est affiché
                const loginForm = document.getElementById('adminLoginForm');
                if (loginForm) {
                    loginForm.addEventListener('submit', loginAdmin);
                }
            }, 100);
            break;
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Navigate to category - filters products and goes to products page
function navigateToCategory(categoryId) {
    navigateTo('products');
    
    // Delay to ensure DOM is rendered
    setTimeout(() => {
        const categoryBtn = document.querySelector(`[data-category="${categoryId}"]`);
        if (categoryBtn) {
            categoryBtn.click();
        }
    }, 100);
}

// Home Page
function renderHomePage() {
    const featuredProducts = products.slice(0, 4);
    
    return `
        <!-- Hero Section -->
        <section class="hero">
            <img src="photo_à_propos.jpeg" alt="Market" class="hero-image">
            <div class="hero-content container">
                <div class="hero-text">
                    <h1>Bienvenue dans Bon Cœur Mini Mart </h1>
                    <p>Produits variés et disponibles chaque jour.</p>
                    <button class="btn btn-primary" onclick="navigateTo('products')">

                        voir les produits 

                
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                    </button>
                </div>
            </div>
        </section>

        <!-- Categories Section -->
        <section class="section section-white">
            <div class="container">
                <div class="section-header">
                    <h2>Nos catégories</h2>
                    <p>Découvrez notre large gamme de produits</p>
                </div>
                <div class="grid grid-4">
                    ${categories.map(cat => `
                        <div class="category-card" onclick="navigateToCategory('${cat.id}')">
                            <img src="${cat.image}" alt="${cat.name}">
                            <div class="category-overlay"></div>
                            <div class="category-name">${cat.name}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>

        <!-- Featured Products -->
        <section class="section section-gray">
            <div class="container">
                <div class="section-header">
                    <h2>Produits recommandés</h2>
                    <p>Nos meilleures sélections pour vous</p>
                </div>
                <div class="grid grid-4">
                    ${featuredProducts.map(product => renderProductCard(product)).join('')}
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="section section-emerald">
            <div class="container text-center">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" style="margin: 0 auto 1.5rem;">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                <div class="section-header">
                    <h2>Commandez dès maintenant</h2>
                    <p>Profitez de nos produits de qualité livrés rapidement</p>
                </div>
                <button class="btn btn-white" onclick="navigateTo('products')">
                    Voir tous les produits
                </button>
            </div>
        </section>
    `;
}

// Products Page
function renderProductsPage() {
    return `
        <div class="section section-gray" style="min-height: 100vh;">
            <div class="container" style="padding-top: 3rem; padding-bottom: 3rem;">
                <h1 style="font-size: 2.5rem; margin-bottom: 2rem; color: var(--gray-900);">Nos produits</h1>
                
                <!-- Search Bar -->
                <div class="search-container" style="margin-bottom: 2rem;">
                    <div style="position: relative;">
                        <input 
                            type="text" 
                            id="productSearch" 
                            placeholder="Rechercher un produit..." 
                            class="search-input"
                            style="width: 100%; padding: 0.75rem 1rem; font-size: 1rem; border: 2px solid var(--red-600); border-radius: 0.5rem; background-color: white;"
                        >
                        <svg class="search-icon" style="position: absolute; right: 1rem; top: 50%; transform: translateY(-50%); width: 20px; height: 20px; color: var(--red-600);" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.35-4.35"></path>
                        </svg>
                    </div>
                </div>
                
                <!-- Filter -->
                <div class="filter-container">
                    <div class="filter-buttons">
                        <button class="filter-btn active" data-category="all">Tous les produits</button>
                        <button class="filter-btn" data-category="glaces">Produits glacés</button>
                        <button class="filter-btn" data-category="alimentaires">Produits alimentaires</button>
                        <button class="filter-btn" data-category="menagers">Produits ménagers</button>
                        <button class="filter-btn" data-category="lessive">Lessive</button>
                        <button class="filter-btn" data-category="cosmetiques">Cosmétiques</button>
                        <button class="filter-btn" data-category="parfums">Parfums</button>
                        <button class="filter-btn" data-category="hygiene">Hygiène</button>
                        <button class="filter-btn" data-category="maji">Maji</button>
                        <button class="filter-btn" data-category="kits">Kits alimentaires</button>
                        <button class="filter-btn" data-category="alcools">Alcools</button>
                        <button class="filter-btn" data-category="bijoux">Bijoux</button>
                        <button class="filter-btn" data-category="cartes">Cartes de vœux</button>
                        <button class="filter-btn" data-category="paniers">Paniers cadeaux</button>
                        <button class="filter-btn" data-category="tabac">Tabac</button> 
                        <button class="filter-btn" data-category="insecticides">Insecticides</button>
                    </div>
                </div>
                
                <!-- Products Grid -->
                <div class="grid grid-4" id="productsGrid">
                    ${products.map(product => renderProductCard(product)).join('')}
                </div>
            </div>
        </div>
    `;
}

function attachProductsPageListeners() {
    // Search functionality
    const searchInput = document.getElementById('productSearch');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();
            const activeCategory = document.querySelector('.filter-btn.active').dataset.category;
            
            let filtered = products;
            
            if (activeCategory !== 'all') {
                filtered = filtered.filter(p => p.category === activeCategory);
            }
            
            if (searchTerm) {
                filtered = filtered.filter(p => 
                    p.name.toLowerCase().includes(searchTerm) ||
                    p.id.toLowerCase().includes(searchTerm)
                );
            }
            
            document.getElementById('productsGrid').innerHTML = filtered.length > 0 
                ? filtered.map(product => renderProductCard(product)).join('')
                : '<div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--gray-600);">Aucun produit trouvé</div>';
        });
    }
    
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const category = btn.dataset.category;
            const searchTerm = document.getElementById('productSearch')?.value.toLowerCase().trim() || '';
            
            let filteredProducts = category === 'all' ? products : products.filter(p => p.category === category);
            
            if (searchTerm) {
                filteredProducts = filteredProducts.filter(p => 
                    p.name.toLowerCase().includes(searchTerm) ||
                    p.id.toLowerCase().includes(searchTerm)
                );
            }
            
            document.getElementById('productsGrid').innerHTML = filteredProducts.length > 0
                ? filteredProducts.map(product => renderProductCard(product)).join('')
                : '<div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--gray-600);">Aucun produit trouvé</div>';
        });
    });
}

// Product Card Component
function renderProductCard(product) {
    // Gérer les images - support base64 et URLs
    const placeholder = 'https://via.placeholder.com/400x400.png?text=Image+Indisponible';
    let imageUrl = product.image || placeholder;
    
    // Si l'URL est invalide (ancienne URL unsplash ou locale), utiliser une image placeholder
    // Cela évite les erreurs 404 dans la console.
    if (!imageUrl.startsWith('https') || imageUrl.includes('source.unsplash.com')) {
        imageUrl = placeholder;
    }
    
    return `
        <div class="product-card">
            <div class="product-image">
                <img src="${imageUrl}" alt="${product.name}" loading="lazy" onerror="this.onerror=null; this.src='${placeholder}';">
            </div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-price">${product.price} GDS</div>
                <div class="product-actions">
                    <div class="quantity-selector">
                        <button class="quantity-btn" onclick="decrementQuantity('${product.id}')">
                            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                        </button>
                        <span class="quantity-value" id="qty-${product.id}">1</span>
                        <button class="quantity-btn" onclick="incrementQuantity('${product.id}')">
                            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                        </button>
                    </div>
                    <button class="add-to-cart" onclick="addToCart('${product.id}')">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <path d="M16 10a4 4 0 0 1-8 0"></path>
                        </svg>
                        Ajouter
                    </button>
                </div>
            </div>
        </div>
    `;
}

function incrementQuantity(productId) {
    const qtyElement = document.getElementById(`qty-${productId}`);
    qtyElement.textContent = parseInt(qtyElement.textContent) + 1;
}

function decrementQuantity(productId) {
    const qtyElement = document.getElementById(`qty-${productId}`);
    const currentQty = parseInt(qtyElement.textContent);
    if (currentQty > 1) {
        qtyElement.textContent = currentQty - 1;
    }
}

// Cart Functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const qtyElement = document.getElementById(`qty-${productId}`);
    const quantity = parseInt(qtyElement.textContent);
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ ...product, quantity });
    }
    
    // Reset quantity
    qtyElement.textContent = '1';
    
    saveCart();
    updateCartCount();
    
    // Show feedback
    alert(`${product.name} ajouté au panier!`);
}

function updateCartQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        saveCart();
        navigateTo('cart'); // Re-render cart page
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    navigateTo('cart'); // Re-render cart page
}

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
}

function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function saveCart() {
    setSafeLocalStorage('marketCart', cart);
    updateCartCount();
}

// About Page
function renderAboutPage() {
    const galleryImages = [
        'whatsapp.jpeg',
        'photo_à_propos.jpeg',
        '3ephoto_à_propos.jpeg',
        'https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?w=600',
        '5ephoto_à_propos.jpeg',
        'last_à_propos.jpeg',
    ];
    
    return `
        <!-- Hero -->
        <section class="section section-white">
            <div class="container text-center" style="max-width: 800px;">
                <h1 style="font-size: 3rem; margin-bottom: 1.5rem;">À propos de nous</h1>
                <p style="font-size: 1.125rem; color: var(--gray-600); line-height: 1.8;">
                    Depuis notre création, nous nous engageons à offrir à nos clients 
                    une expérience d'achat exceptionnelle avec des produits de qualité, 
                    une grande variété et un service irréprochable.
                </p>
            </div>
        </section>

        <!-- Story -->
        <section class="section section-gray">
            <div class="container">
                <div class="about-story">
                    <div class="about-text">
                        <h2>Notre histoire</h2>
                        <p>
                            Notre market est né d'une passion : celle de rendre accessible 
                            à tous une large gamme de produits de qualité. Depuis nos débuts, 
                            nous avons construit notre réputation sur la confiance, la 
                            proximité et l'excellence du service.
                        </p>
                        <p>
                            Aujourd'hui, nous sommes fiers de proposer plus de 17 catégories 
                            de produits, allant de la poissonnerie fraîche aux cosmétiques 
                            premium, en passant par les produits alimentaires et ménagers. 
                            Chaque jour, notre équipe travaille avec dévouement pour vous 
                            offrir le meilleur.
                        </p>
                        <p>
                            Notre engagement : vous garantir des produits frais, variés et 
                            de qualité, avec un service personnalisé qui fait toute la différence.
                        </p>
                    </div>
                    <div class="about-image">
                        <img src="photo_à_propos.jpeg" alt="Notre market">
                    </div>
                </div>
            </div>
        </section>

        <!-- Values -->
        <section class="section section-white">
            <div class="container">
                <div class="section-header">
                    <h2>Nos valeurs</h2>
                    <p>Ce qui nous guide au quotidien</p>
                </div>
                <div class="grid grid-4">
                    <div class="value-card">
                        <div class="value-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                            </svg>
                        </div>
                        <h3>Qualité</h3>
                        <p>Nous sélectionnons rigoureusement nos produits pour vous offrir le meilleur</p>
                    </div>
                    <div class="value-card">
                        <div class="value-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                            </svg>
                        </div>
                        <h3>Proximité</h3>
                        <p>Un service personnalisé et une écoute attentive de vos besoins</p>
                    </div>
                    <div class="value-card">
                        <div class="value-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <path d="M16 10a4 4 0 0 1-8 0"></path>
                            </svg>
                        </div>
                        <h3>Variété</h3>
                        <p>Plus de 17 catégories de produits pour répondre à tous vos besoins</p>
                    </div>
                    <div class="value-card">
                        <div class="value-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                        </div>
                        <h3>Passion</h3>
                        <p>Notre engagement quotidien pour votre satisfaction</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Gallery -->
        <section class="section section-gray">
            <div class="container">
                <div class="section-header">
                    <h2>Notre market en images</h2>
                    <p>Découvrez nos espaces et nos produits</p>
                </div>
                <div class="gallery-grid">
                    ${galleryImages.map((img, i) => `
                        <div class="gallery-item">
                            <img src="${img}" alt="Market image ${i + 1}">
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>

        <!-- CTA -->
        <section class="section section-emerald">
            <div class="container text-center">
                <h2 style="color: white; font-size: 2.5rem; margin-bottom: 1rem;">
                    Rejoignez notre communauté
                </h2>
                <p style="color: var(--emerald-100); font-size: 1.125rem; max-width: 600px; margin: 0 auto 2rem;">
                    Découvrez nos produits et profitez d'une expérience d'achat unique
                </p>
            </div>
        </section>
    `;
}

// Contact Page
function renderContactPage() {
    return `
        <div class="section section-gray" style="min-height: 100vh;">
            <div class="container" style="padding-top: 3rem; padding-bottom: 3rem;">
                <div class="section-header">
                    <h1 style="font-size: 3rem;">Contactez-nous</h1>
                    <p>Nous sommes à votre écoute pour toute question</p>
                </div>

                <div class="contact-grid">
                    <!-- Contact Info -->
                    <div class="contact-info">
                        <!-- Phone -->
                        <div class="contact-card">
                            <div class="contact-card-content">
                                <div class="contact-icon phone">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h3>Téléphone</h3>
                                    <p>Appelez-nous pour toute urgence ou information</p>
                                    <a href="tel:+50942936443">+509 42936443</a>
                                </div>
                            </div>
                        </div>

                        <!-- WhatsApp -->
                        <div class="contact-card">
                            <div class="contact-card-content">
                                <div class="contact-icon whatsapp">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                    </svg>
                                </div>
                                <div style="flex: 1;">
                                    <h3>WhatsApp</h3>
                                    <p>Contactez-nous directement sur WhatsApp</p>
                                    <button class="btn btn-green" onclick="window.open('https://wa.me/50942936443', '_blank')" style="margin-top: 0.75rem;">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                        </svg>
                                        Nous écrire sur WhatsApp
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Email -->
                        <div class="contact-card">
                            <div class="contact-card-content">
                                <div class="contact-icon email">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                        <polyline points="22,6 12,13 2,6"></polyline>
                                    </svg>
                                </div>
                                <div>
                                    <h3>Email</h3>
                                    <p>Envoyez-nous un email, nous vous répondrons rapidement</p>
                                    <a href="mailto:boncoeurdistribution@gmail.com">boncoeurdistribution@gmail.com</a>
                                </div>
                            </div>
                        </div>

                        <!-- Social Media -->
                        <div class="contact-card">
                            <h3 style="margin-bottom: 1rem;">Suivez-nous</h3>
                            <div class="social-links">
                                <a href="https://www.facebook.com/share/17dubjLFcM/?mibextid=wwXIfr" target="_blank" class="social-link facebook">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                    </svg>
                                </a>
                                <a href="https://www.instagram.com/boncoeurminimart?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" class="social-link instagram">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                    </svg>
                                </a>
                                <a href="https://www.tiktok.com/@boncoeurminimart?_r=1&_t=ZM-91hHFztPNpE" target="_blank" class="social-link tiktok" aria-label="TikTok">
                                    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="false">
                                        <!-- Official-style layered TikTok mark (cyan, magenta, black) -->
                                        <path fill="#69C9D0" d="M9.75 2v14.07A4.69 4.69 0 1 0 14.44 21V8.5h3.31V6.15h-3.31V2z" transform="translate(-0.9,0)"/>
                                        <path fill="#EE1D52" d="M9.75 2v14.07A4.69 4.69 0 1 0 14.44 21V8.5h3.31V6.15h-3.31V2z" transform="translate(0.9,0)"/>
                                        <path fill="#010101" d="M9.75 2v14.07A4.69 4.69 0 1 0 14.44 21V8.5h3.31V6.15h-3.31V2z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <!-- Location -->
                        <div class="contact-card">
                            <div class="contact-card-content" style="margin-bottom: 1rem;">
                                <div class="contact-icon location">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                        <circle cx="12" cy="10" r="3"></circle>
                                    </svg>
                                </div>
                                <div>
                                    <h3>Notre adresse</h3>
                                    <p>39 Rue Sténio Vincent<br>Pétion-Ville, HT</p>
                                </div>
                            </div>
                            <div class="map-container">
                                <iframe
                                    src="https://www.google.com/maps?q=18.509508,-72.289375&hl=fr&z=15&output=embed"
                                    allowfullscreen
                                    loading="lazy"
                                    referrerpolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </div>
                    </div>

                    <!-- Contact Form -->
                    <div class="contact-form">
                        <h2>Envoyez-nous un message</h2>
                        <form id="contactForm">
                            <div class="form-group">
                                <label for="contactName">Votre nom</label>
                                <input type="text" id="contactName" required placeholder="Entrez votre nom">
                            </div>
                            <div class="form-group">
                                <label for="contactMessage">Votre message</label>
                                <textarea id="contactMessage" rows="6" required placeholder="Entrez votre message"></textarea>
                            </div>
                            <button type="submit" class="btn btn-green order-btn">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <line x1="22" y1="2" x2="11" y2="13"></line>
                                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                </svg>
                                Envoyer via WhatsApp
                            </button>
                            <p class="form-note">Ce message sera envoyé via WhatsApp</p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function attachContactFormListener() {
    document.getElementById('contactForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('contactName').value;
        const message = document.getElementById('contactMessage').value;
        
        const whatsappMessage = `Bonjour, je suis ${name}. ${message}`;
        window.open(`https://wa.me/50942936443?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
    });
}

// Cart Page
function renderCartPage() {
    if (cart.length === 0) {
        return `
            <div class="empty-cart">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                <h2>Votre panier est vide</h2>
                <p>Ajoutez des produits pour commencer vos achats</p>
            </div>
        `;
    }
    
    return `
        <div class="section section-gray" style="min-height: 100vh;">
            <div class="container" style="padding-top: 3rem; padding-bottom: 3rem;">
                <h1 style="font-size: 2.5rem; margin-bottom: 2rem;">Mon panier</h1>
                
                <div class="cart-layout">
                    <!-- Cart Items -->
                    <div class="cart-items">
                        ${cart.map(item => `
                            <div class="cart-item">
                                <div class="cart-item-content">
                                    <div class="cart-item-image">
                                        <img src="${item.image}" alt="${item.name}">
                                    </div>
                                    <div class="cart-item-details">
                                        <div class="cart-item-name">${item.name}</div>
                                        <div class="cart-item-price">${item.price} GDS</div>
                                        <div class="cart-item-actions">
                                            <div class="quantity-selector">
                                                <button class="quantity-btn" onclick="updateCartQuantity('${item.id}', ${item.quantity - 1})">
                                                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                                    </svg>
                                                </button>
                                                <span class="quantity-value">${item.quantity}</span>
                                                <button class="quantity-btn" onclick="updateCartQuantity('${item.id}', ${item.quantity + 1})">
                                                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                                    </svg>
                                                </button>
                                            </div>
                                            <button class="remove-btn" onclick="removeFromCart('${item.id}')">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                    <polyline points="3 6 5 6 21 6"></polyline>
                                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="cart-item-subtotal">
                                        <p>Sous-total</p>
                                        <p>${item.price * item.quantity} Gds</p>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <!-- Cart Summary -->
                    <div class="cart-summary">
                        <h2>Résumé</h2>
                        <div class="summary-items">
                            ${cart.map(item => `
                                <div class="summary-item">
                                    <span class="summary-item-name">${item.name} x ${item.quantity}</span>
                                    <span>${item.price * item.quantity} GDS</span>
                                </div>
                            `).join('')}
                        </div>
                        <hr class="summary-divider">
                        <div class="summary-subtotal">
                            <span>Sous-total</span>
                            <span>${getCartTotal()} GDS</span>
                        </div>
                        <div class="summary-total">
                            <span>Total</span>
                            <span class="total-amount">${getCartTotal()} GDS</span>
                        </div>
                        <button class="btn btn-green order-btn" onclick="goToPayment()">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                            </svg>
                            Procéder au paiement
                        </button>
                        <p class="form-note">Votre commande sera envoyée via WhatsApp</p>
                        
                        <div class="order-info">
                            <h3>Informations</h3>
                            <ul>
                                <li>✓ Paiement via Mon Cash, Natcash, Virement Bancaire </li>
                                <li>✓ Livraison rapide et gratuit </li>
                                <li>✓ Produits frais garantis</li>
                                <li>✓ Service client réactif</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function attachCartListeners() {
    // Listeners are attached inline via onclick
}

function placeOrder() {
    if (cart.length === 0) return;
    
    let message = '🛒 *Nouvelle Commande Market*\n\n';
    message += '*Produits commandés:*\n';
    
    cart.forEach((item, index) => {
        message += `\n${index + 1}. ${item.name}\n`;
        message += `   • Quantité: ${item.quantity}\n`;
        message += `   • Prix unitaire: ${item.price} GDS\n`;
        message += `   • Sous-total: ${item.price * item.quantity} GDS\n`;
    });
    
    message += `\n━━━━━━━━━━━━━━━━━━\n`;
    message += `*TOTAL: ${getCartTotal()} GDS*\n`;
    message += `━━━━━━━━━━━━━━━━━━\n\n`;
    message += `Merci de confirmer la disponibilité et le délai de livraison.`;
    
    window.open(`https://wa.me/50942936443?text=${encodeURIComponent(message)}`, '_blank');
}

function goToPayment() {
    if (cart.length === 0) return;
    currentPage = 'payment';
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = renderPaymentPage();
    attachPaymentListeners();
}

function renderPaymentPage() {
    return `
        <div class="section section-gray" style="min-height: 100vh;">
            <div class="container" style="padding-top: 3rem; padding-bottom: 3rem; max-width: 600px;">
                <h1 style="font-size: 2.5rem; margin-bottom: 2rem; text-align: center;">Choisir un moyen de paiement</h1>
                
                <!-- Order Summary -->
                <div class="payment-summary" style="background: white; padding: 1.5rem; border-radius: 0.5rem; margin-bottom: 2rem; border: 1px solid var(--gray-200);">
                    <h3 style="margin-bottom: 1rem; color: var(--gray-900);">Résumé de votre commande</h3>
                    <div style="max-height: 200px; overflow-y: auto; margin-bottom: 1rem;">
                        ${cart.map(item => `
                            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; padding-bottom: 0.5rem; border-bottom: 1px solid var(--gray-200);">
                                <span>${item.name} x${item.quantity}</span>
                                <span style="font-weight: 600;">${item.price * item.quantity} GDS</span>
                            </div>
                        `).join('')}
                    </div>
                    <hr style="border: none; border-top: 2px solid var(--gray-300); margin: 1rem 0;">
                    <div style="display: flex; justify-content: space-between; font-size: 1.25rem; font-weight: 700; color: var(--red-600);">
                        <span>Total à payer:</span>
                        <span>${getCartTotal()} GDS</span>
                    </div>
                </div>
                
                <!-- Payment Methods -->
                <div style="margin-bottom: 2rem;">
                    <h3 style="margin-bottom: 1rem; color: var(--gray-900);">Sélectionner un moyen de paiement</h3>
                    
                    <!-- Digicel -->
                    <div class="payment-option" style="background: white; border: 2px solid var(--gray-200); border-radius: 0.5rem; padding: 1.5rem; margin-bottom: 1rem; cursor: pointer; transition: all 0.3s;" onclick="selectPayment('digicel')">
                        <div style="display: flex; align-items: center; gap: 1rem;">
                            <div style="width: 50px; height: 50px; background: #ff0000ff; border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">📱</div>
                            <div style="flex: 1;">
                                <h4 style="margin: 0; color: var(--gray-900);">Digicel (Mon Cash)</h4>
                                <p style="margin: 0.25rem 0 0 0; color: var(--gray-600);">Paiement mobile money Digicel</p>
                            </div>
                            <input type="radio" name="payment-method" value="digicel" style="width: 20px; height: 20px;">
                        </div>
                    </div>
                    
                    <!-- Natcom -->
                    <div class="payment-option" style="background: white; border: 2px solid var(--gray-200); border-radius: 0.5rem; padding: 1.5rem; margin-bottom: 1rem; cursor: pointer; transition: all 0.3s;" onclick="selectPayment('natcom')">
                        <div style="display: flex; align-items: center; gap: 1rem;">
                            <div style="width: 50px; height: 50px; background: rgba(255, 132, 0, 1); border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">📱</div>
                            <div style="flex: 1;">
                                <h4 style="margin: 0; color: var(--gray-900);">Natcom (Natcash)</h4>
                                <p style="margin: 0.25rem 0 0 0; color: var(--gray-600);">Paiement mobile money Natcom</p>
                            </div>
                            <input type="radio" name="payment-method" value="natcom" style="width: 20px; height: 20px;">
                        </div>
                    </div>
                    
                    <!-- Virement Bancaire -->
                    <div class="payment-option" style="background: white; border: 2px solid var(--gray-200); border-radius: 0.5rem; padding: 1.5rem; margin-bottom: 2rem; cursor: pointer; transition: all 0.3s;" onclick="selectPayment('virement')">
                        <div style="display: flex; align-items: center; gap: 1rem;">
                            <div style="width: 50px; height: 50px; background: #0037ffff; border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">🏦</div>
                            <div style="flex: 1;">
                                <h4 style="margin: 0; color: var(--gray-900);">Virement Bancaire</h4>
                                <p style="margin: 0.25rem 0 0 0; color: var(--gray-600);">Transfert direct vers notre compte bancaire</p>
                            </div>
                            <input type="radio" name="payment-method" value="virement" style="width: 20px; height: 20px;">
                        </div>
                    </div>
                </div>
                
                <!-- Buttons -->
                <div style="display: flex; gap: 1rem;">
                    <button class="btn btn-secondary" onclick="goToCart()" style="flex: 1;">Retour au panier</button>
                    <button class="btn btn-green" onclick="confirmPayment()" style="flex: 1;">Continuer</button>
                </div>
            </div>
        </div>
    `;
}

function selectPayment(method) {
    const radios = document.querySelectorAll('input[name="payment-method"]');
    radios.forEach(r => r.checked = false);
    const selected = document.querySelector(`input[value="${method}"]`);
    if (selected) selected.checked = true;
    setSafeLocalStorage('selectedPaymentMethod', method);
}

function confirmPayment() {
    const selectedMethod = document.querySelector('input[name="payment-method"]:checked');
    if (!selectedMethod) {
        alert('Veuillez sélectionner un moyen de paiement');
        return;
    }
    
    const method = selectedMethod.value;
    let detailsPageHtml = '';
    
    if (method === 'digicel') {
        detailsPageHtml = renderDigicelDetails();
    } else if (method === 'natcom') {
        detailsPageHtml = renderNatcomDetails();
    } else if (method === 'virement') {
        detailsPageHtml = renderVirementDetails();
    }
    
    currentPage = 'payment-details';
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = detailsPageHtml;
}

function renderDigicelDetails() {
    return `
        <div class="section section-gray" style="min-height: 100vh;">
            <div class="container" style="padding-top: 3rem; padding-bottom: 3rem; max-width: 600px;">
                <h1 style="font-size: 2rem; margin-bottom: 2rem; text-align: center; color: #ff0000ff;">Paiement Digicel (Mon Cash)</h1>
                
                <div class="payment-details" style="background: white; padding: 2rem; border-radius: 0.5rem; border: 2px solid #fa0303ff;">
                    <h3 style="color: var(--gray-900); margin-bottom: 1.5rem;">Instructions de paiement</h3>
                    
                    <div style="background: #FFF5E6; padding: 1.5rem; border-radius: 0.5rem; margin-bottom: 2rem;">
                        <h4 style="margin-top: 0; color: #ff0000ff;">Numéro de paiement Digicel:</h4>
                        <div style="font-size: 1.5rem; font-weight: bold; color: var(--gray-900); text-align: center; padding: 1rem; background: white; border-radius: 0.5rem; font-family: monospace;">
                            +509 44672283
                        </div>
                        <p style="margin: 1rem 0 0 0; color: var(--gray-600); font-size: 0.9rem;">*Contactez le support pour vérifier le numéro exact*</p>
                    </div>
                    
                    <div style="background: var(--gray-50); padding: 1.5rem; border-radius: 0.5rem; margin-bottom: 2rem; border-left: 4px solid #000000ff;">
                        <h4 style="margin-top: 0; color: var(--gray-900);">Montant à envoyer:</h4>
                        <p style="font-size: 1.75rem; font-weight: 700; color: #ff0000ff; margin: 0.5rem 0 0 0;">${getCartTotal()} GDS</p>
                    </div>
                    
                    <div style="background: #E8F5E9; padding: 1.5rem; border-radius: 0.5rem; margin-bottom: 2rem; border-left: 4px solid #000000ff;">
                        <h4 style="margin-top: 0; color: #ff0000ff;">Étapes:</h4>
                        <ol style="color: var(--gray-700); padding-left: 1.5rem;">
                            <li>Ouvrez Mon Cash sur votre téléphone</li>
                            <li>Sélectionnez "Paiement de services"</li>
                            <li>Entrez le numéro Berthe Mart (voir ci-dessus)</li>
                            <li>Confirmez le montant: <strong>${getCartTotal()} GDS</strong></li>
                            <li>Validez la transaction</li>
                            <li>Prenez une capture d'écran de la confirmation</li>
                        </ol>
                    </div>
                    
                    <div style="background: #E3F2FD; padding: 1.5rem; border-radius: 0.5rem; margin-bottom: 2rem; border-left: 4px solid #000000ff;">
                        <h4 style="margin-top: 0; color: #ff0000ff;">Après le paiement:</h4>
                        <p style="color: var(--gray-700); margin: 0;">Veuillez nous envoyer la capture d'écran via WhatsApp pour confirmer votre paiement et finaliser votre commande.</p>
                    </div>
                    
                    <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                        <button class="btn btn-secondary" onclick="goToPayment()" style="flex: 1;">Retour</button>
                        <button class="btn btn-green" onclick="completeOrder('digicel')" style="flex: 1;">Paiement effectué</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderNatcomDetails() {
    return `
        <div class="section section-gray" style="min-height: 100vh;">
            <div class="container" style="padding-top: 3rem; padding-bottom: 3rem; max-width: 600px;">
                <h1 style="font-size: 2rem; margin-bottom: 2rem; text-align: center; color: rgba(255, 132, 0, 1);">Paiement Natcom (Natcash)</h1>
                
                <div class="payment-details" style="background: white; padding: 2rem; border-radius: 0.5rem; border: 2px solid rgba(255, 132, 0, 1);">
                    <h3 style="color: var(--gray-900); margin-bottom: 1.5rem;">Instructions de paiement</h3>
                    
                    <div style="background: #E0F7FF; padding: 1.5rem; border-radius: 0.5rem; margin-bottom: 2rem;">
                        <h4 style="margin-top: 0; color: rgba(255, 132, 0, 1);">Numéro de paiement Natcom:</h4>
                        <div style="font-size: 1.5rem; font-weight: bold; color: var(--gray-900); text-align: center; padding: 1rem; background: white; border-radius: 0.5rem; font-family: monospace;">
                            +509 42936443
                        </div>
                        <p style="margin: 1rem 0 0 0; color: var(--gray-600); font-size: 0.9rem;">*Contactez le support pour vérifier le numéro exact*</p>
                    </div>
                    
                    <div style="background: var(--gray-50); padding: 1.5rem; border-radius: 0.5rem; margin-bottom: 2rem; border-left: 4px solid rgba(255, 132, 0, 1);">
                        <h4 style="margin-top: 0; color: var(--gray-900);">Montant à envoyer:</h4>
                        <p style="font-size: 1.75rem; font-weight: 700; color: rgba(255, 132, 0, 1); margin: 0.5rem 0 0 0;">${getCartTotal()} GDS</p>
                    </div>
                    
                    <div style="background: #E8F5E9; padding: 1.5rem; border-radius: 0.5rem; margin-bottom: 2rem; border-left: 4px solid rgba(255, 132, 0, 1);">
                        <h4 style="margin-top: 0; color: rgba(255, 132, 0, 1);">Étapes:</h4>
                        <ol style="color: var(--gray-700); padding-left: 1.5rem;">
                            <li>Ouvrez Natcash sur votre téléphone</li>
                            <li>Sélectionnez "Transfert d'argent"</li>
                            <li>Entrez le numéro Berthe Mart (voir ci-dessus)</li>
                            <li>Confirmez le montant: <strong>${getCartTotal()} GDS</strong></li>
                            <li>Validez la transaction</li>
                            <li>Prenez une capture d'écran de la confirmation</li>
                        </ol>
                    </div>
                    
                    <div style="background: #E3F2FD; padding: 1.5rem; border-radius: 0.5rem; margin-bottom: 2rem; border-left: 4px solid rgba(255, 132, 0, 1);">
                        <h4 style="margin-top: 0; color: rgba(255, 132, 0, 1);">Après le paiement:</h4>
                        <p style="color: var(--gray-700); margin: 0;">Veuillez nous envoyer la capture d'écran via WhatsApp pour confirmer votre paiement et finaliser votre commande.</p>
                    </div>
                    
                    <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                        <button class="btn btn-secondary" onclick="goToPayment()" style="flex: 1;">Retour</button>
                        <button class="btn btn-green" onclick="completeOrder('natcom')" style="flex: 1;">Paiement effectué</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderVirementDetails() {
    return `
        <div class="section section-gray" style="min-height: 100vh;">
            <div class="container" style="padding-top: 3rem; padding-bottom: 3rem; max-width: 600px;">
                <h1 style="font-size: 2rem; margin-bottom: 2rem; text-align: center; color: #228B22;">Virement Bancaire</h1>
                
                <div class="payment-details" style="background: white; padding: 2rem; border-radius: 0.5rem; border: 2px solid #228B22;">
                    <h3 style="color: var(--gray-900); margin-bottom: 1.5rem;">Informations bancaires</h3>
                    
                    <div style="background: #F1F8E9; padding: 1.5rem; border-radius: 0.5rem; margin-bottom: 2rem;">
                        <h4 style="margin-top: 0; color: #228B22;">Détails du compte:</h4>
                        <div style="font-family: monospace; color: var(--gray-900); line-height: 1.8;">
                            <p style="margin: 0.5rem 0;"><strong>Banque:</strong> XXXXXXXXXX </p>
                            <p style="margin: 0.5rem 0;"><strong>Titulaire:</strong> XXXXXXXXX</p>
                            <p style="margin: 0.5rem 0;"><strong>Numéro de compte:</strong> XXXXXXXXXXXX</p>
                            <p style="margin: 0.5rem 0;"><strong>Code Swift/IBAN:</strong> XXXXXXXX</p>
                        </div>
                        <p style="margin: 1rem 0 0 0; color: var(--gray-600); font-size: 0.9rem;">*Veuillez nous contacter pour les informations complètes*</p>
                    </div>
                    
                    <div style="background: var(--gray-50); padding: 1.5rem; border-radius: 0.5rem; margin-bottom: 2rem; border-left: 4px solid #228B22;">
                        <h4 style="margin-top: 0; color: var(--gray-900);">Montant à virer:</h4>
                        <p style="font-size: 1.75rem; font-weight: 700; color: #228B22; margin: 0.5rem 0 0 0;">${getCartTotal()} GDS</p>
                    </div>
                    
                    <div style="background: #FFF3E0; padding: 1.5rem; border-radius: 0.5rem; margin-bottom: 2rem; border-left: 4px solid #FF9800;">
                        <h4 style="margin-top: 0; color: #E65100;">Important:</h4>
                        <ul style="color: var(--gray-700); margin: 0.5rem 0 0 0; padding-left: 1.5rem;">
                            <li>Utilisez comme référence votre numéro de commande</li>
                            <li>Vérifiez les frais bancaires (généralement à votre charge)</li>
                            <li>Conservez la preuve du virement</li>
                            <li>Contactez-nous pour confirmer la réception</li>
                        </ul>
                    </div>
                    
                    <div style="background: #E3F2FD; padding: 1.5rem; border-radius: 0.5rem; margin-bottom: 2rem; border-left: 4px solid #2196F3;">
                        <h4 style="margin-top: 0; color: #1565C0;">Après le virement:</h4>
                        <p style="color: var(--gray-700); margin: 0;">Envoyez-nous une capture d'écran de la confirmation du virement via WhatsApp avec votre numéro de commande.</p>
                    </div>
                    
                    <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                        <button class="btn btn-secondary" onclick="goToPayment()" style="flex: 1;">Retour</button>
                        <button class="btn btn-green" onclick="completeOrder('virement')" style="flex: 1;">Virement effectué</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function completeOrder(paymentMethod) {
    if (cart.length === 0) return;
    
    const methodLabel = paymentMethod === 'digicel' ? 'Digicel (Mon Cash)' : 
                       paymentMethod === 'natcom' ? 'Natcom (Natcash)' : 'Virement Bancaire';
    
    let message = '🛒 *Nouvelle Commande Market*\n\n';
    message += `*Moyen de paiement:* ${methodLabel}\n\n`;
    message += '*Produits commandés:*\n';
    
    cart.forEach((item, index) => {
        message += `\n${index + 1}. ${item.name}\n`;
        message += `   • Quantité: ${item.quantity}\n`;
        message += `   • Prix unitaire: ${item.price} GDS\n`;
        message += `   • Sous-total: ${item.price * item.quantity} GDS\n`;
    });
    
    message += `\n━━━━━━━━━━━━━━━━━━\n`;
    message += `*TOTAL: ${getCartTotal()} GDS*\n`;
    message += `━━━━━━━━━━━━━━━━━━\n\n`;
    message += `*Veuillez envoyer la preuve de paiement pour confirmer votre commande*\n`;
    message += `Veuillez, s'il vous plaît, nous transmettre votre localisation afin d'organiser la livraison.`;
    message += `Merci! 🙏`;
    
    window.open(`https://wa.me/50942936443?text=${encodeURIComponent(message)}`, '_blank');
    
    // Clear cart after order
    setTimeout(() => {
        cart = [];
        setSafeLocalStorage('marketCart', cart);
        currentPage = 'home';
        loadPage();
    }, 500);
}

function goToCart() {
    currentPage = 'cart';
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = renderCartPage();
    attachCartListeners();
}

function attachPaymentListeners() {
    // Listeners are attached inline via onclick
}

// ========== SECTION ADMIN - DÉBUT ==========
// Cette section contient tout le système d'administration pour gérer les produits

// Variables globales pour le système admin
let adminUser = null;
let editingProductId = null;

// FONCTION: Afficher la page de connexion admin
function renderAdminLoginPage() {
    return `
        <div class="section section-gray" style="min-height: 100vh; display: flex; align-items: center; justify-content: center;">
            <div class="container" style="max-width: 500px;">
                <div style="background: white; padding: 2rem; border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <h1 style="text-align: center; margin-bottom: 2rem; color: #dc2626;">🔐 Accès Admin</h1>
                    <p style="text-align: center; margin-bottom: 2rem; color: #666;">Connectez-vous pour accéder à l'espace administrateur.</p>
                    
                    <form id="adminLoginForm">
                        <div style="margin-bottom: 1.5rem;">
                            <label for="adminEmail" style="display: block; margin-bottom: 0.5rem; color: #333; font-weight: 500;">Email</label>
                            <input 
                                type="email" 
                                id="adminEmail" 
                                placeholder="admin@example.com"
                                required
                                style="width: 100%; padding: 0.75rem; border: 2px solid #ddd; border-radius: 0.25rem; font-size: 1rem; box-sizing: border-box;"
                            >
                        </div>
                        <div style="margin-bottom: 1.5rem;">
                            <label for="adminPassword" style="display: block; margin-bottom: 0.5rem; color: #333; font-weight: 500;">Mot de passe</label>
                            <input 
                                type="password" 
                                id="adminPassword" 
                                placeholder="Entrez votre mot de passe"
                                required
                                style="width: 100%; padding: 0.75rem; border: 2px solid #ddd; border-radius: 0.25rem; font-size: 1rem; box-sizing: border-box;"
                            >
                        </div>
                        <div id="adminLoginError" style="color: #dc2626; margin-top: 0.5rem; font-size: 0.875rem; display: none; margin-bottom: 1rem; text-align: center;"></div>
                        
                        <button 
                            type="submit"
                            class="btn btn-primary" 
                            style="width: 100%; padding: 0.75rem; margin-bottom: 1rem; background-color: #dc2626; color: white; border: none; border-radius: 0.25rem; cursor: pointer; font-size: 1rem; font-weight: 500;"
                        >
                            Se connecter
                        </button>
                        
                        <button 
                            type="button"
                            class="btn btn-secondary" 
                            onclick="navigateTo('home')"
                            style="width: 100%; padding: 0.75rem; background-color: #ccc; color: #333; border: none; border-radius: 0.25rem; cursor: pointer; font-size: 1rem;"
                        >
                            Retour à l'accueil
                        </button>
                    </form>
                </div>
            </div>
        </div>
    `;
}

// FONCTION: Vérifier l'email/mot de passe et connecter l'admin avec Supabase
async function loginAdmin(event) {
    event.preventDefault();
    const email = document.getElementById('adminEmail').value;
    const password = document.getElementById('adminPassword').value;
    const errorDiv = document.getElementById('adminLoginError');
    
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        errorDiv.textContent = `❌ Erreur: ${error.message}`;
        errorDiv.style.display = 'block';
    } else {
        adminUser = data.user;
        navigateTo('admin');
    }
}

// FONCTION: Afficher le tableau de bord admin avec les onglets
function renderAdminDashboard() {
    if (!adminUser) {
        return renderAdminLoginPage();
    }
    
    return `
        <div class="section section-gray" style="min-height: 100vh; padding-top: 2rem; padding-bottom: 2rem;">
            <div class="container" style="max-width: 1200px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                    <h1 style="color: #dc2626; margin: 0;">🛠️ Espace Administrateur</h1>
                    <button
                        class="btn" 
                        onclick="logoutAdmin()"
                        style="background-color: #666; color: white; padding: 0.5rem 1rem; border: none; border-radius: 0.25rem; cursor: pointer; font-weight: 500;"
                    >
                        Se déconnecter
                    </button>
                </div>

                <!-- Onglets de navigation admin -->
                <div style="display: flex; gap: 1rem; margin-bottom: 2rem; border-bottom: 2px solid #ddd;">
                    <button
                        class="admin-tab-btn active"
                        onclick="switchAdminTab('add')"
                        style="padding: 1rem; background: none; border: none; font-size: 1rem; cursor: pointer; font-weight: 500; border-bottom: 3px solid transparent; color: #666;"
                    >
                        Ajouter un produit
                    </button>
                    <button
                        class="admin-tab-btn"
                        onclick="switchAdminTab('list')"
                        style="padding: 1rem; background: none; border: none; font-size: 1rem; cursor: pointer; font-weight: 500; border-bottom: 3px solid transparent; color: #666;"
                    >
                        Gérer les produits
                    </button>
                    <button
                        class="admin-tab-btn"
                        onclick="switchAdminTab('edit')"
                        style="padding: 1rem; background: none; border: none; font-size: 1rem; cursor: pointer; font-weight: 500; border-bottom: 3px solid transparent; color: #666; display: none;"
                    >
                        Modifier un produit
                    </button>
                </div>

                <!-- Onglet 1: Ajouter un produit via Firebase -->
                <div id="adminTabAdd" style="background: white; padding: 2rem; border-radius: 0.5rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <h2 style="color: #333; margin-top: 0;">Ajouter un nouveau produit</h2>
                    <p style="color: #666; margin-bottom: 2rem;">⭐ Les produits sont stockés sur Firebase et visibles partout!</p>
                    
                    <form id="adminProductForm">
                        <!-- Barre de progression -->
                        <div id="uploadProgressContainer" style="margin-bottom: 1rem; display: none;">
                            <label>Progression de l'upload :</label>
                            <div style="background-color: #e9ecef; border-radius: 0.25rem; overflow: hidden;">
                                <div id="uploadProgressBar" style="width: 0%; height: 20px; background-color: #28a745; text-align: center; color: white; line-height: 20px; transition: width 0.3s ease;">
                                    0%
                                </div>
                            </div>
                        </div>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                            <div>
                                <label style="display: block; margin-bottom: 0.5rem; color: #333; font-weight: 500;">Nom du produit *</label>
                                <input 
                                    type="text" 
                                    id="productName"
                                    placeholder="Ex: Jus Orange"
                                    required
                                    style="width: 100%; padding: 0.75rem; border: 2px solid #ddd; border-radius: 0.25rem; box-sizing: border-box;"
                                >
                            </div>
                            
                            <div>
                                <label style="display: block; margin-bottom: 0.5rem; color: #333; font-weight: 500;">Prix (GDS) *</label>
                                <input 
                                    type="number" 
                                    id="productPrice"
                                    placeholder="Ex: 150"
                                    required
                                    min="0"
                                    step="0.01"
                                    style="width: 100%; padding: 0.75rem; border: 2px solid #ddd; border-radius: 0.25rem; box-sizing: border-box;"
                                >
                            </div>
                        </div>

                        <div style="margin-bottom: 1rem;">
                            <label style="display: block; margin-bottom: 0.5rem; color: #333; font-weight: 500;">Catégorie *</label>
                            <select 
                                id="productCategory"
                                required
                                style="width: 100%; padding: 0.75rem; border: 2px solid #ddd; border-radius: 0.25rem; box-sizing: border-box;"
                            >
                                <option value="">Sélectionner une catégorie</option>
                                <option value="alimentaires">Produits alimentaires</option>
                                <option value="glaces">Produits glacés</option>
                                <option value="menagers">Produits ménagers</option>
                                <option value="cosmetiques">Cosmétiques</option>
                                <option value="parfums">Parfums</option>
                                <option value="bijoux">Bijoux</option>
                                <option value="cartes">Cartes de vœux</option>
                                <option value="hygiene">Hygiène</option>
                                <option value="maji">Maji</option>
                                <option value="alcools">Alcools</option>
                                <option value="paniers">Paniers cadeaux</option>
                                <option value="tabac">Cigares / Cigarettes / Chicha</option>
                                <option value="insecticides">Insecticides</option>
                            </select>
                        </div>

                        <div style="margin-bottom: 1rem;">
                            <label style="display: block; margin-bottom: 0.5rem; color: #333; font-weight: 500;">Description (optionnel)</label>
                            <textarea 
                                id="productDesc"
                                placeholder="Description brève du produit..."
                                style="width: 100%; padding: 0.75rem; border: 2px solid #ddd; border-radius: 0.25rem; box-sizing: border-box; min-height: 100px; font-family: inherit;"
                            ></textarea>
                        </div>

                        <div style="margin-bottom: 2rem;">
                            <label style="display: block; margin-bottom: 0.5rem; color: #333; font-weight: 500;">Image du produit *</label>
                            <input 
                                type="file" 
                                id="productImage"
                                accept="image/*"
                                required
                                style="width: 100%; padding: 0.75rem; border: 2px solid #ddd; border-radius: 0.25rem; box-sizing: border-box;"
                            >
                            <small style="color: #666; display: block; margin-top: 0.5rem;">✅ L'image sera automatiquement uploadée sur Firebase Storage</small>
                        </div>

                        <button 
                            type="submit"
                            class="btn btn-primary" 
                            style="width: 100%; padding: 0.75rem; margin-bottom: 1rem; background-color: #dc2626; color: white; border: none; border-radius: 0.25rem; cursor: pointer; font-weight: 500; font-size: 1rem;"
                        >
                            Ajouter le produit
                        </button>
                    </form>

                    <div id="addProductMessage" style="padding: 0.75rem; border-radius: 0.25rem; display: none; font-weight: 500;"></div>
                </div>

                <!-- Onglet 2: Gestion des produits existants -->
                <div id="adminTabList" style="background: white; padding: 2rem; border-radius: 0.5rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1); display: none;">
                    <h2 style="color: #333; margin-top: 0;">Gestion des produits (${products.length} produits au total)</h2>
                    <div id="productsListContainer" style="max-height: 700px; overflow-y: auto;">
                        <!-- La liste des produits sera injectée ici par JavaScript -->
                    </div>
                </div>

                <!-- Onglet 3: Modifier un produit existant -->
                <div id="adminTabEdit" style="background: white; padding: 2rem; border-radius: 0.5rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1); display: none;">
                    <h2 style="color: #333; margin-top: 0;">Modifier un produit</h2>
                    <p style="color: #666; margin-bottom: 2rem;">Modifiez les informations du produit ci-dessous.</p>
                    
                    <form id="editProductForm">
                        <input type="hidden" id="editProductId">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                            <div>
                                <label for="editProductName" style="display: block; margin-bottom: 0.5rem; color: #333; font-weight: 500;">Nom du produit</label>
                                <input type="text" id="editProductName" required style="width: 100%; padding: 0.75rem; border: 2px solid #ddd; border-radius: 0.25rem; box-sizing: border-box;">
                            </div>
                            <div>
                                <label for="editProductPrice" style="display: block; margin-bottom: 0.5rem; color: #333; font-weight: 500;">Prix (GDS)</label>
                                <input type="number" id="editProductPrice" required min="0" step="0.01" style="width: 100%; padding: 0.75rem; border: 2px solid #ddd; border-radius: 0.25rem; box-sizing: border-box;">
                            </div>
                        </div>

                        <div style="margin-bottom: 1rem;">
                            <label for="editProductCategory" style="display: block; margin-bottom: 0.5rem; color: #333; font-weight: 500;">Catégorie</label>
                            <select id="editProductCategory" required style="width: 100%; padding: 0.75rem; border: 2px solid #ddd; border-radius: 0.25rem; box-sizing: border-box;">
                                <option value="">Sélectionner une catégorie</option>
                                <option value="alimentaires">Produits alimentaires</option>
                                <option value="glaces">Produits glacés</option>
                                <option value="menagers">Produits ménagers</option>
                                <option value="cosmetiques">Cosmétiques</option>
                                <option value="parfums">Parfums</option>
                                <option value="bijoux">Bijoux</option>
                                <option value="cartes">Cartes de vœux</option>
                                <option value="hygiene">Hygiène</option>
                                <option value="maji">Maji</option>
                                <option value="alcools">Alcools</option>
                                <option value="paniers">Paniers cadeaux</option>
                                <option value="tabac">Cigares / Cigarettes / Chicha</option>
                                <option value="insecticides">Insecticides</option>
                            </select>
                        </div>

                        <div style="margin-bottom: 1rem;">
                            <label for="editProductDesc" style="display: block; margin-bottom: 0.5rem; color: #333; font-weight: 500;">Description</label>
                            <textarea id="editProductDesc" style="width: 100%; padding: 0.75rem; border: 2px solid #ddd; border-radius: 0.25rem; box-sizing: border-box; min-height: 100px;"></textarea>
                        </div>

                        <div style="margin-bottom: 1rem;">
                            <label for="editProductImageFile" style="display: block; margin-bottom: 0.5rem; color: #333; font-weight: 500;">Changer l'image (optionnel)</label>
                            <input type="file" id="editProductImageFile" accept="image/*" style="width: 100%; padding: 0.75rem; border: 2px solid #ddd; border-radius: 0.25rem; box-sizing: border-box;">
                            <div id="editImagePreview" style="margin-top: 1rem;">
                                <p style="margin: 0 0 0.5rem 0; font-weight: 500;">Image actuelle :</p>
                                <img id="currentProductImage" src="" alt="Image actuelle" style="max-width: 150px; border-radius: 0.25rem;">
                            </div>
                        </div>

                        <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                            <button 
                                type="submit"
                                class="btn btn-primary" 
                                style="padding: 0.75rem 1.5rem; background-color: #22c55e; color: white; border: none; border-radius: 0.25rem; cursor: pointer; font-weight: 500;"
                            >
                                Enregistrer
                            </button>
                            <button 
                                type="button"
                                class="btn" 
                                onclick="switchAdminTab('list')"
                                style="padding: 0.75rem 1.5rem; background-color: #9ca3af; color: white; border: none; border-radius: 0.25rem; cursor: pointer; font-weight: 500;"
                            >
                                Annuler
                            </button>
                        </div>
                    </form>
                    <div id="editProductMessage" style="padding: 0.75rem; border-radius: 0.25rem; display: none; font-weight: 500; margin-top: 1rem;"></div>
                </div>
            </div>
        </div>
    `;
}

// FONCTION: Afficher la liste des produits pour la gestion
function renderProductsList(allProducts) {
    return `
        <div style="display: grid; gap: 1rem;">
            ${allProducts.map((product, index) => {
                let imgSrc = product.image || 'https://via.placeholder.com/100';
                // Si image base64 trop longue, utiliser placeholder
                if (imgSrc.startsWith('data:') && imgSrc.length > 800000) {
                    imgSrc = 'https://via.placeholder.com/100';
                }
                return `
                <div style="border: 1px solid #ddd; padding: 1rem; border-radius: 0.25rem; display: grid; grid-template-columns: 100px 1fr auto; gap: 1rem; align-items: start;">
                    <img src="${imgSrc}" alt="${product.name}" style="width: 100%; border-radius: 0.25rem; object-fit: cover; height: 100px;">
                    
                    <div>
                        <h4 style="margin: 0 0 0.5rem 0; color: #333;">${product.name}</h4>
                        <p style="margin: 0.25rem 0; color: #666;">Prix: <strong>${product.price} GDS</strong></p>
                        <p style="margin: 0.25rem 0; color: #666;">Catégorie: <strong>${product.category}</strong></p>
                        <p style="margin: 0.25rem 0; color: #666;">ID: <strong>${product.id}</strong></p>
                    </div>
                    
                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <button 
                            class="btn" 
                            onclick="editProduct('${product.id}'); switchAdminTab('edit');"
                            style="padding: 0.5rem 1rem; background-color: #3b82f6; color: white; border: none; border-radius: 0.25rem; cursor: pointer; font-size: 0.875rem;"
                        >
                            Modifier
                        </button>
                        <button 
                            class="btn" 
                            onclick="deleteProduct('${product.id}')"
                            style="padding: 0.5rem 1rem; background-color: #ef4444; color: white; border: none; border-radius: 0.25rem; cursor: pointer; font-size: 0.875rem;"
                        >
                            Supprimer
                        </button>
                    </div>
                </div>
                `;
            }).join('')}
        </div>
    `;
}

// FONCTION: Basculer entre les onglets admin
function switchAdminTab(tab) {
    // Masquer tous les onglets
    document.querySelectorAll('[id^="adminTab"]').forEach(el => el.style.display = 'none');

    // Enlever la classe active de tous les boutons
    document.querySelectorAll('.admin-tab-btn').forEach(btn => {
        btn.style.borderBottomColor = 'transparent';
        btn.style.color = '#666';
    });

    // Marquer le bouton comme actif
    const clickedButton = document.querySelector(`.admin-tab-btn[onclick*="'${tab}'"]`);
    if (clickedButton) {
        clickedButton.style.borderBottomColor = '#dc2626';
        clickedButton.style.color = '#dc2626';
    }

    // Afficher l'onglet sélectionné
    const tabContent = document.getElementById(`adminTab${tab.charAt(0).toUpperCase() + tab.slice(1)}`);
    if (tabContent) {
        // Si on va sur l'onglet liste, on la rafraîchit
        if (tab === 'list') {
            const listContainer = document.getElementById('productsListContainer');
            if (listContainer) listContainer.innerHTML = renderProductsList(products);
        }
        tabContent.style.display = 'block';
    }
}

// ÉVÉNEMENT: Gérer l'upload d'image depuis le fichier

async function handleAddProductSubmit(event) {
    event.preventDefault();

    const nameInput = document.getElementById('productName');
    const priceInput = document.getElementById('productPrice');
    const categoryInput = document.getElementById('productCategory');
    const imageFileInput = document.getElementById('productImage');
    const progressContainer = document.getElementById('uploadProgressContainer');
    const messageDiv = document.getElementById('addProductMessage');

    if (!nameInput || !priceInput || !categoryInput || !imageFileInput || !messageDiv) {
        return;
    }

    const name = nameInput.value.trim();
    const price = parseFloat(priceInput.value);
    const category = categoryInput.value;
    const file = imageFileInput.files[0];

    // Validation des champs obligatoires
    if (!name || !price || !category || !file) {
        messageDiv.textContent = '❌ Veuillez remplir tous les champs obligatoires et sélectionner une image.';
        messageDiv.style.backgroundColor = '#fee2e2';
        messageDiv.style.color = '#991b1b';
        messageDiv.style.display = 'block';
        return;
    }

    // Validation du prix
    if (isNaN(price) || price < 0) {
        messageDiv.textContent = '❌ Le prix doit être un nombre valide.';
        messageDiv.style.backgroundColor = '#fee2e2';
        messageDiv.style.color = '#991b1b';
        messageDiv.style.display = 'block';
        return;
    }

    // Vérifier si Firebase est disponible AVANT de commencer
    if (!isSupabaseAvailable()) {
        messageDiv.textContent = '❌ Erreur critique: Supabase n\'est pas chargé. Assurez-vous d\'utiliser un serveur local (ex: "Live Server" sur VS Code) et que votre connexion internet fonctionne.';
        messageDiv.style.backgroundColor = '#fee2e2';
        messageDiv.style.color = '#991b1b';
        messageDiv.style.display = 'block';
        console.error("Tentative d'ajout de produit sans Supabase. L'application est-elle bien servie par un serveur web ?");
        return;
    }

    // Afficher un message de chargement
    messageDiv.textContent = '⏳ Upload de l\'image et sauvegarde du produit...';
    messageDiv.style.backgroundColor = '#dbeafe';
    messageDiv.style.color = '#1e40af';
    messageDiv.style.display = 'block';

    try {
        // Générer un ID unique pour le produit
        const newId = 'prod_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

        // Upload sur Supabase Storage
        const fileExtension = file.name.split('.').pop();
        const storagePath = `products/${newId}.${fileExtension}`;
        
        progressContainer.style.display = 'block';
        const progressBar = document.getElementById('uploadProgressBar');
        progressBar.style.width = '50%';
        progressBar.textContent = '50%';

        const { data: uploadData, error: uploadError } = await supabase.storage.from('products').upload(storagePath, file);
        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage.from('products').getPublicUrl(storagePath);
        const imageUrl = urlData.publicUrl;

        // Créer l'objet produit
        // Note: Supabase gère `created_at` automatiquement.
        // On ne spécifie pas l'ID, Supabase le génère.
        const newProduct = {
            name: name,
            price: price,
            category: category,
            image: imageUrl,
            description: document.getElementById('productDesc').value.trim() || ''
        };

        progressBar.style.width = '100%';
        progressBar.textContent = '100%';

        // Sauvegarder sur Supabase
        const savedProduct = await saveProductToSupabase(newProduct);

        // Ajouter à la liste locale pour affichage immédiat
        // On utilise le produit retourné par Supabase qui contient l'ID et created_at
        products.push(savedProduct);

        // Message de succès
        messageDiv.textContent = '✅ Produit ajouté avec succès !';
        messageDiv.style.backgroundColor = '#dcfce7';
        messageDiv.style.color = '#166534';

        // Vider le formulaire
        event.target.reset();
        
        // Cacher la barre de progression
        setTimeout(() => {
            progressContainer.style.display = 'none';
        }, 2000);

    } catch (error) {
        console.error("Erreur lors de l'ajout du produit:", error);
        messageDiv.textContent = `❌ Erreur lors de l'ajout: ${error.message}`;
        messageDiv.style.backgroundColor = '#fee2e2';
        messageDiv.style.color = '#991b1b';
    }
}

// FONCTION: Remplir le formulaire d'édition
function populateEditForm(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Afficher l'onglet d'édition
    const editTabButton = document.querySelector(`.admin-tab-btn[onclick*="'edit'"]`);
    if (editTabButton) editTabButton.style.display = 'inline-block';
    switchAdminTab('edit');

    // Remplir les champs
    document.getElementById('editProductId').value = product.id;
    document.getElementById('editProductName').value = product.name;
    document.getElementById('editProductPrice').value = product.price;
    document.getElementById('editProductCategory').value = product.category;
    document.getElementById('editProductDesc').value = product.description || '';
    document.getElementById('currentProductImage').src = product.image;

    // Attacher l'écouteur pour la soumission du formulaire d'édition
    const editForm = document.getElementById('editProductForm');
    // On retire l'ancien écouteur pour éviter les duplications
    editForm.removeEventListener('submit', handleEditProductSubmit);
    editForm.addEventListener('submit', handleEditProductSubmit);
}

// FONCTION: Gérer la soumission du formulaire de modification
async function handleEditProductSubmit(event) {
    event.preventDefault();
    const messageDiv = document.getElementById('editProductMessage');
    messageDiv.textContent = '⏳ Mise à jour en cours...';
    messageDiv.style.backgroundColor = '#dbeafe';
    messageDiv.style.color = '#1e40af';
    messageDiv.style.display = 'block';

    const productId = document.getElementById('editProductId').value;
    const imageFile = document.getElementById('editProductImageFile').files[0];

    const updatedData = {
        name: document.getElementById('editProductName').value,
        price: parseFloat(document.getElementById('editProductPrice').value),
        category: document.getElementById('editProductCategory').value,
        description: document.getElementById('editProductDesc').value,
    };

    try {
        // Si une nouvelle image est fournie, l'uploader
        if (imageFile) {
            const fileExtension = imageFile.name.split('.').pop();
            const storagePath = `products/${productId}_${Date.now()}.${fileExtension}`;
            
            const { data: uploadData, error: uploadError } = await supabase.storage.from('products').upload(storagePath, imageFile);
            if (uploadError) throw uploadError;

            const { data: urlData } = supabase.storage.from('products').getPublicUrl(storagePath);
            updatedData.image = urlData.publicUrl;
        }

        // Mettre à jour dans Supabase
        await updateProductInSupabase(productId, updatedData);

        // Mettre à jour dans la liste locale
        const productIndex = products.findIndex(p => p.id === productId);
        if (productIndex > -1) {
            products[productIndex] = { ...products[productIndex], ...updatedData };
        }

        messageDiv.textContent = '✅ Produit mis à jour avec succès !';
        messageDiv.style.backgroundColor = '#dcfce7';
        messageDiv.style.color = '#166534';

        setTimeout(() => {
            switchAdminTab('list');
            const editTabButton = document.querySelector(`.admin-tab-btn[onclick*="'edit'"]`);
            if (editTabButton) editTabButton.style.display = 'none';
        }, 1500);

    } catch (error) {
        console.error("Erreur lors de la mise à jour du produit:", error);
        messageDiv.textContent = `❌ Erreur: ${error.message}`;
        messageDiv.style.backgroundColor = '#fee2e2';
        messageDiv.style.color = '#991b1b';
    }
}

// FONCTION: Supprimer un produit
async function deleteProduct(productId) {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer le produit ID: ${productId} ? Cette action est irréversible.`)) {
        return;
    }

    try {
        // Supprimer de Supabase
        await deleteProductFromSupabase(productId);

        // Supprimer de la liste locale
        const index = products.findIndex(p => p.id === productId);
        if (index > -1) {
            products.splice(index, 1);
        }

        // Rafraîchir la liste affichée
        const listContainer = document.getElementById('productsListContainer');
        if (listContainer) {
            listContainer.innerHTML = renderProductsList(products);
        }

        alert('Produit supprimé avec succès !');

    } catch (error) {
        console.error("Erreur lors de la suppression du produit:", error);
        alert(`❌ Erreur lors de la suppression: ${error.message}`);
    }
}

// FONCTION: Déconnecter l'admin
async function logoutAdmin() {
    await supabase.auth.signOut();
    adminUser = null;
    navigateTo('home');
}

// ========== SECTION AD