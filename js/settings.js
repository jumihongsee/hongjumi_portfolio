


gsap.registerPlugin(ScrollTrigger);

const container = document.querySelector('#container');

const options = { damping: 0.1, }

const section02 = document.querySelector('.section02')

const scrollbar = Scrollbar.init(section02, {
  ...options
});

ScrollTrigger.scrollerProxy(section02, {
  scrollTop(value) {
    if (arguments.length) {
      scrollbar.scrollTop = value; // setter
    }
    return scrollbar.scrollTop; // getter
  },
});
scrollbar.track.yAxis.hide();
scrollbar.addListener(ScrollTrigger.update);
ScrollTrigger.defaults({ scroller: section02 });

