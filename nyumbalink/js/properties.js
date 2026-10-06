// Shared helpers + sample data + saved properties (localStorage for now)
(function(){
var NL=window.NL=window.NL||{};
function g(k,d){try{var v=localStorage.getItem(k);return v===null?d:JSON.parse(v)}catch(e){return d}}
function s(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
NL.ls={get:g,set:s};
function P(id,name,loc,dist,type,rent,st,txt,ago,hrs,am,vid,landlord,rating,reviews){return{id:id,name:name,loc:loc,dist:dist,type:type,rent:rent,deposit:rent,status:st,statusText:txt,verifiedAgo:ago,hours:hrs,amenities:am.split(','),video:vid!==0,verified:true,landlord:landlord||'Demo Landlord',rating:rating||4.7,reviews:reviews||18}}
NL.properties=[
P('tudor-student-residences','Tudor Student Residences','Tudor, Mombasa','8 min walk to Mombasa Technical University','Single room',5000,'a','Available now — confirmed 2 hours ago','2 hours ago',2,'Water,Electricity,Wi-Fi,Security',1,'Amina Hassan',4.8,32),
P('nyali-bedsitters','Nyali Bedsitters','Nyali, Mombasa','5 min walk to Nyali Centre','Bedsitter',10000,'a','Available now — confirmed yesterday','yesterday',24,'Water,Electricity,Parking,Security,Cooking',1,'Mariam Properties',4.6,21),
P('bamburi-court-apartments','Bamburi Court Apartments','Bamburi, Mombasa','Near Bamburi Mtambo stage','1 Bedroom',14500,'a','Available now','3 days ago',72,'Water,Electricity,Wi-Fi,Parking,Backup power',1,'Coastal Homes KE',4.9,47),
P('changamwe-student-hostel','Changamwe Student Hostel','Changamwe, Mombasa','10 min matatu to town','Student room',4200,'c','Availability needs confirmation','5 days ago',120,'Water,Electricity,Laundry',0,'Juma & Sons',4.4,15),
P('kisauni-family-home','Kisauni Family Home','Kisauni, Mombasa','2 min walk to Kisauni road','2 Bedroom',18000,'a','Available now','last week',168,'Water,Electricity,Borehole,Parking,Cooking',1,'Kisauni Homes',4.7,28),
P('likoni-heights','Likoni Heights','Likoni, Mombasa','7 min walk to Likoni ferry','Single room',6500,'u','Currently unavailable','2 days ago',48,'Water,Electricity,Security',1,'Likoni Rentals',4.2,9),
P('mtwapa-palm-rooms','Mtwapa Palm Rooms','Mtwapa, Kilifi','3 min walk to Mtwapa stage','Bedsitter',7800,'a','Last confirmed 5 days ago','5 days ago',120,'Water,Electricity,Wi-Fi',1,'Palm Coast Rentals',4.5,19),
P('moi-avenue-studio-flats','Moi Avenue Studio Flats','Mombasa CBD','2 min walk to Moi Avenue','Apartment',22000,'a','Available now','today',0,'Water,Electricity,Wi-Fi,Security,Backup power',1,'Mombasa City Living',4.9,54)
];
var ICON={a:'🟢',c:'🟡',u:'🔴'},CLS={a:'status-available',c:'status-confirm',u:'status-unavailable'};
NL.fmt=function(n){return Number(n).toLocaleString('en-US')};
NL.slug=function(t){return t.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')};
var DEMO_IMAGES={
 'tudor-student-residences':'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
 'nyali-bedsitters':'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
 'bamburi-court-apartments':'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
 'changamwe-student-hostel':'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
 'kisauni-family-home':'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80',
 'likoni-heights':'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80',
 'mtwapa-palm-rooms':'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
 'moi-avenue-studio-flats':'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80'
};
var DEMO_GALLERY=[
 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80',
 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=900&q=80',
 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=900&q=80',
 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=80',
 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80'
];
NL.applyDemoImages=function(){
 document.querySelectorAll('.property-card').forEach(function(card){
   var id=card.getAttribute('data-id')||NL.slug((card.querySelector('.property-name')||{}).textContent||'');
   var box=card.querySelector('.property-image'); if(box&&DEMO_IMAGES[id]) box.innerHTML='<img src="'+DEMO_IMAGES[id]+'" alt="Demo property photo" loading="lazy">';
 });
 var hero=document.querySelector('.hero-image-placeholder'); if(hero) hero.innerHTML='<img src="https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=1400&q=80" alt="Demo modern rental interior">';
 var land=document.querySelector('.landlord-image-placeholder'); if(land) land.innerHTML='<img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80" alt="Demo rental property exterior">';
 var ver=document.querySelector('.verification-image-placeholder'); if(ver) ver.innerHTML='<img src="https://images.unsplash.com/photo-1560185008-b033106af5c3?auto=format&fit=crop&w=1200&q=80" alt="Demo property inspection">';
 var gallery=document.getElementById('property-gallery'); if(gallery){var boxes=gallery.querySelectorAll('.image-placeholder'); boxes.forEach(function(box,i){if(DEMO_GALLERY[i]) box.innerHTML='<img src="'+DEMO_GALLERY[i]+'" alt="Demo property gallery image '+(i+1)+'" loading="lazy">'});}
};
var DEMO_IMAGES={
 'tudor-student-residences':'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
 'nyali-bedsitters':'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
 'bamburi-court-apartments':'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
 'changamwe-student-hostel':'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
 'kisauni-family-home':'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80',
 'likoni-heights':'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80',
 'mtwapa-palm-rooms':'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
 'moi-avenue-studio-flats':'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80'
};
var DEMO_GALLERY=[
 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80',
 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=900&q=80',
 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=900&q=80',
 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=80',
 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80'
];
NL.applyDemoImages=function(){
 document.querySelectorAll('.property-card').forEach(function(card){
   var id=card.getAttribute('data-id')||NL.slug((card.querySelector('.property-name')||{}).textContent||'');
   var box=card.querySelector('.property-image'); if(box&&DEMO_IMAGES[id]) box.innerHTML='<img src="'+DEMO_IMAGES[id]+'" alt="Demo property photo" loading="lazy">';
 });
 var hero=document.querySelector('.hero-image-placeholder'); if(hero) hero.innerHTML='<img src="https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=1400&q=80" alt="Demo modern rental interior">';
 var land=document.querySelector('.landlord-image-placeholder'); if(land) land.innerHTML='<img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80" alt="Demo rental property exterior">';
 var ver=document.querySelector('.verification-image-placeholder'); if(ver) ver.innerHTML='<img src="https://images.unsplash.com/photo-1560185008-b033106af5c3?auto=format&fit=crop&w=1200&q=80" alt="Demo property inspection">';
 var gallery=document.getElementById('property-gallery'); if(gallery){var boxes=gallery.querySelectorAll('.image-placeholder'); boxes.forEach(function(box,i){if(DEMO_GALLERY[i]) box.innerHTML='<img src="'+DEMO_GALLERY[i]+'" alt="Demo property gallery image '+(i+1)+'" loading="lazy">'});}
};
NL.card=function(p){return `<article class="property-card" data-id="${p.id}">
<div class="property-card-image"><div class="image-placeholder property-image">PROPERTY IMAGE</div>
<span class="property-verification badge-verified">✓ NyumbaLink Verified</span>
<button class="property-save" type="button" aria-label="Save property" aria-pressed="false">♡</button>
${p.video?'<span class="video-indicator">▶ Walkthrough available</span>':''}</div>
<div class="property-card-content"><h3 class="property-name">${p.name}</h3>
<p class="property-location">${p.loc}</p><p class="property-distance">${p.dist}</p><p class="property-type">${p.type}</p>
<p class="property-price">KSh ${NL.fmt(p.rent)}<span>/month</span></p><p class="property-deposit">Deposit: KSh ${NL.fmt(p.deposit)}</p>
<p class="property-status ${CLS[p.status]}">${ICON[p.status]} ${p.statusText}</p><p class="rating"><span class="stars">★★★★★</span> ${p.rating.toFixed(1)} <small>(${p.reviews} reviews)</small></p><p class="property-verified-date">Verified ${p.verifiedAgo}</p><p class="landlord-mini">Landlord: ${p.landlord}</p>
<a class="btn btn-primary" href="property.html?id=${p.id}">View property</a></div></article>`};
NL.toast=function(t){var e=document.createElement('div');e.className='toast';e.textContent=t;e.setAttribute('role','status');document.body.appendChild(e);setTimeout(function(){e.classList.add('show')},10);setTimeout(function(){e.remove()},3000)};
NL.toggleSaved=function(id){var ids=g('nl_saved',[]),i=ids.indexOf(id),on=i<0;if(on)ids.push(id);else ids.splice(i,1);s('nl_saved',ids);NL.toast(on?'Saved':'Removed from saved');return on};
NL.markSaved=function(){var ids=g('nl_saved',[]);document.querySelectorAll('.property-card').forEach(function(c){var n=c.querySelector('.property-name'),b=c.querySelector('.property-save');if(!n||!b)return;var on=ids.indexOf(NL.slug(n.textContent))>-1;b.setAttribute('aria-pressed',on);b.textContent=on?'♥':'♡'})};
NL.renderSaved=function(){var grid=document.getElementById('saved-grid'),em=document.getElementById('empty-saved');if(!grid)return;var ids=g('nl_saved',[]),list=NL.properties.filter(function(p){return ids.indexOf(p.id)>-1});grid.innerHTML=list.map(NL.card).join('');if(em)em.hidden=list.length>0;NL.markSaved()};

document.addEventListener('click',function(e){
 var b=e.target.closest('.property-save');
 if(b){NL.toggleSaved(NL.slug(b.closest('.property-card').querySelector('.property-name').textContent));NL.markSaved();if(document.getElementById('saved-grid'))NL.renderSaved();return}
 var pa=e.target.closest('.property-actions button'),t=document.getElementById('property-title');
 if(pa&&t){pa.textContent=NL.toggleSaved(NL.slug(t.textContent))?'♥ Saved':'♡ Save property'}
});

// Property detail page: fill from ?id=
var id=new URLSearchParams(location.search).get('id'),pt=document.getElementById('property-title');
if(pt){
  var ids0=g('nl_saved',[]);
  var initialSlug=NL.slug(pt.textContent);
  if(ids0.indexOf(initialSlug)>-1){
    var pb0=document.querySelector('.property-actions button');
    if(pb0)pb0.textContent='♥ Saved';
  }
}
if(pt&&id){
  var p=NL.properties.filter(function(x){return x.id===id})[0];
  if(p){
    document.title=p.name+' — NyumbaLink';
    pt.textContent=p.name;

    var loc=document.querySelector('.property-header .property-location');
    if(loc)loc.textContent=p.loc;

    var setText=function(sel,text){
      var el=document.querySelector(sel);
      if(el)el.textContent=text;
    };

    setText('#detail-property-name',p.name);
    setText('#detail-location',p.loc);
    setText('#detail-property-type',p.type==='Student room'?'Student hostel':p.type);
    setText('#detail-room-type',p.type);
    setText('#detail-rent','KSh '+NL.fmt(p.rent));
    setText('#detail-deposit','KSh '+NL.fmt(p.deposit));
    setText('#detail-other-charges','See landlord for current utility/other charges');
    setText('#detail-move-in-total','KSh '+NL.fmt(p.rent+p.deposit));
    setText('#detail-availability',ICON[p.status]+' '+p.statusText);
    setText('#detail-last-verified',p.verifiedAgo==='today'?'5 October 2026':p.verifiedAgo);
    setText('#verification-last-verified',p.verifiedAgo==='today'?'5 October 2026':p.verifiedAgo);
    setText('#detail-address',p.loc+' — exact address provided after viewing is arranged.');
    setText('#landlord-name',p.landlord); setText('#landlord-rating-value',p.rating.toFixed(1)); setText('#landlord-review-count','('+p.reviews+' reviews)');

    var av=document.getElementById('detail-availability');
    if(av)av.className=CLS[p.status];

    var amenities=document.getElementById('amenities-list');
    if(amenities){
      amenities.innerHTML=p.amenities.map(function(a){
        return '<li><span class="icon-placeholder">ICON</span>'+a+'</li>';
      }).join('');
    }

    document.querySelectorAll('.viewing-link').forEach(function(a){
      a.href='viewing.html?id='+encodeURIComponent(p.id);
    });

    var video=document.getElementById('property-video');
    if(video)video.querySelector('.video-placeholder').textContent=p.video?'[VIDEO PLACEHOLDER — WALKTHROUGH AVAILABLE]':'No walkthrough video uploaded yet';

    var r=document.querySelectorAll('#price-breakdown .price-row');
    if(r.length>4){
      r[0].querySelector('strong').textContent='KSh '+NL.fmt(p.rent);
      r[1].querySelector('strong').textContent='KSh '+NL.fmt(p.deposit);
      r[4].lastElementChild.textContent='KSh '+NL.fmt(p.rent+p.deposit);
    }

    var savedButton=document.querySelector('.property-actions button');
    if(savedButton){
      savedButton.textContent=ids0.indexOf(p.id)>-1?'♥ Saved':'♡ Save property';
    }
  } else {
    pt.textContent='Property not found';
    document.title='Property not found — NyumbaLink';
    var missing=document.createElement('p');
    missing.className='notice';
    missing.textContent='This property could not be found. Please return to search and choose another listing.';
    pt.parentNode.appendChild(missing);
  }
}

// Show name in nav when "signed in" (demo)
var u=g('nl_user',null);
if(u&&g('nl_session',false)){document.querySelectorAll('.main-nav a[href$="login.html"]').forEach(function(a){a.textContent='Hi, '+u.name.split(' ')[0]})}
NL.markSaved();NL.renderSaved();NL.applyDemoImages();
})();
