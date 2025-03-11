import mongoose from "mongoose";

const Student = mongoose.model("Student", {
  stdnum: String,
  fname: String,
  lname: String,
  age: Number,
}, 'studentData');

export const saveStudent = async (req, res) => {
  const { stdnum, fname, lname, age } = req.body;
  if (stdnum == null || fname == null || lname == null || age == null) {
    console.log("saveStudent: failed due to incomplete parameters");
    res.send({ inserted: false });
    return;
  }

  if (await Student.findOne({ stdnum }) != null) {
    // student with stdnum already exists
    console.log("saveStudent: failed due to student with the same student number");
    res.send({ inserted: false });
    return;
  }

  const student = new Student({ stdnum, fname, lname, age });
  student.save().then(() => {
    console.log("saveStudent: success");
    res.send({ inserted: true });
  }).catch(() => {
    console.log("saveStudent: unknown error");
    res.send({ inserted: false });
  })
}

export const update = async (req, res) => {
  const { fname, lname } = req.body;

  Student.updateOne({ fname }, { $set: { lname } }).then((r) => {
    console.log(`update: modified ${r.modifiedCount}`);
    res.send({ updated: r.modifiedCount > 0 });
  }).catch(() => {
    console.log("update: unknown error");
    res.send({ updated: false });
  })
}

export const removeUser = async (req, res) => {
  const { stdnum } = req.body;

  Student.deleteOne({ stdnum }).then((r) => {
    console.log(`removeUser: deleted ${r.deletedCount}`);
    res.send({ deleted: r.deletedCount > 0 });
  }).catch((e) => {
    console.log("removeUser: unknown error");
    res.send({ deleted: false });
  })
}

export const removeAllUser = (_req, res) => {
  Student.deleteMany().then((r) => {
    console.log(`removeAllUser: deleted ${r.deletedCount}`);
    res.send({ deleted: true });
  }).catch(() => {
    console.log("removeAllUser: unknown error");
    res.send({ deleted: false });
  })
}

export const user = async (req, res) => {
  const { stdnum } = req.query;
  const result = await Student.find({ stdnum });
  res.send(result);
}

export const members = async (_req, res) => {
  res.send(await Student.find());
}
