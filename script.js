// Copiar discord
function copiarDiscord() {

    navigator.clipboard.writeText("r3dr0")
        .then(() => {
            alert(" Usuário do Discord copiado!\n\nAgora é só colar no Discord e enviar o pedido de amizade.");
        })
        .catch(() => {
            alert("Não foi possível copiar automaticamente.\n\nMeu usuário é: r3dr0");
        });

}

//Player Flutuante
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let ytPlayer;
let playlistVideos = [];
let isPlaying = false;
let updateInterval;
let playlistCarregadaNoPlayer = false;

const apiKey = 'AIzaSyDoETowTUa3YtHrii41dcoYAnH3NDoYee4'; 
const playlistId = 'PLWnv4f4xWxqU';
const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${apiKey}`;

fetch(playlistUrl)
    .then(res => res.json())
    .then(data => {
        if (data.items && data.items.length > 0) {
            playlistVideos = data.items
                .filter(item => item.snippet && item.snippet.resourceId)
                .map(item => ({
                    id: item.snippet.resourceId.videoId,
                    title: item.snippet.title,
                    thumbnail: item.snippet.thumbnails.high ? item.snippet.thumbnails.high.url : item.snippet.thumbnails.default.url
                }));
            
            playlistVideos.sort(() => Math.random() - 0.5);
            
            document.getElementById('player-title').textContent = playlistVideos[0].title;
            document.getElementById('player-cover').src = playlistVideos[0].thumbnail;
        }
    })
    .catch(err => console.error("Erro na API:", err));

function onYouTubeIframeAPIReady() {
    ytPlayer = new YT.Player('youtube-hidden-player', {
        height: '200',
        width: '200',
        playerVars: {
            'controls': 0,
            'disablekb': 1,
            'rel': 0
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            'onError': onPlayerError
        }
    });
}

function onPlayerReady(event) {
    configurarControlesCustomizados();
}

function onPlayerStateChange(event) {
    const playBtn = document.getElementById('pl-play');
    const vinyl = document.getElementById('player-vinyl');

    if (event.data == YT.PlayerState.PLAYING) {
        isPlaying = true;
        playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        vinyl.classList.add('playing');
        
        atualizarMetadadosFaixa();
        
        clearInterval(updateInterval);
        updateInterval = setInterval(atualizarLinhaProgresso, 500);
    } else if (event.data == YT.PlayerState.PAUSED || event.data == YT.PlayerState.ENDED) {
        isPlaying = false;
        playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        vinyl.classList.remove('playing');
        clearInterval(updateInterval);
    }
    
    if (event.data == YT.PlayerState.BUFFERING) {
        atualizarMetadadosFaixa();
    }
}

function onPlayerError(event) {
    console.warn("Este vídeo não pôde ser reproduzido, pulando para o próximo...", event.data);
    if (ytPlayer && typeof ytPlayer.nextVideo === 'function') {
        ytPlayer.nextVideo();
    }
}

function atualizarMetadadosFaixa() {
    if (!ytPlayer || typeof ytPlayer.getPlaylistIndex !== 'function') return;
    
    const currentIndex = ytPlayer.getPlaylistIndex();
    if (playlistVideos[currentIndex]) {
        const track = playlistVideos[currentIndex];
        document.getElementById('player-title').textContent = track.title;
        document.getElementById('player-cover').src = track.thumbnail;
    }
}

function atualizarLinhaProgresso() {
    if (!ytPlayer || !isPlaying) return;
    const currentTime = ytPlayer.getCurrentTime();
    const duration = ytPlayer.getDuration();
    const progressBar = document.getElementById('player-progress');
    
    if (duration > 0) {
        progressBar.max = duration;
        progressBar.value = currentTime;
    }
}

function configurarControlesCustomizados() {
    const playBtn = document.getElementById('pl-play');
    const nextBtn = document.getElementById('pl-next');
    const prevBtn = document.getElementById('pl-prev');
    const muteBtn = document.getElementById('pl-mute');
    const progressBar = document.getElementById('player-progress');

    playBtn.addEventListener('click', () => {
        if (playlistVideos.length === 0) return;

        if (!playlistCarregadaNoPlayer) {
            const idsLista = playlistVideos.map(v => v.id);
            ytPlayer.unMute();
            ytPlayer.loadPlaylist({
                playlist: idsLista
            });
            playlistCarregadaNoPlayer = true;
            isPlaying = true;
            
            playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
            document.getElementById('player-vinyl').classList.add('playing');
            return;
        }

        if (!isPlaying) {
            ytPlayer.playVideo();
        } else {
            ytPlayer.pauseVideo();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (playlistCarregadaNoPlayer) {
            ytPlayer.nextVideo();
            setTimeout(atualizarMetadadosFaixa, 400);
        }
    });
    
    prevBtn.addEventListener('click', () => {
        if (playlistCarregadaNoPlayer) {
            ytPlayer.previousVideo();
            setTimeout(atualizarMetadadosFaixa, 400);
        }
    });

    muteBtn.addEventListener('click', () => {
        if (ytPlayer.isMuted()) {
            ytPlayer.unMute();
            muteBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
        } else {
            ytPlayer.mute();
            muteBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
        }
    });

    progressBar.addEventListener('input', () => {
        if (playlistCarregadaNoPlayer) {
            ytPlayer.seekTo(progressBar.value, true);
        }
    });
}


//Tradução
const traducoes = {
    pt: {
        navHome: "Home",
        navSobre: "Sobre",
        navPortfolio: "Portfólio",
        navServicos: "Serviços",
        navContato: "Contato",
        
        // Hero
        heroLabel: "S U B T I T L E &nbsp; E D I T O R",
        heroTitle: "CHIYORI",
        heroDesc: "MÚSICA GEEK, TRANSCREVIDA<br>COM CARINHO",
        heroHighlights: "Carinho • Ritmo • Precisão",
        heroCta: 'VER PROJETOS <i class="fa-solid fa-arrow-right"></i>',
        recentesTitle: "Legendas Recentes",
        
        // Sobre
        sobreLabel: "S O B R E",
        sobreTitle: 'Pode me<br>chamar de <span class="text-blue">Yori</span>',
        aboutCard: `<p>Oii, bom dia, boa tarde ou uma boa noite! Podem me chamar de <strong>Yori</strong>, ou quaisquer apelidos e pronomes que preferirem.<br>Gosto de várias coisinhas — se quiser conversar, pode chamar!</p>
                    <p>Faço <strong>legendas</strong> personalizadas no <strong>YouTube</strong>, com bastante carinho.</p>
                    <p>Costumo ficar mais ativo no <strong>Discord</strong></p>`,
        atuacaoLabel: "ATUAÇÃO",
        nichoLabel: "NICHO",
        nichoValue: "Música geek & anime",
        sempreAqui: "Sempre por aqui",
        
        // Portfólio
        portTitle: "Portfólio",
        portDesc: "Alguns exemplos de clipes que já legendei — clique para assistir.",
        portClip1Title: "Código Corrompido",
        portClip1Info: "Yunotai | 2025",
        portClip2Title: "Rota Genocida",
        portClip2Info: "LQX | 2026",
        portClip3Title: "Coração da Montanha",
        portClip3Info: "Komorii | 2026",
        
        // Serviços
        servLabel: "S E R V I Ç O S",
        servTitle: 'Tabela de<br><span class="text-blue">preços</span>',
        regra1: "<strong>Como funciona</strong><p>Vídeos acima de <strong>5 minutos</strong>: +R$5 por<br>minuto adicional</p>",
        regra2: "<p><strong>Efeitos básicos:</strong> Fade ou <strong>Karaokê</strong></p>",
        regra3: "<p><strong>Efeitos avançados:</strong> Todos que sei<br>+ qualquer um que você quiser!</p>",
        regra4: "<p>Na compra da <strong>Avançada</strong>, a <strong>Básica</strong> já<br>vem incluída automaticamente</p>",
        regra5: "<p>Valores sujeitos a alterações — sempre<br>aberto para dúvidas e negociações!</p>",
        
        // Preços e Conteúdos
        cardBasicaTitle: "Legenda Básica",
        priceBasica: "R$ 20",
        cardBasicaItem1: "Legenda cronometrada",
        cardBasicaItem2: "Efeito Fade ou Karaokê básico",
        
        cardAvancadaTitle: "Legenda Avançada",
        badgeDestaque: "MAIS PEDIDA",
        priceAvancada: "R$ 50",
        cardAvancadaItem2: "Efeitos personalizados",
        cardAvancadaItem3: "Estilização visual única pro clipe",
        
        cardFixoTitle: "Fixo",
        priceFixo: "R$ 35",
        cardFixoItem1: "Serviços fixo para canal",
        cardFixoItem2: "Legendas recorrentes",
        cardFixoItem3: "Valor fixo mensal",
        
        // Contato
        contLabel: "C O N T A T O",
        contTitle: 'Vamos trabalhar<br><span class="text-blue">juntos?</span>',
        contText: "Tem um projeto em mente? Me manda uma mensagem e vamos conversar sobre como posso te ajudar!",
        labelNome: "Nome",
        labelEmail: "Email",
        labelAssunto: "Assunto",
        labelMensagem: "Mensagem",
        btnEnviar: "Enviar",
        // footer
        footerContent: "𓆩༺ Feito por Meiko & Chiyori ༻𓆪"
    },
    en: {
        navHome: "Home",
        navSobre: "About",
        navPortfolio: "Portfolio",
        navServicos: "Services",
        navContato: "Contact",
        
        // Hero
        heroLabel: "S U B T I T L E &nbsp; E D I T O R",
        heroTitle: "CHIYORI",
        heroDesc: "GEEK MUSIC, TRANSCRIBED<br>WITH CARE",
        heroHighlights: "Care • Rhythm • Precision",
        heroCta: 'VIEW PROJECTS <i class="fa-solid fa-arrow-right"></i>',
        recentesTitle: "Recent Subtitles",
        
        // Sobre
        sobreLabel: "A B O U T",
        sobreTitle: 'You can<br>call me <span class="text-blue">Chiyo</span>',
        aboutCard: `<p>Hi, good morning, afternoon, or evening! You can call me <strong>Chiyo</strong>, or any nicknames and pronouns you prefer.<br>I like a lot of things — if you want to chat, feel free to reach out!</p>
                    <p>I make custom <strong>subtitles</strong> on <strong>YouTube</strong>, with a lot of care.</p>
                    <p>I\'m usually most active on <strong>Discord</strong></p>`,
        atuacaoLabel: "ROLE",
        nichoLabel: "NICHE",
        nichoValue: "Geek music & anime",
        sempreAqui: "Always around",
        
        // Portfólio
        portTitle: "Portfolio",
        portDesc: "Some examples of music videos I've subtitled — click to watch.",
        portClip1Title: "Part-time Idol Declaration",
        portClip1Info: "rachie 🎀💌 | 2026",
        portClip2Title: "Dilemma",
        portClip2Info: "rachie 🎀💌 | 2026",
        portClip3Title: "Montblanc",
        portClip3Info: "rachie 🎀💌 | 2026",
        
        // Serviços
        servLabel: "S E R V I C E S",
        servTitle: 'Pricing<br><span class="text-blue">Table</span>',
        regra1: "<strong>How it works</strong><p>Videos over <strong>5 minutes</strong>: +$3 per<br>additional minute</p>",
        regra2: "<p><strong>Basic effects:</strong> Fade or basic <strong>Karaoke</strong></p>",
        regra3: "<p><strong>Advanced effects:</strong> Everything I know<br>+ any effect you want!</p>",
        regra4: "<p>When buying the <strong>Advanced</strong>, the <strong>Basic</strong> is<br>automatically included</p>",
        regra5: "<p>Prices subject to change — always<br>open to questions and negotiations!</p>",
        
        // Preços e Conteúdos
        cardBasicaTitle: "Basic Subtitle",
        priceBasica: "$ 15",
        cardBasicaItem1: "Timed subtitles",
        cardBasicaItem2: "Fade effect or basic effects",
        
        cardAvancadaTitle: "Advanced Subtitle",
        badgeDestaque: "MOST POPULAR",
        priceAvancada: "$ 50",
        cardAvancadaItem2: "Custom effects",
        cardAvancadaItem3: "Unique visual styling for the video",
        
        cardFixoTitle: "Fixeds",
        priceFixo: "$ 30",
        cardFixoItem1: "Fixed services for channels",
        cardFixoItem2: "Recurring subtitles",
        cardFixoItem3: "Fixed monthly fee",
        
        // Contato
        contLabel: "C O N T A C T",
        contTitle: 'Let\'s work<br><span class="text-blue">together?</span>',
        contText: "Have a project in mind? Drop me a message and let's talk about how I can help you!",
        labelNome: "Name",
        labelEmail: "Email",
        labelAssunto: "Subject",
        labelMensagem: "Message",
        btnEnviar: "Send",
        // footer
        footerContent: "𓆩༺ Made by Meiko & Chiyori ༻𓆪"
    }
};

let idiomaAtual = 'pt';
const langBtn = document.getElementById('lang-btn');
const langText = document.getElementById('lang-text');

function alternarIdioma() {
    idiomaAtual = idiomaAtual === 'pt' ? 'en' : 'pt';
    
    langText.textContent = idiomaAtual.toUpperCase();

    document.querySelectorAll('[data-i18n]').forEach(elemento => {
        const chave = elemento.getAttribute('data-i18n');
        if (traducoes[idiomaAtual][chave]) {
            elemento.innerHTML = traducoes[idiomaAtual][chave];
        }
    });

    if (idiomaAtual === 'en') {
        // Card 1 gringo
        document.getElementById('img-clip-1').src = 'img/vid_en1.jpg';
        document.getElementById('link-clip-1').href = 'https://www.youtube.com/watch?v=3pj1ECZ2w3A';
        
        // Card 2 gringo
        document.getElementById('img-clip-2').src = 'img/vid_en2.jpg'; 
        document.getElementById('link-clip-2').href = 'https://www.youtube.com/watch?v=6SSusIAJofs';
        
        // Card 3 gringo
        document.getElementById('img-clip-3').src = 'img/vid_en3.jpg'; 
        document.getElementById('link-clip-3').href = 'https://www.youtube.com/watch?v=DSBWmWZKyc0';
    } else {
        // Card 1
        document.getElementById('img-clip-1').src = 'img/vid1.jpg';
        document.getElementById('link-clip-1').href = 'https://www.youtube.com/watch?v=jyry5KgTbL4&list=RDjyry5KgTbL4&start_radio=1';
        
        // Card 2
        document.getElementById('img-clip-2').src = 'img/vid2.jpg';
        document.getElementById('link-clip-2').href = 'https://www.youtube.com/watch?v=ORs1RSCscJ8';
        
        // Card 3
        document.getElementById('img-clip-3').src = 'img/vid3.jpg';
        document.getElementById('link-clip-3').href = 'https://www.youtube.com/watch?v=ol3QSRJ2IdY';
    }

}

langBtn.addEventListener('click', alternarIdioma);


// carrosel
    const API_KEY = 'AIzaSyDoETowTUa3YtHrii41dcoYAnH3NDoYee4'; 
    const PLAYLIST_ID = 'PL0-4aKQmjua_DfwqiITIVmGufUiFzdtr9'; 
    const MAX_RESULTS = 7;

    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${MAX_RESULTS}&playlistId=${PLAYLIST_ID}&key=${API_KEY}`;

    let currentIndex = 0;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const carousel = document.getElementById('youtube-carousel');
            carousel.innerHTML = ''; 

            if(data.error) {
                carousel.innerHTML = '<span style="color: red;">Erro ao carregar vídeos.</span>';
                return;
            }

            data.items.forEach(item => {
                const videoId = item.snippet.resourceId.videoId;
                const title = item.snippet.title;
                const thumbnailUrl = item.snippet.thumbnails.high ? item.snippet.thumbnails.high.url : item.snippet.thumbnails.default.url;

                const videoHTML = `
                    <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank" class="video-card" title="${title}">
                        <img src="${thumbnailUrl}" alt="${title}">
                        <div class="play-overlay">
                            <i class="fa-solid fa-play"></i>
                        </div>
                    </a>
                `;
                carousel.innerHTML += videoHTML;
            });

            iniciarSlider();
        })
        .catch(error => {
            document.getElementById('youtube-carousel').innerHTML = '<span>Erro na conexão.</span>';
        });

    function iniciarSlider() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const carousel = document.getElementById('youtube-carousel');
        const totalItems = document.querySelectorAll('.video-card').length;

        function atualizarPosicao() {
            carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = totalItems - 1;
            }
            atualizarPosicao();
        });

        nextBtn.addEventListener('click', () => {
            if (currentIndex < totalItems - 1) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            atualizarPosicao();
        });
    }


//Scroll
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section, div[id]');

    function checkScroll() {
        if (window.scrollY > 20) {
            header.classList.add('navbar-bg-blur');
        } else {
            header.classList.remove('navbar-bg-blur');
        }
    }

    function activateMenuOnScroll() {
        let scrollPosition = window.scrollY + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', () => {
        checkScroll();
        activateMenuOnScroll();
    });
    
    checkScroll();
});