/**
 * * 2022. 07. 02
 * * 함수형으로 시도한 풀이
 */

function solution(id_list, report, k) {
  /* ------------------ report_list 만들기 (신고한 사람, 신고받은 사람 명단) ------------------ */
  const getReportList = copy_report => {
    let report_list = {};
    report.forEach(copy_report => {
      const [reporter, reported] = copy_report.split(' ');

      if (report_list[reporter]) {
        if (!report_list[reporter].includes(reported)) {
          report_list[reporter] = [...report_list[reporter], reported];
        }
      } else {
        report_list[reporter] = [reported];
      }
    });
    return report_list;
  };

  /* --------------------- reported_list 만들기 (신고 받은 사람 명단) -------------------- */
  const getReportedList = copy_report => {
    let reported_list = [];
    const tmp = {};
    report.forEach(copy_report => {
      const [reporter, reported] = copy_report.split(' ');
      if (tmp[reporter] !== reported) {
        reported_list.push(reported);
      }
      tmp[reporter] = reported;
    });
    return reported_list;
  };

  /* -------------------------------------------------------------------------- */
  /*                       report_list, reported_list 만들기                      */
  /* -------------------------------------------------------------------------- */
  const getReportAndReportedList = report => {
    const copy_report = report.slice();
    let report_list = {};
    let reported_list = [];

    report_list = getReportList(copy_report);
    console.log(report_list);
    reported_list = getReportedList(copy_report);

    return {
      report_list,
      reported_list,
    };
  };

  /**
   * 신고한 사람과 신고받은 사람 객체로 정리
   * report_list = {
   *  신고한 사람1 : [신고받은 사람1, 신고받은 사람2],
   *  신고한 사람2 : [신고받은 사람1, 신고받은 사람2],
   * }
   */

  /**
   * 신고 받은 리스트
   * reported_list = [신고받은 사람1, 신고받은 사람2]
   */

  const { report_list, reported_list } = getReportAndReportedList(report);

  /* -------------------------------------------------------------------------- */
  /*                           신고 받은 사람 리스트 중 k이상 골라내기                   */
  /* -------------------------------------------------------------------------- */
  const getStopUserList = reported_list => {
    const copy_reported_list = [...reported_list];
    let stop_user_list = [];
    const map_report = new Map();
    for (const reported of Object.values(copy_reported_list)) {
      map_report.set(reported, map_report.get(reported) + 1 || 1);
    }
    for (const [reported, value] of map_report) {
      if (value >= k) {
        stop_user_list.push(reported);
      }
    }
    return stop_user_list;
  };

  /**
   * k번 이상 신고 받은 사람들
   * stop_user_list = [신고받은 사람1, 신고받은 사람2]
   */
  const stop_user_list = getStopUserList(reported_list);

  /* -------------------------------------------------------------------------- */
  /*        report_list 객체를 순회하면서 reported에 stop_user_list가 있으면 result만들기       */
  /* -------------------------------------------------------------------------- */
  const getEmailCount = (stop_user_list, report_list) => {
    const copy_stop_user_list = [...stop_user_list];
    const copy_report_list = { ...report_list };
    let emailCount = Array.from({ length: id_list.length }, () => 0);
    let idx = 0;
    for (const reported of Object.values(copy_report_list)) {
      const count = reported.reduce((acc, reported) => {
        if (copy_stop_user_list.includes(reported)) {
          acc += 1;
        }
        return acc;
      }, 0);
      emailCount[idx] = count;
      idx++;
    }
    return emailCount;
  };

  return getEmailCount(stop_user_list, report_list);
}

const id_list = ['muzi', 'frodo', 'apeach', 'neo'];
const report = ['muzi frodo', 'apeach frodo', 'frodo neo', 'muzi neo', 'apeach muzi'];
const k = 2;

// const id_list = ['con', 'ryan'];
// const report = ['ryan con', 'ryan con', 'ryan con', 'ryan con'];
// const k = 3;

console.log(solution(id_list, report, k));
