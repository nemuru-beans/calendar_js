/*カレンダー内部のボタンの動作です。各ボタンにはIDとして日付が入っています(01など)。押された際に日付を引数に実行されます。
日付ごとのメモを取得し、編集がなされればPHPに送信・カレンダー更新を行います
*/
function edit(date){
  let memoValue
  if (memoArray['memos'][date] == null){
    memoValue = ''; //nullが表示されないようにしています
  } else {
    memoValue = memoArray['memos'][date];
  }
  let result = prompt(date + ": メモを編集", memoValue);
  if (result != null){ //キャンセルされた場合は何もしません
    const fd = new FormData();
    fd.append('tableName',month_submit.value);
    fd.append('date', date);
    fd.append('memo', result);
    //編集用のPHPに渡します
    fetch('./php/edit.php', {
      method: 'POST',
      body: fd
    })
      .then(response => response.text()) //返り値を待ってから次に進みます
      .then(data => alert(data))
      .then(refresh())
  }
}
