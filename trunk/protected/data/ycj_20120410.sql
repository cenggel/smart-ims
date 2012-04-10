/*--------------------------------�û���-----------------------------------------------------------------*/
/*ɾ�����б�*/
DROP TABLE IF EXISTS `users`;

/*��Ľṹ `users`*/

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,      /*������Ψһ��ʶ�û�           */
  `workno` varchar(20) NOT NULL,             /*����                         */
  `username` varchar(20) NOT NULL,           /*�û�����                     */
  `password` varchar(128) NOT NULL,          /*�û�����                     */
  `email` varchar(128) NOT NULL,             /*�û������ַ                 */
  `phone` varchar(13) NOT NULL,              /*�绰����                     */
  `department` varchar(1000),                /*����                         */
  `createtime` int(10) NOT NULL DEFAULT '0', /*ע��ʱ��                     */
  `status` int(1) NOT NULL DEFAULT '0',      /*0�����ã�1������             */
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `workno` (`workno`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

/*����������ݣ�����ǰ�ڲ����������*/

INSERT INTO `users` (`id`, `workno`, `username`, `password`, `email`, `phone`, `department`, `createtime`, `status`) VALUES
(1, '933',   '����Ա', '123456', 'admin@163.com', '18688888888', '����', 1333077320, 0),
(2, '934', '�����û�', '123456', 'demo@163.com', '18688888889', '���²�', 1261146096, 0);
/*-------------------------------------------------------------------------------------------------*/