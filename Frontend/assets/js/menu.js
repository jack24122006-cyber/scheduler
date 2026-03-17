(function () {
  // Xác định đường dẫn gốc dựa vào vị trí file hiện tại
  const currentPath = window.location.pathname.replace(/\\/g, "/");
  const frontendIndex = currentPath.lastIndexOf("/Frontend/");
  let basePath = "./";
  if (frontendIndex !== -1) {
    const afterFrontend = currentPath.substring(frontendIndex + "/Frontend/".length);
    const depth = (afterFrontend.match(/\//g) || []).length;
    basePath = "../".repeat(depth);
  }
  const menuUrl = basePath + "components/menu.html";


  fetch(menuUrl)
    .then(res => {
      if (!res.ok) {
        throw new Error("Network response was not ok: " + res.status);
      }
      return res.text();
    })
    .then(data => {
      const menu = document.getElementById("menu");
      if (menu) {
        menu.innerHTML = data;
      }
    })
    .catch(error => {
      console.error("Lỗi load menu:", error);
    });
})();






function goTHIC(){
  window.location.href = "https://thicpc.edu.vn";
}

function openPassword(){
  const box = document.getElementById("passwordBox");
  if(box) box.style.display = "block";
}

function closePassword(){
  const box = document.getElementById("passwordBox");
  if(box) box.style.display = "none";
}

function exitWeb(){
  window.location.href = "about:blank";
}

function openThongTinChung(){
  const box = document.getElementById("thongTinChungBox");
  if(box) box.style.display = "block";
}

function closeThongTinChung(){
  const box = document.getElementById("thongTinChungBox");
  if(box) box.style.display = "none";
}

function openDuLieuKhoiHoc(){
  window.location.href = "pages/du-lieu/du-lieu-khoi-hoc.html";
}




