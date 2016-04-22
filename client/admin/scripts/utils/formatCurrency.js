export default function ReplaceNumberWithCommas(yourNumber) {
    //Seperates the components of the number
    var components = yourNumber.toString().split(".");
    //Comma-fies the first part
    components [0] = components [0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //Check if there were any decimal values, if not add them
    if(typeof components[1] === 'undefined'){ components[1] = "00"; }
    //Combines the two sections
    return components.join(".");
}