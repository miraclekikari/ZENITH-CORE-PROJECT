// CONNEXION SUPABASE
const _supabase = supabase.createClient('https://ubmewtlymrnbcamanjhs.supabase.co', 'sb_publishable_EY6s8jOGhajZ_aBjQgLkdQ_58aiZhxO');

// CONFIGURATION DES MENUS LATÉRAUX
const sideMenus = {
    courses: [
        {header: "PARCOURS"},
        {icon: 'fa-network-wired', label: 'Réseaux & Infra'},
        {icon: 'fa-code', label: 'Développement Web'},
        {icon: 'fa-shield-alt', label: 'Cybersécurité'},
        {header: "DOSSIERS"},
        {icon: 'fa-bookmark', label: 'Favoris'},
        {icon: 'fa-history', label: 'Historique'}
    ],
    community: [
        {header: "SOCIAL"},
        {icon: 'fa-fire', label: 'Tendances Campus'},
        {icon: 'fa-user-friends', label: 'Mon Cercle'},
        {header: "INTERACTIONS"},
        {icon: 'fa-poll', label: 'Sondages'},
        {icon: 'fa-trophy', label: 'Classement XP'}
    ],
    publish: [
        {icon: 'fa-pen-fancy', label: 'Nouvel Article'},
        {icon: 'fa-code', label: 'Partager Code'},
        {icon: 'fa-image', label: 'Projet Portfolio'}
    ],
    labo: [
        {header: "OUTILS DEV"},
        {icon: 'fa-terminal', label: 'Terminal JS'},
        {icon: 'fa-laptop-code', label: 'Éditeur Web'},
        {icon: 'fa-database', label: 'Validateur JSON'},
        {header: "UTILITAIRES"},
        {icon: 'fa-calculator', label: 'Calculatrice'},
        {icon: 'fa-stopwatch', label: 'Pomodoro'},
        {icon: 'fa-bug', label: 'Debug Log'}
    ],
    settings: [
        {header: "COMPTE"},
        {icon: 'fa-id-card', label: 'Badge & Certif'},
        {icon: 'fa-moon', label: 'Mode Sombre (ON)'},
        {icon: 'fa-headset', label: 'Support Admin'}
    ]
};

// FONCTION : CHANGER D'ONGLET
function switchTab(tabId) {
    // 1. Mise à jour boutons bas
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    // On cherche le bouton qui contient le onclick correspondant (astuce simple)
    const activeBtn = Array.from(document.querySelectorAll('.nav-btn')).find(b => b.getAttribute('onclick').includes(tabId));
    if(activeBtn) activeBtn.classList.add('active');

    // 2. Mise à jour Sidebar
    const sideContent = document.getElementById('side-content');
    sideContent.innerHTML = '';
    (sideMenus[tabId] || []).forEach(item => {
        if(item.header) {
            sideContent.innerHTML += `<div style="padding: 15px 20px 5px; color:var(--primary); font-size:0.8rem; font-weight:bold; letter-spacing:1px;">${item.header}</div>`;
        } else {
            sideContent.innerHTML += `
                <div class="side-item" onclick="alert('Module [${item.label}] bientôt disponible !')">
                    <i class="fas ${item.icon}"></i>
                    <span class="side-label">${item.label}</span>
                </div>`;
        }
    });

    // 3. Afficher le contenu
    renderContent(tabId);
}

// FONCTION : AFFICHER LE CONTENU CENTRAL
function renderContent(tabId) {
    const body = document.getElementById('view-body');
    const title = document.getElementById('view-title');

    if(tabId === 'courses') {
        title.innerText = "ACADÉMIE ZENITH";
        body.innerHTML = `
            <div class="glass-card" style="display:flex; gap:20px; align-items:center; flex-wrap:wrap;">
                <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc51" style="width:120px; height:120px; border-radius:12px; object-fit:cover; border:2px solid var(--primary);">
                <div>
                    <span style="color:var(--primary); font-weight:bold; letter-spacing:1px;">⚡ MODULE RECOMMANDÉ</span>
                    <h3 style="margin:10px 0; font-size:1.3rem;">Initiation aux Réseaux</h3>
                    <p style="color:var(--text-dim);">Comprendre l'infrastructure du web moderne.</p>
                    <button style="margin-top:15px; background:var(--primary); color:black; border:none; padding:10px 25px; border-radius:8px; font-weight:bold; cursor:pointer;" onclick="location.href='course.html?id=permanent'">COMMENCER</button>
                </div>
            </div>`;
    } else if(tabId === 'labo') {
        title.innerText = "BOÎTE À OUTILS";
        body.innerHTML = `
            <div class="grid-tools">
                <div class="tool-box"><i class="fas fa-calculator"></i><span>Calculatrice</span></div>
                <div class="tool-box"><i class="fas fa-terminal"></i><span>Console JS</span></div>
                <div class="tool-box"><i class="fas fa-code"></i><span>Éditeur Web</span></div>
                <div class="tool-box"><i class="fas fa-key"></i><span>Générateur</span></div>
                <div class="tool-box"><i class="fas fa-stopwatch"></i><span>Pomodoro</span></div>
                <div class="tool-box"><i class="fas fa-bug"></i><span>Debug</span></div>
            </div>`;
    } else {
        title.innerText = `MODULE ${tabId.toUpperCase()}`;
        body.innerHTML = `<div class="glass-card" style="text-align:center; padding:50px;"><i class="fas fa-sync fa-spin" style="font-size:2rem; margin-bottom:20px;"></i><p>Chargement du système...</p></div>`;
    }
}

// AUTO-START
setTimeout(() => { switchTab('courses'); }, 3800);
