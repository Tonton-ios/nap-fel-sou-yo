// State Management
let cart = JSON.parse(localStorage.getItem('marketCart')) || [];
let currentPage = 'home';

// Categories Data
const categories = [
    //{ id: 'poissonnerie', name: 'Poissonnerie', image: 'https://images.unsplash.com/photo-1637679242615-0ddbbb34b7d7?w=400' },
    { id: 'glaces', name: 'Produits glacés', image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400' },
    { id: 'alimentaires', name: 'Produits alimentaires', image: 'https://images.unsplash.com/photo-1714224247661-ee250f55a842?w=400' },
    { id: 'menagers', name: 'Produits ménagers', image: 'https://images.unsplash.com/photo-1758887262204-a49092d85f15?w=400' },
    { id: 'lessive', name: 'Lessive', image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400' },
    { id: 'cosmetiques', name: 'Cosmétiques', image: 'https://images.unsplash.com/photo-1623882213146-e60f8b9e8875?w=400' },
    { id: 'parfums', name: 'Parfums', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400' },
    { id: 'bijoux', name: 'Bijoux', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400' },
    { id: 'cartes', name: 'Cartes de vœux', image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400' },
    { id: 'hygiene', name: 'Hygiène', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400' },
    { id: 'maji', name: 'Maji', image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400' },
    { id: 'alcools', name: 'Alcools', image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400' },
    { id: 'paniers', name: 'Paniers cadeaux', image: 'https://images.unsplash.com/photo-1558486012-817176f84c6d?w=400' },
    { id: 'tabac', name: 'Cigares / Cigarettes / Chicha', image: 'https://images.unsplash.com/photo-1594717527116-4b5b8c9a9146?w=400' },
    //{ id: 'bebe', name: 'Produits bébé', image: 'https://images.unsplash.com/photo-1619045207244-5a4fdecc9616?w=400' },
    { id: 'insecticides', name: 'Insecticides', image: 'https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=400' },
    { id: 'kits', name: 'Kits alimentaires', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400' },
];

// Products Data
const products = [
    
    // Parfums 
    { id: 'f1', name: 'Cool Girl', price: 750.00, category: 'parfums', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400' },
    { id: 'f2', name: 'love', price: 750.00, category: 'parfums', image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400' },
    { id: 'f3', name: 'Shep', price: 750.00, category: 'parfums', image: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=400' },
    { id: 'f4', name: 'Play Red', price: 1000.00, category: 'parfums', image: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=400' },
    { id: 'f5', name: 'Ana Ana', price: 750.00, category: 'parfums', image: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=400' },
    { id: 'f6', name: 'Play Blue ', price: 1000.00, category: 'parfums', image: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=400' },
    { id: 'f7', name: 'Sexy Night', price: 750.00, category: 'parfums', image: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=400' },
    { id: 'f8', name: '777 Men', price: 1000.00, category: 'parfums', image: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=400' },
    { id: 'f9', name: 'Rosa Melody Pink', price: 750.00, category: 'parfums', image: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=400' },
    { id: 'f10', name: '717 VIP Men', price: 1000.00, category: 'parfums', image: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=400' },
    { id: 'f11', name: 'Rose Royale ', price: 750.00, category: 'parfums', image: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=400' },
    { id: 'f12', name: '777 VIP Men You Are Exalted ', price: 1000.00, category: 'parfums', image: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=400' },
    { id: 'f13', name: 'Paris', price: 750.00, category: 'parfums', image: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=400' },
    { id: 'f14', name: 'SPRAY OUD FOR GLORY', price: 1050.00, category: 'parfums', image: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=400' },
    { id: 'f15', name: 'SPRAY AMETHYST LATTAFA', price: 1050.00, category: 'parfums', image: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=400' },
    { id: 'f16', name: 'SPRAY PRIVE ROSE ', price: 1050.00, category: 'parfums', image: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=400' },
    { id: 'f17', name: 'SPRAY YARA LATTAFA', price: 1050.00, category: 'parfums', image: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=400' },
    { id: 'f18', name: 'SPRAY HAYAATI FLORENCE ', price: 1050.00, category: 'parfums', image: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=400' },
    { id: 'f19', name: 'SPRAY PRIDE OF LATTAFA ', price: 1050.00, category: 'parfums', image: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=400' },
    
    // Produits alimentaires
    { id: 'p4', name: 'Caisse Cornflakes', price: 3555, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p5', name: 'Vinaigre Boncoeur 24x16 OZ', price: 45, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p6', name: 'Mr Noodles Assortis', price: 70, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p7', name: 'Sweet Peas 15 OZ', price: 235, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p8', name: 'Cheeco Assortis', price: 25, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p9', name: 'Pate de Tomate Bongu 6x3420G', price: 1515, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p10', name: 'Lays Classicas 16x110G', price: 450, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p11', name: 'Cheetos Crunchy 110G', price: 450, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p12', name: 'Sweet Peas Petit 8.5 OZ', price: 190, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p13', name: 'Mayonnaise Manicera', price: 220, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p14', name: 'Yellow Mustard 12x8 OZ', price: 210, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p15', name: 'Premium Mustard 8 OZ', price: 195, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p16', name: 'Ragu Sauce Gros', price: 635, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p17', name: 'Kernel Corn Gros 15 OZ', price: 255, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p18', name: 'Ragu Sauce 14 OZ', price: 490, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p19', name: 'Corn 8.5 OZ', price: 190, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p20', name: 'Frosted Flakes', price: 110, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p21', name: 'Diri Peyi', price: 450, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p22', name: 'M Mortadel 400G', price: 150, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p23', name: 'Sac Riz Mega Petit', price: 2000, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p24', name: 'Pingless 158G', price: 500, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p25', name: 'Pringles 71G', price: 250, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p26', name: 'Pois Pinto Petit', price: 350, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p27', name: 'Pain', price: 175, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p28', name: 'Louisiana 177ML', price: 225, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p29', name: 'Pain Tranche', price: 200, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p30', name: 'Anillos', price: 25, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p31', name: 'Bonbon Bongu', price: 150, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p32', name: 'Top Ramen', price: 100, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p33', name: 'Cheetos Hot', price: 150, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p34', name: 'Funyuns', price: 150, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p35', name: 'Doritos Cool Ranch', price: 150, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p36', name: 'Lay\'s Sour Cream & Onion', price: 150, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p37', name: 'Doritos Hot', price: 150, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p38', name: 'Lay\'s Barbecue', price: 150, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p39', name: 'Caprice Chocolat', price: 450, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p40', name: 'Céréales Family Assortis', price: 105, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p41', name: 'Elle et Vire Tropical', price: 150, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p42', name: 'Cokobella', price: 450, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p43', name: 'Yo', price: 50, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p44', name: 'Caprice Vanille', price: 450, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p45', name: 'Caprice Fraise Petit', price: 200, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p46', name: 'Elle et Vire Framboise', price: 150, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p47', name: 'Elle et Vire Abricot', price: 150, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p48', name: 'Chocolisto 300G', price: 425, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p49', name: 'Elle et Vire Mangue', price: 150, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p50', name: 'Caprice Rhum Raisin Petit', price: 200, category: 'alimentaires', image: 'https://via.placeholder.com/400' }, 
    { id: 'p51', name: 'Caprice Caramel Petit', price: 200, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p52', name: 'Schoco', price: 40, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p53', name: 'Farine Bongu 25KG', price: 3250, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p54', name: 'Sac Sucre Mayaguez', price: 3650, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p55', name: 'Corn Flakes La Perla', price: 320, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p56', name: 'Pascual Big Day 125G', price: 125, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p57', name: 'Bon Coeur Corn Flakes Gros', price: 200, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p58', name: 'Bon Coeur Corn Flakes Petit', price: 100, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p59', name: 'Bon Coeur Chip', price: 50, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p60', name: 'Fritos Original 42.5G', price: 140, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p61', name: 'Cheetos Crunchy 35.4G', price: 140, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p62', name: 'Crunchitos Fromage Cheddar', price: 25, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p63', name: 'Lay\'s Classic 28.3G', price: 120, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p64', name: 'Crunchitos Cheddar Classic', price: 25, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p65', name: 'Ruffles Original 28.3G', price: 140, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p66', name: 'Cheeco Jumbo Palitos Cheese', price: 25, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p67', name: 'Vierge Super Papita Pomme de Terre', price: 125, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p68', name: 'Vierge Super Papita Banane Douce', price: 125, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p69', name: 'Vierge Super Patate', price: 125, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p70', name: 'Doritos Nacho Cheese', price: 150, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p71', name: 'Chips Chiritos Pop Corn', price: 25, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p72', name: 'Chips Chips Banane Gros', price: 100, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p73', name: 'Chips Chips Banane Petite', price: 60, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p74', name: 'Chips Chips Pomme de Terre Petite', price: 60, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p75', name: 'Chips Potato Chips Sour Cream & Onion', price: 50, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p76', name: 'Chips Potato Chips Cheese', price: 50, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p77', name: 'Chips Potato Chips Original', price: 50, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p78', name: 'Chips Pringless 4G 40G', price: 165, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p79', name: 'Chips Vierge Super Papita Banane', price: 125, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p80', name: 'Chips Chip Chop 90G', price: 200, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p81', name: 'Chips Pringles Original Petit 19G', price: 115, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p82', name: 'Ko-Kett Epis Petit', price: 400, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p83', name: 'Ko-Kett Epis Gros', price: 750, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p84', name: 'Elsa Cheri Doudou', price: 400, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p85', name: 'Caisse Bonbon Chomp', price: 1435, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p86', name: 'Cookies Brit', price: 125, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p87', name: 'Macera Lemon', price: 50, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p88', name: 'Elsa Muffin a la Bon', price: 400, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p89', name: 'Macera Fraise', price: 100, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p90', name: 'Gourmandises Pringless 37G', price: 270, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p91', name: 'Wafers Vanille', price: 120, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p92', name: 'Doublemint', price: 75, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p93', name: 'Winterfresh', price: 75, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p94', name: 'Wafers Fraise', price: 120, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p95', name: 'Toto Cornet Choco', price: 125, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p96', name: 'Donut Cake', price: 50, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p97', name: 'Guarina', price: 150, category: 'alimentaires', image: 'https://via.placeholder.com/400' },
    { id: 'p98', name: 'Caisse Bonbon Casino', price: 1435, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p99', name: 'Elsa Cheri Doudou', price: 450, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p100', name: 'Elsa Chocco Doudou', price: 450, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p101', name: 'Toto Cornet', price: 125, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p102', name: 'Bonbon Muuu..', price: 225, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p103', name: 'Caisse Bonbon Cremas', price: 4080, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p104', name: 'Caisse Bonbon Nice', price: 4080, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p105', name: 'Elsa Muffin Raisins (4)', price: 400, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p106', name: 'Hershey\'s Special Dark', price: 250, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p107', name: 'Boite I Love You', price: 575, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p108', name: 'Gold Truffles Choco', price: 150, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p109', name: 'Freegells', price: 230, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p110', name: 'Pringless Original 19G', price: 120, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p111', name: 'Kokiyol Gout Unique', price: 50, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p112', name: 'Elvarin Princh', price: 135, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p113', name: 'I Love You', price: 20, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p114', name: 'Caisse Bonbon Tio', price: 3555, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p115', name: 'Casino (Choco Chill) 258g', price: 200, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p116', name: 'Cremas (Sabor Vanille Rellena)', price: 200, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p117', name: 'Chomp (Naranja) 228g', price: 250, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p118', name: 'Casino (Vanilla Go) 258g', price: 200, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p119', name: 'Cremas (Sabor Fresa)', price: 200, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p120', name: 'Cremas (Sabor Vanilla)', price: 250, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p121', name: 'Glucose', price: 125, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p122', name: 'Bledor (Club) 100g', price: 125, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p123', name: 'Love Bite (Fleant Candies)', price: 230, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p124', name: 'Topsy 280g', price: 450, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p125', name: 'Nice 33g', price: 180, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p126', name: 'Chomp (Chocolate) 228g', price: 250, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p127', name: 'Crakenas (Club) 192g', price: 125, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p128', name: 'Cream (Sandwich Cookies) 350g', price: 200, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p129', name: 'Bonbon Bum Strawberry', price: 400, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p130', name: 'Bonbon Bongu Cheese', price: 250, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p131', name: 'Casino (Sabor Alfajor) 258g', price: 200, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p132', name: 'Beurre D\'arachide', price: 700, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p133', name: 'Trio', price: 185, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p134', name: 'Trio 4 Crema 336g', price: 185, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p135', name: 'Corn Flakes Bongu 510g', price: 320, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p136', name: 'Casino Bonbon Fraise 258g', price: 200, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p137', name: 'Big Bom (Mango) 18g', price: 205, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p138', name: 'Bongu (Sandwich Fromage) 24g', price: 250, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p139', name: 'Chibola (Hard Candy) 14g', price: 400, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p140', name: 'Siroline (Surettes) 14g', price: 450, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p141', name: 'Pop Boom 408g', price: 400, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p142', name: 'J&J Vinegar 16oz', price: 50, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p143', name: 'Pois Beurre Petit', price: 650, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p144', name: 'Pois Lentilles', price: 650, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p145', name: 'Lasagna Pincesa 400g', price: 450, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p146', name: 'Manba Bon Coeur Gros', price: 1250, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p147', name: 'Pois Beurre Gros', price: 1560, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p148', name: 'Famosa Ketchup Unite', price: 30, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p149', name: 'Avoine Bon Coeur Gros', price: 300, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p150', name: 'Bocal Cafe', price: 1200, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p151', name: 'Famosa Ketchup Boite', price: 400, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p152', name: 'Riz Chelda Jaune', price: 1430, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p153', name: 'Pierre Prod Mais Fin', price: 325, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p154', name: 'Avoine Bon Coeur Petit', price: 100, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p155', name: 'Sac Ble Alberto', price: 4850, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p156', name: 'Maniciera', price: 345, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p157', name: 'Beurre Ricamesa Magarina', price: 250, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p158', name: 'Famosa Catchup', price: 210, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p159', name: 'Brinto Sunflower 1L', price: 600, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p160', name: 'Oil Crisol Gros Gallon 3.78L', price: 1500, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p161', name: 'Riz Chela Jaune', price: 1450, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p162', name: 'Petit Mil Petit', price: 350, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p163', name: 'Pois Pinto Petit', price: 500, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p164', name: 'Pois Rouge Gros', price: 1500, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p165', name: 'Pois Rouge Petit', price: 700, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p166', name: 'Pois Pinto Gros', price: 1100, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p167', name: 'Ois Noir Petit', price: 520, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p168', name: 'Riz la crete blanc', price: 1250, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p169', name: 'RIZ TCS', price: 1300, category: 'alimentaires', image: '' },
    { id: 'p170', name: 'POIS NOIR PGROS', price: 1560, category: 'alimentaires', image: '' },
    { id: 'p171', name: 'PETIT MIL GROS', price: 1040, category: 'alimentaires', image: '' },
    { id: 'p172', name: 'POIS BLAN GROS', price: 1560, category: 'alimentaires', image: '' },
    { id: 'p173', name: 'POIS BLAN PETIT', price: 650, category: 'alimentaires', image: '' },
    { id: 'p174', name: 'CAISSE WINGS DINDE', price: 6500, category: 'alimentaires', image: '' },
    { id: 'p175', name: 'CAISSE CUISSE DE DINDES', price: 6250, category: 'alimentaires', image: '' },
    { id: 'p176', name: 'SACHET WINGS DINDE', price: 350, category: 'alimentaires', image: '' },
    { id: 'p177', name: 'SACHET WINGS PETIT', price: 400, category: 'alimentaires', image: '' },
    { id: 'p178', name: 'CAISSE BLAYI', price: 5000, category: 'alimentaires', image: '' },
    { id: 'p179', name: 'SACHET WINGS', price: 2075, category: 'alimentaires', image: '' },
    { id: 'p180', name: 'FROMAGE TETE DE MORT', price: 400, category: 'alimentaires', image: '' },
    { id: 'p181', name: 'CAISSE WINGS', price: 4150, category: 'alimentaires', image: '' },
    { id: 'p182', name: 'CAISSE GESIER', price: 7900, category: 'alimentaires', image: '' },
    { id: 'p183', name: 'CAISSE CUISSE DE POULET', price: 5000, category: 'alimentaires', image: '' },
    { id: 'p184', name: 'SACHET WINGS DINDE', price: 750, category: 'alimentaires', image: '' },
    { id: 'p185', name: 'ELLE & VIRE ABRICOT 500 g', price: 150, category: 'alimentaires', image: '' },
    { id: 'p186', name: 'SPAGHETTI GEANT (CAISSE)', price: 1750, category: 'alimentaires', image: '' },
    { id: 'p187', name: 'SPAGHETTI PASTA (CAISSE)', price: 1750, category: 'alimentaires', image: '' },
    { id: 'p188', name: 'STRAWBERRY 500g', price: 120, category: 'alimentaires', image: '' },
    { id: 'p189', name: 'SACHET BLAYI', price: 500, category: 'alimentaires', image: '' },
    { id: 'p190', name: 'SACHET CUISSE DINDE', price: 700, category: 'alimentaires', image: '' },
    { id: 'p191', name: 'ELLE & VIRE BANANE 500g', price: 120, category: 'alimentaires', image: '' },
    { id: 'p192', name: 'ELLE & VIRE FRAMBOISE 500g', price: 150, category: 'alimentaires', image: '' },
    { id: 'p193', name: 'RIZ BONGU PETIT', price: 2000, category: 'alimentaires', image: '' },
    { id: 'p194', name: 'FROMAGE TETE DE MORT', price: 325, category: 'alimentaires', image: '' },
    { id: 'p195', name: 'HOT DOG CONFIDENCE', price: 225, category: 'alimentaires', image: '' },
    { id: 'p196', name: 'HOT DOG ROCKINGHAM', price: 200, category: 'alimentaires', image: '' },
    { id: 'p197', name: 'QUALIKO CUISSES DE POULET', price: 1000, category: 'alimentaires', image: '' },
    { id: 'p198', name: 'MORUE GROS', price: 900, category: 'alimentaires', image: '' },
    { id: 'p199', name: 'SAUCISSES BOUCANIER', price: 1225, category: 'alimentaires', image: '' },
    { id: 'p200', name: 'MORUE MOYEN', price: 700, category: 'alimentaires', image: '' },
    { id: 'p201', name: 'FROMAGE TETE DE MORT', price: 225, category: 'alimentaires', image: '' },
    { id: 'p202', name: 'MORUE PETIT', price: 225, category: 'alimentaires', image: '' },
    { id: 'p203', name: 'HARENG SAUR', price: 350, category: 'alimentaires', image: '' },
    { id: 'p204', name: 'HARENG SAUR', price: 525, category: 'alimentaires', image: '' },
    { id: 'p205', name: 'PRINGLESS', price: 165, category: 'alimentaires', image: '' },
    { id: 'p206', name: 'FROMAGE TETE DE MORT', price: 300, category: 'alimentaires', image: '' },
    { id: 'p207', name: 'FROMAGE TETE DE MORT', price: 250, category: 'alimentaires', image: '' },
    { id: 'p208', name: 'RANCHERO', price: 200, category: 'alimentaires', image: '' },
    { id: 'p209', name: 'TOP SALAMI', price: 110, category: 'alimentaires', image: '' },
    { id: 'p210', name: 'CAISSE HUILE BRINTO', price: 4230, category: 'alimentaires', image: '' },
    { id: 'p211', name: 'SAC POIS PINTO', price: 7030, category: 'alimentaires', image: '' },
    { id: 'p212', name: 'CAISSE SPAHETTI GEANT', price: 1750, category: 'alimentaires', image: '' },
    { id: 'p213', name: 'CAISSE SAUMON BONGU', price: 2870, category: 'alimentaires', image: '' },
    { id: 'p214', name: 'CAISSE SPAGHETTI CLASSICO', price: 1725, category: 'alimentaires', image: '' },
    { id: 'p215', name: 'SPAGHETTI GEANT', price: 90, category: 'alimentaires', image: '' },
    { id: 'p216', name: 'BLE BON COEUR', price: 500, category: 'alimentaires', image: '' },
    { id: 'p217', name: 'POIS CONGO GROS', price: 1365, category: 'alimentaires', image: '' },
    { id: 'p218', name: 'POIS FRANCE PETIT', price: 520, category: 'alimentaires', image: '' },
    { id: 'p219', name: 'POIS LENTILLES GROS', price: 1430, category: 'alimentaires', image: '' },
    { id: 'p220', name: 'POIS FRANCE GROS', price: 1105, category: 'alimentaires', image: '' },
    { id: 'p221', name: 'POIS CONGO PETIT', price: 585, category: 'alimentaires', image: '' },
    { id: 'p222', name: 'CAISSE CRAKENAS', price: 2750, category: 'alimentaires', image: '' },
    { id: 'p223', name: 'SAC RIZ ANITA', price: 3555, category: 'alimentaires', image: '' },
    { id: 'p224', name: 'RIZ SHELLA BLAN', price: 1325, category: 'alimentaires', image: '' },
    { id: 'p225', name: 'RIZ BON COEUR', price: 350, category: 'alimentaires', image: '' },
    { id: 'p226', name: 'MAIS BON COEUR', price: 500, category: 'alimentaires', image: '' },
    { id: 'p227', name: 'CAISSE RAMEN', price: 1250, category: 'alimentaires', image: '' },
    { id: 'p228', name: 'SAC MAIS ALBERTHO (GWO TET)', price: 4500, category: 'alimentaires', image: '' },
    { id: 'p229', name: 'SAC SUCRE MAYAGUEZ', price: 4000, category: 'alimentaires', image: '' },
    { id: 'p230', name: 'FROMAGE TETE DE MORT', price: 150, category: 'alimentaires', image: '' },
    { id: 'p231', name: 'SPAGHETTI CLASSICO (CAISSE)', price: 1750, category: 'alimentaires', image: '' },
    { id: 'p232', name: 'SPAGHETTI ARLEQUIN (CAISSE)', price: 1550, category: 'alimentaires', image: '' },
    { id: 'p233', name: 'RIKA HUILE VEGETALE 1L', price: 375, category: 'alimentaires', image: '' },
    { id: 'p234', name: 'SALAMI CARISA', price: 270, category: 'alimentaires', image: '' },
    { id: 'p235', name: 'RAMEN PASTA MAMA ASSORTIS', price: 60, category: 'alimentaires', image: '' },
    { id: 'p236', name: 'SPAGHETTI CLASSICO', price: 80, category: 'alimentaires', image: '' },
    { id: 'p237', name: 'MAIS ALBERTO GWO TET (SAC)', price: 4500, category: 'alimentaires', image: '' },
    { id: 'p238', name: 'RIZ SHELDA JAUNE', price: 345, category: 'alimentaires', image: '' },
    { id: 'p239', name: 'PATE DE TOMATE BONGOU', price: 510, category: 'alimentaires', image: '' },
    { id: 'p240', name: 'MANBA BON COEUR PETIT', price: 500, category: 'alimentaires', image: '' },
    { id: 'p241', name: 'PRODUIT LALA POMME DE TERRE', price: 400, category: 'alimentaires', image: '' },
    { id: 'p242', name: 'Ragu sauce 14 oz', price: 410, category: 'alimentaires', image: '' },
    { id: 'p243', name: 'PEANUT BUTTER 454G', price: 500, category: 'alimentaires', image: '' },
    { id: 'p244', name: 'Riz Anita (SAC)', price: 3300, category: 'alimentaires', image: '' },
    { id: 'p245', name: 'Macaroni Geant', price: 90, category: 'alimentaires', image: '' },
    { id: 'p246', name: 'PRODUITS LALA(AMIDON)', price: 450, category: 'alimentaires', image: '' },
    { id: 'p247', name: 'PRODUITS LALA(FARINE DE BLE)', price: 100, category: 'alimentaires', image: '' },
    { id: 'p248', name: 'PRODUITS LALA(AK-100)', price: 100, category: 'alimentaires', image: '' },
    { id: 'p249', name: 'MACARONI (ARLEQUIN) 350g', price: 90, category: 'alimentaires', image: '' },
    { id: 'p250', name: 'PRODUITS LALA(SUPER AKAMIL)', price: 100, category: 'alimentaires', image: '' },
    { id: 'p251', name: 'PRODUITS LALA(AVOINE)', price: 100, category: 'alimentaires', image: '' },
    { id: 'p252', name: 'PRODUITS LALA(MAIS)', price: 100, category: 'alimentaires', image: '' },
    { id: 'p253', name: 'PRODUITS LALA(MANIOC)', price: 100, category: 'alimentaires', image: '' },
    { id: 'p254', name: 'PRODUITS LALA(ARAROUT)', price: 100, category: 'alimentaires', image: '' },
    { id: 'p255', name: 'PRODUITS LALA(LAM VERITAB)', price: 100, category: 'alimentaires', image: '' },
    { id: 'p256', name: 'DORITOS 18g', price: 50, category: 'alimentaires', image: '' },
    { id: 'p257', name: 'ATIZAN (AU BEURRE)', price: 200, category: 'alimentaires', image: '' },
    { id: 'p258', name: 'KARYNA AUBEURE', price: 185, category: 'alimentaires', image: '' },
    { id: 'p259', name: 'KARYNA (PAIN TRANCHER)', price: 220, category: 'alimentaires', image: '' },
    { id: 'p260', name: 'ELSA CHOCO DOUDOU', price: 450, category: 'alimentaires', image: '' },
    { id: 'p261', name: 'KARYNA HOT DOG', price: 180, category: 'alimentaires', image: '' },
    { id: 'p262', name: 'PEN ATIZAN AU BEURRE', price: 180, category: 'alimentaires', image: '' },
    { id: 'p263', name: 'LAYS 16g', price: 50, category: 'alimentaires', image: '' },
    { id: 'p264', name: 'ELSA MUFFIN RAISINS 0.50LBS', price: 400, category: 'alimentaires', image: '' },
    { id: 'p265', name: 'Bon Coeur (Petit Epice)', price: 500, category: 'alimentaires', image: '' },
    { id: 'p266', name: 'Bon Coeur Mamba (Petit)', price: 700, category: 'alimentaires', image: '' },
    { id: 'p267', name: 'Maggi Criollito Paquet', price: 100, category: 'alimentaires', image: '' },
    { id: 'p268', name: 'SAUMON BONGU MACKEREL (Petit)', price: 150, category: 'alimentaires', image: '' },
    { id: 'p269', name: 'Bon coeur (Gros Epice)', price: 1000, category: 'alimentaires', image: '' },
    { id: 'p270', name: 'SAUMON BONGU MACKEREL (Gros)', price: 300, category: 'alimentaires', image: '' },
    { id: 'p271', name: 'MAZORCA', price: 75, category: 'alimentaires', image: '' },
    { id: 'p272', name: 'MAggi Kay Lucien Paquet', price: 100, category: 'alimentaires', image: '' },
    { id: 'p273', name: 'Sel Refisal', price: 50, category: 'alimentaires', image: '' },
    { id: 'p274', name: 'Spaghetti pasta', price: 90, category: 'alimentaires', image: '' },
    { id: 'p275', name: 'BEURRE TI MALICE 1livres', price: 250, category: 'alimentaires', image: '' },
    { id: 'p276', name: 'TI MALICE(ENRICHI EN VITAMINE) 8 LIVRES', price: 1500, category: 'alimentaires', image: '' },
    { id: 'p277', name: 'PRODUITS LALA(GIROFLE EN POUDRE)', price: 150, category: 'alimentaires', image: '' },
    { id: 'p278', name: 'PRODUITS LALA(CLOU DE GIROFLE)', price: 120, category: 'alimentaires', image: '' },
    { id: 'p279', name: 'CRISOL(ACIETE DE SOJA) PETIT 1.89 L', price: 750, category: 'alimentaires', image: '' },
    { id: 'p280', name: 'BRINTO(SUNFLOWER OIL) 1.8L', price: 750, category: 'alimentaires', image: '' },
    { id: 'p281', name: 'TI MALICE(BEURRE DE CUISINE) 4 L', price: 800, category: 'alimentaires', image: '' },
    { id: 'p282', name: 'Gros mega', price: 3600, category: 'alimentaires', image: '' },
    { id: 'p283', name: 'spagetti libon', price: 75, category: 'alimentaires', image: '' },
    { id: 'p284', name: 'GROS SAUMON', price: 250, category: 'alimentaires', image: '' },
    { id: 'p285', name: 'Caisse bonle', price: 1450, category: 'alimentaires', image: '' },
    { id: 'p286', name: 'Spagetti geant', price: 75, category: 'alimentaires', image: '' },
    { id: 'p287', name: 'Caisse geant', price: 1820, category: 'alimentaires', image: '' },
    { id: 'p288', name: 'GEANT(SPAGHETTI)', price: 90, category: 'alimentaires', image: '' },
    { id: 'p289', name: 'TOMPAC(TOMATE CATCHUP) 875g', price: 350, category: 'alimentaires', image: '' },
    { id: 'p290', name: 'BONGU(GEANT) 350g', price: 90, category: 'alimentaires', image: '' },
    { id: 'p291', name: 'PASTA(CLASSICO) 100g', price: 80, category: 'alimentaires', image: '' },
    { id: 'p292', name: 'SPAGHETTI (ARLEQUIN) 15.2g', price: 90, category: 'alimentaires', image: '' },
    { id: 'p293', name: 'EL CRIOLLITO 1200g', price: 1050, category: 'alimentaires', image: '' },
    { id: 'p294', name: 'ANITA', price: 125, category: 'alimentaires', image: '' },
    { id: 'p295', name: 'KAY LUCIEN BOITE 10g', price: 550, category: 'alimentaires', image: '' },
    { id: 'p296', name: 'CRISOL 464ml', price: 250, category: 'alimentaires', image: '' },
    { id: 'p297', name: 'SAUMON BONGU(MACKREL) GROS 425g', price: 300, category: 'alimentaires', image: '' },
    { id: 'p298', name: 'SAUMON BONGU(MACKREL) 200g', price: 150, category: 'alimentaires', image: '' },
    { id: 'p299', name: 'VINEGAR 473ML', price: 190, category: 'alimentaires', image: '' },
    { id: 'p300', name: 'MORTADELA 400G', price: 150, category: 'alimentaires', image: '' },
    { id: 'p301', name: 'LOUISIANA ORIGINAL', price: 150, category: 'alimentaires', image: '' },
    { id: 'p302', name: 'Brinto Huile 1gallon', price: 1450, category: 'alimentaires', image: '' },
    { id: 'p303', name: 'Brinto huile de soja 1/2 gallon', price: 750, category: 'alimentaires', image: '' },
    { id: 'p304', name: 'Ranchero poudre 255g', price: 175, category: 'alimentaires', image: '' },
    { id: 'p305', name: 'PRODUITS LALA(NOIX DE MUSCADE)', price: 150, category: 'alimentaires', image: '' },
    { id: 'p306', name: 'PRODUITS LALA(POIVRE EN POUDRE)', price: 150, category: 'alimentaires', image: '' },
    { id: 'p307', name: 'PRODUITS LALA(ANIS EPICE DOUCE)', price: 120, category: 'alimentaires', image: '' },
    { id: 'p308', name: 'MAZOLA 1.89 L', price: 750, category: 'alimentaires', image: '' },
    { id: 'p309', name: 'MAZOLA HUILE VEGETALE', price: 1500, category: 'alimentaires', image: '' },
    { id: 'p310', name: 'PRODUITS LALA(CANELLE EN POUDRE)', price: 170, category: 'alimentaires', image: '' },
    { id: 'p311', name: 'Avoine sachet', price: 100, category: 'alimentaires', image: '' },
    { id: 'p312', name: 'Diri peyi', price: 850, category: 'alimentaires', image: '' },
    { id: 'p313', name: 'Makaroni bongu', price: 995, category: 'alimentaires', image: '' },
    { id: 'p314', name: 'TI MALICE (BEURRE DE CUISINE) 14 g', price: 65, category: 'alimentaires', image: '' },
    { id: 'p315', name: 'Chicolac 15 g', price: 25, category: 'alimentaires', image: '' },
    { id: 'p316', name: 'Kanel', price: 50, category: 'alimentaires', image: '' },
    { id: 'p317', name: 'Hot dog avivar', price: 170, category: 'alimentaires', image: '' },
    { id: 'p318', name: 'Corora viande', price: 500, category: 'alimentaires', image: '' },
    { id: 'p319', name: 'Orkide', price: 125, category: 'alimentaires', image: '' },
    { id: 'p320', name: 'Famosa sauce', price: 385, category: 'alimentaires', image: '' },
    { id: 'p321', name: 'barbecue sauce', price: 560, category: 'alimentaires', image: '' },
    { id: 'p322', name: 'Hot dog seara', price: 185, category: 'alimentaires', image: '' },
    { id: 'p323', name: 'MARIANNE MARGARINE', price: 200, category: 'alimentaires', image: '' },
    { id: 'p324', name: 'MONSAVON FLEUR DE LOTUS 200ML', price: 750, category: 'alimentaires', image: '' },
    { id: 'p325', name: 'RIZ SHELLA JAUNE PETIT BONCOEUR', price: 600, category: 'alimentaires', image: '' },
    { id: 'p326', name: 'RIZ SHELDA BONCOEUR', price: 1200, category: 'alimentaires', image: '' },
    { id: 'p327', name: 'RIZ SHELLA JAUNE BONCOEUR', price: 1200, category: 'alimentaires', image: '' },
    { id: 'p328', name: 'V8 ORIGINAL VEGETAL JUICE', price: 125, category: 'alimentaires', image: '' },
    { id: 'p329', name: 'REMIA MARGARINE', price: 225, category: 'alimentaires', image: '' },
    { id: 'p330', name: 'LA PERLA IODIZED SALT', price: 200, category: 'alimentaires', image: '' },
    { id: 'p331', name: 'MAIS BON COEUR PETIT', price: 200, category: 'alimentaires', image: '' },
    { id: 'p332', name: 'SACHET BLAYI', price: 250, category: 'alimentaires', image: '' },
    { id: 'p333', name: 'RIZ BLANC BONCOEUR', price: 450, category: 'alimentaires', image: '' },
    { id: 'p334', name: 'RIZ BLANC BONCOEUR', price: 100, category: 'alimentaires', image: '' },
    { id: 'p335', name: 'RIZ SHELDA PETIT BONCOEUR', price: 600, category: 'alimentaires', image: '' },
    { id: 'p336', name: 'SAZON RANCHERO SUPREMO 1', price: 115, category: 'alimentaires', image: '' },
    { id: 'p337', name: 'SAZON RANCHERO SUPREMO 2', price: 225, category: 'alimentaires', image: '' },
    { id: 'p338', name: 'BON SEL + DAYITI GRAIN', price: 0, category: 'alimentaires', image: '' },
    { id: 'p339', name: 'LA PERLA SAUCE PIQUANTE', price: 110, category: 'alimentaires', image: '' },
    { id: 'p340', name: 'RIZ BONGU ( SAC )', price: 3750, category: 'alimentaires', image: '' },
    { id: 'p341', name: 'RIZ MEGA ( SAC )', price: 3750, category: 'alimentaires', image: '' },
    { id: 'p342', name: 'SAC MAIS ALBERTO', price: 4915, category: 'alimentaires', image: '' },
    { id: 'p343', name: 'LAY EPICES PETIT 16 OZ', price: 500, category: 'alimentaires', image: '' },
    { id: 'p344', name: 'LAY EPICES GROS 32 OZ', price: 1000, category: 'alimentaires', image: '' },
    { id: 'p345', name: 'BEURRE RICAMESA', price: 250, category: 'alimentaires', image: '' },
    { id: 'p346', name: 'CHOCOLAT', price: 250, category: 'alimentaires', image: '' },
    { id: 'p347', name: 'REFISAL', price: 50, category: 'alimentaires', image: '' },
    { id: 'p348', name: 'MAZORCA MAIS', price: 75, category: 'alimentaires', image: '' },
    { id: 'p349', name: 'EAU DASANI 591ML', price: 100, category: 'alimentaires', image: '' },
    { id: 'p350', name: 'SACHET DINDE WINGS PETIT', price: 500, category: 'alimentaires', image: '' },
    { id: 'p351', name: 'SACHET POULET', price: 1000, category: 'alimentaires', image: '' },
    { id: 'p352', name: 'ELLE & VIRE 500 GR', price: 140, category: 'alimentaires', image: '' },
    { id: 'p353', name: 'FROMAGE LA VACHE QUI RIT', price: 210, category: 'alimentaires', image: '' },
    { id: 'p354', name: 'FARINE FRANCE', price: 70, category: 'alimentaires', image: '' },
    { id: 'p355', name: 'FARINE FRANCE PETIT', price: 70, category: 'alimentaires', image: '' },
    { id: 'p356', name: 'FARINE FRANCE GROS', price: 140, category: 'alimentaires', image: '' },
    { id: 'p357', name: 'BLE BON COEUR PETIT', price: 200, category: 'alimentaires', image: '' },
    { id: 'p358', name: 'POIS LENTILLES ( GROS )', price: 1250, category: 'alimentaires', image: '' },
    { id: 'p359', name: 'POIS LENTILLES ( PETIT )', price: 600, category: 'alimentaires', image: '' },
    { id: 'p360', name: 'POIS CONGO ( GROS )', price: 1200, category: 'alimentaires', image: '' },
    { id: 'p361', name: 'POIS BEURRE ( PETIT )', price: 650, category: 'alimentaires', image: '' },
    { id: 'p362', name: 'POIS ROUGE ( GROS )', price: 1500, category: 'alimentaires', image: '' },
    { id: 'p363', name: 'POIS ROUGE ( PETIT )', price: 700, category: 'alimentaires', image: '' },
    { id: 'p364', name: 'POIS BLANC', price: 650, category: 'alimentaires', image: '' },
    { id: 'p365', name: 'PETIT MIL ( PETIT )', price: 350, category: 'alimentaires', image: '' },
    { id: 'p366', name: 'PETIT MIL', price: 1000, category: 'alimentaires', image: '' },
    { id: 'p367', name: 'POIS CONGO ( PETIT )', price: 550, category: 'alimentaires', image: '' },
    { id: 'p368', name: 'POIS NOIRE ( GROS )', price: 1250, category: 'alimentaires', image: '' },
    { id: 'p369', name: 'POIS NOIRE ( PETIT )', price: 500, category: 'alimentaires', image: '' },
    { id: 'p370', name: 'Caisse pate tomate bongu moyen', price: 3500, category: 'alimentaires', image: '' },
    { id: 'p371', name: 'Pate tomate bongu gros', price: 1150, category: 'alimentaires', image: '' },
    { id: 'p372', name: 'FAMOSA CATCHUP ( GROS ) 14OZ', price: 270, category: 'alimentaires', image: '' },
    { id: 'p373', name: 'KARYNA LE FAMILIAL', price: 215, category: 'alimentaires', image: '' },
    { id: 'p374', name: 'SNACKITOS', price: 150, category: 'alimentaires', image: '' },
    { id: 'p375', name: 'Lala pate tomate', price: 200, category: 'alimentaires', image: '' },
    { id: 'p376', name: 'POIS FRANCE ( GROS )', price: 1100, category: 'alimentaires', image: '' },
    { id: 'p377', name: 'POIS FRANCE ( PETIT )', price: 500, category: 'alimentaires', image: '' },
    { id: 'p378', name: 'POIS BEURRE ( GROS )', price: 1500, category: 'alimentaires', image: '' },
    { id: 'p379', name: 'FAMOSA CATCHUP ( PETIT )', price: 40, category: 'alimentaires', image: '' },
    { id: 'p380', name: 'POIS MAYAMI ( GROS )', price: 1100, category: 'alimentaires', image: '' },
    { id: 'p381', name: 'POIS MAYAMI ( PETIT )', price: 500, category: 'alimentaires', image: '' },
    { id: 'p382', name: 'La favorita hot dog', price: 170, category: 'alimentaires', image: '' },
    { id: 'p383', name: 'Produits Alimentaires LA PERLA PATE DE TOMATE', price: 125, category: 'alimentaires', image: '' },
    { id: 'p384', name: 'Moyen saumon bongu', price: 125, category: 'alimentaires', image: '' },
    { id: 'p385', name: 'PISTACHE BON COEUR PETIT', price: 250, category: 'alimentaires', image: '' },
    { id: 'p386', name: 'PISTACHE BON COEUR BOCAL', price: 400, category: 'alimentaires', image: '' },
    { id: 'p387', name: 'TRITRI', price: 125, category: 'alimentaires', image: '' },
    { id: 'p388', name: 'ALBERTO OIL 3.78L', price: 1600, category: 'alimentaires', image: '' },
    { id: 'p389', name: 'CRISOL OIL 1 L', price: 420, category: 'alimentaires', image: '' },
    { id: 'p390', name: 'KASAV', price: 225, category: 'alimentaires', image: '' },
    { id: 'p391', name: 'PAPITA BANNANN', price: 50, category: 'alimentaires', image: '' },
    { id: 'p392', name: 'TOMPAC KETCHUP', price: 350, category: 'alimentaires', image: '' },
    { id: 'p393', name: 'RIZ TCS ( GROS )', price: 1250, category: 'alimentaires', image: '' },
    { id: 'p394', name: 'SUCRE BON COEUR ( GROS )', price: 400, category: 'alimentaires', image: '' },
    { id: 'p395', name: 'RIZ CHELA BLANC', price: 1325, category: 'alimentaires', image: '' },
    { id: 'p396', name: 'SUCRE BON COEUR ( PETIT )', price: 100, category: 'alimentaires', image: '' },
    { id: 'p397', name: 'RIZ TCS ( PETIT )', price: 300, category: 'alimentaires', image: '' },
    { id: 'p398', name: 'FARINE FRANCE ( PETIT )', price: 70, category: 'alimentaires', image: '' },
    { id: 'p399', name: 'Diana maccaroni', price: 90, category: 'alimentaires', image: '' },
    { id: 'p400', name: 'Caisse gallon vinaigre J&J\'s', price: 1800, category: 'alimentaires', image: '' },
    { id: 'p401', name: 'FARINE FRANCE ( GROS )', price: 140, category: 'alimentaires', image: '' },
    { id: 'p402', name: 'PEDIASURE', price: 450, category: 'alimentaires', image: '' },
    { id: 'p403', name: 'MILKANA', price: 120, category: 'alimentaires', image: '' },
    { id: 'p404', name: 'PASCUAL YOGIKIDS', price: 125, category: 'alimentaires', image: '' },
    { id: 'p405', name: 'Shake Bongu Assortis', price: 175, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p406', name: 'Yofresh Fresa', price: 225, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p407', name: 'Yofresh Durazno', price: 225, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p408', name: 'Yofresh Vanilla', price: 240, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p409', name: 'Pascual Fruit Salad', price: 125, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p410', name: 'Pascual Strawberry-Banana', price: 125, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p411', name: 'Pascual Vanilla', price: 125, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p412', name: 'Pascual Greek', price: 125, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p413', name: 'Pediasure Vanilla Shake', price: 450, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p414', name: 'Codigel Milk Cube', price: 250, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p415', name: 'Lait Bon Coeur Petit', price: 200, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p416', name: 'Lait Bon Coeur Gros', price: 300, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p417', name: 'Green Land 900G', price: 1500, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p418', name: 'Nestle Condensed Milk', price: 325, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p419', name: 'Produits Laitiers Elle & Vire Fraise', price: 150, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p420', name: 'Elle & Vire Cerise', price: 150, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p421', name: 'Nutrigu 3 Cereales et Fruits', price: 300, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p422', name: 'Nutrigu 5 Cereales et Fruits', price: 300, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p423', name: 'Nutrigu 8 Cereales', price: 300, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p424', name: 'Gallia Calisma 2 830G', price: 2400, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p425', name: 'Able Farm Condensed', price: 25, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p426', name: 'Mulik Chocolate', price: 275, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p427', name: 'Mulik Strawberry', price: 275, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p428', name: 'Bongu Lait Concentre Sucre 396G', price: 260, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p429', name: 'Sport Shake Vanilla 325 ML', price: 300, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p430', name: 'Ensure Original Vanilla 8 OZ', price: 375, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p431', name: 'Caisse Alaska Powder Milk 2500g', price: 24950, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p432', name: 'Lait Nursie 900G', price: 2200, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p433', name: 'Pascual Banana 125G', price: 125, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p434', name: 'Greenland Lait Evapore', price: 70, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p435', name: 'Pascual Blueberry 120G', price: 125, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p436', name: 'Pascual Strawberry/Fresa 125G', price: 125, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p437', name: 'Alacta Plus 800g', price: 3450, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p438', name: 'Pascual (Blueberry) 480g', price: 125, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p439', name: 'Nestle Nido 800g', price: 1340, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p440', name: 'Lait Nursie 0-6 Mois Gros', price: 2200, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p441', name: 'Lait Nursie Petit 400G', price: 1100, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p442', name: 'Tartino 13.5g', price: 125, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p443', name: 'Caisse Pascual', price: 2570, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p444', name: 'Bongu (Lait Entier en Poudre) 400g', price: 800, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p445', name: 'Nido 1+ Lait en Poudre', price: 5000, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p446', name: 'Green-Land (Campo Verde) 400g', price: 850, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p447', name: 'Alaska (Instant 400g)', price: 850, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p448', name: 'Bongu (Instantane) 900g', price: 1250, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p449', name: 'Nursie (2) 900g', price: 2500, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p450', name: 'Green-Land (Campo Verde en PD)', price: 1675, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p451', name: 'Bonle (Lait) 100g', price: 65, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p452', name: 'Alaska (Lait) 169g', price: 70, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p453', name: 'Gloria (Lait) 170g', price: 65, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p454', name: 'Bongu (Lait) 170g', price: 65, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p455', name: 'Green-Land (Instantane) 400g', price: 850, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p456', name: 'Gallia (2) 400g', price: 1300, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p457', name: 'Nursie 0-6 Mois Petit 400g', price: 1100, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p458', name: 'Pascual (Vanilla) 120g', price: 125, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p459', name: 'Pascual (Yogikids) 125g', price: 125, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p460', name: 'Green-Land (Instantane) 2500g', price: 3920, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p461', name: 'Pascual (Macedonia) 125g', price: 125, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p462', name: 'Pascual (Big Day) 125g', price: 125, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p463', name: 'Pascual (Greek) 125g', price: 125, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p464', name: 'Gloria (Leche Entera) 1L', price: 300, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p465', name: 'Gloria (Zero Lacto) 1L', price: 300, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p466', name: 'Gallia (Calisma) Gros 830g', price: 2400, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p467', name: 'Pascual (Whole Milk) 1L', price: 300, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p468', name: 'Bongu (Lait Entier en Poudre) 2500g', price: 2900, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p469', name: 'Alaska (Instant) 2500g', price: 4550, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p470', name: 'Alaska (Instant) 900g', price: 1850, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p471', name: 'Ensure Original', price: 375, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p472', name: 'Cride White Chicken', price: 275, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p473', name: 'Wings Dinde', price: 400, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p474', name: 'Sachet Gesier', price: 500, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p475', name: 'Hot Dog (Sadia)', price: 200, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p476', name: 'Wings Dinde', price: 250, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },
    { id: 'p477', name: 'Cuisse Poule', price: 500, category: 'alimentaires', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400' },

    // Cosmétiques
    { id: 'c1', name: 'JABON GERMICIDA #1', price: 100.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c2', name: 'GENIUS INTEMSE 100ML', price: 800.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c3', name: 'RYAN BLAKE 176 59ML', price: 540.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c4', name: 'IDOLE CAROTTE', price: 160.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c5', name: 'SAVON GERMICIDA #2', price:150.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c6', name: 'RYAN BLAKE 163 59ML', price:540.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c7', name: 'FIORE BIANCO 100ML', price:750.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c8', name: 'FLEUR D\'OR PARIS 100ML', price:750.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c9', name: 'GWO PAW PAW', price:760.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c10', name: 'PURE BLACK 35ML', price:125.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c11', name: 'BLUE DU CHENAIE 35ML', price:125.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c12', name: 'FIORE NERO 100ML', price:750.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c13', name: 'DEODORANT DOVE 74G', price:500.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c14', name: 'TI CAROTINE', price:435.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c15', name: 'SAVON PAW PAW', price:500.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c16', name: 'TI PAW PAW 120ML', price:410.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c17', name: 'TI CARE BOM', price:325.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c18', name: 'BODY FANTASIES 236ml', price:675.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c19', name: 'RYAN BLAKE 141 59ML', price:540.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c20', name: '7 MIRACLES CAROTTE SAVON', price:110.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c21', name: '7 MIRACLES CREMES CAROTTE', price:185.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c22', name: 'RYAN BLAKE 150 59ML', price:540.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c23', name: 'CLEAR THERAPY BLANC', price:875.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c24', name: 'BIDON CAROTONE', price:870.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c25', name: 'RYAN BLAKE 164 59ML', price:540.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c26', name: 'FANTASTIC TURN 100ML', price:750.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c27', name: 'JE T\'AIME PARIS 100ML', price:800.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c28', name: 'UPTOWN ROSE 100ML', price:700.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c29', name: 'BLUE ROYAL EDITION 100ML', price:800.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c30', name: 'SPARTACUS INSIGNIA 100ML', price:1000.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c31', name: 'GSG 100ML', price:1000.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c32', name: 'ROYAL RAMBA 100ML', price: 750.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c33', name: 'SOLID BLACK', price:1000.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c34', name: '24X7 BLACK 100ML', price:600.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c35', name: 'DARK BLACK OUD 100ML', price:1000.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c36', name: 'PURE BLACK 100ML 100 ML', price:1000.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c37', name: 'CHERIE DE FRANCE 100ML', price:750.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c38', name: 'DARK BLACK 100ML', price:1000.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c39', name: 'Actimed pro', price:115.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c40', name: 'KING OF FRANCE 100ML', price:750.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c41', name: 'TOUCH OF BLACK 100ML', price:750.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c42', name: 'VICTORY OUD NOIR 100ML', price:1000.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c43', name: 'PURE SHINNY WOMAN 100ML', price:750.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c44', name: 'GENIUS 100ML', price:1000.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c45', name: 'VELVET OUD 100ML', price:1000.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c46', name: 'LION HEART 100ML', price:700.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c47', name: 'MICHELLE 100ML', price:800.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c48', name: 'ARABIAN NIGHTS 100ML', price:1000.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c49', name: 'ANGELO MEN 100ML', price:750.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c50', name: 'AMEER AL OUD 100ML', price:1000.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c51', name: 'MON GLAM PARIS 100ML', price:750.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c52', name: 'MADAM 100ML', price:1000.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c53', name: 'ALIGATOR BLACK 100ML', price:750.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c54', name: 'KUROSS 100ML', price:800.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c55', name: 'AMORCAGE 100ML', price:750.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c56', name: 'ELITE OUD ORCHID 100ML', price:800.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c57', name: 'LA VIDA BELLA 100ML', price:50.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c58', name: 'SAVAGE POUR HOMME 100ML', price:1000.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c59', name: 'WHITE HORSE 100ML', price:900.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c60', name: 'Dalan 400ml', price:220.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c61', name: 'Ajax 828ml', price:575.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c62', name: 'Ajax 366ml', price:330.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c63', name: 'CLEAN&GO ASSOUPLISSANT 1GAL', price:1500.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c64', name: 'APPOLO DESINFECTANT', price:100.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c65', name: 'APPOLO DETERGENT', price:100.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c66', name: 'MISTOLIN CAMPOS DE FLORES PETIT', price:240.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c67', name: 'GLADE 1', price:520.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c68', name: 'STORM DINO', price:235.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c69', name: 'STORM SHARK', price:235.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c70', name: 'CLEAN&GO LIQUIDE VAISSELLE 1GAL', price:1500.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c71', name: 'TCB HAIR RELAXER 136G', price:185.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c72', name: 'RYAN BLAKE 153 59ML', price:540.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c73', name: 'CIERGE VIERGE MIRACULEUSE', price:185.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c74', name: 'PERMANENTE PRIMA 212 G', price: 270.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c75', name: 'RINSE MIEL 474G', price:300.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c76', name: 'JABON GERMICIDA #2', price:110.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c77', name: 'CIERGE NOTRE DAME DU MONT CARME', price:370.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c78', name: 'SHAMPOO MIEL 474G', price:300.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c79', name: 'CLEAN&GO LIQUIDE LESSIVE 1GAL', price:1500.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c80', name: 'CLEAN&GO DESINFECTANT 1GAL', price: 1500.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c81', name: 'TI CARO WHITE', price:315.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c82', name: 'GROS FLORIDA', price:730.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c83', name: 'Colgate total', price:300.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c84', name: 'SUGAR SCRUB ALPHA ARBUTIN', price: 600.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c85', name: 'BLUE LAGOON SHEA SUGAR SCRUB', price: 600.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c86', name: 'ASAD ZANZIBAR', price: 300.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c87', name: 'COLGATE TOTAL GEL 144G', price: 550.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c88', name: 'COLGATE TOTAL ACTIVE', price: 550.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c89', name: 'ACTIMED DENTIFRICE', price: 125.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c90', name: 'FADDER LAWAFA', price: 300.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c91', name: 'YARA', price: 300.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c92', name: 'MUSAMAM', price: 300.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c93', name: 'FRIDE OF LATTAFA', price: 300.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c94', name: 'KHAMRAH', price: 300.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c95', name: 'ASAD', price: 300.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c96', name: 'SAKEENA', price: 300.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c97', name: 'ZOTE PINK 400G', price: 235.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c98', name: 'AXE BLACK', price: 375.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c99', name: 'AXE DARK TEMPTATION', price: -375.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c100', name: 'MISSY COLLECTION JUST A KISS', price: -150.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c101', name: 'SAVON MAGIC BOUTTES', price: 0.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c102', name: 'SAVON MAGIC BLANC', price: 0.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c103', name: 'SAVON CIEL BLEU', price: 0.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c104', name: 'MISSY COLLECTION FOREVER KISS', price: 150.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c105', name: 'TCB HAIR RELAXER 15OZ', price: 540.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c106', name: 'NARTA HOMME', price: 700.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c107', name: 'ZOTE PINK SOAP 200g', price: 120.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c108', name: 'MISSY COLLECTION FIRST KISS', price:150.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c109', name: 'PH BEAUTY SHAMPOO COCO GLOW', price:975.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c110', name: 'ORIGINALS OLIVE OIL COND', price: 1515.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c111', name: 'YARA TOUS', price: 300.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c112', name: 'SPEED STICK FRESH', price: 750.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c113', name: 'SPEED STICK POWER SPORT', price: 750.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c114', name: 'AXE APOLLO', price: 600.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c115', name: 'SPEED STICK REGULAR', price: 600.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c116', name: 'GILLETTE COOL WAVE', price: 750.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c117', name: 'GILLETTE DRY COOL WAVE', price: 750.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c118', name: 'GILLETTE ODORSHIELD SPRAY', price: 650.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c119', name: 'Degree ultra clear 2.7 oz', price: 490.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c120', name: 'Kotex actimed pro', price: 115.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c121', name: 'Actimed pro', price: 115.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c122', name: 'DEGREE WILD WOODS', price: 550.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c123', name: 'CARO WHITE 500ML', price: 875.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c124', name: 'CLEAR THERAPY JAUNE', price: 875.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c125', name: 'ARRID ULTRA FRESH', price: 300.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c126', name: 'AMOUR', price: 700.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c127', name: 'ASAD BOURBON', price: 300.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c128', name: 'FADDER LAWAFA BLACK', price: 300.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c129', name: 'POULOS BLUE', price: 700.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c130', name: 'CAPABLE GIRL', price: 700.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c131', name: 'AXE BLACK DEO', price: 600.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c132', name: 'AXE DARK TEMPTATION DEO', price: 600.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c133', name: 'AXE ANARCHY DEO', price: 600.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c134', name: 'LEXI HONEY SHAMPOO', price: 225.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c135', name: 'LEXI HONEY CONDITIONER', price: 225.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c136', name: 'AXE PHOENIX', price: 600.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c137', name: 'BIEN-ETRE THE AMBRE 250ML', price: 1400.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c138', name: 'REXONA (SEXY BOUQUET) 150 ml', price: 375.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c139', name: 'DOVE (TONO UNIFORME COCO) 150 ml', price: 375.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c140', name: 'XTREME PRO-EXPERT 8.81 OZ', price: 325.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c141', name: 'ROXONA(ACTIVE EMOTION) 150 ml', price: 375.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c142', name: 'BLUE MAGIC PETROLEUM JELLY 340 g', price: 530.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c143', name: 'ACTIMED (NUMBER ONE) 150 ml', price: 150.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c144', name: 'XTREME CLEAR PERFORMANCE 8.81 OZ', price: 650.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c145', name: 'BLUE MAGIC SHEA BUTTER 340 g', price: 530.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c146', name: 'XTREME OF EXTREME CONTROL 8.81 OZ', price: 325.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c147', name: 'moco de GORILA GAMER 9.52 OZ', price: 700.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c148', name: 'ECO CURL & WAVE 236 ML', price: 310.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c149', name: 'SUPER WET MAXIMUM HOLD 250 g', price: 290.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c150', name: 'moco de gorila PUNK 9.52 OZ', price: 700.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c151', name: 'XTREME PRO-EXPERT REAL + 24 H 3.38 OZ', price: 215.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c152', name: 'XTREME BLACK PERFORMANCE 8.81 OZ', price: -650.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c153', name: 'ECO ARGAN OIL 236 ML', price: 310.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c154', name: 'ECO KRYSTAL 236 ML', price: 310.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c155', name: 'ACTIMED (INVICT) 150 ml', price: 150.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c156', name: 'BLEU MAGIC HAIR FOOD', price: 530.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c157', name: 'BLEU MAGIC BERGAMOT 340 g', price: 530.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c158', name: 'BLUE MAGIC ORIGINALS 340 g', price: 530.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c159', name: 'BLEU MAGIC CONDITIONNER 340 g', price: 530.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c160', name: 'TCB HAIR RELAXER 510 g', price: 570.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c161', name: 'NATURAL TEXTURIZER HAIR SOFTENE', price: 700.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c162', name: 'OLIVE OIL FULL AP EXTRA STRENGT', price: 1025.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c163', name: 'SCURL TEXTURIZER CREME 425 g', price: 1055.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c164', name: 'BLUE MAGIC OLIVE OIL 340 g', price: 530.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c165', name: 'ACTIMED (NIGHT) 150 ml', price: 150.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c166', name: 'DOVE (TONO UNIFORME CALENDULA) 150 ml', price: 375.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c167', name: 'ACTIMED (AFRICA) 150 ml', price: 150.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c168', name: 'ACTIMED (JEANS) 150 ml', price: 150.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c169', name: 'DOVE (INVISIBLE) 150 ml', price: 375.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c170', name: 'DEGREE (DRY SPRAY) 107 g', price: 475.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c171', name: 'DOVE (CREME HUMECTANTE) 150 ml', price: 375.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c172', name: 'REXONA (SPORT) 150 ml', price: 375.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c173', name: 'DOVE (TONO UNIFORME) 150 ml', price: 375.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c174', name: 'OLIVE OIL DETANGLER 251ML', price: 705.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c175', name: 'OLIVE OIL WIG & WEAVE 216 ML', price: 1135.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c176', name: 'DEGREE (COOL COMFORT) 76 g', price: 550.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c177', name: 'ECO GEL STYLE 16 OZ', price: 485.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c178', name: 'ECO ARGAN OIL PROFESSIONAL 32 OZ', price: 780.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c179', name: 'ECO CURL & WAVE PROFESSIONAL 32 OZ', price: 780.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c180', name: 'ECO ARGAN OIL STYLING GEL 16 OZ', price: 485.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c181', name: 'ECO OLIVE OIL STYLES 32 OZ', price: 780.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c182', name: 'DEGREE (EXTREME) 76 g', price: 490.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c183', name: 'XTREME PRO-EPERT 500 g', price: 650.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c184', name: 'SEDUCTION GEL FOR MEN 260 g', price: 485.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c185', name: 'ROYAL CROWN HAIR DRESSING 5OZ', price: 600.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c186', name: 'RED ONE HAIR GEL', price: 275.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c187', name: 'DOVE (ADVANCED CARE NO WHITE) 74 g', price: 475.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c188', name: 'DEGREE (ADVANCED 72 H) 76 g', price: 490.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c189', name: 'GORILA PUNK GEL 3 OZ', price: 405.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c190', name: 'DEGREE (ULTRACLEAR BLACK) 76 g', price: 540.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c191', name: 'DOVE (EXTRA FRESH) 76 g', price: 490.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c192', name: 'ECO STYLE KRYSTAL GEL 16 OZ', price: 485.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c193', name: 'ECO PROFESSIONAL WATER BASED 16 OZ', price: 485.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c194', name: 'DEGREE (EXTREME BLAST 48H) 48 g', price: 350.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c195', name: 'DEGREE (SPORT) 76 g', price: 550.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c196', name: 'SUPER WET 250 g', price: 290.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c197', name: 'HAIR RELAXER 212 g', price: 340.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c198', name: 'moco de gorila ROCKERO', price: 700.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c199', name: 'ECO OLIVE OIL 236 ML', price: 310.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c200', name: 'DEGREE (EXTREME BLAST) 76 g', price: 550.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c201', name: 'DEGREE ( COOL RUSH) 48 g', price: 350.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c202', name: 'DEGREE(COOL RUSH 48H) 76 g', price: 550.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c203', name: 'DEGREE (INTENSE SPORT) 85 g', price: 550.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c204', name: 'ECO GEL PROFESSIONAL 32 OZ', price: 780.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c205', name: 'moco de GORILA ROCKERO BEAST 11.99 g', price: 760.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c206', name: 'moco de GORILA GAMER SNOT 11.99 g', price: 760.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c207', name: 'GORILA PUNK 11.99 g', price: 60.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c208', name: 'moco GALAN 11.99 g', price: 760.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c209', name: 'COLGATE (ANTICAVITY) 226 g', price: 200.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c210', name: 'COLGATE(CAVITY) 226 ml', price: 550.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c211', name: 'ACTIMED (DRAKYA) 80 ml', price: 115.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c212', name: 'LOTION REVE D\'OR 97 ml', price: 350.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c213', name: '3 DAYS (NO TACHES) 30 g', price: 60.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c214', name: 'GODAS (BOUGIES)', price: 50.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c215', name: 'GLISTER 200 g', price: 1100.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c216', name: 'COLAGE TOTAL FRESH 115 g', price: 250.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c217', name: 'ACTIMED (BRUTUS) 80 ml', price: 115.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c218', name: 'OLIVE OIL LOTION 473ml', price: 1085.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c219', name: 'ORS OIL GIRLS (SHAMPOO) 384ml', price: 810.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c220', name: 'ACTIMED (SECRET POWDER) 80 ml', price: 115.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c221', name: 'ACTIMED (COOL SUMMER) 80 ml', price: 115.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c222', name: 'CURL SHOW STYLE MILK 16OZ', price: 1135.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c223', name: 'WHITE RAM SHAMPOO(APPLE BLOSSOM 443 ml', price: 350.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c224', name: 'WHITE RAM SHAMPOO(OCEAN MIST) 443ML', price: 350.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c225', name: 'OLIVE OIL SPRAY 10oz', price: 785.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c226', name: 'BOOUS HOME BOOUS 35ML 35 ML', price: 125.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c227', name: 'LOTION POMPEIA (FRANCE) 20 ml', price: 0.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c228', name: 'VASELINE (GROS) 368 g', price: 850.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c229', name: 'Black Hair Shampoo', price: -50.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c230', name: 'LOTION (REVE D\'OR) 19.5 ml', price: 0.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c231', name: 'LEMONVATE (CREAM) 30 g', price: 75.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c232', name: 'OMIC (GEL) 30 g', price: 75.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c233', name: 'LIVI', price: 50.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c234', name: '2I2I VIP ROSE 35ML 35 ML', price: 125.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c235', name: 'RYAN BLAKE', price: 540.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c236', name: 'FLORA GORGEOUS GARDENIA 35ML 35 ML', price: 125.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c237', name: 'DOVE MEN + CARE 89 g', price: 500.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c238', name: 'VERGACLE BRILLANT CRISTAL 35ML 35 ML', price: 125.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c239', name: 'J\'AEDAR 35ML 35 ML', price: 125.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c240', name: 'PINK LOVE 35ML 35 ML', price: 125.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c241', name: 'SALVACER 35ML 35 ML', price: 125.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c242', name: 'LOCOSTER 35ML 35 ML', price: 125.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c243', name: 'ACTIMED (VETIVER) 80 ml', price: 115.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c244', name: 'OLIVE NOURISHING COCONUT 404 ML', price: 1085.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c245', name: 'TEA TREE OIL ( HAIR DRESS )', price: 2015.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c246', name: 'CURLSHOW MOUSSE 207 ML', price: 1135.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c247', name: 'OLIVE OIL COCONUT RESTORATIVE 82 ML', price: 570.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c248', name: 'OLIVE WIG GRIP GEL 150 ml', price: 890.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c249', name: 'OLIVE CREME STYLER 150 ml', price: 1055.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c250', name: 'CURLSHOW CURL CREATOR 453 g', price: 1250.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c251', name: 'CARROT OIL 170 g', price: 0.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c252', name: 'JOJOBA OIL 156 g', price: 755.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c253', name: 'ACTIMED (POWDER) 150 ml', price: 150.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c254', name: 'OLIVE OIL NEW GROWTH ( NORMAL )', price: 865.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c255', name: 'OLIVE OIL FULL APPLICATION', price: 1025.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c256', name: 'REXONA (INVISIBLE) 87 g', price: 475.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c257', name: 'ACTIMED (CITRUS) 80 ml', price: 115.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c258', name: 'IDOLE (SAVON) 125 g', price: 150.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c259', name: 'OLIVE OIL CURL DEFINING MOUSSE 207 ML', price: 1085.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c260', name: 'OLIVE WRAP\\SET MOUSSE 207 ML', price: 945.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c261', name: 'ORS FERTILIZING SERUM 59 ML', price: 1800.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c262', name: 'ORS HAIR MAYONNAISE ( GROS ) 454 G', price: 1485.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c263', name: 'OLIVE OIL SULFATE FREE SHAMPOO 473ml', price: 1085.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c264', name: 'CURLSHOW STYLING CREAM 340 g', price: 1250.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c265', name: 'OLIVE OIL DEEP TREATMENT 567 g', price: 1440.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c266', name: 'ORS HAIR MAYONNAISE 227 g', price: 700.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c267', name: 'OLIVE REPLENISHING CONDITIONNER 362ML', price: 955.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c268', name: 'OLIVE MOISTURISING HAIR LOTION 251 ML', price: 890.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c269', name: 'VO5 EXTRA BODY SHAMPOO 443ML', price: 365.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c270', name: 'ACTIMED (NINA)', price: 115.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c271', name: 'CURLSHOW CURL SHINE GLOSS 120 ML', price: 1135.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c272', name: 'ACTIMED (SAVAGERY) 80 ml', price: 115.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c273', name: 'OLIVE LACE WIG GLUE 38 ML', price: 1510.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c274', name: '0LIVE OIL(GLOSSING HAIR POLISHE 177ML', price: 1270.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c275', name: 'ACTIMED (CLASSIC) 80 ml', price: 115.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c276', name: 'CURLSHOW SMOOTH PUDDING 340 g', price: 1250.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c277', name: 'OLIVE OIL ( NORMAL STRENGTH ) 531 g', price: 1825.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c278', name: 'OLIVE OIL ( EXTRA STRENGTH )', price: 1945.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c279', name: 'DOVE (FRESH MOISTURIZERS) 74 g', price: 475.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c280', name: 'GILLETTE', price: 750.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c281', name: 'ACTIMED DARK 150 ml', price: 150.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c282', name: 'JOHNSONS BEDTIME BABY POWDER', price: 445.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c283', name: 'BABY OIL', price: 650.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c284', name: 'BABY DREAM BATH', price: 490.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c285', name: 'BABY SOFT LOTION', price: 490.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c286', name: 'BABY SHAMPOO', price: 490.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c287', name: 'COTON BALLS WHITE RAIN', price: 285.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c288', name: 'COTON BALLS PURELY', price: 285.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c289', name: 'DOUBLE TIPPED', price: 405.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c290', name: 'COTON BALLS SIMPLY', price: 245.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c291', name: 'JOHNSONS BLOSSOMS 8BABY POWDER', price: 445.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c292', name: 'LOTION POMPEIA PETIT', price: 125.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c293', name: 'LOTION REVE D\'OR PETIT', price: 125.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c294', name: 'GLISTER ORAL', price: 1100.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c295', name: 'MONSAVON AU LAIT SAVON', price: 510.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c296', name: 'SAVON IRISH PQT', price: 395.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c297', name: 'SANOGYL', price: 1000.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c298', name: 'ACTIMED (SHAMPOING) 400 g', price: 375.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c299', name: 'XMED (SAVON ANTISEPTIQUE) PQRT 70 g', price: 300.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c300', name: 'IRISH SPRING (ALOE MIST) 314.4 g', price: 150.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c301', name: 'SAVON XMED CITRON', price: 50.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c302', name: 'SAVON XMED TCC', price: 50.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c303', name: 'SAVON MYRA', price: 50.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c304', name: 'SAVON XMED CARROT', price: 50.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c305', name: 'SAVON IRISH UNITE', price: 130.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c306', name: 'GALLIA (CALISMA) PETIT', price: 1100.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c307', name: 'SAVON X MED PAPAYA', price: 50.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c308', name: 'REXONA AEROSOL SEXY WM 150ml', price: 500.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c309', name: 'REXONA AEROSOL ANTIBACT INV MEN 150 ml', price: 500.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c310', name: 'REXONA AEROSOL ANTI BACT MEN 150 ml', price: 500.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c311', name: 'REXONA AEROSOL ACTIV\\WM 150 ml', price: 500.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c312', name: 'Champoo Actimed', price: 400.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c313', name: 'Xmed', price: 0.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c314', name: 'REXONA AEROSOL SPORT WEM 150 ml', price: 500.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c315', name: 'BIEN-ETRE LAVANDE 250ML', price: 1400.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c316', name: 'BIEN-ETRE THE BLANC 250ML', price: 1400.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c317', name: 'BIEN-ETRE MANDARINE 250ML', price: 1400.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c318', name: 'BIEN-ETRE BOURGEON DE POMMIER 250ML', price: 1400.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c319', name: 'VASELINE (SOOTHING) 295ml', price: 750.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c320', name: 'VASELINE (NOURISHING) 295ml', price: 750.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c321', name: 'BIEN-ETRE FRAICHE 250ML', price: 1400.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c322', name: 'SUPER DORCO', price: 245.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c323', name: 'PAPIA', price: 170.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c324', name: 'BIC 1', price: 285.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c325', name: 'PAPER STICK', price: 570.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c326', name: 'COTTON SWABS', price: 325.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c327', name: 'COTTON SWABS VALUE', price: 405.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c328', name: 'Irish Spring', price: 0.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c329', name: 'OLIVE OIL DAILY CURL CREME 8oz', price: 810.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c330', name: 'TCB', price: 450.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c331', name: 'Colgate 115 g', price: 350.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c332', name: 'IDOLE(SAVON ECLAIRCISSANT) 200 g', price: 200.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c333', name: 'LA VIDA BELLA CRYSTAL', price: 750.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c334', name: 'MYRA (SAVON)', price: 75.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c335', name: 'BOD MAN BLACK 8 FL OZ/236', price: 710.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c336', name: 'DOVE (ADVANCED CARE) 74 g', price: 500.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c337', name: 'BOD MAN MOST WANTED 8FL OZ', price: 710.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c338', name: 'BOD MAN DIAMOND CROWN 8FL OZ/236', price: 710.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c339', name: 'CINTHOL LIME FRESH', price: 145.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c340', name: 'CINTHOL DEO SOAN COLOGNE', price: 145.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c341', name: 'CINTHOL DEO SOAP', price: 1454.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c342', name: 'BOD MAN FRESH GUY 8 FL OZ', price: 710.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c343', name: 'FLORIDA WATER 221 ML', price: 800.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c344', name: 'ACTIMED BEBE 12-17 kg', price: 1000.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c345', name: 'ACTIMED BEBE COTON 9-14 KG', price: 1000.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c346', name: 'AGUA DE FLORIDA 2 FL', price: 335.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c347', name: 'BODY FANTASIES 8 FL OZ', price: 675.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c348', name: 'COTTON CANDY 8 FL OZ', price: 675.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c349', name: 'ST.IVES SMOOTHING 621 ML', price: 810.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c350', name: 'DOVE (FRESH) 45 g', price: 250.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c351', name: 'DOVE (ADVANCED CARE PRO) 74 g', price: 475.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c352', name: 'DEGREE (ADVANCED) 76 g', price: 540.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c353', name: 'SUPER WET MAXI HOL 35.3', price: 0.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c354', name: 'DEGREE (ULTRACLEAR) 76 g', price: 750.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c355', name: 'DOVE (ADVANCED CARE 48H) 45 g', price: 250.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c356', name: 'XTREME REAL + 24 H 35.27 OZ', price: 1135.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },
    { id: 'c357', name: 'SUPER WET MAXIMUM H 35.3 OZ', price: 810.00, category: 'cosmetiques', image: 'https://source.unsplash.com/600x600/?cosmetics' },

    //Insecticides 
     { id: 'i1', name: 'Dragon(Rouge)', price: '100', category: 'insecticides', image: 'https://source.unsplash.com/600x600/?deodorant' },
     { id: 'i2', name: 'ARROM', price: '120', category: 'insecticides', image: 'https://source.unsplash.com/600x600/?deodorant' },
     { id: 'i3', name: 'DRAGON MOSQUITO', price: '110', category: 'insecticides', image: 'https://source.unsplash.com/600x600/?deodorant' },
     { id: 'i4', name: 'BAYGON AEROSOL GROS 600ML', price: '810', category: 'insecticides', image: 'https://source.unsplash.com/600x600/?deodorant' },
     { id: 'i5', name: 'BAYGON AEROSOL MOY 400ML', price: '610', category: 'insecticides', image: 'https://source.unsplash.com/600x600/?deodorant' },
     { id: 'i6', name: 'Dragon', price: '100', category: 'insecticides', image: 'https://source.unsplash.com/600x600/?deodorant' },
     { id: 'i7', name: 'BAYGON AEROSOL 285ML', price: '500', category: 'insecticides', image: 'https://source.unsplash.com/600x600/?deodorant' },

     // Hygiène
    { id: 'h2', name: 'ROYAL SISTER 240 mm', price: 130, category: 'hygiene', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400' },
    { id: 'h3', name: 'ACTIMED (SERVIETTES COTON)', price: 125, category: 'hygiene', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400' },
    { id: 'h4', name: 'CAMEO (SUPER SOFT) 11 cm', price: 75, category: 'hygiene', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400' },
    { id: 'h5', name: 'LIA', price: 115, category: 'hygiene', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400' },
    { id: 'h6', name: 'MISTOLINE (CAMPOS DE FLORES NU) 770 ml', price: 335, category: 'hygiene', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400' },
    { id: 'h7', name: 'MISTOLINE (ROCIO DE LAVANDA LA) 770 ml', price: 335, category: 'hygiene', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400' },
    { id: 'h8', name: 'BUBBLY BABY WIPES', price: 230, category: 'hygiene', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400' },
    { id: 'h9', name: 'GLADE', price: 520, category: 'hygiene', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400' },
    { id: 'h10', name: 'MYRA (FRESH CARROT)', price: 50, category: 'hygiene', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400' },
    { id: 'h11', name: 'GLORY (UITRA SOFT) 10 cm', price: 75, category: 'hygiene', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400' },
    { id: 'h12', name: 'SANOGYL SOIN GLOBAL', price: 900, category: 'hygiene', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400' },
    { id: 'h13', name: 'ORAL TOTAL (TOOTHBRUSH)', price: 40, category: 'hygiene', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400' },
    { id: 'h14', name: 'ACTIMED(SERVIETTES)', price: 125, category: 'hygiene', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400' },
    { id: 'h15', name: 'BOBEBE BABY WIPES', price: 225, category: 'hygiene', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400' },
    { id: 'h16', name: 'Manusol hand sanitizer gel', price: 275, category: 'hygiene', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400' },
    { id: 'h17', name: 'BABOU 50/M 50/ M', price: 900, category: 'hygiene', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400' },
    { id: 'h18', name: 'SENSITIVE & SOFT', price: 210, category: 'hygiene', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400' },
    { id: 'h19', name: 'Vitrex 128 FL oz', price: 800, category: 'hygiene', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400' },
    { id: 'h20', name: 'LEXI BABY WIPES', price: 165, category: 'hygiene', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400' },
    { id: 'h21', name: 'BABOU 50/S', price: 900, category: 'hygiene', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400' },
    { id: 'h22', name: 'Kleen 1 gallon', price: 950, category: 'hygiene', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400' },
    { id: 'h23', name: 'AJAX', price: 270, category: 'hygiene', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400' },
    { id: 'h24', name: 'Caryl orange 1 gallon', price: 950, category: 'hygiene', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400' },
    { id: 'h25', name: 'BABOU 50/L', price: 900, category: 'hygiene', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400' },
    { id: 'h26', name: 'Caryl 1 gallon', price: 950, category: 'hygiene', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400' },
    { id: 'h27', name: 'KOTEX LIA ASSORTIS', price: 115, category: 'hygiene', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400' },
    { id: 'h28', name: 'Irish spring assorti', price: 395, category: 'hygiene', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400' },
    { id: 'h29', name: 'Irish Spring', price: 135, category: 'hygiene', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400' },
    { id: 'h30', name: 'SWAVITEL', price: 435, category: 'hygiene', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400' },
    { id: 'h31', name: 'Kotex Actimed', price: 125, category: 'hygiene', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400' },
    { id: 'h32', name: 'ACTIMED (DOUCEUR COTON XXXL 24) 17 kg', price: 1000, category: 'hygiene', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400' },
    { id: 'h33', name: 'Balsamine floral', price: 500, category: 'hygiene', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400' },
    { id: 'h34', name: 'Balsamine cherry 1 gallon', price: 500, category: 'hygiene', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400' },
    { id: 'h35', name: 'ACTIMED(BEBE DOUCEUR COTON L 32 9-14 KG', price: 1000, category: 'hygiene', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400' },
    { id: 'h36', name: 'KOTEX ACTIMED MAXI LONGUES', price: 125, category: 'hygiene', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400' },
   
    // Bijoux
    { id: 'b1', name: 'Jeu De Chaine ', price: 250.00, category: 'bijoux', image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400' },
    { id: 'b2', name: 'CHAINE STAINLESS ASSORTI ', price: 400.00, category: 'bijoux', image: 'https://images.unsplash.com/photo-1523677011781-c91d1bbe2f0e?w=400' },
    { id: 'b3', name: 'CHAINE STAINLESS ASSORTI', price: 750.00, category: 'bijoux', image: 'Pr_cos/florida.JPg'},
    { id: 'b4', name: 'Montre Assorti', price: 600.00, category: 'bijoux', image: 'Pr_cos/florida.JPg'},
    { id: 'b5', name: 'Jeu de Montre Noir Femme ', price: 1000.00, category: 'bijoux', image: 'Pr_cos/florida.JPg'},
    { id: 'b6', name: 'Jeu de Montre Rouge Femme', price: 1000.00, category: 'bijoux', image: 'Pr_cos/florida.JPg'},
    { id: 'b7', name: 'Jeu de Montre Beige Homme ', price: 1750.00, category: 'bijoux', image: 'Pr_cos/florida.JPg'},
    { id: 'b8', name: 'Jeu de Montre Beige Femme ', price: 1750.00, category: 'bijoux', image: 'Pr_cos/florida.JPg'},
    { id: 'b9', name: 'Montre homme ', price: 1750.00, category: 'bijoux', image: 'Pr_cos/florida.JPg'},
    { id: 'b10', name: 'Montre femme ', price: 1000.00, category: 'bijoux', image: 'Pr_cos/florida.JPg'},
    { id: 'b11', name: 'Montre Stainless femme ', price: 1750.00, category: 'bijoux', image: 'Pr_cos/florida.JPg'},

    // Produits ménagers
    { id: 'm1', name: 'PAPIA TOWEL PAPER', price: 310.00, category: 'menagers', image: 'https://via.placeholder.com/400' },
    { id: 'm2', name: 'ANA PAPIER', price: 50.00, category: 'menagers', image: 'https://via.placeholder.com/400' },
    { id: 'm3', name: 'SORBETES', price: 250.00, category: 'menagers', image: 'https://via.placeholder.com/400' },
    { id: 'm4', name: 'CAMEO(SERVIETTES DE TABLE) 33 cm', price: 75.00, category: 'menagers', image: 'https://via.placeholder.com/400' },
    { id: 'm5', name: 'GOOD FORTUNE INCENSE STICKS', price: 175.00, category: 'menagers', image: 'https://via.placeholder.com/400' },
    { id: 'm6', name: 'LOTUS INCENSE STICKS', price: 175.00, category: 'menagers', image: 'https://via.placeholder.com/400' },
    { id: 'm7', name: 'CLOROX BON COEUR GROS', price: 350.00, category: 'menagers', image: 'https://via.placeholder.com/400' },
    { id: 'm8', name: 'PLATEAU ALUMINIUM', price: 125.00, category: 'menagers', image: 'https://via.placeholder.com/400' },
    { id: 'm9', name: 'WHITE ROSE INCENSE STICKS', price: 175.00, category: 'menagers', image: 'https://via.placeholder.com/400' },
    { id: 'm10', name: 'AMBER-SANDAL INCENSE STICKS', price: 175.00, category: 'menagers', image: 'https://via.placeholder.com/400' },
    { id: 'm11', name: 'MONEY DRAWING INCENSE STICKS', price: 175.00, category: 'menagers', image: 'https://via.placeholder.com/400' },
    { id: 'm12', name: 'POSITIVE VIBES INCENSE STICKS', price: 175.00, category: 'menagers', image: 'https://via.placeholder.com/400' },
    { id: 'm13', name: 'FRANKINCENSE INCENSE STICKS', price: 175.00, category: 'menagers', image: 'https://via.placeholder.com/400' },
    { id: 'm14', name: 'ATTRACTS MONEY INCENSE STICKS', price: 175.00, category: 'menagers', image: 'https://via.placeholder.com/400' },
    { id: 'm15', name: 'PRECIOUS FLOWERS INCENSE', price: 175.00, category: 'menagers', image: 'https://via.placeholder.com/400' },
    { id: 'm16', name: 'MONEY HOUSE INCENSE STICKS', price: 175.00, category: 'menagers', image: 'https://via.placeholder.com/400' },
    { id: 'm17', name: 'FRANKINCENSE-MYRRH INCENSE STIC', price: 175.00, category: 'menagers', image: 'https://via.placeholder.com/400' },
    { id: 'm18', name: 'GINGER INCENSE STICKS', price: 175.00, category: 'menagers', image: 'https://via.placeholder.com/400' },
    { id: 'm19', name: 'PATCHOULI INCENSE STICKS', price: 175.00, category: 'menagers', image: 'https://via.placeholder.com/400' },
    { id: 'm20', name: 'CALL CLIENT INCENSE STICKS', price: 175.00, category: 'menagers', image: 'https://via.placeholder.com/400' },
    { id: 'm21', name: 'MILFLORES INCENSE STICKS', price: 175.00, category: 'menagers', image: 'https://via.placeholder.com/400' },
    { id: 'm22', name: 'LASAGNA MILANO 400G', price: 345.00, category: 'menagers', image: 'https://via.placeholder.com/400' },
    { id: 'm23', name: 'SANDAL-ROSE INCENSE STICKS', price: 175.00, category: 'menagers', image: 'https://via.placeholder.com/400' },
    { id: 'm24', name: 'SAINT BENOIT INCENSE STICKS', price: 175.00, category: 'menagers', image: 'https://via.placeholder.com/400' },
    { id: 'm25', name: 'BUGS CANGLE GLASS 200', price: 500.00, category: 'menagers', image: 'https://via.placeholder.com/400' },
    { id: 'm26', name: 'LOVE & SEX INCENSE STICKS', price: 175.00, category: 'menagers', image: 'https://via.placeholder.com/400' },
    { id: 'm27', name: 'CITRONELLA (CANDLE) 99 g', price: 410.00, category: 'menagers', image: 'https://via.placeholder.com/400' },
    { id: 'm28', name: 'GOOD LUCK INCENSE STICKS', price: 175.00, category: 'menagers', image: 'https://via.placeholder.com/400' },
    { id: 'm29', name: 'PRECIOUS INCENSE LAVANDES', price: 175.00, category: 'menagers', image: 'https://via.placeholder.com/400' },
    { id: 'm30', name: 'DEKA (GOBELETS EN PLASTIQUE) 5 OZ', price: 135.00, category: 'menagers', image: 'https://via.placeholder.com/400' },
    { id: 'm31', name: 'OUR LADY OF ALTAGRACIA', price: 500.00, category: 'menagers', image: 'https://via.placeholder.com/400' },
    { id: 'm32', name: 'KLERE PAILLE DE FER', price: 120.00, category: 'menagers', image: 'https://via.placeholder.com/400' },
    { id: 'm33', name: 'ALLUMETTES LAHSA', price: 50.00, category: 'menagers', image: 'https://via.placeholder.com/400' },
    { id: 'm34', name: 'ALLUMETTES', price: 65.00, category: 'menagers', image: 'https://via.placeholder.com/400' },
    { id: 'm35', name: 'DRAGON', price: 100.00, category: 'menagers', image: 'https://via.placeholder.com/400' },
    { id: 'm36', name: 'ROLAND CURE DENT', price: 325.00, category: 'menagers', image: 'https://via.placeholder.com/400' },
    { id: 'm37', name: 'Paquet Sachet Thank You', price: 310.00, category: 'menagers', image: 'https://via.placeholder.com/400' },
    { id: 'm38', name: 'CAISSE SACHET THANK YOU', price: 2870.00, category: 'menagers', image: 'https://via.placeholder.com/400' },
    { id: 'm39', name: 'SAC SUCRE SACCA', price: 4000.00, category: 'menagers', image: 'https://via.placeholder.com/400' },
    { id: 'm40', name: 'BALLE PAPIER CAMEO', price: 3025.00, category: 'menagers', image: 'https://via.placeholder.com/400' },
    { id: 'm41', name: 'CAISSE TOWEL', price: 3025.00, category: 'menagers', image: 'https://via.placeholder.com/400' },
    { id: 'm42', name: 'BALLE NAPKIN CAMEO', price: 1285.00, category: 'menagers', image: 'https://via.placeholder.com/400' },
    { id: 'm43', name: 'RED CUP', price: 400.00, category: 'menagers', image: 'https://via.placeholder.com/400' },
    { id: 'm44', name: 'GREEN CUP 12 OZ', price: 390.00, category: 'menagers', image: 'https://via.placeholder.com/400' },
    { id: 'm45', name: 'CHEF BINI SPOON', price: 50.00, category: 'menagers', image: 'https://via.placeholder.com/400' },
    { id: 'm46', name: 'GOBELETS PLASTIQUE 7oz', price: 135.00, category: 'menagers', image: 'https://via.placeholder.com/400' },
    { id: 'm47', name: 'ASSIETTE PLASTIQUE', price: 200.00, category: 'menagers', image: 'https://via.placeholder.com/400' },
    { id: 'm48', name: 'ALLUMETTES', price: 65.00, category: 'menagers', image: 'https://via.placeholder.com/400' },
    { id: 'm49', name: 'GOBLETS DEKA 50*5', price: 135.00, category: 'menagers', image: 'https://via.placeholder.com/400' },
    { id: 'm50', name: 'ALUMINIUM FOIL', price: 210.00, category: 'menagers', image: 'https://via.placeholder.com/400' },
    { id: 'm51', name: 'TOWEL PAPIA', price: 310.00, category: 'menagers', image: 'https://via.placeholder.com/400' },
   
    //Tabac,Cigares,Chicha 
    { id: 't1', name: 'HENRY CHRISTOPHE CIGAR', price: 2000.00, category: 'tabac', image: 'https://via.placeholder.com/400' },
    { id: 't2', name: 'OGOU CIGARE', price: 2000.00, category: 'tabac', image: 'https://via.placeholder.com/400' },
    { id: 't3', name: 'PAPA DOC CIGAR', price: 2000.00, category: 'tabac', image: 'https://via.placeholder.com/400' },
    { id: 't4', name: 'CIGA AL FAKHER ', price: 345.00, category: 'tabac', image: 'https://via.placeholder.com/400' },
    
    //Cartes de vœux
    { id: 'v1', name: 'CARTES CADEAUX ASSORTIS ', price: 200.00, category: 'cartes', image: 'https://via.placeholder.com/400' },
 
    //Paniers cadeaux
    { id: 'n1', name: 'Valise Cadeau Petit', price: 120.00, category: 'paniers', image: 'https://via.placeholder.com/400' },
    { id: 'n2', name: 'Valise Cadeau Gros', price: 310.00, category: 'paniers', image: 'https://via.placeholder.com/400' },
    { id: 'n3', name: 'Valise Cadeau Moyen', price: 170.00, category: 'paniers', image: 'https://via.placeholder.com/400' },
    { id: 'n4', name: 'Valise Cadeau ', price: 210.00, category: 'paniers', image: 'https://via.placeholder.com/400' },
    { id: 'n5', name: 'SAC VIN ASSORTI', price: 200.00, category: 'paniers', image: 'https://via.placeholder.com/400' },
    { id: 'n6', name: 'SAC VIN GRIS', price: 200.00, category: 'paniers', image: 'https://via.placeholder.com/400' },

   //Maji
    { id: 'mj1', name: 'Saint Antoine De Pardoue', price: 185.00, category: 'maji', image: 'saintantoinedepadoue.PNG' },
    { id: 'mj2', name: 'Cierge Saint Benoit ', price: 370.00, category: 'maji', image: 'saintbeoit.PNG' },
    { id: 'mj3', name: 'Cierge Saint Michel Archange', price: 185.00, category: 'maji', image: 'https://source.unsplash.com/600x600/?perfume' },
    { id: 'mj4', name: 'CIERGE IMMACULE CONCEPTION  ', price: 185.00, category: 'maji', image: 'imakileconception.PNG' },
    { id: 'mj5', name: 'SAINT JOSEPH', price: 185.00, category: 'maji', image: 'saintjozef.PNG' },
    { id: 'mj6', name: 'Saint Anne ', price: 185.00, category: 'maji', image: 'Saintanne.PNG' },
    { id: 'mj7', name: 'NOTRE DAME DU PERPETUEL SECOURS ', price: 370.00, category: 'maji', image: 'notredamealtaga.PNG' },
    { id: 'mj8', name: 'Saint Anne ', price: 370.00, category: 'maji', image: 'Saintanne.PNG' },
    { id: 'mj9', name: 'CIERGE SENORA PERPETUO ', price: 185.00, category: 'maji', image: 'https://source.unsplash.com/600x600/?perfume' },  
    { id: 'mj10', name: 'PRAIUSI SUPER DELUXE ', price: 40.00, category: 'maji', image: 'https://source.unsplash.com/600x600/?perfume' },
    { id: 'mj11', name: 'BAIDER (MAX)', price: .0030, category: 'maji', image: 'https://source.unsplash.com/600x600/?perfume' },
    { id: 'mj12', name: 'MAGIC LIGHT IMMACULEE CONCEPTION ', price: 500.00, category: 'maji', image: 'https://source.unsplash.com/600x600/?perfume' },
    { id: 'mj13', name: 'MAGIC LIGHT (BLANC) 100 g ', price: 135.00, category: 'maji', image: 'https://source.unsplash.com/600x600/?perfume' },
    { id: 'mj14', name: 'MAGIC LIGHT (BLEU) 100 g ', price: 135.00, category: 'maji', image: 'https://source.unsplash.com/600x600/?perfume' },
    { id: 'mj15', name: 'MAGIC LIGHT (ROUGE) 100 g ', price: 135.00, category: 'maji', image: 'https://source.unsplash.com/600x600/?perfume' },
    { id: 'mj16', name: 'MAGIC LIGHT (EMERGENCY 4C) 248g ', price: 180.00, category: 'maji', image: 'https://source.unsplash.com/600x600/?perfume' },
    { id: 'mj17', name: 'MAGIC LIGHT (EMERGENCY 12C) 192 g ', price: 180.00, category: 'maji', image: 'https://source.unsplash.com/600x600/?perfume' },
    { id: 'mj18', name: 'SACRE COEUR DE JESUS', price: 365.00, category: 'maji', image: 'https://source.unsplash.com/600x600/?perfume' },
    










];

// Fix broken image URLs: replace source.unsplash.com with working Unsplash photo URLs
const categoryDefaults = {
    'alimentaires': 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400&h=400',
    'cosmetiques': 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400',
    'glaces': 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&h=400',
    'menagers': 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400&h=400',
    'lessive': 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400&h=400',
    'parfums': 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400',
    'hygiene': 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400',
    'maji': 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=400',
    'bebe': 'https://images.unsplash.com/photo-1619045207244-5a4fdecc9616?w=400&h=400',
    'kits': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400',
    'poissonnerie': 'https://images.unsplash.com/photo-1637679242615-0ddbbb34b7d7?w=400&h=400'
};

products.forEach(p => {
    if (p && p.image && p.image.includes('source.unsplash.com')) {
        p.image = categoryDefaults[p.category] || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400';
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    navigateTo('home');
});

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
    return `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
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
    localStorage.setItem('marketCart', JSON.stringify(cart));
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
    localStorage.setItem('selectedPaymentMethod', method);
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
    message += `Merci! 🙏`;
    
    window.open(`https://wa.me/50942936443?text=${encodeURIComponent(message)}`, '_blank');
    
    // Clear cart after order
    setTimeout(() => {
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
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


