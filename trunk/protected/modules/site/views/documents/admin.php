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

		<!--  
<p>
You may optionally enter a comparison operator (<b>&lt;</b>, <b>&lt;=</b>, <b>&gt;</b>, <b>&gt;=</b>, <b>&lt;&gt;</b>
or <b>=</b>) at the beginning of each of your search values to specify how the comparison should be done.
</p>
-->
		<?php echo CHtml::link(Yii::t('core','Advanced Search'),'#',array('class'=>'search-button')); ?>
		<div class="search-form" style="display: none">
			<?php $this->renderPartial('_search',array(
					'model'=>$model,
			)); ?>
		</div>
		<!-- search-form -->

		<?php $this->widget('bootstrap.widgets.TbGridView', array(
				'id'=>'article-grid',
				//'type'=>'striped bordered condensed',

				'dataProvider'=>$model->search(),
				'filter'=>$model,
				'columns'=>array(
						array('name'=>'id',
								'htmlOptions'=>array('width'=>"10"),
								'filter'=>false),
						array('name'=>'Category_id',
								'value'=>'$data->category->name',
								'filter'=>Category::model()->getListData(0,"--",$model->groups_id,$model->class_code)),
						'doc_name',
						
						array('name'=>'create_user',
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
								'htmlOptions'=>array('style'=>'width: 50px'),
				
		),
	),
)); ?>
	</div>
</div>
