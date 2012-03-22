<?php
$this->breadcrumbs=array(
	'Categories'=>array('index'),
	'Manage',
);

$this->menu=array(
	array('label'=>'List Category', 'url'=>array('index')),
	array('label'=>'Create Category', 'url'=>array('create')),
);

Yii::app()->clientScript->registerScript('search', "
$('.search-button').click(function(){
	$('.search-form').toggle();
	return false;
});
$('.search-form form').submit(function(){
	$.fn.yiiGridView.update('category-grid', {
		data: $(this).serialize()
	});
	return false;
});
");
?>

<div class='floatright'>
	<?php echo CHtml::link(Yii::t('core', 'Add Category'), array('category/create', 'class_code' => $model->class_code ), array( 'class' => 'button' )); ?>
</div>

<div class="content-box"><!-- Start Content Box -->
	
	<div class="content-box-header">
		<h3><?php echo Yii::t('core', 'Categories'); ?> </h3>
	</div> <!-- End .content-box-header -->
	
	<div class="content-box-content">



<?php $this->widget('zii.widgets.grid.CGridView', array(
	'id'=>'category-grid',
	'dataProvider'=>$model->search(),
	'filter'=>$model,
	'columns'=>array(
		'id'=>array('name'=>'id',
		 'htmlOptions'=>array('width'=>"10")),
		'name',
		'Alias',
		'display_order',
		'parent_id'=>array( 'name'=>'parent_id',
				'value'=>'$data->parent->name',
				'filter'=>$model->getSelectDataList(),
				'htmlOptions'=>array('width'=>'100')),
		/*
		'display_order',
		'create_user',
		'views',
		'group_id',
		'create_date',
		'update_date',
		'update_user',
		*/
		array(
			'class'=>'CButtonColumn',
		),
	),
)); ?>
</div>
</div>