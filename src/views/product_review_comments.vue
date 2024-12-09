<template>
    <div class="reviewMain mx-auto">
        <div class="awaitingComment w-1/4">
            <div
                class="awaitingCommentTitle border py-[10px] pl-[15px] font-semibold text-[18px]"
            >
                <h4>待評價訂單</h4>
            </div>
            <div class="orderNumbers text-[14px]">
                <h5 class="my-[10px]">訂單編號</h5>
                <p class="pb-[10px]">20241123060952668</p>
            </div>
        </div>
        <div class="givingComment w-3/4 pb-[15px]">
            <div
                class="awaitingCommentTitle border py-[10px] pl-[15px] font-semibold text-[18px]"
            >
                <h4>給予評價</h4>
            </div>
            <div class="commentContent p-[15px]">
                <span class="text-[11px]">訂單編號</span>
                <hr class="my-[20px]" />
                <div class="commodityInformation flex">
                    <div class="commodityImg px-[15px]">
                        <img
                            src="https://shoplineimg.com/53eb2bccb32b41ef6e000007/632435be69ad7f002b89558e/600x600f.webp?source_format=jpg"
                            alt=""
                        />
                    </div>
                    <div class="w-full">
                        <div>
                            <h5 class="font-semibold text-[14px]">
                                [寶可夢/鍍18K厚金] 皮卡丘戒指 / 2色 / 4 size
                            </h5>
                        </div>
                        <div class="py-[15px] text-[14px]">
                            評價<font-awesome-icon
                                class="mx-1"
                                :icon="['fas', 'star']"
                            />
                        </div>
                        <div class="commentInput text-[14px]">
                            內容<br />
                            <textarea
                                class="h-[92px] w-full px-[12px] py-[6px]"
                                placeholder="評價內容"
                            ></textarea>
                        </div>
                    </div>
                </div>
                <hr class="my-[20px]" />
                <div class="postButton text-right">
                    <button class="postBtn">發佈</button>
                </div>
            </div>
            <div></div>
        </div>
    </div>
</template>

<style scope>
* {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif !important;
    font-size: 14px;
    color: #333333;
}
.reviewMain {
    max-width: 1400px;
    display: flex;
    gap: 30px;
}
.awaitingCommentTitle {
    background-color: #f5f5f5;
    border: solid 1px #ddd;
}
.orderNumbers {
    padding: 15px;
    border: solid 1px #ddd;
    border-top: solid 1px #fff;
}
.commentContent {
    border: solid 1px #ddd;
    border-top: solid 1px #fff;
}
.commodityImg {
    max-height: 215px;
    max-width: 215px;
    box-sizing: content-box;
    float: left;
}
.commodityImg img {
    height: 100%;
    width: 100%;
    object-fit: cover;
}
textarea {
    border: 1px solid #ddd;
    resize: none;
    border-radius: 3px;
}
.postBtn {
    background-color: #000;
    color: #fff;
    padding: 6px 12px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    width: 28px;
    height: 20px;
    box-sizing: content-box;
    font-size: 14px;
}
@media (max-width: 768px) {
    .reviewMain {
        display: flex;
        flex-direction: column-reverse;
        padding: 10px 15px;
    }
    .awaitingComment {
        width: 100%;
        padding: 15px;
        padding-top: 0;
    }
}
.givingComment {
    width: 100%;
    padding: 15px;
    padding-top: 0;
}
</style>
