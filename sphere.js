/* A liquid surface and its reflected filaments share the same moving waterline. */
class ReservoirView {
  constructor(orb, sky) {
    this.orb = orb;
    this.sky = sky;
    this.colors = {h:207,s:95,l:55};
    this.level = this.target = 0.72;
    this.motion = matchMedia('(prefers-reduced-motion: reduce)');
    this.t = 0;
    this.last = 0;
    this.frame = 0;
    this.points = [];
    let seed = 83;
    const random = () => ((seed = seed * 16807 % 2147483647) / 2147483647);
    for (let i=0;i<128;i++) this.points.push([random(),random(),random(),random()]);
    this.motion.addEventListener('change', () => this.refresh());
    document.addEventListener('visibilitychange', () => this.refresh());
    this.observer = new ResizeObserver(() => {this.drawSky(); this.refresh();});
    this.observer.observe(orb);
    this.observer.observe(sky);
  }
  set(value, colors) {
    this.target = Math.max(0,Math.min(1,value));
    this.colors = colors;
    this.drawSky();
    this.refresh();
  }
  refresh() {
    cancelAnimationFrame(this.frame);
    this.last = 0;
    if (document.hidden) return;
    if (this.motion.matches) {this.level=this.target;this.drawOrb();return;}
    const animate = now => {
      const dt = this.last ? Math.min((now-this.last)/1000,.13) : .033;
      if (dt >= .032) {
        this.last = now;
        this.level += (this.target-this.level)*(1-Math.exp(-dt*10));
        if (Math.abs(this.target-this.level)<.0005) this.level=this.target;
        this.t += dt*(.56+1.8*(1-this.level)**2);
        this.drawOrb();
      }
      this.frame = requestAnimationFrame(animate);
    };
    this.frame = requestAnimationFrame(animate);
  }
  context(canvas) {
    const w=canvas.clientWidth,h=canvas.clientHeight,d=Math.min(devicePixelRatio||1,2);
    if (!w || !h) return null;
    if (canvas.width!==Math.round(w*d) || canvas.height!==Math.round(h*d)) {
      canvas.width=Math.round(w*d); canvas.height=Math.round(h*d);
    }
    const ctx=canvas.getContext('2d');
    if(!ctx) return null;
    ctx.setTransform(d,0,0,d,0,0);
    ctx.clearRect(0,0,w,h);
    return {ctx,w,h};
  }
  tone(light,alpha=1,sat=this.colors.s) {
    return 'hsla('+this.colors.h+','+sat+'%,'+Math.max(0,Math.min(100,light))+'%,'+alpha+')';
  }
  drawSky() {
    const area=this.context(this.sky); if(!area)return;
    const {ctx:c,w,h}=area;
    const halo=c.createRadialGradient(w*.5,h*.47,8,w*.5,h*.47,w*.49);
    halo.addColorStop(0,this.tone(46,.13));halo.addColorStop(.55,this.tone(38,.055));halo.addColorStop(1,this.tone(40,0));
    c.fillStyle=halo;c.fillRect(0,0,w,h);
    // Two sparse constellations flank the dial. Their stars stay still.
    const nets=[[[.035,.65],[.095,.56],[.15,.62],[.205,.45],[.26,.41]],[[.76,.38],[.82,.34],[.88,.48],[.94,.43],[.975,.54]]];
    for(const net of nets){
      c.beginPath();net.forEach(([x,y],i)=>i?c.lineTo(x*w,y*h):c.moveTo(x*w,y*h));
      c.strokeStyle=this.tone(72,.12);c.lineWidth=.7;c.stroke();
      for(const [x,y] of net){c.beginPath();c.arc(x*w,y*h,1.4,0,Math.PI*2);c.fillStyle=this.tone(78,.52);c.fill();}
    }
    for(const [x,y,a,b] of this.points){
      c.beginPath();c.arc(x*w,y*h,.35+.75*a,0,2*Math.PI);c.fillStyle=this.tone(84,.10+.45*b);c.fill();
      if(a>.94){const size=1.8+b*1.4;c.beginPath();c.moveTo(x*w-size,y*h);c.lineTo(x*w+size,y*h);c.moveTo(x*w,y*h-size);c.lineTo(x*w,y*h+size);c.strokeStyle=this.tone(85,.52);c.lineWidth=.7;c.stroke();}
    }
  }
  drawOrb() {
    const area=this.context(this.orb);if(!area)return;
    const {ctx:c,w,h}=area;
    c.scale(w/320,h/320);c.translate(160,160);
    const tau=Math.PI*2,R=127,t=this.t,v=this.level,l=this.colors.l;
    const circle=(r,stroke,width=1)=>{c.beginPath();c.arc(0,0,r,0,tau);c.strokeStyle=stroke;c.lineWidth=width;c.stroke();};
    const radial=(x,y,a,b,stops)=>{const g=c.createRadialGradient(x,y,a,x,y,b);for(const [n,color] of stops)g.addColorStop(n,color);return g;};
    c.fillStyle=radial(0,0,R-8,159,[[0,this.tone(l,.05)],[.35,this.tone(l,.20)],[1,this.tone(l,0)]]);c.fillRect(-160,-160,320,320);
    circle(149,this.tone(76,.17),.8);
    for(let i=0;i<80;i++){
      const a=tau*i/80;const major=i%5===0;const r=major?141:143;
      c.beginPath();c.moveTo(Math.sin(a)*r,-Math.cos(a)*r);c.lineTo(Math.sin(a)*146,-Math.cos(a)*146);
      c.strokeStyle=this.tone(83,major?.64:.26);c.lineWidth=major?1.1:.8;c.stroke();
    }
    // Faceted reference marks at the cardinal points.
    for(let i=0;i<4;i++){c.save();c.rotate(i*tau/4);c.beginPath();c.moveTo(0,-154);c.lineTo(2.8,-149);c.lineTo(0,-144);c.lineTo(-2.8,-149);c.closePath();c.fillStyle=this.tone(84,.88);c.fill();c.restore();}
    circle(133,this.tone(66,.68),1.1);circle(130.5,this.tone(78,.34),.8);
    c.save();c.beginPath();c.arc(0,0,R,0,tau);c.clip();
    c.fillStyle=radial(-23,-61,5,180,[[0,this.tone(17)],[.5,this.tone(10)],[1,'#050b15']]);c.fillRect(-R,-R,R*2,R*2);
    for(const [x,y,a,b] of this.points.slice(0,30)){
      c.beginPath();c.arc((x-.5)*250,(y-.5)*250,a*.85+.2,0,tau);c.fillStyle=this.tone(83,.12+.28*b);c.fill();
    }
    const line=R-2*R*v;
    const waveAmp=(5+10*(1-v)**2)*Math.min(1, v*14,(1-v)*18);
    const wave = (x,phase=0)=>line+waveAmp*(Math.sin(x*.028+t*1.55+phase)+.47*Math.sin(x*.051-t*.96+phase*.6)+.19*Math.cos(x*.083+t*.73));
    const trace=(fn)=>{c.beginPath();for(let x=-R-3;x<=R+3;x+=2){const y=fn(x);if(x===-R-3)c.moveTo(x,y);else c.lineTo(x,y);}};
    const filled=(fn,style)=>{trace(fn);c.lineTo(R+3,R+3);c.lineTo(-R-3,R+3);c.closePath();c.fillStyle=style;c.fill();};
    if(v>0){
      filled(x=>wave(x,2.15),this.tone(Math.min(74,l+14),.8));
      const g=c.createLinearGradient(-82,line,82,135);
      g.addColorStop(0,this.tone(Math.min(85,l+13)));g.addColorStop(.27,this.tone(Math.max(15,l-8)));g.addColorStop(.67,this.tone(Math.max(7,l*.53)));g.addColorStop(1,this.tone(Math.max(3,l*.24)));
      filled(x=>wave(x),g);
      c.save();trace(x=>wave(x));c.lineTo(R+3,R+3);c.lineTo(-R-3,R+3);c.closePath();c.clip();
      c.fillStyle=radial(-76,line+8,2,136,[[0,this.tone(Math.min(87,l+27),.48)],[.44,this.tone(l+9,.14)],[1,this.tone(l,0)]]);
      c.fillRect(-R,-R,2*R,2*R);
      // Interleaved luminous filaments follow the flow at the surface and in the depths.
      for(let n=0;n<28;n++){
        const f=n/27;
        trace(x=>wave(x,.9*f)+2+f*29+(5+8*f)*Math.sin(x*.025+t+f*2.6)+f*7*Math.cos(x*.038-t*1.3+f));
        c.strokeStyle=this.tone(l+21,(.06+.18*(1-f))*(n%3===0?1:.48));c.lineWidth=n%5===0?1.2:.6;c.stroke();
      }
      for(let n=0;n<13;n++){
        trace(x=>line+30+n*7+13*Math.sin(x*.024-t*.65+n*.27)+6*Math.sin(x*.041+t*.55+n*.21));
        c.strokeStyle=this.tone(l+18,.075);c.lineWidth=.85;c.stroke();
      }
      for(const [x,y,a,b] of this.points.slice(0,79)){
        const px=(x-.5)*R*2+2*Math.sin(t+y*13),py=R-((y*256+t*(1+b*1.6))%256);
        c.beginPath();c.arc(px,py,.28+a*.85,0,tau);c.fillStyle=this.tone(93,.20+.37*b);c.fill();
      }
      c.restore();
      trace(x=>wave(x));c.strokeStyle=this.tone(Math.max(63,l+28),.96);c.lineWidth=1.6;c.shadowColor=this.tone(l+15,.9);c.shadowBlur=6;c.stroke();c.shadowBlur=0;
    }
    // Slender glass rim and specular arcs keep the center legible.
    c.fillStyle=radial(0,0,98,128,[[0,this.tone(l,0)],[.80,this.tone(54,.04)],[1,this.tone(87,.32)]]);c.fillRect(-R,-R,R*2,R*2);
    c.fillStyle=radial(0,0,0,87,[[0,'rgba(4,13,29,.34)'],[.66,'rgba(4,13,29,.18)'],[1,'rgba(4,13,29,0)']]);c.fillRect(-R,-R,R*2,R*2);
    c.restore();circle(R,this.tone(86,.78),1.15);
    c.beginPath();c.arc(0,0,R+1,Math.PI*1.04,Math.PI*1.48);c.strokeStyle=this.tone(89,.75);c.lineWidth=1.5;c.stroke();
  }
}
