import bcrypt from "bcryptjs";
const users = [
  {
    name: "admin",
    email: "admin@gmail.com",
    phone: "0123456789",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "thang",
    email: "thang@gmail.com",
    phone: "0121456789",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
