class Validator {
  /**
   * 
   * @param {string} 문자열 입력값 
   * @returns 
   */
  static hasText(value) {
    let pattern_kor = /^[가-힣]{2,}$/; // 한글체크
    if (value == undefined || value.length === 0 || !pattern_kor.test(value) ) {
      return false;
    }
    return true;
  }
  /**
   * 
   * @param  {number} 숫자 입력값 
   * @returns 
   */
  static isNumber(num) {
    if (num < 0 || num.length === 0 ) {
      return false;
    }
    return true;
  }

}
export { Validator };









// let pattern_num = /^[0-9]{4,}$/; 숫자 (4자리까지만 들어오게)
// let pattern_eng = /[a-zA-Z]/;	// 문자 
// let pattern_spc = /[~!@#$%^&*()_+|<>?:{}]/; // 특수문자
// let pattern_kor = /^[가-힣]{2,}$/;  //한글 (2글자 이상 들어오게)



