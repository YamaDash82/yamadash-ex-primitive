export namespace RegularExpressoins {
	//負の値、小数点を含む数値。
	export const NUMBER = /^[-]?(\d)+(\.\d+)?$/;
	//時間(HH:MM)
	export const HOUR_MIUTE = /([01][0-9]|2[0-3]):[0-5][0-9]/;
}