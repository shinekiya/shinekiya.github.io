function loadContent(page){
  document.getElementById("contentFrame").src = page;
}

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