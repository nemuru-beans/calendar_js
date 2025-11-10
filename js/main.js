//更新処理です。テーブルを確認、取得しtableCreateを叩きます//

function refresh(){
const fd = new FormData();
fd.append('tableName', month_submit.value);
fetch('./php/monthly.php', {
  method: 'POST',
  body: fd
})
  .then(response => response.json())
  .then(data => {
    memoArray = data; //配列です。コマンド内で使います
    tableCreate();
  })
  .catch(error => console.error('エラーだよ', error));
console.log('refresh実行');
}