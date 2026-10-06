// Viewing request + listing forms (demo: saved to this device only)
(function(){
var NL=window.NL||{},form=document.querySelector('#viewing-form,#list-property-form,#add-property-form');if(!form)return;
var $=function(id){return document.getElementById(id)};
var isView=form.id==='viewing-form',isAdd=form.id==='add-property-form';
var okPhone=function(v){return /^(\+?254|0)[17]\d{8}$/.test(v.replace(/[\s-]/g,''))};
var need=isView?['full-name','phone','email','view-date','view-time']:['property-name','location','area','rent','deposit','landlord-name','landlord-phone','landlord-email'];
need.forEach(function(i){if($(i))$(i).required=true});
if($('view-date'))$('view-date').min=new Date().toISOString().slice(0,10);
var u=NL.ls&&NL.ls.get('nl_user',null);
if(u&&isView){if($('full-name'))$('full-name').value=u.name||'';if($('email'))$('email').value=u.email||'';if($('phone'))$('phone').value=u.phone||''}
var id=new URLSearchParams(location.search).get('id');
if(isView&&id&&NL.properties){var p=NL.properties.filter(function(x){return x.id===id})[0];
 if(p){var s=$('property-summary');s.querySelector('h2').textContent=p.name;s.querySelector('.property-location').textContent=p.loc;s.querySelector('.property-price').firstChild.textContent='KSh '+NL.fmt(p.rent)}}
// upload placeholders -> real file pickers with preview
document.querySelectorAll('.upload-placeholder').forEach(function(box){
 var f=document.createElement('input');f.type='file';f.hidden=true;f.accept=box.id==='upload-video'?'video/*':'image/*';box.appendChild(f);
 box.tabIndex=0;box.setAttribute('role','button');
 box.addEventListener('click',function(e){if(e.target!==f)f.click()});
 box.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();f.click()}});
 f.addEventListener('change',function(){var file=f.files[0];if(!file)return;
  box.querySelectorAll('span,small,.up-name').forEach(function(n){n.remove()});
  var n=document.createElement('span');n.className='up-name';n.textContent='✓ '+file.name;box.insertBefore(n,f);box.classList.add('filled');
  if(file.type.indexOf('image')===0){box.style.backgroundImage='linear-gradient(rgba(255,255,255,.75),rgba(255,255,255,.75)),url('+URL.createObjectURL(file)+')';box.style.backgroundSize='cover'}});
});
form.addEventListener('submit',function(e){
 e.preventDefault();
 ['phone','landlord-phone'].forEach(function(i){var el=$(i);if(el)el.setCustomValidity(el.value&&!okPhone(el.value)?'Enter a valid Kenyan phone number':'')});
 if(!form.reportValidity())return;
 var data={};new FormData(form).forEach(function(v,k){if(typeof v==='string')data[k]=v});
 data.id='NL-'+String(Date.now()).slice(-6);data.created=new Date().toISOString();
 var key=isView?'nl_viewings':'nl_listings',all=NL.ls?NL.ls.get(key,[]):[];all.push(data);if(NL.ls)NL.ls.set(key,all);
 var t=isView?'Viewing requested!':'Property submitted!',tx=isView?'The landlord will confirm your viewing. Never send money before inspecting the property.':'We will review your property before it appears publicly.';
 var d=document.createElement('div');d.className='empty-state';
 d.innerHTML='<h2>'+t+'</h2><p>'+tx+' (Demo mode: saved on this device only until the backend is connected.)</p><a class="btn btn-primary" href="'+(isView?'search.html':isAdd?'properties.html':'index.html')+'">'+(isView?'Keep browsing':isAdd?'Back to my properties':'Back home')+'</a>';
 form.parentNode.insertBefore(d,form);form.hidden=true;window.scrollTo(0,0);
});
})();
