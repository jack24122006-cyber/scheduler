function goTHIC(){
  window.location.href = "https://thicpc.edu.vn";
}

function openPassword(){
  document.getElementById("passwordBox").style.display = "block";
}

function closePassword(){
  document.getElementById("passwordBox").style.display = "none";
}

function exitWeb(){
  // CÁCH CHUẨN NHẤT (không bị trình duyệt chặn)
  window.location.href = "about:blank";
}



function openThongTinChung(){
  document.getElementById("thongTinChungBox").style.display = "block";
}

function closeThongTinChung(){
  document.getElementById("thongTinChungBox").style.display = "none";
}





function openDuLieuKhoiHoc(){
  window.location.href = "pages/du-lieu/du-lieu-khoi-hoc.html";
}







function openKhoiHoc() {
  document.getElementById("modalKhoiHoc").style.display = "flex";
}

function closeKhoiHoc() {
  document.getElementById("modalKhoiHoc").style.display = "none";
}

function submitKhoiHoc() {
  // (sau này mới xử lý lưu dữ liệu)
  closeKhoiHoc();
}
















document.querySelectorAll(".tkb td").forEach(td => {
  td.addEventListener("click", () => {

    // nếu đang nhập rồi thì không tạo thêm
    if (td.querySelector("input")) return;

    const oldText = td.innerText;
    td.innerHTML = "";

    const input = document.createElement("input");
    input.type = "text";
    input.value = oldText;

    td.appendChild(input);
    input.focus();

    // Enter = lưu
    input.addEventListener("keydown", e => {
      if (e.key === "Enter") {
        td.innerText = input.value;
      }
      if (e.key === "Escape") {
        td.innerText = oldText;
      }
    });

    // click ra ngoài = lưu
    input.addEventListener("blur", () => {
      td.innerText = input.value;
    });
  });
});