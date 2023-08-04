//학생객체 생성을 위한 틀(CLASS) 
class Student {

  constructor(ssn, name, korean, english, math) {
    //this = {};
    this.ssn = ssn;
    this.name = name;
    this.korean = korean;
    this.english = english;
    this.math = math;

    //return this;
  }
  // 정적 속성 및 메서드 추가
  static schoolName = 'EZEN 초등학교';

  getSum() {
   
      return parseInt(this.korean) + parseInt(this.english) + parseInt(this.math);
    
  }
  getAverage() {
    let sum =  this.getSum() / 3;
    return Math.floor(sum * 100) / 100;
  }

  toString () {
    return `${this.ssn}\t ${this.name} \t ${this.korean} \t ${this.english} \t ${this.math} \t ${this.getSum()} \t ${this.getAverage()}`;
  }
  
}
export {Student};