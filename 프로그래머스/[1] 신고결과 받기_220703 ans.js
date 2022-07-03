/**
 * * 2022. 07. 03
 * * 간단하게 푸는 방법 연습.
 *
 */

function solution(id_list, report, k) {
  const reportedAndReporter = {};
  let answer = new Array(id_list.length).fill(0);

  id_list.forEach(id => {
    reportedAndReporter[id] = [];
  });

  report.forEach(reportList => {
    const [reporter, reported] = reportList.split(' ');
    if (!reportedAndReporter[reported].includes(reporter))
      reportedAndReporter[reported].push(reporter);
  });

  for (let reported of Object.keys(reportedAndReporter)) {
    if (reportedAndReporter[reported].length >= k) {
      reportedAndReporter[reported].forEach(reporter => {
        answer[id_list.indexOf(reporter)]++;
      });
    }
  }
  return answer;
}

const id_list = ['muzi', 'frodo', 'apeach', 'neo'];
const report = ['muzi frodo', 'apeach frodo', 'frodo neo', 'muzi neo', 'apeach muzi'];
const k = 2;

// const id_list = ['con', 'ryan'];
// const report = ['ryan con', 'ryan con', 'ryan con', 'ryan con'];
// const k = 3;

console.log(solution(id_list, report, k));
