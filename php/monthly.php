<?php

//URL直打ちで遷移できないようにします
$allowed_hosts = array('localhost', '127.0.0.1');
$referrer = parse_url($_SERVER['HTTP_REFERER'] ?? '', PHP_URL_HOST);

if (!in_array($referrer, $allowed_hosts)) {
    header('HTTP/1.1 403 Forbidden');
    die('Direct access is not allowed.');
}

//月ごとのテーブルを(存在しなければ作成し、)Jsonとして返します

$post = $_POST['tableName']; //2025-11のような形式です
$divMonth = explode('-', $post);
$tableName = 'memo'.$divMonth[0].$divMonth[1]; //memo202511のような形式です

//テーブルが存在しないことを想定して細かく指定します
date_default_timezone_set("Asia/Tokyo");
$firstDate = new DateTime($post.'-01');
$firstDay = (int)$firstDate->format('w');
$nextDate = (clone $firstDate)->modify('+1 month');
$lastDate = (clone $nextDate)->modify('-1 day');
$lastDay = (int)$lastDate->format('w');
$monthLength = (int)$lastDate->format('d');
$dbUser = getenv('cal_user');
$dbPass = getenv('cal_pass');
//テーブルが存在しなければ作成します
$pdo = new PDO('mysql:host=localhost;dbname=calendar;charset=utf8',$dbUser,$dbPass);
$sql = "CREATE TABLE IF NOT EXISTS `{$tableName}`(
    id VARCHAR(2) NOT NULL,
    memo TEXT,
    PRIMARY KEY (id));";
$pdo->exec($sql);

//データが存在しなければ日数分作成します
$stmt = $pdo->query("SELECT COUNT(*) FROM `{$tableName}`");
$count = (int)$stmt->fetchColumn();
if ($count == 0){
    $currentDate = clone $firstDate;
    $sql = $pdo->prepare("INSERT INTO `{$tableName}` (id, memo)
    VALUES (:id, NULL)");
    while ($currentDate != $nextDate){
        $id = $currentDate->format('d');
        $sql->execute([':id' => $id]);
        $currentDate->modify('+1 day');
    }
}

//メモデータを配列として作成してJsonとして返します
$memoArray = array('year'=> (int)$divMonth[0], 'month'=>(int)$divMonth[1], 'length' => $monthLength, 'firstDay' => $firstDay, 'lastDay' => $lastDay);
$memos = array();
foreach ($pdo->query("select * from `{$tableName}`") as $row){
    $date = $row['id'];
    $memo = $row['memo'];
    $memos += array($date => $memo);
}
$memoArray += array('memos' => $memos);
echo json_encode($memoArray);
?>
