import { Student } from "./student.js";
// 여러 학생 목록 관리 객체
class StudentReposirtory {
  constructor() {
    this.students = [];
  }
  // 학생추가
  addStudent(student) {
    this.students.push(student);
  }
  // 학생 전체목록
  getStudents() {
 
    return this.students;
    
  }

  // 학번으로 학생 검색
  findBySsn(ssn) {
    return this.students.filter(student => student.ssn == ssn || false);
  }

  //이름으로 학생 검색
  findByName(name) {
    return this.students.filter(student => student.name === name || '');

  }

  //학번으로 학생 삭제
  removeBySsn(ssn) {
    let deletedCount = 0;
    for (let i = this.students.length - 1; i >= 0; i--) {
      if (this.students[i].ssn === ssn) {
        this.students.splice(i, 1);
        deletedCount++;
      }
    }
    return deletedCount;
  }

  // 이름으로 학생 삭제
  removeByName(name) {
    let deletedCount = 0;
    for (let i = this.students.length - 1; i >= 0; i--) {
      if (this.students[i].name === name) {
        this.students.splice(i, 1);
        deletedCount++;
      }
    }
    return deletedCount;
  }


  //평균 범위로 검색
  findByRange(start, end) {
    let list = [];
    this.students.forEach(student => {
      if (student.getAverage() >= start && student.getAverage() <= end) {
        list.push(student);
      }
    });
    return list;
  }


  // 정렬 하여 전체 검색  (콜백함수 이용해서 역할만 지정)
  findAllBySort(fn) {
    return this.students.sort(fn);
  }

  //정렬 메서드
  //1은 성적순, 2는 이름순 , 3은 학번순
  sortStudent() {
    let sortSelect = document.thirdForm.sort;
    let selectedValue = sortSelect.value;
    if (selectedValue === '1') {
      this.students = this.findAllBySort((val1, val2) => {
        return val2.getAverage() - val1.getAverage();
      });
      this.addTable(this.students);
    } else if (selectedValue === '2') {
      this.students = this.findAllBySort((str1, str2) => {
        if (str1.name > str2.name) return 1;
        else if (str1.name < str2.name) return -1;
        else return 0;
      });
      this.addTable(this.students);
    } else if (selectedValue === '3') {
      this.students = this.findAllBySort((ssn1, ssn2) => {
        return ssn1.ssn - ssn2.ssn;
      });
    } this.addTable(this.students);
  }



  // 학생 추가 메서드
  addTable() {
    const students = this.getStudents();
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';
    for (let i = 0; i < students.length; i++) {
      const student = students[i];
      let rank = 1;
      for (let j = 0; j < students.length; j++) {
        if ( students[j].getSum() > student.getSum()) {
          rank++;
        }
      }
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${student.ssn}</td>
        <td>${student.name}</td>
        <td>${student.korean}</td>
        <td>${student.english}</td>
        <td>${student.math}</td>
        <td>${student.getSum ? student.getSum() : ''}</td>
        <td>${student.getAverage ? student.getAverage() : ''}</td>
        <td>${rank}</td>`;
      tbody.appendChild(row);
    }
  }

  
  //이름,학번 검색
  findSsnName(event) {
    const searchInput = document.secondForm.inputSearch;
    const name = searchInput.value;
    const selectedValue = document.secondForm.choice.value;
    let searchResult = [];
    if (selectedValue === '2') { // 이름 선택 시
      searchResult = this.findByName(name);
    } else if (selectedValue === '1') { // 학번 선택 시
      searchResult = this.findBySsn(name);
    }
    const tBody = document.querySelector('tbody');
    tBody.innerHTML = '';
    if (searchResult.length === 0) {
      alert('일치하는 학생을 찾을 수 없습니다.');
      this.addTable();
    } else { 
      let students = this.getStudents();
      students.sort((a, b) => b.getSum() - a.getSum());
      searchResult.forEach((student, index) => {
        const insTr = tBody.insertRow();
        let rank = students.findIndex(s => s.ssn === student.ssn) + 1;
        const values = [student.ssn, student.name, student.korean, student.english, student.math, 
                        student.getSum(), student.getAverage(), rank];
        values.forEach(value => {
          const td = insTr.insertCell();
          td.textContent = value;
        });
      });
    }
  }

  //평균기준 정렬 ??? 
  showRank() {
    let searchResult = [];
    let students = this.getStudents();
    students.sort((a, b) => b.getAverage() - a.getAverage());
    searchResult.forEach((student, index) => {
      this.addTable();
    });
  }

  //학생 삭제 (이름,학번)
  removeStudent(event) {
    event.preventDefault();
    const searchInput = document.secondForm.inputSearch;
    const value = searchInput.value.trim();
    const selectedValue = document.secondForm.choice.value;
    let deletedCount = 0;
    if (selectedValue === '2') { // 이름 선택 시
      deletedCount = this.removeByName(value);
    } else if (selectedValue === '1') { // 학번 선택 시
      deletedCount = this.removeBySsn(value);
    }
    const tBody = document.querySelector('tbody');
    tBody.innerHTML = '';
    if (deletedCount === 0) {
      alert('일치하는 학생을 찾을 수 없습니다.');
      this.addTable();
    }
    else {
      const allList = this.getStudents();
      console.dir(allList);
      this.addTable();
      alert('학생 삭제 완료');
    }
  }
}





export { StudentReposirtory };
