import { Student } from "./student.js";
import { StudentReposirtory } from "./student-repository.js";
import { EventHandler } from "./event-handler.js";

let studentRepository = new StudentReposirtory();
  // 테스트를 위한 더미데이터 입력








let eventHandler = new EventHandler();
eventHandler.eventRegist();

export{studentRepository};