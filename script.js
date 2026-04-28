// ==================== ТОВАРЫ ====================
const products = [
    { 
        id: 1, 
        name: "Спортивные компрессионные", 
        article: "NR002", 
        price: 599, 
        size: "26-27", 
        color: "Черный", 
        material: "Синтетика", 
        type: "Спортивные", 
        desc: "Компрессионные носки для активных тренировок. Поддерживают мышцы, улучшают кровообращение.", 
        image: "https://www.kant.ru/upload/iblock/2b0/2b01845229b174418229238a6824b166.jpg" 
    },
    { 
        id: 2, 
        name: "Тёплые шерстяные", 
        article: "NR003", 
        price: 790, 
        size: "28-30", 
        color: "Серый", 
        material: "Шерсть", 
        type: "Тёплые", 
        desc: "Натуральная шерсть мериноса. Идеальны для холодной погоды, отлично сохраняют тепло.", 
        image: "https://basket-04.wbbasket.ru/vol584/part58475/58475732/images/big/1.webp" 
    },
    { 
        id: 3, 
        name: "Дизайнерский принт", 
        article: "NR004", 
        price: 450, 
        size: "22-23", 
        color: "Красный", 
        material: "Хлопок", 
        type: "Дизайнерские", 
        desc: "Яркий эксклюзивный дизайн. Сделают ваш образ стильным и запоминающимся.", 
        image: "https://ir.ozone.ru/s3/multimedia-3/6312482307.jpg" 
    },
    { 
        id: 4, 
        name: "Повседневные серые", 
        article: "NR005", 
        price: 349, 
        size: "26-27", 
        color: "Серый", 
        material: "Хлопок", 
        type: "Повседневные", 
        desc: "Классические носки на каждый день. Мягкие, дышащие, не теряют форму.", 
        image: "https://ir.ozone.ru/multimedia/c1000/1010739611.jpg" 
    },
    { 
        id: 5, 
        name: "Спортивные синие", 
        article: "NR006", 
        price: 520, 
        size: "28-30", 
        color: "Синий", 
        material: "Синтетика", 
        type: "Спортивные", 
        desc: "Влагоотводящие спортивные носки. Отлично подходят для бега и фитнеса.", 
        image: "https://basket-04.wbbasket.ru/vol571/part57163/57163384/images/big/1.webp" 
    },
    { 
        id: 6, 
        name: "Ультратеплые меринос", 
        article: "NR007", 
        price: 990, 
        size: "28-30", 
        color: "Черный", 
        material: "Шерсть", 
        type: "Тёплые", 
        desc: "Максимальная теплоизоляция. Носки из высококачественной шерсти мериноса.", 
        image: "https://ir.ozone.ru/s3/multimedia-1-1/7191625213.jpg" 
    },
    { 
        id: 7, 
        name: "Дизайнерские горошек", 
        article: "NR008", 
        price: 470, 
        size: "24-25", 
        color: "Белый", 
        material: "Хлопок", 
        type: "Дизайнерские", 
        desc: "Стильный горошек — тренд сезона. Привлекают внимание и поднимают настроение.", 
        image: "https://imgcdn.befree.ru/rest/V1/images/1024/product/images/BF2614934003/BF2614934003_1_1.jpg" 
    },
    { 
        id: 8, 
        name: "Кашемировые премиум", 
        article: "NR013", 
        price: 1490, 
        size: "28-30", 
        color: "Серый", 
        material: "Шерсть", 
        type: "Тёплые", 
        desc: "Роскошные носки из кашемира. Невероятная мягкость и комфорт.", 
        image: "https://www.charuel.ru/upload/resize_cache/iblock/118/1100_1471_1/pwq11nl3d2yl5zhso1hx8goijlbey1kb.jpg" 
    }
];

// ========== Глобальные переменные ==========
let cart = JSON.parse(localStorage.getItem('socks_cart')) || [];
let currentUser = JSON.parse(localStorage.getItem('socks_user')) || null;
let orders = JSON.parse(localStorage.getItem('socks_orders')) || [];
let activeCategory = "all";

// ========== Вспомогательные функции ==========
function saveCart() { 
    localStorage.setItem('socks_cart', JSON.stringify(cart)); 
    updateCartUI(); 
}

function updateCartUI() { 
    const total = cart.reduce((s, i) => s + i.qty, 0);
    document.getElementById('cartCounter').innerText = total; 
}

function showToast(msg) { 
    let t = document.createElement('div'); 
    t.className = 'toast-msg'; 
    t.innerHTML = msg; 
    document.body.appendChild(t); 
    setTimeout(() => t.remove(), 2200); 
}

// ========== Навигация ==========
function navigateToCatalog() {
    document.getElementById('catalogView').style.display = 'block';
    document.getElementById('detailView').style.display = 'none';
    filterAndRender();
}

function navigateToProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    document.getElementById('catalogView').style.display = 'none';
    const detailView = document.getElementById('detailView');
    detailView.style.display = 'block';
    detailView.innerHTML = `
        <div class="product-detail-page">
            <div class="back-link" onclick="navigateToCatalog()">
                <i class="fas fa-arrow-left"></i> Назад к каталогу
            </div>
            <div class="detail-container">
                <div class="detail-image">
                    <img src="${product.image}" alt="${product.name}" onerror="this.src='https://placehold.co/600x600/1e3c72/white?text=🧦'">
                </div>
                <div class="detail-info">
                    <div class="product-category">${product.type}</div>
                    <h1>${product.name}</h1>
                    <div class="detail-price">${product.price} ₽</div>
                    <div class="detail-attr">
                        <p><strong>Артикул:</strong> ${product.article}</p>
                        <p><strong>Размер:</strong> ${product.size} см</p>
                        <p><strong>Цвет:</strong> ${product.color}</p>
                        <p><strong>Состав:</strong> ${product.material}</p>
                        <p><strong>Описание:</strong> ${product.desc}</p>
                    </div>
                    <div class="detail-buttons">
                        <button class="btn-large btn-buy" onclick="addToCartAndToast(${product.id})">
                            <i class="fas fa-shopping-cart"></i> Добавить в корзину
                        </button>
                        <button class="btn-large btn-back" onclick="navigateToCatalog()">
                            Продолжить покупки
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function addToCartAndToast(productId) {
    const product = products.find(p => p.id === productId);
    const exist = cart.find(i => i.id === productId);
    if (exist) exist.qty++;
    else cart.push({...product, qty: 1});
    saveCart();
    showToast(`${product.name} добавлен в корзину`);
}

// ========== Фильтрация и отрисовка ==========
function filterAndRender() {
    let filtered = [...products];
    let minP = parseInt(document.getElementById('priceMin').value) || 0;
    let maxP = parseInt(document.getElementById('priceMax').value) || 999999;
    let sizeVal = document.getElementById('sizeSelect').value;
    let colors = Array.from(document.querySelectorAll('#colorGroup input:checked')).map(c=>c.value);
    let materials = Array.from(document.querySelectorAll('#materialGroup input:checked')).map(c=>c.value);
    let search = document.getElementById('globalSearch').value.toLowerCase();
    
    filtered = filtered.filter(p => p.price >= minP && p.price <= maxP);
    if (sizeVal) filtered = filtered.filter(p => p.size === sizeVal);
    if (colors.length) filtered = filtered.filter(p => colors.includes(p.color));
    if (materials.length) filtered = filtered.filter(p => materials.includes(p.material));
    if (search) filtered = filtered.filter(p => p.name.toLowerCase().includes(search) || p.article.toLowerCase().includes(search));
    if (activeCategory !== "all") filtered = filtered.filter(p => p.type === activeCategory);
    
    document.getElementById('resultStats').innerHTML = `найдено ${filtered.length} товаров`;
    renderProducts(filtered);
}

function renderProducts(arr) {
    const grid = document.getElementById('productGrid');
    if (!arr.length) { 
        grid.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:48px;">🧦 Ничего не найдено</div>'; 
        return; 
    }
    grid.innerHTML = arr.map(p => `
        <div class="product-card" onclick="navigateToProduct(${p.id})">
            <img class="product-img" src="${p.image}" alt="${p.name}" onerror="this.src='https://placehold.co/400x300/1e3c72/white?text=🧦'">
            <div class="product-info">
                <div class="product-category">${p.type}</div>
                <div class="product-name">${p.name}</div>
                <div class="product-detail">
                    <span>📏 ${p.size} см</span>
                    <span>🎨 ${p.color}</span>
                    <span>🧵 ${p.material}</span>
                </div>
                <div class="product-price">${p.price} ₽</div>
                <button class="btn-cart" onclick="event.stopPropagation(); addToCartAndToast(${p.id})">
                    <i class="fas fa-cart-plus"></i> В корзину
                </button>
            </div>
        </div>
    `).join('');
}

// ========== Корзина ==========
function openCartModal() {
    let modal = document.getElementById('cartModal');
    let container = document.getElementById('cartList');
    if (!cart.length) { 
        container.innerHTML = '<p style="text-align:center; padding:20px;">Корзина пуста</p>'; 
        document.getElementById('cartTotalSum').innerHTML = '';
    } else {
        container.innerHTML = cart.map(item => `
            <div style="display:flex; justify-content:space-between; border-bottom:1px solid #eef2ff; padding:12px 0;">
                <div><b>${item.name}</b><br>${item.price}₽ x ${item.qty}</div>
                <div>${item.price * item.qty}₽ 
                    <button data-id="${item.id}" class="cartInc" style="margin-left:8px; padding:4px 10px; border-radius:30px; border:none; background:#1e3c72; color:white;">+</button>
                    <button data-id="${item.id}" class="cartDec" style="margin:0 4px; padding:4px 10px; border-radius:30px; border:none; background:#e25c3a; color:white;">-</button>
                    <button data-id="${item.id}" class="cartDel" style="padding:4px 8px; border-radius:30px; border:none; background:#ccc;">🗑️</button>
                </div>
            </div>
        `).join('');
        let total = cart.reduce((s, i) => s + i.price * i.qty, 0);
        document.getElementById('cartTotalSum').innerHTML = `<b>Итого: ${total} ₽</b>`;
        
        document.querySelectorAll('.cartInc').forEach(b => b.addEventListener('click', () => { changeQty(parseInt(b.dataset.id), 1); openCartModal(); }));
        document.querySelectorAll('.cartDec').forEach(b => b.addEventListener('click', () => { changeQty(parseInt(b.dataset.id), -1); openCartModal(); }));
        document.querySelectorAll('.cartDel').forEach(b => b.addEventListener('click', () => { removeItem(parseInt(b.dataset.id)); openCartModal(); }));
    }
    modal.style.display = 'flex';
}

function changeQty(id, delta) { 
    let idx = cart.findIndex(i => i.id === id); 
    if (idx !== -1) { 
        cart[idx].qty += delta; 
        if (cart[idx].qty <= 0) cart.splice(idx, 1); 
        saveCart(); 
    } 
}

function removeItem(id) { 
    cart = cart.filter(i => i.id !== id); 
    saveCart(); 
}

function checkoutOrder() {
    if (!currentUser) { 
        showToast('Войдите в личный кабинет'); 
        closeModal('cartModal'); 
        document.getElementById('profileModal').style.display = 'flex'; 
        return; 
    }
    if (!cart.length) { 
        showToast('Корзина пуста'); 
        return; 
    }
    let newOrder = { 
        id: Date.now(), 
        userId: currentUser.email, 
        items: cart.map(i => ({ name: i.name, qty: i.qty, price: i.price })), 
        total: cart.reduce((s, i) => s + i.price * i.qty, 0), 
        date: new Date().toLocaleString(), 
        status: 'новый' 
    };
    orders.push(newOrder); 
    localStorage.setItem('socks_orders', JSON.stringify(orders));
    cart = []; 
    saveCart(); 
    showToast('Заказ оформлен!'); 
    closeModal('cartModal');
}

// ========== Личный кабинет ==========
function renderProfileOrders() {
    if (!currentUser) return;
    let userOrders = orders.filter(o => o.userId === currentUser.email);
    let historyDiv = document.getElementById('orderHistoryList');
    if (!userOrders.length) historyDiv.innerHTML = '<p>Нет заказов</p>';
    else historyDiv.innerHTML = userOrders.map(o => `
        <div style="border-bottom:1px solid #e2e8f0; padding:12px 0;">
            <b>${o.date}</b> | ${o.total}₽ | статус: ${o.status}<br>Товаров: ${o.items.length}
        </div>
    `).join('');
}

function updateAuthUI() {
    let logged = !!currentUser;
    document.getElementById('unauthBlock').style.display = logged ? 'none' : 'block';
    document.getElementById('authBlock').style.display = logged ? 'block' : 'none';
    if (logged) {
        document.getElementById('userNameDisplay').innerText = currentUser.name;
        document.getElementById('userEmailDisplay').innerText = currentUser.email;
        renderProfileOrders();
    }
}

function doLogin() { 
    let email = document.getElementById('loginEmail').value; 
    let pass = document.getElementById('loginPassword').value; 
    let users = JSON.parse(localStorage.getItem('socks_users')) || []; 
    let u = users.find(u => u.email === email && u.password === pass); 
    if (u) { 
        currentUser = u; 
        localStorage.setItem('socks_user', JSON.stringify(currentUser)); 
        updateAuthUI(); 
        showToast(`Привет, ${u.name}`); 
        closeModal('profileModal'); 
        filterAndRender(); 
    } else alert('Неверный логин'); 
}

function doRegister() { 
    let name = document.getElementById('regFullname').value; 
    let email = document.getElementById('RegEmail').value; 
    let pass = document.getElementById('RegPassword').value; 
    if (!name || !email || !pass) { alert('Заполните поля'); return; } 
    let users = JSON.parse(localStorage.getItem('socks_users')) || []; 
    if (users.find(u => u.email === email)) { alert('Email занят'); return; } 
    let newUser = { name, email, password: pass }; 
    users.push(newUser); 
    localStorage.setItem('socks_users', JSON.stringify(users)); 
    currentUser = newUser; 
    localStorage.setItem('socks_user', JSON.stringify(currentUser)); 
    updateAuthUI(); 
    showToast('Регистрация успешна!'); 
    closeModal('profileModal'); 
    filterAndRender(); 
}

function logout() { 
    currentUser = null; 
    localStorage.removeItem('socks_user'); 
    updateAuthUI(); 
    showToast('Вы вышли'); 
    filterAndRender(); 
}

function closeModal(id) { 
    document.getElementById(id).style.display = 'none'; 
}

// ========== Админ-панель ==========
function adminTools() {
    let action = prompt('Админ панель:\n1 - Заказы (смена статуса)\n2 - Пользователи');
    if (action === '1') {
        if (!orders.length) { alert('Нет заказов'); return; }
        let list = orders.map((o, i) => `${i+1}. ${o.date} | ${o.total}₽ | статус: ${o.status}`).join('\n');
        let idx = prompt(`Список заказов:\n${list}\nВведите номер заказа для смены статуса (1-${orders.length})`);
        if (idx && orders[parseInt(idx)-1]) {
            let st = prompt('Новый статус (новый / в обработке / отправлен / завершён)');
            if (st) { 
                orders[parseInt(idx)-1].status = st; 
                localStorage.setItem('socks_orders', JSON.stringify(orders)); 
                alert('Статус обновлён'); 
                if (currentUser) renderProfileOrders(); 
            }
        }
    } else if (action === '2') { 
        let users = JSON.parse(localStorage.getItem('socks_users')) || []; 
        alert(users.map(u => `${u.name} (${u.email})`).join('\n') || 'Нет пользователей'); 
    }
}

// ========== Инициализация событий ==========
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('searchBtn').addEventListener('click', filterAndRender);
    document.getElementById('globalSearch').addEventListener('keyup', filterAndRender);
    document.getElementById('resetFiltersBtn').addEventListener('click', () => {
        document.getElementById('priceMin').value = 0;
        document.getElementById('priceMax').value = 3000;
        document.getElementById('sizeSelect').value = '';
        document.querySelectorAll('#colorGroup input').forEach(c => c.checked = false);
        document.querySelectorAll('#materialGroup input').forEach(c => c.checked = false);
        document.getElementById('globalSearch').value = '';
        filterAndRender();
    });
    document.querySelectorAll('#colorGroup input, #materialGroup input, #sizeSelect, #priceMin, #priceMax')
        .forEach(el => el.addEventListener('change', filterAndRender));

    document.getElementById('cartBtn').addEventListener('click', openCartModal);
    document.getElementById('closeCartX').addEventListener('click', () => closeModal('cartModal'));
    document.getElementById('checkoutFinalBtn').addEventListener('click', checkoutOrder);

    document.getElementById('profileBtn').addEventListener('click', () => { 
        document.getElementById('profileModal').style.display = 'flex'; 
        updateAuthUI(); 
    });
    document.getElementById('closeProfileBtn').addEventListener('click', () => closeModal('profileModal'));
    document.getElementById('showLoginBtn').addEventListener('click', () => { 
        document.getElementById('loginForm').style.display = 'block'; 
        document.getElementById('regForm').style.display = 'none'; 
        document.getElementById('showLoginBtn').classList.add('active');
        document.getElementById('showRegBtn').classList.remove('active');
    });
    document.getElementById('showRegBtn').addEventListener('click', () => { 
        document.getElementById('loginForm').style.display = 'none'; 
        document.getElementById('regForm').style.display = 'block';
        document.getElementById('showRegBtn').classList.add('active');
        document.getElementById('showLoginBtn').classList.remove('active');
    });
    document.getElementById('doLoginBtn').addEventListener('click', doLogin);
    document.getElementById('doRegBtn').addEventListener('click', doRegister);
    document.getElementById('logoutBtn').addEventListener('click', logout);
    document.getElementById('adminBtn').addEventListener('click', adminTools);

    document.querySelectorAll('.category-link').forEach(link => {
        link.addEventListener('click', (e) => {
            document.querySelectorAll('.category-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            activeCategory = link.dataset.cat;
            document.getElementById('categoryTitle').innerText = activeCategory === 'all' ? 'Все модели' : activeCategory;
            filterAndRender();
        });
    });

    window.onclick = e => { 
        if (e.target.classList.contains('modal-overlay')) e.target.style.display = 'none'; 
    };

    filterAndRender();
    updateCartUI();
    updateAuthUI();
});