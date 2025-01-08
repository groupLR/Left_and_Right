<template>
  <section class="memberPointsMain">
    <div class="memberContent">
      <div class="memberRecordList mt-10">
        <img src="../assets/member_center_list_empty.png" alt="" />
        <p>沒有任何訂單唷</p>
        <p>快去逛逛吧！</p>
        <RouterLink to="/"><button class="goShopping">馬上逛逛</button></RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.memberPointsMain {
  margin: auto;
  max-width: 1358px;
}

.memberContent {
  margin-top: 20px;
  padding: 0 40px;
  padding-bottom: 20px;
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
  .currentPoints {
    border: none;
  }
  .currentPoints > p:first-of-type {
    display: none;
  }
  .current-gold > p:first-of-type {
    display: none;
  }
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
  .memberPointsMain {
    border-top: none;
  }
  .pointRules {
    display: none;
  }
}
</style>
