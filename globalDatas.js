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
    { title: '住宿', value: 'stay', icon: ['fas', 'house-user'] },
    { title: '日用品', value: 'neccessary', icon: ['fas', 'basket-shopping'] },
]);

const regexAgainstXSS = /^(?!.*[<>])[\u4E00-\u9FFF0-9a-zA-Z ()—-]{2,}$/;
export const regexMap = {
    date: { regex: /^(19[5-9]\d|20\d{2})\/(0[1-9]|1[0-2])\/(0[1-9]|[1-2]\d|3[01])$/, name: '日期' },
    memo: { regex: regexAgainstXSS, name: '備註' },
    amount: { regex: /^[0-9]+$/, name: '金額' },
    category: { regex: regexAgainstXSS, name: '分類' },
    item: { regex: regexAgainstXSS, name: '項目' },
};