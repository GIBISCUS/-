// Инициализация данных в localStorage
function initData() {
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

    const defaultChallenges = [
    { id: 1, title: '100 отжиманий в день', description: 'Отжимайся каждый день в течение 30 дней', duration: 30, rules: 'Выполнять не менее 100 отжиманий ежедневно', status: 'active', category: 'strength', image: 'https://i.ibb.co/XfbZC1t8/4-Ai-Dx-Rw-PZDLWal9-Ob-Q1na-Fnc58u3d-GTou-QRb-Po-4-LIXZg-Kk-ANQVf-eth-GBt3-Od-Yap-Ppb-Bw4jplr-Ri-SP26-Yf.jpg', createdAt: new Date().toISOString() },
    { id: 2, title: 'Планка каждый день', description: 'Стой в планке ежедневно, увеличивая время', duration: 14, rules: 'Начать с 30 секунд, прибавлять по 5 секунд каждый день', status: 'active', category: 'strength', image: 'https://i.ibb.co/whTMzfSh/J-0-IXEEf-O-t-Chi7-Lmn-RGF4s-nhzmh-RMUNC6-P632-Mt-Tl-khc-T1-T1a6-WHe-U58oxg-AB-OZkb-Ogzl-V0zdkc-Qb-X-5-ZM.jpg', createdAt: new Date().toISOString() },
    { id: 3, title: '10 000 шагов', description: 'Проходи 10 000 шагов каждый день', duration: 21, rules: 'Используй шагомер или приложение на телефоне', status: 'active', category: 'cardio', image: 'https://i.ibb.co/7tXdT4m7/N3-BGIs-UTxgm-HVr-Rr-M4-UVw-Iig-S8l-Tx30-Ez-Nejpesl1s-As-X0s-DXwc-CDr-DTFt9g-ZQxb-D2-Qr-Ai-V-Qp-WU1k-b-B.jpg', createdAt: new Date().toISOString() },
    { id: 4, title: 'Утренняя зарядка', description: 'Начинай каждое утро с 15-минутной зарядки', duration: 21, rules: 'Выполнять комплекс: наклоны, приседания, растяжка', status: 'active', category: 'cardio', image: 'https://i.ibb.co/KzKBfxDz/Oi-F4h-DIe-TPHDYz-WKp-Yu-Cw-A7ne-ej-H5-SDss-LXVnv8t-Zdz-W-lcq-V-v-XPJ0zmu-Pam0gxw-O-7w3-Ztk6sk7-Hlp-WXW.jpg', createdAt: new Date().toISOString() },
    { id: 5, title: 'Медитация', description: '10 минут тишины и концентрации ежедневно', duration: 14, rules: 'Найти спокойное место, включить таймер на 10 минут', status: 'active', category: 'mind', image: 'https://i.ibb.co/jvq6zqnB/Ff-Omz-Xn-T8-GHm-HWC9-Vs4o-Cdupxw8t-R-s-Lhw-NUQf-B61go-ML7a-H0-DPgq-Id-Fe-Za-F9x-Sjq-Gj8x4zz-Xm-QDN2k9e.jpg', createdAt: new Date().toISOString() },
    { id: 6, title: 'Водный баланс', description: 'Пей 2 литра чистой воды каждый день', duration: 30, rules: 'Выпивать не менее 2 литров воды в день', status: 'active', category: 'health', image: 'https://i.ibb.co/wFLSt7Qc/tu-Bk-P9-Qk-ZS2i-LE-b-YRt-S5-dz-HLIzvf-MEd-FMG6dqv3fyp0rzk4-NT0-KMRPTBu-Mrj-Iq-SDn-Ex-Lhn9z5a7-FXIUAn-VE.jpg', createdAt: new Date().toISOString() },
    { id: 7, title: 'Чтение', description: 'Читай 20 страниц любой книги каждый день', duration: 30, rules: 'Читать не менее 20 страниц ежедневно', status: 'active', category: 'mind', image: 'https://i.ibb.co/cKBDqd04/e-Byf-L9sivfh-UC56-NEXrp-Et-94-WIJ7-FSf-Grv-MJf-E6-YKa-Nw-PDw6b-TVm-VS-Np-HLz-L994o-Vn-DLPYh4wd9-TCOkap-P.jpg', createdAt: new Date().toISOString() },
    { id: 8, title: 'Приседания', description: '50 приседаний каждый день', duration: 21, rules: 'Выполнять 50 приседаний ежедневно', status: 'active', category: 'strength', image: 'https://i.ibb.co/Ndf73hjX/a7-YEYOist-EFrk-Oo5hb-Ov-XYVg7dy6m-Osd-Pv-O6ig-Ec8pz6-Yho-Rhqe-Ffted-JWqyp3thd1-Oooy0-OSAnu-Joy7brs-GIu4.jpg', createdAt: new Date().toISOString() },
    { id: 9, title: 'Цифровой детокс', description: 'Никаких соцсетей за час до сна', duration: 7, rules: 'За час до сна отложить телефон', status: 'active', category: 'health', image: 'https://i.ibb.co/zhXVRP1R/rx-Co-Ygu-WKee6w-Y8-Wx4kh-Uz-ITo47-Pg-LMW-2gdibx-RLHKc-XXEl-Ix4b-TZi-Lprbk84who-Afuswyz7p-Zu-Lk71t-QJ2.jpg', createdAt: new Date().toISOString() },
    { id: 10, title: 'Здоровый сон', description: 'Ложись до 23:00 и спи 7+ часов', duration: 14, rules: 'Отходить ко сну не позднее 23:00', status: 'active', category: 'health', image: 'https://i.ibb.co/Z6NjsYrr/BIGdu-ETe2t8-GYOYdk-AU6-Bi-S9-S86-uhs-X6k4-YMgxi9-Esky-CRC1onmnq9shsz-OUDYJQIow-Pv-Gx-SGe-Po-Mn-Db-SS0v-B.jpg', createdAt: new Date().toISOString() },
    { id: 11, title: 'Дневник благодарности', description: 'Записывай 3 вещи, за которые благодарен', duration: 21, rules: 'Записывать 3 вещи каждый вечер', status: 'active', category: 'mind', image: 'https://i.ibb.co/gbc7PZJ9/z5-Kiuvyj-PTZCpt-R-QFxt-YRy1-It-LAwx-Yu-Pcio-Ji-O0-Hyjvo706z-5-Js-ISo-h-HNbr-EKkm3n02-P-I6-Itx0s-S7-Q-xur.jpg', createdAt: new Date().toISOString() },
    { id: 12, title: 'Пресс', description: 'Качай пресс каждый день', duration: 30, rules: '30/50/70 скручиваний по дням', status: 'active', category: 'strength', image: 'https://i.ibb.co/ks6cH89b/Ax-Ky-DRNt-F9v8-Gov-G3-RN8fvcty-Ncf-BL90-Lmm-TPSx-S-mbg6-Z-Vd-T9b2-S8-HXbvp-Fqy9r-j-SAVIBL7j-BP6wgbzz9-Keea.jpg', createdAt: new Date().toISOString() },
    { id: 13, title: 'Прогулка', description: '30 минут пешком каждый день', duration: 14, rules: 'Гулять не менее 30 минут', status: 'active', category: 'cardio', image: 'https://i.ibb.co/cSZX4wbS/8-Rbcyd-Wd4-Nqz-Xe7-Vvxw-NLF6-TRv-LYNIbx-Yo2nxl5-I9c9k-WR9tz-Nh-Guxl7nv-Njckr-Mh-SLCOMQAFBZYf9-P-Hlmk-MSRk.jpg', createdAt: new Date().toISOString() },
    { id: 14, title: 'Английский язык', description: '10 новых слов или 15 минут занятий', duration: 30, rules: 'Учить 10 слов или 15 минут в приложении', status: 'active', category: 'mind', image: 'https://i.ibb.co/gZxwf1Yf/XMSa-Xyb6w797sy-M40-LV1-W2v-YF5-P0ks-ROG2q-Qco0p-XQl-e-CYh3mhwv-Gttn1b-Kw-ZBh-NO8-A5r-CFtowj8p-Ci-36-YHo.jpg', createdAt: new Date().toISOString() }
];
    
        localStorage.setItem('challenges', JSON.stringify(defaultChallenges));
    }

    if (!localStorage.getItem('progress')) localStorage.setItem('progress', JSON.stringify([]));
    if (!localStorage.getItem('measurements')) localStorage.setItem('measurements', JSON.stringify([]));
    if (!localStorage.getItem('badges')) localStorage.setItem('badges', JSON.stringify([]));
    if (!localStorage.getItem('comments')) localStorage.setItem('comments', JSON.stringify([]));
    if (!localStorage.getItem('notifications')) localStorage.setItem('notifications', JSON.stringify([]));


function getParticipantsCount(challengeId) {
    const progress = JSON.parse(localStorage.getItem('progress') || '[]');
    return new Set(progress.filter(p => p.challengeId === challengeId).map(p => p.userId)).size;
}

// ===== ПОПУЛЯРНЫЕ ЧЕЛЛЕНДЖИ =====
function loadActiveChallenges() {
    const container = document.getElementById('activeChallenges');
    if (!container) return;

    const challenges = JSON.parse(localStorage.getItem('challenges') || '[]');
    const activeChallenges = challenges.filter(c => c.status === 'active').slice(0, 4);

    const defaultImages = [
        'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80',
        'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=80',
        'https://images.unsplash.com/photo-1574680096145-d05b474b1e0c?w=400&q=80',
        'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80'
    ];

    container.innerHTML = activeChallenges.map((challenge, index) => `
        <a href="challenge.html?id=${challenge.id}" class="challenge-card-compact">
            <div class="challenge-card-compact-image" style="background-image: url('${challenge.image || defaultImages[index]}');">
                <span class="challenge-compact-duration">${challenge.duration} дн.</span>
            </div>
            <div class="challenge-card-compact-content">
                <h4>${challenge.title}</h4>
                <p>${challenge.description}</p>
                <span class="challenge-compact-link">Подробнее <i class="fas fa-arrow-right"></i></span>
            </div>
        </a>
    `).join('');
}

function loadPlatformStats() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const progress = JSON.parse(localStorage.getItem('progress') || '[]');
    const challenges = JSON.parse(localStorage.getItem('challenges') || '[]');
    
    if (document.getElementById('statUsers')) document.getElementById('statUsers').textContent = users.length;
    if (document.getElementById('statChallenges')) document.getElementById('statChallenges').textContent = challenges.filter(c => c.status === 'active').length;
    
    const completedTotal = progress.filter(p => p.completed).length;
    if (document.getElementById('statCompleted')) document.getElementById('statCompleted').textContent = completedTotal;
    
    let maxStreak = 0;
    progress.forEach(p => {
        if (p.checkins.length) {
            const sorted = [...p.checkins].sort((a, b) => b - a);
            let streak = 1;
            for (let i = 0; i < sorted.length - 1; i++) {
                if (sorted[i] - sorted[i + 1] === 1) streak++;
                else break;
            }
            if (streak > maxStreak) maxStreak = streak;
        }
    });
    if (document.getElementById('statStreak')) document.getElementById('statStreak').textContent = maxStreak;
}

// ===== ЦИТАТА ДНЯ =====
const quotes = [
    { text: 'Единственный способ сделать отличную работу — это любить то, что ты делаешь.', author: 'Стив Джобс' },
    { text: 'Не важно, как медленно ты идёшь, главное — не останавливайся.', author: 'Конфуций' },
    { text: 'Твоё тело может всё. Это твой мозг нужно убедить.', author: 'Неизвестный' },
    { text: 'Сила — это способность продолжать, когда хочется сдаться.', author: 'Арнольд Шварценеггер' },
    { text: 'Успех — это сумма маленьких усилий, повторяющихся день за днём.', author: 'Роберт Кольер' },
    { text: 'Не жди мотивации. Создавай привычку.', author: 'Джеймс Клир' },
    { text: 'Лучшее время начать было вчера. Следующее лучшее — сегодня.', author: 'Неизвестный' },
    { text: 'Здоровье — это не всё, но без здоровья всё — ничто.', author: 'Артур Шопенгауэр' },
];

function loadDailyQuote() {
    const quoteData = JSON.parse(localStorage.getItem('dailyQuote') || '{}');
    const today = new Date().toDateString();
    
    if (quoteData.date !== today) {
        quoteData.quote = quotes[Math.floor(Math.random() * quotes.length)];
        quoteData.date = today;
        localStorage.setItem('dailyQuote', JSON.stringify(quoteData));
    }
    
    if (document.getElementById('dailyQuote')) document.getElementById('dailyQuote').textContent = quoteData.quote.text;
    if (document.getElementById('dailyQuoteAuthor')) document.getElementById('dailyQuoteAuthor').textContent = '— ' + quoteData.quote.author;
}

// ===== НОВОСТИ =====
function loadNews() {
    const container = document.getElementById('newsGrid');
    if (!container) return;
    
    const news = [
        { date: '25 апреля 2026', title: 'Запуск платформы FitChallenge', text: 'Мы рады сообщить о запуске нашей платформы! Присоединяйтесь к челленджам и достигайте своих целей вместе с нами.' },
        { date: '24 апреля 2026', title: '14 новых челленджей', text: 'Добавлены челленджи на любой вкус: от отжиманий до медитации.' },
        { date: '23 апреля 2026', title: 'Раздел «Полезные советы»', text: 'Теперь доступны статьи, видеоуроки и рекомендации по питанию и тренировкам.' },
        { date: '22 апреля 2026', title: 'Система достижений', text: 'За участие в челленджах вы получаете бейджи. Соберите всю коллекцию!' },
        { date: '21 апреля 2026', title: 'Калькулятор КБЖУ', text: 'В личном кабинете доступен расчёт дневной нормы калорий, белков, жиров и углеводов.' },
        { date: '20 апреля 2026', title: 'Рейтинг участников', text: 'Соревнуйтесь с другими участниками и попадите в топ лидеров платформы!' }
    ];
    
    container.innerHTML = news.map(item => `
        <div class="news-card">
            <div class="news-date">${item.date}</div>
            <h4>${item.title}</h4>
            <p>${item.text}</p>
        </div>
    `).join('');
}

function loadWeather() {
    const container = document.getElementById('weatherCard');
    if (!container) return;

    const weathers = [
        { icon: '☀️', temp: '+22°', desc: 'Солнечно', tip: 'Отлично для пробежки! 💧' },
        { icon: '⛅', temp: '+18°', desc: 'Облачно', tip: 'Идеально для прогулки 🌿' },
        { icon: '🌧️', temp: '+14°', desc: 'Дождь', tip: 'Тренировка дома 🎵' },
        { icon: '❄️', temp: '-5°', desc: 'Холодно', tip: 'Не забудь разминку! 🔥' }
    ];

    const weather = weathers[Math.floor(Math.random() * weathers.length)];

    container.innerHTML = `
        <div class="weather-side-content">
            <div class="weather-side-top">
                <span class="weather-side-icon">${weather.icon}</span>
                <span class="weather-side-temp">${weather.temp}</span>
            </div>
            <div class="weather-side-desc">${weather.desc}</div>
            <div class="weather-side-tip">${weather.tip}</div>
        </div>
    `;
}
function updateDateTime() {
    const now = new Date();
    const timeEl = document.getElementById('currentTimeDisplay');
    const dateEl = document.getElementById('currentDateDisplay');
    const miniDate = document.getElementById('miniDate');
    const miniDay = document.getElementById('miniDay');
    const miniMonth = document.getElementById('miniMonth');
    
    if (timeEl) timeEl.textContent = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    if (dateEl) dateEl.textContent = now.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', weekday: 'short' });
    if (miniDate) miniDate.textContent = now.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
    if (miniDay) miniDay.textContent = now.toLocaleDateString('ru-RU', { weekday: 'long' });
    
    // Календарь на месяц
    if (miniMonth) {
        const year = now.getFullYear();
        const month = now.getMonth(); // 0-11
        const today = now.getDate();
        
        const firstDay = new Date(year, month, 1).getDay(); // 0=вс
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        const monthNames = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
        const dayNames = ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'];
        
        let html = `<div class="cal-month-title">${monthNames[month]} ${year}</div>`;
        html += '<div class="cal-weekdays">';
        dayNames.forEach(d => { html += `<span>${d}</span>`; });
        html += '</div><div class="cal-days">';
        
        // Пустые ячейки до первого дня
        const startDay = firstDay === 0 ? 6 : firstDay - 1; // Пн=0
        for (let i = 0; i < startDay; i++) {
            html += '<span class="cal-empty"></span>';
        }
        
        // Дни месяца
        for (let d = 1; d <= daysInMonth; d++) {
            const isToday = d === today;
            html += `<span class="cal-day ${isToday ? 'cal-today' : ''}">${d}</span>`;
        }
        
        html += '</div>';
        miniMonth.innerHTML = html;
    }
}

// В DOMContentLoaded добавь:
updateDateTime();
setInterval(updateDateTime, 60000);
// ===== МУЗЫКАЛЬНЫЙ ПЛЕЕР =====
let currentTrack = 0;
let isPlaying = false;
let progressInterval;

// Обнови `tracks` и упрости плеер
const tracks = [
    { title: 'Power Up', artist: 'Epic Workout', duration: '03:45', totalSec: 225 },
    { title: 'Push Your Limits', artist: 'Gym Motivation', duration: '04:12', totalSec: 252 },
    { title: 'Beast Mode', artist: 'Training Mix', duration: '03:28', totalSec: 208 }
];

function selectTrack(index) {
    currentTrack = index;
    updatePlayerUI();
    resetProgress();
    if (isPlaying) startProgress();
}

function updatePlayerUI() {
    const track = tracks[currentTrack];
    document.querySelectorAll('.music-compact-track').forEach((el, i) => {
        el.classList.toggle('active', i === currentTrack);
    });
    const totalTime = document.getElementById('totalTime');
    if (totalTime) totalTime.textContent = track.duration;
}

function startProgress() {
    stopProgress();
    let elapsed = 0;
    const total = tracks[currentTrack].totalSec;
    
    progressInterval = setInterval(() => {
        elapsed++;
        const percent = (elapsed / total) * 100;
        const fill = document.getElementById('progressFill');
        const dot = document.querySelector('.progress-dot');
        const currentTime = document.getElementById('currentTime');
        
        if (fill) fill.style.width = percent + '%';
        if (dot) dot.style.left = percent + '%';
        if (currentTime) {
            const mins = Math.floor(elapsed / 60);
            const secs = elapsed % 60;
            currentTime.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
        }
        
        if (elapsed >= total) {
            nextTrack();
        }
    }, 1000);
}

function stopProgress() {
    clearInterval(progressInterval);
}

function resetProgress() {
    stopProgress();
    const fill = document.getElementById('progressFill');
    const dot = document.querySelector('.progress-dot');
    const currentTime = document.getElementById('currentTime');
    const totalTime = document.getElementById('totalTime');
    
    if (fill) fill.style.width = '0%';
    if (dot) dot.style.left = '0%';
    if (currentTime) currentTime.textContent = '0:00';
    if (totalTime) totalTime.textContent = tracks[currentTrack].duration;
}

function updatePlayerUI() {
    const track = tracks[currentTrack];
    document.querySelectorAll('.player-track').forEach((el, i) => {
        el.classList.toggle('active', i === currentTrack);
    });
    const totalTime = document.getElementById('totalTime');
    if (totalTime) totalTime.textContent = track.duration;
}

// ===== РЕЙТИНГ =====
function loadTopRating() {
    const container = document.getElementById('topRatingList');
    if (!container) return;
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const progress = JSON.parse(localStorage.getItem('progress') || '[]');
    const badges = JSON.parse(localStorage.getItem('badges') || '[]');
    
    const stats = users.map(user => {
        const userProgress = progress.filter(p => p.userId === user.id);
        const completed = userProgress.filter(p => p.completed).length;
        const active = userProgress.filter(p => !p.completed).length;
        const userBadges = badges.filter(b => b.userId === user.id).length;
        const maxStreak = Math.max(...userProgress.map(p => {
            if (!p.checkins.length) return 0;
            const sorted = [...p.checkins].sort((a, b) => b - a);
            let streak = 1;
            for (let i = 0; i < sorted.length - 1; i++) {
                if (sorted[i] - sorted[i + 1] === 1) streak++;
                else break;
            }
            return streak;
        }), 0);
        const score = completed * 100 + maxStreak * 10 + userBadges * 20 + active * 5;
        return { name: user.name, completed, active, maxStreak, badges: userBadges, score };
    }).sort((a, b) => b.score - a.score);
    
    if (!stats.length) { container.innerHTML = '<p class="no-participants">Пока нет участников</p>'; return; }
    
    container.innerHTML = stats.slice(0, 10).map((user, index) => {
        let medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1;
        return `
            <div class="top-rating-item">
                <span class="rating-position">${medal}</span>
                <span class="rating-avatar-small">${user.name.charAt(0).toUpperCase()}</span>
                <span class="rating-name">${user.name}</span>
                <span class="rating-value">${user.completed} 🏆 · ${user.maxStreak}🔥</span>
            </div>
        `;
    }).join('');
}
function getStreak(checkins) {
    if (!checkins || !checkins.length) return 0;
    const sorted = [...checkins].sort((a, b) => b - a);
    let streak = 1;
    for (let i = 0; i < sorted.length - 1; i++) {
        if (sorted[i] - sorted[i + 1] === 1) streak++;
        else break;
    }
    return streak;
}

function loadTournament() {
    const challenges = JSON.parse(localStorage.getItem('challenges') || '[]');
    const progress = JSON.parse(localStorage.getItem('progress') || '[]');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    const activeChallenges = challenges.filter(c => c.status === 'active');
    if (!activeChallenges.length) return;
    
    const tournamentChallenge = activeChallenges[Math.floor(Math.random() * activeChallenges.length)];
    
    const tc = document.getElementById('tournamentChallenge');
    if (tc) tc.innerHTML = `<h3>${tournamentChallenge.title}</h3><p>${tournamentChallenge.duration} дней</p>`;
    const link = document.getElementById('tournamentLink');
        if (link) link.href = `challenge.html?id=${tournamentChallenge.id}`;
    const timer = document.getElementById('tournamentTimer');
    if (timer) {
        const now = new Date();
        const endOfWeek = new Date();
        endOfWeek.setDate(now.getDate() + (7 - now.getDay()));
        const diff = endOfWeek - now;
        const days = Math.floor(diff / 86400000);
        timer.innerHTML = `⏱️ ${days} дней до конца турнира`;
    }
    
    const participants = progress.filter(p => p.challengeId === tournamentChallenge.id);
    const leaders = participants.map(p => {
        const user = users.find(u => u.id === p.userId);
        return {
            name: user?.name || 'Участник',
            checkins: p.checkins.length,
            streak: getStreak(p.checkins)
        };
    }).sort((a, b) => b.checkins - a.checkins).slice(0, 5);
    
    const container = document.getElementById('tournamentLeaders');
    if (container) {
        container.innerHTML = leaders.map((l, i) => {
            const medals = ['🥇', '🥈', '🥉', '4', '5'];
            return `<div class="tournament-leader">
                <span class="tournament-position">${medals[i]}</span>
                <span class="tournament-name">${l.name}</span>
                <span class="tournament-score">${l.checkins} дней · ${l.streak}🔥</span>
            </div>`;
        }).join('');
    }
}
let quizAnswers = {};

function answerQuiz(key, value) {
    quizAnswers[key] = value;
    
    if (key === 'goal') {
        document.getElementById('q1').style.display = 'none';
        document.getElementById('q2').style.display = 'block';
    } else if (key === 'time') {
        document.getElementById('q2').style.display = 'none';
        showQuizResult();
    }
}

function showQuizResult() {
    const challenges = JSON.parse(localStorage.getItem('challenges') || '[]');
    let filtered = challenges.filter(c => c.status === 'active' && c.category === quizAnswers.goal);
    if (!filtered.length) filtered = challenges.filter(c => c.status === 'active');
    
    const pick = filtered[Math.floor(Math.random() * filtered.length)];
    const result = document.getElementById('quizResult');
    if (result) {
        result.style.display = 'block';
        result.innerHTML = `
            <h3>🎯 Рекомендуем челлендж:</h3>
            <div class="recommended-challenge">
                <strong>${pick.title}</strong>
                <p>${pick.description}</p>
                <p>📅 ${pick.duration} дней</p>
                <a href="challenge.html?id=${pick.id}" class="btn btn-primary">Начать!</a>
            </div>
        `;
    }
}
function getStreak(checkins) {
    if (!checkins || !checkins.length) return 0;
    const sorted = [...checkins].sort((a, b) => b - a);
    let streak = 1;
    for (let i = 0; i < sorted.length - 1; i++) {
        if (sorted[i] - sorted[i + 1] === 1) streak++;
        else break;
    }
    return streak;
}

// ===== НАВИГАЦИЯ =====
let currentUser = null;

function checkAuth() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) currentUser = JSON.parse(savedUser);
    updateNavigation();
}

function updateNavigation() {
    const profileLink = document.getElementById('profileLink');
    const adminLink = document.getElementById('adminLink');
    const registerLink = document.getElementById('registerLink');
    const loginLink = document.getElementById('loginLink');
    const logoutBtn = document.getElementById('logoutBtn');

    if (currentUser) {
        if (profileLink) profileLink.style.display = 'inline';
        if (currentUser.role === 'admin' && adminLink) adminLink.style.display = 'inline';
        if (registerLink) registerLink.style.display = 'none';
        if (loginLink) loginLink.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'inline';
    } else {
        if (profileLink) profileLink.style.display = 'none';
        if (adminLink) adminLink.style.display = 'none';
        if (registerLink) registerLink.style.display = 'inline';
        if (loginLink) loginLink.style.display = 'inline';
        if (logoutBtn) logoutBtn.style.display = 'none';
    }
}

function logout() { localStorage.removeItem('currentUser'); currentUser = null; updateNavigation(); location.href = 'index.html'; }

// ===== ТЁМНАЯ ТЕМА =====
function initTheme() {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
        const icon = document.querySelector('#themeToggle i');
        if (icon) icon.className = 'fas fa-sun';
    }
}

function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    const icon = document.querySelector('#themeToggle i');
    if (icon) icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
}

// ===== УВЕДОМЛЕНИЯ =====
function loadNotifications() {
    const user = currentUser;
    if (!user) return;
    const container = document.getElementById('notificationList');
    const badge = document.getElementById('notificationBadge');
    if (!container) return;
    
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    const userNotifications = notifications.filter(n => n.userId === user.id).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    const unreadCount = userNotifications.filter(n => !n.read).length;
    if (badge) {
        if (unreadCount > 0) { badge.textContent = unreadCount > 9 ? '9+' : unreadCount; badge.style.display = 'flex'; }
        else badge.style.display = 'none';
    }
    
    if (!userNotifications.length) { container.innerHTML = '<p class="no-notifications">Нет уведомлений</p>'; return; }
    
    container.innerHTML = userNotifications.slice(0, 10).map(n => `
        <a href="${n.link}" class="notification-item ${n.read?'read':'unread'}" onclick="markAsRead(${n.id})">
            <div class="notification-icon">${n.type==='comment'?'💬':'❤️'}</div>
            <div class="notification-content"><p>${n.message}</p><span class="notification-time">${formatTime(n.createdAt)}</span></div>
        </a>
    `).join('');
}

function formatTime(date) {
    const d = new Date(date), now = new Date(), diff = now - d;
    const mins = Math.floor(diff/60000), hrs = Math.floor(diff/3600000), days = Math.floor(diff/86400000);
    if (mins < 1) return 'только что';
    if (mins < 60) return `${mins} мин назад`;
    if (hrs < 24) return `${hrs} ч назад`;
    return `${days} дн назад`;
}

function markAsRead(id) {
    const n = JSON.parse(localStorage.getItem('notifications')||'[]');
    const item = n.find(x => x.id === id);
    if (item) item.read = true;
    localStorage.setItem('notifications', JSON.stringify(n));
    loadNotifications();
}

function markAllRead() {
    if (!currentUser) return;
    const n = JSON.parse(localStorage.getItem('notifications')||'[]');
    n.forEach(x => { if (x.userId === currentUser.id) x.read = true; });
    localStorage.setItem('notifications', JSON.stringify(n));
    loadNotifications();
}

function toggleNotifications() {
    const dd = document.getElementById('notificationDropdown');
    if (dd) { dd.style.display = dd.style.display === 'none' ? 'block' : 'none'; loadNotifications(); }
}

// ===== ИНИЦИАЛИЗАЦИЯ =====
document.addEventListener('DOMContentLoaded', function() {
    initData(); checkAuth(); initTheme();
    loadPlatformStats(); loadDailyQuote(); loadNews(); loadWeather();updateDateTime();
    setInterval(updateDateTime, 60000);
    loadActiveChallenges(); loadTopRating(); loadTournament();
    resetProgress(); updatePlayerUI();feather.replace();

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) logoutBtn.addEventListener('click', logout);

    const profileLink = document.getElementById('profileLink');
    if (profileLink) profileLink.addEventListener('click', e => { e.preventDefault(); location.href = 'profile.html'; });

    const adminLink = document.getElementById('adminLink');
    if (adminLink) adminLink.addEventListener('click', e => { e.preventDefault(); location.href = 'admin.html'; });

    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);

    const nb = document.getElementById('notificationBtn');
    if (nb) nb.addEventListener('click', e => { e.stopPropagation(); toggleNotifications(); });
    document.addEventListener('click', () => { const dd = document.getElementById('notificationDropdown'); if (dd) dd.style.display = 'none'; });
    setInterval(() => { if (currentUser) loadNotifications(); }, 30000);
});