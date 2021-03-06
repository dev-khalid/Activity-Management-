import React, { useState } from 'react';

const ActivitySummary = ({ activityData }) => {
  let avgLate = 0,
    totalLate = 0,
    avgHomeworkDone = 0,
    avgVivaPerformance = 0,
    avgTestScore = 0,
    testTaken = 0,
    testFullMark = 0,
    avgAttandance = 0,
    testAttanded = 0;

  //ei sompurno jinish ta amar useEffect er moddhe kora ucit chilo na ? then finally

  let tt = 0,
    tfm = 0,
    ts = 0,
    hmc = 0,
    hmd = 0,
    at = 0,
    vAsked = 0,
    vAnswered = 0,
    tl = 0,
    ta = 0;
  //no problem it will work in a blocking behaviour .
  for (let i = 0; i < activityData.length; i++) {
    if (activityData[i].testFullMark > 0) {
      tt++;
      tfm += activityData[i].testFullMark;
      ts += activityData[i].testScore;
      if (activityData[i].attandance) {
        ta++;
      }
    }
    if (activityData[i].homeworkGiven) {
      hmc++;
      hmd += activityData[i].homework;
    }
    if (activityData[i].attandance) {
      at++;
      if (activityData[i].late > 0) {
        tl += activityData[i].late;
      }
    }
    if (activityData[i].vivaAsked > 0) {
      vAsked += activityData[i].vivaAsked;
      vAnswered += activityData[i].vivaAnswered;
    }
  }
  console.log(vAsked, vAnswered);
  if (at > 0) {
    avgAttandance = Math.ceil(at / activityData.length);
    avgLate = Math.ceil(tl / at);
  }
  if (ta) {
    avgTestScore = Math.ceil((100 * ts) / tfm);
  }
  if (hmc) {
    avgHomeworkDone = Math.ceil(hmd / hmc);
  }
  if (vAsked) {
    avgVivaPerformance = Math.ceil((vAnswered * 100) / vAsked);
  }
  return (
    <div>
      <span>Average Late time:</span>{' '}
      <strong className="text-danger">{avgLate} mins</strong> <br />
      <span>Total wasted time:</span>{' '}
      <strong className="text-danger">{tl} mins</strong> <br />
      <span>Attandance Ratio: </span>
      <strong className="text-info">{avgAttandance * 100}%</strong>
      <br />
      <span>Home Work Done : </span>
      <strong className="text-info"> {avgHomeworkDone}% </strong>
      <br />
      <span>Viva Performance: </span>
      <strong className="text-info">{avgVivaPerformance}%</strong> <br />
      <span>Test Score: </span>
      <strong className="text-primary">{avgTestScore}%</strong> <br />
      <span>Test Taken: </span>
      <strong className="text-primary">
        {' '}
        {ta}/{tt}
      </strong>{' '}
      <br />
    </div>
  );
};

export default ActivitySummary;
/**@DEBUGGING_DONE */
