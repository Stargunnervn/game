// ============================================================================
// HỆ THỐNG CẢNH GIỚI TU TIÊN (CULTIVATION REALMS & LIFESPAN)
// ============================================================================

const REALMS = [
  {
    id: 'pham_nhan',
    name: 'Phàm Nhân',
    stage: 'Luyện Thể',
    level: 0,
    lifespan: 70,
    expRequired: 100,
    baseStats: { hp: 100, atk: 12, def: 6, strike: 5, dodge: 5, skill: 5 },
    tribulation: false,
    desc: 'Huyết khí phàm tục, chưa ngộ thiên địa linh khí, thọ mệnh ngắn ngủi.'
  },
  {
    id: 'luyen_khi_1',
    name: 'Luyện Khí Tầng 1',
    stage: 'Luyện Khí',
    level: 1,
    lifespan: 100,
    expRequired: 250,
    baseStats: { hp: 160, atk: 22, def: 12, strike: 8, dodge: 7, skill: 8 },
    tribulation: false,
    desc: 'Dẫn khí nhập thể, đả thông kinh mạch đầu tiên, linh khí chuyển vận.'
  },
  {
    id: 'luyen_khi_3',
    name: 'Luyện Khí Tầng 3',
    stage: 'Luyện Khí',
    level: 2,
    lifespan: 110,
    expRequired: 450,
    baseStats: { hp: 240, atk: 35, def: 20, strike: 12, dodge: 10, skill: 12 },
    tribulation: false,
    desc: 'Khí hải sơ thành, có thể ngưng tụ chân khí phóng thích pháp thuật sơ cấp.'
  },
  {
    id: 'luyen_khi_6',
    name: 'Luyện Khí Tầng 6',
    stage: 'Luyện Khí',
    level: 3,
    lifespan: 120,
    expRequired: 800,
    baseStats: { hp: 360, atk: 52, def: 30, strike: 16, dodge: 14, skill: 18 },
    tribulation: false,
    desc: 'Khí tức trầm ổn, thần thức phóng xuất mười trượng, ngự khí thối địch.'
  },
  {
    id: 'luyen_khi_9',
    name: 'Luyện Khí Tầng 9',
    stage: 'Luyện Khí',
    level: 4,
    lifespan: 130,
    expRequired: 1400,
    baseStats: { hp: 520, atk: 75, def: 45, strike: 22, dodge: 18, skill: 25 },
    tribulation: false,
    desc: 'Luyện Khí đại viên mãn, kinh mạch như sông lớn, chuẩn bị Trúc Cơ hóa dịch.'
  },
  {
    id: 'truc_co_so',
    name: 'Trúc Cơ Sơ Kỳ',
    stage: 'Trúc Cơ',
    level: 5,
    lifespan: 220,
    expRequired: 2500,
    baseStats: { hp: 850, atk: 120, def: 75, strike: 28, dodge: 24, skill: 38 },
    tribulation: true,
    tribulationDamage: 180,
    desc: 'Chân khí ngưng kết thành chất lỏng, đặt nền móng tiên đạo, thọ mệnh hai trăm năm.'
  },
  {
    id: 'truc_co_hau',
    name: 'Trúc Cơ Hậu Kỳ',
    stage: 'Trúc Cơ',
    level: 6,
    lifespan: 260,
    expRequired: 4200,
    baseStats: { hp: 1350, atk: 185, def: 120, strike: 36, dodge: 30, skill: 55 },
    tribulation: false,
    desc: 'Đạo cơ viên mãn, phi hành ngự kiếm tự tại, thần thức quét ngang trăm dặm.'
  },
  {
    id: 'kim_dan_so',
    name: 'Kim Đan Sơ Kỳ',
    stage: 'Kim Đan',
    level: 7,
    lifespan: 450,
    expRequired: 7500,
    baseStats: { hp: 2200, atk: 310, def: 200, strike: 48, dodge: 40, skill: 85 },
    tribulation: true,
    tribulationDamage: 450,
    desc: 'Đan điền kết kim đan, thoát khỏi phàm thai, một hạt kim đan nuốt vào bụng, mệnh ta do ta chẳng do trời.'
  },
  {
    id: 'kim_dan_vien_man',
    name: 'Kim Đan Đại Viên Mãn',
    stage: 'Kim Đan',
    level: 8,
    lifespan: 550,
    expRequired: 13000,
    baseStats: { hp: 3600, atk: 480, def: 320, strike: 62, dodge: 52, skill: 125 },
    tribulation: false,
    desc: 'Kim đan cửu chuyển tử quang rực rỡ, chuẩn bị phá đan sinh anh, xé rách lôi kiếp.'
  },
  {
    id: 'nguyen_anh_so',
    name: 'Nguyên Anh Sơ Kỳ',
    stage: 'Nguyên Anh',
    level: 9,
    lifespan: 1000,
    expRequired: 24000,
    baseStats: { hp: 6000, atk: 780, def: 520, strike: 80, dodge: 68, skill: 190 },
    tribulation: true,
    tribulationDamage: 1100,
    desc: 'Kim đan vỡ nát, ngưng sinh Nguyên Anh! Thân thể chết đi thì Nguyên Anh vẫn có thể độn thổ đoạt xá trường tồn.'
  },
  {
    id: 'nguyen_anh_vien_man',
    name: 'Nguyên Anh Đại Viên Mãn',
    stage: 'Nguyên Anh',
    level: 10,
    lifespan: 1300,
    expRequired: 42000,
    baseStats: { hp: 9800, atk: 1250, def: 850, strike: 105, dodge: 90, skill: 280 },
    tribulation: false,
    desc: 'Chưởng khống đại đạo pháp tắc một phương, cử thủ vạn linh quy phục, uy chấn bát hoang.'
  },
  {
    id: 'hoa_than_so',
    name: 'Hóa Thần Chân Quân',
    stage: 'Hóa Thần',
    level: 11,
    lifespan: 2500,
    expRequired: 75000,
    baseStats: { hp: 16000, atk: 2100, def: 1450, strike: 140, dodge: 125, skill: 420 },
    tribulation: true,
    tribulationDamage: 2600,
    desc: 'Hóa thần nhập hư, ngưng tụ pháp tướng thiên địa, giở tay nhấc chân xé rách không gian phàm giới.'
  },
  {
    id: 'do_kiep_phi_thang',
    name: 'Độ Kiếp Kỳ (Chuẩn Phi Thăng)',
    stage: 'Độ Kiếp',
    level: 12,
    lifespan: 5000,
    expRequired: 150000,
    baseStats: { hp: 28000, atk: 3600, def: 2500, strike: 195, dodge: 175, skill: 650 },
    tribulation: true,
    tribulationDamage: 6500,
    desc: 'Đỉnh phong giới này, cửu trọng thiên kiếp giáng lâm. Vượt qua liền phi thăng Tiên Giới, hóa thành chân tiên!'
  }
];

if (typeof window !== 'undefined') {
  window.REALMS = REALMS;
}
if (typeof module !== 'undefined') {
  module.exports = { REALMS };
}

