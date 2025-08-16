
const headerIcon = document.querySelector('.header-icon');
const header = document.querySelector('header');
const navItems = document.querySelectorAll('nav ul li p');

function isMobileView() {
  return window.matchMedia('(max-width: 1024px)').matches;
}

window.addEventListener('load', () => {
  if (isMobileView()) {
    document.querySelector('.wrapper').style.transform = 'none';
    state.isPlaying = false; 
    return;
  }

  if (currentPageIndex === 1) {
    pages.page01.enter();
  }

});

let viewportState = isMobileView();

window.addEventListener('resize', () => {
  const isMobile = isMobileView();

  if (!isMobile && viewportState !== isMobile) {
    location.reload(); 
  }

  viewportState = isMobile;
});




const navTargetByIndex = [2, 3, 5];

navItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    header.classList.remove('active');
    const targetIndex = navTargetByIndex[index];
    if (!targetIndex || currentPageIndex === targetIndex) return;
    transition(targetIndex, currentPageIndex > targetIndex ? 'up' : 'down');
  });
});

headerIcon.addEventListener('click', () => {
  const isActive = header.classList.toggle('active');

  if (isActive) {
    gsap.set([
      ...navItems,
      document.querySelector('.contact'),
      document.querySelector('.resume')
    ], {
      opacity: 0,
    });

    const nav_tl = gsap.timeline({
    defaults : {
        duration: 0.2,
        ease: "power2.out",
      }
    });
    nav_tl.to(navItems, {
      opacity: 1,
      stagger: 0.2,
    })
    .to('.contact, .resume',{
      opacity:1,

    }, )


  }
});


const state = {
  isPlaying: true,
  isScrolling: false,
  isGoingUp: false
}


let currentPageIndex = 1;


const sections = gsap.utils.toArray('.section');

window.addEventListener('load',()=>{
    if (currentPageIndex === 1) {
      pages.page01.enter(); 
    }
})


const pages = {
  page01:{
    enter:()=>{
       const sec1_t1 = gsap.timeline(
        {
          default :{
            ease:'power3.inOut'
          }
        }
      );
      sec1_t1.to('.text-wrapper h1',{
        opacity: 1,
        x: 0,
        duration: 1,
        stagger: 0.2,
 
      })
      .to('.section01 .line',{
        width:'100%',
        duration: 0.3,
      })
      .to('.arrow-wrapper .arrow',{
        height: '70%'
      })
      .to(['.arrow-wrapper .arrow .left', '.arrow-wrapper .arrow .right'],{
        height: '30%'
      })
      .to('.scroll-sign span', {
        y: 0,
        duration: 0.2,
        stagger: 0.05
      },'-=1')
      .to('.scroll-sign span', {
        opacity: 1,
        duration: 0.5, 
        stagger: 0.05
      },'-=0.5') 
    },
    leave:()=>{
    },
  },
  page02:{
    enter:()=>{

      if(!ScrollTrigger.getById('section02')){
        ScrollTrigger.create({
          trigger: '.depth_about_wrapper',
          start: 'top top',
          end: 'bottom bottom',
          // markers: true,
          id:'section02',
          onLeaveBack:()=> {  
            console.log('d')
            if(!state.isScrolling){
              transition(1,'up')
            }
          },
          onLeave:()=> transition(3,'down'),
          onUpdate:({progress}) => {
            if(progress === 0) {
              state.isScrolling = false;
            }else{
              state.isScrolling = true;
            }
            
          }
        })
  
        markers()
      }

    const intro = document.querySelector('.contents-wrapper.intro');
    if (intro) {
      const titleEl_In = intro.querySelectorAll('h1');
      const subEl_In = intro.querySelectorAll('h2');
      const lineEl_In = intro.querySelectorAll('.line');
      const pEl_In = intro.querySelectorAll('p');
      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: intro,
          start: 'top center',
          end: 'bottom center',
          id: 'section02-intro',
          // markers:true,
        },
        defaults: {
          ease: 'power3.inOut'
        }
      });

      introTl.to(titleEl_In, {
        x: 0,
        opacity: 1,
        duration: 1
      }, 0);

      introTl.to(subEl_In, {
        x: 0,
        opacity: 1,
        duration: 0.7
      }, 0.1);

      introTl.to(lineEl_In, {
        width: '100%',
        duration: 1
      },0);

      introTl.to(pEl_In, {
        opacity: 1,
        duration: 1,
        stagger: 0.1
      },0.2);

      // markers()
    }
    gsap.utils.toArray('.contents-wrapper:not(.intro)').forEach((items, index) => {
      const titleEl = items.querySelectorAll('h2');
      const pEl = items.querySelectorAll('p');


      const sec2_tl = gsap.timeline({
        scrollTrigger: {
          trigger: items,
          start: 'top center',
          end: 'bottom center',
          id: `section02-${index}`,
          // markers: true
          
        },
        defaults: {
          ease: 'power3.inOut',
        }
      });

      sec2_tl.to(titleEl, {
        y: 0,
        opacity: 1,
        duration: 1,
      }, 0);

      sec2_tl.to(pEl, {
        opacity: 1,
        duration: 1.5,
      }, 0.1);


      // markers();
    });

    const skills = document.querySelector('.contents-wrapper.skills');
    if(skills){
      const titleEl_sk = skills.querySelectorAll('h3');
      const lineEl_sk = skills.querySelectorAll('.line');
      const skillLineEl_sk = skills.querySelectorAll('.skills_line')
      const ulEl_sk = skills.querySelectorAll('ul');
      const isTablet = window.matchMedia('(max-width : 1024px)').matches;


      const skillsTl = gsap.timeline({
          scrollTrigger: {
            trigger: skills,
            start: 'top center',
            end: 'bottom center',
            id: 'section02-intro',
          },
          defaults: {
            ease: 'power3.inOut'
          }
      });

      skillsTl.to(lineEl_sk, {
        width : '100%',
        duration: 1
      }, 0);
      skillsTl.to(skillLineEl_sk, {
        [isTablet ? 'width' : 'height']: '100%',
        duration: 1,
        stagger: 0.1
      }, 0);
      skillsTl.to(titleEl_sk,{
         opacity : 1,
         stagger : 0.1
      }, 0.2)
      skillsTl.to(ulEl_sk,{
        opacity : 1,
        duration : 1,
        stagger : 0.2,
      }, 0.2)

    }

    },
    leave:()=>{
    }
  },
  page03:{
    enter:()=>{
    },
    leave:()=>{
    }
  },
  page04:{
    enter:()=>{
    },
    leave:()=>{
    }
  },
}


function globalEnter(){
 const tl = gsap.timeline();
  tl.to('.pj-t1',{opacity:1, y:0, duration: 0.5})
  .to('.pj-t2',{opacity:1, y:0, duration: 0.5}, "-=0.3")
  .to('.detail-wrapper',{opacity:1, duration:0.5},"-=0.5")
  .to('.visual_line',{height:"100%"},0)
  .to('.img-contents-wrapper img',{opacity:1, scale:1, y:0, duration:0.5},0)
  
}

function globalLeave(){
  const tl = gsap.timeline();
  tl.to('.pj-t1',{opacity:0, y:30, duration: 0.5})
  .to('.pj-t2',{opacity:0, y:30, duration: 0.5}, "-=0.3")
  .to('.detail-wrapper',{opacity:0, duration:0.5},"-=0.5")
  .to('.visual_line',{height:"0%"},0)
  .to('.img-contents-wrapper img',{opacity:0, scale:0.9, y:"20px", duration:0.5},0)
}

function transition(index,dir){

  const {page01,page02,page03,page04} = pages;

  currentPageIndex = index;


  gsap.to('.wrapper',{
    y: -innerHeight * (index - 1),
    duration:1.4,
    ease:'expo.inOut',
    onStart:()=>{

     
      if (index >= 3) globalLeave();
      switch (dir === 'up' ? index + 1 : index - 1) {
        case 1: page01.leave(); return;
        case 2: page02.leave(); return;
        case 3: page03.leave(); return;
        case 4: 
          page04.leave(); 
          state.isPlaying = false;
          return;
      }
    },
    onComplete:()=>{
      state.isPlaying = true;
      

     if (index >= 3) globalEnter();
      switch (index) {
        case 1: page01.enter(); return;
        case 2: 
          page02.enter(); 
          state.isPlaying = false;
          state.isGoingUp = false;
          return
        ;
        case 3: page03.enter(); return;
        case 4: page04.enter(); return;
      
      }
    }
  })
}

function handleWheel(e){

   if (isMobileView()) return; 

  let direction = e.deltaY < 0 ? 'up' : 'down'

  if(direction === 'up' && currentPageIndex === 1) return;
  if(direction === 'down' && currentPageIndex === sections.length) return;

  if(!state.isPlaying && !state.isScrolling && direction === 'up'){
    
    if(!state.isGoingUp){
      transition(2,'up')
      state.isGoingUp = true;
    }
    return;
  }

  if(state.isPlaying){
    
    state.isPlaying = false;


    if(direction === 'up'){
      if(currentPageIndex <= 1) return;
      --currentPageIndex
      
      
  
    }else{
      if(currentPageIndex === sections.length) return;
      if(currentPageIndex >= sections.length) return;
      ++currentPageIndex
    }
    transition(currentPageIndex,direction)
    
  }
}

container.addEventListener('wheel',handleWheel)






markers()

