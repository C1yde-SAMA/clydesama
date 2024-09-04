document.addEventListener("DOMContentLoaded", function() {
    changeLanguage('en'); // 默认设置为英语
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');

    // 手写动画结束后，隐藏 loading-screen，显示主页内容
    loadingScreen.addEventListener('animationend', () => {
        loadingScreen.style.transition = 'opacity 0.5s ease-in-out';
        loadingScreen.style.opacity = '0';  // 淡出加载屏幕

        // 等待加载屏幕淡出后再显示主页内容
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            mainContent.style.opacity = '1'; // 淡入主页面
        }, 0);  // 0.5s 的过渡时间
    });
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



