fetch("products.json")
  .then(res => res.json())
  .then(data => renderProducts(data))
  .catch(err => console.error("حدث خطأ في تحميل المنتجات:", err));

function renderProducts(products) {
  const container = document.getElementById("products");
  container.innerHTML = "";

  products.forEach((p, index) => {
    // إذا كانت الصور غير موجودة نعرض صورة افتراضية
    const images = p.images.map(img => {
      // تأكد أن المسار يبدأ من المجلد الحالي
      if (!img.startsWith('images/')) {
        return 'images/' + img;
      }
      return img;
    });

    const mainImg = images[0] || 'images/default.jpg';

    container.innerHTML += `
      <div class="card">
        <img src="${mainImg}" 
             class="main-img" 
             id="main-${index}" 
             alt="${p.name}"
             onerror="this.src='images/default.jpg'">

        <div class="thumbnails">
          ${images.map((img, i) => `
            <img src="${img}" 
                 alt="${p.name} - ${i+1}" 
                 onclick="changeImage('${img}', ${index})"
                 onerror="this.src='images/default.jpg'">
          `).join("")}
        </div>

        <h3>${p.name}</h3>
        <div class="price">${p.price} دينار</div>

        <div class="details">
          
          👟 <span>المقاسات:</span> ${p.sizes.join(", ")}<br>
          🎨 <span>الألوان:</span> ${p.colors.join(", ")}
        </div>

        <a class="btn" target="_blank"
           href="https://wa.me/${p.phone}?text=مرحبا، أرغب بشراء ${encodeURIComponent(p.name)} - السعر: ${p.price} دينار">
           📲 اطلب الآن عبر واتساب
        </a>
      </div>
    `;
  });
}

function changeImage(src, index) {
  const mainImg = document.getElementById(`main-${index}`);
  mainImg.src = src;
}
