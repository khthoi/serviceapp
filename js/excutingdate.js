class clsSolar2Lunar {
    static INT(d) {
        return Math.floor(d);
    }

    static jdFromDate(dd, mm, yy) {
        let a = clsSolar2Lunar.INT((14 - mm) / 12);
        let y = yy + 4800 - a;
        let m = mm + 12 * a - 3;
        let jd = dd + clsSolar2Lunar.INT((153 * m + 2) / 5) + 365 * y + clsSolar2Lunar.INT(y / 4) - clsSolar2Lunar.INT(y / 100) + clsSolar2Lunar.INT(y / 400) - 32045;
        if (jd < 2299161) {
            jd = dd + clsSolar2Lunar.INT((153 * m + 2) / 5) + 365 * y + clsSolar2Lunar.INT(y / 4) - 32083;
        }
        return jd;
    }

    static getNewMoonDay(k, timeZone) {
        let T = k / 1236.85;
        let T2 = T * T;
        let T3 = T2 * T;
        let dr = Math.PI / 180;
        let Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
        Jd1 = Jd1 + 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);
        let M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
        let Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
        let F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;
        let C1 = (0.1734 - 0.000393 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * dr * M);
        C1 = C1 - 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(dr * 2 * Mpr);
        C1 = C1 - 0.0004 * Math.sin(dr * 3 * Mpr);
        C1 = C1 + 0.0104 * Math.sin(dr * 2 * F) - 0.0051 * Math.sin(dr * (M + Mpr));
        C1 = C1 - 0.0074 * Math.sin(dr * (M - Mpr)) + 0.0004 * Math.sin(dr * (2 * F + M));
        C1 = C1 - 0.0004 * Math.sin(dr * (2 * F - M)) - 0.0006 * Math.sin(dr * (2 * F + Mpr));
        C1 = C1 + 0.0010 * Math.sin(dr * (2 * F - Mpr)) + 0.0005 * Math.sin(dr * (2 * Mpr + M));
        let deltat = 0;
        if (T < -11) {
            deltat = 0.001 + 0.000839 * T + 0.0002261 * T2 - 0.00000845 * T3 - 0.000000081 * T * T3;
        } else {
            deltat = -0.000278 + 0.000265 * T + 0.000262 * T2;
        }
        let JdNew = Jd1 + C1 - deltat;
        return clsSolar2Lunar.INT(JdNew + 0.5 + (timeZone / 24));
    }

    static getSunLongitude(jdn, timeZone) {
        let T = (jdn - 2451545.5 - timeZone / 24) / 36525;
        let T2 = T * T;
        let dr = Math.PI / 180;
        let M = 357.52910 + 35999.05030 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
        let L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
        let DL = (1.914600 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
        DL = DL + (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.000290 * Math.sin(dr * 3 * M);
        let L = L0 + DL;
        let omega = 125.04 - 1934.136 * T;
        L = L - 0.00569 - 0.00478 * Math.sin(omega * dr);
        L = L * dr;
        L = L - Math.PI * 2 * (clsSolar2Lunar.INT(L / (Math.PI * 2)));
        return clsSolar2Lunar.INT(L / Math.PI * 6);
    }

    static getLunarMonth11(yy, timeZone) {
        let off = clsSolar2Lunar.jdFromDate(31, 12, yy) - 2415021;
        let k = clsSolar2Lunar.INT(off / 29.530588853);
        let nm = clsSolar2Lunar.getNewMoonDay(k, timeZone);
        let sunLong = clsSolar2Lunar.getSunLongitude(nm, timeZone);
        if (sunLong >= 9) {
            nm = clsSolar2Lunar.getNewMoonDay(k - 1, timeZone);
        }
        return nm;
    }

    static getLeapMonthOffset(a11, timeZone) {
        let k = clsSolar2Lunar.INT((a11 - 2415021.076998695) / 29.530588853 + 0.5);
        let last = 0;
        let i = 1;
        let arc = clsSolar2Lunar.getSunLongitude(clsSolar2Lunar.getNewMoonDay(k + i, timeZone), timeZone);
        do {
            last = arc;
            i = i + 1;
            arc = clsSolar2Lunar.getSunLongitude(clsSolar2Lunar.getNewMoonDay(k + i, timeZone), timeZone);
        } while (arc !== last && i < 14);
        return i - 1;
    }

    static convertSolar2Lunar(dd, mm, yy, timeZone) {
        let dayNumber = clsSolar2Lunar.jdFromDate(dd, mm, yy);
        let k = clsSolar2Lunar.INT((dayNumber - 2415021.076998695) / 29.530588853);
        let monthStart = clsSolar2Lunar.getNewMoonDay(k + 1, timeZone);

        if (monthStart > dayNumber) {
            monthStart = clsSolar2Lunar.getNewMoonDay(k, timeZone);
        }

        let a11 = clsSolar2Lunar.getLunarMonth11(yy, timeZone);
        let b11 = a11;
        let lunarYear;

        if (a11 >= monthStart) {
            lunarYear = yy;
            a11 = clsSolar2Lunar.getLunarMonth11(yy - 1, timeZone);
        } else {
            lunarYear = yy + 1;
            b11 = clsSolar2Lunar.getLunarMonth11(yy + 1, timeZone);
        }

        let lunarDay = dayNumber - monthStart + 1;
        let diff = clsSolar2Lunar.INT((monthStart - a11) / 29);
        let lunarLeap = 0;
        let lunarMonth = diff + 11;

        if (b11 - a11 > 365) {
            let leapMonthDiff = clsSolar2Lunar.getLeapMonthOffset(a11, timeZone);
            if (diff >= leapMonthDiff) {
                lunarMonth = diff + 10;
                if (diff === leapMonthDiff) {
                    lunarLeap = 1;
                }
            }
        }

        if (lunarMonth > 12) {
            lunarMonth = lunarMonth - 12;
        }

        if (lunarMonth >= 11 && diff < 4) {
            lunarYear -= 1;
        }

        return [lunarDay, lunarMonth, lunarYear, lunarLeap];
    }
}

// Example usage
//let dd = 10, mm = 12, yy = 2004, timeZone = 7;
//let lunarDate = clsSolar2Lunar.convertSolar2Lunar(dd, mm, yy, timeZone);
//console.log(`Lunar Date: ${lunarDate[0]}/${lunarDate[1]}/${lunarDate[2]}`);


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

// Hàm kiểm tra dữ liệu từ data (cần dữ liệu từ file kiengngayam.js)
function getlunardateFromData(day) {
    // Kiểm tra nếu tồn tại
    if (kiengky[day]) {
        return kiengky[day];
    } else {
        console.log(`Không tìm thấy dữ liệu`);
        return "Không có";
    }
}

// Hàm xét ngày kiêng châm cứu
function checkforbidday(month, day) {
    if (kiengcham[month] == day) {
        document.getElementById("infokiengchamcuu").innerHTML = `Ngày Hôm Nay Kiêng Châm Cứu`;
    } else {
        document.getElementById("infokiengchamcuu").innerHTML = ``;
    }
}
// Hàm chính để tính Thiên Can và Địa Chi cho ngày hiện tại
function main() {
    const timeZone = 7;
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

    // Kiểm tra chiều rộng màn hình
    if (window.innerWidth < 430) {
        // Tra cứu thông tin từ dữ liệu
        const info = getInfoFromData(GioDiaChi, thienCan);
        document.getElementById("infoTyluuchu").innerHTML = `Huyệt Mở Theo Tý Ngọ Lưu Chú:<br>${info}`;

        const info2 = getInfoFromData(NgayCanChi, GioDiaChi);
        document.getElementById("infoHuyetmo").innerHTML = `Huyệt Mở Theo Linh Quy Bát Pháp:<br> ${info2}`;

        // Tính huyệt đóng và hiển thị kết quả
        const huyetDong = getHuyetDong(info2);
        document.getElementById("infoHuyetdong").innerHTML = `Huyệt Đóng Theo Linh Quy Bát Pháp:<br> ${huyetDong}`;
    } else {
        // Tra cứu thông tin từ dữ liệu
        const info = getInfoFromData(GioDiaChi, thienCan);
        document.getElementById("infoTyluuchu").innerHTML = `Huyệt Mở Theo Tý Ngọ Lưu Chú: ${info}`;

        const info2 = getInfoFromData(NgayCanChi, GioDiaChi);
        document.getElementById("infoHuyetmo").innerHTML = `Huyệt Mở Theo Linh Quy Bát Pháp: ${info2}`;

        // Tính huyệt đóng và hiển thị kết quả
        const huyetDong = getHuyetDong(info2);
        document.getElementById("infoHuyetdong").innerHTML = `Huyệt Đóng Theo Linh Quy Bát Pháp: ${huyetDong}`;
    }
    // Xét ngày âm hiện tại
    let lunarDate = clsSolar2Lunar.convertSolar2Lunar(day, month, year, timeZone);
    const lunardate = lunarDate[0];
    const info3 = getlunardateFromData(lunardate);
    // In ra Bộ vị kiêng kỵ hiện tại 
    document.getElementById("infokiengngayam").innerHTML = `Bộ vị kiêng châm: ${info3}`;
    // Xét ngày kiêng châm cứu hiện tại
    const lunarMonth = lunarDate[1]
    checkforbidday(lunarMonth, diaChi);
}


// Gọi hàm chính
main();