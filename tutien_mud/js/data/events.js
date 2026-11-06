// ============================================================================
// HỆ THỐNG KỲ NGỘ & SỰ KIỆN PHÂN NHÁNH (CULTIVATION ENCOUNTERS & EVENTS)
// ============================================================================

const CULTIVATION_EVENTS = [
  {
    id: 'dong_phu_tien_nhan',
    title: 'Khám Phá Cổ Động Phủ',
    minLevel: 0,
    maxLevel: 4,
    text: 'Dưới chân thác nước hùng vĩ, linh khí dâng trào dị thường. Bạn vô tình phát hiện một khe nứt ẩn sau làn nước bụi mờ, lộ ra phiến đá khắc ba chữ cổ triện [Huyền U Động], dường như là nơi tọa hóa của một vị tiền bối Luyện Khí viên mãn thuở trước.',
    choices: [
      {
        text: '【 Phá giải cấm chế tiến vào khám phá 】',
        type: 'STAT_CHECK',
        stat: 'skill',
        reqVal: 10,
        successText: 'Dựa vào ngộ tính nhạy bén, bạn tìm ra mắt trận cấm chế suy yếu và khẽ điểm một chỉ. Thạch môn ầm ầm mở ra! Bên trong động phủ có một bình đan dược cùng một thanh phi kiếm hạ phẩm phủ bụi.',
        successEffects: { exp: 120, stones: 45, addItem: 'thanh_phong_kiem' },
        failText: 'Cấm chế đột ngột phản phệ phóng ra một đạo lôi quang! Bạn né tránh không kịp, khí huyết chấn động thổ huyết lảo đảo thoái lui.',
        failEffects: { hp: -35, exp: 20 }
      },
      {
        text: '【 Cẩn thận tĩnh tọa cảm ngộ trận pháp 】',
        type: 'AUTO',
        successText: 'Bạn không mạo hiểm xông vào mà chọn ngồi xếp bằng quan sát đường vân cấm chế lưu chuyển suốt ba ngày ba đêm. Tâm thần thông suốt, ngộ tính tăng tiến rõ rệt.',
        successEffects: { skill: 6, exp: 80, lifespan: 1 }
      },
      {
        text: '【 Cẩn thận lùi lại không tham lam mạo hiểm 】',
        type: 'AUTO',
        successText: 'Bạn biết rõ tiên lộ hung hiểm, thấy bảo vật mà tâm không loạn, kiềm chế dục vọng quay về động phủ tiếp tục tu luyện, đạo tâm càng thêm kiên cố.',
        successEffects: { def: 3, hp: 30, exp: 40 }
      }
    ]
  },
  {
    id: 'linh_duoc_xich_ho',
    title: 'Kỳ Thảo & Hung Thú',
    minLevel: 1,
    maxLevel: 5,
    text: 'Trên vách đá dựng đứng của Xích Hỏa Cốc, một đóa Hỏa Diễm Chu Quả trăm năm đang tỏa ra hương thơm ngào ngạt, hồng quang lấp lánh. Tuy nhiên dưới gốc cây, một con Xích Diễm Liệt Hổ thân dài trượng rưỡi đang nằm phủ phục canh giữ, hung nhãn rực lửa nhìn chằm chằm về phía bạn.',
    choices: [
      {
        text: '【 Rút kiếm huyết chiến trảm thú đoạt quả 】',
        type: 'COMBAT',
        enemyId: 'xich_diem_ho',
        successText: 'Sau trận kịch chiến ác liệt, Liệt Hổ gục xuống vũng máu. Bạn thu hoạch nguyên vẹn Hỏa Diễm Chu Quả nuốt vào bụng, đan điền bốc cháy linh hỏa, tu vi tăng vọt!',
        successEffects: { exp: 250, atk: 5, strike: 3, addItem: 'tu_khi_dan' },
        failText: 'Bị mãnh hổ áp chế đả thương nặng nề, bạn phải chật vật thiêu đốt huyết khí đào tẩu, lãng phí mấy năm tĩnh dưỡng.'
      },
      {
        text: '【 Dùng thân pháp lướt qua dụ hổ cướp quả 】',
        type: 'STAT_CHECK',
        stat: 'dodge',
        reqVal: 14,
        successText: 'Thân hình bạn hóa thành một đạo tàn ảnh lướt sát mặt đất! Con cọp vồ hụt gầm lên giận dữ, khi nó quay đầu lại thì linh quả đã nằm gọn trong tay áo bạn, bỏ chạy mất hút.',
        successEffects: { exp: 160, dodge: 4, stones: 20 },
        failText: 'Tốc độ né tránh chưa đủ nhanh, đuôi hổ quất ngang sườn đánh bay bạn vào vách đá gãy xương, đành ôm vết thương chạy tháo mạng.',
        failEffects: { hp: -55, exp: 30 }
      },
      {
        text: '【 Tránh mũi nhọn lặng lẽ thoái lui 】',
        type: 'AUTO',
        successText: 'Nhận thấy thực lực đôi bên chênh lệch, bạn âm thầm nín thở lùi về sau rặng đá, bình an trở về tông môn.',
        successEffects: { exp: 25, def: 2 }
      }
    ]
  },
  {
    id: 'phuong_thi_dau_gia',
    title: 'Hắc Thị Đấu Giá Hội',
    minLevel: 2,
    maxLevel: 7,
    text: 'Tại ngầm phường thị dưới lòng đất Vạn Tiên Thành, một cuộc đấu giá bí mật đang diễn ra. Khói thơm mờ ảo che phủ dung mạo tu sĩ. Trên đài, một lão giả đeo mặt nạ quỷ đang gõ búa rao bán một bảo đan quý hiếm và một quyển kiếm phổ cổ xưa.',
    choices: [
      {
        text: '【 Bỏ 60 Linh Thạch mua Tụ Khí Đan & Dược Thảo 】',
        type: 'COST_CHECK',
        costItem: 'stones',
        costVal: 60,
        successText: 'Bạn thành công đấu giá được hộp linh đan tinh khiết. Uống vào đan điền ấm áp, tu vi và sinh mệnh hồi phục dồi dào.',
        successEffects: { exp: 220, hp: 80, addItem: 'tu_khi_dan' },
        failText: 'Trong túi không đủ 60 Linh Thạch, quản sự hắc thị lạnh lùng liếc nhìn bạn xua đuổi.',
        failEffects: {}
      },
      {
        text: '【 Đấu giá Trúc Cơ Cực Phẩm Đan (180 Linh Thạch) 】',
        type: 'COST_CHECK',
        costItem: 'stones',
        costVal: 180,
        successText: 'Chi ra số tiền lớn gom góp bấy lâu, bạn đoạt được hạt Trúc Cơ Đan cực phẩm tỏa hào quang ngũ sắc. Đạo cơ từ nay có bảo chứng vững vàng!',
        successEffects: { exp: 500, addItem: 'truc_co_dan' },
        failText: 'Túi càn khôn lép xẹp không đủ 180 Linh Thạch, đành trơ mắt nhìn tán tu khác mua mất bảo đan.',
        failEffects: {}
      },
      {
        text: '【 Rình rập sát phạt đoạt bảo kẻ thắng cuộc 】',
        type: 'COMBAT',
        enemyId: 'hac_y_cuop_tu',
        successText: 'Chờ đợi gã hắc y tu sĩ rời khỏi hắc thị, bạn quyết đoán xuất kích nhất kiếm xuyên tim! Đoạt lấy túi trữ vật thu hoạch linh thạch cùng chiến lợi phẩm phong phú.',
        successEffects: { stones: 140, exp: 280, atk: 6, strike: 4 },
        failText: 'Đối phương có mai phục sẵn đồng bọn! Bạn bị phản công đả thương nặng nề, suýt nữa mất mạng trong hẻm tối.'
      }
    ]
  },
  {
    id: 'cuu_my_tien_tu',
    title: 'Gặp Gỡ Băng Tuyết Đạo Lữ',
    minLevel: 2,
    maxLevel: 8,
    text: 'Dưới chân núi tuyết Phong Băng Lĩnh, bạn phát hiện một thiếu nữ dung mạo thanh lệ như tiên giáng trần mặc áo lam vân đệ tử Thanh Vân Tông. Nàng bị tà khí xâm nhập kinh mạch, sắc mặt tái nhợt ngất lịm bên gốc cổ tùng.',
    choices: [
      {
        text: '【 Tiêu hao chân nguyên thi triển diệt độc cứu người 】',
        type: 'AUTO',
        successText: 'Bạn không tiếc chân nguyên, vận chuyển tâm pháp suốt một đêm khu trục ma khí giúp nàng. Tiên tử tỉnh lại cảm kích rơi lệ, tặng bạn một chiếc nhẫn hộ mệnh và hứa hẹn cùng bạn kết thành đạo lữ luận đạo!',
        successEffects: { hp: -20, exp: 180, skill: 12, stones: 90, lifespan: 10, addItem: 'tho_nguyen_dan' }
      },
      {
        text: '【 Lợi dụng lúc nàng yếu ớt lột sạch túi càn khôn 】',
        type: 'AUTO',
        successText: 'Đạo tâm ma hóa, bạn lạnh lùng cướp sạch đan dược và linh thạch của nàng rồi biến mất trong gió tuyết. Thực lực tăng mạnh nhưng trong lòng gieo xuống một tia tâm ma nghiệp chướng.',
        successEffects: { stones: 200, exp: 250, atk: 8, def: -4 }
      },
      {
        text: '【 Bỏ mặc thị phi nhanh chóng đi ngang qua 】',
        type: 'AUTO',
        successText: 'Hồng nhan họa thủy, bạn quyết định không dính dáng ân oán tông môn, tiếp tục cất bước lên đường tu hành tịch mịch.',
        successEffects: { def: 2, exp: 30 }
      }
    ]
  },
  {
    id: 'loi_kiep_dot_pha',
    title: 'Thiên Kiếp Đột Phá Lôi Đình',
    minLevel: 4,
    maxLevel: 12,
    text: 'Tu vi đạt tới điểm cực hạn, thiên địa dị biến! Mây đen vạn dặm cuồn cuộn kéo đến đỉnh đầu, tử điện lôi đình như cự long gầm thét trong mây mù. Cửu Trọng Lôi Kiếp chuẩn bị giáng xuống thử thách đạo tâm và thân thể bạn!',
    choices: [
      {
        text: '【 Đứng ngạo nghễ rút bảo kiếm nghênh lôi kiếp 】',
        type: 'STAT_CHECK',
        stat: 'atk',
        reqVal: 70,
        successText: 'Kiếm khí ngút trời xé toạc tầng mây thứ nhất! Bạn ngạnh kháng lôi kiếp thành công, thân thể được lôi đình tôi luyện hóa thành kim cương bất hoại, chính thức phá cảnh!',
        successEffects: { exp: 800, hp: 150, atk: 25, strike: 10, lifespan: 50 },
        failText: 'Lực công kích chưa đủ để chém tan kiếp lôi! Một đạo thiên lôi đánh thẳng vào thiên linh cái khiến kinh mạch vỡ nát, tu vi tổn hao nặng nề.',
        failEffects: { hp: -160, exp: -200 }
      },
      {
        text: '【 Vận chuyển hộ giáp & trận pháp phòng ngự 】',
        type: 'STAT_CHECK',
        stat: 'def',
        reqVal: 45,
        successText: 'Hộ thân linh quang rực rỡ chặn đứng cửu đạo lôi đình giáng xuống. Hạt lôi kiếp tản ra hóa thành linh vũ gột rửa đan điền, đúc thành tiên cơ vững chắc!',
        successEffects: { exp: 650, hp: 200, def: 20, lifespan: 40 },
        failText: 'Phòng ngự bị lôi đình đánh thủng một lỗ hổng lớn! Chấn động làm vỡ nát hộ giáp, khí huyết nghịch lưu trọng thương.',
        failEffects: { hp: -120, def: -5 }
      }
    ]
  },
  {
    id: 'gap_go_ma_tu',
    title: 'Huyết Hải Ma Tu Đột Kích',
    minLevel: 4,
    maxLevel: 9,
    text: 'Một đạo huyết quang nồng nặc mùi tanh tưởi từ chân trời lao vụt tới chặn đứng lối đi của bạn. Huyết Sát Tông Chấp Sự tay cầm huyết nhận cười gằn: "Lại gặp một tiểu bối huyết nhục tươi ngon, ngoan ngoãn dâng nộp hồn phách cho Ma tôn ta!"',
    choices: [
      {
        text: '【 Trảm yêu trừ ma, quyết chiến tà tu 】',
        type: 'COMBAT',
        enemyId: 'huyet_sat_chap_su',
        successText: 'Một kiếm sắc bén trảm đứt huyết đao của ma đầu! Tà khí tan biến, bạn thu được huyết linh đan dược cùng vô số linh thạch của tông môn ma đạo.',
        successEffects: { exp: 900, stones: 260, strike: 6, addItem: 'xich_viem_dao' },
        failText: 'Huyết sát khí quá mức quỷ quyệt, bạn bị đao phong chém trúng lồng ngực trọng thương, đành đốt linh phù độn thổ chạy trốn.'
      },
      {
        text: '【 Nộp 80 Linh Thạch cầu xin bình an 】',
        type: 'COST_CHECK',
        costItem: 'stones',
        costVal: 80,
        successText: 'Ma tu cười lớn cướp lấy túi linh thạch rồi biến mất vào bóng đêm, bạn giữ được mạng sống nhưng đạo tâm mang theo nhục nhã khó phai.',
        successEffects: { exp: 30, def: 1 },
        failText: 'Trong túi không đủ 80 linh thạch để mua mạng! Ma tu nổi giận vung đao chém tới!',
        failEffects: { hp: -70 }
      }
    ]
  },
  {
    id: 'bi_canh_vien_co',
    title: 'Viễn Cổ Bí Cảnh Tranh Phong',
    minLevel: 6,
    maxLevel: 12,
    text: 'Trăm năm một lần, Thượng Cổ Chân Tiên Bí Cảnh hé mở cánh cổng thời không. Bên trong tiên khí phiêu dạt, cổ thụ chọc trời, nhưng cũng ẩn chứa vô số cơ quan diệt sát và hung thú thời thái cổ canh giữ chí bảo khai thiên.',
    choices: [
      {
        text: '【 Tiễu sát U Uyên Giao Long đoạt Long Lân Giáp 】',
        type: 'COMBAT',
        enemyId: 'doc_nhan_giao_long',
        successText: 'Sau trận đại chiến kinh thiên động địa long trời lở đất, đầu Giao Long khổng lồ rớt xuống đáy vực! Bạn lột lấy vảy rồng dệt giáp, hấp thụ long châu phá vỡ gông cùm tu vi!',
        successEffects: { exp: 6000, stones: 1600, hp: 600, def: 50, addItem: 'long_lan_chien_y' },
        failText: 'Uy áp cự long quá khủng khiếp, một đuôi quất nát hộ thân pháp bảo, bạn phải dùng bí thuật chạy trốn khỏi bí cảnh trong gang tấc.'
      },
      {
        text: '【 Lẻn vào Tàng Kinh Các tìm kiếm Tiên Pháp 】',
        type: 'STAT_CHECK',
        stat: 'skill',
        reqVal: 65,
        successText: 'Bạn vượt qua mê cung phù trận viễn cổ, mở ra chiếc rương ngọc phong ấn vạn năm, thu được bảo điển công pháp Thái Ất Kiếm Kinh tàn thiên vô giá!',
        successEffects: { exp: 3500, skill: 30, strike: 18, addItem: 'thai_at_kiem_quyet' },
        failText: 'Kích hoạt bẫy cấm chế thời thượng cổ! Luồng hỏa diễm thiêu đốt hộ giáp, bạn bỏng nặng tháo chạy.',
        failEffects: { hp: -220, exp: 100 }
      }
    ]
  }
];

if (typeof window !== 'undefined') {
  window.CULTIVATION_EVENTS = CULTIVATION_EVENTS;
}
if (typeof module !== 'undefined') {
  module.exports = { CULTIVATION_EVENTS };
}

