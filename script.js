const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

var cursor = document.querySelector("#cursor");

function firstPageAnim(){
    var tl = gsap.timeline();

    tl.from(".nav",{
        y:'-10',
        opacity:0,
        duration:1.5,
        ease:Expo.easeInOut
    })
    .to(".boundingelem",{
        y:'0',
        duration:2,
        ease:Expo.easeInOut,
        stagger:0.2,
        delay: -1,
    })
    .from("#herofooter",{
        y:-10,
        duration:1.5,
        ease:Expo.easeInOut,
        opacity:0,
        delay: -1,
    })
    
}
firstPageAnim();
var timeout;

function cursorSkew(){
    //define default scale value 
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove",function(dets){
        clearTimeout(timeout);
        
        var xdiff = dets.clientX - xprev;
        var ydiff = dets.clientY - yprev;
        xscale =  gsap.utils.clamp(0.8,1.2,xdiff);
        yscale = gsap.utils.clamp(0.8,1.2,ydiff);

        xprev = dets.clientX;
        yprev = dets.clientY;   
       
        cursorMouseFollower(xscale, yscale);
       timeout = setTimeout(function(){
        cursor.style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;


       },100); 
    });

}
cursorSkew();

function cursorMouseFollower(xscale, yscale){
    window.addEventListener("mousemove", function(dets){
        cursor.style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    })
}
cursorMouseFollower();

var elem = document.querySelectorAll("#second .elem");
elem.forEach(function(box){
    var rotate = 0;
    var diffrot = 0;


    box.addEventListener("mousemove",function(dets){
        
        var diff = dets.clientY - box.getBoundingClientRect().top;
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;
        
        gsap.to(box.querySelector("img"),{
            opacity: 1,
            ease: Power3, 
            top : diff,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20,20,diffrot)
        });
    });
    box.addEventListener("mouseleave",function(dets){
           
       gsap.to(box.querySelector("img"),{
            opacity: 0,
            ease: Power3, 
            duration: 0.5,
            
         
        });
    });
} 
);



    
