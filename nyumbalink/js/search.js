// Search page: filter + sort the sample properties
(function(){
var NL=window.NL,grid=document.getElementById('property-grid'),sf=document.getElementById('search-form'),ff=document.getElementById('filters-form');
if(!NL||!grid||!sf||!ff)return;
var $=function(s){return document.querySelector(s)};
var num=function(v){return parseInt(String(v||'').replace(/\D/g,''),10)||0};
var q=new URLSearchParams(location.search),E=sf.elements;
function setType(v){var o=$('#f-type');[].forEach.call(o.options,function(x){if(x.text.toLowerCase()===String(v).toLowerCase())o.value=x.value||x.text})}
function fromSearchBar(){$('#f-location').value=E.where.value;if(E.type.value)setType(E.type.value);else $('#f-type').value='Any';$('#f-max').value=num(E.max_rent.value)||''}
if(q.get('where'))E.where.value=q.get('where');
if(q.get('type'))E.type.value=q.get('type');
if(q.get('max_rent'))E.max_rent.value=q.get('max_rent');
fromSearchBar();
function apply(){
 var term=$('#f-location').value.trim().toLowerCase(),type=$('#f-type').value,min=num($('#f-min').value),max=num($('#f-max').value);
 var am=[].map.call(ff.querySelectorAll('input[name=amenities]:checked'),function(i){return i.value});
 var onlyAvail=ff.elements.available.checked,onlyVid=ff.elements.video.checked,onlyVer=ff.elements.verified.checked;
 var list=NL.properties.filter(function(p){
  if(term&&(p.loc+' '+p.name).toLowerCase().indexOf(term)<0&&term!=='mombasa')return false;
  if(type&&type!=='Any'&&p.type!==type)return false;
  if(min&&p.rent<min)return false;if(max&&p.rent>max)return false;
  if(am.some(function(a){return p.amenities.indexOf(a)<0}))return false;
  if(onlyAvail&&p.status!=='a')return false;if(onlyVid&&!p.video)return false;if(onlyVer&&!p.verified)return false;return true});
 var sort=$('#sort').value;
 if(sort==='Price: Low to High')list.sort(function(a,b){return a.rent-b.rent});
 if(sort==='Price: High to Low')list.sort(function(a,b){return b.rent-a.rent});
 if(sort==='Recently verified')list.sort(function(a,b){return a.hours-b.hours});
 grid.innerHTML=list.map(NL.card).join('');
 $('#results-count').textContent=list.length+(list.length===1?' place':' places')+' found'+(term?' for "'+$('#f-location').value.trim()+'"':'');
 $('#no-results').hidden=list.length>0;NL.markSaved();
}
sf.addEventListener('submit',function(e){e.preventDefault();fromSearchBar();apply()});
ff.addEventListener('submit',function(e){e.preventDefault();apply()});
ff.addEventListener('input',apply);
$('#sort').addEventListener('change',apply);
apply();
})();
