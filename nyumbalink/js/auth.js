// DEMO auth only: no passwords are stored or checked. Real auth comes with Supabase.
(function(){
var NL=window.NL||{},ls=NL.ls,$=function(id){return document.getElementById(id)};
function msg(form,text){var m=form.querySelector('.form-msg');if(!m){m=document.createElement('p');m.className='form-msg';m.setAttribute('role','alert');form.insertBefore(m,form.querySelector('button[type=submit]'))}m.textContent=text}
var okPhone=function(v){return /^(\+?254|0)[17]\d{8}$/.test(v.replace(/[\s-]/g,''))};
var login=$('login-form'),reg=$('register-form');
if(login){['identifier','password'].forEach(function(i){$(i).required=true});
 login.addEventListener('submit',function(e){e.preventDefault();if(!login.reportValidity())return;
  var id=$('identifier').value.trim().toLowerCase().replace(/[\s-]/g,''),u=ls.get('nl_user',null);
  if(!u||(id!==(u.email||'').toLowerCase()&&id!==(u.phone||'').replace(/[\s-]/g,''))){msg(login,'No account found on this device yet. Please create one first.');return}
  ls.set('nl_session',true);location.href=u.type==='landlord'?'landlord/dashboard.html':'search.html'})}
if(reg){['full-name','email','phone','password','confirm-password'].forEach(function(i){$(i).required=true});$('password').minLength=8;
 reg.addEventListener('submit',function(e){e.preventDefault();
  $('confirm-password').setCustomValidity($('password').value!==$('confirm-password').value?'Passwords do not match':'');
  $('phone').setCustomValidity(okPhone($('phone').value)?'':'Enter a valid Kenyan phone number');
  if(!reg.reportValidity())return;
  if(!reg.elements.terms.checked){msg(reg,'Please agree to the Terms and Privacy Policy.');return}
  var type=reg.querySelector('input[name=account-type]:checked').value;
  ls.set('nl_user',{name:$('full-name').value.trim(),email:$('email').value.trim(),phone:$('phone').value.trim(),type:type});
  ls.set('nl_session',true);location.href=type==='landlord'?'landlord/dashboard.html':'search.html'})}
})();
