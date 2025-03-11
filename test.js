import needle from "needle"

const students = [
  {
    stdnum: "202511235",
    fname: "Saara",
    lname: "Hazuki",
    age: 18,
  },
  {
    stdnum: "202235011",
    fname: "Mikuru",
    lname: "Hoshitani",
    age: 21,
  },
  {
    stdnum: "202201341",
    fname: "Momoko",
    lname: "Hashimoto",
    age: 21,
  },
  {
    stdnum: "202671239",
    fname: "Suu",
    lname: "Suzuki",
    age: 17,
  },
  {
    stdnum: "202310049",
    fname: "Himeri",
    lname: "Momiyama",
    age: 20,
  },
]

const printResult = (err, result) => {
  if (err != null)
    console.error(err);

  console.log(result.body);
};


// Test /save-student
for (let i = 0; i < students.length; i++) {
  needle.post('http://localhost:3000/save-student', students[i], printResult);
}

// Test /save-student if stdnum is the same
needle.post('http://localhost:3000/save-student', students[0], printResult);

// Test /update
needle.post('http://localhost:3000/update', { fname: "Suu", newFname: "Su" }, printResult);

// Test /remove-user
needle.post('http://localhost:3000/remove-user', { stdnum: "202671239" }, printResult);

// Test /user
needle.get(`http://localhost:3000/user?stdnum=202511235`, printResult);

// Test /members
needle.get('http://localhost:3000/members', printResult);

// Test /remove-all-user
needle.post('http://localhost:3000/remove-all-user', {}, printResult);
