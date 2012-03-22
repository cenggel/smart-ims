<?php

// change the following paths if necessary
$yii=dirname(__FILE__).'/../yii/yii-1.1.10/framework/yii.php';
$config=dirname(__FILE__).'/protected/config/admin.php';

// remove the following lines when in production mode
defined('YII_DEBUG') or define('YII_DEBUG',true);
// specify how many levels of call stack should be shown in each log message
defined('YII_TRACE_LEVEL') or define('YII_TRACE_LEVEL',3);

defined('ADMIN_PAGE') or define('ADMIN_PAGE',true);
require_once($yii);
Yii::createWebApplication($config)->run();
