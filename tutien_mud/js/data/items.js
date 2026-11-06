// ============================================================================
// HỆ THỐNG TRANG BỊ, ĐAN DƯỢC & CÔNG PHÁP (ITEMS & MANUALS)
// ============================================================================

const ITEMS_CATALOG = {
  // ── PHÁP KHÍ & VŨ KHÍ ──
  thiet_kiem: {
    id: 'thiet_kiem',
    name: 'Thiết Kiếm Phàm Phẩm',
    type: 'WEAPON',
    tier: 'Phàm Phẩm',
    stats: { atk: 6, strike: 2 },
    price: 15,
    desc: 'Thanh kiếm sắt của thợ rèn nhân gian, lưỡi kiếm sáng loáng nhưng chưa dung nhập linh khí.'
  },
  thanh_phong_kiem: {
    id: 'thanh_phong_kiem',
    name: 'Thanh Phong Kiếm',
    type: 'WEAPON',
    tier: 'Hạ Phẩm Pháp Khí',
    stats: { atk: 18, strike: 6, dodge: 4 },
    price: 65,
    desc: 'Kiếm khắc phong linh trận, vung lên tựa gió mát lướt qua, tăng độ linh hoạt khi xuất chiêu.'
  },
  xich_viem_dao: {
    id: 'xich_viem_dao',
    name: 'Xích Viêm Liệt Hỏa Đao',
    type: 'WEAPON',
    tier: 'Trung Phẩm Pháp Khí',
    stats: { atk: 38, strike: 12 },
    price: 160,
    desc: 'Được rèn từ quặng xích thiết dưới đáy núi lửa, đao phong mang theo liệt diễm thiêu đốt kẻ địch.'
  },
  tu_dien_loi_kiem: {
    id: 'tu_dien_loi_kiem',
    name: 'Tử Điện Lôi Đình Kiếm',
    type: 'WEAPON',
    tier: 'Thượng Phẩm Pháp Bảo',
    stats: { atk: 85, strike: 22, skill: 15 },
    price: 450,
    desc: 'Dẫn dụ lôi đình cửu thiên tôi luyện ngàn năm, mỗi nhát chém bộc phát sét tím làm tê liệt đối thủ.'
  },
  hu_khong_tram_linh: {
    id: 'hu_khong_tram_linh',
    name: 'Hư Không Trảm Linh Kiếm',
    type: 'WEAPON',
    tier: 'Cực Phẩm Tiên Khí',
    stats: { atk: 220, strike: 45, skill: 35, dodge: 20 },
    price: 1500,
    desc: 'Kiếm phong xé rách không gian phàm trần, vô thị 40% hộ giáp đối phương, trảm đoạn thần hồn.'
  },

  // ── HỘ GIÁP ──
  dao_bao_to_y: {
    id: 'dao_bao_to_y',
    name: 'Đạo Bào Thanh Vân',
    type: 'ARMOR',
    tier: 'Hạ Phẩm Pháp Khí',
    stats: { hp: 80, def: 12, dodge: 3 },
    price: 50,
    desc: 'Áo đạo bào dệt từ linh tơ mỏng nhẹ, có tác dụng giảm nhẹ ngoại lực chấn động.'
  },
  huyen_thiet_giap: {
    id: 'huyen_thiet_giap',
    name: 'Huyền Thiết Tỏa Tử Giáp',
    type: 'ARMOR',
    tier: 'Trung Phẩm Pháp Khí',
    stats: { hp: 180, def: 28 },
    price: 140,
    desc: 'Khảm từ vảy huyền thiết đáy biển sâu, cứng rắn khôn cùng, bảo vệ lồng ngực khỏi đòn trí mạng.'
  },
  long_lan_chien_y: {
    id: 'long_lan_chien_y',
    name: 'Xích Long Lân Giáp',
    type: 'ARMOR',
    tier: 'Thượng Phẩm Pháp Bảo',
    stats: { hp: 550, def: 75, dodge: 10 },
    price: 520,
    desc: 'Dệt từ vảy giao long ngàn năm, tỏa ra long uy áp chế yêu thú sơ cấp, phòng thủ kiên cố.'
  },

  // ── ĐAN DƯỢC & BẢO VẬT ──
  kim_sang_duoc: {
    id: 'kim_sang_duoc',
    name: 'Kim Sang Dược',
    type: 'CONSUMABLE',
    tier: 'Phổ Thông',
    effect: { healHp: 150 },
    price: 20,
    desc: 'Dược phấn cầm máu trị thương của phàm trần, lập tức hồi phục 150 điểm Khí Huyết.'
  },
  tu_khi_dan: {
    id: 'tu_khi_dan',
    name: 'Tụ Khí Đan',
    type: 'CONSUMABLE',
    tier: 'Hạ Phẩm Đan',
    effect: { addExp: 120 },
    price: 45,
    desc: 'Đan dược cơ bản của Luyện Khí tu sĩ, hấp thụ nhanh chóng chuyển hóa thành 120 điểm Tu Vi.'
  },
  truc_co_dan: {
    id: 'truc_co_dan',
    name: 'Trúc Cơ Cực Phẩm Đan',
    type: 'CONSUMABLE',
    tier: 'Cực Phẩm Đan',
    effect: { addExp: 600, guaranteeBreakthrough: true },
    price: 320,
    desc: 'Bảo đan bảo hộ tâm mạch khi đúc thành Đạo Cơ, xóa bỏ nguy cơ tẩu hỏa nhập ma khi đột phá Trúc Cơ.'
  },
  tho_nguyen_dan: {
    id: 'tho_nguyen_dan',
    name: 'Trường Thọ Đan',
    type: 'CONSUMABLE',
    tier: 'Bảo Đan',
    effect: { addLifespan: 25 },
    price: 220,
    desc: 'Luyện chế từ Bách Niên Linh Chi, kéo dài thêm 25 năm thọ mệnh quý giá cho tu sĩ.'
  },
  cuu_chuyen_hoan_hon: {
    id: 'cuu_chuyen_hoan_hon',
    name: 'Cửu Chuyển Hoàn Hồn Đan',
    type: 'CONSUMABLE',
    tier: 'Thần Đan',
    effect: { healHpPercent: 1.0, addExp: 1500 },
    price: 850,
    desc: 'Khởi tử hồi sinh bảo đan, lập tức hồi phục 100% Khí Huyết và tăng mạnh 1500 điểm Tu Vi.'
  },

  // ── CÔNG PHÁP & BÍ TỊCH ──
  truong_sinh_quyet: {
    id: 'truong_sinh_quyet',
    name: 'Trường Sinh Thổ Nạp Quyết',
    type: 'MANUAL',
    tier: 'Hoàng Giai Thượng Phẩm',
    stats: { hp: 100, def: 15 },
    passiveText: 'Khí tức kéo dài, mỗi năm tu luyện nhận thêm 15% tu vi tĩnh tọa.',
    price: 180,
    desc: 'Công pháp đạo môn chính tông chú trọng dưỡng khí bồi bổ căn bản, tăng thọ nguyên vững chắc.'
  },
  thai_at_kiem_quyet: {
    id: 'thai_at_kiem_quyet',
    name: 'Thái Ất Kiếm Kinh Tàn Thiên',
    type: 'MANUAL',
    tier: 'Huyền Giai Trung Phẩm',
    stats: { atk: 45, strike: 18 },
    passiveText: 'Kiếm khí tung hoành: Trong chiến đấu có 25% tỷ lệ tung thêm một đạo kiếm khí kích hoạt kép.',
    price: 380,
    desc: 'Tàn chương kiếm phổ của Thái Ất Kiếm Tông cổ xưa, chú trọng tốc độ và sát thương tuyệt đối.'
  },
  bat_hoang_du_long: {
    id: 'bat_hoang_du_long',
    name: 'Bát Hoang Du Long Thân Pháp',
    type: 'MANUAL',
    tier: 'Địa Giai Hạ Phẩm',
    stats: { dodge: 30, skill: 20 },
    passiveText: 'Thân tựa du long, né tránh thành công sẽ lập tức phản kích gây 50% sát thương đòn đánh.',
    price: 650,
    desc: 'Bộ pháp huyền diệu mô phỏng giao long uốn lượn chín tầng mây, quỷ dị khó lường.'
  }
};

if (typeof window !== 'undefined') {
  window.ITEMS_CATALOG = ITEMS_CATALOG;
}
if (typeof module !== 'undefined') {
  module.exports = { ITEMS_CATALOG };
}

