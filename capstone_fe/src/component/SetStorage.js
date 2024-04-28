// 로컬스토리지 아이템의 만료 시간과 함께 데이터 저장
export function setItemWithTime(keyName, keyValue, tts){
        
    // 로컬스토리지에 저장할 객체
    const obj = {
        value : keyValue,
        expire : Date.now() + tts
    }

    // 객체를 JSON 문자열로 변환
    const objString = JSON.stringify(obj);

    // setItem
    window.localStorage.setItem(keyName, objString);
}