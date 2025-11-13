<?php

//URL直打ちで遷移できないようにします
$allowed_hosts = array('localhost', '127.0.0.1');
$referrer = parse_url($_SERVER['HTTP_REFERER'] ?? '', PHP_URL_HOST);

if (!in_array($referrer, $allowed_hosts)) {
    header('HTTP/1.1 403 Forbidden');
    die('Direct access is not allowed.');
}

//指定された日付のメモを編集します
$post = $_POST['tableName']; //2025-11のような形式です
$divMonth = explode('-', $post);
$tableName = 'memo'.$divMonth[0].$divMonth[1]; //memo202511のような形式です
$date = $_POST['date'];
$memo = $_POST['memo'];
$dbUser = getenv('cal_user');
$dbPass = getenv('cal_pass');
$pdo = new PDO('mysql:host=localhost;dbname=calendar;charset=utf8',$dbUser,$dbPass);
$sql = "UPDATE `{$tableName}` SET memo=:memo WHERE id=:id"; //ここで編集します
$stmt = $pdo->prepare($sql);
$stmt->execute([':memo' => htmlspecialchars($memo), ':id' => $date]);
echo '更新しました。';
?>