import VisaSvgIcon from "../assets/visa.svg"
import MasterSvgIcon from "../assets/master.svg"

export const generateUUID = () => {
    var d = new Date().getTime();
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        // eslint-disable-next-line no-mixed-operators
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

export const displayAmount = (value: number) => {
    return value.toFixed(2)
}

export const getCardIcon = (type: string) => {
    switch (type) {
        case 'visa':
            return VisaSvgIcon
        case 'master':
            return MasterSvgIcon
        default:
            return VisaSvgIcon
    }
}