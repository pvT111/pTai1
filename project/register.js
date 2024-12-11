document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Lấy thông tin người dùng nhập
    const username = document.getElementById('newUsername').value;
    const password = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Kiểm tra mật khẩu và mật khẩu xác nhận có trùng nhau không
    if (password !== confirmPassword) {
        // Hiển thị thông báo lỗi nếu mật khẩu không khớp
        document.getElementById('registerError').style.display = 'block';
        return;
    }

    // Kiểm tra xem tên người dùng đã tồn tại trong localStorage chưa
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = storedUsers.some(u => u.username === username);

    if (userExists) {
        // Nếu tên người dùng đã tồn tại, hiển thị thông báo và dừng quá trình đăng ký
        alert('Username already taken! Please choose another one.');
        return;
    }

    // Thêm người dùng mới vào danh sách người dùng
    storedUsers.push({ username: username, password: password });

    // Lưu lại danh sách người dùng vào localStorage
    localStorage.setItem('users', JSON.stringify(storedUsers));

    // Thông báo đăng ký thành công và chuyển hướng đến trang đăng nhập
    alert('Registration successful! Please login.');
    window.location.href = 'login.html';
});
