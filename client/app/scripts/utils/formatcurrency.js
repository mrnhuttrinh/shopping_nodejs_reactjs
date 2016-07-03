import numeral from 'numeral';
export default function (input) {
    return numeral(input).format('0,0');
}