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
    return (prev + current) / 2;
  } else {
    return current;
  }
};

const statusCalculator = (inp) => {
  let num = inp * 100;
  let status = '';

  if (num >= 85) {
    status = 'Best';
  } else if (num >= 80) {
    status = 'Good';
  } else if (num >= 65) {
    status = 'Medium';
  } else if (num >= 40) {
    status = 'Bad';
  } else {
    status = 'Very Bad';
  }
  return status;
};

const percentageCalculator = (percentage, full, achieved) => {
  return (percentage * achieved) / full;
};
const monthsStartingAtMiliseconds = (date = new Date()) => {
  return new Date(date.getFullYear(), date.getMonth(), 1).getTime();
};
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

  const data = await Student.find({
    'monthly.month': month,
  });
  res.json(data);
});
export const getOneStudentData = asyncHandler(async (req, res) => {
  const studentId = req.params.studentId;
  const date = req.params.month;
  const month = new Date(
    `${Month[new Date(date).getMonth()]}-${new Date(date).getFullYear()}`
  ).toISOString();
  const studentData = await Student.findOne({
    _id: studentId,
    'monthly.month': month,
  });
  res.json(studentData);
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
  console.log('what about this date', date);
  const month = new Date(
    `${Month[new Date(date).getMonth()]}-${new Date(date).getFullYear()}`
  ).toISOString();

  const { homeworkGiven, vivaAsked, testFullMark, testSubject } =
    await BasicConfig.findOne({ date });
    
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
      1 * process.env.Attandance +
      1 * process.env.HomeworkPercentage +
      1 * process.env.Viva,
    calcPercentage = 0,
    calcExamTotalPercentage = 0,
    calcExamPercentage = 0;
  if (attandance) {
    calcPercentage += 1 * process.env.Attandance;
    let x = 0;

    if (late > 0) {
      const newLate = late > 15 ? 15 : late;
      x = percentageCalculator(
        1 * process.env.Late,
        1 * process.env.MaxLateCount,
        newLate
      );
    }
    calcPercentage -= x;
  }

  if (homeworkGiven) {
    calcPercentage += percentageCalculator(
      1 * process.env.HomeworkPercentage,
      100,
      homework
    );
  } else {
    calcPercentage += 1 * process.env.HomeworkPercentage; //free mark
  }

  if (vivaAsked > 0) {
    calcPercentage += percentageCalculator(
      1 * process.env.Viva,
      vivaAsked,
      vivaAnswered
    );
  } else {
    calcPercentage += 1 * process.env.Viva; //free mark
  }
  let examPercentage = 0;
  if (testFullMark > 0) {
    calcExamTotalPercentage += 1 * process.env.Exam;
    calcExamPercentage += percentageCalculator(
      calcExamTotalPercentage,
      testFullMark,
      testScore
    );
    examPercentage = averageCalculator(
      studentData.monthly[0].examPercentage,
      calcExamPercentage
    );
  }

  const regularPercentage = averageCalculator(
    studentData.monthly[0].regularPercentage,
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
        'monthly.$.quality': status,
        'monthly.$.examPercentage': examPercentage,
      },
    },
    {
      new: true,
    }
  );

  res.json(updatedFile);
});

//student er status ta check kora lagbe
export const qualityFinder = asyncHandler(async (req, res) => {
  const { studentId, month } = req.params;
  const studentData = await Student.findOne({
    _id: studentId,
    'monthly.month': month,
  }).select('monthly.quality');
  res.json({
    quality: studentData.monthly[0].quality,
  });
});
//payment status check kora lagbe

//student er current month er data check kora lagbe. seitake niye client side a amra hisab korleu problem nai .

export const getStudentActivity = asyncHandler(async (req, res) => {
  const { studentId, month } = req.params;
  const activityData = await StudentActivity.find({
    studentId,
    //pura ek masher full data sob e lagbe
    $and: [
      { createdAt: { $gte: monthsStartingAtMiliseconds(new Date(month)) } },
      {
        createdAt: {
          $lte:
            monthsStartingAtMiliseconds(new Date(month)) +
            86400000 * getNumberOfDaysInMonth(new Date(month)),
        },
      },
    ],
  });

  res.json({
    activityData,
  });
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

export const getBasicConfig = asyncHandler(async (req, res) => {
  const date = new Date(req.params.date).toISOString();
  const data = await BasicConfig.findOne({ date });
  res.json(data);
});
