/* ================================================================
   SONY'S OFFICIAL GOODS — MAIN SCRIPT
   ไฟล์นี้แบ่งเป็น 2 ส่วนหลัก:

   ส่วนที่ 1: ข้อมูล (DATA)
     - PRODUCTS  : ข้อมูลสินค้าแต่ละคอลเลกชัน (รูป/ชื่อ/ราคา ของแต่ละตัวเลือก)
     - STORES    : ข้อมูลสาขาร้าน Sony Store
     - WALLPAPERS: ข้อมูล wallpaper ที่ให้ดาวน์โหลด

     ถ้าต้องการเปลี่ยนรูป/ชื่อ/ราคา/ลิงก์ ให้แก้ที่ตัวแปรในส่วนนี้
     "ที่เดียว" ไม่ต้องไปไล่แก้ใน index.html หลายจุด

   ส่วนที่ 2: การทำงานของหน้าเว็บ (BEHAVIOR)
     - สร้างรูปเล็ก (thumbnail) จากข้อมูลด้านบน
     - สลับรูปใหญ่ + ชื่อ + ราคา เมื่อคลิก/hover ที่รูปเล็ก
     - สร้างการ์ดร้านค้า และการ์ด wallpaper
   ================================================================ */


/* ---------------------------------------------------------------
   ส่วนที่ 1.1 : ข้อมูลสินค้า
   key ของ object ("01","02",...) ต้องตรงกับ data-product ใน index.html

   variants = รายการตัวเลือกของคอลเลกชันนั้น (แต่ละอันคือ 1 รูปเล็ก)
     thumb : รูปเล็กที่ใช้แสดงในแถว thumbnail
     main  : รูปใหญ่ที่จะโชว์เมื่อเลือกตัวเลือกนี้
     name  : ชื่อสินค้า (โชว์ตรง PRODUCT)
     price : ราคา (โชว์ตรง PRICE)
     buyUrl: ลิงก์ปุ่ม "Buy This" ของตัวเลือกนี้ (ใส่ "#" ไว้ก่อนถ้ายังไม่มีลิงก์จริง)

   ต้องการเพิ่ม/ลดจำนวนตัวเลือกในคอลเลกชันไหน แค่เพิ่ม/ลบสมาชิกใน array
   variants ของคอลเลกชันนั้น ระบบจะสร้างรูปเล็กให้เองอัตโนมัติ
--------------------------------------------------------------- */
const PRODUCTS = {
  "01": {
    variants: [
      { thumb: "images/products/01/thumb-1.jpg", main: "images/products/01/main-1.jpg", name: "CDixV Metal46 Keychain", price: "250 บาท", buyUrl: "#" },
      { thumb: "images/products/01/thumb-2.jpg", main: "images/products/01/main-2.jpg", name: "CDixV Metal46 Keychain",  price: "250 บาท", buyUrl: "#" },
      { thumb: "images/products/01/thumb-3.jpg", main: "images/products/01/main-3.jpg", name: "CDixV Metal46 T-Shirt", price: "690 บาท", buyUrl: "#" },
      { thumb: "images/products/01/thumb-4.jpg", main: "images/products/01/main-4.jpg", name: "CDixV Metal46 T-Shirt", price: "690 บาท", buyUrl: "#" },
      // TODO: แก้ชื่อสินค้า/ราคาให้ตรงกับรูปจริง (เพิ่มมาใหม่จากไฟล์ main-5..9 / thumb-5..9)
      { thumb: "images/products/01/thumb-5.jpg", main: "images/products/01/main-5.jpg", name: "CDixV Metal46 T-Shirt", price: "690 บาท", buyUrl: "#" },
      { thumb: "images/products/01/thumb-6.jpg", main: "images/products/01/main-6.jpg", name: "CDixV Metal46 T-Shirt", price: "690 บาท", buyUrl: "#" },
      { thumb: "images/products/01/thumb-7.jpg", main: "images/products/01/main-7.jpg", name: "CDixV Metal46 T-Shirt", price: "690 บาท", buyUrl: "#" },
      { thumb: "images/products/01/thumb-8.jpg", main: "images/products/01/main-8.jpg", name: "CDixV Metal46 T-Shirt", price: "690 บาท", buyUrl: "#" },
      { thumb: "images/products/01/thumb-9.jpg", main: "images/products/01/main-9.jpg", name: "CDixV Metal46 T-Shirt", price: "690 บาท", buyUrl: "#" }
    ]
  },
  "02": {
    variants: [
      { thumb: "images/products/02/thumb-1.jpg", main: "images/products/02/main-1.jpg", name: "WM-F5 T-Shirt", price: "690 บาท", buyUrl: "#" },
      { thumb: "images/products/02/thumb-2.jpg", main: "images/products/02/main-2.jpg", name: "WM-F5 T-Shirt", price: "690 บาท", buyUrl: "#" },
      { thumb: "images/products/02/thumb-3.jpg", main: "images/products/02/main-3.jpg", name: "WM-F5 T-Shirt", price: "690 บาท", buyUrl: "#" },
      { thumb: "images/products/02/thumb-4.jpg", main: "images/products/02/main-4.jpg", name: "WM-F5 T-Shirt", price: "690 บาท", buyUrl: "#" },
      // TODO: แก้ชื่อสินค้า/ราคาให้ตรงกับรูปจริง (เพิ่มมาใหม่จากไฟล์ main-5..12 / thumb-5..12)
      { thumb: "images/products/02/thumb-5.jpg", main: "images/products/02/main-5.jpg", name: "WM-F5 T-Shirt", price: "690 บาท", buyUrl: "#" },
      { thumb: "images/products/02/thumb-6.jpg", main: "images/products/02/main-6.jpg", name: "WM-F5 T-Shirt", price: "690 บาท", buyUrl: "#" },
      { thumb: "images/products/02/thumb-7.jpg", main: "images/products/02/main-7.jpg", name: "WM-F5 T-Shirt", price: "690 บาท", buyUrl: "#" },
      { thumb: "images/products/02/thumb-8.jpg", main: "images/products/02/main-8.jpg", name: "WM-F5 Keychain", price: "250 บาท", buyUrl: "#" },
      { thumb: "images/products/02/thumb-9.jpg", main: "images/products/02/main-9.jpg", name: "WM-F5 Keychain", price: "250 บาท", buyUrl: "#" },
      { thumb: "images/products/02/thumb-10.jpg", main: "images/products/02/main-10.jpg", name: "WM-F5 Tote Bag", price: "390 บาท", buyUrl: "#" },
      { thumb: "images/products/02/thumb-11.jpg", main: "images/products/02/main-11.jpg", name: "WM-F5 Tote Bag", price: "390 บาท", buyUrl: "#" },
      { thumb: "images/products/02/thumb-12.jpg", main: "images/products/02/main-12.jpg", name: "WM-F5 Tote Bag", price: "390 บาท", buyUrl: "#" }
    ]
  },
  "03": {
    variants: [
      { thumb: "images/products/03/thumb-1.jpg", main: "images/products/03/main-1.jpg", name: "My First Sony T-Shirt", price: "690 บาท", buyUrl: "#" },
      { thumb: "images/products/03/thumb-2.jpg", main: "images/products/03/main-2.jpg", name: "My First Sony T-Shirt (Kids)", price: "590 บาท", buyUrl: "#" },
      { thumb: "images/products/03/thumb-3.jpg", main: "images/products/03/main-3.jpg", name: "My First Sony Sticker Sheet", price: "150 บาท", buyUrl: "#" },
      { thumb: "images/products/03/thumb-4.jpg", main: "images/products/03/main-4.jpg", name: "My First Sony Tote Bag", price: "390 บาท", buyUrl: "#" }
    ]
  },
  "04": {
    variants: [
      { thumb: "images/products/04/thumb-1.jpg", main: "images/products/04/main-1.jpg", name: "Handy Cam Long Sleeve T-Shirt", price: "790 บาท", buyUrl: "#" },
      { thumb: "images/products/04/thumb-2.jpg", main: "images/products/04/main-2.jpg", name: "Handy Cam T-Shirt", price: "690 บาท", buyUrl: "#" },
      { thumb: "images/products/04/thumb-3.jpg", main: "images/products/04/main-3.jpg", name: "Handy Cam Cap", price: "450 บาท", buyUrl: "#" },
      { thumb: "images/products/04/thumb-4.jpg", main: "images/products/04/main-4.jpg", name: "Handy Cam Keychain", price: "250 บาท", buyUrl: "#" }
    ]
  },
  "05": {
    variants: [
      { thumb: "images/products/05/thumb-1.jpg", main: "images/products/05/main-1.jpg", name: "Walkman-8 Long Sleeve T-Shirt", price: "790 บาท", buyUrl: "#" },
      { thumb: "images/products/05/thumb-2.jpg", main: "images/products/05/main-2.jpg", name: "Walkman-8 T-Shirt", price: "690 บาท", buyUrl: "#" },
      { thumb: "images/products/05/thumb-3.jpg", main: "images/products/05/main-3.jpg", name: "Walkman-8 Tote Bag", price: "390 บาท", buyUrl: "#" },
      { thumb: "images/products/05/thumb-4.jpg", main: "images/products/05/main-4.jpg", name: "Walkman-8 Sticker Sheet", price: "150 บาท", buyUrl: "#" }
    ]
  }
};


/* ---------------------------------------------------------------
   ส่วนที่ 1.2 : ข้อมูลร้านค้า (Available at Sony Store)
   mapQuery : ข้อความที่จะใช้ค้นหาใน Google Maps (แก้เป็นชื่อ/ที่อยู่จริงได้เลย)
   phone    : เบอร์โทรศัพท์ (ใส่ null ถ้าไม่มีเบอร์ เช่น ร้านออนไลน์)
   onlineUrl: ใช้กับร้านที่ไม่มีสาขาจริง (คลิกที่ชื่อร้านแล้วไปหน้าเว็บแทน Google Maps)
--------------------------------------------------------------- */
const STORES = [
  {
    name: "Sony Store Siam Paragon",
    addr: "ศูนย์การค้าสยามพารากอน ชั้น 2 โซนสยาม",
    phone: "065-512-6256",
    mapQuery: "Sony Store Siam Paragon",
    cardClass: "store-card--dark"
  },
  {
    name: "Sony Store Future Park Rangsit",
    addr: "ศูนย์การค้าฟิวเจอร์พาร์ค รังสิต ชั้น 2 โซน West",
    phone: "097-918-6515",
    mapQuery: "Sony Store Future Park Rangsit",
    cardClass: "store-card--blue"
  },
  {
    name: "Sony Store Online",
    addr: "ช้อปสินค้าและดูรายละเอียดการสั่งซื้อทางออนไลน์",
    phone: null,
    onlineUrl: "https://www.sony.co.th/th", // TODO: เปลี่ยนเป็นลิงก์หน้าร้านค้าออนไลน์จริง
    cardClass: "store-card--light"
  }
];


/* ---------------------------------------------------------------
   ส่วนที่ 1.3 : ข้อมูล Wallpaper
   mobileUrl / desktopUrl = ลิงก์ปลายทางเมื่อคลิก (เช่น ลิงก์ดาวน์โหลดไฟล์จริง)
--------------------------------------------------------------- */
const WALLPAPERS = [
  {
    label: "01 CDixV Metal46",
    mobileImg: "images/wallpaper/01-cdixv-mobile.jpg",
    mobileUrl: "#", // TODO: ใส่ลิงก์ดาวน์โหลดไฟล์มือถือจริง
    desktopImg: "images/wallpaper/01-cdixv-desktop.jpg",
    desktopUrl: "#" // TODO: ใส่ลิงก์ดาวน์โหลดไฟล์คอมพิวเตอร์จริง
  },
  {
    label: "02 WM-F5",
    mobileImg: "images/wallpaper/02-wf5-mobile.jpg",
    mobileUrl: "#",
    desktopImg: "images/wallpaper/02-wf5-desktop.jpg",
    desktopUrl: "#"
  }
];


/* ================================================================
   ส่วนที่ 2 : การทำงานของหน้าเว็บ
   ================================================================ */
document.addEventListener("DOMContentLoaded", () => {
  initProductGalleries();
  renderStores();
  renderWallpapers();
});


/* ---------------------------------------------------------------
   2.1 แกลเลอรีสินค้า: สร้างรูปเล็ก + ผูก event คลิก/hover
   เมื่อเลือกรูปเล็กอันไหน -> เปลี่ยนรูปใหญ่ + ชื่อสินค้า + ราคา + ลิงก์ปุ่มซื้อ
--------------------------------------------------------------- */
function initProductGalleries() {
  document.querySelectorAll(".product[data-product]").forEach((section) => {
    const id = section.getAttribute("data-product");
    const data = PRODUCTS[id];
    if (!data) return;

    const thumbList  = section.querySelector(".js-thumb-list");
    const mainImage  = section.querySelector(".js-main-image");
    const nameEl     = section.querySelector(".js-product-name");
    const priceEl    = section.querySelector(".js-product-price");
    const buyLink    = section.querySelector(".js-buy-link");

    // สร้างปุ่มรูปเล็กจากข้อมูลใน PRODUCTS
    data.variants.forEach((variant, index) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "thumb" + (index === 0 ? " is-active" : "");
      btn.setAttribute("aria-label", variant.name);
      btn.innerHTML = `<img src="${variant.thumb}" alt="${variant.name}">`;

      const selectThisVariant = () => {
        mainImage.src = variant.main;
        mainImage.alt = variant.name;
        nameEl.textContent = variant.name;
        priceEl.textContent = variant.price;
        if (buyLink) buyLink.href = variant.buyUrl || "#";

        thumbList.querySelectorAll(".thumb").forEach((t) => t.classList.remove("is-active"));
        btn.classList.add("is-active");
      };

      // ตามที่ต้องการ: "คลิกหรือเลื่อนไปที่รูปเล็ก" -> รองรับทั้งคลิก (มือถือ/เดสก์ท็อป)
      // และ hover ด้วยเมาส์ (เดสก์ท็อป)
      btn.addEventListener("click", selectThisVariant);
      btn.addEventListener("mouseenter", selectThisVariant);

      thumbList.appendChild(btn);
    });
  });
}


/* ---------------------------------------------------------------
   2.2 สร้างการ์ดร้านค้าจาก STORES
   - ชื่อสาขา  -> ลิงก์ Google Maps (เปิดแท็บใหม่) — แทนที่บรรทัด "เปิดแผนที่" เดิม
   - เบอร์โทร -> ลิงก์ tel: (โทรออกได้ทันทีบนมือถือ) มีเส้นขีดเส้นใต้
   - ร้านออนไลน์ (ไม่มีเบอร์) -> ชื่อร้านลิงก์ไปหน้าเว็บแทน
   - "สอบถามข้อมูลเพิ่มเติม" -> ลิงก์ไปเว็บ Sony หลัก (https://www.sony.co.th) ทุกการ์ด
--------------------------------------------------------------- */
function renderStores() {
  const grid = document.querySelector(".js-store-grid");
  if (!grid) return;

  const phoneIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1.1.4 2.2.7 3.2a2 2 0 0 1-.5 2.1L8 10.5a16 16 0 0 0 6 6l1.5-1.3a2 2 0 0 1 2.1-.5c1 .3 2.1.6 3.2.7a2 2 0 0 1 1.7 2z"/></svg>`;

  STORES.forEach((store) => {
    const card = document.createElement("div");
    card.className = "store-card " + store.cardClass;

    const nameHref = store.onlineUrl
      ? store.onlineUrl
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.mapQuery)}`;

    // แถวเบอร์โทร (มีเส้นขีดใต้) — แสดงเฉพาะร้านที่มีเบอร์
    let linksHtml = "";
    if (store.phone) {
      linksHtml += `<a class="store-card__link" href="tel:${store.phone.replace(/-/g, "")}">${phoneIcon} ${store.phone}</a>`;
    }
    // "สอบถามข้อมูลเพิ่มเติม" อยู่ใต้เส้นขีด ลิงก์ไปเว็บ Sony หลักเสมอ
    linksHtml += `<a class="store-card__link store-card__link--more" href="https://www.sony.co.th" target="_blank" rel="noopener">สอบถามข้อมูลเพิ่มเติม</a>`;

    card.innerHTML = `
      <div>
        <a class="store-card__name" href="${nameHref}" target="_blank" rel="noopener">${store.name}</a>
        <p class="store-card__addr">${store.addr}</p>
      </div>
      <div class="store-card__links">${linksHtml}</div>
    `;

    grid.appendChild(card);
  });
}


/* ---------------------------------------------------------------
   2.3 สร้างการ์ด Wallpaper จาก WALLPAPERS
   คลิกที่รูป Mobile หรือ Desktop -> ลิงก์ออกไปภายนอก (เปิดแท็บใหม่)
--------------------------------------------------------------- */
function renderWallpapers() {
  const grid = document.querySelector(".js-wallpaper-grid");
  if (!grid) return;

  WALLPAPERS.forEach((wp) => {
    const card = document.createElement("div");
    card.className = "wallpaper-card";
    card.innerHTML = `
      <p class="wallpaper-card__label">${wp.label}</p>
      <div class="wallpaper-card__previews">
        <a class="wallpaper-card__link" href="${wp.mobileUrl}" target="_blank" rel="noopener">
          <img src="${wp.mobileImg}" alt="${wp.label} - Mobile Wallpaper">
          <span>Mobile</span>
        </a>
        <a class="wallpaper-card__link" href="${wp.desktopUrl}" target="_blank" rel="noopener">
          <img src="${wp.desktopImg}" alt="${wp.label} - Desktop Wallpaper">
          <span>Desktop</span>
        </a>
      </div>
    `;
    grid.appendChild(card);
  });
}
