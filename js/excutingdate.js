// import { data } from "/data/tyngoluuchu.js";  // Kết nối với data từ file tyngoluuchu.js

// Danh sách Thiên Can và Địa Chi
const CAN = ["Canh", "Tân", "Nhâm", "Quý", "Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ"];
const CHI = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];

// Kiểm tra năm nhuận
function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

// Tính Acanchi, Thiên Can và Địa Chi
function getCanChi(day, month, year) {
    const Add = day;
    const X = Math.floor(month / 2);
    const Amm = (month % 2 === 0) ? X + 30 : (month === 9 || month === 11) ? X + 1 : X;
    const Acc = 18;
    const yy = year % 100;
    const Ayy = (yy % 12) * 5 + Math.floor(yy / 4);
    let Ass = (month > 2) ? -2 : (isLeapYear(year) ? -1 : 0);

    const Acanchi = Add + Amm + Acc + Ayy + Ass;

    const thienCan = CAN[Acanchi % 10];
    const diaChi = CHI[Acanchi % 12];

    return { thienCan, diaChi };
}

// Lấy ngày hiện tại từ hệ thống
function getCurrentDate() {
    const today = new Date();
    return {
        day: today.getDate(),
        month: today.getMonth() + 1, // Lấy tháng (0-11, nên cộng thêm 1)
        year: today.getFullYear(),
        hours: today.getHours(),
        minute: today.getMinutes(),
        second: today.getSeconds()
    };
}

// Hàm tính Thiên Can và Địa Chi của giờ hiện tại
function getCanChiByHour() {
    const now = new Date();  // Lấy thời gian hiện tại
    const hours = now.getHours();  // Lấy giờ trong ngày (0-23)

    // Mỗi Địa Chi kéo dài 2 giờ, tính Địa Chi từ giờ hiện tại
    const diaChiIndex = Math.floor((hours + 1) / 2) % 12;  // Cộng 1 vì giờ bắt đầu từ 0, chia cho 2 vì mỗi Địa Chi kéo dài 2 giờ
    const diaChiGio = CHI[diaChiIndex];
    // Trả về diaChiGio
    return diaChiGio;
}

// Hàm kiểm tra dữ liệu từ data (cần dữ liệu từ file tyngoluuchu.js)
function getInfoFromData(diaChi, thienCan) {
    // Kiểm tra nếu tồn tại
    if (data[diaChi]?.[thienCan]) {
        return data[diaChi][thienCan];
    } else {
        console.log(`Không tìm thấy dữ liệu`);
        return "Không có";
    }
}

// Hàm kiểm tra và xác định huyệt đóng
function getHuyetDong(huyetMo) {
    if (huyetPairs[huyetMo]) {
        return huyetPairs[huyetMo];
    } else {
        console.log("Không tìm thấy huyệt tương ứng");
        return "Không có";
    }
}

// Hàm chính để tính Thiên Can và Địa Chi cho ngày hiện tại
function main() {
    const { day, month, year, hours, minute, second } = getCurrentDate();
    const { thienCan, diaChi } = getCanChi(day, month, year);
    var NgayCanChi = thienCan + " " + diaChi;  // Nối thienCan và diaChi với dấu cách
    
    // Tính Địa Chi cho giờ hiện tại
    const GioDiaChi = getCanChiByHour();

    // Định dạng phút và giây về dạng "02" nếu giá trị nhỏ hơn 10
    const formattedMinute = String(minute).padStart(2, '0');
    //const formattedSecond = String(second).padStart(2, '0');

    // In ra thông tin ngày và giờ vào các phần tử HTML
    document.getElementById("currentDate").innerHTML = `Ngày ${day} Tháng ${month} Năm ${year}<br><br> Tức ngày ${thienCan} ${diaChi}`;
    document.getElementById("currentHour").innerHTML = `${hours}:${formattedMinute} - Tức Giờ ${GioDiaChi}`;

    // Tra cứu thông tin từ dữ liệu
    const info = getInfoFromData(GioDiaChi, thienCan);
    document.getElementById("infoTyluuchu").innerHTML = `Huyệt Mở Theo Tý Ngọ Lưu Chú: ${info}`;
    
    const info2 = getInfoFromData(NgayCanChi, GioDiaChi);
    document.getElementById("infoHuyetmo").innerHTML = `Huyệt Mở Theo Linh Quy Bát Pháp: ${info2}`;

    // Tính huyệt đóng và hiển thị kết quả
    const huyetDong = getHuyetDong(info2);
    document.getElementById("infoHuyetdong").innerHTML = `Huyệt Đóng Theo Linh Quy Bát Pháp: ${huyetDong}`;
}


// Gọi hàm chính
main();