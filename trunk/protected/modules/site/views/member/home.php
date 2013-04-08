<?php
$this->breadcrumbs=array(
		'Member',
);
$this->params['contentClass']='container_24';
?>

<div class="span3 left-sidebar">
	<div id="sidebar">
		<?php $this->widget('widgets.MemberInfo' );?>
		<?php
		
		$this->beginWidget('zii.widgets.CPortlet',array('title'=>'工作组'));
		$this->widget('site.widgets.MemberGroup' ,array('visible'=>!Yii::app()->user->isGuest));
		$this->endWidget();
		?>
	</div>
</div>

<div class="span9">

	<div class="main-content">
	    
	    <div class="row">
		<div class="updates span6">

			<div class="subTitle">
				<p>最新更新内容</p>
			</div>

			<?php $model = Groups::model();
			
			foreach ($model->getLatestAritcleList() as $key=> $cat){?>
			<div id="<?php echo $key;?> ">
				<div class="category">
					<div class="appTitle">
						<a class="iconLink" title=""
							href="<?php echo Yii::app()->urlManager->createUrl('site/article/index',array('class_code'=>$key));?>"><img
							width=30 class="icon" alt=""
							src="<?php echo Yii::app()->theme->baseUrl?>/images/doc.png"><span><?php echo Enumeration::item('ARTICLE_CLASS', $key)?>
						</span> </a>
					</div>
					<div class="appAdd">
						<a class="iconLink" title=""
							href="<?php echo Yii::app()->urlManager->createUrl('site/article/create',array('class_code'=>$key));?>"><img
							class="icon" alt="添加"
							src="<?php echo Yii::app()->theme->baseUrl?>/images/write16.gif"><span>添加</span>
						</a>
					</div>
				</div>


				<table class="list latestList">
					<?php if(count($cat)==0){?>
					<tr class="last">
						<td class="notificationTitle"><div class="notfound">没有最新更新内容</div>
						</td>
					</tr>
					<?php }else{
						foreach ($cat as $a){
							?>
					<tr>
						<td class="check"></td>
						<td class="notificationTitle"><div>
								<a href="<?php echo $a->url;?> "><?php echo $a->title?> </a>
						
						</td>
						<td class="member"><?php echo $a->author->username?></td>
						<td class="date"><?php echo date('Y年m月d日 H:i:s', $a->create_date);?>
						</td>
					</tr>
					<?php } 
		     }?>
				</table>
			</div>
			<?php }?>
		</div>
		
		<!-- 提示列表 -->
		<div class="span3"><?php $this->widget('notify.widgets.NotifyList');?></div>
        </div>

	</div>
</div>
