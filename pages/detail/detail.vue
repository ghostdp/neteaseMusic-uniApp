<template>
	<view class="detail">
		<view class="fixbg" :style="{backgroundImage:'url('+ songDetail.al.picUrl +')'}"></view>
		<musichead :title="songDetail.name" :icon="true" color="white"></musichead>
		<view class="container">
			<scroll-view scroll-y="true">
				<view class="detail-play">
					<image :src="songDetail.al.picUrl" mode=""></image>
					<text class="iconfont iconpause"></text>
					<view></view>
				</view>
				<view class="detail-lyric">
					<view class="detail-lyric-wrap">
						<view class="detail-lyric-item">测试文字阿斯顿撒所</view>
						<view class="detail-lyric-item active">测试文字阿斯</view>
						<view class="detail-lyric-item">测试顿撒所洒水大所大按时</view>
					</view>
				</view>
				<view class="detail-like">
					<view class="detail-like-title">喜欢这首歌的人也听</view>
					<view class="detail-like-list">
						<!-- <view class="detail-like-item">
							<view class="detail-like-img"><image src="../../static/wangyiyunyinyue.png" mode=""></image></view>
							<view class="detail-like-song">
								<view>蓝</view>
								<view>
									<image src="../../static/dujia.png" mode=""></image>
									<image src="../../static/sq.png" mode=""></image>
									石白其 - 蓝
								</view>
							</view>
							<text class="iconfont iconbofang"></text>
						</view> -->
						<view class="detail-like-item">
							<view class="detail-like-img"><image src="../../static/wangyiyunyinyue.png" mode=""></image></view>
							<view class="detail-like-song">
								<view>蓝</view>
								<view>
									<image src="../../static/dujia.png" mode=""></image>
									<image src="../../static/sq.png" mode=""></image>
									石白其 - 蓝
								</view>
							</view>
							<text class="iconfont iconbofang"></text>
						</view>
					</view>
				</view>
				<view class="detail-comment">
					<view class="detail-comment-title">精彩评论</view>
					<!-- <view class="detail-comment-item">
						<view class="detail-comment-img"><image src="../../static/wangyiyunyinyue.png" mode=""></image></view>
						<view class="detail-comment-content">
							<view class="detail-comment-head">
								<view class="detail-comment-name">
									<view>是啊冗的冗</view>
									<view>2020年1月2日</view>
								</view>
								<view class="detail-comment-like">
									56026 <text class="iconfont iconlike"></text>
								</view>
							</view>
							<view class="detail-comment-text">
								测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字
							</view>
						</view>
					</view> -->
					<view class="detail-comment-item">
						<view class="detail-comment-img"><image src="../../static/wangyiyunyinyue.png" mode=""></image></view>
						<view class="detail-comment-content">
							<view class="detail-comment-head">
								<view class="detail-comment-name">
									<view>是啊冗的冗</view>
									<view>2020年1月2日</view>
								</view>
								<view class="detail-comment-like">
									56026 <text class="iconfont iconlike"></text>
								</view>
							</view>
							<view class="detail-comment-text">
								测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import { songDetail , songUrl , songLyric , songSimi , songComment } from '../../common/api.js';
	import '../../common/iconfont.css'
	export default {
		data() {
			return {
				songDetail : {
					al : { picUrl : '' }
				}
			}
		},
		onLoad(options){
			this.playMusic(options.songId);
		},
		methods: {
			playMusic(songId){
				Promise.all([songDetail(songId)]).then((res)=>{
					if(res[0][1].data.code == '200'){
						this.songDetail = res[0][1].data.songs[0];
					}
				});
			}
		}
	}
</script>

<style scoped>
	.detail-play{ width:580rpx; height:580rpx; background:url(~@/static/disc.png); background-size:cover; margin:210rpx auto 44rpx auto; position: relative;}
	.detail-play image{ width:380rpx; height:380rpx; border-radius: 50%; position: absolute; left:0; top:0; right:0; bottom:0; margin:auto;}
	.detail-play text{ width:100rpx; height:100rpx; font-size:100rpx; position: absolute; left:0; top:0; right:0; bottom:0; margin:auto; color:white;}
	.detail-play view{ position: absolute; width:170rpx; height:266rpx; position: absolute; left:60rpx; right:0;  margin:auto; top:-170rpx; background:url(~@/static/needle.png); background-size:cover;}
	
	.detail-lyric{ height:246rpx; line-height: 82rpx; font-size:32rpx; text-align: center; color:#949495;}
	.active{ color:white;}
	.detail-lyric-wrap{}
	.detail-lyric-item{}
	
	.detail-like{ margin:0 32rpx;}
	.detail-like-title{ font-size:36rpx; color:white; margin:50rpx 0;}
	.detail-like-list{}
	.detail-like-item{ display: flex; margin-bottom:38rpx; align-items: center;}
	.detail-like-img{ width:82rpx; height:82rpx; border-radius: 15rpx; overflow: hidden; margin-right:20rpx;}
	.detail-like-img image{ width:100%; height:100%;}
	.detail-like-song{ flex:1;}
	.detail-like-song view:nth-child(1){ color:white; font-size:30rpx; width:70vw; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 10rpx;}
	.detail-like-song view:nth-child(2){ font-size:22rpx; color:#a2a2a2; width:70vw; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;}
	.detail-like-song image{ width:34rpx; height:22rpx; margin-right:10rpx;}
	.detail-like-item text{ font-size:50rpx; color:#877764;}
	
	.detail-comment{ margin:0 32rpx;}
	.detail-comment-title{ font-size:36rpx; color:white; margin:50rpx 0;}
	.detail-comment-item{ display: flex; margin-bottom:28rpx;}
	.detail-comment-img{ width:66rpx; height:66rpx; border-radius: 50%; overflow: hidden; margin-right:18rpx;}
	.detail-comment-img image{ width:100%; height:100%}
	.detail-comment-content{ flex:1; color:#cac9cd;}
	.detail-comment-head{ display: flex; justify-content: space-between;}
	.detail-comment-name view:nth-child(1){ font-size:24rpx;}
	.detail-comment-name view:nth-child(2){ font-size:20rpx;}
	.detail-comment-like{ font-size:30rpx;}
	.detail-comment-text{ line-height: 40rpx; color:white; font-size:28rpx; margin-top:16rpx; border-bottom:1px #595860 solid; padding-bottom: 40rpx;}
	
</style>
