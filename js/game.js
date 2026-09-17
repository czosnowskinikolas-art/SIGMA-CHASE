let special5SoundCloudFrame = null;
let special5SoundCloudWidget = null;
const SPECIAL5_SOUNDCLOUD_URL = 'https://soundcloud.com/nonthensemusic/alors-brazil?si=695aac7dda6743abbd79ee9b597d12a4&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing';

function startSpecial5Music(){
  try{
    if(special5SoundCloudFrame && special5SoundCloudWidget){
      try{special5SoundCloudWidget.setVolume(70);special5SoundCloudWidget.play();}catch(e){}
      return;
    }
    if(special5SoundCloudFrame && !special5SoundCloudWidget){
      try{special5SoundCloudFrame.remove();}catch(e){}
      special5SoundCloudFrame=null;
    }
    const iframe=document.createElement('iframe');
    iframe.id='special5SoundCloudFrame';
    iframe.title='Malicious Mars music';
    iframe.width='300'; iframe.height='166'; iframe.scrolling='no'; iframe.frameBorder='no';
    iframe.allow='autoplay; encrypted-media';
    iframe.style.position='fixed'; iframe.style.width='300px'; iframe.style.height='166px';
    iframe.style.left='-1000px'; iframe.style.top='-1000px'; iframe.style.opacity='0.001'; iframe.style.pointerEvents='none';
    iframe.src='https://w.soundcloud.com/player/?url='+encodeURIComponent(SPECIAL5_SOUNDCLOUD_URL)+'&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false';
    document.body.appendChild(iframe);
    special5SoundCloudFrame=iframe;
    const attachWidget=()=>{
      try{
        if(!window.SC || !SC.Widget) return false;
        if(special5SoundCloudWidget) return true;
        special5SoundCloudWidget=SC.Widget(iframe);
        special5SoundCloudWidget.bind(SC.Widget.Events.READY,()=>{
          try{special5SoundCloudWidget.setVolume(70);const pr=special5SoundCloudWidget.play();if(pr&&pr.catch)pr.catch(()=>{});}catch(e){}
        });
        special5SoundCloudWidget.bind(SC.Widget.Events.FINISH,()=>{
          try{special5SoundCloudWidget.seekTo(0);special5SoundCloudWidget.play();}catch(e){}
        });
        try{special5SoundCloudWidget.play();}catch(e){}
        return true;
      }catch(e){return false;}
    };
    iframe.addEventListener('load',()=>{attachWidget();},{once:true});
    let tries=0;
    const waitForSC=setInterval(()=>{tries++;if(attachWidget()||tries>=40)clearInterval(waitForSC);},250);
  }catch(e){}
}
function stopSpecial5Music(){
  try{
    if(special5SoundCloudWidget){try{special5SoundCloudWidget.pause();}catch(e){} special5SoundCloudWidget=null;}
    if(special5SoundCloudFrame){try{special5SoundCloudFrame.remove();}catch(e){} special5SoundCloudFrame=null;}
    const old=document.getElementById('special5SoundCloudFrame');if(old)old.remove();
  }catch(e){}
}

let regularSoundCloudFrame = null;
let regularSoundCloudWidget = null;
let regularSoundCloudLevel = null;
let regularMusicEnabled = true; // Persists across deaths and level restarts.
const REGULAR_LEVEL_SOUNDCLOUD = {
  1: 'https://soundcloud.com/names-are-hard-help/samsung-washing-machine-type-beat',
  2: 'https://soundcloud.com/bipbip83/axel-f',
  3: 'https://soundcloud.com/yung-sherman/crystal-castles-kerosene',
  4: 'https://soundcloud.com/geox-1/gigachad-theme-phonk-house-version',
  5: 'https://soundcloud.com/inisharu_d/manuel-gas-gas-gas'
};

function updateRegularMusicButton(){
  const btn=document.getElementById('musicBtn');
  if(!btn)return;
  if(currentLevel>=1 && currentLevel<=5){
    btn.textContent=regularMusicEnabled?'🔊 MUSIC ON':'🔇 MUSIC OFF';
    btn.classList.toggle('on',regularMusicEnabled);
  }
}

function prepareRegularLevelMusic(){
  try{
    const url=REGULAR_LEVEL_SOUNDCLOUD[currentLevel];
    if(!url)return;
    // Already preloaded for this level.
    if(regularSoundCloudFrame && regularSoundCloudLevel===currentLevel)return;

    stopRegularLevelMusic();
    const iframe=document.createElement('iframe');
    iframe.id='regularSoundCloudFrame';
    iframe.title='Regular level music';
    iframe.width='300'; iframe.height='166'; iframe.scrolling='no'; iframe.frameBorder='no';
    iframe.allow='autoplay; encrypted-media';
    iframe.style.position='fixed'; iframe.style.width='300px'; iframe.style.height='166px';
    iframe.style.left='-1000px'; iframe.style.top='-1000px'; iframe.style.opacity='0.001'; iframe.style.pointerEvents='none';
    // Preload without autoplay. SPACE starts playback after the user gesture.
    iframe.src='https://w.soundcloud.com/player/?url='+encodeURIComponent(url)+'&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false';
    document.body.appendChild(iframe);
    regularSoundCloudFrame=iframe;
    regularSoundCloudLevel=currentLevel;

    const attach=()=>{
      try{
        if(!window.SC || !SC.Widget || regularSoundCloudWidget)return !!regularSoundCloudWidget;
        regularSoundCloudWidget=SC.Widget(iframe);
        regularSoundCloudWidget.bind(SC.Widget.Events.READY,()=>{
          try{
            regularSoundCloudWidget.setVolume(70);
            // If the game is already running and music is enabled, start immediately.
            if(regularMusicEnabled && started){
              const pr=regularSoundCloudWidget.play();
              if(pr&&pr.catch)pr.catch(()=>{});
            }
          }catch(e){}
        });
        regularSoundCloudWidget.bind(SC.Widget.Events.FINISH,()=>{
          try{regularSoundCloudWidget.seekTo(0);if(regularMusicEnabled)regularSoundCloudWidget.play();}catch(e){}
        });
        return true;
      }catch(e){return false;}
    };
    iframe.addEventListener('load',()=>attach(),{once:true});
    let tries=0;
    const timer=setInterval(()=>{tries++;if(attach()||tries>=40)clearInterval(timer);},100);
  }catch(e){}
}

function startRegularLevelMusic(){
  try{
    if(!regularMusicEnabled)return;
    if(regularSoundCloudLevel!==currentLevel)prepareRegularLevelMusic();
    if(regularSoundCloudWidget){
      regularSoundCloudWidget.setVolume(70);
      const pr=regularSoundCloudWidget.play();
      if(pr&&pr.catch)pr.catch(()=>{});
      return;
    }
    // The iframe is already preloading; attach() will play as soon as READY fires.
    prepareRegularLevelMusic();
  }catch(e){}
}

function pauseRegularLevelMusic(){
  try{if(regularSoundCloudWidget)regularSoundCloudWidget.pause();}catch(e){}
}

function stopRegularLevelMusic(){
  try{
    if(regularSoundCloudWidget){try{regularSoundCloudWidget.pause();}catch(e){} regularSoundCloudWidget=null;}
    if(regularSoundCloudFrame){try{regularSoundCloudFrame.remove();}catch(e){} regularSoundCloudFrame=null;}
    const old=document.getElementById('regularSoundCloudFrame'); if(old)old.remove();
    regularSoundCloudLevel=null;
  }catch(e){}
}

function resetRegularLevelMusicOnRestart(){
  // Do not change the ON/OFF preference when the player dies or presses R.
  if(regularMusicEnabled){
    if(regularSoundCloudLevel!==currentLevel)prepareRegularLevelMusic();
    // If it was already playing, leave it playing. If the widget is ready but paused,
    // restart it; otherwise its READY callback will start it.
    if(regularSoundCloudWidget){
      try{const pr=regularSoundCloudWidget.play();if(pr&&pr.catch)pr.catch(()=>{});}catch(e){}
    }
  }else{
    pauseRegularLevelMusic();
  }
  updateRegularMusicButton();
}

let audioCtx = null;
let musicStarted = false;
let musicInterval = null;
let musicStep = 0;

function startMusic() {
  if (currentLevel >= 1 && currentLevel <= 5) {
    musicStarted = regularMusicEnabled;
    if(regularMusicEnabled) startRegularLevelMusic();
    else pauseRegularLevelMusic();
    updateRegularMusicButton();
    return;
  }
  if (musicStarted) {
    if (audioCtx && audioCtx.state === "suspended") audioCtx.resume();
    return;
  }
  musicStarted = true;

  try {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    const master = audioCtx.createGain();
    master.gain.value = 0.06;
    master.connect(audioCtx.destination);

    const bass = [55,55,73.42,65.41,55,82.41,73.42,65.41];
    const lead = [220,261.63,293.66,246.94,220,329.63,293.66,261.63];

    function note(freq, duration, type, volume) {
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(volume, now + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      osc.connect(gain);
      gain.connect(master);
      osc.start(now);
      osc.stop(now + duration + 0.04);
    }

    function kick() {
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.frequency.setValueAtTime(125, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.12);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);
      osc.connect(gain); gain.connect(master);
      osc.start(now); osc.stop(now + 0.16);
    }

    function beat() {
      const i = musicStep % 8;
      note(bass[i], 0.16, "sawtooth", 0.04);
      if (i === 0 || i === 4) kick();
      if (i === 2 || i === 6) note(lead[i], 0.11, "triangle", 0.016);
      if (i === 3 || i === 7) note(146.83, 0.07, "square", 0.012);
      musicStep++;
    }

    if (audioCtx.state === "suspended") audioCtx.resume();
    beat();
    musicInterval = setInterval(beat, 190);

    const btn = document.getElementById("musicBtn");
    btn.textContent = "🎵 MUSIC ON";
    btn.classList.add("on");
  } catch (e) {
    document.getElementById("musicBtn").textContent = "🔇 AUDIO UNAVAILABLE";
  }
}


function showGoonshroomText(){
  const popup=document.getElementById('shroomText');
  if(!popup)return;
  clearTimeout(window._goonshroomPopupTimeout);
  popup.classList.add('show');
  shroomTextTimer=300;
  window._goonshroomPopupTimeout=setTimeout(()=>{popup.classList.remove('show');},5000);
}
function playGoonshroomSplat(){
  showGoonshroomText();
  // Every mushroom pickup also says GOON aloud.
  playSpokenGoon(false);
  try{
    const a = new (window.AudioContext||window.webkitAudioContext)();
    const master=a.createGain(); master.gain.value=.11; master.connect(a.destination);

    const now=a.currentTime;
    const osc=a.createOscillator(), g=a.createGain();
    osc.type="sawtooth";
    osc.frequency.setValueAtTime(220,now);
    osc.frequency.exponentialRampToValueAtTime(55,now+.22);
    g.gain.setValueAtTime(.0001,now);
    g.gain.exponentialRampToValueAtTime(.17,now+.008);
    g.gain.exponentialRampToValueAtTime(.0001,now+.25);
    osc.connect(g);g.connect(master);osc.start(now);osc.stop(now+.28);

    const buffer=a.createBuffer(1,a.sampleRate*.16,a.sampleRate);
    const data=buffer.getChannelData(0);
    for(let i=0;i<data.length;i++) data[i]=(Math.random()*2-1)*Math.exp(-16*i/a.sampleRate);
    const src=a.createBufferSource(), ng=a.createGain();
    src.buffer=buffer; ng.gain.value=.11; src.connect(ng); ng.connect(master); src.start(now);
  }catch(e){}
}


function playMiniGoonSound(){
  const v=document.getElementById('miniGoonSound');
  if(!v) return;
  try{
    v.pause();
    v.currentTime=0;
    v.volume=0.82;
    const promise=v.play();
    if(promise) promise.catch(()=>{});
  }catch(e){}
}

function playSpokenGoon(big=false){
  const v=document.getElementById(big ? "goonVoice2" : "goonVoice1");
  if(!v) return;
  try{
    v.pause();
    v.currentTime=0;
    v.volume=0.9;
    const promise=v.play();
    if(promise) promise.catch(()=>{});
  }catch(e){}
}

let goonVoiceStarted=false;
function startGoonVoices(){
  if(goonVoiceStarted) return;
  goonVoiceStarted=true;
  // First GOON after the game starts, then regularly through the level.
  setTimeout(()=>playSpokenGoon(false), 4500);
  setInterval(()=>playSpokenGoon(false), 13000);
}


function playBigSplat(){
  try{
    const a=new (window.AudioContext||window.webkitAudioContext)();
    const g=a.createGain(); g.gain.value=.16; g.connect(a.destination);
    const o=a.createOscillator(); o.type="sawtooth";
    o.frequency.setValueAtTime(170,a.currentTime);
    o.frequency.exponentialRampToValueAtTime(40,a.currentTime+.18);
    o.connect(g); o.start(); o.stop(a.currentTime+.2);
  }catch(e){}
}

const canvas=document.getElementById("game"), ctx=canvas.getContext("2d");
const hud=document.getElementById("hud"), msg=document.getElementById("msg");
const W=canvas.width,H=canvas.height;
const keys={};
addEventListener("keydown",e=>{
  keys[e.code]=true;
  if(["Space","ArrowUp","ArrowLeft","ArrowRight"].includes(e.code)) e.preventDefault();
  if(e.code==='ShiftLeft'||e.code==='ShiftRight'){
    if(currentLevel===102&&started&&player.onGround&&special2CurrentPlatformThin){
      special2DropThroughTimer=24;player.onGround=false;player.y+=8;player.vy=2.2;
    }
  }
  if(e.code==="KeyR"){ if(currentLevel===1) resetLevel1(); else if(currentLevel===2) resetLevel2(); else if(currentLevel===3) resetLevel3(); else if(currentLevel===4) resetLevel4(); else if(currentLevel===101) resetSpecial1(); else if(currentLevel===102) resetSpecial2(); else if(currentLevel===103) resetSpecial3(); else if(currentLevel===104) resetSpecial4(); else if(currentLevel===105) resetSpecial5(); else reset(); }
  if(e.code==="Space" && !started && document.getElementById('levelSelect').style.display==='none'){
    started=true; msg.style.display="none";
    if(currentLevel===101){ startSpecial1Music(); }
    else if(currentLevel===102){ startSpecial2Music(); }
    else if(currentLevel===103){ startSpecial3Music(); }
    else if(currentLevel===104){ startSpecial4Music(); }
    else if(currentLevel===105){ startSpecial5Music(); }
    else { if(currentLevel!==4)startGoonVoices(); startMusic(); }
    if(audioCtx && audioCtx.state==="suspended") audioCtx.resume();
  }
});
addEventListener("keyup",e=>keys[e.code]=false);

const platforms=[
 {x:0,y:610,w:420,h:90},
 {x:500,y:565,w:210,h:135},
 {x:790,y:495,w:150,h:205},
 {x:1010,y:430,w:190,h:270},
 {x:1235,y:515,w:170,h:185},
 {x:1470,y:450,w:180,h:250},
 {x:1720,y:385,w:190,h:315},
 {x:1990,y:455,w:170,h:245},
 {x:2240,y:350,w:180,h:350},
 {x:2500,y:425,w:210,h:275},
 {x:2790,y:320,w:170,h:380},
 {x:3030,y:400,w:210,h:300},
 {x:3310,y:300,w:200,h:400},
 {x:3590,y:380,w:220,h:320},
 {x:3890,y:560,w:170,h:140,type:'wood'},
 {x:4110,y:500,w:120,h:200},
 {x:4290,y:440,w:120,h:260},
 {x:4470,y:380,w:120,h:320},
 {x:4660,y:460,w:190,h:240,type:'wood'},
 {x:4910,y:520,w:115,h:180},
 {x:5070,y:455,w:150,h:245},
 {x:5290,y:350,w:150,h:350},
 {x:5510,y:410,w:100,h:290},
 {x:5680,y:330,w:180,h:370},
 {x:5940,y:470,w:110,h:230},
 {x:6110,y:540,w:135,h:160,type:'wood'},
 {x:6310,y:420,w:160,h:280},
 {x:6550,y:320,w:190,h:380},
 {x:6810,y:430,w:140,h:270},
 {x:7030,y:550,w:230,h:150},
 {x:7330,y:470,w:105,h:230,type:'wood'},
 {x:7510,y:390,w:145,h:310},
 {x:7740,y:505,w:90,h:195},
 {x:7920,y:430,w:210,h:270},
 {x:8200,y:340,w:120,h:360,type:'wood'},
 {x:8420,y:420,w:135,h:280},
 {x:8620,y:290,w:180,h:410},
 {x:8900,y:380,w:100,h:320},
 {x:9080,y:500,w:170,h:200},
 {x:9320,y:410,w:125,h:290,type:'wood'},
 {x:9530,y:300,w:150,h:400},
 {x:9760,y:455,w:95,h:245},
 {x:9940,y:365,w:210,h:335},
 {x:10220,y:525,w:120,h:175},
 {x:10410,y:430,w:180,h:270,type:'wood'},
 {x:10660,y:335,w:120,h:365},
 {x:10860,y:450,w:160,h:250},
 {x:11110,y:540,w:220,h:160},
 {x:11400,y:500,w:2000,h:200,type:'final'}
];

// Level 5 parkour spike placements: four platforms, with small white spike clusters
// placed in the first and last third of each platform.
const level5SpikePlatforms=[platforms[6],platforms[12],platforms[30],platforms[43]];
const level5Spikes=[];
for(const p of level5SpikePlatforms){
  level5Spikes.push({x:p.x+p.w*0.18,y:p.y});
  level5Spikes.push({x:p.x+p.w*0.82,y:p.y});
}
let player,camX=0,started=false,won=false,startTime=0; let levelSelected=false; let currentLevel=0;
const poos=[
 {x:2550,y:385,hit:false},{x:3150,y:565,hit:false},{x:4700,y:400,hit:false},
 {x:6460,y:285,hit:false},{x:8060,y:390,hit:false},{x:9180,y:445,hit:false},
 {x:10480,y:385,hit:false}
];
const evilGoon={x:-90,y:250,w:76,h:76,vx:0,phase:0,active:false};

const goonshrooms=[
 {x:680,y:520,active:false},
 {x:1810,y:340,active:false},
 {x:5330,y:315,active:false},
 {x:8625,y:255,active:false},
 {x:10480,y:385,active:false}
];
let rainbowTimer=0, shroomTextTimer=0, pooTimer=0, witchCooldown=0; const snowballs=[]; let snowballTimer=600;
let bossHealth=100,bossPowerTimer=0,bossHitThisPower=false,bossActive=false,bossDefeated=false,flagVisible=false;
let bossEntryInvuln=0; // 5-second damage immunity when entering each regular boss arena (300 frames at 60 FPS).
function startBossEntryInvulnerability(){bossEntryInvuln=300;player.evilCooldown=Math.max(player.evilCooldown||0,300);}
let bossMushroom={x:11800,y:445,active:false,respawnTimer:0};
const bossPlatforms=[
 {x:11610,y:405,w:190,h:22,type:'metal'},
 {x:12105,y:315,w:190,h:22,type:'metal'},
 {x:12620,y:400,w:190,h:22,type:'metal'}
];
const bossPurpleMushrooms=[];
let pinkSpawnCount=0;
const miniGoonThresholds=[80,60,40,20,10];
let miniGoonNextThresholdIndex=0, miniGoonHealth=100;
const miniGoon={x:11685,y:367,w:38,h:38,vx:0,active:false,phase:0,hitCooldown:0,platformIndex:0}; let miniGoonSoundTimer=1200;
const stood={x:12850,y:449,w:51,h:51,vx:0,active:false,phase:0,hitCooldown:0};
let stoodHealth=100, stoodSpawned=false, stoodSlimeTimer=1200;
const stoodSlimeBalls=[];
let carnivorousPlant={x:8200,phase:0,hitCooldown:0};
function spawnBossMushroom(){
  const minX=11470,maxX=13180;
  bossMushroom.x=minX+Math.random()*(maxX-minX);
  bossMushroom.y=420+Math.random()*58;
  bossMushroom.active=true;
  pinkSpawnCount++;
  if(pinkSpawnCount%3===0){
    const pi=Math.floor(Math.random()*bossPlatforms.length);
    const p=bossPlatforms[pi];
    bossPurpleMushrooms.push({x:p.x+25+Math.random()*Math.max(1,p.w-50),y:p.y-32,active:true});
  }
}
function resetBossPurpleMushrooms(){bossPurpleMushrooms.length=0;}
function stopNormalMusic(){
  try{
    if(musicInterval){clearInterval(musicInterval); musicInterval=null;}
    musicStarted=false;
    musicStep=0;
    stopRegularLevelMusic();
    if(audioCtx && audioCtx.state==='running'){ try{audioCtx.suspend();}catch(e){} }
  }catch(e){}
}
function startBossMusic(){
  try{
    stopNormalMusic();
    const main=document.getElementById('bgMusic');
    if(main){main.pause();main.currentTime=0;}
    const bm=document.getElementById('bossMusic');
    if(bm){bm.loop=true;bm.volume=.72;bm.currentTime=0;bm.play().catch(()=>{});}
  }catch(e){}
}
function stopBossMusic(){try{const bm=document.getElementById('bossMusic');if(bm){bm.pause();bm.currentTime=0;}}catch(e){}}
function startLevel1BossMusic(){
  try{
    stopNormalMusic();
    const main=document.getElementById('bgMusic');
    if(main){main.pause();main.currentTime=0;}
    stopBossMusic();
    const a=document.getElementById('level1BossMusic');
    if(a){a.loop=true;a.volume=.78;a.currentTime=0;a.play().catch(()=>{});}
  }catch(e){}
}
function stopLevel1BossMusic(){try{const a=document.getElementById('level1BossMusic');if(a){a.pause();a.currentTime=0;}}catch(e){}}

function updateBossUI(){const title=document.querySelector('#bossUI>div:first-child');if(title){if(currentLevel===1)title.textContent='CONCERNING INDIVIDUAL';else if(currentLevel===5)title.textContent='BEACON OF MASCULINITY';}const hp=Math.max(0,Math.min(100,bossHealth));const fill=document.getElementById('bossFill');const txt=document.getElementById('bossText');if(fill)fill.style.width=hp+'%';if(txt)txt.textContent=Math.ceil(hp)+'%';const ui=document.getElementById('bossUI');if(ui)ui.style.display=(bossActive&&!won)?'block':'none';}
function updateStoodUI(){
  const ui=document.getElementById('stoodUI');
  const title=ui?ui.querySelector('div:first-child'):null;
  if(title)title.textContent='STOOD';
  const fill=document.getElementById('stoodFill');
  const txt=document.getElementById('stoodText');
  const hp=Math.max(0,Math.min(100,stoodHealth));
  if(fill)fill.style.width=hp+'%';
  if(txt)txt.textContent=Math.ceil(hp)+'%';
  if(ui)ui.style.display=(currentLevel===5&&stood.active&&!won)?'block':'none';
}
function playStoodHiss(){
  const v=document.getElementById('stoodHissSound');
  if(!v)return;
  try{v.pause();v.currentTime=0;v.volume=.82;const p=v.play();if(p)p.catch(()=>{});}catch(e){}
}


function reset(){
 player={x:90,y:500,w:30,h:44,vx:0,vy:0,onGround:false,coyote:0,jumpBuffer:0,health:100,pooCooldown:0,evilCooldown:0};
  bossEntryInvuln=0;
 camX=0;started=false;won=false;rainbowTimer=0;player.health=100;player.pooCooldown=0;player.evilCooldown=0;evilGoon.x=player.x-180;evilGoon.y=player.y-15;evilGoon.vx=0;evilGoon.phase=0;evilGoon.active=false;shroomTextTimer=0;pooTimer=0;document.getElementById('shroomText').classList.remove('show');document.getElementById('pooOverlay').classList.remove('show');
 stopNormalMusic(); document.getElementById('bossUI').querySelector('div').textContent='CONCERNING INDIVIDUAL'; goonshrooms.forEach(s=>s.active=false); poos.forEach(p=>p.hit=false); snowballs.length=0; snowballTimer=600; evilGoon.x=5300; evilGoon.y=230; witchCooldown=0; bossHealth=100;bossPowerTimer=0;bossHitThisPower=false;bossActive=false;bossDefeated=false;flagVisible=false;bossMushroom.active=false;bossMushroom.respawnTimer=0;pinkSpawnCount=0;resetBossPurpleMushrooms();miniGoonNextThresholdIndex=0;miniGoonHealth=100;miniGoon.active=false;miniGoon.hitCooldown=0;miniGoon.phase=0;miniGoonSoundTimer=1200;stood.x=12850;stood.y=449;stood.vx=0;stood.active=false;stood.hitCooldown=0;stood.phase=0;stoodHealth=100;stoodSpawned=false;stoodSlimeTimer=1200;stoodSlimeBalls.length=0;document.getElementById('stoodUI').style.display='none'; document.querySelector('#stoodUI>div:first-child').textContent='STOOD';carnivorousPlant.phase=0;carnivorousPlant.hitCooldown=0;document.getElementById('bossUI').style.display='none';const s4ui=document.getElementById('special4BossUI');if(s4ui)s4ui.style.display='none';document.getElementById('endScreen').style.display='none';stopBossMusic();
 msg.style.display="block";msg.innerHTML="<h1>SIGMA CHASE</h1><p>Press SPACE to start</p>";
}
reset(); updateHealthUI(); updateRegularMusicButton();

const levelSelect=document.getElementById('levelSelect');
document.querySelectorAll('.levelBtn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const level=Number(btn.dataset.level);
    if(level!==1 && level!==2 && level!==3 && level!==4 && level!==5 && level!==101 && level!==102 && level!==103 && level!==104 && level!==105){
      levelSelect.querySelector('.subtitle').textContent='LEVEL '+level+' SLOT READY — COMING SOON';
      return;
    }
    try{stopSpecial4Music();}catch(e){}
    try{stopSpecial5Music();}catch(e){}
    currentLevel=level;
    levelSelected=true;
    updateRegularMusicButton();
    if(currentLevel>=1 && currentLevel<=5) prepareRegularLevelMusic();
    levelSelect.style.display='none';
    if(currentLevel===1){
      resetLevel1();
      msg.style.display='block';
      msg.innerHTML='<h1>LEVEL 1</h1><p>Press SPACE to start</p>';
    }else if(currentLevel===2){
      resetLevel2();
      msg.style.display='block';
      msg.innerHTML='<h1>LEVEL 2</h1><p>Press SPACE to start</p>';
    }else if(currentLevel===3){
      resetLevel3();
      msg.style.display='block';
      msg.innerHTML='<h1>CAVE MANIA</h1><p>Press SPACE to start</p>';
    }else if(currentLevel===4){
      resetLevel4();
      msg.style.display='block';
      msg.innerHTML='<h1>SIGMA MOON</h1><p>Press SPACE to start</p>';
    }else if(currentLevel===5){
      resetSpecial5();
      msg.style.display='block';
      msg.innerHTML='<h1>THE END</h1><p>Press SPACE to start</p>';
    }else if(currentLevel===101){
      resetSpecial1();
      msg.style.display='block';
      msg.innerHTML='<h1>MUSHROOM FRENZY</h1><p>Press SPACE to start</p>';
    }else if(currentLevel===102){
      resetSpecial2();
      msg.style.display='block';
      msg.innerHTML='<h1>MAGNETISM LABORATORY</h1><p>Press SPACE to start</p>';
    }else if(currentLevel===103){
      resetSpecial3();
      msg.style.display='block';
      msg.innerHTML='<h1>PIRATE CHAOS</h1><p>Press SPACE to start</p>';
    }else if(currentLevel===104){
      resetSpecial4();
      msg.style.display='block';
      msg.innerHTML='<h1>STOOD BRAWL</h1><p>Press SPACE to start</p>';
    }else if(currentLevel===105){
      resetSpecial5();
      msg.style.display='block';
      msg.innerHTML='<h1>MALICIOUS MARS</h1><p>Press SPACE to start</p>';
    }else{
      reset();
      msg.style.display='block';
      msg.innerHTML='<h1>CONCERNING INDIVIDUAL</h1><p>Press SPACE to start</p>';
    }
  });
});

document.getElementById("musicBtn").addEventListener("click", async function(){
  if(currentLevel===102){
    try{
      if(special2SoundCloudWidget){try{const pr=special2SoundCloudWidget.play();if(pr&&pr.catch)pr.catch(()=>{});}catch(e){}this.textContent="🔊 REVOLUTION MUSIC ON";this.classList.add("on");}
      else{startSpecial2Music();this.textContent="🔊 REVOLUTION MUSIC ON";this.classList.add("on");}
    }catch(e){this.textContent="🔇 CLICK AGAIN";}
    return;
  }
  if(currentLevel===101){
    const music=document.getElementById('special1Music');
    try{
      if(music.paused){music.volume=.70;await music.play();this.textContent="🔊 MUSHROOM FRENZY MUSIC ON";this.classList.add("on");}
      else{music.pause();this.textContent="🔇 MUSIC OFF";this.classList.remove("on");}
    }catch(e){this.textContent="🔇 CLICK AGAIN";}
    return;
  }
  if(currentLevel===104){
    try{
      if(special4SoundCloudFrame){
        if(special4SoundCloudWidget){
          try{const pr=special4SoundCloudWidget.play(); if(pr&&pr.catch)pr.catch(()=>{});}catch(e){}
          this.textContent="🔊 VVV GUITAR REMIX ON";
          this.classList.add("on");
        }else{
          // The iframe may still be loading; recreate it from this user click.
          stopSpecial4Music();
          startSpecial4Music();
          this.textContent="🔊 VVV GUITAR REMIX ON";
          this.classList.add("on");
        }
      }else{
        startSpecial4Music();
        this.textContent="🔊 VVV GUITAR REMIX ON";
        this.classList.add("on");
      }
    }catch(e){this.textContent="🔇 CLICK AGAIN";}
    return;
  }
  if(currentLevel===105){
    try{
      if(special5SoundCloudWidget){
        special5SoundCloudWidget.isPaused((paused)=>{
          try{
            if(paused){special5SoundCloudWidget.setVolume(70);special5SoundCloudWidget.play();}
            else{special5SoundCloudWidget.pause();}
          }catch(e){}
        });
        this.textContent='🔊 MALICIOUS MARS MUSIC ON/OFF';
        this.classList.add('on');
      }else{
        startSpecial5Music();
        this.textContent='🔊 ALORS BRAZIL ON';
        this.classList.add('on');
      }
    }catch(e){this.textContent='🔇 CLICK AGAIN';}
    return;
  }
  if(currentLevel>=1 && currentLevel<=5 && !(currentLevel===4 && level4BossActive)){
    regularMusicEnabled=!regularMusicEnabled;
    if(regularMusicEnabled){
      startRegularLevelMusic();
    }else{
      pauseRegularLevelMusic();
    }
    updateRegularMusicButton();
    return;
  }
  if(currentLevel===4 && level4BossActive){
    const music=document.getElementById("level4BossMusic");
    try{
      if(music.paused){music.volume=.72;await music.play();this.textContent="🔊 BOSS MUSIC ON";this.classList.add("on");}
      else{music.pause();this.textContent="🔇 BOSS MUSIC OFF";this.classList.remove("on");}
    }catch(e){this.textContent="🔇 CLICK AGAIN";}
  }else{
    if(currentLevel!==4)startGoonVoices();
    const music = document.getElementById("bgMusic");
    try {
      if (music.paused) {
        music.volume = 0.55;
        await music.play();
        this.textContent = "🔊 MUSIC ON";
        this.classList.add("on");
      } else {
        music.pause();
        this.textContent = "🔇 MUSIC OFF";
        this.classList.remove("on");
      }
    } catch (e) {
      this.textContent = "🔇 CLICK AGAIN";
    }
  }
});

function rectHit(a,b){
 return a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y;
}


function updatePinkTimerUI(){
 const pinkTimerUI=document.getElementById("pinkTimerUI");
 if(!pinkTimerUI)return;
 let timer=0;
 if(currentLevel===1)timer=level1BossPowerTimer||0;
 else if(currentLevel===2)timer=level2BossPowerTimer||0;
 else if(currentLevel===3)timer=level3BossPowerTimer||0;
 else if(currentLevel===4)timer=level4BossPowerTimer||0;
 else if(currentLevel===5)timer=special5PinkPower||0;
 else if(currentLevel===101)timer=special1PowerTimer||0;
 else if(currentLevel===102)timer=special2PinkPowerTimer||0;
 else if(currentLevel===104)timer=special4PinkPowerTimer||0;
 const show=timer>0&&!won;
 pinkTimerUI.style.display=show?'block':'none';
 if(show)pinkTimerUI.textContent='PINK POWER: '+Math.ceil(timer/60)+'s';
}

function updateHealthUI(){
 updatePinkTimerUI();
 const fill=document.getElementById("healthFill");
 const hp=Math.max(0,Math.min(100,player.health));
 fill.style.width=hp+"%";
 const pct=document.getElementById("healthPct"); if(pct) pct.textContent=Math.ceil(hp)+"%";
 fill.style.background=hp>60?"#63dc69":(hp>30?"#ffd24f":"#ef5555");
 if(hp<=0 && started && !won){
   started=false;
   try{const ds=document.getElementById('deathSound'); if(ds){ds.currentTime=0; ds.play().catch(()=>{});}}catch(e){}
   msg.style.display="block";
   msg.innerHTML="<h1>What the Sigma?</h1><p>Press R to try again.</p>";
 }
}


/* =========================
   LEVEL 4 — SIGMA MOON
   ========================= */
const level4Planets = [];
const level4MagmaPatches = [];
const level4Stars = [];
const level4DistantPlanets = [
  {x:850,y:120,r:42,c:'#b85bff',a:.45},
  {x:3050,y:165,r:64,c:'#4bb5ff',a:.34},
  {x:5480,y:115,r:34,c:'#ff8c5a',a:.42},
  {x:7750,y:175,r:76,c:'#8e76ff',a:.30},
  {x:10100,y:95,r:48,c:'#53e0b6',a:.34},
  {x:11700,y:120,r:90,c:'#a35dff',a:.28},
  {x:12950,y:180,r:55,c:'#54c7ff',a:.34}
];
for(let i=0;i<70;i++){
  const x=120+i*195+(i%3)*17, y=45+(i*47)%500, r=1+(i%3)*.45, a=.35+(i%5)*.1;
  level4Stars.push({x,y,r,a});
}
const planetColors=['#4c8dff','#ff5b7d','#55d66f','#c37cff','#ffad4c','#49d7d3','#e86bff','#78a5ff'];
const planetSpecs=[
  [140,570,122],[430,480,105],[710,555,112],[1000,455,90],[1280,535,122],[1570,430,96],
  [1860,520,116],[2160,445,105],[2460,555,118],[2760,420,92],[3050,515,128],[3360,465,100],
  [3670,555,115],[3970,410,92],[4270,500,124],[4580,445,104],[4890,555,120],[5200,420,94],
  [5520,505,130],[5840,455,100],[6160,550,118],[6480,410,96],[6800,505,124],[7120,445,105],
  [7440,550,122],[7760,405,92],[8080,495,128],[8400,440,100],[8720,550,116],[9040,415,94],
  [9360,505,126],[9680,445,102],[10000,545,118],[10320,405,94],[10640,495,125],[10950,445,108]
];
// Pull successive planets 5% closer together while keeping the first planet in place.
const level4PlanetSpecsCloser=planetSpecs.map(([x,y,r],i)=>[140+(x-140)*.95,y,r]);
for(let i=0;i<level4PlanetSpecsCloser.length;i++){
  const [x,y,r]=level4PlanetSpecsCloser[i];
  level4Planets.push({x,y,r,color:planetColors[i%planetColors.length],seed:i});
}
// Large planets with glowing magma/lava zones.
[
  [1280,-2.35,.95],[1860,-1.18,.82],[3050,-2.0,.92],[4270,-1.5,.92],[5520,-2.25,1.05],
  [6800,-1.05,.9],[8080,-2.1,.98],[9360,-1.25,.86],[10640,-2.0,1.05]
].forEach(([planet,ang,span])=>{
  level4MagmaPatches.push({planetIndex:planetSpecs.findIndex(v=>v[0]===planet),angle:ang,span:span*.8});
});

const level4Arena={x:10280,y:540,w:2400,h:160,left:10300,right:12580,ground:540};
const level4Asteroids=[
  {x:11050,y:410,r:78,spin:.1,seed:3},
  {x:11980,y:360,r:66,spin:-.08,seed:8}
];

const level4Boss={x:560,y:390,w:152,h:152,vx:0,phase:0,active:true};
const level4BossProjectiles=[];
let level4BossProjectileTimer=180;
let level4BossHealth=100; // 100% starting health; 30 pink mushrooms defeat Moon Goon.
let level4BossActive=false, level4BossDefeated=false, level4FlagVisible=false;
let level4BossPowerTimer=0, level4BossHitThisPower=false;
let level4BossMushroom={x:10650,y:470,active:false};
let level4BossHits=0;
let level4PinkUses=0;
const level4ParkourPurpleMushrooms=[
  {planetIndex:4,x:0,y:0,active:true},
  {planetIndex:11,x:0,y:0,active:true}
];
const level4BossPurpleMushrooms=[];

function playLevel4Punch(){
  const a=document.getElementById('level4PunchSound');
  if(!a)return;
  try{a.pause();a.currentTime=0;a.volume=.9;const p=a.play();if(p)p.catch(()=>{});}catch(e){}
}
let level4MoonPhaseMusic = 'base';
function stopLevel4MoonPhaseMusic(){
  for(const id of ['level4BossMusic','level4MoonPhase80','level4MoonPhase50','level4MoonPhase20']){
    try{
      const a=document.getElementById(id);
      if(a){a.pause();a.currentTime=0;}
    }catch(e){}
  }
  level4MoonPhaseMusic='base';
}
function playLevel4MoonPhaseMusic(id, state){
  if(level4MoonPhaseMusic===state) return;
  stopLevel4MoonPhaseMusic();
  try{
    const a=document.getElementById(id);
    if(a){a.loop=true;a.volume=.72;a.currentTime=0;const p=a.play();if(p)p.catch(()=>{});}
    level4MoonPhaseMusic=state;
  }catch(e){}
}
function updateLevel4BossPhaseMusic(){
  if(!level4BossActive || level4BossDefeated || won) return;
  const hp=Math.max(0,Math.min(100,level4BossHealth));
  if(hp>80){
    if(level4MoonPhaseMusic!=='base'){
      stopLevel4MoonPhaseMusic();
      try{
        const a=document.getElementById('level4BossMusic');
        if(a){a.loop=true;a.volume=.72;a.currentTime=0;const p=a.play();if(p)p.catch(()=>{});}
      }catch(e){}
      level4MoonPhaseMusic='base';
    }
  }else if(hp>50){
    playLevel4MoonPhaseMusic('level4MoonPhase80','phase80');
  }else if(hp>=20){
    playLevel4MoonPhaseMusic('level4MoonPhase50','phase50');
  }else{
    playLevel4MoonPhaseMusic('level4MoonPhase20','phase20');
  }
}
function stopLevel4BossMusic(){
  stopLevel4MoonPhaseMusic();
}
function startLevel4BossMusic(){
  try{
    pauseRegularLevelMusic();
    const main=document.getElementById('bgMusic');if(main){main.pause();main.currentTime=0;}
    level4MoonPhaseMusic='none';
    const a=document.getElementById('level4BossMusic');
    if(a){a.loop=true;a.volume=.72;a.currentTime=0;const p=a.play();if(p)p.catch(()=>{});}
    level4MoonPhaseMusic='base';
  }catch(e){}
}
function spawnLevel4BossMushroom(){
  const points=[
    [10580,487],[11090,487],[11620,487],[12180,487],[12440,487],
    [11050,330],[11980,286]
  ];
  const pt=points[Math.floor(Math.random()*points.length)];
  level4BossMushroom.x=pt[0]; level4BossMushroom.y=pt[1]; level4BossMushroom.active=true;
}
function spawnLevel4BossPurpleMushroom(){
  const a=level4Asteroids[Math.floor(Math.random()*level4Asteroids.length)];
  const dx=(Math.random()-.5)*a.r*.85;
  const top=a.y-Math.sqrt(Math.max(0,a.r*a.r-dx*dx));
  level4BossPurpleMushrooms.push({x:a.x+dx,y:top-8,active:true});
}
function resetLevel4(){
  player={x:70,y:404,w:30,h:44,vx:0,vy:0,onGround:true,coyote:7,jumpBuffer:0,health:100,pooCooldown:0,evilCooldown:0};
  camX=0;started=false;won=false;rainbowTimer=0;shroomTextTimer=0;pooTimer=0;
  // Start Moon Goon safely behind the player, off to the left.
  level4Boss.x=player.x-350;level4Boss.y=player.y-40;level4Boss.phase=0;level4Boss.active=true;
  level4BossProjectiles.length=0;level4BossProjectileTimer=480;
  level4BossHealth=100;level4BossHits=0;level4BossActive=false;level4BossDefeated=false;level4FlagVisible=false;
  level4BossPowerTimer=0;level4BossHitThisPower=false;level4BossMushroom.active=false;level4MoonPhaseMusic='base';
  level4PinkUses=0;level4BossPurpleMushrooms.length=0;
  for(const m of level4ParkourPurpleMushrooms){
    const p=level4Planets[m.planetIndex];
    m.x=p.x; m.y=p.y-p.r-8; m.active=true;
  }
  document.getElementById('shroomText').classList.remove('show');
  document.getElementById('pooOverlay').classList.remove('show');
  document.getElementById('endScreen').style.display='none';
  document.getElementById('bossUI').style.display='none';
  const title=document.querySelector('#bossUI>div:first-child');if(title)title.textContent='SIGMA MOON';
  resetRegularLevelMusicOnRestart();stopBossMusic();stopLevel4BossMusic();
  msg.style.display="block";msg.innerHTML="<h1>SIGMA MOON</h1><p>Press SPACE to start</p>";
}

function level4PlanetTop(p,px){
  const dx=player.x+player.w/2-p.x;
  if(Math.abs(dx)>p.r+player.w/2)return null;
  const rr=Math.max(0,p.r*p.r-dx*dx);
  return p.y-Math.sqrt(rr);
}
function level4OnPlanetDamage(p){
  const dx=player.x+player.w/2-p.x;
  const dy=player.y+player.h-p.y;
  const dist=Math.hypot(dx,dy);
  const ang=Math.atan2(dy,dx);
  for(const patch of level4MagmaPatches){
    if(patch.planetIndex!==p.seed)continue;
    let d=Math.atan2(Math.sin(ang-patch.angle),Math.cos(ang-patch.angle));
    if(Math.abs(d)<patch.span*.5 && Math.abs(dist-p.r)<38)return true;
  }
  return false;
}

function updateLevel4(){
  // Level 4 gameplay is locked until the player explicitly presses SPACE.
  if(!started) return;
  const left=keys.KeyA||keys.ArrowLeft,right=keys.KeyD||keys.ArrowRight,jump=keys.Space||keys.ArrowUp;
  if(left)player.vx-=.10;if(right)player.vx+=.10;if(!left&&!right)player.vx*=.94;
  player.vx=Math.max(-1.65,Math.min(1.65,player.vx));
  if(jump)player.jumpBuffer=7;else player.jumpBuffer=Math.max(0,player.jumpBuffer-1);
  if(player.onGround)player.coyote=7;else player.coyote=Math.max(0,player.coyote-1);
  if(player.jumpBuffer>0&&player.coyote>0){player.vy=-12.5;player.onGround=false;player.coyote=0;player.jumpBuffer=0;}
  player.vy+=.20;player.vy=Math.min(player.vy,5);

  const oldY=player.y;
  player.x+=player.vx;player.y+=player.vy;player.onGround=false;

  for(const p of level4Planets){
    const top=level4PlanetTop(p,player.x);
    if(top===null)continue;
    const currentBottom=player.y+player.h;
    const previousTop=level4PlanetTop(p,player.x-player.vx);
    const wasNearSurface=previousTop!==null && Math.abs((oldY+player.h)-previousTop)<=7;
    if(player.vy>=0 && ((oldY+player.h<=top+8 && currentBottom>=top) || (player.onGround && wasNearSurface && currentBottom>=top-8))){
      player.y=top-player.h;player.vy=0;player.onGround=true;
      break;
    }
  }
  if(player.x+player.w>level4Arena.x-40){
    const hull={x:level4Arena.x+80,y:level4Arena.y,w:level4Arena.w-160,h:40};
    if(player.x+player.w>hull.x&&player.x<hull.x+hull.w&&oldY+player.h<=hull.y+2&&player.y+player.h>=hull.y&&player.vy>=0){
      player.y=hull.y-player.h;player.vy=0;player.onGround=true;
    }
    for(const a of level4Asteroids){
      const dx=player.x+player.w/2-a.x,dy=player.y+player.h-a.y;
      const dist=Math.hypot(dx,dy);
      const top=a.y-Math.sqrt(Math.max(0,a.r*a.r-dx*dx));
      if(Math.abs(dx)<=a.r+player.w/2&&oldY+player.h<=top+2&&player.y+player.h>=top&&player.vy>=0){
        player.y=top-player.h;player.vy=0;player.onGround=true;break;
      }
    }
  }

  // Falling into space kills you.
  if(player.y>760){player.health=0;updateHealthUI();return;}

  if(player.pooCooldown>0)player.pooCooldown--;
  // Two parkour purple mushrooms restore 15% health each.
  for(let i=level4ParkourPurpleMushrooms.length-1;i>=0;i--){
    const m=level4ParkourPurpleMushrooms[i];
    if(m.active&&Math.hypot(player.x+15-m.x,player.y+22-m.y)<46){
      m.active=false; player.health=Math.min(100,player.health+15);
      rainbowTimer=500; shroomTextTimer=300;
      showGoonshroomText();
      playGoonshroomSplat();
    }
  }
  for(let i=0;i<level4MagmaPatches.length;i++){
    const pi=level4MagmaPatches[i].planetIndex,p=level4Planets[pi];
    if(player.onGround&&level4OnPlanetDamage(p)&&player.pooCooldown===0){
      player.health=Math.max(0,player.health-30);player.pooCooldown=55;break;
    }
  }

  // Moon Goon follows the player through the entire parkour section.
  if(!level4BossActive&&!level4BossDefeated&&!won){
    level4Boss.active=true;
    level4Boss.phase+=.035;
    const dx=(player.x+15)-(level4Boss.x+76),dy=(player.y+22)-(level4Boss.y+76),d=Math.hypot(dx,dy)||1;
    const moonGoonSpeed=1.0125;
    level4Boss.x+=(dx/d)*moonGoonSpeed;
    level4Boss.y+=(dy/d)*moonGoonSpeed;
    // Keep Moon Goon behind/within the level; allow him to remain off-screen left so he cannot spawn on top of the player.
    level4Boss.x=Math.max(-350,Math.min(level4Arena.x-140,level4Boss.x));
    level4Boss.y=Math.max(85,Math.min(560,level4Boss.y));

    if(player.evilCooldown>0)player.evilCooldown--;
    if(player.evilCooldown===0&&rectHit(player,level4Boss)){
      player.health=Math.max(0,player.health-20);player.evilCooldown=90;playLevel4Punch();
    }

    // Mini moons are fired during parkour as well as the boss fight.
    level4BossProjectileTimer--;
    if(level4BossProjectileTimer<=0){
      const sx=level4Boss.x+76,sy=level4Boss.y+76,tx=player.x+15,ty=player.y+22,mdx=tx-sx,mdy=ty-sy;
      const dist=Math.hypot(mdx,mdy)||1;
      const speed=4.05*.75; // exact 75% of Evil Goon snowball speed
      level4BossProjectiles.push({x:sx,y:sy,vx:mdx/dist*speed,vy:mdy/dist*speed,life:9000});
      level4BossProjectileTimer=420;
    }
    // Update the mini moons during the parkour chase too.
    for(let i=level4BossProjectiles.length-1;i>=0;i--){
      const b=level4BossProjectiles[i];
      b.x+=b.vx;b.y+=b.vy;b.life--;
      const hit=player.x<b.x+26&&player.x+player.w>b.x-26&&player.y<b.y+26&&player.y+player.h>b.y-26;
      if(hit){
        player.health=Math.max(0,player.health-10);
        player.evilCooldown=45;
        playLevel4Punch();
        level4BossProjectiles.splice(i,1);
        continue;
      }
      if(b.life<=0||b.x<0||b.x>level4Arena.x+80||b.y<20||b.y>760)level4BossProjectiles.splice(i,1);
    }
  }

  if(!level4BossActive&&!level4BossDefeated&&player.x+player.w>level4Arena.x+170){
    level4BossActive=true;level4BossDefeated=false;startBossEntryInvulnerability();level4BossHealth=100;level4BossHits=0;level4PinkUses=0;level4BossPurpleMushrooms.length=0;
    level4Boss.x=12100;level4Boss.y=330;level4Boss.active=true;level4BossPowerTimer=0;level4BossHitThisPower=false;
    level4BossProjectiles.length=0;level4BossProjectileTimer=480;spawnLevel4BossMushroom();
    startLevel4BossMusic();level4MoonPhaseMusic='base';updateBossUILevel4();
  }

  if(level4BossActive&&!won){
    level4Boss.phase+=.035;
    const dx=(player.x+15)-(level4Boss.x+76),dy=(player.y+22)-(level4Boss.y+76),d=Math.hypot(dx,dy)||1;
    const moonGoonSpeed=1.0125;
    if(level4BossPowerTimer>0){
      level4Boss.x+=(-dx/d)*moonGoonSpeed;level4Boss.y+=(-dy/d)*moonGoonSpeed;level4BossPowerTimer--;
      if(!level4BossHitThisPower&&rectHit(player,level4Boss)){
        level4BossHits++;level4BossHealth=Math.max(0,100-(level4BossHits*(100/30)));level4BossHitThisPower=true;playBigSplat();
      }
    }else{
      level4Boss.x+=(dx/d)*moonGoonSpeed;level4Boss.y+=(dy/d)*moonGoonSpeed;
      if(player.evilCooldown>0)player.evilCooldown--;
      if(bossEntryInvuln===0&&player.evilCooldown===0&&rectHit(player,level4Boss)){
        player.health=Math.max(0,player.health-20);player.evilCooldown=90;playLevel4Punch();
      }
    }
    level4Boss.x=Math.max(level4Arena.left,Math.min(level4Arena.right-level4Boss.w,level4Boss.x));
    level4Boss.y=Math.max(85,Math.min(388,level4Boss.y));
    if(level4BossPowerTimer===0&&level4BossHitThisPower)level4BossHitThisPower=false;

    // Mini moons: 0.75% of the Evil Goon's current 4.05 px/frame snowball speed.
    level4BossProjectileTimer--;
    if(level4BossProjectileTimer<=0){
      const sx=level4Boss.x+76,sy=level4Boss.y+76,tx=player.x+15,ty=player.y+22,mdx=tx-sx,mdy=ty-sy;
      const dist=Math.hypot(mdx,mdy)||1;
      const speed=4.05*.75; // exact 75%
      level4BossProjectiles.push({x:sx,y:sy,vx:mdx/dist*speed,vy:mdy/dist*speed,life:9000});
      level4BossProjectileTimer=420;
    }
    for(let i=level4BossProjectiles.length-1;i>=0;i--){
      const b=level4BossProjectiles[i];b.x+=b.vx;b.y+=b.vy;b.life--;
      const hit=player.x<b.x+26&&player.x+player.w>b.x-26&&player.y<b.y+26&&player.y+player.h>b.y-26;
      if(hit&&bossEntryInvuln===0){
        player.health=Math.max(0,player.health-10);player.evilCooldown=45;playLevel4Punch();level4BossProjectiles.splice(i,1);continue;
      }
      if(b.life<=0||b.x<10200||b.x>12850||b.y<40||b.y>690)level4BossProjectiles.splice(i,1);
    }

    if(level4BossMushroom.active&&Math.hypot(player.x+15-level4BossMushroom.x,player.y+22-level4BossMushroom.y)<52){
      level4BossMushroom.active=false;level4BossPowerTimer=1200;level4BossHitThisPower=false;
      level4PinkUses++;
      if(level4PinkUses%3===0)spawnLevel4BossPurpleMushroom();
    }
    if(level4BossPowerTimer===0&&!level4BossMushroom.active&&level4BossHealth>0){
      spawnLevel4BossMushroom();
    }
    for(let i=level4BossPurpleMushrooms.length-1;i>=0;i--){
      const pm=level4BossPurpleMushrooms[i];
      if(Math.hypot(player.x+15-pm.x,player.y+22-pm.y)<46){
        player.health=Math.min(100,player.health+30);
        level4BossPurpleMushrooms.splice(i,1);
        playGoonshroomSplat();
      }
    }

    updateLevel4BossPhaseMusic();
    if(level4BossHealth<=0){
      level4BossActive=false;level4BossDefeated=true;level4Boss.active=false;level4BossProjectiles.length=0;
      level4BossMushroom.active=false;level4BossPurpleMushrooms.length=0;level4BossPowerTimer=0;stopLevel4BossMusic();level4FlagVisible=true;
    }
  }

  if(level4FlagVisible&&!won&&player.x>12410){
    won=true;started=false;stopLevel4BossMusic();document.getElementById('bossUI').style.display='none';document.getElementById('endScreen').style.display='flex';
  }
  if(rainbowTimer>0)rainbowTimer--;
  updateHealthUI();updateBossUILevel4();
  camX+=((player.x-350)-camX)*.075;camX=Math.max(0,Math.min(12450,camX));
  hud.innerHTML=`DISTANCE: ${Math.max(0,Math.floor(player.x/10))} m`;
}

function updateBossUILevel4(){
  const hp=Math.max(0,Math.min(100,level4BossHealth));
  const fill=document.getElementById('bossFill'),txt=document.getElementById('bossText'),ui=document.getElementById('bossUI');
  if(fill)fill.style.width=hp+'%';
  if(txt)txt.textContent=Math.ceil(hp)+'%';
  if(ui)ui.style.display=(level4BossActive&&!won)?'block':'none';
  const t=document.querySelector('#bossUI>div:first-child');if(t)t.textContent='SIGMA MOON';
}

function drawLevel4Background(){
  ctx.fillStyle='#02050f';ctx.fillRect(0,0,W,H);
  const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'#020513');g.addColorStop(.72,'#071227');g.addColorStop(1,'#0b1833');
  ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
  ctx.save();
  for(const s of level4Stars){
    const x=s.x-camX*.22;
    ctx.globalAlpha=s.a;ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(x,s.y,s.r,0,Math.PI*2);ctx.fill();
  }
  for(const p of level4DistantPlanets){
    const x=p.x-camX*.08;
    ctx.globalAlpha=p.a;ctx.fillStyle=p.c;ctx.shadowColor=p.c;ctx.shadowBlur=25;
    ctx.beginPath();ctx.arc(x,p.y,p.r,0,Math.PI*2);ctx.fill();
    ctx.shadowBlur=0;ctx.globalAlpha=p.a*.55;ctx.strokeStyle='#fff';ctx.lineWidth=2;
    ctx.beginPath();ctx.arc(x,p.y,p.r+8,0.2,2.7);ctx.stroke();
  }
  ctx.restore();
}

function drawLevel4Planet(p){
  const x=p.x-camX,y=p.y;
  ctx.save();
  ctx.shadowColor=p.color;ctx.shadowBlur=22;ctx.fillStyle=p.color;ctx.beginPath();ctx.arc(x,y,p.r,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;
  ctx.globalAlpha=.25;ctx.fillStyle='#fff';
  for(let i=0;i<4;i++){
    const a=(p.seed*1.7+i*2.2)%6.283, rr=p.r*(.18+.1*i),cx=x+Math.cos(a)*rr,cy=y+Math.sin(a)*rr,cr=8+(i%3)*5;
    ctx.beginPath();ctx.arc(cx,cy,cr,0,Math.PI*2);ctx.fill();
  }
  // atmospheric band
  ctx.globalAlpha=.28;ctx.strokeStyle='#fff';ctx.lineWidth=4;ctx.beginPath();ctx.arc(x,y,p.r-6,0,Math.PI*2);ctx.stroke();
  // glowing magma patches on selected large planets
  for(const patch of level4MagmaPatches){
    if(patch.planetIndex!==p.seed)continue;
    ctx.save();ctx.strokeStyle='#ff3428';ctx.lineCap='round';ctx.shadowColor='#ff2418';ctx.shadowBlur=20;ctx.lineWidth=14.4;
    ctx.beginPath();ctx.arc(x,y,p.r-2,patch.angle-patch.span*.5,patch.angle+patch.span*.5);ctx.stroke();
    ctx.shadowBlur=0;ctx.strokeStyle='#ffcc55';ctx.lineWidth=4;
    ctx.beginPath();ctx.arc(x,y,p.r-2,patch.angle-patch.span*.5,patch.angle+patch.span*.5);ctx.stroke();
    ctx.restore();
  }
  ctx.restore();
}
function drawLevel4Asteroid(a){
  const x=a.x-camX,y=a.y;ctx.save();ctx.translate(x,y);ctx.rotate(Math.sin(Date.now()/1500+a.seed)*.03);
  ctx.fillStyle='#666d7a';ctx.strokeStyle='#aab3c3';ctx.lineWidth=3;ctx.shadowColor='rgba(190,205,230,.35)';ctx.shadowBlur=12;
  ctx.beginPath();
  for(let i=0;i<11;i++){const ang=i*Math.PI*2/11,rr=a.r*(.82+.17*((i*7+a.seed)%5)/4);const px=Math.cos(ang)*rr,py=Math.sin(ang)*rr;i===0?ctx.moveTo(px,py):ctx.lineTo(px,py);}
  ctx.closePath();ctx.fill();ctx.stroke();ctx.shadowBlur=0;
  ctx.fillStyle='#4d5461';for(let i=0;i<4;i++){const ang=(i*1.7+a.seed)%6.28,rr=a.r*.36;ctx.beginPath();ctx.arc(Math.cos(ang)*rr,Math.sin(ang)*rr,8+(i%2)*6,0,Math.PI*2);ctx.fill();}
  ctx.restore();
}
function drawLevel4Spacecraft(){
  const x=level4Arena.x-camX;
  ctx.save();
  // massive spacecraft body
  ctx.fillStyle='#3a4556';ctx.strokeStyle='#aab7c9';ctx.lineWidth=4;
  ctx.beginPath();ctx.moveTo(x+70,level4Arena.y+20);ctx.lineTo(x+240,level4Arena.y-80);ctx.lineTo(x+1780,level4Arena.y-80);ctx.lineTo(x+2090,level4Arena.y+55);ctx.lineTo(x+2000,level4Arena.y+110);ctx.lineTo(x+120,level4Arena.y+110);ctx.closePath();ctx.fill();ctx.stroke();
  // deck
  ctx.fillStyle='#202b3b';ctx.fillRect(x+80,level4Arena.y,level4Arena.w-160,32);
  ctx.fillStyle='#627286';ctx.fillRect(x+110,level4Arena.y+7,level4Arena.w-220,6);
  // windows / lights
  for(let i=0;i<13;i++){ctx.fillStyle=i%3===0?'#d9efff':'#607e99';ctx.fillRect(x+180+i*135,level4Arena.y-32,54,16);ctx.strokeStyle='#263142';ctx.strokeRect(x+180+i*135,level4Arena.y-32,54,16);}
  // engines
  ctx.fillStyle='#111824';ctx.beginPath();ctx.arc(x+350,level4Arena.y+105,55,0,Math.PI*2);ctx.arc(x+1840,level4Arena.y+105,55,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#8ed6ff';ctx.beginPath();ctx.arc(x+350,level4Arena.y+105,26,0,Math.PI*2);ctx.arc(x+1840,level4Arena.y+105,26,0,Math.PI*2);ctx.fill();
  ctx.restore();
}
function drawLevel4BossMushroom(){
  if(!level4BossActive||!level4BossMushroom.active)return;
  const x=level4BossMushroom.x-camX,y=level4BossMushroom.y;
  ctx.save();ctx.shadowColor='#ff4fd8';ctx.shadowBlur=28;ctx.fillStyle='#ff5fda';
  ctx.beginPath();ctx.arc(x,y-22,31,Math.PI,0);ctx.lineTo(x+31,y-22);ctx.quadraticCurveTo(x,y+8,x-31,y-22);ctx.closePath();ctx.fill();
  ctx.shadowBlur=0;ctx.fillStyle='#ffeaf8';ctx.fillRect(x-9,y-20,18,30);
  ctx.fillStyle='#fff';for(const [dx,dy] of [[-12,-28],[4,-37],[16,-18]]){ctx.beginPath();ctx.arc(x+dx,y+dy,6,0,Math.PI*2);ctx.fill();}
  ctx.restore();
}
function drawLevel4PurpleMushroom(x,y){
  ctx.save();ctx.shadowColor='#b66cff';ctx.shadowBlur=24;ctx.fillStyle='#a95cff';
  ctx.beginPath();ctx.arc(x,y-20,27,Math.PI,0);ctx.lineTo(x+27,y-20);ctx.quadraticCurveTo(x,y+7,x-27,y-20);ctx.closePath();ctx.fill();
  ctx.shadowBlur=0;ctx.fillStyle='#f1e5ff';ctx.fillRect(x-8,y-18,16,28);
  ctx.fillStyle='#fff';for(const [dx,dy] of [[-10,-26],[3,-34],[14,-17]]){ctx.beginPath();ctx.arc(x+dx,y+dy,5,0,Math.PI*2);ctx.fill();}
  ctx.restore();
}
function drawLevel4ParkourPurpleMushrooms(){
  for(const m of level4ParkourPurpleMushrooms)if(m.active)drawLevel4PurpleMushroom(m.x-camX,m.y);
}
function drawLevel4BossPurpleMushrooms(){
  for(const m of level4BossPurpleMushrooms)if(m.active)drawLevel4PurpleMushroom(m.x-camX,m.y);
}
function drawLevel4BossProjectiles(){
  for(const b of level4BossProjectiles){
    const x=b.x-camX,y=b.y;ctx.save();ctx.fillStyle='#e8ebf5';ctx.shadowColor='#ffffff';ctx.shadowBlur=20;ctx.beginPath();ctx.arc(x,y,26,0,Math.PI*2);ctx.fill();
    ctx.shadowBlur=0;ctx.fillStyle='#a9b4c8';ctx.beginPath();ctx.arc(x-7,y-8,7,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(x+8,y+4,5,0,Math.PI*2);ctx.fill();ctx.restore();
  }
}
function drawLevel4Boss(){
  if(!level4Boss.active)return;
  const x=level4Boss.x-camX,y=level4Boss.y;
  ctx.save();
  ctx.globalAlpha=.22;ctx.fillStyle='#fff';ctx.shadowColor='#fff';ctx.shadowBlur=35;ctx.beginPath();ctx.arc(x+76,y+76,112,0,Math.PI*2);ctx.fill();
  ctx.globalAlpha=1;ctx.shadowBlur=0;ctx.beginPath();ctx.arc(x+76,y+76,76,0,Math.PI*2);ctx.clip();
  const img=document.getElementById('level4MoonGoonSprite');
  ctx.filter='brightness(1.32) saturate(.25)';
  if(img&&img.complete)ctx.drawImage(img,x,y,152,152);
  ctx.restore();
  ctx.save();ctx.strokeStyle='rgba(255,255,255,.85)';ctx.lineWidth=4;ctx.shadowColor='#fff';ctx.shadowBlur=18;ctx.beginPath();ctx.arc(x+76,y+76,77,0,Math.PI*2);ctx.stroke();ctx.restore();
  ctx.fillStyle='#eef4ff';ctx.font='bold 14px Arial';ctx.textAlign='center';ctx.fillText('SIGMA MOON',x+76,y-14);
}
function drawLevel4Flag(){
  if(!level4FlagVisible)return;
  const x=12440-camX;ctx.fillStyle='#edf4ff';ctx.fillRect(x,330,7,190);ctx.fillStyle='#ff6b6b';
  ctx.beginPath();ctx.moveTo(x+7,335);ctx.lineTo(x+95,358);ctx.lineTo(x+7,381);ctx.closePath();ctx.fill();
  ctx.fillStyle='#fff';ctx.font='bold 20px Arial';ctx.fillText('FINISH',x+15,410);
}
function drawLevel4(){
  drawLevel4Background();
  for(const p of level4Planets)drawLevel4Planet(p);
  drawLevel4ParkourPurpleMushrooms();
  if(level4BossActive||level4BossDefeated||player.x>level4Arena.x-420){
    drawLevel4Spacecraft();
    for(const a of level4Asteroids)drawLevel4Asteroid(a);
    drawLevel4BossMushroom();
    drawLevel4BossPurpleMushrooms();
  }
  // The Moon Goon is visible and dangerous while chasing you through parkour too.
  if(level4Boss.active){
    drawLevel4BossProjectiles();
    drawLevel4Boss();
  }
  drawLevel4Flag();
  if(level4BossActive&&level4BossPowerTimer>0){
    ctx.save();const x=player.x-camX+15,y=player.y+22,pulse=25+7*Math.sin(Date.now()/90);
    ctx.globalAlpha=.26;ctx.fillStyle='#ff5be8';ctx.shadowColor='#ff5be8';ctx.shadowBlur=34;ctx.beginPath();ctx.arc(x,y,pulse,0,Math.PI*2);ctx.fill();
    ctx.globalAlpha=.8;ctx.strokeStyle='#ffd6f8';ctx.lineWidth=3;ctx.beginPath();ctx.arc(x,y,pulse+8,0,Math.PI*2);ctx.stroke();ctx.restore();
  }
  drawPlayer();
  ctx.fillStyle='rgba(255,255,255,.18)';ctx.fillRect(350,665,500,8);ctx.fillStyle='#ff63da';ctx.fillRect(350,665,500*Math.min(1,player.x/13300),8);
}


/* =========================
   SPECIAL 1 — MUSHROOM FRENZY
   ========================= */
// Special 1 uses a longer arena with solid grass ground and three much larger
// floating giant mushrooms as the main platforms.
const special1World={w:2925,ground:610};
const special1GiantMushrooms=[
  {x:520,y:485,rx:250,capH:105,stemW:125,stemH:150,c:'#e85a69',cap:'#ff7384',seed:3},
  {x:1460,y:420,rx:280,capH:118,stemW:140,stemH:155,c:'#6a7cff',cap:'#8492ff',seed:7},
  {x:2480,y:480,rx:260,capH:110,stemW:130,stemH:150,c:'#9f5be8',cap:'#b975ff',seed:11}
];
const special1Pink={x:1080,y:248,active:false};
let special1Bonus=null;
let special1PinkUses=0;
let special1PowerTimer=0;
let special1RedTimer=0;
let special1SpeedTimer=0;
let special1BossHealth=100;
let special1BossActive=false;
let special1BossDefeated=false;
let special1CloudTimer=840;
const special1Clouds=[];
const special1Poos=[];
let special1CloudShots=0;
const special1Eddith={x:1600,y:300,w:76,h:86,vx:0,phase:0,active:false};

function playSpecial1HitSound(){
  const a=document.getElementById('special1WetFart');if(!a)return;
  try{a.pause();a.currentTime=0;a.volume=.88;const p=a.play();if(p)p.catch(()=>{});}catch(e){}
}
function stopSpecial1Music(){
  const a=document.getElementById('special1Music');if(a){try{a.pause();a.currentTime=0;}catch(e){}}
}
function startSpecial1Music(){
  try{
    stopNormalMusic();stopBossMusic();stopLevel1BossMusic();stopLevel2BossMusic();stopLevel3BossMusic();stopLevel4BossMusic();
    const main=document.getElementById('bgMusic');if(main){main.pause();main.currentTime=0;}
    const a=document.getElementById('special1Music');if(a){a.loop=true;a.volume=.70;a.currentTime=0;const p=a.play();if(p)p.catch(()=>{});}
  }catch(e){}
}
let special1LastSpawnX=-9999;
function special1SpawnPink(){
  // All collectible mushrooms spawn randomly on solid grass only, with a generous
  // minimum separation so the pink and bonus mushrooms never appear side-by-side.
  const minGap=260;
  let gx;
  for(let tries=0;tries<40;tries++){
    const candidate=140+Math.random()*(special1World.w-280);
    if(Math.abs(candidate-special1LastSpawnX)>=minGap){gx=candidate;break;}
  }
  if(gx===undefined) gx=140+Math.random()*(special1World.w-280);
  special1LastSpawnX=gx;
  special1Pink.x=gx;
  special1Pink.y=special1World.ground-12;
  special1Pink.active=true;
  const roll=Math.floor(Math.random()*3);
  // Bonus mushroom is deliberately separated from the pink mushroom as well.
  let bx;
  if(gx < special1World.w/2) bx=gx+minGap+Math.random()*170;
  else bx=gx-minGap-Math.random()*170;
  bx=Math.max(140,Math.min(special1World.w-140,bx));
  special1Bonus={type:['purple','speed','red'][roll],x:bx,y:special1World.ground-12,active:true};
}

function special1ResetBoss(){
  special1BossHealth=100;special1BossActive=true;special1BossDefeated=false;special1Clouds.length=0;special1CloudTimer=840;
  special1PinkUses=0;special1PowerTimer=0;special1RedTimer=0;special1SpeedTimer=0;special1LastSpawnX=-9999;special1Poos.length=0;special1CloudShots=0;special1SpawnPink();
}
function resetSpecial1(){
  player={x:185,y:special1World.ground-44,w:30,h:44,vx:0,vy:0,onGround:true,coyote:7,jumpBuffer:0,health:100,pooCooldown:0,evilCooldown:0};
  camX=0;started=false;won=false;rainbowTimer=0;shroomTextTimer=0;pooTimer=0;
  special1Eddith.x=2600;special1Eddith.y=150;special1Eddith.phase=0;special1Eddith.active=true;
  special1BossActive=true;special1BossDefeated=false;special1BossHealth=100;special1Clouds.length=0;special1Poos.length=0;special1CloudShots=0;special1CloudTimer=840;
  special1PinkUses=0;special1PowerTimer=0;special1RedTimer=0;special1SpeedTimer=0;special1LastSpawnX=-9999;special1Poos.length=0;special1CloudShots=0;special1SpawnPink();
  document.getElementById('shroomText').classList.remove('show');document.getElementById('pooOverlay').classList.remove('show');
  document.getElementById('endScreen').style.display='none';document.getElementById('bossUI').style.display='none';
  const title=document.querySelector('#bossUI>div:first-child');if(title)title.textContent='EDDITH';
  stopNormalMusic();stopSpecial1Music();stopBossMusic();stopLevel1BossMusic();stopLevel2BossMusic();stopLevel3BossMusic();stopLevel4BossMusic();
  msg.style.display='block';msg.innerHTML='<h1>MUSHROOM FRENZY</h1><p>Press SPACE to start</p>';
  updateHealthUI();
}
function special1MushroomTop(m,px){
  const dx=px-m.x;
  if(Math.abs(dx)>m.rx)return null;
  const nx=dx/m.rx;
  // Flattened elliptical cap; collision uses the exact same profile drawn below.
  return m.y-m.capH*Math.sqrt(Math.max(0,1-nx*nx));
}
function special1SurfaceY(px){
  let best=special1World.ground;
  for(const m of special1GiantMushrooms){
    const top=special1MushroomTop(m,px);
    if(top!==null&&top<best)best=top;
  }
  return best;
}

function special1PlayerOnSurface(oldY){
  player.onGround=false;
  const bottomOld=oldY+player.h;
  const bottomNew=player.y+player.h;
  const center=player.x+player.w/2;
  if(bottomOld<=special1World.ground+4 && bottomNew>=special1World.ground && player.vy>=0){
    player.y=special1World.ground-player.h;
    player.vy=0;player.onGround=true;return;
  }
  // Snap directly to the visible mushroom cap when falling onto it.
  for(const m of special1GiantMushrooms){
    const top=special1MushroomTop(m,center);
    if(top===null)continue;
    if(player.vy>=0 && bottomOld<=top+8 && bottomNew>=top){
      player.y=top-player.h;
      player.vy=0;player.onGround=true;return;
    }
  }
}

function special1SpawnPoo(){
  const x=Math.max(60,Math.min(special1World.w-60,special1Eddith.x+38));
  special1Poos.push({x,y:special1Eddith.y+special1Eddith.h,v:1.2,active:true,landed:false,hit:false});
}
function updateSpecial1Poos(){
  for(let i=special1Poos.length-1;i>=0;i--){
    const p=special1Poos[i];
    if(!p.active)continue;
    if(!p.landed){
      p.v=Math.min(5,p.v+0.22);
      p.y+=p.v;
      if(p.y>=special1World.ground-8){p.y=special1World.ground-8;p.landed=true;playSpecial1HitSound();}
    }
    if(!p.hit&&player.pooCooldown===0&&Math.hypot(player.x+15-p.x,player.y+22-p.y)<38){
      p.hit=true;player.health=Math.max(0,player.health-10);player.pooCooldown=45;
      const overlay=document.getElementById('pooOverlay');if(overlay)overlay.classList.add('show');
      pooTimer=300;playEmbeddedSound('pooSplashSound');
    }
  }
}

function special1ActivatePink(){
  special1Pink.active=false;special1PowerTimer=1200;special1PinkUses++;
  if(special1PinkUses>1){} // base damage is one hit per eaten pink
  special1BossHitThisPower=false;
  if(special1PinkUses===1 && special1Bonus===null) special1SpawnPink();
}
let special1BossHitThisPower=false;
function updateSpecial1BossUI(){
  const hp=Math.max(0,Math.min(100,special1BossHealth));
  const fill=document.getElementById('bossFill'),txt=document.getElementById('bossText'),ui=document.getElementById('bossUI');
  if(fill)fill.style.width=hp+'%';if(txt)txt.textContent=Math.ceil(hp)+'%';
  if(ui)ui.style.display=(special1BossActive&&!special1BossDefeated&&!won)?'block':'none';
  const t=document.querySelector('#bossUI>div:first-child');if(t)t.textContent='EDDITH';
}
function updateSpecial1(){
  if(!started)return;
  const left=keys.KeyA||keys.ArrowLeft,right=keys.KeyD||keys.ArrowRight,jump=keys.Space||keys.ArrowUp;
  const mult=special1SpeedTimer>0?1.5:1;
  if(left)player.vx-=.10*mult;if(right)player.vx+=.10*mult;if(!left&&!right)player.vx*=.94;
  const vmax=1.65*mult;player.vx=Math.max(-vmax,Math.min(vmax,player.vx));
  if(jump)player.jumpBuffer=7;else player.jumpBuffer=Math.max(0,player.jumpBuffer-1);
  if(player.onGround)player.coyote=7;else player.coyote=Math.max(0,player.coyote-1);
  if(player.jumpBuffer>0&&player.coyote>0){player.vy=-12.5;player.onGround=false;player.coyote=0;player.jumpBuffer=0;}
  player.vy+=.20;player.vy=Math.min(player.vy,5);
  const oldY=player.y;player.x+=player.vx;player.y+=player.vy;player.onGround=false;special1PlayerOnSurface(oldY);
  player.x=Math.max(0,Math.min(special1World.w-player.w,player.x));
  // Keep the player toward the left side of the screen while the camera follows.
  camX += ((player.x-300)-camX)*.10;
  camX = Math.max(0,Math.min(Math.max(0,special1World.w-W),camX));
  if(player.y>760){player.health=0;updateHealthUI();return;}
  if(player.evilCooldown>0)player.evilCooldown--;
  if(special1PowerTimer>0)special1PowerTimer--;
  if(pooTimer>0){pooTimer--;if(pooTimer===0)document.getElementById('pooOverlay').classList.remove('show');}
  if(player.pooCooldown>0)player.pooCooldown--;
  updateSpecial1Poos();
  if(special1RedTimer>0)special1RedTimer--;
  if(special1SpeedTimer>0)special1SpeedTimer--;
  // Eat pink mushroom and bonus mushroom.
  if(special1Pink.active&&Math.hypot(player.x+15-special1Pink.x,player.y+22-special1Pink.y)<58){special1ActivatePink();}
  if(special1Bonus&&special1Bonus.active&&Math.hypot(player.x+15-special1Bonus.x,player.y+22-special1Bonus.y)<55){
    const type=special1Bonus.type;special1Bonus.active=false;
    if(type==='purple')player.health=Math.min(100,player.health+30);
    else if(type==='speed')special1SpeedTimer=900;
    else if(type==='red')special1RedTimer=900;
    rainbowTimer=500;shroomTextTimer=300;
    playGoonshroomSplat();
  }
  // Respawn next pink after the 20-second power window ends.
  if(special1PowerTimer===0&&!special1Pink.active&&!special1BossDefeated){special1SpawnPink();}

  if(special1BossActive&&!special1BossDefeated){
    special1Eddith.phase+=.04;
    const dx=(player.x+15)-(special1Eddith.x+38),dy=(player.y+22)-(special1Eddith.y+43),d=Math.hypot(dx,dy)||1;
    const speed=.1+1.25; // 1.35 px/frame, same as Evil Goon
    if(special1PowerTimer>0){
      // Boss flees while pink power is active so the hit must be made while the mushroom glow is active.
      special1Eddith.x-=dx/d*1.35;special1Eddith.y-=dy/d*1.35;
      if(!special1BossHitThisPower&&rectHit(player,special1Eddith)){
        const dmg=12.5;special1BossHealth=Math.max(0,special1BossHealth-dmg);special1BossHitThisPower=true;playBigSplat();
      }
    }else{
      special1Eddith.x+=dx/d*1.35;special1Eddith.y+=dy/d*1.35;
      if(player.evilCooldown===0&&rectHit(player,special1Eddith)){player.health=Math.max(0,player.health-20);player.evilCooldown=90;playSpecial1HitSound();}
    }
    special1Eddith.x=Math.max(40,Math.min(special1World.w-130,special1Eddith.x));
    special1Eddith.y=Math.max(120,Math.min(510,special1Eddith.y));
    if(special1PowerTimer===0)special1BossHitThisPower=false;

    // Translucent brown clouds: half Evil Goon's speed, half its firing frequency.
    special1CloudTimer--;
    if(special1CloudTimer<=0){
      const sx=special1Eddith.x+38,sy=special1Eddith.y+43,tx=player.x+15,ty=player.y+22,cdx=tx-sx,cdy=ty-sy,dist=Math.hypot(cdx,cdy)||1;
      const speed=4.05*.5;
      special1Clouds.push({x:sx,y:sy,vx:cdx/dist*speed,vy:cdy/dist*speed,life:9000});
      special1CloudShots++;
      playSpecial1HitSound();
      if(special1CloudShots%3===0) special1SpawnPoo();
      special1CloudTimer=840;
    }
    for(let i=special1Clouds.length-1;i>=0;i--){
      const c=special1Clouds[i];c.x+=c.vx;c.y+=c.vy;c.life--;
      const hit=player.x<c.x+39&&player.x+player.w>c.x-39&&player.y<c.y+39&&player.y+player.h>c.y-39;
      if(hit){player.health=Math.max(0,player.health-10);player.evilCooldown=45;playSpecial1HitSound();special1Clouds.splice(i,1);continue;}
      if(c.life<=0||c.x<0||c.x>special1World.w||c.y<-50||c.y>800)special1Clouds.splice(i,1);
    }
    if(special1BossHealth<=0){special1BossDefeated=true;special1BossActive=false;special1Eddith.active=false;special1Clouds.length=0;special1Poos.length=0;stopSpecial1Music();document.getElementById('bossUI').style.display='none';won=true;document.getElementById('endScreen').style.display='flex';}
  }
  updateSpecial1BossUI();updateHealthUI();
}
function drawSpecial1Background(){
  const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'#56bfff');g.addColorStop(.65,'#a7e8ff');g.addColorStop(1,'#d8f6ff');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
  // sky clouds
  ctx.fillStyle='rgba(255,255,255,.8)';
  for(let i=0;i<9;i++){const x=i*330-(camX*.18%330)-70,y=85+(i%4)*70;ctx.beginPath();ctx.arc(x,y,28,0,Math.PI*2);ctx.arc(x+35,y-16,38,0,Math.PI*2);ctx.arc(x+78,y,29,0,Math.PI*2);ctx.fill();}
  ctx.fillStyle='rgba(255,255,255,.55)';for(let i=0;i<5;i++){const x=i*500-(camX*.1%500),y=260+(i%3)*90;ctx.beginPath();ctx.arc(x,y,18,0,Math.PI*2);ctx.arc(x+28,y-8,25,0,Math.PI*2);ctx.arc(x+58,y,17,0,Math.PI*2);ctx.fill();}
  // Distant hills behind a solid grassy floor.
  ctx.fillStyle='#8bd48c';ctx.beginPath();ctx.moveTo(0,560);for(let x=0;x<=W;x+=90)ctx.quadraticCurveTo(x+45,500-(x%180),x+90,560);ctx.lineTo(W,H);ctx.lineTo(0,H);ctx.closePath();ctx.fill();
  // Solid grass ground matching the collision surface at y=610.
  ctx.fillStyle='#4fae55';ctx.fillRect(0,special1World.ground,W,H-special1World.ground);
  ctx.fillStyle='#6fd46e';for(let x=0;x<W;x+=18){const sx=x-camX%18;ctx.fillRect(sx,special1World.ground-4,9,4);}
}
function drawSpecial1GiantMushroom(m){
  const x=m.x-camX,y=m.y;ctx.save();
  const rx=m.rx, h=m.capH;
  // Tapered floating stem.
  const sw=m.stemW||120, sh=m.stemH||170;
  const stemGrad=ctx.createLinearGradient(x-sw/2,y-4,x+sw/2,y-4);
  stemGrad.addColorStop(0,'rgba(255,255,255,.16)');
  stemGrad.addColorStop(.38,m.c);
  stemGrad.addColorStop(1,'rgba(70,40,90,.30)');
  ctx.fillStyle=stemGrad;
  ctx.beginPath();
  ctx.moveTo(x-sw*.34,y-2);
  ctx.quadraticCurveTo(x-sw*.46,y+sh*.38,x-sw*.38,y+sh);
  ctx.lineTo(x+sw*.38,y+sh);
  ctx.quadraticCurveTo(x+sw*.46,y+sh*.38,x+sw*.34,y-2);
  ctx.closePath();ctx.fill();

  // Broad, flattened cap with a shallow dome. The silhouette matches the collision ellipse.
  ctx.fillStyle=m.cap;ctx.shadowColor=m.cap;ctx.shadowBlur=26;
  ctx.beginPath();
  ctx.moveTo(x-rx,y);
  ctx.quadraticCurveTo(x-rx*.86,y-h*.78,x-rx*.48,y-h*.93);
  ctx.quadraticCurveTo(x,y-h*1.08,x+rx*.48,y-h*.93);
  ctx.quadraticCurveTo(x+rx*.86,y-h*.78,x+rx,y);
  ctx.quadraticCurveTo(x+rx*.76,y+h*.10,x+rx*.34,y+h*.04);
  ctx.quadraticCurveTo(x,y+h*.16,x-rx*.34,y+h*.04);
  ctx.quadraticCurveTo(x-rx*.76,y+h*.10,x-rx,y);
  ctx.closePath();ctx.fill();ctx.shadowBlur=0;

  // Natural cap highlights / markings.
  ctx.fillStyle='rgba(255,255,255,.18)';
  for(let i=0;i<5;i++){
    const a=(m.seed+i*1.71)%6.283;
    const px=Math.cos(a)*rx*(.20+.12*(i%3));
    const py=-h*(.42+.12*(i%2));
    ctx.beginPath();ctx.ellipse(x+px,y+py,10+(i%3)*4,5+(i%2)*3,a,0,Math.PI*2);ctx.fill();
  }
  ctx.fillStyle='rgba(0,0,0,.10)';
  ctx.beginPath();ctx.ellipse(x,y+5,rx*.58,9,0,0,Math.PI*2);ctx.fill();
  ctx.restore();
}
function drawSpecial1Pink(){if(!special1Pink.active)return;const x=special1Pink.x-camX,y=special1Pink.y;ctx.save();ctx.shadowColor='#ff4fd8';ctx.shadowBlur=28;ctx.fillStyle='#ff5fda';ctx.beginPath();ctx.arc(x,y-24,31,Math.PI,0);ctx.closePath();ctx.fill();ctx.shadowBlur=0;ctx.fillStyle='#ffeaf8';ctx.fillRect(x-9,y-22,18,30);ctx.fillStyle='#fff';for(const [dx,dy] of [[-12,-30],[4,-39],[16,-20]]){ctx.beginPath();ctx.arc(x+dx,y+dy,6,0,Math.PI*2);ctx.fill();}ctx.restore();}
function drawSpecial1Bonus(){if(!special1Bonus||!special1Bonus.active)return;const x=special1Bonus.x-camX,y=special1Bonus.y;const c=special1Bonus.type==='purple'?'#a85cff':special1Bonus.type==='speed'?'#49e66d':'#ff453e';ctx.save();ctx.shadowColor=c;ctx.shadowBlur=22;ctx.fillStyle=c;ctx.beginPath();ctx.arc(x,y-20,26,Math.PI,0);ctx.closePath();ctx.fill();ctx.shadowBlur=0;ctx.fillStyle='#f7eadf';ctx.fillRect(x-8,y-18,16,28);ctx.fillStyle='rgba(255,255,255,.8)';for(const [dx,dy] of [[-9,-26],[3,-33],[12,-16]]){ctx.beginPath();ctx.arc(x+dx,y+dy,4.5,0,Math.PI*2);ctx.fill();}ctx.restore();}
function drawSpecial1Eddith(){if(!special1Eddith.active)return;const x=special1Eddith.x-camX,y=special1Eddith.y;ctx.save();ctx.globalAlpha=.22;ctx.shadowColor='#ff61ff';ctx.shadowBlur=36;const hg=ctx.createLinearGradient(x,y,x+76,y+86);hg.addColorStop(0,'#ff4545');hg.addColorStop(.25,'#fff26b');hg.addColorStop(.5,'#68f3ff');hg.addColorStop(.75,'#7b6cff');hg.addColorStop(1,'#ff55d8');ctx.fillStyle=hg;ctx.beginPath();ctx.arc(x+38,y+43,66,0,Math.PI*2);ctx.fill();ctx.globalAlpha=1;ctx.shadowBlur=0;ctx.beginPath();ctx.arc(x+38,y+43,38,0,Math.PI*2);ctx.clip();const img=document.getElementById('special1EddithSprite');if(img&&img.complete)ctx.drawImage(img,x-4,y-4,84,94);ctx.restore();ctx.save();ctx.strokeStyle='rgba(255,255,255,.85)';ctx.lineWidth=4;ctx.shadowColor='#ff64ec';ctx.shadowBlur=16;ctx.beginPath();ctx.arc(x+38,y+43,39,0,Math.PI*2);ctx.stroke();ctx.restore();ctx.fillStyle='#fff';ctx.font='bold 14px Arial';ctx.textAlign='center';ctx.fillText('EDDITH',x+38,y-14);}
function drawSpecial1Poos(){for(const p of special1Poos){if(!p.active)continue;drawPoo(p);}}
function drawSpecial1Clouds(){for(const c of special1Clouds){const x=c.x-camX,y=c.y;ctx.save();ctx.globalAlpha=.42;ctx.fillStyle='#8f5f3d';ctx.shadowColor='#b88256';ctx.shadowBlur=18;ctx.beginPath();ctx.arc(x,y,39,0,Math.PI*2);ctx.arc(x-28,y+10,27,0,Math.PI*2);ctx.arc(x+26,y-8,25,0,Math.PI*2);ctx.fill();ctx.restore();}}

/* =========================
   SPECIAL 4 — STOOD BRAWL
   ========================= */
const special4World={w:3900,ground:610};
const special4BossRoom={x:1120,w:1500};
const special4Platforms=[
  {x:0,y:610,w:900,h:90,type:'stone'},
  {x:900,y:610,w:220,h:90,type:'stone'},
  {x:1120,y:610,w:1500,h:90,type:'stone'},
  {x:2620,y:610,w:1280,h:90,type:'stone'}
];
const special4Castle={x:720,y:110,w:1900,h:500,doorX:1080,doorW:80};
const special4Pink={active:false,x:0,y:0};
const special4Bonus={active:false,type:'',x:0,y:0};
const special4GreenBalls=[];
const special4ArmorStands=[
  {x:1390,y:530},{x:1830,y:530},{x:2280,y:530}
];

// All three STOOD forms can float, but never above the lower-ceiling limit.
const special4FloatTop=158;
const special4Stood={x:1850,y:470,w:92,h:104,vx:0,phase:0,active:false,hitCooldown:0,ballTimer:1,nextBallAt:0,shotCooldown:1};
const special4Mega={x:1900,y:455,w:112,h:128,vx:0,phase:0,active:false,hitCooldown:0,ballTimer:1,nextBallAt:0,shotCooldown:1,megaWaveTimer:2400};
const special4Sigma={x:2050,y:450,w:140,h:160,vx:0,phase:0,active:false,hitCooldown:0,ballTimer:600,nextBallAt:0,shotCooldown:1,spinTimer:3600,spinBurstTimer:0,spinAngle:0,spinFired:false,chargeTimer:2700,chargeTime:0,chargeVX:0,chargeVY:0,chargeTargetX:0,chargeTargetY:0,chargePendingSpin:false,chargeBurstTimer:0};
let special4Elapsed=0;
let special4BossActive=false,special4BossDefeated=false,special4MegaActive=false,special4SigmaActive=false;
let special4BossHits=0,special4BossHitThisPower=false;
let special4MegaHits=0,special4MegaHitThisPower=false;
let special4SigmaHits=0,special4SigmaHitThisPower=false;
let special4PinkPowerTimer=0,special4PinkSpawnTimer=0;
let special4BonusSpeedTimer=0,special4HitFlash=0;
let special4FlagVisible=false,special4FlagX=0;
let special4ExplosionTimer=0,special4ExplosionX=0,special4ExplosionY=0,special4Shake=0;

function resetSpecial4(){
  try{stopSpecial3Music();}catch(e){}
  try{stopSpecial4Music();}catch(e){}
  player={x:170,y:special4World.ground-44,w:30,h:44,vx:0,vy:0,onGround:true,coyote:7,jumpBuffer:0,health:100,pooCooldown:0,evilCooldown:0};
  camX=0;won=false;started=false;
  special4Elapsed=0;special4BossActive=false;special4BossDefeated=false;special4MegaActive=false;special4SigmaActive=false;
  special4BossHits=0;special4BossHitThisPower=false;special4MegaHits=0;special4MegaHitThisPower=false;special4SigmaHits=0;special4SigmaHitThisPower=false;
  special4PinkPowerTimer=0;special4PinkSpawnTimer=0;special4BonusSpeedTimer=0;special4TransformInvuln=0;special4HitFlash=0;
  special4FlagVisible=false;special4FlagX=0;special4ExplosionTimer=0;special4ExplosionX=0;special4ExplosionY=0;special4Shake=0;
  special4Pink.active=false;special4Bonus.active=false;special4GreenBalls.length=0;
  special4Stood.x=1850;special4Stood.y=special4World.ground-special4Stood.h;special4Stood.vx=0;special4Stood.phase=0;special4Stood.active=false;special4Stood.hitCooldown=0;special4Stood.ballTimer=1;special4Stood.nextBallAt=0;special4Stood.shotCooldown=1;
  special4Mega.x=2050;special4Mega.y=special4World.ground-special4Mega.h;special4Mega.vx=0;special4Mega.phase=0;special4Mega.active=false;special4Mega.hitCooldown=0;special4Mega.ballTimer=1;special4Mega.nextBallAt=0;special4Mega.shotCooldown=1;special4Mega.megaWaveTimer=2400;
  special4Sigma.x=2250;special4Sigma.y=special4World.ground-special4Sigma.h;special4Sigma.vx=0;special4Sigma.phase=0;special4Sigma.active=false;special4Sigma.hitCooldown=0;special4Sigma.ballTimer=600;special4Sigma.nextBallAt=0;special4Sigma.shotCooldown=1;special4Sigma.spinTimer=3600;special4Sigma.spinBurstTimer=0;special4Sigma.spinAngle=0;special4Sigma.spinFired=false;special4Sigma.chargeTimer=2700;special4Sigma.chargeTime=0;special4Sigma.chargeVX=0;special4Sigma.chargeVY=0;special4Sigma.chargeTargetX=0;special4Sigma.chargeTargetY=0;special4Sigma.chargePendingSpin=false;special4Sigma.chargeBurstTimer=0;
  const ui=document.getElementById('special4BossUI');if(ui)ui.style.display='none';
  document.getElementById('bossUI').style.display='none';
  document.getElementById('endScreen').style.display='none';
  document.getElementById('pooOverlay').classList.remove('show');
  document.getElementById('shroomText').classList.remove('show');
  msg.style.display='block';msg.innerHTML='<h1>STOOD BRAWL</h1><p>Press SPACE to start</p>';
  updateHealthUI();
}

function special4SpawnPink(){
  const candidates=[
    {x:1260,y:special4World.ground-26},{x:1550,y:504},{x:2040,y:504},{x:2380,y:special4World.ground-26},{x:2860,y:464},{x:3250,y:512}
  ];
  const p=candidates[Math.floor(Math.random()*candidates.length)];
  special4Pink.x=p.x;special4Pink.y=p.y;special4Pink.active=true;
}
function special4SpawnBonus(){
  if(special4Bonus.active)return;
  special4Bonus.type=Math.random()<0.6?'purple':'green';
  const xs=[1350,1650,2150,2380,2920,3370];
  special4Bonus.x=xs[Math.floor(Math.random()*xs.length)];
  special4Bonus.y=special4World.ground-28;
  special4Bonus.active=true;
}

function drawSpecial4CastleBackground(){
  // Dense jungle behind the castle.
  const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'#74a95b');g.addColorStop(.55,'#3f6d3c');g.addColorStop(1,'#203b27');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
  ctx.save();ctx.globalAlpha=.72;ctx.fillStyle='#1f4d2f';
  for(let i=0;i<34;i++){const x=i*150-(camX*.12%150)-80,y=300+(i%4)*24,r=70+(i%5)*15;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();}
  ctx.restore();
  for(let i=0;i<16;i++){const x=i*310-(camX*.16%310)-90,h=170+(i%4)*45;ctx.fillStyle='rgba(64,45,27,.78)';ctx.fillRect(x,500-h,24,h);ctx.fillStyle='rgba(34,88,43,.9)';for(let j=0;j<4;j++){ctx.beginPath();ctx.ellipse(x+10+(j%2)*20,490-h+j*28,55,22,((j%2)*.25)-.2,0,Math.PI*2);ctx.fill();}}
  ctx.fillStyle='#596473';
  for(let i=0;i<8;i++){const x=i*520-(camX*.18%520)-120,h=115+(i%3)*35;ctx.fillRect(x,500-h,110,h);ctx.fillStyle='#4b5664';ctx.beginPath();ctx.moveTo(x-12,500-h);ctx.lineTo(x+55,470-h);ctx.lineTo(x+122,500-h);ctx.closePath();ctx.fill();ctx.fillStyle='#596473';}
  const cx=special4Castle.x-camX;
  ctx.fillStyle='#596473';ctx.fillRect(cx,special4Castle.y,special4Castle.w,special4Castle.h);
  ctx.strokeStyle='rgba(30,38,50,.6)';ctx.lineWidth=3;
  for(let yy=special4Castle.y+25;yy<610;yy+=42){ctx.beginPath();ctx.moveTo(cx,yy);ctx.lineTo(cx+special4Castle.w,yy);ctx.stroke();}
  for(let row=0;row<12;row++){const yy=special4Castle.y+row*42,off=row%2?46:0;for(let xx=cx+off;xx<cx+special4Castle.w;xx+=92){ctx.beginPath();ctx.moveTo(xx,yy);ctx.lineTo(xx,yy+42);ctx.stroke();}}
  ctx.fillStyle='#4a5566';for(let x=cx;x<cx+special4Castle.w;x+=70)ctx.fillRect(x,special4Castle.y-24,46,24);
  // Sigma's arrival gives the castle a subtle green tint, while leaving the
  // rest of the world at its normal colours.
  if(special4SigmaActive){
    ctx.fillStyle='rgba(65,255,95,.07)';
    ctx.fillRect(cx,special4Castle.y,special4Castle.w,special4Castle.h);
  }
  const dx=special4Castle.doorX-camX;ctx.fillStyle='#20242b';ctx.fillRect(dx,special4Castle.y+120,special4Castle.doorW,490);ctx.fillStyle='#c94b4b';ctx.fillRect(dx+13,535,special4Castle.doorW-26,75);ctx.strokeStyle='#111';ctx.lineWidth=6;ctx.strokeRect(dx,special4Castle.y+120,special4Castle.doorW,490);ctx.fillStyle='#fff';ctx.font='900 15px Arial';ctx.textAlign='center';ctx.fillText('ENTER',dx+special4Castle.doorW/2,special4Castle.y+105);
  ctx.fillStyle='#7d8795';ctx.fillRect(-20,special4World.ground,W+40,H-special4World.ground);ctx.fillStyle='#aeb7c2';ctx.fillRect(-20,special4World.ground-10,W+40,10);
  ctx.strokeStyle='rgba(50,58,68,.65)';ctx.lineWidth=2;for(let x=0;x<W;x+=72){ctx.beginPath();ctx.moveTo(x-camX%72,special4World.ground);ctx.lineTo(x+36-camX%72,H);ctx.stroke();}
  const carpetStart=special4BossRoom.x-camX,carpetEnd=special4BossRoom.x+1100-camX;ctx.fillStyle='#8e1820';ctx.fillRect(carpetStart,special4World.ground-32,Math.max(0,carpetEnd-carpetStart),32);ctx.fillStyle='rgba(255,220,220,.12)';ctx.fillRect(carpetStart,special4World.ground-32,Math.max(0,carpetEnd-carpetStart),5);
  ctx.fillStyle='rgba(20,24,30,.35)';ctx.fillRect(special4BossRoom.x-camX,150,1500,420);
  for(const tx of [1320,1980,2450]){const x=tx-camX;ctx.fillStyle='#6d4b31';ctx.fillRect(x-5,320,10,95);ctx.fillStyle='#ffbd47';ctx.shadowColor='#ffb52e';ctx.shadowBlur=18;ctx.beginPath();ctx.arc(x,315,10,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;}
}
function drawSpecial4Door(){
  const x=special4Castle.doorX-camX;ctx.save();ctx.strokeStyle='#2d1d15';ctx.lineWidth=7;ctx.fillStyle='#5a3721';ctx.fillRect(x+7,235,66,375);ctx.strokeRect(x+7,235,66,375);ctx.fillStyle='#d2a85b';ctx.fillRect(x+52,425,8,8);ctx.restore();
}
function drawSpecial4ArmorStand(a){
  const x=a.x-camX,y=a.y;ctx.save();ctx.strokeStyle='#bfc7d2';ctx.lineWidth=8;ctx.beginPath();ctx.moveTo(x,y-65);ctx.lineTo(x,y-15);ctx.moveTo(x-20,y-46);ctx.lineTo(x+20,y-46);ctx.moveTo(x,y-15);ctx.lineTo(x-20,y+10);ctx.moveTo(x,y-15);ctx.lineTo(x+20,y+10);ctx.stroke();ctx.fillStyle='#d7dde5';ctx.beginPath();ctx.arc(x,y-82,14,0,Math.PI*2);ctx.fill();ctx.fillStyle='rgba(255,255,255,.35)';ctx.fillRect(x-26,y-56,52,36);ctx.restore();
}
function drawSpecial4Pink(){
  if(!special4Pink.active)return;const x=special4Pink.x-camX,y=special4Pink.y;ctx.save();ctx.shadowColor='#ff49dc';ctx.shadowBlur=26;ctx.fillStyle='#ff54d9';ctx.beginPath();ctx.arc(x,y-20,27,Math.PI,0);ctx.closePath();ctx.fill();ctx.shadowBlur=0;ctx.fillStyle='#fff1fa';ctx.fillRect(x-8,y-18,16,27);ctx.fillStyle='#fff';for(const [dx,dy] of [[-10,-27],[3,-34],[13,-16]]){ctx.beginPath();ctx.arc(x+dx,y+dy,5,0,Math.PI*2);ctx.fill();}ctx.restore();
}
function drawSpecial4Bonus(){
  if(!special4Bonus.active)return;const x=special4Bonus.x-camX,y=special4Bonus.y,c=special4Bonus.type==='green'?'#49e66d':'#a85cff';ctx.save();ctx.shadowColor=c;ctx.shadowBlur=22;ctx.fillStyle=c;ctx.beginPath();ctx.arc(x,y-20,25,Math.PI,0);ctx.closePath();ctx.fill();ctx.shadowBlur=0;ctx.fillStyle='#f6eadf';ctx.fillRect(x-8,y-18,16,27);ctx.fillStyle='#fff';for(const [dx,dy] of [[-9,-26],[3,-32],[12,-15]]){ctx.beginPath();ctx.arc(x+dx,y+dy,4.5,0,Math.PI*2);ctx.fill();}ctx.restore();
}
function drawSpecial4Balls(){
  for(const b of special4GreenBalls){
    const x=b.x-camX,y=b.y;
    ctx.save();
    ctx.shadowColor='#46e56e';ctx.shadowBlur=(b.sine?26:22);
    ctx.fillStyle='#57f27a';ctx.beginPath();ctx.arc(x,y,18,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='rgba(255,255,255,.86)';ctx.beginPath();ctx.arc(x-4,y-4,4.5,0,Math.PI*2);ctx.fill();
    ctx.strokeStyle='rgba(160,255,180,.65)';ctx.lineWidth=2;ctx.beginPath();ctx.arc(x,y,20,0,Math.PI*2);ctx.stroke();
    ctx.restore();
  }
}
function drawSpecial4Stood(){
  const drawBoss=(boss,id,label,auraAlpha,sizeBoost,spin)=>{
    if(!boss.active)return;
    const x=boss.x-camX,y=boss.y,img=document.getElementById(id);
    ctx.save();
    ctx.globalAlpha=auraAlpha;ctx.fillStyle='#3cff62';ctx.shadowColor='#24e85b';ctx.shadowBlur=spin?24:18;ctx.beginPath();ctx.arc(x+boss.w/2,y+boss.h/2,spin?105:(sizeBoost?88:75),0,Math.PI*2);ctx.fill();ctx.globalAlpha=1;
    if(boss.chargeTime>0){
      ctx.save();
      const pulse=36+18*Math.sin((600-boss.chargeTime)*.28);
      ctx.globalAlpha=Math.max(.08,Math.min(.35,(boss.chargeBurstTimer>0?.35:.16)));
      ctx.fillStyle='#ffb52e';ctx.shadowColor='#ff7b00';ctx.shadowBlur=28;
      ctx.beginPath();ctx.arc(x+boss.w/2,y+boss.h/2,pulse,0,Math.PI*2);ctx.fill();
      ctx.restore();
    }
    if(spin){
      ctx.save();
      ctx.translate(x+boss.w/2,y+boss.h/2);
      ctx.rotate(boss.spinBurstTimer>0 ? boss.spinAngle : 0);
      ctx.beginPath();ctx.rect(-boss.w/2,-boss.h/2,boss.w,boss.h);ctx.clip();
      if(img&&img.complete){ctx.filter='hue-rotate(88deg) saturate(1.22) brightness(1.04)';ctx.drawImage(img,-(boss.w+(sizeBoost?16:12))/2,-(boss.h+(sizeBoost?16:12))/2,boss.w+(sizeBoost?16:12),boss.h+(sizeBoost?16:12));}
      ctx.restore();
    }else{
      ctx.beginPath();ctx.rect(x,y,boss.w,boss.h);ctx.clip();
      if(img&&img.complete){ctx.filter='hue-rotate(88deg) saturate(1.22) brightness(1.04)';ctx.drawImage(img,x-(sizeBoost?8:6),y-(sizeBoost?8:6),boss.w+(sizeBoost?16:12),boss.h+(sizeBoost?16:12));}
      ctx.restore();
    }
    ctx.save();ctx.strokeStyle='rgba(95,255,120,.34)';ctx.lineWidth=3;ctx.shadowColor='#38ef68';ctx.shadowBlur=spin?12:8;ctx.strokeRect(x-2,y-2,boss.w+4,boss.h+4);ctx.restore();
    if(spin){
      ctx.save();ctx.translate(x+boss.w/2,y+boss.h/2);ctx.rotate(boss.spinBurstTimer>0 ? boss.spinAngle : 0);ctx.strokeStyle='rgba(255,255,255,.85)';ctx.lineWidth=5;ctx.beginPath();ctx.arc(0,0,Math.min(boss.w,boss.h)*.40,0,Math.PI*1.35);ctx.stroke();ctx.restore();
    }
    ctx.fillStyle='#fff';ctx.font='900 15px Arial';ctx.textAlign='center';ctx.fillText(label,x+boss.w/2,y-14);
  };
  drawBoss(special4Stood,'special4StoodSprite','STOOD',.07,false,false);
  drawBoss(special4Mega,'special4MegaSprite','MEGA STOOD',.055,true,false);
  drawBoss(special4Sigma,'special4SigmaSprite','SIGMA STOOD',.045,true,true);
}
function drawSpecial4Flag(){
  if(!special4FlagVisible)return;
  const x=special4FlagX-camX;
  ctx.save();ctx.fillStyle='#e7e7e7';ctx.fillRect(x,300,7,190);ctx.fillStyle='#31d65d';ctx.beginPath();ctx.moveTo(x+7,305);ctx.lineTo(x+96,330);ctx.lineTo(x+7,355);ctx.closePath();ctx.fill();ctx.fillStyle='#fff';ctx.font='900 20px Arial';ctx.textAlign='left';ctx.fillText('FINISH',x+14,382);ctx.restore();
}
function drawSpecial4Explosion(){
  if(special4ExplosionTimer<=0)return;
  const t=special4ExplosionTimer,elapsed=120-t;
  const cx=special4ExplosionX-camX,cy=special4ExplosionY;
  ctx.save();
  const r=22+Math.min(180,elapsed*2.8);
  const grd=ctx.createRadialGradient(cx,cy,0,cx,cy,r);grd.addColorStop(0,'rgba(255,255,210,.95)');grd.addColorStop(.28,'rgba(255,210,55,.88)');grd.addColorStop(.62,'rgba(255,105,20,.70)');grd.addColorStop(1,'rgba(255,40,0,0)');
  ctx.fillStyle=grd;ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.fill();
  for(let i=0;i<18;i++){const a=i*Math.PI*2/18,t2=elapsed/30,rr=25+i%4*11+t2*3;const px=cx+Math.cos(a)*rr,py=cy+Math.sin(a)*rr;ctx.fillStyle='rgba(255,150,30,.85)';ctx.beginPath();ctx.arc(px,py,4+(i%3),0,Math.PI*2);ctx.fill();}
  ctx.restore();
}

function updateSpecial4BossUI(){
  const ui=document.getElementById('special4BossUI'),fill=document.getElementById('special4BossFill'),txt=document.getElementById('special4BossText');
  const title=ui?ui.querySelector('div'):null;
  const label=special4SigmaActive?'SIGMA STOOD':(special4MegaActive?'MEGA STOOD':'STOOD');
  if(title)title.textContent=label;
  const hp=special4SigmaActive?Math.max(0,100-special4SigmaHits*(100/15)):(special4MegaActive?Math.max(0,100-special4MegaHits*10):Math.max(0,100-special4BossHits*(100/3)));
  if(fill)fill.style.width=hp+'%';
  if(txt)txt.textContent=(special4BossDefeated?'0%':Math.ceil(hp)+'%');
  if(ui)ui.style.display=(currentLevel===104&&special4BossActive&&!won&&!special4BossDefeated)?'block':'none';
}
function special4BossCanHitPlayer(boss){
  if(special4PinkPowerTimer>0||special4TransformInvuln>0)return;
  if(!boss.active||boss.hitCooldown>0)return;
  const dx=Math.abs((player.x+player.w/2)-(boss.x+boss.w/2)),dy=Math.abs((player.y+player.h/2)-(boss.y+boss.h/2));
  if(dx < (player.w+boss.w)*.48 && dy < (player.h+boss.h)*.45){
    player.health=Math.max(0,player.health-20);
    player.evilCooldown=45;
    boss.hitCooldown=55;
    special4HitFlash=10;
    playEmbeddedSound('special4MonsterRoar');
  }
}
function special4MoveBoss(boss,speed,flee){
  const px=player.x+player.w/2,py=player.y+player.h/2,bx=boss.x+boss.w/2,by=boss.y+boss.h/2;
  let dx=px-bx,dy=py-by;
  if(flee){dx=-dx;dy=-dy;}
  const d=Math.hypot(dx,dy)||1;
  const desiredX=dx/d,desiredY=dy/d;
  boss.x+=desiredX*speed;
  boss.x=Math.max(40,Math.min(special4World.w-boss.w-40,boss.x));
  const targetY=Math.max(special4FloatTop,Math.min(special4World.ground-boss.h, boss.y+desiredY*speed));
  boss.y += (targetY-boss.y)*.32;
  boss.y=Math.max(special4FloatTop,Math.min(special4World.ground-boss.h,boss.y));
}
function special4ShootAtPlayer(boss,speed,interval,source){
  if(!boss||!boss.active)return false;
  const intervalFrames=Math.max(1,Math.round(interval));
  if(!Number.isFinite(boss.shotCooldown))boss.shotCooldown=1;
  boss.shotCooldown--;
  if(boss.shotCooldown>0)return false;
  const sx=boss.x+boss.w/2, sy=boss.y+boss.h*0.48;
  const tx=player.x+player.w/2, ty=player.y+player.h/2;
  let dx=tx-sx, dy=ty-sy, d=Math.hypot(dx,dy)||1;
  const dirX=dx/d, dirY=dy/d;
  const spawnPad=Math.max(boss.w,boss.h)*0.60+16;
  special4GreenBalls.push({
    x:sx+dirX*spawnPad, y:sy+dirY*spawnPad,
    vx:dirX*speed, vy:dirY*speed, life:1800, sine:false, age:0,
    source:source||'stood-normal'
  });
  boss.shotCooldown=intervalFrames;
  return true;
}

function special4ShootMegaWaveAtPlayer(boss){
  if(!boss||!boss.active)return;
  const sx=boss.x+boss.w/2,sy=boss.y+boss.h/2,tx=player.x+player.w/2,ty=player.y+player.h/2;
  const dx=tx-sx,dy=ty-sy,d=Math.hypot(dx,dy)||1;
  const a=Math.atan2(dy,dx),speed=4.05;
  // Mega Stood's special shot uses an amplitude 5x the updated Sigma spin amplitude.
  special4GreenBalls.push({x:sx,y:sy,vx:Math.cos(a)*speed,vy:Math.sin(a)*speed,life:1800,sine:true,baseAngle:a,t:0,phaseOffset:0,sineAmplitude:4.6*5,source:'mega-wave'});
  playEmbeddedSound('special4EpicDragonRoar');
  boss.megaWaveTimer=2400;
}
function special4StartPhase(phase){
  if(phase==='mega'){
    special4Stood.active=false;special4Mega.active=true;special4Sigma.active=false;special4MegaActive=true;special4SigmaActive=false;special4MegaHits=0;special4MegaHitThisPower=false;
    special4Mega.x=Math.max(1100,Math.min(special4World.w-special4Mega.w-100,special4Stood.x));special4Mega.y=special4Stood.y;special4Mega.ballTimer=1;special4Mega.nextBallAt=special4Elapsed;special4Mega.shotCooldown=1;special4Mega.megaWaveTimer=2400;special4PinkPowerTimer=0;special4PinkSpawnTimer=30;
  }else if(phase==='sigma'){
    special4Mega.active=false;special4Sigma.active=true;special4MegaActive=false;special4SigmaActive=true;special4SigmaHits=0;special4SigmaHitThisPower=false;
    special4Sigma.x=Math.max(1100,Math.min(special4World.w-special4Sigma.w-100,special4Mega.x));special4Sigma.y=special4Mega.y;special4Sigma.ballTimer=1;special4Sigma.nextBallAt=special4Elapsed;special4Sigma.shotCooldown=1;special4Sigma.spinTimer=3600;special4Sigma.spinBurstTimer=0;special4Sigma.spinAngle=0;special4Sigma.spinFired=false;special4Sigma.chargeTimer=2700;special4Sigma.chargeTime=0;special4Sigma.chargeVX=0;special4Sigma.chargeVY=0;special4Sigma.chargePendingSpin=false;special4Sigma.chargeBurstTimer=0;special4PinkPowerTimer=0;special4PinkSpawnTimer=30;
  }
}
function special4HitBoss(){
  // Keep the pink mushroom power active after the boss is hit. The power is a
  // temporary player state, and contact damage must remain disabled for its
  // full duration. The per-power hit flags below still limit each mushroom to
  // one boss hit.
  if(special4SigmaActive){
    if(special4SigmaHitThisPower)return;special4SigmaHitThisPower=true;special4SigmaHits++;playEmbeddedSound('special4SeaMonsterScream');
    if(special4SigmaHits%2===0)special4SpawnBonus();
    special4PinkSpawnTimer=180;
    if(special4SigmaHits>=15){
      special4BossDefeated=true;special4BossActive=false;special4SigmaActive=false;special4Sigma.active=false;
      special4GreenBalls.length=0;special4Pink.active=false;special4Bonus.active=false;
      special4ExplosionX=special4Sigma.x+special4Sigma.w/2;special4ExplosionY=special4Sigma.y+special4Sigma.h/2;
      special4ExplosionTimer=120;special4Shake=180;special4FlagVisible=true;special4FlagX=Math.min(special4World.w-170,Math.max(2600,special4ExplosionX+420));
      playEmbeddedSound('special4DistantBang');
      return;
    }
  }else if(special4MegaActive){
    if(special4MegaHitThisPower)return;special4MegaHitThisPower=true;special4MegaHits++;playEmbeddedSound('special4WerewolfGrowl');
    if(special4MegaHits%2===0)special4SpawnBonus();
    special4PinkSpawnTimer=180;
    if(special4MegaHits>=10){special4StartPhase('sigma');special4TransformInvuln=300;return;}
  }else{
    if(special4BossHitThisPower)return;special4BossHitThisPower=true;special4BossHits++;
    if(special4BossHits%2===0)special4SpawnBonus();
    special4PinkSpawnTimer=180;
    if(special4BossHits>=3){special4StartPhase('mega');special4TransformInvuln=300;return;}
  }
}


function special4BossRectHitsSolid(boss,nx,ny){
  // Ground and the same raised ledges the player uses as solid platforms.
  if(ny+boss.h>=special4World.ground) return true;
  const ledges=[{x:430,y:475,w:250},{x:2880,y:445,w:250},{x:3260,y:505,w:190}];
  for(const p of ledges){
    if(nx+boss.w>p.x&&nx<p.x+p.w&&ny+boss.h>p.y&&ny<p.y+24) return true;
  }
  return false;
}
function special4StartSigmaCharge(){
  const b=special4Sigma;
  if(!b.active||b.chargeTime>0||b.spinBurstTimer>0)return;
  const sx=b.x+b.w/2,sy=b.y+b.h/2;
  b.chargeTargetX=player.x+player.w/2;
  b.chargeTargetY=player.y+player.h/2;
  let dx=b.chargeTargetX-sx,dy=b.chargeTargetY-sy,d=Math.hypot(dx,dy)||1;
  const chargeSpeed=5.0;
  b.chargeVX=dx/d*chargeSpeed;b.chargeVY=dy/d*chargeSpeed;
  b.chargeTime=600;
  b.chargeBurstTimer=32;
  b.chargePendingSpin = b.spinTimer<=0;
  if(b.chargePendingSpin)b.spinTimer=3600;
  special4Shake=Math.max(special4Shake,28);
  playEmbeddedSound('special4ChargeRoar');
}
function special4UpdateSigmaCharge(){
  const b=special4Sigma;
  if(b.chargeTime<=0)return false;
  if(b.chargeBurstTimer>0)b.chargeBurstTimer--;
  const tryX=b.x+b.chargeVX,tryY=b.y+b.chargeVY;
  if(!special4BossRectHitsSolid(b,tryX,tryY)){
    b.x=tryX;b.y=tryY;
  }else{
    const tryXOnly=b.x+b.chargeVX;
    const tryYOnly=b.y+b.chargeVY;
    const xOK=!special4BossRectHitsSolid(b,tryXOnly,b.y);
    const yOK=!special4BossRectHitsSolid(b,b.x,tryYOnly);
    if(xOK && !yOK)b.x=tryXOnly;
    else if(yOK && !xOK)b.y=tryYOnly;
    else if(xOK && yOK){b.x=tryXOnly;b.y=tryYOnly;}
    else{
      // Stay just outside a solid surface and keep the charge aimed at the
      // original player position using the closest unobstructed component.
      b.chargeVX*=0.92;b.chargeVY*=0.92;
    }
    if(b.y+b.h>=special4World.ground)b.y=special4World.ground-b.h;
    const ledges=[{x:430,y:475,w:250},{x:2880,y:445,w:250},{x:3260,y:505,w:190}];
    for(const p of ledges){
      if(b.x+b.w>p.x&&b.x<p.x+p.w&&b.y+b.h>p.y&&b.y<p.y+24&&b.y<p.y)b.y=p.y-b.h;
    }
  }
  b.chargeTime--;
  if(b.chargeTime<=0){
    b.chargeVX=0;b.chargeVY=0;
    b.chargeBurstTimer=0;
    if(b.chargePendingSpin || b.spinTimer<=0){
      b.chargePendingSpin=false;
      b.spinBurstTimer=180;b.spinFired=false;b.spinAngle=0;b.spinTimer=3600;
    }
  }
  return true;
}
function updateSpecial4(){
  if(!started)return;
  // STOOD BRAWL has no slow-motion mechanic. Keep its gameplay clock at a hard 1x rate.
  // This is intentionally independent of Sigma's flee-speed multiplier below.
  const special4TimeScale=1;
  special4Elapsed+=special4TimeScale;
  if(special4HitFlash>0)special4HitFlash--;
  if(special4ExplosionTimer>0)special4ExplosionTimer--;
  if(special4Shake>0)special4Shake--;
  if(special4PinkPowerTimer>0)special4PinkPowerTimer--;
  if(special4TransformInvuln>0)special4TransformInvuln--;
  if(special4BonusSpeedTimer>0)special4BonusSpeedTimer--;
  for(const boss of [special4Stood,special4Mega,special4Sigma])if(boss.hitCooldown>0)boss.hitCooldown--;

  const left=keys.KeyA||keys.ArrowLeft,right=keys.KeyD||keys.ArrowRight,jump=keys.Space||keys.ArrowUp;
  const speedMult=special4BonusSpeedTimer>0?1.5:1;
  if(left)player.vx-=.10*speedMult;if(right)player.vx+=.10*speedMult;if(!left&&!right)player.vx*=.94;
  player.vx=Math.max(-1.65*speedMult,Math.min(1.65*speedMult,player.vx));
  if(jump)player.jumpBuffer=7;else player.jumpBuffer=Math.max(0,player.jumpBuffer-1);
  if(player.onGround)player.coyote=7;else player.coyote=Math.max(0,player.coyote-1);
  if(player.jumpBuffer>0&&player.coyote>0){player.vy=-12.5;player.onGround=false;player.coyote=0;player.jumpBuffer=0;}
  player.vy+=.20;player.vy=Math.min(player.vy,5);
  const oldY=player.y;player.x+=player.vx;player.y+=player.vy;player.onGround=false;
  if(oldY+player.h<=special4World.ground&&player.y+player.h>=special4World.ground&&player.vy>=0){player.y=special4World.ground-player.h;player.vy=0;player.onGround=true;}
  const ledges=[{x:430,y:475,w:250},{x:2880,y:445,w:250},{x:3260,y:505,w:190}];
  for(const p of ledges){if(player.x+player.w>p.x&&player.x<p.x+p.w&&oldY+player.h<=p.y&&player.y+player.h>=p.y&&player.vy>=0){player.y=p.y-player.h;player.vy=0;player.onGround=true;}}
  player.x=Math.max(0,Math.min(special4World.w-player.w,player.x));
  if(player.y>760){player.health=0;updateHealthUI();return;}

  if(!special4BossActive&&!special4BossDefeated&&player.x+player.w>special4BossRoom.x){
    special4BossActive=true;special4BossDefeated=false;special4MegaActive=false;special4SigmaActive=false;
    special4BossHits=0;special4BossHitThisPower=false;special4MegaHits=0;special4MegaHitThisPower=false;special4SigmaHits=0;special4SigmaHitThisPower=false;
    special4Stood.active=true;special4Mega.active=false;special4Sigma.active=false;special4Stood.x=1860;special4Stood.y=340;special4Stood.ballTimer=1;special4Stood.nextBallAt=special4Elapsed;special4Stood.shotCooldown=1;special4Mega.megaWaveTimer=2400;
    special4PinkPowerTimer=0;special4PinkSpawnTimer=0;special4Bonus.active=false;special4GreenBalls.length=0;special4SpawnPink();
  }

  if(special4BossActive){
    const boss=special4SigmaActive?special4Sigma:(special4MegaActive?special4Mega:special4Stood);
    const isSigma=special4SigmaActive,isMega=special4MegaActive;
    const bossSpeed=isSigma?1.35:(isMega?1.35:(1.35*(2/3)));
    const bossBallSpeed=isSigma?4.05:(isMega?4.05:2.025);
    const bossBallTimer=isSigma?600:(isMega?600:1200);
    boss.phase+=.035;
    const flee=special4PinkPowerTimer>0;
    if(isSigma){
      if(boss.chargeTime<=0){
        if(boss.chargeTimer>0)boss.chargeTimer--;
        if(boss.spinBurstTimer<=0 && boss.chargeTimer<=0){
          special4StartSigmaCharge();
          boss.chargeTimer=2700;
        }
        if(boss.spinBurstTimer<=0 && boss.spinTimer>0)boss.spinTimer--;
        if(boss.spinBurstTimer>0){
          // Spin is handled below; no normal chase while spinning.
        }else if(boss.chargeTime<=0){
          special4MoveBoss(boss,bossSpeed*(flee?0.5:1),flee);
        }
      }else{
        // The 60-second spin clock keeps running during a charge. If it expires
        // during the 10-second charge, queue the spin so it fires immediately
        // after the charge finishes.
        if(boss.spinTimer>0)boss.spinTimer--;
        if(boss.spinTimer<=0)boss.chargePendingSpin=true;
        special4UpdateSigmaCharge();
      }
    }else{
      special4MoveBoss(boss,bossSpeed*(flee?0.5:1),flee);
    }
    if(isMega){
      if(boss.megaWaveTimer>0)boss.megaWaveTimer--;
      // Mega Stood has no chargeTime state; its special wave is governed only by its 40-second timer.
      if(boss.megaWaveTimer<=0){
        special4ShootMegaWaveAtPlayer(boss);
      }
    }
    // Normal green-ball attacks. These stay active independently of pink
    // power. STOOD = 1/2 Evil Goon speed/frequency; MEGA/SIGMA = Evil Goon.
    // Sigma's normal shots pause only during the active spin/charge move.
    if(!isSigma || (boss.chargeTime<=0 && boss.spinBurstTimer<=0)){
      special4ShootAtPlayer(boss,bossBallSpeed,bossBallTimer,isSigma?'sigma':(isMega?'mega':'stood'));
    }

    // Pickups are resolved before contact damage so grabbing a pink mushroom
    // on the same frame as touching a boss immediately grants immunity.
    if(special4Pink.active&&Math.hypot(player.x+15-special4Pink.x,player.y+22-special4Pink.y)<44){
      special4Pink.active=false;
      special4PinkPowerTimer=1200;
      special4BossHitThisPower=false;special4MegaHitThisPower=false;special4SigmaHitThisPower=false;
      playGoonshroomSplat();
    }

    // Pink power protects against physical boss contact for its full duration.
    special4BossCanHitPlayer(boss);

    if(isSigma){
      if(boss.spinBurstTimer>0){
        boss.spinBurstTimer--;boss.spinAngle+=.20;
        // Small shake during the spin; charge takes priority if both were due.
        special4Shake=Math.max(special4Shake,18);
        if(!boss.spinFired){
          boss.spinFired=true;playEmbeddedSound('special4EpicDragonRoar');
          for(let i=0;i<12;i++){const a=i*Math.PI/6;special4GreenBalls.push({x:boss.x+boss.w/2,y:boss.y+boss.h/2,vx:Math.cos(a)*4.05,vy:Math.sin(a)*4.05,life:1000,sine:true,baseAngle:a,t:0,phaseOffset:i*.35,sineAmplitude:4.6,source:'sigma-spin'});}
        }
        if(boss.spinBurstTimer===0) boss.spinAngle=0;
      }else if(boss.spinTimer<=0 && boss.chargeTime<=0){
        // If charge and spin ever become due together, the charge has already
        // been queued and completed first; only then start the spin.
        boss.spinBurstTimer=180;boss.spinFired=false;boss.spinTimer=3600;boss.spinAngle=0;
      }
    }

    if(special4PinkPowerTimer>0){
      const hitRadius=isSigma?86:(isMega?78:70);
      if(Math.hypot(player.x+15-(boss.x+boss.w/2),player.y+22-(boss.y+boss.h/2))<hitRadius)special4HitBoss();
    }

    if(special4BossActive&&special4PinkSpawnTimer>0)special4PinkSpawnTimer--;
  }

  if(!special4Pink.active&&!special4BossDefeated){
    if(special4BossActive&&!special4PinkPowerTimer&&special4PinkSpawnTimer<=0)special4SpawnPink();
  }

  if(special4BossActive&&special4Bonus.active&&Math.hypot(player.x+15-special4Bonus.x,player.y+22-special4Bonus.y)<44){
    if(special4Bonus.type==='green')special4BonusSpeedTimer=600;else player.health=Math.min(100,player.health+30);
    special4Bonus.active=false;playGoonshroomSplat();updateHealthUI();
  }

  for(let i=special4GreenBalls.length-1;i>=0;i--){
    const b=special4GreenBalls[i];
    b.age=(b.age||0)+1;
    if(b.sine){
      b.t=(b.t||0)+1;
      const a=b.baseAngle,perpX=-Math.sin(a),perpY=Math.cos(a),sineOffset=Math.sin(b.t*.18+(b.phaseOffset||0))*(b.sineAmplitude||1.15);
      b.x+=Math.cos(a)*4.05+perpX*sineOffset;b.y+=Math.sin(a)*4.05+perpY*sineOffset;
    }else{b.x+=b.vx;b.y+=b.vy;}
    b.life--;
    const hit=b.age>3&&player.x<b.x+14&&player.x+player.w>b.x-14&&player.y<b.y+14&&player.y+player.h>b.y-14;
    if(hit){
      // Pink mushroom power blocks physical boss contact, but green balls
      // ALWAYS damage the player, even while powered up.
      player.health=Math.max(0,player.health-10);special4HitFlash=8;player.evilCooldown=45;playEmbeddedSound('special4MonsterRoar');special4GreenBalls.splice(i,1);continue;
    }
    if(b.life<=0||b.x<-500||b.x>special4World.w+500||b.y<-500||b.y>1000)special4GreenBalls.splice(i,1);
  }

  if(special4FlagVisible&&!won&&player.x+player.w>special4FlagX&&player.x<special4FlagX+110){
    won=true;started=false;special4BossActive=false;special4FlagVisible=true;
    try{stopSpecial4Music();}catch(e){}
    document.getElementById('special4BossUI').style.display='none';
    document.getElementById('endScreen').style.display='flex';
  }

  updateSpecial4BossUI();updateHealthUI();
  camX=Math.max(0,Math.min(special4World.w-W,player.x-W/2));
}
function drawSpecial4(){
  ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,W,H);
  const shake=special4Shake>0?Math.max(0,special4Shake/180)*34:0;
  if(shake)ctx.translate((Math.random()-.5)*shake,(Math.random()-.5)*shake);
  drawSpecial4CastleBackground();
  const ledges=[{x:430,y:475,w:250},{x:2880,y:445,w:250},{x:3260,y:505,w:190}];
  for(const p of ledges){const x=p.x-camX;ctx.fillStyle='#6f7987';ctx.fillRect(x,p.y,p.w,24);ctx.fillStyle='#aab3bf';ctx.fillRect(x,p.y,p.w,6);}
  drawSpecial4Door();
  for(const a of special4ArmorStands)drawSpecial4ArmorStand(a);
  drawSpecial4Pink();drawSpecial4Bonus();drawSpecial4Balls();drawSpecial4Stood();drawSpecial4Explosion();drawSpecial4Flag();
  if(special4HitFlash){ctx.fillStyle='rgba(255,255,255,.07)';ctx.fillRect(0,0,W,H);}
  if(special4PinkPowerTimer>0){
    ctx.save();const x=player.x-camX+15,y=player.y+22,p=24+6*Math.sin(Date.now()/90);ctx.globalAlpha=.27;ctx.fillStyle='#ff58e8';ctx.shadowColor='#ff58e8';ctx.shadowBlur=30;ctx.beginPath();ctx.arc(x,y,p,0,Math.PI*2);ctx.fill();ctx.globalAlpha=.85;ctx.strokeStyle='#ffd6f8';ctx.lineWidth=3;ctx.beginPath();ctx.arc(x,y,p+8,0,Math.PI*2);ctx.stroke();ctx.restore();
    ctx.save();ctx.font='900 16px Arial';ctx.textAlign='left';ctx.textBaseline='top';ctx.fillStyle='rgba(0,0,0,.55)';ctx.fillRect(18,118,250,34);ctx.fillStyle='#ff72e4';ctx.shadowColor='rgba(255,70,220,.6)';ctx.shadowBlur=6;ctx.fillText(`MUSHROOM POWER ${Math.ceil(special4PinkPowerTimer/60)}s`,28,126);ctx.restore();
  }
  drawPlayer();
  ctx.save();ctx.font='900 16px Arial';ctx.textAlign='center';ctx.textBaseline='top';ctx.fillStyle='rgba(0,0,0,.48)';ctx.fillRect(W/2-180,632,360,30);ctx.fillStyle='#fff';ctx.fillText(special4FlagVisible?'CASTLE WALKWAY — SIGMA STOOD DEFEATED':'CASTLE WALKWAY — ENTER THE KEEP',W/2,639);ctx.restore();
  ctx.setTransform(1,0,0,1,0,0);
}
function startSpecial4(){resetSpecial4();}

/* =========================
   SPECIAL 3 — PIRATE CHAOS
   ========================= */
const special3World={w:4300,ground:610};
const special3BrickStart={x:520,y:610,w:250,h:90};
const special3WoodParkour=[
  {x:850,y:525,w:170,h:28},
  {x:1080,y:450,w:220,h:28},
  {x:1350,y:540,w:145,h:28},
  {x:1545,y:430,w:210,h:28},
  {x:1810,y:500,w:160,h:28},
  {x:2025,y:390,w:235,h:28},
  {x:2315,y:490,w:135,h:28},
  {x:2505,y:355,w:210,h:28},
  {x:2770,y:455,w:155,h:28},
  {x:2980,y:330,w:225,h:28},
  {x:3260,y:465,w:145,h:28},
  {x:3450,y:385,w:190,h:28},
  {x:3695,y:500,w:155,h:28},
  {x:3905,y:410,w:230,h:28},
  {x:4170,y:485,w:130,h:28}
];
const special3Ship={x:0,y:0,w:420,h:620};
const special3Cannons=[
  {x:120,y:485,barrel:72},
  {x:270,y:485,barrel:72}
];
function special3CannonWorld(c){return {x:special3Ship.x+c.x,y:special3Ship.y+c.y,barrel:c.barrel};}
const special3Fireballs=[];
const special3Powers={active:false,type:'',x:0,y:0,platform:0};
let special3Elapsed=0,special3FireTimer=1200,special3PowerTimer=900,special3PlayerSpeedTimer=0;
let special3GoonShotCounter=0;
let special3HitFlash=0;
let special3Pirate=null;
let special3PirateSpawnCount=0;
let special3PinkPowerTimer=0;
let special3PinkSpawned=false;
let special3PinkNextX=0,special3PinkNextY=0;
function resetSpecial3(){
  player={x:585,y:special3World.ground-44,w:30,h:44,vx:0,vy:0,onGround:true,coyote:7,jumpBuffer:0,health:100,pooCooldown:0,evilCooldown:0};
  camX=0;started=false;won=false;rainbowTimer=0;shroomTextTimer=0;pooTimer=0;
  special3Elapsed=0;special3FireTimer=1200;special3PowerTimer=900;special3PlayerSpeedTimer=0;special3PinkPowerTimer=0;special3GoonShotCounter=0;special3HitFlash=0;
  special3Pirate=null;special3PirateSpawnCount=0;special3PinkPowerTimer=0;special3PinkSpawned=false;special3PinkNextX=0;special3PinkNextY=0;
  special3Fireballs.length=0;special3Powers.active=false;special3Powers.type='';
  document.getElementById('shroomText').classList.remove('show');document.getElementById('pooOverlay').classList.remove('show');
  document.getElementById('endScreen').style.display='none';document.getElementById('bossUI').style.display='none';
  stopBossMusic();stopLevel1BossMusic();stopLevel2BossMusic();stopLevel3BossMusic();stopLevel4BossMusic();stopSpecial1Music();stopSpecial2Music();stopSpecial3Music();stopNormalMusic();
  updateHealthUI();
}
function special3SpawnPower(){
  const plat=special3WoodParkour[Math.floor(Math.random()*special3WoodParkour.length)];
  special3Powers.type=Math.random()<0.5?'purple':'green';
  special3Powers.x=plat.x+25+Math.random()*(plat.w-50);special3Powers.y=plat.y-24;special3Powers.platform=plat;special3Powers.active=true;
}
function drawSpecial3Power(){
  if(!special3Powers.active)return;
  const x=special3Powers.x-camX,y=special3Powers.y;
  ctx.save();ctx.translate(x,y);
  ctx.shadowBlur=18;
  if(special3Powers.type==='purple'){ctx.fillStyle='#d45cff';ctx.shadowColor='#d45cff';}
  else{ctx.fillStyle='#53dc68';ctx.shadowColor='#53dc68';}
  ctx.beginPath();ctx.arc(0,-10,18,Math.PI,0);ctx.fill();ctx.shadowBlur=0;
  ctx.fillStyle='#f4e6d6';ctx.fillRect(-5,-10,10,22);ctx.restore();
}
function drawSpecial3Cannon(x,y){
  ctx.save();
  ctx.fillStyle='#1d2229';ctx.strokeStyle='#0a0d12';ctx.lineWidth=4;
  ctx.beginPath();ctx.arc(x,y,24,0,Math.PI*2);ctx.fill();ctx.stroke();
  ctx.fillStyle='#363c45';ctx.fillRect(x-10,y-28,20,30);
  ctx.translate(x,y-15);ctx.rotate(-.08);ctx.fillStyle='#11151b';ctx.fillRect(0,-8,72,16);ctx.strokeRect(0,-8,72,16);
  ctx.restore();
}
function drawSpecial3Ship(){
  // Keep the pirate ship and its cannons in the same world-space object so they stay physically aligned.
  const sx=special3Ship.x-camX, sy=special3Ship.y;
  ctx.save();ctx.translate(sx,sy);
  // Water/skyline behind the ship
  ctx.fillStyle='#79b7d9';ctx.fillRect(0,0,W,H);
  ctx.fillStyle='rgba(255,255,255,.72)';
  for(let i=0;i<10;i++){const x=i*180+40;ctx.beginPath();ctx.ellipse(x,85+(i%3)*38,70,18,0,0,Math.PI*2);ctx.fill();}
  // sea behind the ship
  ctx.fillStyle='#4c88a8';ctx.fillRect(0,550,420,150);
  // large, connected pirate ship hull
  ctx.fillStyle='#4a2418';ctx.beginPath();ctx.moveTo(20,520);ctx.lineTo(380,520);ctx.lineTo(325,600);ctx.lineTo(75,600);ctx.closePath();ctx.fill();
  ctx.strokeStyle='#21110c';ctx.lineWidth=6;ctx.stroke();
  // upper deck and rail
  ctx.fillStyle='#70402a';ctx.fillRect(55,475,300,45);
  ctx.strokeStyle='#3a1d12';ctx.lineWidth=4;ctx.strokeRect(55,475,300,45);
  ctx.fillStyle='#5b321f';ctx.fillRect(95,430,16,90);ctx.fillRect(300,425,16,95);
  ctx.fillStyle='#2b1711';ctx.fillRect(95,445,220,20);
  // cabin
  ctx.fillStyle='#3a2116';ctx.fillRect(160,385,70,90);
  ctx.fillStyle='#7d4a2e';ctx.fillRect(155,380,80,12);
  // mast + pirate flag
  ctx.fillStyle='#2a1710';ctx.fillRect(196,250,10,135);
  ctx.fillStyle='#171717';ctx.beginPath();ctx.moveTo(202,255);ctx.lineTo(275,275);ctx.lineTo(202,295);ctx.closePath();ctx.fill();
  // Cannons are mounted directly onto the ship deck.
  for(const c of special3Cannons)drawSpecial3Cannon(c.x,c.y);
  ctx.restore();
}
function drawSpecial3Parkour(){
  for(const p of special3WoodParkour){
    const x=p.x-camX;ctx.fillStyle='#70462b';ctx.fillRect(x,p.y,p.w,p.h);
    ctx.fillStyle='#a56b3d';ctx.fillRect(x+6,p.y+5,p.w-12,7);
    ctx.strokeStyle='#3a2215';ctx.lineWidth=3;ctx.strokeRect(x,p.y,p.w,p.h);
  }
  // Brick starting floor on the right side.
  const bx=special3BrickStart.x-camX;ctx.fillStyle='#7b3c33';ctx.fillRect(bx,special3BrickStart.y,special3BrickStart.w,special3BrickStart.h);ctx.strokeStyle='#3d1715';ctx.lineWidth=3;ctx.strokeRect(bx,special3BrickStart.y,special3BrickStart.w,special3BrickStart.h);
  ctx.strokeStyle='rgba(30,10,10,.45)';ctx.lineWidth=2;
  for(let y=special3BrickStart.y+18;y<special3World.ground;y+=18){ctx.beginPath();ctx.moveTo(bx,y);ctx.lineTo(bx+special3BrickStart.w,y);ctx.stroke();}
  for(let r=0;r<4;r++){const yy=special3BrickStart.y+r*18,off=r%2?20:0;for(let x=bx+off;x<bx+special3BrickStart.w;x+=55){ctx.beginPath();ctx.moveTo(x,yy);ctx.lineTo(x,yy+18);ctx.stroke();}}
}
function drawSpecial3Fireballs(){
  for(const b of special3Fireballs){const x=b.x-camX,y=b.y;ctx.save();ctx.shadowColor='rgba(255,60,25,.95)';ctx.shadowBlur=20;ctx.fillStyle='#ff3b18';ctx.beginPath();ctx.arc(x,y,14,0,Math.PI*2);ctx.fill();ctx.shadowBlur=7;ctx.fillStyle='#ffd25c';ctx.beginPath();ctx.arc(x-4,y-4,5,0,Math.PI*2);ctx.fill();ctx.restore();}
}
function startSpecial3Music(){try{const a=document.getElementById('special3Music');if(a){a.loop=true;a.volume=.72;a.currentTime=0;a.play().catch(()=>{});}}catch(e){}}
function stopSpecial3Music(){try{const a=document.getElementById('special3Music');if(a){a.pause();a.currentTime=0;}}catch(e){}}
function playSpecial3CannonSound(){try{const id=Math.random()<0.5?'special3CannonShot':'special3CannonFire';const a=document.getElementById(id);if(a){a.currentTime=0;a.volume=.8;a.play().catch(()=>{});}}catch(e){}}


function playSpecial3PirateGrowl(){
  try{
    const a=document.getElementById('special3PirateGrowl');
    if(a){a.currentTime=0;a.volume=.9;a.play().catch(()=>{});}
  }catch(e){}
}
function special3SpawnPirate(){
  if(special3Pirate && !special3Pirate.dead)return;
  const p=special3WoodParkour[Math.floor(Math.random()*special3WoodParkour.length)];
  const targetY=p.y-48;
  const x=p.x+p.w*0.5;
  special3Pirate={x,y:-110,targetY,w:54,h:78,descend:true,offRope:false,ropeTimer:600,landed:false,dead:false,hitCooldown:0,vx:0,vy:0,platform:p,spawnPlatform:p,jumpCooldown:0};
  special3PirateSpawnCount++;
}
function drawSpecial3Pirate(){
  const s=special3Pirate;
  if(!s || s.dead)return;
  const x=s.x-camX,y=s.y;
  ctx.save();
  // Rope is visible only while the pirate is still deployed on it.
  if(!s.offRope){ctx.strokeStyle='#4a2a18';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,y-36);ctx.stroke();}
  ctx.fillStyle='rgba(0,0,0,.15)';ctx.beginPath();ctx.ellipse(x,y+34,30,8,0,0,Math.PI*2);ctx.fill();
  // pirate hat
  ctx.fillStyle='#171717';ctx.fillRect(x-27,y-38,54,12);
  ctx.beginPath();ctx.arc(x,y-38,19,Math.PI,0);ctx.fill();
  ctx.fillStyle='#fff';ctx.fillRect(x-10,y-38,7,5);ctx.fillRect(x+3,y-38,7,5);
  // skull
  ctx.fillStyle='#e8dfc8';ctx.beginPath();ctx.arc(x,y-13,17,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#171717';ctx.beginPath();ctx.arc(x-6,y-16,4,0,Math.PI*2);ctx.arc(x+6,y-16,4,0,Math.PI*2);ctx.fill();
  ctx.fillRect(x-3,y-4,6,5);
  // body / coat
  ctx.fillStyle='#242b31';ctx.fillRect(x-18,y+3,36,26);
  ctx.strokeStyle='#d6ccb8';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(x,y+3);ctx.lineTo(x,y+29);ctx.stroke();
  // arms
  ctx.strokeStyle='#e8dfc8';ctx.lineWidth=7;
  ctx.beginPath();ctx.moveTo(x-15,y+8);ctx.lineTo(x-28,y+26);ctx.moveTo(x+15,y+8);ctx.lineTo(x+28,y+24);ctx.stroke();
  // legs
  ctx.beginPath();ctx.moveTo(x-9,y+29);ctx.lineTo(x-13,y+48);ctx.moveTo(x+9,y+29);ctx.lineTo(x+13,y+48);ctx.stroke();
  // sword
  ctx.strokeStyle='#b9c0c7';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(x+28,y+21);ctx.lineTo(x+42,y+2);ctx.stroke();
  ctx.restore();
}
function special3SpawnPinkMushroom(){
  const p=special3WoodParkour[Math.floor(Math.random()*special3WoodParkour.length)];
  special3PinkNextX=p.x+25+Math.random()*Math.max(1,p.w-50);
  special3PinkNextY=p.y-26;
  special3PinkSpawned=true;
}
function drawSpecial3PinkMushroom(){
  if(!special3PinkSpawned)return;
  const x=special3PinkNextX-camX,y=special3PinkNextY;
  ctx.save();ctx.translate(x,y);ctx.shadowColor='#ff5cff';ctx.shadowBlur=18;
  ctx.fillStyle='#ff52d8';ctx.beginPath();ctx.arc(0,-9,18,Math.PI,0);ctx.fill();
  ctx.shadowBlur=0;ctx.fillStyle='#f7e4d6';ctx.fillRect(-5,-9,10,23);
  ctx.fillStyle='white';ctx.beginPath();ctx.arc(-7,-12,3,0,Math.PI*2);ctx.arc(6,-12,3,0,Math.PI*2);ctx.fill();
  ctx.restore();
}

function updateSpecial3(){
  if(!started)return;
  special3Elapsed++;
  if(special3HitFlash>0)special3HitFlash--;
  if(special3PlayerSpeedTimer>0)special3PlayerSpeedTimer--;
  if(special3PinkPowerTimer>0)special3PinkPowerTimer--;
  special3PowerTimer--;if(special3PowerTimer<=0){special3SpawnPower();special3PowerTimer=900;}
  // Pink mushroom: one spawns every 20 seconds somewhere on the wooden parkour.
  if(special3Elapsed>=1200 && special3Elapsed%1200===0 && !special3PinkSpawned){special3SpawnPinkMushroom();}
  // Skeleton pirate: descends by rope every 30 seconds.
  if(special3Elapsed>=1800 && special3Elapsed%1800===0){special3SpawnPirate();}
  const speedMult=special3PlayerSpeedTimer>0?1.5:1;
  const left=keys.KeyA||keys.ArrowLeft,right=keys.KeyD||keys.ArrowRight,jump=keys.Space||keys.ArrowUp;
  if(left)player.vx-=.10*speedMult;if(right)player.vx+=.10*speedMult;if(!left&&!right)player.vx*=.94;player.vx=Math.max(-1.65*speedMult,Math.min(1.65*speedMult,player.vx));
  if(jump)player.jumpBuffer=7;else player.jumpBuffer=Math.max(0,player.jumpBuffer-1);
  if(player.onGround)player.coyote=7;else player.coyote=Math.max(0,player.coyote-1);
  if(player.jumpBuffer>0&&player.coyote>0){player.vy=-12.5;player.onGround=false;player.coyote=0;player.jumpBuffer=0;}
  player.vy+=.20;player.vy=Math.min(player.vy,5);
  const oldY=player.y;player.x+=player.vx;player.y+=player.vy;player.onGround=false;
  // Brick start floor only near start.
  if(player.x+player.w>special3BrickStart.x&&player.x<special3BrickStart.x+special3BrickStart.w&&oldY+player.h<=special3BrickStart.y&&player.y+player.h>=special3BrickStart.y&&player.vy>=0){player.y=special3BrickStart.y-player.h;player.vy=0;player.onGround=true;}
  for(const p of special3WoodParkour){if(player.x+player.w>p.x&&player.x<p.x+p.w&&oldY+player.h<=p.y&&player.y+player.h>=p.y&&player.vy>=0){player.y=p.y-player.h;player.vy=0;player.onGround=true;}}
  player.x=Math.max(520,Math.min(special3World.w-player.w,player.x));
  if(player.y>760){resetSpecial3();started=true;msg.style.display='none';startSpecial3Music();return;}
  // Cannon frequency: half Evil Goon's frequency, then 5% faster every 10s.
  const fireInterval=Math.max(120,1200*Math.pow(.95,Math.floor(special3Elapsed/600)));
  special3FireTimer--;if(special3FireTimer<=0){
    const tx=player.x+15,ty=player.y+22;
    for(const c of special3Cannons){const wc=special3CannonWorld(c);const sx=wc.x+c.barrel,sy=wc.y-15;const dx=tx-sx,dy=ty-sy,d=Math.hypot(dx,dy)||1;special3Fireballs.push({x:sx,y:sy,vx:(dx/d)*2.7,vy:(dy/d)*2.7,life:2400});}
    special3FireTimer=Math.round(fireInterval);special3GoonShotCounter+=2;playSpecial3CannonSound();
  }
  for(let i=special3Fireballs.length-1;i>=0;i--){const b=special3Fireballs[i];b.x+=b.vx;b.y+=b.vy;b.life--;const hit=player.x<b.x+14&&player.x+player.w>b.x-14&&player.y<b.y+14&&player.y+player.h>b.y-14;if(hit){player.health=Math.max(0,player.health-10);special3HitFlash=8;special3Fireballs.splice(i,1);continue;}if(b.life<=0||b.x>special3World.w+500||b.x<-1000||b.y<-500||b.y>1200)special3Fireballs.splice(i,1);}
  if(special3Powers.active&&Math.hypot(player.x+15-special3Powers.x,player.y+22-special3Powers.y)<42){if(special3Powers.type==='purple')player.health=Math.min(100,player.health+30);else special3PlayerSpeedTimer=600;special3Powers.active=false;playGoonshroomSplat();}

  // Collect the pink mushroom: 20-second power with a visible glow.
  if(special3PinkSpawned&&Math.hypot(player.x+15-special3PinkNextX,player.y+22-special3PinkNextY)<44){
    special3PinkSpawned=false;
    special3PinkPowerTimer=1200;
    playGoonshroomSplat();
    showGoonshroomText();
  }

  // Lower the pirate to the chosen parkour platform, then leave him there as a hazard.
  if(special3Pirate && !special3Pirate.dead){
    const s=special3Pirate;
    if(s.ropeTimer>0)s.ropeTimer--;
    if(s.descend){
      const dropSpeed=3.2;
      s.y=Math.min(s.targetY,s.y+dropSpeed);
      if(s.y>=s.targetY){s.y=s.targetY;s.descend=false;s.landed=true;}
    }
    if(!s.offRope && s.ropeTimer===0){
      s.offRope=true;
      s.vx=0;s.vy=0;
    }
    if(s.offRope){
      // Follow the player by jumping across the wooden platforms.
      const targetPlatform=special3WoodParkour.reduce((best,p)=>{
        const bestScore=Math.abs(best.x-(player.x+player.w/2))+Math.abs((best.y+28)-(player.y+player.h));
        const score=Math.abs(p.x-(player.x+player.w/2))+Math.abs((p.y+28)-(player.y+player.h));
        return score<bestScore?p:best;
      },special3WoodParkour[0]);
      const dx=(player.x+player.w/2)-(s.x+s.w/2);
      s.vx += (dx>0?0.045:-0.045);
      s.vx=Math.max(-1.0125,Math.min(1.0125,s.vx));
      s.vy += .20; s.vy=Math.min(s.vy,6);
      s.x += s.vx; s.y += s.vy;
      let onPlat=false;
      for(const p of special3WoodParkour){
        if(s.x+s.w>p.x&&s.x<p.x+p.w&&s.y+s.h>=p.y&&s.y+s.h<=p.y+24&&s.vy>=0){
          s.y=p.y-s.h;s.vy=0;onPlat=true;s.platform=p;break;
        }
      }
      if(onPlat && s.jumpCooldown>0)s.jumpCooldown--;
      if(onPlat && s.jumpCooldown===0){
        const centerX=s.x+s.w/2;
        const targetCenter=targetPlatform.x+targetPlatform.w/2;
        const movingRight=targetCenter>=centerX;
        const currentPlatform=s.platform;
        const edgeBuffer=Math.max(18,currentPlatform.w*0.10);
        const distToEdge=movingRight
          ? (currentPlatform.x+currentPlatform.w)-(s.x+s.w)
          : s.x-currentPlatform.x;
        const distToTarget=Math.abs(targetCenter-centerX);
        // Pirates deliberately jump when they are 10% of the platform width from an edge,
        // preventing them from walking off while still letting them chase the player.
        const nearEdge=distToEdge<=edgeBuffer;
        if(nearEdge || distToTarget>80 || Math.abs(targetPlatform.y-s.y)>35){
          s.vy=-14.25;s.jumpCooldown=50;
        }
      }
      s.x=Math.max(520,Math.min(special3World.w-s.w,s.x));
      if(s.y>820){const respawnPlatform=s.spawnPlatform||special3WoodParkour[0];s.platform=respawnPlatform;s.x=respawnPlatform.x+respawnPlatform.w/2-s.w/2;s.y=respawnPlatform.y-s.h;s.vx=0;s.vy=0;s.jumpCooldown=30;}
    }
    if(s.hitCooldown>0)s.hitCooldown--;

    const sh=player.x+15, sy=player.y+22;
    const pirateHit=Math.hypot(sh-s.x,sy-(s.y+18))<42;
    if(pirateHit && s.hitCooldown===0){
      if(special3PinkPowerTimer>0){
        s.dead=true;
        s.hitCooldown=0;
      }else{
        player.health=Math.max(0,player.health-20);
        special3HitFlash=8;
        s.hitCooldown=45;
        playSpecial3PirateGrowl();
      }
    }
  }

  camX=Math.max(0,Math.min(special3World.w-W,player.x-W/2));
  updateHealthUI();
}
function drawSpecial3(){
  // Clear every frame so moving objects do not leave trails.
  ctx.setTransform(1,0,0,1,0,0);
  ctx.clearRect(0,0,W,H);
  drawSpecial3Ship();
  drawSpecial3Parkour();
  drawSpecial3Fireballs();
  drawSpecial3Power();
  drawSpecial3PinkMushroom();
  drawSpecial3Pirate();
  if(special3HitFlash){ctx.fillStyle='rgba(255,40,20,.15)';ctx.fillRect(0,0,W,H);}
  if(special3PinkPowerTimer>0){
    ctx.save();
    const gx=player.x-camX+15,gy=player.y+22,pulse=24+6*Math.sin(Date.now()/90);
    ctx.globalAlpha=.28;ctx.fillStyle='#ff58e8';ctx.shadowColor='#ff58e8';ctx.shadowBlur=30;ctx.beginPath();ctx.arc(gx,gy,pulse,0,Math.PI*2);ctx.fill();
    ctx.globalAlpha=.85;ctx.strokeStyle='#ffd6f8';ctx.lineWidth=3;ctx.beginPath();ctx.arc(gx,gy,pulse+8,0,Math.PI*2);ctx.stroke();ctx.restore();
  }
  drawPlayer();
  // Survival timer: fixed to the screen. Cannon fire rate increases by 5% every 10 seconds.
  const totalSeconds=Math.floor(special3Elapsed/60);
  const mins=Math.floor(totalSeconds/60);
  const secs=totalSeconds%60;
  ctx.save();
  ctx.font='1000 26px Arial';
  ctx.textAlign='center';
  ctx.textBaseline='top';
  ctx.fillStyle='rgba(0,0,0,.55)';
  ctx.fillRect(W/2-125,18,250,46);
  ctx.fillStyle='#fff';
  ctx.shadowColor='rgba(0,0,0,.75)';
  ctx.shadowBlur=5;
  ctx.fillText(`SURVIVED ${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`,W/2,27);
  ctx.restore();

  if(special3PinkPowerTimer>0){
    ctx.save();
    ctx.font='900 16px Arial';ctx.textAlign='left';ctx.textBaseline='top';
    ctx.fillStyle='rgba(0,0,0,.55)';ctx.fillRect(18,118,250,34);
    ctx.fillStyle='#ff72e4';ctx.shadowColor='rgba(255,70,220,.6)';ctx.shadowBlur=6;
    ctx.fillText(`MUSHROOM POWER ${Math.ceil(special3PinkPowerTimer/60)}s`,28,126);
    ctx.restore();
  }
}
function startSpecial3(){resetSpecial3();}

/* =========================
   SPECIAL 2 — MAGNETISM LABORATORY
   Three-story laboratory with vertical camera-following and ceiling openings.
   ========================= */
const special2World={w:5000,floorY:[640,-60,-760],top:-1460,bottom:760};
let special2CamY=0;
const special2FloorSegments=[
  // Each main floor is a long solid hallway with two aligned vertical shafts.
  // The ground floor is continuous; only the upper floors have openings.
  {x:0,y:640,w:5000,h:60,story:0},
  // Shaft A: x=820..1120. Shaft B: x=2780..3080.
  {x:0,y:-60,w:820,h:60,story:1},{x:1120,y:-60,w:1660,h:60,story:1},{x:3080,y:-60,w:1920,h:60,story:1},
  {x:0,y:-760,w:820,h:60,story:2},{x:1120,y:-760,w:1660,h:60,story:2},{x:3080,y:-760,w:1920,h:60,story:2},
  // Thin platforms are centered inside the two vertical shafts and are the only surfaces SHIFT can drop through.
  {x:820,y:500,w:300,h:24,story:'shaft',thin:true},{x:820,y:350,w:300,h:24,story:'shaft',thin:true},{x:820,y:200,w:300,h:24,story:'shaft',thin:true},{x:820,y:50,w:300,h:24,story:'shaft',thin:true},
  {x:2780,y:500,w:300,h:24,story:'shaft',thin:true},{x:2780,y:350,w:300,h:24,story:'shaft',thin:true},{x:2780,y:200,w:300,h:24,story:'shaft',thin:true},{x:2780,y:50,w:300,h:24,story:'shaft',thin:true},
  {x:820,y:-200,w:300,h:24,story:'shaft2',thin:true},{x:820,y:-350,w:300,h:24,story:'shaft2',thin:true},{x:820,y:-500,w:300,h:24,story:'shaft2',thin:true},{x:820,y:-650,w:300,h:24,story:'shaft2',thin:true},
  {x:2780,y:-200,w:300,h:24,story:'shaft2',thin:true},{x:2780,y:-350,w:300,h:24,story:'shaft2',thin:true},{x:2780,y:-500,w:300,h:24,story:'shaft2',thin:true},{x:2780,y:-650,w:300,h:24,story:'shaft2',thin:true}
];
const special2Platforms=special2FloorSegments;
const special2Mushrooms={
  // Four pink mushrooms are always maintained in the laboratory. Each one
  // returns to a valid floor after it is eaten.
  pink:[
    {x:500,y:610,active:true},{x:1700,y:610,active:true},
    {x:1450,y:-90,active:true},{x:3850,y:-790,active:true}
  ],
  purple:{x:2300,y:-90,active:true},
  grey:[{x:930,y:470,active:true},{x:2870,y:470,active:true},{x:4100,y:-90,active:true}]
};
const special2Magnets=[];
let special2Elapsed=0,special2MagnetTimer=600,special2BossHealth=100,special2BossActive=false,special2BossDefeated=false;
// Enemies use the player's last confirmed standing floor. Jumping/falling must
// never change the floor target or alter enemy movement behaviour.
let special2PlayerGroundStory=0;
let special2PinkPowerTimer=0,special2PinkHitThisPower=false,special2MagnetAttackTimer=3000,special2MagnetAttackActive=0,special2GreyImmunityTimer=0,special2DropThroughTimer=0;
let special2CurrentPlatformThin=false;
let special2ScrapTimer=4200,special2ScrapWave=null,special2BossRiseTimer=0,special2WinX=4800;
let special2LaserTimer=3900,special2Lasers=[];
let special2BossStory=0,special2BossTargetStory=0,special2BossTraveling=false,special2BossShaftX=970;
const special2ProfessorSprite=new Image();special2ProfessorSprite.src='assets/professor_polarity_circle.png';
// Magnetism Laboratory mini-bosses: one is selected with a 50/50 chance at
// each four-minute spawn check. They use the same 1.35 movement speed,
// 4.05 projectile speed and 600-frame firing interval as the Level 5 Evil Goon.
const special2MiniBosses={
  chemistry:{name:'CHEMISTRY CHAD',image:new Image(),x:0,y:0,w:120,h:120,health:15,active:false,story:0,targetStory:0,traveling:false,shaftX:970,shotTimer:600,phase:0},
  engineering:{name:'ENGINEERING EINSTEIN',image:new Image(),x:0,y:0,w:120,h:120,health:15,active:false,story:0,targetStory:0,traveling:false,shaftX:970,shotTimer:600,phase:0}
};
special2MiniBosses.chemistry.image.src='assets/chemistry_chad.png';
special2MiniBosses.engineering.image.src='assets/engineering_einstein.png';
const special2MiniProjectiles=[];
let special2MiniBossSpawnTimer=14400; // 4 minutes at 60 FPS
let special2MiniBossSpawnCount=0;
let special2MiniBossLastHitByPink=false;

let special2SoundCloudFrame=null,special2SoundCloudWidget=null;
const SPECIAL2_SOUNDCLOUD_URL='https://soundcloud.com/kordhell-scmusic/revolution?si=2f3aee2fd0cc47d8a41cceb366e3e6d9&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing';
function startSpecial2Music(){try{stopNormalMusic();stopBossMusic();stopLevel1BossMusic();stopLevel2BossMusic();stopLevel3BossMusic();stopLevel4BossMusic();stopSpecial1Music();if(special2SoundCloudFrame&&special2SoundCloudWidget){try{special2SoundCloudWidget.setVolume(70);special2SoundCloudWidget.play();}catch(e){}return;}if(special2SoundCloudFrame){try{special2SoundCloudFrame.remove();}catch(e){}special2SoundCloudFrame=null;special2SoundCloudWidget=null;}const iframe=document.createElement('iframe');iframe.id='special2SoundCloudFrame';iframe.title='Magnetism Laboratory music';iframe.width='300';iframe.height='166';iframe.scrolling='no';iframe.frameBorder='no';iframe.allow='autoplay; encrypted-media';iframe.style.position='fixed';iframe.style.width='300px';iframe.style.height='166px';iframe.style.left='-1000px';iframe.style.top='-1000px';iframe.style.opacity='0.001';iframe.style.pointerEvents='none';iframe.src='https://w.soundcloud.com/player/?url='+encodeURIComponent(SPECIAL2_SOUNDCLOUD_URL)+'&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false';document.body.appendChild(iframe);special2SoundCloudFrame=iframe;const attach=()=>{try{if(!window.SC||!SC.Widget)return false;if(!special2SoundCloudWidget)special2SoundCloudWidget=SC.Widget(iframe);special2SoundCloudWidget.bind(SC.Widget.Events.READY,()=>{try{special2SoundCloudWidget.setVolume(70);special2SoundCloudWidget.play();}catch(e){}});special2SoundCloudWidget.bind(SC.Widget.Events.FINISH,()=>{try{special2SoundCloudWidget.seekTo(0);special2SoundCloudWidget.play();}catch(e){}});try{special2SoundCloudWidget.play();}catch(e){}return true;}catch(e){return false;}};iframe.addEventListener('load',()=>attach(),{once:true});let tries=0;const wait=setInterval(()=>{tries++;if(attach()||tries>=40)clearInterval(wait);},250);}catch(e){}}
function stopSpecial2Music(){try{if(special2SoundCloudWidget){try{special2SoundCloudWidget.pause();}catch(e){}special2SoundCloudWidget=null;}if(special2SoundCloudFrame){try{special2SoundCloudFrame.remove();}catch(e){}special2SoundCloudFrame=null;}const old=document.getElementById('special2SoundCloudFrame');if(old)old.remove();}catch(e){}}
function playSpecial2ElectricShock(){try{const a=document.getElementById('special2ElectricShock');if(a){a.currentTime=0;a.volume=.82;const p=a.play();if(p)p.catch(()=>{});}}catch(e){}}
function playSpecial2MetalCrash(){try{const a=document.getElementById('special2MetalCrash');if(a){a.currentTime=0;a.volume=.78;const p=a.play();if(p)p.catch(()=>{});}}catch(e){}}
function special2FloorPlatforms(){return special2Platforms.filter(p=>p.story===0||p.story===1||p.story===2||p.story==='shaft'||p.story==='shaft2');}
function special2PlaceMushroom(m,preferredStory=null){const story=preferredStory==null?Math.floor(Math.random()*3):preferredStory;const ps=special2Platforms.filter(p=>p.story===story);const p=ps[Math.floor(Math.random()*ps.length)]||special2Platforms[0];m.x=p.x+45+Math.random()*Math.max(10,p.w-90);m.y=p.y-28;m.active=true;}
function resetSpecial2Mushrooms(){
  special2Mushrooms.pink.forEach((m,i)=>special2PlaceMushroom(m,i%3));
  special2PlaceMushroom(special2Mushrooms.purple,1);
  special2PlaceMushroom(special2Mushrooms.grey[0],0);
  special2PlaceMushroom(special2Mushrooms.grey[1],1);
  special2PlaceMushroom(special2Mushrooms.grey[2],2);
  special2Mushrooms.pink.forEach(m=>m.active=true);
  special2Mushrooms.purple.active=true;
  special2Mushrooms.grey.forEach(m=>m.active=true);
}
function special2MiniBossUI(){
  const ui=document.getElementById('special2MiniBossUI');
  const fill=document.getElementById('special2MiniBossFill');
  const txt=document.getElementById('special2MiniBossText');
  const title=document.getElementById('special2MiniBossTitle');
  const boss=special2MiniBosses.chemistry.active?special2MiniBosses.chemistry:(special2MiniBosses.engineering.active?special2MiniBosses.engineering:null);
  if(!ui)return;
  if(!boss||won){ui.style.display='none';return;}
  ui.style.display='block';
  title.textContent=boss.name;
  fill.style.width=Math.max(0,Math.min(100,boss.health/15*100))+'%';
  txt.textContent=Math.ceil(Math.max(0,boss.health)/15*100)+'%';
}
function special2MiniBossPlaySound(kind){
  const id=kind==='chemistry'?'special2ChemistrySound':'special2EngineeringSound';
  const a=document.getElementById(id);
  if(a){try{a.currentTime=0;a.volume=.82;const q=a.play();if(q)q.catch(()=>{});}catch(e){}}
}
function special2MiniBossSpawn(){
  // Never spawn a second mini-boss on top of an existing one. The next four-minute
  // check will try again if one is still alive.
  if(special2MiniBosses.chemistry.active||special2MiniBosses.engineering.active)return;
  const kind=Math.random()<0.5?'chemistry':'engineering';
  const b=special2MiniBosses[kind];
  // Mini-bosses are free-moving entities. They do not track floors or the
  // player's jump state; they can phase vertically through every platform.
  const side=player.x<special2World.w*.5?1:-1;
  b.x=Math.max(120,Math.min(special2World.w-b.w-120,player.x+side*520));
  b.y=Math.max(special2World.top+40,Math.min(special2World.bottom-b.h-40,player.y));
  b.health=15; b.active=true; b.story=0; b.targetStory=0; b.traveling=false; b.shaftX=970; b.shotTimer=600; b.phase=0;
  special2MiniBossSpawnCount++;
  special2MiniBossPlaySound(kind);
  special2MiniBossUI();
}
function special2MiniBossMoveFloor(b,playerStory,speed){
  if(b.story===playerStory)return false;
  if(!b.traveling){
    b.targetStory=b.story+(playerStory>b.story?1:-1);
    const shafts=[970,2930];
    const bc=b.x+b.w/2;
    b.shaftX=shafts[Math.abs(shafts[0]-bc)<=Math.abs(shafts[1]-bc)?0:1];
    b.traveling=true;
  }
  const sx=b.shaftX-(b.x+b.w/2);
  if(Math.abs(sx)>6)b.x+=Math.sign(sx)*Math.min(Math.abs(sx),speed);
  else{
    const targetY=special2World.floorY[b.targetStory]-b.h;
    const sy=targetY-b.y;
    b.y+=Math.sign(sy)*Math.min(Math.abs(sy),speed*.9);
    if(Math.abs(sy)<1.5){b.y=targetY;b.story=b.targetStory;b.traveling=false;}
  }
  return true;
}
function special2UpdateMiniBosses(){
  if(special2MiniBossSpawnTimer>0)special2MiniBossSpawnTimer--;
  if(special2MiniBossSpawnTimer<=0){
    special2MiniBossSpawnTimer=14400;
    special2MiniBossSpawn();
  }
  for(const kind of ['chemistry','engineering']){
    const b=special2MiniBosses[kind];
    if(!b.active)continue;
    b.phase+=.035;
    const dx=(player.x+player.w/2)-(b.x+b.w/2);
    const dy=(player.y+player.h/2)-(b.y+b.h/2);
    const dist=Math.hypot(dx,dy)||1;
    const speed=1.35;
    // Pure 2D pursuit: jumping has no special meaning to the mini-bosses.
    // They simply move toward the player's current position and phase through platforms.
    b.x+=(dx/dist)*speed;
    b.y+=(dy/dist)*speed;
    b.x=Math.max(20,Math.min(special2World.w-b.w-20,b.x));
    b.y=Math.max(special2World.top+20,Math.min(special2World.bottom-b.h-20,b.y));
    if(b.shotTimer>0)b.shotTimer--;
    if(b.shotTimer<=0){
      const sx=b.x+b.w/2,sy=b.y+b.h/2,tx=player.x+player.w/2,ty=player.y+player.h/2;
      const vx=tx-sx,vy=ty-sy,dd=Math.hypot(vx,vy)||1;
      special2MiniProjectiles.push({kind,x:sx,y:sy,vx:vx/dd*4.05,vy:vy/dd*4.05,life:1200});
      b.shotTimer=600;
    }
    if(player.evilCooldown===0&&rectHit(player,b)){
      player.health=Math.max(0,player.health-15);
      player.evilCooldown=90;
      special2MiniBossPlaySound(kind);
    }
  }
  for(let i=special2MiniProjectiles.length-1;i>=0;i--){
    const q=special2MiniProjectiles[i]; q.x+=q.vx;q.y+=q.vy;q.life--;
    const hit=player.x<q.x+17&&player.x+player.w>q.x-17&&player.y<q.y+17&&player.y+player.h>q.y-17;
    if(hit&&player.evilCooldown===0){
      player.health=Math.max(0,player.health-10);player.evilCooldown=45;
      special2MiniBossPlaySound(q.kind);special2MiniProjectiles.splice(i,1);continue;
    }
    if(q.life<=0||q.x<-500||q.x>special2World.w+500||q.y<special2World.top-500||q.y>900)special2MiniProjectiles.splice(i,1);
  }
  special2MiniBossUI();
}
function special2DrawMiniBoss(b,kind){
  if(!b.active)return;
  const x=b.x-camX,y=b.y;
  ctx.save();
  const cx=x+b.w/2,cy=y+b.h/2;
  const g=ctx.createRadialGradient(cx,cy,20,cx,cy,95);
  g.addColorStop(0,'rgba(90,255,70,.45)');g.addColorStop(.45,'rgba(70,255,50,.20)');g.addColorStop(1,'rgba(30,255,50,0)');
  ctx.fillStyle=g;ctx.beginPath();ctx.arc(cx,cy,95,0,Math.PI*2);ctx.fill();
  ctx.shadowColor='#43ff4d';ctx.shadowBlur=28;ctx.strokeStyle='rgba(91,255,92,.9)';ctx.lineWidth=5;ctx.beginPath();ctx.arc(cx,cy,67+4*Math.sin(Date.now()/120),0,Math.PI*2);ctx.stroke();
  ctx.shadowBlur=0;ctx.globalAlpha=1;
  if(b.image.complete&&b.image.naturalWidth){
    ctx.save();ctx.beginPath();ctx.arc(cx,cy,60,0,Math.PI*2);ctx.clip();
    ctx.drawImage(b.image,x,y,b.w,b.h);
    // Subtle radioactive green hue over the portrait while keeping the source image visible.
    ctx.globalCompositeOperation='screen';ctx.fillStyle='rgba(40,255,55,.20)';ctx.fillRect(x,y,b.w,b.h);ctx.restore();
  }else{ctx.fillStyle='#7cff70';ctx.beginPath();ctx.arc(cx,cy,55,0,Math.PI*2);ctx.fill();}
  ctx.font='900 14px Arial';ctx.textAlign='center';ctx.fillStyle='#23a82c';ctx.strokeStyle='white';ctx.lineWidth=4;ctx.strokeText(b.name,cx,y-8);ctx.fillText(b.name,cx,y-8);
  ctx.restore();
}
function special2DrawMiniProjectiles(){
  for(const q of special2MiniProjectiles){
    const x=q.x-camX,y=q.y;ctx.save();
    ctx.shadowColor='#35ff43';ctx.shadowBlur=22;ctx.fillStyle='#72ff69';ctx.beginPath();ctx.arc(x,y,11,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='rgba(210,255,200,.95)';ctx.beginPath();ctx.arc(x-3,y-3,4,0,Math.PI*2);ctx.fill();ctx.restore();
  }
}
function resetSpecial2(){player={x:150,y:596,w:30,h:44,vx:0,vy:0,onGround:true,coyote:7,jumpBuffer:0,health:100,pooCooldown:0,evilCooldown:0};special2PlayerGroundStory=0;camX=0;special2CamY=0;started=false;won=false;rainbowTimer=0;shroomTextTimer=0;pooTimer=0;special2Elapsed=0;special2MagnetTimer=600;special2BossHealth=100;special2BossActive=false;special2BossDefeated=false;special2PinkPowerTimer=0;special2PinkHitThisPower=false;special2MagnetAttackTimer=3000;special2MagnetAttackActive=0;special2GreyImmunityTimer=0;special2ScrapTimer=4200;special2ScrapWave=null;special2BossRiseTimer=0;special2DropThroughTimer=0;special2CurrentPlatformThin=false;special2Magnets.length=0;special2Lasers.length=0;special2LaserTimer=3900;special2BossStory=0;special2BossTargetStory=0;special2BossTraveling=false;special2BossShaftX=970;special2Boss.x=3600;special2Boss.y=640-special2Boss.h;special2Boss.phase=0;special2MiniBossSpawnTimer=14400;special2MiniBossSpawnCount=0;special2MiniProjectiles.length=0;for(const b of Object.values(special2MiniBosses)){b.active=false;b.health=15;b.traveling=false;b.shotTimer=600;}const miniUI=document.getElementById('special2MiniBossUI');if(miniUI)miniUI.style.display='none';resetSpecial2Mushrooms();stopBossMusic();stopLevel1BossMusic();stopLevel2BossMusic();stopLevel3BossMusic();stopLevel4BossMusic();stopSpecial1Music();stopSpecial2Music();document.getElementById('bossUI').style.display='none';document.getElementById('endScreen').style.display='none';document.getElementById('shroomText').classList.remove('show');document.getElementById('pooOverlay').classList.remove('show');updateHealthUI();}
function special2LandPlayer(oldY){
  player.onGround=false;
  special2CurrentPlatformThin=false;
  for(const p of special2FloorPlatforms()){
    if(p.thin&&special2DropThroughTimer>0)continue;
    if(player.x+player.w>p.x&&player.x<p.x+p.w&&oldY+player.h<=p.y+8&&player.y+player.h>=p.y&&player.vy>=0){
      player.y=p.y-player.h;player.vy=0;player.onGround=true;special2CurrentPlatformThin=!!p.thin;
    }
  }
  if(player.y<special2World.top){player.y=special2World.top;player.vy=0;}
}
function special2FloorAtY(y){let best=0,bestDist=1e9;for(let i=0;i<3;i++){const d=Math.abs((special2World.floorY[i]-44)-y);if(d<bestDist){bestDist=d;best=i;}}return best;}
function special2DrawMushroom(m,type){if(!m.active)return;const x=m.x-camX,y=m.y;ctx.save();const colors={pink:['#ff62df','#ffd4f8'],purple:['#9f62ff','#f0d8ff'],grey:['#9da5ae','#f1f3f6']};const c=colors[type];ctx.shadowColor=c[0];ctx.shadowBlur=18;ctx.fillStyle=c[0];ctx.beginPath();ctx.arc(x,y-10,19,Math.PI,0);ctx.fill();ctx.shadowBlur=0;ctx.fillStyle=c[1];ctx.fillRect(x-5,y-10,10,24);ctx.fillStyle=type==='grey'?'#6f7680':'#fff';ctx.beginPath();ctx.arc(x-7,y-15,4,0,Math.PI*2);ctx.arc(x+7,y-16,4,0,Math.PI*2);ctx.fill();ctx.restore();}
function special2DrawLabBackground(){
  // Everything in the laboratory is WORLD-ANCHORED.  The camera moves over it;
  // decorations never get regenerated around the player.
  ctx.save();
  ctx.translate(-camX,0);
  ctx.fillStyle='#30383d';
  ctx.fillRect(0,special2World.top,special2World.w,special2World.bottom-special2World.top);

  const floorPalette=[
    {wall:'#b9c4c9',accent:'#315f70',light:'#c6dfe3',floor:'#7f8d94'},
    {wall:'#929da2',accent:'#5c417c',light:'#b9a7ce',floor:'#626d72'},
    {wall:'#4b5053',accent:'#293c35',light:'#7f8984',floor:'#353a3d'}
  ];
  const roomColors=['#8eafb9','#9ea9bb','#98b09d','#b5a58c','#a297b0','#93aea5'];

  for(let story=0;story<3;story++){
    const floor=special2World.floorY[story], ceiling=floor-700;
    const pal=floorPalette[story];

    // Walls, ceiling and skirting.
    ctx.fillStyle=pal.wall;ctx.fillRect(0,ceiling,special2World.w,700);
    ctx.fillStyle='#ffffff';ctx.fillRect(0,ceiling,special2World.w,28);
    ctx.fillStyle=pal.floor;ctx.fillRect(0,floor-18,special2World.w,18);

    // Large windows into laboratory classrooms. Fixed world positions.
    for(let x=80,idx=0;x<special2World.w;x+=560,idx++){
      const wx=x,wy=ceiling+76,ww=390,wh=190;
      ctx.fillStyle='#b7c4ca';ctx.fillRect(wx-8,wy-8,ww+16,wh+16);
      ctx.fillStyle=roomColors[(idx+story)%roomColors.length];ctx.fillRect(wx,wy,ww,wh);
      ctx.strokeStyle='#526b76';ctx.lineWidth=5;ctx.strokeRect(wx,wy,ww,wh);
      ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(wx+ww*.5,wy);ctx.lineTo(wx+ww*.5,wy+wh);ctx.moveTo(wx,wy+wh*.52);ctx.lineTo(wx+ww,wy+wh*.52);ctx.stroke();

      // Different classroom interiors.
      const mode=idx%4;
      ctx.fillStyle='rgba(40,68,78,.24)';
      if(mode===0){
        ctx.fillRect(wx+24,wy+132,140,15);ctx.fillRect(wx+250,wy+138,105,12);
        ctx.beginPath();ctx.arc(wx+95,wy+105,13,0,Math.PI*2);ctx.fill();ctx.fillRect(wx+84,wy+116,22,31);
      }else if(mode===1){
        ctx.fillRect(wx+35,wy+115,65,55);ctx.fillRect(wx+120,wy+135,115,13);ctx.fillRect(wx+265,wy+105,50,65);
      }else if(mode===2){
        ctx.fillRect(wx+30,wy+145,300,12);ctx.fillRect(wx+70,wy+108,20,38);ctx.fillRect(wx+250,wy+100,20,46);
        ctx.fillStyle='rgba(50,180,200,.35)';ctx.fillRect(wx+145,wy+95,52,51);
      }else{
        ctx.fillRect(wx+45,wy+130,95,18);ctx.fillRect(wx+205,wy+122,125,18);
        ctx.fillStyle='rgba(160,70,210,.30)';ctx.beginPath();ctx.arc(wx+175,wy+110,24,0,Math.PI*2);ctx.fill();
      }
      ctx.fillStyle='#405963';ctx.font='bold 12px Arial';ctx.textAlign='center';
      const labels=story===0?['MATERIALS LAB','CHEMISTRY','TESTING ROOM','MAGNET BAY']:story===1?['ELECTROMAGNETICS','FIELD LAB','CIRCUIT ROOM','ANALYSIS']:['RESEARCH LAB','POLARITY LAB','ADVANCED TESTING','R&D CLASSROOM'];
      ctx.fillText(labels[idx%labels.length],wx+ww/2,wy+wh-12);
    }

    // Hallway equipment: intentionally varied by position so it does not look tiled.
    for(let x=30,idx=0;x<special2World.w;x+=370,idx++){
      const baseY=ceiling+395;
      const mode=idx%5;
      if(mode===0){
        ctx.fillStyle='#697b84';ctx.fillRect(x,baseY,155,18);ctx.fillRect(x+10,baseY+18,12,72);ctx.fillRect(x+132,baseY+18,12,72);
        ctx.fillStyle='#91e3eb';ctx.beginPath();ctx.moveTo(x+38,baseY-2);ctx.lineTo(x+45,baseY-30);ctx.lineTo(x+63,baseY-30);ctx.lineTo(x+70,baseY-2);ctx.closePath();ctx.fill();ctx.strokeStyle='#557985';ctx.stroke();
        ctx.fillStyle='#b7f1c9';ctx.beginPath();ctx.arc(x+108,baseY-13,14,0,Math.PI*2);ctx.fill();ctx.stroke();
      }else if(mode===1){
        ctx.fillStyle='#aebbc1';ctx.fillRect(x,baseY-10,78,100);ctx.fillStyle='#eef3f5';ctx.fillRect(x+9,baseY+3,60,30);ctx.fillRect(x+9,baseY+45,60,30);ctx.strokeStyle='#71848c';ctx.strokeRect(x+9,baseY+3,60,30);ctx.strokeRect(x+9,baseY+45,60,30);
      }else if(mode===2){
        ctx.fillStyle='#8fa2aa';ctx.fillRect(x+18,baseY-58,65,148);ctx.fillStyle='#d9fbff';ctx.fillRect(x+27,baseY-43,47,76);ctx.strokeStyle='#607983';ctx.strokeRect(x+27,baseY-43,47,76);ctx.fillStyle='#5fc9db';ctx.fillRect(x+32,baseY+5,37,25);ctx.fillStyle='#7c8790';ctx.fillRect(x+7,baseY+90,88,10);
      }else if(mode===3){
        ctx.fillStyle='#6c7e87';ctx.fillRect(x+8,baseY+12,120,12);ctx.fillRect(x+18,baseY+24,8,64);ctx.fillRect(x+110,baseY+24,8,64);
        ctx.strokeStyle='#d34a52';ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(x+25,baseY+5);ctx.bezierCurveTo(x+25,baseY-30,x+95,baseY-30,x+95,baseY+5);ctx.stroke();
      }else{
        ctx.fillStyle='#d4a95f';ctx.fillRect(x+25,baseY-38,105,8);ctx.fillStyle='#80929a';ctx.fillRect(x+32,baseY-30,8,120);ctx.fillRect(x+115,baseY-30,8,120);
        ctx.fillStyle='#dff8ff';ctx.beginPath();ctx.arc(x+78,baseY-5,22,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#617983';ctx.stroke();
      }
    }

    if(story===2){
      // Abandoned research floor: dark desks, covered equipment and occasional emergency lamps.
      for(let x=150,idx=0;x<special2World.w;x+=610,idx++){
        const ey=ceiling+260;
        ctx.fillStyle='rgba(18,22,24,.58)';ctx.fillRect(x,ey+90,210,14);ctx.fillRect(x+18,ey+104,12,72);ctx.fillRect(x+180,ey+104,12,72);
        ctx.fillStyle='rgba(110,25,35,.55)';ctx.fillRect(x+95,ey+18,16,28);
        ctx.fillStyle='rgba(190,30,45,.16)';ctx.beginPath();ctx.arc(x+103,ey+32,55,0,Math.PI*2);ctx.fill();
      }
    }

    // Doors and wall panels.
    for(let x=280,idx=0;x<special2World.w;x+=820,idx++){
      const dy=ceiling+302;
      ctx.fillStyle=idx%2?'#b5c1c6':'#c8d1d5';ctx.fillRect(x,dy,112,205);
      ctx.fillStyle='#f6f8f9';ctx.fillRect(x+10,dy+12,92,145);ctx.strokeStyle='#617780';ctx.lineWidth=3;ctx.strokeRect(x+10,dy+12,92,145);
      ctx.fillStyle=idx%2?'#ffd85e':'#63d8e8';ctx.fillRect(x+16,dy+174,80,18);
      ctx.fillStyle='#fff';ctx.font='bold 10px Arial';ctx.textAlign='center';ctx.fillText(idx%2?'CAUTION':'LAB ACCESS',x+56,dy+187);
    }

    // Exposed pipes, varied in colour and height by floor.
    ctx.lineWidth=8;ctx.strokeStyle=pal.accent;ctx.beginPath();ctx.moveTo(0,ceiling+566);ctx.lineTo(special2World.w,ceiling+566);ctx.stroke();
    ctx.lineWidth=3;ctx.strokeStyle='#7c8d94';ctx.beginPath();ctx.moveTo(0,ceiling+585);ctx.lineTo(special2World.w,ceiling+585);ctx.stroke();
    for(let x=180;x<special2World.w;x+=700){ctx.strokeStyle='#a0adb3';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(x,ceiling+565);ctx.lineTo(x,ceiling+520);ctx.lineTo(x+90,ceiling+520);ctx.stroke();}

    // Realistic recessed/concave lighting. Upper floors have fewer working fixtures.
    const lightStep=story===2?520:330;
    for(let x=100;x<special2World.w;x+=lightStep){
      const fixtureAlpha=story===2?.45:story===1?.72:1;
      ctx.fillStyle=`rgba(80,92,98,${fixtureAlpha})`;ctx.fillRect(x,ceiling+8,145,5);
      ctx.fillStyle=`rgba(210,228,232,${fixtureAlpha})`;ctx.fillRect(x+10,ceiling+13,125,9);
      const pool=ctx.createRadialGradient(x+72,ceiling+25,5,x+72,ceiling+235,225);
      pool.addColorStop(0,story===2?'rgba(185,198,193,.18)':story===1?'rgba(210,224,228,.27)':'rgba(225,238,241,.38)');
      pool.addColorStop(.38,story===2?'rgba(140,152,148,.08)': 'rgba(205,220,224,.13)');
      pool.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=pool;ctx.fillRect(x-150,ceiling+15,445,430);
    }

    // Concave ambient falloff: darkest at ceiling/floor edges and side boundaries.
    const shade=ctx.createLinearGradient(0,ceiling,0,floor);
    shade.addColorStop(0,story===2?'rgba(0,0,0,.68)':story===1?'rgba(0,0,0,.40)':'rgba(0,0,0,.28)');
    shade.addColorStop(.50,'rgba(0,0,0,.07)');
    shade.addColorStop(1,story===2?'rgba(0,0,0,.62)':story===1?'rgba(0,0,0,.34)':'rgba(0,0,0,.24)');
    ctx.fillStyle=shade;ctx.fillRect(0,ceiling,special2World.w,700);
    const vignette=ctx.createRadialGradient(special2World.w/2,ceiling+350,180,special2World.w/2,ceiling+350,3000);
    vignette.addColorStop(0,'rgba(0,0,0,0)');vignette.addColorStop(.72,'rgba(0,0,0,.03)');vignette.addColorStop(1,story===2?'rgba(0,0,0,.36)':'rgba(0,0,0,.18)');
    ctx.fillStyle=vignette;ctx.fillRect(0,ceiling,special2World.w,700);
    ctx.fillStyle='#29434f';ctx.font='900 17px Arial';ctx.textAlign='left';
    ctx.fillText('MAGNETISM LABORATORY — FLOOR '+(story+1),24,ceiling+52);
    ctx.fillStyle='#617984';ctx.font='bold 12px Arial';
    ctx.fillText(story===0?'GROUND FLOOR • MATERIALS & TESTING':story===1?'SECOND FLOOR • ELECTROMAGNETICS':'THIRD FLOOR • RESEARCH & DEVELOPMENT',24,ceiling+69);
  }

  // Keep the exterior/shaft spaces white instead of exposing the canvas blue.
  ctx.fillStyle='#f4f7f8';
  ctx.fillRect(0,special2World.top-40,special2World.w,40);
  ctx.fillRect(0,special2World.bottom,special2World.w,100);
  ctx.restore();
}

function special2DrawPlatform(p){const x=p.x-camX;const thin=!!p.thin;ctx.fillStyle=thin?'#8d9aa1':'#a6b2b8';ctx.fillRect(x,p.y,p.w,p.h);ctx.fillStyle=thin?'#d9e0e4':'#e8eef0';ctx.fillRect(x,p.y,p.w,thin?3:5);ctx.strokeStyle=thin?'#66747c':'#71828a';ctx.lineWidth=2;ctx.strokeRect(x,p.y,p.w,p.h);}
function special2DrawProfessor(){
  if(!special2BossActive)return;
  const s=special2ProfessorSprite;
  const x=special2Boss.x-camX;
  const y=special2Boss.y-(special2BossRiseTimer>0?28*Math.sin((1-special2BossRiseTimer/30)*Math.PI):0);
  const cx=x+special2Boss.w/2,cy=y+special2Boss.h/2;
  ctx.save();
  // The portrait is an opaque circular cut-out. The purple magnetic aura is drawn
  // first, so it glows BEHIND the portrait rather than tinting it transparent.
  // CONSTANT purple magnetic aura: always visible behind the opaque circular portrait.
  const pulse=Math.sin(Date.now()/180);
  const glow=96+8*pulse;
  ctx.save();
  ctx.globalCompositeOperation='lighter';
  const aura=ctx.createRadialGradient(cx,cy,18,cx,cy,glow);
  aura.addColorStop(0,'rgba(186,72,255,.62)');
  aura.addColorStop(.28,'rgba(174,64,255,.42)');
  aura.addColorStop(.58,'rgba(150,55,245,.20)');
  aura.addColorStop(1,'rgba(150,55,245,0)');
  ctx.fillStyle=aura;ctx.beginPath();ctx.arc(cx,cy,glow,0,Math.PI*2);ctx.fill();
  ctx.shadowColor='#a94cff';ctx.shadowBlur=34;
  ctx.strokeStyle='rgba(190,105,255,.82)';ctx.lineWidth=6;
  ctx.beginPath();ctx.arc(cx,cy,72+5*pulse,0,Math.PI*2);ctx.stroke();
  ctx.restore();
  if(special2MagnetAttackTimer<=600&&special2MagnetAttackTimer>0&&!special2MagnetAttackActive){
    const warning=78+10*Math.sin(Date.now()/85);
    ctx.shadowColor='#c16cff';ctx.shadowBlur=42;ctx.strokeStyle='rgba(220,164,255,.95)';ctx.lineWidth=6;
    ctx.beginPath();ctx.arc(cx,cy,warning,0,Math.PI*2);ctx.stroke();
  }
  ctx.shadowBlur=0;ctx.globalAlpha=1;
  if(s.complete&&s.naturalWidth)ctx.drawImage(s,x,y,special2Boss.w,special2Boss.h);
  else{ctx.fillStyle='#c92732';ctx.beginPath();ctx.arc(cx,cy,special2Boss.w/2,0,Math.PI*2);ctx.fill();}
  ctx.restore();
  ctx.save();ctx.font='900 16px Arial';ctx.textAlign='center';ctx.fillStyle='#7b19b7';ctx.strokeStyle='white';ctx.lineWidth=4;
  ctx.strokeText('PROFESSOR POLARITY',cx,y-12);ctx.fillText('PROFESSOR POLARITY',cx,y-12);ctx.restore();
}
function special2DrawMagnet(b){const x=b.x-camX,y=b.y;ctx.save();ctx.translate(x,y);ctx.rotate(b.angle);ctx.fillStyle='#d83b46';ctx.fillRect(-5,-15,10,15);ctx.fillStyle='#c8cbd1';ctx.fillRect(-5,0,10,15);ctx.fillStyle='#fff';ctx.font='900 9px Arial';ctx.textAlign='center';ctx.fillText('N',0,-6);ctx.fillText('S',0,11);ctx.restore();}
function special2DrawScrapWave(){if(!special2ScrapWave)return;const x=special2ScrapWave.x-camX,y=special2ScrapWave.y;ctx.save();ctx.fillStyle='#6c747b';ctx.shadowColor='#c8d0d6';ctx.shadowBlur=16;ctx.beginPath();ctx.moveTo(x-75,y);ctx.quadraticCurveTo(x-35,y-45,x,y);ctx.quadraticCurveTo(x+35,y-45,x+75,y);ctx.closePath();ctx.fill();ctx.strokeStyle='#b7bec4';ctx.lineWidth=5;ctx.stroke();for(let i=-2;i<=2;i++){ctx.fillStyle='#858c91';ctx.fillRect(x+i*24-7,y-26-Math.abs(i)*7,14,24);}ctx.restore();}
function special2UpdateBossUI(){const hp=Math.max(0,Math.min(100,special2BossHealth));const fill=document.getElementById('bossFill'),txt=document.getElementById('bossText'),ui=document.getElementById('bossUI'),title=document.querySelector('#bossUI>div:first-child');if(fill)fill.style.width=hp+'%';if(txt)txt.textContent=Math.ceil(hp)+'%';if(title)title.textContent='PROFESSOR POLARITY';if(ui)ui.style.display=(special2BossActive&&!won)?'block':'none';}
const special2Boss={x:3600,y:490,w:150,h:150,phase:0,magnetHitCooldown:0};
function special2FireLasers(){
  const cx=special2Boss.x+special2Boss.w/2, cy=special2Boss.y+special2Boss.h/2;
  special2Lasers=[
    {x:cx,y:cy,dx:1,dy:0,life:90},
    {x:cx,y:cy,dx:-1,dy:0,life:90},
    {x:cx,y:cy,dx:0,dy:1,life:90},
    {x:cx,y:cy,dx:0,dy:-1,life:90}
  ];
  playSpecial2ElectricShock();
}
function special2UpdateLasers(){
  if(special2Lasers.length){
    const cx=special2Boss.x+special2Boss.w/2,cy=special2Boss.y+special2Boss.h/2;
    for(const l of special2Lasers){l.x=cx;l.y=cy;}
    for(const l of special2Lasers)l.life--;
    special2Lasers=special2Lasers.filter(l=>l.life>0);
  }
  if(!special2BossActive||!special2Lasers.length)return;
  const cx=player.x+player.w/2,cy=player.y+player.h/2;
  for(const l of special2Lasers){
    const hit=l.dx!==0
      ? Math.abs(cy-l.y)<14 && ((l.dx>0&&cx>=l.x)||(l.dx<0&&cx<=l.x))
      : Math.abs(cx-l.x)<14 && ((l.dy>0&&cy>=l.y)||(l.dy<0&&cy<=l.y));
    if(hit&&player.evilCooldown===0){player.health=Math.max(0,player.health-10);player.evilCooldown=45;playSpecial2ElectricShock();break;}
  }
}
function special2DrawLasers(){
  if(!special2Lasers.length)return;
  ctx.save();
  for(const l of special2Lasers){
    const len=1800,ex=l.x+l.dx*len,ey=l.y+l.dy*len;
    ctx.strokeStyle='rgba(173,78,255,.28)';ctx.lineWidth=34;ctx.shadowColor='#9d3cff';ctx.shadowBlur=28;
    ctx.beginPath();ctx.moveTo(l.x,l.y);ctx.lineTo(ex,ey);ctx.stroke();
    ctx.strokeStyle='#dca8ff';ctx.lineWidth=10;ctx.shadowBlur=12;
    ctx.beginPath();ctx.moveTo(l.x,l.y);ctx.lineTo(ex,ey);ctx.stroke();
  }
  ctx.restore();
}
function special2MoveBossFloor(playerStory,speed){
  if(special2PinkPowerTimer>0)return false;
  if(special2BossStory===playerStory)return false;
  if(!special2BossTraveling){
    special2BossTargetStory=special2BossStory+(playerStory>special2BossStory?1:-1);
    const shafts=[970,2930];
    const bc=special2Boss.x+special2Boss.w/2;
    special2BossShaftX=shafts[Math.abs(shafts[0]-bc)<=Math.abs(shafts[1]-bc)?0:1];
    special2BossTraveling=true;
  }
  const sx=special2BossShaftX-(special2Boss.x+special2Boss.w/2);
  if(Math.abs(sx)>6){
    special2Boss.x+=Math.sign(sx)*Math.min(Math.abs(sx),speed);
  }else{
    const targetY=special2World.floorY[special2BossTargetStory]-special2Boss.h;
    const sy=targetY-special2Boss.y;
    special2Boss.y+=Math.sign(sy)*Math.min(Math.abs(sy),speed*.9);
    if(Math.abs(sy)<1.5){special2Boss.y=targetY;special2BossStory=special2BossTargetStory;special2BossTraveling=false;}
  }
  return true;
}

function updateSpecial2(){if(!started)return;special2Elapsed++;if(special2DropThroughTimer>0)special2DropThroughTimer--;if(special2GreyImmunityTimer>0)special2GreyImmunityTimer--;if(special2PinkPowerTimer>0)special2PinkPowerTimer--;if(special2BossRiseTimer>0)special2BossRiseTimer--;if(special2ScrapWave){special2ScrapWave.x+=special2ScrapWave.vx;if(special2ScrapWave.x<-150||special2ScrapWave.x>special2World.w+150)special2ScrapWave=null;}
  const left=keys.KeyA||keys.ArrowLeft,right=keys.KeyD||keys.ArrowRight,jump=keys.Space||keys.ArrowUp;const slow=special2MagnetAttackActive>0&&special2GreyImmunityTimer<=0,moveMult=slow?.5:1;if(left)player.vx-=.10*moveMult;if(right)player.vx+=.10*moveMult;if(!left&&!right)player.vx*=.94;player.vx=Math.max(-1.65*moveMult,Math.min(1.65*moveMult,player.vx));if(jump)player.jumpBuffer=7;else player.jumpBuffer=Math.max(0,player.jumpBuffer-1);if(player.onGround)player.coyote=7;else player.coyote=Math.max(0,player.coyote-1);if(player.jumpBuffer>0&&player.coyote>0){player.vy=-12.5;player.onGround=false;player.coyote=0;player.jumpBuffer=0;}player.vy+=.20;player.vy=Math.min(player.vy,5);const oldY=player.y;player.x+=player.vx;player.y+=player.vy;special2LandPlayer(oldY);if(player.onGround){const landedStory=special2FloorAtY(player.y);if(landedStory>=0&&landedStory<=2)special2PlayerGroundStory=landedStory;}player.x=Math.max(0,Math.min(special2World.w-player.w,player.x));if(player.y>720){resetSpecial2();started=true;msg.style.display='none';startSpecial2Music();return;}
  if(player.evilCooldown>0)player.evilCooldown--;
  special2UpdateMiniBosses();
  if(!special2BossActive&&!special2BossDefeated&&player.x>2300){special2BossActive=true;special2Boss.x=3600;special2Boss.y=640-special2Boss.h;special2Boss.phase=0;special2BossHealth=100;special2MagnetTimer=600;special2BossStory=0;special2BossTargetStory=0;special2BossTraveling=false;special2BossShaftX=970;special2PinkPowerTimer=0;special2PinkHitThisPower=false;special2MagnetAttackTimer=3000;special2MagnetAttackActive=0;special2ScrapTimer=4200;special2ScrapWave=null;startSpecial2Music();special2UpdateBossUI();}
  if(special2BossActive&&!won){
    special2Boss.phase+=.04;
    const dx=(player.x+player.w/2)-(special2Boss.x+special2Boss.w/2);
    const dy=(player.y+player.h/2)-(special2Boss.y+special2Boss.h/2);
    const dist=Math.hypot(dx,dy)||1;
    const pinkActive=special2PinkPowerTimer>0;
    const speed=pinkActive?.54:1.08;
    // Professor is also a free-moving 2D pursuer. He ignores floors/platforms.
    // Pink Power reverses the pursuit direction at exactly half normal speed.
    if(pinkActive){
      special2BossTraveling=false;
      special2Boss.x-=(dx/dist)*speed;
      special2Boss.y-=(dy/dist)*speed;
    }else{
      if(special2MagnetAttackActive>0&&special2GreyImmunityTimer<=0){
        special2MagnetAttackActive--;
        special2Boss.x+=(dx/dist)*speed;
        special2Boss.y+=(dy/dist)*speed;
        player.x+=(dx/dist)*.825;
        player.y+=(dy/dist)*.825;
      }else{
        special2Boss.x+=(dx/dist)*speed;
        special2Boss.y+=(dy/dist)*speed;
      }
    }
    special2Boss.x=Math.max(20,Math.min(special2World.w-special2Boss.w-20,special2Boss.x));
    special2Boss.y=Math.max(special2World.top+20,Math.min(special2World.bottom-special2Boss.h-20,special2Boss.y));
    if(special2MagnetTimer>0)special2MagnetTimer--;else{const sx=special2Boss.x+special2Boss.w/2,sy=special2Boss.y+special2Boss.h*.45,tx=player.x+15,ty=player.y+22,dx2=tx-sx,dy2=ty-sy,dd=Math.hypot(dx2,dy2)||1;special2Magnets.push({x:sx,y:sy,vx:dx2/dd*4.05,vy:dy2/dd*4.05,angle:Math.atan2(dy2,dx2),life:900});special2MagnetTimer=600;}
    if(special2MagnetAttackTimer>0)special2MagnetAttackTimer--;if(special2MagnetAttackTimer===0){special2MagnetAttackActive=600;special2MagnetAttackTimer=3000;playSpecial2ElectricShock();}
    if(special2ScrapTimer>0)special2ScrapTimer--;else{special2ScrapTimer=4200;special2BossRiseTimer=30;const fy=special2World.floorY[special2FloorAtY(special2Boss.y)];special2ScrapWave={x:special2Boss.x+special2Boss.w/2,y:fy,vx:((player.x+15)-(special2Boss.x+special2Boss.w/2)>=0?1:-1)*6.075};playSpecial2MetalCrash();}
    if(special2LaserTimer>0)special2LaserTimer--;else{special2LaserTimer=3900;special2FireLasers();}
    special2UpdateLasers();
    for(let i=special2Magnets.length-1;i>=0;i--){const b=special2Magnets[i];b.x+=b.vx;b.y+=b.vy;b.life--;const hit=player.x<b.x+12&&player.x+player.w>b.x-12&&player.y<b.y+16&&player.y+player.h>b.y-16;if(hit){player.health=Math.max(0,player.health-10);player.evilCooldown=45;playSpecial2ElectricShock();special2Magnets.splice(i,1);continue;}if(b.life<=0||b.x<-300||b.x>special2World.w+300||b.y<special2World.top-300||b.y>800)special2Magnets.splice(i,1);}
    if(special2PinkPowerTimer===0&&player.evilCooldown===0&&rectHit(player,special2Boss)){player.health=Math.max(0,player.health-15);player.evilCooldown=90;playSpecial2ElectricShock();}
    if(special2PinkPowerTimer>0&&!special2PinkHitThisPower){
      if(rectHit(player,special2Boss)){special2BossHealth=Math.max(0,special2BossHealth-5);special2PinkHitThisPower=true;playBigSplat();}
      else{for(const kind of ['chemistry','engineering']){const mb=special2MiniBosses[kind];if(mb.active&&rectHit(player,mb)){mb.health=Math.max(0,mb.health-5);special2PinkHitThisPower=true;special2MiniBossLastHitByPink=true;playBigSplat();if(mb.health<=0){mb.active=false;special2MiniBossLastHitByPink=false;special2MiniBossUI();}}if(special2PinkHitThisPower)break;}}
    }
    for(const pm of special2Mushrooms.pink){if(pm.active&&Math.hypot(player.x+15-pm.x,player.y+22-pm.y)<44){pm.active=false;special2PinkPowerTimer=1200;special2PinkHitThisPower=false;special2PlaceMushroom(pm);playGoonshroomSplat();break;}}const pu=special2Mushrooms.purple;if(pu.active&&Math.hypot(player.x+15-pu.x,player.y+22-pu.y)<44){pu.active=false;player.health=Math.min(100,player.health+30);special2PlaceMushroom(pu);playGoonshroomSplat();}for(const gm of special2Mushrooms.grey){if(gm.active&&Math.hypot(player.x+15-gm.x,player.y+22-gm.y)<44){gm.active=false;special2GreyImmunityTimer=2700;special2PlaceMushroom(gm);playGoonshroomSplat();}}
    if(special2ScrapWave&&Math.abs(special2ScrapWave.y-(player.y+player.h))<55&&special2ScrapWave.x>player.x-10&&special2ScrapWave.x<player.x+player.w+35){player.health=Math.max(0,player.health-40);special2ScrapWave=null;playSpecial2MetalCrash();}
    if(special2BossHealth<=0){special2BossActive=false;special2BossDefeated=true;special2Magnets.length=0;special2MagnetAttackActive=0;stopSpecial2Music();special2UpdateBossUI();won=true;started=false;document.getElementById('endScreen').style.display='flex';}
  }
  special2CamY=Math.max(special2World.top,Math.min(special2World.bottom-H,player.y-350));camX=Math.max(0,Math.min(special2World.w-W,player.x-W*.38));special2UpdateBossUI();updateHealthUI();
}
let ctxMagnetImmunityHint=false;
function drawSpecial2(){ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,W,H);ctx.save();ctx.translate(0,-special2CamY);special2DrawLabBackground();for(const p of special2Platforms)special2DrawPlatform(p);for(const pm of special2Mushrooms.pink)special2DrawMushroom(pm,'pink');special2DrawMushroom(special2Mushrooms.purple,'purple');for(const gm of special2Mushrooms.grey)special2DrawMushroom(gm,'grey');for(const b of special2Magnets)special2DrawMagnet(b);special2DrawMiniProjectiles();special2DrawScrapWave();special2DrawLasers();special2DrawProfessor();special2DrawMiniBoss(special2MiniBosses.chemistry,'chemistry');special2DrawMiniBoss(special2MiniBosses.engineering,'engineering');drawPlayer();ctx.restore();ctx.save();ctx.font='900 14px Arial';ctx.textAlign='left';ctx.fillStyle='#344b5b';if(special2MagnetAttackTimer<=600&&special2MagnetAttackTimer>0){ctx.fillStyle='#7b32c8';ctx.fillText('POLARITY SURGE IN '+Math.ceil(special2MagnetAttackTimer/60)+'s',24,96);}if(special2MagnetAttackActive>0&&special2GreyImmunityTimer<=0){ctx.fillStyle='#7b32c8';ctx.fillText('MAGNETIC PULL — MOVE AT HALF SPEED',24,96);}if(special2GreyImmunityTimer>0){ctx.fillStyle='#5e6670';ctx.fillText('GREY MUSHROOM SHIELD: '+Math.ceil(special2GreyImmunityTimer/60)+'s',24,96);}ctx.restore();ctx.fillStyle='rgba(30,55,70,.25)';ctx.fillRect(350,665,500,8);ctx.fillStyle='#4e91b4';ctx.fillRect(350,665,500*Math.min(1,player.x/special2WinX),8);}
function startSpecial2(){resetSpecial2();}

function drawSpecial1(){
  drawSpecial1Background();
  for(const m of special1GiantMushrooms)drawSpecial1GiantMushroom(m);
  drawSpecial1Pink();drawSpecial1Bonus();drawSpecial1Poos();drawSpecial1Clouds();drawSpecial1Eddith();
  if(special1PowerTimer>0){ctx.save();const x=player.x-camX+15,y=player.y+22,pulse=26+7*Math.sin(Date.now()/90);ctx.globalAlpha=.27;ctx.fillStyle='#ff58e8';ctx.shadowColor='#ff58e8';ctx.shadowBlur=34;ctx.beginPath();ctx.arc(x,y,pulse,0,Math.PI*2);ctx.fill();ctx.globalAlpha=.8;ctx.strokeStyle='#ffd6f8';ctx.lineWidth=3;ctx.beginPath();ctx.arc(x,y,pulse+8,0,Math.PI*2);ctx.stroke();ctx.restore();}
  drawPlayer();
  ctx.fillStyle='rgba(255,255,255,.45)';ctx.fillRect(350,665,500,8);ctx.fillStyle='#ff63da';ctx.fillRect(350,665,500*Math.min(1,special1PinkUses/15),8);
}

/* =========================
   SPECIAL 5 — MALICIOUS MARS
   Completely standalone planetary loop. No regular/special-level mechanics are
   reused here: the level is one enormous circular Mars surface in space.
   ========================= */
const special5World={
  radius:5200,
  circumference:2*Math.PI*5200,
  groundBase:548,
  terrainSeed:17,
  rocks:[],
  dunes:[]
};
let special5S=0;
let special5StartS=0;
let special5Completed=false;
let special5LoopCount=0;
let special5Travel=0;
let special5CameraX=0;
let special5DustTimer=0;
let special5Shake=0;
let special5MushroomSerial=0;


/* Special 5 — Mars Explorer boss and standalone mushroom system.
   Intentionally isolated from every regular level and every other special level.
   The ending hook is left open for a future Mars Explorer evolution. */
const special5Explorer={
  s:760,w:38,h:38,speed:0.90,phase:0,active:false,defeated:false,evolved:false,
  health:3,maxHealth:3,hitCooldown:0,fireTimer:1200,fireballs:[],explosionTimer:0,
  evolutionState:'base',floatY:0,special45Timer:2700,special70Timer:4200,special155Timer:9300,special200Timer:12000,
  spinTimer:0,spinAngle:0,chargeTimer:0,chargeDX:0,chargeDY:0,chargeTargetS:0,chargeTargetY:0
};
const special5Mushrooms={pink:[],purple:[],red:[]};
let special5PinkPower=0;
let special5PinkDamageUsed=false;
let special5RedPower=0;
let special5FleeTimer=0;
let special5PinkSpawnTimer=1200;   // 20 seconds
let special5PurpleSpawnTimer=2400; // 40 seconds
let special5RedSpawnTimer=3600;    // 60 seconds
let special5BossHitCooldown=0;
let special5EndBlackTimer=0;

function special5MushroomCount(){return special5Mushrooms.pink.length+special5Mushrooms.purple.length+special5Mushrooms.red.length;}
function special5RemoveOldestMushroom(){
  let oldestType=null,oldestIndex=-1,oldestBorn=Infinity;
  for(const type of ['pink','purple','red']){
    const arr=special5Mushrooms[type];
    for(let i=0;i<arr.length;i++){
      if(arr[i].born<oldestBorn){oldestBorn=arr[i].born;oldestType=type;oldestIndex=i;}
    }
  }
  if(oldestType)special5Mushrooms[oldestType].splice(oldestIndex,1);
}
function special5SpawnMushroom(type){
  const C=special5World.circumference;
  const ahead=1080+Math.random()*4650;
  const jitter=(Math.random()-.5)*2100;
  const ms=((special5S+ahead+jitter)%C+C)%C;
  const y=special5SurfaceY(ms)-22;
  if(special5MushroomCount()>=5)special5RemoveOldestMushroom();
  const item={s:ms,y,active:true,phase:Math.random()*Math.PI*2,born:++special5MushroomSerial};
  special5Mushrooms[type].push(item);
}
function special5SpawnInitialMushrooms(){
  special5Mushrooms.pink.length=0;special5Mushrooms.purple.length=0;special5Mushrooms.red.length=0;
  special5MushroomSerial=0;
  special5SpawnMushroom('pink');
  special5PinkSpawnTimer=1200;special5PurpleSpawnTimer=2400;special5RedSpawnTimer=3600;
}
function special5ResetCombat(){
  special5Explorer.s=760;special5Explorer.w=38;special5Explorer.h=38;special5Explorer.speed=0.90;
  special5Explorer.phase=0;special5Explorer.active=false;special5Explorer.defeated=false;special5Explorer.evolved=false;
  special5Explorer.health=3;special5Explorer.maxHealth=3;special5Explorer.hitCooldown=0;special5Explorer.fireTimer=1200;
  special5Explorer.fireballs.length=0;special5Explorer.explosionTimer=0;special5Explorer.evolutionState='base';
  special5Explorer.floatY=0;special5Explorer.special45Timer=2700;special5Explorer.special70Timer=4200;special5Explorer.special155Timer=9300;
  special5Explorer.spinTimer=0;special5Explorer.spinAngle=0;
  special5PinkPower=0;special5PinkDamageUsed=false;special5RedPower=0;special5FleeTimer=0;special5BossHitCooldown=0;special5Shake=0;special5EndBlackTimer=0;bossHealth=0;
  special5SpawnInitialMushrooms();
}
function special5MushroomWorldX(s){return special5WorldS(s);}
function special5MushroomY(m){return special5SurfaceY(m.s)-22;}
function special5PlayerNearS(s,range){return Math.abs(wrappedSigned(s-special5S,special5World.circumference))<range;}
function special5DamageExplorer(amount){
  const e=special5Explorer;
  if(!e.active||e.defeated||special5BossHitCooldown>0)return;
  e.health=Math.max(0,e.health-amount);
  bossHealth=(e.health/e.maxHealth)*100;
  special5BossHitCooldown=45;
  if(e.health<=0){
    playSpecial5ExplorerSound();
    e.active=false;e.defeated=true;e.fireballs.length=0;
    special5Shake=e.evolved?420:210;
    e.explosionTimer=e.evolved?150:105;
    if(e.evolved){
      special5EndBlackTimer=0;
      e.evolutionState='evolved-defeated';
    }else{
      e.evolutionState='base-defeated';
    }
  }
}
function special5BeginEvolution(){
  const e=special5Explorer;
  e.evolved=true;e.defeated=false;e.active=true;e.w=190;e.h=190;e.speed=1.98;
  e.health=40;e.maxHealth=40;e.hitCooldown=0;e.fireTimer=600;e.fireballs.length=0;
  e.evolutionState='evolved';
  e.floatY=0;e.special45Timer=2700;e.special70Timer=4200;e.special155Timer=9300;e.special200Timer=12000;e.chargeTimer=0;e.special200Timer=12000;
  e.spinTimer=0;e.spinAngle=0;e.chargeTimer=0;e.chargeDX=0;e.chargeDY=0;e.chargeTargetS=e.s;e.chargeTargetY=0;special5BossHitCooldown=45;
  bossHealth=100;
  const bt=document.querySelector('#bossUI>div:first-child');if(bt)bt.textContent='BEACON OF MASCULINITY';
  playSpecial5ExplorerSound();
}
function special5UpdateMushrooms(){
  if(special5PinkPower>0)special5PinkPower--;
  if(special5RedPower>0)special5RedPower--;
  if(special5FleeTimer>0)special5FleeTimer--;
  if(special5BossHitCooldown>0)special5BossHitCooldown--;
  special5PinkSpawnTimer--;special5PurpleSpawnTimer--;special5RedSpawnTimer--;
  if(special5PinkSpawnTimer<=0){special5SpawnMushroom('pink');special5PinkSpawnTimer=1200;}
  if(special5PurpleSpawnTimer<=0){special5SpawnMushroom('purple');special5PurpleSpawnTimer=2400;}
  if(special5RedSpawnTimer<=0){special5SpawnMushroom('red');special5RedSpawnTimer=3600;}

  const pickupRange=42;
  for(const type of ['pink','purple','red']){
    const arr=special5Mushrooms[type];
    for(let i=arr.length-1;i>=0;i--){
      const m=arr[i];
      if(!m.active)continue;
      const ds=Math.abs(wrappedSigned(m.s-special5S,special5World.circumference));
      const my=special5MushroomY(m);
      const close=ds<pickupRange && Math.abs((player.y+player.h/2)-(my-2))<52;
      if(!close)continue;
      m.active=false;arr.splice(i,1);
      if(type==='pink'){
        special5PinkPower=1200;special5PinkDamageUsed=false;special5FleeTimer=600;
      }else if(type==='purple'){
        player.health=Math.min(100,player.health+15);
      }else{
        special5RedPower=1200;
      }
      playBigSplat();
    }
  }
}
function special5SpawnRadialFireballs(count,speed,kind='radial'){
  const e=special5Explorer;
  const centerY=special5SurfaceY(e.s)-e.h/2+e.floatY;
  for(let i=0;i<count;i++){
    const a=(Math.PI*2*i/count)+e.spinAngle;
    e.fireballs.push({
      s:special5WorldS(e.s+Math.cos(a)*12),
      y:centerY+Math.sin(a)*12,
      vs:Math.cos(a)*speed,vy:Math.sin(a)*speed,life:900,age:0,phase:i*.71,kind
    });
  }
}
function special5LaunchRegularFireball(){
  const e=special5Explorer;
  const sy=special5SurfaceY(e.s)-e.h/2+e.floatY;
  const ds=wrappedSigned(special5S-e.s,special5World.circumference);
  const dx=ds,dy=(player.y+player.h/2)-sy,dist=Math.hypot(dx,dy)||1;
  e.fireballs.push({s:e.s,y:sy,vs:(dx/dist)*4.05,vy:(dy/dist)*4.05,life:1200,age:0,phase:0,kind:'regular'});
}
function special5LaunchGiantFireball(){
  const e=special5Explorer;
  const sy=special5SurfaceY(e.s)-e.h/2+e.floatY;
  const ds=wrappedSigned(special5S-e.s,special5World.circumference);
  const dx=ds,dy=(player.y+player.h/2)-sy,dist=Math.hypot(dx,dy)||1;
  e.fireballs.push({s:e.s,y:sy,vs:(dx/dist)*4.05,vy:(dy/dist)*4.05,life:5400,age:0,phase:0,kind:'giant',bounces:0});
  playSpecial5ExplorerSound();
}
function special5UpdateExplorer(){
  const e=special5Explorer;
  if(e.hitCooldown>0)e.hitCooldown--;
  if(e.explosionTimer>0){
    e.explosionTimer--;
    if(e.explosionTimer===0){
      if(e.evolutionState==='evolved-defeated'){
        special5EndBlackTimer=600;
        stopNormalMusic();stopBossMusic();stopLevel1BossMusic();stopLevel2BossMusic();stopLevel3BossMusic();stopLevel4BossMusic();
        try{stopSpecial5Music();}catch(e){}
      }else special5BeginEvolution();
    }
  }
  if(special5EndBlackTimer>0){
    special5EndBlackTimer--;
    if(special5EndBlackTimer===0){
      won=true;started=false;
      const end=document.getElementById('endScreen');if(end)end.style.display='flex';
      const ui=document.getElementById('bossUI');if(ui)ui.style.display='none';
    }
    updateHealthUI();
    return;
  }

  if(!e.active&&!e.evolved&&!e.defeated&&special5Travel>650){
    e.active=true;e.s=special5WorldS(special5S-500);e.fireTimer=1200;e.w=38;e.h=38;e.speed=.90;
    e.health=3;e.maxHealth=3;e.evolutionState='base';
    bossHealth=100;
    const bt=document.querySelector('#bossUI>div:first-child');if(bt)bt.textContent='BEACON OF MASCULINITY';
  }

  if(e.active&&!e.defeated){
    e.phase+=.055;
    const ds=wrappedSigned(special5S-e.s,special5World.circumference);
    const fleeingPink=(e.evolved&&special5FleeTimer>0);
    // During a charge, suspend normal tracking so the boss follows the locked straight-line charge path.
    if(e.chargeTimer<=0){
      const moveSpeed=e.evolved?(fleeingPink?0.99:1.98):(fleeingPink?0.45:0.90);
      if(Math.abs(ds)>28){
        const dir=fleeingPink?(ds>0?-1:1):(ds>0?1:-1);
        e.s=special5WorldS(e.s+dir*moveSpeed);
      }
    }
    if(e.evolved){
      e.floatY=-24-10*Math.sin(e.phase*.7);
      if(e.spinTimer>0){
        // Exactly five full rotations over the 150-frame spin, then return upright.
        e.spinAngle=(1-(e.spinTimer/150))*Math.PI*10;
      }
    }else e.floatY=0;
    e.s=special5WorldS(e.s);
    const ey=special5SurfaceY(e.s)-e.h+e.floatY;
    e.y=ey;

    if(e.evolved){
      if(e.special45Timer>0)e.special45Timer--;
      if(e.special70Timer>0)e.special70Timer--;
      if(e.special155Timer>0)e.special155Timer--;
      if(e.special200Timer>0)e.special200Timer--;
      // Special priority: 45s spin -> 70s sinusoidal burst -> 155s giant fireball -> 200s charge.
      // Only one special may begin at a time; overdue specials wait for the higher-priority one to finish.
      const specialBusy=e.spinTimer>0||e.chargeTimer>0;
      if(!specialBusy&&e.special45Timer<=0){
        e.spinTimer=150;e.spinAngle=0;
        special5SpawnRadialFireballs(15,4.05,'special');
        special5DustTimer=300;
        special5Shake=300;
        playSpecial5ExplorerSound();
        e.special45Timer=2700;
      }else if(!specialBusy&&e.special70Timer<=0){
        special5SpawnRadialFireballs(8,4.05,'sin');
        special5Shake=300;
        playSpecial5ExplorerSound();
        e.special70Timer=4200;
      }else if(!specialBusy&&e.special155Timer<=0){
        special5LaunchGiantFireball();
        special5Shake=300;
        e.special155Timer=9300;
      }else if(!specialBusy&&e.special200Timer<=0){
        // Lock onto the player's position at the instant the charge begins.
        const targetS=special5S,targetY=player.y+player.h/2;
        const dsCharge=wrappedSigned(targetS-e.s,special5World.circumference);
        const dyCharge=targetY-(special5SurfaceY(e.s)-e.h/2+e.floatY);
        const len=Math.hypot(dsCharge,dyCharge)||1;
        e.chargeDX=dsCharge/len;e.chargeDY=dyCharge/len;e.chargeTargetS=targetS;e.chargeTargetY=targetY;
        e.chargeTimer=300;
        special5DustTimer=300;
        special5Shake=300;
        playSpecial5ExplorerSound();
        e.special200Timer=12000;
      }
      if(e.spinTimer>0){
        e.spinTimer--;
        if(e.spinTimer===0){e.floatY=0;e.spinAngle=0;special5Shake=300;}
      }
      if(e.chargeTimer>0){
        e.chargeTimer--;
        // Charge in a straight line at double normal evolved speed.
        e.s=special5WorldS(e.s+e.chargeDX*3.6);
        e.floatY=-18;
        if(e.chargeTimer===0){e.floatY=0;special5Shake=300;}
      }
      if(e.fireTimer>0)e.fireTimer--;
      if(e.fireTimer<=0){
        special5LaunchRegularFireball();
        e.fireTimer=600;
      }
    }else{
      if(e.fireTimer>0)e.fireTimer--;
      if(e.fireTimer<=0){
        special5LaunchRegularFireball();
        e.fireTimer=1200;
      }
    }
  }

  if(e.evolved&&e.active&&!e.defeated&&e.chargeTimer>0&&special5BossHitCooldown===0){
    const dsChargeHit=Math.abs(wrappedSigned(e.s-special5S,special5World.circumference));
    const eyChargeHit=special5SurfaceY(e.s)-e.h+e.floatY;
    if(dsChargeHit<150&&Math.abs((player.y+player.h/2)-(eyChargeHit+e.h/2))<140){
      if(special5PinkPower<=0){
        player.health=Math.max(0,player.health-15);
        playSpecial5ExplorerSound();
        special5BossHitCooldown=45;
        playBigSplat();
      }
    }
  }

  for(let i=e.fireballs.length-1;i>=0;i--){
    const b=e.fireballs[i];b.age++;
    b.s=special5WorldS(b.s+b.vs);
    if(b.kind==='sin'){
      b.y+=b.vy+Math.sin(b.age*.22+b.phase)*3.2;
    }else{
      b.y+=b.vy;
    }
    if(b.kind==='giant'){
      b.vy+=.18;
      const ground=special5SurfaceY(b.s)-10;
      if(b.y>=ground&&b.vy>0){
        b.y=ground;b.vy=-Math.max(7.5,Math.abs(b.vy)*.82);b.bounces=(b.bounces||0)+1;
        special5Shake=210;
        if(b.bounces>=12)b.life=0;
      }
    }
    b.life--;
    const ds=wrappedSigned(b.s-special5S,special5World.circumference);
    const hit=Math.abs(ds)<(b.kind==='giant'?48:24)&&Math.abs(b.y-(player.y+player.h/2))<(b.kind==='giant'?58:28);
    if(hit){
      player.health=Math.max(0,player.health-(b.kind==='giant'?35:(e.evolved?15:10)));
      playSpecial5ExplorerSound();
      e.fireballs.splice(i,1);playBigSplat();continue;
    }
    if(b.life<=0||Math.abs(ds)>1100||b.y<-300||b.y>900)e.fireballs.splice(i,1);
  }

  if(e.active&&!e.defeated&&special5BossHitCooldown===0){
    const ds=Math.abs(wrappedSigned(e.s-special5S,special5World.circumference));
    const ey=special5SurfaceY(e.s)-e.h+e.floatY;
    if(ds<(e.evolved?150:60)&&Math.abs((player.y+player.h/2)-(ey+e.h/2))<(e.evolved?140:60)){
      // Pink/red powers damage the boss. Physical contact damages the player only without pink power.
      if(special5RedPower>0){special5DamageExplorer(2);special5RedPower=0;}
      else if(special5PinkPower>0){
        // Pink power makes the player immune to physical contact damage.
        // The mushroom can damage the boss only once per consumed pink mushroom.
        if(!special5PinkDamageUsed){special5DamageExplorer(1);special5PinkDamageUsed=true;}
      }else {
        const contactDamage=e.evolved?15:5;
        player.health=Math.max(0,player.health-contactDamage);
        playSpecial5ExplorerSound();
        special5BossHitCooldown=45;
        playBigSplat();
      }
    }
  }
}
function special5DrawMushroom(m,type){
  const ds=wrappedSigned(m.s-special5S,special5World.circumference);
  if(Math.abs(ds)>900)return;
  const x=W/2+ds,y=special5MushroomY(m)+Math.sin((Date.now()/170)+m.phase)*2;
  ctx.save();
  let cap='#ff62df', glow='#ff62df', stem='#ffe5fa';
  if(type==='purple'){cap='#a84cff';glow='#a84cff';stem='#f0ddff';}
  if(type==='red'){cap='#e83a32';glow='#ff3027';stem='#ffe2d8';}
  ctx.shadowColor=glow;ctx.shadowBlur=22;ctx.fillStyle=cap;
  ctx.beginPath();ctx.arc(x,y-10,22,Math.PI,0);ctx.lineTo(x+22,y-10);ctx.quadraticCurveTo(x,y+10,x-22,y-10);ctx.closePath();ctx.fill();
  ctx.shadowBlur=0;ctx.fillStyle=stem;ctx.fillRect(x-7,y-10,14,27);
  ctx.fillStyle='#fff';
  for(const [dx,dy] of [[-9,-15],[5,-20],[12,-7]]){ctx.beginPath();ctx.arc(x+dx,y+dy,4,0,Math.PI*2);ctx.fill();}
  ctx.restore();
}
const special5ExplorerSprite=new Image();
special5ExplorerSprite.src="assets/image_07.png";
const special5ExplorerEvolvedSprite=new Image();
special5ExplorerEvolvedSprite.src="assets/image_08.png";
function playSpecial5ExplorerSound(){
  try{
    let id;
    if(special5Explorer.evolved){
      const r=Math.random();
      id=r<1/3?'special5ExplorerSound':(r<2/3?'special5ExplorerDragonVoiceSound':'special5ExplorerThunderDragonSound');
    }else{
      id='special5ExplorerGrowlySound';
    }
    const a=document.getElementById(id);
    if(a){a.currentTime=0;a.volume=.9;a.play().catch(()=>{});}
  }catch(e){}
}
function playSpecial5EvolvedSound(){
  if(!special5Explorer.evolved)return;
  playSpecial5ExplorerSound();
}
function special5DrawExplorer(){
  const e=special5Explorer;
  if(!e.active&&!e.defeated&&e.explosionTimer<=0)return;
  const ds=wrappedSigned(e.s-special5S,special5World.circumference);
  const x=W/2+ds;
  if(Math.abs(ds)>1100)return;
  if(e.defeated&&e.explosionTimer>0){
    const explosionDuration=e.evolved?150:105; const elapsed=explosionDuration-e.explosionTimer,t=Math.min(1,elapsed/explosionDuration),r=e.evolved?(70+520*t):(35+250*t);
    ctx.save();ctx.globalAlpha=Math.max(0,e.explosionTimer/(e.evolved?150:105));
    const g=ctx.createRadialGradient(x,special5SurfaceY(e.s)-20,4,x,special5SurfaceY(e.s)-20,r);
    g.addColorStop(0,'#fffde0');g.addColorStop(.15,'#fff18a');g.addColorStop(.38,'#ffc52f');g.addColorStop(.68,'#ff6425');g.addColorStop(1,'rgba(180,25,10,0)');
    ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,special5SurfaceY(e.s)-20,r,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#ff9d32';
    for(let i=0;i<24;i++){
      const a=i*.47+elapsed*.08,rr=r*(.30+.68*((i*17)%13)/13);
      ctx.beginPath();ctx.arc(x+Math.cos(a)*rr,special5SurfaceY(e.s)-20+Math.sin(a)*rr,7+12*(1-t),0,Math.PI*2);ctx.fill();
    }
    ctx.restore();return;
  }
  const y=e.y;
  const cx=x+e.w/2,cy=y+e.h/2;
  ctx.save();
  if(e.evolved){
    const pulse=1+.045*Math.sin(Date.now()/95);
    ctx.globalAlpha=.34;ctx.fillStyle='#ff2b1d';ctx.shadowColor='#ff1e10';ctx.shadowBlur=55;
    ctx.beginPath();ctx.arc(cx,cy,115*pulse,0,Math.PI*2);ctx.fill();
    ctx.globalAlpha=.17;ctx.beginPath();ctx.arc(cx,cy,142*pulse,0,Math.PI*2);ctx.fill();
    ctx.globalAlpha=.98;ctx.shadowBlur=0;ctx.beginPath();ctx.arc(cx,cy,95,0,Math.PI*2);ctx.clip();
    // Rotate the actual evolved Explorer sprite during the spin attack.
    ctx.translate(cx,cy);
    ctx.rotate(e.spinTimer>0 ? e.spinAngle : 0);
    if(special5ExplorerEvolvedSprite.complete)ctx.drawImage(special5ExplorerEvolvedSprite,-e.w/2,-e.h/2,e.w,e.h);
    else{ctx.fillStyle='#6b392d';ctx.fillRect(-e.w/2,-e.h/2,e.w,e.h);}
    ctx.restore();
    ctx.save();ctx.strokeStyle='rgba(255,65,45,.9)';ctx.lineWidth=5;ctx.shadowColor='#ff2e1d';ctx.shadowBlur=18;ctx.beginPath();ctx.arc(cx,cy,97,0,Math.PI*2);ctx.stroke();
    if(e.spinTimer>0){
      ctx.translate(cx,cy);ctx.rotate(e.spinAngle);
      ctx.strokeStyle='rgba(255,220,160,.7)';ctx.lineWidth=3;ctx.beginPath();ctx.arc(0,0,108,0,Math.PI*1.45);ctx.stroke();
    }
    ctx.restore();
  }else{
    const pulse=1+.035*Math.sin(Date.now()/120);
    ctx.globalAlpha=.30;ctx.fillStyle='#ff3025';ctx.shadowColor='#ff2418';ctx.shadowBlur=30;
    ctx.beginPath();ctx.arc(cx,cy,47*pulse,0,Math.PI*2);ctx.fill();
    ctx.globalAlpha=.16;ctx.beginPath();ctx.arc(cx,cy,60*pulse,0,Math.PI*2);ctx.fill();
    ctx.globalAlpha=.98;ctx.shadowBlur=0;ctx.beginPath();ctx.arc(cx,cy,19,0,Math.PI*2);ctx.clip();
    if(special5ExplorerSprite.complete)ctx.drawImage(special5ExplorerSprite,x,y,e.w,e.h);
    else{ctx.fillStyle='#6b392d';ctx.fillRect(x,y,e.w,e.h);}
    ctx.restore();
    ctx.save();ctx.strokeStyle='rgba(255,75,55,.82)';ctx.lineWidth=2.5;ctx.shadowColor='#ff3b2b';ctx.shadowBlur=10;ctx.beginPath();ctx.arc(cx,cy,20,0,Math.PI*2);ctx.stroke();ctx.restore();
  }
  ctx.fillStyle='#fff0e5';ctx.font=e.evolved?'900 15px Arial':'900 11px Arial';ctx.textAlign='center';ctx.fillText(e.evolved?'BEACON OF MASCULINITY — EVOLVED':'BEACON OF MASCULINITY',cx,y-(e.evolved?16:10));
}
function special5DrawCombatUI(){
  const ui=document.getElementById('bossUI');
  const title=ui?ui.querySelector('div:first-child'):null;
  const fill=document.getElementById('bossFill'),txt=document.getElementById('bossText');
  const pct=(special5Explorer.health/Math.max(1,special5Explorer.maxHealth))*100;
  if(fill)fill.style.width=Math.max(0,Math.min(100,pct))+'%';
  if(txt)txt.textContent=Math.ceil(Math.max(0,pct))+'%';
  if(title)title.textContent='BEACON OF MASCULINITY';
  const taunt=document.getElementById('special5EvolutionTaunt');
  if(taunt)taunt.style.display=(special5Explorer.evolved?'block':'none');
  if(ui)ui.style.display=(currentLevel===105&&special5Explorer.active&&!won&&special5EndBlackTimer<=0)?'block':'none';
}

function special5Noise(n){
  const x=Math.sin(n*12.9898+special5World.terrainSeed)*43758.5453;
  return x-Math.floor(x);
}
function special5TerrainY(s){
  const u=s/special5World.circumference;
  return special5World.groundBase
    - 14*Math.sin(u*Math.PI*2*17+0.7)
    - 8*Math.sin(u*Math.PI*2*39+2.1)
    - 4*Math.sin(u*Math.PI*2*83+0.2);
}
function special5BuildTerrain(){
  special5World.rocks.length=0;
  special5World.dunes.length=0;
  const C=special5World.circumference;

  // Low rocks: their bases sit directly on the planetary surface.
  for(let i=0;i<170;i++){
    const s=(i+.5)*C/170;
    const r=14+special5Noise(i*4.3)*28;
    special5World.rocks.push({s,r,scale:.62+special5Noise(i*8.1)*.72,tilt:(special5Noise(i*2.7)-.5)*.35,kind:'rock'});
  }

  // Much larger cliffs/rocks, deliberately spaced out so they become major jump challenges.
  for(let i=0;i<26;i++){
    const s=(i+.23)*C/26 + (special5Noise(i*21.7)-.5)*180;
    const r=55+special5Noise(i*6.9)*72;
    const h=70+special5Noise(i*11.2)*105;
    special5World.rocks.push({s:((s%C)+C)%C,r,scale:.9+special5Noise(i*14.4)*.38,tilt:(special5Noise(i*3.8)-.5)*.22,kind:'cliff',h});
  }

  // Dunes are wide, shallow surface rises rather than floating decorative blobs.
  for(let i=0;i<78;i++){
    const s=(i+.35)*C/78;
    special5World.dunes.push({s,w:120+special5Noise(i*5.2)*250,h:12+special5Noise(i*9.7)*34});
  }
}
function special5ResetPlayer(){
  special5S=0;special5StartS=0;special5Completed=false;special5LoopCount=0;special5Travel=0;special5CameraX=0;special5DustTimer=0;special5Shake=0;
  player={x:0,y:special5TerrainY(0)-44,w:30,h:44,vx:0,vy:0,onGround:true,coyote:7,jumpBuffer:0,health:100,pooCooldown:0,evilCooldown:0};
  camX=0;started=false;won=false;
  special5BuildTerrain();
  special5ResetCombat();
  stopNormalMusic();stopBossMusic();stopLevel1BossMusic();stopLevel2BossMusic();stopLevel3BossMusic();stopLevel4BossMusic();
  try{stopSpecial1Music();}catch(e){}
  try{stopSpecial4Music();}catch(e){}
  try{stopSpecial5Music();}catch(e){}
  document.getElementById('bossUI').style.display='none';
  const pinkTimerUI=document.getElementById('pinkTimerUI');if(pinkTimerUI)pinkTimerUI.style.display='none';
  document.getElementById('stoodUI').style.display='none';
  const s4ui=document.getElementById('special4BossUI');if(s4ui)s4ui.style.display='none';
  document.getElementById('endScreen').style.display='none';
  document.getElementById('pooOverlay').classList.remove('show');
  document.getElementById('shroomText').classList.remove('show');
  msg.style.display='block';msg.innerHTML='<h1>MALICIOUS MARS</h1><p>Press SPACE to start</p>';
  updateHealthUI();
}
function resetSpecial5(){special5ResetPlayer(); const title=document.querySelector('#bossUI>div:first-child'); if(title) title.textContent='BEACON OF MASCULINITY';}
function special5WorldS(s){
  const C=special5World.circumference;
  return ((s%C)+C)%C;
}
function special5LocalY(s){
  // Player remains upright; this is the tangent-view gameplay surface.
  return special5SurfaceY(special5WorldS(s));
}
function special5SurfaceY(s){
  const ss=special5WorldS(s);
  let y=special5TerrainY(ss);
  // Dunes are part of the collision surface, so their feet stay flush with the ground.
  for(const d of special5World.dunes){
    const dist=Math.abs(wrappedSigned(d.s-ss,special5World.circumference));
    const half=d.w*.5;
    if(dist<half){
      const q=dist/half;
      const lift=d.h*0.5*(1+Math.cos(Math.PI*q));
      y-=lift;
    }
  }
  // Rocks/cliffs sit on the dune/ground surface and rise from it.
  for(const rock of special5World.rocks){
    const d=wrappedSigned(rock.s-ss,special5World.circumference);
    const width=rock.r*(rock.kind==='cliff'?1.15:1.05);
    if(Math.abs(d)<width){
      const q=d/width;
      const lift=(rock.kind==='cliff'?rock.h:rock.r*.70)*Math.sqrt(Math.max(0,1-q*q))*rock.scale;
      y=Math.min(y,special5TerrainY(rock.s)-lift);
    }
  }
  return y;
}
function updateSpecial5(){
  if(!started)return;
  if(special5Shake>0)special5Shake--;
  if(special5DustTimer>0)special5DustTimer--;
  const left=keys.KeyA||keys.ArrowLeft,right=keys.KeyD||keys.ArrowRight,jump=keys.Space||keys.ArrowUp;
  if(left)player.vx-=.10;
  if(right)player.vx+=.10;
  if(!left&&!right)player.vx*=.94;
  player.vx=Math.max(-2.25,Math.min(2.25,player.vx));
  if(jump)player.jumpBuffer=7;else player.jumpBuffer=Math.max(0,player.jumpBuffer-1);
  if(player.onGround)player.coyote=7;else player.coyote=Math.max(0,player.coyote-1);
  if(player.jumpBuffer>0&&player.coyote>0){player.vy=-12.5;player.onGround=false;player.coyote=0;player.jumpBuffer=0;}
  player.vy+=.20;player.vy=Math.min(player.vy,5);

  const oldS=special5S,oldY=player.y;
  const rawS=special5S+player.vx;
  const C=special5World.circumference;
  const wrappedForward=player.vx>0 && rawS>=C;
  special5S=((rawS%C)+C)%C;

  player.y+=player.vy;player.onGround=false;
  const surface=special5LocalY(special5S);
  const previousSurface=special5LocalY(oldS);
  if(player.vy>=0 && oldY+player.h<=previousSurface+10 && player.y+player.h>=surface){
    player.y=surface-player.h;player.vy=0;player.onGround=true;
  }
  player.x=special5S;

  if(player.vx>0)special5Travel+=player.vx;
  if(wrappedForward){
    special5Travel=C;
    special5LoopCount=1;
    special5Completed=true;
    // Keep the ending open: the planetary circuit is complete, but future
    // Mars Explorer evolution/ending logic can be inserted here.
  }

  special5CameraX=special5S-W/2;
  camX=special5CameraX;


  special5UpdateMushrooms();
  special5UpdateExplorer();

  if(player.y>780){
    // Standalone Special 5 respawn: restart at the planetary start without touching other levels.
    special5S=0;special5Travel=0;special5LoopCount=0;special5Completed=false;
    player.x=0;player.y=special5SurfaceY(0)-player.h;player.vx=0;player.vy=0;player.onGround=true;player.health=100;
    special5ResetCombat();
  }
  if(player.health<=0){
    special5S=0;special5Travel=0;special5LoopCount=0;special5Completed=false;
    player.x=0;player.y=special5SurfaceY(0)-player.h;player.vx=0;player.vy=0;player.onGround=true;player.health=100;
    special5ResetCombat();
  }
  updateHealthUI();
}

function special5DrawStars(){
  const C=special5World.circumference;
  ctx.fillStyle='#0a0710';ctx.fillRect(0,0,W,H);
  // Deep brown Mars-tinted space.
  const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'#110c15');g.addColorStop(.48,'#24131a');g.addColorStop(1,'#3a1e1c');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
  ctx.save();
  for(let i=0;i<150;i++){
    const seed=i*17.17;
    const x=((seed*73.7)%W+W)%W;
    const y=18+((seed*31.3)%(H-95));
    const r=.6+((seed*7.1)%2.2);
    ctx.globalAlpha=.35+((seed*3.7)%55)/100;
    ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();
  }
  // Faint dust-coloured nebula bands.
  ctx.globalAlpha=.14;ctx.fillStyle='#b05b39';
  for(let i=0;i<5;i++){ctx.beginPath();ctx.ellipse(120+i*280,210+i*42,210,32,(-.18+i*.08),0,Math.PI*2);ctx.fill();}
  ctx.restore();
}
function special5PlanetRadius(){return 365;}
function special5DrawPlanet(){
  // The visible planet is centred below the route. Its apparent edge is huge,
  // so the player looks like they are walking around an entire world.
  const cx=W/2,cy=1010,r=special5PlanetRadius();
  ctx.save();
  const atmo=ctx.createRadialGradient(cx-75,cy-120,40,cx,cy,r+55);
  atmo.addColorStop(0,'#c76f3c');atmo.addColorStop(.55,'#9b4c2d');atmo.addColorStop(.84,'#673026');atmo.addColorStop(1,'rgba(67,25,23,0)');
  ctx.fillStyle=atmo;ctx.beginPath();ctx.arc(cx,cy,r+52,0,Math.PI*2);ctx.fill();
  const mars=ctx.createRadialGradient(cx-90,cy-135,30,cx,cy,r);
  mars.addColorStop(0,'#d68143');mars.addColorStop(.45,'#a95731');mars.addColorStop(.8,'#7d3c29');mars.addColorStop(1,'#4e2724');
  ctx.fillStyle=mars;ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.fill();
  ctx.save();ctx.clip();
  ctx.globalAlpha=.23;ctx.fillStyle='#3d211d';
  for(let i=0;i<34;i++){
    const a=i*2.399;const rr=60+((i*97)%260);const x=cx+Math.cos(a)*rr,y=cy+Math.sin(a)*rr*.72;const cr=9+((i*17)%24);
    ctx.beginPath();ctx.arc(x,y,cr,0,Math.PI*2);ctx.fill();
  }
  ctx.globalAlpha=.12;ctx.strokeStyle='#efaa69';ctx.lineWidth=8;
  for(let i=0;i<12;i++){ctx.beginPath();ctx.arc(cx,cy,90+i*23,.2+i*.03,1.2+i*.07);ctx.stroke();}
  ctx.restore();
  ctx.globalAlpha=.42;ctx.strokeStyle='#e68a50';ctx.lineWidth=5;ctx.beginPath();ctx.arc(cx,cy,r+5,0,Math.PI*2);ctx.stroke();
  ctx.restore();
}
function special5DrawTerrain(){
  const C=special5World.circumference;
  const visible=1650;
  const start=special5S-visible/2;
  ctx.save();
  // Main ground body.
  ctx.beginPath();ctx.moveTo(0,H);ctx.lineTo(0,special5LocalY(start));
  for(let i=0;i<=Math.ceil(W/14);i++){
    const sx=start+i*14;ctx.lineTo(i*14,special5LocalY(sx));
  }
  ctx.lineTo(W,H);ctx.closePath();
  const tg=ctx.createLinearGradient(0,440,0,H);tg.addColorStop(0,'#c8753d');tg.addColorStop(.40,'#9d4f2d');tg.addColorStop(1,'#5b2b24');ctx.fillStyle=tg;ctx.fill();

  // Subtle ground ridge line follows the real collision surface.
  ctx.strokeStyle='#e18a4a';ctx.lineWidth=4;ctx.beginPath();
  for(let i=0;i<=Math.ceil(W/10);i++){const sx=start+i*10;const yy=special5LocalY(sx);if(i===0)ctx.moveTo(i*10,yy);else ctx.lineTo(i*10,yy);}ctx.stroke();

  // Wide dunes are drawn directly into the ground, with their bottoms hidden by the surface.
  for(const d of special5World.dunes){
    const ds=wrappedSigned(d.s-special5S,C);if(Math.abs(ds)>900)continue;
    const x=W/2+ds;
    const y=special5TerrainY(d.s);
    const half=d.w*.5;
    ctx.save();ctx.globalAlpha=.55;ctx.fillStyle='#d58a4d';
    ctx.beginPath();ctx.moveTo(x-half,y+4);
    ctx.quadraticCurveTo(x-half*.35,y-d.h,x,y-d.h*.65);
    ctx.quadraticCurveTo(x+half*.45,y-d.h*.2,x+half,y+4);
    ctx.closePath();ctx.fill();ctx.restore();
  }

  // Rocks and major cliffs share the same base surface, so there are no floating rocks.
  for(const rock of special5World.rocks){
    const ds=wrappedSigned(rock.s-special5S,C);if(Math.abs(ds)>900)continue;
    const x=W/2+ds,y=special5TerrainY(rock.s);
    ctx.save();ctx.translate(x,y);ctx.rotate(rock.tilt);ctx.scale(rock.scale,rock.scale);
    if(rock.kind==='cliff'){
      const r=rock.r,h=rock.h;
      ctx.fillStyle='#4e2925';ctx.beginPath();
      ctx.moveTo(-r,3);ctx.lineTo(-r*.86,-h*.55);ctx.lineTo(-r*.38,-h);ctx.lineTo(r*.20,-h*.82);ctx.lineTo(r*.86,-h*.34);ctx.lineTo(r,3);ctx.closePath();ctx.fill();
      ctx.fillStyle='#8e4b31';ctx.beginPath();
      ctx.moveTo(-r*.86,-h*.55);ctx.lineTo(-r*.38,-h);ctx.lineTo(-r*.05,-h*.55);ctx.lineTo(r*.2,-h*.82);ctx.lineTo(r*.08,-h*.25);ctx.lineTo(-r*.4,-h*.12);ctx.closePath();ctx.fill();
      ctx.fillStyle='#b8693b';ctx.beginPath();ctx.moveTo(-r*.32,-h*.86);ctx.lineTo(-r*.08,-h*.98);ctx.lineTo(r*.14,-h*.78);ctx.lineTo(r*.02,-h*.56);ctx.closePath();ctx.fill();
    }else{
      const r=rock.r;
      ctx.fillStyle='#5a3028';ctx.beginPath();ctx.moveTo(-r,2);ctx.lineTo(-r*.55,-r*.75);ctx.lineTo(r*.35,-r);ctx.lineTo(r,2);ctx.closePath();ctx.fill();
      ctx.fillStyle='#8d4b32';ctx.beginPath();ctx.moveTo(-r*.55,-r*.75);ctx.lineTo(r*.35,-r);ctx.lineTo(r*.05,-r*.25);ctx.closePath();ctx.fill();
    }
    ctx.restore();
  }
  ctx.restore();
}
function wrappedSigned(d,C){let x=d%C;if(x>C/2)x-=C;if(x<-C/2)x+=C;return x;}
function drawSpecial5(){
  ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,W,H);
  if(special5Shake>0){const shake=Math.max(0,special5Shake/300)*34;ctx.translate((Math.random()-.5)*shake,(Math.random()-.5)*shake);}
  special5DrawStars();
  special5DrawPlanet();
  special5DrawTerrain();
  for(const m of special5Mushrooms.pink)special5DrawMushroom(m,'pink');
  for(const m of special5Mushrooms.purple)special5DrawMushroom(m,'purple');
  for(const m of special5Mushrooms.red)special5DrawMushroom(m,'red');
  // Explorer fireballs use the same circular world coordinate system as the player.
  for(const b of special5Explorer.fireballs){
    const ds=wrappedSigned(b.s-special5S,special5World.circumference);if(Math.abs(ds)>1100)continue;
    const x=W/2+ds,y=b.y,rad=b.kind==='giant'?42:15;ctx.save();
    const g=ctx.createRadialGradient(x,y,2,x,y,rad);
    g.addColorStop(0,'#fff7b0');g.addColorStop(.22,'#ffd33b');g.addColorStop(.55,'#ff6728');g.addColorStop(.82,'#ff2c16');g.addColorStop(1,'rgba(180,20,10,0)');
    ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,rad,0,Math.PI*2);ctx.fill();
    if(b.kind==='giant'){
      ctx.strokeStyle='rgba(255,185,70,.9)';ctx.lineWidth=8;ctx.shadowColor='#ff5a20';ctx.shadowBlur=18;
      ctx.beginPath();ctx.arc(x,y,rad*.75,0,Math.PI*2);ctx.stroke();
    }
    ctx.restore();
  }
  special5DrawExplorer();
  drawPlayer();
  if(special5DustTimer>0){ctx.save();ctx.fillStyle='rgba(116,72,38,.38)';ctx.fillRect(-20,-20,W+40,H+40);ctx.restore();}
  if(special5EndBlackTimer>0){ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.fillStyle='#000';ctx.fillRect(0,0,W,H);ctx.restore();}
  special5DrawCombatUI();
  // Circular-route progress indicator.
  ctx.save();ctx.font='900 15px Arial';ctx.textAlign='center';ctx.textBaseline='top';
  ctx.fillStyle='rgba(20,8,10,.65)';ctx.fillRect(W/2-235,646,470,38);
  ctx.fillStyle='#ffe1b5';ctx.fillText('MALICIOUS MARS — PLANETARY CIRCUIT',W/2,651);
  ctx.fillStyle='rgba(255,255,255,.28)';ctx.fillRect(W/2-210,674,420,7);
  ctx.fillStyle='#d9793d';ctx.fillRect(W/2-210,674,420*Math.min(1,special5Travel/special5World.circumference),7);
  ctx.restore();
}

function update(){
 if(!started||won)return;
 if(bossEntryInvuln>0)bossEntryInvuln--;
 if(currentLevel===1){ updateLevel1(); return; }
 if(currentLevel===2){ updateLevel2(); return; }
 if(currentLevel===3){ updateLevel3(); return; }
 if(currentLevel===4){ updateLevel4(); return; }
 if(currentLevel===101){ updateSpecial1(); return; }
 if(currentLevel===102){ updateSpecial2(); return; }
 if(currentLevel===103){ updateSpecial3(); return; }
 if(currentLevel===104){ updateSpecial4(); return; }
 if(currentLevel===105){ updateSpecial5(); return; }
 const left=keys.KeyA||keys.ArrowLeft, right=keys.KeyD||keys.ArrowRight;
 const jump=keys.Space||keys.ArrowUp;
 if(left)player.vx-=0.10;
 if(right)player.vx+=0.10;
 if(!left&&!right)player.vx*=0.94;
 player.vx=Math.max(-1.65,Math.min(1.65,player.vx));
 if(jump)player.jumpBuffer=7;else player.jumpBuffer=Math.max(0,player.jumpBuffer-1);
 if(player.onGround)player.coyote=7;else player.coyote=Math.max(0,player.coyote-1);
 if(player.jumpBuffer>0&&player.coyote>0){player.vy=-12.5;player.onGround=false;player.coyote=0;player.jumpBuffer=0;}
 player.vy+=0.20;player.vy=Math.min(player.vy,5);
 const oldY=player.y;
 player.x+=player.vx;player.y+=player.vy;player.onGround=false;
 for(const p of platforms){
   if(player.x+player.w>p.x&&player.x<p.x+p.w&&oldY+player.h<=p.y&&player.y+player.h>=p.y&&player.vy>=0){player.y=p.y-player.h;player.vy=0;player.onGround=true;}
 }
 if(bossActive||bossDefeated){
   for(const p of bossPlatforms){
     if(player.x+player.w>p.x&&player.x<p.x+p.w&&oldY+player.h<=p.y&&player.y+player.h>=p.y&&player.vy>=0){player.y=p.y-player.h;player.vy=0;player.onGround=true;}
   }
 }
 if(player.x<0){player.x=0;player.vx=0;}
 if(player.y>760){reset();started=true;msg.style.display='none';}

 // Normal section: all original interactions remain active.
 if(!bossActive&&!bossDefeated&&!evilGoon.active&&Math.abs(player.vx)>0.05){evilGoon.active=true;evilGoon.x=player.x-180;evilGoon.y=player.y-15;}
 if(!bossActive&&!bossDefeated&&evilGoon.active){
   evilGoon.phase+=0.035;
   const dx=(player.x+player.w/2)-(evilGoon.x+evilGoon.w/2);
   const dy=(player.y+player.h/2)-(evilGoon.y+evilGoon.h/2);
   const d=Math.hypot(dx,dy)||1;
   const speed=1.35;
   evilGoon.x+=(dx/d)*speed;evilGoon.y+=(dy/d)*speed;
   if(witchCooldown>0)witchCooldown--;if(player.evilCooldown>0)player.evilCooldown--;
   if(bossEntryInvuln===0&&player.evilCooldown===0&&rectHit(player,evilGoon)){playEmbeddedSound('level5ParkourHitSound');player.health=Math.max(0,player.health-20);player.evilCooldown=90;}
 }

 // Evil Goon can throw snowballs throughout the entire game, not just the boss fight.
 if(evilGoon.active&&!bossDefeated){
   snowballTimer--;
   if(snowballTimer<=0){
     const sx=evilGoon.x+38,sy=evilGoon.y+38,tx=player.x+15,ty=player.y+22,sdx=tx-sx,sdy=ty-sy;
     const dist=Math.hypot(sdx,sdy)||1,snowSpeed=4.05;
     snowballs.push({x:sx,y:sy,vx:(sdx/dist)*snowSpeed,vy:(sdy/dist)*snowSpeed,life:1200});
     snowballTimer=600;
   }
   // Move launched snowballs in a straight line; they never home in.
   const arenaGroundY=500;
   for(let i=snowballs.length-1;i>=0;i--){
     const b=snowballs[i]; b.x+=b.vx; b.y+=b.vy; b.life--;
     const hitPlayer=player.x<b.x+17&&player.x+player.w>b.x-17&&player.y<b.y+17&&player.y+player.h>b.y-17;
     const hitGround = bossActive ? b.y>=arenaGroundY : b.y>=760;
     if(hitPlayer&&bossEntryInvuln===0){
       player.health=Math.max(0,player.health-10);
       player.evilCooldown=45;
       playEmbeddedSound('snowSplashSound');
       snowballs.splice(i,1);
       continue;
     }
     if(hitGround||b.life<=0||b.x<-500||b.x>14000||b.y<-500||b.y>900) snowballs.splice(i,1);
   }
 }

 // Level 5 parkour spikes: each white spike deals 50% damage.
 if(currentLevel===5&&!bossActive&&!bossDefeated&&player.pooCooldown===0){
   for(const sp of level5Spikes){
     if(player.x+player.w>sp.x-7&&player.x<sp.x+7&&player.y+player.h>sp.y-18&&player.y<sp.y){
       player.health=Math.max(0,player.health-50);
       player.pooCooldown=45;
       break;
     }
   }
 }

 // Carnivorous plant in the first stage: it occasionally lashes down from the ceiling.
 if(!bossActive&&!bossDefeated){
   carnivorousPlant.phase=(carnivorousPlant.phase+1)%1260;
   if(carnivorousPlant.hitCooldown>0)carnivorousPlant.hitCooldown--;
   const cp=carnivorousPlant.phase;
   const active=(cp>=630&&cp<1110);
   const progress=cp<630?0:(cp<780?(cp-630)/150:1-(cp-780)/210);
   const plantLength=Math.max(0,Math.min(1,progress));
   const tipY=-12+plantLength*622;
   if(active&&carnivorousPlant.hitCooldown===0){
     const dx=Math.abs((player.x+player.w/2)-carnivorousPlant.x);
     const mouthHit=Math.hypot((player.x+player.w/2)-carnivorousPlant.x,(player.y+player.h/2)-tipY)<42;
     const vineHit=dx<18 && player.y<tipY+42 && player.y+player.h>100;
     if(mouthHit||vineHit){
       player.health=Math.max(0,player.health-15);
       carnivorousPlant.hitCooldown=60;
       playEmbeddedSound('plantHitSound');
     }
   }
 }

 if(pooTimer>0){pooTimer--;if(pooTimer===0)document.getElementById('pooOverlay').classList.remove('show');}
 if(player.pooCooldown>0)player.pooCooldown--;
 for(const p of poos){
   if(!p.hit&&player.pooCooldown===0&&Math.hypot(player.x+15-p.x,player.y+22-p.y)<38){
     p.hit=true;pooTimer=300;player.health=Math.max(0,player.health-10);player.pooCooldown=45;
     document.getElementById('pooOverlay').classList.add('show');playEmbeddedSound('pooSplashSound');
   }
 }
 for(const s of goonshrooms){
   if(!s.active&&Math.hypot(player.x+15-s.x,player.y+22-s.y)<48){
     s.active=true;player.health=Math.min(100,player.health+10);rainbowTimer=900;shroomTextTimer=300;
     playGoonshroomSplat();playBigSplat();showGoonshroomText();
   }
 }

 // Enter the final platform: the Evil Goon follows you into the boss arena.
 if(!bossActive&&!bossDefeated&&player.x+player.w>11410){
   bossActive=true;startBossEntryInvulnerability();bossHealth=100;bossHitThisPower=false;flagVisible=false;pinkSpawnCount=0;resetBossPurpleMushrooms();miniGoonNextThresholdIndex=0;miniGoonHealth=100;miniGoon.active=false;miniGoon.hitCooldown=0;stoodHealth=100;stoodSpawned=false;stood.active=false;stood.hitCooldown=0;stood.phase=0;stoodSlimeTimer=1200;stoodSlimeBalls.length=0;
   snowballs.length=0;snowballTimer=600;bossMushroom.active=false;bossMushroom.respawnTimer=0;bossPowerTimer=0;bossHitThisPower=false;spawnBossMushroom();startBossMusic();updateBossUI();updateStoodUI();
 }

 if(bossActive&&!won){
   evilGoon.active=true;evilGoon.phase+=0.035;
   const dx=(player.x+player.w/2)-(evilGoon.x+evilGoon.w/2);
   const dy=(player.y+player.h/2)-(evilGoon.y+evilGoon.h/2);
   const d=Math.hypot(dx,dy)||1;
   const normalSpeed=1.35;
   const arenaLeft=11400,arenaRight=13400,arenaGroundY=500;
   if(bossPowerTimer>0){
     evilGoon.x+=(-dx/d)*normalSpeed;evilGoon.y+=(-dy/d)*normalSpeed;
     bossPowerTimer--;
     if(!bossHitThisPower){
       // Level 5 pink-mushroom power: every active boss/enemy can be damaged by direct contact.
       // Mini Goon takes 50% (2 hits), STOOD takes 25% (4 hits), Evil Goon takes 5% (20 hits).
       // Prioritise the enemy actually touched by the powered player.
       if(miniGoon.active && rectHit(player,miniGoon)){
         miniGoonHealth=Math.max(0,miniGoonHealth-50);
         if(miniGoonHealth<=0)miniGoon.active=false;
         bossHitThisPower=true;playBigSplat();
       }else if(stood.active && rectHit(player,stood)){
         stoodHealth=Math.max(0,stoodHealth-25);
         if(stoodHealth<=0)stood.active=false;
         bossHitThisPower=true;playBigSplat();updateStoodUI();
       }else if(rectHit(player,evilGoon)){
         bossHealth=Math.max(0,bossHealth-12.5);bossHitThisPower=true;playBigSplat();
       }
     }
   }else{
     evilGoon.x+=(dx/d)*normalSpeed;evilGoon.y+=(dy/d)*normalSpeed;
     if(player.evilCooldown>0)player.evilCooldown--;
     if(player.evilCooldown===0&&rectHit(player,evilGoon)){
       player.health=Math.max(0,player.health-20);player.evilCooldown=90;
       playEmbeddedSound(Math.random()<0.5?'bossGrowl1':'bossGrowl2');
     }
   }
   // Keep the boss inside the arena and never below its floor.
   evilGoon.x=Math.max(arenaLeft,Math.min(arenaRight-evilGoon.w,evilGoon.x));
   if(evilGoon.y+evilGoon.h>arenaGroundY)evilGoon.y=arenaGroundY-evilGoon.h;
   if(evilGoon.y<80)evilGoon.y=80;

   if(bossPowerTimer===0&&bossHitThisPower)bossHitThisPower=false;
   if(bossMushroom.active&&bossHealth>0&&Math.hypot(player.x+15-bossMushroom.x,player.y+22-bossMushroom.y)<48){
     bossMushroom.active=false;bossPowerTimer=1200;bossHitThisPower=false;bossMushroom.respawnTimer=0; // 20-second power; next mushroom appears when the power expires
   }
   if(bossPowerTimer===0&&!bossMushroom.active&&bossHealth>0&&!bossHitThisPower){
     spawnBossMushroom();
   }

   // Purple healing mushrooms appear after every third pink mushroom spawn and remain until eaten.
   for(let i=bossPurpleMushrooms.length-1;i>=0;i--){
     const pm=bossPurpleMushrooms[i];
     if(Math.hypot(player.x+30-pm.x,player.y+22-pm.y)<44){
       player.health=Math.min(100,player.health+30);
       bossPurpleMushrooms.splice(i,1);
       playGoonshroomSplat();
     }
   }

   // At 80%, 60%, 40%, 20% and 10% health, spawn a Mini Goon.
   // The active Mini Goon must be defeated before another pink-mushroom hit can damage the boss.
   if(!miniGoon.active&&miniGoonNextThresholdIndex<miniGoonThresholds.length&&bossHealth<=miniGoonThresholds[miniGoonNextThresholdIndex]){
     miniGoon.platformIndex=Math.floor(Math.random()*bossPlatforms.length);
     const mp=bossPlatforms[miniGoon.platformIndex];
     miniGoon.x=mp.x+mp.w/2-miniGoon.w/2;miniGoon.y=mp.y-miniGoon.h;miniGoon.hitCooldown=0;miniGoon.phase=0;miniGoonSoundTimer=1200;miniGoonHealth=100;miniGoon.active=true;
     miniGoonNextThresholdIndex++;
   }
   if(miniGoon.active&&!won){
     miniGoon.phase+=0.06;
     const targetX=player.x+player.w/2;
     const targetY=player.y+player.h/2;
     const miniSpeed=0.45;
     const mdx=targetX-(miniGoon.x+miniGoon.w/2);
     const mdy=targetY-(miniGoon.y+miniGoon.h/2);
     const md=Math.hypot(mdx,mdy)||1;
     // Like the Evil Goon, the Mini Goon can leave its starting platform and follow the player freely.
     if(md>2){ miniGoon.x+=(mdx/md)*miniSpeed; miniGoon.y+=(mdy/md)*miniSpeed; }
     const arenaLeft=11400,arenaRight=13400,arenaGroundY=500;
     miniGoon.x=Math.max(arenaLeft,Math.min(arenaRight-miniGoon.w,miniGoon.x));
     if(miniGoon.y+miniGoon.h>arenaGroundY)miniGoon.y=arenaGroundY-miniGoon.h;
     if(miniGoon.y<80)miniGoon.y=80;
     if(miniGoon.hitCooldown>0)miniGoon.hitCooldown--;
     if(bossEntryInvuln===0&&miniGoon.hitCooldown===0&&rectHit(player,miniGoon)){
       player.health=Math.max(0,player.health-5);
       miniGoon.hitCooldown=50;
     }
     miniGoonSoundTimer--;
     if(miniGoonSoundTimer<=0){ playMiniGoonSound(); miniGoonSoundTimer=1200; }
   }

   // Stood spawns once when Evil Goon reaches 25% health.
   if(!stoodSpawned&&bossHealth<=25){
     stoodSpawned=true;
     stoodHealth=100;
     stood.active=true;
     stood.hitCooldown=0;
     stood.phase=0;
     stoodSlimeTimer=1200;
     // Spawn well away from the player, inside the boss arena.
     stood.x=(player.x<12400)?12950:11780;
     stood.y=500-stood.h;
     stoodSlimeBalls.length=0;
     playStoodHiss();
     updateStoodUI();
   }

   // Stood: stronger Mini Goon-style pursuer with slower green slime shots.
   if(stood.active&&!won){
     stood.phase+=0.05;
     const sdx=(player.x+player.w/2)-(stood.x+stood.w/2);
     const sdy=(player.y+player.h/2)-(stood.y+stood.h/2);
     const sd=Math.hypot(sdx,sdy)||1;
     const stoodSpeed=0.45;
     if(sd>2){stood.x+=(sdx/sd)*stoodSpeed;stood.y+=(sdy/sd)*stoodSpeed;}
     const arenaLeft=11400,arenaRight=13400,arenaGroundY=500;
     stood.x=Math.max(arenaLeft,Math.min(arenaRight-stood.w,stood.x));
     if(stood.y+stood.h>arenaGroundY)stood.y=arenaGroundY-stood.h;
     if(stood.y<80)stood.y=80;

     if(stood.hitCooldown>0)stood.hitCooldown--;
     if(bossEntryInvuln===0&&stood.hitCooldown===0&&rectHit(player,stood)){
       player.health=Math.max(0,player.health-5);
       player.evilCooldown=45;
       stood.hitCooldown=50;
       playStoodHiss();
     }

     stoodSlimeTimer--;
     if(stoodSlimeTimer<=0){
       const sx=stood.x+stood.w/2, sy=stood.y+stood.h/2;
       const tdx=(player.x+player.w/2)-sx, tdy=(player.y+player.h/2)-sy;
       const td=Math.hypot(tdx,tdy)||1;
       const slimeSpeed=4.05*0.5;
       stoodSlimeBalls.push({x:sx,y:sy,vx:(tdx/td)*slimeSpeed,vy:(tdy/td)*slimeSpeed,life:1200});
       stoodSlimeTimer=1200; // half the Evil Goon's firing frequency (600 -> 1200 frames)
     }
   }

   // Move Stood's green slime balls at half the Evil Goon snowball speed.
   for(let i=stoodSlimeBalls.length-1;i>=0;i--){
     const b=stoodSlimeBalls[i];
     b.x+=b.vx;b.y+=b.vy;b.life--;
     const hitPlayer=player.x+player.w>b.x-15&&player.x<b.x+15&&player.y+player.h>b.y-15&&player.y<b.y+15;
     if(hitPlayer){
       player.health=Math.max(0,player.health-10);
       player.evilCooldown=45;
       playStoodHiss();
       stoodSlimeBalls.splice(i,1);
       continue;
     }
     if(b.life<=0||b.x<11400||b.x>13400||b.y<60||b.y>700) stoodSlimeBalls.splice(i,1);
   }

   if(bossHealth<=0){bossActive=false;bossDefeated=true;evilGoon.active=false;miniGoon.active=false;miniGoonHealth=0;stood.active=false;stoodHealth=0;stoodSlimeBalls.length=0;snowballs.length=0;bossMushroom.active=false;bossMushroom.respawnTimer=0;bossPowerTimer=0;resetBossPurpleMushrooms();stopBossMusic();flagVisible=true;updateStoodUI();}
 }
 if(flagVisible&&!won&&player.x+player.w>13220&&player.x<13390){
   won=true;started=false;stopBossMusic();document.getElementById('bossUI').style.display='none';document.getElementById('endScreen').style.display='flex';
 }
 if(rainbowTimer>0)rainbowTimer--;
 if(shroomTextTimer>0){shroomTextTimer--;if(shroomTextTimer===0)document.getElementById('shroomText').classList.remove('show');}
 updateHealthUI();updateBossUI();updateStoodUI();
 camX+=((player.x-350)-camX)*0.075;camX=Math.max(0,Math.min(12850,camX));
 hud.innerHTML=`DISTANCE: ${Math.max(0,Math.floor(player.x/10))} m`;
}

function drawBackground(){
 if(bossActive){
   const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'#16070b');g.addColorStop(.58,'#241016');g.addColorStop(1,'#3a0b0d');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
   // Blackened stone/brick arena walls.
   ctx.fillStyle='#17151a';ctx.fillRect(0,0,W,610);
   ctx.strokeStyle='#34303a';ctx.lineWidth=4;
   for(let yy=50;yy<590;yy+=58){ctx.beginPath();ctx.moveTo(0,yy);ctx.lineTo(W,yy);ctx.stroke();}
   for(let yy=0;yy<590;yy+=116){for(let xx=-((camX*.35+yy*2)%116);xx<W;xx+=116){ctx.beginPath();ctx.moveTo(xx,yy);ctx.lineTo(xx,yy+58);ctx.stroke();}}
   // Lava glow under the arena.
   ctx.fillStyle='#5a0909';ctx.fillRect(0,610,W,90);ctx.fillStyle='#ff3b00';
   for(let i=0;i<11;i++){const x=i*150-(camX*.45%150);ctx.beginPath();ctx.ellipse(x,655,90,18,0,0,Math.PI*2);ctx.fill();}
   // Bones in the background.
   ctx.strokeStyle='#c9c1aa';ctx.lineWidth=6;
   for(let i=0;i<9;i++){const x=i*175-(camX*.32%175)+40,y=530-(i%3)*95;ctx.beginPath();ctx.moveTo(x-32,y+22);ctx.lineTo(x+32,y-22);ctx.stroke();for(const s of [-1,1]){ctx.beginPath();ctx.moveTo(x+s*28,y-s*19);ctx.lineTo(x+s*40,y-s*31);ctx.stroke();ctx.beginPath();ctx.moveTo(x+s*24,y-s*23);ctx.lineTo(x+s*36,y-s*11);ctx.stroke();}}
   // Red haze and faint embers.
   ctx.fillStyle='#ff2a2a';for(let i=0;i<18;i++){const x=i*91-(camX*.18%91),y=100+(i*73%450);ctx.globalAlpha=.22;ctx.fillRect(x,y,4,4);}ctx.globalAlpha=1;
   return;
 }

 const g=ctx.createLinearGradient(0,0,0,H);
 g.addColorStop(0,"#69c9ff");g.addColorStop(0.62,"#b9e8ff");g.addColorStop(1,"#eaf8ff");
 ctx.fillStyle=g;ctx.fillRect(0,0,W,H);

 // Solid jungle-green lower background to eliminate any visible sky beneath the scenery.
 ctx.fillStyle="#2d7545";
 ctx.fillRect(0,500,W,200);
 // Layered jungle silhouettes over the green base.
 ctx.fillStyle="#235c38";
 for(let i=-1;i<12;i++){
   const x=i*170-(camX*.25%170);
   ctx.beginPath();
   ctx.arc(x,590,95,Math.PI,Math.PI*2);
   ctx.fill();
 }

 // Rainbow sky after a Goonshroom is activated.
 if(rainbowTimer>0){
   ctx.save();
   ctx.globalAlpha=0.28;
   const bands=["#ff4d5d","#ff9d3d","#ffe35a","#63d96b","#54b9ff","#7b6cff"];
   for(let i=0;i<bands.length;i++){
     ctx.fillStyle=bands[i];
     ctx.beginPath();
     ctx.arc(600,-40,760-i*58,0,Math.PI);
     ctx.lineWidth=48;
     ctx.strokeStyle=bands[i];
     ctx.stroke();
   }
   ctx.restore();
 }

 // Sun
 ctx.fillStyle="#ffe89a";ctx.beginPath();ctx.arc(1015,105,55,0,Math.PI*2);ctx.fill();

 // Distant hills
 ctx.fillStyle="#91c8b1";
 for(let i=-1;i<9;i++){
   const x=i*230-(camX*.16%230);
   ctx.beginPath();ctx.moveTo(x,530);ctx.lineTo(x+115,335);ctx.lineTo(x+230,530);ctx.closePath();ctx.fill();
 }

 // Castle in the distance — layered so it feels far behind the course.
 const cx=610-(camX*.28);
 const baseY=485;
 ctx.fillStyle="#77818c";
 ctx.fillRect(cx-190,baseY-135,380,135);

 // Castle towers
 for(const tx of [cx-175,cx+125]){
   ctx.fillStyle="#68737e";
   ctx.fillRect(tx,baseY-205,50,205);
   ctx.fillStyle="#59646f";
   ctx.beginPath();
   ctx.moveTo(tx-8,baseY-205);ctx.lineTo(tx+25,baseY-245);ctx.lineTo(tx+58,baseY-205);ctx.closePath();ctx.fill();
   // battlements
   ctx.fillStyle="#77818c";
   for(let i=0;i<4;i++)ctx.fillRect(tx+i*15,baseY-220,10,15);
   // windows
   ctx.fillStyle="#283746";
   ctx.fillRect(tx+18,baseY-165,13,25);
   ctx.fillRect(tx+18,baseY-95,13,25);
 }

 // Main castle battlements
 ctx.fillStyle="#838d97";
 for(let i=0;i<13;i++)ctx.fillRect(cx-190+i*30,baseY-150,18,18);

 // Central keep
 ctx.fillStyle="#858f99";
 ctx.fillRect(cx-65,baseY-225,130,225);
 ctx.fillStyle="#68737e";
 ctx.beginPath();
 ctx.moveTo(cx-78,baseY-225);ctx.lineTo(cx,baseY-275);ctx.lineTo(cx+78,baseY-225);ctx.closePath();ctx.fill();
 // Keep battlements
 ctx.fillStyle="#858f99";
 for(let i=0;i<5;i++)ctx.fillRect(cx-62+i*30,baseY-240,18,16);

 // Castle windows and gate
 ctx.fillStyle="#273847";
 ctx.fillRect(cx-43,baseY-185,20,38);
 ctx.fillRect(cx+23,baseY-185,20,38);
 ctx.fillRect(cx-25,baseY-82,50,82);
 ctx.beginPath();ctx.arc(cx,baseY-82,25,Math.PI,0);ctx.fill();

 // Castle stone blocks
 ctx.strokeStyle="rgba(45,55,65,.28)";
 ctx.lineWidth=2;
 for(let y=baseY-125;y<baseY;y+=32){
   ctx.beginPath();ctx.moveTo(cx-185,y);ctx.lineTo(cx+185,y);ctx.stroke();
 }
 for(let y=baseY-210;y<baseY;y+=32){
   ctx.beginPath();ctx.moveTo(cx-62,y);ctx.lineTo(cx+62,y);ctx.stroke();
 }

 // Clouds
 ctx.fillStyle="rgba(255,255,255,.78)";
 for(let i=0;i<9;i++){
   let x=(i*285-(camX*.32%285))-70, y=75+(i%4)*62;
   ctx.beginPath();
   ctx.arc(x,y,24,0,Math.PI*2);
   ctx.arc(x+30,y-13,34,0,Math.PI*2);
   ctx.arc(x+70,y,25,0,Math.PI*2);
   ctx.fill();
 }

 // Lush jungle foreground
 for(let i=0;i<12;i++){
   const x=i*360-(camX*.52%360)+80, ground=610;
   ctx.fillStyle="#65472e";ctx.fillRect(x+8,ground-145,20,145);ctx.fillRect(x+48,ground-120,17,120);
   ctx.strokeStyle="#2f7045";ctx.lineWidth=5;
   ctx.beginPath();ctx.moveTo(x,ground-170);ctx.quadraticCurveTo(x-30,ground-95,x+8,ground-25);ctx.stroke();
   ctx.beginPath();ctx.moveTo(x+35,ground-150);ctx.quadraticCurveTo(x+65,ground-80,x+28,ground-15);ctx.stroke();
   ctx.fillStyle="#2e8a4e";
   for(const [dx,dy,rx,ry] of [[-8,-145,35,14],[35,-125,42,16],[8,-95,38,15],[58,-92,35,14],[28,-55,45,16]]){
     ctx.beginPath();ctx.ellipse(x+dx,ground+dy,rx,ry,-.35,0,Math.PI*2);ctx.fill();
   }
 }
 // Thick jungle canopy
 ctx.fillStyle="#256b42";
 for(let i=-1;i<10;i++){
   const x=i*190-(camX*.4%190);
   ctx.beginPath();ctx.arc(x,585,90,Math.PI,Math.PI*2);ctx.fill();
 }
 // Ferns, flowers and rocks
 for(let i=0;i<34;i++){
   const x=i*112-(camX*.75%112)+20, y=603+(i%3)*4;
   ctx.strokeStyle="#3d8e50";ctx.lineWidth=3;
   for(let j=0;j<4;j++){
     ctx.beginPath();ctx.moveTo(x,y);ctx.quadraticCurveTo(x-12+j*8,y-18,x-22+j*14,y-28-(j%2)*7);ctx.stroke();
   }
   ctx.fillStyle=["#f07aa8","#f5d45d","#b47cff"][i%3];
   ctx.beginPath();ctx.arc(x,y-30,3,0,Math.PI*2);ctx.fill();
   ctx.fillStyle="#6c5946";ctx.beginPath();ctx.ellipse(x+32,y+2,14,8,.1,0,Math.PI*2);ctx.fill();
 }
}

function drawStageProps(){
 // Extra props for the jungle section only: logs, stones, vines, flowers and fireflies.
 for(let i=0;i<18;i++){
   const x=i*410-(camX*.58%410)+90;
   const y=520+(i%3)*24;
   ctx.save();
   ctx.fillStyle="#5a3b26";ctx.beginPath();ctx.ellipse(x,y,34,12,-.18,0,Math.PI*2);ctx.fill();
   ctx.fillStyle="#7a5231";ctx.beginPath();ctx.arc(x-22,y-3,10,0,Math.PI*2);ctx.fill();
   ctx.fillStyle="#2f8a4f";ctx.beginPath();ctx.ellipse(x+26,y-14,28,10,.1,0,Math.PI*2);ctx.fill();
   ctx.restore();
 }
 // Hanging vines at varied depths.
 ctx.strokeStyle="#2a7c49";ctx.lineWidth=5;
 for(let i=0;i<10;i++){
   const x=i*520-(camX*.38%520)+120, len=55+(i%4)*22;
   ctx.beginPath();ctx.moveTo(x,0);ctx.quadraticCurveTo(x-24,25+len*.45,x+8,25+len);ctx.stroke();
   ctx.fillStyle="#3aa95a";ctx.beginPath();ctx.ellipse(x+6,32+len,18,7,.3,0,Math.PI*2);ctx.fill();
 }
 // Fireflies and little flowers in the foreground jungle.
 for(let i=0;i<16;i++){
   const x=i*155-(camX*.7%155)+60,y=565+(i%4)*16;
   ctx.globalAlpha=.75;ctx.fillStyle="#ffe66d";ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fill();
   ctx.globalAlpha=1;ctx.strokeStyle="#3e914f";ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x,y+3);ctx.lineTo(x,y+26);ctx.stroke();
 }
}

function drawCarnivorousPlant(){
 if(bossActive||bossDefeated)return;
 const cp=carnivorousPlant.phase;
 const progress=cp<630?0:(cp<780?(cp-630)/150:1-(cp-780)/210);
 const t=Math.max(0,Math.min(1,progress));
 if(t<=0)return;
 const x=carnivorousPlant.x-camX;
 const tipY=-12+t*622;
 ctx.save();
 // thick hanging stalk
 const grad=ctx.createLinearGradient(x,0,x,tipY);grad.addColorStop(0,"#173b20");grad.addColorStop(.55,"#2f7d3a");grad.addColorStop(1,"#1c4e26");
 ctx.strokeStyle=grad;ctx.lineWidth=18;ctx.lineCap="round";ctx.beginPath();ctx.moveTo(x,-18);ctx.quadraticCurveTo(x-18,tipY*.45,x,tipY);ctx.stroke();
 // teeth/mouth
 ctx.fillStyle="#8a1f2a";ctx.beginPath();ctx.ellipse(x,tipY+2,28,18,0,0,Math.PI*2);ctx.fill();
 ctx.fillStyle="#d7e3c7";for(let i=-5;i<=5;i+=2){const tx=x+i*5;ctx.beginPath();ctx.moveTo(tx,tipY-9);ctx.lineTo(tx+4,tipY-1);ctx.lineTo(tx-4,tipY-1);ctx.closePath();ctx.fill();ctx.beginPath();ctx.moveTo(tx,tipY+9);ctx.lineTo(tx+4,tipY+1);ctx.lineTo(tx-4,tipY+1);ctx.closePath();ctx.fill();}
 ctx.fillStyle="#ff5b74";ctx.beginPath();ctx.arc(x,tipY+2,7,0,Math.PI*2);ctx.fill();
 ctx.restore();
}

function drawPlatform(p){
 const x=p.x-camX;
 if(p.type==="final"){
   if(bossActive||bossDefeated){
     ctx.fillStyle="#2a252a";ctx.fillRect(x,p.y,p.w,p.h);ctx.fillStyle="#403940";ctx.fillRect(x,p.y,p.w,18);ctx.fillStyle="#5a5157";ctx.fillRect(x,p.y+18,p.w,10);
     ctx.strokeStyle="#151217";ctx.lineWidth=3;
     for(let yy=p.y+46;yy<p.y+p.h;yy+=46){ctx.beginPath();ctx.moveTo(x,yy);ctx.lineTo(x+p.w,yy);ctx.stroke();}
     for(let xx=x+65;xx<x+p.w;xx+=94){ctx.beginPath();ctx.moveTo(xx,p.y);ctx.lineTo(xx,p.y+p.h);ctx.stroke();}
     // Small lava cracks along the front edge.
     ctx.strokeStyle="#ff4a20";ctx.lineWidth=3;for(let xx=x+40;xx<x+p.w;xx+=145){ctx.beginPath();ctx.moveTo(xx,p.y+12);ctx.lineTo(xx+12,p.y+28);ctx.lineTo(xx+3,p.y+48);ctx.stroke();}
   } else {
     ctx.fillStyle="#59636d";ctx.fillRect(x,p.y,p.w,p.h);ctx.fillStyle="#a0a9b2";ctx.fillRect(x,p.y,p.w,18);ctx.fillStyle="#7b8791";ctx.fillRect(x,p.y+18,p.w,12);ctx.strokeStyle="rgba(25,30,35,.35)";ctx.lineWidth=2;
     for(let yy=p.y+48;yy<p.y+p.h;yy+=48){ctx.beginPath();ctx.moveTo(x,yy);ctx.lineTo(x+p.w,yy);ctx.stroke();}for(let xx=x+70;xx<x+p.w;xx+=100){ctx.beginPath();ctx.moveTo(xx,p.y);ctx.lineTo(xx,p.y+p.h);ctx.stroke();}
   }
   return;
 }
 if(p.type==="wood"){
   ctx.fillStyle="#8b5a2b";ctx.fillRect(x,p.y,p.w,p.h);
   ctx.fillStyle="#c58a45";ctx.fillRect(x,p.y,p.w,12);
   ctx.strokeStyle="#5b371d";ctx.lineWidth=3;
   const boards=Math.max(1,Math.floor(p.w/35));
   for(let i=1;i<boards;i++){ctx.beginPath();ctx.moveTo(x+i*p.w/boards,p.y+3);ctx.lineTo(x+i*p.w/boards,p.y+p.h);ctx.stroke();}
   ctx.fillStyle="#4a2c19";
   for(let i=0;i<Math.floor(p.w/45)+1;i++){ctx.beginPath();ctx.arc(x+18+i*45,p.y+7,2.5,0,Math.PI*2);ctx.fill();}
 } else {
   ctx.fillStyle="#6d4328";ctx.fillRect(x,p.y,p.w,p.h);
   ctx.fillStyle="#3f9d50";ctx.fillRect(x,p.y,p.w,14);
   ctx.fillStyle="#6acb5c";
   for(let i=0;i<p.w;i+=30)ctx.fillRect(x+i,p.y+4,18,4);
   ctx.strokeStyle="rgba(40,25,20,.35)";
   for(let yy=p.y+35;yy<p.y+p.h;yy+=35){ctx.beginPath();ctx.moveTo(x,yy);ctx.lineTo(x+p.w,yy);ctx.stroke();}
 }
}

function drawPlayer(){
 const x=player.x-camX,y=player.y;
 if(bossActive&&bossPowerTimer>0){
   ctx.save();
   const pulse=20+7*Math.sin(Date.now()/90);
   ctx.globalAlpha=.28;ctx.fillStyle='#ff58e8';ctx.shadowColor='#ff58e8';ctx.shadowBlur=28;
   ctx.beginPath();ctx.arc(x+15,y+22,pulse,0,Math.PI*2);ctx.fill();
   ctx.globalAlpha=.55;ctx.strokeStyle='#ffd2f8';ctx.lineWidth=3;ctx.beginPath();ctx.arc(x+15,y+22,pulse+5,0,Math.PI*2);ctx.stroke();
   ctx.restore();
 }
 // shadow
 ctx.fillStyle="rgba(0,0,0,.16)";ctx.beginPath();ctx.ellipse(x+15,y+45,20,5,0,0,Math.PI*2);ctx.fill();
 // legs
 ctx.fillStyle="#263f91";ctx.fillRect(x+4,y+30,9,14);ctx.fillRect(x+18,y+30,9,14);
 // body
 ctx.fillStyle="#e83d43";ctx.fillRect(x+3,y+13,25,20);
 // shirt
 ctx.fillStyle="#f6d7b0";ctx.fillRect(x+7,y+5,17,15);
 // head
 ctx.fillStyle="#f0b98a";ctx.beginPath();ctx.arc(x+15,y+9,10,0,Math.PI*2);ctx.fill();
 // hair
 ctx.fillStyle="#5b3426";ctx.beginPath();ctx.arc(x+15,y+4,10,Math.PI,Math.PI*2);ctx.fill();
 // cap
 ctx.fillStyle="#e83d43";ctx.fillRect(x+6,y-2,18,6);ctx.fillRect(x+21,y+1,8,4);
 // eye
 ctx.fillStyle="#172033";ctx.fillRect(x+19,y+8,2,2);
 // shoes
 ctx.fillStyle="#26304a";ctx.fillRect(x+1,y+41,13,4);ctx.fillRect(x+17,y+41,13,4);
}


function playEmbeddedSound(id){
 const source=document.getElementById(id);
 if(!source)return;
 try{
   const a=source.cloneNode(true);
   a.volume=0.95;
   a.currentTime=0;
   a.style.display='none';
   document.body.appendChild(a);
   const cleanup=()=>{a.remove();};
   a.addEventListener('ended',cleanup,{once:true});
   const pr=a.play();
   if(pr) pr.catch(cleanup);
 }catch(e){}
}

function drawLevel5Spikes(){
 if(currentLevel!==5||bossActive||bossDefeated)return;
 ctx.save();ctx.fillStyle='#ffffff';ctx.strokeStyle='#dcecf7';ctx.lineWidth=1;
 for(const sp of level5Spikes){
   const x=sp.x-camX,y=sp.y;
   ctx.beginPath();ctx.moveTo(x-7,y);ctx.lineTo(x,y-18);ctx.lineTo(x+7,y);ctx.closePath();ctx.fill();ctx.stroke();
 }
 ctx.restore();
}

function drawSnowballs(){
 for(const b of snowballs){
   const x=b.x-camX, y=b.y;
   ctx.save();
   ctx.fillStyle="#ffffff";
   ctx.shadowColor="rgba(130,180,230,.55)";
   ctx.shadowBlur=9;
   ctx.beginPath();ctx.arc(x,y,13,0,Math.PI*2);ctx.fill();
   ctx.shadowBlur=0;
   ctx.strokeStyle="#cfe7f8";ctx.lineWidth=2;ctx.stroke();
   ctx.fillStyle="#e8f5ff";
   ctx.beginPath();ctx.arc(x-4,y-4,4,0,Math.PI*2);ctx.fill();
   ctx.restore();
 }
}

function drawPoo(p){
 const x=p.x-camX,y=p.y;
 ctx.save();ctx.font="34px Arial";ctx.textAlign="center";ctx.textBaseline="middle";
 ctx.globalAlpha=p.hit?0.35:1;ctx.fillText("💩",x,y);ctx.restore();
}
function drawEvilGoon(){
 const x=evilGoon.x-camX,y=evilGoon.y+Math.sin(evilGoon.phase)*7;
 ctx.save();

 // Large purple warning halo.
 ctx.globalAlpha=.30;
 ctx.fillStyle="#8f4fd0";
 ctx.beginPath();
 ctx.arc(x+38,y+38,105,0,Math.PI*2);
 ctx.fill();
 ctx.globalAlpha=.14;
 ctx.beginPath();
 ctx.arc(x+38,y+38,125,0,Math.PI*2);
 ctx.fill();

 ctx.globalAlpha=.97;
 ctx.fillStyle="rgba(90,50,120,.45)";
 ctx.beginPath();ctx.ellipse(x+8,y+39,24,11,-.35,0,Math.PI*2);ctx.fill();
 ctx.beginPath();ctx.ellipse(x+68,y+39,24,11,.35,0,Math.PI*2);ctx.fill();
 ctx.beginPath();ctx.arc(x+38,y+38,40,0,Math.PI*2);ctx.clip();
 if(evilGoonSprite.complete)ctx.drawImage(evilGoonSprite,x-2,y-2,80,80);
 else {ctx.fillStyle="#63366e";ctx.beginPath();ctx.arc(x+38,y+38,40,0,Math.PI*2);ctx.fill();}
 ctx.restore();
 ctx.fillStyle="#261b31";ctx.font="bold 13px Arial";ctx.textAlign="center";ctx.fillText("BEACON OF MASCULINITY",x+38,y-12);
}
const evilGoonSprite=new Image();
evilGoonSprite.src="assets/image_09.png";

function drawGoonshroom(s){
 const x=s.x-camX, y=s.y;
 ctx.save();
 // glow when activated
 if(s.active){
   ctx.globalAlpha=.35;
   ctx.fillStyle="#fff36b";
   ctx.beginPath();ctx.arc(x,y-18,42,0,Math.PI*2);ctx.fill();
   ctx.globalAlpha=1;
 }
 // stem
 ctx.fillStyle="#eee5c8";
 ctx.fillRect(x-8,y-20,16,28);
 // cap
 ctx.fillStyle=s.active?"#ff65c7":"#8b55d9";
 ctx.beginPath();
 ctx.arc(x,y-22,28,Math.PI,0);ctx.lineTo(x+28,y-22);ctx.quadraticCurveTo(x,y+5,x-28,y-22);ctx.closePath();ctx.fill();
 // spots
 ctx.fillStyle="#fff2a8";
 for(const [dx,dy] of [[-12,-25],[3,-34],[14,-18]]){ctx.beginPath();ctx.arc(x+dx,y+dy,5,0,Math.PI*2);ctx.fill();}
 // little face
 ctx.fillStyle="#22283b";
 ctx.fillRect(x-10,y-18,4,5);ctx.fillRect(x+6,y-18,4,5);
 ctx.restore();
}

function drawFinish(){
 if(!flagVisible)return;
 const x=13240-camX;ctx.fillStyle="#e7e7e7";ctx.fillRect(x,220,7,190);ctx.fillStyle="#ff4c55";ctx.beginPath();ctx.moveTo(x+7,225);ctx.lineTo(x+92,248);ctx.lineTo(x+7,271);ctx.closePath();ctx.fill();ctx.fillStyle="#ffffff";ctx.font="bold 20px Arial";ctx.textAlign="left";ctx.fillText("FINISH",x+14,300);
}
const miniGoonSprite=new Image();
miniGoonSprite.src="assets/image_05.jpg";

function drawBossPlatforms(){
 if(!bossActive&&!bossDefeated)return;
 for(const p of bossPlatforms){
   const x=p.x-camX,y=p.y;ctx.save();
   const grad=ctx.createLinearGradient(x,y,x,y+p.h);
   grad.addColorStop(0,'#d9e2ea');grad.addColorStop(.45,'#8897a5');grad.addColorStop(1,'#44505b');
   ctx.fillStyle=grad;ctx.fillRect(x,y,p.w,p.h);
   ctx.strokeStyle='#182129';ctx.lineWidth=3;ctx.strokeRect(x,y,p.w,p.h);
   ctx.fillStyle='#cbd5dd';
   for(const bx of [x+14,x+p.w-14]){ctx.beginPath();ctx.arc(bx,y+p.h/2,4,0,Math.PI*2);ctx.fill();ctx.stroke();}
   ctx.strokeStyle='rgba(255,255,255,.35)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x+8,y+5);ctx.lineTo(x+p.w-8,y+5);ctx.stroke();
   ctx.restore();
 }
}
function drawBossPurpleMushrooms(){
 if(!bossActive)return;
 for(const pm of bossPurpleMushrooms){
   const x=pm.x-camX,y=pm.y;ctx.save();ctx.shadowColor='#b54cff';ctx.shadowBlur=22;
   ctx.fillStyle='#9d4cff';ctx.beginPath();ctx.arc(x,y-16,20,Math.PI,0);ctx.lineTo(x+20,y-16);ctx.quadraticCurveTo(x,y+4,x-20,y-16);ctx.closePath();ctx.fill();
   ctx.shadowBlur=0;ctx.fillStyle='#efe4ff';ctx.fillRect(x-6,y-13,12,21);
   ctx.fillStyle='#fff';for(const [dx,dy] of [[-7,-18],[3,-23],[10,-12]]){ctx.beginPath();ctx.arc(x+dx,y+dy,3.4,0,Math.PI*2);ctx.fill();}
   ctx.fillStyle='#2c1537';ctx.fillRect(x-8,y-11,3,4);ctx.fillRect(x+5,y-11,3,4);ctx.restore();
 }
}
function drawMiniGoon(){
 if(!miniGoon.active)return;
 const x=miniGoon.x-camX,y=miniGoon.y+Math.sin(miniGoon.phase)*2;ctx.save();
 ctx.globalAlpha=.18;ctx.fillStyle='#8f4fd0';ctx.beginPath();ctx.arc(x+19,y+19,47,0,Math.PI*2);ctx.fill();
 ctx.globalAlpha=1;ctx.beginPath();ctx.arc(x+19,y+19,19,0,Math.PI*2);ctx.clip();
 if(miniGoonSprite.complete)ctx.drawImage(miniGoonSprite,256,0,1536,1536,x,y,38,38);else{ctx.fillStyle='#c9a182';ctx.fillRect(x,y,38,38);}ctx.restore();
 ctx.fillStyle='#1a111f';ctx.font='bold 10px Arial';ctx.textAlign='center';ctx.fillText('MINI BOSS',x+19,y-7);
}

const stoodSprite=new Image();
stoodSprite.src="assets/image_01.jpg";
function drawStood(){
 if(!stood.active)return;
 const x=stood.x-camX,y=stood.y+Math.sin(stood.phase)*2,w=stood.w,h=stood.h;
 ctx.save();
 ctx.globalAlpha=.22;ctx.fillStyle='#44e34f';ctx.shadowColor='#44e34f';ctx.shadowBlur=26;ctx.beginPath();ctx.arc(x+w/2,y+h/2,70,0,Math.PI*2);ctx.fill();
 ctx.shadowBlur=0;ctx.globalAlpha=.96;ctx.beginPath();ctx.arc(x+w/2,y+h/2,w/2,0,Math.PI*2);ctx.clip();
 if(stoodSprite.complete)ctx.drawImage(stoodSprite,0,0,1536,1024,x,y,w,h);
 else {ctx.fillStyle='#5fbc61';ctx.fillRect(x,y,w,h);}
 ctx.globalCompositeOperation='multiply';ctx.globalAlpha=.38;ctx.fillStyle='#4fd454';ctx.fillRect(x,y,w,h);
 ctx.globalCompositeOperation='source-over';ctx.restore();
 ctx.fillStyle='#16451b';ctx.font='bold 12px Arial';ctx.textAlign='center';ctx.fillText('STOOD',x+w/2,y-9);
}
function drawStoodSlimeBalls(){
 for(const b of stoodSlimeBalls){
   const x=b.x-camX,y=b.y;ctx.save();
   ctx.fillStyle='#55ef64';ctx.shadowColor='#33ff55';ctx.shadowBlur=14;
   ctx.beginPath();ctx.arc(x,y,14,0,Math.PI*2);ctx.fill();
   ctx.shadowBlur=0;ctx.fillStyle='#b7ffbf';ctx.beginPath();ctx.arc(x-4,y-4,4,0,Math.PI*2);ctx.fill();
   ctx.fillStyle='#36b83c';ctx.beginPath();ctx.arc(x+6,y+5,3,0,Math.PI*2);ctx.fill();
   ctx.restore();
 }
}
function drawBossMushroom(){
 if(!bossMushroom.active)return;const x=bossMushroom.x-camX,y=bossMushroom.y;ctx.save();ctx.shadowColor="#ff4fd8";ctx.shadowBlur=24;ctx.fillStyle="#ff5fda";ctx.beginPath();ctx.arc(x,y-22,29,Math.PI,0);ctx.lineTo(x+29,y-22);ctx.quadraticCurveTo(x,y+6,x-29,y-22);ctx.closePath();ctx.fill();ctx.shadowBlur=0;ctx.fillStyle="#f5e8db";ctx.fillRect(x-8,y-20,16,29);ctx.fillStyle="#fff";for(const [dx,dy] of [[-11,-26],[4,-34],[14,-18]]){ctx.beginPath();ctx.arc(x+dx,y+dy,5,0,Math.PI*2);ctx.fill();}ctx.fillStyle="#24152b";ctx.fillRect(x-10,y-18,4,5);ctx.fillRect(x+6,y-18,4,5);ctx.restore();
}


/* =========================
   LEVEL 1 — GREEN GOON
   ========================= */
const level1Platforms=[
  {x:0,y:610,w:420,h:90},
  {x:500,y:560,w:210,h:140},
  {x:790,y:500,w:150,h:200},
  {x:1010,y:440,w:190,h:260},
  {x:1240,y:520,w:170,h:180},
  {x:1470,y:455,w:185,h:245},
  {x:1720,y:390,w:190,h:310},
  {x:1985,y:470,w:175,h:230},
  {x:2235,y:360,w:180,h:340},
  {x:2490,y:430,w:210,h:270},
  {x:2780,y:325,w:175,h:375},
  {x:3025,y:410,w:210,h:290},
  {x:3305,y:305,w:195,h:395},
  {x:3580,y:390,w:220,h:310},
  {x:3880,y:550,w:170,h:150,type:'wood'},
  {x:4100,y:490,w:125,h:210},
  {x:4285,y:430,w:125,h:270},
  {x:4465,y:370,w:125,h:330},
  {x:4650,y:455,w:190,h:245,type:'wood'},
  {x:4895,y:515,w:120,h:185},
  {x:5065,y:450,w:150,h:250},
  {x:5285,y:345,w:150,h:355},
  {x:5500,y:405,w:105,h:295},
  {x:5675,y:325,w:180,h:375},
  {x:5935,y:465,w:110,h:235},
  {x:6105,y:535,w:140,h:165,type:'wood'},
  {x:6305,y:415,w:160,h:285},
  {x:6545,y:320,w:190,h:380},
  {x:6805,y:425,w:145,h:275},
  {x:7025,y:545,w:235,h:155},
  {x:7325,y:465,w:110,h:235,type:'wood'},
  {x:7500,y:385,w:150,h:315},
  {x:7735,y:500,w:90,h:200},
  {x:7915,y:425,w:210,h:275},
  {x:8195,y:335,w:120,h:365,type:'wood'},
  {x:8415,y:415,w:140,h:285},
  {x:8615,y:285,w:180,h:415},
  {x:8895,y:375,w:105,h:325},
  {x:9075,y:495,w:175,h:205},
  {x:9315,y:405,w:130,h:295,type:'wood'},
  {x:9525,y:295,w:155,h:405},
  {x:9755,y:450,w:100,h:250},
  {x:9935,y:360,w:210,h:340},
  {x:10215,y:520,w:120,h:180},
  {x:10405,y:425,w:180,h:275,type:'wood'},
  {x:10655,y:330,w:125,h:370},
  {x:10855,y:445,w:165,h:255},
  {x:11105,y:535,w:225,h:165},
  {x:11400,y:500,w:2000,h:200,type:'level1final'}
];

const level1Goons=[
  {x:740,y:520,active:false},
  {x:5160,y:430,active:false}
];
const level1Poos=[
  {x:1670,y:410,hit:false},
  {x:6020,y:420,hit:false},
  {x:10500,y:385,hit:false}
];
let level1BossHealth=100;
let level1BossActive=false;
let level1BossDefeated=false;
let level1FlagVisible=false;
let level1BossMushroom={x:11800,y:440,active:false};
let level1BossPowerTimer=0;
let level1BossHitThisPower=false;
let level1PinkUses=0;
const level1PurpleMushrooms=[];
const level1BossPlatform={x:12330,y:350,w:280,h:22};

const level1GoonSprite=new Image();
level1GoonSprite.src="assets/image_10.jpg";

// User-provided photo decorations for the Green Goblin parkour background.
// They are visual-only and sit behind the platforms/ground, before the boss arena.
const level1ParkourBackgroundImages=[
  "assets/image_11.jpg",
  "assets/image_12.png",
  "assets/image_13.png",
  "assets/image_14.jpg",
  "assets/image_15.jpg",
  "assets/image_16.png",
  "assets/image_17.png"
].map(src=>{const img=new Image();img._ratio=1;img.src=src;img.addEventListener('load',()=>{if(img.naturalWidth)img._ratio=img.naturalWidth/img.naturalHeight;},{once:true});return img;});

function playLevel1GoonHitSound(){ playEmbeddedSound('level1GoonHitSound'); }

function resetLevel1BossMushrooms(){
  level1BossMushroom.active=false;
  level1BossMushroom.x=11800; level1BossMushroom.y=440;
  level1BossPowerTimer=0;
  level1BossHitThisPower=false;
  level1PinkUses=0;
  level1PurpleMushrooms.length=0;
}

function spawnLevel1PinkMushroom(){
  const minX=11470,maxX=13180;
  level1BossMushroom.x=minX+Math.random()*(maxX-minX);
  level1BossMushroom.y=420+Math.random()*58;
  level1BossMushroom.active=true;
}

function spawnLevel1PurpleMushroom(){
  const p=level1BossPlatform;
  level1PurpleMushrooms.push({x:p.x+25+Math.random()*(p.w-50),y:p.y-32,active:true});
}

function resetLevel1(){
  player={x:90,y:500,w:30,h:44,vx:0,vy:0,onGround:false,coyote:0,jumpBuffer:0,health:100,pooCooldown:0,evilCooldown:0};
  camX=0; started=false; won=false;
  rainbowTimer=0; shroomTextTimer=0; pooTimer=0;
  level1BossHealth=100; level1BossActive=false; level1BossDefeated=false; level1FlagVisible=false;
  level1BossMushroom={x:11800,y:440,active:false};
  resetLevel1BossMushrooms();
  for(const s of level1Goons)s.active=false;
  for(const p of level1Poos)p.hit=false;
  evilGoon.x=player.x-180; evilGoon.y=player.y-15; evilGoon.vx=0; evilGoon.phase=0; evilGoon.active=false;
  snowballs.length=0; snowballTimer=600;
  stopBossMusic(); stopLevel1BossMusic(); resetRegularLevelMusicOnRestart();
  document.getElementById('bossUI').style.display='none';
  document.getElementById('bossUI').querySelector('div').textContent='CONCERNING INDIVIDUAL';
  document.getElementById('endScreen').style.display='none';
  document.getElementById('pooOverlay').classList.remove('show');
  document.getElementById('shroomText').classList.remove('show');
  msg.style.display='block';
  msg.innerHTML='<h1>LEVEL 1</h1><p>Press SPACE to start</p>';
  updateHealthUI();
}

function level1PlayerOnPlatforms(oldY){
  player.onGround=false;
  for(const p of level1Platforms){
    if(player.x+player.w>p.x&&player.x<p.x+p.w&&oldY+player.h<=p.y&&player.y+player.h>=p.y&&player.vy>=0){
      player.y=p.y-player.h;player.vy=0;player.onGround=true;
    }
  }
  if(level1BossActive||level1BossDefeated){
    const p=level1BossPlatform;
    if(player.x+player.w>p.x&&player.x<p.x+p.w&&oldY+player.h<=p.y&&player.y+player.h>=p.y&&player.vy>=0){
      player.y=p.y-player.h;player.vy=0;player.onGround=true;
    }
  }
}

function updateLevel1(){
  const left=keys.KeyA||keys.ArrowLeft, right=keys.KeyD||keys.ArrowRight;
  const jump=keys.Space||keys.ArrowUp;
  if(left)player.vx-=0.10;
  if(right)player.vx+=0.10;
  if(!left&&!right)player.vx*=0.94;
  player.vx=Math.max(-1.65,Math.min(1.65,player.vx));
  if(jump)player.jumpBuffer=7;else player.jumpBuffer=Math.max(0,player.jumpBuffer-1);
  if(player.onGround)player.coyote=7;else player.coyote=Math.max(0,player.coyote-1);
  if(player.jumpBuffer>0&&player.coyote>0){player.vy=-12.5;player.onGround=false;player.coyote=0;player.jumpBuffer=0;}
  player.vy+=0.20;player.vy=Math.min(player.vy,5);
  const oldY=player.y;
  player.x+=player.vx;player.y+=player.vy;
  level1PlayerOnPlatforms(oldY);
  if(player.x<0){player.x=0;player.vx=0;}
  if(player.y>760){resetLevel1();started=true;msg.style.display='none';startMusic();}

  // The level-1 Goon chases throughout the whole course, with no snowballs.
  if(!evilGoon.active&&Math.abs(player.vx)>0.05){evilGoon.active=true;evilGoon.x=player.x-180;evilGoon.y=player.y-15;}
  if(!level1BossActive&&!level1BossDefeated&&evilGoon.active){
    evilGoon.phase+=0.035;
    const dx=(player.x+player.w/2)-(evilGoon.x+evilGoon.w/2);
    const dy=(player.y+player.h/2)-(evilGoon.y+evilGoon.h/2);
    const d=Math.hypot(dx,dy)||1;
    const speed=1.35;
    evilGoon.x+=(dx/d)*speed;evilGoon.y+=(dy/d)*speed;
    if(player.evilCooldown>0)player.evilCooldown--;
    if(player.evilCooldown===0&&rectHit(player,evilGoon)){
      player.health=Math.max(0,player.health-20);player.evilCooldown=90;playLevel1GoonHitSound();
    }
  }

  if(pooTimer>0){pooTimer--;if(pooTimer===0)document.getElementById('pooOverlay').classList.remove('show');}
  if(player.pooCooldown>0)player.pooCooldown--;
  for(const p of level1Poos){
    if(!p.hit&&player.pooCooldown===0&&Math.hypot(player.x+15-p.x,player.y+22-p.y)<38){
      p.hit=true;pooTimer=300;player.health=Math.max(0,player.health-10);player.pooCooldown=45;
      document.getElementById('pooOverlay').classList.add('show');playEmbeddedSound('pooSplashSound');
    }
  }
  for(const s of level1Goons){
    if(!s.active&&Math.hypot(player.x+15-s.x,player.y+22-s.y)<48){
      s.active=true;player.health=Math.min(100,player.health+10);rainbowTimer=900;shroomTextTimer=300;
      playGoonshroomSplat();playBigSplat();showGoonshroomText();
    }
  }

  // Enter the grassy arena: normal music remains on.
  if(!level1BossActive&&!level1BossDefeated&&player.x+player.w>11410){
    level1BossActive=true; startBossEntryInvulnerability(); level1BossHealth=100; level1BossDefeated=false; level1FlagVisible=false;
    level1BossPowerTimer=0; level1BossHitThisPower=false; level1PinkUses=0; level1PurpleMushrooms.length=0;
    level1BossMushroom.active=false;
    spawnLevel1PinkMushroom();
    document.getElementById('bossUI').querySelector('div').textContent='CONCERNING INDIVIDUAL';
    startLevel1BossMusic();
    updateBossUILevel1();
  }

  if(level1BossActive&&!won){
    evilGoon.active=true; evilGoon.phase+=0.035;
    const dx=(player.x+player.w/2)-(evilGoon.x+evilGoon.w/2);
    const dy=(player.y+player.h/2)-(evilGoon.y+evilGoon.h/2);
    const d=Math.hypot(dx,dy)||1;
    const normalSpeed=1.35;
    if(level1BossPowerTimer>0){
      evilGoon.x+=(-dx/d)*normalSpeed;
      evilGoon.y+=(-dy/d)*normalSpeed;
      level1BossPowerTimer--;
      if(!level1BossHitThisPower&&rectHit(player,evilGoon)){
        level1BossHealth=Math.max(0,level1BossHealth-34);
        level1BossHitThisPower=true;playBigSplat();
      }
    }else{
      evilGoon.x+=(dx/d)*normalSpeed;
      evilGoon.y+=(dy/d)*normalSpeed;
      if(player.evilCooldown>0)player.evilCooldown--;
      if(bossEntryInvuln===0&&player.evilCooldown===0&&rectHit(player,evilGoon)){
        player.health=Math.max(0,player.health-20);player.evilCooldown=90;playLevel1GoonHitSound();
      }
    }
    const arenaLeft=11400,arenaRight=13400,arenaGroundY=500;
    evilGoon.x=Math.max(arenaLeft,Math.min(arenaRight-evilGoon.w,evilGoon.x));
    if(evilGoon.y+evilGoon.h>arenaGroundY)evilGoon.y=arenaGroundY-evilGoon.h;
    if(evilGoon.y<80)evilGoon.y=80;
    if(level1BossPowerTimer===0&&level1BossHitThisPower)level1BossHitThisPower=false;

    if(level1BossMushroom.active&&level1BossHealth>0&&Math.hypot(player.x+15-level1BossMushroom.x,player.y+22-level1BossMushroom.y)<48){
      level1BossMushroom.active=false;
      level1BossPowerTimer=1200;
      level1BossHitThisPower=false;
      level1PinkUses++;
      if(level1PinkUses%3===0)spawnLevel1PurpleMushroom();
      // player glow is rendered while power is active
    }
    // Once a mushroom is used, create another at the end of its power period.
    if(level1BossPowerTimer===0&&!level1BossMushroom.active&&level1BossHealth>0){
      spawnLevel1PinkMushroom();
    }
    for(let i=level1PurpleMushrooms.length-1;i>=0;i--){
      const pm=level1PurpleMushrooms[i];
      if(Math.hypot(player.x+15-pm.x,player.y+22-pm.y)<44){
        player.health=Math.min(100,player.health+30);
        level1PurpleMushrooms.splice(i,1);playGoonshroomSplat();
      }
    }
    if(level1BossHealth<=0){
      level1BossActive=false;level1BossDefeated=true;evilGoon.active=false;evilGoon.vx=0;evilGoon.phase=0;
      level1BossMushroom.active=false;level1BossPowerTimer=0;level1PurpleMushrooms.length=0;
      stopLevel1BossMusic();
      level1FlagVisible=true;updateBossUI();
    }
  }

  if(level1FlagVisible&&!won&&player.x+player.w>13220&&player.x<13390){
    won=true;started=false;stopLevel1BossMusic();document.getElementById('bossUI').style.display='none';
    document.getElementById('endScreen').style.display='flex';
  }
  if(rainbowTimer>0)rainbowTimer--;
  if(shroomTextTimer>0){shroomTextTimer--;if(shroomTextTimer===0)document.getElementById('shroomText').classList.remove('show');}
  updateHealthUI();updateBossUILevel1();
  camX+=((player.x-350)-camX)*0.075;camX=Math.max(0,Math.min(12850,camX));
  hud.innerHTML=`DISTANCE: ${Math.max(0,Math.floor(player.x/10))} m`;
}

function updateBossUILevel1(){
  const title=document.querySelector('#bossUI>div:first-child'); if(title) title.textContent='CONCERNING INDIVIDUAL';
  const hp=Math.max(0,Math.min(100, level1BossHealth));
  const fill=document.getElementById('bossFill'),txt=document.getElementById('bossText');
  if(currentLevel===1 && fill && txt){
    fill.style.width=hp+'%'; txt.textContent=Math.ceil(hp)+'%';
  }
  if(currentLevel!==1) return;
  const ui=document.getElementById('bossUI'); if(ui)ui.style.display=(level1BossActive&&!won)?'block':'none';
}

function drawLevel1Background(){
  const g=ctx.createLinearGradient(0,0,0,H);
  g.addColorStop(0,"#69c9ff");g.addColorStop(.62,"#b9e8ff");g.addColorStop(1,"#eaf8ff");
  ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
  // Green lower third, with grass and no castle.
  ctx.fillStyle="#2f7d48";ctx.fillRect(0,470,W,230);
  ctx.fillStyle="#266b3d";
  for(let i=-1;i<10;i++){const x=i*190-(camX*.2%190);ctx.beginPath();ctx.arc(x,615,95,Math.PI,Math.PI*2);ctx.fill();}
  // grass blades
  ctx.strokeStyle="#4da85a";ctx.lineWidth=3;
  for(let i=0;i<70;i++){
    const x=i*44-(camX*.55%44),y=604+(i%4)*4;
    ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x-5,y-18);ctx.stroke();
    ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+6,y-15);ctx.stroke();
  }
  // clouds
  ctx.fillStyle="rgba(255,255,255,.8)";
  for(let i=0;i<8;i++){
    const x=i*300-(camX*.25%300)-50,y=75+(i%4)*65;
    ctx.beginPath();ctx.arc(x,y,24,0,Math.PI*2);ctx.arc(x+32,y-14,34,0,Math.PI*2);ctx.arc(x+72,y,25,0,Math.PI*2);ctx.fill();
  }
  // sun
  ctx.fillStyle="#ffe89a";ctx.beginPath();ctx.arc(1015,105,55,0,Math.PI*2);ctx.fill();

  // User-provided photos line the parkour as background decorations.
  // Their world positions stop before the boss platform/arena begins.
  const photoXs=[4250,5200,6150,7100,8050,9000,9950];
  for(let i=0;i<level1ParkourBackgroundImages.length;i++){
    const img=level1ParkourBackgroundImages[i];
    const wx=photoXs[i];
    const x=wx-camX*.92;
    const maxW=190;
    const ratio=img._ratio||1;
    const w=maxW,h=w/ratio,y=125+(i%2)*35;
    if(x+w<-40||x>W+40||wx>11100)continue;
    if(img.complete){
      ctx.save();
      ctx.globalAlpha=.72;
      ctx.shadowColor='rgba(0,0,0,.38)';ctx.shadowBlur=10;
      ctx.drawImage(img,x,y,w,h);
      ctx.restore();
    }
  }
}

function drawLevel1Platform(p){
  const x=p.x-camX;
  if(p.type==='wood'){
    ctx.fillStyle="#87592c";ctx.fillRect(x,p.y,p.w,p.h);
    ctx.fillStyle="#c78a43";ctx.fillRect(x,p.y,p.w,12);
    ctx.strokeStyle="#58381f";ctx.lineWidth=3;
    const boards=Math.max(1,Math.floor(p.w/35));
    for(let i=1;i<boards;i++){ctx.beginPath();ctx.moveTo(x+i*p.w/boards,p.y+3);ctx.lineTo(x+i*p.w/boards,p.y+p.h);ctx.stroke();}
    return;
  }
  if(p.type==='level1final'){
    ctx.fillStyle="#5b4530";ctx.fillRect(x,p.y,p.w,p.h);
    ctx.fillStyle="#3a8d4a";ctx.fillRect(x,p.y,p.w,22);
    ctx.fillStyle="#66c75d";ctx.fillRect(x,p.y,p.w,8);
    ctx.strokeStyle="rgba(48,31,20,.3)";ctx.lineWidth=3;
    for(let yy=p.y+50;yy<p.y+p.h;yy+=46){ctx.beginPath();ctx.moveTo(x,yy);ctx.lineTo(x+p.w,yy);ctx.stroke();}
    // Grass tufts along arena edge
    ctx.strokeStyle="#3d9d4e";ctx.lineWidth=3;
    for(let xx=x;xx<x+p.w;xx+=36){ctx.beginPath();ctx.moveTo(xx,p.y+5);ctx.lineTo(xx-5,p.y-7);ctx.stroke();ctx.beginPath();ctx.moveTo(xx,p.y+5);ctx.lineTo(xx+6,p.y-9);ctx.stroke();}
    return;
  }
  ctx.fillStyle="#6d4328";ctx.fillRect(x,p.y,p.w,p.h);ctx.fillStyle="#399b4e";ctx.fillRect(x,p.y,p.w,14);
  ctx.fillStyle="#6acb5c";for(let i=0;i<p.w;i+=30)ctx.fillRect(x+i,p.y+4,18,4);
  ctx.strokeStyle="rgba(40,25,20,.3)";ctx.lineWidth=2;
  for(let yy=p.y+35;yy<p.y+p.h;yy+=35){ctx.beginPath();ctx.moveTo(x,yy);ctx.lineTo(x+p.w,yy);ctx.stroke();}
}

function drawLevel1WoodFloat(){
  if(!level1BossActive&&!level1BossDefeated)return;
  const x=level1BossPlatform.x-camX,y=level1BossPlatform.y;
  ctx.save();
  ctx.fillStyle="#a86932";ctx.fillRect(x,y,level1BossPlatform.w,18);
  ctx.fillStyle="#d09a58";ctx.fillRect(x,y,level1BossPlatform.w,6);
  ctx.strokeStyle="#5a351e";ctx.lineWidth=6;
  // supporting beams down to the grassy ground
  for(const bx of [x+35,x+level1BossPlatform.w-35]){ctx.beginPath();ctx.moveTo(bx,y+18);ctx.lineTo(bx-55,500);ctx.stroke();}
  ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(x+35,y+18);ctx.lineTo(x+level1BossPlatform.w/2,500);ctx.lineTo(x+level1BossPlatform.w-35,y+18);ctx.stroke();
  ctx.restore();
}

function drawLevel1Goon(){
  if(!evilGoon.active)return;
  const x=evilGoon.x-camX,y=evilGoon.y+Math.sin(evilGoon.phase)*5;
  ctx.save();
  ctx.globalAlpha=.18;ctx.fillStyle="#2d78c8";ctx.beginPath();ctx.arc(x+38,y+38,58,0,Math.PI*2);ctx.fill();
  ctx.globalAlpha=1;
  ctx.beginPath();ctx.arc(x+38,y+38,38,0,Math.PI*2);ctx.clip();
  if(level1GoonSprite.complete)ctx.drawImage(level1GoonSprite,145,28,225,325,x-2,y-4,80,86);
  else{ctx.fillStyle="#d7b08f";ctx.beginPath();ctx.arc(x+38,y+38,38,0,Math.PI*2);ctx.fill();}
  ctx.restore();
  ctx.fillStyle="#1d3348";ctx.font="bold 13px Arial";ctx.textAlign="center";ctx.fillText("EVIL CHASER",x+38,y-12);
}

function drawLevel1PinkMushroom(){
  if(!level1BossActive||!level1BossMushroom.active)return;
  const x=level1BossMushroom.x-camX,y=level1BossMushroom.y;
  ctx.save();ctx.shadowColor="#ff4fd8";ctx.shadowBlur=24;ctx.fillStyle="#ff5fda";
  ctx.beginPath();ctx.arc(x,y-22,29,Math.PI,0);ctx.lineTo(x+29,y-22);ctx.quadraticCurveTo(x,y+6,x-29,y-22);ctx.closePath();ctx.fill();
  ctx.shadowBlur=0;ctx.fillStyle="#f5e8db";ctx.fillRect(x-8,y-20,16,29);
  ctx.fillStyle="#fff";for(const [dx,dy] of [[-11,-26],[4,-34],[14,-18]]){ctx.beginPath();ctx.arc(x+dx,y+dy,5,0,Math.PI*2);ctx.fill();}
  ctx.restore();
}

function drawLevel1PurpleMushrooms(){
  if(!level1BossActive)return;
  for(const pm of level1PurpleMushrooms){
    const x=pm.x-camX,y=pm.y;ctx.save();ctx.shadowColor="#b54cff";ctx.shadowBlur=22;ctx.fillStyle="#9d4cff";
    ctx.beginPath();ctx.arc(x,y-16,20,Math.PI,0);ctx.lineTo(x+20,y-16);ctx.quadraticCurveTo(x,y+4,x-20,y-16);ctx.closePath();ctx.fill();
    ctx.shadowBlur=0;ctx.fillStyle="#efe4ff";ctx.fillRect(x-6,y-13,12,21);
    ctx.fillStyle="#fff";for(const [dx,dy] of [[-7,-18],[3,-23],[10,-12]]){ctx.beginPath();ctx.arc(x+dx,y+dy,3.4,0,Math.PI*2);ctx.fill();}
    ctx.restore();
  }
}

function drawLevel1Goonshroom(s){
  if(s.active)return;
  const x=s.x-camX,y=s.y;ctx.save();ctx.shadowColor="#8d4cff";ctx.shadowBlur=15;ctx.fillStyle="#7a43e8";
  ctx.beginPath();ctx.arc(x,y-15,19,Math.PI,0);ctx.lineTo(x+19,y-15);ctx.quadraticCurveTo(x,y+5,x-19,y-15);ctx.closePath();ctx.fill();
  ctx.shadowBlur=0;ctx.fillStyle="#f4e9dc";ctx.fillRect(x-6,y-13,12,20);ctx.restore();
}

function drawLevel1Poo(p){ drawPoo(p); }

function drawLevel1Flag(){
  if(!level1FlagVisible)return;
  const x=13240-camX;
  ctx.fillStyle="#e7e7e7";ctx.fillRect(x,220,7,190);
  ctx.fillStyle="#ff4c55";ctx.beginPath();ctx.moveTo(x+7,225);ctx.lineTo(x+92,248);ctx.lineTo(x+7,271);ctx.closePath();ctx.fill();
  ctx.fillStyle="#fff";ctx.font="bold 20px Arial";ctx.textAlign="left";ctx.fillText("FINISH",x+14,300);
}

function drawLevel1(){
  drawLevel1Background();
  for(const p of level1Platforms)drawLevel1Platform(p);
  drawLevel1WoodFloat();
  for(const s of level1Goons)drawLevel1Goonshroom(s);
  for(const p of level1Poos)drawLevel1Poo(p);
  drawLevel1PinkMushroom();drawLevel1PurpleMushrooms();
  drawLevel1Flag();
  drawLevel1Goon();
  // Pink power glow
  if(level1BossActive&&level1BossPowerTimer>0){
    ctx.save();const x=player.x-camX+15,y=player.y+22,pulse=22+7*Math.sin(Date.now()/90);
    ctx.globalAlpha=.30;ctx.fillStyle='#ff58e8';ctx.shadowColor='#ff58e8';ctx.shadowBlur=30;ctx.beginPath();ctx.arc(x,y,pulse,0,Math.PI*2);ctx.fill();
    ctx.globalAlpha=.75;ctx.strokeStyle='#ffd2f8';ctx.lineWidth=3;ctx.beginPath();ctx.arc(x,y,pulse+7,0,Math.PI*2);ctx.stroke();ctx.restore();
  }
  drawPlayer();
  ctx.fillStyle="rgba(255,255,255,.55)";ctx.fillRect(350,665,500,8);
  ctx.fillStyle="#17304d";ctx.fillRect(350,665,500*Math.min(1,player.x/13400),8);
}

/* =========================
   LEVEL 2 — DESERT / SIGMA CYBORG
   ========================= */
const level2Platforms=[
  {x:0,y:610,w:420,h:90},{x:500,y:560,w:210,h:140},{x:790,y:495,w:150,h:205},{x:1010,y:425,w:190,h:275,spikes:true},
  {x:1240,y:515,w:170,h:185},{x:1470,y:450,w:185,h:250},{x:1720,y:385,w:190,h:315},{x:1985,y:465,w:175,h:235,spikes:true},
  {x:2235,y:355,w:180,h:345},{x:2490,y:425,w:210,h:275},{x:2780,y:320,w:175,h:380,spikes:true},{x:3025,y:405,w:210,h:295},
  {x:3305,y:300,w:195,h:400},{x:3580,y:385,w:220,h:315},{x:3880,y:545,w:170,h:155,type:'wood'},{x:4100,y:485,w:125,h:215},
  {x:4285,y:425,w:125,h:275,spikes:true},{x:4465,y:365,w:125,h:335},{x:4650,y:450,w:190,h:250,type:'wood'},{x:4895,y:510,w:120,h:190},
  {x:5065,y:445,w:150,h:255},{x:5285,y:340,w:150,h:360},{x:5500,y:400,w:105,h:300,spikes:true},{x:5675,y:320,w:180,h:380},
  {x:5935,y:460,w:110,h:240},{x:6105,y:530,w:140,h:170,type:'wood'},{x:6305,y:410,w:160,h:290},{x:6545,y:315,w:190,h:385,spikes:true},
  {x:6805,y:420,w:145,h:280},{x:7025,y:540,w:235,h:160},{x:7325,y:460,w:110,h:240,type:'wood'},{x:7500,y:380,w:150,h:320},
  {x:7735,y:495,w:90,h:205},{x:7915,y:420,w:210,h:280,spikes:true},{x:8195,y:330,w:120,h:370,type:'wood'},{x:8415,y:410,w:140,h:290},
  {x:8615,y:280,w:180,h:420},{x:8895,y:370,w:105,h:330},{x:9075,y:490,w:175,h:210},{x:9315,y:400,w:130,h:300,type:'wood'},
  {x:9525,y:290,w:155,h:410},{x:9755,y:445,w:100,h:255},{x:9935,y:355,w:210,h:345,spikes:true},{x:10215,y:515,w:120,h:185},
  {x:10405,y:420,w:180,h:280,type:'wood'},{x:10655,y:325,w:125,h:375},{x:10855,y:440,w:165,h:260},{x:11105,y:530,w:225,h:170},
  {x:11400,y:500,w:2000,h:200,type:'desertFinal'}
];
const level2Poos=[{x:1740,y:340,hit:false},{x:4780,y:400,hit:false},{x:9300,y:355,hit:false},{x:10720,y:380,hit:false}];
const level2Goonshrooms=[{x:700,y:520,active:false},{x:8360,y:345,active:false}];
const level2Spikes=level2Platforms.filter(p=>p.spikes);
const level2EndSpike={x:12350,y:500,w:100}; // 5% of the 2000px final platform

let level2BossHealth=100,level2BossActive=false,level2BossDefeated=false,level2FlagVisible=false;
let level2BossMushroom={x:11820,y:440,active:false};
let level2BossPowerTimer=0,level2BossHitThisPower=false,level2PinkUses=0;
const level2PurpleMushrooms=[];
const level2BossPlatforms=[
  {x:11820,y:385,w:180,h:20,type:'wood'},
  {x:12610,y:335,w:180,h:20,type:'wood'}
];
const level2BrownBalls=[];
let level2BrownBallTimer=600;
const level2Goon={x:-180,y:250,w:76,h:76,vx:0,phase:0,active:false};
const level2WeirdGoonSprite=new Image();
level2WeirdGoonSprite.src="assets/image_18.jpg";
function playLevel2GoonHitSound(){ playEmbeddedSound('level2ZombieScream'); }
function stopLevel2BossMusic(){try{const a=document.getElementById('level2BossMusic');if(a){a.pause();a.currentTime=0;}}catch(e){}}
function startLevel2BossMusic(){try{const normal=document.getElementById('bgMusic');if(normal){normal.pause();normal.currentTime=0;}stopNormalMusic();const a=document.getElementById('level2BossMusic');if(a){a.loop=true;a.volume=.72;a.currentTime=0;a.play().catch(()=>{});}}catch(e){}}
function updateBossUILevel2(){const hp=Math.max(0,Math.min(100,level2BossHealth));const fill=document.getElementById('bossFill'),txt=document.getElementById('bossText'),ui=document.getElementById('bossUI');if(currentLevel===2&&fill&&txt){fill.style.width=hp+'%';txt.textContent=Math.ceil(hp)+'%';}if(currentLevel===2&&ui){ui.style.display=(level2BossActive&&!won)?'block':'none';ui.querySelector('div').textContent='SIGMA CYBORG';}}
function resetLevel2BossMushrooms(){level2BossMushroom={x:11820,y:440,active:false};level2BossPowerTimer=0;level2BossHitThisPower=false;level2PinkUses=0;level2PurpleMushrooms.length=0;}
function spawnLevel2PinkMushroom(){const minX=11470,maxX=13180;level2BossMushroom.x=minX+Math.random()*(maxX-minX);level2BossMushroom.y=420+Math.random()*58;level2BossMushroom.active=true;}
function spawnLevel2PurpleMushroom(){const p=level2BossPlatforms[Math.floor(Math.random()*level2BossPlatforms.length)];level2PurpleMushrooms.push({x:p.x+25+Math.random()*Math.max(1,p.w-50),y:p.y-32,active:true});}
function resetLevel2(){
 player={x:90,y:500,w:30,h:44,vx:0,vy:0,onGround:false,coyote:0,jumpBuffer:0,health:100,pooCooldown:0,evilCooldown:0};
 camX=0;started=false;won=false;rainbowTimer=0;shroomTextTimer=0;pooTimer=0;
 level2BossHealth=100;level2BossActive=false;level2BossDefeated=false;level2FlagVisible=false;resetLevel2BossMushrooms();level2BrownBalls.length=0;level2BrownBallTimer=1;
 level2Goon.x=player.x-180;level2Goon.y=player.y-15;level2Goon.phase=0;level2Goon.active=false;
 for(const s of level2Goonshrooms)s.active=false;for(const p of level2Poos)p.hit=false;
 stopBossMusic();stopLevel2BossMusic();resetRegularLevelMusicOnRestart();document.getElementById('bossUI').style.display='none';document.getElementById('endScreen').style.display='none';document.getElementById('pooOverlay').classList.remove('show');document.getElementById('shroomText').classList.remove('show');
 msg.style.display='block';msg.innerHTML='<h1>LEVEL 2</h1><p>Press SPACE to start</p>';updateHealthUI();
}
function level2PlayerOnPlatforms(oldY){player.onGround=false;for(const p of level2Platforms){if(player.x+player.w>p.x&&player.x<p.x+p.w&&oldY+player.h<=p.y&&player.y+player.h>=p.y&&player.vy>=0){player.y=p.y-player.h;player.vy=0;player.onGround=true;}}if(level2BossActive){for(const p of level2BossPlatforms){if(player.x+player.w>p.x&&player.x<p.x+p.w&&oldY+player.h<=p.y&&player.y+player.h>=p.y&&player.vy>=0){player.y=p.y-player.h;player.vy=0;player.onGround=true;}}}}
function updateLevel2(){
 const left=keys.KeyA||keys.ArrowLeft,right=keys.KeyD||keys.ArrowRight,jump=keys.Space||keys.ArrowUp;
 if(left)player.vx-=0.10;if(right)player.vx+=0.10;if(!left&&!right)player.vx*=0.94;player.vx=Math.max(-1.65,Math.min(1.65,player.vx));
 if(jump)player.jumpBuffer=7;else player.jumpBuffer=Math.max(0,player.jumpBuffer-1);if(player.onGround)player.coyote=7;else player.coyote=Math.max(0,player.coyote-1);
 if(player.jumpBuffer>0&&player.coyote>0){player.vy=-12.5;player.onGround=false;player.coyote=0;player.jumpBuffer=0;}
 player.vy+=0.20;player.vy=Math.min(player.vy,5);const oldY=player.y;player.x+=player.vx;player.y+=player.vy;level2PlayerOnPlatforms(oldY);if(player.x<0){player.x=0;player.vx=0;}if(player.y>760){resetLevel2();started=true;msg.style.display='none';startMusic();return;}
 if(!level2BossActive&&!level2BossDefeated&&!level2Goon.active&&Math.abs(player.vx)>0.05){level2Goon.active=true;level2Goon.x=player.x-180;level2Goon.y=player.y-15;level2BrownBallTimer=1;}
 if(!level2BossActive&&!level2BossDefeated&&level2Goon.active){level2Goon.phase+=0.035;const dx=(player.x+15)-(level2Goon.x+38),dy=(player.y+22)-(level2Goon.y+38),d=Math.hypot(dx,dy)||1;level2Goon.x+=(dx/d)*1.35;level2Goon.y+=(dy/d)*1.35;if(player.evilCooldown>0)player.evilCooldown--;if(bossEntryInvuln===0&&player.evilCooldown===0&&rectHit(player,level2Goon)){player.health=Math.max(0,player.health-20);player.evilCooldown=90;playLevel2GoonHitSound();}}
 // The Weird Goon also throws brown balls during the parkour section.
 if(!level2BossActive&&!level2BossDefeated&&level2Goon.active){
   level2BrownBallTimer--;
   if(level2BrownBallTimer<=0){const sx=level2Goon.x+38,sy=level2Goon.y+38,tx=player.x+15,ty=player.y+22,bdx=tx-sx,bdy=ty-sy,dist=Math.hypot(bdx,bdy)||1,brownSpeed=2.70;level2BrownBalls.push({x:sx,y:sy,vx:(bdx/dist)*brownSpeed,vy:(bdy/dist)*brownSpeed,life:1200});level2BrownBallTimer=600;}
 }
 if(player.pooCooldown>0)player.pooCooldown--;for(const p of level2Poos){if(!p.hit&&player.pooCooldown===0&&Math.hypot(player.x+15-p.x,player.y+22-p.y)<38){p.hit=true;pooTimer=300;player.health=Math.max(0,player.health-10);player.pooCooldown=45;document.getElementById('pooOverlay').classList.add('show');playEmbeddedSound('pooSplashSound');}}
 for(const s of level2Goonshrooms){if(!s.active&&Math.hypot(player.x+15-s.x,player.y+22-s.y)<48){s.active=true;player.health=Math.min(100,player.health+10);rainbowTimer=900;shroomTextTimer=300;playGoonshroomSplat();playBigSplat();showGoonshroomText();}}
 if(player.evilCooldown===0&&!level2BossDefeated){
  for(const p of level2Spikes){
    const sw=p.w*0.5,sx=p.x+p.w*0.25;
    const originalCount=Math.max(3,Math.floor(sw/22));
    const count=Math.max(2,originalCount-1);
    const spacing=(sw-14)/(originalCount-1);
    let hit=false;
    for(let i=0;i<count;i++){
      const spikeX=sx+7+i*spacing;
      if(player.x+player.w>spikeX-7&&player.x<spikeX+7&&player.y+player.h>p.y-24&&player.y+player.h<p.y+20){hit=true;break;}
    }
    if(hit){player.health=Math.max(0,player.health-50);player.evilCooldown=60;break;}
  }
}
 if(player.evilCooldown===0&&!level2BossDefeated){const p=level2EndSpike;if(player.x+player.w>p.x+6&&player.x<p.x+p.w-6&&player.y+player.h>p.y-24&&player.y+player.h<p.y+20){player.health=Math.max(0,player.health-50);player.evilCooldown=60;}}
 if(!level2BossActive&&!level2BossDefeated&&player.x+player.w>11410){level2BossActive=true;startBossEntryInvulnerability();level2BossHealth=100;level2BossDefeated=false;level2FlagVisible=false;level2BossPowerTimer=0;level2BossHitThisPower=false;level2PinkUses=0;level2PurpleMushrooms.length=0;level2BossMushroom.active=false;level2BrownBalls.length=0;level2BrownBallTimer=600;spawnLevel2PinkMushroom();updateBossUILevel2();startLevel2BossMusic();}
 if(level2BossActive&&!won){
   level2Goon.active=true;level2Goon.phase+=0.035;const dx=(player.x+15)-(level2Goon.x+38),dy=(player.y+22)-(level2Goon.y+38),d=Math.hypot(dx,dy)||1;const speed=1.35;
   if(level2BossPowerTimer>0){level2Goon.x+=(-dx/d)*speed;level2Goon.y+=(-dy/d)*speed;level2BossPowerTimer--;if(!level2BossHitThisPower&&rectHit(player,level2Goon)){level2BossHealth=Math.max(0,level2BossHealth-20);level2BossHitThisPower=true;playBigSplat();}}
   else{level2Goon.x+=(dx/d)*speed;level2Goon.y+=(dy/d)*speed;if(player.evilCooldown>0)player.evilCooldown--;if(player.evilCooldown===0&&rectHit(player,level2Goon)){player.health=Math.max(0,player.health-20);player.evilCooldown=90;playLevel2GoonHitSound();}}
   const arenaLeft=11400,arenaRight=13400,arenaGroundY=500;level2Goon.x=Math.max(arenaLeft,Math.min(arenaRight-level2Goon.w,level2Goon.x));if(level2Goon.y+level2Goon.h>arenaGroundY)level2Goon.y=arenaGroundY-level2Goon.h;if(level2Goon.y<80)level2Goon.y=80;
   if(level2BossPowerTimer===0&&level2BossHitThisPower)level2BossHitThisPower=false;
   if(level2BossMushroom.active&&Math.hypot(player.x+15-level2BossMushroom.x,player.y+22-level2BossMushroom.y)<48){level2BossMushroom.active=false;level2BossPowerTimer=1200;level2BossHitThisPower=false;level2PinkUses++;if(level2PinkUses%3===0)spawnLevel2PurpleMushroom();}
   if(level2BossPowerTimer===0&&!level2BossMushroom.active&&level2BossHealth>0)spawnLevel2PinkMushroom();
   for(let i=level2PurpleMushrooms.length-1;i>=0;i--){const pm=level2PurpleMushrooms[i];if(Math.hypot(player.x+15-pm.x,player.y+22-pm.y)<44){player.health=Math.min(100,player.health+30);level2PurpleMushrooms.splice(i,1);playGoonshroomSplat();}}
   level2BrownBallTimer--;if(level2BrownBallTimer<=0){const sx=level2Goon.x+38,sy=level2Goon.y+38,tx=player.x+15,ty=player.y+22,bdx=tx-sx,bdy=ty-sy,dist=Math.hypot(bdx,bdy)||1,brownSpeed=2.70;level2BrownBalls.push({x:sx,y:sy,vx:(bdx/dist)*brownSpeed,vy:(bdy/dist)*brownSpeed,life:1200});level2BrownBallTimer=600;}
 }
 for(let i=level2BrownBalls.length-1;i>=0;i--){const b=level2BrownBalls[i];b.x+=b.vx;b.y+=b.vy;b.life--;const hit=player.x<b.x+17&&player.x+player.w>b.x-17&&player.y<b.y+17&&player.y+player.h>b.y-17;if(hit&&bossEntryInvuln===0){player.health=Math.max(0,player.health-10);player.evilCooldown=45;playEmbeddedSound('snowSplashSound');level2BrownBalls.splice(i,1);continue;}if(b.life<=0||b.y>760||b.x<-500||b.x>14000)level2BrownBalls.splice(i,1);}
 if(level2BossHealth<=0){level2BossActive=false;level2BossDefeated=true;level2Goon.active=false;level2Goon.vx=0;level2BossMushroom.active=false;level2BossPowerTimer=0;level2PurpleMushrooms.length=0;level2BrownBalls.length=0;level2FlagVisible=true;stopLevel2BossMusic();updateBossUILevel2();}
 if(level2FlagVisible&&!won&&player.x+player.w>13220&&player.x<13390){won=true;started=false;document.getElementById('bossUI').style.display='none';document.getElementById('endScreen').style.display='flex';stopLevel2BossMusic();}
 if(pooTimer>0){pooTimer--;if(pooTimer===0)document.getElementById('pooOverlay').classList.remove('show');}if(rainbowTimer>0)rainbowTimer--;if(shroomTextTimer>0){shroomTextTimer--;if(shroomTextTimer===0)document.getElementById('shroomText').classList.remove('show');}
 updateHealthUI();updateBossUILevel2();camX+=((player.x-350)-camX)*0.075;camX=Math.max(0,Math.min(12850,camX));hud.innerHTML=`DISTANCE: ${Math.max(0,Math.floor(player.x/10))} m`;
}
function drawLevel2Background(){
 const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'#6fcdfb');g.addColorStop(.58,'#f4d9a2');g.addColorStop(1,'#e8bd73');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);ctx.fillStyle='#d8a85c';ctx.fillRect(0,450,W,250);
 for(let i=-1;i<8;i++){const x=i*310-(camX*.14%310);ctx.fillStyle=i%2?'#c99349':'#e0b66f';ctx.beginPath();ctx.moveTo(x,505);ctx.quadraticCurveTo(x+135,390,x+300,505);ctx.lineTo(x+300,700);ctx.lineTo(x,700);ctx.closePath();ctx.fill();}
 ctx.fillStyle='#f0c984';for(let i=-1;i<7;i++){const x=i*380-(camX*.08%380);ctx.beginPath();ctx.moveTo(x,455);ctx.quadraticCurveTo(x+180,335,x+360,455);ctx.lineTo(x+360,500);ctx.lineTo(x,500);ctx.closePath();ctx.fill();}
 for(let i=0;i<10;i++){const x=i*430-(camX*.42%430)+80,y=520-(i%3)*35;ctx.strokeStyle='#3b7135';ctx.lineWidth=15;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(x,y+75);ctx.lineTo(x,y-10);ctx.stroke();ctx.beginPath();ctx.moveTo(x,y+18);ctx.lineTo(x-24,y+4);ctx.lineTo(x-24,y-20);ctx.stroke();ctx.beginPath();ctx.moveTo(x,y+38);ctx.lineTo(x+24,y+24);ctx.lineTo(x+24,y);ctx.stroke();ctx.lineCap='butt';}
 ctx.fillStyle='rgba(255,255,255,.72)';for(let i=0;i<6;i++){const x=i*340-(camX*.20%340)-70,y=75+(i%3)*70;ctx.beginPath();ctx.arc(x,y,22,0,Math.PI*2);ctx.arc(x+30,y-12,31,0,Math.PI*2);ctx.arc(x+68,y,23,0,Math.PI*2);ctx.fill();}ctx.fillStyle='#ffe9a6';ctx.beginPath();ctx.arc(1010,105,55,0,Math.PI*2);ctx.fill();
}
function drawLevel2Platform(p){const x=p.x-camX;if(p.type==='wood'){ctx.fillStyle='#87592c';ctx.fillRect(x,p.y,p.w,p.h);ctx.fillStyle='#c78a43';ctx.fillRect(x,p.y,p.w,12);ctx.strokeStyle='#58381f';ctx.lineWidth=3;const boards=Math.max(1,Math.floor(p.w/35));for(let i=1;i<boards;i++){ctx.beginPath();ctx.moveTo(x+i*p.w/boards,p.y+3);ctx.lineTo(x+i*p.w/boards,p.y+p.h);ctx.stroke();}return;}if(p.type==='desertFinal'){ctx.fillStyle='#ad8552';ctx.fillRect(x,p.y,p.w,p.h);ctx.fillStyle='#d8b47b';ctx.fillRect(x,p.y,p.w,18);ctx.fillStyle='#c19a68';ctx.fillRect(x,p.y+18,p.w,12);ctx.strokeStyle='rgba(74,46,22,.35)';ctx.lineWidth=3;for(let yy=p.y+48;yy<p.y+p.h;yy+=42){ctx.beginPath();ctx.moveTo(x,yy);ctx.lineTo(x+p.w,yy);ctx.stroke();}for(let xx=x+70;xx<x+p.w;xx+=100){ctx.beginPath();ctx.moveTo(xx,p.y);ctx.lineTo(xx,p.y+p.h);ctx.stroke();}return;}ctx.fillStyle='#b98b52';ctx.fillRect(x,p.y,p.w,p.h);ctx.fillStyle='#e0bb77';ctx.fillRect(x,p.y,p.w,14);ctx.fillStyle='#f0cf8f';for(let i=0;i<p.w;i+=30)ctx.fillRect(x+i,p.y+4,18,4);ctx.strokeStyle='rgba(90,57,28,.25)';ctx.lineWidth=2;for(let yy=p.y+35;yy<p.y+p.h;yy+=35){ctx.beginPath();ctx.moveTo(x,yy);ctx.lineTo(x+p.w,yy);ctx.stroke();}}
function drawLevel2Spikes(){for(const p of level2Spikes){const x=p.x-camX+p.w*0.25, sw=p.w*0.5;ctx.save();ctx.fillStyle='#3b3d43';const originalCount=Math.max(3,Math.floor(sw/22));const count=Math.max(2,originalCount-1);const spacing=(sw-14)/(originalCount-1);for(let i=0;i<count;i++){const sx=x+7+i*spacing;ctx.beginPath();ctx.moveTo(sx-7,p.y);ctx.lineTo(sx,p.y-18);ctx.lineTo(sx+7,p.y);ctx.closePath();ctx.fill();}ctx.restore();}
  // Small 5%-width spike patch on the boss end platform.
  const ep=level2EndSpike, ex=ep.x-camX;ctx.save();ctx.fillStyle='#3b3d43';const ecount=Math.max(4,Math.floor(ep.w/18));for(let i=0;i<ecount;i++){const sx=ex+7+i*((ep.w-14)/(ecount-1));ctx.beginPath();ctx.moveTo(sx-7,ep.y);ctx.lineTo(sx,ep.y-18);ctx.lineTo(sx+7,ep.y);ctx.closePath();ctx.fill();}ctx.restore();}
function drawLevel2Goonshroom(s){if(s.active)return;const x=s.x-camX,y=s.y;ctx.save();ctx.shadowColor='#8d4cff';ctx.shadowBlur=15;ctx.fillStyle='#7a43e8';ctx.beginPath();ctx.arc(x,y-15,19,Math.PI,0);ctx.lineTo(x+19,y-15);ctx.quadraticCurveTo(x,y+5,x-19,y-15);ctx.closePath();ctx.fill();ctx.shadowBlur=0;ctx.fillStyle='#f4e9dc';ctx.fillRect(x-6,y-13,12,20);ctx.restore();}
function drawLevel2Poo(p){drawPoo(p);}
function drawLevel2WeirdGoon(){if(!level2Goon.active)return;const x=level2Goon.x-camX,y=level2Goon.y+Math.sin(level2Goon.phase)*5;ctx.save();ctx.globalAlpha=.22;ctx.fillStyle='#8b5a2b';ctx.shadowColor='#8b5a2b';ctx.shadowBlur=18;ctx.beginPath();ctx.arc(x+38,y+38,65,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;ctx.globalAlpha=.98;ctx.beginPath();ctx.arc(x+38,y+38,38,0,Math.PI*2);ctx.clip();if(level2WeirdGoonSprite.complete)ctx.drawImage(level2WeirdGoonSprite,x-2,y-2,80,80);else{ctx.fillStyle='#8b5a2b';ctx.beginPath();ctx.arc(x+38,y+38,38,0,Math.PI*2);ctx.fill();}ctx.restore();ctx.fillStyle='#50321b';ctx.font='bold 13px Arial';ctx.textAlign='center';ctx.fillText('SIGMA CYBORG',x+38,y-12);}
function drawLevel2PinkMushroom(){if(!level2BossActive||!level2BossMushroom.active)return;const x=level2BossMushroom.x-camX,y=level2BossMushroom.y;ctx.save();ctx.shadowColor='#ff4fd8';ctx.shadowBlur=24;ctx.fillStyle='#ff5fda';ctx.beginPath();ctx.arc(x,y-22,29,Math.PI,0);ctx.lineTo(x+29,y-22);ctx.quadraticCurveTo(x,y+6,x-29,y-22);ctx.closePath();ctx.fill();ctx.shadowBlur=0;ctx.fillStyle='#f5e8db';ctx.fillRect(x-8,y-20,16,29);ctx.fillStyle='#fff';for(const [dx,dy] of [[-11,-26],[4,-34],[14,-18]]){ctx.beginPath();ctx.arc(x+dx,y+dy,5,0,Math.PI*2);ctx.fill();}ctx.restore();}
function drawLevel2BossPlatforms(){if(!level2BossActive)return;for(const p of level2BossPlatforms){const x=p.x-camX;ctx.save();ctx.fillStyle='#87592c';ctx.fillRect(x,p.y,p.w,p.h);ctx.fillStyle='#c78a43';ctx.fillRect(x,p.y,p.w,7);ctx.strokeStyle='#58381f';ctx.lineWidth=3;for(let xx=x+30;xx<x+p.w;xx+=42){ctx.beginPath();ctx.moveTo(xx,p.y+3);ctx.lineTo(xx,p.y+p.h);ctx.stroke();}ctx.restore();}}
function drawLevel2PurpleMushrooms(){if(!level2BossActive)return;for(const pm of level2PurpleMushrooms){const x=pm.x-camX,y=pm.y;ctx.save();ctx.shadowColor='#b54cff';ctx.shadowBlur=22;ctx.fillStyle='#9d4cff';ctx.beginPath();ctx.arc(x,y-16,20,Math.PI,0);ctx.lineTo(x+20,y-16);ctx.quadraticCurveTo(x,y+4,x-20,y-16);ctx.closePath();ctx.fill();ctx.shadowBlur=0;ctx.fillStyle='#efe4ff';ctx.fillRect(x-6,y-13,12,21);ctx.restore();}}
function drawLevel2BrownBalls(){for(const b of level2BrownBalls){const x=b.x-camX,y=b.y;ctx.save();ctx.fillStyle='#7b4823';ctx.shadowColor='#a96c37';ctx.shadowBlur=10;ctx.beginPath();ctx.arc(x,y,13,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;ctx.fillStyle='#c28b55';ctx.beginPath();ctx.arc(x-4,y-4,4,0,Math.PI*2);ctx.fill();ctx.restore();}}
function drawLevel2Flag(){if(!level2FlagVisible)return;const x=13240-camX;ctx.fillStyle='#e7e7e7';ctx.fillRect(x,220,7,190);ctx.fillStyle='#e5a13a';ctx.beginPath();ctx.moveTo(x+7,225);ctx.lineTo(x+92,248);ctx.lineTo(x+7,271);ctx.closePath();ctx.fill();ctx.fillStyle='#fff';ctx.font='bold 20px Arial';ctx.textAlign='left';ctx.fillText('FINISH',x+14,300);}
function drawLevel2(){drawLevel2Background();for(const p of level2Platforms)drawLevel2Platform(p);drawLevel2Spikes();for(const s of level2Goonshrooms)drawLevel2Goonshroom(s);for(const p of level2Poos)drawLevel2Poo(p);drawLevel2BossPlatforms();drawLevel2PinkMushroom();drawLevel2PurpleMushrooms();drawLevel2BrownBalls();drawLevel2Flag();drawLevel2WeirdGoon();if(level2BossActive&&level2BossPowerTimer>0){ctx.save();const x=player.x-camX+15,y=player.y+22,pulse=22+7*Math.sin(Date.now()/90);ctx.globalAlpha=.30;ctx.fillStyle='#ff58e8';ctx.shadowColor='#ff58e8';ctx.shadowBlur=30;ctx.beginPath();ctx.arc(x,y,pulse,0,Math.PI*2);ctx.fill();ctx.globalAlpha=.75;ctx.strokeStyle='#ffd2f8';ctx.lineWidth=3;ctx.beginPath();ctx.arc(x,y,pulse+7,0,Math.PI*2);ctx.stroke();ctx.restore();}drawPlayer();ctx.fillStyle='rgba(255,255,255,.55)';ctx.fillRect(350,665,500,8);ctx.fillStyle='#17304d';ctx.fillRect(350,665,500*Math.min(1,player.x/13400),8);}


/* =========================
   LEVEL 3 — CAVE GHOST
   ========================= */

const level3CaveFloor=[
  {x:0,y:610,w:650,h:90},
  {x:740,y:610,w:580,h:90},
  {x:1410,y:610,w:720,h:90},
  {x:2220,y:610,w:560,h:90},
  {x:2870,y:610,w:760,h:90},
  {x:3720,y:610,w:620,h:90},
  {x:4430,y:610,w:780,h:90},
  {x:5300,y:610,w:640,h:90},
  {x:6030,y:610,w:700,h:90},
  {x:6820,y:610,w:720,h:90},
  {x:7630,y:610,w:570,h:90},
  {x:8280,y:610,w:780,h:90},
  {x:9160,y:610,w:920,h:90},
  {x:10220,y:610,w:3200,h:90,type:'caveFinal'}
];
const level3Poos=[
  {x:910,y:578,hit:false},{x:1760,y:578,hit:false},{x:3240,y:578,hit:false},{x:5140,y:578,hit:false}
];
const level3Goonshrooms=[
  {x:430,y:565,active:false},{x:7030,y:565,active:false}
];
const level3Skeletons=[
  {x:220,y:534,w:42,h:76,minX:80,maxX:600,vx:1.1,phase:0,cool:0},
  {x:1520,y:534,w:42,h:76,minX:1440,maxX:2070,vx:1.25,phase:0,cool:0},
  {x:2950,y:534,w:42,h:76,minX:2900,maxX:3550,vx:1.4,phase:0,cool:0},
  {x:4540,y:534,w:42,h:76,minX:4470,maxX:5150,vx:1.15,phase:0,cool:0},
  {x:6940,y:534,w:42,h:76,minX:6870,maxX:7470,vx:1.35,phase:0,cool:0},
  {x:9280,y:534,w:42,h:76,minX:9200,maxX:9990,vx:1.5,phase:0,cool:0}
];
const level3BossPlatforms=[
  {x:10880,y:450,w:230,h:20,type:'bone'},
  {x:11630,y:340,w:260,h:22,type:'bone'},
  {x:12420,y:455,w:230,h:20,type:'bone'}
];
const level3GhostBalls=[];
let level3GhostBallTimer=600;
let level3BossHealth=100;
let level3BossActive=false;
let level3BossDefeated=false;
let level3BossMushroom={x:11600,y:565,active:false};
let level3BossPowerTimer=0, level3BossHitThisPower=false, level3PinkUses=0;
const level3PurpleMushrooms=[];
const level3GhostGoon={x:540,y:500,w:76,h:76,vx:0,phase:0,active:false};
let level3GhostScreamCooldown=0;
const level3GhostSprite=new Image();
level3GhostSprite.src="assets/image_19.png";

function playLevel3GhostScream(){playEmbeddedSound('level3GhostScream');}

function startLevel3BossMusic(){
  stopNormalMusic();
  const bm=document.getElementById('level3BossMusic');
  if(bm){bm.loop=true;bm.volume=.78;bm.currentTime=0;bm.play().catch(()=>{});}
  const main=document.getElementById('bgMusic'); if(main){main.pause();main.currentTime=0;}
}
function stopLevel3BossMusic(){
  const bm=document.getElementById('level3BossMusic'); if(bm){bm.pause();bm.currentTime=0;}
}

function spawnLevel3PinkMushroom(){
  const minX=10260,maxX=13100;
  level3BossMushroom.x=minX+Math.random()*(maxX-minX);
  level3BossMushroom.y=545;
  level3BossMushroom.active=true;
  level3PinkUses++;
  if(level3PinkUses%3===0){
    const p=level3BossPlatforms[Math.floor(Math.random()*level3BossPlatforms.length)];
    level3PurpleMushrooms.push({x:p.x+20+Math.random()*Math.max(1,p.w-40),y:p.y-34,active:true});
  }
}
function resetLevel3PurpleMushrooms(){level3PurpleMushrooms.length=0;}

function resetLevel3(){
  player={x:90,y:500,w:30,h:44,vx:0,vy:0,onGround:false,coyote:0,jumpBuffer:0,health:100,pooCooldown:0,evilCooldown:0};
  camX=0;started=false;won=false;rainbowTimer=0;shroomTextTimer=0;pooTimer=0;
  level3BossHealth=100;level3BossActive=false;level3BossDefeated=false;
  level3BossMushroom.active=false;level3BossPowerTimer=0;level3BossHitThisPower=false;level3PinkUses=0;
  resetLevel3PurpleMushrooms();level3GhostBalls.length=0;level3GhostBallTimer=600;
  level3GhostGoon.x=540;level3GhostGoon.y=500;level3GhostGoon.phase=0;level3GhostGoon.active=false;
  level3GhostScreamCooldown=0;
  for(const s of level3Goonshrooms)s.active=false;for(const p of level3Poos)p.hit=false;
  for(const s of level3Skeletons){s.x=s.minX+80;s.vx=Math.abs(s.vx);s.cool=0;s.phase=0;}
  stopBossMusic();stopLevel3BossMusic();resetRegularLevelMusicOnRestart();
  document.getElementById('bossUI').style.display='none';document.getElementById('endScreen').style.display='none';
  document.getElementById('pooOverlay').classList.remove('show');document.getElementById('shroomText').classList.remove('show');
  msg.style.display='block';msg.innerHTML='<h1>CAVE MANIA</h1><p>Press SPACE to start</p>';updateHealthUI();
}

function level3PlayerOnFloor(oldY){
  player.onGround=false;
  for(const p of level3CaveFloor){
    if(player.x+player.w>p.x&&player.x<p.x+p.w&&oldY+player.h<=p.y&&player.y+player.h>=p.y&&player.vy>=0){
      player.y=p.y-player.h;player.vy=0;player.onGround=true;
    }
  }
  if(level3BossActive||level3BossDefeated){
    for(const p of level3BossPlatforms){
      if(player.x+player.w>p.x&&player.x<p.x+p.w&&oldY+player.h<=p.y&&player.y+player.h>=p.y&&player.vy>=0){
        player.y=p.y-player.h;player.vy=0;player.onGround=true;
      }
    }
  }
}

function updateLevel3(){
  const left=keys.KeyA||keys.ArrowLeft,right=keys.KeyD||keys.ArrowRight,jump=keys.Space||keys.ArrowUp;
  if(left)player.vx-=0.10;if(right)player.vx+=0.10;if(!left&&!right)player.vx*=0.94;
  player.vx=Math.max(-1.65,Math.min(1.65,player.vx));
  if(jump)player.jumpBuffer=7;else player.jumpBuffer=Math.max(0,player.jumpBuffer-1);
  if(player.onGround)player.coyote=7;else player.coyote=Math.max(0,player.coyote-1);
  if(player.jumpBuffer>0&&player.coyote>0){player.vy=-12.5;player.onGround=false;player.coyote=0;player.jumpBuffer=0;}
  player.vy+=0.20;player.vy=Math.min(player.vy,5);
  const oldY=player.y;player.x+=player.vx;player.y+=player.vy;level3PlayerOnFloor(oldY);
  if(player.x<0){player.x=0;player.vx=0;}
  if(player.y>760){resetLevel3();started=true;msg.style.display='none';startMusic();return;}

  // Ghost Goon follows during the parkour section.
  if(!level3BossActive&&!level3BossDefeated&&!level3GhostGoon.active&&Math.abs(player.vx)>0.05){level3GhostGoon.active=true;level3GhostGoon.x=player.x-190;level3GhostGoon.y=player.y-10;}
  if(!level3BossActive&&!level3BossDefeated&&level3GhostGoon.active){
    level3GhostGoon.phase+=0.04;
    const dx=(player.x+15)-(level3GhostGoon.x+38),dy=(player.y+22)-(level3GhostGoon.y+38),d=Math.hypot(dx,dy)||1;
    const ghostSpeed=1.1475;level3GhostGoon.x+=(dx/d)*ghostSpeed;level3GhostGoon.y+=(dy/d)*ghostSpeed;
    if(player.evilCooldown>0)player.evilCooldown--;
    if(player.evilCooldown===0&&rectHit(player,level3GhostGoon)){
      player.health=Math.max(0,player.health-20);player.evilCooldown=90;
      playLevel3GhostScream();
    }
    level3GhostGoon.x=Math.max(0,Math.min(14000-level3GhostGoon.w,level3GhostGoon.x));
    level3GhostGoon.y=Math.max(80,Math.min(610-level3GhostGoon.h,level3GhostGoon.y));
  }

  // Baby ghosts: fast projectiles throughout parkour.
  if(level3GhostScreamCooldown>0)level3GhostScreamCooldown--;
  if(level3GhostGoon.active&&!level3BossDefeated){
    level3GhostBallTimer--;
    if(level3GhostBallTimer<=0){
      const sx=level3GhostGoon.x+38,sy=level3GhostGoon.y+38,tx=player.x+15,ty=player.y+22,dx=tx-sx,dy=ty-sy,d=Math.hypot(dx,dy)||1,speed=6.08;
      level3GhostBalls.push({x:sx,y:sy,vx:dx/d*speed,vy:dy/d*speed,life:900});
      level3GhostBallTimer=600;
    }
  }
  for(let i=level3GhostBalls.length-1;i>=0;i--){
    const b=level3GhostBalls[i];b.x+=b.vx;b.y+=b.vy;b.life--;
    const hit=player.x<b.x+16&&player.x+player.w>b.x-16&&player.y<b.y+16&&player.y+player.h>b.y-16;
    if(hit&&bossEntryInvuln===0){
      player.health=Math.max(0,player.health-10);player.evilCooldown=45;playEmbeddedSound('snowSplashSound');level3GhostBalls.splice(i,1);continue;
    }
    if(b.life<=0||b.x<-400||b.x>14000||b.y<-400||b.y>900)level3GhostBalls.splice(i,1);
  }

  // Skeletons walk back and forth between cave holes.
  if(!level3BossActive&&!level3BossDefeated){
    for(const s of level3Skeletons){
      s.x+=s.vx;s.phase+=0.08;
      if(s.x<=s.minX||s.x>=s.maxX)s.vx*=-1;
      if(s.cool>0)s.cool--;
      if(s.cool===0&&rectHit(player,s) && player.evilCooldown===0){
        player.health=Math.max(0,player.health-30);s.cool=55;player.evilCooldown=45;
      }
    }
  }

  if(player.pooCooldown>0)player.pooCooldown--;
  for(const p of level3Poos){
    if(!p.hit&&player.pooCooldown===0&&Math.hypot(player.x+15-p.x,player.y+22-p.y)<38){
      p.hit=true;pooTimer=300;player.health=Math.max(0,player.health-10);player.pooCooldown=45;
      document.getElementById('pooOverlay').classList.add('show');playEmbeddedSound('pooSplashSound');
    }
  }
  for(const s of level3Goonshrooms){
    if(!s.active&&Math.hypot(player.x+15-s.x,player.y+22-s.y)<48){
      s.active=true;player.health=Math.min(100,player.health+10);rainbowTimer=900;shroomTextTimer=300;
      playGoonshroomSplat();playBigSplat();
    }
  }
  if(pooTimer>0){pooTimer--;if(pooTimer===0)document.getElementById('pooOverlay').classList.remove('show');}
  // Keep the MUSHROOM popup temporary in Level 3 just like the other levels.
  if(shroomTextTimer>0){shroomTextTimer--;if(shroomTextTimer===0)document.getElementById('shroomText').classList.remove('show');}

  // Enter the final cave boss area.
  if(!level3BossActive&&!level3BossDefeated&&player.x+player.w>10230){
    level3BossActive=true;startBossEntryInvulnerability();level3BossHealth=100;level3BossPowerTimer=0;level3BossHitThisPower=false;level3PinkUses=0;
    level3BossMushroom.active=false;resetLevel3PurpleMushrooms();level3GhostBalls.length=0;
    spawnLevel3PinkMushroom();startLevel3BossMusic();
    const bt=document.querySelector('#bossUI>div:first-child'); if(bt)bt.textContent='BETA GHOST';
    updateBossUILevel3();
  }
  if(level3BossActive&&!won){
    level3GhostGoon.active=true;level3GhostGoon.phase+=0.04;
    const dx=(player.x+15)-(level3GhostGoon.x+38),dy=(player.y+22)-(level3GhostGoon.y+38),d=Math.hypot(dx,dy)||1;
    const ghostSpeed=1.35;
    if(level3BossPowerTimer>0){
      level3GhostGoon.x+=(-dx/d)*ghostSpeed;level3GhostGoon.y+=(-dy/d)*ghostSpeed;level3BossPowerTimer--;
      if(!level3BossHitThisPower&&rectHit(player,level3GhostGoon)){
        level3BossHealth=Math.max(0,level3BossHealth-10);level3BossHitThisPower=true;playBigSplat();
      }
    }else{
      level3GhostGoon.x+=(dx/d)*ghostSpeed;level3GhostGoon.y+=(dy/d)*ghostSpeed;
      if(player.evilCooldown>0)player.evilCooldown--;
      if(bossEntryInvuln===0&&player.evilCooldown===0&&rectHit(player,level3GhostGoon)){
        player.health=Math.max(0,player.health-20);player.evilCooldown=90;playLevel3GhostScream();
      }
    }
    // Keep ghost goon inside final cave area.
    level3GhostGoon.x=Math.max(10240,Math.min(13300-level3GhostGoon.w,level3GhostGoon.x)); level3GhostGoon.y=Math.max(115,Math.min(610-level3GhostGoon.h,level3GhostGoon.y));
    if(level3BossPowerTimer===0&&level3BossHitThisPower)level3BossHitThisPower=false;

    // Ghost goon shoots baby ghosts during the boss fight too.
    level3GhostBallTimer--;
    if(level3GhostBallTimer<=0){
      const sx=level3GhostGoon.x+38,sy=level3GhostGoon.y+38,tx=player.x+15,ty=player.y+22,bdx=tx-sx,bdy=ty-sy,dist=Math.hypot(bdx,bdy)||1,speed=6.08;
      level3GhostBalls.push({x:sx,y:sy,vx:bdx/dist*speed,vy:bdy/dist*speed,life:900});
      level3GhostBallTimer=600;
    }

    if(level3BossMushroom.active&&Math.hypot(player.x+15-level3BossMushroom.x,player.y+22-level3BossMushroom.y)<48){
      level3BossMushroom.active=false;level3BossPowerTimer=1200;level3BossHitThisPower=false;
    }
    if(level3BossPowerTimer===0&&!level3BossMushroom.active&&level3BossHealth>0)spawnLevel3PinkMushroom();

    for(let i=level3PurpleMushrooms.length-1;i>=0;i--){
      const pm=level3PurpleMushrooms[i];
      if(Math.hypot(player.x+15-pm.x,player.y+22-pm.y)<44){
        player.health=Math.min(100,player.health+30);level3PurpleMushrooms.splice(i,1);playGoonshroomSplat();
      }
    }

    if(level3BossHealth<=0){
      level3BossActive=false;level3BossDefeated=true;level3GhostGoon.active=false;level3GhostBalls.length=0;
      level3BossMushroom.active=false;level3BossPowerTimer=0;resetLevel3PurpleMushrooms();stopLevel3BossMusic();
      level3FlagVisible=true;
    }
  }
  if(typeof level3FlagVisible==='undefined'){ level3FlagVisible=false; }
  if(level3FlagVisible&&!won&&player.x>13120){
    won=true;started=false;stopLevel3BossMusic();document.getElementById('bossUI').style.display='none';document.getElementById('endScreen').style.display='flex';
  }

  updateBossUILevel3();
  updateHealthUI();
  camX+=((player.x-350)-camX)*0.075;camX=Math.max(0,Math.min(13400,camX));
  hud.innerHTML=`DISTANCE: ${Math.max(0,Math.floor(player.x/10))} m`;
}

function updateBossUILevel3(){
  const hp=Math.max(0,Math.min(100,level3BossHealth));
  const fill=document.getElementById('bossFill'),txt=document.getElementById('bossText'),ui=document.getElementById('bossUI');
  if(fill)fill.style.width=hp+'%'; if(txt)txt.textContent=Math.ceil(hp)+'%';
  if(ui)ui.style.display=(level3BossActive&&!won)?'block':'none';
}

function drawLevel3Background(){
  ctx.fillStyle='#17191d';ctx.fillRect(0,0,W,H);
  // Dim cave gradients and rock.
  const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'#0e1014');g.addColorStop(.7,'#1b1e23');g.addColorStop(1,'#101114');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
  // Stalactites.
  ctx.fillStyle='#2a2e35';
  for(let i=0;i<26;i++){
    const x=i*180-(camX*.33%180)+35;
    const h=35+(i*37%95);
    ctx.beginPath();ctx.moveTo(x-22,0);ctx.lineTo(x+18,0);ctx.lineTo(x+6,h);ctx.lineTo(x-2,h+22);ctx.lineTo(x-10,h);ctx.closePath();ctx.fill();
  }
  // Side rocks.
  ctx.fillStyle='#242830';
  for(let i=0;i<12;i++){
    const x=i*290-(camX*.22%290)-30;
    ctx.beginPath();ctx.arc(x,560,95,Math.PI,Math.PI*2);ctx.fill();
  }
  // Dim torches.
  for(let i=0;i<12;i++){
    const x=i*430-(camX*.38%430)+90,y=255+(i%3)*82;
    ctx.strokeStyle='#31343a';ctx.lineWidth=7;ctx.beginPath();ctx.moveTo(x,y+28);ctx.lineTo(x,y+5);ctx.stroke();
    const glow=ctx.createRadialGradient(x,y,2,x,y,55);
    glow.addColorStop(0,'rgba(255,186,80,.16)');glow.addColorStop(1,'rgba(255,186,80,0)');
    ctx.fillStyle=glow;ctx.beginPath();ctx.arc(x,y,55,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#c77b2d';ctx.beginPath();ctx.arc(x,y,6,0,Math.PI*2);ctx.fill();
  }
  if(level3BossActive||level3BossDefeated){
    ctx.fillStyle='#0b0c0f';ctx.fillRect(0,80,W,500);
    // skulls in boss area background
    for(let i=0;i<10;i++){
      const x=i*155-(camX*.25%155)+30,y=250+(i%3)*95;
      ctx.fillStyle='#b9b7ae';ctx.beginPath();ctx.arc(x,y,22,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='#202126';ctx.beginPath();ctx.arc(x-7,y-3,5,0,Math.PI*2);ctx.arc(x+7,y-3,5,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='#b9b7ae';ctx.fillRect(x-10,y+14,20,9);
    }
  }
}

function drawLevel3CaveFloor(){
  for(const p of level3CaveFloor){
    const x=p.x-camX;
    ctx.fillStyle='#3a3d43';ctx.fillRect(x,p.y,p.w,p.h);
    ctx.fillStyle='#4b4e55';ctx.fillRect(x,p.y,p.w,12);
    ctx.strokeStyle='#202227';ctx.lineWidth=3;
    for(let xx=x+35;xx<x+p.w;xx+=70){ctx.beginPath();ctx.moveTo(xx,p.y);ctx.lineTo(xx+18,p.y+30);ctx.stroke();}
  }
  // Deep holes between floor segments.
  for(let i=0;i<level3CaveFloor.length-1;i++){
    const x=level3CaveFloor[i].x+level3CaveFloor[i].w-camX;
    const next=level3CaveFloor[i+1].x-camX;
    ctx.fillStyle='#020305';ctx.fillRect(x,610,next-x,90);
    ctx.fillStyle='rgba(70,20,30,.35)';ctx.fillRect(x,610,next-x,12);
  }
  if(level3BossActive||level3BossDefeated){
    // Boss-area floor extends into the final chamber.
    ctx.fillStyle='#35383e';
    ctx.fillRect(10220-camX,610,3200,90);
    ctx.fillStyle='#4b4e55';ctx.fillRect(10220-camX,610,3200,12);
  }
}

function drawLevel3Skeleton(s){
  const x=s.x-camX,y=s.y+Math.sin(s.phase)*3;ctx.save();
  ctx.fillStyle='#ddd9ca';ctx.beginPath();ctx.arc(x+21,y+18,16,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#1d1f24';ctx.beginPath();ctx.arc(x+15,y+16,4,0,Math.PI*2);ctx.arc(x+27,y+16,4,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#e2ddce';ctx.fillRect(x+17,y+33,8,24);
  ctx.strokeStyle='#e2ddce';ctx.lineWidth=5;
  ctx.beginPath();ctx.moveTo(x+21,y+38);ctx.lineTo(x-2,y+50);ctx.moveTo(x+21,y+38);ctx.lineTo(x+44,y+50);ctx.moveTo(x+21,y+57);ctx.lineTo(x+3,y+73);ctx.moveTo(x+21,y+57);ctx.lineTo(x+40,y+73);ctx.stroke();
  ctx.restore();
}

function drawLevel3GhostGoon(){
  const x=level3GhostGoon.x-camX,y=level3GhostGoon.y+Math.sin(level3GhostGoon.phase)*6;
  if(!level3GhostGoon.active)return;
  ctx.save();
  ctx.globalAlpha=.28;ctx.fillStyle='#9ce9ff';ctx.shadowColor='#9ce9ff';ctx.shadowBlur=32;
  ctx.beginPath();ctx.arc(x+38,y+38,62,0,Math.PI*2);ctx.fill();
  ctx.globalAlpha=.98;ctx.beginPath();ctx.arc(x+38,y+38,38,0,Math.PI*2);ctx.clip();
  if(level3GhostSprite.complete)ctx.drawImage(level3GhostSprite,x,y,76,76);
  else{ctx.fillStyle='#dbefff';ctx.beginPath();ctx.arc(x+38,y+38,38,0,Math.PI*2);ctx.fill();}
  ctx.restore();
  ctx.fillStyle='#dff8ff';ctx.font='bold 13px Arial';ctx.textAlign='center';ctx.fillText('BETA GHOST',x+38,y-12);
}

function drawLevel3GhostBalls(){
  for(const b of level3GhostBalls){
    const x=b.x-camX,y=b.y;ctx.save();
    ctx.globalAlpha=.9;ctx.fillStyle='#d9fbff';ctx.shadowColor='#b8f4ff';ctx.shadowBlur=14;
    ctx.beginPath();ctx.arc(x,y,11,0,Math.PI*2);ctx.fill();
    ctx.globalAlpha=.45;ctx.strokeStyle='#ffffff';ctx.lineWidth=2;ctx.stroke();ctx.restore();
  }
}

function drawLevel3BossMushroom(){
  if(!level3BossMushroom.active)return;
  const x=level3BossMushroom.x-camX,y=level3BossMushroom.y;
  ctx.save();ctx.shadowColor='#ff4edb';ctx.shadowBlur=26;ctx.fillStyle='#ff72ed';
  ctx.beginPath();ctx.arc(x,y-7,19,Math.PI,0);ctx.fill();ctx.fillStyle='#f6cfff';ctx.fillRect(x-5,y-7,10,28);
  ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(x-7,y-14,4,0,Math.PI*2);ctx.arc(x+7,y-15,4,0,Math.PI*2);ctx.fill();
  ctx.restore();
}

function drawLevel3PurpleMushrooms(){
  for(const pm of level3PurpleMushrooms){
    const x=pm.x-camX,y=pm.y;ctx.save();ctx.fillStyle='#b47cff';ctx.shadowColor='#8b45ff';ctx.shadowBlur=18;
    ctx.beginPath();ctx.arc(x,y-8,17,Math.PI,0);ctx.fill();ctx.fillStyle='#fff0ff';ctx.fillRect(x-4,y-8,8,24);ctx.restore();
  }
}

function drawLevel3BonePlatform(p){
  const x=p.x-camX,y=p.y;ctx.save();ctx.strokeStyle='#c8c0ab';ctx.lineWidth=18;ctx.lineCap='round';
  ctx.beginPath();ctx.moveTo(x+20,y+10);ctx.lineTo(x+p.w-20,y+10);ctx.stroke();
  ctx.fillStyle='#ddd5bf';
  for(const bx of [x+12,x+p.w-12]){ctx.beginPath();ctx.arc(bx,y+10,13,0,Math.PI*2);ctx.fill();}
  ctx.restore();
}

let level3FlagVisible=false;
function drawLevel3Flag(){
  if(!level3FlagVisible)return;
  const x=13260-camX;ctx.strokeStyle='#d7d7d7';ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(x,610);ctx.lineTo(x,500);ctx.stroke();
  ctx.fillStyle='#ffd34e';ctx.beginPath();ctx.moveTo(x,502);ctx.lineTo(x+70,522);ctx.lineTo(x,544);ctx.closePath();ctx.fill();
}

function drawLevel3(){
  drawLevel3Background();
  drawLevel3CaveFloor();
  for(const p of level3BossPlatforms){if(level3BossActive||level3BossDefeated)drawLevel3BonePlatform(p);}
  for(const s of level3Skeletons){if(!level3BossActive&&!level3BossDefeated)drawLevel3Skeleton(s);}
  for(const p of level3Goonshrooms)drawGoonshroom(p);
  for(const p of level3Poos){if(!level3BossActive)drawPoo(p);}
  if(level3BossActive||level3BossDefeated){drawLevel3BossMushroom();drawLevel3PurpleMushrooms();}
  drawLevel3GhostBalls();drawLevel3GhostGoon();drawLevel3Flag();
  if(level3BossActive&&level3BossPowerTimer>0){
    ctx.save();const x=player.x-camX+15,y=player.y+22,pulse=22+7*Math.sin(Date.now()/90);
    ctx.globalAlpha=.28;ctx.fillStyle='#8fe8ff';ctx.shadowColor='#8fe8ff';ctx.shadowBlur=30;ctx.beginPath();ctx.arc(x,y,pulse,0,Math.PI*2);ctx.fill();
    ctx.globalAlpha=.75;ctx.strokeStyle='#dffbff';ctx.lineWidth=3;ctx.beginPath();ctx.arc(x,y,pulse+7,0,Math.PI*2);ctx.stroke();ctx.restore();
  }
  drawPlayer();
  ctx.fillStyle='rgba(255,255,255,.32)';ctx.fillRect(350,665,500,8);
  ctx.fillStyle='#d5f4ff';ctx.fillRect(350,665,500*Math.min(1,player.x/13400),8);
}

// Use the user's attached laugh only for Level 1 Goon contact.
currentLevel=5; // default initial level after all level-specific declarations are initialized

function draw(){
 if(currentLevel===1){ drawLevel1(); return; }
 if(currentLevel===2){ drawLevel2(); return; }
 if(currentLevel===3){ drawLevel3(); return; }
 if(currentLevel===4){ drawLevel4(); return; }
 if(currentLevel===101){ drawSpecial1(); return; }
 if(currentLevel===102){ drawSpecial2(); return; }
 if(currentLevel===103){ drawSpecial3(); return; }
 if(currentLevel===104){ drawSpecial4(); return; }
 if(currentLevel===105){ drawSpecial5(); return; }
 drawBackground();
 if(!bossActive)drawStageProps();
 ctx.save();
 for(const p of platforms)drawPlatform(p);
 drawLevel5Spikes();
 drawCarnivorousPlant();
 drawBossPlatforms();
 for(const s of goonshrooms)drawGoonshroom(s); for(const p of poos)drawPoo(p); if(bossActive||bossDefeated){drawBossMushroom();drawBossPurpleMushrooms();} if(evilGoon.active)drawEvilGoon();
 drawMiniGoon();
 drawStoodSlimeBalls();
 drawStood();
 drawFinish();
 drawSnowballs();
 drawPlayer();
 ctx.restore();

 // tiny progress bar
 ctx.fillStyle="rgba(255,255,255,.55)";ctx.fillRect(350,665,500,8);
 ctx.fillStyle="#17304d";ctx.fillRect(350,665,500*Math.min(1,player.x/13400),8);
}

function loop(){update();draw();requestAnimationFrame(loop)}
loop();
