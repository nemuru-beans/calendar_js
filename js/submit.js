//読み込まれた際に月フォームの動作を指定します。月フォームはユーザが編集した際にrefreshを叩きます

document.addEventListener('DOMContentLoaded', () =>{
  if (!month_submit) return;
  month_submit.addEventListener('change', refresh);
});