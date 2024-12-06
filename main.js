function toggleMenu() {
    const navbarLinks = document.querySelector('.navigation');
    const burger = document.querySelector('.burger');

    console.log('Toggling menu visibility');
    navbarLinks.classList.toggle('active');
    burger.classList.toggle('active');
}

function muathalaman(file) {
    const content = document.getElementById('content');

    fetch(file)
        .then(response => response.text())
        .then(data => {
            content.innerHTML = data;
            carousel();
        })
        .catch(error => {
            content.innerHTML = '<p>Halaman Gagal Di Muat</p>';
            console.error('Error:', error);
        });
}

function aturrute() {
    const hash = window.location.hash;

    if (hash === '#home') {
        muathalaman('home.html');
    } else if (hash === '#aboutme') {
        muathalaman('aboutme.html');
    } else {
        muathalaman('home.html');
    }
}

window.addEventListener('load', aturrute);
window.addEventListener('hashchange', aturrute);

function carousel() {
    const nextDom = document.getElementById('next');
    const prevDom = document.getElementById('prev');
    const carouselDom = document.querySelector('.carousel');
    const SliderDom = carouselDom?.querySelector('.carousel .list');
    const thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
    const thumbnailItemsDom = thumbnailBorderDom?.querySelectorAll('.item');
    const timeRunning = 2000;
    const timeAutoNext = 10000;

    if (!nextDom || !prevDom || !SliderDom || !thumbnailItemsDom) {
        console.warn('Carousel elements not found!');
        return;
    }

    let runTimeOut;
    let runNextAuto = setTimeout(() => {
        nextDom.click();
    }, timeAutoNext);

    nextDom.onclick = () => showSlider('next');
    prevDom.onclick = () => showSlider('prev');

    function showSlider(type) {
        const SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
        const thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');

        if (type === 'next') {
            SliderDom.appendChild(SliderItemsDom[0]);
            thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
            carouselDom.classList.add('next');
        } else {
            SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
            thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
            carouselDom.classList.add('prev');
        }

        clearTimeout(runTimeOut);
        runTimeOut = setTimeout(() => {
            carouselDom.classList.remove('next');
            carouselDom.classList.remove('prev');
        }, timeRunning);

        clearTimeout(runNextAuto);
        runNextAuto = setTimeout(() => {
            nextDom.click();
        }, timeAutoNext);
    }
}

