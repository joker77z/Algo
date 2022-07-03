/**
 * * 2022. 07. 03
 * * 예전에 풀었던 풀이로 다시 시도
 */

function solution(id_list, report, k) {
  let reportList = {};
  let reportedCountList = new Array(id_list.length).fill(0);
  let receiveMail = new Array(id_list.length).fill(0);

  id_list.forEach((id, index) => {
    reportList[id] = index;
  });

  const reportMatrix = Array.from({ length: id_list.length }, () =>
    new Array(id_list.length).fill(0)
  );

  report.forEach(reportRecord => {
    const [reporter, reported] = reportRecord.split(' ');
    reportMatrix[reportList[reporter]][reportList[reported]] += 1;
  });

  for (let row = 0; row < id_list.length; row++) {
    for (let col = 0; col < id_list.length; col++) {
      if (reportMatrix[col][row] > 0) {
        reportedCountList[row]++;
      }
    }
  }

  const stop_user_index = reportedCountList.map(reportedCount => {
    if (reportedCount >= k) return 1;
    else return 0;
  });

  for (let col = 0; col < id_list.length; col++) {
    for (let row = 0; row < id_list.length; row++) {
      if (stop_user_index[row] === 0) continue;
      if (reportMatrix[col][row] === 1) receiveMail[col]++;
    }
  }

  return receiveMail;
}

// const id_list = ['muzi', 'frodo', 'apeach', 'neo'];
// const report = ['muzi frodo', 'apeach frodo', 'frodo neo', 'muzi neo', 'apeach muzi'];
// const k = 2;

const id_list = ['con', 'ryan'];
const report = ['ryan con', 'ryan con', 'ryan con', 'ryan con'];
const k = 3;

console.log(solution(id_list, report, k));
