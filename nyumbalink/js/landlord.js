// Landlord dashboard behaviours (demo)
(function(){
var NL=window.NL||{},ls=NL.ls;
var u=ls&&ls.get('nl_user',null),h=document.querySelector('.dash-header h1');
if(u&&h&&/Welcome back/.test(h.textContent))h.textContent='Welcome back, '+u.name.split(' ')[0];
document.querySelectorAll('.sidebar a').forEach(function(a){if(/sign out/i.test(a.textContent))a.addEventListener('click',function(){ls&&ls.set('nl_session',false)})});
var states=['Available now','Needs confirmation','Unavailable'];
document.addEventListener('click',function(e){var b=e.target.closest('.row-actions button');if(!b||!/availability/i.test(b.textContent))return;
 var cell=b.closest('tr').children[4],i=states.indexOf(cell.textContent.trim());cell.textContent=states[(i+1)%states.length];NL.toast&&NL.toast('Availability updated to "'+cell.textContent+'"')});
[['properties-table','no-properties'],['leads-table','no-leads']].forEach(function(p){var t=document.getElementById(p[0]),em=document.getElementById(p[1]);
 if(t&&em&&!t.querySelector('tbody tr')){t.closest('.table-wrap').hidden=true;em.hidden=false}});
})();
