console.log('=== CHALLENGE PAGE ===');

// ===== ДАННЫЕ =====
function getCurrentUser() {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
}

function getChallengeId() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id'));
}

function getChallenge(id) {
    const challenges = JSON.parse(localStorage.getItem('challenges') || '[]');
    return challenges.find(c => c.id === id);
}

function getUserProgress(userId, challengeId) {
    const progress = JSON.parse(localStorage.getItem('progress') || '[]');
    return progress.find(p => p.userId === userId && p.challengeId === challengeId);
}

function formatDate(d) { return new Date(d).toLocaleDateString('ru-RU'); }

function getDaysSince(startDate) {
    const start = new Date(startDate);
    const today = new Date();
    start.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    return Math.max(0, Math.floor((today - start) / (1000 * 60 * 60 * 24)));
}

function isDayChecked(progress, dayIndex) {
    return progress && progress.checkins.includes(dayIndex);
}

function calculateStreak(checkins) {
    if (!checkins.length) return 0;
    const sorted = [...checkins].sort((a, b) => b - a);
    let streak = 1;
    for (let i = 0; i < sorted.length - 1; i++) {
        if (sorted[i] - sorted[i + 1] === 1) streak++;
        else break;
    }
    return streak;
}

function getParticipantsCount(challengeId) {
    const progress = JSON.parse(localStorage.getItem('progress') || '[]');
    return new Set(progress.filter(p => p.challengeId === challengeId).map(p => p.userId)).size;
}

// ===== ТАЙМЕР =====
function renderTimer(challenge, userProgress) {
    const startDate = new Date(userProgress.startDate);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + challenge.duration);
    
    const now = new Date();
    const diff = endDate - now;
    
    if (diff <= 0) return `<div class="timer-container finished"><div class="timer-title">🎉 Челлендж завершён!</div></div>`;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `<div class="timer-container"><div class="timer-title">⏱️ Осталось</div><div class="timer-blocks"><div class="timer-block"><span class="timer-value">${days}</span><span class="timer-label">дней</span></div><div class="timer-block"><span class="timer-value">${hours}</span><span class="timer-label">часов</span></div><div class="timer-block"><span class="timer-value">${minutes}</span><span class="timer-label">минут</span></div></div></div>`;
}

// ===== УЧАСТНИКИ =====
function getChallengeParticipants(challengeId) {
    const progress = JSON.parse(localStorage.getItem('progress') || '[]');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return progress.filter(p => p.challengeId === challengeId).map(p => {
        const user = users.find(u => u.id === p.userId);
        return { id: user?.id || p.userId, name: user?.name || 'Неизвестный', checkins: p.checkins.length, completed: p.completed, streak: calculateStreak(p.checkins) };
    }).sort((a, b) => b.checkins - a.checkins);
}

function getStreakForParticipant(checkins) {
    if (!checkins?.length) return 0;
    const sorted = [...checkins].sort((a, b) => b - a);
    let streak = 1;
    for (let i = 0; i < sorted.length - 1; i++) {
        if (sorted[i] - sorted[i + 1] === 1) streak++;
        else break;
    }
    return streak;
}

function renderParticipants(challengeId) {
    const container = document.getElementById('participantsList');
    if (!container) return;
    
    const progress = JSON.parse(localStorage.getItem('progress') || '[]');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    const participants = progress
        .filter(p => p.challengeId === challengeId)
        .map(p => {
            const user = users.find(u => u.id === p.userId);
            return {
                name: user?.name || 'Неизвестный',
                checkins: p.checkins?.length || 0,
                streak: getStreakForParticipant(p.checkins),
                completed: p.completed
            };
        })
        .sort((a, b) => b.checkins - a.checkins);
    
    if (!participants.length) {
        container.innerHTML = '<p style="color:var(--gray);text-align:center;padding:15px;">Пока никто не присоединился</p>';
        return;
    }
    
    container.innerHTML = participants.map((p, i) => {
        const medals = ['🥇', '🥈', '🥉'];
        return `
            <div class="participant-row">
                <span class="participant-pos">${medals[i] || i + 1}</span>
                <span class="participant-avatar">${p.name.charAt(0).toUpperCase()}</span>
                <span class="participant-name">${p.name}</span>
                <span class="participant-stats">${p.checkins} дн. · ${p.streak}🔥</span>
                ${p.completed ? '<span class="participant-done">✅</span>' : ''}
            </div>
        `;
    }).join('');
}

// ===== БЕЙДЖИ =====
function checkAndAwardBadges(userId, challengeId, checkinsCount, challenge) {
    const badges = JSON.parse(localStorage.getItem('badges') || '[]');
    const userBadges = badges.filter(b => b.userId === userId);
    const progress = JSON.parse(localStorage.getItem('progress') || '[]');
    const userChallenges = progress.filter(p => p.userId === userId);
    const userProgress = progress.find(p => p.userId === userId && p.challengeId === challengeId);
    
    const tryAdd = (type, name, desc, extra = {}) => {
        if (!userBadges.some(b => b.type === type && (extra.challengeId ? b.challengeId === extra.challengeId : true))) {
            badges.push({ id: Date.now(), userId, type, name, description: desc, ...extra, date: new Date().toISOString() });
            alert(`🎉 Новое достижение: ${name} — ${desc}`);
        }
    };
    
    if (userChallenges.length === 1) tryAdd('first', '🌟 Новичок', 'Первый челлендж!');
    if (checkinsCount >= 7) tryAdd('7days', '🔥 Огонь!', '7 дней подряд');
    if (checkinsCount === challenge.duration) {
        tryAdd('completed', `🏆 ${challenge.title}`, 'Челлендж пройден!', { challengeId });
        const allDays = [...Array(challenge.duration).keys()];
        if (userProgress && allDays.every(d => userProgress.checkins.includes(d))) tryAdd('perfect', '🎯 Снайпер', 'Ни одного пропуска!');
    }
    const completedCount = userChallenges.filter(p => p.completed).length;
    if (completedCount >= 3) tryAdd('athlete', '💪 Атлет', '3 челленджа завершено!');
    
    localStorage.setItem('badges', JSON.stringify(badges));
}

// ===== УВЕДОМЛЕНИЯ =====
function addNotification(userId, type, message, link) {
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    notifications.push({ id: Date.now(), userId, type, message, link, read: false, createdAt: new Date().toISOString() });
    localStorage.setItem('notifications', JSON.stringify(notifications));
}

// ===== КОММЕНТАРИИ =====
function getComments(challengeId) {
    return JSON.parse(localStorage.getItem('comments') || '[]').filter(c => c.challengeId === challengeId).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

function addComment(challengeId) {
    const user = getCurrentUser();
    if (!user) { location.href = 'login.html'; return; }
    const text = document.getElementById('commentText')?.value.trim();
    if (!text) { alert('Введите текст'); return; }
    
    const comments = JSON.parse(localStorage.getItem('comments') || '[]');
    comments.push({ id: Date.now(), challengeId, userId: user.id, userName: user.name, text, likes: [], createdAt: new Date().toISOString() });
    localStorage.setItem('comments', JSON.stringify(comments));
    document.getElementById('commentText').value = '';
    
    const challenge = getChallenge(challengeId);
    if (user.id !== 1) addNotification(1, 'comment', `${user.name} оставил(а) комментарий в «${challenge.title}»`, `challenge.html?id=${challengeId}`);
    renderComments(challengeId);
}

function deleteComment(commentId) {
    if (!confirm('Удалить?')) return;
    const comments = JSON.parse(localStorage.getItem('comments') || '[]');
    localStorage.setItem('comments', JSON.stringify(comments.filter(c => c.id !== commentId)));
    renderComments(getChallengeId());
}

function likeComment(commentId) {
    const user = getCurrentUser();
    if (!user) { location.href = 'login.html'; return; }
    
    const comments = JSON.parse(localStorage.getItem('comments') || '[]');
    const comment = comments.find(c => c.id === commentId);
    if (!comment.likes) comment.likes = [];
    
    const idx = comment.likes.indexOf(user.id);
    if (idx === -1) {
        comment.likes.push(user.id);
        if (comment.userId !== user.id) addNotification(comment.userId, 'like', `${user.name} ❤️ ваш комментарий`, `challenge.html?id=${getChallengeId()}`);
    } else comment.likes.splice(idx, 1);
    
    localStorage.setItem('comments', JSON.stringify(comments));
    renderComments(getChallengeId());
}

function renderComments(challengeId) {
    const container = document.getElementById('commentsList');
    if (!container) return;
    
    const comments = getComments(challengeId);
    const user = getCurrentUser();
    if (!comments.length) { container.innerHTML = '<p class="no-comments">Пока нет комментариев.</p>'; return; }
    
    container.innerHTML = comments.map(c => {
        const isAuthor = user && (user.id === c.userId || user.role === 'admin');
        const isLiked = user && c.likes?.includes(user.id);
        const likesCount = c.likes?.length || 0;
        const date = new Date(c.createdAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' });
        
        return `<div class="comment-item"><div class="comment-avatar">${c.userName.charAt(0).toUpperCase()}</div><div class="comment-content"><div class="comment-header"><span class="comment-author">${c.userName}</span><span class="comment-date">${date}</span></div><div class="comment-text">${c.text.replace(/\n/g,'<br>')}</div><div class="comment-actions"><button class="like-btn ${isLiked?'liked':''}" onclick="likeComment(${c.id})"><i class="far fa-heart"></i> <span>${likesCount}</span></button>${isAuthor?`<button class="comment-delete" onclick="deleteComment(${c.id})"><i class="fas fa-trash"></i></button>`:''}</div></div></div>`;
    }).join('');
}

// ===== ШЕРИНГ =====
function shareChallenge() {
    const user = getCurrentUser();
    const challengeId = getChallengeId();
    const challenge = getChallenge(challengeId);
    const userProgress = getUserProgress(user.id, challengeId);
    if (!userProgress) return;
    
    const text = `🔥 Я участвую в «${challenge.title}»!\n📊 Прогресс: ${Math.round((userProgress.checkins.length/challenge.duration)*100)}%\n💪 Присоединяйся!`;
    const url = window.location.href;
    
    const overlay = document.createElement('div');
    overlay.className = 'share-overlay';
    overlay.innerHTML = `<div class="share-modal"><div class="share-header"><h3>📤 Поделиться</h3><button class="share-close" onclick="this.closest('.share-overlay').remove()">×</button></div><div class="share-buttons"><a href="https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}" target="_blank" class="share-btn telegram"><i class="fab fa-telegram-plane"></i> Telegram</a><a href="https://vk.com/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}" target="_blank" class="share-btn vk"><i class="fab fa-vk"></i> ВКонтакте</a><a href="https://wa.me/?text=${encodeURIComponent(text+' '+url)}" target="_blank" class="share-btn whatsapp"><i class="fab fa-whatsapp"></i> WhatsApp</a><button class="share-btn copy" onclick="navigator.clipboard.writeText('${text.replace(/'/g,"\\'")} ${url}').then(()=>alert('✅ Скопировано!'))"><i class="far fa-copy"></i> Скопировать</button></div></div>`;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
}

// ===== ДЕЙСТВИЯ =====
function joinChallenge(challengeId) {
    const user = getCurrentUser();
    if (!user) { location.href = 'login.html'; return; }
    
    const challenges = JSON.parse(localStorage.getItem('challenges') || '[]');
    const challenge = challenges.find(c => c.id === challengeId);
    const progress = JSON.parse(localStorage.getItem('progress') || '[]');
    
    if (progress.find(p => p.userId === user.id && p.challengeId === challengeId)) { renderChallenge(); return; }
    
    progress.push({ id: Date.now(), userId: user.id, challengeId, startDate: new Date().toISOString(), checkins: [], completed: false });
    localStorage.setItem('progress', JSON.stringify(progress));
    alert(`✅ Вы присоединились к «${challenge.title}»!`);
    renderChallenge();
}

function checkDay(challengeId, dayIndex) {
    const user = getCurrentUser();
    if (!user) { location.href = 'login.html'; return; }
    
    const progressData = JSON.parse(localStorage.getItem('progress') || '[]');
    let up = progressData.find(p => p.userId === user.id && p.challengeId === challengeId);
    if (!up) { alert('Вы не присоединены'); return; }
    if (up.checkins.includes(dayIndex)) { alert('День уже отмечен!'); return; }
    
    const challenge = getChallenge(challengeId);
    if (dayIndex > getDaysSince(up.startDate)) { alert('Нельзя отметить будущий день!'); return; }
    
    up.checkins.push(dayIndex);
    if (up.checkins.length === challenge.duration) up.completed = true;
    localStorage.setItem('progress', JSON.stringify(progressData));
    
    checkAndAwardBadges(user.id, challengeId, up.checkins.length, challenge);
    renderChallenge();
}

function leaveChallenge(challengeId) {
    if (!confirm('Покинуть челлендж? Прогресс будет потерян.')) return;
    const user = getCurrentUser();
    const progress = JSON.parse(localStorage.getItem('progress') || '[]');
    localStorage.setItem('progress', JSON.stringify(progress.filter(p => !(p.userId === user.id && p.challengeId === challengeId))));
    location.href = 'challenges.html';
}

// ===== ОТРИСОВКА =====
function renderChallenge() {
    const container = document.getElementById('challengeContainer');
    const challengeId = getChallengeId();
    const challenge = getChallenge(challengeId);
    const user = getCurrentUser();
    
    if (!challenge) { container.innerHTML = '<p class="empty-message">Челлендж не найден</p>'; return; }
    
    const userProgress = user ? getUserProgress(user.id, challengeId) : null;
    
    // HTML для участников и комментариев (общий)
    const participantsHTML = `
        <div class="participants-section">
            <h3><i data-feather="users"></i> Участники (${getParticipantsCount(challengeId)})</h3>
            <div id="participantsList"></div>
        </div>
    `;
    
    const commentsHTML = `
        <div class="comments-section">
            <h3><i data-feather="message-square"></i> Комментарии</h3>
            <div class="comments-list" id="commentsList"></div>
            ${user ? `
                <div class="comment-form">
                    <textarea id="commentText" placeholder="Напишите комментарий..." rows="2"></textarea>
                    <button class="btn btn-primary" onclick="addComment(${challengeId})">Отправить</button>
                </div>
            ` : '<p class="comment-login-hint"><a href="login.html">Войдите</a>, чтобы комментировать</p>'}
        </div>
    `;
    
    if (!userProgress) {
        container.innerHTML = `
            <div class="challenge-detail-new">
                <a href="challenges.html" class="back-link"><i class="fas fa-arrow-left"></i> Назад</a>
                ${challenge.image ? `<div class="challenge-hero-image" style="background-image:url('${challenge.image}')"></div>` : ''}
                <div class="challenge-header"><span class="section-tag">${challenge.duration} дней</span><h2>${challenge.title}</h2><p>${challenge.description}</p></div>
                <div class="challenge-rules-new"><h3><i class="fas fa-list-check"></i> Правила</h3><p>${challenge.rules}</p></div>
                <div class="challenge-meta-new"><span><i class="far fa-user"></i> ${getParticipantsCount(challengeId)} участников</span><span class="challenge-status-badge ${challenge.status}">${challenge.status === 'active' ? 'Активен' : 'Завершен'}</span></div>
                ${challenge.status === 'active' ? `<button class="btn btn-primary" onclick="joinChallenge(${challengeId})"><i class="fas fa-play"></i> Присоединиться</button>` : `<button class="btn btn-secondary" disabled>Челлендж завершен</button>`}
                ${participantsHTML}
                ${commentsHTML}
            </div>`;
        renderParticipants(challengeId);
        renderComments(challengeId);
        return;
    }
    
    const daysSince = getDaysSince(userProgress.startDate);
    const progressPercent = Math.round((userProgress.checkins.length / challenge.duration) * 100);
    const completedDays = userProgress.checkins.length;
    const streak = calculateStreak(userProgress.checkins);
    
    let calendarHtml = '<div class="calendar-grid-new">';
    for (let i = 0; i < challenge.duration; i++) {
        const checked = isDayChecked(userProgress, i);
        const isToday = i === daysSince;
        const isPast = i <= daysSince;
        let cls = 'calendar-day-new';
        if (checked) cls += ' completed';
        else if (isPast) cls += ' missed';
        if (isToday) cls += ' today';
        const onclick = (isPast && !checked) ? `onclick="checkDay(${challengeId}, ${i})"` : '';
        calendarHtml += `<div class="${cls}" ${onclick}>${i + 1}</div>`;
    }
    calendarHtml += '</div>';
    
    container.innerHTML = `
        <div class="challenge-detail-new">
            <a href="challenges.html" class="back-link"><i class="fas fa-arrow-left"></i> Назад</a>
            ${challenge.image ? `<div class="challenge-hero-image" style="background-image:url('${challenge.image}')"></div>` : ''}
            <div class="challenge-header"><span class="section-tag">${challenge.duration} дней</span><h2>${challenge.title}</h2></div>
            ${renderTimer(challenge, userProgress)}
            <div class="progress-stats-new">
                <div class="progress-stat"><div class="progress-stat-value">${progressPercent}%</div><div class="progress-stat-label">Прогресс</div></div>
                <div class="progress-stat"><div class="progress-stat-value">${completedDays}/${challenge.duration}</div><div class="progress-stat-label">Дней</div></div>
                <div class="progress-stat"><div class="progress-stat-value">${streak} 🔥</div><div class="progress-stat-label">Серия</div></div>
            </div>
            <div class="progress-bar-new"><div class="progress-fill-new" style="width:${progressPercent}%"></div></div>
            <div class="calendar-section-new"><h3><i class="far fa-calendar-alt"></i> Календарь</h3>${calendarHtml}<p class="calendar-hint"><i class="fas fa-info-circle"></i> Нажми на прошедший день</p></div>
            <div class="challenge-actions-new">
                ${challenge.status === 'active' && !isDayChecked(userProgress, daysSince) ? `<button class="btn btn-primary" onclick="checkDay(${challengeId},${daysSince})"><i class="fas fa-check"></i> Отметить сегодня</button>` : ''}
                <button class="btn btn-outline-dark" onclick="shareChallenge()"><i class="fas fa-share-alt"></i> Поделиться</button>
                <button class="btn btn-danger" onclick="leaveChallenge(${challengeId})"><i class="fas fa-sign-out-alt"></i> Покинуть</button>
            </div>
            <div class="challenge-info-new"><p><i class="far fa-calendar-check"></i> Начат: ${formatDate(userProgress.startDate)}</p><p><i class="fas fa-list-check"></i> ${challenge.rules}</p></div>
            ${participantsHTML}
            ${commentsHTML}
        </div>`;
    
    renderParticipants(challengeId);
    renderComments(challengeId);
}

// ===== НАВИГАЦИЯ =====
function updateNav() {
    const user = getCurrentUser();
    const profileLink = document.getElementById('profileLink');
    const adminLink = document.getElementById('adminLink');
    const registerLink = document.getElementById('registerLink');
    const loginLink = document.getElementById('loginLink');
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (user) {
        if (profileLink) profileLink.style.display = 'inline';
        if (user.role === 'admin' && adminLink) adminLink.style.display = 'inline';
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

function logout() { localStorage.removeItem('currentUser'); location.href = 'index.html'; }

document.addEventListener('DOMContentLoaded', () => {
    updateNav();
    renderChallenge();
    document.getElementById('logoutBtn')?.addEventListener('click', logout);
    document.getElementById('profileLink')?.addEventListener('click', e => { e.preventDefault(); location.href = 'profile.html'; });
    document.getElementById('adminLink')?.addEventListener('click', e => { e.preventDefault(); location.href = 'admin.html'; });
    
    // Автообновление комментариев
    setInterval(() => {
        const cid = getChallengeId();
        if (cid) renderComments(cid);
    }, 5000);
});