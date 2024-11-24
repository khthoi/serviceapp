//import { data } from "./tyngoluuchu.js";  // Kết nối với data từ file tyngoluuchu.js
// Danh sách Thiên Can và Địa Chi
const CAN = ["Canh", "Tân", "Nhâm", "Quý", "Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ"];
const CHI = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
const data = {
    "Tý": {
        "Giáp": "",
        "Ất": "Tiền Cốc",
        "Bính": "",
        "Đinh": "Tam Gian, Uyển Cốt",
        "Mậu": "",
        "Kỷ": "Dương Phụ",
        "Canh": "",
        "Tân": "Túc Tam Lý",
        "Nhâm": "",
        "Quý": "Nạp Quan Xung"
    },
    "Sửu": {
        "Giáp": "Hành Gian",
        "Ất": "",
        "Bính": "Thái Bạch, Thái Xung",
        "Đinh": "",
        "Mậu": "Phục Lưu",
        "Kỷ": "",
        "Canh": "Thiếu Hải",
        "Tân": "",
        "Nhâm": "Nạp Khúc Trạch",
        "Quý": ""
    },
    "Dần": {
        "Giáp": "",
        "Ất": "Khâu Khư, Hãm Cốc",
        "Bính": "",
        "Đinh": "Côn Lôn",
        "Mậu": "",
        "Kỷ": "Tiểu Hải",
        "Canh": "",
        "Tân": "Nạp Thiên Tinh",
        "Nhâm": "Chí Âm",
        "Quý": ""
    },
    "Mão": {
        "Giáp": "Thần Môn, Thái Khê, Đại Lăng",
        "Ất": "",
        "Bính": "Kính Cừ",
        "Đinh": "",
        "Mậu": "Khúc Tuyền",
        "Kỷ": "",
        "Canh": "Nạp Gian Sư",
        "Tân": "Thiếu Thương",
        "Nhâm": "",
        "Quý": ""
    },
    "Thìn": {
        "Giáp": "",
        "Ất": "Dương Khê",
        "Bính": "",
        "Đinh": "Dương Lăng Tuyền",
        "Mậu": "Nạp Chi Câu",
        "Kỷ": "Thương Dương",
        "Canh": "",
        "Tân": "Hiệp Khê",
        "Nhâm": "",
        "Quý": ""
    },
    "Tỵ": {
        "Giáp": "Thương Khâu",
        "Ất": "",
        "Bính": "Âm Cốc",
        "Đinh": "",
        "Mậu": "Nạp Đại Lăng",
        "Kỷ": "Ẩn Bạch",
        "Canh": "",
        "Tân": "Nhiên Cốc",
        "Nhâm": "",
        "Quý": ""
    },
    "Ngọ": {
        "Giáp": "",
        "Ất": "Ủy Trung",
        "Bính": "",
        "Đinh": "Nạp Trung Chử",
        "Mậu": "Lệ Đoài",
        "Kỷ": "",
        "Canh": "Thông Cốc",
        "Tân": "",
        "Nhâm": "Hậu Khê, Kinh Cốt, Dương Trì",
        "Quý": ""
    },
    "Mùi": {
        "Giáp": "Xích Trạch",
        "Ất": "",
        "Bính": "Nạp Lao Cung",
        "Đinh": "Thiếu Xung",
        "Mậu": "",
        "Kỷ": "Ngư Tế",
        "Canh": "",
        "Tân": "Thái Xung, Thái Uyên",
        "Nhâm": "",
        "Quý": ""
    },
    "Thân": {
        "Giáp": "",
        "Ất": "Nạp Dịch Môn",
        "Bính": "Thiếu Trạch",
        "Đinh": "",
        "Mậu": "Nhị Gian",
        "Kỷ": "",
        "Canh": "Lâm Khấp, Hợp Cốc",
        "Tân": "",
        "Nhâm": "Giải Khê",
        "Quý": ""
    },
    "Dậu": {
        "Giáp": "Nạp Trung Xung",
        "Ất": "Đại Đôn",
        "Bính": "",
        "Đinh": "Thái Khê, Thái Bạch",
        "Mậu": "",
        "Kỷ": "Linh Đạo",
        "Canh": "",
        "Tân": "",
        "Nhâm": "",
        "Quý": ""
    },
    "Tuất": {
        "Giáp": "Khiếu Âm",
        "Ất": "",
        "Bính": "Nội Đình",
        "Đinh": "",
        "Mậu": "Thúc Cốt, Xung Dương",
        "Kỷ": "",
        "Canh": "Dương Cốc",
        "Tân": "",
        "Nhâm": "Khúc Trì",
        "Quý": ""
    },
    "Hợi": {
        "Giáp": "",
        "Ất": "Thiếu Phủ",
        "Bính": "",
        "Đinh": "Thái Uyên, Thần Môn",
        "Mậu": "",
        "Kỷ": "Trung Phong",
        "Canh": "",
        "Tân": "Âm Lăng Tuyền",
        "Nhâm": "",
        "Quý": "Dũng Tuyền"
    }
}
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
        hours: today.getHours()
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


function getInfoFromData(diaChi, thienCan) {
    // Kiểm tra nếu tồn tại
    if (data[diaChi]?.[thienCan]) {
        return data[diaChi][thienCan];
    } else {
        console.log(`Không tìm thấy dữ liệu với ${diaChi} và ${thienCan}`);
        return "Không có dữ liệu";
    }
}

// Hàm chính để tính Thiên Can và Địa Chi cho ngày hiện tại
function main() {
    const { day, month, year, hours } = getCurrentDate();
    const { thienCan, diaChi } = getCanChi(day, month, year);

    // Tính Địa Chi cho giờ hiện tại
    const GioDiaChi = getCanChiByHour();
    // In ra thông tin ngày, giờ và Địa Chi của giờ hiện tại
    console.log(`Ngày hiện tại là: ${day}-${month}-${year} Tức ngày ${thienCan} ${diaChi}`);
    console.log(`Giờ hiện tại: ${hours} - Tức: ${GioDiaChi}`);

    // Tra cứu thông tin từ dữ liệu
    const info = getInfoFromData(GioDiaChi, thienCan);
    console.log(`Thông tin về Tý Ngọ Lưu Chú Hiện Tại: ${info}`);
}

// Gọi hàm chính
main();

