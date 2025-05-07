function loadContent(page){
  document.getElementById("contentFrame").src = page;
}





// 图片预览
const overlay = document.getElementById('overlay');
const bigImage = document.getElementById('bigImage');
let scale = 1; // 初始缩放比例
let isDragging = false;
let startX = 0, startY = 0;
let currentX = 0, currentY = 0;

// 防止图片被选中
bigImage.style.userSelect = "none";

// 显示大图
function showImage(src) {
  bigImage.src = src;
  scale = 1;
  currentX = 0;
  currentY = 0;
  updateTransform();
  overlay.style.display = 'flex';
}

// 点击背景关闭
overlay.onclick = function(event) {
  if (event.target === overlay) {
      overlay.style.display = 'none';
  }
};

// 拖拽开始
bigImage.addEventListener('mousedown', function(e) {
  if (e.button !== 0) return; // 只响应鼠标左键
  e.preventDefault();
  isDragging = true;
  startX = e.clientX - currentX;
  startY = e.clientY - currentY;
  bigImage.style.cursor = 'grabbing';
});

// 拖拽中
document.addEventListener('mousemove', function(e) {
  if (!isDragging) return;
  currentX = e.clientX - startX;
  currentY = e.clientY - startY;
  updateTransform();
});

// 拖拽结束
document.addEventListener('mouseup', function() {
  isDragging = false;
  bigImage.style.cursor = 'default';
});

// 滚轮缩放
bigImage.addEventListener('wheel', function(e) {
  e.preventDefault();

  const prevScale = scale;
  const scaleAmount = 0.1;
  if (e.deltaY < 0) {
      scale += scaleAmount;
  } else {
      scale = Math.max(0.1, scale - scaleAmount);
  }

  // 缩放时调整位置，防止图片跳回去
  const rect = bigImage.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  const dx = mouseX - rect.width / 2;
  const dy = mouseY - rect.height / 2;

  currentX -= dx * (scale - prevScale) / prevScale;
  currentY -= dy * (scale - prevScale) / prevScale;

  updateTransform();
});

// 统一更新transform
function updateTransform() {
  bigImage.style.transform = `translate(${currentX}px, ${currentY}px) scale(${scale})`;
}





// 成绩评价
function evaluateScore() {
  const score = parseInt(document.getElementById("scoreInput").value);
  let result = "";

  if(score < 0 || score > 100) {
    result = "请输入0-100之间的数字";
  } else if (score >= 90 && score <= 100) {
    result = "优秀";
  } else if (score >= 80) {
    result = "良好";
  } else if (score >= 70) {
    result = "中等";
  } else if (score >= 60) {
    result = "及格";
  } else {
    result = "不及格";
  }

  document.getElementById("scoreResult").innerText = `评价：${result}`;
}

// 邮箱格式验证
function validateEmail() {
  const email = document.getElementById("emailInput").value;
  const atIndex = email.indexOf("@");
  const dotIndex = email.lastIndexOf(".");

  const valid = (
    atIndex > 0 &&
    dotIndex > atIndex + 1 &&
    dotIndex < email.length - 1
  );

  document.getElementById("emailResult").innerText = valid
    ? "邮箱格式合法"
    : "邮箱格式不合法";
}

// 打印九九乘法表
function printTable() {
  let result = "";
  for (let i = 1; i <= 9; i++) {
    for (let j = 1; j <= i; j++) {
      result += `${j}x${i}=${i * j}\t`;
    }
    result += "\n";
  }
  document.getElementById("tableOutput").innerText = result;
}





// 拖动红色方块
const dragBox = document.getElementById("dragBox");
let offsetX, offsetY= false;
isDragging = false;

dragBox.addEventListener("mousedown", function (e) {
  isDragging = true;
  offsetX = e.clientX - dragBox.offsetLeft;
  offsetY = e.clientY - dragBox.offsetTop;
});

document.addEventListener("mousemove", function (e) {
  if (isDragging) {
    dragBox.style.left = (e.clientX - offsetX) + "px";
    dragBox.style.top = (e.clientY - offsetY) + "px";
  }
});

document.addEventListener("mouseup", function () {
  isDragging = false;
});

// 加载 books.xml 并展示为表格
function loadBooks() {
  fetch("books.xml")
    .then(response => response.text())
    .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
    .then(data => {
      const books = data.getElementsByTagName("book");
      const table = document.getElementById("bookTable");
      table.innerHTML = "<tr><th>书名</th><th>作者</th><th>价格</th></tr>";

      const select = document.getElementById("bookSelect");
      select.innerHTML = '<option value="">请选择一本书</option>';

      for (let i = 0; i < books.length; i++) {
        const title = books[i].getElementsByTagName("title")[0].textContent;
        const author = books[i].getElementsByTagName("author")[0].textContent;
        const price = books[i].getElementsByTagName("price")[0].textContent;

        table.innerHTML += `<tr><td>${title}</td><td>${author}</td><td>${price}</td></tr>`;
        select.innerHTML += `<option value="${i}">${title}</option>`;
      }

      // 保存数据到全局变量
      window.bookData = books;
    });
}

// 展示选择的书籍信息
function showSelectedBook(index) {
  const info = document.getElementById("bookInfo");
  if (index === "") {
    info.textContent = "";
    return;
  }

  const book = window.bookData[index];
  const title = book.getElementsByTagName("title")[0].textContent;
  const author = book.getElementsByTagName("author")[0].textContent;
  const price = book.getElementsByTagName("price")[0].textContent;

  info.textContent = `标题：${title}，作者：${author}，价格：${price}`;
}