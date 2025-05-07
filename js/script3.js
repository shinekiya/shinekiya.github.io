// 拖动红色方块
const dragBox = document.getElementById("dragBox");
let offsetX, offsetY, isDragging = false;

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