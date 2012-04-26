<?php
/**
 * TagWidget creates a tag form / auto complete
 *
 * @version 0.1
 * @author Chris
 * @link http://con.cept.me
 */
class TagWidget extends CWidget {

    /**
     * Html ID
     * @var string
     */
    public $id = 'tagWidget';

    /**
     * Initial tags
     * @var array
     */
    public $tags;

    /**
     * The url to get json data
     * @var string
     */
    public $url;
    
    public function init()
    {
        // this method is called by CController::beginWidget()
        if($this->tags == null || strtolower($this->tags)=='null') $this->tags='';
        if(is_string($this->tags)){
        	$this->tags = split(',', $this->tags);
        }
        if(empty($this->url)){
        	$this->url =  Yii::app()->urlManager->createUrl('tag/json');
        }
    }

    public function run()
    {
        $this->tags = json_encode($this->tags);
        // this method is called by CController::endWidget()
        $this->render('TagView', array(
            'id' => $this->id,
            'tags' => $this->tags,
            'url' => $this->url
        ));
    }
}