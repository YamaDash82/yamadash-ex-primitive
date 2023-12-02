import { RegularExpressoins } from "./custom-regular-expressions";

export class ExDate extends Date {

	getYYYYMMDD(splitter: string = '/'): string {
		let month =  (this.getMonth() < 9 ? '0' : '') + (this.getMonth() + 1).toString();
		let day = (this.getDate() < 10 ? '0'  : '') + this.getDate().toString();

		return `${this.getFullYear()}${splitter}${month}${splitter}${day}`;
	}

	getYYMMDD(splitter: string = '/'): string {
		let month =  (this.getMonth() < 9 ? '0' : '') + (this.getMonth() + 1).toString();
		let day = (this.getDate() < 10 ? '0'  : '') + this.getDate().toString();

		return `${this.getFullYear().toString().substring(2,4)}${splitter}${month}${splitter}${day}`;
	}

	getMMDD(splitter: string = '/'): string {
		let month =  (this.getMonth() < 9 ? '0' : '') + (this.getMonth() + 1).toString();
		let day = (this.getDate() < 10 ? '0'  : '') + this.getDate().toString();
		
		return `${month}${splitter}${day}`;
	}

	getYYYYMMDD_HHMMSS(splitter: string = '/'): string {
		const month =  (this.getMonth() < 9 ? '0' : '') + (this.getMonth() + 1).toString();
		const day = (this.getDate() < 10 ? '0'  : '') + this.getDate().toString();
		const hours = ('00' + this.getHours().toString()).slice(-2);
		const minutes = ('00' + this.getMinutes().toString()).slice(-2);
		const seconds = ('00' + this.getSeconds().toString()).slice(-2);
		
		return `${this.getFullYear()}${splitter}${month}${splitter}${day} ${hours}:${minutes}:${seconds}`;
	}

	getTimeStampFormat(splitter: string = '/'): string {
		//以下　月(MM), 日(dd), 分(mm), 秒(ss)について、前ゼロが付与されるようにする。
		//月に関して、getMonth()の値、1月は0，2月は1...なので、取得した値に1を加える。
		const month = ('00' + (this.getMonth() + 1).toString()).slice(-2);
		const day = ('00' + this.getDate().toString()).slice(-2);
		const hours = ('00' + this.getHours().toString()).slice(-2);
		const minutes = ('00' + this.getMinutes().toString()).slice(-2);
		const seconds = ('00' + this.getSeconds().toString()).slice(-2);
		//const milliSeconds = ('000' + this.getMilliseconds().toString()).slice(-3);
		//console.log(`生成時刻${this.getFullYear()}${splitter}${month}${splitter}${day} ${hours}:${minutes}:${seconds}.${milliSeconds}`);
		//IOSではミリ秒が認識されない？
		//new Date('yyyy/mm/dd hh:mm:ss.sss')がINVALID DATEになる。
		return `${this.getFullYear()}${splitter}${month}${splitter}${day} ${hours}:${minutes}:${seconds}`;
	}

	clone(): ExDate {
		//return new ExDate(this.getYYYYMMDD());
		return new ExDate(this);
	}

	static fromDbDateTimeValue(dateTimeValue: string) : ExDate {
		const isoPattern = /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3})Z$/

		if (!isoPattern.test(dateTimeValue)) {
			throw Error('渡された文字列から日時を生成できません。');
		}
        
		const result = dateTimeValue.match(isoPattern);
		
		if(!result || !(result.length === 2)){
				throw Error('渡された文字列から日時を生成できません。');
		}
    
		return new ExDate(result[1]);
	}

	static fromHHMMString(hhmmString: string): ExDate {
		if(!RegularExpressoins.HOUR_MIUTE.test(hhmmString)) {
			throw Error('渡された文字列から時刻を生成できません。');
		}
		
		const hour = hhmmString.substring(0, 2);
		const minute = hhmmString.substring(3, 5);

		//返却用Dateオブジェクトを生成する。
		const time = new ExDate();
		//1970/01/01 00:00:00.000にする。
		//Timezoneの差異を解消するため、TimezoneOffsetが有ればその分解消する。offsetは-540の想定である。
		const offset = time.getTimezoneOffset();
		time.setTime(0 + (offset * 60 * 1000)); 
		
		time.setUTCHours(Number(hour), Number(minute));

		return time;
	}

	getHHMM(): string {
		const hours = ('00' + this.getUTCHours().toString()).slice(-2);
		const minutes = ('00' + this.getUTCMinutes().toString()).slice(-2);

		return `${hours}:${minutes}`;
	}
}
