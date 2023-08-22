/**
* Template Name: Nova
* Updated: Jul 27 2023 with Bootstrap v5.3.1
* Template URL: https://bootstrapmade.com/nova-bootstrap-business-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
document.addEventListener('DOMContentLoaded', () => {
  "use strict";

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Sticky header on scroll
   */
  const selectHeader = document.querySelector('#header');
  if (selectHeader) {
    document.addEventListener('scroll', () => {
      window.scrollY > 100 ? selectHeader.classList.add('sticked') : selectHeader.classList.remove('sticked');
    });
  }

  /**
   * Mobile nav toggle
   */
  const mobileNavShow = document.querySelector('.mobile-nav-show');
  const mobileNavHide = document.querySelector('.mobile-nav-hide');

  document.querySelectorAll('.mobile-nav-toggle').forEach(el => {
    el.addEventListener('click', function(event) {
      event.preventDefault();
      mobileNavToogle();
    })
  });

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavShow.classList.toggle('d-none');
    mobileNavHide.classList.toggle('d-none');
  }

  /**
   * Toggle mobile nav dropdowns
   */
  const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');

  navDropdowns.forEach(el => {
    el.addEventListener('click', function(event) {
      if (document.querySelector('.mobile-nav-active')) {
        event.preventDefault();
        this.classList.toggle('active');
        this.nextElementSibling.classList.toggle('dropdown-active');

        let dropDownIndicator = this.querySelector('.dropdown-indicator');
        dropDownIndicator.classList.toggle('bi-chevron-up');
        dropDownIndicator.classList.toggle('bi-chevron-down');
      }
    })
  });

  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    const togglescrollTop = function() {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
    window.addEventListener('load', togglescrollTop);
    document.addEventListener('scroll', togglescrollTop);
    scrollTop.addEventListener('click', window.scrollTo({
      top: 0,
      behavior: 'smooth'
    }));
  }

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init swiper slider with 1 slide at once in desktop view
   */
  new Swiper('.slides-1', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });

  /**
   * Init swiper slider with 3 slides at once in desktop view
   */
  new Swiper('.slides-3', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 40
      },

      1200: {
        slidesPerView: 3,
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  let portfolionIsotope = document.querySelector('.portfolio-isotope');

  if (portfolionIsotope) {

    let portfolioFilter = portfolionIsotope.getAttribute('data-portfolio-filter') ? portfolionIsotope.getAttribute('data-portfolio-filter') : '*';
    let portfolioLayout = portfolionIsotope.getAttribute('data-portfolio-layout') ? portfolionIsotope.getAttribute('data-portfolio-layout') : 'masonry';
    let portfolioSort = portfolionIsotope.getAttribute('data-portfolio-sort') ? portfolionIsotope.getAttribute('data-portfolio-sort') : 'original-order';

    window.addEventListener('load', () => {
      let portfolioIsotope = new Isotope(document.querySelector('.portfolio-container'), {
        itemSelector: '.portfolio-item',
        layoutMode: portfolioLayout,
        filter: portfolioFilter,
        sortBy: portfolioSort
      });

      let menuFilters = document.querySelectorAll('.portfolio-isotope .portfolio-flters li');
      menuFilters.forEach(function(el) {
        el.addEventListener('click', function() {
          document.querySelector('.portfolio-isotope .portfolio-flters .filter-active').classList.remove('filter-active');
          this.classList.add('filter-active');
          portfolioIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          if (typeof aos_init === 'function') {
            aos_init();
          }
        }, false);
      });

    });

  }

  /**
   * Animation on scroll function and init
   */
  function aos_init() {
    AOS.init({
      duration: 800,
      easing: 'slide',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', () => {
    aos_init();
  });

});

/* Leaflet map */

var map = L.map('map').setView([-28, 133], 5);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

var marker = L.marker([-31.905, 115.815]).addTo(map)
.bindPopup("<img style='width:298px; height:170px' src='/img/leaflet-2.jpg';>"+
"<p><b>Premium Glass Pool Fencing</b><br><br><i class='bi bi-geo-alt'>&nbsp;&nbsp;57 Guthrie St, Osborne Park WA 6017,"+
" Ausztrália</i><br><br><i class='bi bi-globe-asia-australia'>&nbsp;&nbsp;<a href='https://premiumglasspoolfencing.com.au/'>"+
"https://premiumglasspoolfencing.com.au/</a></i><br><br><i class='bi bi-telephone-fill'>&nbsp;&nbsp;+61864540272</i>");


var marker = L.marker([-27.4773, 153.006]).addTo(map)
.bindPopup("<img style='width:286px; height:170px' src='/img/leaflet-1.jpg';>"+
"<p><b>Ambience Glass</b><br><br><i class='bi bi-geo-alt'>&nbsp;&nbsp;111 Jane St, West End QLD 4101,"+
" Ausztrália</i><br><br><i class='bi bi-globe-asia-australia'>&nbsp;&nbsp;<a href='http://www.ambienceglass.com.au/'>"+
"http://www.ambienceglass.com.au/</a></i><br><br><i class='bi bi-telephone-fill'>&nbsp;&nbsp;+61400814141</i>");


var marker = L.marker([-33.67, 150.855]).addTo(map).bindPopup("<img style='width:298px; height:170px' src='/img/leaflet-3.jpg';>"+
"<p><b>Glass & Fencing Warehouse</b><br><br><i class='bi bi-geo-alt'>&nbsp;&nbsp;Unit A11, Riverstone Business Park, 81 "+
" Riverstone Parade, Riverstone NSW 2765, Ausztrália</i><br><br><i class='bi bi-globe-asia-australia'>&nbsp;&nbsp;<a href="+
"'https://glassandfencingwarehouse.com.au/?utm_source=local&utm_medium=organic&utm_campaign=gmb'>https://glassandfencingwarehouse."+
"com.au/?utm_source=local&utm_medium=organic&utm_ca...</a></i><br><br><i class='bi bi-telephone-fill'>&nbsp;&nbsp;+61296279500</i>");


var marker = L.marker([-37.9257, 145.0044]).addTo(map).bindPopup("<img style='width:286px; height:170px' src='/img/leaflet-4.jpg';>"+
"<p><b>Frameless Fences</b><br><br><i class='bi bi-geo-alt'>&nbsp;&nbsp;669 Hampton St, Brighton VIC 3186,"+
" Ausztrália</i><br><br><i class='bi bi-globe-asia-australia'>&nbsp;&nbsp;<a href=''>"+
"not found</a></i><br><br><i class='bi bi-telephone-fill'>&nbsp;&nbsp;+61412337771</i>");

