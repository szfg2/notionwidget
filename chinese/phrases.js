window.HUXI_CATEGORIES = [
  { id: "opening", name: "Opening the consultation", shortName: "Opening", symbol: "✦", description: "Introduce yourself and make communication easier." },
  { id: "breathlessness", name: "Breathlessness", shortName: "Breathlessness", symbol: "≈", description: "Onset, severity, exercise and positional symptoms." },
  { id: "cough", name: "Cough & sputum", shortName: "Cough & sputum", symbol: "⌁", description: "Duration, phlegm, blood and upper-airway symptoms." },
  { id: "asthma", name: "Asthma / COPD", shortName: "Asthma / COPD", symbol: "◌", description: "Control, inhalers, triggers and recent admissions." },
  { id: "exposure", name: "Smoking & exposure", shortName: "Smoking", symbol: "↟", description: "Smoking, vaping, work and household exposure." },
  { id: "infection", name: "Infection & TB", shortName: "Infection & TB", symbol: "+", description: "Fever, weight loss, contacts and travel." },
  { id: "medicine", name: "Medicines & inhalers", shortName: "Medicines", symbol: "◫", description: "Adherence, allergies and simple technique coaching." },
  { id: "investigation", name: "Investigations", shortName: "Investigations", symbol: "⌕", description: "X-ray, CT, lung function and sputum tests." },
  { id: "closing", name: "Explain & close", shortName: "Closing", symbol: "✓", description: "Teach-back, safety-netting and follow-up." }
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
