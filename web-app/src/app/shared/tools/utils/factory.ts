import * as moment from 'moment';

export const randomNumber = (precision: number = 100) =>
    Math.ceil(Math.random() * precision);
export const randomDate = () => moment().subtract(randomNumber(100), 'd');
export const randomBoolean = () => Math.random() > 0.5;

export function getNmCurrentLabel(cuurentLang: string){
    return 'libelle'+cuurentLang.charAt(0).toUpperCase() + cuurentLang.slice(1)
}
