//ページが読み込まれた際に動作します

//月フォームを今日の日付にセットします。Elementも取得するので以後month_submitを使いまわします
const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0'); //getMonthは整形しています
const formattedDate = `${year}-${month}`; //そのままテーブル名に使います
const month_submit = document.getElementById('setMonth');
month_submit.value = formattedDate
//PHPに月データを渡してtableCreateを実行します
memoArray = new Array();
document.addEventListener('DOMContentLoaded', () => {
  const fd = new FormData();
  fd.append('tableName', formattedDate);
    fetch('./php/monthly.php', {
      method: 'POST',
      body: fd
    })
      .then(response => response.json())
      .then(data => {
        memoArray = data;
        tableCreate();
      })
      .catch(error => console.error('エラーだよ', error));
});