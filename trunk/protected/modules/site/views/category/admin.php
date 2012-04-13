<?php
$this->addBreadcrumbs(Yii::t('siteModule.category', 'Manage Categories'));

$urlParams = array();
if($this->working_class) $urlParams['class_code']=$this->working_class;
if($this->working_group) $urlParams['group_id'] = $this->working_group->id;

/*$this->menu=array(
 array('label'=>'List Category', 'url'=>array('index')),
		array('label'=>'Create Category', 'url'=>array('create')),
);*/

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
	<?php echo CHtml::link(Yii::t('siteModule.category', 'Add Category'), array('category/create', 'class_code' => $model->class_code ,'group_id'=>$model->group_id), array( 'class' => 'button' )); ?>
</div>

<div
	class="content-box">
	<!-- Start Content Box -->

	<div class="content-box-header">
		<h3>
			<?php echo Yii::t('core', 'Categories'); ?>
		</h3>
	</div>
	<!-- End .content-box-header -->

	<div class="content-box-content">

		<?php echo CHtml::form(); ?>
		<table>
			<thead>
				<tr>
					<th style='width: 5%;'><?php echo $model->getAttributeLabel('display_order'); ?>
					</th>
					<th style='width: 20%;'><?php echo $model->getAttributeLabel('name'); ?>
					</th>
					<th style='width: 10%;'><?php echo $model->getAttributeLabel('class_code');?>
					</th>
					<th style='width: 25%;'><?php echo $model->getAttributeLabel('description'); ?>
					</th>
					<th style='width: 15%;'><?php echo Yii::t('admintuts', 'Options'); ?>
					</th>
				</tr>
			</thead>
			<tfoot>
				<tr>
					<td colspan="5">
						<div class="bulk-actions align-left">
							<?php echo CHtml::submitButton( Yii::t('Yii', 'Submit'), array( 'name'=> 'submit', 'class'=>'button')); ?>
						</div>
						<div class="clear"></div>
					</td>
				</tr>
			</tfoot>
			<tbody>
				<?php $categories = $model->getRootCats();
				if ( count( $categories ) ):

				//print_r(count( TutorialsCats::model()->getRootCats() ) )?>

				<?php foreach ($categories as $row): 
				//print_r($row);
				?>
				<tr>
					<td><?php echo CHtml::textField( 'pos[' . $row->id.']', $row->display_order, array('size'=>1,'class'=>'tiny-input') ); ?>
					</td>
					<td><a href="<?php echo $row->viewUrl; ?>" title="" rel="tooltip"><?php echo CHtml::encode($row->name); ?>
					</a></td>
					<td><?php echo CHtml::encode($row->class_code); ?></td>
					<td><?php echo CHtml::encode($row->description); ?></td>
					<td>
						<!-- Icons --> 
						<a
						href="<?php echo $row->viewUrl; ?>"
						title="<?php echo Yii::t('siteModule.category', 'View category'); ?>"
						rel='tooltip'><img
							src="<?php echo Yii::app()->theme->baseUrl; ?>/images/icons/preview.png"
							alt="View" /> </a> 
							<a
						href="<?php echo Yii::app()->urlManager->createUrl('site/article/create', array_merge($urlParams, array( 'category_id' => $row->id ))); ?>"
						title="<?php echo Yii::t('siteModule.category', 'Add article to this category'); ?>"
						rel='tooltip'><img
							src="<?php echo Yii::app()->theme->baseUrl; ?>/images/icons/add.png"
							alt="Add" /> </a> <a
						href="<?php echo $this->createUrl('tutorials/addcategory', array( 'parentid' => $row->id )); ?>"
						title="<?php echo Yii::t('siteModule.category', 'Add sub category to this category'); ?>"
						rel='tooltip'><img
							src="<?php echo Yii::app()->theme->baseUrl; ?>/images/icons/addsub.png"
							alt="Add" /> </a> <a
						href="<?php echo $this->createUrl('tutorials/editcategory', array( 'id' => $row->id )); ?>"
						title="<?php echo Yii::t('siteModule.category', 'Edit this category'); ?>"
						rel='tooltip'><img
							src="<?php echo Yii::app()->theme->baseUrl; ?>/images/icons/pencil.png"
							alt="Edit" /> </a> <a
						href="<?php echo $this->createUrl('tutorials/deletecategory', array( 'id' => $row->id )); ?>"
						title="<?php echo Yii::t('siteModule.category', 'Delete this category!'); ?> "
						rel='tooltip deletelink'><img
							src="<?php echo Yii::app()->theme->baseUrl; ?>/images/icons/cross.png"
							alt="Delete" /> </a>
					</td>
				</tr>
				<?php endforeach ?>

				<?php else: ?>
				<tr>
					<td colspan='8' style='text-align: center;'><?php echo Yii::t('adminglobal', 'No Items Found.'); ?>
					</td>
				</tr>
				<?php endif; ?>
			</tbody>
		</table>
		<?php echo CHtml::endForm(); ?>



		<?php 
		$this->widget('bootstrap.widgets.BootGridView', array(
				'id'=>'category-grid',
				'dataProvider'=>$model->search(),
				'filter'=>$model,
				'columns'=>array(
						'id'=>array('name'=>'id',
								'htmlOptions'=>array('width'=>"10")),
						'name',
						'parent_id'=>array( 'name'=>'parent_id',
								'value'=>'$data->parent->name',
								'filter'=>$model->getListData(),
								'htmlOptions'=>array('width'=>'100')),
						array('name'=>'class_code',
								'filter'=>false),
						array('name'=>'display_order',
								'filter'=>false),

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
			'class'=>'bootstrap.widgets.BootButtonColumn',
            'htmlOptions'=>array('style'=>'width: 50px'),
				
		),
	),
)); ?>
	</div>
</div>
