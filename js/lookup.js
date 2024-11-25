// Đặt giá trị mặc định là ngày hôm nay và giờ hiện tại
document.addEventListener("DOMContentLoaded", function () {
    // Đặt ngày hôm nay vào input date
    const today = new Date();
    const formattedDate = today.toISOString().slice(0, 10); // Định dạng YYYY-MM-DD
    document.getElementById("inputDate").value = formattedDate;

    // Tạo danh sách giờ từ 1 đến 24
    const hourSelect = document.getElementById("inputHour");
    for (let i = 1; i <= 24; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        hourSelect.appendChild(option);
    }

    // Đặt giờ hiện tại làm mặc định trong danh sách giờ
    const currentHour = today.getHours(); // Lấy giờ hiện tại (0 - 23)
    hourSelect.value = currentHour + 1; // Đổi sang định dạng 1 - 24
});

// Danh sách Thiên Can và Địa Chi
const CAN = ["Canh", "Tân", "Nhâm", "Quý", "Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ"];
const CHI = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];

// Kiểm tra năm nhuận
function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

// Tính Thiên Can và Địa Chi của ngày
function getCanChi(day, month, year) {
    const Add = day;
    const X = Math.floor(month / 2);
    const Amm = (month % 2 === 0) ? X + 30 : (month === 9 || month === 11) ? X + 1 : X;
    const Acc = 18;
    const yy = year % 100;
    const Ayy = (yy % 12) * 5 + Math.floor(yy / 4);
    const Ass = (month > 2) ? -2 : (isLeapYear(year) ? -1 : 0);

    const Acanchi = Add + Amm + Acc + Ayy + Ass;
    const thienCan = CAN[Acanchi % 10];
    const diaChi = CHI[Acanchi % 12];

    return { thienCan, diaChi };
}

// Tính Địa Chi của giờ
function getCanChiByHour(hours) {
    const diaChiIndex = Math.floor((hours + 1) / 2) % 12; // Cộng 1 vì giờ bắt đầu từ 0, mỗi Địa Chi kéo dài 2 giờ
    return CHI[diaChiIndex];
}

// Tra cứu thông tin từ dữ liệu
function getInfoFromData(diaChi, thienCan) {
    if (data[diaChi]?.[thienCan]) {
        return data[diaChi][thienCan];
    } else {
        console.log(`Không tìm thấy dữ liệu cho ${diaChi} và ${thienCan}`);
        return "Không có";
    }
}

// Tìm huyệt đóng từ huyệt mở
function getHuyetDong(huyetMo) {
    if (huyetPairs[huyetMo]) {
        return huyetPairs[huyetMo];
    } else {
        console.log("Không tìm thấy huyệt tương ứng");
        return "Không có";
    }
}

// Hàm chính để tính Thiên Can và Địa Chi từ dữ liệu nhập
function main() {
    // Lấy giá trị từ input date và giờ
    const dateInput = document.getElementById("inputDate").value;
    const hourInput = parseInt(document.getElementById("inputHour").value, 10);

    if (!dateInput || isNaN(hourInput)) {
        alert("Vui lòng chọn đầy đủ ngày và giờ.");
        return;
    }

    // Tách ngày, tháng, năm từ giá trị input
    const [year, month, day] = dateInput.split("-").map(Number);

    // Tính Thiên Can và Địa Chi của ngày
    const { thienCan, diaChi } = getCanChi(day, month, year);
    const NgayCanChi = `${thienCan} ${diaChi}`;

    // Tính Địa Chi của giờ
    const GioDiaChi = getCanChiByHour(hourInput);

    // Hiển thị kết quả
    document.getElementById("currentDate").innerHTML = `Ngày ${day} Tháng ${month} Năm ${year} - Tức ngày ${NgayCanChi}`;
    document.getElementById("currentHour").innerHTML = `Giờ ${hourInput}H - Tức Giờ ${GioDiaChi}`;

    // Tra cứu dữ liệu
    const info = getInfoFromData(GioDiaChi, thienCan);
    document.getElementById("infoTyluuchu").innerHTML = `Huyệt Mở Theo Tý Ngọ Lưu Chú: ${info}`;

    const info2 = getInfoFromData(NgayCanChi, GioDiaChi);
    document.getElementById("infoHuyetmo").innerHTML = `Huyệt Mở Theo Linh Quy Bát Pháp: ${info2}`;

    // Tính huyệt đóng
    const huyetDong = getHuyetDong(info2);
    document.getElementById("infoHuyetdong").innerHTML = `Huyệt Đóng Theo Linh Quy Bát Pháp: ${huyetDong}`;
}
