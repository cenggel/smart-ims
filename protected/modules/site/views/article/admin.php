<?php
$class = 'Articles';
if($this->working_class) $class = ucfirst($this->working_class);


Yii::app()->clientScript->registerScript('search', "
		$('.search-button').click(function(){
		$('.search-form').toggle();
		return false;
});
		$('.search-form form').submit(function(){
		$.fn.yiiGridView.update('article-grid', {
		data: $(this).serialize()
});
		return false;
});
		");
?>

<div
	class="content-box">
	<!-- Start Content Box -->

	<div class="content-box-header">
		<h3>
			<?php echo Yii::t('siteModule.article','Manage {Articles}',array('{Articles}'=>Yii::t('siteModule.article', $class)))?>
		</h3>
	</div>
	<!-- End .content-box-header -->

	<div class="content-box-content">



		<?php $this->widget('bootstrap.widgets.TbGridView', array(
				'id'=>'article-grid',
				//'type'=>'striped bordered condensed',

				'dataProvider'=>$model->search(),
				'filter'=>$model,
				'columns'=>array(
						array('name'=>'id',
								'htmlOptions'=>array('width'=>"10"),
								'filter'=>false),
						array('name'=>'category_id',
								'value'=>'$data->category->name',
								'filter'=>Category::model()->getListData(0,"--",$model->group_id,$model->class_code)),
						'title',
						array('name'=>'status',
								'filter'=>Enumeration::items('ARTICLE_STATUS'),
								'value'=>'Enumeration::item("ARTICLE_STATUS", $data->status)'),
						array('name'=>'user_id',
								'value'=>'$data->author->username',
								'filter'=>$userFilter),
						array('name'=>'create_date',
								'value'=>'date(\'Y-m-d\',$data->create_date)',
								'filter'=>false),
						/*
						 'essential',
		'article_date',
		'author_id',
		'create_date',
		'update_date',
		'update_user',
		*/
						array(
								'class'=>'bootstrap.widgets.TbButtonColumn',
								'htmlOptions'=>array('style'=>'width: 60px'),
				
		),
	),
)); ?>
	</div>
</div>
