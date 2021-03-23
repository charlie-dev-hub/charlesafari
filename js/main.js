(function(){

    "use strict";

    /* ..............................................
    Polyfill For Support Js Code in IE 11
    ................................................. */
    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
    }

    if (!Element.prototype.closest) {
        Element.prototype.closest = function(s) {
          var el = this;
      
          do {
            if (Element.prototype.matches.call(el, s)) return el;
            el = el.parentElement || el.parentNode;
          } while (el !== null && el.nodeType === 1);
          return null;
        };
    }

    /* ..............................................
    Sticky header
    ................................................. */
    window.addEventListener('scroll',function(){
        const header=document.querySelector('header.site_header') 
        let scrollValue=window.scrollY || document.documentElement.scrollTop  
        header.classList.toggle("sticky", scrollValue > 0)
    })


    /* ..............................................
    Show Menu Bars (Mobile)
    ................................................. */
    let menuMobile=document.querySelector('.nav-menu')
    menuMobile.addEventListener('click',function(e){ 
      
        let sidebar=document.querySelector('.main_navigation')
        this.classList.toggle('toggle')
        sidebar.classList.toggle("open")
    })

    /* ..............................................
    Show Menu Bars (Mobile)
    ................................................. */
    const slides=document.querySelector(".slider").children
    const indicatorImages=document.querySelector(".slider-indicator").children
    for(let i=0;i<indicatorImages.length;i++){
        indicatorImages[i].addEventListener('click',function(e){
            removeClass(indicatorImages,'active')
            e.target.classList.add('active')
            removeClass(slides,'active')
            let id=e.target.dataset.id
            slides[id].classList.add("active");
        })
    }
     /* ..............................................
    Loader
    ................................................. */
    setTimeout(function(){
      document.querySelector('.loader').style.display="none"
    },800)


    /* ..............................................
    change active class in menu navigation and filter buttons
    ................................................. */
    const navLinks=document.querySelectorAll('.main_navigation .nav_link')
    const workBtns=document.querySelectorAll('.work_btn')
    changeClass(navLinks,'active')
    changeClass(workBtns,'active')

    /* ..............................................
    lightbox image
    ................................................. */
    const worksTargets=document.querySelectorAll('.work_item')
    const lightbox=document.querySelector('.lightbox')
    const lightBoxItem=lightbox.querySelector('.lightbox_item')
    const lightBoxImg=lightbox.querySelector('.lightbox_img img')
    const lightboxCloseBtn=lightbox.querySelector('.close_btn')
    const lightboxNumber=lightbox.querySelector('.num_work')
    const prevBtn=document.querySelector('.lightbox_controls .prev')
    const nextBtn=document.querySelector('.lightbox_controls .next')
    let itemIndex=0
    
    
    for(let i=0;i<worksTargets.length;i++){
        worksTargets[i].addEventListener('click',function(e){
            let el=e.target.matches('.work_img *')
            if(el){
                itemIndex=i 
                changeItem(itemIndex)
                showLightbox() 
            }
            lightboxCloseBtn.addEventListener('click',hideLightbox)
            lightBoxItem.addEventListener('click',nextItem)
        })
    }

    prevBtn.addEventListener('click',prevItem)
    nextBtn.addEventListener('click',nextItem)
    lightbox.addEventListener('click',function(e){
        if(!e.target.matches('.ctr_btn *')  && 
        !e.target.closest('.lightbox_img') && 
        !e.target.classList.contains('lightboxCloseBtn')){
            hideLightbox()
        }
    })
    
    function changeItem(index){ 
        let imgSrc=worksTargets[index].querySelector('.work_img img').src  
        lightBoxImg.setAttribute('src',imgSrc) 
        lightboxNumber.innerText=index+1+"/"+worksTargets.length
    }
    function showLightbox(){ 
        lightbox.classList.add('show')
    }
    function hideLightbox(){ 
        lightbox.classList.remove('show')
        lightbox.style.animation="showDown .1s cubic-bezier(0.95, 0.05, 0.795, 0.035);"
    }
    
    function nextItem(){
        itemIndex++
        if(itemIndex >= worksTargets.length){
            itemIndex=0
        }
        changeItem(itemIndex)
    }
    function prevItem(){
        itemIndex--
        if(itemIndex < 0){
            itemIndex=worksTargets.length - 1
        }
        changeItem(itemIndex)
    }

    /* ..............................................
    filter images portfolio
    ................................................. */
    let buttonsPortfolio=document.querySelectorAll('.works_buttons button')
    for(let i=0;i<buttonsPortfolio.length;i++){
        buttonsPortfolio[i].addEventListener('click',function(e){
            let value=e.target.dataset.filter
 
            for(let j=0;j<worksTargets.length;j++){
                if(worksTargets[j].dataset.target===value){
                    worksTargets[j].classList.remove('hide')
                    worksTargets[j].classList.add('show')
                }else{
                    worksTargets[j].classList.remove('show')
                    worksTargets[j].classList.add('hide')
                }
    
                if(value==='all'){ 
                    worksTargets[j].classList.add('show')
                }
            }
        
        })
    }
 

    /* ..............................................
    Typed Js
    ................................................. */
    const typedTextSpan = document.querySelector(".typed-text");
    const cursorSpan = document.querySelector(".cursor");
    const textArray = ["Web Developer", "Graphic Designer", "Photographer", "Marine/Mechanical Engineer","Writer"];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000; // Delay between current and next text
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() { 
      if (charIndex < textArray[textArrayIndex].length) {
       
        if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
      } 
      else {
        cursorSpan.classList.remove("typing");
        setTimeout(erase, newTextDelay);
      }
    }

    function erase() {
      if (charIndex > 0) {
        if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
        charIndex--;
        setTimeout(erase, erasingDelay);
      } 
      else {
        cursorSpan.classList.remove("typing");
        textArrayIndex++;
        if(textArrayIndex>=textArray.length) textArrayIndex=0;
        setTimeout(type, typingDelay + 100);
      }
    }

    setTimeout(type,2000)

     /* ..............................................
    change link active on scroll
    ................................................. */
    const links = document.querySelectorAll('.main_navigation .nav_link');
    const sections = document.querySelectorAll('.section');

    function changeLinkState() {
      let index = sections.length;

      while(--index && window.scrollY + 50 < sections[index].offsetTop) {}
      
      removeClass(links,'active')
      links[index].classList.add('active');
    }
    window.addEventListener('scroll', changeLinkState);


    /* ..............................................
    Display Single Blog
    ................................................. */
    let blogItem=document.querySelectorAll('.blog_item')
    const singleBlog=document.querySelector('.single_blog')
    const closeBtn=document.querySelector('.single_blog .close_btn')
    const bodyEl=document.querySelector('body') 
    closeBtn.addEventListener('click',function(e){
        e.preventDefault()
        singleBlog.classList.add('hidden')
        bodyEl.style.overflow="initial"
    })
    for(let i=0;i<blogItem.length;i++){
        let blog=blogItem[i]
        blog.addEventListener('click',function(e){
            e.preventDefault()
            if(e.target.closest('.blog_img') || e.target.closest('.blog_info h3')){
                
                singleBlog.classList.remove('hidden') 
                bodyEl.style.overflow="hidden"
            }
        })
    }

     /* ..............................................
    Helper Functions
    ................................................. */
     function removeClass(lists,cls){
        for(let i=0;i<lists.length;i++){
            lists[i].classList.remove(cls)
        } 
    }
  
      
    function changeClass(items,cls){
        for(let i=0;i<items.length;i++){
          items[i].addEventListener('click',function(e){
            removeClass(items,cls) 
            e.target.classList.add(cls)
          })
        }
           
      }
  


})();