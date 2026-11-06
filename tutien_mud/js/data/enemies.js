// ============================================================================
// HỆ THỐNG YÊU THÚ & ĐỐI THỦ TU TIÊN (ENEMIES & BOSSES)
// ============================================================================

const ENEMIES_CATALOG = {
  // ── PHÀM TRẦN & LUYỆN KHÍ KỲ ──
  hac_lang_vuong: {
    id: 'hac_lang_vuong',
    name: 'Hắc Phong Lang Vương',
    title: 'Nhất Giai Hạ Phẩm Yêu Thú',
    realm: 'Luyện Khí Tầng 1',
    hp: 140, maxHp: 140,
    atk: 18, def: 8, strike: 10, dodge: 12, skill: 8,
    dropExp: 65, dropStones: 12,
    dropItem: 'kim_sang_duoc',
    specialSkill: { name: 'Lang Vương Cắn Xé', chance: 0.25, dmgMult: 1.35 },
    desc: 'Lang vương hung hãn trong rừng thẳm, móng vuốt sắc bén chứa nọc độc nhẹ.'
  },
  xich_diem_ho: {
    id: 'xich_diem_ho',
    name: 'Xích Diễm Liệt Hổ',
    title: 'Nhất Giai Trung Phẩm Yêu Thú',
    realm: 'Luyện Khí Tầng 3',
    hp: 260, maxHp: 260,
    atk: 36, def: 18, strike: 15, dodge: 8, skill: 12,
    dropExp: 140, dropStones: 28,
    dropItem: 'tu_khi_dan',
    specialSkill: { name: 'Hỏa Diễm Liệt Bạo', chance: 0.30, dmgMult: 1.45 },
    desc: 'Hổ lửa sinh sống gần miệng núi lửa, quanh thân bốc cháy linh hỏa thiêu rụi kinh mạch.'
  },
  hac_y_cuop_tu: {
    id: 'hac_y_cuop_tu',
    name: 'Hắc Y Đao Tán Tu',
    title: 'Hắc Phong Trại Kiếp Phỉ',
    realm: 'Luyện Khí Tầng 6',
    hp: 420, maxHp: 420,
    atk: 54, def: 28, strike: 20, dodge: 15, skill: 20,
    dropExp: 260, dropStones: 65,
    dropItem: 'thanh_phong_kiem',
    specialSkill: { name: 'Đoạt Mệnh Quỷ Trảm', chance: 0.28, dmgMult: 1.50 },
    desc: 'Tán tu sa vào ma đạo chuyên chặn đường đoạt bảo của tu sĩ độc hành.'
  },
  bach_ngoc_mang: {
    id: 'bach_ngoc_mang',
    name: 'Bạch Ngọc Mãng Xà Tinh',
    title: 'Nhất Giai Đỉnh Phong Xà Yêu',
    realm: 'Luyện Khí Tầng 9',
    hp: 650, maxHp: 650,
    atk: 78, def: 42, strike: 24, dodge: 22, skill: 30,
    dropExp: 480, dropStones: 110,
    dropItem: 'truc_co_dan',
    specialSkill: { name: 'Hàn Băng Thổ Tức', chance: 0.35, dmgMult: 1.60 },
    desc: 'Mãng xà thân trắng như ngọc, thở ra hơi lạnh đóng băng máu thịt, bảo hộ linh quả quý giá.'
  },

  // ── TRÚC CƠ KỲ ──
  huyet_sat_chap_su: {
    id: 'huyet_sat_chap_su',
    name: 'Huyết Sát Tông Chấp Sự',
    title: 'Trúc Cơ Sơ Kỳ Ma Tu',
    realm: 'Trúc Cơ Sơ Kỳ',
    hp: 1100, maxHp: 1100,
    atk: 135, def: 80, strike: 32, dodge: 25, skill: 45,
    dropExp: 850, dropStones: 220,
    dropItem: 'xich_viem_dao',
    specialSkill: { name: 'Huyết Sát Huyết Đao', chance: 0.32, dmgMult: 1.65, lifesteal: 0.25 },
    desc: 'Chấp sự ma môn luyện chế huyết phách nhân gian, xuất chiêu khát máu cuồng bạo.'
  },
  doc_giac_cu_te: {
    id: 'doc_giac_cu_te',
    name: 'Thiết Giáp Độc Giác Tê',
    title: 'Nhị Giai Cực Phẩm Thú Vương',
    realm: 'Trúc Cơ Hậu Kỳ',
    hp: 1950, maxHp: 1950,
    atk: 195, def: 150, strike: 25, dodge: 12, skill: 50,
    dropExp: 1600, dropStones: 380,
    dropItem: 'huyen_thiet_giap',
    specialSkill: { name: 'Man Hoang Liệt Địa Xung', chance: 0.30, dmgMult: 1.80 },
    desc: 'Lớp da dày như sắt nung, sừng nhọn đâm thủng pháp bảo hộ thân của tu sĩ bình thường.'
  },

  // ── KIM ĐAN KỲ ──
  xich_huyet_kiem_ma: {
    id: 'xich_huyet_kiem_ma',
    name: 'Xích Huyết Kiếm Ma',
    title: 'Kim Đan Kiếm Đạo Cường Giả',
    realm: 'Kim Đan Sơ Kỳ',
    hp: 3400, maxHp: 3400,
    atk: 340, def: 210, strike: 55, dodge: 45, skill: 95,
    dropExp: 3200, dropStones: 750,
    dropItem: 'tu_dien_loi_kiem',
    specialSkill: { name: 'Vạn Kiếm Quy Tông (Ma Hóa)', chance: 0.38, dmgMult: 2.0 },
    desc: 'Từng là kiếm tiên chính phái, vì tẩu hỏa nhập ma mà sát phạt ngập trời, kiếm ý lạnh thấu xương.'
  },
  doc_nhan_giao_long: {
    id: 'doc_nhan_giao_long',
    name: 'U Uyên Độc Nhãn Giao Long',
    title: 'Tam Giai Thủy Tộc Thú Hoàng',
    realm: 'Kim Đan Đại Viên Mãn',
    hp: 5500, maxHp: 5500,
    atk: 520, def: 350, strike: 65, dodge: 50, skill: 135,
    dropExp: 5500, dropStones: 1400,
    dropItem: 'long_lan_chien_y',
    specialSkill: { name: 'Thương Long Diệt Thế Ba', chance: 0.40, dmgMult: 2.20 },
    desc: 'Giao long ngàn năm chìm dưới vực xoáy sâu thẳm, chỉ còn một bước là lột xác hóa rồng thiên cổ.'
  },

  // ── NGUYÊN ANH KỲ ──
  van_doc_ma_quan: {
    id: 'van_doc_ma_quan',
    name: 'Vạn Độc Lão Ma',
    title: 'Nguyên Anh Sơ Kỳ Lão Quái',
    realm: 'Nguyên Anh Sơ Kỳ',
    hp: 9200, maxHp: 9200,
    atk: 850, def: 560, strike: 85, dodge: 70, skill: 210,
    dropExp: 11000, dropStones: 3000,
    dropItem: 'hu_khong_tram_linh',
    specialSkill: { name: 'Hóa Cốt U Minh Độc Chưởng', chance: 0.42, dmgMult: 2.35 },
    desc: 'Lão quái sống hơn nghìn năm trong đầm lầy Vạn Độc, thần hồn bất tử, độc chưởng tan chảy vàng đá.'
  },

  // ── ĐỘ KIẾP & THIÊN MA ĐỈNH CAO ──
  thao_thiet_thuong_co: {
    id: 'thao_thiet_thuong_co',
    name: 'Thao Thiết Hung Thú Cổ Đại',
    title: 'Viễn Cổ Tứ Đại Hung Thú',
    realm: 'Độ Kiếp Kỳ (Đỉnh Phong)',
    hp: 36000, maxHp: 36000,
    atk: 4200, def: 2800, strike: 220, dodge: 180, skill: 750,
    dropExp: 50000, dropStones: 15000,
    dropItem: 'cuu_chuyen_hoan_hon',
    specialSkill: { name: 'Thôn Phệ Vạn Vật (Diệt Giới)', chance: 0.45, dmgMult: 2.80, lifesteal: 0.30 },
    desc: 'Hung thú viễn cổ từ thuở khai thiên lập địa, há miệng nuốt chửng linh mạch nhật nguyệt, ngăn cản con đường phi thăng.'
  }
};

if (typeof window !== 'undefined') {
  window.ENEMIES_CATALOG = ENEMIES_CATALOG;
}
if (typeof module !== 'undefined') {
  module.exports = { ENEMIES_CATALOG };
}

