window.HUXI_CATEGORIES = [
  { id: "opening", name: "Opening the consultation", shortName: "Opening", symbol: "✦", description: "Introduce yourself and make communication easier." },
  { id: "breathlessness", name: "Breathlessness", shortName: "Breathlessness", symbol: "≈", description: "Onset, severity, exercise and positional symptoms." },
  { id: "cough", name: "Cough & sputum", shortName: "Cough & sputum", symbol: "⌁", description: "Duration, phlegm, blood and upper-airway symptoms." },
  { id: "asthma", name: "Asthma / COPD", shortName: "Asthma / COPD", symbol: "◌", description: "Control, inhalers, triggers and recent admissions." },
  { id: "exposure", name: "Smoking & exposure", shortName: "Smoking", symbol: "↟", description: "Smoking, vaping, work and household exposure." },
  { id: "infection", name: "Infection & TB", shortName: "Infection & TB", symbol: "+", description: "Fever, weight loss, contacts and travel." },
  { id: "medicine", name: "Medicines & inhalers", shortName: "Medicines", symbol: "◫", description: "Adherence, allergies and simple technique coaching." },
  { id: "investigation", name: "Investigations", shortName: "Investigations", symbol: "⌕", description: "X-ray, CT, lung function and sputum tests." },
  { id: "nodule", name: "Explaining a lung nodule", shortName: "Lung nodule", symbol: "•", description: "The finding, uncertainty, risk assessment, follow-up CT, PET-CT and biopsy." },
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
  },
  {
    id: "fibrinolysis",
    name: "Intrapleural fibrinolysis",
    symbol: "≋",
    description: "Explain intrapleural tPA and DNase for a poorly draining pleural infection."
  },
  {
    id: "talc-pleurodesis",
    name: "Talc pleurodesis",
    symbol: "◇",
    description: "Explain sterile talc through a chest drain, expected benefit, risks and alternatives."
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
    id: "nodule-01", category: "nodule", risk: "amber",
    pinyin: "Nín de CT xiǎnshì fèi lǐ yǒu yí ge xiǎo diǎn, jiàozuò fèi jiéjié.",
    spoken: "您的CT显示肺里有一个小点，叫做肺结节。",
    english: "Your CT scan shows a small spot in your lung called a lung nodule.",
    note: "Use the report's exact number, size and location; avoid calling a nodule a mass.",
    responses: [
      { pinyin: "Fèi jiéjié shì shénme?", spoken: "肺结节是什么？", english: "What is a lung nodule?" }
    ]
  },
  {
    id: "nodule-02", category: "nodule", risk: "red",
    pinyin: "Fèi jiéjié bù yídìng shì áizhèng.",
    spoken: "肺结节不一定是癌症。",
    english: "A lung nodule does not necessarily mean cancer.",
    note: "Give the patient's individual risk and plan with a competent interpreter; do not offer false reassurance.",
    responses: [
      { pinyin: "Nà tā kěnéng shì shénme?", spoken: "那它可能是什么？", english: "What else could it be?" }
    ]
  },
  {
    id: "nodule-03", category: "nodule", risk: "amber",
    pinyin: "Yǒuxiē fèi jiéjié shì yǐqián gǎnrǎn huò fāyán hòu liúxià de bāhén.",
    spoken: "有些肺结节是以前感染或发炎后留下的疤痕。",
    english: "Some lung nodules are scars left by an old infection or inflammation.",
    responses: [
      { pinyin: "Wǒ yǐqián dé guo fèiyán.", spoken: "我以前得过肺炎。", english: "I had pneumonia before." }
    ]
  },
  {
    id: "nodule-04", category: "nodule", risk: "red",
    pinyin: "Zhǐ kàn zhè yí cì CT, wǒmen hái bù néng quèdìng tā shì shénme.",
    spoken: "只看这一次CT，我们还不能确定它是什么。",
    english: "From this CT scan alone, we cannot yet be certain what it is.",
    note: "Explain the estimated risk and the recommended next step, not uncertainty alone.",
    responses: [
      { pinyin: "Nà xià yí bù zěnme bàn?", spoken: "那下一步怎么办？", english: "What happens next?" }
    ]
  },
  {
    id: "nodule-05", category: "nodule", risk: "amber",
    pinyin: "Wǒmen xūyào bǎ zhè cì CT hé nín yǐqián de piànzi bǐjiào.",
    spoken: "我们需要把这次CT和您以前的片子比较。",
    english: "We need to compare this CT scan with any previous scans.",
    responses: [
      { pinyin: "Wǒ zài bié de yīyuàn zuò guo CT.", spoken: "我在别的医院做过CT。", english: "I had a CT scan at another hospital." }
    ]
  },
  {
    id: "nodule-06", category: "nodule", risk: "red",
    pinyin: "Jiéjié de dàxiǎo, xíngzhuàng hé yǒu méiyǒu biànhuà, huì bāngzhù wǒmen pànduàn tā shì áizhèng de kěnéngxìng.",
    spoken: "结节的大小、形状和有没有变化，会帮助我们判断它是癌症的可能性。",
    english: "The nodule's size, shape and any change over time help us assess how likely it is to be cancer.",
    responses: [
      { pinyin: "Wǒ de jiéjié yǒu duō dà?", spoken: "我的结节有多大？", english: "How large is my nodule?" }
    ]
  },
  {
    id: "nodule-07", category: "nodule", risk: "amber",
    pinyin: "Wǒmen yě huì kǎolǜ nín de niánlíng, chōuyān qíngkuàng hé yǐwǎng bìngshǐ.",
    spoken: "我们也会考虑您的年龄、抽烟情况和以往病史。",
    english: "We will also consider your age, smoking history and previous medical history.",
    responses: [
      { pinyin: "Wǒ yǐqián chōu guo yān.", spoken: "我以前抽过烟。", english: "I used to smoke." }
    ]
  },
  {
    id: "nodule-08", category: "nodule", risk: "red",
    pinyin: "Gēnjù pínggū jiéguǒ, nín kěnéng bù xūyào jìnyíbù jiǎnchá, yě kěnéng xūyào fùchá CT, zuò PET-CT, huójiǎn huò zhuānkē pínggū.",
    spoken: "根据评估结果，您可能不需要进一步检查，也可能需要复查CT、做PET-CT、活检或专科评估。",
    english: "Depending on the assessment, you may need no further tests, or you may need a repeat CT scan, PET-CT, biopsy or specialist review.",
    note: "These are examples, not a routine bundle or exhaustive list; state only the plan that applies. Very high-risk findings may lead to a specialist discussion of treatment rather than biopsy.",
    responses: [
      { pinyin: "Wǒ xūyào zuò nǎ yí ge?", spoken: "我需要做哪一个？", english: "Which one do I need?" }
    ]
  },
  {
    id: "nodule-09", category: "nodule", risk: "amber",
    pinyin: "Wǒmen jiànyì guò yí duàn shíjiān zài fùchá CT, kàn jiéjié yǒu méiyǒu biànhuà.",
    spoken: "我们建议过一段时间再复查CT，看结节有没有变化。",
    english: "We recommend a follow-up CT scan after a period of time to see whether the nodule changes.",
    note: "Give the exact interval from the agreed plan; some nodules do not require imaging follow-up.",
    responses: [
      { pinyin: "Shì jǐ ge yuè hòu?", spoken: "是几个月后？", english: "How many months later?" }
    ]
  },
  {
    id: "nodule-10", category: "nodule", risk: "amber",
    pinyin: "Rúguǒ jiéjié zài yí duàn shíjiān nèi yìzhí méiyǒu biànhuà, zhīhòu kěnéng jiù bù xūyào zài fùchá.",
    spoken: "如果结节在一段时间内一直没有变化，之后可能就不需要再复查。",
    english: "If the nodule remains unchanged over time, you may not need any more scans.",
    note: "Only use this after applying the appropriate surveillance period for that nodule.",
    responses: [
      { pinyin: "Wǒmen yào guānchá duō jiǔ?", spoken: "我们要观察多久？", english: "How long do we need to monitor it?" }
    ]
  },
  {
    id: "nodule-11", category: "nodule", risk: "red",
    pinyin: "Rúguǒ jiéjié jiào dà huò kàn qǐlái kěyí, wǒmen kěnéng huì ānpái PET-CT.",
    spoken: "如果结节较大或看起来可疑，我们可能会安排PET-CT。",
    english: "If the nodule is larger or looks suspicious, we may arrange a PET-CT scan.",
    note: "PET-CT suitability depends on the nodule's size and clinical context; it is not diagnostic by itself.",
    responses: [
      { pinyin: "PET-CT shì zuò shénme de?", spoken: "PET-CT是做什么的？", english: "What is a PET-CT scan for?" }
    ]
  },
  {
    id: "nodule-12", category: "nodule", risk: "red",
    pinyin: "PET-CT kěyǐ gěi wǒmen gèng duō xìnxī, dàn bù néng dān kào zhège jiǎnchá quèdìng shì bú shì áizhèng.",
    spoken: "PET-CT可以给我们更多信息，但不能单靠这个检查确定是不是癌症。",
    english: "A PET-CT scan can give us more information, but it cannot by itself determine whether it is cancer.",
    responses: [
      { pinyin: "Nà hái xūyào huójiǎn ma?", spoken: "那还需要活检吗？", english: "Will I still need a biopsy?" }
    ]
  },
  {
    id: "nodule-13", category: "nodule", risk: "red",
    pinyin: "Yǒuxiē rén xūyào zuò huójiǎn, jiùshì qǔ yìdiǎn zǔzhī lái huàyàn.",
    spoken: "有些人需要做活检，就是取一点组织来化验。",
    english: "Some people need a biopsy to take a small tissue sample for testing.",
    note: "The biopsy method, feasibility and risks vary; conduct a separate consent discussion with a competent interpreter.",
    responses: [
      { pinyin: "Huójiǎn zěnme zuò?", spoken: "活检怎么做？", english: "How is a biopsy done?" }
    ]
  },
  {
    id: "nodule-14", category: "nodule", risk: "red",
    pinyin: "Bú shì měi ge rén dōu xūyào huójiǎn; juédìng qián, wǒmen huì hé nín tǎolùn hǎochu, fēngxiǎn hé qítā xuǎnzé.",
    spoken: "不是每个人都需要活检；决定前，我们会和您讨论好处、风险和其他选择。",
    english: "Not everyone needs a biopsy; before deciding, we will discuss the benefits, risks and other options with you.",
    note: "Use a competent interpreter for the full consent discussion and allow time for questions.",
    responses: [
      { pinyin: "Wǒ kěyǐ xiān kǎolǜ yíxià ma?", spoken: "我可以先考虑一下吗？", english: "Can I think about it first?" }
    ]
  },
  {
    id: "nodule-15", category: "nodule", risk: "amber",
    pinyin: "Zhuānkē tuánduì huì yìqǐ kàn nín de piànzi, ránhòu jiànyì xià yí bù zěnme zuò.",
    spoken: "专科团队会一起看您的片子，然后建议下一步怎么做。",
    english: "A specialist team will review your scans together and recommend the next step.",
    note: "Use this only when the case will be reviewed by an appropriate specialist or multidisciplinary team.",
    responses: [
      { pinyin: "Shénme shíhou huì yǒu jiéguǒ?", spoken: "什么时候会有结果？", english: "When will there be a result?" }
    ]
  },
  {
    id: "nodule-16", category: "nodule", risk: "amber",
    pinyin: "Jíshǐ nín méiyǒu bù shūfu, yě qǐng ànzhào ānpái zuò CT bìng huílái fùzhěn.",
    spoken: "即使您没有不舒服，也请按照安排做CT并回来复诊。",
    english: "Even if you feel well, please attend your scheduled CT scan and follow-up.",
    responses: [
      { pinyin: "Hǎo, wǒ huì ànshí lái.", spoken: "好，我会按时来。", english: "All right, I will come on time." }
    ]
  },
  {
    id: "nodule-17", category: "nodule", risk: "amber",
    pinyin: "Rúguǒ dào le yuēdìng shíjiān hái méi shōudào CT huò fùzhěn tōngzhī, qǐng liánxì zhěnsuǒ.",
    spoken: "如果到了约定时间还没收到CT或复诊通知，请联系诊所。",
    english: "If you have not received your CT scan or follow-up notice by the agreed time, please contact the clinic.",
    note: "Give the actual contact route and agreed time, and follow the local results-tracking process.",
    responses: [
      { pinyin: "Wǒ yīnggāi dǎ nǎ ge diànhuà hàomǎ?", spoken: "我应该打哪个电话号码？", english: "Which phone number should I call?" }
    ]
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
    id: "fibrinolysis-01", category: "procedure", procedure: "fibrinolysis", stage: "Explain the reason", risk: "consent",
    pinyin: "Wǒ lái jiěshì wèishénme yào tōngguò xiōngguǎn fàng yào.",
    spoken: "我来解释为什么要通过胸管放药。",
    english: "I will explain why we want to put medicine through your chest drain.",
    note: "This pathway is for intrapleural tPA plus DNase in pleural infection, not systemic thrombolysis. Use an interpreter unless you can conduct the full discussion accurately.",
    responses: [
      { pinyin: "Hǎo, qǐng nǐ jiěshì.", spoken: "好，请你解释。", english: "All right, please explain." }
    ]
  },
  {
    id: "fibrinolysis-02", category: "procedure", procedure: "fibrinolysis", stage: "Explain the reason", risk: "consent",
    pinyin: "Nǐ de fèi wàimiàn yǒu bèi gǎnrǎn de jīshuǐ.",
    spoken: "你的肺外面有被感染的积水。",
    english: "There is infected fluid around your lung.",
    note: "Explain the diagnosis and microbiology in patient-specific terms where known.",
    responses: []
  },
  {
    id: "fibrinolysis-03", category: "procedure", procedure: "fibrinolysis", stage: "Explain the reason", risk: "consent",
    pinyin: "Jīshuǐ hěn chóu, yòu fēn chéng jǐ ge xiǎo gé, suǒyǐ xiōngguǎn pái bù gānjìng.",
    spoken: "积水很稠，又分成几个小格，所以胸管排不干净。",
    english: "The fluid is thick and divided into pockets, so the chest drain is not clearing it fully.",
    responses: [
      { pinyin: "Suǒyǐ lǐmiàn hái yǒu hěn duō jīshuǐ ma?", spoken: "所以里面还有很多积水吗？", english: "So is there still a lot of fluid inside?" }
    ]
  },
  {
    id: "fibrinolysis-04", category: "procedure", procedure: "fibrinolysis", stage: "What it is", risk: "consent",
    pinyin: "Wǒmen xiǎng tōngguò xiànzài de xiōngguǎn fàng liǎng zhǒng yào: tPA hé DNase.",
    spoken: "我们想通过现在的胸管放两种药：tPA和DNase。",
    english: "We want to give two medicines, tPA and DNase, through your existing chest drain.",
    responses: []
  },
  {
    id: "fibrinolysis-05", category: "procedure", procedure: "fibrinolysis", stage: "What it does", risk: "consent",
    pinyin: "tPA bāngzhù dǎkāi lǐmiàn zhān zhù de dìfang; DNase ràng nóngyè méi nàme chóu.",
    spoken: "tPA帮助打开里面粘住的地方；DNase让脓液没那么稠。",
    english: "tPA helps open the stuck pockets, while DNase makes the infected fluid less thick.",
    note: "This is a deliberately simple explanation of fibrinolytic and enzymatic action.",
    responses: []
  },
  {
    id: "fibrinolysis-06", category: "procedure", procedure: "fibrinolysis", stage: "Expected benefit", risk: "consent",
    pinyin: "Zhèyàng kěyǐ ràng gǎnrǎn de jīshuǐ pái de gèng gānjìng, bāngzhù gǎnrǎn hǎo qǐlái.",
    spoken: "这样可以让感染的积水排得更干净，帮助感染好起来。",
    english: "This may drain the infected fluid more completely and help the infection improve.",
    responses: []
  },
  {
    id: "fibrinolysis-07", category: "procedure", procedure: "fibrinolysis", stage: "Expected benefit", risk: "consent",
    pinyin: "Zhège zhìliáo kěnéng jiǎnshǎo dòng shǒushù de xūyào, dàn bù bǎozhèng yídìng chénggōng.",
    spoken: "这个治疗可能减少动手术的需要，但不保证一定成功。",
    english: "The treatment may reduce the need for surgery, but it is not guaranteed to work.",
    note: "Do not imply that surgery will definitely be avoided.",
    responses: [
      { pinyin: "Rúguǒ méiyǒu xiàoguǒ ne?", spoken: "如果没有效果呢？", english: "What if it does not work?" }
    ]
  },
  {
    id: "fibrinolysis-08", category: "procedure", procedure: "fibrinolysis", stage: "Special use", risk: "consent",
    pinyin: "Zhè liǎng zhǒng yào zài xiōngqiāng lǐ shǐyòng shì yí ge tèshū yòngfǎ.",
    spoken: "这两种药在胸腔里使用是一个特殊用法。",
    english: "Using these medicines inside the pleural space is an off-label use.",
    note: "Explain off-label or unlicensed use according to institutional policy and answer questions about the evidence.",
    responses: []
  },
  {
    id: "fibrinolysis-09", category: "procedure", procedure: "fibrinolysis", stage: "What happens", risk: "consent",
    pinyin: "Měi cì fàng yào hòu, xiōngguǎn huì zànshí guān qǐlái, ránhòu zài dǎkāi ràng jīshuǐ liú chūlái.",
    spoken: "每次放药后，胸管会暂时关起来，然后再打开让积水流出来。",
    english: "After each dose, the drain is temporarily closed and then reopened so the fluid can drain.",
    note: "Use the exact local dwell time and drain-management protocol.",
    responses: [
      { pinyin: "Xiōngguǎn yào guān duō jiǔ?", spoken: "胸管要关多久？", english: "How long will the drain be closed?" }
    ]
  },
  {
    id: "fibrinolysis-10", category: "procedure", procedure: "fibrinolysis", stage: "What happens", risk: "consent",
    pinyin: "Kěnéng xūyào zuò jǐ cì, tōngcháng bú huì chāoguò sān tiān.",
    spoken: "可能需要做几次，通常不会超过三天。",
    english: "Several doses may be needed, usually over no more than three days.",
    note: "State the prescribed dose and schedule; reduced-dose or once-daily protocols may be used for selected patients.",
    responses: []
  },
  {
    id: "fibrinolysis-11", category: "procedure", procedure: "fibrinolysis", stage: "Pain and discomfort", risk: "consent",
    pinyin: "Fàng yào huò guān zhù xiōngguǎn shí, kěnéng huì xiōngtòng huò bù shūfu.",
    spoken: "放药或关住胸管时，可能会胸痛或不舒服。",
    english: "You may have chest pain or discomfort while the medicine is given or the drain is closed.",
    note: "Explain the analgesia plan and what the patient should do if pain or breathlessness becomes significant.",
    responses: [
      { pinyin: "Rúguǒ hěn tòng zěnme bàn?", spoken: "如果很痛怎么办？", english: "What if it is very painful?" }
    ]
  },
  {
    id: "fibrinolysis-12", category: "procedure", procedure: "fibrinolysis", stage: "Expected drainage", risk: "consent",
    pinyin: "Fàng yào hòu, liúchūlái de shuǐ kěnéng biàn duō, yánsè yě kěnéng dài xuè.",
    spoken: "放药后，流出来的水可能变多，颜色也可能带血。",
    english: "After treatment, more fluid may drain and it may look blood-stained.",
    note: "Blood-stained drainage is monitored closely and must be distinguished from clinically significant pleural bleeding.",
    responses: []
  },
  {
    id: "fibrinolysis-13", category: "procedure", procedure: "fibrinolysis", stage: "Bleeding risk", risk: "consent",
    pinyin: "Zhège yào yǒu ràng xiōngqiāng chūxuè de fēngxiǎn.",
    spoken: "这个药有让胸腔出血的风险。",
    english: "There is a risk of bleeding into the pleural space.",
    note: "This is the key material risk highlighted by BTS guidance. Give a locally approved patient-specific estimate.",
    responses: [
      { pinyin: "Zhège fēngxiǎn dà ma?", spoken: "这个风险大吗？", english: "How large is this risk?" }
    ]
  },
  {
    id: "fibrinolysis-14", category: "procedure", procedure: "fibrinolysis", stage: "Serious bleeding", risk: "consent",
    pinyin: "Yánzhòng chūxuè hěn shǎo, dàn kěnéng xūyào shūxuè, qítā shǒuxù huò shǒushù, shènzhì wēixiǎn shēngmìng.",
    spoken: "严重出血很少，但可能需要输血、其他手续或手术，甚至危险生命。",
    english: "Serious bleeding is uncommon but may require a blood transfusion, another procedure or surgery and can be life-threatening.",
    responses: []
  },
  {
    id: "fibrinolysis-15", category: "procedure", procedure: "fibrinolysis", stage: "Check bleeding risk", risk: "consent",
    pinyin: "Nǐ zuìjìn yǒu dòng guò shǒushù ma? Yǒu chūxuè wèntí, huò zhèngzài chī xīxuè de yào ma?",
    spoken: "你最近有动过手术吗？有出血问题，或正在吃稀血的药吗？",
    english: "Have you had recent surgery, a bleeding problem, or are you taking blood-thinning medicine?",
    note: "Review anticoagulants, antiplatelets, recent procedures, active bleeding and other contraindications using local policy.",
    responses: [
      { pinyin: "Wǒ yǒu chī xīxuè de yào.", spoken: "我有吃稀血的药。", english: "I take a blood thinner." }
    ]
  },
  {
    id: "fibrinolysis-16", category: "procedure", procedure: "fibrinolysis", stage: "Individual risk", risk: "consent",
    pinyin: "Wǒmen huì kàn nǐ de yàowù, yànxuè jiéguǒ hé chūxuè fēngxiǎn, zài juédìng jìliàng.",
    spoken: "我们会看你的药物、验血结果和出血风险，再决定剂量。",
    english: "We will review your medicines, blood tests and bleeding risk before deciding the dose.",
    note: "A reduced tPA dose may be considered for higher bleeding risk; this remains a clinician and local-protocol decision.",
    responses: []
  },
  {
    id: "fibrinolysis-17", category: "procedure", procedure: "fibrinolysis", stage: "Other risks", risk: "consent",
    pinyin: "Hěn shǎo kěnéng duì yào guòmǐn.",
    spoken: "很少可能对药过敏。",
    english: "Rarely, an allergic reaction to the medicine can occur.",
    responses: []
  },
  {
    id: "fibrinolysis-18", category: "procedure", procedure: "fibrinolysis", stage: "If treatment fails", risk: "consent",
    pinyin: "Yǒushí yào méiyǒu zúgòu xiàoguǒ, háishi kěnéng xūyào duō fàng yì gēn guǎnzi huò dòng shǒushù.",
    spoken: "有时药没有足够效果，还是可能需要多放一根管子或动手术。",
    english: "If the medicine does not work well enough, another drain or surgery may still be needed.",
    responses: []
  },
  {
    id: "fibrinolysis-19", category: "procedure", procedure: "fibrinolysis", stage: "Alternatives", risk: "consent",
    pinyin: "Qítā fāngfǎ kěnéng bāokuò jìxù yòng kàngshēngsù hé xiōngguǎn, yòng yánshuǐ chōngxǐ, huò dòng shǒushù.",
    spoken: "其他方法可能包括继续用抗生素和胸管、用盐水冲洗，或动手术。",
    english: "Other options may include continuing antibiotics and drainage, saline irrigation or surgery.",
    note: "Only discuss alternatives that are clinically reasonable for this patient and involve the thoracic surgical team where appropriate.",
    responses: [
      { pinyin: "Wǒ kěyǐ xuǎn shǒushù ma?", spoken: "我可以选手术吗？", english: "Can I choose surgery?" }
    ]
  },
  {
    id: "fibrinolysis-20", category: "procedure", procedure: "fibrinolysis", stage: "If not done", risk: "consent",
    pinyin: "Rúguǒ jīshuǐ pái bù gānjìng, gǎnrǎn kěnéng jìxù, biàn chéng yánzhòng de quánshēn gǎnrǎn.",
    spoken: "如果积水排不干净，感染可能继续，变成严重的全身感染。",
    english: "If the fluid is not drained adequately, the infection may continue and cause severe infection throughout the body.",
    note: "Explain the individual consequences of declining, including sepsis risk, without using coercive language.",
    responses: []
  },
  {
    id: "fibrinolysis-21", category: "procedure", procedure: "fibrinolysis", stage: "Questions", risk: "consent",
    pinyin: "Guānyú zhège zhìliáo, nǐ yǒu shénme wèntí?",
    spoken: "关于这个治疗，你有什么问题？",
    english: "What questions do you have about this treatment?",
    responses: []
  },
  {
    id: "fibrinolysis-22", category: "procedure", procedure: "fibrinolysis", stage: "Check understanding", risk: "consent",
    pinyin: "Qǐng nǐ yòng zìjǐ de huà shuō yí biàn, zhè liǎng zhǒng yào shì yòng lái zuò shénme de?",
    spoken: "请你用自己的话说一遍，这两种药是用来做什么的？",
    english: "In your own words, can you tell me what these two medicines are intended to do?",
    note: "Frame teach-back as a check of your explanation, not a test of the patient.",
    responses: [
      { pinyin: "Bāngzhù bǎ gǎnrǎn de jīshuǐ pái chūlái.", spoken: "帮助把感染的积水排出来。", english: "To help drain the infected fluid." }
    ]
  },
  {
    id: "fibrinolysis-23", category: "procedure", procedure: "fibrinolysis", stage: "Ask permission", risk: "red",
    pinyin: "Nǐ míngbai zhège zhìliáo de hǎochu, fēngxiǎn hé qítā xuǎnzé ma? Nǐ tóngyì wǒmen jìxù ma?",
    spoken: "你明白这个治疗的好处、风险和其他选择吗？你同意我们继续吗？",
    english: "Do you understand the benefits, risks and alternatives, and do you agree to proceed?",
    note: "This phrase does not itself establish valid consent. Confirm capacity, voluntariness, adequate information and local documentation requirements.",
    responses: [
      { pinyin: "Wǒ míngbai, wǒ tóngyì.", spoken: "我明白，我同意。", english: "I understand and agree." },
      { pinyin: "Wǒ hái yǒu wèntí.", spoken: "我还有问题。", english: "I still have questions." }
    ]
  },

  {
    id: "talc-pleurodesis-01", category: "procedure", procedure: "talc-pleurodesis", stage: "Explain the reason", risk: "consent",
    pinyin: "Wǒ lái jiěshì wèishénme jiànyì zuò huáshífěn xiōngmó gùdìng.",
    spoken: "我来解释为什么建议做滑石粉胸膜固定。",
    english: "I will explain why we recommend talc pleurodesis.",
    note: "This pathway describes talc slurry through an existing chest drain. Use an interpreter unless you can conduct the full discussion accurately.",
    responses: [
      { pinyin: "Hǎo, qǐng nǐ jiěshì.", spoken: "好，请你解释。", english: "All right, please explain." }
    ]
  },
  {
    id: "talc-pleurodesis-02", category: "procedure", procedure: "talc-pleurodesis", stage: "Explain the reason", risk: "consent",
    pinyin: "Nǐ de fèi wàimiàn de jīshuǐ hěn kěnéng huì zài huílái.",
    spoken: "你的肺外面的积水很可能会再回来。",
    english: "The fluid around your lung is likely to come back.",
    note: "Use this for a recurrent pleural effusion and explain the underlying cause separately.",
    responses: []
  },
  {
    id: "talc-pleurodesis-03", category: "procedure", procedure: "talc-pleurodesis", stage: "Explain the reason", risk: "consent",
    pinyin: "Nǐ de fèi lòuqì, kōngqì kěnéng huì zài huílái.",
    spoken: "你的肺漏气，空气可能会再回来。",
    english: "Your lung has leaked air, and the air may collect again.",
    note: "Use this for selected recurrent pneumothorax cases; do not combine it with the pleural-effusion explanation.",
    responses: []
  },
  {
    id: "talc-pleurodesis-04", category: "procedure", procedure: "talc-pleurodesis", stage: "What it does", risk: "consent",
    pinyin: "Zhège zhìliáo shì ràng fèi de biǎomiàn zhān zài xiōngbì shàng, bǎ zhōngjiān de kōngjiān fēng qǐlái.",
    spoken: "这个治疗是让肺的表面粘在胸壁上，把中间的空间封起来。",
    english: "The treatment makes the lung lining stick to the chest wall, sealing the space between them.",
    responses: [
      { pinyin: "Zhèyàng jīshuǐ jiù bú huì zài lái ma?", spoken: "这样积水就不会再来吗？", english: "Does that mean the fluid will not come back?" }
    ]
  },
  {
    id: "talc-pleurodesis-05", category: "procedure", procedure: "talc-pleurodesis", stage: "Expected benefit", risk: "consent",
    pinyin: "Zhèyàng kěyǐ jiǎnshǎo jīshuǐ huò kōngqì zài huílái, yě kěnéng jiǎnshǎo chuǎn hé zài fàng guǎnzi de xūyào.",
    spoken: "这样可以减少积水或空气再回来，也可能减少喘和再放管子的需要。",
    english: "This may reduce recurrence of fluid or air, breathlessness and the need for another drain.",
    responses: []
  },
  {
    id: "talc-pleurodesis-06", category: "procedure", procedure: "talc-pleurodesis", stage: "Chance of success", risk: "consent",
    pinyin: "Měi shí ge rén lǐ, dàgài qī dào bā ge chénggōng, dàn bù bǎozhèng yídìng yǒuxiào.",
    spoken: "每十个人里，大概七到八个成功，但不保证一定有效。",
    english: "It works in about seven or eight out of ten people, but success is not guaranteed.",
    note: "Use the institution's outcome data when available and tailor the estimate to indication and patient factors.",
    responses: []
  },
  {
    id: "talc-pleurodesis-07", category: "procedure", procedure: "talc-pleurodesis", stage: "Suitability", risk: "consent",
    pinyin: "Yào ràng zhège zhìliáo yǒuxiào, fèi xūyào xiān zhāng kāi, kào zài xiōngbì shàng.",
    spoken: "要让这个治疗有效，肺需要先张开，靠在胸壁上。",
    english: "For the treatment to work, the lung needs to expand and meet the chest wall.",
    note: "If the lung is non-expandable, discuss the lower chance of success and alternatives such as an IPC.",
    responses: []
  },
  {
    id: "talc-pleurodesis-08", category: "procedure", procedure: "talc-pleurodesis", stage: "What happens", risk: "consent",
    pinyin: "Wǒmen huì bǎ wújūn de yīyòng huáshífěn hé yánshuǐ hùn zài yìqǐ, tōngguò xiōngguǎn fàng jìnqù.",
    spoken: "我们会把无菌的医用滑石粉和盐水混在一起，通过胸管放进去。",
    english: "We mix sterile medical talc with saline and put it through the chest drain.",
    responses: []
  },
  {
    id: "talc-pleurodesis-09", category: "procedure", procedure: "talc-pleurodesis", stage: "Comfort", risk: "consent",
    pinyin: "Fàng huáshífěn qián, wǒmen huì gěi zhǐtòngyào, yě kěnéng tōngguò xiōngguǎn fàng júbù mázuì.",
    spoken: "放滑石粉前，我们会给止痛药，也可能通过胸管放局部麻醉。",
    english: "Before giving the talc, we give pain relief and may put local anaesthetic through the drain.",
    note: "Describe the actual analgesia and local-anaesthetic plan used by the institution.",
    responses: []
  },
  {
    id: "talc-pleurodesis-10", category: "procedure", procedure: "talc-pleurodesis", stage: "What happens", risk: "consent",
    pinyin: "Fàng wán hòu, xiōngguǎn kěnéng huì guān yí dào liǎng ge xiǎoshí, ránhòu zài dǎkāi.",
    spoken: "放完后，胸管可能会关一到两个小时，然后再打开。",
    english: "Afterwards, the drain may be closed for one to two hours and then reopened.",
    note: "Use the institution's exact dwell time and drain protocol.",
    responses: [
      { pinyin: "Zhè duàn shíjiān wǒ kěyǐ dòng ma?", spoken: "这段时间我可以动吗？", english: "Can I move during that time?" }
    ]
  },
  {
    id: "talc-pleurodesis-11", category: "procedure", procedure: "talc-pleurodesis", stage: "After the procedure", risk: "consent",
    pinyin: "Xiōngguǎn kěnéng hái yào liú yì dào jǐ tiān, děng wǒmen kàn páishuǐ de qíngkuàng.",
    spoken: "胸管可能还要留一到几天，等我们看排水的情况。",
    english: "The chest drain may need to remain for one or several days while we monitor the drainage.",
    note: "Length of drainage varies by indication, response and local practice.",
    responses: []
  },
  {
    id: "talc-pleurodesis-12", category: "procedure", procedure: "talc-pleurodesis", stage: "Pain", risk: "consent",
    pinyin: "Huáshífěn huì ràng lǐmiàn fāyán, suǒyǐ xiōngtòng hé bù shūfu hěn chángjiàn.",
    spoken: "滑石粉会让里面发炎，所以胸痛和不舒服很常见。",
    english: "Talc causes inflammation, so chest pain and discomfort are common.",
    note: "Do not promise that it will be painless; explain ongoing analgesia and how to ask for more relief.",
    responses: [
      { pinyin: "Rúguǒ hěn tòng zěnme bàn?", spoken: "如果很痛怎么办？", english: "What if it is very painful?" }
    ]
  },
  {
    id: "talc-pleurodesis-13", category: "procedure", procedure: "talc-pleurodesis", stage: "Common effects", risk: "consent",
    pinyin: "Zuò wán hòu, kěnéng huì fāshāo huò xiàng gǎnmào yíyàng bù shūfu yì dào sān tiān.",
    spoken: "做完后，可能会发烧或像感冒一样不舒服一到三天。",
    english: "You may have a fever or flu-like symptoms for one to three days afterwards.",
    responses: []
  },
  {
    id: "talc-pleurodesis-14", category: "procedure", procedure: "talc-pleurodesis", stage: "Infection risk", risk: "consent",
    pinyin: "Yǒu shǎobùfen rén huì xiōngguǎn zhōuwéi huò xiōngqiāng gǎnrǎn, kěnéng xūyào kàngshēngsù.",
    spoken: "有少部分人会胸管周围或胸腔感染，可能需要抗生素。",
    english: "A small number of people develop infection around the drain or in the pleural space and may need antibiotics.",
    note: "Official NHS patient information commonly quotes approximately one to two infections per 100 procedures; use local figures.",
    responses: []
  },
  {
    id: "talc-pleurodesis-15", category: "procedure", procedure: "talc-pleurodesis", stage: "Breathing risk", risk: "consent",
    pinyin: "Yǒuxiē rén huì yīnwèi fèi fāyán, duǎnshíjiān biàn de bǐjiào chuǎn.",
    spoken: "有些人会因为肺发炎，短时间变得比较喘。",
    english: "Some people become temporarily more breathless because of lung inflammation.",
    responses: []
  },
  {
    id: "talc-pleurodesis-16", category: "procedure", procedure: "talc-pleurodesis", stage: "Rare serious risk", risk: "consent",
    pinyin: "Fēicháng shǎo de qíngkuàng xià, fèi huì yánzhòng fāyán. Měi yìqiān ge rén lǐ shǎoyú yí ge, dàn kěnéng wēixiǎn shēngmìng.",
    spoken: "非常少的情况下，肺会严重发炎。每一千个人里少于一个，但可能危险生命。",
    english: "Very rarely, severe lung inflammation occurs—fewer than one in 1,000 people—but it can be life-threatening.",
    note: "Use locally approved wording for severe respiratory complications and mortality.",
    responses: []
  },
  {
    id: "talc-pleurodesis-17", category: "procedure", procedure: "talc-pleurodesis", stage: "Chance of failure", risk: "consent",
    pinyin: "Zhège zhìliáo kěnéng shībài, jīshuǐ huò kōngqì háishi kěnéng zài huílái.",
    spoken: "这个治疗可能失败，积水或空气还是可能再回来。",
    english: "The treatment can fail, and the fluid or air may still return.",
    responses: []
  },
  {
    id: "talc-pleurodesis-18", category: "procedure", procedure: "talc-pleurodesis", stage: "Alternatives", risk: "consent",
    pinyin: "Qítā fāngfǎ kěnéng bāokuò chángqī xiōngguǎn, xūyào shí zài chōu shuǐ, huò zuò qítā shǒuxù hé shǒushù.",
    spoken: "其他方法可能包括长期胸管、需要时再抽水，或做其他手续和手术。",
    english: "Other options may include an indwelling pleural catheter, repeat drainage, another procedure or surgery.",
    note: "Tailor alternatives to the indication. For malignant pleural effusion, discuss IPC versus pleurodesis and non-expandable lung where relevant.",
    responses: [
      { pinyin: "Chángqī xiōngguǎn shì shénme?", spoken: "长期胸管是什么？", english: "What is an indwelling pleural catheter?" }
    ]
  },
  {
    id: "talc-pleurodesis-19", category: "procedure", procedure: "talc-pleurodesis", stage: "If not done", risk: "consent",
    pinyin: "Rúguǒ bù zuò, jīshuǐ huò kōngqì kěnéng zài huílái, nǐ kěnéng yòu chuǎn, yòu xūyào páishuǐ huò fàng guǎn.",
    spoken: "如果不做，积水或空气可能再回来，你可能又喘，又需要排水或放管。",
    english: "Without it, the fluid or air may return, causing breathlessness and another drainage procedure.",
    note: "Explain the individual consequence of declining without coercive wording.",
    responses: []
  },
  {
    id: "talc-pleurodesis-20", category: "procedure", procedure: "talc-pleurodesis", stage: "Questions", risk: "consent",
    pinyin: "Guānyú zhège zhìliáo, nǐ yǒu shénme wèntí?",
    spoken: "关于这个治疗，你有什么问题？",
    english: "What questions do you have about this treatment?",
    responses: []
  },
  {
    id: "talc-pleurodesis-21", category: "procedure", procedure: "talc-pleurodesis", stage: "Check understanding", risk: "consent",
    pinyin: "Qǐng nǐ yòng zìjǐ de huà shuō yí biàn, zhège zhìliáo shì yòng lái zuò shénme de?",
    spoken: "请你用自己的话说一遍，这个治疗是用来做什么的？",
    english: "In your own words, can you tell me what this treatment is intended to do?",
    note: "Frame teach-back as a check of your explanation, not a test of the patient.",
    responses: [
      { pinyin: "Jiǎnshǎo jīshuǐ huò kōngqì zài huílái.", spoken: "减少积水或空气再回来。", english: "To reduce the chance of fluid or air returning." }
    ]
  },
  {
    id: "talc-pleurodesis-22", category: "procedure", procedure: "talc-pleurodesis", stage: "Ask permission", risk: "red",
    pinyin: "Nǐ míngbai zhège zhìliáo de hǎochu, fēngxiǎn hé qítā xuǎnzé ma? Nǐ tóngyì wǒmen jìxù ma?",
    spoken: "你明白这个治疗的好处、风险和其他选择吗？你同意我们继续吗？",
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
  { id: "antibiotic", english: "Antibiotic", pinyin: "kàngshēngsù", spoken: "抗生素", category: "medicines", keywords: "infection treatment" },
  { id: "asthma", english: "Asthma", pinyin: "qìchuǎn", spoken: "气喘", category: "conditions", keywords: "wheeze", note: "Used for asthma in these phrases; chuǎn on its own means breathless." },
  { id: "benefit", english: "Benefit", pinyin: "hǎochu", spoken: "好处", category: "communication", keywords: "advantage consent" },
  { id: "biopsy", english: "Biopsy / take tissue", pinyin: "huójiǎn", spoken: "活检", category: "tests", keywords: "take tissue tissue sample", note: "Formal term; the phrase library explains this in plain language as taking a small tissue sample." },
  { id: "bleeding", english: "Bleeding", pinyin: "chūxuè", spoken: "出血", category: "safety", keywords: "blood haemorrhage" },
  { id: "blood", english: "Blood", pinyin: "xuè", spoken: "血", category: "body", keywords: "haemoptysis bleeding" },
  { id: "blood-pressure", english: "Blood pressure", pinyin: "xuèyā", spoken: "血压", category: "body", keywords: "monitor observations" },
  { id: "blood-streaks", english: "Blood streaks", pinyin: "xuèsī", spoken: "血丝", category: "symptoms", keywords: "phlegm sputum haemoptysis" },
  { id: "blood-thinner", english: "Blood-thinning medicine", pinyin: "xīxuè de yào", spoken: "稀血的药", category: "medicines", keywords: "anticoagulant antiplatelet bleeding", note: "Common Singapore patient wording; the formal term is kàng níngxuè yào." },
  { id: "blood-transfusion", english: "Blood transfusion", pinyin: "shūxuè", spoken: "输血", category: "procedures", keywords: "bleeding haemorrhage" },
  { id: "blood-vessel", english: "Blood vessel", pinyin: "xuèguǎn", spoken: "血管", category: "body", keywords: "vessel" },
  { id: "blockage", english: "Blockage / blocked", pinyin: "dǔzhù", spoken: "堵住", category: "safety", keywords: "tube chest drain" },
  { id: "breathless", english: "Breathless / breathlessness", pinyin: "chuǎn", spoken: "喘", category: "symptoms", keywords: "short of breath dyspnoea" },
  { id: "breathe", english: "Breathe / breathing", pinyin: "hūxī", spoken: "呼吸", category: "body", keywords: "respiration" },
  { id: "breathe-in", english: "Breathe in", pinyin: "xī jìnqù", spoken: "吸进去", category: "medicines", keywords: "inhale inhaler" },
  { id: "breathe-out", english: "Breathe out", pinyin: "hūqì", spoken: "呼气", category: "medicines", keywords: "exhale inhaler" },
  { id: "bronchoscope", english: "Bronchoscope / small camera", pinyin: "xiǎo jìngzi", spoken: "小镜子", category: "procedures", keywords: "scope flexible camera" },
  { id: "bronchoscopy", english: "Bronchoscopy", pinyin: "qìguǎnjìng jiǎnchá", spoken: "气管镜检查", category: "procedures", keywords: "scope camera airway test" },
  { id: "cancer", english: "Cancer", pinyin: "áizhèng", spoken: "癌症", category: "conditions", keywords: "malignant malignancy tumour tumor" },
  { id: "cause", english: "Cause / reason", pinyin: "yuányīn", spoken: "原因", category: "communication", keywords: "diagnosis" },
  { id: "chest", english: "Chest", pinyin: "xiōngkǒu", spoken: "胸口", category: "body", keywords: "thorax" },
  { id: "chest-drain", english: "Chest drain / chest tube", pinyin: "xiōngguǎn", spoken: "胸管", category: "procedures", keywords: "intercostal drain tube" },
  { id: "chest-pain", english: "Chest pain", pinyin: "xiōngtòng", spoken: "胸痛", category: "symptoms", keywords: "pain" },
  { id: "chest-xray", english: "Chest X-ray", pinyin: "xiōngbù X-guāng", spoken: "胸部X光", category: "tests", keywords: "radiograph imaging" },
  { id: "clamp-chest-drain", english: "Temporarily close / clamp the chest drain", pinyin: "bǎ xiōngguǎn zànshí guān qǐlái", spoken: "把胸管暂时关起来", category: "procedures", keywords: "dwell intrapleural medicine" },
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
  { id: "dnase", english: "DNase", pinyin: "DNase", spoken: "DNA酶", category: "medicines", keywords: "dornase alfa intrapleural enzyme fibrinolysis", note: "Used with tPA to make infected pleural fluid less viscous." },
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
  { id: "fibrinolysis", english: "Intrapleural fibrinolysis", pinyin: "xiōngqiāng nèi róngshuān zhìliáo", spoken: "胸腔内溶栓治疗", category: "procedures", keywords: "tPA DNase pleural infection enzymes" },
  { id: "fluid-around-lung", english: "Fluid around the lung / pleural effusion", pinyin: "fèi wàimiàn yǒu jīshuǐ", spoken: "肺外面有积水", category: "conditions", keywords: "pleural fluid water", note: "Plain-language wording used in the chest-drain pathway." },
  { id: "follow-up-ct", english: "Follow-up / repeat CT scan", pinyin: "fùchá CT", spoken: "复查CT", category: "tests", keywords: "surveillance monitoring interval rescan" },
  { id: "general-anaesthetic", english: "General anaesthetic", pinyin: "quánshēn mázuì", spoken: "全身麻醉", category: "medicines", keywords: "asleep anaesthesia" },
  { id: "heart", english: "Heart", pinyin: "xīnzàng", spoken: "心脏", category: "body", keywords: "cardiac" },
  { id: "heart-rate", english: "Heart rate", pinyin: "xīntiào", spoken: "心跳", category: "body", keywords: "pulse monitor" },
  { id: "hold-breath", english: "Hold your breath", pinyin: "bǐngzhù hūxī", spoken: "屏住呼吸", category: "medicines", keywords: "inhaler technique" },
  { id: "hospital", english: "Hospital admission / stay in hospital", pinyin: "zhùyuàn", spoken: "住院", category: "exposure", keywords: "admitted inpatient" },
  { id: "infection", english: "Infection", pinyin: "gǎnrǎn", spoken: "感染", category: "safety", keywords: "procedure risk" },
  { id: "infected-pleural-fluid", english: "Infected fluid around the lung", pinyin: "fèi wàimiàn yǒu bèi gǎnrǎn de jīshuǐ", spoken: "肺外面有被感染的积水", category: "conditions", keywords: "pleural infection empyema pus" },
  { id: "inhaler", english: "Inhaler", pinyin: "xīrùqì", spoken: "吸入器", category: "medicines", keywords: "puffer asthma COPD" },
  { id: "inflammation", english: "Inflammation / become inflamed", pinyin: "fāyán", spoken: "发炎", category: "conditions", keywords: "talc reaction" },
  { id: "indwelling-pleural-catheter", english: "Indwelling pleural catheter / IPC", pinyin: "chángqī xiōngqiāng dǎoguǎn", spoken: "长期胸腔导管", category: "procedures", keywords: "IPC long term chest drain malignant effusion" },
  { id: "injury", english: "Injure / injury", pinyin: "shāng dào", spoken: "伤到", category: "safety", keywords: "damage organ vessel" },
  { id: "interpreter", english: "Interpreter", pinyin: "fānyìyuán", spoken: "翻译员", category: "communication", keywords: "translator language" },
  { id: "local-anaesthetic", english: "Local anaesthetic", pinyin: "júbù mázuì", spoken: "局部麻醉", category: "medicines", keywords: "numb numbing" },
  { id: "lung", english: "Lung", pinyin: "fèi", spoken: "肺", category: "body", keywords: "pulmonary" },
  { id: "lung-expand", english: "Lung expands", pinyin: "fèi zhāng kāi", spoken: "肺张开", category: "body", keywords: "re-expand chest drain" },
  { id: "lung-function", english: "Lung function test", pinyin: "fèigōngnéng jiǎnchá", spoken: "肺功能检查", category: "tests", keywords: "PFT spirometry blow" },
  { id: "lung-nodule", english: "Lung nodule / small spot in the lung", pinyin: "fèi jiéjié", spoken: "肺结节", category: "conditions", keywords: "pulmonary nodule shadow lump spot" },
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
  { id: "painkiller", english: "Painkiller / pain relief", pinyin: "zhǐtòngyào", spoken: "止痛药", category: "medicines", keywords: "analgesia morphine paracetamol" },
  { id: "penicillin", english: "Penicillin", pinyin: "pánníxīlín", spoken: "盘尼西林", category: "medicines", keywords: "antibiotic allergy" },
  { id: "pet-ct", english: "PET-CT scan", pinyin: "PET-CT", spoken: "PET-CT", category: "tests", keywords: "nodule metabolic imaging scan" },
  { id: "phlegm", english: "Phlegm / sputum", pinyin: "tán", spoken: "痰", category: "symptoms", keywords: "mucus" },
  { id: "pleural-infection", english: "Pleural infection", pinyin: "xiōngqiāng gǎnrǎn", spoken: "胸腔感染", category: "conditions", keywords: "empyema infected fluid" },
  { id: "pleural-space", english: "Pleural space", pinyin: "xiōngqiāng", spoken: "胸腔", category: "body", keywords: "space around lung chest cavity" },
  { id: "pleurodesis", english: "Pleurodesis", pinyin: "xiōngmó gùdìng", spoken: "胸膜固定", category: "procedures", keywords: "talc stick lung chest wall" },
  { id: "pressure", english: "Pressure", pinyin: "yālì", spoken: "压力", category: "symptoms", keywords: "chest drain insertion" },
  { id: "previous-scan", english: "Previous / old scan", pinyin: "yǐqián de piànzi", spoken: "以前的片子", category: "tests", keywords: "prior imaging comparison CT x-ray" },
  { id: "procedure", english: "Procedure", pinyin: "shǒuxù", spoken: "手续", category: "procedures", keywords: "consent chest drain" },
  { id: "pus", english: "Pus / infected thick fluid", pinyin: "nóngyè", spoken: "脓液", category: "conditions", keywords: "empyema pleural infection" },
  { id: "question", english: "Question / problem", pinyin: "wèntí", spoken: "问题", category: "communication", keywords: "ask" },
  { id: "rash", english: "Red rash / red spots", pinyin: "hóngdiǎn", spoken: "红点", category: "symptoms", keywords: "contrast allergy skin" },
  { id: "reliever-inhaler", english: "Reliever inhaler", pinyin: "jíjiù xīrùqì", spoken: "急救吸入器", category: "medicines", keywords: "rescue inhaler puffer" },
  { id: "result", english: "Result", pinyin: "jiéguǒ", spoken: "结果", category: "tests", keywords: "answer report" },
  { id: "rinse-mouth", english: "Rinse your mouth", pinyin: "shùkǒu", spoken: "漱口", category: "medicines", keywords: "inhaler aftercare" },
  { id: "risk", english: "Risk", pinyin: "fēngxiǎn", spoken: "风险", category: "communication", keywords: "consent complication" },
  { id: "saline-irrigation", english: "Saline irrigation", pinyin: "yòng yánshuǐ chōngxǐ", spoken: "用盐水冲洗", category: "procedures", keywords: "pleural infection alternative wash" },
  { id: "scan", english: "Scan / imaging", pinyin: "sǎomiáo", spoken: "扫描", category: "tests", keywords: "CT image" },
  { id: "scar", english: "Scar / scarring", pinyin: "bāhén", spoken: "疤痕", category: "conditions", keywords: "old infection inflammation nodule fibrosis" },
  { id: "sedation", english: "Sedation / medicine to relax", pinyin: "fàngsōng de yào", spoken: "放松的药", category: "medicines", keywords: "drowsy sleepy", note: "Plain spoken wording used in the bronchoscopy pathway." },
  { id: "sepsis", english: "Sepsis / severe infection throughout the body", pinyin: "yánzhòng de quánshēn gǎnrǎn", spoken: "严重的全身感染", category: "safety", keywords: "life threatening infection" },
  { id: "shaking-chills", english: "Shaking chills", pinyin: "fādǒu", spoken: "发抖", category: "symptoms", keywords: "rigors infection cold" },
  { id: "side-effects", english: "Side effects", pinyin: "fùzuòyòng", spoken: "副作用", category: "safety", keywords: "medicine adverse effects" },
  { id: "smoke", english: "Smoke / smoking", pinyin: "chōuyān", spoken: "抽烟", category: "exposure", keywords: "cigarette tobacco" },
  { id: "sore-throat", english: "Sore throat", pinyin: "hóulóng tòng", spoken: "喉咙痛", category: "symptoms", keywords: "bronchoscopy aftercare" },
  { id: "specialist-team", english: "Specialist team", pinyin: "zhuānkē tuánduì", spoken: "专科团队", category: "communication", keywords: "multidisciplinary MDT review" },
  { id: "sputum-test", english: "Sputum test", pinyin: "jiǎnchá tán", spoken: "检查痰", category: "tests", keywords: "phlegm sample" },
  { id: "stable", english: "Stable", pinyin: "wěndìng", spoken: "稳定", category: "communication", keywords: "condition" },
  { id: "stitch", english: "Stitch / suture", pinyin: "xiàn", spoken: "线", category: "procedures", keywords: "secure chest drain", note: "The phrase uses the everyday word for thread." },
  { id: "stop-medicine", english: "Stop medicine", pinyin: "tíng yào", spoken: "停药", category: "medicines", keywords: "discontinue medication" },
  { id: "surgery", english: "Surgery / operation", pinyin: "dòng shǒushù", spoken: "动手术", category: "procedures", keywords: "VATS operation" },
  { id: "talc", english: "Sterile medical talc", pinyin: "wújūn de yīyòng huáshífěn", spoken: "无菌的医用滑石粉", category: "medicines", keywords: "pleurodesis powder slurry" },
  { id: "teach-back", english: "Explain back in your own words", pinyin: "yòng zìjǐ de huà shuō yí biàn", spoken: "用自己的话说一遍", category: "communication", keywords: "teach back understanding" },
  { id: "test", english: "Test / examination", pinyin: "jiǎnchá", spoken: "检查", category: "tests", keywords: "investigation procedure" },
  { id: "throat", english: "Throat", pinyin: "hóulóng", spoken: "喉咙", category: "body", keywords: "bronchoscopy" },
  { id: "tissue", english: "Tissue", pinyin: "zǔzhī", spoken: "组织", category: "body", keywords: "biopsy sample" },
  { id: "tissue-sample", english: "Small tissue sample", pinyin: "yìdiǎn zǔzhī", spoken: "一点组织", category: "tests", keywords: "biopsy specimen" },
  { id: "tpa", english: "tPA / alteplase", pinyin: "tPA", spoken: "tPA", category: "medicines", keywords: "clot busting fibrinolytic intrapleural" },
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
