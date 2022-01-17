//january month er basic config
const basicConfig = [
  {
    createdAt: '01/January/2022',
    homeworkGiven: true,
    vivaAsked: 5,
    testFullMark: 0,
    testSubject: 'None',
  },
  {
    createdAt: '03/January/2022',
    homeworkGiven: true,
    vivaAsked: 10,
    testFullMark: 0,
    testSubject: 'None',
  },
  {
    createdAt: '05/January/2022',
    homeworkGiven: true,
    vivaAsked: 0,
    testFullMark: 50,
    testSubject: 'Math',
  },
  {
    createdAt: '07/January/2022',
    homeworkGiven: true,
    vivaAsked: 5,
    testFullMark: 30,
    testSubject: 'Ict',
  },
];

const students = [
  {
    name: 'Bayzit',
    _id: '1',
    rank: 1,
    status: 'medium',
    performance: 0, //to be udpated later based on calculation
    createdAt: '01/January/2022',
  },
  {
    name: 'Mursalin',
    _id: '2',
    rank: 2,
    status: 'medium',
    performance: 0, //to be udpated later based on calculation
    createdAt: '01/January/2022',
  },
  {
    name: 'Taniya',
    _id: '3',
    rank: 3,
    status: 'medium',
    performance: 0, //to be udpated later based on calculation
    createdAt: '01/January/2022',
  },
  {
    name: 'Sharmin',
    _id: '4',
    rank: 4,
    status: 'medium',
    performance: 0, //to be udpated later based on calculation
    createdAt: '01/January/2022',
  },
];
const studentActivity = [
  //followings are the activity of 01/jan/2022
  {
    _id: '1',
    studentId: '1',
    attandance: true,
    homework: 75,
    vivaAnswered: 4,
    late: 0,
    testSubject: 'None',
    testScore: 0,
    createdAt: '01/January/2022',
  },
  {
    _id: '2',
    studentId: '2',
    attandance: false,
    homework: 0,
    vivaAnswered: 0,
    late: 0,
    testSubject: 'None',
    testScore: 0,
    createdAt: '01/January/2022',
  },
  {
    _id: '3',
    studentId: '3',
    attandance: true,
    homework: 70,
    vivaAnswered: 3,
    late: 0,
    testSubject: 'None',
    testScore: 0,
    createdAt: '01/January/2022',
  },
  {
    _id: '4',
    studentId: '4',
    attandance: true,
    homework: 80,
    vivaAnswered: 5,
    late: 0,
    testSubject: 'None',
    testScore: 0,
    createdAt: '01/January/2022',
  },
  //following are the data for 03/January/2022
  {
    _id: '1',
    studentId: '1',
    attandance: true,
    homework: 75,
    vivaAnswered: 4,
    late: 0,
    testSubject: 'None',
    testScore: 0,
    createdAt: '01/January/2022',
  },
  {
    _id: '2',
    studentId: '2',
    attandance: true,
    homework: 90,
    vivaAnswered: 8,
    late: 10,
    testSubject: 'None',
    testScore: 0,
    createdAt: '01/January/2022',
  },
  {
    _id: '3',
    studentId: '3',
    attandance: true,
    homework: 70,
    vivaAnswered: 3,
    late: 0,
    testSubject: 'None',
    testScore: 0,
    createdAt: '01/January/2022',
  },
  {
    _id: '4',
    studentId: '4',
    attandance: true,
    homework: 80,
    vivaAnswered: 5,
    late: 0,
    testSubject: 'None',
    testScore: 0,
    createdAt: '01/January/2022',
  },
  //following are the data for 05/january/2022
  {
    _id: '1',
    studentId: '1',
    attandance: true,
    homework: 95,
    vivaAnswered: 0,
    late: 10,
    testSubject: 'Math',
    testScore: 40,
    createdAt: '01/January/2022',
  },
  {
    _id: '2',
    studentId: '2',
    attandance: true,
    homework: 90,
    vivaAnswered: 0,
    late: 10,
    testSubject: 'Math',
    testScore: 24,
    createdAt: '01/January/2022',
  },
  {
    _id: '3',
    studentId: '3',
    attandance: true,
    homework: 70,
    vivaAnswered: 0,
    late: 10,
    testSubject: 'Math',
    testScore: 32,
    createdAt: '01/January/2022',
  },
  {
    _id: '4',
    studentId: '4',
    attandance: true,
    homework: 80,
    vivaAnswered: 0,
    late: 15,
    testSubject: 'Math',
    testScore: 40,
    createdAt: '01/January/2022',
  },

  //following are the data for 07/january/2022
  {
    _id: '1',
    studentId: '1',
    attandance: true,
    homework: 45,
    vivaAnswered: 3,
    late: 10,
    testSubject: 'Ict',
    testScore: 15,
    createdAt: '01/January/2022',
  },
  {
    _id: '2',
    studentId: '2',
    attandance: true,
    homework: 90,
    vivaAnswered: 04,
    late: 12,
    testSubject: 'Ict',
    testScore: 24,
    createdAt: '01/January/2022',
  },
  {
    _id: '3',
    studentId: '3',
    attandance: true,
    homework: 70,
    vivaAnswered: 04,
    late: 10,
    testSubject: 'Ict',
    testScore: 18,
    createdAt: '01/January/2022',
  },
  {
    _id: '4',
    studentId: '4',
    attandance: true,
    homework: 80,
    vivaAnswered: 04,
    late: 10,
    testSubject: 'Ict',
    testScore: 25,
    createdAt: '01/January/2022',
  },
];
const percentageCalculator = (percentage, full, achieved) =>
  (percentage * achieved) / full;

const iso = (date) => new Date(date).toISOString();
//now it's time to do the calculation .
for (let i = 0; i < basicConfig.length; i++) {
  for (let j = 0; j < studentActivity.length; j++) {
    //first a check korte hobe je date ta match kore kina .
    if (iso(basicConfig[i].createdAt) == iso(studentActivity[j].createdAt)) {
    } else {
      //i can either break safely if i sort the data in time of finding them .
      //else i can continue as there is limited number of documents so it will not be a time consuming issue .
    }
  }
}

/**@todo above solution is growing big so the optimum one is :
 * 1.when i will set basic config from frontend  i will create an studentActivity documentation . that will hold the fields .
 * 2.and when i will add each students activity i will just update them .
 * so the students activity structure will look like following
 *
 */
const structure = {
  _id: '1',
  studentId: '1',
  attandance: true,
  late: 5,
  homeworkGiven: true,
  homework: 80,
  vivaAsked: 5,
  vivaAnswered: 4,
  testFullMark: 0,
  testSubject: 'None',
  testScore: 0,
};

//ekta certain date er upor depend kore khoja sohoj hobe and calculation er khetre each date a students der judge kora tau easy hobe . //each date a amra traverse korbo and

//ekan theke each and every document ke traverse korte thakbo and sathe sathe student table takeu update korte thakbo . and finally jokhon result show korbo tokhon student talble take amra sort korbo average er upore and then rank korbo thats it.
