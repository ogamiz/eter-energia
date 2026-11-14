'use strict';
const messages = {
 es:{
  deleteReserve:'Eliminar reserva', deleteReservePrompt:'Se eliminarán los valores, las acciones y el historial de esta reserva.', reserveDeleted:'Reserva eliminada', noReserves:'No hay reservas', emptyReservesHelp:'Crea una reserva para empezar.', tabHelp:'Arrastra el asa para reordenar. Con teclado, usa Alt y las flechas izquierda o derecha.', reserves:'Reservas de energía', addReserve:'Añadir reserva', newReserve:'Nueva reserva', createReserve:'Crear reserva', reserveNameExample:'Ej. Maná, Ki, Vigor', reserveColor:'Color de la reserva', languageHelp:'El idioma se aplica a todas las reservas.', history:'Historial', undo:'Deshacer último cambio', historyEmpty:'Aún no hay cambios.', historyHelp:'Solo puedes deshacer el cambio más reciente.', stepChange:'Ajuste de un punto', totalChange:'Cambio del total', undone:'Cambio deshecho', reorder:'Reordenar', reorderHelp:'Arrastra el asa o usa las flechas arriba y abajo.', reordered:'Orden guardado', position:'Posición', defaultEnergy:'Energía', energyName:'Nombre de la energía', energyNameHelp:'Se usa en la reserva, el total y las acciones. Vacío restaura Energía.', tag:'Gestor de {energyLower}', settings:'Ajustes', reserve:'Reserva de {energyLower}', total:'{energy} total', current:'{energy} actual', addOne:'Añadir un punto', subtractOne:'Restar un punto',
  tap:'Toca la esfera para ajustar', available:'disponible', reset:'Reiniciar', actions:'Acciones rápidas', add:'Añadir', local:'Guardado en este dispositivo', offlineSave:'El navegador no permite guardar los cambios', close:'Cerrar', apply:'Aplicar', edit:'Editar', cancel:'Cancelar', ok:'Aceptar', save:'Guardar', remove:'Eliminar', done:'Listo', maintenance:'Mantenimiento', recovery:'Recuperación', empty:'Añade tu primera acción rápida.', calculator:'Ajustar {energyLower}', result:'{energy} resultante', clear:'Limpiar', backspace:'Borrar última cifra', expr:'Operación', example:'Ejemplo: −15 + 8', maxTitle:'Cambiar {energyLower} total', maxHelp:'La reserva actual conserva su valor.', resetTitle:'Reiniciar {energyLower}', resetHelp:'Recuperar la reserva hasta su valor total y borrar el historial.', change:'{energy} actual', newAction:'Nueva acción', editAction:'Editar acción', name:'Descripción', value:'Variación', target:'Aplicar a', both:'Ambos', spend:'Gastar', gain:'Añadir', magnitude:'Puntos', addName:'Ej. Mantenimiento', language:'Idioma', color:'Color de {energyLower}', blue:'Azul', red:'Rojo', yellow:'Amarillo', green:'Verde', purple:'Lila', black:'Negro', white:'Blanco', gray:'Gris', pink:'Rosa', orange:'Naranja', gold:'Dorado', silver:'Plateado', edited:'Cambios guardados', invalidExpr:'Completa la operación', calcOpen:'Abrir ajuste', onTotal:'Sobre el total', deleted:'Acción eliminada', deleteAction:'Eliminar acción', deletePrompt:'¿Eliminar esta acción rápida?', reachedMax:'Reserva llena', reachedZero:'Reserva vacía', over:'Por encima del total', zeroCapacity:'Sin capacidad', invalid:'Introduce un número entero válido.', unchanged:'Sin cambios', resetDone:'Reserva reiniciada', applied:'aplicada', activeColor:'Color seleccionado'
 },
 en:{
  deleteReserve:'Delete reserve', deleteReservePrompt:'This will delete the values, actions and history of this reserve.', reserveDeleted:'Reserve deleted', noReserves:'No reserves', emptyReservesHelp:'Create a reserve to get started.', tabHelp:'Drag the handle to reorder. On a keyboard, use Alt and the left or right arrow keys.', reserves:'Energy reserves', addReserve:'Add reserve', newReserve:'New reserve', createReserve:'Create reserve', reserveNameExample:'E.g. Mana, Ki, Stamina', reserveColor:'Reserve color', languageHelp:'The language applies to all reserves.', history:'History', undo:'Undo latest change', historyEmpty:'No changes yet.', historyHelp:'Only the latest change can be undone.', stepChange:'One-point adjustment', totalChange:'Total changed', undone:'Change undone', reorder:'Reorder', reorderHelp:'Drag the handle or use the up and down arrow keys.', reordered:'Order saved', position:'Position', defaultEnergy:'Energy', energyName:'Energy name', energyNameHelp:'Used for the reserve, total and actions. Leave blank to restore Energy.', tag:'{energy} tracker', settings:'Settings', reserve:'{energy} reserve', total:'Total {energyLower}', current:'Current {energyLower}', addOne:'Add one point', subtractOne:'Subtract one point',
  tap:'Tap the sphere to adjust', available:'available', reset:'Reset', actions:'Quick actions', add:'Add', local:'Saved on this device', offlineSave:'This browser cannot save changes', close:'Close', apply:'Apply', edit:'Edit', cancel:'Cancel', ok:'Confirm', save:'Save', remove:'Delete', done:'Done', maintenance:'Upkeep', recovery:'Recovery', empty:'Add your first quick action.', calculator:'Adjust {energyLower}', result:'Resulting {energyLower}', clear:'Clear', backspace:'Delete last digit', expr:'Operation', example:'Example: −15 + 8', maxTitle:'Change total {energyLower}', maxHelp:'The current reserve keeps its value.', resetTitle:'Reset {energyLower}', resetHelp:'Refill the reserve to its total capacity and clear history.', change:'Current {energyLower}', newAction:'New action', editAction:'Edit action', name:'Description', value:'Adjustment', target:'Apply to', both:'Both', spend:'Spend', gain:'Add', magnitude:'Points', addName:'E.g. Upkeep', language:'Language', color:'{energy} color', blue:'Blue', red:'Red', yellow:'Yellow', green:'Green', purple:'Lilac', black:'Black', white:'White', gray:'Gray', pink:'Pink', orange:'Orange', gold:'Gold', silver:'Silver', edited:'Changes saved', invalidExpr:'Complete the operation', calcOpen:'Open adjustment', onTotal:'Changes total', deleted:'Action deleted', deleteAction:'Delete action', deletePrompt:'Delete this quick action?', reachedMax:'Reserve full', reachedZero:'Reserve empty', over:'Above capacity', zeroCapacity:'Zero capacity', invalid:'Enter a valid whole number.', unchanged:'No change', resetDone:'Reserve reset', applied:'applied', activeColor:'Selected color'
 }
};
const icons = {
 trash:'<path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7"/>',
 history:'<path d="M3 10a9 9 0 1 1 1.5 7M3 4v6h6M12 7v5l3 2"/>',
 grip:'<circle cx="9" cy="5" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="19" r="1"/>',
 undo:'<path d="M4 9a8 8 0 1 1 1 9M4 3v6h6"/>',
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
const icon=name=>'<svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true">'+icons[name]+'</svg>';
function renderIcons(parent){parent.querySelectorAll('[data-icon]').forEach(el=>el.innerHTML=icon(el.dataset.icon));}
let workspace,state,canSave=true;
function readSavedWorkspace(){
  let raw;
  try{raw=JSON.parse(localStorage.getItem(Energy.workspaceKey));}catch{}
  if(!raw){try{raw=JSON.parse(localStorage.getItem(Energy.key));}catch{}}
  return Energy.restoreWorkspace(raw);
}
workspace=readSavedWorkspace();state=Energy.activeReserve(workspace);
const energyName=()=>!state||state.energyName==='Energía'?messages[workspace.lang].defaultEnergy:state.energyName;
const t=k=>(messages[workspace.lang][k] || k).replace(/\{energy(Lower)?\}/g,(_,lower)=>lower&&(!state||state.energyName==='Energía')?energyName().toLocaleLowerCase(workspace.lang):energyName());
const escapeHTML=text=>String(text).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const th=k=>escapeHTML(t(k));
const format=n=>new Intl.NumberFormat(workspace.lang==='es'?'es-ES':'en-US').format(n);
const signed=n=>(n>0?'+':'−')+format(Math.abs(n));
const displayName=a=>a.name||t(a.preset);
const view=new ReservoirView($('#orb-canvas'),$('#sky'));
let noticeTimer,mode='',expression='',actionDrag=null,tabDrag=null,suppressTabClickUntil=0;
function notify(message){
  clearTimeout(noticeTimer);$('#notice').textContent=message;
  noticeTimer=setTimeout(()=>$('#notice').textContent='',2500);
}
function save(){
  try{localStorage.setItem(Energy.workspaceKey,JSON.stringify(workspace));canSave=true;}
  catch{canSave=false;}
  $('#save-info').textContent=t(canSave?'local':'offlineSave');
}
function render(){
  document.documentElement.lang=workspace.lang;
  document.title='Éter · '+t('tag');
  document.querySelectorAll('[data-t]').forEach(el=>el.textContent=t(el.dataset.t));
  document.querySelectorAll('[data-aria]').forEach(el=>el.setAttribute('aria-label',t(el.dataset.aria)));
  $('#settings').setAttribute('aria-label',t('settings'));
  $('#settings').disabled=!state;
  $('#reserve-panel').hidden=!state;$('#empty-reserves').hidden=!!state;
  const [h,s,l,accent]=Energy.palettes[state?.color||'blue'];
  const css=document.documentElement.style;
  css.setProperty('--accent',accent);
  css.setProperty('--light','color-mix(in srgb,'+accent+' 45%,white)');
  css.setProperty('--wash','hsla('+h+','+s+'%,65%,.10)');
  css.setProperty('--glow','hsla('+h+','+s+'%,56%,.22)');
  css.setProperty('--edge','hsl('+h+','+Math.round(14+s*.11)+'%,23%)');
  css.setProperty('--panel','hsl('+h+','+Math.round(18+s*.18)+'%,12%)');
  if(!state){renderTabs();return;}
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
  renderTabs();renderActions();
}
function renderActions(){
  if(actionDrag){endActionDrag(false);return;}
  const list=$('#actions-list'),oldScroll=list.scrollTop;
  const focused=document.activeElement?.closest('.action-row');
  const oldFocus=focused && [focused.dataset.id,document.activeElement.className];
  list.replaceChildren();
  if(!state.actions.length){
    const el=document.createElement('div');el.className='empty';el.textContent=t('empty');list.append(el);return;
  }
  for(const a of state.actions){
    const row=document.createElement('div');row.className='action-row'+(a.delta>0?' gain':'');row.dataset.id=a.id;
    row.innerHTML='<button type="button" class="drag-handle"><i data-icon="grip"></i></button><button class="run-action" type="button"><span class="action-icon"><i></i></span><span class="row-name"></span><span class="amount"></span></button><button class="edit-action icon-button" type="button"><i data-icon="dots"></i></button>';
    row.querySelector('.action-icon i').dataset.icon=a.delta>0?'spark':(a.preset==='maintenance'?'shield':'drain');
    row.querySelector('.row-name').textContent=displayName(a);
    const target=document.createElement('small');target.className='target-note';target.textContent=t(a.target);row.querySelector('.row-name').append(target);
    row.querySelector('.amount').textContent=signed(a.delta);
    row.querySelector('.drag-handle').setAttribute('aria-label',t('reorder')+' '+displayName(a)+'. '+t('reorderHelp'));
    row.querySelector('.run-action').setAttribute('aria-label',displayName(a)+' '+signed(a.delta)+' · '+t(a.target));
    row.querySelector('.edit-action').setAttribute('aria-label',t('edit')+' '+displayName(a));
    renderIcons(row);list.append(row);
    if(oldFocus && a.id===oldFocus[0])Array.from(row.querySelectorAll('button')).find(b=>b.className===oldFocus[1])?.focus({preventScroll:true});
  }
  list.scrollTop=oldScroll;
}
function change(delta,target='current',actionName='',kind='step',label=''){
  const old=target==='both'?{current:state.current,total:state.total}:state[target],next=Energy.result(state,delta,target);
  const changed=Energy.record(state,next,target,kind,label||actionName);save();render();
  const details=!changed?t('unchanged'):target==='both'?['current','total'].map(key=>t(key)+' '+format(old[key])+' → '+format(next[key])).join(' · '):format(old)+' → '+format(next);
  notify((actionName||t(target))+' · '+details);
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
  finish();change(delta,'current','','calculator',expression);
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
    Energy.record(state,n,'total','total');save();finish();render();notify(t('total')+' · '+format(n));
  };
}
function showReset(){
  openDialog('reset','resetTitle','<p class="help">'+th('resetHelp')+'</p><div class="preview-meta">'+th('change')+'<strong>'+format(state.current)+' → '+format(state.total)+'</strong></div>'+buttons('reset'));
  $('#submit').onclick=()=>{Energy.reset(state);save();finish();render();notify(t('resetDone')+' · '+format(state.current));};
}
function showHistory(){
  openDialog('history','history','<p class="help">'+th('historyHelp')+'</p><ol id="history-list"></ol>');
  const list=$('#history-list');
  if(!state.history.length){
    const empty=document.createElement('li');empty.className='empty';empty.textContent=t('historyEmpty');list.append(empty);return;
  }
  [...state.history].reverse().forEach((entry,index)=>{
    const row=document.createElement('li');row.className='history-row';
    const details=document.createElement('div');
    const title=document.createElement('strong');
    title.textContent=entry.kind==='action'?entry.label:entry.kind==='calculator'?t('calculator')+' · '+entry.label.replaceAll('-','−'):t(entry.kind==='total'?'totalChange':'stepChange');
    const values=(entry.target==='both'?['current','total']:[entry.target]).map(target=>{
      const before=entry.target==='both'?entry.before[target]:entry.before,after=entry.target==='both'?entry.after[target]:entry.after;
      const line=document.createElement('span');line.textContent=t(target)+' · '+format(before)+' → '+format(after)+(before===after?'':' ('+signed(after-before)+')');return line;
    });
    const time=document.createElement('time');time.dateTime=new Date(entry.at).toISOString();time.textContent=new Intl.DateTimeFormat(workspace.lang,{dateStyle:'short',timeStyle:'short'}).format(entry.at);
    details.append(title,...values,time);row.append(details);
    if(index===0){
      const undo=document.createElement('button');undo.type='button';undo.className='icon-button undo-change';undo.setAttribute('aria-label',t('undo'));undo.title=t('undo');undo.innerHTML=icon('undo');
      undo.onclick=()=>{
        if(state.history.at(-1)!==entry||!Energy.undo(state))return;
        save();render();showHistory();notify(t('undone'));
        content.querySelector('.undo-change')?.focus({preventScroll:true});
      };
      row.append(undo);
    }
    list.append(row);
  });
}
function showAction(a){
  let sign=a&&a.delta>0?1:-1;
  openDialog('action',a?'editAction':'newAction','<form><label for="action-name">'+th('name')+'</label><input id="action-name" required maxlength="80" placeholder="'+th('addName')+'"><span class="field-title" id="adjust-title">'+th('value')+'</span><div class="choices" role="group" aria-labelledby="adjust-title"><button type="button" data-sign="-1">− '+th('spend')+'</button><button type="button" data-sign="1">+ '+th('gain')+'</button></div><label for="magnitude">'+th('magnitude')+'</label>'+numberField('magnitude',1)+'<label for="target">'+th('target')+'</label><select id="target"><option value="current">'+th('current')+'</option><option value="total">'+th('total')+'</option><option value="both">'+th('both')+'</option></select>'+buttons('save',!!a)+'</form>');
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
function paintPalette(container,color,onSelect){
  container.replaceChildren();
  const order=['red','blue','yellow','green','purple','black','white','gray','pink','orange','gold','silver'];
  for(const key of order){
    const b=document.createElement('button'),[h,s,l]=Energy.palettes[key];
    const selected=key===color;
    b.type='button';b.className='swatch';b.dataset.color=key;b.setAttribute('aria-pressed',selected);
    b.innerHTML='<span class="chip" aria-hidden="true"></span><span>'+th(key)+'</span>';
    const chip=b.firstChild;
    chip.style.background='linear-gradient(140deg,hsl('+h+' '+s+'% '+Math.min(98,l+14)+'%),hsl('+h+' '+s+'% '+Math.max(2,l-10)+'%))';
    chip.textContent=selected?'✓':'';
    b.onclick=()=>onSelect(key);
    container.append(b);
  }
}
function showSettings(focusSelector){
  openDialog('settings','settings','<label for="energy-name">'+th('energyName')+'</label><input id="energy-name" maxlength="24" aria-describedby="energy-name-help" autocomplete="off"><p id="energy-name-help" class="help">'+th('energyNameHelp')+'</p><span class="field-title" id="color-label">'+th('color')+'</span><div class="palette" role="group" aria-labelledby="color-label"></div><label for="language">'+th('language')+'</label><select id="language" aria-describedby="language-help"><option value="es">Español</option><option value="en">English</option></select><p class="help" id="language-help">'+th('languageHelp')+'</p><div class="buttons"><button class="danger" type="button" id="delete-reserve"><i data-icon="trash"></i>'+th('deleteReserve')+'</button><button class="primary" type="button" id="settings-done">'+th('done')+'</button></div>');
  $('#energy-name').value=energyName();
  const saveName=()=>{
    const name=$('#energy-name');
    state.energyName=name.value.trim()===messages[workspace.lang].defaultEnergy?'Energía':Energy.normalizeName(name.value);
    name.value=energyName();
    save();render();
    $('#dialog-title').textContent=t('settings');
    $('#color-label').textContent=t('color');
  };
  $('#energy-name').onchange=saveName;
  $('#energy-name').onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();saveName();finish();}};
  paintPalette($('.palette'),state.color,key=>{saveName();state.color=key;save();render();showSettings('[data-color="'+key+'"]');});
  $('#language').value=workspace.lang;
  $('#language').onchange=e=>{const lang=e.target.value;saveName();workspace.lang=lang;save();render();showSettings('#language');};
  $('#settings-done').onclick=()=>{saveName();finish();};
  $('#delete-reserve').onclick=()=>{saveName();showDeleteReserve(state.id);};
  if(focusSelector)content.querySelector(focusSelector)?.focus({preventScroll:true});
}
function reserveLabel(reserve){return reserve.energyName==='Energía'?messages[workspace.lang].defaultEnergy:reserve.energyName;}
function renderTabs(){
  if(tabDrag){endTabDrag(false);return;}
  const list=$('#reserve-tabs'),scroll=list.scrollLeft;
  const focused=document.activeElement?.closest('.reserve-tab')?.dataset.reserveId;
  list.replaceChildren();
  for(const reserve of workspace.reserves){
    const tab=document.createElement('button');tab.type='button';tab.className='reserve-tab';tab.dataset.reserveId=reserve.id;tab.id='reserve-tab-'+reserve.id;
    tab.setAttribute('role','tab');tab.setAttribute('aria-controls','reserve-panel');tab.setAttribute('aria-selected',reserve.id===state?.id);tab.tabIndex=reserve.id===state?.id?0:-1;
    tab.setAttribute('aria-describedby','tab-help');tab.setAttribute('aria-keyshortcuts','Alt+ArrowLeft Alt+ArrowRight Delete');
    tab.setAttribute('aria-label',reserveLabel(reserve)+' · '+t(reserve.color));tab.title=reserveLabel(reserve)+' · '+t(reserve.color);
    const dot=document.createElement('span');dot.className='reserve-dot';dot.setAttribute('aria-hidden','true');
    const [h,s,l]=Energy.palettes[reserve.color];dot.style.background='hsl('+h+' '+s+'% '+l+'%)';
    const name=document.createElement('span');name.className='reserve-tab-name';name.textContent=reserveLabel(reserve);
    const grip=document.createElement('span');grip.className='tab-grip';grip.setAttribute('aria-hidden','true');grip.innerHTML=icon('grip');
    tab.append(grip,dot,name);list.append(tab);
    if(reserve.id===focused)tab.focus({preventScroll:true});
  }
  list.scrollLeft=scroll;
  const selected=list.querySelector('[aria-selected="true"]');
  if(selected){
    const bounds=list.getBoundingClientRect(),tabBounds=selected.getBoundingClientRect();
    if(tabBounds.left<bounds.left)list.scrollLeft-=bounds.left-tabBounds.left;
    else if(tabBounds.right>bounds.right)list.scrollLeft+=tabBounds.right-bounds.right;
    $('#reserve-panel').setAttribute('aria-labelledby',selected.id);
  }else $('#reserve-panel').removeAttribute('aria-labelledby');
}
function focusReserveTab(id=state?.id){
  const tab=document.getElementById('reserve-tab-'+id);
  if(!tab){$('#add-reserve').focus({preventScroll:true});return;}
  tab.focus({preventScroll:true});tab.scrollIntoView({block:'nearest',inline:'nearest'});
}
function switchReserve(id){
  const reserve=workspace.reserves.find(item=>item.id===id);if(!reserve||reserve===state)return;
  if(actionDrag)endActionDrag(false);
  if(tabDrag)endTabDrag(false);
  if(dialog.open)finish();
  state=reserve;workspace.activeId=reserve.id;
  save();render();$('#actions-list').scrollTop=0;$('#notice').textContent='';focusReserveTab();
}
function showNewReserve(){
  let color='blue';
  openDialog('new-reserve','newReserve','<form><label for="new-energy-name">'+th('energyName')+'</label><input id="new-energy-name" required maxlength="24" autocomplete="off" placeholder="'+th('reserveNameExample')+'"><span class="field-title" id="new-color-label">'+th('reserveColor')+'</span><div class="palette" role="group" aria-labelledby="new-color-label"></div>'+buttons('createReserve')+'</form>');
  $('#new-energy-name').value=messages[workspace.lang].defaultEnergy;
  const selectColor=key=>{color=key;paintPalette($('.palette'),color,selectColor);content.querySelector('[data-color="'+key+'"]').focus({preventScroll:true});};
  paintPalette($('.palette'),color,selectColor);
  content.querySelector('form').onsubmit=e=>{
    e.preventDefault();const name=$('#new-energy-name').value.trim();
    if(!name){$('#new-energy-name').value='';$('#new-energy-name').reportValidity();return;}
    state=Energy.addReserve(workspace,name===messages[workspace.lang].defaultEnergy?'Energía':name,color);
    save();finish();render();$('#actions-list').scrollTop=0;focusReserveTab();
  };
  $('#new-energy-name').focus();$('#new-energy-name').select();
}
function showDeleteReserve(id){
  const reserve=workspace.reserves.find(item=>item.id===id);if(!reserve)return;
  openDialog('delete-reserve','deleteReserve','<p class="delete-reserve-name"></p><p class="help">'+th('deleteReservePrompt')+'</p>'+buttons('remove'));
  content.querySelector('.delete-reserve-name').textContent=reserveLabel(reserve);
  $('#submit').classList.add('delete-confirm');
  $('#submit').onclick=()=>{
    if(actionDrag)endActionDrag(false);if(tabDrag)endTabDrag(false);
    if(!Energy.removeReserve(workspace,id))return;
    state=Energy.activeReserve(workspace);save();finish();render();focusReserveTab();notify(t('reserveDeleted'));
  };
  content.querySelector('[data-dismiss]').focus();
}
$('#add-reserve').onclick=$('#empty-add-reserve').onclick=showNewReserve;
const tabList=$('#reserve-tabs');
tabList.onclick=e=>{
  if(e.target.closest('.tab-grip')||performance.now()<suppressTabClickUntil)return;
  const tab=e.target.closest('.reserve-tab');if(tab)switchReserve(tab.dataset.reserveId);
};
tabList.addEventListener('keydown',e=>{
  const tab=e.target.closest('.reserve-tab');if(!tab)return;
  if(e.key==='Delete'){e.preventDefault();showDeleteReserve(tab.dataset.reserveId);return;}
  if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;
  e.preventDefault();const index=workspace.reserves.findIndex(reserve=>reserve.id===tab.dataset.reserveId);
  const next=e.key==='Home'?0:e.key==='End'?workspace.reserves.length-1:e.altKey?Math.max(0,Math.min(workspace.reserves.length-1,index+(e.key==='ArrowRight'?1:-1))):(index+(e.key==='ArrowRight'?1:-1)+workspace.reserves.length)%workspace.reserves.length;
  if(e.altKey){
    if(Energy.moveReserve(workspace,tab.dataset.reserveId,next)){save();renderTabs();focusReserveTab(tab.dataset.reserveId);notify(t('reordered'));}
  }else switchReserve(workspace.reserves[next].id);
});
tabList.addEventListener('pointerdown',e=>{
  const grip=e.target.closest('.tab-grip');
  if(!grip||e.button!==0||!e.isPrimary||tabDrag||actionDrag)return;
  e.preventDefault();const tab=grip.closest('.reserve-tab'),rect=tab.getBoundingClientRect();
  tab.setPointerCapture(e.pointerId);
  tabDrag={tab,pointer:e.pointerId,startX:e.clientX,startY:e.clientY,x:e.clientX,offset:e.clientX-rect.left,moved:false,ghost:null,frame:0};
});
document.addEventListener('pointermove',e=>{
  const drag=tabDrag;if(!drag||e.pointerId!==drag.pointer)return;
  drag.x=e.clientX;
  if(!drag.moved&&Math.hypot(e.clientX-drag.startX,e.clientY-drag.startY)<6)return;
  e.preventDefault();
  if(!drag.moved){
    drag.moved=true;const rect=drag.tab.getBoundingClientRect();
    drag.ghost=drag.tab.cloneNode(true);drag.ghost.removeAttribute('id');drag.ghost.removeAttribute('aria-controls');drag.ghost.setAttribute('aria-hidden','true');drag.ghost.inert=true;drag.ghost.classList.add('tab-drag-ghost');
    Object.assign(drag.ghost.style,{width:rect.width+'px',height:rect.height+'px',top:rect.top+'px'});document.body.append(drag.ghost);drag.tab.classList.add('tab-dragging');
    const tick=()=>{if(tabDrag!==drag)return;positionTabDrag(drag);drag.frame=requestAnimationFrame(tick);};tick();
  }
  positionTabDrag(drag);
});
function positionTabDrag(drag){
  drag.ghost.style.left=(drag.x-drag.offset)+'px';
  const bounds=tabList.getBoundingClientRect();
  tabList.scrollLeft+=drag.x<bounds.left+28?-7:drag.x>bounds.right-28?7:0;
  const next=[...tabList.children].find(tab=>tab!==drag.tab&&drag.x<tab.getBoundingClientRect().left+tab.getBoundingClientRect().width/2);
  if((next||null)!==drag.tab.nextElementSibling)tabList.insertBefore(drag.tab,next||null);
}
function endTabDrag(commit){
  const drag=tabDrag;if(!drag)return;tabDrag=null;
  cancelAnimationFrame(drag.frame);drag.ghost?.remove();drag.tab.classList.remove('tab-dragging');
  if(drag.tab.hasPointerCapture(drag.pointer))drag.tab.releasePointerCapture(drag.pointer);
  if(drag.moved){
    suppressTabClickUntil=performance.now()+250;
    if(commit&&Energy.reorderReserves(workspace,[...tabList.children].map(tab=>tab.dataset.reserveId))){save();notify(t('reordered'));}
  }
  renderTabs();focusReserveTab(drag.tab.dataset.reserveId);
}
document.addEventListener('pointerup',e=>{if(e.pointerId===tabDrag?.pointer){tabDrag.x=e.clientX;if(tabDrag.moved)positionTabDrag(tabDrag);endTabDrag(true);}});
document.addEventListener('pointercancel',()=>endTabDrag(false));
window.addEventListener('blur',()=>endTabDrag(false));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&tabDrag){e.preventDefault();endTabDrag(false);}});
$('#minus').onclick=()=>change(-1);$('#plus').onclick=()=>change(1);
$('#orb').onclick=$('#calc-hint').onclick=showCalculator;
$('#history').onclick=showHistory;
$('#total').onclick=showTotal;$('#reset').onclick=showReset;
$('#settings').onclick=()=>showSettings();$('#add').onclick=()=>showAction(null);
$('#actions-list').onclick=e=>{
  const row=e.target.closest('.action-row');if(!row)return;
  const a=state.actions.find(item=>item.id===row.dataset.id);if(!a)return;
  if(e.target.closest('.run-action'))change(a.delta,a.target,displayName(a),'action');
  else if(e.target.closest('.edit-action'))showAction(a);
};
// The dedicated handle leaves normal row taps and list scrolling untouched.
const actionList=$('#actions-list');
actionList.addEventListener('pointerdown',e=>{
  const handle=e.target.closest('.drag-handle');
  if(!handle||e.button!==0||!e.isPrimary||actionDrag||tabDrag)return;
  const row=handle.closest('.action-row'),rect=row.getBoundingClientRect();
  handle.setPointerCapture(e.pointerId);
  actionDrag={handle,row,pointer:e.pointerId,startX:e.clientX,startY:e.clientY,y:e.clientY,offset:e.clientY-rect.top,moved:false,ghost:null,frame:0};
});
document.addEventListener('pointermove',e=>{
  const drag=actionDrag;if(!drag||e.pointerId!==drag.pointer)return;
  drag.y=e.clientY;
  if(!drag.moved&&Math.hypot(e.clientX-drag.startX,e.clientY-drag.startY)<6)return;
  e.preventDefault();
  if(!drag.moved){
    drag.moved=true;
    const rect=drag.row.getBoundingClientRect();
    drag.ghost=drag.row.cloneNode(true);drag.ghost.classList.add('drag-ghost');drag.ghost.setAttribute('aria-hidden','true');drag.ghost.inert=true;
    Object.assign(drag.ghost.style,{width:rect.width+'px',left:rect.left+'px'});document.body.append(drag.ghost);drag.row.classList.add('dragging');
    const tick=()=>{
      if(actionDrag!==drag)return;
      positionActionDrag(drag);
      drag.frame=requestAnimationFrame(tick);
    };
    tick();
  }
  positionActionDrag(drag);
});
function positionActionDrag(drag){
      drag.ghost.style.top=(drag.y-drag.offset)+'px';
      const bounds=actionList.getBoundingClientRect();
      const speed=drag.y<bounds.top+36?-8:drag.y>bounds.bottom-36?8:0;
      actionList.scrollTop+=speed;
      const next=[...actionList.children].find(row=>row!==drag.row&&drag.y<row.getBoundingClientRect().top+row.getBoundingClientRect().height/2);
      if((next||null)!==drag.row.nextElementSibling)actionList.insertBefore(drag.row,next||null);
}
function endActionDrag(commit){
  const drag=actionDrag;if(!drag)return;actionDrag=null;
  cancelAnimationFrame(drag.frame);drag.ghost?.remove();drag.row.classList.remove('dragging');
  if(drag.handle.hasPointerCapture(drag.pointer))drag.handle.releasePointerCapture(drag.pointer);
  if(commit&&drag.moved){
    const byId=new Map(state.actions.map(action=>[action.id,action]));
    state.actions=[...actionList.children].map(row=>byId.get(row.dataset.id)).filter(Boolean);
    save();notify(t('reordered'));
  }
  renderActions();
  [...actionList.querySelectorAll('.action-row')].find(row=>row.dataset.id===drag.row.dataset.id)?.querySelector('.drag-handle').focus({preventScroll:true});
}
document.addEventListener('pointerup',e=>{if(e.pointerId===actionDrag?.pointer){actionDrag.y=e.clientY;if(actionDrag.moved)positionActionDrag(actionDrag);endActionDrag(true);}});
document.addEventListener('pointercancel',()=>endActionDrag(false));
window.addEventListener('blur',()=>endActionDrag(false));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&actionDrag){e.preventDefault();endActionDrag(false);}});
actionList.addEventListener('keydown',e=>{
  const handle=e.target.closest('.drag-handle');if(!handle)return;
  if(e.key==='Escape'&&actionDrag){e.preventDefault();endActionDrag(false);return;}
  if(!['ArrowUp','ArrowDown','Home','End'].includes(e.key))return;
  e.preventDefault();
  const id=handle.closest('.action-row').dataset.id,index=state.actions.findIndex(action=>action.id===id);
  const next=e.key==='Home'?0:e.key==='End'?state.actions.length-1:Math.max(0,Math.min(state.actions.length-1,index+(e.key==='ArrowUp'?-1:1)));
  if(next===index)return;
  const [action]=state.actions.splice(index,1);state.actions.splice(next,0,action);save();renderActions();
  notify(t('reordered')+' · '+t('position')+' '+(next+1));
});
window.addEventListener('storage',e=>{
  if(e.storageArea!==localStorage||(e.key!==Energy.workspaceKey&&e.key!==null))return;
  try{const restored=Energy.restoreWorkspace(JSON.parse(e.newValue));if(actionDrag)endActionDrag(false);if(tabDrag)endTabDrag(false);if(dialog.open)finish();workspace=restored;state=Energy.activeReserve(workspace);render();}
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
