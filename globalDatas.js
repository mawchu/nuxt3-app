export const menuList = [
    { title: 'Top', icon: ['fas', 'house'] },
    { title: 'Pain points', icon: ['fas', 'person-circle-question'] },
    { title: 'Features',  icon: ['fas', 'thumbs-up']  },
    { title: 'Start up', icon: ['fas', 'rocket'] }
];

export const categoryDefaultList = reactive([
    { title: '食物', value: 'food', icon: ['fas', 'burger'] },
    { title: '飲料', value: 'beverage', icon: ['fas', 'mug-hot']},
    { title: '服飾', value: 'clothes', icon: ['fas', 'shirt'] },
    { title: '交通', value: 'traffic', icon: ['fas', 'van-shuttle'] },
    { title: '旅行', value: 'trip', icon: ['fas', 'map-location-dot'] },
    { title: '醫療', value: 'hospital', icon: ['fas', 'heart-pulse'] },
    { title: '保險', value: 'insurance', icon: ['fas', 'helmet-safety'] },
    { title: '住宿', value: 'stay', icon: ['fas', 'house-user'] },
    { title: '育兒', value: 'mothering', icon: ['fas', 'baby-carriage'] },
    { title: '日用品', value: 'neccessary', icon: ['fas', 'basket-shopping'] },
    { title: '娛樂', value: 'entertainment', icon: ['fas', 'parachute-box'] },
    
]);

export const selfDefinedCategory = reactive([
    { value: 'baby', icon: ['fas', 'baby-carriage'] },
    { value: 'music', icon: ['fas', 'music'] },
    { value: 'plane', icon: ['fas', 'plane'] },
    { value: 'gift', icon: ['fas', 'gift'] },
    { value: 'ice-cream', icon: ['fas', 'ice-cream'] },
    { value: 'plant', icon: ['fas', 'seedling'] }
])

const regexAgainstXSS = /^(?!.*[<>])[\u4E00-\u9FFF0-9a-zA-Z ()—-]{2,}$/;
const regexAgainstXSSAndAllowEmpty = /^(?!.*[<>])[\u4E00-\u9FFF0-9a-zA-Z ()—-]{0}|^(?!.*[<>])[\u4E00-\u9FFF0-9a-zA-Z ()—-]{2,}$/;
export const regexMap = {
    date: { regex: /^(19[5-9]\d|20\d{2})\/(0[1-9]|1[0-2])\/(0[1-9]|[1-2]\d|3[01])$/, name: '日期' },
    memo: { regex: regexAgainstXSSAndAllowEmpty, name: '備註' },
    amount: { regex: /^[0-9]+$/, name: '金額' },
    category: { regex: regexAgainstXSS, name: '分類' },
    selfDefinedCategory:  { regex: regexAgainstXSSAndAllowEmpty, name: '自定義分類' },
    item: { regex: regexAgainstXSSAndAllowEmpty, name: '項目' },
    shop: { regex: regexAgainstXSSAndAllowEmpty, name: '商店' }
};

export const regexMapBanking = {
    bank: { regex: regexAgainstXSS, name: '銀行' },
    name: { regex: regexAgainstXSS, name: '命名' },
    balance:  { regex: /^[0-9]+$/, name: '結餘' },
    purpose:  { regex: regexAgainstXSS, name: '用途' },
    color:  { regex: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, name: '色彩' },
};

export const regexTester = (regex, value) => regex.test(value);

export function validInput (dataList, type, regexMap) { 
    const { regex } = regexMap[type];
    // console.log('isValid', regexTester(regex, dataList[type]), 'type', type)
    if(!regexTester(regex, dataList[type])) return `${regexMap[type].name}格式有誤，或字數太少`;
    if(regexTester(regex, dataList[type])) return ``;
}

export const purposeDefaultList = reactive([
    { title: '儲蓄', value: 'savings' },
    { title: '薪資轉帳', value: 'salary' },
    { title: '投資', value: 'investment' },
    { title: '繳納出帳', value: 'payment' },
]);