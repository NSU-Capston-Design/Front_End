// 만료 시간 체크하면서 데이터 읽기
export function getItemWithTime(keyName){

    // 로컬스토리지 값 읽기 (문자열)
    const objString = window.localStorage.getItem(keyName);

    // null 체크
    if(!objString){
        return null;
    }

    // 문자열을 객체로 변환
    const obj = JSON.parse(objString);

    // 현재 시간과 로컬스토리지의 Time 시간 비교
    if(Date.now() > obj.expire){
        // 만료 시간이 지난 item 삭제
        window.localStorage.removeItem(keyName);

        alert('세션 시간이 만료 되었습니다.')
        
        // null 리턴
        return null;
    }

    // 만료기간이 남아 있는 경우, value 값 리턴
    return obj.value;
}