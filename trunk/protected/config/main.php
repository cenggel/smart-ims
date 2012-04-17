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
		'timeZone'=>'Asia/Shanghai',
		'defaultController'=>'site/member/home',


		// autoloading model and component classes
		'import'=>array(
				'application.models.*',
				'application.modules.user.models.User',
				'application.components.*',
				'application.extensions.attachment.models.*',
				'application.extensions.form.components.*',
				'application.modules.rights.*',
				'application.modules.rights.components.*',
				'application.modules.user.models.*',
				'application.modules.user.components.*',
				'application.modules.site.models.*',
				'application.modules.site.components.*',

		),

		'modules'=>array(
				// uncomment the following to enable the Gii tool

				'gii'=>array(
						'class'=>'system.gii.GiiModule',
						'password'=>'123',
						// If removed, Gii defaults to localhost only. Edit carefully to taste.
						'ipFilters'=>array('127.0.0.1','::1'),
						'generatorPaths'=>array(
								'bootstrap.gii', // since 0.9.1
						),

				),
				'rights'=>array(
					 'install'=>false, // Enables the installer.
					 'superuserName'=>'Admin',
					 'layout'=>'rights.views.layouts.main',
					 'appLayout'=>'application.views.layouts.main',
				),
				'user'=>array(
						'returnUrl'=>array('/site/member/home'),
						'relations'=>array('groups'=>array(CActiveRecord::MANY_MANY,'Groups','group_members(users_id,groups_id)')),
						'componentBehaviors'=>array('Profile'=>array('profile'=>array('class' => 'application.extensions.UserProfileBehaviors')))
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
				'bootstrap'=>'application.extensions.bootstrap',
		),

		// application components
		'components'=>array(
				'bootstrap'=>array(
						'class'=>'ext.bootstrap.components.Bootstrap', // assuming you extracted bootstrap under extensions
				),

				'user'=>array(
						// enable cookie-based authentication
						'allowAutoLogin'=>true,
						'class'=>'RWebUser',
						'loginUrl' => array('/user/login'),

				),

				'settings' => array(
						'class' => 'XSettings',
				),
				'authManager'=>array(
						'class'=>'RDbAuthManager', // Provides support authorization item sorting
						/*// Path to SDbAuthManager in srbac module if you want to use case insensitive

//access checking (or CDbAuthManager for case sensitive access checking)
'class'=>'application.modules.srbac.components.SDbAuthManager',
// The database component used
'connectionID'=>'db',
// The itemTable name (default:authitem)
'itemTable'=>'items',
// The assignmentTable name (default:authassignment)
'assignmentTable'=>'assignments',
// The itemChildTable name (default:authitemchild)
'itemChildTable'=>'itemchildren',
*/
			 ),
					
				'viewRenderer'=>array(
						'class'=>'application.extensions.renderers.smarty.ESmartyViewRenderer',
						'fileExtension' => '.html',
						//'pluginsDir' => 'application.smartyPlugins',
						//'configDir' => 'application.smartyConfig',
				),
				// uncomment the following to enable URLs in path-format

				'urlManager'=>array(
						'urlFormat'=>'path',
						'showScriptName'=>false,
						'rules'=>array(
								//gii rewrite
								'gii'=>'gii',
								'gii/<controller:\w+>'=>'gii/<controller>',
								'gii/<controller:\w+>/<action:\w+>'=>'gii/<controller>/<action>',

								'user/<controller:\w+>'=>'user/<controller>',
								'user/<controller:\w+>/<_a:([a-zA-z0-9-]+)>//*'=>'user/<controller>/<_a>/',
								'rights/<controller:\w+>/<_a:([a-zA-z0-9-]+)>//*'=>'rights/<controller>/<_a>/',
								'cal/<controller:\w+>/<_a:([a-zA-z0-9-]+)>//*'=>'cal/<controller>/<_a>/',


								'group_<group_id:\d+>/<class_code:\w+>'=>'site/article/index',
								'group_<group_id:\d+>/<class_code:\w+>/<action:\w+>'=>'site/article/<action>',

								'group_<group_id:\d+>/<class_code:\w+>/<id:\d+>'=>'site/article/view',

								'group_<group_id:\d+>/cal/<controller:\w+>'=>'cal/<controller>/index',
								'group_<group_id:\d+>/cal/<controller:\w+>/<action:\w+>'=>'cal/<controller>/<action>',

								'group_<group_id:\d+>/<class_code:\w+>/category/<action:\w+>'=>'site/category/<action>',

								'tutorials/<action:\w+>'=>array('site/article/<action>/','defaultParams'=>array('class_code'=>'tutorials',)),
								'blog/<action:\w+>'=>array('site/article/<action>/','defaultParams'=>array('class_code'=>'blog')),
								'document/<action:\w+>'=>array('site/article/<action>','defaultParams'=>array('class_code'=>'document')),
								'handbook/<action:\w+>'=>array('site/article/<action>','defaultParams'=>array('class_code'=>'handbook')),

								'group_<group_id:\d+>/tutorials/<action:\w+>'=>array('site/article/<action>/','defaultParams'=>array('class_code'=>'tutorials',)),
								'group_<group_id:\d+>/handbook/<action:\w+>'=>array('site/article/<action>/','defaultParams'=>array('class_code'=>'Handbook',)),
								'group_<group_id:\d+>/document/<action:\w+>'=>array('site/article/<action>/','defaultParams'=>array('class_code'=>'document',)),



								'tag/<tag:\w+>'=>'site/article/tag',
								'<controller:\w+>/<id:\d+>'=>'<controller>/view',
								'<controller:\w+>/<action:\w+>/<id:\d+>'=>'<controller>/<action>',
								'<controller:\w+>/<action:\w+>'=>'<controller>/<action>',

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
						'tablePrefix'=>'',
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
										'levels'=>'error, warning,trace',
								),
								// uncomment the following to show log messages on web pages

								array(
										'class'=>'CWebLogRoute',
										'levels'=>'trace'
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