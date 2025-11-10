/*
カレンダーをリセットし作成するコマンドです。何回も呼び出します
start.jsで呼び出すので先に読み込みます
*/

function tableCreate(){
  /*console.log(memoArray);*/
  let table_element = document.getElementById("table-placeholder");
  table_element.innerHTML = ''; //リセットします
  //主にヘッダーを作ります。tbodyタグは後ほど中身を入れるため今のうちに作ります
  let headDays = `<table id="calendar">
  <thead>
  <tr class="day">
  <th scope="col" class="Sun">Sun</th>
  <th scope="col" class="Mon">Mon</th>
  <th scope="col" class="Tue">Tue</th>
  <th scope="col" class="Wed">Wed</th>
  <th scope="col" class="Thu">Thu</th>
  <th scope="col" class="Fri">Fri</th>
  <th scope="col" class="Sat">Sat</th>
  </tr>
  </thead>
  <tbody></tbody>
  </table>`;
  table_element.insertAdjacentHTML('beforeend', headDays);

  //tbodyタグの位置を指定します
  const tbody = table_element.querySelector('#calendar tbody');

  //先月分のマスを空白で入れます
  let tr = document.createElement('tr');
  if (memoArray['firstDay'] != 0){ //日曜日でない
    for (let i=0; i<memoArray['firstDay']; i++) {
      const td = document.createElement('td');
      td.className = 'past';
      td.innerHTML = '&nbsp;';
      tr.appendChild(td);
    }
  }

  let currentDay = memoArray['firstDay'];
  for (let j=0; j<memoArray['length']; j++){
    let dateHeader = document.createElement('h2'); //日付を見出しとして入れます
    let date = ('0' + (j+1)).slice(-2);
    dateHeader.textContent = date;
    let memo = document.createElement('p'); //取得したメモを入れます
    memo.textContent = memoArray['memos'][date];
    const td = document.createElement('td');
    let button = document.createElement('button'); //ボタンを作ります。押されたタイミングでedit(01)のようにedit関数を叩きます
    button.id = date;
    button.addEventListener('click', ()=>{
      edit(date)
      });
    button.textContent = '編集';
    td.className = dayArray[currentDay];
    td.appendChild(dateHeader);
    td.appendChild(memo);
    td.appendChild(button);
    tr.appendChild(td);
    /*console.log(currentDay);*/
    if (currentDay == 6){ //土曜日ならtrを更新します
      tbody.appendChild(tr);
      tr = document.createElement('tr');
    }
    currentDay = (currentDay + 1) % 7; //曜日を進めます。土曜日なら日曜日(0)に戻します
  }

  if (tr.children.length > 0){ //次月分を空白として入れます
    const lastDay = memoArray['lastDay'];
    if (lastDay !== 6){ //土曜日でないなら
      for (let k = lastDay + 1; k <= 6; k++){
        const td = document.createElement('td');
        td.className = 'future';
        td.innerHTML = '&nbsp;';
        tr.appendChild(td);
      }
    }
    tbody.appendChild(tr);
  }

  let current = document.getElementById("current"); //タイトル部分です
  current.textContent = memoArray['year'] + '年' + memoArray['month'] + '月';
  console.log('table_create実行');
}