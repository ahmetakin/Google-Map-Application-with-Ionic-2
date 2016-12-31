<?php
header('Access-Control-Allow-Origin: *');

require 'vendor/autoload.php';

$app=new \Slim\Slim();

//database
function getConnection() {
  $dbhost="";
  $dbuser="";
  $dbpass="";
  $dbname="ny_historic_app";
  $dbh = new PDO("mysql:host=$dbhost;dbname=$dbname;charset=utf8", $dbuser, $dbpass);
  $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  return $dbh;
}

$app->get('/historic_sites',function() use ($app){
    $req = $app->request();
    $query="select * FROM ny_historic_sites";
    try {
      $db=getConnection();
      $workit=$db->query($query);
      $getit = $workit->fetchAll(PDO::FETCH_OBJ);
      header('Content-Type: application/json');
      echo json_encode($getit);
      $db = null;
     } catch(PDOException $e) {
         echo '{"error":{"text":'. $e->getMessage() .'}}';
     }

})->name('historic_sites');

$app->get('/historic_sites/:id',function($id) use ($app){
    $req = $app->request();
    $query="select * from ny_historic_sites where id=$id";
    try {
      $db=getConnection();
      $workit=$db->query($query);
      $getit = $workit->fetchAll(PDO::FETCH_OBJ);
      header('Content-Type: application/json');
      echo json_encode($getit);
      $db = null;
     } catch(PDOException $e) {
         echo '{"error":{"text":'. $e->getMessage() .'}}';
     }

})->name('historic_sites');

$app->run();

?>
