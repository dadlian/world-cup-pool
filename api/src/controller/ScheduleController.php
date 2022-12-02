<?php
  use Wadapi\Http\RestController;
  use Wadapi\Http\ResponseHandler;
  use Wadapi\Persistence\SQLGateway;
  use Wadapi\Persistence\Searcher;
  use Wadapi\Persistence\Criterion;

  class ScheduleController extends RestController{
    public function get(){
      $sqlGateway = new SQLGateway();
      $games = $sqlGateway->find("Game");
      $schedule = [];

      foreach($games as $game){
        $schedule[] = $game->deliverPayload();
      }

      ResponseHandler::retrieved($schedule,"/schedule");
    }

    public function post(){
      $curl = curl_init();

      // Authenticate API
      curl_setopt($curl, CURLOPT_URL, "http://wc2022.kycsar.com/api/v1/user/login");
      curl_setopt($curl, CURLOPT_POST, 1);
      curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode(array(
        "email"=>"sveninem@gmail.com",
        "password"=>"g0T1T4n$"
      )));

      curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
      curl_setopt($curl, CURLOPT_RETURNTRANSFER, true );

      var_dump(curl_exec($curl));
      var_dump(curl_error($curl));
      exit;

      #$CUP_TOKEN = json_decode(curl_exec($curl), true)["data"]["token"];

      // Retrieve Schedule
      $curl = curl_init();
      curl_setopt($curl, CURLOPT_URL, "http://api.cup2022.ir/api/v1/match");
      curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

      curl_setopt($curl, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json',
        "Authorization: Bearer $CUP_TOKEN"
      ));

      $result = curl_exec($curl);
      curl_close($curl);

      //Save schedule locally
      $schedule = json_decode($result, true)["data"];
      $sqlGateway = new SQLGateway();
      $searcher = new Searcher();

      foreach($schedule as $game){
        $searcher->clearCriteria();
        $searcher->addCriterion("gameId", Criterion::EQUAL, $game["id"]);
        $match = $sqlGateway->findUnique("Game", $searcher);
        if(!$match){
          $match = new Game();
        }

        $match->setGameId($game['id']);
        $match->setLocalDate($game['local_date']);
        $match->setGroupName($game['group']);
        $match->setType($game['type']);
        $match->setFinished($game['finished']);
        $match->setAwayScore($game['away_score']);
        $match->setAwayTeam($game['away_team_en']);
        $match->setAwayFlag($game['away_flag']);
        $match->setHomeScore($game['home_score']);
        $match->setHomeTeam($game['home_team_en']);
        $match->setHomeFlag($game['home_flag']);

        $sqlGateway->save($match);
      }

      ResponseHandler::created(["success" => true],"/schedule");
    }
  }
?>
