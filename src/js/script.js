const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const col=['pink','sky','butter','lilac','mint'];

/* ---------- Cartoon cat faces ---------- */
function cat(c,o='#fff',stripe=0,eye='#6aa8a0'){return `<svg viewBox="0 0 120 110" aria-hidden="true"><path d="M22 52 18 8l34 22zM98 52 102 8 68 30z" fill="${c}"/><path d="M26 40 25 20l15 10zM94 40 95 20 80 30z" fill="#f4b6c2"/><ellipse cx="60" cy="68" rx="46" ry="38" fill="${c}"/>${stripe?`<path d="M60 31v14M48 33l3 12M72 33l-3 12" stroke="${o}" stroke-width="5" stroke-linecap="round"/>`:''}<ellipse cx="60" cy="80" rx="20" ry="15" fill="${o}" opacity=".85"/><ellipse cx="40" cy="64" rx="7" ry="8" fill="#fff"/><ellipse cx="80" cy="64" rx="7" ry="8" fill="#fff"/><circle cx="41" cy="65" r="5" fill="${eye}"/><circle cx="79" cy="65" r="5" fill="${eye}"/><circle cx="42" cy="63" r="1.8" fill="#fff"/><circle cx="80" cy="63" r="1.8" fill="#fff"/><path d="M55 74h10l-5 5z" fill="#e98598"/><path d="M60 79v4m-8 0q8 6 16 0" stroke="#7d5a6a" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M20 72H6M20 78 8 82M100 72h14M100 78l12 4" stroke="#7d5a6a" stroke-width="1.5" stroke-linecap="round"/></svg>`}

/* ---------- Scroll-Triggered Hero Transformation ---------- */
window.addEventListener('scroll', () => {
  const hero = $('.hero');
  if (!hero) return;
  const scrollY = window.scrollY;
  const heroHeight = hero.offsetHeight;
  
  if (scrollY <= heroHeight) {
    const progress = scrollY / heroHeight;
    // Scales down smoothly, tilts slightly back in 3D space, and fades out as you scroll down
    const scale = 1 - (progress * 0.12);
    const translateY = progress * 40;
    const rotateX = progress * 8;
    const opacity = 1 - (progress * 0.9);
    
    hero.style.transform = `translateY(${translateY}px) scale(${scale}) rotateX(${rotateX}deg)`;
    hero.style.opacity = opacity;
  }
});

/* ---------- Floating emoji + paw trail ---------- */
function burst(x,y,e='💗',n=5){for(let i=0;i<n;i++){const s=document.createElement('span');s.className='float';s.textContent=e;s.style.left=x+(Math.random()*60-30)+'px';s.style.top=y+(Math.random()*20-10)+'px';s.style.animationDelay=i*.08+'s';document.body.append(s);setTimeout(()=>s.remove(),1500)}}
let last=0;addEventListener('pointermove',e=>{if(e.pointerType!=='mouse'||Date.now()-last<140)return;last=Date.now();const t=document.createElement('span');t.className='trail';t.style.left=e.clientX-11+'px';t.style.top=e.clientY-11+'px';t.innerHTML='<svg viewBox="0 0 32 32" fill="#e9879b"><ellipse cx="16" cy="21" rx="8" ry="6.5"/><ellipse cx="6" cy="13" rx="3" ry="4"/><ellipse cx="12.5" cy="7" rx="3" ry="4"/><ellipse cx="19.5" cy="7" rx="3" ry="4"/><ellipse cx="26" cy="13" rx="3" ry="4"/></svg>';document.body.append(t);setTimeout(()=>t.remove(),1000)});

/* ---------- Dark mode ---------- */
const root=document.documentElement;
function setMode(d){root.dataset.bsTheme=d?'dark':'light';$('#mode').textContent=d?'☀️':'🌙'}
setMode(matchMedia('(prefers-color-scheme:dark)').matches);
$('#mode').onclick=()=>setMode(root.dataset.bsTheme!=='dark');

/* ---------- Kitten care game ---------- */
let purrs=0,mood=40;const moods=[[20,'Sleepy and grumpy 😿'],[45,'Calm and curious 😺'],[75,'Happy and purring 😸'],[101,'Pure joy! 😻']];
const acts={pet:['💗',8],treat:['🐟',12],play:['🧶',10],nap:['💤',-5]};
function act(k,x,y){const[e,d]=acts[k];mood=Math.max(0,Math.min(100,mood+d));if(k!=='nap')purrs++;
 $('#purrs').textContent=purrs;$('#bar').style.width=mood+'%';$('#moodtxt').textContent=moods.find(m=>mood<m[0])[1];
 burst(x,y,e);const kit=$('#kit');kit.classList.remove('wiggle');void kit.offsetWidth;kit.classList.add('wiggle')}
$$('[data-act]').forEach(b=>b.onclick=e=>{const r=b.getBoundingClientRect();act(b.dataset.act,r.left+r.width/2,r.top)});
$('#kit').onclick=e=>act('pet',e.clientX,e.clientY);
$('#kit').onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();const r=e.target.getBoundingClientRect();act('pet',r.left+r.width/2,r.top+80)}};

/* ---------- Gallery ---------- */
const G=[['Sunbeam nap','photo','#f1b8a0','#fff'],['Box fort','video','#9fb3c8','#e8eef5'],['Zoomies','video','#f4c26b','#fff5dc'],['Tiny toe beans','photo','#c8bde0','#fff'],['Loaf mode','photo','#b5b0a8','#f1eee8'],['Slow blink','video','#6f6670','#cfc8d2'],['Window watcher','photo','#e8e2d8','#fff'],['Yarn chaser','video','#c98f5a','#f3dcc0']];
const modal=new bootstrap.Modal('#m');
$('#gal').innerHTML=G.map((g,i)=>`<div class="col-6 col-md-3" data-t="${g[1]}"><button class="tilec" style="background:var(--${col[i%5]})" data-i="${i}" aria-label="${g[0]}">${cat(g[2],g[3],i%2)}<span class="cap">${g[0]}</span>${g[1]==='video'?'<span class="play-i">▶</span>':''}</button></div>`).join('');
$$('.tilec').forEach(b=>b.onclick=()=>{const g=G[b.dataset.i];$('#mv').innerHTML=`<div style="width:55%;margin:auto">${cat(g[2],g[3],b.dataset.i%2)}</div>`;$('#mt').textContent=g[0];$('#mp').textContent=g[1]==='video'?'Your video will play here once you add the clip.':'Your photo will go here once you add it.';modal.show()});
$$('#filters button').forEach(b=>b.onclick=()=>{$$('#filters button').forEach(x=>x.classList.toggle('active',x===b));$$('#gal>div').forEach(d=>d.hidden=b.dataset.f!=='all'&&d.dataset.t!==b.dataset.f)});

/* ---------- Facts ---------- */
const F=[['Cats sleep a lot','Most adults nap 12 to 16 hours a day, and kittens even more.'],['Whiskers are sensors','They help cats judge gaps and sense air movement nearby.'],['Purring','Purr vibrations sit around 25 to 150 Hz, a range linked with calm and comfort.'],['Slow blinks mean love','Blink slowly at your cat. They often blink back as a sign of trust.'],['Unique noses','A cat’s nose pad pattern is like a human fingerprint.'],['Great jumpers','Cats can leap about five or six times their own height.']];
$('#fg').innerHTML=F.map((f,i)=>`<div class="col-12 col-sm-6 col-lg-4"><button class="fcard"><div class="fin"><div class="ff" style="background:var(--${col[i%5]})">${f[0]}</div><div class="fb">${f[1]}</div></div></button></div>`).join('');
$$('.fcard').forEach(b=>b.onclick=()=>b.classList.toggle('on'));
const local=F.map(f=>f[1]);
$('#rand').onclick=async e=>{let t;try{t=(await (await fetch('/api/fact')).json()).fact}catch{t=local[Math.random()*local.length|0]}
 $('#randtxt').textContent='🐱 '+t;burst(e.clientX,e.clientY,'✨',4)};

/* ---------- Breeds ---------- */
const B=[['Tabby','Friendly, curious, easygoing. Tabby is a coat pattern, not a breed, so it shows up everywhere.','#a9a39b','#e6e0d6',1],['Siamese','Chatty, loyal and loves company. Expect a lot of opinions.','#efe2cf','#8a6a5a',0,'#6aa8d8'],['Maine Coon','A gentle giant with a fluffy mane and a chirpy voice.','#c98f5a','#f3dcc0',1],['Persian','Calm, sweet and loves lap time. Needs daily brushing.','#f4f0ea','#fff',0,'#e0a458'],['British Shorthair','Plush, easygoing and independent. Happy to nap near you.','#9fb0c4','#dfe7f0',0,'#e0a458'],['Ragdoll','Floppy, gentle and follows you from room to room.','#e8e2f0','#fff',0,'#6aa8d8']];
$('#bg').innerHTML=B.map((b,i)=>`<div class="col-12 col-sm-6 col-lg-4"><button class="bc" data-i="${i}"><div class="pic" style="background:var(--${col[i%5]})">${cat(b[2],b[3],b[4],b[5])}</div><div class="in"><h3>${b[0]}</h3><span class="tag">Cuddly</span><span class="tag">Indoor friendly</span></div></button></div>`).join('');
$$('.bc').forEach(b=>b.onclick=()=>{const x=B[b.dataset.i];$('#mv').innerHTML=`<div style="width:55%;margin:auto">${cat(x[2],x[3],x[4],x[5])}</div>`;$('#mt').textContent=x[0];$('#mp').textContent=x[1];modal.show()});

/* ---------- Quiz ---------- */
const Q=[['Perfect Saturday?',['Zooming around the house','Napping in a sunbeam','Chatting with everyone']],['Pick a snack',['Tuna, always','Something fancy','Whatever you’re eating']],['Your friends say you are…',['Fearless','Calm','Talkative']]];
const R=[['Maine Coon','Big energy, bigger heart.',2],['Persian','Elegant, calm and totally unbothered.',3],['Siamese','You always have something to say.',1]];
let step=0,sc=[0,0,0];
function render(){const b=$('#qbox');if(step<Q.length){b.innerHTML=`<h3 class="mb-3">${Q[step][0]}</h3>`+Q[step][1].map((o,i)=>`<button class="btn btn-cute opt" data-i="${i}">${o}</button>`).join('')+`<small class="text-muted">Question ${step+1} of ${Q.length}</small>`;$$('.opt').forEach(o=>o.onclick=()=>{sc[o.dataset.i]++;step++;render()})}
 else{const w=sc.indexOf(Math.max(...sc)),r=R[w],bi=B.findIndex(x=>x[0]===r[0]),x=B[bi];b.innerHTML=`<div style="width:42%;margin:auto">${cat(x[2],x[3],x[4],x[5])}</div><h3 class="mt-2">You’re a ${r[0]}!</h3><p>${r[1]}</p><button class="btn btn-cute" id="again">Try again</button>`;const r2=b.getBoundingClientRect();burst(r2.left+r2.width/2,r2.top+80,'🎉',6);$('#again').onclick=()=>{step=0;sc=[0,0,0];render()}}}
render();

/* ---------- Care tips ---------- */
const C=[['Food and water','Feed measured meals of complete cat food suited to their age. Keep fresh water out all day, and try a fountain if your cat ignores bowls.'],['Litter box','Offer one box per cat plus one spare. Scoop daily, wash weekly, and place it somewhere quiet.'],['Play and scratching','Play for 10 to 15 minutes twice a day with wand toys. Give sturdy scratching posts so furniture stays safe.'],['Vet visits','Schedule a yearly checkup, keep vaccines current, and ask about spaying or neutering. Call the vet if appetite or litter habits change.'],['Grooming','Brush short coats weekly and long coats daily. Trim nails every few weeks and check teeth and ears.']];
$('#acc').innerHTML=C.map((c,i)=>`<div class="accordion-item"><h3 class="accordion-header"><button class="accordion-button ${i?'collapsed':''}" data-bs-toggle="collapse" data-bs-target="#c${i}">${c[0]}</button></h3><div id="c${i}" class="accordion-collapse collapse ${i?'':'show'}" data-bs-parent="#acc"><div class="accordion-body">${c[1]}</div></div></div>`).join('');