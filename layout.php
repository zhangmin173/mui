<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
	<title>pui</title>
	<!-- 全局资源 -->
	<link rel="stylesheet" href="css/global.css">
	<link rel="stylesheet" href="lib/font-awesome/4.6.3/font-awesome.css">
	<script src="lib/jquery/1.9.1/jquery.min.js"></script>
	<script src="lib/headroom/0.7.0/headroom.js"></script>
	<script src="lib/template/template.min.js"></script>
	<script src="http://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>
	<!-- 弹窗插件 -->
	<link rel="stylesheet" type="text/css" href="lib/m-pop/2.0/m-pop.css">
	<script src="lib/m-pop/2.0/m-pop.min.js"></script>
	<script src="js/global.js"></script>
</head>
<body>
	<!-- 导航 -->
	<nav id="j-nav" class="nav fixed-top">
		<a class="nav-btn nav-left" href=""><i class="fa fa-angle-left"></i></a>
		<a class="nav-btn nav-right" href=""><i class="fa fa-ellipsis-h"></i></a>
		<span class="nav-title">导航标题</span>
		<form class="nav-search">
			<input class="input" type="search" name="keyword">
			<i class="fa fa-search"></i>
		</form>
	</nav>
	<!-- 主体 -->
	<link rel="stylesheet" href="css/demo.css">
	<div id="j-main" class="container">

	</div>
	<script id="tpl-main" type="text/html">

	</script>
	<script src="js/demo.js"></script>
	<!-- 置顶 -->
	<a id="j-top" class="totop" href="javascript:;"><img src="src/top.png"></a>
	<!-- 版权 -->
	<footer id="j-copy" class="copyright">
		<a href="">钻啦网络</a>&nbsp;-&nbsp;提供技术支持
	</footer>
	<!-- 菜单 -->
	<nav id="j-menu" class="menu fixed-bottom">
		<a class="menu-btn active" href="note.php">
			<i class="iconfont icon-home"></i>
			<p>首页</p>
		</a>
		<a class="menu-btn" href="notemsg.php">
			<i class="iconfont icon-iconfontxiaoxi"></i>
			<p>消息</p>
		</a>
		<a class="menu-btn" href="notesave.php">
			<div class="menu-special">
				<img src="src/app.png" alt="">
			</div>
		</a>
		<a class="menu-btn" href="goods_detail.php">
			<i class="iconfont icon-gouwuche"></i>
			<p>购物</p>
		</a>
		<a class="menu-btn" href="noteuser.php">
			<i class="iconfont icon-wode"></i>
			<p>我</p>
		</a>
	</nav>
</body>
</html>