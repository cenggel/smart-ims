<div class="form">
<?php 
if (empty ( $displayAttribes )) {
	echo Yii::t ( "admin", "no attribe to display." );
	Yii::app ()->end ( 0 );
}

$form=$this->beginWidget('CActiveForm', array(
	'id'=>$this->id,
	'enableAjaxValidation'=>false,
	'htmlOptions'=> $this->htmlOptions,
)); ?>

	<p class="note"><?php Yii::t('core','Fields with <span class="required">*</span> are required.') ?></p>

	<?php echo $form->errorSummary($model); ?>
    <?php 
	$rowcnt = 0;
	$hidden =array();
	foreach ( $displayAttribes as $key => $attr ) {
		$attrName = $attr;
		if (is_array ( $attr ) && empty ( $attr ['name'] )) {
			$attr ['name'] = $key;
		}
		
		$hidden = strtolower($attr['type'])=='hidden'?" style='display:none'":"";
		
		$render = new ElementRender($this);
		$render->parse ( $model, $attr );
		echo "<div class=\"row\" {$hidden}>";
			echo $render->label;
			echo $render->element;
			echo $form->error($model,$render->name);
		echo "</div>";
		
	
	}
	
		?>

	<div class="row buttons">
		<?php echo CHtml::submitButton($model->isNewRecord ? Yii::t('core','Create') : Yii::t('core','Save')); ?>
	</div>

<?php $this->endWidget(); ?>
</div>