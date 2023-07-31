import { categoryDefaultList, regexMap, regexTester, validInput } from '~/globalDatas';

export function getIconForCategory (category) {
    // console.log('category', category)
    if (category) {
        const [{ icon }] = categoryDefaultList.filter(({ value }) => value === category);
        return icon;
    } else {
        return ['fas', 'basket-shopping']
    }
}

export function monthToName (number, length) {
    const monthMap = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'
    ];
    return monthMap[number].substring(0, length) ;
}

export function toCommas (value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}