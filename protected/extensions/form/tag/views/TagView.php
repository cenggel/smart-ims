<?php

$tag_it=Yii::app()->getAssetManager()->publish(Yii::getPathOfAlias('ext.form.tag.asset'));
$cs=Yii::app()->clientScript;
$cs->registerCoreScript('jquery.ui');
$cs->registerScriptFile($tag_it.'/tag-it.js');
$cs->registerCssFile($tag_it.'/tag-it.css');

$cs->registerScript($id,'
    $("#'.$id.'").tagit({
        tags: '.$tags.',
        url: "'.$url.'"
    });
', CClientScript::POS_READY);

?>


<ul id="<?php echo CHtml::encode($id);?>">
    <li class="tagit-new">
        <input class="tagit-input" type="text" />
    </li>
</ul>