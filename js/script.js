function testWebP(callback) {
    var webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
}

testWebP(function (support) {
    if (support == true) {
        document.querySelector('body').classList.add('webp');
    }
});

headerDown();

function headerDown() {
    let header = document.querySelector('.header');
    if (document.body.offsetWidth < 1200) {
        let height = document.querySelector('.header__images').offsetHeight;
        let bottom;
        if (document.body.offsetWidth < 720) {
            bottom = 60;
        } else {
            bottom = 100;
        }
        header.style.marginBottom = height + bottom + 'px';
    } else {
        header.style.marginBottom = 100 + 'px';
    }
}

let programBtn = document.querySelectorAll('.program__btn');
let programHeight = 0;

if (document.body.offsetWidth >= 720) {
    programHeight = 800;
} else {
    programHeight = 400;
}

if (programBtn.length > 0) {
    programBtn.forEach((el) => {
        el.addEventListener('click', () => {
            el.closest('.program__sector').classList.toggle('active');
            let body = el.closest('.program__sector').querySelector('.program__body');
            if (body.scrollHeight > programHeight) {
                if (el.closest('.program__sector').classList.contains('active')) {
                    body.style.overflowY = 'scroll';
                } else {
                    body.style.overflowY = 'hidden';
                }
            }
        });
    });
}

infoDown();

function infoDown() {
    let info = document.querySelector('.info');
    if (document.body.offsetWidth < 1100) {
        let height = document.querySelector('.info__images').offsetHeight;
        let bottom;
        if (document.body.offsetWidth < 720) {
            bottom = 60;
        } else {
            bottom = 100;
        }
        info.style.marginBottom = height + bottom + 'px';
    } else {
        info.style.marginBottom = 100 + 'px';
    }
}

let registItem = document.querySelectorAll('.regist__item');
if (registItem.length > 0) {
    registItem.forEach((el) => {
        el.addEventListener('click', () => {
            registItem.forEach((item) => {
                if (item.classList.contains('active')) {
                    item.classList.remove('active');
                }
            });
            el.classList.add('active');
            let id = el.getAttribute('data-id');
            let contents = document.querySelectorAll('.regist-content');

            contents.forEach((item) => {
                if (item.getAttribute('data-content') != id) {
                    item.classList.remove('active');
                } else {
                    item.classList.add('active');
                }
            });
        });
    });
}

const animItems = document.querySelectorAll('.anim-item');

if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll);
    function animOnScroll() {
        for (let i = 0; i < animItems.length; i++) {
            const animItem = animItems[i];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 4;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }

            if (pageYOffset > animItemOffset - animItemPoint && pageYOffset < animItemOffset + animItemHeight) {
                animItem.classList.add('anim');
            } else {
                if (!animItem.classList.contains('anim-no-repeat')) {
                    animItem.classList.remove('anim');
                }
            }
        }
    }

    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
    }

    setTimeout(() => {
        animOnScroll();
    }, 300);
}

window.addEventListener('resize', () => {
    headerDown();
    infoDown();
});
