//---------------Declaring Variables------------------//
const blue=document.getElementById('blue'),
purple=document.getElementById('purple'),
black=document.getElementById('black'),
red=document.getElementById('red'),
pink=document.getElementById('pink'),
watch=document.getElementById('watch-image'),
time=document.getElementById('time')
today=new Date();


//---------------For Time------------------//
function currentTime() {
    var date = new Date(); /* creating object of Date class */
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    hour = updateTime(hour);
    min = updateTime(min);
    sec = updateTime(sec);
    time.innerText = hour + " : " + min + " : " + sec; /* adding time to the div */
    setTimeout(()=>{currentTime()}, 1000); /* setting timer */
  }
  
  function updateTime(k) {
    if (k < 10) {
      return "0" + k;
    }
    else {
      return k;
    }
  }
  
  currentTime(); /* calling currentTime() function to initiate the process */


//---------------Blue color------------------//
blue.addEventListener('click',()=>{
watch.src='https://i.imgur.com/Mplj1YR.png';
watch.alt="smart-watch-blue";
})

//---------------Purple color------------------//
purple.addEventListener('click',()=>{
watch.src='https://i.imgur.com/xSIK4M8.png';
watch.alt="smart-watch-purple";
})

//---------------Black color------------------//
black.addEventListener('click',()=>{
    watch.src='https://i.imgur.com/iOeUBV7.png';
watch.alt="smart-watch-black";
})

//---------------Red color ------------------//
red.addEventListener('click',()=>{
    watch.src='https://i.imgur.com/PTgQlim.png';
watch.alt="smart-watch-red";
})

//---------------Pink Color------------------//
pink.addEventListener('click',()=>{
    watch.src='https://i.imgur.com/Zygu7I3.png';
watch.alt="smart-watch-pink";
})

