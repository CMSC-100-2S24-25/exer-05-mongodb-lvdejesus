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

const printResult = (name) => {
  return (err, result) => {
    if (err != null)
      console.error(`${name}: `, err);

    console.log(`${name}: `, result.body);
  };
}

// Test /save-student
for (let i = 0; i < students.length; i++) {
  needle.post('http://localhost:3000/save-student', students[i], printResult(`save-${i}`));
}

// Test /save-student if stdnum is the same
needle.post('http://localhost:3000/save-student', students[0], printResult(`save-same`));

// Test /save-student if the input is not complete
needle.post('http://localhost:3000/save-student', {
  stdnum: "202510039",
  fname: "Erisa",
  age: 18,
}, printResult(`save-incomplete`));

// Test /update
needle.post('http://localhost:3000/update', { fname: "Suu", newFname: "Su" }, printResult(`update`));

// Test /update if the student does not exist
needle.post('http://localhost:3000/update', { fname: "Riri", newFname: "Su" }, printResult(`update-not-exist`));

// Test /remove-user
needle.post('http://localhost:3000/remove-user', { stdnum: "202671239" }, printResult(`remove`));

// Test /remove-user if the student does not exist
needle.post('http://localhost:3000/remove-user', { stdnum: "202309283" }, printResult(`remove-not-exist`));

// Test /user
needle.get(`http://localhost:3000/user?stdnum=202511235`, printResult(`user`));

// Test /members
needle.get('http://localhost:3000/members', printResult(`members`));

// Test /remove-all-user
needle.post('http://localhost:3000/remove-all-user', {}, printResult(`remove-all-user`));
