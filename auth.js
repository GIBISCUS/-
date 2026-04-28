// Инициализация пользователей при первом запуске
function initUsers() {
    if (!localStorage.getItem('users')) {
        const defaultUsers = [
            {
                id: 1,
                email: 'admin@fit.ru',
                password: 'admin123',
                name: 'Администратор',
                role: 'admin',
                createdAt: new Date().toISOString()
            }
        ];
        localStorage.setItem('users', JSON.stringify(defaultUsers));
    }
}

// Регистрация
function register(name, email, password) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Проверка, существует ли пользователь
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return { success: false, message: 'Пользователь с таким email уже существует' };
    }
    
    // Создание нового пользователя
    const newUser = {
        id: Date.now(),
        email: email,
        password: password,
        name: name,
        role: 'user',
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    return { success: true, message: 'Регистрация успешна! Теперь вы можете войти.' };
}

// Вход
function login(email, password) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Сохраняем текущего пользователя (без пароля)
        const currentUser = {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
        };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        return { success: true, user: currentUser };
    } else {
        return { success: false, message: 'Неверный email или пароль' };
    }
}

// Показать ошибку
function showError(formId, message) {
    const form = document.getElementById(formId);
    const errorDiv = form.querySelector('#errorMessage');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        errorDiv.style.background = '#fee';
        errorDiv.style.color = '#e74c3c';
        errorDiv.style.border = '1px solid #fcc';
    }
}

// Показать успех
function showSuccess(formId, message) {
    const form = document.getElementById(formId);
    const errorDiv = form.querySelector('#errorMessage');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        errorDiv.style.background = '#efe';
        errorDiv.style.color = '#27ae60';
        errorDiv.style.border = '1px solid #cfc';
    }
}

// Скрыть ошибку
function hideError(formId) {
    const form = document.getElementById(formId);
    const errorDiv = form.querySelector('#errorMessage');
    if (errorDiv) {
        errorDiv.style.display = 'none';
    }
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    initUsers();
    
    // Обработка формы регистрации
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            // Валидация
            if (!name || !email || !password || !confirmPassword) {
                showError('registerForm', 'Все поля обязательны для заполнения');
                return;
            }
            
            if (password.length < 6) {
                showError('registerForm', 'Пароль должен содержать минимум 6 символов');
                return;
            }
            
            if (password !== confirmPassword) {
                showError('registerForm', 'Пароли не совпадают');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showError('registerForm', 'Введите корректный email');
                return;
            }
            
            // Регистрация
            const result = register(name, email, password);
            
            if (result.success) {
                showSuccess('registerForm', result.message);
                setTimeout(function() {
                    window.location.href = 'login.html';
                }, 1500);
            } else {
                showError('registerForm', result.message);
            }
        });
    }
    
    // Обработка формы входа
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            
            if (!email || !password) {
                showError('loginForm', 'Введите email и пароль');
                return;
            }
            
            const result = login(email, password);
            
            if (result.success) {
                // ПОКА ПЕРЕНАПРАВЛЯЕМ НА ГЛАВНУЮ
                // Когда будут готовы admin.html и profile.html, раскомментировать:
                /*
                if (result.user.role === 'admin') {
                    window.location.href = 'admin.html';
                } else {
                    window.location.href = 'profile.html';
                }
                */
                window.location.href = 'index.html';
            } else {
                showError('loginForm', result.message);
            }
        });
    }
});