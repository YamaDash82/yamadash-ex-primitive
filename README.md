# 拡張プリミティブ

## 概要
再利用可能な拡張プリミティブ型

- Dateを拡張したExDate
    
    使用例
    ```typescript
    const dt = new ExDate();
    console.log(dt.getYYYYMMDD());      // '2022/05/25'
    console.log(dt.getYYYYMMDD('-'));   // '2022-05-25'
    ```

- Numberを拡張したExNumber

## ExDate
1. 継承元

    `Date`

1. メソッド
    1. `getYYYYMMDD(splitter: string = '/'): string`
    2. `getYYMMDD(splitter: string = '/'): string`
    3. `getMMDD(splitter: string = '/'): string`
    4. `getYYYYMMDD_HHMMSS(splitter: string = '/'): string`
    1. `getHHMM(): string`  
    5. `getTimeStampFormat(splitter: string = '/'): string`

        タイムスタンプ文字列を返す。
        ```typescript
        const dt = new ExDate();
        console.log(dt.getTimeStampFormat('-'));  // 2022-05-25 11:21:45
        ```
    7. `clone(): ExDate`

        クローンを返す。
    8. `static fromDbDateTimeValue(dateTimeValue: string) : ExDate`
        データベースから取得した日付文字列をもとにExDateを返す。
        ```typescript
        //rst['作成日']: '2022-05-25T11:25:45.259'
        const sakuseibi = ExDate.fromDbDateTimeValue(rst['作成日']);
        ```
    1. `static fromHHMMString(hhmmString: string): ExDate`  
        時刻文字列をもとにExDateを生成する。  
        年月日は`1970/01/01`である。  
        例  
        ```typescript
        const time = ExDate.fromHHMMString('17:15'); //1970-01-01 17:15:00.000を生成。

        console.log(time.getHHMM()); // '17:15'
        ```
    

## ExNumber
1. 継承元

    `Number`

1. メソッド
    1. `static isNumber(value: string): boolean`
        `value`に指定した文字列が数値として認識できるかを返す。
        ```typescript
        ExNumber.isNumber('10');    // true
        ExNumber.isNumber('10.5');  // true
        ExNumber.isNumber('-10.5'); // true
        ExNumber.isNumber('10.5a'); // false
        ```