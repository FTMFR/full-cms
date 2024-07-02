const categoryModel = require("../../models/category");
const courseModel = require("../../models/course");
const userModel = require("../../models/user");
const infosModel = require("../../models/infos");
const sessionModel = require("../../models/session");
const courseUserModel = require("../../models/course-user");

exports.getIndex = async (req, res) => {
  const allInfos = await infosModel.find();
  const coursesCount = await courseModel.find().lean().count();
  const usersCount = await userModel.find().lean().count();
  const sessions = await sessionModel.find().lean();

  const totalTime = sessions.reduce(
    (prev, current) => prev + Number(current.time.slice(0, 2)),
    0
  );

  res.json({
    // phone: allInfos[0].phone,
    // email: allInfos[0].email,
    coursesCount,
    usersCount,
    totalTime,
  });
};

exports.getPAdmin = async (req, res) => {
  const coursesRegistersCount = await courseUserModel.find().lean().count();
  const coursesCount = await courseModel.find().lean().count();

  const admin = await userModel.findOne({ _id: req.user._id });
  console.log(admin);
  res.json({ coursesRegistersCount, coursesCount, adminName: admin.name });
};
