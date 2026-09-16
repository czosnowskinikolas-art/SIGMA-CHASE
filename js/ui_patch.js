const _special2TimerEl=document.getElementById("special2Timer");
const _oldUpdateSpecial2TimerDisplay=drawSpecial2Timer;
drawSpecial2Timer=function(){_oldUpdateSpecial2TimerDisplay();if(_special2TimerEl)_special2TimerEl.style.display=currentLevel===102&&started?"block":"none";};
