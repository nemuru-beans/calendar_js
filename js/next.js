/*前月ボタン、次月ボタンのコマンド
月フォームのvalueを取得、前月・次月に書き換えてカレンダー自体も更新します*/

function next(){
  let current = new Date(month_submit.value);
  current.setMonth(current.getMonth() + 1); //1ヶ月後を取得
  console.log(current);
  let current_year = current.getFullYear();
  let current_month = String(current.getMonth() + 1).padStart(2, '0'); //getMonthは0~11なので整形
  console.log(current_month);
  month_submit.value = current_year + '-' + current_month;
  console.log(month_submit.value);
  refresh(); //month_submitのchangeの判定に引っかからないため自動では更新されません
}

function prev(){
  let current = new Date(month_submit.value);
  current.setMonth(current.getMonth() - 1); //1ヶ月前を取得
  console.log(current);
  let current_year = current.getFullYear();
  let current_month = String(current.getMonth() + 1).padStart(2, '0');
  console.log(current_month);
  month_submit.value = current_year + '-' + current_month;
  console.log(month_submit.value);
  refresh();
}