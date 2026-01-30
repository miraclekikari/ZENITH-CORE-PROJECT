// --- CONFIGURATION ---
const _supabase = supabase.createClient('https://ubmewtlymrnbcamanjhs.supabase.co', 'sb_publishable_EY6s8jOGhajZ_aBjQgLkdQ_58aiZhxO');

// ALGORITHME SENTINEL (Modération locale)
const FORBIDDEN_WORDS = ['merde', 'con', 'connard', 'arnaque', 'fake', 'idiot'];
function sentinelCheck(text) {
    const lower = text.toLowerCase();
    for(let word of FORBIDDEN_WORDS) {
        if(lower.includes(word)) return false; // Rejeté
    }
    return true; // Validé
}

// --- NAVIGATION ---
function nav(pageId) {
    document.querySelectorAll('.view-section').forEach(el => el.classList.add('hidden'));
    document.getElementById(pageId).classList.remove('hidden');
    
    // Active class sidebar
    document.querySelectorAll('.nav-icon').forEach(el => el.classList.remove('active'));
    event.currentTarget.classList.add('active');
}

// --- MODULE LATEX & PDF ---
function updateLatex() {
    const input = document.getElementById('latex-input').value;
    const preview = document.getElementById('latex-preview');
    preview.innerHTML = input; // Injection brute pour le texte
    // Appel à MathJax pour le rendu mathématique
    if(window.MathJax) {
        MathJax.typesetPromise([preview]).catch((err) => console.log(err));
    }
}

function exportPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const content = document.getElementById('latex-preview').innerText;
    
    doc.text("ZENITH CORE - DOCUMENT", 10, 10);
    doc.text(content, 10, 20); // Version simplifiée (le vrai rendu LaTeX en PDF JS est très complexe)
    doc.save("document_zenith.pdf");
    alert("Téléchargement lancé !");
}

// --- MODULE IA (GEMINI INTEGRATION) ---
async function askGemini() {
    const input = document.getElementById('ai-input');
    const container = document.getElementById('chat-container');
    const question = input.value;
    if(!question) return;

    // 1. Afficher la question
    container.innerHTML += `<div style="text-align:right; margin:10px; color:var(--primary)">${question}</div>`;
    input.value = '';

    // 2. Simulation Appel API (Pour sécurité frontend, on ne met pas la clé ici en clair)
    container.innerHTML += `<div style="margin:10px; color:#888;"><i>Zenith AI réfléchit...</i></div>`;
    
    setTimeout(() => {
        // Pour activer la vraie IA, remplace ceci par un fetch vers ton API Proxy
        const response = "Je suis l'IA Zenith. J'ai analysé votre demande. Voici une réponse optimisée : " + question.split(' ').reverse().join(' ') + " (Mode Demo)";
        container.lastElementChild.innerHTML = `<div style="text-align:left; color:white;">🤖 ${response}</div>`;
    }, 1000);
}

// --- SOCIAL & SHORTS ---
async function loadFeed() {
    // Ici on chargerait depuis Supabase. Simulation pour fluidité :
    const feed = document.getElementById('feed-content');
    feed.innerHTML = `
        <div class="shorts-container">
            <div class="short-card"><img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32" class="short-video"><div style="position:absolute; bottom:10px; left:10px; font-weight:bold;">Tuto Code</div></div>
            <div class="short-card"><img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b" class="short-video"><div style="position:absolute; bottom:10px; left:10px; font-weight:bold;">Hack Life</div></div>
            <div class="short-card"><img src="https://images.unsplash.com/photo-1511512578047-dfb367046420" class="short-video"><div style="position:absolute; bottom:10px; left:10px; font-weight:bold;">Setup Dream</div></div>
        </div>
    `;
    // Ajout d'un post standard
    feed.innerHTML += `
        <div class="glass-card" style="margin-top:20px; padding:20px; border-radius:15px; background:rgba(255,255,255,0.05);">
            <div style="display:flex; align-items:center; gap:10px;">
                <div style="width:40px; height:40px; background:purple; border-radius:50%;"></div>
                <div><b>Admin Zenith</b> <span class="badge">STAFF</span><br><span style="font-size:0.8em; color:gray;">Il y a 2 min</span></div>
            </div>
            <p style="margin-top:15px;">La mise à jour v5.0 est déployée ! Profitez du module LaTeX et de l'IA.</p>
        </div>
    `;
}

async function publishPost() {
    const txt = prompt("Votre message :");
    if(!txt) return;

    // SENTINEL CHECK
    if(!sentinelCheck(txt)) {
        alert("⛔ ALERTE SENTINEL : Contenu non autorisé détecté. Soyez respectueux.");
        return;
    }

    // SI OK -> Envoi Supabase (simulé ici)
    alert("✅ Validé par Sentinel. Publication en cours...");
    // await _supabase.from('posts').insert({content: txt});
}

// INITIALISATION
window.onload = () => {
    loadFeed();
    // Message de bienvenue audio
    console.log("Zenith System : Online");
}
