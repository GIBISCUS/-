let currentUser = JSON.parse(localStorage.getItem('currentUser'));
let currentFilter = 'all';
let currentCategory = 'all';

function fixCategories() {
    const challenges = JSON.parse(localStorage.getItem('challenges') || '[]');
    const cats = { 1:'strength',2:'strength',3:'cardio',4:'cardio',5:'mind',6:'health',7:'mind',8:'strength',9:'health',10:'health',11:'mind',12:'strength',13:'cardio',14:'mind' };
    let u = false;
    challenges.forEach(c => { if(!c.category){ c.category = cats[c.id]||'health'; u = true; } });
    if(u){ localStorage.setItem('challenges', JSON.stringify(challenges)); }
}

function getParticipantsCount(cid) {
    const p = JSON.parse(localStorage.getItem('progress')||'[]');
    return new Set(p.filter(x => x.challengeId === cid).map(x => x.userId)).size;
}
function isUserJoined(cid) {
    if(!currentUser) return false;
    return JSON.parse(localStorage.getItem('progress')||'[]').some(p => p.userId === currentUser.id && p.challengeId === cid);
}
function getDaysSince(sd){ const s=new Date(sd),t=new Date(); s.setHours(0,0,0,0); t.setHours(0,0,0,0); return Math.max(0,Math.floor((t-s)/(1000*60*60*24))); }
function isTodayChecked(cid){ if(!currentUser)return false; const p=JSON.parse(localStorage.getItem('progress')||'[]'); const up=p.find(x=>x.userId===currentUser.id&&x.challengeId===cid); return up?up.checkins.includes(getDaysSince(up.startDate)):false; }

function joinChallenge(cid) {
    if(!currentUser){location.href='login.html';return;}
    if(isUserJoined(cid)){location.href=`challenge.html?id=${cid}`;return;}
    const p=JSON.parse(localStorage.getItem('progress')||'[]');
    p.push({id:Date.now(),userId:currentUser.id,challengeId:cid,startDate:new Date().toISOString(),checkins:[],completed:false});
    localStorage.setItem('progress',JSON.stringify(p));
    alert('✅ Присоединились!');
    loadChallenges(currentFilter);
}

function loadChallenges(filter) {
    currentFilter = filter;
    const grid = document.getElementById('challengesGrid');
    const noMsg = document.getElementById('noChallengesMessage');
    const search = document.getElementById('searchInput')?.value.toLowerCase() || '';
    let filtered = JSON.parse(localStorage.getItem('challenges')||'[]');

    if(filter==='active') filtered=filtered.filter(c=>c.status==='active');
    else if(filter==='finished') filtered=filtered.filter(c=>c.status==='finished');
    if(search) filtered=filtered.filter(c=>c.title.toLowerCase().includes(search)||c.description.toLowerCase().includes(search));
    if(currentCategory!=='all') filtered=filtered.filter(c=>c.category===currentCategory);

    if(!filtered.length){grid.innerHTML='';noMsg.style.display='block';return;}
    noMsg.style.display='none';

    const dimg=['https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80','https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=80','https://images.unsplash.com/photo-1574680096145-d05b474b1e0c?w=400&q=80','https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80'];

    grid.innerHTML = filtered.map((c,i) => {
        const parts=getParticipantsCount(c.id), joined=isUserJoined(c.id), tc=joined&&isTodayChecked(c.id);
        let btn='';
        if(!currentUser) btn=`<a href="login.html" class="btn btn-outline" style="width:100%;text-align:center;">Войти</a>`;
        else if(c.status==='finished') btn=`<button class="btn btn-secondary" disabled style="width:100%;">Завершен</button>`;
        else if(joined) btn=`<a href="challenge.html?id=${c.id}" class="btn btn-primary" style="width:100%;text-align:center;">Продолжить</a>`;
        else btn=`<button class="btn btn-primary" onclick="joinChallenge(${c.id})" style="width:100%;">Присоединиться</button>`;

        return `<div class="challenge-card-full"><div class="challenge-card-image" style="background-image:url('${c.image||dimg[i%dimg.length]}')"><span class="challenge-status-badge ${c.status}">${c.status==='active'?'Активен':'Завершен'}</span>${tc?'<span class="today-badge"><i class="fas fa-check"></i></span>':''}</div><div class="challenge-card-content"><span class="challenge-duration-badge"><i class="far fa-calendar"></i> ${c.duration} дней</span><h3>${c.title}</h3><p>${c.description}</p><div class="challenge-card-meta"><span><i class="far fa-user"></i> ${parts} участников</span></div>${btn}</div></div>`;
    }).join('');
}

function updateNav() {
    if(currentUser){
        document.getElementById('profileLink').style.display='inline';
        if(currentUser.role==='admin')document.getElementById('adminLink').style.display='inline';
        document.getElementById('registerLink').style.display='none';
        document.getElementById('loginLink').style.display='none';
        document.getElementById('logoutBtn').style.display='inline';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fixCategories();
    updateNav();
    loadChallenges('all');

    document.querySelectorAll('.filter-btn-new').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn-new').forEach(b=>b.classList.remove('active'));
            this.classList.add('active');
            loadChallenges(this.dataset.filter);
        });
    });

    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.category-btn').forEach(b=>b.classList.remove('active'));
            this.classList.add('active');
            currentCategory = this.dataset.category;
            loadChallenges(currentFilter);
        });
    });

    document.getElementById('searchInput')?.addEventListener('input', () => loadChallenges(currentFilter));
    document.getElementById('logoutBtn')?.addEventListener('click', () => { localStorage.removeItem('currentUser'); location.href='index.html'; });
    document.getElementById('profileLink')?.addEventListener('click', e => { e.preventDefault(); location.href='profile.html'; });
    document.getElementById('adminLink')?.addEventListener('click', e => { e.preventDefault(); location.href='admin.html'; });
});