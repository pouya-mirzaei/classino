import courses from '../data/courses';
import teachers from '../data/teachers';
import topStudents from '../data/top-students';
import users from '../data/users';

const getAllTeachers = () => {
  return teachers;
};

const getAllTopStudents = () => {
  return topStudents;
};

const getAllUsers = () => {
  return users;
};

const setDataLocalStorage = (key, data) => localStorage.setItem(key, JSON.stringify(data));

const getItemFromLocalStorage = (key) => localStorage.getItem(key);

const isUserLoggedIn = () => (!getItemFromLocalStorage('userId') ? true : false);

const logout = () => localStorage.removeItem('userId');

const getCourseData = (courseId) => {
  return courses.find((course) => course.id === courseId);
};

export {
  getAllTeachers,
  getAllTopStudents,
  getAllUsers,
  setDataLocalStorage,
  getItemFromLocalStorage,
  isUserLoggedIn,
  logout,
  getCourseData,
};
