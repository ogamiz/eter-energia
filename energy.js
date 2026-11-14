/* Integer arithmetic shared by the calculator, single steps and saved actions. */
const Energy = (() => {
  const limit = 999999;
  const key = 'eter:energia:v1:' + (typeof location === 'undefined' ? '/' : location.pathname.replace(/(?:index\.html)?$/, '').replace(/\/$/,''));
  const palettes = {
    blue:[208,94,54,'#87c9ff'], red:[355,77,47,'#ff999e'], yellow:[52,92,53,'#f6df72'],
    green:[148,69,40,'#80d8ab'], purple:[266,67,61,'#c6a5fb'], black:[225,11,10,'#acb0bd'],
    white:[210,15,90,'#eef5ff'], gray:[219,7,46,'#b5bfcc'], pink:[326,77,66,'#f6accf'],
    orange:[24,91,52,'#ffbd88'], gold:[41,74,46,'#e8c878'], silver:[210,22,66,'#ccdae5']
  };
  function defaults(){
    return {version:1,total:100,current:72,lang:'es',color:'blue',energyName:'Energía',actions:[
      {id:'start-1',preset:'maintenance',name:'',delta:-6,target:'total'},
      {id:'start-2',preset:'recovery',name:'',delta:8,target:'current'}
    ]};
  }
  const whole=n=>Number.isSafeInteger(n)&&n>=0&&n<=limit;
  const normalizeName=name=>typeof name==='string' ? name.trim().replace(/\s+/g,' ').slice(0,24) || 'Energía' : 'Energía';
  function restore(raw) {
    const state=defaults();
    if (!raw || raw.version!==1) return state;
    if(whole(raw.total))state.total=raw.total;
    if(whole(raw.current))state.current=raw.current;
    if(['en','es'].includes(raw.lang))state.lang=raw.lang;
    if(Object.hasOwn(palettes, raw.color))state.color=raw.color;
    state.energyName=normalizeName(raw.energyName);
    if(Array.isArray(raw.actions)){
      const seen=new Set();
      state.actions=raw.actions.filter(a=>{
        if(!a || typeof a.id!=='string'||seen.has(a.id)||!['current','total'].includes(a.target)
          ||!Number.isSafeInteger(a.delta)||a.delta===0||Math.abs(a.delta)>limit||typeof a.name!=='string'
          ||(!a.name.trim()&&!['maintenance','recovery'].includes(a.preset)))return false;
        seen.add(a.id);return true;
      }).map(a=>({...a,name:a.name.trim().slice(0,80)}));
    }
    return state;
  }
  function evaluate(expression){
    if(typeof expression!=='string'||expression.length>64||!/^[-+]?\d+(?:[-+]\d+)*$/.test(expression))return null;
    const terms=expression.match(/[+-]?\d+/g).map(Number);
    if(terms.some(n=>Math.abs(n)>limit))return null;
    return terms.reduce((sum,n)=>sum+n,0);
  }
  function result(state,delta,target='current'){
    if(target==='total')return Math.min(limit,Math.max(0,state.total+delta));
    // Lowering capacity can create an overfull reserve. Spending uses its real value.
    return Math.max(0,Math.min(Math.max(state.current,state.total),state.current+delta));
  }
  return {limit,key,palettes,defaults,restore,evaluate,result,whole,normalizeName};
})();
if(typeof module!=='undefined'&&module.exports)module.exports=Energy;
