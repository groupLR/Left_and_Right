<template>
	<div class="navbar-main">
		<!-- nav bar -->
		<nav>
			<ul class="member-navbar">
				<li class="member-options" @click="navigateTo('/users/edit')">
					<div>個人資訊</div>
				</li>
				<li class="member-options" @click="navigateTo('/MemberPoint')">
					<div>會員點數</div>
				</li>
				<li class="member-options" @click="navigateTo('/MemberShoppingGold')">
					<div>商店購物金</div>
				</li>
				<li class="member-options" @click="navigateTo('/MemberCoupons')">
					<div>優惠券</div>
				</li>
				<li class="member-options" @click="navigateTo('/MemberMessage')">
					<div>訊息</div>
				</li>
				<li class="member-options" @click="navigateTo('/MemberOrder')">
					<div>訂單</div>
				</li>
				<li class="member-options" @click="navigateTo('/MemberWishList')">
					<div>追蹤清單</div>
				</li>
			</ul>
		</nav>
		<!-- nav bar -->
	</div>
</template>

<script>
export default {
	methods: {
		navigateTo(route) {
			this.$router.push(route)
		},
	},
}
</script>

<style scoped>
* {
	font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
	font-size: 14px;
	color: #333333;
}
.navbar-main {
	border: 1px solid #ddd;
	max-width: 1358px;
	margin: auto;
}
/* nav bar */
.member-navbar {
	display: flex;
	background-color: rgba(204, 204, 204, 0.2);
	padding: 0;
}
.member-options {
	width: 100%;
	max-width: 100%;
	list-style-type: none;
	height: 50px;
	line-height: 50px;
	text-align: center;
	color: #33333399;
	border-left: solid 1px #ddd;
}
.member-options:first-of-type {
	border-left: none;
}

@media (max-width: 768px) {
	/* nav bar */
	.member-navbar {
		display: flex;
		background-color: #fff;
		padding: 0;
		margin: auto;
		max-width: 80%;
		overflow-x: auto; /* 開啟水平捲動 */
	}
	.member-options {
		min-width: 70px;
		list-style-type: none;
		height: 50px;
		line-height: 50px;
		text-align: center;
		color: #33333399;
		border-left: none;
		border-bottom: solid 1px #ddd;
		border-top: none;
		white-space: nowrap;
		background-color: #fff;
		margin-top: 20px;
	}
	.member-options:first-of-type {
		border-left: none;
	}
	/* nav bar */
}
</style>
