/*--------------------------------用户表-----------------------------------------------------------------*/
/*删除已有表*/
DROP TABLE IF EXISTS `users`;

/*表的结构 `users`*/

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,      /*主键，唯一标识用户           */
  `workno` varchar(20) NOT NULL,             /*工号                         */
  `username` varchar(20) NOT NULL,           /*用户姓名                     */
  `password` varchar(128) NOT NULL,          /*用户密码                     */
  `email` varchar(128) NOT NULL,             /*用户邮箱地址                 */
  `phone` varchar(13) NOT NULL,              /*电话号码                     */
  `department` varchar(1000),                /*部门                         */
  `createtime` int(10) NOT NULL DEFAULT '0', /*注册时间                     */
  `status` int(1) NOT NULL DEFAULT '0',      /*0：在用，1：作废             */
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `workno` (`workno`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

/*插入测试数据，开发前期不对密码加密*/

INSERT INTO `users` (`id`, `workno`, `username`, `password`, `email`, `phone`, `department`, `createtime`, `status`) VALUES
(1, '933',   '管理员', '123456', 'admin@163.com', '18688888888', '财务部', 1333077320, 0),
(2, '934', '测试用户', '123456', 'demo@163.com', '18688888889', '人事部', 1261146096, 0);
/*-------------------------------------------------------------------------------------------------*/