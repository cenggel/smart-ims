<?php

// uncomment the following to define a path alias
// Yii::setPathOfAlias('local','path/to/local-folder');

// This is the main Web application configuration. Any writable
// CWebApplication properties can be configured here.
$menus= require(dirname(__FILE__) . DIRECTORY_SEPARATOR . 'admin_menu.php');
return array(
		'basePath'=>dirname(__FILE__).DIRECTORY_SEPARATOR.'..',
		'name'=>'信息共享系统',

		// preloading 'log' component
		'preload'=>array('log'),
		'language'=>'zh_cn',
		'theme' => 'classic',
		'defaultController'=>'site',

		// autoloading model and component classes
		'import'=>array(
				'application.models.*',
				'application.modules.user.models.User',
				'application.components.*',
				'application.extensions.*',
				'application.modules.rights.*',
				'application.modules.rights.components.*',
				'application.modules.user.models.*',
				'application.modules.user.components.*',
				'application.modules.site.models.*',
				'application.modules.site.components.*',
				
		),

        //目前只保留cal（任务管理）和user（用户信息管理）俩个模块儿，其他right，site模块功能不明确，暂时冗余
		'modules'=>array(
				// uncomment the following to enable the Gii tool

				'gii'=>array(
						'class'=>'system.gii.GiiModule',
						'password'=>'123',
						// If removed, Gii defaults to localhost only. Edit carefully to taste.
						'ipFilters'=>array('127.0.0.1','::1'),
				),
				'rights'=>array(
					 'install'=>false, // Enables the installer.
					 'superuserName'=>'Admin',
					 'layout'=>'rights.views.layouts.main',
					 'appLayout'=>'application.views.layouts.main',
				),
				'user'=>array(
						'returnUrl'=>array('/site/member/index'),
						),
				'site'=>array(
						'import'=>array(
								'site.componets.*',
								'site.models.*',
								),
						),
								
				'cal' => array(
						'debug' => true // For first run only!
				),

		),
		
		'aliases' => array(
				'helpers' => 'application.widgets',
				'widgets' => 'application.widgets',
				'site.widgets'=>'application.modules.site.widgets',
		),
 
        //用户登录认证，暂时用CWebUser基类，等需要的时候，再做封装。
		// application components
		'components'=>array(
				'user'=>array(
						// enable cookie-based authentication
						'allowAutoLogin'=>true,
						'class'=>'CWebUser',
						'loginUrl' => array('/user/login'),
						
				),
				
//delete by lifuan 16:44 2012/4/8 暂时不使用该模块儿，后期基本功能完善后，再放开。
//				'settings' => array(
//						'class' => 'XSettings',
//				),
//				'authManager'=>array(
//						'class'=>'RDbAuthManager', // Provides support authorization item sorting
//						/*// Path to SDbAuthManager in srbac module if you want to use case insensitive
//
//						//access checking (or CDbAuthManager for case sensitive access checking)
//						'class'=>'application.modules.srbac.components.SDbAuthManager',
//						// The database component used
//						'connectionID'=>'db',
//						// The itemTable name (default:authitem)
//						'itemTable'=>'items',
//						// The assignmentTable name (default:authassignment)
//						'assignmentTable'=>'assignments',
//						// The itemChildTable name (default:authitemchild)
//						'itemChildTable'=>'itemchildren',
//						*/
//			 ),
//			 				
//
//end delete by lifuan 16:44 2012/4/8
//delete by lifuan 16:39 2012/4/8（本项目不使用模板）					
//				'viewRenderer'=>array(
//						'class'=>'application.extensions.renderers.smarty.ESmartyViewRenderer',
//						'fileExtension' => '.html',
//						//'pluginsDir' => 'application.smartyPlugins',
//						//'configDir' => 'application.smartyConfig',
//				),
//end delete by lifuan 16:39 2012/4/8（本项目不使用模板）
					
				// uncomment the following to enable URLs in path-format

				'urlManager'=>array(
						'urlFormat'=>'path',
						'showScriptName'=>true,
						'rules'=>array(
//delete by lfa 16:47 2012/4/8 为了提高开发进度，前期尽量功能单一化
//								//gii rewrite
//								'gii'=>'gii',
//								'gii/<controller:\w+>'=>'gii/<controller>',
//								'gii/<controller:\w+>/<action:\w+>'=>'gii/<controller>/<action>',
//								
//								'user/<controller:\w+>'=>'user/<controller>',
//								'user/<controller:\w+>/<_a:([a-zA-z0-9-]+)>//*'=>'user/<controller>/<_a>/',
//								'rights/<controller:\w+>/<_a:([a-zA-z0-9-]+)>//*'=>'rights/<controller>/<_a>/',
//								'cal/<controller:\w+>/<_a:([a-zA-z0-9-]+)>//*'=>'cal/<controller>/<_a>/',
//								
//								
//								'group_<group_id:\d+>/<class_code:\w+>'=>'site/article/index',
//								'group_<group_id:\d+>/<class_code:\w+>/<action:\w+>'=>'site/article/<action>',
//								
//								'group_<group_id:\d+>/cal/<controller:\w+>'=>'cal/<controller>/index',
//								'group_<group_id:\d+>/cal/<controller:\w+>/<action:\w+>'=>'cal/<controller>/<action>',
//								
//								
//								'tutorials/<action:\w+>'=>array('site/article/<action>/','defaultParams'=>array('class_code'=>'tutorials',)),
//								'blog/<action:\w+>'=>array('site/article/<action>/','defaultParams'=>array('class_code'=>'blog')),
//								'document/<action:\w+>'=>array('site/article/<action>','defaultParams'=>array('class_code'=>'document')),
//								'group_<group_id:\d+>/tutorials/<action:\w+>'=>array('site/article/<action>/','defaultParams'=>array('class_code'=>'tutorials',)),
//								'group_<group_id:\d+>/blog/<action:\w+>'=>array('site/article/<action>/','defaultParams'=>array('class_code'=>'blog',)),
//								'group_<group_id:\d+>/document/<action:\w+>'=>array('site/article/<action>/','defaultParams'=>array('class_code'=>'document',)),
//								
//								
//								
//								'<controller:\w+>/<id:\d+>'=>'<controller>/view',
//								'<controller:\w+>/<action:\w+>/<id:\d+>'=>'<controller>/<action>',
//								'<controller:\w+>/<action:\w+>'=>'<controller>/<action>',
//end delete by lfa 16:47 2012/4/8 为了提高开发进度，前期尽量功能单一化
								'<controller:\w+>/<id:\d+>'=>'site/<controller>/view',
								'<controller:\w+>/<action:\w+>/<id:\d+>'=>'site/<controller>/<action>',
								'<controller:\w+>/<action:\w+>'=>'site/<controller>/<action>',
								"<_c:([a-zA-z0-9-]+)>/<_a:([a-zA-z0-9-]+)>//*" => 'site/<_c>/<_a>/',
						),
				),

				/*'db'=>array(
						'connectionString' => 'sqlite:'.dirname(__FILE__).'/../data/testdrive.db',
						'tablePrefix'=>'tbl_',
				),*/
				// uncomment the following to use a MySQL database
				
				'db'=>array(
						'connectionString' => 'mysql:host=localhost;dbname=smart_ims',
						'emulatePrepare' => true,
						'username' => 'root',
						'password' => 'root',
						'charset' => 'utf8',
						'tablePrefix'=>'tlb_',
				),

				'errorHandler'=>array(
						// use 'site/error' action to display errors
						'errorAction'=>'/site/home/error',
				),
				'log'=>array(
						'class'=>'CLogRouter',
						'routes'=>array(
								array(
										'class'=>'CFileLogRoute',
										'levels'=>'error, warning',
								),

						),
				),
		),

		// application-level parameters that can be accessed
		// using Yii::app()->params['paramName']
		'params'=>array(
				// this is used in contact page
				'adminEmail'=>'webmaster@example.com',
				'editor'=>'fckeditor',
				'allowedImages'=>array('jpg','jpeg','gif','png'),
				'upload_path'=>'/uploads',
				'menus'=>$menus,
		),
);