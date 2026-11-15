'use strict';
const ReserveSwipe=(()=>{
  // Track on the document so releasing outside the card still ends the gesture.
  // Native vertical panning and pinch zoom remain available through touch-action.
  function connect(surface,{getContext,onSwipe}){
    const doc=surface.ownerDocument,win=doc.defaultView;
    let gesture=null,blockedClick=null;
    function cancel(){
      if(gesture)blockedClick={pointer:gesture.pointer,until:win.performance.now()+500};
      gesture=null;
    }
    function update(event){
      const dx=event.clientX-gesture.x,dy=event.clientY-gesture.y;
      if(Math.hypot(dx,dy)>10)gesture.moved=true;
      if(!gesture.axis&&Math.hypot(dx,dy)>12){
        if(Math.abs(dy)>Math.abs(dx))gesture.axis='vertical';
        else if(Math.abs(dx)>Math.abs(dy)*1.5)gesture.axis='horizontal';
      }
      return {dx,dy};
    }
    doc.addEventListener('pointerdown',event=>{
      if(gesture&&event.pointerId!==gesture.pointer)cancel();
    },true);
    surface.addEventListener('pointerdown',event=>{
      if(!event.isPrimary||event.button!==0)return;
      blockedClick=null;
      const context=getContext();
      if(context==null)return;
      gesture={pointer:event.pointerId,context,x:event.clientX,y:event.clientY,moved:false,axis:''};
    });
    doc.addEventListener('pointermove',event=>{
      if(!gesture||event.pointerId!==gesture.pointer)return;
      if(getContext()!==gesture.context){cancel();return;}
      update(event);
      if(gesture.axis==='horizontal'&&event.cancelable)event.preventDefault();
    },{passive:false});
    doc.addEventListener('pointerup',event=>{
      if(!gesture||event.pointerId!==gesture.pointer)return;
      if(getContext()!==gesture.context){cancel();return;}
      const {dx,dy}=update(event);
      const complete=gesture.axis==='horizontal'&&Math.abs(dx)>=60&&Math.abs(dx)>Math.abs(dy)*1.5;
      if(gesture.moved)cancel();else gesture=null;
      if(complete)onSwipe(dx<0?1:-1);
    });
    doc.addEventListener('pointercancel',event=>{
      if(event.pointerId===gesture?.pointer)cancel();
    });
    // Suppress the compatibility click from a drag, including short/edge swipes.
    // A fresh pointerdown resets the guard, so a subsequent intentional tap works.
    surface.addEventListener('click',event=>{
      if(event.detail===0||!blockedClick||win.performance.now()>blockedClick.until)return;
      if(event.pointerId>0&&event.pointerId!==blockedClick.pointer)return;
      event.preventDefault();event.stopImmediatePropagation();blockedClick=null;
    },true);
    doc.addEventListener('keydown',event=>{
      if(event.key==='Escape'&&gesture){event.preventDefault();cancel();}
    });
    win.addEventListener('blur',cancel);
    doc.addEventListener('visibilitychange',()=>{if(doc.hidden)cancel();});
    return {cancel};
  }
  return {connect};
})();
if(typeof module!=='undefined'&&module.exports)module.exports=ReserveSwipe;
