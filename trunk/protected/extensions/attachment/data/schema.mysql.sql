DROP TABLE IF EXISTS `attachment`;
CREATE TABLE  `attachment` (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;