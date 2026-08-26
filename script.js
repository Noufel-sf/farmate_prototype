/**
 * FARMATE (فارميت) - Interactive Prototype Logic
 * Vanilla JavaScript Single Page Application
 * Algerian Agricultural Intelligent Ecosystem
 */

(function () {
  'use strict';

  // Central Application State
  const AppState = {
    isLoggedIn: false,
    currentTab: 'tab-advisor',
    isOffline: false,
    theme: 'light',
    wallet: {
      total: 185000,
      withdrawable: 143000,
      pending: 42000
    },
    userProfile: {
      name: 'رابح منصوري (عمي رابح)',
      farmName: 'مزرعة الأمل النموذجية',
      phone: '05 50 12 34 56',
      wilaya: 'سطيف',
      commune: 'عين ولمان',
      farmerCard: '19/8402',
      activity: 'زراعة الحبوب، البطاطا، وتربية الماشية',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      bio: 'فلاح معتمد لدى الغرفة الفلاحية لولاية سطيف منذ 2012، متخصص في زراعة القمح الصلب والبطاطا ونظم السقي الحديثة.'
    },
    cart: [
      { id: 'p1', name: 'سماد مركب داب DAP 18-46 أسمدة الجزائر', price: 4200, qty: 2, image: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?w=300&auto=format&fit=crop&q=80', unit: 'كيس 50 كغ' },
      { id: 'p3', name: 'مبيد فطري نحاسي ريدوميل جولد Ridomil Gold', price: 2800, qty: 1, image: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=300&auto=format&fit=crop&q=80', unit: 'علبة 1 كغ' }
    ],
    favorites: ['p1', 'p2', 'm1'],
    myOrders: [
      {
        id: 'DZ-9402',
        date: 'اليوم، 10:30 ص',
        status: 'in_transit',
        statusText: 'في الطريق 🚚',
        eta: 'اليوم بين 16:30 و 18:00',
        total: 11200,
        deliveryWilaya: 'سطيف - عين ولمان',
        driverName: 'مراد بن سالم',
        driverPhone: '06 62 11 44 77',
        items: [
          { name: 'سماد مركب داب DAP 18-46', qty: 2, price: 4200, unit: 'كيس 50 كغ' },
          { name: 'مبيد فطري نحاسي ريدوميل', qty: 1, price: 2800, unit: 'علبة 1 كغ' }
        ]
      },
      {
        id: 'DZ-8812',
        date: '18 أوت 2026',
        status: 'delivered',
        statusText: 'تم التسليم بنجاح ✓',
        eta: 'تم الاستلام ببلدية عين ولمان',
        total: 19500,
        deliveryWilaya: 'سطيف - عين ولمان',
        driverName: 'سمير خلوفي',
        driverPhone: '07 70 88 99 00',
        items: [
          { name: 'بذور قمح صلب معتمدة سيرتا', qty: 3, price: 6500, unit: 'قنطار' }
        ]
      }
    ],
    myListings: [
      {
        id: 'list-1',
        type: 'machinery',
        title: 'جرار ماسي فيرغسون MF 140 حصان 4WD',
        price: '4,500 دج / هكتار',
        category: 'جرارات وحرث',
        location: 'عين ولمان، سطيف',
        active: true,
        views: 142,
        calls: 18,
        image: 'https://images.unsplash.com/photo-1594771804886-a933bb2d609b?w=400&auto=format&fit=crop&q=80'
      },
      {
        id: 'list-2',
        type: 'product',
        title: 'محصول قمح صلب بيولوجي ممتاز صنف سيرتا',
        price: '5,800 دج / قنطار',
        category: 'حبوب وبقول',
        location: 'مزرعة الأمل، سطيف',
        active: true,
        views: 89,
        calls: 12,
        image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&auto=format&fit=crop&q=80'
      }
    ],
    selectedSampleIndex: 0,
    selectedCategory: 'all',
    selectedMachineryCat: 'all',
    storePage: 1,
    storePerPage: 6,
    machineryPage: 1,
    machineryPerPage: 4,
    detailSelectedQty: 1,
    currentDetailProductId: null,
    isVoiceRecording: false,
    notifications: [
      { id: 1, title: 'تنبيه طقس: صقيع مرتقب ليل الخميس', time: 'منذ 15 دقيقة', icon: '❄️', unread: true },
      { id: 2, title: 'تحديث قرض الرفيق: الملف قيد الدراسة ببنك BADR', time: 'منذ ساعتين', icon: '🏦', unread: true },
      { id: 3, title: 'طلبك #DZ-9402 تم شحنه وهو في الطريق إليك 🚚', time: 'منذ 4 ساعات', icon: '📦', unread: true }
    ],
    advisorHistory: [
      { id: 'h1', title: 'علاج لفحة الطماطم في سطيف', date: 'اليوم، 08:30 ص' },
      { id: 'h2', title: 'برنامج تسميد القمح الصلب', date: 'أمس، 17:15 م' },
      { id: 'h3', title: 'حساب تكلفة السقي بالتقطير لهكتار', date: '22 أوت 2026' }
    ]
  };

  // Central Mock Data
  const MOCK_DATA = {
    // 1. Agri-Store Catalog (100% Contextual Agricultural Products)
    categories: [
      { id: 'all', name: '🌾 الكل' },
      { id: 'seeds', name: '🌱 بذور وتقاوي معتمدة' },
      { id: 'fertilizers', name: '🧪 أسمدة ومخصبات' },
      { id: 'pesticides', name: '🛡️ مبيدات ووقاية النبات' },
      { id: 'irrigation', name: '💧 عتاد السقي والتقطير' },
      { id: 'feed', name: '🐄 أعلاف ومكملات مواشي' }
    ],
    products: [
      {
        id: 'p1',
        category: 'fertilizers',
        name: 'سماد مركب داب DAP 18-46 أسمدة الجزائر',
        price: 4200,
        oldPrice: 4800,
        unit: 'كيس 50 كغ',
        rating: 4.9,
        reviewsCount: 38,
        supplier: 'مؤسسة أسمدة الشرق - سطيف',
        wilaya: 'setif',
        image: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?w=500&auto=format&fit=crop&q=80',
        badge: 'الأكثر طلباً',
        description: 'سماد فوسفاتي أزوتي عالي النقاوة مخصص للانطلاق الجذري للحبوب والخضروات في الأراضي الجزائرية. يضمن تجذيراً قوياً ومقاومة عالية للجفاف.',
        specs: { composition: '18% أزوت (N) + 46% فوسفور (P2O5)', dosage: '1.5 إلى 2 قنطار / هكتار عند البذر', origin: 'الجزائر (مطابق لمعيار IANOR)' },
        inStock: true
      },
      {
        id: 'p2',
        category: 'seeds',
        name: 'بذور قمح صلب معتمدة صنف سيرتا Cirta R1',
        price: 6500,
        oldPrice: null,
        unit: 'قنطار (100 كغ)',
        rating: 4.8,
        reviewsCount: 52,
        supplier: 'تعاونية الحبوب والبقول CCLS سطيف',
        wilaya: 'setif',
        image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&auto=format&fit=crop&q=80',
        badge: 'معتمد CCLS',
        description: 'بذور ممتازة من الجيل الأول (R1) منتقاة ومعالجة ضد التفحم، مقاومة لظروف الجفاف والأمراض الفطرية وملائمة لمناخ الهضاب وسهول الجزائر.',
        specs: { composition: 'بذور قمح صلب نقية 99.5% معالجة', dosage: '140 إلى 160 كغ / هكتار', origin: 'معهد ITGC قسنطينة' },
        inStock: true
      },
      {
        id: 'p3',
        category: 'pesticides',
        name: 'مبيد فطري نحاسي ريدوميل جولد Ridomil Gold',
        price: 2800,
        oldPrice: 3200,
        unit: 'علبة 1 كغ',
        rating: 5.0,
        reviewsCount: 29,
        supplier: 'الشركة الجزائرية لوقاية النباتات (ASAL)',
        wilaya: 'algiers',
        image: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=500&auto=format&fit=crop&q=80',
        badge: 'علاج فعال',
        description: 'مبيد فطري جهازي ووقائي متخصص في القضاء السريع على اللفحة المتأخرة (Mildiou) في الطماطم والبطاطا وأشجار الكروم والزيتون.',
        specs: { composition: 'Mefenoxam 4% + Mancozeb 64%', dosage: '250 غرام لكل 100 لتر ماء', origin: 'سويسرا / معبأ بالجزائر' },
        inStock: true
      },
      {
        id: 'p4',
        category: 'irrigation',
        name: 'أنابيب سقي بالتقطير قطارة مدمجة 16 ملم',
        price: 8500,
        oldPrice: 9900,
        unit: 'لفة 400 متر',
        rating: 4.7,
        reviewsCount: 19,
        supplier: 'مصنع الري الحديث - معسكر',
        wilaya: 'mascara',
        image: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=500&auto=format&fit=crop&q=80',
        badge: 'مدعوم 60%',
        description: 'أنابيب بولي إيثيلين معالجة ضد الأشعة فوق البنفسجية UV مع فتحات تقطير متوازنة بمعدل تدفق 2 لتر/ساعة ومسافة 30 سم بين القطارات.',
        specs: { composition: 'بولي إيثيلين عالي الكثافة HDPE', dosage: 'ضغط تشغيل 1.0 إلى 2.5 بار', origin: 'صنع في الجزائر' },
        inStock: true
      },
      {
        id: 'p5',
        category: 'feed',
        name: 'علف مركب مركز لتسمين الأبقار والماشية',
        price: 3900,
        oldPrice: null,
        unit: 'كيس 50 كغ',
        rating: 4.6,
        reviewsCount: 44,
        supplier: 'مجمع قالمة للأعلاف الوطنية (ONAB)',
        wilaya: 'guelma',
        image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=500&auto=format&fit=crop&q=80',
        badge: 'بروتين 18%',
        description: 'تركيبة غذائية مركزة غنية بالبروتين الخام والفيتامينات والمعادن لرفع المردودية اليومية لتسمين العجول والمواشي بصحة عالية.',
        specs: { composition: 'ذرة، كسب الصويا، نخالة، أملاح وفيتامينات', dosage: '2 إلى 4 كغ / رأس يومياً', origin: 'الديوان الوطني للأعلاف ONAB' },
        inStock: true
      },
      {
        id: 'p6',
        category: 'irrigation',
        name: 'مقص تقليم كهربائي ببطارية ليثيوم 21V',
        price: 14500,
        oldPrice: 16800,
        unit: 'حقيبة متكاملة',
        rating: 4.9,
        reviewsCount: 16,
        supplier: 'عتاد الفلاح المحترف - الجزائر',
        wilaya: 'algiers',
        image: 'https://images.unsplash.com/photo-1590682680695-43b964a3ae17?w=500&auto=format&fit=crop&q=80',
        badge: 'ضمان سنة',
        description: 'مقص احترافي لتقليم أشجار الزيتون والأشجار المثمرة بدقة وسرعة فائقة بقطر قطع يصل إلى 35 ملم مع بطاريتين ليثيوم وشاحن سريع.',
        specs: { composition: 'شفرات فولاذ ياباني SK5 + محرك Brushless', dosage: 'بطاريتان تعملان حتى 8 ساعات عمل متواصلة', origin: 'استيراد شركة العتاد الفلاحي' },
        inStock: true
      },
      {
        id: 'p7',
        category: 'seeds',
        name: 'بذور طماطم صناعية هجينة صنف ريو غراندي Rio Grande',
        price: 3200,
        oldPrice: 3800,
        unit: 'علبة 100 غرام',
        rating: 4.9,
        reviewsCount: 27,
        supplier: 'تعاونية البذور والشتائل - عنابة',
        wilaya: 'annaba',
        image: 'https://images.unsplash.com/photo-1592417817098-8f3d6910985b?w=500&auto=format&fit=crop&q=80',
        badge: 'إنتاجية قياسية',
        description: 'بذور طماطم حقلية ممتازة عالية الإنتاجية ومتحملة لحرارة الصيف ومقاومة للفيروسات، مثالية للإنتاج الفلاحي والتحويلي.',
        specs: { composition: 'نسبة الإنبات 95% نقية ومطعمة', dosage: '300 إلى 350 غرام / هكتار', origin: 'معتمدة من وزارة الفلاحة' },
        inStock: true
      },
      {
        id: 'p8',
        category: 'fertilizers',
        name: 'سماد سائل ورقي عالي البوتاسيوم NPK 5-10-40',
        price: 2400,
        oldPrice: null,
        unit: 'قارورة 5 لتر',
        rating: 4.8,
        reviewsCount: 31,
        supplier: 'مؤسسة التسميد الذكي - بسكرة',
        wilaya: 'biskra',
        image: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=500&auto=format&fit=crop&q=80',
        badge: 'تحجيم الثمار',
        description: 'سماد ورقي مغذي غني بالبوتاسيوم وعناصر نادرة لتكبير وتحجيم ثمار الطماطم والبطاطا والتمور وزيادة نسبة السكريات وتحسين التلوين.',
        specs: { composition: '5% N + 10% P2O5 + 40% K2O + بورون وزنك', dosage: '2.5 لتر / هكتار رشاً على الأوراق', origin: 'الجزائر' },
        inStock: true
      }
    ],

    // 2. Machinery and Logistics Directory (Authentic Agricultural Equipment)
    machinery: [
      {
        id: 'm1',
        category: 'tractors',
        title: 'جرار ماسي فيرغسون MF 140 حصان 4WD',
        price: '4,500 دج / هكتار',
        operator: 'يشمل السائق والوقود',
        wilaya: 'setif',
        location: 'عين ولمان، سطيف (3.2 كم)',
        owner: 'الأخضر بلقاسم',
        phone: '06 61 24 88 90',
        rating: 4.9,
        jobsDone: 84,
        image: 'https://images.unsplash.com/photo-1594771804886-a933bb2d609b?w=500&auto=format&fit=crop&q=80',
        specs: ['140 حصان ديزل توربو', 'سكة حرث هيدروليكية 4 سكك', 'نظام توجيه فلاحي GPS', 'توفر فوري بالحجز']
      },
      {
        id: 'm2',
        category: 'harvesters',
        title: 'حصادة قمح كلاوس دوميناتور Claas Dominator 2022',
        price: '6,200 دج / هكتار',
        operator: 'طاقم حصاد متمرس',
        wilaya: 'setif',
        location: 'قجال، سطيف (5.8 كم)',
        owner: 'الحاج عمار منصوري',
        phone: '05 50 88 12 34',
        rating: 5.0,
        jobsDone: 112,
        image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=500&auto=format&fit=crop&q=80',
        specs: ['عرض القاطع 5.2 م', 'نظام درس دقيق يحافظ على القش والحبوب', 'خزان بسعة 6000 لتر']
      },
      {
        id: 'm3',
        category: 'logistics',
        title: 'شاحنة نقل محاصيل فلاحية مغطاة 10 طن',
        price: '12,000 دج / رحلة',
        operator: 'سائق محترف للتوصيل',
        wilaya: 'setif',
        location: 'العلمة، سطيف (1.4 كم)',
        owner: 'فريد بن ناصر للنقل الفلاحي',
        phone: '07 72 33 44 55',
        rating: 4.8,
        jobsDone: 63,
        image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=500&auto=format&fit=crop&q=80',
        specs: ['حمولة 10 طن حبوب وخضار', 'غطاء عازل للحرارة والمطر', 'نقل لكافة أسواق الجملة بالقطر']
      },
      {
        id: 'm4',
        category: 'irrigation',
        title: 'صهريج مياه وتسميد مجرور 5000 لتر',
        price: '3,000 دج / يوم',
        operator: 'تأجير العتاد',
        wilaya: 'setif',
        location: 'بئر العرش، سطيف (7.1 كم)',
        owner: 'تعاونية الإخوة للري',
        phone: '06 63 99 11 22',
        rating: 4.7,
        jobsDone: 39,
        image: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=500&auto=format&fit=crop&q=80',
        specs: ['خزان مجلفن 5000 لتر', 'مضخة ضغط عالي', 'خرطوم ري 50 متر']
      },
      {
        id: 'm5',
        category: 'tractors',
        title: 'طائرة درون فلاحية ذكية للرش الجوي والمعاينة',
        price: '2,200 دج / هكتار',
        operator: 'مهندس فلاحي معتمد',
        wilaya: 'setif',
        location: 'سطيف المركز (4.0 كم)',
        owner: 'مؤسسة أغري درونز الجزائر',
        phone: '05 55 44 33 22',
        rating: 4.9,
        jobsDone: 47,
        image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=500&auto=format&fit=crop&q=80',
        specs: ['خزان رش 30 لتر', 'مسح متعدد الأطياف لصحة النبات', 'معالجة 10 هكتارات في الساعة']
      },
      {
        id: 'm6',
        category: 'harvesters',
        title: 'بذارة حبوب دقيقة نيوماتيكية 4 صفوف',
        price: '3,800 دج / هكتار',
        operator: 'تأجير مع المشغل',
        wilaya: 'setif',
        location: 'عين ولمان، سطيف (2.5 كم)',
        owner: 'مزرعة الهدى للعتاد',
        phone: '06 70 12 34 56',
        rating: 4.8,
        jobsDone: 58,
        image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=500&auto=format&fit=crop&q=80',
        specs: ['توزيع بذور دقيق جداً', 'تسميد متزامن مع الغرس', 'توفير 20% من التقاوي']
      }
    ],

    // 3. Plant Disease Diagnoses
    diseaseSamples: [
      {
        id: 'd1',
        title: 'لفحة الطماطم والبطاطا المتأخرة (Mildiou / Phytophthora)',
        crop: 'الطماطم / البطاطا',
        confidence: '96.4%',
        image: 'https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?w=400&auto=format&fit=crop&q=80',
        symptoms: 'بقع مائية بنية زيتية على الأوراق محاطة بهالة صفراء مع ظهور عفن أبيض خفيف أسفل الورقة عند ارتفاع الرطوبة.',
        darijaExplanation: 'يا عمي رابح، هذا مرض الميليو (Mildiou) ناتج عن رطوبة عالية ودفء مفاجئ. إذا ما داويتوش في 48 ساعة يقدر يقضي على الشتلة كاملة.',
        treatment: [
          '1. إزالة وحرق الأوراق المصابة فوراً لتفادي انتشار الأبواغ.',
          '2. رش مبيد فطري نحاسي جهازي مثل Ridomil Gold في الصباح الباكر.',
          '3. تجنب السقي بالرش العلوي والاعتماد على السقي بالتقطير لتقليل رطوبة الأوراق.'
        ],
        recommendedProductId: 'p3'
      },
      {
        id: 'd2',
        title: 'تبقع عين الطاووس في الزيتون (Spilocaea oleaginea)',
        crop: 'أشجار الزيتون',
        confidence: '94.8%',
        image: 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?w=400&auto=format&fit=crop&q=80',
        symptoms: 'ظهور دوائر داكنة تشبه ريش الطاووس على الأوراق وسقوطها المبكر مما يضعف الشجرة ويقلل الإنتاج.',
        darijaExplanation: 'عين الطاووس في الزيتون تجي خاصة بعد الشتاء الرطب. الشجرة تبدا طيّح الورق والإنتاج ينقص بزاف العام الجاي.',
        treatment: [
          '1. تقليم الأغصان الكثيفة لتهوية قلب شجرة الزيتون ودخول أشعة الشمس.',
          '2. المعالجة بمركب بوردو (Bouillie Bordelaise) أو هيدروكسيد النحاس.',
          '3. الرش مباشرة بعد موسم الجني والتقليم.'
        ],
        recommendedProductId: 'p3'
      },
      {
        id: 'd3',
        title: 'البياض الدقيقي (Oïdium) في الخضروات والقرعيات',
        crop: 'القرعيات والكروم',
        confidence: '97.1%',
        image: 'https://images.unsplash.com/photo-1589134777092-581ecd83056e?w=400&auto=format&fit=crop&q=80',
        symptoms: 'طبقة مسحوقية بيضاء تشبه الطحين تغطي الأسطح العلوية للأوراق تمنع عملية التركيب الضوئي.',
        darijaExplanation: 'البياض الدقيقي أو الغبارة، يمتص طاقة الورقة وتولي يابسة. الدواء تاعو الكبريت الميكروني في الجو المعتدل.',
        treatment: [
          '1. رش مسحوق الكبريت الميكروني القابل للبلل.',
          '2. التخلص من بقايا المحاصيل السابقة المصابة.',
          '3. الحفاظ على مسافات غرس متباعدة لضمان التهوية الجيدة.'
        ],
        recommendedProductId: 'p3'
      }
    ],

    // 4. Funding Programs
    fundingPrograms: [
      {
        id: 'f1',
        type: 'rfig',
        title: 'قرض الرفيق الموسمي لدعم الحبوب والمدخلات',
        institution: 'بنك الفلاحة والتنمية الريفية (BADR)',
        amount: 'يصل إلى 5,000,000 دج',
        duration: 'سنة واحدة (موسمي)',
        rate: '0% (فائدة مدعمة 100% من الدولة)',
        benefits: 'تمويل شراء البذور، الأسمدة، الوقود، وتكاليف الحصاد دون أي فوائد بنكية مع تسهيلات سداد بعد جني المحصول.'
      },
      {
        id: 'f2',
        type: 'equipment',
        title: 'قرض التحدي لاقتناء العتاد الفلاحي والسقي الذكي',
        institution: 'الصندوق الوطني للتعاون الفلاحي (CNMA)',
        amount: 'يصل إلى 15,000,000 دج',
        duration: '7 سنوات (متوسط المدى)',
        rate: 'فائدة تفاضلية مخفضة 2.5%',
        benefits: 'تمويل الجرارات، الحصادات، حفر الآبار وتركيب منظومات السقي بالتقطير والطاقة الشمسية مع فترة سماح 12 شهراً.'
      }
    ],

    // 5. Weather Forecast Data
    weatherData: {
      setif: {
        wilaya: 'سطيف (الهضاب العليا)',
        currentTemp: '24°',
        condition: 'مشمس مع هواء عليل',
        humidity: '42%',
        wind: '14 كم/سا شمالي',
        rainProb: '5%',
        soilMoist: '68% (ممتازة للبذر)',
        hourly: [
          { time: 'الآن', temp: '24°', icon: '☀️' },
          { time: '14:00', temp: '26°', icon: '☀️' },
          { time: '16:00', temp: '25°', icon: '⛅' },
          { time: '18:00', temp: '22°', icon: '⛅' },
          { time: '20:00', temp: '19°', icon: '🌙' },
          { time: '22:00', temp: '16°', icon: '🌙' },
          { time: '00:00', temp: '14°', icon: '❄️' }
        ],
        daily: [
          { day: 'اليوم (الأربعاء)', condition: 'مشمس ومستقر', temp: '26° / 14°', icon: '☀️' },
          { day: 'الخميس', condition: 'صقيع ليلي مرتقب ⚠️', temp: '21° / 6°', icon: '❄️' },
          { day: 'الجمعة', condition: 'غائم مع زخات خفيفة', temp: '19° / 9°', icon: '🌦️' },
          { day: 'السبت', condition: 'رياح جنوبية معتدلة', temp: '23° / 12°', icon: '💨' },
          { day: 'الأحد', condition: 'مشمس وهادئ', temp: '25° / 13°', icon: '☀️' }
        ]
      },
      biskra: {
        wilaya: 'بسكرة (الواحات والجنوب)',
        currentTemp: '34°',
        condition: 'حار وجاف',
        humidity: '18%',
        wind: '22 كم/سا سيروكو',
        rainProb: '0%',
        soilMoist: '35% (بحاجة لسقي ليلي)',
        hourly: [
          { time: 'الآن', temp: '34°', icon: '☀️' },
          { time: '14:00', temp: '37°', icon: '🔥' },
          { time: '16:00', temp: '36°', icon: '☀️' },
          { time: '18:00', temp: '32°', icon: '☀️' },
          { time: '20:00', temp: '29°', icon: '🌙' },
          { time: '22:00', temp: '26°', icon: '🌙' }
        ],
        daily: [
          { day: 'اليوم (الأربعاء)', condition: 'حار مع رياح رملية', temp: '37° / 24°', icon: '💨' },
          { day: 'الخميس', condition: 'موجة حر سيروكو ⚠️', temp: '39° / 26°', icon: '🔥' },
          { day: 'الجمعة', condition: 'انخفاض تدريجي', temp: '33° / 21°', icon: '☀️' },
          { day: 'السبت', condition: 'مشمس وصافٍ', temp: '32° / 20°', icon: '☀️' },
          { day: 'الأحد', condition: 'مشمس وهادئ', temp: '34° / 22°', icon: '☀️' }
        ]
      }
    }
  };

  // Initialize Application
  window.addEventListener('DOMContentLoaded', () => {
    initClock();
    initModalEvents();
    renderStoreCategories();
    renderStoreProducts();
    renderMachineryCards();
    renderHourlyForecast('setif');
    renderDailyForecast('setif');
    renderNotifications();
    updateCartUI();
    updateFavBadge();
  });

  // Modal Backdrop Click-Outside & Keyboard Escape Handler
  function initModalEvents() {
    // Delegated click listener to close modal when clicking outside its card
    document.addEventListener('click', (e) => {
      if (e.target && e.target.classList && e.target.classList.contains('app-modal')) {
        e.target.classList.remove('active');
      }
    });

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        window.FarmateApp.closeAllModals();
        window.FarmateApp.closeAllDrawers();
      }
    });
  }

  // Simulated Status Bar Clock
  function initClock() {
    const clockEl = document.getElementById('status-clock');
    function update() {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      if (clockEl) clockEl.innerText = `${hours}:${mins}`;
    }
    update();
    setInterval(update, 30000);
  }

  // Professional SVG Toast Notification Manager
  function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let iconSvg = `<svg class="toast-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`;
    if (type === 'info') {
      iconSvg = `<svg class="toast-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;
    } else if (type === 'warning') {
      iconSvg = `<svg class="toast-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`;
    }

    toast.innerHTML = `
      <span class="toast-icon-wrap">${iconSvg}</span>
      <span class="toast-text">${message}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-12px) scale(0.95)';
      toast.style.transition = 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)';
      setTimeout(() => toast.remove(), 260);
    }, 3200);
  }

  function updateFavBadge() {
    const textEl = document.getElementById('drawer-fav-count-text');
    if (textEl) {
      textEl.innerText = `${AppState.favorites.length} منتجات وعتاد محفوظ`;
    }
  }

  // UI Handlers & State Management Exposed to Window
  window.FarmateApp = {
    showToast: showToast,

    // Login Action
    handleLogin: function () {
      const phone = document.getElementById('login-phone').value;
      const pwd = document.getElementById('login-password').value;

      if (!phone || !pwd) {
        showToast('يرجى إدخال رقم الهاتف وكلمة المرور', 'warning');
        return;
      }

      AppState.isLoggedIn = true;
      document.getElementById('view-login').classList.remove('active-view');
      document.getElementById('main-app').classList.remove('hidden');
      
      showToast(`مرحباً بك ${AppState.userProfile.name} في منظومة فارميت الذكية 🌾`, 'success');
      window.FarmateApp.switchTab('tab-advisor');
    },

    // Demo Fill Shortcut
    fillDemoLogin: function () {
      document.getElementById('login-phone').value = '05 50 12 34 56';
      document.getElementById('login-password').value = 'farmate2026';
      showToast('تم ملء بيانات الحساب النموذجي لعمي رابح', 'info');
    },

    // Logout
    handleLogout: function () {
      window.FarmateApp.closeAllDrawers();
      window.FarmateApp.closeAllModals();
      AppState.isLoggedIn = false;
      document.getElementById('main-app').classList.add('hidden');
      document.getElementById('view-login').classList.add('active-view');
      showToast('تم تسجيل الخروج بنجاح', 'info');
    },

    // Navigation Switcher (5 Bottom Tabs)
    switchTab: function (tabId, btnEl) {
      AppState.currentTab = tabId;
      document.querySelectorAll('.tab-page').forEach(page => page.classList.remove('active-tab'));
      const activePage = document.getElementById(tabId);
      if (activePage) activePage.classList.add('active-tab');

      document.querySelectorAll('.bottom-nav-bar .nav-item').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-tab') === tabId) {
          btn.classList.add('active');
        }
      });

      const scrollContainer = document.getElementById('app-content-scroll');
      if (scrollContainer) scrollContainer.scrollTop = 0;

      if (tabId === 'tab-store') renderStoreProducts();
      if (tabId === 'tab-machinery') renderMachineryCards();
      if (tabId === 'tab-funding') renderFundingCards('all');
    },

    // Offline Mode Simulator
    toggleOfflineMode: function () {
      AppState.isOffline = !AppState.isOffline;
      const banner = document.getElementById('offline-cached-banner');
      const btn = document.getElementById('btn-offline-toggle');

      if (AppState.isOffline) {
        if (banner) banner.classList.remove('hidden');
        if (btn) btn.style.color = '#EF4444';
        showToast('تم تفعيل وضع عدم الاتصال: يتم استخدام البيانات المحفوظة محلياً (Cached Data)', 'warning');
      } else {
        if (banner) banner.classList.add('hidden');
        if (btn) btn.style.color = '';
        showToast('تمت استعادة الاتصال بالإنترنت ومزامنة البيانات ⚡', 'success');
      }
    },

    // Dark / Light Theme
    toggleTheme: function () {
      const isDark = document.body.getAttribute('data-theme') === 'dark';
      if (!isDark) {
        document.body.setAttribute('data-theme', 'dark');
        AppState.theme = 'dark';
        showToast('تم تفعيل الوضع الليلي', 'info');
      } else {
        document.body.removeAttribute('data-theme');
        AppState.theme = 'light';
        showToast('تم تفعيل الوضع النهاري', 'info');
      }
    },

    // Drawers Management
    openDrawer: function (drawerId) {
      window.FarmateApp.closeAllDrawers();
      const drawer = document.getElementById(drawerId);
      const backdrop = document.getElementById('drawer-backdrop');
      if (drawer && backdrop) {
        drawer.classList.add('active');
        backdrop.classList.add('active');
      }

      if (drawerId === 'advisor-history-drawer') {
        renderAdvisorHistory();
      }
    },

    closeDrawer: function (drawerId) {
      const drawer = document.getElementById(drawerId);
      const backdrop = document.getElementById('drawer-backdrop');
      if (drawer) drawer.classList.remove('active');
      if (backdrop) backdrop.classList.remove('active');
    },

    closeAllDrawers: function () {
      document.querySelectorAll('.slide-drawer, .slide-bottom-sheet').forEach(el => el.classList.remove('active'));
      const backdrop = document.getElementById('drawer-backdrop');
      if (backdrop) backdrop.classList.remove('active');
    },

    // Modals Management
    openModal: function (modalId) {
      const modal = document.getElementById(modalId);
      if (modal) modal.classList.add('active');
    },

    closeModal: function (modalId) {
      const modal = document.getElementById(modalId);
      if (modal) modal.classList.remove('active');
    },

    closeAllModals: function () {
      document.querySelectorAll('.app-modal').forEach(el => el.classList.remove('active'));
    },

    // =========================================================================
    // AI ADVISOR LOGIC
    // =========================================================================
    handleUserSendMessage: function () {
      const input = document.getElementById('chat-user-input');
      const text = input.value.trim();
      if (!text) return;

      appendChatMessage(text, 'user');
      input.value = '';
      simulateAIResponse(text);
    },

    sendQuickPrompt: function (promptText) {
      appendChatMessage(promptText, 'user');
      simulateAIResponse(promptText);
    },

    askAdvisorFromAlert: function (question) {
      window.FarmateApp.switchTab('tab-advisor');
      appendChatMessage(question, 'user');
      simulateAIResponse(question);
    },

    resetAdvisorChat: function () {
      const chatBox = document.getElementById('chat-messages-box');
      chatBox.innerHTML = `
        <div class="chat-msg bot-msg animate-fade-in">
          <div class="msg-bot-avatar">🤖</div>
          <div class="msg-bubble">
            <div class="msg-header">
              <span class="bot-name-label">فارميت الذكي</span>
              <span class="msg-time">الآن</span>
            </div>
            <div class="msg-body">
              <p>مرحباً بك في محادثة جديدة يا <strong>${AppState.userProfile.name}</strong>! واش نقدر نعاونك فيه اليوم؟ 🌱</p>
            </div>
          </div>
        </div>
      `;
      showToast('تم بدء جلسة استشارة فلاحية جديدة', 'info');
    },

    toggleVoiceInput: function () {
      const btn = document.getElementById('btn-voice-record');
      if (!AppState.isVoiceRecording) {
        AppState.isVoiceRecording = true;
        btn.classList.add('recording');
        showToast('جاري الاستماع لصوتك بالدارجة الجزائرية... 🎙️', 'info');
        setTimeout(() => {
          AppState.isVoiceRecording = false;
          btn.classList.remove('recording');
          document.getElementById('chat-user-input').value = 'عندي مشكل اصفرار في أوراق الطماطم بعد السقي الأخير';
          window.FarmateApp.handleUserSendMessage();
        }, 2500);
      }
    },

    // =========================================================================
    // PLANT DISEASE DETECTION (AI SCANNER)
    // =========================================================================
    openDiseaseDetectionModal: function () {
      window.FarmateApp.openModal('modal-disease-scan');
      document.getElementById('scan-loading-indicator').classList.add('hidden');
      document.getElementById('scan-result-card').classList.add('hidden');
      document.getElementById('btn-run-scan').classList.remove('hidden');
    },

    selectDiseaseSample: function (index, el) {
      AppState.selectedSampleIndex = index;
      document.querySelectorAll('.sample-item').forEach(item => item.classList.remove('active'));
      el.classList.add('active');

      const sample = MOCK_DATA.diseaseSamples[index];
      const previewImg = document.getElementById('scan-preview-target');
      if (previewImg) previewImg.src = sample.image;
    },

    simulateFileUpload: function () {
      document.getElementById('file-plant-input').click();
    },

    handleImageUploadPreview: function (e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
          const previewArea = document.getElementById('dropzone-preview-area');
          previewArea.innerHTML = `
            <img src="${event.target.result}" style="max-height:80px; border-radius:8px; margin-bottom:4px;">
            <strong>تم تحميل صورتك بنجاح (${file.name})</strong>
            <span style="color:var(--neon-green)">جاهز للتحليل الفوري</span>
          `;
          document.getElementById('scan-preview-target').src = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    },

    runDiseaseAnalysis: function () {
      const loading = document.getElementById('scan-loading-indicator');
      const resultCard = document.getElementById('scan-result-card');
      const btn = document.getElementById('btn-run-scan');

      btn.classList.add('hidden');
      loading.classList.remove('hidden');
      resultCard.classList.add('hidden');

      setTimeout(() => {
        loading.classList.add('hidden');
        resultCard.classList.remove('hidden');

        const sample = MOCK_DATA.diseaseSamples[AppState.selectedSampleIndex] || MOCK_DATA.diseaseSamples[0];
        const recProduct = MOCK_DATA.products.find(p => p.id === sample.recommendedProductId) || MOCK_DATA.products[2];

        resultCard.innerHTML = `
          <div class="result-header-row">
            <div>
              <span style="font-size:11px; color:var(--text-muted);">التشخيص المؤكد للذكاء الاصطناعي:</span>
              <h4 class="disease-name">${sample.title}</h4>
            </div>
            <span class="confidence-badge">دقة ${sample.confidence}</span>
          </div>

          <p class="result-explanation"><strong>الشرح بالدارجة:</strong> ${sample.darijaExplanation}</p>

          <div class="result-treatment-box">
            <strong class="treatment-title">📋 خطة العلاج والتوصية الزراعية:</strong>
            <ul style="padding-right: 18px; margin: 4px 0; line-height: 1.45;">
              ${sample.treatment.map(t => `<li>${t}</li>`).join('')}
            </ul>
          </div>

          <div style="margin-top: 10px;">
            <span style="font-size:11.5px; font-weight:700; color:var(--text-main); display:block; margin-bottom:6px;">💊 الدواء الموصى به من متجر فارميت:</span>
            <div class="chat-product-recommendation">
              <img src="${recProduct.image}" alt="${recProduct.name}" class="chat-product-img">
              <div class="chat-product-meta">
                <div class="chat-product-title">${recProduct.name}</div>
                <div class="chat-product-price">${recProduct.price.toLocaleString()} دج <small>(${recProduct.unit})</small></div>
              </div>
              <button class="btn-primary-neon btn-sm" onclick="window.FarmateApp.addToCart('${recProduct.id}')">
                <span>أضف للسلة</span>
              </button>
            </div>
          </div>
        `;

        showToast(`تم تشخيص المرض بدقة ${sample.confidence}`, 'success');
      }, 1600);
    },

    // =========================================================================
    // STORE & CART MANAGEMENT (WITH PAGINATION & EMPTY SEARCH)
    // =========================================================================
    setCategory: function (catId, btnEl) {
      AppState.selectedCategory = catId;
      AppState.storePage = 1;
      document.querySelectorAll('.cat-pill').forEach(b => b.classList.remove('active'));
      if (btnEl) btnEl.classList.add('active');
      renderStoreProducts();
    },

    filterStoreProducts: function () {
      AppState.storePage = 1;
      renderStoreProducts();
    },

    resetStoreSearch: function () {
      const input = document.getElementById('store-search-input');
      if (input) input.value = '';
      AppState.selectedCategory = 'all';
      AppState.storePage = 1;
      renderStoreCategories();
      renderStoreProducts();
      showToast('تمت إعادة ضبط فلاتر البحث', 'info');
    },

    setStorePage: function (page) {
      AppState.storePage = page;
      renderStoreProducts();
      const scrollEl = document.getElementById('app-content-scroll');
      if (scrollEl) scrollEl.scrollTo({ top: 0, behavior: 'smooth' });
    },

    // RICH PRODUCT DETAILS PAGE / MODAL
    openProductDetails: function (prodId) {
      const prod = MOCK_DATA.products.find(p => p.id === prodId);
      if (!prod) return;

      AppState.currentDetailProductId = prodId;
      AppState.detailSelectedQty = 1;

      document.getElementById('detail-prod-title').innerText = prod.name;
      const body = document.getElementById('detail-product-body');
      
      const isFav = AppState.favorites.includes(prod.id);

      body.innerHTML = `
        <div class="product-detail-modal-layout">
          <!-- Main Hero Image Gallery -->
          <div class="detail-gallery-wrap">
            <div class="detail-main-img-box">
              <img id="detail-hero-image" src="${prod.image}" alt="${prod.name}">
              ${prod.badge ? `<span class="detail-badge-pill">${prod.badge}</span>` : ''}
              <button class="detail-fav-btn ${isFav ? 'active' : ''}" onclick="window.FarmateApp.toggleFavorite('${prod.id}', this)" title="إضافة إلى المفضلة">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="${isFav ? '#EF4444' : 'none'}" stroke="${isFav ? '#EF4444' : '#fff'}" stroke-width="2.2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
              </button>
            </div>
          </div>

          <!-- Supplier & Rating Row -->
          <div class="detail-meta-top">
            <div class="detail-supplier-tag">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <span>${prod.supplier}</span>
              <span class="verified-dot" title="مورد فلاحي معتمد">✓</span>
            </div>
            <span class="rating-pill">★ ${prod.rating} (${prod.reviewsCount} تقييم)</span>
          </div>

          <!-- Title and Description -->
          <h3 class="detail-title">${prod.name}</h3>
          <p class="detail-desc">${prod.description}</p>

          <!-- Agricultural Specifications Card -->
          <div class="detail-specs-box glass-panel">
            <div class="detail-spec-item">
              <span class="spec-label">🌱 التركيبة / الصنف:</span>
              <strong class="spec-value">${prod.specs?.composition || 'صنف ممتاز مطابق للمواصفات'}</strong>
            </div>
            <div class="detail-spec-item">
              <span class="spec-label">⚖️ المقدار والاستعمال:</span>
              <strong class="spec-value">${prod.specs?.dosage || 'حسب توصيات المرشد الفلاحي'}</strong>
            </div>
            <div class="detail-spec-item">
              <span class="spec-label">📍 المنشأ والاعتماد:</span>
              <strong class="spec-value">${prod.specs?.origin || 'الجزائر - معتمد'}</strong>
            </div>
          </div>

          <!-- Price & Stock Card -->
          <div class="detail-price-box glass-panel">
            <div>
              <span class="price-sub-label">سعر الوحدة (${prod.unit}):</span>
              <div class="detail-price-val">
                <span id="detail-unit-price">${prod.price.toLocaleString()} دج</span>
                ${prod.oldPrice ? `<small class="old-price">${prod.oldPrice.toLocaleString()} دج</small>` : ''}
              </div>
            </div>
            <span class="stock-status-pill">
              <span class="pulse-dot"></span>
              متوفر وجاهز للشحن
            </span>
          </div>

          <!-- Quantity Selector & Dynamic Total -->
          <div class="detail-qty-row">
            <span class="qty-prompt">الكمية المطلوبة:</span>
            <div class="detail-qty-counter">
              <button type="button" class="btn-counter" onclick="window.FarmateApp.changeDetailQty(-1)">-</button>
              <span class="counter-display" id="detail-qty-display">1</span>
              <button type="button" class="btn-counter" onclick="window.FarmateApp.changeDetailQty(1)">+</button>
            </div>
            <div class="detail-subtotal-display">
              <span>الإجمالي:</span>
              <strong id="detail-calculated-total">${prod.price.toLocaleString()} دج</strong>
            </div>
          </div>

          <!-- Actions: Add to Cart & Buy Now -->
          <div class="detail-actions-row">
            <button class="btn-primary-neon btn-lg flex-1" onclick="window.FarmateApp.addDetailToCart('${prod.id}')">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
              <span>أضف إلى السلة</span>
            </button>
            <button class="btn-buy-direct btn-lg" onclick="window.FarmateApp.buyNowDirect('${prod.id}')">
              <span>شراء مباشر ⚡</span>
            </button>
            <button class="icon-circle-btn" onclick="window.FarmateApp.shareItem('${prod.name}')" title="مشاركة">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
            </button>
          </div>
        </div>
      `;

      window.FarmateApp.openModal('modal-product-detail');
    },

    changeDetailQty: function (delta) {
      const prod = MOCK_DATA.products.find(p => p.id === AppState.currentDetailProductId);
      if (!prod) return;

      AppState.detailSelectedQty = Math.max(1, AppState.detailSelectedQty + delta);
      const display = document.getElementById('detail-qty-display');
      const totalDisplay = document.getElementById('detail-calculated-total');

      if (display) display.innerText = AppState.detailSelectedQty;
      if (totalDisplay) totalDisplay.innerText = `${(prod.price * AppState.detailSelectedQty).toLocaleString()} دج`;
    },

    addDetailToCart: function (prodId) {
      const prod = MOCK_DATA.products.find(p => p.id === prodId);
      if (!prod) return;

      const qty = AppState.detailSelectedQty || 1;
      const existing = AppState.cart.find(item => item.id === prodId);
      if (existing) {
        existing.qty += qty;
      } else {
        AppState.cart.push({
          id: prod.id,
          name: prod.name,
          price: prod.price,
          qty: qty,
          image: prod.image,
          unit: prod.unit
        });
      }

      updateCartUI();
      window.FarmateApp.closeModal('modal-product-detail');
      showToast(`تمت إضافة (${qty}) ${prod.unit} من "${prod.name}" إلى السلة 🛒`, 'success');
    },

    buyNowDirect: function (prodId) {
      window.FarmateApp.addDetailToCart(prodId);
      window.FarmateApp.openCheckoutModal();
    },

    addToCart: function (prodId) {
      const prod = MOCK_DATA.products.find(p => p.id === prodId);
      if (!prod) return;

      const existing = AppState.cart.find(item => item.id === prodId);
      if (existing) {
        existing.qty += 1;
      } else {
        AppState.cart.push({
          id: prod.id,
          name: prod.name,
          price: prod.price,
          qty: 1,
          image: prod.image,
          unit: prod.unit
        });
      }

      updateCartUI();
      showToast(`تمت إضافة "${prod.name}" إلى السلة 🛒`, 'success');
    },

    updateCartQty: function (prodId, delta) {
      const item = AppState.cart.find(i => i.id === prodId);
      if (!item) return;

      item.qty += delta;
      if (item.qty <= 0) {
        AppState.cart = AppState.cart.filter(i => i.id !== prodId);
        showToast('تم حذف المنتج من السلة', 'info');
      }

      updateCartUI();
    },

    removeFromCart: function (prodId) {
      const item = AppState.cart.find(i => i.id === prodId);
      AppState.cart = AppState.cart.filter(i => i.id !== prodId);
      updateCartUI();
      showToast(`تم حذف "${item ? item.name : 'المنتج'}" من السلة`, 'info');
    },

    clearCart: function () {
      if (AppState.cart.length === 0) {
        showToast('سلة المشتريات فارغة بالفعل', 'info');
        return;
      }
      AppState.cart = [];
      updateCartUI();
      showToast('تم إفراغ سلة المشتريات بالكامل 🗑️', 'info');
    },

    applyCoupon: function () {
      const input = document.getElementById('cart-promo-input');
      const val = input.value.trim().toUpperCase();
      if (val === 'FARMATE2026') {
        showToast('تم تطبيق خصم 10% بنجاح على سلتك الفلاحية! 🎉', 'success');
      } else {
        showToast('رمز القسيمة غير صالح أو منتهي الصلاحية', 'warning');
      }
    },

    openCheckoutModal: function () {
      if (AppState.cart.length === 0) {
        showToast('سلة المشتريات فارغة!', 'warning');
        return;
      }
      window.FarmateApp.closeDrawer('cart-drawer');
      window.FarmateApp.openModal('modal-checkout');
    },

    processFinalOrder: function () {
      window.FarmateApp.closeModal('modal-checkout');
      
      const newOrderId = `DZ-${Math.floor(1000 + Math.random() * 9000)}`;
      const subtotal = AppState.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
      const newOrder = {
        id: newOrderId,
        date: 'الآن',
        status: 'in_transit',
        statusText: 'قيد التجهيز والشحن 🚚',
        eta: 'الموعد المتوقع: خلال 24 ساعة',
        total: subtotal + 800,
        deliveryWilaya: `${AppState.userProfile.wilaya} - ${AppState.userProfile.commune}`,
        driverName: 'سائق فارميت المعتمد',
        driverPhone: '05 50 00 11 22',
        items: [...AppState.cart]
      };

      AppState.myOrders.unshift(newOrder);
      AppState.cart = [];
      updateCartUI();

      AppState.notifications.unshift({
        id: Date.now(),
        title: `تم تأكيد طلبك رقم #${newOrderId} وجاري تجهيزه للشحن!`,
        time: 'الآن',
        icon: '📦',
        unread: true
      });
      renderNotifications();

      showToast(`تم تأكيد طلبك بنجاح برقم #${newOrderId}! سيتم التواصل معك عبر الهاتف 🌾`, 'success');
    },

    // =========================================================================
    // WISHLIST & FAVORITES MANAGEMENT
    // =========================================================================
    toggleFavorite: function (id, btnEl) {
      const idx = AppState.favorites.indexOf(id);
      if (idx > -1) {
        AppState.favorites.splice(idx, 1);
        if (btnEl) btnEl.classList.remove('active');
        showToast('تمت إزالة العنصر من المفضلة', 'info');
      } else {
        AppState.favorites.push(id);
        if (btnEl) btnEl.classList.add('active');
        showToast('تمت إضافة العنصر إلى قائمة المفضلة ❤️', 'success');
      }

      updateFavBadge();
      renderStoreProducts();
    },

    openFavoritesModal: function () {
      window.FarmateApp.closeDrawer('profile-drawer');
      const body = document.getElementById('wishlist-modal-body');
      const subtitle = document.getElementById('wishlist-subtitle');
      if (subtitle) subtitle.innerText = `${AppState.favorites.length} عناصر محفوظة`;

      if (AppState.favorites.length === 0) {
        body.innerHTML = `
          <div class="empty-state-card">
            <div class="empty-state-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" stroke-width="1.8"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            </div>
            <h4>قائمة المفضلة فارغة حالياً</h4>
            <p>يمكنك حفظ المنتجات والعتاد الذي يعجبك للرجوع إليه وطلبه لاحقاً بسهولة.</p>
            <button class="btn-primary-neon btn-sm mt-3" onclick="window.FarmateApp.closeModal('modal-wishlist'); window.FarmateApp.switchTab('tab-store');">
              تصفح المتجر الفلاحي الآن
            </button>
          </div>
        `;
      } else {
        const favProducts = MOCK_DATA.products.filter(p => AppState.favorites.includes(p.id));
        const favMachines = MOCK_DATA.machinery.filter(m => AppState.favorites.includes(m.id));

        let html = '<div class="wishlist-items-grid">';
        
        favProducts.forEach(prod => {
          html += `
            <div class="wishlist-item-card glass-panel">
              <img src="${prod.image}" alt="${prod.name}" class="wishlist-thumb">
              <div class="wishlist-info">
                <div class="wishlist-type-badge">🌾 منتج فلاحي</div>
                <h4 class="wishlist-title" onclick="window.FarmateApp.closeModal('modal-wishlist'); window.FarmateApp.openProductDetails('${prod.id}')">${prod.name}</h4>
                <div class="wishlist-price">${prod.price.toLocaleString()} دج <small>(${prod.unit})</small></div>
                <div class="wishlist-actions">
                  <button class="btn-primary-neon btn-sm" onclick="window.FarmateApp.addToCart('${prod.id}')">
                    <span>أضف للسلة</span>
                  </button>
                  <button class="btn-remove-fav" onclick="window.FarmateApp.toggleFavorite('${prod.id}'); window.FarmateApp.openFavoritesModal();" title="حذف من المفضلة">✕</button>
                </div>
              </div>
            </div>
          `;
        });

        favMachines.forEach(m => {
          html += `
            <div class="wishlist-item-card glass-panel">
              <img src="${m.image}" alt="${m.title}" class="wishlist-thumb">
              <div class="wishlist-info">
                <div class="wishlist-type-badge">🚜 عتاد زراعي</div>
                <h4 class="wishlist-title" onclick="window.FarmateApp.closeModal('modal-wishlist'); window.FarmateApp.openMachineDetails('${m.id}')">${m.title}</h4>
                <div class="wishlist-price">${m.price}</div>
                <div class="wishlist-actions">
                  <button class="btn-primary-neon btn-sm" onclick="window.FarmateApp.closeModal('modal-wishlist'); window.FarmateApp.openMachineDetails('${m.id}')">
                    <span>اتصال بالصاحب</span>
                  </button>
                  <button class="btn-remove-fav" onclick="window.FarmateApp.toggleFavorite('${m.id}'); window.FarmateApp.openFavoritesModal();" title="حذف من المفضلة">✕</button>
                </div>
              </div>
            </div>
          `;
        });

        html += '</div>';
        body.innerHTML = html;
      }

      window.FarmateApp.openModal('modal-wishlist');
    },

    // =========================================================================
    // ACCOUNT & PROFILE EDITING MANAGEMENT
    // =========================================================================
    openAccountModal: function () {
      window.FarmateApp.closeDrawer('profile-drawer');
      const p = AppState.userProfile;

      document.getElementById('acc-input-name').value = p.name;
      document.getElementById('acc-input-farm').value = p.farmName;
      document.getElementById('acc-input-phone').value = p.phone;
      document.getElementById('acc-input-wilaya').value = p.wilaya;
      document.getElementById('acc-input-commune').value = p.commune;
      document.getElementById('acc-input-card').value = p.farmerCard;
      document.getElementById('acc-input-activity').value = p.activity;
      document.getElementById('acc-input-bio').value = p.bio;
      document.getElementById('acc-preview-avatar').src = p.avatar;

      window.FarmateApp.openModal('modal-account');
    },

    setProfileAvatar: function (url, btnEl) {
      document.getElementById('acc-preview-avatar').src = url;
      document.querySelectorAll('.avatar-chip').forEach(b => b.classList.remove('active'));
      if (btnEl) btnEl.classList.add('active');
    },

    saveProfileInfo: function () {
      const name = document.getElementById('acc-input-name').value.trim();
      const farm = document.getElementById('acc-input-farm').value.trim();
      const phone = document.getElementById('acc-input-phone').value.trim();
      const wilaya = document.getElementById('acc-input-wilaya').value.trim();
      const commune = document.getElementById('acc-input-commune').value.trim();
      const card = document.getElementById('acc-input-card').value.trim();
      const activity = document.getElementById('acc-input-activity').value.trim();
      const bio = document.getElementById('acc-input-bio').value.trim();
      const avatar = document.getElementById('acc-preview-avatar').src;

      AppState.userProfile = {
        name,
        farmName: farm,
        phone,
        wilaya,
        commune,
        farmerCard: card,
        activity,
        bio,
        avatar
      };

      // Update Topbar
      const topbarGreeting = document.getElementById('topbar-greeting-name');
      if (topbarGreeting) topbarGreeting.innerText = `${name.split(' ')[0]} 🌾`;
      const topbarAvatar = document.getElementById('topbar-avatar-img');
      if (topbarAvatar) topbarAvatar.src = avatar;

      // Update Drawer
      const drawerName = document.getElementById('drawer-profile-name');
      if (drawerName) drawerName.innerText = name;
      const drawerSub = document.getElementById('drawer-profile-sub');
      if (drawerSub) drawerSub.innerText = `مزارع معتمد • بطاقة فلاح رقم ${card}`;
      const drawerLoc = document.getElementById('drawer-profile-loc');
      if (drawerLoc) drawerLoc.innerText = `📍 بلدية ${commune}، ولاية ${wilaya}`;
      const drawerAvatar = document.getElementById('drawer-avatar-img');
      if (drawerAvatar) drawerAvatar.src = avatar;

      window.FarmateApp.closeModal('modal-account');
      showToast('تم حفظ وتحديث بيانات حسابك الفلاحي بنجاح! 💾', 'success');
    },

    // =========================================================================
    // MY ORDERS PAGE / MODAL
    // =========================================================================
    openOrdersTrackerModal: function () {
      window.FarmateApp.closeDrawer('profile-drawer');
      const content = document.getElementById('orders-tracker-content');
      if (!content) return;

      if (AppState.myOrders.length === 0) {
        content.innerHTML = `
          <div class="empty-state-card">
            <div class="empty-state-icon">📦</div>
            <h4>لا توجد طلبيات سابقة</h4>
            <p>يمكنك طلب البذور والأسمدة من المتجر واستلامها مباشرة في مزرعتك.</p>
          </div>
        `;
      } else {
        content.innerHTML = AppState.myOrders.map(order => `
          <div class="order-full-card glass-panel">
            <div class="order-card-header">
              <div>
                <strong class="order-id-title">طلب رقم #${order.id}</strong>
                <span class="order-date-text">📅 ${order.date}</span>
              </div>
              <span class="status-pill ${order.status === 'delivered' ? 'status-delivered' : 'status-in-progress'}">
                ${order.statusText}
              </span>
            </div>

            <!-- Visual Progress Stepper -->
            <div class="tracking-steps-horizontal">
              <div class="step-node completed">
                <div class="node-circle">✓</div>
                <span class="node-label">تم التأكيد</span>
              </div>
              <div class="step-connector ${order.status === 'in_transit' || order.status === 'delivered' ? 'completed' : ''}"></div>
              <div class="step-node ${order.status === 'in_transit' ? 'active' : order.status === 'delivered' ? 'completed' : ''}">
                <div class="node-circle">${order.status === 'delivered' ? '✓' : '🚚'}</div>
                <span class="node-label">مع السائق</span>
              </div>
              <div class="step-connector ${order.status === 'delivered' ? 'completed' : ''}"></div>
              <div class="step-node ${order.status === 'delivered' ? 'completed' : ''}">
                <div class="node-circle">${order.status === 'delivered' ? '✓' : '📦'}</div>
                <span class="node-label">تم التسليم</span>
              </div>
            </div>

            <!-- Items in order -->
            <div class="order-items-sublist">
              ${order.items.map(item => `
                <div class="order-item-row">
                  <span>${item.name} (${item.qty} × ${item.price.toLocaleString()} دج)</span>
                  <strong>${(item.qty * item.price).toLocaleString()} دج</strong>
                </div>
              `).join('')}
            </div>

            <div class="order-card-footer">
              <div>
                <span class="order-total-label">الإجمالي الكلي:</span>
                <strong class="order-total-val">${order.total.toLocaleString()} دج</strong>
              </div>
              <div class="order-footer-btns">
                <button class="btn-sm-ghost" onclick="window.FarmateApp.showToast('جاري تنزيل الفاتورة الضريبية #${order.id} PDF...', 'info')">
                  📄 الفاتورة
                </button>
                <button class="btn-primary-neon btn-sm" onclick="window.FarmateApp.showToast('جاري الاتصال بسائق التوصيل: ${order.driverName} (${order.driverPhone})', 'info')">
                  📞 السائق
                </button>
              </div>
            </div>
          </div>
        `).join('');
      }

      window.FarmateApp.openModal('modal-orders');
    },

    // =========================================================================
    // MY LISTINGS (PRODUCTS & MACHINERY) MANAGEMENT
    // =========================================================================
    openMyListingsModal: function () {
      window.FarmateApp.closeDrawer('profile-drawer');
      const container = document.getElementById('my-listings-container');
      const countBadge = document.getElementById('my-listings-count-badge');
      if (countBadge) countBadge.innerText = `${AppState.myListings.length} عروض مسجلة`;

      if (AppState.myListings.length === 0) {
        container.innerHTML = `
          <div class="empty-state-card">
            <div class="empty-state-icon">🚜</div>
            <h4>لم تنشر أي عتاد أو محصول بعد</h4>
            <p>يمكنك تأجير جرارك أو آلاتك الفلاحية أو بيع محصولك مباشرة للمزارعين في منطقتك.</p>
          </div>
        `;
      } else {
        container.innerHTML = AppState.myListings.map(item => `
          <div class="listing-manage-card glass-panel">
            <img src="${item.image}" alt="${item.title}" class="listing-thumb">
            <div class="listing-manage-info">
              <div class="listing-header-row">
                <span class="listing-cat-badge">${item.category}</span>
                <span class="listing-status-badge ${item.active ? 'badge-active' : 'badge-paused'}">
                  ${item.active ? 'نشط ومتاح' : 'متوقف مؤقتاً'}
                </span>
              </div>
              <h4 class="listing-title">${item.title}</h4>
              <div class="listing-price">${item.price}</div>
              <div class="listing-stats-row">
                <span>👁️ ${item.views} مشاهدة</span>
                <span>📞 ${item.calls} اتصال</span>
              </div>
              <div class="listing-actions-row">
                <button class="btn-sm-ghost" onclick="window.FarmateApp.toggleListingStatus('${item.id}')">
                  ${item.active ? 'إيقاف مؤقت' : 'تفعيل العرض'}
                </button>
                <button class="btn-remove-fav" onclick="window.FarmateApp.deleteListing('${item.id}')" title="حذف العرض">
                  🗑️
                </button>
              </div>
            </div>
          </div>
        `).join('');
      }

      window.FarmateApp.openModal('modal-my-listings');
    },

    toggleListingStatus: function (id) {
      const item = AppState.myListings.find(l => l.id === id);
      if (!item) return;
      item.active = !item.active;
      showToast(item.active ? 'تم تفعيل العرض وجعله متاحاً للمزارعين' : 'تم إيقاف العرض مؤقتاً', 'info');
      window.FarmateApp.openMyListingsModal();
    },

    deleteListing: function (id) {
      AppState.myListings = AppState.myListings.filter(l => l.id !== id);
      showToast('تم حذف العرض بنجاح', 'info');
      window.FarmateApp.openMyListingsModal();
    },

    openAddListingModal: function () {
      window.FarmateApp.closeModal('modal-my-listings');
      window.FarmateApp.openModal('modal-add-listing');
    },

    handleListingTypeChange: function (type) {
      const unitInput = document.getElementById('new-listing-unit');
      if (type === 'machinery') {
        unitInput.placeholder = 'مثال: / هكتار أو / يوم';
      } else {
        unitInput.placeholder = 'مثال: / قنطار أو / كغ';
      }
    },

    submitNewListing: function () {
      const type = document.getElementById('new-listing-type').value;
      const title = document.getElementById('new-listing-title').value.trim();
      const price = document.getElementById('new-listing-price').value.trim();
      const unit = document.getElementById('new-listing-unit').value.trim();
      const location = document.getElementById('new-listing-location').value.trim();
      const desc = document.getElementById('new-listing-desc').value.trim();

      const newListing = {
        id: `list-${Date.now()}`,
        type: type,
        title: title,
        price: `${price} ${unit}`,
        category: type === 'machinery' ? 'آلات وعتاد فلاحي' : 'محاصيل ومنتجات',
        location: location,
        active: true,
        views: 1,
        calls: 0,
        image: type === 'machinery' 
          ? 'https://images.unsplash.com/photo-1594771804886-a933bb2d609b?w=400&auto=format&fit=crop&q=80'
          : 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&auto=format&fit=crop&q=80'
      };

      AppState.myListings.unshift(newListing);
      window.FarmateApp.closeModal('modal-add-listing');
      showToast('تم نشر عرضك الفلاحي الجديد بنجاح على منصة فارميت! 🚀', 'success');
      window.FarmateApp.openMyListingsModal();
    },

    // =========================================================================
    // MACHINERY DIRECTORY & DETAIL
    // =========================================================================
    filterMachinery: function () {
      AppState.machineryPage = 1;
      renderMachineryCards();
    },

    setMachineryCategory: function (catId, btnEl) {
      AppState.selectedMachineryCat = catId;
      AppState.machineryPage = 1;
      document.querySelectorAll('#machinery-categories-bar .pill-chip').forEach(b => b.classList.remove('active'));
      if (btnEl) btnEl.classList.add('active');
      renderMachineryCards();
    },

    resetMachinerySearch: function () {
      const input = document.getElementById('machinery-search-input');
      if (input) input.value = '';
      AppState.selectedMachineryCat = 'all';
      AppState.machineryPage = 1;
      document.querySelectorAll('#machinery-categories-bar .pill-chip').forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-cat') === 'all');
      });
      renderMachineryCards();
      showToast('تمت إعادة ضبط فلاتر البحث', 'info');
    },

    setMachineryPage: function (page) {
      AppState.machineryPage = page;
      renderMachineryCards();
      const scrollEl = document.getElementById('app-content-scroll');
      if (scrollEl) scrollEl.scrollTo({ top: 0, behavior: 'smooth' });
    },

    openMachineDetails: function (machId) {
      const m = MOCK_DATA.machinery.find(item => item.id === machId);
      if (!m) return;

      document.getElementById('detail-machine-title').innerText = m.title;
      const body = document.getElementById('detail-machinery-body');
      
      const isFav = AppState.favorites.includes(m.id);

      body.innerHTML = `
        <div style="width:100%; height:190px; border-radius:16px; overflow:hidden; margin-bottom:14px; position:relative;">
          <img src="${m.image}" alt="${m.title}" style="width:100%; height:100%; object-fit:cover;">
          <button class="detail-fav-btn ${isFav ? 'active' : ''}" onclick="window.FarmateApp.toggleFavorite('${m.id}', this)" style="position:absolute; top:10px; left:10px;" title="حفظ في المفضلة">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="${isFav ? '#EF4444' : 'none'}" stroke="${isFav ? '#EF4444' : '#fff'}" stroke-width="2.2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          </button>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
          <span style="color:var(--primary-purple); font-weight:700; font-size:12.5px;">📍 ${m.location}</span>
          <span class="rating-pill">★ ${m.rating} (${m.jobsDone} مهمة منجزة)</span>
        </div>

        <h3 style="font-size:16px; font-weight:800; margin-bottom:6px;">${m.title}</h3>
        <p style="font-size:12.5px; color:var(--text-secondary); margin-bottom:12px;">صاحب الآلة: <strong>${m.owner}</strong> • ${m.operator}</p>

        <div style="background:var(--surface-subtle); padding:12px; border-radius:14px; margin-bottom:14px;">
          <strong style="font-size:12px; color:var(--text-main); display:block; margin-bottom:6px;">المواصفات والعتاد المرفق:</strong>
          <ul style="padding-right:18px; font-size:12px; color:var(--text-secondary); line-height:1.6;">
            ${m.specs.map(s => `<li>${s}</li>`).join('')}
          </ul>
        </div>

        <div style="background:var(--primary-purple-soft); padding:12px; border-radius:12px; margin-bottom:16px; display:flex; justify-content:space-between; align-items:center;">
          <div>
            <span style="font-size:11px; color:var(--primary-purple-dark); font-weight:600;">سعر الإيجار المقترح:</span>
            <div style="font-size:17px; font-weight:900; color:var(--primary-purple-dark);">${m.price}</div>
          </div>
          <span style="background:var(--surface-white); color:var(--neon-green-hover); padding:4px 10px; border-radius:99px; font-size:11.5px; font-weight:700;">جاهز للتنقل فوراً</span>
        </div>

        <div style="display:flex; gap:10px;">
          <a href="tel:${m.phone}" class="btn-primary-neon btn-lg w-full text-center" style="text-decoration:none;" onclick="window.FarmateApp.showToast('جاري الاتصال بـ ${m.owner}... 📞', 'info')">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <span>اتصال هاتفي مباشر (${m.phone})</span>
          </a>
          <button class="icon-circle-btn" style="width:48px; height:48px;" onclick="window.FarmateApp.shareItem('${m.title}')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
          </button>
        </div>
      `;

      window.FarmateApp.openModal('modal-machinery-detail');
    },

    // =========================================================================
    // WEATHER & FUNDING
    // =========================================================================
    changeWeatherLocation: function (wilayaKey) {
      const data = MOCK_DATA.weatherData[wilayaKey] || MOCK_DATA.weatherData.setif;
      document.getElementById('weather-temp-main').innerText = data.currentTemp;
      document.getElementById('weather-condition-desc').innerText = data.condition;
      document.getElementById('weather-wilaya-name').innerText = data.wilaya;

      document.getElementById('weather-stat-humidity').innerText = data.humidity;
      document.getElementById('weather-stat-wind').innerText = data.wind;
      document.getElementById('weather-stat-rain').innerText = data.rainProb;
      document.getElementById('weather-stat-soil').innerText = data.soilMoist;

      renderHourlyForecast(wilayaKey);
      renderDailyForecast(wilayaKey);
      showToast(`تم تحديث بيانات المناخ لولاية ${data.wilaya}`, 'info');
    },

    filterFunding: function (type, btnEl) {
      document.querySelectorAll('.funding-pills-bar .pill-chip').forEach(b => b.classList.remove('active'));
      if (btnEl) btnEl.classList.add('active');
      renderFundingCards(type);
    },

    openFundingApplyModal: function (fundId) {
      const fund = MOCK_DATA.fundingPrograms.find(f => f.id === fundId) || MOCK_DATA.fundingPrograms[0];
      document.getElementById('funding-modal-title').innerText = `تقديم طلب: ${fund.title}`;
      const body = document.getElementById('funding-modal-body');

      body.innerHTML = `
        <form onsubmit="event.preventDefault(); window.FarmateApp.submitFundingApplication('${fund.title}');">
          <div style="background:var(--surface-subtle); padding:12px; border-radius:12px; margin-bottom:14px;">
            <strong style="color:var(--primary-purple); font-size:12.5px; display:block;">المؤسسة الممولة: ${fund.institution}</strong>
            <span style="font-size:12px; color:var(--text-secondary);">سقف التمويل: <strong>${fund.amount}</strong> • الفائدة: <strong>${fund.rate}</strong></span>
          </div>

          <div class="input-group">
            <label class="input-label">الاسم واللقب (كما في بطاقة الفلاح)</label>
            <input type="text" class="input-field" value="${AppState.userProfile.name}" required>
          </div>

          <div class="input-row-2">
            <div class="input-group">
              <label class="input-label">رقم بطاقة الفلاح المعتمد</label>
              <input type="text" class="input-field" value="${AppState.userProfile.farmerCard}" required>
            </div>
            <div class="input-group">
              <label class="input-label">المساحة المزروعة (هكتار)</label>
              <input type="number" class="input-field" value="25" min="1" required>
            </div>
          </div>

          <div class="input-group">
            <label class="input-label">المبلغ المطلوب للتمويل (دج)</label>
            <input type="text" class="input-field" value="2,500,000 دج" required>
          </div>

          <button type="submit" class="btn-primary-neon btn-lg w-full mt-3">
            <span>إرسال الملف للدراسة الفورية 🏦</span>
          </button>
        </form>
      `;

      window.FarmateApp.openModal('modal-funding-apply');
    },

    submitFundingApplication: function (programTitle) {
      window.FarmateApp.closeModal('modal-funding-apply');

      AppState.notifications.unshift({
        id: Date.now(),
        title: `تم إيداع ملفك بنجاح في (${programTitle})`,
        time: 'الآن',
        icon: '📄',
        unread: true
      });
      renderNotifications();

      showToast('تم إرسال ملفك بنجاح إلى بنك BADR للدراسة والتقييم! 🏦', 'success');
    },

    showApplicationDetailsModal: function () {
      showToast('طلبك رقم #DZ-LN-2026 قيد الدراسة والتدقيق الإداري من طرف لجنة القروض بالبنك', 'info');
    },

    // =========================================================================
    // WALLET & CCP
    // =========================================================================
    openWalletModal: function () {
      window.FarmateApp.openModal('modal-wallet');
    },

    openWithdrawModal: function () {
      window.FarmateApp.closeDrawer('profile-drawer');
      window.FarmateApp.openModal('modal-wallet');
    },

    processWithdrawal: function () {
      const amtInput = document.getElementById('withdraw-amount-input');
      const amount = parseInt(amtInput.value) || 50000;

      if (amount > AppState.wallet.withdrawable) {
        showToast('المبلغ المطلوب يتجاوز الرصيد القابل للسحب', 'warning');
        return;
      }

      AppState.wallet.withdrawable -= amount;
      AppState.wallet.total -= amount;
      
      const topbarWallet = document.getElementById('topbar-wallet-amount');
      if (topbarWallet) topbarWallet.innerText = `${AppState.wallet.total.toLocaleString()} دج`;
      const drawerWalletTotal = document.getElementById('drawer-wallet-total');
      if (drawerWalletTotal) drawerWalletTotal.innerText = `${AppState.wallet.total.toLocaleString()} دج`;
      const drawerWithdrawable = document.getElementById('drawer-wallet-withdrawable');
      if (drawerWithdrawable) drawerWithdrawable.innerText = `${AppState.wallet.withdrawable.toLocaleString()} دج`;

      window.FarmateApp.closeModal('modal-wallet');
      showToast(`تم إصدار تحويل بريدي CCP بقيمة ${amount.toLocaleString()} دج بنجاح 📨`, 'success');
    },

    shareItem: function (title) {
      if (navigator.share) {
        navigator.share({ title: title, text: `اكتشف ${title} على منصة فارميت الفلاحية في الجزائر`, url: window.location.href });
      } else {
        showToast(`تم نسخ رابط "${title}" للمشاركة`, 'success');
      }
    }
  };

  // =========================================================================
  // INTERNAL RENDERERS (WITH PAGINATION, CART ICON & EMPTY STATES)
  // =========================================================================

  function renderStoreCategories() {
    const list = document.getElementById('store-categories-list');
    if (!list) return;

    list.innerHTML = MOCK_DATA.categories.map(cat => `
      <button class="cat-pill ${cat.id === AppState.selectedCategory ? 'active' : ''}" onclick="window.FarmateApp.setCategory('${cat.id}', this)">
        <span>${cat.name}</span>
      </button>
    `).join('');
  }

  function renderStoreProducts() {
    const container = document.getElementById('products-grid-container');
    const paginationContainer = document.getElementById('store-pagination-container');
    const searchVal = (document.getElementById('store-search-input')?.value || '').toLowerCase().trim();
    if (!container) return;

    let filtered = MOCK_DATA.products;

    if (AppState.selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === AppState.selectedCategory);
    }

    if (searchVal) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(searchVal) || p.description.toLowerCase().includes(searchVal) || p.supplier.toLowerCase().includes(searchVal));
    }

    // EMPTY SEARCH RESULTS HANDLING
    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="empty-search-state glass-panel">
          <div class="empty-search-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
          </div>
          <h4>لا توجد منتجات مطابقة لبحثك</h4>
          <p>لم نتمكن من العثور على أي نتائج لكلمة "<strong>${escapeHTML(searchVal)}</strong>". جرب التحقق من الكلمات أو تصفح باقي الأقسام.</p>
          <button class="btn-primary-neon btn-sm" onclick="window.FarmateApp.resetStoreSearch()">
            إعادة ضبط البحث وتصفح الكل
          </button>
        </div>
      `;
      if (paginationContainer) paginationContainer.innerHTML = '';
      return;
    }

    // Pagination calculations
    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / AppState.storePerPage);
    const currentPage = Math.min(AppState.storePage, totalPages);
    const startIndex = (currentPage - 1) * AppState.storePerPage;
    const paginatedItems = filtered.slice(startIndex, startIndex + AppState.storePerPage);

    // Render Product Cards with Shopping Cart SVG Icon
    container.innerHTML = paginatedItems.map(prod => {
      const isFav = AppState.favorites.includes(prod.id);
      return `
        <div class="product-card">
          <div class="product-img-wrapper" onclick="window.FarmateApp.openProductDetails('${prod.id}')">
            <img src="${prod.image}" alt="${prod.name}" class="product-thumb-img">
            ${prod.badge ? `<span class="discount-badge">${prod.badge}</span>` : ''}
            <button class="fav-btn ${isFav ? 'active' : ''}" onclick="event.stopPropagation(); window.FarmateApp.toggleFavorite('${prod.id}', this);" title="حفظ في المفضلة">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="${isFav ? '#EF4444' : 'none'}" stroke="${isFav ? '#EF4444' : 'currentColor'}" stroke-width="2.2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            </button>
          </div>
          
          <div class="product-details">
            <span class="product-category-tag">${prod.supplier}</span>
            <h4 class="product-name" onclick="window.FarmateApp.openProductDetails('${prod.id}')">${prod.name}</h4>
            
            <div class="product-meta-row">
              <span class="rating-pill">★ ${prod.rating}</span>
              <span>${prod.unit}</span>
            </div>

            <div class="product-price-action">
              <div>
                <span class="price-current">${prod.price.toLocaleString()} دج</span>
              </div>
              <button class="btn-add-cart" onclick="window.FarmateApp.addToCart('${prod.id}')" title="أضف إلى السلة">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Render Pagination Bar
    if (paginationContainer) {
      if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
      } else {
        let pagHtml = `
          <div class="pagination-bar">
            <button class="btn-page-arrow" ${currentPage === 1 ? 'disabled' : ''} onclick="window.FarmateApp.setStorePage(${currentPage - 1})">
              ‹ السابق
            </button>
        `;
        for (let i = 1; i <= totalPages; i++) {
          pagHtml += `
            <button class="page-number-pill ${i === currentPage ? 'active' : ''}" onclick="window.FarmateApp.setStorePage(${i})">
              ${i}
            </button>
          `;
        }
        pagHtml += `
            <button class="btn-page-arrow" ${currentPage === totalPages ? 'disabled' : ''} onclick="window.FarmateApp.setStorePage(${currentPage + 1})">
              التالي ›
            </button>
          </div>
        `;
        paginationContainer.innerHTML = pagHtml;
      }
    }
  }

  function renderMachineryCards() {
    const container = document.getElementById('machinery-list-container');
    const paginationContainer = document.getElementById('machinery-pagination-container');
    const searchVal = (document.getElementById('machinery-search-input')?.value || '').toLowerCase().trim();
    if (!container) return;

    let filtered = MOCK_DATA.machinery;

    if (AppState.selectedMachineryCat !== 'all') {
      filtered = filtered.filter(m => m.category === AppState.selectedMachineryCat);
    }

    if (searchVal) {
      filtered = filtered.filter(m => m.title.toLowerCase().includes(searchVal) || m.owner.toLowerCase().includes(searchVal) || m.location.toLowerCase().includes(searchVal));
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="empty-search-state glass-panel">
          <div class="empty-search-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
          </div>
          <h4>لا توجد آلات أو شاحنات مطابقة لبحثك</h4>
          <p>لم نجد أي عتاد مسجل بالبحث "<strong>${escapeHTML(searchVal)}</strong>". جرب كلمة أخرى أو تصفح كل الآلات.</p>
          <button class="btn-primary-neon btn-sm" onclick="window.FarmateApp.resetMachinerySearch()">
            إعادة ضبط البحث
          </button>
        </div>
      `;
      if (paginationContainer) paginationContainer.innerHTML = '';
      return;
    }

    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / AppState.machineryPerPage);
    const currentPage = Math.min(AppState.machineryPage, totalPages);
    const startIndex = (currentPage - 1) * AppState.machineryPerPage;
    const paginatedItems = filtered.slice(startIndex, startIndex + AppState.machineryPerPage);

    container.innerHTML = paginatedItems.map(m => `
      <div class="machine-card" onclick="window.FarmateApp.openMachineDetails('${m.id}')">
        <img src="${m.image}" alt="${m.title}" class="machine-thumb">
        <div class="machine-info">
          <div>
            <div class="machine-header">
              <h4 class="machine-title">${m.title}</h4>
            </div>
            <div class="machine-owner-row">
              <span>👤 ${m.owner}</span>
              <span>• ★ ${m.rating}</span>
            </div>
            <p class="machine-specs-text">${m.specs.slice(0, 2).join(' • ')}</p>
          </div>

          <div class="machine-bottom-row">
            <span class="machine-price-tag">${m.price}</span>
            <button class="btn-call-owner" onclick="event.stopPropagation(); window.FarmateApp.openMachineDetails('${m.id}')">
              <span>اتصال / حجز</span>
            </button>
          </div>
        </div>
      </div>
    `).join('');

    if (paginationContainer) {
      if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
      } else {
        let pagHtml = `
          <div class="pagination-bar">
            <button class="btn-page-arrow" ${currentPage === 1 ? 'disabled' : ''} onclick="window.FarmateApp.setMachineryPage(${currentPage - 1})">
              ‹ السابق
            </button>
        `;
        for (let i = 1; i <= totalPages; i++) {
          pagHtml += `
            <button class="page-number-pill ${i === currentPage ? 'active' : ''}" onclick="window.FarmateApp.setMachineryPage(${i})">
              ${i}
            </button>
          `;
        }
        pagHtml += `
            <button class="btn-page-arrow" ${currentPage === totalPages ? 'disabled' : ''} onclick="window.FarmateApp.setMachineryPage(${currentPage + 1})">
              التالي ›
            </button>
          </div>
        `;
        paginationContainer.innerHTML = pagHtml;
      }
    }
  }

  function renderHourlyForecast(wilayaKey) {
    const container = document.getElementById('hourly-forecast-row');
    const data = MOCK_DATA.weatherData[wilayaKey] || MOCK_DATA.weatherData.setif;
    if (!container) return;

    container.innerHTML = data.hourly.map((h, i) => `
      <div class="hourly-card ${i === 0 ? 'current' : ''}">
        <span class="hourly-time">${h.time}</span>
        <span class="hourly-icon">${h.icon}</span>
        <strong class="hourly-temp">${h.temp}</strong>
      </div>
    `).join('');
  }

  function renderDailyForecast(wilayaKey) {
    const container = document.getElementById('daily-forecast-list');
    const data = MOCK_DATA.weatherData[wilayaKey] || MOCK_DATA.weatherData.setif;
    if (!container) return;

    container.innerHTML = data.daily.map(d => `
      <div class="daily-row">
        <span class="daily-day">${d.day}</span>
        <span class="daily-agro-condition">${d.icon} ${d.condition}</span>
        <span class="daily-temp-range">${d.temp}</span>
      </div>
    `).join('');
  }

  function renderFundingCards(type) {
    const container = document.getElementById('funding-cards-container');
    if (!container) return;

    let filtered = MOCK_DATA.fundingPrograms;
    if (type !== 'all') {
      filtered = filtered.filter(f => f.type === type);
    }

    container.innerHTML = filtered.map(f => `
      <div class="funding-card">
        <div class="funding-card-header">
          <div>
            <span class="funding-badge-inst">${f.institution}</span>
            <h4 class="funding-card-title">${f.title}</h4>
          </div>
        </div>

        <div class="funding-specs-grid">
          <div class="fund-spec">
            <span>مبلغ التمويل:</span>
            <strong>${f.amount}</strong>
          </div>
          <div class="fund-spec">
            <span>مدة التسديد:</span>
            <strong>${f.duration.split(' ')[0]} ${f.duration.split(' ')[1] || ''}</strong>
          </div>
          <div class="fund-spec">
            <span>الفائدة البنكية:</span>
            <strong style="color:var(--neon-green-hover);">0% مدعمة</strong>
          </div>
        </div>

        <p style="font-size:12px; color:var(--text-secondary); line-height:1.4;">${f.benefits}</p>

        <div class="funding-card-footer">
          <span class="fund-req-note">✓ يحتاج بطاقة فلاح</span>
          <button class="btn-primary-neon btn-sm" onclick="window.FarmateApp.openFundingApplyModal('${f.id}')">
            <span>تقديم الملف الآن</span>
          </button>
        </div>
      </div>
    `).join('');
  }

  function renderNotifications() {
    const list = document.getElementById('notifications-list-container');
    const badge = document.getElementById('notif-badge');
    if (!list) return;

    const unreadCount = AppState.notifications.filter(n => n.unread).length;
    if (badge) badge.innerText = unreadCount;

    list.innerHTML = AppState.notifications.map(n => `
      <div style="display:flex; gap:10px; padding:10px; background:${n.unread ? 'var(--primary-purple-soft)' : 'var(--surface-subtle)'}; border-radius:12px; margin-bottom:8px; align-items:center;">
        <span style="font-size:20px;">${n.icon}</span>
        <div style="flex:1;">
          <strong style="font-size:12.5px; display:block; color:var(--text-main);">${n.title}</strong>
          <span style="font-size:11px; color:var(--text-muted);">${n.time}</span>
        </div>
      </div>
    `).join('');
  }

  function renderAdvisorHistory() {
    const list = document.getElementById('advisor-history-list');
    if (!list) return;

    list.innerHTML = AppState.advisorHistory.map(h => `
      <div style="padding:12px; background:var(--surface-subtle); border-radius:12px; margin-bottom:8px; cursor:pointer;" onclick="window.FarmateApp.closeDrawer('advisor-history-drawer'); window.FarmateApp.sendQuickPrompt('${h.title}');">
        <strong style="font-size:13px; color:var(--text-main); display:block;">💬 ${h.title}</strong>
        <span style="font-size:11px; color:var(--text-muted);">${h.date}</span>
      </div>
    `).join('');
  }

  function updateCartUI() {
    const badge = document.getElementById('cart-badge-count');
    const itemsList = document.getElementById('cart-items-list');
    const subtotalEl = document.getElementById('cart-subtotal-val');
    const totalEl = document.getElementById('cart-total-val');

    const totalQty = AppState.cart.reduce((sum, item) => sum + item.qty, 0);
    if (badge) badge.innerText = totalQty;

    const subtotal = AppState.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const delivery = subtotal > 10000 || subtotal === 0 ? 0 : 800;
    const total = subtotal + delivery;

    if (subtotalEl) subtotalEl.innerText = `${subtotal.toLocaleString()} دج`;
    if (totalEl) totalEl.innerText = `${total.toLocaleString()} دج`;

    const delivEl = document.getElementById('cart-delivery-val');
    if (delivEl) delivEl.innerText = delivery === 0 ? 'مجاني 🎁' : `${delivery.toLocaleString()} دج`;

    if (!itemsList) return;

    if (AppState.cart.length === 0) {
      itemsList.innerHTML = `
        <div style="text-align:center; padding:40px 10px; color:var(--text-muted);">
          <div style="font-size:36px; margin-bottom:8px;">🛒</div>
          <strong>سلة المشتريات فارغة</strong>
          <p style="font-size:12px; margin-top:4px;">تصفح المتجر الفلاحي وأضف البذور والأسمدة</p>
        </div>
      `;
      return;
    }

    itemsList.innerHTML = AppState.cart.map(item => `
      <div class="cart-item-card">
        <img src="${item.image}" alt="${item.name}" class="cart-item-thumb">
        <div class="cart-item-info">
          <h5 class="cart-item-title">${item.name}</h5>
          <span class="cart-item-price">${(item.price * item.qty).toLocaleString()} دج</span>
        </div>
        <div class="cart-qty-ctrls">
          <button class="btn-qty" onclick="window.FarmateApp.updateCartQty('${item.id}', 1)" title="زيادة الكمية">+</button>
          <span class="cart-qty-val">${item.qty}</span>
          <button class="btn-qty" onclick="window.FarmateApp.updateCartQty('${item.id}', -1)" title="تقليل الكمية">-</button>
        </div>
        <button class="btn-cart-item-delete" onclick="window.FarmateApp.removeFromCart('${item.id}')" title="حذف من السلة">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
        </button>
      </div>
    `).join('');
  }

  // =========================================================================
  // CHAT STREAMING SIMULATION & DARIJA RESPONSES
  // =========================================================================
  function appendChatMessage(text, sender) {
    const chatBox = document.getElementById('chat-messages-box');
    if (!chatBox) return;

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${sender}-msg`;

    if (sender === 'user') {
      msgDiv.innerHTML = `
        <div class="msg-bubble">
          <div class="msg-header">
            <span class="msg-time">${timeStr}</span>
            <span class="bot-name-label" style="color:rgba(255,255,255,0.9)">أنت (${AppState.userProfile.name.split(' ')[0]})</span>
          </div>
          <div class="msg-body">${escapeHTML(text)}</div>
        </div>
      `;
    }

    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function simulateAIResponse(query) {
    const chatBox = document.getElementById('chat-messages-box');
    if (!chatBox) return;

    // Typing bubble
    const typingId = 'typing-' + Date.now();
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-msg bot-msg';
    typingDiv.id = typingId;
    typingDiv.innerHTML = `
      <div class="msg-bot-avatar">🤖</div>
      <div class="msg-bubble">
        <div style="display:flex; align-items:center; gap:6px; font-size:12px; color:var(--text-muted);">
          <div class="spinner-neon" style="width:14px; height:14px; border-width:2px;"></div>
          <span>فارميت الذكي يفكر ويحلل البيانات الفلاحية...</span>
        </div>
      </div>
    `;
    chatBox.appendChild(typingDiv);
    chatBox.scrollTop = chatBox.scrollHeight;

    setTimeout(() => {
      typingDiv.remove();

      let answerHtml = '';
      const lower = query.toLowerCase();

      if (lower.includes('طماطم') || lower.includes('لفحة') || lower.includes('mildiou')) {
        answerHtml = `
          <p>أهلاً ${AppState.userProfile.name}! اللفحة المتأخرة (Mildiou) في الطماطم خطيرة خاصة مع الرطوبة تاع الصباح.</p>
          <p><strong>العلاج المقترح:</strong></p>
          <ul style="padding-right:18px; margin:6px 0;">
            <li>رش مبيد نحاسي جهازي <strong>Ridomil Gold</strong> فوراً.</li>
            <li>قلل من السقي العلوي واعتمد على التقطير لتفادي بلل الأوراق.</li>
            <li>نظّف الأوراق الميتة وحرقها بعيد عن الحقل.</li>
          </ul>
          <div class="chat-product-recommendation">
            <img src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=120&auto=format&fit=crop&q=80" class="chat-product-img">
            <div class="chat-product-meta">
              <div class="chat-product-title">مبيد فطري نحاسي Ridomil Gold</div>
              <div class="chat-product-price">2,800 دج (متوفر للتوصيل)</div>
            </div>
            <button class="btn-primary-neon btn-sm" onclick="window.FarmateApp.addToCart('p3')">شراء</button>
          </div>
        `;
      } else if (lower.includes('قمح') || lower.includes('تسميد')) {
        answerHtml = `
          <p>يا ${AppState.userProfile.name}، في منطقة سطيف والهضاب العليا، التسميد الأزوتي للقمح الصلب يقسم على 3 دفعات:</p>
          <ol style="padding-right:18px; margin:6px 0;">
            <li><strong>دفعة العمق:</strong> سماد DAP 18-46 عند البذر (1.5 إلى 2 قنطار/هكتار).</li>
            <li><strong>دفعة التفريع (Talage):</strong> يوريا 46% في فيفري/مارس قبل المطر.</li>
            <li><strong>دفعة الصعود (Montaison):</strong> نترات الأمونيوم 33.5% لزيادة نسبة البروتين في حبة القمح.</li>
          </ol>
        `;
      } else if (lower.includes('قرض') || lower.includes('رفيق') || lower.includes('تمويل')) {
        answerHtml = `
          <p>قرض الرفيق هو أحسن خيار ليك يا عمي رابح! الدولة الجزائرية وبنك BADR متكفلين بـ <strong>100% من الفوائد</strong> (فائدة 0%).</p>
          <p>الملف يتطلب فقط: بطاقة فلاح، عقد ملكية أو كراء، ومخطط زرع. تقدر تدفع الطلب مباشرة من تبويب <strong>"التمويل"</strong> في فارميت ونتابعوه معاك خطوة بخطوة!</p>
        `;
      } else if (lower.includes('زيتون') || lower.includes('سقي')) {
        answerHtml = `
          <p>أشجار الزيتون في فصل الصيف تحتاج ريات تكميلية ذكية:</p>
          <ul style="padding-right:18px; margin:6px 0;">
            <li>أحسن وقت للسقي هو <strong>المساء بعد غروب الشمس</strong> أو الصباح الباكر لتقليل التبخر.</li>
            <li>معدل 40 إلى 60 لتر للشجرة كل 10 أيام في التربة المتوسطة يضمن لك حبة زيتون ممتلئة وغنية بالزيت.</li>
          </ul>
        `;
      } else {
        answerHtml = `
          <p>يعطيك الصحة عمي رابح على سؤالك. تم فحص استفسارك بمطابقة الظروف الزراعية في ولاية سطيف.</p>
          <p>ننصحك بمراقبة رطوبة التربة الحالية (68%) واستغلال طقس اليوم المشمس لأي عمليات رش وقائي أو حرث خفيف.</p>
          <p>إذا عندك أي صورة لأوراق أو ثمار شكيت فيها، تقدر تضغط على زر الفحص بالذكاء الاصطناعي 🔬 لتحليلها فوراً!</p>
        `;
      }

      const botMsgDiv = document.createElement('div');
      botMsgDiv.className = 'chat-msg bot-msg animate-fade-in';
      botMsgDiv.innerHTML = `
        <div class="msg-bot-avatar">🤖</div>
        <div class="msg-bubble">
          <div class="msg-header">
            <span class="bot-name-label">فارميت الذكي</span>
            <span class="msg-time">الآن</span>
          </div>
          <div class="msg-body">${answerHtml}</div>
        </div>
      `;
      chatBox.appendChild(botMsgDiv);
      chatBox.scrollTop = chatBox.scrollHeight;
    }, 900);
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }

})();
