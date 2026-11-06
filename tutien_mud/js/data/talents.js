// ============================================================================
// HỆ THỐNG XUẤT THÂN, LINH CĂN & THIÊN PHÚ LUÂN HỒI
// ============================================================================

const BACKGROUNDS = [
  {
    id: 'han_mon_tan_tu',
    name: 'Hàn Môn Tán Tu',
    rarity: 'common',
    desc: 'Sinh ra trong gia đình phàm nhân nghèo khó, vô tình nhặt được nửa cuốn thổ nạp tâm pháp rách nát.',
    bonus: { exp: 50, stones: 20, atk: 2, def: 2 }
  },
  {
    id: 'son_thon_tho_san',
    name: 'Thợ Săn Rừng Sâu',
    rarity: 'common',
    desc: 'Lớn lên trên vách núi hoang sơ, thường xuyên tranh đấu cùng dã thú, thân thể dẻo dai linh hoạt.',
    bonus: { hp: 40, dodge: 4, strike: 3, stones: 15 }
  },
  {
    id: 'gia_toc_chi_thu',
    name: 'Con Thứ Tu Chân Gia Tộc',
    rarity: 'rare',
    desc: 'Là huyết mạch thứ xuất trong tiểu gia tộc, tuy không được sủng ái nhưng được tiếp xúc đan dược từ bé.',
    bonus: { stones: 80, skill: 5, atk: 4 }
  },
  {
    id: 'ma_mon_co_nhi',
    name: 'Ma Môn Dị Tộc Cô Nhi',
    rarity: 'rare',
    desc: 'Sống sót từ đống thi hài của một ma tông bị tiêu diệt, mang trong mình oán khí và sát phạt quyết đoán.',
    bonus: { atk: 8, strike: 6, hp: -20, stones: 40 }
  },
  {
    id: 'chuyen_the_chan_nhan',
    name: 'Đại Năng Luân Hồi Tái Thế',
    rarity: 'legendary',
    desc: 'Kiếp trước từng là chí tôn một phương vẫn lạc, chân linh bảo lưu một tia ký ức tàn khuyết huyền diệu.',
    bonus: { skill: 15, strike: 10, dodge: 8, stones: 150, exp: 200 }
  }
];

const SPIRIT_ROOTS = [
  {
    id: 'ngu_hanh_tap_can',
    name: 'Ngũ Hành Tạp Linh Căn',
    rarity: 'Phế Phẩm',
    color: '#8b8b8b',
    cultivationRate: 0.8,
    desc: 'Kim Mộc Thủy Hỏa Thổ hỗn tạp, hấp thụ linh khí chậm chạp, gian nan chồng chất.'
  },
  {
    id: 'tam_linh_can',
    name: 'Tam Linh Căn',
    rarity: 'Bình Phàm',
    color: '#4ade80',
    cultivationRate: 1.0,
    desc: 'Ba hệ linh căn tương sinh, tư chất phổ thông trong giới tu tiên, cần cù bù thông minh.'
  },
  {
    id: 'song_linh_can',
    name: 'Chân Linh Căn (Song Căn)',
    rarity: 'Ưu Tú',
    color: '#60a5fa',
    cultivationRate: 1.35,
    desc: 'Hai dòng linh căn tinh thuần, hấp thụ thiên địa linh khí thần tốc, được môn phái xem trọng.'
  },
  {
    id: 'thien_linh_can',
    name: 'Thiên Linh Căn (Đơn Căn Tinh Thuần)',
    rarity: 'Tuyệt Đỉnh',
    color: '#c084fc',
    cultivationRate: 1.85,
    desc: 'Độc nhất vô nhị một hệ linh căn thuần khiết, đột phá không có bình cảnh nhỏ, thiên kiêu chi tử.'
  },
  {
    id: 'bien_di_loi_can',
    name: 'Biến Dị Lôi Linh Căn',
    rarity: 'Huyền Thoại',
    color: '#facc15',
    cultivationRate: 2.2,
    bonusAtk: 18,
    bonusStrike: 12,
    desc: 'Chưởng khống thiên kiếp lôi đình, lực công kích nghịch thiên, có khả năng giảm sát thương thiên kiếp.'
  }
];

const TALENTS = [
  {
    id: 'khi_van_chi_tu',
    name: 'Khí Vận Chi Tử',
    tier: 'Thần Phẩm',
    cost: 50,
    desc: 'Vận may cực lớn khi du ngoạn thiên hạ, tỷ lệ gặp kỳ ngộ bảo tàng tăng 40%, giảm nguy cơ tao ngộ tuyệt cảnh.',
    effect: { luckBonus: 40 }
  },
  {
    id: 'kiem_tam_thong_minh',
    name: 'Kiếm Tâm Thông Minh',
    tier: 'Tiên Phẩm',
    cost: 35,
    desc: 'Trời sinh hòa hợp với kiếm đạo. Tăng 25% sát thương tấn công và +15% tỷ lệ Bạo Kích chí mạng.',
    effect: { atkMult: 1.25, strike: 15 }
  },
  {
    id: 'bat_diet_kim_than',
    name: 'Bất Diệt Kim Thân',
    tier: 'Tiên Phẩm',
    cost: 40,
    desc: 'Thịt gân rèn như thép nguội, tăng +120 Khí Huyết cơ bản và +30% chỉ số Phòng Ngự toàn diện.',
    effect: { hp: 120, defMult: 1.30 }
  },
  {
    id: 'dan_dao_tong_su',
    name: 'Đan Đạo Tông Sư',
    tier: 'Cực Phẩm',
    cost: 30,
    desc: 'Hiểu rõ dược lý vạn vật, hiệu quả sử dụng mọi loại đan dược hồi phục và tăng tu vi tăng thêm 60%.',
    effect: { potionEffect: 1.6 }
  },
  {
    id: 'thon_phe_ma_cong',
    name: 'Thôn Phệ Bí Điển',
    tier: 'Cực Phẩm',
    cost: 35,
    desc: 'Mỗi khi tiêu diệt yêu thú hoặc tu sĩ đối địch, lập tức hấp thu 20% sinh mệnh và tích lũy thêm tu vi.',
    effect: { lifesteal: 0.20, killExpBonus: 25 }
  },
  {
    id: 'tien_nhan_ho_the',
    name: 'Tiên Nhân Hộ Thể',
    tier: 'Thần Phẩm',
    cost: 60,
    desc: 'Tỷ lệ chống chịu thiên lôi khi độ kiếp tăng vọt, nhận một cơ hội miễn tử một lần mỗi kiếp sống.',
    effect: { revive: 1, tribulationResist: 0.35 }
  },
  {
    id: 'dao_lu_dong_tam',
    name: 'Thiên Duyên Đạo Lữ',
    tier: 'Thượng Phẩm',
    cost: 25,
    desc: 'Dễ dàng kết duyên cùng thiên kiêu tiên tử/đạo hữu, tăng 20% tốc độ tu luyện qua hình thức song tu.',
    effect: { cultRateBonus: 0.20 }
  },
  {
    id: 'ngo_tinh_tuyet_dinh',
    name: 'Ngộ Tính Tuyệt Đỉnh',
    tier: 'Thượng Phẩm',
    cost: 20,
    desc: 'Lĩnh ngộ công pháp thần tốc, chỉ số Kỹ Năng / Ngộ Tính cơ bản tăng vĩnh viễn +35 điểm.',
    effect: { skill: 35 }
  }
];

if (typeof window !== 'undefined') {
  window.BACKGROUNDS = BACKGROUNDS;
  window.SPIRIT_ROOTS = SPIRIT_ROOTS;
  window.TALENTS = TALENTS;
}
if (typeof module !== 'undefined') {
  module.exports = { BACKGROUNDS, SPIRIT_ROOTS, TALENTS };
}

