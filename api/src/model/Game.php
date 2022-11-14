<?php
  use Wadapi\Http\Resource;

  class Game extends Resource{
    /** @WadapiString(required=true, unique=true) */
    protected $gameId;

    /** @WadapiString(required=true) */
    protected $localDate;

    /** @WadapiString(required=true) */
    protected $groupName;

    /** @WadapiString(required=true) */
    protected $type;

    /** @WadapiString(required=true) */
    protected $finished;

    /** @Integer(required=true) */
    protected $awayScore;

    /** @WadapiString(required=true) */
    protected $awayTeam;

    /** @WadapiString(required=true) */
    protected $awayFlag;

    /** @Integer(required=true) */
    protected $homeScore;

    /** @WadapiString(required=true) */
    protected $homeTeam;

    /** @WadapiString(required=true) */
    protected $homeFlag;

    public static function getURITemplate(){
      return "/games/{id}";
    }

    protected function getCustomFields(){
      $customFields = [];
      $customFields["finished"] = $this->getFinished() != "FALSE";
      return $customFields;
    }
  }
?>
