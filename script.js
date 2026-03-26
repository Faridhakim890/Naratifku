let db = JSON.parse(localStorage.getItem('rn')) || [];
let isAdmin = false;
let fontSize = 1.2;

function renderHome(){
  const grid = document.getElementById('novel-grid');
  grid.innerHTML = db.map(n=>`<div class="card" onclick="openNovel('${n.id}')">
    <img src="${n.cover}" class="cover-img">
    <div style="padding:10px"><b>${n.title}</b><p style="font-size:12px">${n.sinopsis}</p></div>
  </div>`).join('');
}

function saveNovel(){
  const n = { id: Date.now(), title: prompt("Tajuk"), sinopsis: prompt("Sinopsis"), cover:"https://via.placeholder.com/200"};
  db.push(n); localStorage.setItem('rn', JSON.stringify(db));
  renderHome();
}

function openNovel(id){
  const n = db.find(x=>x.id==id);
  document.getElementById('r-title').innerText = n.title;
  document.getElementById('r-info').innerText = "Bab 1";
  document.getElementById('r-sinopsis').innerText = n.sinopsis;
  document.getElementById('r-body').innerText = "Isi cerita penuh...";
  document.getElementById('r-body').classList.add('blurred');
  document.getElementById('paywall').style.display = 'block';

  // Auto trigger popunder
  const script = document.createElement('script');
  script.src = 'https://pl28985704.profitablecpmratenetwork.com/34/79/80/347980583ec54b5d44aa680b6c988447.js';
  document.body.appendChild(script);
}

function unlock(){
  let btn = document.getElementById('ad-btn');
  let t = 5; btn.disabled = true;
  let timer = setInterval(()=>{
    btn.innerText = "Menonton iklan... "+t+"s"; t--;
    if(t<0){ clearInterval(timer); document.getElementById('r-body').classList.remove('blurred'); document.getElementById('paywall').style.display='none'; btn.disabled=false; btn.innerText="BUKA (5s)";}
  },1000);
}

function checkAdmin(){ let p = prompt("Kod"); if(p==="1234") saveNovel();}

renderHome();
