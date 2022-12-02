<?php
  use Wadapi\Http\ResourceController;
  use Wadapi\Http\ResponseHandler;
  use Wadapi\Persistence\SQLGateway;
  use Wadapi\Persistence\Searcher;
  use Wadapi\Persistence\Criterion;
  use Wadapi\Messaging\Messenger;

  class EntryResource extends ResourceController{
    public function retrieveResource($entry){
      return $entry;
    }

    public function modifyResource($entry, $data){
      //Initialise default values for event updates, making fields read-only
      $data["name"] = $entry->getName();
      $data["secret"] = $entry->getSecret();
      $data["locked"] = $entry->getLocked();
      $data["group"] = $entry->getGroup();

      $sqlGateway = new SQLGateway();

      /*
      if(!$entry->isLocked()){
	$group = $entry->getGroup();
        $sqlGateway = new SQLGateway();
        $searcher = new Searcher();

        foreach($data["group"] as $predictionData){
          $searcher->clearCriteria();
          $searcher->addCriterion("matchId", Criterion::EQUAL, $predictionData["matchId"]);
          $searcher->addCriterion("Entry", $entry->getId(), "group");

          $prediction = $sqlGateway->findUnique("Prediction", $searcher);

          $prediction->build($predictionData);

          if(!$prediction->hasBuildErrors()){
            $group[$prediction->getMatchId()] = $prediction;
          }
        }

        $data["group"] = $group;
      }else{
        $data["group"] = $entry->getGroup();
      }
      */

      if(!$entry->isLocked()){
        $knockout = $entry->getKnockout();
        $sqlGateway = new SQLGateway();
        $searcher = new Searcher();

        foreach($data["knockout"] as $predictionData){
          $searcher->clearCriteria();
          $searcher->addCriterion("matchId", Criterion::EQUAL, $predictionData["matchId"]);
          $searcher->addCriterion("Entry", $entry->getId(), "knockout");

          $prediction = $sqlGateway->findUnique("Prediction", $searcher);
	  if(!$prediction){
	  	$prediction = new Prediction();
	  }

          $prediction->build($predictionData);

          if(!$prediction->hasBuildErrors()){
            $knockout[$prediction->getMatchId()] = $prediction;
          }
        }

        $data["knockout"] = $knockout;
      }else{
        $data["knockout"] = $entry->getKnockout();
      }

      $entry->build($data);

      if(!$entry->hasBuildErrors()){
        $sqlGateway->save($entry);
      }

      return $entry;
    }

    public function deleteResource($event){
      return null;
    }
  }
?>
