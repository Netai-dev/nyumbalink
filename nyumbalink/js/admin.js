// Admin behaviours (demo): verification actions + table search
(function(){
var NL=window.NL||{};
var MAP={'Approve':['Verified','pill-green'],'Request changes':['Needs changes','pill-amber'],'Reject':['Rejected','pill-red']};
document.addEventListener('click',function(e){var b=e.target.closest('.queue-actions button');if(!b)return;
 var item=b.closest('.queue-item'),name=item.querySelector('h3').textContent,a=b.textContent.trim();
 if(a==='Review'){NL.toast&&NL.toast('Opening review for '+name+' (demo)');return}
 var m=MAP[a];if(!m)return;var pill=item.querySelector('.queue-meta .pill');
 if(pill){pill.textContent=m[0];pill.className='pill '+m[1]}
 if(a==='Approve')item.querySelectorAll('.queue-checklist li').forEach(function(li){li.textContent=li.textContent.replace('○','✓')});
 NL.toast&&NL.toast(name+': '+m[0])});
document.querySelectorAll('.admin-toolbar input').forEach(function(inp){inp.addEventListener('input',function(){
 var q=inp.value.toLowerCase();document.querySelectorAll('.data-table tbody tr').forEach(function(r){r.hidden=r.textContent.toLowerCase().indexOf(q)<0})})});
})();
