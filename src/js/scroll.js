import $ from 'jquery';

export const scroll = (() => {
  // Set Nav visiblity by scrolling
  let _lastScrollTop = 0;
  const setNavScroll = () => {
    const curScrollPositionY = window.pageYOffset | document.body.scrollTop;
    const nav = document.getElementById("nav");
    const navDomRect = nav.getBoundingClientRect();
    const navScroll = document.getElementById("nav-scroll");
    if ((navDomRect.height + navDomRect.top) < 0) {
      if (_lastScrollTop < curScrollPositionY) {
        navScroll.classList.remove("visible");
        navScroll.classList.add("invisible");
      }
      else {
        // scroll up
        navScroll.classList.remove("invisible");
        navScroll.classList.add("visible");
        // console.log("up");
      }
    }
    else {
      navScroll.classList.remove("visible");
      navScroll.classList.add("invisible");
    }
    _lastScrollTop = curScrollPositionY;
  };
  // Set sideTab active action by scrolling
  const setSideTab = () => {
    const triggerYPoint = Math.floor(screen.height / 2);
    const sections = [...document.getElementsByTagName("section")];
    sections.map((curSection) => {
      const { top, bottom } = curSection.getBoundingClientRect();
      if (triggerYPoint >= top && triggerYPoint <= bottom) {
        const navElements = [...document.getElementById("category-sidetap").children];
        navElements.map(curNav => {
          const href = curNav.getAttribute("href").split("#")[1];
          if (href === curSection.getAttribute("id")) {
            curNav.classList.add("active");
          }
          else {
            curNav.classList.remove("active");
          }
        });
      }
    });
  };
  const setSmoothScroll = () => {
    // TODO: change to vanilla JS
    $('a[href^="#"]').on('click', function (event) {
      const target = $(this.getAttribute('href'));
      if (target.length) {
        event.preventDefault();
        $('html, body').stop().animate({
          scrollTop: target.offset().top
        }, 1000);
      }
    });
  };

  document.addEventListener("DOMContentLoaded", () => {
    // Set UI by Scroll
    window.onscroll = () => {
      setNavScroll();
      setSideTab();
    };
    setSmoothScroll();
    console.log('scroll set completed');
  });

})();
