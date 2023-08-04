import { StudentReposirtory } from "./student-repository.js";
import { Validator } from "./validator.js";
import { studentRepository } from "./app.js";
import { Student } from "./student.js";

// 이벤트 처리를 객체화
class EventHandler {
  constructor() { }

  // 이벤트 소스에 이벤트 핸들러 등록
  eventRegist() {
    document.inputForm.reg.addEventListener('click', (event) => {
      this.addStudent(event);
    });

    document.secondForm.search.addEventListener('click', event => {
      this.searchSsnName(event);
    });
    document.secondForm.delete.addEventListener('click', event => {
      this.removeHandler(event);
    });

    document.thirdForm.sort.addEventListener('change', event => {
      studentRepository.sortStudent(event);
    });
    
    document.thirdForm.list.addEventListener('click', event =>{
      this.showList(event);
    });

    document.querySelector('#load_button').addEventListener('click', event =>{
      studentRepository.addTable();
    });

  }
  //학생 등록예제 유효성 검증 및 핸들러 
  addStudent(event) {
    const ssn = document.inputForm.ssn.value;
    const name = document.inputForm.name.value;
    const korea = document.inputForm.kor.value;
    const english = document.inputForm.eng.value;
    const math = document.inputForm.math.value;
    if (!Validator.isNumber(ssn)) {
      alert('학번 입력 해 주세요');
    } else if (!Validator.isNumber(korea) ||
      !Validator.isNumber(english) ||
      !Validator.isNumber(math) ||
      !Validator.hasText(name)) {
      alert('이름과 각 과목의 점수를 모두 입력해 주세요');
    } else {
      const student = new Student(ssn, name, korea, english, math);
      studentRepository.addStudent(student);
      alert('학생등록완료');
      const allList = studentRepository.getStudents();
      console.dir(allList);
      studentRepository.addTable();
    }
  }


  //이름,학번 검색 유효성검증 및 핸들러
  searchSsnName(event) {
    const searchInput = document.secondForm.inputSearch;
    const inputValue = searchInput.value;
    const selectedValue = document.secondForm.choice.value;
    let searchResult = [];
    if (selectedValue === '2') { // 이름 선택 시
      if (inputValue === '') {
        alert('이름을 입력해주세요');
      } else if (!Validator.hasText(inputValue)) {
        alert('한글 최소 2글자 이상 조회 가능합니다.');
        studentRepository.addTable();
      } else {
        studentRepository.findSsnName();
      }
    } else if (selectedValue === '1') { // 학번 선택 시
      if(inputValue === ''){
        alert('학번을 입력해주세요');
        studentRepository.addTable();
      }else if (!Validator.isNumber(inputValue)) {
        alert('학번은 정수 4자리까지 조회 가능합니다.');
      } else {
        studentRepository.findSsnName();
      }
    }
  }

// 이름, 학번 삭제 유효성검증 및 핸들러 
removeHandler(event){
  const searchInput = document.secondForm.inputSearch;
  const inputValue = searchInput.value.trim();
  const selectedValue = document.secondForm.choice.value;
  if(selectedValue === '2'){ //학번 선택 시 
    if(inputValue === ''){
      alert('이름을 입력해주세요');
    }else if(!Validator.hasText(inputValue)){
      alert('한글 최소 2글자 이상 조회 가능합니다.');
    }else{
      studentRepository.removeStudent(event);
    }
  }else if (selectedValue === '1') { // 학번 선택 시
    if(inputValue === ''){
      alert('학번을 입력해주세요');
    }else if (!Validator.isNumber(inputValue)) {
      alert('학번은 정수 4자리까지 조회 가능합니다.');
    } else {
      studentRepository.removeStudent(event);
    }
  }
}


//전체목록 보여주기
showList(event){
  // studentRepository.loadStudent();
  studentRepository.addTable();
}





}
export { EventHandler };