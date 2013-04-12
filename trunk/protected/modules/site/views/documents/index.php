<?php
$class = 'Documents';
if($this->working_class) $class = ucfirst($this->working_class); 
$urlParams = array();
if($this->working_class) $urlParams['class_code']=$this->working_class;
if($this->working_group_request) $urlParams['group_id'] = $this->working_group_request->id;
if($this->category) $urlParams['category_id'] = $this->category->id;
//var_dump('sdf:'.$class);
?>

<h1><?php echo Yii::t('siteModule.documents', $class)?></h1>

<div class="article-list">
<?php $this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); ?>
</div>
<div class="updates">
<?php if($this->category && count($this->category->childs)>0):
   foreach ($this->category->childs as $sub) :?>
<div id="category-<?php echo $sub->id;?> ">
		<div class="category">
			<div class="appTitle">
				<a class="iconLink" title="" href="<?php echo $sub->viewUrl ?>"><img width=30 
					class="icon" alt=""
					src="<?php echo Yii::app()->theme->baseUrl?>/images/doc.png"><span><?php echo $sub->name ?></span>
				</a>
			</div>
			<div class="appAdd">
				<a class="iconLink" title="" href="<?php echo Yii::app()->urlManager->createUrl('site/article/create',$urlParams);?>"><img
					class="icon" alt="添加"
					src="<?php echo Yii::app()->theme->baseUrl?>/images/write16.gif"><span>添加</span>
				</a>
			</div>
		</div>

		
		<table class="list latestList">
		   <?php $cat = Documents::model()->byCategory($sub->id)->recently()->published()->findAll();
		    if(count($cat)==0){?>
		   <tr class="last"><td class="notificationTitle"><div class="notfound">没有最新更新内容</div></td></tr>
		   <?php }else{
		     foreach ($cat as $a){		     	
		   	?>
		     <tr><td class="check"></td><td class="notificationTitle"><div><a href="<?php echo $a->url;?> " ><?php echo $a->title?></a></td><td class="member"><?php echo $a->author->username?></td><td class="date"><?php echo date('Y年m月d日 H:i:s', $a->create_date);?></td></tr>
		   <?php } 
		     }?>
		</table>
	</div>
   
<?php 
  endforeach;
endif;?>
</div>