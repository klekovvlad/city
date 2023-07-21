//Header

const header = document.querySelector('.header-nav');
const headerSection = document.querySelector('.header');

const HeaderScroll = (scroll) => {
    if(scroll > window.innerHeight * 0.8) {
        header.classList.add('header-nav__fixed');
        headerSection.style.paddingTop = `${header.offsetHeight}px`
    }else {
        header.classList.remove('header-nav__fixed')
        headerSection.style.paddingTop = `0px`
    }
}

const AnimationItems = (scroll) => {
    const animationItems = document.querySelectorAll('.animation');

    let centerSize = scroll + (window.innerHeight * 0.9)
    animationItems.forEach(item => {

        if(centerSize >= item.getBoundingClientRect().top + document.documentElement.scrollTop) {
            item.style.opacity = '1';
            item.style.transform = `translate(0px, 0px)`
        }
    })
}

AnimationItems(0)
window.onscroll = () => {
    AnimationItems(window.scrollY)
    HeaderScroll(window.scrollY)
}

//Places slider

const placesSlider = document.querySelector('.places-slider');

if(placesSlider) {
    const placesSliderSwiper = new Swiper(placesSlider, {
        slidesPerView: 3,
        spaceBetween: 30,
        slidesPerGroup: 3,
        speed: 500,
        navigation: {
            nextEl: '.slider-next',
            prevEl: '.slider-prev',
        },
        pagination: {
            el: '.pagination',
            type: 'bullets',
            clickable: true
        },
        breakpoints: {
            0: {
                slidesPerView: 1.1,
                spaceBetween: 20,
                slidesPerGroup: 1,
            },
            769: {
                slidesPerView: 3,
                spaceBetween: 30,
                slidesPerGroup: 3,
            }
        }
    })
}

const craftsSlider = document.querySelector('.crafts-slider')

if(craftsSlider) {
    const craftsSliderSwiper = new Swiper(craftsSlider, {
        slidesPerView: 1,
        spaceBetween: 30,
        speed: 500,
        navigation: {
            nextEl: '.slider-next',
            prevEl: '.slider-prev',
        },
        pagination: {
            el: '.pagination',
            type: 'bullets',
            clickable: true
        },
        breakpoints: {
            0: {
                slidesPerView: 1.1,
                spaceBetween: 20,
            },
            769: {
                slidesPerView: 1,
                spaceBetween: 30,
            }
        }
    })
}

const navSliders = document.querySelectorAll('.nav-slider')

if(navSliders.length > 0) {
    navSliders.forEach(navSlider => {
        const navSliderSwiper = new Swiper(navSlider, {
            slidesPerView: 3,
            spaceBetween: 40,
            speed: 500,
            breakpoints: {
                0: {
                    slidesPerView: 1.1,
                    spaceBetween: 20,
                },
                769: {
                    slidesPerView: 3,
                    spaceBetween: 40,
                }
            }
        })
    })
}

//Navs 
const navButtons = document.querySelectorAll('.nav-buttons');
const navContents = document.querySelectorAll('.nav-contents');

if(navButtons.length > 0) {
    navButtons.forEach((navButton, index) => {
        const buttons = [...navButton.children];
        const contents = [...navContents[index].children];
        const active = document.createElement('div');
        active.classList.add('nav-buttons-active');
        navButton.append(active)
        
        if(window.innerWidth > 768) {
            active.style.width = `${buttons[0].offsetWidth + 40}px`
        }

        for(let i = 0; i < contents.length; i++) {
            if(i == 0) {
                contents[0].classList.contains('hotels-wrapper') ? contents[0].style.display = 'grid' : contents[0].style.display = 'block'
            }else {
                contents[i].style.display = 'none'
            }
        }

        buttons.forEach((button, index) => {
            button.onclick = () => {
                if(!button.classList.contains('active')) {
                    for(let i = 0; i < buttons.length; i++) {
                        if(i !== index) {
                            buttons[i].classList.remove('active');
                            contents[i].classList.remove('active');
                            contents[i].style.display = 'none';
                        }
                    }
                    button.classList.add('active')

                    if(window.innerWidth > 768) {
                        active.style.width = `${button.offsetWidth + 40}px`
                        active.style.left = `${button.offsetLeft - 20}px`
                    }

                    contents[index].classList.contains('hotels-wrapper') ? contents[index].style.display = 'grid' : contents[index].style.display = 'block'
                    setTimeout(() => {
                        contents[index].classList.add('active');
                    }, 100)
                }else if(window.innerWidth <= 768) {
                    navButton.classList.contains('active') ? navButton.classList.remove('active') : navButton.classList.add('active')
                }
            }
        })
    })
}

//POPUP

const popup = document.querySelector('.popup');

if(popup) {
    const buttons = document.querySelectorAll('.popup-open');

    if(buttons.length > 0) {
        buttons.forEach(button => {
            button.onclick = () => {
                if(popup.classList.contains('active')) {
                    popup.classList.remove('acitve')
                    popup.onclick = ''
                }else{
                    popup.classList.add('active')
                    popup.onclick = (e) => {
                        if(e.target.classList.contains('popup') || e.target.classList.contains('popup-close')) {
                            popup.classList.remove('active')
                            popup.onclick = ''
                        }
                    }
                }
            }
        })
    }
}

lightGallery(document.querySelector('.photos-wrapper'), {
    thumbnail: true,
});

//Mobile Content Show

if(window.innerWidth < 768) {
    const buttons = document.querySelectorAll('.mobile-show');

    if(buttons.length > 0) {
        buttons.forEach(button => {
            let parent = null
            if(!button.dataset.target) {
                parent = button.parentElement;
            }else{
                parent = document.querySelector(`.${button.dataset.target}`) 
            }

            let elements = [...parent.children];

            button.onclick = () => {
                elements.forEach(el => {
                    if(el !== button) {
                        if(el.classList.contains('show')) {

                            if(parent.classList.contains('hotels-wrapper')) {
                                button.textContent = 'Показать еще места'
                            }else if(parent.classList.contains('photos-wrapper')) {
                                button.textContent = 'Смотреть еще фото'
                            }

                            el.classList.remove('show')
                        }else{

                            if(parent.classList.contains('hotels-wrapper')) {
                                button.textContent = 'Скрыть места'
                            }else if(parent.classList.contains('photos-wrapper')) {
                                button.textContent = 'Скрыть фото'
                            }

                            el.classList.add('show')
                        }
                    }
                })
            }
        })
    }
}

//MenuMobile

if(window.innerWidth <= 768) {
    const nav = document.querySelector('.header-nav')
    const links = document.querySelectorAll('.header-nav-link');
    const mobNav = document.createElement('div');
    const body = document.querySelector('html')
    mobNav.classList.add('header-nav-mob');
    nav.append(mobNav)
    links.forEach(link => {
        let copy = link.innerHTML;
        mobNav.insertAdjacentHTML('afterBegin', copy)
        link.parentNode.removeChild(link)
    })

    const button = document.querySelector('.header-mob');
    

    button.onclick = () => {
        if(mobNav.classList.contains('active')) {
            
            button.classList.remove('active')
            mobNav.classList.remove('active')
            body.style.overflow = 'auto'
        }else {
            button.classList.add('active')
            mobNav.classList.add('active')
            body.style.overflow = 'hidden'
        }
    }

    const navLinks = [...mobNav.children]
    navLinks.forEach(link => {
        link.onclick = () => {
            button.classList.remove('active')
            mobNav.classList.remove('active')
            body.style.overflow = 'auto'
        }
    })
}

