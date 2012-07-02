<?php 
$assets = Yii::app()->getAssetManager()->publish(Yii::getPathOfAlias('cal') . '/assets');

$cs = Yii::app()->clientScript;
$cs->registerScriptFile($assets . '/jquery.clockpick.1.2.9.min.js');
$cs->registerCssFile($assets. '/jquery.clockpick.1.2.9.css');
Yii::app()->clientScript->registerCoreScript('jquery.ui');
$cs->registerCssFile(Yii::app()->theme->baseUrl .'/css/redmond/jquery-ui-1.8.18.custom.css');
$dayNamesMin= "['日', '一', '二', '三', '四', '五', '六']";
$monthNames ="['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']";
$js =<<<T
$('.timePicker').clockpick({
starthour : 6,
endhour : 15,
showminutes : true,
minutedivisions:4,
military: true,

});
//date 
$('.datePicker').datepicker({ dateFormat: 'yy-mm-dd' , dayNamesMin:$dayNamesMin ,monthNames:$monthNames,
showButtonPanel: true
});

$('.datePicker').each(function(){
if($( this).val() && /[^\d]/.test($(this).val())) v{){
			
			 
			 var date = new Date();
			 date.setTime(parseInt($( this ).val())*1000);
		   $(this).datepicker("setDate",date);
		}	
});

// progress bar 
$('.complate-process').each(function(){
  var v = $(this).val();
  var id = this.id;
  var id_amount = id+"_amount";
  var slider_id = $(this).id+"_slider";
  
  $(this).wrap("<div  style='width:"+$(this).css('width')+";' />");
  $(this).parent().prepend("<div id=\""+slider_id+"\"></div> <div id='"+id_amount+"' class='progress-value' /> ",this);
  $(this).hide();
  $("#"+slider_id).slider({
  range: "min",
  
           value:v,
			min: 0,
			max: 100,
			step: 5,
			slide: function( event, ui ) {
				$( "#"+id ).val( ui.value);
				$("#" + id_amount).html(ui.value+"%");
			}
		});
		
   $("#" + id_amount).html(v+"%");
});

		

T;

$cs->registerScript("event_form",$js);
?>

<?php $form=$this->beginWidget('bootstrap.widgets.BootActiveForm',array(
		'id'=>'event-form',
		'enableAjaxValidation'=>true,
)); ?>

<p class="help-block">
	Fields with <span class="required">*</span> are required.
</p>

<?php echo $form->errorSummary($model); ?>

<?php if(strlen($model->event_type)>0 ){
	$this->renderPartial('_form_' . $model->event_type,array('model'=>$model,'form'=>$form));
}

?>



<div class="form-actions">
	<?php $this->widget('bootstrap.widgets.BootButton', array(
			'buttonType'=>'submit',
			'type'=>'primary',
			'label'=>$model->isNewRecord ? 'Create' : 'Save',
	)); ?>
</div>

<?php $this->endWidget(); ?>
