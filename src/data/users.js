const users = [
  {
    id: 0,
    name: 'پویا میرزایی',
    username: 'pouya',
    phoneNumber: '09123456789',
    password: 'pouya006',
    role: 'admin',
    courses: [{ courseId: 2 }, { courseId: 3 }, { courseId: 7 }],
  },
  {
    id: 1,
    name: 'علی موسوی',
    username: 'ali56',
    phoneNumber: '09198765432',
    password: '987456321',
    role: 'user',
    courses: [{ courseId: 2 }, { courseId: 3 }],
  },
];
export default users;

// roles :
//    user
//    admin
