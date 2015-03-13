#评论系统使用方法

# Introduction #

Add your content here.


# Details #

  * 配置文件中增加 comments 模块

```
modules=array(
  .....
'comments'=>array(
				//you may override default config for all connecting models
						'defaultModelConfig' => array(
						//only registered users can post comments
								'registeredOnly' => false,
								'useCaptcha' => false,
								//allow comment tree
								'allowSubcommenting' => true,
								//display comments after moderation
								'premoderate' => false,
								//action for postig comment
								'postCommentAction' => 'comments/comment/postComment',
								//super user condition(display comment list in admin view and automoderate comments)
								'isSuperuser'=>'Yii::app()->user->checkAccess("moderate")',
								//order direction for comments
								'orderComments'=>'DESC',
						),
						//the models for commenting
						'commentableModels'=>array(//允许评论的模型列表
								//model with default settings
								

								'Article', 
						),
						//config for user models, which is used in application
						'userConfig'=>array(
								'class'=>'User',
								'nameProperty'=>'username',
								//'emailProperty'=>'email',
						),
				),
)
```

  * 在视图文件中增加下面代码
```
<?php $this->widget('comments.widgets.ECommentsListWidget', array(
    'model' => $model,
));?>
```