"use strict"
var W, H, L, n = 10, c = 0, dc = 0.3;
const {sin, cos, PI, sqrt, random, floor, ceil, round, abs} = Math;

function id(n){
    return document.getElementById(n);
}
function atan(x1, y1, x2, y2){
    let dx = x2 - x1;
    let dy = y2 - x1;
    if(dx == 0){
        if(dy>=0){
            return PI/2;
        }else{
            return(3/2)*PI;
        }
    }else if(dx>0){
        return Math.atan(dy/dx);
    }else{
        return PI+Math.atan(dy/dx);
    }
}
window.onload = function(){
    var cnv = document.getElementById("canvas");
    var ctx = cnv.getContext("2d");
    function init(){
        W = window.innerWidth;
        H = window.innerHeight;
        cnv.width = W;
        cnv.height = H;
        L = (W<H?W:H)/2;
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, W, H);
    }

    init();
    window.onresize = init;

    function Point() {
        this.ang = 4*PI*random();
        this.dang = (-0.5+random()) / 20;
        this.r = 2*L/3;
        this.x = W/2 + this.r * cos(this.ang);
        this.y = H/2 + this.r * sin(this.ang);
        this.update = function(){
            this.ang += this.dang;
            this.x = W/2 + this.r * cos(this.ang);
            this.y = H/2 + this.r * sin(this.ang);
        }
    }

    var ctrls = [];
    for(let i=0; i<n; i++){
        ctrls.push(new Point());
    }

    function animate(){
        ctx.fillStyle = "rgba(0,0,0,0.04)";
        ctx.fillRect = (0, 0, W, H);
        ctx.beginPath();
        ctx.moveTo((ctrls[0].x+ctrls[n-1].x)/2, (ctrls[0].y+ctrls[n-1].y)/2);
        for(let p=0; p<n; p++){
            let q = p+1;
            if(q==n) q=0;
            ctx.quadraticCurveTo(ctrls[p].x,ctrls[p].y, (ctrls[p].x+ctrls[q].x)/2, (ctrls[p].y + ctrls[q].y)/2);
            ctrls[p].update();
        }
        ctx.strokeStyle = `hsl(${round(150+c)}deg, 100%, 70%)`;
        ctx.shadowBlur = L*10/1000;
        ctx.strokeStyle = `hsl(${round(150+c)}deg, 100%, 50%)`;
        ctx.lineWidth = L*1/1000;

        ctx.stroke();
        ctx.shadowColor = "transparent";
        c+=dc;
        if(c>=170 || c<=0) dc=-dc;

        window.requestAnimationFrame(animate);
    }
    animate();
}