let tours = []; // Dữ liệu danh sách tour
let editIndex = -1; // Giữ index của tour cần sửa

// Hiển thị danh sách tour
function renderTours() {
  const tourList = document.getElementById('tourList');
  tourList.innerHTML = '';

  tours.forEach((tour, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${tour.name}</td>
      <td>${tour.destination}</td>
      <td>${tour.duration} ngày</td>
      <td>${tour.price.toLocaleString('vi-VN')} VNĐ</td>
      <td>${tour.startDate}</td>
      <td>
        <button class="action-btn edit-btn" onclick="editTour(${index})">Sửa</button>
        <button class="action-btn delete-btn" onclick="deleteTour(${index})">Xóa</button>
      </td>
    `;
    tourList.appendChild(row);
  });
}

// Hiện form Thêm/Sửa
function showAddForm() {
  editIndex = -1;
  document.getElementById('formContainer').style.display = 'block';
}

// Lưu thông tin Thêm/Sửa
document.getElementById('tourForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const tour = {
    name: document.getElementById('tourName').value,
    destination: document.getElementById('destination').value,
    duration: parseInt(document.getElementById('duration').value),
    price: parseInt(document.getElementById('price').value),
    startDate: document.getElementById('startDate').value,
  };

  if (editIndex >= 0) {
    tours[editIndex] = tour;
  } else {
    tours.push(tour);
  }

  renderTours();
  cancelForm();
});

// Xóa thông tin tour
function deleteTour(index) {
  if (confirm('Bạn có chắc chắn muốn xóa không?')) {
    tours.splice(index, 1);
    renderTours();
  }
}

// Chỉnh sửa thông tin
function editTour(index) {
  const tour = tours[index];
  document.getElementById('tourName').value = tour.name;
  document.getElementById('destination').value = tour.destination;
  document.getElementById('duration').value = tour.duration;
  document.getElementById('price').value = tour.price;
  document.getElementById('startDate').value = tour.startDate;

  editIndex = index;
  document.getElementById('formContainer').style.display = 'block';
}

// Hủy thao tác và ẩn form
function cancelForm() {
  document.getElementById('formContainer').style.display = 'none';
  document.getElementById('tourForm').reset();
  editIndex = -1;
}
