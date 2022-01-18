import Student from '../models/studentModel.js';
import StudentActivity from '../models/studentActivityModel.js';
import BasicConfig from '../models/basicConfigModel.js';
import asyncHandler from 'express-async-handler';
const Month = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const averageCalculator = (prev, current) => {
  if (prev) {
    returen(prev + current) / 2;
  } else {
    return current;
  }
};

const statusCalculator = (num) => {
  let status = '';
  if (num >= process.env.Status_Best) {
    status = 'Best';
  } else if (num >= process.env.Status_Good) {
    status = 'Good';
  } else if (num >= process.env.Status_Medium) {
    status = 'Medium';
  } else if (num >= process.env.Status_Bad) {
    status = 'Bad';
  } else if (num >= process.env.Status_Very_Bad) {
    status = 'Very Bad';
  }
  return status;
};
//percentage calculator

const percentageCalculator = (percentage, full, achieved) =>
  (10 * achieved) / full;

function getNumberOfDaysInMonth(date = new Date()) {
  return new Date(date.getFullYear(), date.getMonth(), 0).getDate();
}

export const createStudent = asyncHandler(async (req, res) => {
  const month = req.body.month;
  const data = await Student.create({
    name: req.body.name,
    monthly: [{ month: month }],
  });
  res.json(data);
});

export const getAllStudents = asyncHandler(async (req, res) => {
  const month = new Date(req.params.month).toISOString(); //frontend theke JANUARY/2022 asbe
  console.log(month);
  const data = await Student.find({
    'monthly.month': month,
  });
  res.json(data);
});
export const updateStudent = asyncHandler(async (req, res) => {
  const data = await Student.findByIdAndUpdate(
    req.body.id,
    { name: req.body.name },
    {
      new: true,
    }
  );
  res.json(data);
});

export const deleteStudent = asyncHandler(async (req, res) => {
  await Student.findByIdAndDelete(req.params.studentId);
  res.status(204);
});

//basic config er jinish gula amra proti bar find kore niye giye user er moddhe dhukabo .
export const basicConfig = asyncHandler(async (req, res) => {
  const date = new Date(req.body.date).toISOString();
  const { homeworkGiven, vivaAsked, testFullMark, testSubject } = req.body;
  const data = await BasicConfig.create({
    date,
    homeworkGiven,
    vivaAsked,
    testFullMark,
    testSubject,
  });
  res.status(201).json(data);
});

export const addStudentActivity = asyncHandler(async (req, res) => {
  const date = new Date(req.body.date).toISOString();
  const month = new Date(
    `${Month[new Date(date).getMonth()]}-${new Date(date).getFullYear()}`
  ).toISOString();
  const { homeworkGiven, vivaAsked, testFullMark, testSubject } =
    await BasicConfig.findOne({ date }).select(
      'homeworkGiven vivaAsked testFullMark testSubject'
    );
  const { studentId, attandance, homework, late, vivaAnswered, testScore } =
    req.body;
  const data = await StudentActivity.create({
    studentId,
    attandance,
    homework,
    late,
    vivaAnswered,
    testScore,
    homeworkGiven,
    vivaAsked,
    testFullMark,
    testSubject,
  });
  const studentData = await Student.findOne({
    _id: studentId,
    'monthly.month': month,
  });
  let calcTotalPercentage =
      process.env.Attandance +
      process.env.HomeworkPercentage +
      process.env.Viva,
    calcPercentage = 0,
    calcExamTotalPercentage = 0,
    calcExamPercentage;
  if (attandance) {
    //jodi attand hoy taholei kebol late time count kora jay
    calcPercentage += process.env.Attandance;
    if (late > 0) {
      const newLate = late > 15 ? 15 : late;
      calcPercentage -= percentageCalculator(
        process.env.Late,
        process.env.MaxLateCount,
        newLate
      );
    }
  }

  if (homeworkGiven) {
    calcPercentage += homework;
  } else {
    calcPercentage += process.env.HomeworkPercentage; //free mark
  }

  if (vivaAsked > 0) {
    calcPercentage += percentageCalculator(
      process.env.Viva,
      vivaAsked,
      vivaAnswered
    );
  } else {
    calcPercentage += process.env.Viva; //free mark
  }
  let examPercentage = 0;
  if (testFullMark > 0) {
    calcExamTotalPercentage += process.env.Exam;
    calcExamPercentage += percentageCalculator(
      calcExamTotalPercentage,
      testFullMark,
      testScore
    );
    examPercentage = averageCalculator(
      studentData.examPercentage,
      calcExamPercentage
    );
  }

  const regularPercentage = averageCalculator(
    studentData.regularPercentage,
    calcPercentage
  );

  let status = '';
  if (examPercentage) {
    status = statusCalculator(
      (regularPercentage + examPercentage) /
        (calcExamTotalPercentage + calcTotalPercentage)
    );
  } else {
    status = statusCalculator(regularPercentage / calcTotalPercentage);
  } 
  const updatedFile = await Student.findOneAndUpdate(
    {
      _id: studentId,
      'monthly.month': month,
    },
    {
      $set: {
        'monthly.$.month': month,
        'monthly.$.regularPercentage': regularPercentage,
        'monthly.$.status': status,
        'monthly.$.examPercentage': examPercentage,
      },
    }
  );

  res.json(updatedFile);
});

// export const test = asyncHandler(async (req, res) => {
//   const date = new Date().toDateString();
//   const month = new Date(
//     `${Month[new Date(date).getMonth()]}-${new Date(date).getFullYear()}`
//   ).toISOString();
//   const studentData = await Student.findOneAndUpdate(
//     {
//       _id: '61e657a60f4c01dcce066bd7',
//       'monthly.month': month,
//     },
//     {
//       $set:  {
//         "monthly.$.month": month,
//         "monthly.$.percentage": 25,
//         "monthly.$.totalPercentage": 30,
//       },
//     },
//     {
//       new: true,
//     }
//   );
//   res.json(studentData);
// });

//viva ask kora niye percentage er ekta isssue ache eita ami pore solve korbo insallah
