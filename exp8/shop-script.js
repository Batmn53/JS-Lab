const products = [
    { id: 1, name: "Wireless Noise-Cancelling Headphones", price: 299.99, category: "electronics", rating: 4.8, icon: "fa-headphones" },
    { id: 2, name: "Minimalist Leather Watch", price: 149.50, category: "accessories", rating: 4.5, icon: "fa-stopwatch" },
    { id: 3, name: "Smart Home Security Camera", price: 89.99, category: "electronics", rating: 4.2, icon: "fa-video" },
    { id: 4, name: "Organic Cotton T-Shirt", price: 24.99, category: "fashion", rating: 4.7, icon: "fa-tshirt" },
    { id: 5, name: "Ceramic Pour-Over Coffee Maker", price: 45.00, category: "home", rating: 4.9, icon: "fa-mug-hot" },
    { id: 6, name: "Classic Aviator Sunglasses", price: 120.00, category: "accessories", rating: 4.4, icon: "fa-glasses" },
    { id: 7, name: "Ergonomic Office Chair", price: 349.00, category: "home", rating: 4.6, icon: "fa-chair" },
    { id: 8, name: "Waterproof Hiking Boots", price: 189.95, category: "fashion", rating: 4.8, icon: "fa-shoe-prints" },
    { id: 9, name: "4K Ultra HD Smart TV", price: 899.00, category: "electronics", rating: 4.7, icon: "fa-tv" },
    { id: 10, name: "Aromatherapy Essential Oil Diffuser", price: 34.50, category: "home", rating: 4.3, icon: "fa-fan" }
];

document.addEventListener('DOMContentLoaded', () => {
    const productsGrid = document.getElementById('productsGrid');
    const searchInput = document.getElementById('searchInput');
    const categoryRadios = document.querySelectorAll('input[name="category"]');
    const minPriceInput = document.getElementById('minPrice');
    const maxPriceInput = document.getElementById('maxPrice');
    const applyPriceBtn = document.getElementById('applyPriceBtn');
    const sortSelect = document.getElementById('sortSelect');
    const resultCount = document.getElementById('resultCount');
    const cartBadge = document.querySelector('.badge');

    let currentProducts = [...products];
    let cartCount = 0;

    // Initialize
    renderProducts(currentProducts);

    // Event Listeners
    searchInput.addEventListener('input', applyFilters);
    categoryRadios.forEach(radio => radio.addEventListener('change', applyFilters));
    applyPriceBtn.addEventListener('click', applyFilters);
    sortSelect.addEventListener('change', applyFilters);

    function applyFilters() {
        // 1. Search Filter
        const searchTerm = searchInput.value.toLowerCase();
        let filtered = products.filter(p => p.name.toLowerCase().includes(searchTerm));

        // 2. Category Filter
        const selectedCategory = document.querySelector('input[name="category"]:checked').value;
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(p => p.category === selectedCategory);
        }

        // 3. Price Filter
        const minPrice = parseFloat(minPriceInput.value);
        const maxPrice = parseFloat(maxPriceInput.value);
        
        if (!isNaN(minPrice)) {
            filtered = filtered.filter(p => p.price >= minPrice);
        }
        if (!isNaN(maxPrice)) {
            filtered = filtered.filter(p => p.price <= maxPrice);
        }

        // 4. Sorting
        const sortValue = sortSelect.value;
        if (sortValue === 'price-low') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortValue === 'price-high') {
            filtered.sort((a, b) => b.price - a.price);
        } else if (sortValue === 'name-a-z') {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        } else {
            // 'featured' - sort by rating as a proxy for featured
            filtered.sort((a, b) => b.rating - a.rating);
        }

        currentProducts = filtered;
        renderProducts(currentProducts);
    }

    function renderProducts(productsToRender) {
        productsGrid.innerHTML = '';
        resultCount.textContent = `Showing ${productsToRender.length} products`;

        if (productsToRender.length === 0) {
            productsGrid.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-box-open"></i>
                    <h2>No products found</h2>
                    <p>Try adjusting your filters or search query.</p>
                </div>
            `;
            return;
        }

        productsToRender.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';

            const stars = getStars(product.rating);

            card.innerHTML = `
                <div class="product-image">
                    <div class="category-tag">${capitalizeFirst(product.category)}</div>
                    <i class="fas ${product.icon}"></i>
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-rating">
                        ${stars}
                        <span>(${product.rating})</span>
                    </div>
                    <div class="product-bottom">
                        <div class="product-price">$${product.price.toFixed(2)}</div>
                        <button class="add-btn" title="Add to Cart">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
            `;
            
            const addBtn = card.querySelector('.add-btn');
            addBtn.addEventListener('click', () => {
                cartCount++;
                cartBadge.textContent = cartCount;
                
                // Visual feedback
                addBtn.innerHTML = '<i class="fas fa-check"></i>';
                addBtn.style.backgroundColor = 'var(--accent)';
                setTimeout(() => {
                    addBtn.innerHTML = '<i class="fas fa-plus"></i>';
                    addBtn.style.backgroundColor = '';
                }, 1000);
            });

            productsGrid.appendChild(card);
        });
    }

    function getStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let starsHTML = '';
        
        for (let i = 0; i < fullStars; i++) {
            starsHTML += '<i class="fas fa-star"></i>';
        }
        if (hasHalfStar) {
            starsHTML += '<i class="fas fa-star-half-alt"></i>';
        }
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) {
            starsHTML += '<i class="far fa-star"></i>';
        }
        return starsHTML;
    }

    function capitalizeFirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
});
