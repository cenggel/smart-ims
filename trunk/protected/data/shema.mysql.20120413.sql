-- MySQL Administrator dump 1.4
--
-- ------------------------------------------------------
-- Server version	5.1.36-community-log


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


--
-- Create schema smart_ims
--

CREATE DATABASE IF NOT EXISTS smart_ims;
USE smart_ims;

--
-- Definition of table `article`
--

DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) NOT NULL DEFAULT '0',
  `title` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `content` text NOT NULL,
  `tags` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `essential` int(11) DEFAULT NULL,
  `article_date` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `create_date` int(11) DEFAULT NULL,
  `update_date` int(11) DEFAULT NULL,
  `update_user` int(11) DEFAULT NULL,
  `views` int(11) DEFAULT '0',
  `class_code` varchar(45) DEFAULT '',
  `image_path` varchar(255) DEFAULT NULL,
  `file_path` varchar(255) DEFAULT NULL,
  `hash` varchar(64) DEFAULT NULL,
  `group_id` int(11) DEFAULT '0',
  `alias` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `article`
--

/*!40000 ALTER TABLE `article` DISABLE KEYS */;
INSERT INTO `article` (`id`,`category_id`,`title`,`description`,`content`,`tags`,`status`,`essential`,`article_date`,`user_id`,`create_date`,`update_date`,`update_user`,`views`,`class_code`,`image_path`,`file_path`,`hash`,`group_id`,`alias`) VALUES 
 (7,1,'私有文章测试','','<div>私有文章测试</div>','',3,NULL,NULL,2,1334025625,1334025625,2,4,'tutorials',NULL,NULL,'',1,NULL),
 (4,1,'如何添加教程','','<div>进入工作组后点击教程，在右边栏中有添加教程按钮</div>\r\n<div>\r\n<div>进入工作组后点击教程，在右边栏中有添加教程按钮\r\n<div>进入工作组后点击教程，在右边栏中有添加教程按钮</div>\r\n</div>\r\n</div>','教程',2,NULL,NULL,1,1333808807,1334132513,1,17,'tutorials',NULL,NULL,'',1,NULL),
 (5,0,'test','','<div>test</div>','test',1,NULL,NULL,1,1333897565,1333897565,1,0,'tutorials',NULL,NULL,'',1,NULL),
 (6,3,'demo test','','<div>demo test</div>','',1,NULL,NULL,2,1333962475,1333962475,2,0,'document',NULL,'','',1,NULL),
 (8,3,'ddd','','<div>ddd</div>','',2,NULL,NULL,1,1334200662,1334200662,1,0,'document',NULL,'','',1,NULL),
 (9,3,'ddd','','<div>ddd</div>','',2,NULL,NULL,1,1334200713,1334200713,1,0,'document',NULL,'','',1,NULL);
/*!40000 ALTER TABLE `article` ENABLE KEYS */;


--
-- Definition of table `attachment`
--

DROP TABLE IF EXISTS `attachment`;
CREATE TABLE `attachment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item_id` int(11) DEFAULT NULL,
  `title` varchar(200) DEFAULT NULL,
  `description` text,
  `class_code` varchar(45) DEFAULT NULL,
  `file_path` varchar(255) NOT NULL,
  `file_type` varchar(45) DEFAULT NULL,
  `isImage` tinyint(4) DEFAULT NULL,
  `create_date` int(11) DEFAULT NULL,
  `update_date` int(11) DEFAULT NULL,
  `create_user` int(11) DEFAULT NULL,
  `update_user` int(11) DEFAULT NULL,
  `file_size` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `attachment`
--

/*!40000 ALTER TABLE `attachment` DISABLE KEYS */;
/*!40000 ALTER TABLE `attachment` ENABLE KEYS */;


--
-- Definition of table `authassignment`
--

DROP TABLE IF EXISTS `authassignment`;
CREATE TABLE `authassignment` (
  `itemname` varchar(64) NOT NULL,
  `userid` varchar(64) NOT NULL,
  `bizrule` text,
  `data` text,
  PRIMARY KEY (`itemname`,`userid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `authassignment`
--

/*!40000 ALTER TABLE `authassignment` DISABLE KEYS */;
INSERT INTO `authassignment` (`itemname`,`userid`,`bizrule`,`data`) VALUES 
 ('Admin','1',NULL,'N;'),
 ('Authenticated','2',NULL,'N;');
/*!40000 ALTER TABLE `authassignment` ENABLE KEYS */;


--
-- Definition of table `authitem`
--

DROP TABLE IF EXISTS `authitem`;
CREATE TABLE `authitem` (
  `name` varchar(64) NOT NULL,
  `type` int(11) NOT NULL,
  `description` text,
  `bizrule` text,
  `data` text,
  PRIMARY KEY (`name`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `authitem`
--

/*!40000 ALTER TABLE `authitem` DISABLE KEYS */;
INSERT INTO `authitem` (`name`,`type`,`description`,`bizrule`,`data`) VALUES 
 ('Admin',2,'系统管理员权限',NULL,'N;'),
 ('Authenticated',2,NULL,NULL,'N;'),
 ('Guest',2,NULL,NULL,'N;'),
 ('Cal.Cron.*',1,NULL,NULL,'N;'),
 ('Cal.Main.*',1,NULL,NULL,'N;'),
 ('Site.Article.*',1,NULL,NULL,'N;'),
 ('Site.Attachment.*',1,NULL,NULL,'N;'),
 ('Site.Category.*',1,NULL,NULL,'N;'),
 ('Site.Comment.*',1,NULL,NULL,'N;'),
 ('Site.DefaultCont.*',1,NULL,NULL,'N;'),
 ('Site.Default.*',1,NULL,NULL,'N;'),
 ('Site.Groups.*',1,NULL,NULL,'N;'),
 ('Site.Home.*',1,NULL,NULL,'N;'),
 ('Site.Member.*',1,NULL,NULL,'N;'),
 ('Site.Settings.*',1,NULL,NULL,'N;'),
 ('User.Activation.*',1,NULL,NULL,'N;'),
 ('User.Admin.*',1,NULL,NULL,'N;'),
 ('User.Default.*',1,NULL,NULL,'N;'),
 ('User.Login.*',1,NULL,NULL,'N;'),
 ('User.Logout.*',1,NULL,NULL,'N;'),
 ('User.Profile.*',1,NULL,NULL,'N;'),
 ('User.ProfileField.*',1,NULL,NULL,'N;'),
 ('User.Recovery.*',1,NULL,NULL,'N;'),
 ('User.Registration.*',1,NULL,NULL,'N;'),
 ('User.User.*',1,NULL,NULL,'N;'),
 ('Cal.Cron.Index',0,NULL,NULL,'N;'),
 ('Cal.Main.Browse',0,NULL,NULL,'N;'),
 ('Cal.Main.List',0,NULL,NULL,'N;'),
 ('Cal.Main.Update',0,NULL,NULL,'N;'),
 ('Cal.Main.Move',0,NULL,NULL,'N;'),
 ('Cal.Main.Resize',0,NULL,NULL,'N;'),
 ('Cal.Main.CreateHelper',0,NULL,NULL,'N;'),
 ('Cal.Main.RemoveHelper',0,NULL,NULL,'N;'),
 ('Cal.Main.Userpreference',0,NULL,NULL,'N;'),
 ('Site.Article.View',0,NULL,NULL,'N;'),
 ('Site.Article.Create',0,NULL,NULL,'N;'),
 ('Site.Article.Update',0,'更新文章','return Yii::app()->user->id == $params[\'article\']->user_id;','N;'),
 ('Site.Article.Delete',0,'删除文章','Yii::app()->user->id == $data[\'article\']->user_id','N;'),
 ('Site.Article.Index',0,NULL,NULL,'N;'),
 ('Site.Article.Admin',0,NULL,NULL,'N;'),
 ('Site.Attachment.View',0,NULL,NULL,'N;'),
 ('Site.Attachment.Create',0,NULL,NULL,'N;'),
 ('Site.Attachment.Update',0,NULL,NULL,'N;'),
 ('Site.Attachment.Delete',0,NULL,NULL,'N;'),
 ('Site.Attachment.Index',0,NULL,NULL,'N;'),
 ('Site.Attachment.Admin',0,NULL,NULL,'N;'),
 ('Site.Category.View',0,NULL,NULL,'N;'),
 ('Site.Category.Create',0,NULL,NULL,'N;'),
 ('Site.Category.Update',0,NULL,NULL,'N;'),
 ('Site.Category.Delete',0,NULL,NULL,'N;'),
 ('Site.Category.Index',0,NULL,NULL,'N;'),
 ('Site.Category.Admin',0,NULL,NULL,'N;'),
 ('Site.Comment.View',0,NULL,NULL,'N;'),
 ('Site.Comment.Create',0,NULL,NULL,'N;'),
 ('Site.Comment.Update',0,NULL,NULL,'N;'),
 ('Site.Comment.Delete',0,NULL,NULL,'N;'),
 ('Site.Comment.Index',0,NULL,NULL,'N;'),
 ('Site.Comment.Admin',0,NULL,NULL,'N;'),
 ('Site.DefaultCont.Index',0,NULL,NULL,'N;'),
 ('Site.Default.Index',0,NULL,NULL,'N;'),
 ('Site.Groups.View',0,NULL,NULL,'N;'),
 ('Site.Groups.Create',0,NULL,NULL,'N;'),
 ('Site.Groups.Update',0,NULL,NULL,'N;'),
 ('Site.Groups.Delete',0,NULL,NULL,'N;'),
 ('Site.Groups.Index',0,NULL,NULL,'N;'),
 ('Site.Groups.Admin',0,NULL,NULL,'N;'),
 ('Site.Groups.Home',0,NULL,NULL,'N;'),
 ('Site.Home.Index',0,NULL,NULL,'N;'),
 ('Site.Home.Error',0,NULL,NULL,'N;'),
 ('Site.Home.Contact',0,NULL,NULL,'N;'),
 ('Site.Home.Login',0,NULL,NULL,'N;'),
 ('Site.Home.Logout',0,NULL,NULL,'N;'),
 ('Site.Home.Workframe',0,NULL,NULL,'N;'),
 ('Site.Member.Index',0,NULL,NULL,'N;'),
 ('Site.Member.Home',0,NULL,NULL,'N;'),
 ('Site.Settings.Index',0,NULL,NULL,'N;'),
 ('User.Activation.Activation',0,NULL,NULL,'N;'),
 ('User.Admin.Admin',0,NULL,NULL,'N;'),
 ('User.Admin.View',0,NULL,NULL,'N;'),
 ('User.Admin.Create',0,NULL,NULL,'N;'),
 ('User.Admin.Update',0,NULL,NULL,'N;'),
 ('User.Admin.Delete',0,NULL,NULL,'N;'),
 ('User.Default.Index',0,NULL,NULL,'N;'),
 ('User.Login.Login',0,NULL,NULL,'N;'),
 ('User.Logout.Logout',0,NULL,NULL,'N;'),
 ('User.Profile.Profile',0,NULL,NULL,'N;'),
 ('User.Profile.Edit',0,NULL,NULL,'N;'),
 ('User.Profile.Changepassword',0,NULL,NULL,'N;'),
 ('User.ProfileField.View',0,NULL,NULL,'N;'),
 ('User.ProfileField.Create',0,NULL,NULL,'N;'),
 ('User.ProfileField.Update',0,NULL,NULL,'N;'),
 ('User.ProfileField.Delete',0,NULL,NULL,'N;'),
 ('User.ProfileField.Admin',0,NULL,NULL,'N;'),
 ('User.Recovery.Recovery',0,NULL,NULL,'N;'),
 ('User.Registration.Registration',0,NULL,NULL,'N;'),
 ('User.User.View',0,NULL,NULL,'N;'),
 ('User.User.Index',0,NULL,NULL,'N;');
/*!40000 ALTER TABLE `authitem` ENABLE KEYS */;


--
-- Definition of table `authitemchild`
--

DROP TABLE IF EXISTS `authitemchild`;
CREATE TABLE `authitemchild` (
  `parent` varchar(64) NOT NULL,
  `child` varchar(64) NOT NULL,
  PRIMARY KEY (`parent`,`child`),
  KEY `child` (`child`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `authitemchild`
--

/*!40000 ALTER TABLE `authitemchild` DISABLE KEYS */;
INSERT INTO `authitemchild` (`parent`,`child`) VALUES 
 ('Authenticated','Site.Article.*'),
 ('Authenticated','Site.Attachment.*'),
 ('Authenticated','Site.Category.*'),
 ('Authenticated','Site.Comment.*'),
 ('Authenticated','Site.Groups.*'),
 ('Authenticated','Site.Home.*'),
 ('Authenticated','Site.Member.*'),
 ('Authenticated','User.Login.*'),
 ('Authenticated','User.Logout.*'),
 ('Authenticated','User.Profile.*'),
 ('Authenticated','User.Recovery.*'),
 ('Site.Article.*','Site.Article.Admin'),
 ('Site.Article.*','Site.Article.Create'),
 ('Site.Article.*','Site.Article.Delete'),
 ('Site.Article.*','Site.Article.Update'),
 ('Site.Article.*','Site.Article.View'),
 ('Site.Groups.*','Site.Groups.Index'),
 ('Site.Groups.*','Site.Groups.View');
/*!40000 ALTER TABLE `authitemchild` ENABLE KEYS */;


--
-- Definition of table `category`
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `alias` varchar(45) DEFAULT NULL,
  `class_code` varchar(45) DEFAULT NULL,
  `description` text,
  `parent_id` int(11) NOT NULL DEFAULT '0',
  `display_order` int(11) DEFAULT NULL,
  `create_user` int(11) DEFAULT NULL,
  `views` int(11) DEFAULT '0',
  `group_id` int(11) DEFAULT NULL,
  `create_date` int(11) DEFAULT NULL,
  `update_date` int(11) DEFAULT NULL,
  `update_user` int(11) DEFAULT NULL,
  `category_type` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `category`
--

/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` (`id`,`name`,`alias`,`class_code`,`description`,`parent_id`,`display_order`,`create_user`,`views`,`group_id`,`create_date`,`update_date`,`update_user`,`category_type`) VALUES 
 (1,'默认分类',NULL,'tutorials',NULL,0,0,NULL,NULL,NULL,NULL,NULL,NULL,1),
 (2,'默认分类',NULL,'blog',NULL,0,0,NULL,NULL,NULL,NULL,NULL,NULL,1),
 (3,'默认分类',NULL,'document',NULL,0,0,NULL,NULL,NULL,NULL,NULL,NULL,1),
 (4,'重要通知',NULL,'notice','',0,NULL,1,0,1,1334111361,1334111361,NULL,0),
 (5,'测试',NULL,'notice','',0,NULL,1,0,1,1334111992,1334111992,NULL,0),
 (6,'测试',NULL,'notice','',0,NULL,1,0,1,1334112035,1334112035,NULL,0),
 (7,'test',NULL,'notice','',5,NULL,1,0,1,1334127539,1334127539,NULL,0);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;


--
-- Definition of table `comment`
--

DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) DEFAULT NULL,
  `content` varchar(45) NOT NULL,
  `status` int(11) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `url` varchar(100) DEFAULT NULL,
  `author_id` int(11) DEFAULT NULL,
  `item_id` int(11) DEFAULT NULL,
  `class_code` varchar(45) DEFAULT NULL,
  `author_name` varchar(30) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `comment`
--

/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;


--
-- Definition of table `enumeration`
--

DROP TABLE IF EXISTS `enumeration`;
CREATE TABLE `enumeration` (
  `name` varchar(100) NOT NULL,
  `code` varchar(45) NOT NULL,
  `type` varchar(45) NOT NULL,
  `position` int(11) DEFAULT NULL,
  PRIMARY KEY (`code`,`type`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `enumeration`
--

/*!40000 ALTER TABLE `enumeration` DISABLE KEYS */;
INSERT INTO `enumeration` (`name`,`code`,`type`,`position`) VALUES 
 ('草稿','1','ARTICLE_STATUS',2),
 ('发布','2','ARTICLE_STATUS',1),
 ('私有','3','ARTICLE_STATUS',3),
 ('教程','tutorials','ARTICLE_CLASS',3),
 ('日志','blog','ARTICLE_CLASS',4),
 ('文档','document','ARTICLE_CLASS',2),
 ('通知','notice','ARTICLE_CLASS',1),
 ('手册','handbook','ARTICLE_CLASS',5);
/*!40000 ALTER TABLE `enumeration` ENABLE KEYS */;


--
-- Definition of table `events`
--

DROP TABLE IF EXISTS `events`;
CREATE TABLE `events` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `title` varchar(1000) DEFAULT NULL,
  `allDay` smallint(5) unsigned NOT NULL DEFAULT '0',
  `start` int(10) unsigned DEFAULT NULL,
  `end` int(10) unsigned DEFAULT NULL,
  `editable` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `events`
--

/*!40000 ALTER TABLE `events` DISABLE KEYS */;
/*!40000 ALTER TABLE `events` ENABLE KEYS */;


--
-- Definition of table `events_helper`
--

DROP TABLE IF EXISTS `events_helper`;
CREATE TABLE `events_helper` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `title` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `events_helper`
--

/*!40000 ALTER TABLE `events_helper` DISABLE KEYS */;
INSERT INTO `events_helper` (`id`,`user_id`,`title`) VALUES 
 (1,1,'test event 1'),
 (2,1,'test event 2');
/*!40000 ALTER TABLE `events_helper` ENABLE KEYS */;


--
-- Definition of table `events_user_preference`
--

DROP TABLE IF EXISTS `events_user_preference`;
CREATE TABLE `events_user_preference` (
  `user_id` int(10) unsigned NOT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `mobile_alert` tinyint(1) NOT NULL DEFAULT '0',
  `email` varchar(40) DEFAULT NULL,
  `email_alert` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `events_user_preference`
--

/*!40000 ALTER TABLE `events_user_preference` DISABLE KEYS */;
INSERT INTO `events_user_preference` (`user_id`,`mobile`,`mobile_alert`,`email`,`email_alert`) VALUES 
 (1,NULL,0,NULL,0),
 (2,NULL,0,NULL,0);
/*!40000 ALTER TABLE `events_user_preference` ENABLE KEYS */;


--
-- Definition of table `group_members`
--

DROP TABLE IF EXISTS `group_members`;
CREATE TABLE `group_members` (
  `users_id` int(11) NOT NULL,
  `groups_id` int(11) NOT NULL,
  `administrator` int(11) DEFAULT '0',
  PRIMARY KEY (`users_id`,`groups_id`),
  UNIQUE KEY `fk_group_members_groups1` (`groups_id`,`users_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `group_members`
--

/*!40000 ALTER TABLE `group_members` DISABLE KEYS */;
INSERT INTO `group_members` (`users_id`,`groups_id`,`administrator`) VALUES 
 (1,2,0),
 (1,3,0),
 (1,1,0),
 (2,1,0),
 (1,4,0),
 (2,5,0),
 (1,5,0),
 (1,6,0),
 (2,2,0);
/*!40000 ALTER TABLE `group_members` ENABLE KEYS */;


--
-- Definition of table `groups`
--

DROP TABLE IF EXISTS `groups`;
CREATE TABLE `groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_name` varchar(45) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `create_user` int(11) DEFAULT NULL,
  `create_date` int(11) DEFAULT NULL,
  `views` int(11) DEFAULT '0',
  `image` varchar(255) DEFAULT NULL,
  `status` int(10) unsigned DEFAULT NULL,
  `alias` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `groups`
--

/*!40000 ALTER TABLE `groups` DISABLE KEYS */;
INSERT INTO `groups` (`id`,`group_name`,`description`,`create_user`,`create_date`,`views`,`image`,`status`,`alias`) VALUES 
 (1,'CRM组','<div>CRM 相关资源在这里添加</div>',1,1332687373,0,NULL,NULL,NULL),
 (2,'帐管','<div>sssssssssss</div>',1,1332733495,0,NULL,NULL,NULL),
 (3,'计费','',1,1332917265,0,NULL,NULL,NULL),
 (4,'测试群','',1,1333614939,0,NULL,NULL,NULL),
 (5,'测试1','<div>dd</div>',1,1333615070,0,NULL,NULL,NULL),
 (6,'测试','',1,1333617271,0,NULL,NULL,NULL);
/*!40000 ALTER TABLE `groups` ENABLE KEYS */;


--
-- Definition of table `profiles`
--

DROP TABLE IF EXISTS `profiles`;
CREATE TABLE `profiles` (
  `user_id` int(11) NOT NULL,
  `lastname` varchar(50) NOT NULL DEFAULT '',
  `firstname` varchar(50) NOT NULL DEFAULT '',
  `birthday` date NOT NULL DEFAULT '0000-00-00',
  `depart` int(10) NOT NULL DEFAULT '0',
  `image` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `profiles`
--

/*!40000 ALTER TABLE `profiles` DISABLE KEYS */;
INSERT INTO `profiles` (`user_id`,`lastname`,`firstname`,`birthday`,`depart`,`image`) VALUES 
 (1,'Admin','Administrator','0000-00-00',1,'uploads/usericon/Penguins.jpg'),
 (2,'Demo','Demo','0000-00-00',0,'');
/*!40000 ALTER TABLE `profiles` ENABLE KEYS */;


--
-- Definition of table `profiles_fields`
--

DROP TABLE IF EXISTS `profiles_fields`;
CREATE TABLE `profiles_fields` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `varname` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `field_type` varchar(50) NOT NULL,
  `field_size` int(3) NOT NULL DEFAULT '0',
  `field_size_min` int(3) NOT NULL DEFAULT '0',
  `required` int(1) NOT NULL DEFAULT '0',
  `match` varchar(255) NOT NULL DEFAULT '',
  `range` varchar(255) NOT NULL DEFAULT '',
  `error_message` varchar(255) NOT NULL DEFAULT '',
  `other_validator` varchar(5000) NOT NULL DEFAULT '',
  `default` varchar(255) NOT NULL DEFAULT '',
  `widget` varchar(255) NOT NULL DEFAULT '',
  `widgetparams` varchar(5000) NOT NULL DEFAULT '',
  `position` int(3) NOT NULL DEFAULT '0',
  `visible` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `varname` (`varname`,`widget`,`visible`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `profiles_fields`
--

/*!40000 ALTER TABLE `profiles_fields` DISABLE KEYS */;
INSERT INTO `profiles_fields` (`id`,`varname`,`title`,`field_type`,`field_size`,`field_size_min`,`required`,`match`,`range`,`error_message`,`other_validator`,`default`,`widget`,`widgetparams`,`position`,`visible`) VALUES 
 (1,'lastname','Last name','VARCHAR',50,3,1,'','','Incorrect Last Name (length between 3 and 50 characters).','','','','',1,3),
 (2,'firstname','First name','VARCHAR',50,3,1,'','','Incorrect First Name (length between 3 and 50 characters).','','','','',0,3),
 (3,'birthday','Birthday','DATE',0,0,2,'','','','','0000-00-00','UWjuidate','{\"ui-theme\":\"redmond\"}',3,2),
 (4,'depart','Depart','INTEGER',10,0,0,'','1==营业;2==帐务;3==计费;4==开发','','','0','','',0,2),
 (6,'image','头像','VARCHAR',255,0,2,'','','头像不正确','','','UWfile','{\"path\":\"uploads/usericon\"}',10,3);
/*!40000 ALTER TABLE `profiles_fields` ENABLE KEYS */;


--
-- Definition of table `rights`
--

DROP TABLE IF EXISTS `rights`;
CREATE TABLE `rights` (
  `itemname` varchar(64) NOT NULL,
  `type` int(11) NOT NULL,
  `weight` int(11) NOT NULL,
  PRIMARY KEY (`itemname`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `rights`
--

/*!40000 ALTER TABLE `rights` DISABLE KEYS */;
/*!40000 ALTER TABLE `rights` ENABLE KEYS */;


--
-- Definition of table `settings`
--

DROP TABLE IF EXISTS `settings`;
CREATE TABLE `settings` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `title` varchar(125) NOT NULL DEFAULT '',
  `description` text,
  `category` int(10) NOT NULL DEFAULT '0',
  `type` char(30) NOT NULL DEFAULT 'text',
  `settingkey` varchar(125) NOT NULL DEFAULT '',
  `default_value` text,
  `value` text,
  `extra` text,
  `php` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `settingkey` (`settingkey`),
  KEY `title` (`title`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `settings`
--

/*!40000 ALTER TABLE `settings` DISABLE KEYS */;
/*!40000 ALTER TABLE `settings` ENABLE KEYS */;


--
-- Definition of table `tags`
--

DROP TABLE IF EXISTS `tags`;
CREATE TABLE `tags` (
  `name` varchar(30) NOT NULL,
  `frequency` int(11) DEFAULT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tags`
--

/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
INSERT INTO `tags` (`name`,`frequency`) VALUES 
 ('test',2),
 ('教程',1);
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;


--
-- Definition of table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(128) NOT NULL,
  `email` varchar(128) NOT NULL,
  `activkey` varchar(128) NOT NULL DEFAULT '',
  `createtime` int(10) NOT NULL DEFAULT '0',
  `lastvisit` int(10) NOT NULL DEFAULT '0',
  `superuser` int(1) NOT NULL DEFAULT '0',
  `status` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `status` (`status`),
  KEY `superuser` (`superuser`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`,`username`,`password`,`email`,`activkey`,`createtime`,`lastvisit`,`superuser`,`status`) VALUES 
 (1,'admin','21232f297a57a5a743894a0e4a801fc3','webmaster@example.com','9a24eff8c15a6a141ece27eb6947da0f',1261146094,1334330142,1,1),
 (2,'demo','fe01ce2a7fbac8fafaed7c982a04e229','demo@example.com','099f825543f7850cc038b90aaff39fac',1261146096,1334024847,0,1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;




/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
