// Chuyển đổi hiển thị giữa các phần
function switchSection(sectionId) {
    // Ẩn tất cả các phần
    document.getElementById('tourSection').style.display = 'none';
    document.getElementById('userSection').style.display = 'none';

    // Hiển thị phần được chọn
    document.getElementById(sectionId).style.display = 'block';
}

// Gắn sự kiện cho các nút điều hướng
function setupNavListeners() {
    document.getElementById('tourNav').addEventListener('click', () => switchSection('tourSection'));
    document.getElementById('userNav').addEventListener('click', () => switchSection('userSection'));

    // Mặc định hiển thị phần Tour Management
    switchSection('tourSection');
}

// Khởi động sự kiện khi DOM đã sẵn sàng
document.addEventListener('DOMContentLoaded', () => {
    setupNavListeners();
    setupEventListeners(); // Sự kiện dành riêng cho quản lý tour
});
