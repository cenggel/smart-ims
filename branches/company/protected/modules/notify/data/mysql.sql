--
-- 表的结构 `notify`
--

CREATE TABLE IF NOT EXISTS `notify` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `owner_class` varchar(100) NOT NULL,
  `notify_class` varchar(45) NOT NULL,
  `notify_event` varchar(45) DEFAULT NULL,
  `notify_type` int(11) DEFAULT NULL,
  `title` varchar(200) DEFAULT NULL,
  `summary` text,
  `item_id` varchar(45) DEFAULT NULL,
  `user_id` varchar(45) NOT NULL,
  `status` int(11) DEFAULT '0' COMMENT '0:unread  1:read',
  `params` text,
  `url` varchar(255) DEFAULT NULL,
  `create_user` int(11) DEFAULT NULL,
  `create_date` int(11) DEFAULT NULL,
  `read_date` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8  ;
