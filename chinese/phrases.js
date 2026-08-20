window.HUXI_CATEGORIES = [
  { id: "opening", name: "Opening the consultation", shortName: "Opening", symbol: "✦", description: "Introduce yourself and make communication easier." },
  { id: "breathlessness", name: "Breathlessness", shortName: "Breathlessness", symbol: "≈", description: "Onset, severity, exercise and positional symptoms." },
  { id: "cough", name: "Cough & sputum", shortName: "Cough & sputum", symbol: "⌁", description: "Duration, phlegm, blood and upper-airway symptoms." },
  { id: "asthma", name: "Asthma / COPD", shortName: "Asthma / COPD", symbol: "◌", description: "Control, inhalers, triggers and recent admissions." },
  { id: "exposure", name: "Smoking & exposure", shortName: "Smoking", symbol: "↟", description: "Smoking, vaping, work and household exposure." },
  { id: "infection", name: "Infection & TB", shortName: "Infection & TB", symbol: "+", description: "Fever, weight loss, contacts and travel." },
  { id: "medicine", name: "Medicines & inhalers", shortName: "Medicines", symbol: "◫", description: "Adherence, allergies and simple technique coaching." },
  { id: "investigation", name: "Investigations", shortName: "Investigations", symbol: "⌕", description: "X-ray, CT, lung function and sputum tests." },
  { id: "procedure", name: "Procedures", shortName: "Procedures", symbol: "⊕", description: "Simple, structured consent conversations for respiratory procedures." },
  { id: "closing", name: "Explain & close", shortName: "Closing", symbol: "✓", description: "Teach-back, safety-netting and follow-up." }
];

window.HUXI_PROCEDURES = [
  {
    id: "chest-drain",
    name: "Chest drain insertion",
    symbol: "↧",
    description: "Explain the reason, insertion, benefits, risks and alternatives."
  },
  {
    id: "bronchoscopy",
    name: "Bronchoscopy",
    symbol: "⌁",
    description: "Explain flexible bronchoscopy, sampling, sedation and biopsy risks."
  }
];

window.HUXI_PHRASES = [
  {
    id: "opening-01", category: "opening", risk: "green",
    pinyin: "Nín hǎo, wǒ shì hūxī kē de yīshēng.",
    spoken: "您好，我是呼吸科的医生。",
    english: "Hello, I am a respiratory doctor.",
    responses: [
      { pinyin: "Nín hǎo, yīshēng.", spoken: "您好，医生。", english: "Hello, doctor." }
    ]
  },
  {
    id: "opening-02", category: "opening", risk: "green",
    pinyin: "Qǐngwèn wǒ kěyǐ zěnme chēnghu nín?",
    spoken: "请问我可以怎么称呼您？",
    english: "How may I address you?",
    responses: [
      { pinyin: "Jiào wǒ Lǎo Chén jiù kěyǐ le.", spoken: "叫我老陈就可以了。", english: "You can call me Mr Tan." }
    ]
  },
  {
    id: "opening-03", category: "opening", risk: "green",
    pinyin: "Nín jīntiān nǎlǐ bù shūfu?",
    spoken: "您今天哪里不舒服？",
    english: "What is troubling you today?",
    responses: [
      { pinyin: "Wǒ zhè jǐ tiān yìzhí késou.", spoken: "我这几天一直咳嗽。", english: "I have been coughing for the past few days." },
      { pinyin: "Wǒ juéde hěn chuǎn.", spoken: "我觉得很喘。", english: "I feel very breathless." }
    ]
  },
  {
    id: "opening-04", category: "opening", risk: "green",
    pinyin: "Wǒ huì wèn nín jǐ ge guānyú hūxī de wèntí.",
    spoken: "我会问您几个关于呼吸的问题。",
    english: "I will ask you a few questions about your breathing.",
    responses: [
      { pinyin: "Hǎo de.", spoken: "好的。", english: "All right." }
    ]
  },
  {
    id: "opening-05", category: "opening", risk: "green",
    pinyin: "Rúguǒ tīng bù dǒng, qǐng gàosu wǒ.",
    spoken: "如果听不懂，请告诉我。",
    english: "Please tell me if you do not understand.",
    responses: [
      { pinyin: "Hǎo, wǒ huì gàosu nǐ.", spoken: "好，我会告诉你。", english: "Okay, I will tell you." }
    ]
  },
  {
    id: "opening-06", category: "opening", risk: "red",
    pinyin: "Zhège wèntí hěn zhòngyào, wǒmen qǐng fānyìyuán lái bāngmáng.",
    spoken: "这个问题很重要，我们请翻译员来帮忙。",
    english: "This is important; let us get an interpreter to help.",
    note: "Use a competent interpreter for consent, prognosis and other high-stakes decisions.",
    responses: [
      { pinyin: "Hǎo de, xièxie.", spoken: "好的，谢谢。", english: "All right, thank you." }
    ]
  },

  {
    id: "breathlessness-01", category: "breathlessness", risk: "green",
    pinyin: "Nǐ shénme shíhou kāishǐ juéde chuǎn?",
    spoken: "你什么时候开始觉得喘？",
    english: "When did you start feeling breathless?",
    responses: [
      { pinyin: "Zuótiān kāishǐ.", spoken: "昨天开始。", english: "Since yesterday." },
      { pinyin: "Yǐjīng liǎng ge xīngqī le.", spoken: "已经两个星期了。", english: "For two weeks already." }
    ]
  },
  {
    id: "breathlessness-02", category: "breathlessness", risk: "green",
    pinyin: "Xiūxi de shíhou huì chuǎn ma?",
    spoken: "休息的时候会喘吗？",
    english: "Are you breathless even at rest?",
    responses: [
      { pinyin: "Xiūxi de shíhou bú huì.", spoken: "休息的时候不会。", english: "Not when I am resting." },
      { pinyin: "Huì, zuòzhe yě huì chuǎn.", spoken: "会，坐着也会喘。", english: "Yes, even while sitting." }
    ]
  },
  {
    id: "breathlessness-03", category: "breathlessness", risk: "green",
    pinyin: "Zǒulù néng zǒu duō yuǎn?",
    spoken: "走路能走多远？",
    english: "How far can you walk?",
    responses: [
      { pinyin: "Dàgài yì bǎi mǐ.", spoken: "大概一百米。", english: "About one hundred metres." },
      { pinyin: "Zǒu jǐ bù jiù yào tíng.", spoken: "走几步就要停。", english: "I have to stop after a few steps." }
    ]
  },
  {
    id: "breathlessness-04", category: "breathlessness", risk: "green",
    pinyin: "Shàng lóutī huì chuǎn ma?",
    spoken: "上楼梯会喘吗？",
    english: "Do you get breathless climbing stairs?",
    responses: [
      { pinyin: "Shàng yì céng jiù huì chuǎn.", spoken: "上一层就会喘。", english: "After one floor I get breathless." }
    ]
  },
  {
    id: "breathlessness-05", category: "breathlessness", risk: "green",
    pinyin: "Tǎng píng de shíhou huì gèng chuǎn ma?",
    spoken: "躺平的时候会更喘吗？",
    english: "Is the breathlessness worse when you lie flat?",
    responses: [
      { pinyin: "Huì, wǒ yào shuì sān ge zhěntou.", spoken: "会，我要睡三个枕头。", english: "Yes, I need three pillows." },
      { pinyin: "Bú huì, tǎng píng méi wèntí.", spoken: "不会，躺平没问题。", english: "No, lying flat is fine." }
    ]
  },
  {
    id: "breathlessness-06", category: "breathlessness", risk: "amber",
    pinyin: "Nǐ néng wánzhěng de shuō yí jù huà ma?",
    spoken: "你能完整地说一句话吗？",
    english: "Can you speak a full sentence?",
    note: "If the patient cannot speak comfortably in full sentences, pause language practice and assess severity.",
    responses: [
      { pinyin: "Kěyǐ, dànshì yào mànmàn shuō.", spoken: "可以，但是要慢慢说。", english: "Yes, but I have to speak slowly." }
    ]
  },

  {
    id: "cough-01", category: "cough", risk: "green",
    pinyin: "Késou duō jiǔ le?",
    spoken: "咳嗽多久了？",
    english: "How long have you been coughing?",
    responses: [
      { pinyin: "Dàgài sān tiān.", spoken: "大概三天。", english: "About three days." },
      { pinyin: "Chàbuduō yí ge yuè le.", spoken: "差不多一个月了。", english: "Almost a month." }
    ]
  },
  {
    id: "cough-02", category: "cough", risk: "green",
    pinyin: "Yǒu tán ma?",
    spoken: "有痰吗？",
    english: "Do you have phlegm?",
    responses: [
      { pinyin: "Yǒu, hěn duō tán.", spoken: "有，很多痰。", english: "Yes, a lot of phlegm." },
      { pinyin: "Méiyǒu, shì gān ké.", spoken: "没有，是干咳。", english: "No, it is a dry cough." }
    ]
  },
  {
    id: "cough-03", category: "cough", risk: "green",
    pinyin: "Tán shì shénme yánsè de?",
    spoken: "痰是什么颜色的？",
    english: "What colour is the phlegm?",
    responses: [
      { pinyin: "Shì huángsè de.", spoken: "是黄色的。", english: "It is yellow." },
      { pinyin: "Shì báisè de.", spoken: "是白色的。", english: "It is white." }
    ]
  },
  {
    id: "cough-04", category: "cough", risk: "green",
    pinyin: "Yì tiān dàgài yǒu duōshao tán?",
    spoken: "一天大概有多少痰？",
    english: "Roughly how much phlegm do you bring up each day?",
    responses: [
      { pinyin: "Zhǐyǒu yìdiǎn.", spoken: "只有一点。", english: "Only a little." },
      { pinyin: "Dàgài bàn bēi.", spoken: "大概半杯。", english: "About half a cup." }
    ]
  },
  {
    id: "cough-05", category: "cough", risk: "amber",
    pinyin: "Késou de shíhou yǒu xuè ma?",
    spoken: "咳嗽的时候有血吗？",
    english: "Is there any blood when you cough?",
    note: "Clarify amount, frequency and whether the blood truly came from the respiratory tract.",
    responses: [
      { pinyin: "Zhǐyǒu yìdiǎn xuèsī.", spoken: "只有一点血丝。", english: "Only a few streaks of blood." },
      { pinyin: "Yǒu yì dà kǒu xuè.", spoken: "有一大口血。", english: "There was a large mouthful of blood." }
    ]
  },
  {
    id: "cough-06", category: "cough", risk: "green",
    pinyin: "Késou wǎnshàng gèng lìhai ma?",
    spoken: "咳嗽晚上更厉害吗？",
    english: "Is the cough worse at night?",
    responses: [
      { pinyin: "Shì, wǎnshàng shuì bù hǎo.", spoken: "是，晚上睡不好。", english: "Yes, I cannot sleep well at night." }
    ]
  },

  {
    id: "asthma-01", category: "asthma", risk: "green",
    pinyin: "Nǐ yǒu qìchuǎn huò mànxìng fèibìng ma?",
    spoken: "你有气喘或慢性肺病吗？",
    english: "Do you have asthma or chronic lung disease?",
    responses: [
      { pinyin: "Wǒ yǒu qìchuǎn.", spoken: "我有气喘。", english: "I have asthma." },
      { pinyin: "Wǒ yǒu mànxìng fèibìng.", spoken: "我有慢性肺病。", english: "I have chronic lung disease." }
    ]
  },
  {
    id: "asthma-02", category: "asthma", risk: "green",
    pinyin: "Yí ge xīngqī yào yòng jǐ cì jíjiù xīrùqì?",
    spoken: "一个星期要用几次急救吸入器？",
    english: "How often do you use your reliever inhaler each week?",
    responses: [
      { pinyin: "Dàgài liǎng cì.", spoken: "大概两次。", english: "About twice." },
      { pinyin: "Měitiān dōu yào yòng.", spoken: "每天都要用。", english: "I need it every day." }
    ]
  },
  {
    id: "asthma-03", category: "asthma", risk: "green",
    pinyin: "Nǐ měitiān dōu yǒu yòng xīrùqì ma?",
    spoken: "你每天都有用吸入器吗？",
    english: "Do you use your inhaler every day?",
    responses: [
      { pinyin: "Yǒu, měitiān zǎowǎn yòng.", spoken: "有，每天早晚用。", english: "Yes, morning and evening." },
      { pinyin: "Yǒushíhou huì wàngjì.", spoken: "有时候会忘记。", english: "Sometimes I forget." }
    ]
  },
  {
    id: "asthma-04", category: "asthma", risk: "green",
    pinyin: "Kěyǐ zuò gěi wǒ kàn nǐ zěnme yòng ma?",
    spoken: "可以做给我看你怎么用吗？",
    english: "Can you show me how you use it?",
    responses: [
      { pinyin: "Kěyǐ.", spoken: "可以。", english: "Yes." }
    ]
  },
  {
    id: "asthma-05", category: "asthma", risk: "green",
    pinyin: "Qùnián yīnwèi chuǎn zhùyuàn jǐ cì?",
    spoken: "去年因为喘住院几次？",
    english: "How many times were you admitted for breathlessness last year?",
    responses: [
      { pinyin: "Yǒu liǎng cì.", spoken: "有两次。", english: "Twice." },
      { pinyin: "Méiyǒu zhùyuàn.", spoken: "没有住院。", english: "I was not admitted." }
    ]
  },
  {
    id: "asthma-06", category: "asthma", risk: "green",
    pinyin: "Yǒu shénme dōngxi huì ràng nǐ gèng chuǎn?",
    spoken: "有什么东西会让你更喘？",
    english: "What tends to make your breathing worse?",
    responses: [
      { pinyin: "Huīchén hé xiāngyān.", spoken: "灰尘和香烟。", english: "Dust and cigarette smoke." },
      { pinyin: "Tiānqì lěng de shíhou.", spoken: "天气冷的时候。", english: "When the weather is cold." }
    ]
  },

  {
    id: "exposure-01", category: "exposure", risk: "green",
    pinyin: "Nǐ chōuyān ma?",
    spoken: "你抽烟吗？",
    english: "Do you smoke?",
    responses: [
      { pinyin: "Yǒu, wǒ chōuyān.", spoken: "有，我抽烟。", english: "Yes, I smoke." },
      { pinyin: "Bù chōu.", spoken: "不抽。", english: "No." }
    ]
  },
  {
    id: "exposure-02", category: "exposure", risk: "green",
    pinyin: "Yǐqián chōu guo yān ma?",
    spoken: "以前抽过烟吗？",
    english: "Did you smoke in the past?",
    responses: [
      { pinyin: "Yǐqián chōu, wǔ nián qián jiè le.", spoken: "以前抽，五年前戒了。", english: "I used to; I stopped five years ago." }
    ]
  },
  {
    id: "exposure-03", category: "exposure", risk: "green",
    pinyin: "Yì tiān chōu jǐ zhī?",
    spoken: "一天抽几支？",
    english: "How many cigarettes do you smoke each day?",
    responses: [
      { pinyin: "Dàgài shí zhī.", spoken: "大概十支。", english: "About ten." },
      { pinyin: "Yì bāo.", spoken: "一包。", english: "One packet." }
    ]
  },
  {
    id: "exposure-04", category: "exposure", risk: "green",
    pinyin: "Chōu le duōshao nián?",
    spoken: "抽了多少年？",
    english: "For how many years have you smoked?",
    responses: [
      { pinyin: "Chàbuduō sānshí nián.", spoken: "差不多三十年。", english: "Almost thirty years." }
    ]
  },
  {
    id: "exposure-05", category: "exposure", risk: "green",
    pinyin: "Yǒu chōu diànzǐyān ma?",
    spoken: "有抽电子烟吗？",
    english: "Do you vape?",
    responses: [
      { pinyin: "Ǒu'ěr huì chōu.", spoken: "偶尔会抽。", english: "Occasionally." },
      { pinyin: "Méiyǒu.", spoken: "没有。", english: "No." }
    ]
  },
  {
    id: "exposure-06", category: "exposure", risk: "green",
    pinyin: "Gōngzuò shàng huì jiēchù huīchén huò huàxuépǐn ma?",
    spoken: "工作上会接触灰尘或化学品吗？",
    english: "Are you exposed to dust or chemicals at work?",
    responses: [
      { pinyin: "Wǒ zài gōngchǎng gōngzuò, yǒu hěn duō huīchén.", spoken: "我在工厂工作，有很多灰尘。", english: "I work in a factory with a lot of dust." },
      { pinyin: "Méiyǒu jiēchù.", spoken: "没有接触。", english: "No exposure." }
    ]
  },

  {
    id: "infection-01", category: "infection", risk: "green",
    pinyin: "Yǒu fāshāo ma?",
    spoken: "有发烧吗？",
    english: "Do you have a fever?",
    responses: [
      { pinyin: "Yǒu, zuìgāo sānshíbā dù.", spoken: "有，最高三十八度。", english: "Yes, up to 38 degrees." },
      { pinyin: "Méiyǒu fāshāo.", spoken: "没有发烧。", english: "No fever." }
    ]
  },
  {
    id: "infection-02", category: "infection", risk: "green",
    pinyin: "Yǒu fālěng huò fādǒu ma?",
    spoken: "有发冷或发抖吗？",
    english: "Have you felt cold or had shaking chills?",
    responses: [
      { pinyin: "Zuówǎn yǒu fādǒu.", spoken: "昨晚有发抖。", english: "I had shaking chills last night." }
    ]
  },
  {
    id: "infection-03", category: "infection", risk: "green",
    pinyin: "Zuìjìn yǒu méiyǒu shòu xiàlái?",
    spoken: "最近有没有瘦下来？",
    english: "Have you lost weight recently?",
    responses: [
      { pinyin: "Yǒu, sān ge yuè shòu le wǔ gōngjīn.", spoken: "有，三个月瘦了五公斤。", english: "Yes, five kilograms in three months." },
      { pinyin: "Tǐzhòng méiyǒu biàn.", spoken: "体重没有变。", english: "My weight has not changed." }
    ]
  },
  {
    id: "infection-04", category: "infection", risk: "green",
    pinyin: "Wǎnshàng shuìjiào huì chū hàn ma?",
    spoken: "晚上睡觉会出汗吗？",
    english: "Do you sweat at night while sleeping?",
    responses: [
      { pinyin: "Huì, yīfu dōu shī le.", spoken: "会，衣服都湿了。", english: "Yes, my clothes become wet." }
    ]
  },
  {
    id: "infection-05", category: "infection", risk: "amber",
    pinyin: "Nǐ huò jiārén yǒu dé guo fèijiéhé ma?",
    spoken: "你或家人有得过肺结核吗？",
    english: "Have you or a family member had tuberculosis?",
    note: "Clarify timing, treatment completion and closeness of contact.",
    responses: [
      { pinyin: "Wǒ bàba yǐqián dé guo.", spoken: "我爸爸以前得过。", english: "My father had it in the past." },
      { pinyin: "Méiyǒu.", spoken: "没有。", english: "No." }
    ]
  },
  {
    id: "infection-06", category: "infection", risk: "green",
    pinyin: "Zuìjìn yǒu chūguó ma?",
    spoken: "最近有出国吗？",
    english: "Have you travelled overseas recently?",
    responses: [
      { pinyin: "Shàng ge yuè qù le Yuènán.", spoken: "上个月去了越南。", english: "I went to Vietnam last month." },
      { pinyin: "Méiyǒu chūguó.", spoken: "没有出国。", english: "No travel." }
    ]
  },

  {
    id: "medicine-01", category: "medicine", risk: "amber",
    pinyin: "Nǐ duì shénme yào guòmǐn ma?",
    spoken: "你对什么药过敏吗？",
    english: "Are you allergic to any medicines?",
    note: "Confirm the medicine and reaction using the clinical record or an interpreter when uncertain.",
    responses: [
      { pinyin: "Wǒ duì pánníxīlín guòmǐn.", spoken: "我对盘尼西林过敏。", english: "I am allergic to penicillin." },
      { pinyin: "Méiyǒu yào guòmǐn.", spoken: "没有药过敏。", english: "No medicine allergies." }
    ]
  },
  {
    id: "medicine-02", category: "medicine", risk: "green",
    pinyin: "Nǐ měitiān dōu yǒu chī yào ma?",
    spoken: "你每天都有吃药吗？",
    english: "Do you take your medicine every day?",
    responses: [
      { pinyin: "Yǒu, měitiān dōu chī.", spoken: "有，每天都吃。", english: "Yes, every day." },
      { pinyin: "Yǒushíhou méiyǒu chī.", spoken: "有时候没有吃。", english: "Sometimes I do not take it." }
    ]
  },
  {
    id: "medicine-03", category: "medicine", risk: "amber",
    pinyin: "Qǐng xiān hūqì, ránhòu mànmàn de xī jìnqù.",
    spoken: "请先呼气，然后慢慢地吸进去。",
    english: "Breathe out first, then breathe in slowly.",
    note: "Inhalation speed differs by device. Use this only when slow inhalation is correct for that inhaler.",
    responses: []
  },
  {
    id: "medicine-04", category: "medicine", risk: "green",
    pinyin: "Xī jìnqù hòu, bǐngzhù hūxī shí miǎo.",
    spoken: "吸进去后，屏住呼吸十秒。",
    english: "After breathing in, hold your breath for ten seconds.",
    responses: []
  },
  {
    id: "medicine-05", category: "medicine", risk: "amber",
    pinyin: "Yòng wán hòu qǐng shùkǒu.",
    spoken: "用完后请漱口。",
    english: "Rinse your mouth after using it.",
    note: "Use this instruction for inhaled corticosteroid-containing devices when appropriate.",
    responses: [
      { pinyin: "Hǎo, wǒ huì jìde.", spoken: "好，我会记得。", english: "Okay, I will remember." }
    ]
  },
  {
    id: "medicine-06", category: "medicine", risk: "amber",
    pinyin: "Bùyào zìjǐ tíng yào.",
    spoken: "不要自己停药。",
    english: "Do not stop the medicine on your own.",
    note: "Follow with the specific medicine, duration and a teach-back check.",
    responses: [
      { pinyin: "Hǎo, wǒ míngbai.", spoken: "好，我明白。", english: "Okay, I understand." }
    ]
  },

  {
    id: "investigation-01", category: "investigation", risk: "green",
    pinyin: "Jīntiān yào zhào yì zhāng xiōngbù X-guāng.",
    spoken: "今天要照一张胸部X光。",
    english: "We need to take a chest X-ray today.",
    responses: [
      { pinyin: "Hǎo de.", spoken: "好的。", english: "All right." }
    ]
  },
  {
    id: "investigation-02", category: "investigation", risk: "green",
    pinyin: "Wǒmen huì ānpái fèibù CT.",
    spoken: "我们会安排肺部CT。",
    english: "We will arrange a CT scan of your lungs.",
    responses: [
      { pinyin: "Shénme shíhou zuò?", spoken: "什么时候做？", english: "When will it be done?" }
    ]
  },
  {
    id: "investigation-03", category: "investigation", risk: "amber",
    pinyin: "Zhège jiǎnchá xūyào dǎ yàoshuǐ.",
    spoken: "这个检查需要打药水。",
    english: "This scan requires an injection of contrast.",
    note: "Explain benefits and material risks with suitable interpretation before consent.",
    responses: [
      { pinyin: "Dǎ yàoshuǐ huì tòng ma?", spoken: "打药水会痛吗？", english: "Will the injection hurt?" }
    ]
  },
  {
    id: "investigation-04", category: "investigation", risk: "amber",
    pinyin: "Yǐqián dǎ yàoshuǐ yǒu guòmǐn ma?",
    spoken: "以前打药水有过敏吗？",
    english: "Have you previously had an allergic reaction to contrast?",
    note: "Clarify the exact agent and reaction; do not rely on this phrase alone.",
    responses: [
      { pinyin: "Shàng cì shēnshang qǐ hóngdiǎn.", spoken: "上次身上起红点。", english: "I developed a red rash last time." },
      { pinyin: "Méiyǒu.", spoken: "没有。", english: "No." }
    ]
  },
  {
    id: "investigation-05", category: "investigation", risk: "green",
    pinyin: "Wǒmen yào zuò fèigōngnéng jiǎnchá.",
    spoken: "我们要做肺功能检查。",
    english: "We need to perform a lung function test.",
    responses: [
      { pinyin: "Zěnme zuò?", spoken: "怎么做？", english: "How is it done?" }
    ]
  },
  {
    id: "investigation-06", category: "investigation", risk: "green",
    pinyin: "Qǐng yònglì chuī, zhídào wǒ shuō tíng.",
    spoken: "请用力吹，直到我说停。",
    english: "Blow hard until I tell you to stop.",
    responses: []
  },

  {
    id: "chest-drain-01", category: "procedure", procedure: "chest-drain", stage: "Explain the reason", risk: "consent",
    pinyin: "Xiànzài wǒ lái jiěshì wèishénme xūyào fàng xiōngguǎn.",
    spoken: "现在我来解释为什么需要放胸管。",
    english: "I will explain why you need a chest drain.",
    note: "Use an interpreter unless you can conduct the full consent discussion accurately and answer questions in Mandarin.",
    responses: [
      { pinyin: "Hǎo, qǐng nǐ jiěshì.", spoken: "好，请你解释。", english: "All right, please explain." }
    ]
  },
  {
    id: "chest-drain-02", category: "procedure", procedure: "chest-drain", stage: "Explain the reason", risk: "consent",
    pinyin: "Nǐ de fèi wàimiàn yǒu kōngqì.",
    spoken: "你的肺外面有空气。",
    english: "There is air around your lung.",
    note: "Use this for pneumothorax; do not use it for a pleural effusion.",
    responses: [
      { pinyin: "Zhè shì bú shì fèi pò le?", spoken: "这是不是肺破了？", english: "Does that mean the lung has a leak?" }
    ]
  },
  {
    id: "chest-drain-03", category: "procedure", procedure: "chest-drain", stage: "Explain the reason", risk: "consent",
    pinyin: "Nǐ de fèi wàimiàn yǒu jīshuǐ.",
    spoken: "你的肺外面有积水。",
    english: "There is fluid around your lung.",
    note: "Use this for pleural fluid; explain the likely cause separately when known.",
    responses: [
      { pinyin: "Wèishénme huì yǒu jīshuǐ?", spoken: "为什么会有积水？", english: "Why is there fluid there?" }
    ]
  },
  {
    id: "chest-drain-04", category: "procedure", procedure: "chest-drain", stage: "What it does", risk: "consent",
    pinyin: "Wǒmen xūyào fàng yì gēn xiǎo guǎnzi jìn xiōngkǒu, bǎ kōngqì huò jīshuǐ pái chūlái.",
    spoken: "我们需要放一根小管子进胸口，把空气或积水排出来。",
    english: "We need to put a small tube into your chest to drain the air or fluid.",
    responses: [
      { pinyin: "Guǎnzi yào fàng duō jiǔ?", spoken: "管子要放多久？", english: "How long will the tube stay in?" }
    ]
  },
  {
    id: "chest-drain-05", category: "procedure", procedure: "chest-drain", stage: "Expected benefit", risk: "consent",
    pinyin: "Zhèyàng kěyǐ bāngzhù fèi zhāng kāi, ràng nǐ bǐjiào hǎo hūxī.",
    spoken: "这样可以帮助肺张开，让你比较好呼吸。",
    english: "This may help the lung expand and make breathing easier.",
    note: "Describe the expected benefit for this patient without promising success.",
    responses: []
  },
  {
    id: "chest-drain-06", category: "procedure", procedure: "chest-drain", stage: "What happens", risk: "consent",
    pinyin: "Rúguǒ shì jīshuǐ, wǒmen huì yòng chāoshēngbō zhǎo ānquán de wèizhì.",
    spoken: "如果是积水，我们会用超声波找安全的位置。",
    english: "If it is fluid, we will use ultrasound to find a safe position.",
    note: "Ultrasound wording is indication-specific; follow local pleural procedure standards.",
    responses: []
  },
  {
    id: "chest-drain-07", category: "procedure", procedure: "chest-drain", stage: "What happens", risk: "consent",
    pinyin: "Wǒ huì xiān dǎ júbù mázuì, ràng zhè biān mádiào.",
    spoken: "我会先打局部麻醉，让这边麻掉。",
    english: "I will first give local anaesthetic to numb this area.",
    responses: [
      { pinyin: "Wǒ huì shuìzháo ma?", spoken: "我会睡着吗？", english: "Will I be asleep?" }
    ]
  },
  {
    id: "chest-drain-08", category: "procedure", procedure: "chest-drain", stage: "What happens", risk: "consent",
    pinyin: "Ránhòu kāi yí ge xiǎo kǒu, bǎ guǎnzi fàng jìnqù.",
    spoken: "然后开一个小口，把管子放进去。",
    english: "Then we make a small opening and put the tube in.",
    responses: []
  },
  {
    id: "chest-drain-09", category: "procedure", procedure: "chest-drain", stage: "What happens", risk: "consent",
    pinyin: "Guǎnzi huì yòng xiàn gùdìng, zài jiē dào yí ge píngzi.",
    spoken: "管子会用线固定，再接到一个瓶子。",
    english: "The tube will be secured with a stitch and connected to a drainage bottle.",
    responses: []
  },
  {
    id: "chest-drain-10", category: "procedure", procedure: "chest-drain", stage: "Discomfort", risk: "consent",
    pinyin: "Dǎ mázuì shí huì cì yíxià. Fàng guǎn shí kěnéng huì juéde yǒu yālì huò tòng.",
    spoken: "打麻醉时会刺一下。放管时可能会觉得有压力或痛。",
    english: "The anaesthetic may sting. During insertion you may feel pressure or pain.",
    note: "Do not promise that the procedure will be painless; explain how pain will be managed.",
    responses: [
      { pinyin: "Rúguǒ hěn tòng zěnme bàn?", spoken: "如果很痛怎么办？", english: "What if it is very painful?" }
    ]
  },
  {
    id: "chest-drain-11", category: "procedure", procedure: "chest-drain", stage: "Risks", risk: "consent",
    pinyin: "Kěnéng huì téngtòng, chūxuè huò gǎnrǎn.",
    spoken: "可能会疼痛、出血或感染。",
    english: "There may be pain, bleeding or infection.",
    note: "Pain is relatively common; clinically important bleeding and infection are less common. Tailor the discussion to individual risk.",
    responses: []
  },
  {
    id: "chest-drain-12", category: "procedure", procedure: "chest-drain", stage: "Risks", risk: "consent",
    pinyin: "Guǎnzi kěnéng huì dǔzhù huò yídòng, yǒushí xūyào tiáozhěng huò chóngxīn fàng.",
    spoken: "管子可能会堵住或移动，有时需要调整或重新放。",
    english: "The tube may block or move and sometimes needs adjustment or replacement.",
    responses: []
  },
  {
    id: "chest-drain-13", category: "procedure", procedure: "chest-drain", stage: "Rare risks", risk: "consent",
    pinyin: "Hěn shǎo de qíngkuàng xià, kěnéng shāng dào fèi, xuèguǎn huò fùjìn de qìguān.",
    spoken: "很少的情况下，可能伤到肺、血管或附近的器官。",
    english: "Rarely, the lung, a blood vessel or a nearby organ may be injured.",
    note: "Keep this risk explicit and adapt it to drain type, position and patient factors.",
    responses: [
      { pinyin: "Rúguǒ shāng dào huì zěnmeyàng?", spoken: "如果伤到会怎么样？", english: "What would happen if something were injured?" }
    ]
  },
  {
    id: "chest-drain-14", category: "procedure", procedure: "chest-drain", stage: "Rare risks", risk: "consent",
    pinyin: "Rúguǒ jīshuǐ hěn duō, pái de tài kuài, hěn shǎo kěnéng ràng hūxī tūrán biàn chà.",
    spoken: "如果积水很多，排得太快，很少可能让呼吸突然变差。",
    english: "If a large amount of fluid drains too quickly, breathing can rarely worsen suddenly.",
    note: "This describes re-expansion pulmonary oedema in simple language and is relevant mainly when draining a pleural effusion.",
    responses: []
  },
  {
    id: "chest-drain-15", category: "procedure", procedure: "chest-drain", stage: "Alternatives", risk: "consent",
    pinyin: "Qítā fāngfǎ kěnéng bāokuò yòng zhēn chōu, jìxù guānchá, huò qítā zhìliáo.",
    spoken: "其他方法可能包括用针抽、继续观察，或其他治疗。",
    english: "Other options may include needle aspiration, observation or another treatment.",
    note: "Only present alternatives that are clinically reasonable for this indication; surgery or an indwelling catheter may also be relevant.",
    responses: [
      { pinyin: "Wǒ kěyǐ xiān bù fàng ma?", spoken: "我可以先不放吗？", english: "Can I wait without having the drain?" }
    ]
  },
  {
    id: "chest-drain-16", category: "procedure", procedure: "chest-drain", stage: "If not done", risk: "consent",
    pinyin: "Rúguǒ bù fàng, kōngqì huò jīshuǐ kěnéng liú zài lǐmiàn, hūxī kěnéng gèng kùnnan.",
    spoken: "如果不放，空气或积水可能留在里面，呼吸可能更困难。",
    english: "Without the drain, the air or fluid may remain and breathing may become more difficult.",
    note: "Explain the patient-specific consequence of declining or delaying the procedure.",
    responses: []
  },
  {
    id: "chest-drain-17", category: "procedure", procedure: "chest-drain", stage: "Questions", risk: "consent",
    pinyin: "Guānyú zhège shǒuxù, nǐ yǒu shénme wèntí?",
    spoken: "关于这个手续，你有什么问题？",
    english: "What questions do you have about the procedure?",
    responses: [
      { pinyin: "Zuò wán yào zhùyuàn duō jiǔ?", spoken: "做完要住院多久？", english: "How long will I need to stay in hospital?" }
    ]
  },
  {
    id: "chest-drain-18", category: "procedure", procedure: "chest-drain", stage: "Check understanding", risk: "consent",
    pinyin: "Qǐng nǐ yòng zìjǐ de huà shuō yí biàn, wèishénme yào fàng zhège guǎnzi?",
    spoken: "请你用自己的话说一遍，为什么要放这个管子？",
    english: "In your own words, can you tell me why the tube is needed?",
    note: "Frame teach-back as a check of your explanation, not a test of the patient.",
    responses: [
      { pinyin: "Bǎ fèi wàimiàn de qì huò shuǐ pái chūlái.", spoken: "把肺外面的气或水排出来。", english: "To drain the air or fluid around the lung." }
    ]
  },
  {
    id: "chest-drain-19", category: "procedure", procedure: "chest-drain", stage: "Ask permission", risk: "red",
    pinyin: "Nǐ míngbai zhège shǒuxù de hǎochu, fēngxiǎn hé qítā xuǎnzé ma? Nǐ tóngyì wǒmen jìxù ma?",
    spoken: "你明白这个手续的好处、风险和其他选择吗？你同意我们继续吗？",
    english: "Do you understand the benefits, risks and alternatives, and do you agree to proceed?",
    note: "This phrase does not itself establish valid consent. Confirm capacity, voluntariness, adequate information and local documentation requirements.",
    responses: [
      { pinyin: "Wǒ míngbai, wǒ tóngyì.", spoken: "我明白，我同意。", english: "I understand and agree." },
      { pinyin: "Wǒ hái yǒu wèntí.", spoken: "我还有问题。", english: "I still have questions." }
    ]
  },

  {
    id: "bronchoscopy-01", category: "procedure", procedure: "bronchoscopy", stage: "Explain the reason", risk: "consent",
    pinyin: "Xiànzài wǒ lái jiěshì shénme shì qìguǎnjìng jiǎnchá.",
    spoken: "现在我来解释什么是气管镜检查。",
    english: "I will explain what a bronchoscopy is.",
    note: "Use an interpreter unless you can conduct the full consent discussion accurately and answer questions in Mandarin.",
    responses: [
      { pinyin: "Hǎo, qǐng nǐ jiěshì.", spoken: "好，请你解释。", english: "All right, please explain." }
    ]
  },
  {
    id: "bronchoscopy-02", category: "procedure", procedure: "bronchoscopy", stage: "What it is", risk: "consent",
    pinyin: "Zhè shì yòng yì gēn yòu ruǎn yòu xì de xiǎo jìngzi kàn nǐ de hūxīdào.",
    spoken: "这是用一根又软又细的小镜子看你的呼吸道。",
    english: "We use a thin, flexible camera to look inside your airways.",
    responses: []
  },
  {
    id: "bronchoscopy-03", category: "procedure", procedure: "bronchoscopy", stage: "What it is", risk: "consent",
    pinyin: "Jìngzi huì cóng bízi huò zuǐba jìnqù.",
    spoken: "镜子会从鼻子或嘴巴进去。",
    english: "The camera passes through your nose or mouth.",
    responses: [
      { pinyin: "Huì bú huì dǎngzhù hūxī?", spoken: "会不会挡住呼吸？", english: "Will it block my breathing?" }
    ]
  },
  {
    id: "bronchoscopy-04", category: "procedure", procedure: "bronchoscopy", stage: "Expected benefit", risk: "consent",
    pinyin: "Zhège jiǎnchá kěyǐ bāng wǒmen zhǎo chū fèibù wèntí de yuányīn.",
    spoken: "这个检查可以帮我们找出肺部问题的原因。",
    english: "This test may help us find the cause of the lung problem.",
    note: "State the patient-specific indication, such as infection, bleeding, an airway lesion or an abnormal scan.",
    responses: []
  },
  {
    id: "bronchoscopy-05", category: "procedure", procedure: "bronchoscopy", stage: "Samples", risk: "consent",
    pinyin: "Rúguǒ xūyào, wǒmen huì xǐ yìdiǎn shuǐ, huò ná yìdiǎn zǔzhī qù jiǎnchá.",
    spoken: "如果需要，我们会洗一点水，或拿一点组织去检查。",
    english: "If needed, we may collect washings or take a small tissue sample.",
    note: "Specify whether lavage, brushing, endobronchial biopsy or transbronchial biopsy is planned because the risks differ.",
    responses: [
      { pinyin: "Ná zǔzhī huì tòng ma?", spoken: "拿组织会痛吗？", english: "Will taking a sample hurt?" }
    ]
  },
  {
    id: "bronchoscopy-06", category: "procedure", procedure: "bronchoscopy", stage: "Limitations", risk: "consent",
    pinyin: "Yǒushíhou jiǎnchá hé yàngběn bù yídìng néng zhǎodào dá'àn, kěnéng hái yào zuò qítā jiǎnchá.",
    spoken: "有时候检查和样本不一定能找到答案，可能还要做其他检查。",
    english: "Sometimes the test or samples do not give an answer, and further tests may be needed.",
    responses: []
  },
  {
    id: "bronchoscopy-07", category: "procedure", procedure: "bronchoscopy", stage: "Preparation", risk: "consent",
    pinyin: "Jiǎnchá qián yào kōng fù. Qǐng àn zhěnjiān gěi nǐ de shíjiān.",
    spoken: "检查前要空腹。请按诊间给你的时间。",
    english: "You need to fast before the test; follow the timing given by the unit.",
    note: "Fasting times and medication instructions vary. Use the exact local instructions, including anticoagulant and diabetes plans.",
    responses: [
      { pinyin: "Wǒ kěyǐ hē shuǐ ma?", spoken: "我可以喝水吗？", english: "May I drink water?" }
    ]
  },
  {
    id: "bronchoscopy-08", category: "procedure", procedure: "bronchoscopy", stage: "What happens", risk: "consent",
    pinyin: "Wǒmen huì zài bízi hé hóulóng pēn mázuì yào, ràng tā mádiào.",
    spoken: "我们会在鼻子和喉咙喷麻醉药，让它麻掉。",
    english: "We will spray local anaesthetic into your nose and throat to numb them.",
    responses: []
  },
  {
    id: "bronchoscopy-09", category: "procedure", procedure: "bronchoscopy", stage: "What happens", risk: "consent",
    pinyin: "Wǒmen kěnéng gěi nǐ yào ràng nǐ fàngsōng hé xiǎng shuì, dàn tōngcháng bú shì quánshēn mázuì.",
    spoken: "我们可能给你药让你放松和想睡，但通常不是全身麻醉。",
    english: "We may give sedation to relax you and make you drowsy, but it is usually not a general anaesthetic.",
    note: "Describe the actual sedation or anaesthesia plan for the procedure and institution.",
    responses: [
      { pinyin: "Wǒ huì zhīdào fāshēng shénme shì ma?", spoken: "我会知道发生什么事吗？", english: "Will I know what is happening?" }
    ]
  },
  {
    id: "bronchoscopy-10", category: "procedure", procedure: "bronchoscopy", stage: "Monitoring", risk: "consent",
    pinyin: "Jiǎnchá shí, wǒmen huì yìzhí kàn nǐ de yǎngqì, xīntiào hé xuèyā.",
    spoken: "检查时，我们会一直看你的氧气、心跳和血压。",
    english: "During the test we will continuously monitor your oxygen, heart rate and blood pressure.",
    responses: []
  },
  {
    id: "bronchoscopy-11", category: "procedure", procedure: "bronchoscopy", stage: "Discomfort", risk: "consent",
    pinyin: "Jìngzi jìnqù shí kěnéng huì késou hé bù shūfu, dàn nǐ háishi kěyǐ hūxī.",
    spoken: "镜子进去时可能会咳嗽和不舒服，但你还是可以呼吸。",
    english: "You may cough and feel uncomfortable, but you will still be able to breathe.",
    responses: [
      { pinyin: "Rúguǒ wǒ shòubùliǎo ne?", spoken: "如果我受不了怎么办？", english: "What if I cannot tolerate it?" }
    ]
  },
  {
    id: "bronchoscopy-12", category: "procedure", procedure: "bronchoscopy", stage: "Comfort and choice", risk: "consent",
    pinyin: "Rúguǒ tài bù shūfu, qǐng gàosu wǒmen. Wǒmen kěyǐ tíng xiàlái.",
    spoken: "如果太不舒服，请告诉我们。我们可以停下来。",
    english: "Tell us if you are too uncomfortable; we can stop the procedure.",
    responses: []
  },
  {
    id: "bronchoscopy-13", category: "procedure", procedure: "bronchoscopy", stage: "Common effects", risk: "consent",
    pinyin: "Zuò wán hòu, kěnéng huì hóulóng tòng, liú bítì, fāshāo, huò tán lǐ yǒu yìdiǎn xuè.",
    spoken: "做完后，可能会喉咙痛、流鼻涕、发烧，或痰里有一点血。",
    english: "Afterwards you may have a sore throat, nasal symptoms, fever or a small amount of blood in the phlegm.",
    note: "Nasal symptoms depend on the route; fever may occur after lavage. Explain what is expected and when to seek help.",
    responses: []
  },
  {
    id: "bronchoscopy-14", category: "procedure", procedure: "bronchoscopy", stage: "Risks", risk: "consent",
    pinyin: "Rúguǒ ná zǔzhī, chūxuè de fēngxiǎn huì bǐjiào gāo. Dà chūxuè hěn shǎo.",
    spoken: "如果拿组织，出血的风险会比较高。大出血很少。",
    english: "If a biopsy is taken, bleeding risk is higher; major bleeding is rare.",
    note: "Discuss bleeding risk in relation to the planned biopsy and the patient’s anticoagulants, antiplatelets and comorbidities.",
    responses: []
  },
  {
    id: "bronchoscopy-15", category: "procedure", procedure: "bronchoscopy", stage: "Biopsy-specific risk", risk: "consent",
    pinyin: "Rúguǒ cóng fèi lǐ ná zǔzhī, hěn shǎo kěnéng ràng fèi lòuqì hé suō xiǎo, yǒushí xūyào fàng xiōngguǎn.",
    spoken: "如果从肺里拿组织，很少可能让肺漏气和缩小，有时需要放胸管。",
    english: "A lung biopsy can rarely cause an air leak and collapsed lung, sometimes requiring a chest drain.",
    note: "This risk is especially relevant to transbronchial lung biopsy and should not be presented as the same risk for every bronchoscopy.",
    responses: [
      { pinyin: "Zhège fēngxiǎn dà ma?", spoken: "这个风险大吗？", english: "How large is this risk?" }
    ]
  },
  {
    id: "bronchoscopy-16", category: "procedure", procedure: "bronchoscopy", stage: "Sedation risks", risk: "consent",
    pinyin: "Fàngsōng de yào kěnéng ràng yǎngqì biàn dī, hūxī biàn màn, huò xuèyā biànhuà.",
    spoken: "放松的药可能让氧气变低、呼吸变慢，或血压变化。",
    english: "Sedation may lower your oxygen, slow breathing or affect blood pressure.",
    responses: []
  },
  {
    id: "bronchoscopy-17", category: "procedure", procedure: "bronchoscopy", stage: "Rare serious risks", risk: "consent",
    pinyin: "Fēicháng shǎo de qíngkuàng xià, kěnéng yǒu yánzhòng de xīnzàng huò hūxī wèntí, shènzhì wēixiǎn shēngmìng.",
    spoken: "非常少的情况下，可能有严重的心脏或呼吸问题，甚至危险生命。",
    english: "Very rarely, serious heart or breathing complications can be life-threatening.",
    note: "Use locally approved wording and patient-specific risk estimates for rare serious complications.",
    responses: []
  },
  {
    id: "bronchoscopy-18", category: "procedure", procedure: "bronchoscopy", stage: "Alternatives", risk: "consent",
    pinyin: "Qítā fāngfǎ kěnéng bāokuò sǎomiáo, jiǎnchá tán, huò yòng qítā fāngfǎ ná yàngběn.",
    spoken: "其他方法可能包括扫描、检查痰，或用其他方法拿样本。",
    english: "Alternatives may include imaging, sputum tests or another way of obtaining a sample.",
    note: "Only discuss clinically reasonable alternatives for the patient’s diagnostic question.",
    responses: [
      { pinyin: "Wǒ kěyǐ zhǐ zuò sǎomiáo ma?", spoken: "我可以只做扫描吗？", english: "Can I have only a scan?" }
    ]
  },
  {
    id: "bronchoscopy-19", category: "procedure", procedure: "bronchoscopy", stage: "If not done", risk: "consent",
    pinyin: "Rúguǒ bù zuò, wǒmen kěnéng bù néng quèdìng wèntí de yuányīn, zhìliáo yě kěnéng yánchí.",
    spoken: "如果不做，我们可能不能确定问题的原因，治疗也可能延迟。",
    english: "Without the test, the diagnosis may remain uncertain and treatment may be delayed.",
    note: "Tailor the consequence of declining to the individual indication; avoid coercive wording.",
    responses: []
  },
  {
    id: "bronchoscopy-20", category: "procedure", procedure: "bronchoscopy", stage: "After sedation", risk: "consent",
    pinyin: "Rúguǒ yǒu yòng fàngsōng de yào, jīntiān bù néng kāichē. Yào yǒu rén péi nǐ huí jiā.",
    spoken: "如果有用放松的药，今天不能开车。要有人陪你回家。",
    english: "If you receive sedation, do not drive that day and arrange for someone to accompany you home.",
    note: "Use the institution’s exact post-sedation restriction period and escort requirements.",
    responses: [
      { pinyin: "Wǒ de jiārén kěyǐ lái jiē wǒ.", spoken: "我的家人可以来接我。", english: "My family member can collect me." }
    ]
  },
  {
    id: "bronchoscopy-21", category: "procedure", procedure: "bronchoscopy", stage: "Aftercare", risk: "consent",
    pinyin: "Rúguǒ huí jiā hòu hěn chuǎn, xiōngtòng, fāshāo bù tuì, huò késou hěn duō xuè, qǐng mǎshàng qiúzhù.",
    spoken: "如果回家后很喘、胸痛、发烧不退，或咳嗽很多血，请马上求助。",
    english: "Seek urgent help for marked breathlessness, chest pain, persistent fever or significant coughing of blood.",
    note: "Give the patient the unit’s actual emergency contact instructions and thresholds.",
    responses: []
  },
  {
    id: "bronchoscopy-22", category: "procedure", procedure: "bronchoscopy", stage: "Questions", risk: "consent",
    pinyin: "Guānyú zhège jiǎnchá, nǐ yǒu shénme wèntí?",
    spoken: "关于这个检查，你有什么问题？",
    english: "What questions do you have about the procedure?",
    responses: [
      { pinyin: "Duō jiǔ kěyǐ zhīdào jiéguǒ?", spoken: "多久可以知道结果？", english: "How long until the results are available?" }
    ]
  },
  {
    id: "bronchoscopy-23", category: "procedure", procedure: "bronchoscopy", stage: "Check understanding", risk: "consent",
    pinyin: "Qǐng nǐ yòng zìjǐ de huà shuō yí biàn, zhège jiǎnchá shì zěnme zuò de?",
    spoken: "请你用自己的话说一遍，这个检查是怎么做的？",
    english: "In your own words, can you tell me how this test is done?",
    note: "Frame teach-back as a check of your explanation, not a test of the patient.",
    responses: [
      { pinyin: "Yòng xiǎo jìngzi cóng bízi huò zuǐba jìnqù kàn fèi.", spoken: "用小镜子从鼻子或嘴巴进去看肺。", english: "A small camera goes through the nose or mouth to look at the lungs." }
    ]
  },
  {
    id: "bronchoscopy-24", category: "procedure", procedure: "bronchoscopy", stage: "Ask permission", risk: "red",
    pinyin: "Nǐ míngbai zhège jiǎnchá de hǎochu, fēngxiǎn hé qítā xuǎnzé ma? Nǐ tóngyì wǒmen jìxù ma?",
    spoken: "你明白这个检查的好处、风险和其他选择吗？你同意我们继续吗？",
    english: "Do you understand the benefits, risks and alternatives, and do you agree to proceed?",
    note: "This phrase does not itself establish valid consent. Confirm capacity, voluntariness, adequate information and local documentation requirements.",
    responses: [
      { pinyin: "Wǒ míngbai, wǒ tóngyì.", spoken: "我明白，我同意。", english: "I understand and agree." },
      { pinyin: "Wǒ hái yǒu wèntí.", spoken: "我还有问题。", english: "I still have questions." }
    ]
  },

  {
    id: "closing-01", category: "closing", risk: "green",
    pinyin: "Qíngkuàng kàn qǐlái bǐjiào wěndìng.",
    spoken: "情况看起来比较稳定。",
    english: "Your condition appears relatively stable.",
    responses: [
      { pinyin: "Hǎo de.", spoken: "好的。", english: "All right." }
    ]
  },
  {
    id: "closing-02", category: "closing", risk: "green",
    pinyin: "Wǒmen xiān yòng zhège yào.",
    spoken: "我们先用这个药。",
    english: "We will start with this medicine.",
    responses: [
      { pinyin: "Yào yòng duō jiǔ?", spoken: "要用多久？", english: "How long should I use it?" }
    ]
  },
  {
    id: "closing-03", category: "closing", risk: "amber",
    pinyin: "Nǐ kěyǐ yòng zìjǐ de huà shuō yí biàn ma?",
    spoken: "你可以用自己的话说一遍吗？",
    english: "Can you explain it back to me in your own words?",
    note: "Use teach-back to check your explanation rather than testing the patient.",
    responses: [
      { pinyin: "Wǒ měitiān zǎowǎn yòng yí cì.", spoken: "我每天早晚用一次。", english: "I use it once each morning and evening." }
    ]
  },
  {
    id: "closing-04", category: "closing", risk: "green",
    pinyin: "Yǒu shénme wèntí ma?",
    spoken: "有什么问题吗？",
    english: "Do you have any questions?",
    responses: [
      { pinyin: "Zhège yào yǒu shénme fùzuòyòng?", spoken: "这个药有什么副作用？", english: "What side effects does this medicine have?" },
      { pinyin: "Méiyǒu wèntí.", spoken: "没有问题。", english: "No questions." }
    ]
  },
  {
    id: "closing-05", category: "closing", risk: "amber",
    pinyin: "Rúguǒ gèng chuǎn, xiōngtòng, huò késou chūxuè, qǐng mǎshàng qù jízhěn.",
    spoken: "如果更喘、胸痛，或咳嗽出血，请马上去急诊。",
    english: "If you become more breathless, develop chest pain or cough blood, go to the emergency department immediately.",
    note: "Tailor safety-net advice to the patient and confirm understanding.",
    responses: [
      { pinyin: "Hǎo, wǒ zhīdào le.", spoken: "好，我知道了。", english: "Okay, I understand." }
    ]
  },
  {
    id: "closing-06", category: "closing", risk: "green",
    pinyin: "Wǒmen liǎng ge xīngqī hòu zài jiàn.",
    spoken: "我们两个星期后再见。",
    english: "We will see you again in two weeks.",
    responses: [
      { pinyin: "Hǎo, xièxie yīshēng.", spoken: "好，谢谢医生。", english: "All right, thank you, doctor." }
    ]
  }
];

window.HUXI_DICTIONARY_CATEGORIES = [
  { id: "symptoms", name: "Symptoms & signs", shortName: "Symptoms" },
  { id: "conditions", name: "Conditions", shortName: "Conditions" },
  { id: "body", name: "Body & breathing", shortName: "Body" },
  { id: "tests", name: "Tests & samples", shortName: "Tests" },
  { id: "procedures", name: "Procedures & equipment", shortName: "Procedures" },
  { id: "medicines", name: "Medicines & care", shortName: "Medicines" },
  { id: "safety", name: "Risks & safety", shortName: "Safety" },
  { id: "communication", name: "Communication", shortName: "Communication" },
  { id: "exposure", name: "Exposure & daily life", shortName: "Daily life" }
];

window.HUXI_DICTIONARY = [
  { id: "air-around-lung", english: "Air around the lung / pneumothorax", pinyin: "fèi wàimiàn yǒu kōngqì", spoken: "肺外面有空气", category: "conditions", keywords: "air leak collapsed lung", note: "Plain-language wording used in the chest-drain pathway." },
  { id: "air-leak", english: "Air leak from the lung", pinyin: "fèi lòuqì", spoken: "肺漏气", category: "conditions", keywords: "pneumothorax collapsed lung" },
  { id: "airways", english: "Airways", pinyin: "hūxīdào", spoken: "呼吸道", category: "body", keywords: "breathing tubes respiratory tract" },
  { id: "allergy", english: "Allergy / allergic", pinyin: "guòmǐn", spoken: "过敏", category: "conditions", keywords: "reaction" },
  { id: "alternative", english: "Alternative / other option", pinyin: "qítā xuǎnzé", spoken: "其他选择", category: "communication", keywords: "choice consent" },
  { id: "anaesthetic", english: "Anaesthetic medicine", pinyin: "mázuì yào", spoken: "麻醉药", category: "medicines", keywords: "numbing spray" },
  { id: "asthma", english: "Asthma", pinyin: "qìchuǎn", spoken: "气喘", category: "conditions", keywords: "wheeze", note: "Used for asthma in these phrases; chuǎn on its own means breathless." },
  { id: "benefit", english: "Benefit", pinyin: "hǎochu", spoken: "好处", category: "communication", keywords: "advantage consent" },
  { id: "biopsy", english: "Biopsy / take tissue", pinyin: "ná zǔzhī", spoken: "拿组织", category: "tests", keywords: "tissue sample" },
  { id: "bleeding", english: "Bleeding", pinyin: "chūxuè", spoken: "出血", category: "safety", keywords: "blood haemorrhage" },
  { id: "blood", english: "Blood", pinyin: "xuè", spoken: "血", category: "body", keywords: "haemoptysis bleeding" },
  { id: "blood-pressure", english: "Blood pressure", pinyin: "xuèyā", spoken: "血压", category: "body", keywords: "monitor observations" },
  { id: "blood-streaks", english: "Blood streaks", pinyin: "xuèsī", spoken: "血丝", category: "symptoms", keywords: "phlegm sputum haemoptysis" },
  { id: "blood-vessel", english: "Blood vessel", pinyin: "xuèguǎn", spoken: "血管", category: "body", keywords: "vessel" },
  { id: "blockage", english: "Blockage / blocked", pinyin: "dǔzhù", spoken: "堵住", category: "safety", keywords: "tube chest drain" },
  { id: "breathless", english: "Breathless / breathlessness", pinyin: "chuǎn", spoken: "喘", category: "symptoms", keywords: "short of breath dyspnoea" },
  { id: "breathe", english: "Breathe / breathing", pinyin: "hūxī", spoken: "呼吸", category: "body", keywords: "respiration" },
  { id: "breathe-in", english: "Breathe in", pinyin: "xī jìnqù", spoken: "吸进去", category: "medicines", keywords: "inhale inhaler" },
  { id: "breathe-out", english: "Breathe out", pinyin: "hūqì", spoken: "呼气", category: "medicines", keywords: "exhale inhaler" },
  { id: "bronchoscope", english: "Bronchoscope / small camera", pinyin: "xiǎo jìngzi", spoken: "小镜子", category: "procedures", keywords: "scope flexible camera" },
  { id: "bronchoscopy", english: "Bronchoscopy", pinyin: "qìguǎnjìng jiǎnchá", spoken: "气管镜检查", category: "procedures", keywords: "scope camera airway test" },
  { id: "cause", english: "Cause / reason", pinyin: "yuányīn", spoken: "原因", category: "communication", keywords: "diagnosis" },
  { id: "chest", english: "Chest", pinyin: "xiōngkǒu", spoken: "胸口", category: "body", keywords: "thorax" },
  { id: "chest-drain", english: "Chest drain / chest tube", pinyin: "xiōngguǎn", spoken: "胸管", category: "procedures", keywords: "intercostal drain tube" },
  { id: "chest-pain", english: "Chest pain", pinyin: "xiōngtòng", spoken: "胸痛", category: "symptoms", keywords: "pain" },
  { id: "chest-xray", english: "Chest X-ray", pinyin: "xiōngbù X-guāng", spoken: "胸部X光", category: "tests", keywords: "radiograph imaging" },
  { id: "chemicals", english: "Chemicals", pinyin: "huàxuépǐn", spoken: "化学品", category: "exposure", keywords: "occupational work exposure" },
  { id: "chronic-lung-disease", english: "COPD / chronic lung disease", pinyin: "mànxìng fèibìng", spoken: "慢性肺病", category: "conditions", keywords: "chronic obstructive pulmonary disease", note: "Plain-language wording used in the asthma/COPD phrases." },
  { id: "cigarette", english: "Cigarette / cigarette smoke", pinyin: "xiāngyān", spoken: "香烟", category: "exposure", keywords: "smoking tobacco" },
  { id: "collapsed-lung", english: "Collapsed / shrunken lung", pinyin: "suō xiǎo", spoken: "缩小", category: "conditions", keywords: "pneumothorax air leak lung", note: "Plain-language wording used in the bronchoscopy pathway." },
  { id: "consent", english: "Agree / give consent", pinyin: "tóngyì", spoken: "同意", category: "communication", keywords: "permission proceed" },
  { id: "contrast", english: "Contrast injection", pinyin: "dǎ yàoshuǐ", spoken: "打药水", category: "tests", keywords: "dye CT injection", note: "Plain spoken wording used in the CT phrases." },
  { id: "cough", english: "Cough", pinyin: "késou", spoken: "咳嗽", category: "symptoms", keywords: "coughing" },
  { id: "cough-blood", english: "Cough blood", pinyin: "késou chūxuè", spoken: "咳嗽出血", category: "symptoms", keywords: "haemoptysis blood" },
  { id: "ct-lung", english: "CT scan of the lungs", pinyin: "fèibù CT", spoken: "肺部CT", category: "tests", keywords: "scan imaging" },
  { id: "doctor", english: "Doctor", pinyin: "yīshēng", spoken: "医生", category: "communication", keywords: "physician" },
  { id: "drain-air-fluid", english: "Drain air or fluid", pinyin: "bǎ kōngqì huò jīshuǐ pái chūlái", spoken: "把空气或积水排出来", category: "procedures", keywords: "chest drain remove drainage" },
  { id: "drainage-bottle", english: "Drainage bottle", pinyin: "píngzi", spoken: "瓶子", category: "procedures", keywords: "chest drain bottle", note: "The phrase uses the everyday word for bottle." },
  { id: "drive", english: "Drive", pinyin: "kāichē", spoken: "开车", category: "exposure", keywords: "sedation aftercare car" },
  { id: "dry-cough", english: "Dry cough", pinyin: "gān ké", spoken: "干咳", category: "symptoms", keywords: "cough no phlegm" },
  { id: "dust", english: "Dust", pinyin: "huīchén", spoken: "灰尘", category: "exposure", keywords: "occupational trigger" },
  { id: "emergency", english: "Emergency department", pinyin: "jízhěn", spoken: "急诊", category: "safety", keywords: "A&E emergency room urgent" },
  { id: "explain", english: "Explain", pinyin: "jiěshì", spoken: "解释", category: "communication", keywords: "discussion" },
  { id: "exposure", english: "Exposure / contact", pinyin: "jiēchù", spoken: "接触", category: "exposure", keywords: "work occupational" },
  { id: "family", english: "Family member", pinyin: "jiārén", spoken: "家人", category: "exposure", keywords: "relative accompany" },
  { id: "fasting", english: "Fasting / empty stomach", pinyin: "kōng fù", spoken: "空腹", category: "procedures", keywords: "nil by mouth preparation" },
  { id: "fever", english: "Fever", pinyin: "fāshāo", spoken: "发烧", category: "symptoms", keywords: "temperature infection" },
  { id: "fluid-around-lung", english: "Fluid around the lung / pleural effusion", pinyin: "fèi wàimiàn yǒu jīshuǐ", spoken: "肺外面有积水", category: "conditions", keywords: "pleural fluid water", note: "Plain-language wording used in the chest-drain pathway." },
  { id: "general-anaesthetic", english: "General anaesthetic", pinyin: "quánshēn mázuì", spoken: "全身麻醉", category: "medicines", keywords: "asleep anaesthesia" },
  { id: "heart", english: "Heart", pinyin: "xīnzàng", spoken: "心脏", category: "body", keywords: "cardiac" },
  { id: "heart-rate", english: "Heart rate", pinyin: "xīntiào", spoken: "心跳", category: "body", keywords: "pulse monitor" },
  { id: "hold-breath", english: "Hold your breath", pinyin: "bǐngzhù hūxī", spoken: "屏住呼吸", category: "medicines", keywords: "inhaler technique" },
  { id: "hospital", english: "Hospital admission / stay in hospital", pinyin: "zhùyuàn", spoken: "住院", category: "exposure", keywords: "admitted inpatient" },
  { id: "infection", english: "Infection", pinyin: "gǎnrǎn", spoken: "感染", category: "safety", keywords: "procedure risk" },
  { id: "inhaler", english: "Inhaler", pinyin: "xīrùqì", spoken: "吸入器", category: "medicines", keywords: "puffer asthma COPD" },
  { id: "injury", english: "Injure / injury", pinyin: "shāng dào", spoken: "伤到", category: "safety", keywords: "damage organ vessel" },
  { id: "interpreter", english: "Interpreter", pinyin: "fānyìyuán", spoken: "翻译员", category: "communication", keywords: "translator language" },
  { id: "local-anaesthetic", english: "Local anaesthetic", pinyin: "júbù mázuì", spoken: "局部麻醉", category: "medicines", keywords: "numb numbing" },
  { id: "lung", english: "Lung", pinyin: "fèi", spoken: "肺", category: "body", keywords: "pulmonary" },
  { id: "lung-expand", english: "Lung expands", pinyin: "fèi zhāng kāi", spoken: "肺张开", category: "body", keywords: "re-expand chest drain" },
  { id: "lung-function", english: "Lung function test", pinyin: "fèigōngnéng jiǎnchá", spoken: "肺功能检查", category: "tests", keywords: "PFT spirometry blow" },
  { id: "major-bleeding", english: "Major bleeding", pinyin: "dà chūxuè", spoken: "大出血", category: "safety", keywords: "haemorrhage biopsy" },
  { id: "medicine", english: "Medicine", pinyin: "yào", spoken: "药", category: "medicines", keywords: "medication drug" },
  { id: "medicine-allergy", english: "Medicine allergy", pinyin: "yào guòmǐn", spoken: "药过敏", category: "conditions", keywords: "drug allergy reaction" },
  { id: "monitor", english: "Monitor oxygen, heart rate and blood pressure", pinyin: "kàn nǐ de yǎngqì, xīntiào hé xuèyā", spoken: "看你的氧气、心跳和血压", category: "procedures", keywords: "observations monitoring" },
  { id: "mouth", english: "Mouth", pinyin: "zuǐba", spoken: "嘴巴", category: "body", keywords: "oral" },
  { id: "movement", english: "Move / displacement", pinyin: "yídòng", spoken: "移动", category: "safety", keywords: "chest drain tube" },
  { id: "needle-aspiration", english: "Needle aspiration", pinyin: "yòng zhēn chōu", spoken: "用针抽", category: "procedures", keywords: "needle drain alternative" },
  { id: "night-sweats", english: "Night sweats", pinyin: "wǎnshàng shuìjiào huì chū hàn", spoken: "晚上睡觉会出汗", category: "symptoms", keywords: "tuberculosis infection sweat" },
  { id: "nose", english: "Nose", pinyin: "bízi", spoken: "鼻子", category: "body", keywords: "nasal" },
  { id: "organ", english: "Organ", pinyin: "qìguān", spoken: "器官", category: "body", keywords: "nearby organ injury" },
  { id: "oxygen", english: "Oxygen", pinyin: "yǎngqì", spoken: "氧气", category: "body", keywords: "saturation monitor" },
  { id: "pain", english: "Pain / painful", pinyin: "tòng", spoken: "痛", category: "symptoms", keywords: "hurt" },
  { id: "penicillin", english: "Penicillin", pinyin: "pánníxīlín", spoken: "盘尼西林", category: "medicines", keywords: "antibiotic allergy" },
  { id: "phlegm", english: "Phlegm / sputum", pinyin: "tán", spoken: "痰", category: "symptoms", keywords: "mucus" },
  { id: "pressure", english: "Pressure", pinyin: "yālì", spoken: "压力", category: "symptoms", keywords: "chest drain insertion" },
  { id: "procedure", english: "Procedure", pinyin: "shǒuxù", spoken: "手续", category: "procedures", keywords: "consent chest drain" },
  { id: "question", english: "Question / problem", pinyin: "wèntí", spoken: "问题", category: "communication", keywords: "ask" },
  { id: "rash", english: "Red rash / red spots", pinyin: "hóngdiǎn", spoken: "红点", category: "symptoms", keywords: "contrast allergy skin" },
  { id: "reliever-inhaler", english: "Reliever inhaler", pinyin: "jíjiù xīrùqì", spoken: "急救吸入器", category: "medicines", keywords: "rescue inhaler puffer" },
  { id: "result", english: "Result", pinyin: "jiéguǒ", spoken: "结果", category: "tests", keywords: "answer report" },
  { id: "rinse-mouth", english: "Rinse your mouth", pinyin: "shùkǒu", spoken: "漱口", category: "medicines", keywords: "inhaler aftercare" },
  { id: "risk", english: "Risk", pinyin: "fēngxiǎn", spoken: "风险", category: "communication", keywords: "consent complication" },
  { id: "scan", english: "Scan / imaging", pinyin: "sǎomiáo", spoken: "扫描", category: "tests", keywords: "CT image" },
  { id: "sedation", english: "Sedation / medicine to relax", pinyin: "fàngsōng de yào", spoken: "放松的药", category: "medicines", keywords: "drowsy sleepy", note: "Plain spoken wording used in the bronchoscopy pathway." },
  { id: "shaking-chills", english: "Shaking chills", pinyin: "fādǒu", spoken: "发抖", category: "symptoms", keywords: "rigors infection cold" },
  { id: "side-effects", english: "Side effects", pinyin: "fùzuòyòng", spoken: "副作用", category: "safety", keywords: "medicine adverse effects" },
  { id: "smoke", english: "Smoke / smoking", pinyin: "chōuyān", spoken: "抽烟", category: "exposure", keywords: "cigarette tobacco" },
  { id: "sore-throat", english: "Sore throat", pinyin: "hóulóng tòng", spoken: "喉咙痛", category: "symptoms", keywords: "bronchoscopy aftercare" },
  { id: "sputum-test", english: "Sputum test", pinyin: "jiǎnchá tán", spoken: "检查痰", category: "tests", keywords: "phlegm sample" },
  { id: "stable", english: "Stable", pinyin: "wěndìng", spoken: "稳定", category: "communication", keywords: "condition" },
  { id: "stitch", english: "Stitch / suture", pinyin: "xiàn", spoken: "线", category: "procedures", keywords: "secure chest drain", note: "The phrase uses the everyday word for thread." },
  { id: "stop-medicine", english: "Stop medicine", pinyin: "tíng yào", spoken: "停药", category: "medicines", keywords: "discontinue medication" },
  { id: "teach-back", english: "Explain back in your own words", pinyin: "yòng zìjǐ de huà shuō yí biàn", spoken: "用自己的话说一遍", category: "communication", keywords: "teach back understanding" },
  { id: "test", english: "Test / examination", pinyin: "jiǎnchá", spoken: "检查", category: "tests", keywords: "investigation procedure" },
  { id: "throat", english: "Throat", pinyin: "hóulóng", spoken: "喉咙", category: "body", keywords: "bronchoscopy" },
  { id: "tissue", english: "Tissue", pinyin: "zǔzhī", spoken: "组织", category: "body", keywords: "biopsy sample" },
  { id: "tissue-sample", english: "Small tissue sample", pinyin: "yìdiǎn zǔzhī", spoken: "一点组织", category: "tests", keywords: "biopsy specimen" },
  { id: "treatment", english: "Treatment", pinyin: "zhìliáo", spoken: "治疗", category: "medicines", keywords: "therapy management" },
  { id: "tuberculosis", english: "Tuberculosis / TB", pinyin: "fèijiéhé", spoken: "肺结核", category: "conditions", keywords: "infection" },
  { id: "tube", english: "Tube", pinyin: "guǎnzi", spoken: "管子", category: "procedures", keywords: "chest drain" },
  { id: "ultrasound", english: "Ultrasound", pinyin: "chāoshēngbō", spoken: "超声波", category: "tests", keywords: "scan pleural fluid" },
  { id: "uncomfortable", english: "Uncomfortable", pinyin: "bù shūfu", spoken: "不舒服", category: "symptoms", keywords: "discomfort" },
  { id: "understand", english: "Understand", pinyin: "míngbai", spoken: "明白", category: "communication", keywords: "consent comprehension" },
  { id: "urgent-help", english: "Seek urgent help", pinyin: "mǎshàng qiúzhù", spoken: "马上求助", category: "safety", keywords: "emergency warning" },
  { id: "vape", english: "Vape", pinyin: "chōu diànzǐyān", spoken: "抽电子烟", category: "exposure", keywords: "electronic cigarette e-cigarette" },
  { id: "weight-loss", english: "Weight loss", pinyin: "shòu xiàlái", spoken: "瘦下来", category: "symptoms", keywords: "lose weight" }
];
