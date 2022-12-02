<?php
  use Wadapi\Http\Resource;

  class Entry extends Resource{
    /** @WadapiString(required=true, unique=true) */
    protected $name;

    /** @WadapiString(required=true) */
    protected $secret;

    /** @Collection(type=@WadapiObject(class='Prediction'), required=true) */
    protected $group;

    /** @Collection(type=@WadapiObject(class='Prediction'), required=true) */
    protected $knockout;

    /** @Boolean(required=true) */
    protected $locked;

    public static function getURITemplate(){
      return "/entries/{secret}";
    }
  }
?>
