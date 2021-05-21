const dropdown_horti=document.getElementById('dropdown-horti'),
dropdown_viti=document.getElementById('dropdown-viti'),
dropdown_resource=document.getElementById('dropdown-resource'),
dropmenu=document.getElementById('dropmenu'),
product=document.getElementById('product'),
callback=document.getElementById('callback'),
news=document.getElementById('latest-news')

//HORTICULTURE DROPDOWN
dropdown_horti.addEventListener('click',()=>{
    var click= document.getElementById("dropdown1");
    if (click.style.display==="none"){
        click.style.display= "block";
    }

    else{
        click.style.display="none";
    }
})

//VITITICULTURE DROPDOWN
dropdown_viti.addEventListener('click',()=>{
    var click= document.getElementById("dropdown2");
    if (click.style.display==="none"){
        console.log('dabyo')
        click.style.display= "block";
    }

    else{
        click.style.display="none";
    }
})


//RESOURCES DROPDOWN
dropdown_resource.addEventListener('click',()=>{
    var click= document.getElementById("dropdown3");
    if (click.style.display==="none"){
        click.style.display= "block";
    }

    else{
        click.style.display="none";
    }
})

//PRODUCT DROPDOWN
product.addEventListener('click',()=>{
    var click= document.getElementById("dropdown4");
    if (click.style.display==="none"){
        console.log('dabyo')
        click.style.display= "block";
    }

    else{
        click.style.display="none";
    }
})
//CALLBACK DROPDOWN
callback.addEventListener('click',()=>{
    var click= document.getElementById("contact__callback-main");
    if (click.style.display==="none"){
        console.log('dabyo')
        click.style.display= "block";
    }

    else{
        click.style.display="none";
    }
})


//NEWS DROPDOWN
news.addEventListener('click',()=>{
    var click= document.getElementById("news__subscribe");
    if (click.style.display==="none"){
        console.log('dabyo')
        click.style.display= "block";
    }

    else{
        click.style.display="none";
    }
})


/*==== MENU SHOW WHEN HIDDEN ====*/
const navMenu=document.getElementById('nav-menu'),
toggleMenu=document.getElementById('nav-toggle'),
closeMenu=document.getElementById('nav-close')

//SHOW
toggleMenu.addEventListener('click',()=>{
navMenu.classList.toggle('show')
})

//HIDDEN
closeMenu.addEventListener('click',()=>{
    navMenu.classList.remove('show')
})







const responsive = {
    0: {
        items: 1
    },
    768: {
        items: 2
    },
    1240: {
        items: 3
    }
}


$(document).ready(function () {

    $nav = $('.nav');
    $toggleCollapse = $('.toggle-collapse');

    /** click event on toggle menu */
    $toggleCollapse.click(function () {
        $nav.toggleClass('collapse');
    })

    // owl-crousel for slider horticulture ,viticulture
    $('.owl-carousel').owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 3000,
        responsive: responsive,
        nav:true,
        dots:false,
        navText: [('.horticulture__owl-navigation .owl-nav-prev'), $('.horticulture__owl-navigation .owl-nav-next')],
       
    });
   



    // click to scroll top
    $('.move-up span').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 1000);
    })

    // AOS Instance
    AOS.init();

});