// ============================================================================
// CULTIVATION ENCOUNTERS & BRANCHING EVENTS
// Zero emojis, Zero em dashes.
// ============================================================================

const CULTIVATION_EVENTS = [
  {
    id: 'dong_phu_tien_nhan',
    title: 'Ancient Immortal Abode',
    minLevel: 0,
    maxLevel: 4,
    text: 'Beneath a roaring waterfall, spiritual Qi surges abnormally. You discover a hidden fissure behind mist and boulders, revealing an ancient stone tablet engraved with seal script: [Nether Seclusion Cave], seemingly the resting place of a deceased Qi Condensation elder.',
    choices: [
      {
        text: '【 Dispel the formation seal and enter 】',
        type: 'STAT_CHECK',
        stat: 'skill',
        reqVal: 10,
        successText: 'Relying on sharp comprehension, you locate the formation weak node and tap it. The stone gate rumbles open! Inside lies a bottle of pills and a pristine flying sword.',
        successEffects: { exp: 120, stones: 45, addItem: 'thanh_phong_kiem' },
        failText: 'The formation abruptly backfires with lightning! You fail to evade in time, coughing blood as you stagger backward.',
        failEffects: { hp: -35, exp: 20 }
      },
      {
        text: '【 Sit calmly and meditate on the formation lines 】',
        type: 'AUTO',
        successText: 'Instead of rushing inside, you sit cross-legged studying the formation runes for three days and nights. Your mind clears and comprehension deepens.',
        successEffects: { skill: 6, exp: 80, lifespan: 1 }
      },
      {
        text: '【 Carefully withdraw without taking unnecessary risks 】',
        type: 'AUTO',
        successText: 'Understanding the perilous nature of the Dao, you restrain worldly desire and return to your abode, fortifying your Dao heart.',
        successEffects: { def: 3, hp: 30, exp: 40 }
      }
    ]
  },
  {
    id: 'linh_duoc_xich_ho',
    title: 'Mystic Herb & Guardian Beast',
    minLevel: 1,
    maxLevel: 5,
    text: 'On a sheer cliff inside Scarlet Flame Valley, a century-old Flame Vermilion Fruit glows with ruby radiance, emitting an intoxicating aroma. Beneath the fruit tree, a Blazing Flame Tiger lies coiled in wait, glaring at you with burning eyes.',
    choices: [
      {
        text: '【 Draw your sword to slay the beast and claim the fruit 】',
        type: 'COMBAT',
        enemyId: 'xich_diem_ho',
        successText: 'After a ferocious clash, the flame tiger falls in a pool of blood. You harvest the intact Vermilion Fruit and swallow it, spiritual fire igniting your dantian!',
        successEffects: { exp: 250, atk: 5, strike: 3, addItem: 'tu_khi_dan' },
        failText: 'Overwhelmed by the tiger brutal strength, you barely escape with severe burns, wasting years convalescing.'
      },
      {
        text: '【 Use evasive footwork to bait the tiger and snatch the fruit 】',
        type: 'STAT_CHECK',
        stat: 'dodge',
        reqVal: 14,
        successText: 'Your figure blurs into an afterimage skimming the ground! The tiger misses with an enraged roar. By the time it turns around, the fruit is in your robe as you vanish.',
        successEffects: { exp: 160, dodge: 4, stones: 20 },
        failText: 'Your footwork is half a step too slow! The tiger tail whips across your ribs like an iron staff, sending you crashing into rocks.',
        failEffects: { hp: -55, exp: 30 }
      },
      {
        text: '【 Avoid the threat and quietly retreat 】',
        type: 'AUTO',
        successText: 'Recognizing the dangerous odds, you hold your breath and slip behind the ridgeline, returning safely to your sect.',
        successEffects: { exp: 25, def: 2 }
      }
    ]
  },
  {
    id: 'phuong_thi_dau_gia',
    title: 'Black Market Auction',
    minLevel: 2,
    maxLevel: 7,
    text: 'Deep underground beneath Myriad Immortals City, a clandestine auction is underway. Incense mist conceals the faces of cloaked cultivators. An auctioneer wearing a ghost mask strikes his mallet, showcasing rare elixirs and ancient scriptures.',
    choices: [
      {
        text: '【 Spend 60 Spirit Stones for Qi Gathering Pills & Herbs 】',
        type: 'COST_CHECK',
        costItem: 'stones',
        costVal: 60,
        successText: 'You successfully bid on a batch of pure spirit elixirs. Swallowing them warms your dantian, replenishing cultivation and vital energy.',
        successEffects: { exp: 220, hp: 80, addItem: 'tu_khi_dan' },
        failText: 'You lack 60 Spirit Stones in your pouch. The market guards cast a cold, mocking glare and shoo you away.',
        failEffects: {}
      },
      {
        text: '【 Bid for Supreme Foundation Pill (180 Spirit Stones) 】',
        type: 'COST_CHECK',
        costItem: 'stones',
        costVal: 180,
        successText: 'Spending a fortune accumulated over years, you acquire the radiant Five-Color Foundation Pill. Your Dao foundation is now securely guaranteed!',
        successEffects: { exp: 500, addItem: 'truc_co_dan' },
        failText: 'Your pouch is empty. You can only watch helplessly as a rival rogue cultivator snatches the prize.',
        failEffects: {}
      },
      {
        text: '【 Ambush the winning bidder in the dark alleys 】',
        type: 'COMBAT',
        enemyId: 'hac_y_cuop_tu',
        successText: 'Waiting for the cloaked bidder to enter a shadowed alley, you execute a decisive strike! You seize his storage pouch, reaping hefty spirit stones and loot.',
        successEffects: { stones: 140, exp: 280, atk: 6, strike: 4 },
        failText: 'The opponent had hidden accomplices! Ambushed in return, you barely escape with your life into the sewers.'
      }
    ]
  },
  {
    id: 'cuu_my_tien_tu',
    title: 'Encounter with Frost Maiden',
    minLevel: 2,
    maxLevel: 8,
    text: 'At the foot of the glacial Windfrost Range, you discover a maiden of ethereal grace lying unconscious beneath an ancient pine tree, wearing Azure Cloud Sect robes. Toxic miasma has invaded her meridians.',
    choices: [
      {
        text: '【 Expend genuine Qi to purge the venom and rescue her 】',
        type: 'AUTO',
        successText: 'Channeling your genuine Qi through the night, you successfully expel the demonic toxin. Awakening in tears of gratitude, the maiden gifts you an heirloom longevity elixir and vows to discuss the Dao with you!',
        successEffects: { hp: -20, exp: 180, skill: 12, stones: 90, lifespan: 10, addItem: 'tho_nguyen_dan' }
      },
      {
        text: '【 Take advantage of her weakness to loot her storage pouch 】',
        type: 'AUTO',
        successText: 'Giving in to temptation, you strip her storage pouch of pills and spirit stones before disappearing into the blizzard. Power gained, but a subtle karmic demon is planted in your soul.',
        successEffects: { stones: 200, exp: 250, atk: 8, def: -4 }
      },
      {
        text: '【 Ignore worldly entanglements and walk away 】',
        type: 'AUTO',
        successText: 'Knowing that beauty brings calamity, you choose not to involve yourself in sect vendettas and continue along your solitary path.',
        successEffects: { def: 2, exp: 30 }
      }
    ]
  },
  {
    id: 'loi_kiep_dot_pha',
    title: 'Celestial Lightning Tribulation',
    minLevel: 4,
    maxLevel: 12,
    text: 'Your cultivation hits a bottleneck, triggering celestial phenomena! Dark clouds stretch for thousands of leagues overhead as purple lightning dragons roar in the tempest. The Ninefold Lightning Tribulation descends to test your Dao foundation!',
    choices: [
      {
        text: '【 Unsheathe your sword to face the heavenly thunder head-on 】',
        type: 'STAT_CHECK',
        stat: 'atk',
        reqVal: 70,
        successText: 'Surging sword Qi tears open the first layer of clouds! You withstand the lightning brunt, your physique tempered into diamond-like resilience as you break through!',
        successEffects: { exp: 800, hp: 150, atk: 25, strike: 10, lifespan: 50 },
        failText: 'Your attack cannot dispel the tribulation thunder! A lightning bolt strikes your crown, fracturing meridians and heavily depleting cultivation.',
        failEffects: { hp: -160, exp: -200 }
      },
      {
        text: '【 Channel defensive armor and protective array talismans 】',
        type: 'STAT_CHECK',
        stat: 'def',
        reqVal: 45,
        successText: 'Resplendent defensive halos deflect the nine falling bolts. Dispersed lightning essence transforms into spirit rain, washing your dantian with immortal grace!',
        successEffects: { exp: 650, hp: 200, def: 20, lifespan: 40 },
        failText: 'Your defenses are punctured by the tribulation! The shockwave shatters your armor, leaving internal injuries.',
        failEffects: { hp: -120, def: -5 }
      }
    ]
  },
  {
    id: 'gap_go_ma_tu',
    title: 'Blood Demon Ambush',
    minLevel: 4,
    maxLevel: 9,
    text: 'A pungent crimson light streaks from the horizon, blocking your mountain path. A Blood Shadow Sect Deacon sneers with a curved blood blade: "Another morsel of fresh flesh and soul. Surrender your spiritual roots to my cauldron!"',
    choices: [
      {
        text: '【 Slay the fiend and eradicate evil 】',
        type: 'COMBAT',
        enemyId: 'huyet_sat_chap_su',
        successText: 'A razor-sharp thrust cleaves the demon blood blade in two! Demonic miasma disperses, leaving behind elixirs and a pouch of spirit stones.',
        successEffects: { exp: 900, stones: 260, strike: 6, addItem: 'xich_viem_dao' },
        failText: 'The demonic blood aura is insidiously fierce. Slashed across the chest, you ignite an escape talisman to burrow into the earth.'
      },
      {
        text: '【 Offer 80 Spirit Stones to plead for safe passage 】',
        type: 'COST_CHECK',
        costItem: 'stones',
        costVal: 80,
        successText: 'The demon laughs maliciously, snatching the stones before melting into shadows. You survived, though your Dao pride suffers a bitter stain.',
        successEffects: { exp: 30, def: 1 },
        failText: 'You do not even have 80 stones to spare! Infuriated, the demon slashes wildly at you!',
        failEffects: { hp: -70 }
      }
    ]
  },
  {
    id: 'bi_canh_vien_co',
    title: 'Primordial Immortal Realm Expedition',
    minLevel: 6,
    maxLevel: 12,
    text: 'Once every century, the Primordial Immortal Realm cracks open its temporal gate. Immense celestial Qi flows through towering ancient trees, yet treacherous killing traps and primordial beasts guard the ascension treasures.',
    choices: [
      {
        text: '【 Slay the Abyssal Drake to forge Dragon Scale Armor 】',
        type: 'COMBAT',
        enemyId: 'doc_nhan_giao_long',
        successText: 'After an earth-shattering battle, the colossal drake head plunges into the abyss! You harvest its scales to weave armor and absorb its dragon pearl, breaking cultivation limits!',
        successEffects: { exp: 6000, stones: 1600, hp: 600, def: 50, addItem: 'long_lan_chien_y' },
        failText: 'The draconic aura is overwhelming. A tail swipe shatters your talismans, forcing you to execute an emergency escape art.'
      },
      {
        text: '【 Infiltrate the Scripture Pavilion to seek Immortal Arts 】',
        type: 'STAT_CHECK',
        stat: 'skill',
        reqVal: 65,
        successText: 'Navigating through ancient maze formations, you unlock a jade chest sealed for ten millennia, claiming the priceless Taiyi Sword Canon Fragment!',
        successEffects: { exp: 3500, skill: 30, strike: 18, addItem: 'thai_at_kiem_quyet' },
        failText: 'You trigger an ancient fire trap! Scorching flames singe your garments and skin, driving you out in retreat.',
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
