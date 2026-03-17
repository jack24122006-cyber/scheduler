const url_be = "http://localhost:3000/api/grade/";

loadGrades();

function openKhoiHoc() {
  document.getElementById("modalKhoiHoc").style.display = "flex";
}

function closeKhoiHoc() {
  document.getElementById("modalKhoiHoc").style.display = "none";
}

document
  .getElementById("modalKhoiHoc")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const data = {
      name: this.tenKhoiHoc.value,
      code: this.maKhoiHoc.value,
      number: this.soKhoi.value,
      note: this.ghiChu.value,
    };

    try {
      const response = await fetch(url_be, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      console.log("Server response:", result);
      if (response.ok) {
        alert("Thêm khối học thành công!");
      } else {
        alert("Thêm khối học thất bại: " + (result.message || "Unknown error"));
        return;
      }

      this.reset(); // clear form
      closeKhoiHoc();
    } catch (error) {
      console.error("Error:", error);
      alert("Có lỗi xảy ra!");
    }
  });

async function loadGrades() {
  try {
    const response = await fetch(url_be);
    const data = await response.json();

    const tableBody = document.getElementById("gradeTableBody");
    tableBody.innerHTML = "";

    data.forEach((grade) => {
      const row = `
        <tr>
          <td><input type="checkbox" name="selectGrade" value="${grade.id}" id="grade"></td>
          <td>${grade.no}</td>
          <td>${grade.name}</td>
          <td>${grade.code}</td>
          <td>${grade.number}</td>
          <td>${grade.note}</td>
        </tr>
      `;

      tableBody.innerHTML += row;
    });
  } catch (error) {
    console.error("Error loading grades:", error);
  }
}

// Load when page opens
