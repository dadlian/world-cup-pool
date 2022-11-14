<?php
  use Wadapi\Http\Resource;

  class Prediction extends Resource{
    /** @Integer(required=true) */
    protected $matchId;

    /** @WadapiString */
    protected $winner;

    /** @Integer(required=true) */
    protected $homeScore;

    /** @Integer(required=true) */
    protected $awayScore;

    public static function getURITemplate(){
      return "/entries/{Entry:id}/predictions/{id}";
    }
  }
?>
