<template>
	<SignOut/>
	<MemberNavbar />
	<section class="memberPointsMain">
		<div class="memberContent">
			<!-- 點數記錄開始 -->
			<div class="pointsRecord">
				<img
					src="https://static.shoplineapp.com/web/v1/img/member_center_circle_dollar.svg"
				/>
				點數記錄
			</div>
			<div class="currentPointsBoard">
				<div class="currentGold">
					<p class="my-[4px]">現有購物金</p>
					<p class="my-[4px]"><span class="text-3xl">0</span>點</p>
				</div>
			</div>
			<!-- 點數記錄結束 -->
			<div class="memberRecordList">
				<img
					src="https://static.shoplineapp.com/web/v1/img/member_center_list_empty.png"
					alt=""
				/>
				<p>沒有任何紀錄</p>
				<p>結帳累積購物金獲得更多優惠</p>
				<button class="goShopping">馬上逛逛</button>
			</div>
		</div>
	</section>
</template>

<script setup>
import MemberNavbar from "../components/MemberNavbar.vue"
import SignOut from "@/components/SignOut.vue";
</script>

<style scoped>
* {
	font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
	font-size: 14px;
	color: #333333;
}

.memberPointsMain {
	margin: auto;
	max-width: 1358px;
	border: 1px solid #ddd;
	border-top: 1px solid #fff;
}

.memberContent {
	margin-top: 20px;
	padding: 0 40px;
	padding-bottom: 20px;
}
.pointsRecord {
	padding-bottom: 28px;
	line-height: 25px;
	display: flex;
}
.pointsRecord img {
	margin-right: 16px;
}
.currentPointsBoard {
	padding: 16px 16px 16px 168px;
	display: flex;
	background-color: #f8f8f8;
	margin-bottom: 28px;
	background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDciIGhlaWdodD0iMTA1IiB2aWV3Qm94PSIwIDAgMTA3IDEwNSIgZmlsbD0ibm9uZSI+CiAgPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMDYuMjQgMTIuMjA5M0MxMDUuNzM1IDExLjE4ODggMTA0LjQ3MiAxMC45MzM3IDEwMy40NjIgMTEuNDQ0TDkyLjM1MDEgMTcuNTY2NkM5MS4zMzk5IDE4LjA3NjkgOTEuMDg3NCAxOS4zNTI0IDkxLjU5MjQgMjAuMzcyOUM5Mi4wOTc1IDIxLjM5MzMgOTMuMzYwMyAyMS42NDg0IDk0LjM3MDQgMjEuMTM4MkwxMDUuNDgyIDE1LjAxNTVDMTA2LjQ5MyAxNC41MDUzIDEwNi43NDUgMTMuMjI5NyAxMDYuMjQgMTIuMjA5M1oiIGZpbGw9IiNFRkVGRUYiLz4KICA8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTEwMi40NTIgMzEuODUzNEw5NC4xMTc5IDI5LjMwMjNDOTIuODU1MiAyOS4wNDcyIDkxLjg0NSAyOS44MTI1IDkxLjU5MjUgMzEuMDg4MUM5MS4zMzk5IDMyLjM2MzYgOTEuODQ1IDMzLjg5NDMgOTMuMTA3OCAzNC4xNDk0TDEwMS40NDIgMzYuNzAwNUMxMDIuNzA0IDM2Ljk1NTcgMTAzLjcxNSAzNi4xOTAzIDEwMy45NjcgMzQuOTE0OEMxMDQuMjIgMzMuNjM5MiAxMDMuNDYyIDMyLjEwODUgMTAyLjQ1MiAzMS44NTM0WiIgZmlsbD0iI0VGRUZFRiIvPgogIDxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNzkuOTc1NCAxMy43NDA0QzgwLjczMyAxMy45OTU1IDgxLjc0MzIgMTMuNDg1MyA4MS45OTU3IDEyLjIwOTdMODMuNzYzNSAzLjc5MTA0Qzg0LjAxNjEgMi41MTU0OSA4My41MTEgMS40OTUwNCA4Mi41MDA4IDEuMjM5OTNDODEuNzQzMiAwLjk4NDgxNCA4MC43MzMgMS40OTUwNCA4MC40ODA1IDIuNzcwNkw3OC43MTI3IDEwLjkzNDJDNzguNDYwMSAxMi4yMDk3IDc4Ljk2NTIgMTMuNDg1MyA3OS45NzU0IDEzLjc0MDRaIiBmaWxsPSIjRUZFRkVGIi8+CiAgPHBhdGggZD0iTTc0LjkyNDYgNTIuMDA2N0M2NC41NzAzIDUyLjAwNjcgNTUuOTgzOCA2MC42ODA1IDU1Ljk4MzggNzEuMTQwMUM1NS45ODM4IDgxLjU5OTcgNjQuNTcwMyA5MC4yNzM1IDc0LjkyNDYgOTAuMjczNUM4NS4yNzg5IDkwLjI3MzUgOTMuODY1MyA4MS41OTk3IDkzLjg2NTMgNzEuMTQwMUM5My44NjUzIDYwLjY4MDUgODUuMjc4OSA1Mi4wMDY3IDc0LjkyNDYgNTIuMDA2N1pNNzQuOTI0NiA4Ni43MDE5QzY2LjMzODEgODYuNzAxOSA1OS41MTk0IDc5LjgxMzkgNTkuNTE5NCA3MS4xNDAxQzU5LjUxOTQgNjIuNDY2MyA2Ni4zMzgxIDU1LjU3ODMgNzQuOTI0NiA1NS41NzgzQzgzLjUxMTEgNTUuNTc4MyA5MC4zMjk3IDYyLjQ2NjMgOTAuMzI5NyA3MS4xNDAxQzkwLjMyOTcgNzkuODEzOSA4My41MTExIDg2LjcwMTkgNzQuOTI0NiA4Ni43MDE5WiIgZmlsbD0iI0VGRUZFRiIvPgogIDxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNzQuOTI0NSA3MC42MzAxQzczLjY2MTggNzAuNjMwMSA3Mi45MDQyIDY5Ljg2NDggNzIuOTA0MiA2OC44NDQzQzcyLjkwNDIgNjcuODIzOSA3My45MTQ0IDY3LjA1ODUgNzQuOTI0NSA2Ny4wNTg1Qzc1LjY4MjIgNjcuMDU4NSA3Ni40Mzk4IDY3LjMxMzYgNzcuMTk3NCA2OC4wNzlDNzcuOTU1MSA2OC44NDQzIDc5LjQ3MDMgNjguODQ0MyA4MC4yMjggNjguMDc5QzgwLjk4NTYgNjcuMzEzNiA4MC45ODU2IDY2LjI5MzIgODAuMjI4IDY1LjUyNzlDNzkuMjE3OCA2NC41MDc0IDc4LjIwNzYgNjQuMjUyMyA3Ny4xOTc0IDYzLjc0MjFWNjEuNzAxMkM3Ny4xOTc0IDYwLjY4MDcgNzYuMTg3MyA1OS45MTU0IDc1LjE3NzEgNTkuOTE1NEM3NC4xNjY5IDU5LjkxNTQgNzMuMTU2NyA2MC42ODA3IDczLjE1NjcgNjEuNzAxMlY2My43NDIxQzcwLjYzMTMgNjQuNTA3NCA2OS4xMTYgNjYuNTQ4MyA2OS4xMTYgNjguODQ0M0M2OS4xMTYgNzEuOTA1NyA3MS44OTQgNzQuMjAxNyA3NS40Mjk2IDc0LjIwMTdDNzYuNjkyNCA3NC4yMDE3IDc3LjQ1IDc0Ljk2NyA3Ny40NSA3NS45ODc1Qzc3LjQ1IDc3LjAwNzkgNzYuNDM5OCA3Ny43NzMyIDc1LjQyOTYgNzcuNzczMkM3NC42NzIgNzcuNzczMiA3My42NjE4IDc3LjI2MyA3Mi42NTE3IDc2LjQ5NzdDNzEuODk0IDc1LjczMjMgNzAuNjMxMyA3NS43MzIzIDY5LjYyMTEgNzYuMjQyNkM2OC44NjM1IDc3LjAwNzkgNjguNjExIDc4LjAyODQgNjkuMzY4NiA3OC43OTM3QzcwLjM3ODggODAuMDY5MiA3MS44OTQgODAuODM0NiA3My4xNTY3IDgxLjA4OTdWODMuMTMwNkM3My4xNTY3IDg0LjE1MSA3NC4xNjY5IDg0LjkxNjQgNzUuMTc3MSA4NC45MTY0Qzc2LjE4NzMgODQuOTE2NCA3Ny4xOTc0IDg0LjE1MSA3Ny4xOTc0IDgzLjEzMDZWODEuMDg5N0M3OS43MjI5IDgwLjMyNDQgODEuMjM4MSA3OC4yODM1IDgxLjIzODEgNzUuOTg3NUM4MS4yMzgxIDcyLjkyNjEgNzguNDYwMiA3MC42MzAxIDc0LjkyNDUgNzAuNjMwMVoiIGZpbGw9IiNFRkVGRUYiLz4KICA8cGF0aCBkPSJNNjkuMTE2MSA0NS44ODRDNzAuNjMxMyA0NS42Mjg5IDcyLjE0NjYgNDUuMzczOCA3My42NjE4IDQ1LjM3MzhMNTQuOTczNiAxMi4yMDkyQzU1LjQ3ODcgMTEuNDQzOSA1NS40Nzg3IDExLjQ0MzkgNTUuNzMxMyAxMS4xODg4QzU2LjIzNjMgMTAuMTY4MyA1Ny4yNDY1IDEwLjE2ODMgNTcuNDk5MSAxMC4xNjgzQzU3Ljc1MTYgMTAuMTY4MyA1OC43NjE4IDEwLjE2ODMgNTkuMjY2OSAxMS4xODg4TDc4LjcxMjcgNDUuNjI4OUM4MC4yMjggNDUuODg0IDgxLjc0MzIgNDYuMzk0MiA4My4wMDYgNDYuOTA0NUM4My41MTEgNDcuMTU5NiA4NC4wMTYxIDQ2LjY0OTMgODMuNzYzNiA0Ni4xMzkxTDc3Ljk1NTEgMzUuOTM0NkM4MC43MzMxIDM0LjE0ODkgODEuNzQzMiAzMC4zMjIyIDc5Ljk3NTQgMjcuNTE2Qzc4LjIwNzYgMjQuNDU0NiA3NC42NzIgMjMuNDM0MiA3MS42NDE1IDI0Ljk2NDhMNjIuODAyNSA5LjQwM0M2MS43OTIzIDcuMzYyMTEgNTkuNzcyIDYuMDg2NTUgNTcuNDk5MSA2LjA4NjU1QzU1LjQ3ODcgNi4wODY1NSA1My40NTg0IDcuMTA3IDUyLjE5NTYgOC44OTI3OEwyNS4xNzM1IDQzLjg0MzFMNy43NDggNTQuMDQ3NkMwLjkyOTMyNyA1OC4xMjk0IC0xLjU5NjExIDY3LjA1ODMgMi40NDQ1OSA3NC4yMDE0QzUuOTgwMiA4MC41NzkyIDEzLjgwOSA4My4xMzA0IDIwLjM3NTIgODAuNTc5MkwzMC43Mjk1IDk4Ljk0NzNDMzMuMDAyMyAxMDIuNzc0IDM4LjA1MzIgMTA0LjMwNSA0Mi4wOTM5IDEwMi4wMDlDNDYuMTM0NiA5OS43MTI2IDQ3LjM5NzMgOTQuNjEwNCA0NS4xMjQ0IDkwLjUyODZMMzguODEwOCA3OS41NTg4TDQ0LjExNDMgNzYuNDk3NUM0NS4xMjQ0IDc1Ljk4NzIgNDUuMzc3IDc0LjcxMTcgNDQuODcxOSA3My42OTEyTDQyLjA5MzkgNjkuMDk5MkM0Mi4zNDY1IDY5LjA5OTIgNDIuODUxNSA2OC44NDQxIDQ4LjkxMjYgNjcuODIzNkM0OS40MTc3IDY3LjgyMzYgNDkuNjcwMiA2Ny4zMTM0IDQ5LjkyMjggNjYuODAzMkM0OS45MjI4IDY2LjAzNzkgNTAuMTc1MyA2NS4wMTc0IDUwLjQyNzggNjQuMjUyMUM1MC40Mjc4IDYzLjc0MTggNTAuMTc1MyA2My40ODY3IDQ5LjY3MDIgNjMuNDg2N0wzOS44MjEgNjUuNTI3NkwyOC45NjE3IDQ2LjEzOTFMNTEuOTQzMSAxNi4yOTFMNjkuMTE2MSA0NS44ODRaTTc1LjE3NzEgMjcuNzcxMUM3Ni42OTI0IDI4LjI4MTMgNzcuNDUgMjkuODEyIDc3LjE5NzQgMzEuMzQyNkM3Ni45NDQ5IDMxLjg1MjkgNzYuNjkyNCAzMi42MTgyIDc2LjE4NzMgMzIuODczM0w3My40MDkzIDI4LjAyNjJDNzMuOTE0NCAyNy41MTYgNzQuNjcyIDI3LjUxNiA3NS4xNzcxIDI3Ljc3MTFaTTQxLjMzNjMgOTIuNTY5NUM0Mi4zNDY1IDk0LjYxMDQgNDEuODQxNCA5Ny4xNjE1IDM5LjgyMSA5OC4xODJDMzcuODAwNyA5OS40NTc1IDM1LjI3NTIgOTguNjkyMiAzNC4yNjUxIDk2LjY1MTNMMjMuOTEwOCA3OC41MzgzTDMwLjk4MiA3NC40NTY2QzQzLjEwNDEgOTUuMzc1NyA0MS4wODM3IDkyLjMxNDQgNDEuMzM2MyA5Mi41Njk1Wk00MC4zMjYxIDczLjY5MTJMMzYuNzkwNSA3NS43MzIxTDM0Ljc3MDEgNzIuMTYwNUwzOC4zMDU4IDcwLjExOTdMNDAuMzI2MSA3My42OTEyWk0zNi4wMzI5IDY2LjU0ODFMMTkuODcwMSA3NS45ODcyQzE0LjgxOTIgNzguNzkzNSA4LjUwNTYzIDc3LjI2MjggNS43Mjc2NSA3Mi4xNjA1QzQuNzE3NDggNzAuNjI5OSA0LjQ2NDk0IDY4Ljg0NDEgNC40NjQ5NCA2Ny4wNTgzQzQuNDY0OTQgNjMuMjMxNiA2LjQ4NTI4IDU5LjkxNTIgOS41MTU4IDU3Ljg3NDNMMjUuNjc4NiA0OC40MzUxTDM2LjAzMjkgNjYuNTQ4MVoiIGZpbGw9IiNFRkVGRUYiLz4KPC9zdmc+)
		#f8f8f8 no-repeat;
	background-size: 45px;
	background-position-x: 50px;
	background-position-y: 50%;
	color: #5b5b5b;
}
.current-points {
	border-right: solid 0.8px rgb(226, 232, 240);
	padding-right: 40px;
}

.point-rules {
	text-align: center;
	margin: auto 0;
	padding-left: 40px;
}
.memberRecordList img {
	display: block;
	margin: 0 auto;
	height: 129px;
	width: 121px;
	margin-top: 6px;
	margin-bottom: 10px;
}
.memberRecordList p {
	line-height: 20px;
	margin: 0;
	text-align: center;
	font-size: 13px;
	color: #777777;
	padding: 0.15rem;
}
.goShopping {
	display: block;
	margin: 20px auto;
	width: 220px;
	height: 32px;
	background-color: #000;
	color: #fff;
	border: none;
	border-radius: 16px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	font-size: 14px;
	font-weight: bold;
}

.goShopping:hover {
	background-color: #333;
}
@media (width<=768px) {
	.goShopping {
		width: 100%;
	}
	.currentPointsBoard {
		padding: 16px;
		display: block;
		background-position: right;
	}
	.current-points {
		border: none;
	}
	.current-points > p:first-of-type {
		display: none;
	}
	.currentGold > p:first-of-type {
		display: none;
	}

	.memberPointsMain {
		border-top: none;
	}
}
</style>
