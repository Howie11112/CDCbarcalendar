// 这个脚本用于生成占位图片
// 由于无法直接上传图片，这个脚本将创建一个简单的HTML文件，您可以用它来生成占位图片

const fs = require('fs');
const path = require('path');

// 创建占位图片HTML文件
const placeholderHtml = `
<!DOCTYPE html>
<html>
<head>
  <title>Placeholder Images</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
    }
    .image-container {
      margin-bottom: 30px;
      text-align: center;
    }
    canvas {
      border: 1px solid #ccc;
      margin-bottom: 10px;
    }
    button {
      padding: 10px 20px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin: 5px;
    }
    button:hover {
      background-color: #45a049;
    }
  </style>
</head>
<body>
  <h1>Placeholder Image Generator</h1>
  <p>Click the buttons below to generate placeholder images for your events.</p>
  
  <div class="image-container">
    <h2>Jazz Night</h2>
    <canvas id="jazz-night" width="800" height="600"></canvas>
    <button onclick="generateImage('jazz-night', 'Jazz Night', '#2c3e50')">Generate</button>
    <button onclick="downloadImage('jazz-night', 'jazz-night.jpg')">Download</button>
  </div>
  
  <div class="image-container">
    <h2>Electronic Festival</h2>
    <canvas id="electronic-festival" width="800" height="600"></canvas>
    <button onclick="generateImage('electronic-festival', 'Electronic Festival', '#8e44ad')">Generate</button>
    <button onclick="downloadImage('electronic-festival', 'electronic-festival.jpg')">Download</button>
  </div>
  
  <div class="image-container">
    <h2>Craft Beer</h2>
    <canvas id="craft-beer" width="800" height="600"></canvas>
    <button onclick="generateImage('craft-beer', 'Craft Beer', '#d35400')">Generate</button>
    <button onclick="downloadImage('craft-beer', 'craft-beer.jpg')">Download</button>
  </div>
  
  <script>
    function generateImage(canvasId, text, color) {
      const canvas = document.getElementById(canvasId);
      const ctx = canvas.getContext('2d');
      
      // 清除画布
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // 填充背景色
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // 添加文字
      ctx.fillStyle = 'white';
      ctx.font = 'bold 48px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, canvas.width / 2, canvas.height / 2);
      
      // 添加装饰元素
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 2;
      
      // 绘制圆形
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, 150, 0, Math.PI * 2);
      ctx.stroke();
      
      // 绘制线条
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const x1 = canvas.width / 2 + Math.cos(angle) * 150;
        const y1 = canvas.height / 2 + Math.sin(angle) * 150;
        const x2 = canvas.width / 2 + Math.cos(angle) * 200;
        const y2 = canvas.height / 2 + Math.sin(angle) * 200;
        
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
    }
    
    function downloadImage(canvasId, filename) {
      const canvas = document.getElementById(canvasId);
      const link = document.createElement('a');
      link.download = filename;
      link.href = canvas.toDataURL('image/jpeg', 0.8);
      link.click();
    }
    
    // 页面加载时生成所有图片
    window.onload = function() {
      generateImage('jazz-night', 'Jazz Night', '#2c3e50');
      generateImage('electronic-festival', 'Electronic Festival', '#8e44ad');
      generateImage('craft-beer', 'Craft Beer', '#d35400');
    };
  </script>
</body>
</html>
`;

// 写入HTML文件
fs.writeFileSync(path.join(__dirname, 'placeholder-generator.html'), placeholderHtml);

console.log('Placeholder image generator HTML file created at:');
console.log(path.join(__dirname, 'placeholder-generator.html'));
console.log('\nOpen this file in a browser to generate and download placeholder images.'); 