import { RegularExpressoins } from './custom-regular-expressions';

export class ExNumber extends Number {
	static isNumber(value: string): boolean {
		return RegularExpressoins.NUMBER.test(value);
	}
}