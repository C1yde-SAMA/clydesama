document.addEventListener("DOMContentLoaded", function() {
    changeLanguage('en'); // 默认设置为英语

    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');

    // 检查元素是否存在
    if (loadingScreen && mainContent) {

        // 监听动画结束事件
        loadingScreen.addEventListener('animationend', () => {
            // 将 loading-screen 的透明度逐渐变为 0，实现淡出效果
            loadingScreen.style.transition = 'opacity 0.5s ease-in-out';
            loadingScreen.style.opacity = '0';  // 淡出加载屏幕

            // 在淡出动画结束后，隐藏加载屏幕并显示主内容
            setTimeout(() => {
                loadingScreen.classList.add('hidden');  // 隐藏加载屏幕
                mainContent.style.opacity = '1'; // 显示主页面内容
            }, 500);  // 使用与过渡时间相同的 0.5s
        });

    } else {
        console.error('Loading screen or main content element not found.');
    }
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



