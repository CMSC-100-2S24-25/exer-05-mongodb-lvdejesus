import { saveStudent, update, removeUser, removeAllUser, user, members } from "./controller.js";

export const router = (app) => {
  app.post('/save-student', saveStudent);
  app.post('/update', update);
  app.post('/remove-user', removeUser);
  app.post('/remove-all-user', removeAllUser);
  app.get('/user', user);
  app.get('/members', members);
}
