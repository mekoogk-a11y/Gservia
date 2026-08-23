import { GlobalService, SmartSearchIntent, RecommendedToolStack, AdvisorStepAnswers, AdvisorRecommendationResult, ServiceComparison } from '../types';
import { GLOBAL_SERVICES, GLOBAL_CATEGORIES } from '../data/servicesData';

interface IntentRule {
  keywords: string[];
  intent: string;
  intentAr: string;
  category: string;
  subcategory?: string;
  defaultRequirements: string[];
  recommendedBudget: 'free' | 'low' | 'flexible' | 'enterprise';
  targetLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Business';
  arabicRequired: boolean;
  serviceWeights: Record<string, number>; // serviceId -> base match boost
  explanation: string;
  explanationAr: string;
  stack?: RecommendedToolStack;
}

const INTENT_RULES: IntentRule[] = [
  // 1. E-Commerce / Online Store ("أريد إنشاء متجر إلكتروني")
  {
    keywords: ['متجر', 'متجر الكتروني', 'تجارة', 'بيع', 'منتجات', 'سلة', 'شوبيفاي', 'store', 'e-commerce', 'ecommerce', 'sell online', 'shop', 'dropshipping'],
    intent: 'Online E-commerce Store Creation',
    intentAr: 'إنشاء وإطلاق متجر إلكتروني متكامل',
    category: 'ecommerce',
    subcategory: 'ecom_stores',
    defaultRequirements: ['Online Payments', 'Inventory Management', 'Custom Domain', 'Local & Global Shipping', 'Order Tracking'],
    recommendedBudget: 'flexible',
    targetLevel: 'Beginner',
    arabicRequired: true,
    serviceWeights: {
      'salla': 98,
      'shopify': 95,
      'woocommerce': 88,
      'stripe': 90,
      'canva': 85
    },
    explanation: 'For building an online store, a managed platform with ready payment gateways and shipping integrations provides the fastest path to market with zero server overhead.',
    explanationAr: 'لإنشاء متجر إلكتروني متكامل، يوصى بالمنصات السحابية الجاهزة التي توفر بوابات الدفع (مدى/آبل باي) والشحن التلقائي فوراً دون الحاجة لبرمجة خاصة.',
    stack: {
      title: 'Complete Modern E-Commerce Stack',
      titleAr: 'الحزمة التقنية المتكاملة لمتجر إلكتروني ناجح',
      description: 'The standard modern stack for launching, designing, and accepting payments in MENA and globally.',
      descriptionAr: 'المجموعة المتوافقة لإدارة المتجر، تصميم البوستات والمنتجات، استقبال الأموال، والتسويق البريدي.',
      tools: [
        {
          role: 'Storefront & Inventory',
          roleAr: 'منصة المتجر والمخزون',
          serviceId: 'salla',
          serviceName: 'Salla (or Shopify)',
          serviceUrl: 'https://salla.com',
          reason: 'Instant integration with local shipping couriers and payment methods.',
          reasonAr: 'تفعيل فوري لمدى والشحن السريع بدون أي عقود خارجية معقدة.'
        },
        {
          role: 'Visual Marketing & Banners',
          roleAr: 'تصميم البنرات والمنتجات',
          serviceId: 'canva',
          serviceName: 'Canva Pro',
          serviceUrl: 'https://canva.com',
          reason: 'Create promotional banners and product graphics in minutes.',
          reasonAr: 'تصميم صور وبنرات العروض الترويجية والمنتجات بكل سهولة.'
        },
        {
          role: 'Email Marketing & Follow-up',
          roleAr: 'أتمتة البريد والتسويق',
          serviceId: 'mailchimp',
          serviceName: 'Mailchimp',
          serviceUrl: 'https://mailchimp.com',
          reason: 'Automate abandoned cart emails and special seasonal discounts.',
          reasonAr: 'إرسال تذكيرات السلات المتروكة ونشرات العروض للزبائن.'
        }
      ]
    }
  },

  // 2. Logo Design / Graphics ("أريد تصميم شعار")
  {
    keywords: ['شعار', 'تصميم', 'لوقو', 'لوجو', 'جرافيك', 'هوية', 'صور', 'بوست', 'logo', 'design', 'graphic', 'branding', 'banner', 'poster', 'vector'],
    intent: 'Logo & Graphic Branding Creation',
    intentAr: 'تصميم الشعارات والهوية البصرية والمواد الإعلانية',
    category: 'design',
    subcategory: 'des_canvas',
    defaultRequirements: ['Vector Assets', 'Arabic Typography', 'Export High-Res PNG/SVG', 'Social Media Resizing'],
    recommendedBudget: 'free',
    targetLevel: 'Beginner',
    arabicRequired: true,
    serviceWeights: {
      'canva': 98,
      'figma': 92,
      'chatgpt': 86
    },
    explanation: 'For logo and visual asset design, Canva delivers pre-made templates and instant typography tools, while Figma offers vector-level precision for professional UI/UX.',
    explanationAr: 'لتصميم الشعارات والهويات البصرية، يعتبر Canva الخيار الأسرع للمبتدئين بقوالبه الجاهزة وخطوطه العربية، بينما يوفر Figma دقة فيكتور احترافية لا نهائية.',
    stack: {
      title: 'Creative Branding & Design Suite',
      titleAr: 'حزمة التصميم والهوية البصرية',
      description: 'Everything you need from brainstorming to final vector delivery.',
      descriptionAr: 'من توليد أفكار الشعار وحتى إخراج ملفات الطباعة عالية الدقة.',
      tools: [
        {
          role: 'Rapid Design & Social Posts',
          roleAr: 'التصميم السريع والسوشيال ميديا',
          serviceId: 'canva',
          serviceName: 'Canva',
          serviceUrl: 'https://canva.com',
          reason: 'Huge Arabic font library and ready-to-use brand kits.',
          reasonAr: 'مكتبة ضخمة من الخطوط العربية وقوالب الشعارات الجاهزة للتعديل.'
        },
        {
          role: 'Custom Vector UI & Precision',
          roleAr: 'تصميم الفكتور والشاشات الدقيقة',
          serviceId: 'figma',
          serviceName: 'Figma',
          serviceUrl: 'https://figma.com',
          reason: 'Pixel-perfect vector node editing and interactive components.',
          reasonAr: 'رسم الشعارات بدقة فيكتور لا نهائية وتصديرها بصيغ SVG.'
        }
      ]
    }
  },

  // 3. International Money Transfer ("أريد إرسال أموال دوليًا")
  {
    keywords: ['تحويل اموال', 'حوالة', 'فلوس', 'ارسال اموال', 'دولي', 'بنك', 'سعر الصرف', 'wise', 'transfer', 'money transfer', 'international payment', 'remittance', 'forex', 'send money'],
    intent: 'International Money Transfer & Multi-Currency',
    intentAr: 'التحويلات المالية الدولية واستقبال الأموال بالعملات الأجنبية',
    category: 'finance',
    defaultRequirements: ['Low Exchange Spread', 'Multi-Currency Bank Details', 'Speed of Settlement', 'Strict Regulation'],
    recommendedBudget: 'low',
    targetLevel: 'Beginner',
    arabicRequired: false,
    serviceWeights: {
      'wise': 99,
      'stripe': 90
    },
    explanation: 'Wise provides real mid-market exchange rates and transparent upfront pricing, saving up to 8x compared to traditional SWIFT banking fees.',
    explanationAr: 'تتيح خدمة Wise إجراء الحوالات الدولية بسعر الصرف الحقيقي وبأقل عمولة ممكنة، مع توفير أرقام حسابات بنكية دولية بالدولار واليورو.',
  },

  // 4. Project Management / Team Work ("إدارة مشروعي")
  {
    keywords: ['مشروع', 'مشاريع', 'مهام', 'فريق', 'تنظيم', 'ادارة', 'تاسكات', 'تتبع الوقت', 'project', 'tasks', 'management', 'notion', 'clickup', 'jira', 'agile', 'kanban', 'team collaboration'],
    intent: 'Project Management & Team Organization',
    intentAr: 'إدارة المشاريع، توزيع المهام، وتنظيم فرق العمل',
    category: 'business',
    subcategory: 'biz_pm',
    defaultRequirements: ['Kanban Boards', 'Calendar Timeline', 'Permission Roles', 'File Attachments', 'Mobile Sync'],
    recommendedBudget: 'flexible',
    targetLevel: 'Intermediate',
    arabicRequired: true,
    serviceWeights: {
      'notion': 96,
      'clickup': 94,
      'chatgpt': 85
    },
    explanation: 'For organizing documentation and flexible sprint boards, Notion offers unmatched modularity, while ClickUp provides automated task tracking and time logging.',
    explanationAr: 'لتنظيم مهام الفريق والويكي الداخلي للشركة، يقدم Notion مساحة عمل حرة وشاملة، بينما يتفوق ClickUp في تتبع الوقت وساعات العمل بدقة.',
  },

  // 5. Website Building ("أريد إنشاء موقع")
  {
    keywords: ['موقع', 'انشاء موقع', 'صفحة هبوط', 'استضافة', 'ويب', 'website', 'landing page', 'webflow', 'wordpress', 'no-code site', 'build a website'],
    intent: 'Modern Website & Landing Page Creation',
    intentAr: 'بناء موقع إلكتروني احترافي أو صفحة هبوط تفاعلية',
    category: 'websites',
    subcategory: 'web_nocode',
    defaultRequirements: ['Responsive Mobile Layout', 'Fast Global Hosting', 'SEO Optimization', 'Custom Domain'],
    recommendedBudget: 'flexible',
    targetLevel: 'Intermediate',
    arabicRequired: true,
    serviceWeights: {
      'webflow': 96,
      'shopify': 88,
      'canva': 82
    },
    explanation: 'Webflow delivers visual design freedom with clean production-ready code and enterprise-grade CDN hosting.',
    explanationAr: 'يمكّنك Webflow من تصميم موقعك الإلكتروني بحرية بصرية كاملة واستضافة فائقة السرعة على خوادم أمازون وشبكات التوصيل العالمية.',
  },

  // 6. AI Writing & Coding ("مساعد ذكي للبرمجة والكتابة")
  {
    keywords: ['ذكاء اصطناعي', 'ai', 'مساعد', 'برمجة', 'كتابة', 'تلخيص', 'chatgpt', 'gemini', 'claude', 'coding', 'research', 'llm'],
    intent: 'Artificial Intelligence & Productivity Assistance',
    intentAr: 'استخدام نماذج الذكاء الاصطناعي في الكتابة والبحث والبرمجة',
    category: 'ai',
    subcategory: 'ai_chat',
    defaultRequirements: ['Multilingual Support', 'Large Context Analysis', 'Web Search Grounding', 'Code Generation'],
    recommendedBudget: 'free',
    targetLevel: 'Beginner',
    arabicRequired: true,
    serviceWeights: {
      'chatgpt': 97,
      'gemini': 95,
      'github': 88
    },
    explanation: 'Advanced AI models like ChatGPT and Google Gemini transform complex research, writing, and coding into instant structured outcomes.',
    explanationAr: 'توفر نماذج ChatGPT وجوجل Gemini قدرات استنتاجية فائقة لكتابة المقالات والتقارير، تحليل الملفات الضخمة، والبرمجة باللغتين العربية والإنجليزية.',
  },

  // 7. Security & Passwords ("حفظ كلمات المرور")
  {
    keywords: ['امان', 'باسورد', 'كلمات المرور', 'حماية', 'تشفير', 'اختراق', 'password', 'security', '1password', 'bitwarden', 'vault'],
    intent: 'Password Management & Digital Vault Security',
    intentAr: 'إدارة وحماية كلمات المرور والبيانات الحساسة',
    category: 'security',
    defaultRequirements: ['Zero-Knowledge Encryption', 'Cross-Device Autofill', 'Passkeys Support', 'Breach Alerts'],
    recommendedBudget: 'low',
    targetLevel: 'Beginner',
    arabicRequired: true,
    serviceWeights: {
      '1password': 98
    },
    explanation: '1Password provides military-grade zero-knowledge encryption with seamless autofill across mobile and desktop devices.',
    explanationAr: 'تضمن لك خدمة 1Password تشفيراً عسكرياً لكلمات المرور مع تعبئة تلقائية فائقة السلاسة على جميع المتصفحات والهواتف.',
  }
];

// Core Algorithmic Intent Parser
export function parseSmartIntent(userQuery: string, lang: 'ar' | 'en' = 'ar'): SmartSearchIntent {
  const cleanQ = userQuery.trim().toLowerCase();

  // Find best matching intent rule
  let bestRule: IntentRule | null = null;
  let highestMatchCount = 0;

  for (const rule of INTENT_RULES) {
    let matchCount = 0;
    for (const kw of rule.keywords) {
      if (cleanQ.includes(kw.toLowerCase())) {
        matchCount += 1;
      }
    }
    if (matchCount > highestMatchCount) {
      highestMatchCount = matchCount;
      bestRule = rule;
    }
  }

  // Fallback if no specific rule matched
  if (!bestRule || highestMatchCount === 0) {
    const matchedServices = GLOBAL_SERVICES.filter(s => 
      s.name.toLowerCase().includes(cleanQ) || 
      s.description.toLowerCase().includes(cleanQ) ||
      s.descriptionAr.includes(cleanQ) ||
      s.features.some(f => f.toLowerCase().includes(cleanQ)) ||
      s.featuresAr.some(f => f.includes(cleanQ))
    );

    const firstService = matchedServices[0] || GLOBAL_SERVICES[0];
    const categoryObj = GLOBAL_CATEGORIES.find(c => c.id === firstService.categoryId) || GLOBAL_CATEGORIES[0];

    return {
      rawQuery: userQuery,
      detectedIntent: `Digital Services Exploration for "${userQuery}"`,
      detectedIntentAr: `استكشاف الأدوات والخدمات الرقمية المناسبة لـ "${userQuery}"`,
      category: categoryObj.id,
      matchedCategoryIds: [categoryObj.id],
      requirements: ['Verified Service', 'Cloud-Hosted', 'Active Support'],
      budget: 'flexible',
      userLevel: 'Beginner',
      arabicRequired: lang === 'ar',
      recommendationExplanation: `Based on your request "${userQuery}", Gservia matched verified services with high reliability and user ratings.`,
      recommendationExplanationAr: `بناءً على طلبك "${userQuery}"، قام محرك Gservia بربطك بأفضل الخدمات الموثقة والمطابقة لمعايير الأداء والتقييم العالي.`,
      recommendedServices: matchedServices.length > 0 ? matchedServices.slice(0, 6) : GLOBAL_SERVICES.slice(0, 6)
    };
  }

  // Rank services using rule weights and intrinsic parameters
  const rankedServices = GLOBAL_SERVICES
    .map(service => {
      let score = 70; // Base score
      if (bestRule!.serviceWeights[service.id]) {
        score = bestRule!.serviceWeights[service.id];
      } else if (service.categoryId === bestRule!.category) {
        score += 15;
      }

      if (service.verified) score += 5;
      if (service.freePlan) score += 4;
      if (service.rating >= 4.8) score += 3;
      if (service.languages.includes('ar')) score += 3;

      score = Math.min(score, 99);

      return {
        ...service,
        matchScore: score
      };
    })
    .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));

  return {
    rawQuery: userQuery,
    detectedIntent: bestRule.intent,
    detectedIntentAr: bestRule.intentAr,
    category: bestRule.category,
    matchedCategoryIds: [bestRule.category],
    subcategory: bestRule.subcategory,
    requirements: bestRule.defaultRequirements,
    budget: bestRule.recommendedBudget,
    userLevel: bestRule.targetLevel,
    arabicRequired: bestRule.arabicRequired,
    recommendationExplanation: bestRule.explanation,
    recommendationExplanationAr: bestRule.explanationAr,
    recommendedServices: rankedServices.slice(0, 6),
    recommendedStack: bestRule.stack
  };
}

// Gservia AI Advisor Step-by-Step Resolution
export function runAdvisorEngine(answers: AdvisorStepAnswers): AdvisorRecommendationResult {
  const intent = parseSmartIntent(answers.needText || 'online tools');
  const services = intent.recommendedServices;

  // Filter & match based on answers
  let candidateList = [...services];

  if (answers.budget === 'free_only') {
    const freeOnly = candidateList.filter(s => s.freePlan);
    if (freeOnly.length > 0) candidateList = freeOnly;
  }

  if (answers.needArabic) {
    const arabicSupported = candidateList.filter(s => s.languages.includes('ar'));
    if (arabicSupported.length > 0) candidateList = arabicSupported;
  }

  const topPick = candidateList[0] || GLOBAL_SERVICES[0];
  const freeAlt = GLOBAL_SERVICES.find(s => s.categoryId === topPick.categoryId && s.freePlan && s.id !== topPick.id);
  const proAlt = GLOBAL_SERVICES.find(s => s.categoryId === topPick.categoryId && s.pricingType !== 'free' && s.id !== topPick.id);
  const fastSetupAlt = GLOBAL_SERVICES.find(s => s.userLevel.includes('Beginner') && s.id !== topPick.id);

  let matchReason = `Selected ${topPick.name} because it perfectly aligns with your need for "${answers.needText}". It has a ${topPick.rating} rating and verified status.`;
  let matchReasonAr = `تم اختيار ${topPick.nameAr || topPick.name} كأفضل تطابق لاحتياجك ("${answers.needText}")، حيث توفر واجهة معتمدة بتقييم ${topPick.rating} وخيارات تناسب مستوى ${answers.skillLevel}.`;

  if (answers.needArabic) {
    matchReason += ' Full native Arabic support is supported out of the box.';
    matchReasonAr += ' مع دعم كامل وموثوق للغة العربية وسهولة الاستخدام.';
  }

  if (answers.budget === 'free_only' && topPick.freePlan) {
    matchReason += ' It offers a permanent free starter tier with no immediate credit card required.';
    matchReasonAr += ' وتوفر خطة مجانية ممتازة للبدء الفوري بدون متطلبات دفع مسبقة.';
  }

  return {
    topPick: {
      ...topPick,
      matchScore: 97
    },
    matchScore: 97,
    matchReason,
    matchReasonAr,
    freeAlternative: freeAlt,
    proAlternative: proAlt,
    fastSetupAlternative: fastSetupAlt,
    actionableSteps: topPick.howToStart,
    actionableStepsAr: topPick.howToStartAr,
    recommendedStack: intent.recommendedStack
  };
}

// Comparison Engine Resolution
export function compareServices(serviceIds: string[]): ServiceComparison {
  const selected = GLOBAL_SERVICES.filter(s => serviceIds.includes(s.id));
  const fallback = selected.length >= 2 ? selected : [GLOBAL_SERVICES[0], GLOBAL_SERVICES[1]];

  const bestForBeginners = fallback.find(s => s.userLevel.includes('Beginner')) || fallback[0];
  const bestForPros = fallback.find(s => s.userLevel.includes('Advanced')) || fallback[1] || fallback[0];
  const bestFree = fallback.find(s => s.freePlan) || fallback[0];
  const bestForBiz = fallback.find(s => s.userLevel.includes('Business')) || fallback[0];

  return {
    services: fallback,
    verdict: {
      bestForBeginners: bestForBeginners.name,
      bestForBeginnersAr: `${bestForBeginners.nameAr || bestForBeginners.name} - أسهل في الإعداد والبدء السريع للمبتدئين`,
      bestForProfessionals: bestForPros.name,
      bestForProfessionalsAr: `${bestForPros.nameAr || bestForPros.name} - يمنح تحكماً هندسياً وميزات احترافية متقدمة`,
      bestFreeOption: bestFree.name,
      bestFreeOptionAr: `${bestFree.nameAr || bestFree.name} - أفضل باقة مجانية دائمة للمشاريع الناشئة`,
      bestForBusiness: bestForBiz.name,
      bestForBusinessAr: `${bestForBiz.nameAr || bestForBiz.name} - الأفضل للشركات الكبيرة وفرق العمل المتنامية`,
      summary: `Comparison across ${fallback.length} industry leaders based on pricing, platform support, and features.`,
      summaryAr: `مقارنة مباشرة بين ${fallback.length} من أبرز الخدمات العالمية بناءً على الأسعار، سهولة الاستخدام، ودعم اللغة العربية.`
    }
  };
}
