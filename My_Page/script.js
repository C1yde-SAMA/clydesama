document.addEventListener("DOMContentLoaded", function() {
    changeLanguage('en'); // 默认设置为英语
});

function changeLanguage(language) {
    const elements = document.querySelectorAll('[data-en]');

    elements.forEach(element => {
        // 检查元素是否包含 HTML 标记
        if (element.tagName === 'P' || element.tagName === 'DIV' || element.tagName === 'SPAN') {
            element.innerHTML = element.getAttribute(`data-${language}`);
        } else {
            element.textContent = element.getAttribute(`data-${language}`);
        }
    });
}

function navigateTo(pageId) {
    const pages = document.querySelectorAll('.page');

    // 隐藏所有页面
    pages.forEach(page => {
        page.classList.remove('active', 'fade-in', 'fade-out');
        page.style.display = 'none';
    });

    // 显示目标页面并添加动画
    const targetPage = document.getElementById(pageId);
    targetPage.style.display = 'block';
    setTimeout(() => {
        targetPage.classList.add('active');
        targetPage.classList.add('fade-in');
    }, 10);
}



