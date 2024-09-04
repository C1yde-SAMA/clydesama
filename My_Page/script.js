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



const correctPassword = "clydesama"; // 设置删除留言所需的密码

document.addEventListener("DOMContentLoaded", function() {
    loadMessages(); // 页面加载时读取留言
});

document.getElementById("messageForm").addEventListener("submit", function(event) {
    event.preventDefault(); // 防止表单提交

    // 获取表单数据
    const name = document.getElementById("msgName").value.trim();
    const message = document.getElementById("msgContent").value.trim();

    // 创建新留言对象
    const newMessage = {
        id: Date.now(), // 使用时间戳作为唯一ID
        name: name,
        content: message
    };

    // 保存留言到 LocalStorage
    saveMessage(newMessage);

    // 更新页面显示
    addMessageToDOM(newMessage);

    // 清空表单
    document.getElementById("messageForm").reset();
});

function saveMessage(message) {
    // 使用 fetch API 将留言发送到后端
    fetch('/api/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message) // 将留言转化为 JSON 发送
    })
    .then(response => response.json())
    .then(data => {
        console.log('Message saved:', data);
        // 处理保存成功后的操作
    })
    .catch(error => {
        console.error('Error saving message:', error);
    });
}


function loadMessages() {
    // 从后端获取留言列表
    fetch('/api/messages')
    .then(response => response.json())
    .then(messages => {
        messages.forEach(addMessageToDOM); // 将所有留言添加到页面中
    })
    .catch(error => {
        console.error('Error loading messages:', error);
    });
}


function addMessageToDOM(message) {
    const messageItem = document.createElement("li");
    messageItem.setAttribute("data-id", message.id); // 将ID保存为数据属性

    const nameElement = document.createElement("span");
    nameElement.classList.add("message-name");
    nameElement.textContent = message.name;

    const messageContentElement = document.createElement("p");
    messageContentElement.classList.add("message-content");
    messageContentElement.textContent = message.content;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.classList.add("delete-button");

    // 删除按钮点击事件
    deleteButton.addEventListener("click", function() {
        const enteredPassword = prompt("Enter the password to delete this message:");
        if (enteredPassword === correctPassword) {
            deleteMessage(message.id);
            messageItem.remove(); // 从DOM中删除元素
        } else {
            alert("Incorrect password.");
        }
    });

    // 将各元素添加到留言项中
    messageItem.appendChild(nameElement);
    messageItem.appendChild(messageContentElement);
    messageItem.appendChild(deleteButton);

    // 将留言项添加到留言列表
    document.getElementById("messagesList").appendChild(messageItem);
}

function deleteMessage(id) {
    // 调用后端 API 删除留言
    fetch(`/api/messages/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        console.log('Message deleted:', data);
        // 处理删除成功后的操作
    })
    .catch(error => {
        console.error('Error deleting message:', error);
    });
}


