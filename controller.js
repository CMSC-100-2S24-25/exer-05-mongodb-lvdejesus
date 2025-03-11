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
    res.send({ inserted: false });
    return;
  }

  if (await Student.findOne({ stdnum }) != null) {
    // student with stdnum already exists
    res.send({ inserted: false });
    return;
  }

  const student = new Student({ stdnum, fname, lname, age });
  student.save().then(() => {
    res.send({ inserted: true });
  }).catch(() => {
    res.send({ inserted: false });
  })
}

export const update = (req, res) => {
  const { fname, newFname } = req.body;
  Student.updateOne({ fname }, { $set: { fname: newFname } }).then(() => {
    res.send({ updated: true });
  }).catch(() => {
    res.send({ updated: false });
  })
}

export const removeUser = (req, res) => {
  const { stdnum } = req.body;
  Student.deleteOne({ stdnum }).then(() => {
    res.send({ updated: true });
  }).catch(() => {
    res.send({ updated: false });
  })
}

export const removeAllUser = (_req, res) => {
  Student.deleteMany().then((_result) => {
    res.send({ deleted: true });
  }).catch(() => {
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
