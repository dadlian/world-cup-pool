<?php
  use Wadapi\Http\CollectionController;
  use Wadapi\Http\ResponseHandler;
  use Wadapi\Persistence\DatabaseAdministrator;
  use Wadapi\Persistence\SQLGateway;
  use Wadapi\Persistence\Searcher;
  use Wadapi\Persistence\Sorter;
  use Wadapi\Persistence\Criterion;

  class EntryCollection extends CollectionController{
    protected function getInvalidQueryParameters($parameters){
      $invalidParameters = array();
      return $invalidParameters;
    }

    protected function countResources($parameters, $owner){
      $sqlGateway = new SQLGateway();
      $searcher = new Searcher();

      return $sqlGateway->count("Entry",$searcher);
    }

    protected function retrieveResources($start, $records, $parameters, $owner){
      $sqlGateway = new SQLGateway();
      $searcher = new Searcher();
      $sorter = new Sorter();

      return $sqlGateway->find("Entry", $searcher, $sorter, $records, $start, false);
    }

    protected function createResource($data, $owner){
      $sqlGateway = new SQLGateway();
      $entry = new Entry();

      //Initialise default values for every new entry
      $group = [];
      for($i=1; $i<=48; $i++){
        $group[$i] = new Prediction();
        $group[$i]->setMatchId($i);
        $group[$i]->setHomeScore(0);
        $group[$i]->setAwayScore(0);
      }

      $data["group"] = $group;
      $data["secret"] = $this->_generateSecret(10);
      $data["locked"] = false;

      $entry->build($data);

      if(!$entry->hasBuildErrors()){
        $sqlGateway->save($entry);
      }

      return $entry;
    }

    private function _generateSecret($length = 10) {
      $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      $charactersLength = strlen($characters);
      $randomString = '';
      for ($i = 0; $i < $length; $i++) {
          $randomString .= $characters[rand(0, $charactersLength - 1)];
      }

      return $randomString;
    }
  }
?>
