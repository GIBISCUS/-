// ============================================
// BookMaster — КНИЖНЫЙ ИНТЕРНЕТ-МАГАЗИН
// Файл: script.js
// ============================================

// ============================================
// БАЗА ДАННЫХ (JSON)
// ============================================

let database = {
    books: [
        { id: 1, title: "1984", author: "Джордж Оруэлл", author_bio: "Джордж Оруэлл (1903-1950) — английский писатель и публицист, известный своими антиутопическими романами.", genre: "Классика", price: 450, rating: 4.8, year: 1949, description: "«1984» — культовый роман-антиутопия о тоталитарном обществе будущего.", cover: "https://ir.ozone.ru/s3/multimedia-t/6864042989.jpg" },
        { id: 2, title: "Дюна", author: "Фрэнк Герберт", author_bio: "Фрэнк Герберт (1920-1986) — американский писатель-фантаст.", genre: "Фантастика", price: 690, rating: 4.9, year: 1965, description: "«Дюна» — эпическая сага о пустынной планете Арракис.", cover: "https://avatars.mds.yandex.net/get-mpic/4544069/2a00000190eff1f51f1359e523c7bbe8ce84/orig" },
        { id: 3, title: "Преступление и наказание", author: "Фёдор Достоевский", author_bio: "Фёдор Михайлович Достоевский (1821-1881) — великий русский писатель.", genre: "Классика", price: 390, rating: 4.9, year: 1866, description: "Роман о студенте Раскольникове и его теории о праве на кровь.", cover: "https://avatars.mds.yandex.net/get-mpic/12554399/2a0000019216b9b71ba774d3f3ed0269e38f/orig" },
        { id: 4, title: "Тень ветра", author: "Карлос Руис Сафон", author_bio: "Карлос Руис Сафон (1964-2020) — испанский писатель.", genre: "Детектив", price: 530, rating: 4.7, year: 2001, description: "Мистический детектив о тайнах забытых книг.", cover: "https://bookmix.ru/reviews/images/0/4/1/reviews_1605370682.jpg" },
        { id: 5, title: "Игра престолов", author: "Джордж Мартин", author_bio: "Джордж Мартин — создатель «Песни льда и огня».", genre: "Фэнтези", price: 1200, rating: 4.8, year: 1996, description: "Борьба за Железный трон Вестероса.", cover: "https://ndc.book24.ru/resize/820x1180/pim/products/images/50/ba/0199e9e7-4a12-7812-bb07-79957cd050ba.jpg" },
        { id: 6, title: "Атлант расправил плечи", author: "Айн Рэнд", author_bio: "Айн Рэнд (1905-1982) — философ и писатель.", genre: "Бизнес", price: 890, rating: 4.5, year: 1957, description: "Философский роман о свободе и капитализме.", cover: "https://avatars.mds.yandex.net/get-mpic/16390348/2a0000019c0ada22388c8168f41868641b72/orig" },
        { id: 7, title: "Стартап", author: "Эрик Рис", author_bio: "Эрик Рис — автор «Бережливого стартапа».", genre: "Бизнес", price: 1100, rating: 4.4, year: 2011, description: "Методология создания успешных продуктов.", cover: "https://alpinabook.ru/upload/resize_cache/converted/90/iblock/78f/759_960_1/78f9ee63a53525d6566aed4a769db65e.jpg.webp" },
        { id: 8, title: "Убить пересмешника", author: "Харпер Ли", author_bio: "Харпер Ли (1926-2016) — американская писательница.", genre: "Классика", price: 470, rating: 4.7, year: 1960, description: "Роман о расовой справедливости.", cover: "https://storage.yandexcloud.net/colorlon-prod/PICS/C7D9E8B6-8562-11EF-AD22-003048FBFCC9.jpg" },
        { id: 9, title: "Солярис", author: "Станислав Лем", author_bio: "Станислав Лем (1921-2006) — польский фантаст.", genre: "Фантастика", price: 610, rating: 4.6, year: 1961, description: "О встрече с живым океаном.", cover: "https://basket-35.wbbasket.ru/vol7569/part756920/756920084/images/big/1.webp" },
        { id: 10, title: "Тайная история", author: "Донна Тартт", author_bio: "Донна Тартт — лауреат Пулитцеровской премии.", genre: "Детектив", price: 780, rating: 4.8, year: 1992, description: "О группе студентов, увлечённых ритуалами.", cover: "https://avatars.mds.yandex.net/get-mpic/1567763/2a000001918740eaa7e6c8cce7af0449b33d/orig" }
    ],
    users: [
        { id: 1, name: "Администратор", email: "admin@bookmaster.ru", password: "admin123", role: "admin", phone: "", address: "", created_at: "2025-01-01" },
        { id: 2, name: "Иван Петров", email: "user@test.ru", password: "123", role: "user", phone: "+7 (999) 123-45-67", address: "г. Москва, ул. Книжная, д. 1", created_at: "2025-01-15" }
    ],
    orders: [],
    favorites: [],
    reviews: [],
    stats: { total_visits: 0, total_sales: 0, total_books_sold: 0 }
};

// ============================================
// ЗАГРУЗКА ДАННЫХ ИЗ LOCALSTORAGE
// ============================================

let loadedData = localStorage.getItem('bookmaster_database');
if (loadedData) {
    try {
        let parsed = JSON.parse(loadedData);
        if (parsed.books && parsed.users) {
            database = parsed;
        }
    } catch(e) {}
} else {
    localStorage.setItem('bookmaster_database', JSON.stringify(database));
}

// Вспомогательные переменные
let books = database.books;
let users = database.users;
let orders = database.orders;
let favorites = database.favorites;
let reviews = database.reviews;

let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// ============================================
// СОХРАНЕНИЕ ДАННЫХ
// ============================================

function saveDatabase() {
    database.books = books;
    database.users = users;
    database.orders = orders;
    database.favorites = favorites;
    database.reviews = reviews;
    localStorage.setItem('bookmaster_database', JSON.stringify(database));
}

function saveAllData() {
    saveDatabase();
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    localStorage.setItem('cart', JSON.stringify(cart));
}

// ============================================
// ГЛАВНАЯ СТРАНИЦА
// ============================================

function showMainPage() {
    const mainContent = document.getElementById('mainContent');
    
    mainContent.innerHTML = `
        <div class="container main-layout">
            <aside class="filters">
                <h3>Фильтры</h3>
                <div class="filter-group"><label>Жанр</label><select id="genreFilter"><option value="all">Все</option></select></div>
                <div class="filter-group"><label>Автор</label><select id="authorFilter"><option value="all">Все</option></select></div>
                <div class="filter-group"><label>Цена (до)</label><input type="number" id="priceMax" placeholder="Макс. цена" value="2000"></div>
                <button id="resetFilters" style="background:#aaa;">Сбросить</button>
            </aside>
            <div class="catalog">
                <div class="sort-bar">
                    <span>📖 Найдено: <span id="resultsCount">0</span> книг</span>
                    <select id="sortSelect" class="sort-select">
                        <option value="default">Сортировка</option>
                        <option value="price_asc">Цена ▲</option>
                        <option value="price_desc">Цена ▼</option>
                    </select>
                </div>
                <div class="books-grid" id="booksGrid"></div>
            </div>
        </div>
    `;
    
    loadFilters();
    filterAndSortBooks();
    attachFilterEvents();
}

function attachFilterEvents() {
    const searchBtn = document.getElementById('searchBtn');
    const genreFilter = document.getElementById('genreFilter');
    const authorFilter = document.getElementById('authorFilter');
    const priceMax = document.getElementById('priceMax');
    const sortSelect = document.getElementById('sortSelect');
    const resetBtn = document.getElementById('resetFilters');
    
    if (searchBtn) {
        const newSearchBtn = searchBtn.cloneNode(true);
        searchBtn.parentNode.replaceChild(newSearchBtn, searchBtn);
        newSearchBtn.onclick = filterAndSortBooks;
    }
    
    if (genreFilter) genreFilter.onchange = filterAndSortBooks;
    if (authorFilter) authorFilter.onchange = filterAndSortBooks;
    if (priceMax) priceMax.oninput = filterAndSortBooks;
    if (sortSelect) sortSelect.onchange = filterAndSortBooks;
    if (resetBtn) resetBtn.onclick = () => {
        if (genreFilter) genreFilter.value = 'all';
        if (authorFilter) authorFilter.value = 'all';
        if (priceMax) priceMax.value = '2000';
        const searchInput = document.getElementById('searchInput');
        if (searchInput) searchInput.value = '';
        filterAndSortBooks();
    };
}

function loadFilters() {
    const genres = [...new Set(books.map(b => b.genre))];
    const genreSelect = document.getElementById('genreFilter');
    if (genreSelect) {
        genreSelect.innerHTML = '<option value="all">Все</option>';
        genres.forEach(g => { const opt = document.createElement('option'); opt.value = g; opt.textContent = g; genreSelect.appendChild(opt); });
    }
    
    const authors = [...new Set(books.map(b => b.author))];
    const authorSelect = document.getElementById('authorFilter');
    if (authorSelect) {
        authorSelect.innerHTML = '<option value="all">Все</option>';
        authors.forEach(a => { const opt = document.createElement('option'); opt.value = a; opt.textContent = a; authorSelect.appendChild(opt); });
    }
}

function filterAndSortBooks() {
    const searchInput = document.getElementById('searchInput');
    const search = searchInput ? searchInput.value.toLowerCase() : '';
    const genre = document.getElementById('genreFilter')?.value || 'all';
    const author = document.getElementById('authorFilter')?.value || 'all';
    const maxPrice = parseFloat(document.getElementById('priceMax')?.value) || Infinity;

    let filtered = books.filter(b => {
        if (search && !b.title.toLowerCase().includes(search) && !b.author.toLowerCase().includes(search)) return false;
        if (genre !== 'all' && b.genre !== genre) return false;
        if (author !== 'all' && b.author !== author) return false;
        if (b.price > maxPrice) return false;
        return true;
    });

    const sort = document.getElementById('sortSelect')?.value;
    if (sort === 'price_asc') filtered.sort((a,b) => a.price - b.price);
    if (sort === 'price_desc') filtered.sort((a,b) => b.price - a.price);

    const resultsCount = document.getElementById('resultsCount');
    if (resultsCount) resultsCount.innerText = filtered.length;
    
    const grid = document.getElementById('booksGrid');
    if (!grid) return;
    if (filtered.length === 0) { grid.innerHTML = '<div style="padding:2rem;">Книги не найдены</div>'; return; }

    const userFavorites = currentUser ? favorites.filter(f => f.user_id === currentUser.id).map(f => f.book_id) : [];

    grid.innerHTML = filtered.map(book => `
        <div class="book-card" onclick="showBookDetail(${book.id})">
            <div class="book-cover" style="background-image: url('${book.cover || 'https://via.placeholder.com/260x260?text=📚'}');">
                ${!book.cover ? '📖' : ''}
            </div>
            <div class="book-info">
                <div class="book-title">${book.title}</div>
                <div class="book-author">${book.author} ⭐ ${book.rating}</div>
                <div class="book-price">${book.price} ₽</div>
                <button class="add-to-cart" onclick="event.stopPropagation(); addToCart({id:${book.id},title:'${book.title.replace(/'/g, "\\'")}',price:${book.price},cover:'${book.cover}'})">В корзину</button>
                <button class="favorite-btn ${userFavorites.includes(book.id) ? 'active' : ''}" onclick="event.stopPropagation(); toggleFavorite(${book.id})">❤️ ${userFavorites.includes(book.id) ? 'В избранном' : 'В избранное'}</button>
            </div>
        </div>
    `).join('');
}

// ============================================
// ДЕТАЛЬНАЯ СТРАНИЦА КНИГИ
// ============================================

function showBookDetail(bookId) {
    const book = books.find(b => b.id === bookId);
    if (!book) return;
    
    const bookReviews = reviews.filter(r => r.book_id === bookId);
    const userFavorites = currentUser ? favorites.filter(f => f.user_id === currentUser.id).map(f => f.book_id) : [];
    const isFavorite = userFavorites.includes(bookId);
    
    document.getElementById('mainContent').innerHTML = `
        <div class="container">
            <button class="btn-back" onclick="showMainPage()">← Назад к каталогу</button>
            <div class="book-detail">
                <div class="book-detail-grid">
                    <div class="book-detail-cover" style="background-image: url('${book.cover || 'https://via.placeholder.com/300x400?text=No+Cover'}');"></div>
                    <div class="book-detail-info">
                        <h1>${book.title}</h1>
                        <div class="book-detail-author">${book.author} (${book.year})</div>
                        <div class="book-detail-rating">⭐ ${book.rating} / 5 (${bookReviews.length} отзывов)</div>
                        <div class="book-detail-price">${book.price} ₽</div>
                        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                            <button onclick="addToCart({id:${book.id},title:'${book.title.replace(/'/g, "\\'")}',price:${book.price},cover:'${book.cover}'})">🛒 В корзину</button>
                            <button class="favorite-btn ${isFavorite ? 'active' : ''}" onclick="toggleFavoriteFromDetail(${book.id})">❤️ ${isFavorite ? 'В избранном' : 'В избранное'}</button>
                        </div>
                        
                        <div class="book-description">
                            <h3>📖 О книге</h3>
                            <p>${book.description}</p>
                        </div>
                        
                        <div class="author-bio">
                            <h3>✍️ Об авторе</h3>
                            <p>${book.author_bio}</p>
                        </div>
                    </div>
                </div>
                
                <div class="reviews-section">
                    <h3>📝 Отзывы читателей</h3>
                    <div id="bookReviewsList">
                        ${bookReviews.length === 0 ? '<p>Пока нет отзывов. Будьте первым!</p>' : 
                            bookReviews.map(review => {
                                const user = users.find(u => u.id === review.user_id);
                                return `
                                    <div class="review-card">
                                        <div class="review-author">${user?.name || 'Аноним'}</div>
                                        <div class="review-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5-review.rating)}</div>
                                        <div class="review-text">${review.comment}</div>
                                        <div class="review-date">${review.date}</div>
                                    </div>
                                `;
                            }).join('')
                        }
                    </div>
                    
                    ${currentUser ? `
                        <div class="add-review-form">
                            <h3>✍️ Оставить отзыв</h3>
                            <div class="form-group">
                                <label>Оценка</label>
                                <select id="detailReviewRating">
                                    <option value="5">⭐⭐⭐⭐⭐ 5</option>
                                    <option value="4">⭐⭐⭐⭐ 4</option>
                                    <option value="3">⭐⭐⭐ 3</option>
                                    <option value="2">⭐⭐ 2</option>
                                    <option value="1">⭐ 1</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Комментарий</label>
                                <textarea id="detailReviewComment" rows="3" placeholder="Поделитесь впечатлениями о книге..."></textarea>
                            </div>
                            <button onclick="addReviewFromDetail(${book.id})">Отправить отзыв</button>
                        </div>
                    ` : '<p style="margin-top:1rem;"><a href="#" onclick="openLoginModal(); return false;">Войдите</a>, чтобы оставить отзыв</p>'}
                </div>
            </div>
        </div>
    `;
}

function addReviewFromDetail(bookId) {
    if (!currentUser) { alert('Войдите в аккаунт'); return; }
    const rating = parseInt(document.getElementById('detailReviewRating').value);
    const comment = document.getElementById('detailReviewComment').value;
    if (!comment) { alert('Напишите комментарий'); return; }
    
    reviews.push({
        id: Date.now(),
        book_id: bookId,
        user_id: currentUser.id,
        rating: rating,
        comment: comment,
        date: new Date().toISOString().split('T')[0]
    });
    saveAllData();
    
    const bookReviews = reviews.filter(r => r.book_id === bookId);
    const avgRating = bookReviews.reduce((sum, r) => sum + r.rating, 0) / bookReviews.length;
    const book = books.find(b => b.id === bookId);
    if (book) book.rating = Math.round(avgRating * 10) / 10;
    saveAllData();
    
    alert('Отзыв добавлен!');
    showBookDetail(bookId);
}

// ============================================
// ИЗБРАННОЕ
// ============================================

function toggleFavorite(bookId) {
    if (!currentUser) { alert('Войдите в аккаунт'); return; }
    const existingIndex = favorites.findIndex(f => f.user_id === currentUser.id && f.book_id === bookId);
    if (existingIndex === -1) {
        favorites.push({ user_id: currentUser.id, book_id: bookId });
        alert('Добавлено в избранное');
    } else {
        favorites.splice(existingIndex, 1);
        alert('Удалено из избранного');
    }
    saveAllData();
    filterAndSortBooks();
}

function toggleFavoriteFromDetail(bookId) {
    if (!currentUser) { alert('Войдите в аккаунт'); return; }
    const existingIndex = favorites.findIndex(f => f.user_id === currentUser.id && f.book_id === bookId);
    if (existingIndex === -1) {
        favorites.push({ user_id: currentUser.id, book_id: bookId });
        alert('Добавлено в избранное');
    } else {
        favorites.splice(existingIndex, 1);
        alert('Удалено из избранного');
    }
    saveAllData();
    showBookDetail(bookId);
}

// ============================================
// АВТОРИЗАЦИЯ
// ============================================

function register() {
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const phone = document.getElementById('regPhone').value;
    const address = document.getElementById('regAddress').value;
    if (!name || !email || !password) return alert('Заполните имя, email и пароль');
    if (users.find(u => u.email === email)) return alert('Пользователь уже существует');
    const newUser = { id: Date.now(), name, email, password, phone, address, role: 'user', created_at: new Date().toISOString().split('T')[0] };
    users.push(newUser);
    saveAllData();
    alert('Регистрация успешна! Теперь войдите.');
    closeModal('registerModal');
    openLoginModal();
}

function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return alert('Неверный email или пароль');
    currentUser = user;
    saveAllData();
    updateAuthUI();
    closeModal('loginModal');
    alert(`Добро пожаловать, ${user.name}!`);
    showMainPage();
}

function logout() {
    currentUser = null;
    saveAllData();
    updateAuthUI();
    showMainPage();
}

function updateAuthUI() {
    if (currentUser) {
        document.getElementById('authButtons').style.display = 'none';
        document.getElementById('userPanel').style.display = 'flex';
        document.getElementById('userNameDisplay').innerText = currentUser.name;
    } else {
        document.getElementById('authButtons').style.display = 'flex';
        document.getElementById('userPanel').style.display = 'none';
    }
    updateCartCount();
}

// ============================================
// КОРЗИНА
// ============================================

function addToCart(book) {
    if (!currentUser) { alert('Войдите в аккаунт'); return; }
    const existing = cart.find(i => i.id === book.id);
    if (existing) existing.qty++;
    else cart.push({ ...book, qty: 1 });
    saveAllData();
    updateCartCount();
    alert(`"${book.title}" добавлена в корзину`);
}

function updateCartCount() {
    const count = cart.reduce((s, i) => s + i.qty, 0);
    const cartCount = document.getElementById('cartCount');
    if (cartCount) cartCount.innerText = count;
}

function renderCartModal() {
    const container = document.getElementById('cartItemsList');
    if (cart.length === 0) {
        container.innerHTML = '<p>Корзина пуста</p>';
        document.getElementById('cartTotalAmount').innerHTML = 'Итого: 0 ₽';
        return;
    }
    let html = '', total = 0;
    cart.forEach(item => {
        total += item.price * item.qty;
        html += `<div class="cart-item"><div><strong>${item.title}</strong><br>${item.price}₽ x ${item.qty}</div><div>${item.price * item.qty}₽ <button onclick="removeFromCart(${item.id})">❌</button></div></div>`;
    });
    container.innerHTML = html;
    document.getElementById('cartTotalAmount').innerHTML = `Итого: ${total} ₽<br><button onclick="checkout()">Оформить заказ</button>`;
}

function removeFromCart(id) {
    cart = cart.filter(i => i.id !== id);
    saveAllData();
    updateCartCount();
    renderCartModal();
}

function checkout() {
    if (cart.length === 0) return alert('Корзина пуста');
    const newOrder = {
        id: orders.length + 1,
        user_id: currentUser.id,
        date: new Date().toISOString().split('T')[0],
        status: "новый",
        total: cart.reduce((sum, item) => sum + (item.price * item.qty), 0),
        items: cart.map(item => ({ book_id: item.id, title: item.title, quantity: item.qty, price: item.price }))
    };
    orders.push(newOrder);
    saveAllData();
    alert('Заказ оформлен! Спасибо за покупку!');
    cart = [];
    saveAllData();
    updateCartCount();
    closeModal('cartModal');
}

// ============================================
// ЛИЧНЫЙ КАБИНЕТ
// ============================================

function openProfileModal() {
    if (!currentUser) return;
    document.getElementById('profileName').value = currentUser.name || '';
    document.getElementById('profileEmail').value = currentUser.email || '';
    document.getElementById('profilePhone').value = currentUser.phone || '';
    document.getElementById('profileAddress').value = currentUser.address || '';
    document.getElementById('profilePassword').value = '';
    loadOrders();
    loadFavorites();
    loadUserReviews();
    document.getElementById('profileModal').style.display = 'flex';
}

function showTab(tab) {
    const tabs = ['profile', 'orders', 'favorites', 'reviews'];
    tabs.forEach(t => {
        const tabDiv = document.getElementById(t + 'Tab');
        const btn = document.querySelector(`.tab-btn[onclick="showTab('${t}')"]`);
        if (tabDiv) {
            if (t === tab) {
                tabDiv.classList.add('active');
                if (btn) btn.classList.add('active');
            } else {
                tabDiv.classList.remove('active');
                if (btn) btn.classList.remove('active');
            }
        }
    });
}

function loadOrders() {
    const userOrders = orders.filter(o => o.user_id === currentUser.id);
    const ordersDiv = document.getElementById('ordersList');
    if (userOrders.length === 0) { ordersDiv.innerHTML = '<p>У вас пока нет заказов</p>'; return; }
    ordersDiv.innerHTML = userOrders.map(order => `
        <div class="order-item">
            <div><strong>Заказ #${order.id}</strong><br>${order.date}<br>Статус: ${order.status}</div>
            <div>${order.total} ₽<br>${order.items.length} товаров</div>
        </div>
    `).join('');
}

function loadFavorites() {
    const userFavorites = favorites.filter(f => f.user_id === currentUser.id);
    const favBooks = userFavorites.map(f => books.find(b => b.id === f.book_id)).filter(b => b);
    const favDiv = document.getElementById('favoritesList');
    if (favBooks.length === 0) { favDiv.innerHTML = '<p>У вас пока нет избранных книг</p>'; return; }
    favDiv.innerHTML = favBooks.map(book => `
        <div class="book-card" style="cursor:pointer" onclick="showBookDetail(${book.id}); closeModal('profileModal')">
            <div class="book-cover" style="height:150px; background-image: url('${book.cover || ''}'); background-size: cover;">${!book.cover ? '📖' : ''}</div>
            <div class="book-info">
                <div class="book-title">${book.title}</div>
                <div class="book-price">${book.price} ₽</div>
                <button onclick="event.stopPropagation(); addToCart({id:${book.id},title:'${book.title.replace(/'/g, "\\'")}',price:${book.price},cover:'${book.cover}'})">В корзину</button>
            </div>
        </div>
    `).join('');
}

function loadUserReviews() {
    const userReviews = reviews.filter(r => r.user_id === currentUser.id);
    const reviewsDiv = document.getElementById('reviewsList');
    if (userReviews.length === 0) { reviewsDiv.innerHTML = '<p>У вас пока нет отзывов</p>'; return; }
    reviewsDiv.innerHTML = userReviews.map(review => {
        const book = books.find(b => b.id === review.book_id);
        return `<div class="review-card"><strong>${book?.title || 'Книга'}</strong><div class="review-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5-review.rating)}</div><p>${review.comment}</p><small>${review.date}</small></div>`;
    }).join('');
}

function saveProfile() {
    const newName = document.getElementById('profileName').value;
    const newEmail = document.getElementById('profileEmail').value;
    const newPhone = document.getElementById('profilePhone').value;
    const newAddress = document.getElementById('profileAddress').value;
    const newPassword = document.getElementById('profilePassword').value;
    
    if (!newEmail) {
        alert('Email не может быть пустым');
        return;
    }
    
    // Проверка, что новый email не принадлежит другому пользователю
    const existingUser = users.find(u => u.email === newEmail && u.id !== currentUser.id);
    if (existingUser) {
        alert('Пользователь с таким email уже существует');
        return;
    }
    
    currentUser.name = newName;
    currentUser.email = newEmail;
    currentUser.phone = newPhone;
    currentUser.address = newAddress;
    if (newPassword && newPassword.trim() !== '') {
        currentUser.password = newPassword;
    }
    
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
        users[userIndex] = { ...currentUser };
    }
    
    saveAllData();
    updateAuthUI();
    alert('Профиль успешно обновлён!');
    closeModal('profileModal');
}

// ============================================
// МОДАЛЬНЫЕ ОКНА
// ============================================

function openLoginModal() { document.getElementById('loginModal').style.display = 'flex'; }
function openRegisterModal() { document.getElementById('registerModal').style.display = 'flex'; }
function closeModal(id) { document.getElementById(id).style.display = 'none'; }

// ============================================
// ИНИЦИАЛИЗАЦИЯ
// ============================================

document.getElementById('openCartBtn').onclick = () => { renderCartModal(); document.getElementById('cartModal').style.display = 'flex'; };
document.getElementById('checkoutBtn').onclick = checkout;

const headerSearchBtn = document.getElementById('searchBtn');
if (headerSearchBtn) headerSearchBtn.onclick = () => filterAndSortBooks();
const headerSearchInput = document.getElementById('searchInput');
if (headerSearchInput) headerSearchInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') filterAndSortBooks(); });

updateAuthUI();
showMainPage();