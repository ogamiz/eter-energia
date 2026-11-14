'use strict';
const messages = {
 es:{
  defaultEnergy:'Energía', energyName:'Nombre de la energía', energyNameHelp:'Se usa en la reserva, el total y las acciones. Vacío restaura Energía.', tag:'Gestor de {energyLower}', settings:'Ajustes', reserve:'Reserva de {energyLower}', total:'{energy} total', current:'{energy} actual', addOne:'Añadir un punto', subtractOne:'Restar un punto',
  tap:'Toca la esfera para ajustar', available:'disponible', reset:'Reiniciar', actions:'Acciones rápidas', add:'Añadir', local:'Guardado en este dispositivo', offlineSave:'El navegador no permite guardar los cambios', close:'Cerrar', apply:'Aplicar', edit:'Editar', cancel:'Cancelar', ok:'Aceptar', save:'Guardar', remove:'Eliminar', done:'Listo', maintenance:'Mantenimiento', recovery:'Recuperación', empty:'Añade tu primera acción rápida.', calculator:'Ajustar {energyLower}', result:'{energy} resultante', clear:'Limpiar', backspace:'Borrar última cifra', expr:'Operación', example:'Ejemplo: −15 + 8', maxTitle:'Cambiar {energyLower} total', maxHelp:'La reserva actual conserva su valor.', resetTitle:'Reiniciar {energyLower}', resetHelp:'Recuperar la reserva hasta su valor total.', change:'{energy} actual', newAction:'Nueva acción', editAction:'Editar acción', name:'Descripción', value:'Variación', target:'Aplicar a', spend:'Gastar', gain:'Añadir', magnitude:'Puntos', addName:'Ej. Mantenimiento', language:'Idioma', color:'Color de {energyLower}', blue:'Azul', red:'Rojo', yellow:'Amarillo', green:'Verde', purple:'Lila', black:'Negro', white:'Blanco', gray:'Gris', pink:'Rosa', orange:'Naranja', gold:'Dorado', silver:'Plateado', edited:'Cambios guardados', invalidExpr:'Completa la operación', calcOpen:'Abrir ajuste', onTotal:'Sobre el total', deleted:'Acción eliminada', deleteAction:'Eliminar acción', deletePrompt:'¿Eliminar esta acción rápida?', reachedMax:'Reserva llena', reachedZero:'Reserva vacía', over:'Por encima del total', zeroCapacity:'Sin capacidad', invalid:'Introduce un número entero válido.', unchanged:'Sin cambios', resetDone:'Reserva reiniciada', applied:'aplicada', activeColor:'Color seleccionado'
 },
 en:{
  defaultEnergy:'Energy', energyName:'Energy name', energyNameHelp:'Used for the reserve, total and actions. Leave blank to restore Energy.', tag:'{energy} tracker', settings:'Settings', reserve:'{energy} reserve', total:'Total {energyLower}', current:'Current {energyLower}', addOne:'Add one point', subtractOne:'Subtract one point',
  tap:'Tap the sphere to adjust', available:'available', reset:'Reset', actions:'Quick actions', add:'Add', local:'Saved on this device', offlineSave:'This browser cannot save changes', close:'Close', apply:'Apply', edit:'Edit', cancel:'Cancel', ok:'Confirm', save:'Save', remove:'Delete', done:'Done', maintenance:'Upkeep', recovery:'Recovery', empty:'Add your first quick action.', calculator:'Adjust {energyLower}', result:'Resulting {energyLower}', clear:'Clear', backspace:'Delete last digit', expr:'Operation', example:'Example: −15 + 8', maxTitle:'Change total {energyLower}', maxHelp:'The current reserve keeps its value.', resetTitle:'Reset {energyLower}', resetHelp:'Refill the reserve to its total capacity.', change:'Current {energyLower}', newAction:'New action', editAction:'Edit action', name:'Description', value:'Adjustment', target:'Apply to', spend:'Spend', gain:'Add', magnitude:'Points', addName:'E.g. Upkeep', language:'Language', color:'{energy} color', blue:'Blue', red:'Red', yellow:'Yellow', green:'Green', purple:'Lilac', black:'Black', white:'White', gray:'Gray', pink:'Pink', orange:'Orange', gold:'Gold', silver:'Silver', edited:'Changes saved', invalidExpr:'Complete the operation', calcOpen:'Open adjustment', onTotal:'Changes total', deleted:'Action deleted', deleteAction:'Delete action', deletePrompt:'Delete this quick action?', reachedMax:'Reserve full', reachedZero:'Reserve empty', over:'Above capacity', zeroCapacity:'Zero capacity', invalid:'Enter a valid whole number.', unchanged:'No change', resetDone:'Reserve reset', applied:'applied', activeColor:'Selected color'
 }
};
const icons = {
 menu:'<path d="M3 6h18M3 12h14M3 18h18"/>',
 sliders:'<path d="M3 7h8m5 0h5M3 17h3m5 0h10"/><circle cx="13.5" cy="7" r="2.5"/><circle cx="8.5" cy="17" r="2.5"/>',
 pencil:'<path d="m14.5 5.5 4 4M4 20l4.5-1 12-12a2.8 2.8 0 0 0-4-4l-12 12Z"/>',
 plus:'<path d="M5 12h14M12 5v14"/>', minus:'<path d="M5 12h14"/>',
 calculator:'<rect x="5" y="2.5" width="14" height="19" rx="2"/><path d="M8 7h8M8.5 11.5h1m4.5 0h1m-6.5 4.5h1m4.5 0h1"/>',
 reset:'<path d="M3.5 10a8.5 8.5 0 1 1 .9 6.4M3.5 4v6h6"/>',
 device:'<path d="M4.5 5.5 8 2h10l2 2v15l-2 2H6l-2-2V6Z"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
 shield:'<path d="M12 2.5 20 6v6c0 4.4-3.1 7.2-8 9.5C7.1 19.2 4 16.4 4 12V6Z"/><path d="M12 7v9m-3-6h6"/>',
 spark:'<path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-2-5.8L4 11l6-2.2Z"/><path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8Z"/>',
 drain:'<path d="m13 2-8 11h6l-1 9 9-13h-7Z"/>', arrow:'<path d="M4 12h15m-5-5 5 5-5 5"/>',
 dots:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
 close:'<path d="m6 6 12 12M18 6 6 18"/>', back:'<path d="M9 5h11v14H9l-7-7Z"/><path d="m12 9 6 6m0-6-6 6"/>'
};
const $=s=>document.querySelector(s);
const dialog=$('#dialog'),content=$('#dialog-content');
const icon=name=>'<svg viewBox="0 0 24 24" aria-hidden="true">'+icons[name]+'</svg>';
function renderIcons(parent){parent.querySelectorAll('[data-icon]').forEach(el=>el.innerHTML=icon(el.dataset.icon));}
let state,canSave=true;
try{state=Energy.restore(JSON.parse(localStorage.getItem(Energy.key)));}
catch{state=Energy.defaults();}
const energyName=()=>state.energyName==='Energía'?messages[state.lang].defaultEnergy:state.energyName;
const t=k=>(messages[state.lang][k] || k).replace(/\{energy(Lower)?\}/g,(_,lower)=>lower&&state.energyName==='Energía'?energyName().toLocaleLowerCase(state.lang):energyName());
const escapeHTML=text=>String(text).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const th=k=>escapeHTML(t(k));
const format=n=>new Intl.NumberFormat(state.lang==='es'?'es-ES':'en-US').format(n);
const signed=n=>(n>0?'+':'−')+format(Math.abs(n));
const displayName=a=>a.name||t(a.preset);
const view=new ReservoirView($('#orb-canvas'),$('#sky'));
let noticeTimer,mode='',expression='';
function notify(message){
  clearTimeout(noticeTimer);$('#notice').textContent=message;
  noticeTimer=setTimeout(()=>$('#notice').textContent='',2500);
}
function save(){
  try{localStorage.setItem(Energy.key,JSON.stringify(state));canSave=true;}
  catch{canSave=false;}
  $('#save-info').textContent=t(canSave?'local':'offlineSave');
}
function render(){
  document.documentElement.lang=state.lang;
  document.title='Éter · '+t('tag');
  document.querySelectorAll('[data-t]').forEach(el=>el.textContent=t(el.dataset.t));
  document.querySelectorAll('[data-aria]').forEach(el=>el.setAttribute('aria-label',t(el.dataset.aria)));
  $('#settings').setAttribute('aria-label',t('settings'));
  const [h,s,l,accent]=Energy.palettes[state.color];
  const css=document.documentElement.style;
  css.setProperty('--accent',accent);
  css.setProperty('--light','color-mix(in srgb,'+accent+' 45%,white)');
  css.setProperty('--wash','hsla('+h+','+s+'%,65%,.10)');
  css.setProperty('--glow','hsla('+h+','+s+'%,56%,.22)');
  css.setProperty('--edge','hsl('+h+','+Math.round(14+s*.11)+'%,23%)');
  css.setProperty('--panel','hsl('+h+','+Math.round(18+s*.18)+'%,12%)');
  const ratio=state.total?state.current/state.total:(state.current>0?1:0);
  view.set(ratio,{h,s,l});
  const digits=String(state.current).length;
  $('#energy-value').style.fontSize=digits>3?'clamp(24px,'+(digits>5?8:10)+'vw,'+(digits>5?44:55)+'px)':'';
  $('#energy-value').textContent=String(state.current);
  $('#total-value').textContent=format(state.total);
  $('#total').setAttribute('aria-label',t('maxTitle')+' · '+format(state.total));
  $('#orb').setAttribute('aria-label',t('current')+' '+format(state.current)+'. '+t('calcOpen'));
  $('#level-value').textContent=state.total?format(Math.round(ratio*100))+' %':'—';
  $('.level [data-t]').textContent=t(!state.total?'zeroCapacity':state.current>state.total?'over':'available');
  $('.gauge span').style.width=Math.min(100,ratio*100)+'%';
  $('#minus').disabled=state.current===0;
  $('#plus').disabled=state.current>=state.total;
  $('#save-info').textContent=t(canSave?'local':'offlineSave');
  renderActions();
}
function renderActions(){
  const list=$('#actions-list'),oldScroll=list.scrollTop;
  const focused=document.activeElement?.closest('.action-row');
  const oldFocus=focused && [focused.dataset.id,document.activeElement.className];
  list.replaceChildren();
  if(!state.actions.length){
    const el=document.createElement('div');el.className='empty';el.textContent=t('empty');list.append(el);return;
  }
  for(const a of state.actions){
    const row=document.createElement('div');row.className='action-row'+(a.delta>0?' gain':'');row.dataset.id=a.id;
    row.innerHTML='<button class="run-action" type="button"><span class="action-icon"><i></i></span><span class="row-name"></span><span class="amount"></span></button><button class="edit-action icon-button" type="button"><i data-icon="dots"></i></button>';
    row.querySelector('.action-icon i').dataset.icon=a.delta>0?'spark':(a.preset==='maintenance'?'shield':'drain');
    row.querySelector('.row-name').textContent=displayName(a);
    const target=document.createElement('small');target.className='target-note';target.textContent=t(a.target);row.querySelector('.row-name').append(target);
    row.querySelector('.amount').textContent=signed(a.delta);
    row.querySelector('.run-action').setAttribute('aria-label',displayName(a)+' '+signed(a.delta)+' · '+t(a.target));
    row.querySelector('.edit-action').setAttribute('aria-label',t('edit')+' '+displayName(a));
    renderIcons(row);list.append(row);
    if(oldFocus && a.id===oldFocus[0])Array.from(row.querySelectorAll('button')).find(b=>b.className===oldFocus[1])?.focus({preventScroll:true});
  }
  list.scrollTop=oldScroll;
}
function change(delta,target='current',actionName=''){
  const old=state[target],next=Energy.result(state,delta,target);
  state[target]=next;save();render();
  notify((actionName||t(target))+' · '+(old===next?t('unchanged'):format(old)+' → '+format(next)));
}
function openDialog(type,title,body){
  mode=type;
  $('#dialog-title').textContent=t(title);content.innerHTML=body;
  $('#notice').textContent='';
  renderIcons(content);
  if(!dialog.open)dialog.showModal();
  dialog.scrollTop=0;
}
function finish(){dialog.close();}
function buttons(primary='ok',danger=false){
  return '<div class="buttons">'+(danger?'<button class="danger" type="button" id="remove">'+th('remove')+'</button>':'')+'<button type="button" class="secondary" data-dismiss>'+th('cancel')+'</button><button class="primary" id="submit" type="submit">'+th(primary)+'</button></div>';
}
$('#close').onclick=finish;
dialog.addEventListener('close',()=>{mode='';content.replaceChildren();});
dialog.addEventListener('click',e=>{
  if(e.target.closest('[data-dismiss]'))finish();
  if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)finish();}
});
function showCalculator(){
  expression='';
  const keys=['7','8','9','back','4','5','6','-','1','2','3','+','0','clear'];
  openDialog('calc','calculator','<div class="preview"><output class="expr" tabindex="-1" aria-label="'+th('expr')+'"></output><div class="preview-meta"><span>'+th('result')+'</span><strong id="calc-result"></strong></div></div><div class="keys">'+keys.map(k=>'<button type="button" class="key '+(k==='0'?'wide':'')+(!/^\d$/.test(k)?' op':'')+'" data-key="'+k+'"'+(k==='clear'||k==='back'?' aria-label="'+th(k==='back'?'backspace':'clear')+'"':'')+'>'+(k==='back'?'<i data-icon="back"></i>':k==='clear'?'C':k==='-'?'−':k)+'</button>').join('')+'</div>'+buttons());
  content.querySelector('.keys').onclick=e=>{const key=e.target.closest('[data-key]');if(key)calcKey(key.dataset.key);};
  $('#submit').onclick=applyCalc;updateCalc();$('.expr').focus({preventScroll:true});
}
function calcKey(k){
  if(k==='clear')expression='';
  else if(k==='back')expression=expression.slice(0,-1);
  else if((k==='+'||k==='-') && /[-+]$/.test(expression))expression=expression.slice(0,-1)+k;
  else if(expression.length<64)expression+=k;
  updateCalc();
}
function updateCalc(){
  const delta=Energy.evaluate(expression);
  $('.expr').textContent=expression?expression.replaceAll('-','−').replace(/([+−])/g,' $1 ').trim():t('example');
  $('.expr').style.color=expression?'var(--ink)':'var(--muted)';
  $('#calc-result').textContent=delta===null?(expression?'—':format(state.current)):format(Energy.result(state,delta));
  $('#submit').disabled=delta===null;
}
function applyCalc(){
  const delta=Energy.evaluate(expression);if(delta===null)return;
  finish();change(delta);
}
document.addEventListener('keydown',e=>{
  if(!dialog.open||mode!=='calc'||e.altKey||e.metaKey||e.ctrlKey)return;
  if(/^\d$/.test(e.key)||['+','-','Backspace','Delete','='].includes(e.key)){
    e.preventDefault();if(e.key==='=')applyCalc();else calcKey(({Backspace:'back',Delete:'clear'})[e.key]||e.key);
  }else if(e.key==='Enter'&&!e.target.closest('button[data-dismiss],#close')){
    e.preventDefault();applyCalc();
  }
});
function numberField(id,min){return '<input id="'+id+'" type="number" required step="1" inputmode="numeric" min="'+min+'" max="'+Energy.limit+'">';}
function showTotal(){
  openDialog('total','maxTitle','<form><label for="capacity">'+th('total')+'</label>'+numberField('capacity',0)+'<p class="help">'+th('maxHelp')+'</p>'+buttons('save')+'</form>');
  $('#capacity').value=state.total;
  content.querySelector('form').onsubmit=e=>{
    e.preventDefault();const n=$('#capacity').valueAsNumber;if(!Energy.whole(n))return;
    state.total=n;save();finish();render();notify(t('total')+' · '+format(n));
  };
}
function showReset(){
  openDialog('reset','resetTitle','<p class="help">'+th('resetHelp')+'</p><div class="preview-meta">'+th('change')+'<strong>'+format(state.current)+' → '+format(state.total)+'</strong></div>'+buttons('reset'));
  $('#submit').onclick=()=>{state.current=state.total;save();finish();render();notify(t('resetDone')+' · '+format(state.current));};
}
function showAction(a){
  let sign=a&&a.delta>0?1:-1;
  openDialog('action',a?'editAction':'newAction','<form><label for="action-name">'+th('name')+'</label><input id="action-name" required maxlength="80" placeholder="'+th('addName')+'"><span class="field-title" id="adjust-title">'+th('value')+'</span><div class="choices" role="group" aria-labelledby="adjust-title"><button type="button" data-sign="-1">− '+th('spend')+'</button><button type="button" data-sign="1">+ '+th('gain')+'</button></div><label for="magnitude">'+th('magnitude')+'</label>'+numberField('magnitude',1)+'<label for="target">'+th('target')+'</label><select id="target"><option value="current">'+th('current')+'</option><option value="total">'+th('total')+'</option></select>'+buttons('save',!!a)+'</form>');
  $('#action-name').value=a?displayName(a):'';$('#magnitude').value=a?Math.abs(a.delta):'';$('#target').value=a?a.target:'current';
  const showSign=()=>content.querySelectorAll('[data-sign]').forEach(b=>{const sel=Number(b.dataset.sign)===sign;b.classList.toggle('chosen',sel);b.setAttribute('aria-pressed',sel);});
  showSign();content.querySelector('.choices').onclick=e=>{const b=e.target.closest('[data-sign]');if(b){sign=Number(b.dataset.sign);showSign();}};
  content.querySelector('form').onsubmit=e=>{
    e.preventDefault();const name=$('#action-name').value.trim(),n=$('#magnitude').valueAsNumber;
    if(!name){$('#action-name').value='';$('#action-name').reportValidity();return;}
    if(!Energy.whole(n)||n<1)return;
    const target=$('#target').value;
    if(a){if(name!==displayName(a))a.name=name;a.delta=n*sign;a.target=target;}
    else{state.actions.push({id:globalThis.crypto?.randomUUID?.()||Date.now().toString(36)+'-'+Math.random().toString(36).slice(2),name,delta:n*sign,target});}
    save();finish();render();notify(t('edited'));
  };
  if(a)$('#remove').onclick=()=>{
    openDialog('delete','deleteAction','<p class="help"></p>'+buttons('remove'));
    content.querySelector('p').textContent=t('deletePrompt')+' '+displayName(a);
    $('#submit').onclick=()=>{state.actions=state.actions.filter(item=>item.id!==a.id);save();finish();render();notify(t('deleted'));};
  };
}
function showSettings(focusSelector){
  openDialog('settings','settings','<label for="energy-name">'+th('energyName')+'</label><input id="energy-name" maxlength="24" aria-describedby="energy-name-help" autocomplete="off"><p id="energy-name-help" class="help">'+th('energyNameHelp')+'</p><label for="language">'+th('language')+'</label><select id="language"><option value="es">Español</option><option value="en">English</option></select><span class="field-title" id="color-label">'+th('color')+'</span><div class="palette" role="group" aria-labelledby="color-label"></div><div class="buttons"><button class="primary" type="button" id="settings-done">'+th('done')+'</button></div>');
  $('#energy-name').value=energyName();
  const saveName=()=>{
    const name=$('#energy-name');
    state.energyName=name.value.trim()===messages[state.lang].defaultEnergy?'Energía':Energy.normalizeName(name.value);
    name.value=energyName();
    save();render();
    $('#dialog-title').textContent=t('settings');
    $('#color-label').textContent=t('color');
  };
  $('#energy-name').onchange=saveName;
  $('#energy-name').onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();saveName();finish();}};
  $('#language').value=state.lang;
  $('#language').onchange=e=>{state.lang=e.target.value;save();render();showSettings('#language');};
  const order=['red','blue','yellow','green','purple','black','white','gray','pink','orange','gold','silver'];
  for(const key of order){
    const b=document.createElement('button'),[h,s,l]=Energy.palettes[key];
    const selected=key===state.color;
    b.type='button';b.className='swatch';b.dataset.color=key;b.setAttribute('aria-pressed',selected);
    b.innerHTML='<span class="chip" aria-hidden="true"></span><span>'+th(key)+'</span>';
    const chip=b.firstChild;
    chip.style.background='linear-gradient(140deg,hsl('+h+' '+s+'% '+Math.min(98,l+14)+'%),hsl('+h+' '+s+'% '+Math.max(2,l-10)+'%))';
    chip.textContent=selected?'✓':'';
    b.onclick=()=>{state.color=key;save();render();showSettings('[data-color="'+key+'"]');};
    $('.palette').append(b);
  }
  $('#settings-done').onclick=()=>{saveName();finish();};
  if(focusSelector)content.querySelector(focusSelector)?.focus({preventScroll:true});
}
$('#minus').onclick=()=>change(-1);$('#plus').onclick=()=>change(1);
$('#orb').onclick=$('#calc-hint').onclick=showCalculator;
$('#total').onclick=showTotal;$('#reset').onclick=showReset;
$('#settings').onclick=()=>showSettings();$('#add').onclick=()=>showAction(null);
$('#actions-list').onclick=e=>{
  const row=e.target.closest('.action-row');if(!row)return;
  const a=state.actions.find(item=>item.id===row.dataset.id);if(!a)return;
  if(e.target.closest('.run-action'))change(a.delta,a.target,displayName(a));
  else if(e.target.closest('.edit-action'))showAction(a);
};
window.addEventListener('storage',e=>{
  if(e.storageArea!==localStorage||e.key!==Energy.key)return;
  try{state=Energy.restore(JSON.parse(e.newValue));if(dialog.open)finish();render();}
  catch{/* An unreadable value is ignored until a valid update arrives. */}
});
renderIcons(document);render();save();
if('serviceWorker' in navigator && ['https:','http:'].includes(location.protocol)){
  const wasControlled=!!navigator.serviceWorker.controller;
  let refreshing=false;
  navigator.serviceWorker.addEventListener('controllerchange',()=>{
    if(wasControlled&&!refreshing){refreshing=true;location.reload();}
  });
  window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js',{updateViaCache:'none'}).catch(()=>{}));
}
