
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `runton`
--
CREATE DATABASE IF NOT EXISTS `runton` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `runton`;

-- --------------------------------------------------------

--
-- 表的结构 `art_stat`
--

CREATE TABLE IF NOT EXISTS `art_stat` (
  `tid` int(11) DEFAULT NULL,
  `read_num` int(11) DEFAULT NULL,
  `upvote` int(11) DEFAULT NULL,
  `devalue` int(11) DEFAULT NULL,
  KEY `tid` (`tid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `blog`
--

CREATE TABLE IF NOT EXISTS `blog` (
  `tid` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `title` varchar(80) DEFAULT NULL,
  `authorname` varchar(20) DEFAULT NULL,
  `label` varchar(100) DEFAULT NULL,
  `type` tinyint(1) DEFAULT '1',
  `loadUrl` varchar(255) DEFAULT NULL,
  `decoration` varchar(300) DEFAULT NULL,
  `htmlText` MEDIUMTEXT,
  `create_time` varchar(19) DEFAULT NULL,
  `alert_time` varchar(19) DEFAULT NULL,
  `state` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`tid`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10004 ;

--
-- 转存表中的数据 `blog`
--

INSERT INTO `blog` (`tid`, `user_id`, `title`, `authorname`, `label`, `type`, `loadUrl`, `decoration`, `htmlText`, `create_time`, `alert_time`, `state`) VALUES
(10000, 1, '大道至简：Angular2只有一个核心概念', '张东', 'HTML5,CSS', 0, '', '整体上来说，Angular2变得更加简洁，最核心的概念只剩下一个，那就是组件Component，其它所有的一切都是围绕着Component展开的。', '<p style="box-sizing: inherit; padding: 0px; margin-top: 0px; margin-bottom: 16px; font-size: 14px; white-space: normal; -webkit-tap-highlight-color: transparent; color: rgb(61, 70, 77); font-family: ', '2016-09-13 10:16:25', NULL, 2),
(10001, 1, 'Node 应用的 Systemd 启动', ' 阮一峰', 'Node.js', 0, 'http://www.ruanyifeng.com/blog/2016/03/node-systemd-tutorial.html', '如何使用 Systemd 启动一个 Node 应用。', '<p style="margin-top: 1em; margin-bottom: 0px; margin-left: 0.8em; padding: 0px; list-style-type: none; border: none; color: rgb(17, 17, 17); font-size: 1.6em; line-height: 28.8px; font-family: Georgia, serif; letter-spacing: -0.12px; white-space: normal; word-spacing: 2.4px; background-color: rgb(245, 245, 213);">前面的文章介绍了 Systemd 的<a href="http://www.ruanyifeng.com/blog/2016/03/systemd-tutorial-commands.html" target="_blank" style="margin: 0px; padding: 0px; list-style-type: none; border: none; color: rgb(17, 34, 51);">操作命令</a>和<a href="http://www.ruanyifeng.com/blog/2016/03/systemd-tutorial-part-two.html" target="_blank" style="margin: 0px; padding: 0px; list-style-type: none; border: none; color: rgb(17, 34, 51);">基本用法</a>，今天给出一个实例，如何使用 Systemd 启动一个 Node 应用。</p><p style="margin-top: 1em; margin-bottom: 0px; margin-left: 0.8em; padding: 0px; list-style-type: none; border: none; color: rgb(17, 17, 17); font-size: 1.6em; line-height: 28.8px; font-family: Georgia, serif; letter-spacing: -0.12px; white-space: normal; word-spacing: 2.4px; background-color: rgb(245, 245, 213);">本文是独立的，不需要前面的教程作为预备知识。</p><p style="margin-top: 1em; margin-bottom: 0px; margin-left: 0.8em; padding: 0px; list-style-type: none; border: none; color: rgb(17, 17, 17); font-size: 1.6em; line-height: 28.8px; font-family: Georgia, serif; letter-spacing: -0.12px; white-space: normal; word-spacing: 2.4px; background-color: rgb(245, 245, 213);"><img src="http://www.ruanyifeng.com/blogimg/asset/2016/bg2016031201.jpg?i=362820196" alt="" title=""/></p><h1 style="margin: 0.4em 0px 0.2em; padding: 0px 0px 0.2em; list-style-type: none; font-weight: 500; border-style: none none solid; border-bottom-width: 1px; border-bottom-color: rgb(211, 211, 211); font-size: 2.88em; letter-spacing: -0.03em; line-height: 72px; font-family: ', '2016-09-13 10:21:11', NULL, 2),
(10002, 1, 'JavaScript 有多灵活？', ' 阮一峰', 'JavaScript', 0, 'http://www.ruanyifeng.com/blog/2015/02/flexible-javascript.html', 'JavaScript 是一种灵活的语言，表达力极强，我来举一个例子，保证让很多人大吃一惊。', '<p style="margin-top: 1em; margin-bottom: 0px; margin-left: 0.8em; padding: 0px; list-style-type: none; border: none; color: rgb(17, 17, 17); font-size: 1.6em; line-height: 28.8px; font-family: Georgia, serif; letter-spacing: -0.12px; white-space: normal; word-spacing: 2.4px; background-color: rgb(245, 245, 213);">JavaScript 是一种灵活的语言，表达力极强，我来举一个例子，保证让很多人大吃一惊。</p><p style="margin-top: 1em; margin-bottom: 0px; margin-left: 0.8em; padding: 0px; list-style-type: none; border: none; color: rgb(17, 17, 17); font-size: 1.6em; line-height: 28.8px; font-family: Georgia, serif; letter-spacing: -0.12px; white-space: normal; word-spacing: 2.4px; background-color: rgb(245, 245, 213);">本文受到了 Kyle Simpson 的文章<a href="http://blog.getify.com/iterating-es6-numbers/" target="_blank" style="margin: 0px; padding: 0px; list-style-type: none; border: none; color: rgb(17, 34, 51);">《Iterating ES6 Numbers》</a>的启发。</p><p style="margin-top: 1em; margin-bottom: 0px; margin-left: 0.8em; padding: 0px; list-style-type: none; border: none; color: rgb(17, 17, 17); font-size: 1.6em; line-height: 28.8px; font-family: Georgia, serif; letter-spacing: -0.12px; white-space: normal; word-spacing: 2.4px; background-color: rgb(245, 245, 213);"><img src="/ueditor/php/upload/image/20160913/1473733430209995.jpg" alt="" title=""/></p><p style="margin-top: 1em; margin-bottom: 0px; margin-left: 0.8em; padding: 0px; list-style-type: none; border: none; color: rgb(17, 17, 17); font-size: 1.6em; line-height: 28.8px; font-family: Georgia, serif; letter-spacing: -0.12px; white-space: normal; word-spacing: 2.4px; background-color: rgb(245, 245, 213);">首先，在 Number.prototype 对象上，部署一个 add 方法。</p><blockquote style="margin: 2em; padding: 1em; list-style-type: none; border: 0.3em solid rgb(224, 223, 204); color: rgb(17, 17, 17); border-radius: 1em; font-family: Consolas, Monaco, ', '2016-09-13 10:24:49', NULL, 2),
(10003, 1, 'Dom树', '溪流~涓涓', 'JavaScript', 0, 'http://www.cnblogs.com/anlen/articles/3748201.html', '', '<p style="margin: 10px auto; padding: 0px; color: rgb(73, 73, 73); font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 22.4px; white-space: normal;">什么是Dom？<br/>　　　　DOM 定义了访问诸如 XML 和 XHTML 文档的标准。<br/>　　W3C 文档对象模型（DOM）是一个使程序和脚本有能力动态地访问和更新文档的内容、结构以及样式的平台和语言中立的接口。使用该接口可以轻松地访问页面中所有的标准组件。能够轻松获取和操作网页中的数据、脚本和表现层对象。　　</p><p style="margin: 10px auto; padding: 0px; color: rgb(73, 73, 73); font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 22.4px; white-space: normal;">　　Dom操作分为3个方面，即Dom Core（核心） HTML-DOM和CSS-DOM</p><p style="margin: 10px auto; padding: 0px; color: rgb(73, 73, 73); font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 22.4px; white-space: normal;">　<strong style="margin: 0px; padding: 0px;">　Dom节点：　</strong></p><p style="margin: 10px auto; padding: 0px; color: rgb(73, 73, 73); font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 22.4px; white-space: normal;">', '2016-09-13 10:38:24', NULL, 2);

-- --------------------------------------------------------

--
-- 表的结构 `custom_link`
--

CREATE TABLE IF NOT EXISTS `custom_link` (
  `user_id` int(11) DEFAULT NULL,
  `web_name` varchar(10) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `fpath` varchar(64) DEFAULT NULL,
  KEY `user_id` (`user_id`),
  KEY `user_id_2` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `custom_link`
--

INSERT INTO `custom_link` (`user_id`, `web_name`, `url`, `fpath`) VALUES
(1, 'W3school 网', 'http://www.w3school.com.cn/', 'imgs/linkImg/w3school.jpg'),
(1, '菜鸟教程 ', 'http://www.runoob.com/', 'imgs/linkImg/Runoobcom.jpg'),
(1, 'HTML5技术网', 'http://www.51html5.com/', 'imgs/linkImg/HTML5.jpg'),
(1, '花瓣', 'http://huaban.com/', 'imgs/linkImg/huaban.jpg'),
(1, 'jQuery插件库', 'http://www.jq22.com/', 'imgs/linkImg/jquery.jpg'),
(1, 'BootCDN 开放', 'http://www.bootcdn.cn/', 'imgs/linkImg/j0001.jpg'),
(1, 'less', 'http://www.bootcss.com/p/lesscss/', 'imgs/linkImg/less.jpg'),
(1, 'jQuery官方网站', 'http://jquery.com/', 'imgs/linkImg/jquery.en.jpg'),
(1, 'Google Boo', 'http://www.bootcss.com/p/google-bootstrap/', 'imgs/linkImg/g0002.jpg'),
(1, 'web安全色', 'http://www.bootcss.com/p/websafecolors/', 'imgs/linkImg/webcolor.jpg'),
(1, 'Grunt 项目构建', 'http://www.gruntjs.net/', 'imgs/linkImg/grunt0001.jpg'),
(1, 'Bootstrap ', 'http://codeguide.bootcss.com/', 'imgs/linkImg/b0002.jpg'),
(1, 'jQuery UI ', 'http://www.bootcss.com/p/jquery-ui-bootstrap/', 'imgs/linkImg/jqueryui.jpg'),
(1, 'Font Aweso', 'http://www.bootcss.com/p/font-awesome/', 'imgs/linkImg/font0001.jpg'),
(1, 'CIKONSS 1.', 'http://www.bootcss.com/p/cikonss/', 'imgs/linkImg/cikonss0001.jpg'),
(1, 'CNode 社区', 'http://cnodejs.org/', 'imgs/linkImg/node.jpg'),
(1, 'chart.js', 'http://nodeapi.ucdok.com/#/api/', 'imgs/linkImg/chart0001.jpg'),
(1, 'node.js中文网', 'http://nodejs.cn/', 'imgs/linkImg/node.zh.jpg'),
(1, 'node.js英文网', 'https://nodejs.org/en/', 'imgs/linkImg/node.js.jpg'),
(1, '易百', 'http://www.yiibai.com/nodejs/', 'imgs/linkImg/yibai.jpg'),
(1, 'three.js', 'threejs.org/', 'imgs/linkImg/three.jpg'),
(1, 'javaScript', 'http://www.javascriptcn.com/', 'imgs/linkImg/javascript_zh.jpg'),
(1, '开源中国社区', 'http://www.oschina.net/project/lang/28/javascript', 'imgs/linkImg/oschina.net.jpg'),
(1, 'regexper正则', 'https://regexper.com/', 'imgs/linkImg/regexper.jpg');

-- --------------------------------------------------------

--
-- 表的结构 `response1`
--

CREATE TABLE IF NOT EXISTS `response1` (
  `post_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `tid` int(11) DEFAULT NULL,
  `text` varchar(300) DEFAULT NULL,
  `response_id` varchar(20) DEFAULT NULL,
  `createTime` varchar(19) DEFAULT NULL,
  PRIMARY KEY (`post_id`),
  UNIQUE KEY `response_id` (`response_id`),
  KEY `user_id` (`user_id`),
  KEY `tid` (`tid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- 转存表中的数据 `response1`
--

INSERT INTO `response1` (`post_id`, `user_id`, `tid`, `text`, `response_id`, `createTime`) VALUES
(1, 1, 10000, '还不错哦。。[心]', '700001474183009', '2016-09-18 09:16:49'),
(2, 1, 10000, '[good][互相膜拜]', '100001474183470', '2016-09-18 09:24:30'),
(3, 1, 10000, '[赞]', '800001474183531', '2016-09-18 09:25:31'),
(4, 1, 10000, '[睡觉]', '600001474183541', '2016-09-18 09:25:41');

-- --------------------------------------------------------

--
-- 表的结构 `response2`
--

CREATE TABLE IF NOT EXISTS `response2` (
  `rid` int(11) NOT NULL AUTO_INCREMENT,
  `response_id` varchar(20) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `text` varchar(300) DEFAULT NULL,
  `createTime` varchar(19) DEFAULT NULL,
  PRIMARY KEY (`rid`),
  KEY `response_id` (`response_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- 转存表中的数据 `response2`
--

INSERT INTO `response2` (`rid`, `response_id`, `user_id`, `text`, `createTime`) VALUES
(1, '700001474183009', 1, '[威武] 可以。。', '2016-09-18 09:09:26'),
(2, '600001474183541', 1, '[熊猫]', '2016-09-18 12:09:44');

-- --------------------------------------------------------

--
-- 表的结构 `searchword`
--

CREATE TABLE IF NOT EXISTS `searchword` (
  `user_id` int(11) DEFAULT NULL,
  `skey` varchar(60) DEFAULT NULL,
  KEY `skey` (`skey`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `source`
--

CREATE TABLE IF NOT EXISTS `source` (
  `source_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `title` varchar(60) DEFAULT NULL,
  `type` char(1) DEFAULT NULL,
  `decoration` varchar(300) DEFAULT NULL,
  `linkUrl` varchar(255) DEFAULT NULL,
  `create_time` varchar(19) DEFAULT NULL,
  `state` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`source_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- 转存表中的数据 `source`
--

INSERT INTO `source` (`source_id`, `user_id`, `title`, `type`, `decoration`, `linkUrl`, `create_time`, `state`) VALUES
(1, 1, 'php教程', '0', 'php基础语法知识', 'www.runton.com.cn', '2016-09-18 11:09:57', 0),
(2, 1, 'node.js', '2', 'node.js 经典案例', 'www.runton.com.cn', '2016-09-18 11:09:16', 0);

-- --------------------------------------------------------

--
-- 表的结构 `users`
--

CREATE TABLE IF NOT EXISTS `users` (
	`user_id` INT AUTO_INCREMENT,
	`username` varchar(16) UNIQUE,
	`passwd` varchar(12),
	`user_pic` varchar(45) default 'imgs/userImg/20131014171810879_ZG9YJ8V_03.png',
	`name` varchar(8) default null,
	`sex`  char(1) default '1',
	`birth` varchar(10) default null,
	`email` varchar(45) default null,
	`tel` varchar(11) default null,
	`question` varchar(1) default null,
	`answer` varchar(20) default null,
	`reg_time` varchar(19),
	PRIMARY KEY (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `users`
--

INSERT INTO `users` (`user_id`, `username`, `passwd`, `user_pic`, `name`,`sex`,`birth`,`email`,`tel`,`question`, `answer`, `reg_time`) VALUES
(1, 'myutopia','123456','imgs/userImg/img13456584481.png','bing','1','1990-02-29','158257452@qq.com','186xxxx7416','0','安庆','2016-08-31 09:17:30');

-- --------------------------------------------------------

--
-- 表的结构 `user_assoc`
--

CREATE TABLE IF NOT EXISTS `user_assoc` (
  `user_id` int(11) DEFAULT NULL,
  `assoc_id` int(11) DEFAULT NULL,
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 限制导出的表
--

--
-- 限制表 `art_stat`
--
ALTER TABLE `art_stat`
  ADD CONSTRAINT `art_stat_ys` FOREIGN KEY (`tid`) REFERENCES `blog` (`tid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 限制表 `blog`
--
ALTER TABLE `blog`
  ADD CONSTRAINT `blog_ys` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 限制表 `custom_link`
--
ALTER TABLE `custom_link`
  ADD CONSTRAINT `custom_link_ys` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 限制表 `response1`
--
ALTER TABLE `response1`
  ADD CONSTRAINT `response1_ys1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `response1_ys2` FOREIGN KEY (`tid`) REFERENCES `blog` (`tid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 限制表 `response2`
--
ALTER TABLE `response2`
  ADD CONSTRAINT `response2_ys1` FOREIGN KEY (`response_id`) REFERENCES `response1` (`response_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `response2_ys2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 限制表 `searchword`
--
ALTER TABLE `searchword`
  ADD CONSTRAINT `searchWord_ys` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 限制表 `source`
--
ALTER TABLE `source`
  ADD CONSTRAINT `source_ys` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 限制表 `user_assoc`
--
ALTER TABLE `user_assoc`
  ADD CONSTRAINT `user_assoc_ys` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
