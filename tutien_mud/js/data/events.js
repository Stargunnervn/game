// ============================================================================
// EXPANDED CULTIVATION ENCOUNTERS & BRANCHING EVENTS (40+ DIVERSE EVENTS)
// Zero emojis, Zero em dashes.
// ============================================================================

const CULTIVATION_EVENTS = [
  // ──────────────────────────────────────────────────────────────────────────
  // LEVEL 0 - 4: MORTAL & QI CONDENSATION
  // ──────────────────────────────────────────────────────────────────────────
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
    minLevel: 0,
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
    minLevel: 0,
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
    minLevel: 0,
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
    id: 'thao_duoc_hac_dam',
    title: 'Poison Mist Swamp Herb Gathering',
    minLevel: 0,
    maxLevel: 3,
    text: 'A thick emerald fog envelops the Black Swamp. You spot three stalks of rare Ghost-Face Ginseng rooted atop an island of floating bones. Hissing sounds echo beneath the murky waters.',
    choices: [
      {
        text: '【 Hold breath and swiftly dart across to harvest herbs 】',
        type: 'STAT_CHECK',
        stat: 'dodge',
        reqVal: 10,
        successText: 'Skimming across bone debris like a dragonfly on water, you pluck the ginseng before the swamp serpents can strike!',
        successEffects: { exp: 90, stones: 35, addItem: 'kim_sang_duoc' },
        failText: 'You inhale toxic vapors and stagger into muddy waters, barely pulling yourself out before leeching worms swarm.',
        failEffects: { hp: -30, exp: 15 }
      },
      {
        text: '【 Use protective Qi to burn away the surrounding miasma 】',
        type: 'STAT_CHECK',
        stat: 'atk',
        reqVal: 18,
        successText: 'Your genuine Qi ignites into blazing heat, vaporizing the toxic fog in a twenty-pace circle and securing the herbs safely.',
        successEffects: { exp: 110, atk: 2, stones: 25 },
        failText: 'Your Qi reserve is too shallow to sustain the blaze. The toxic fog smothers your flames and singes your throat.',
        failEffects: { hp: -25, exp: 10 }
      }
    ]
  },
  {
    id: 'kiem_y_thach_bich',
    title: 'Ancient Clifftop Sword Inscription',
    minLevel: 0,
    maxLevel: 5,
    text: 'High upon Mount Swordcrest, nine deep gouges are carved into an obsidian precipice. Passing breezes whistle through the grooves with sharp, resonant sword hums that stir your spiritual sense.',
    choices: [
      {
        text: '【 Focus divine sense to comprehend the sword intent 】',
        type: 'STAT_CHECK',
        stat: 'skill',
        reqVal: 14,
        successText: 'An illusion of an ancient swordsman manifests in your consciousness! You decipher the hidden sword rhythm, drastically sharpening your combat instincts.',
        successEffects: { skill: 10, atk: 8, strike: 6, exp: 150 },
        failText: 'The residual sword intent is too tyrannical for your mind. A mental backlash leaves your temples throbbing in agony.',
        failEffects: { hp: -40, exp: 30 }
      },
      {
        text: '【 Trace the physical grooves with your weapon 】',
        type: 'AUTO',
        successText: 'You carefully trace each sword notch with your blade. Though you cannot grasp the profound Dao, the kinetic rhythm improves your balance.',
        successEffects: { atk: 4, def: 2, exp: 70 }
      }
    ]
  },
  {
    id: 'thon_lang_cuop_pha',
    title: 'Mortal Hamlet Beast Siege',
    minLevel: 0,
    maxLevel: 3,
    text: 'Smoke rises from a mortal mountain village. A pack of savage wolves driven mad by lunar eclipses is tearing down wooden palisades, while helpless villagers weep in despair.',
    choices: [
      {
        text: '【 Unsheathe weapon to execute the alpha wolf 】',
        type: 'COMBAT',
        enemyId: 'hac_lang_vuong',
        successText: 'You decapitate the alpha beast with a single sweep! The wolf pack scatters in terror. Villagers prostrate in reverent worship, offering heirloom jade and copper.',
        successEffects: { stones: 50, exp: 130, strike: 4 },
        failText: 'Surrounded by wolves, you sustain bite wounds before driving them off with smoke talismans.'
      },
      {
        text: '【 Channel Qi roar to frighten the beasts away 】',
        type: 'STAT_CHECK',
        stat: 'atk',
        reqVal: 16,
        successText: 'You release a thunderous lion roar infused with spiritual Qi! The shockwave reverberates through the valley, scaring the beasts into frantic retreat.',
        successEffects: { exp: 95, skill: 5, def: 2 },
        failText: 'Your roar lacks sufficient spiritual pressure. The wolf pack charges at you with bared fangs!',
        failEffects: { hp: -35, exp: 20 }
      }
    ]
  },
  {
    id: 'do_phuong_tien_tieu',
    title: 'Wandering Gambler Divine Dice',
    minLevel: 0,
    maxLevel: 4,
    text: 'An eccentric old cultivator sitting on a wine barrel shakes a bone dice cup, beckoning you over: "Little friend, care to test your celestial destiny? 30 Spirit Stones per roll!"',
    choices: [
      {
        text: '【 Gamble 30 Spirit Stones on the divine dice 】',
        type: 'COST_CHECK',
        costItem: 'stones',
        costVal: 30,
        successText: 'Three golden sixes appear! The old man grins, handing you a rare Qi Gathering Pill and double your wager in sparkling stones!',
        successEffects: { stones: 75, exp: 140, addItem: 'tu_khi_dan' },
        failText: 'You lack 30 Spirit Stones. The old gambler chuckles: "Come back when your purse clinks with spirit jade!"',
        failEffects: {}
      },
      {
        text: '【 Use spiritual perception to detect loaded dice 】',
        type: 'STAT_CHECK',
        stat: 'skill',
        reqVal: 12,
        successText: 'You subtly notice magnetic iron powder inside the dice. Caught red-handed, the gambler sheepishly bribes you with a stash of stones to stay quiet!',
        successEffects: { stones: 60, skill: 4, exp: 50 },
        failText: 'You stare intently but detect nothing, earning only a mocking chuckle from the gambler.',
        failEffects: { exp: 15 }
      }
    ]
  },
  {
    id: 'ngoc_tuy_mach_khoang',
    title: 'Subterranean Jade Marrow Spring',
    minLevel: 0,
    maxLevel: 5,
    text: 'While exploring an underground limestone cavern, you crack open a hollow stalactite, revealing a pool of milky Spiritual Jade Marrow shimmering with pure celestial light.',
    choices: [
      {
        text: '【 Submerge yourself to cleanse marrow and meridians 】',
        type: 'AUTO',
        successText: 'Pure essence permeates every pore. Impurities are expelled from your bones like black sludge. Your body feels lighter and your vitality surges!',
        successEffects: { hp: 120, maxHp: 60, exp: 220, def: 6 }
      },
      {
        text: '【 Carefully bottle the jade marrow for future breakthroughs 】',
        type: 'AUTO',
        successText: 'You seal the precious liquid in three jade vials, storing a priceless treasure in your pouch.',
        successEffects: { addItem: 'tinh_thach_ngoc_tuy', exp: 140, stones: 40 }
      }
    ]
  },
  {
    id: 'dan_lo_no_tung',
    title: 'Pill Pavilion Cauldron Explosion',
    minLevel: 0,
    maxLevel: 4,
    text: 'A deafening boom shakes the sect alchemy quarters! Black smoke billows from an alchemist furnace as an outer disciple screams for help amidst spiraling alchemical flames.',
    choices: [
      {
        text: '【 Bravely rush in to suppress flames and rescue disciple 】',
        type: 'STAT_CHECK',
        stat: 'def',
        reqVal: 14,
        successText: 'Your protective barrier deflects the burning embers. You drag the disciple to safety! In profound gratitude, the alchemy elder rewards you generously.',
        successEffects: { stones: 80, exp: 130, addItem: 'kim_sang_duoc' },
        failText: 'The alchemical fire pierces your barrier, burning your sleeves and skin before sect elders arrive to douse the blaze.',
        failEffects: { hp: -45, exp: 25 }
      },
      {
        text: '【 Snatch the half-melted remnant pill from furnace ashes 】',
        type: 'STAT_CHECK',
        stat: 'dodge',
        reqVal: 12,
        successText: 'With lightning quick reflex, your hand darts into the cooling furnace, retrieving an intact pill before retreating unscathed!',
        successEffects: { addItem: 'tu_khi_dan', exp: 100 },
        failText: 'You burn your fingers on the molten bronze grate, dropping the scorched pill into dust.',
        failEffects: { hp: -25 }
      }
    ]
  },
  {
    id: 'sao_bang_roi_xuong',
    title: 'Fallen Celestial Starmetal',
    minLevel: 0,
    maxLevel: 5,
    text: 'A brilliant meteorite streaks across the twilight sky, crashing into a nearby pine forest with an earth-shaking thud. The crater glows with violet celestial starlight.',
    choices: [
      {
        text: '【 Mine the glowing starmetal core from the crater 】',
        type: 'STAT_CHECK',
        stat: 'atk',
        reqVal: 24,
        successText: 'You shatter the outer slag with fierce blade strikes, extracting a chunk of pure Celestial Starmetal ore that hums with magnetic force!',
        successEffects: { stones: 90, atk: 5, strike: 4, exp: 160 },
        failText: 'The ore is burning hot and denser than mountain granite. You dull your blade attempting to pry it loose.',
        failEffects: { hp: -30, exp: 40 }
      },
      {
        text: '【 Sit at the crater rim to absorb cosmic starlight 】',
        type: 'AUTO',
        successText: 'Bathing in the dissipating celestial starlight, your mind expands toward the boundless cosmos. Cultivation gains are immense.',
        successEffects: { exp: 180, skill: 6, lifespan: 2 }
      }
    ]
  },
  {
    id: 'lao_khat_an_si',
    title: 'Disguised Beggar Hermit',
    minLevel: 0,
    maxLevel: 4,
    text: 'At a dusty crossroad, an unkempt beggar dressed in tattered rags coughs weakly, holding out a broken bowl: "Kind traveler, a handful of spirit stones to quench an old man thirst?"',
    choices: [
      {
        text: '【 Hand over 40 Spirit Stones with courteous respect 】',
        type: 'COST_CHECK',
        costItem: 'stones',
        costVal: 40,
        successText: 'The beggar chuckles, his eyes suddenly flashing with divine golden light! He taps your forehead with a greasy finger, imparting an ancient breathing mantra before vanishing into thin air!',
        successEffects: { exp: 350, skill: 15, lifespan: 5, addItem: 'truong_sinh_quyet' },
        failText: 'You lack 40 stones to spare. The beggar sighs softly: "Fate is like morning dew, easily missed..."',
        failEffects: {}
      },
      {
        text: '【 Offer simple mortal rations and clean water 】',
        type: 'AUTO',
        successText: 'The old man eats happily, nodding with a gentle smile: "Sincere compassion is rare in this ruthless cultivation world." He bestows a lucky jade token upon you.',
        successEffects: { exp: 80, def: 4 }
      }
    ]
  },
  {
    id: 'mon_phai_tuyen_de_tu',
    title: 'Sect Outer Disciple Arena',
    minLevel: 0,
    maxLevel: 5,
    text: 'The grand sect arena bells chime nine times. Aspiring outer disciples duel atop floating stone rings to earn resource allowances and recognition from inner sect masters.',
    choices: [
      {
        text: '【 Leap into the arena to claim victory in combat 】',
        type: 'STAT_CHECK',
        stat: 'atk',
        reqVal: 32,
        successText: 'Your blade sweeps across the ring with overwhelming momentum, disarming three challengers consecutively! The arena elders applaud, awarding you pills and stones!',
        successEffects: { stones: 110, exp: 240, atk: 6, addItem: 'tu_khi_dan' },
        failText: 'A cunning opponent outmaneuvers your guard with an illusion talisman, knocking you off the stone ring.',
        failEffects: { hp: -40, exp: 50 }
      },
      {
        text: '【 Observe the duels from the spectators pavilion 】',
        type: 'AUTO',
        successText: 'Watching the varied techniques and sword styles of different schools, you analyze flaws and counters, honing your tactical comprehension.',
        successEffects: { skill: 8, def: 3, exp: 90 }
      }
    ]
  },

  // ──────────────────────────────────────────────────────────────────────────
  // LEVEL 4 - 8: FOUNDATION ESTABLISHMENT & GOLDEN CORE
  // ──────────────────────────────────────────────────────────────────────────
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
    id: 'doc_xa_coc_am_toan',
    title: 'Crimson Serpent Sorceress Lair',
    minLevel: 4,
    maxLevel: 7,
    text: 'A crimson mist billows through Poison Serpent Valley. Atop a throne of entwined vipers sits the Crimson Serpent Sorceress, playing with a jade dagger as her poisonous familiars hiss threateningly.',
    choices: [
      {
        text: '【 Strike first before the serpent poison spreads 】',
        type: 'COMBAT',
        enemyId: 'xich_xa_ma_nu',
        successText: 'You decapitate the vipers and pierce the sorceress defenses! Discovered in her lair is a secret collection of pill recipes and refined spirit stones.',
        successEffects: { exp: 750, stones: 220, addItem: 'kim_sang_duoc', strike: 5 },
        failText: 'Venomous fumes cloud your vision. Pierced by poisoned daggers, you retreat with burning veins.'
      },
      {
        text: '【 Use evasive agility to slip through the valley perimeter 】',
        type: 'STAT_CHECK',
        stat: 'dodge',
        reqVal: 24,
        successText: 'Darting between stone crevices, you bypass the serpent nests completely, leaving the sorceress cursing behind you.',
        successEffects: { dodge: 6, exp: 180, stones: 40 },
        failText: 'A viper lunges from an overhead branch, biting your forearm and causing swelling.',
        failEffects: { hp: -60, exp: 30 }
      }
    ]
  },
  {
    id: 'co_dai_thach_nham',
    title: 'Awakened Stone Golem Sentinel',
    minLevel: 5,
    maxLevel: 8,
    text: 'A rumble shakes the mountain gorge as a towering granite cliff detaches itself, forming a colossal Ancient Stone Golem with glowing amber eyes, guarding an underground entrance.',
    choices: [
      {
        text: '【 Engage the monolith guardian in direct combat 】',
        type: 'COMBAT',
        enemyId: 'cu_nham_ho_phap',
        successText: 'After a titanic clash that shatters the golem core, you extract a lump of pure Spiritual Jade Marrow from its shattered chest!',
        successEffects: { exp: 1800, stones: 450, addItem: 'tinh_thach_ngoc_tuy', def: 10 },
        failText: 'The golem stone fist crushes your barrier like dry twigs, sending you hurtling into the canyon wall.'
      },
      {
        text: '【 Search for ancient deactivation glyphs on its back 】',
        type: 'STAT_CHECK',
        stat: 'skill',
        reqVal: 35,
        successText: 'You spot three eroded seal characters on its spinal ridge. Channeling your Qi into the glyphs, the golem smoothly powers down and freezes into inert stone!',
        successEffects: { skill: 14, exp: 600, stones: 180 },
        failText: 'You mistranslate the glyph! A seismic shockwave erupts from the rune, blasting you back.',
        failEffects: { hp: -80, exp: 60 }
      }
    ]
  },
  {
    id: 'me_cung_am_hon',
    title: 'Nether Specter Catacombs',
    minLevel: 6,
    maxLevel: 10,
    text: 'Beneath an ancient cemetery, black soul flames illuminate a cavern of endless tombs. A horrifying howl echoes as the Nether Soul Specter King rises from a bone throne, wielding soul chains!',
    choices: [
      {
        text: '【 Battle the Specter King with righteous sword Qi 】',
        type: 'COMBAT',
        enemyId: 'am_hon_quy_vuong',
        successText: 'Your radiant sword intent vaporizes the specter monarch! The soul chains shatter, leaving behind the rare Heart Demon Subduing Canon!',
        successEffects: { exp: 3800, stones: 1100, addItem: 'tam_ma_kinh', strike: 8 },
        failText: 'Soul chains wrap around your spiritual body, dragging you into freezing despair before you sever them and escape.'
      },
      {
        text: '【 Recite ancient purifying scriptures to pacify the spirits 】',
        type: 'STAT_CHECK',
        stat: 'skill',
        reqVal: 48,
        successText: 'Your resonant chanting fills the cavern with golden Buddhist radiance. Thousands of vengeful souls bow in peace, dissolving into pure spiritual light that washes over you!',
        successEffects: { skill: 22, exp: 1400, lifespan: 10 },
        failText: 'The specter wails overwhelm your voice, chilling your dantian and fracturing concentration.',
        failEffects: { hp: -100, exp: 80 }
      }
    ]
  },
  {
    id: 'quang_khoang_tranh_chap',
    title: 'Spirit Stone Mine Dispute',
    minLevel: 5,
    maxLevel: 8,
    text: 'Two rival cultivation sects are clashing over an exposed vein of high-grade spiritual crystals. The valley is filled with flying sword flashes and chaotic explosions.',
    choices: [
      {
        text: '【 Intervene to mediate and claim an arbiter share 】',
        type: 'STAT_CHECK',
        stat: 'atk',
        reqVal: 110,
        successText: 'You unleash a thunderous sword aura that parts both armies! Awed by your sheer might, both sect leaders respectfully offer you 300 Spirit Stones as mediator tribute!',
        successEffects: { stones: 320, exp: 400, skill: 8 },
        failText: 'Both sects view you as an arrogant meddler and bombard you with talismans, driving you off in humiliation.',
        failEffects: { hp: -75, exp: 60 }
      },
      {
        text: '【 Sneak into the unguarded mine tunnels to excavate ore 】',
        type: 'STAT_CHECK',
        stat: 'dodge',
        reqVal: 28,
        successText: 'While they fight on the surface, you dig into the deepest crystal chamber, harvesting a hefty bounty of spirit stones!',
        successEffects: { stones: 240, exp: 250 },
        failText: 'A stray explosion collapses the mine entrance! You crawl out through rubble, battered and bruised.',
        failEffects: { hp: -50, exp: 40 }
      }
    ]
  },
  {
    id: 'ho_ly_bien_hinh',
    title: 'Injured Celestial Fox Spirit',
    minLevel: 4,
    maxLevel: 8,
    text: 'A snowy fox with three fluffy tails lies trapped in an iron hunter snare, its fur stained with blood. It looks at you with intelligent, pleading eyes.',
    choices: [
      {
        text: '【 Gently sever the trap and apply healing medicine 】',
        type: 'AUTO',
        successText: 'You free the fox and apply soothing herb salve. The fox transforms into a playful fairy who gifts you a magical ice pearl before leaping away into moonlight!',
        successEffects: { exp: 280, stones: 80, addItem: 'tho_nguyen_dan', lifespan: 5 }
      },
      {
        text: '【 Slay the fox to harvest its rare spirit beast core 】',
        type: 'AUTO',
        successText: 'Heartened only by cold pragmatism, you end its life to harvest its valuable beast core. Lucrative gains, but a faint blood shadow clings to your aura.',
        successEffects: { stones: 180, exp: 320, atk: 6, def: -2 }
      }
    ]
  },
  {
    id: 'tam_ma_ao_canh',
    title: 'Heart Demon Mirage Trial',
    minLevel: 5,
    maxLevel: 10,
    text: 'During deep seclusion, your mind slips into an insidious mirage. The faces of departed mortal parents and defeated adversaries manifest in phantom flames, accusing you of heartless ambition.',
    choices: [
      {
        text: '【 Sever all worldly attachments with decisive Dao conviction 】',
        type: 'STAT_CHECK',
        stat: 'skill',
        reqVal: 32,
        successText: 'You swing the blade of your mind, slicing through illusions! Your Dao heart emerges untainted like polished jade, permanently elevating mental clarity.',
        successEffects: { skill: 18, strike: 8, exp: 500, def: 8 },
        failText: 'Guilt and hesitation grip your soul. The heart demon lashes out at your dantian, causing severe Qi deviations.',
        failEffects: { hp: -120, exp: -150 }
      },
      {
        text: '【 Harmonize with the memories and accept past mortal sorrow 】',
        type: 'AUTO',
        successText: 'You do not run nor strike. You embrace the bittersweet memories as a natural part of human existence. The illusions peacefully dissolve into spiritual rain.',
        successEffects: { lifespan: 8, hp: 80, exp: 350 }
      }
    ]
  },
  {
    id: 'thien_ha_tinh_quang',
    title: 'Celestial Starlight Baptism',
    minLevel: 5,
    maxLevel: 9,
    text: 'A rare celestial alignment causes the Milky Way to cascade starlight directly into your secluded mountain peak, bathing the altar in shimmering silver luminescence.',
    choices: [
      {
        text: '【 Sit atop the highest crag to absorb the stellar essence 】',
        type: 'AUTO',
        successText: 'Starlight pours through your crown into your meridians. Your genuine Qi glints with silver stardust, granting tremendous cultivation advancement!',
        successEffects: { exp: 600, hp: 120, atk: 12, def: 8, lifespan: 5 }
      }
    ]
  },
  {
    id: 'bien_hai_san_ho',
    title: 'Deep Sea Coral Trench Diving',
    minLevel: 5,
    maxLevel: 8,
    text: 'At the bottom of the East Sea trench, thousand-year luminous corals illuminate a sunken immortal vessel. The crushing water pressure is immense.',
    choices: [
      {
        text: '【 Cast water-repelling barrier and dive into the wreckage 】',
        type: 'STAT_CHECK',
        stat: 'def',
        reqVal: 40,
        successText: 'Your barrier easily withstands the abyssal ocean pressure. Inside the sunken captain quarters, you discover ancient sea-iron armor and crystal pearls!',
        successEffects: { addItem: 'huyen_thiet_giap', stones: 220, exp: 380 },
        failText: 'Ocean pressure cracks your barrier! Seawater floods your lungs as you scramble to the surface in agony.',
        failEffects: { hp: -90, exp: 40 }
      },
      {
        text: '【 Harvest luminous sea pearls along the trench rim 】',
        type: 'AUTO',
        successText: 'Without braving the dangerous depth, you harvest twenty glowing pearls from the outer coral ridge, trading them for spirit stones.',
        successEffects: { stones: 120, exp: 120 }
      }
    ]
  },
  {
    id: 'song_tu_yeu_cau',
    title: 'Hehuan Enchantress Invitation',
    minLevel: 5,
    maxLevel: 8,
    text: 'A charming elder of the Hehuan Sect in translucent silk robes glides into your cave, offering to practice reciprocal Yin-Yang dual cultivation to mutually accelerate Qi circulation.',
    choices: [
      {
        text: '【 Accept the dual cultivation session wholeheartedly 】',
        type: 'AUTO',
        successText: 'A night of mutual spiritual circulation harmonizes yin and yang energies in your dantian. Cultivation surges forward swiftly!',
        successEffects: { exp: 550, hp: 100, atk: 8, stones: 60 }
      },
      {
        text: '【 Sternly refuse and order the enchantress to leave 】',
        type: 'AUTO',
        successText: 'Unshaken by temptation, your unwavering resolve earns her reluctant respect. Your ascetic discipline hardens your Dao heart.',
        successEffects: { def: 12, skill: 10, exp: 200 }
      }
    ]
  },
  {
    id: 'truong_lao_toa_hoa',
    title: 'Grand Elder Final Tribulation',
    minLevel: 5,
    maxLevel: 9,
    text: 'An esteemed elder of your sect whose thousand-year lifespan is expiring attempts a final desperate breakthrough into the Soul Formation realm atop Thundercloud Peak.',
    choices: [
      {
        text: '【 Watch with reverence from the observation platform 】',
        type: 'AUTO',
        successText: 'Though the final thunder bolt shatters his mortal shell, the elder dying smile and residual Dao comprehension resonate through heaven and earth, imparting profound enlightenment upon you.',
        successEffects: { exp: 700, skill: 16, lifespan: 6 }
      }
    ]
  },

  // ──────────────────────────────────────────────────────────────────────────
  // LEVEL 7 - 12: NASCENT SOUL, SOUL FORMATION & TRIBULATION ASCENSION
  // ──────────────────────────────────────────────────────────────────────────
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
  },
  {
    id: 'hu_khong_phong_bao',
    title: 'Dimensional Void Storm',
    minLevel: 7,
    maxLevel: 12,
    text: 'While traveling across mountain continents, a spatial fissure tears open without warning. Chaotic void tempests and spatial blades threaten to shred everything into molecular dust!',
    choices: [
      {
        text: '【 Deploy protective treasure barrier to withstand the tempest 】',
        type: 'STAT_CHECK',
        stat: 'def',
        reqVal: 180,
        successText: 'Your golden protective aura stands firm like an unyielding bastion. In the heart of the vortex, you discover a crystal of pure Spatial Essence!',
        successEffects: { def: 25, exp: 2800, stones: 800, addItem: 'bang_phach_tien_y' },
        failText: 'Spatial blades slice through your defensive halos, inflicting deep lacerations across your torso.',
        failEffects: { hp: -350, exp: 400 }
      },
      {
        text: '【 Execute supreme evasive footwork to ride the spatial currents 】',
        type: 'STAT_CHECK',
        stat: 'dodge',
        reqVal: 50,
        successText: 'Gliding along spatial folds like a willow leaf in a hurricane, you effortlessly escape the singularity and comprehend the laws of spatial transit!',
        successEffects: { dodge: 18, skill: 20, exp: 2200 },
        failText: 'A spatial turbulence clips your legs, tossing you out of the rift into jagged rocks.',
        failEffects: { hp: -280, exp: 300 }
      }
    ]
  },
  {
    id: 'tien_nhan_chieu_thu',
    title: 'Heavenly Immortal Edict',
    minLevel: 8,
    maxLevel: 12,
    text: 'Golden clouds part in the high heavens. A celestial decree written in phoenix script manifests before you, testing whether your cultivation aligns with true celestial order.',
    choices: [
      {
        text: '【 Kneel with palms raised to accept the heavenly edict 】',
        type: 'AUTO',
        successText: 'Golden immortal essence pours from the decree into your soul! Your lifespan expands by three centuries and your spiritual aura glows with celestial divinity!',
        successEffects: { lifespan: 300, exp: 5000, hp: 800, def: 35, stones: 1200 }
      },
      {
        text: '【 Strike the decree with your blade in defiance of heavenly rule 】',
        type: 'STAT_CHECK',
        stat: 'atk',
        reqVal: 450,
        successText: 'Your blade shatters the golden edict! "My path is forged by my own sword, not governed by celestial decrees!" Absorbing the fractured immortal laws, your attack power surges uncontrollably!',
        successEffects: { atk: 80, strike: 25, exp: 7000 },
        failText: 'Heavenly thunder punishes your arrogance! A lightning spear strikes your back, severely burning your spiritual veins.',
        failEffects: { hp: -500, exp: -500 }
      }
    ]
  },
  {
    id: 'thao_thiet_thuc_tinh',
    title: 'Wrath of the Primordial Calamity',
    minLevel: 9,
    maxLevel: 12,
    text: 'Deep beneath the continent mantle, the Ancient Taotie Calamity Beast opens its colossal maw! Miles of earth cave in as black gravity fissures pull rivers, mountains, and all living souls toward eternal oblivion!',
    choices: [
      {
        text: '【 Challenge the world-devouring calamity to decisive battle 】',
        type: 'COMBAT',
        enemyId: 'thao_thiet_thuong_co',
        successText: 'In a battle witnessed by all immortal realms, your strike cleaves through the beast heart! The primordial calamity is subdued, and you claim the miraculous Nine-Turn Soul Rebirth Pill!',
        successEffects: { exp: 25000, stones: 10000, hp: 2000, atk: 120, addItem: 'cuu_chuyen_hoan_hon' },
        failText: 'The primordial gravity swallows your strikes. You barely ignite your essence to tear open a space portal and escape.'
      },
      {
        text: '【 Form an elemental array to divert the tectonic collapse 】',
        type: 'STAT_CHECK',
        stat: 'skill',
        reqVal: 160,
        successText: 'Drawing upon earth elemental leylines, you erect five thousand stone pillars to stabilize the tectonic plates, averting continental ruin and earning immense cosmic merit!',
        successEffects: { lifespan: 500, def: 60, exp: 8000, stones: 3000 },
        failText: 'The elemental array collapses under the beast colossal weight. The tremor shatters your meridians.',
        failEffects: { hp: -600, exp: 1000 }
      }
    ]
  },
  {
    id: 'nguyen_anh_doat_xa',
    title: 'Nascent Soul Possession Ambush',
    minLevel: 7,
    maxLevel: 11,
    text: 'While exploring an ancient tomb, an eerie green Nascent Soul spirit springs from an open sarcophagus, laughing maliciously as it dives straight into your forehead to usurp your body!',
    choices: [
      {
        text: '【 Crush the invasive soul with supreme mental willpower 】',
        type: 'STAT_CHECK',
        stat: 'skill',
        reqVal: 90,
        successText: 'Your divine soul manifests like a blazing golden sun inside your sea of consciousness, completely incinerating the demonic soul! You absorb its centuries of arcane cultivation!',
        successEffects: { exp: 4500, skill: 30, strike: 12, stones: 800 },
        failText: 'The ancient soul tears at your consciousness! You barely purge it with soul-burning herbs, leaving a permanent headache.',
        failEffects: { hp: -300, exp: -300 }
      }
    ]
  },
  {
    id: 'ban_co_tien_ong',
    title: 'Chess Match with Cloud Peak Hermit',
    minLevel: 7,
    maxLevel: 12,
    text: 'Atop a cloud-piercing peak, an immortal elder in white sits before a stone go board, inviting you: "One game of cosmic chess. White represents heaven, black represents mortal defiance."',
    choices: [
      {
        text: '【 Sit down to play the match of cosmic destiny 】',
        type: 'STAT_CHECK',
        stat: 'skill',
        reqVal: 110,
        successText: 'Placing stone by stone, you outmaneuver the hermit with a bold sacrifice strategy! The hermit laughs heartily, awarding you the Void Severing Celestial Sword!',
        successEffects: { skill: 45, exp: 6000, addItem: 'hu_khong_tram_linh', lifespan: 200 },
        failText: 'You lose three dragons across the board, completely baffled by the hermit cosmic foresight.',
        failEffects: { skill: 8, exp: 800 }
      },
      {
        text: '【 Politely bow and decline the philosophical duel 】',
        type: 'AUTO',
        successText: 'You respectfully decline to meddle in cosmic chess. The hermit nods gently, gifting you a longevity elixir for your modesty.',
        successEffects: { addItem: 'tho_nguyen_dan', exp: 600, lifespan: 25 }
      }
    ]
  },
  {
    id: 'quy_huong_ngam_ngui',
    title: 'Return to Mortal Village After Four Centuries',
    minLevel: 6,
    maxLevel: 12,
    unique: true,
    text: 'Four hundred years have passed since you left your mortal home. You return to the foothill village: ancient stone houses are gone, ancestral graves are covered in moss, and mortal descendants do not recognize your face.',
    choices: [
      {
        text: '【 Scatter spirit stones secretly to bless your bloodline descendants 】',
        type: 'AUTO',
        successText: 'You quietly leave chests of gold and healing herbs inside the descendant family hall, severing the final thread of mortal attachment. Your Dao heart achieves supreme tranquility!',
        successEffects: { exp: 3500, skill: 25, def: 20, lifespan: 100 }
      },
      {
        text: '【 Drink alone before the mossy ancestral gravestones 】',
        type: 'AUTO',
        successText: 'Pouring mortal wine onto the earth, you reflect upon the solitude of immortal pursuit. The bittersweet grief transforms into unyielding resolve.',
        successEffects: { atk: 30, strike: 15, exp: 3000 }
      }
    ]
  },
  {
    id: 'duc_tao_ban_menh_phap_bao',
    title: 'Tempering Natal Destiny Artifact',
    minLevel: 7,
    maxLevel: 12,
    unique: true,
    text: 'You gather rare star ores and celestial lightning to forge your Natal Destiny Artifact. It requires infusing a drop of pure heart blood and withstanding heavenly sparks.',
    choices: [
      {
        text: '【 Infuse blood essence to forge the Celestial Lightning Orb 】',
        type: 'STAT_CHECK',
        stat: 'hp',
        reqVal: 800,
        successText: 'Heart blood fuses seamlessly with celestial lightning! The orb ignites with blinding violet brilliance, attuning directly to your soul!',
        successEffects: { addItem: 'thien_loi_linh_chu', atk: 50, strike: 20, exp: 4000 },
        failText: 'Blood loss is too acute. You faint before the forge, the artifact cooling into an imperfect shape.',
        failEffects: { hp: -350, exp: 500 }
      }
    ]
  },
  {
    id: 'co_thu_phien_dich',
    title: 'Deciphering Ancient Bamboo Scroll',
    minLevel: 0,
    maxLevel: 5,
    text: 'In an abandoned scholar hut, you find a charred bamboo scroll inscribed with obscure archaic seals describing body conditioning methods.',
    choices: [
      {
        text: '【 Meditate deeply to decipher the archaic seals 】',
        type: 'STAT_CHECK',
        stat: 'skill',
        reqVal: 8,
        successText: 'The archaic characters align into a coherent breathing technique! Your understanding of physical cultivation leaps forward.',
        successEffects: { skill: 6, hp: 40, exp: 110 },
        failText: 'The ancient script is too convoluted. You decipher nothing but strain your eyesight.',
        failEffects: { exp: 20 }
      },
      {
        text: '【 Trade the scroll at the next bazaar for coins 】',
        type: 'AUTO',
        successText: 'An eccentric antique collector eagerly purchases the scroll, handing you 45 shiny Spirit Stones.',
        successEffects: { stones: 45, exp: 40 }
      }
    ]
  },
  {
    id: 'tinh_linh_thao_duoc',
    title: 'Fragrant Spirit Grass Meadow',
    minLevel: 0,
    maxLevel: 4,
    text: 'Walking through a secluded mountain valley, a sweet aroma fills the air. A natural glade of emerald Spirit Grass wafts soothing spiritual mist.',
    choices: [
      {
        text: '【 Sit cross-legged to absorb the herbal fragrance 】',
        type: 'AUTO',
        successText: 'The herbal mist washes through your lungs, dissolving hidden internal blockages and completely revitalizing your vitality!',
        successEffects: { hp: 100, exp: 120, def: 2 }
      },
      {
        text: '【 Carefully harvest the spirit grass into your pouch 】',
        type: 'AUTO',
        successText: 'You harvest two bundles of pristine healing herbs, packing them safely for future battles.',
        successEffects: { addItem: 'kim_sang_duoc', stones: 20, exp: 60 }
      }
    ]
  },
  {
    id: 'tan_tu_ket_ban',
    title: 'Fellow Rogue Cultivator Encounter',
    minLevel: 0,
    maxLevel: 5,
    text: 'A wandering swordsman sharing your campsite roasted wild pheasant over a campfire, offering you a skewer: "The Dao is vast and lonely. Would you care to exchange martial pointers over meat?"',
    choices: [
      {
        text: '【 Spar with friendly martial wooden staves 】',
        type: 'STAT_CHECK',
        stat: 'atk',
        reqVal: 15,
        successText: 'Your fluid counter-thrust knocks the stave from his grip! Impressed by your poise, the traveler gifts you an iron sword and discusses combat tactics.',
        successEffects: { atk: 4, strike: 3, exp: 130, addItem: 'thiet_kiem' },
        failText: 'His swift footwork sweeps your legs out from under you. You chuckle, dust off your knees, and gain valuable sparring wisdom.',
        failEffects: { def: 2, exp: 70 }
      },
      {
        text: '【 Share wine and discuss legends of distant sects 】',
        type: 'AUTO',
        successText: 'Drinking beneath the starry night, the rogue cultivator shares tales of ancient ruins and beast lairs across the border.',
        successEffects: { skill: 5, stones: 15, exp: 80 }
      }
    ]
  },
  {
    id: 'tieu_diet_ma_chu',
    title: 'Demonic Spider in Ruined Shrine',
    minLevel: 0,
    maxLevel: 4,
    text: 'Sheltering from rain inside a dilapidated roadside shrine, giant cobwebs quiver above. A blood-eyed demon spider as large as a carriage descends from the ceiling beams!',
    choices: [
      {
        text: '【 Strike immediately with flaming torch and blade 】',
        type: 'STAT_CHECK',
        stat: 'atk',
        reqVal: 20,
        successText: 'Torch flames ignite the web as your sword skewers the spider abdomen! Behind the shrine altar, you uncover an old chest with spirit stones.',
        successEffects: { stones: 55, exp: 140, strike: 3 },
        failText: 'Sticky webs ensnare your arms! The spider fangs graze your shoulder before you slash free and tumble out into the rain.',
        failEffects: { hp: -40, exp: 30 }
      },
      {
        text: '【 Slip past the webs and flee into the storm 】',
        type: 'STAT_CHECK',
        stat: 'dodge',
        reqVal: 10,
        successText: 'Quick as a frightened hare, you dodge the descending fangs and leap through the broken window into safety.',
        successEffects: { dodge: 3, exp: 40 },
        failText: 'You trip over a rotten floorboard, scraping your knees before crawling out.',
        failEffects: { hp: -20, exp: 15 }
      }
    ]
  },
  {
    id: 'thien_dia_linh_vu',
    title: 'Spiritual Dew Rain Shower',
    minLevel: 0,
    maxLevel: 6,
    text: 'A gentle emerald rain showers the valley. Droplets sparkle like liquid crystals, condensed from pure atmospheric spiritual essence.',
    choices: [
      {
        text: '【 Stand under the rain with arms outstretched to bathe in dew 】',
        type: 'AUTO',
        successText: 'The celestial rain washes away fatigue, soothing all minor injuries and boosting your cultivation reserves effortlessly.',
        successEffects: { hp: 120, exp: 160, lifespan: 1 }
      }
    ]
  },
  {
    id: 'di_hoa_xuat_the',
    title: 'Earthfire Core Flame Flare',
    minLevel: 3,
    maxLevel: 8,
    text: 'A geothermal fissure cracks open inside an obsidian cavern. A wisp of azure Earth Core Flame flickers atop molten magma, intensely radiating heat and primordial fire essence.',
    choices: [
      {
        text: '【 Channel genuine Qi to tame and absorb the flame wisp 】',
        type: 'STAT_CHECK',
        stat: 'def',
        reqVal: 35,
        successText: 'Withstanding the scorching heat, you guide the flame wisp into your dantian! Your offensive strikes now blaze with persistent fire damage!',
        successEffects: { atk: 15, strike: 8, exp: 420 },
        failText: 'The core fire explodes in your face! Your eyebrows and robes are scorched to cinders, staggering back with burns.',
        failEffects: { hp: -90, exp: 50 }
      },
      {
        text: '【 Trap the flame in an alchemical gourd for sale 】',
        type: 'STAT_CHECK',
        stat: 'skill',
        reqVal: 22,
        successText: 'Using intricate seal talismans, you bottle the flame safely. Alchemy halls will pay a fortune for such prime cauldron fuel!',
        successEffects: { stones: 160, exp: 200 },
        failText: 'The talisman burns through before sealing. The flame dissipates into volcanic smoke.',
        failEffects: { exp: 30 }
      }
    ]
  },
  {
    id: 'long_huyet_thao',
    title: 'Dragon Blood Grass on Cliff',
    minLevel: 2,
    maxLevel: 7,
    text: 'Halfway up Dragonhead Precipice, a crimson plant rooted in cliff stone radiates faint draconic roars. It is rumored to have sprouted where true dragon blood fell in antiquity.',
    choices: [
      {
        text: '【 Scale the sheer vertical wall without ropes to harvest 】',
        type: 'STAT_CHECK',
        stat: 'dodge',
        reqVal: 18,
        successText: 'Your fingers grip narrow stone fissures with mountaineer precision! You pluck the Dragon Blood Grass, chewing a leaf to temper your bones!',
        successEffects: { hp: 140, maxHp: 50, atk: 8, exp: 280 },
        failText: 'A handhold crumbles! You plummet forty feet, breaking your fall on tree branches below.',
        failEffects: { hp: -70, exp: 40 }
      }
    ]
  },
  {
    id: 'ngu_kiem_phi_hanh',
    title: 'First Flight upon Flying Sword',
    minLevel: 4,
    maxLevel: 8,
    text: 'Having consolidated your Dao foundation, you step onto the flat of your flying sword, infusing spiritual Qi to soar into the open azure sky for the very first time.',
    choices: [
      {
        text: '【 Soar through the clouds and ride the high wind currents 】',
        type: 'STAT_CHECK',
        stat: 'skill',
        reqVal: 25,
        successText: 'The sword cuts through mist like a silver comet! Overlooking rivers and mountain ranges below, you experience the true exhilaration of an immortal!',
        successEffects: { dodge: 10, skill: 8, exp: 350, lifespan: 3 },
        failText: 'A sudden gust destabilizes your sword balance! You wobble wildly and make a chaotic crash landing in a haystack.',
        failEffects: { hp: -30, exp: 60 }
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
