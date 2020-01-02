var mySwiper = new Swiper('.swiper-container', {
    autoplay: {
        delay: 3000,//1秒切换一次
        disableOnInteraction: false,
    },
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    }
});