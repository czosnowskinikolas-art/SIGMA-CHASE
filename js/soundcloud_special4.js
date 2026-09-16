let special4SoundCloudFrame = null;
let special4SoundCloudWidget = null;
const SPECIAL4_SOUNDCLOUD_URL = 'https://soundcloud.com/mikeeysmind-scmusic/vvv-guitar-remix';

function startSpecial4Music(){
  try{
    // SoundCloud autoplay is most reliable when the player is created from a user gesture
    // (the SPACE key or the music button). Keep the iframe rendered, but visually hidden.
    if(special4SoundCloudFrame && special4SoundCloudWidget) return;
    if(special4SoundCloudFrame && !special4SoundCloudWidget){
      try{special4SoundCloudFrame.remove();}catch(e){}
      special4SoundCloudFrame=null;
    }
    const iframe=document.createElement('iframe');
    iframe.id='special4SoundCloudFrame';
    iframe.title='Special 4 music';
    iframe.width='300'; iframe.height='166'; iframe.scrolling='no'; iframe.frameBorder='no';
    iframe.allow='autoplay; encrypted-media';
    iframe.style.position='fixed'; iframe.style.width='300px'; iframe.style.height='166px';
    iframe.style.left='-1000px'; iframe.style.top='-1000px'; iframe.style.opacity='0.001'; iframe.style.pointerEvents='none';
    iframe.src='https://w.soundcloud.com/player/?url='+encodeURIComponent(SPECIAL4_SOUNDCLOUD_URL)+'&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false';
    document.body.appendChild(iframe);
    special4SoundCloudFrame=iframe;

    const attachWidget=()=>{
      try{
        if(!window.SC || !SC.Widget) return false;
        if(special4SoundCloudWidget) return true;
        special4SoundCloudWidget=SC.Widget(iframe);
        special4SoundCloudWidget.bind(SC.Widget.Events.READY,()=>{
          try{
            special4SoundCloudWidget.setVolume(70);
            const pr=special4SoundCloudWidget.play();
            if(pr && pr.catch) pr.catch(()=>{});
          }catch(e){}
        });
        special4SoundCloudWidget.bind(SC.Widget.Events.FINISH,()=>{
          try{special4SoundCloudWidget.seekTo(0);special4SoundCloudWidget.play();}catch(e){}
        });
        // Try immediately as well; READY will retry once the widget is initialized.
        try{special4SoundCloudWidget.play();}catch(e){}
        return true;
      }catch(e){ return false; }
    };

    iframe.addEventListener('load',()=>{ attachWidget(); },{once:true});
    // The API script can load after this function, so retry briefly.
    let tries=0;
    const waitForSC=setInterval(()=>{
      tries++;
      if(attachWidget() || tries>=40) clearInterval(waitForSC);
    },250);
  }catch(e){}
}
function stopSpecial4Music(){
  try{
    if(special4SoundCloudWidget){try{special4SoundCloudWidget.pause();}catch(e){} special4SoundCloudWidget=null;}
    if(special4SoundCloudFrame){special4SoundCloudFrame.remove();special4SoundCloudFrame=null;}
    const old=document.getElementById('special4SoundCloudFrame'); if(old)old.remove();
  }catch(e){}
}
