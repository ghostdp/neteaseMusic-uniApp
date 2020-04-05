<template>
	<view class="list">
		<view class="fixbg" :style="{backgroundImage:'url('+ playlist.coverImgUrl +')'}"></view>
		<musichead title="歌单" :icon="true" color="white"></musichead>
		<view class="container">
			<scroll-view scroll-y="true">
				<view class="list-head">
					<view class="list-head-img">
						<image :src="playlist.coverImgUrl" mode=""></image>
						<text class="iconfont iconyousanjiao">{{ playlist.playCount | formatCount }}</text>
					</view>
					<view class="list-head-text">
						<view>{{ playlist.name }}</view>
						<view>
							<image :src="playlist.creator.avatarUrl" mode=""></image>
							<text>{{ playlist.creator.nickname }}</text>
						</view>
						<view>{{ playlist.description }}</view>
					</view>
				</view>
				<!-- #ifdef MP-WEIXIN -->
				<button v-show="isShow" class="list-share" open-type="share">
					<text class="iconfont iconicon-"></text>分享给微信好友
				</button>
				<!-- #endif -->
				<view class="list-music">
					<view v-show="isShow" class="list-music-title">
						<text class="iconfont iconbofang1"></text>
						<text>播放全部</text>
						<text>(共{{ playlist.trackCount }}首)</text>
					</view>
					<!-- <view class="list-music-item">
						<view class="list-music-top">1</view>
						<view class="list-music-song">
							<view>与我无关</view>
							<view>
								<image src="../../static/dujia.png" mode=""></image>
								<image src="../../static/sq.png" mode=""></image>
								阿冗 - 与我无关
							</view>
						</view>
						<text class="iconfont iconbofang"></text>
					</view> -->
					<view class="list-music-item" v-for="(item,index) in playlist.tracks" :key="item.id" @tap="handleToDetail(item.id)">
						<view class="list-music-top">{{ index + 1 }}</view>
						<view class="list-music-song">
							<view>{{ item.name }}</view>
							<view>
								<image v-if=" privileges[index].flag > 60 && privileges[index].flag < 70" src="../../static/dujia.png" mode=""></image>
								<image v-if="privileges[index].maxbr == 999000" src="../../static/sq.png" mode=""></image>
								{{ item.ar[0].name }} - {{ item.name }}
							</view>
						</view>
						<text class="iconfont iconbofang"></text>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import musichead from '../../components/musichead/musichead.vue'
	import { list } from '../../common/api.js'
	import '../../common/iconfont.css'
	export default {
		data() {
			return {
				playlist : {
					coverImgUrl : '',
					trackCount : '',
					creator : ''
				},
				privileges : [],
				isShow : false
			}
		},
		components: {
			musichead
		},
		onLoad(options){
			let listId = options.listId;
			list(listId).then((res)=>{
				if(res[1].data.code == '200'){
					this.playlist = res[1].data.playlist;
					this.privileges = res[1].data.privileges;
					this.$store.commit('INIT_CHANGE',this.playlist.trackIds);
					this.isShow = true;
				}
			});
		},
		methods: {
			handleToDetail(id){
				uni.navigateTo({
					url: '/pages/detail/detail?songId=' + id
				});
			}
		}
	}
</script>

<style scoped>
	.list-head{ display: flex; margin:30rpx;}
	.list-head-img{ width:265rpx; height:265rpx; border-radius: 15rpx; margin-right:40rpx; overflow: hidden; position: relative;}
	.list-head-img image{ width:100%; height:100%;}
	.list-head-img text{ position: absolute; font-size:26rpx; color:white; right:8rpx; top:8rpx;}
	.list-head-text{ flex:1; font-size:24rpx; color:#c3d1e3;}
	.list-head-text image{ width:52rpx; height:52rpx; border-radius: 50%;}
	.list-head-text view:nth-child(1){ font-size:34rpx; color:#ffffff;}
	.list-head-text view:nth-child(2){ display: flex; align-items: center; margin:30rpx 0;}
	.list-head-text view:nth-child(2) text{ margin-left: 15rpx;}
	.list-head-text view:nth-child(3){ line-height: 38rpx;}
	
	.list-share{ width:330rpx; height:72rpx; margin:0 auto; background:rgba(0,0,0,0.4); text-align: center; line-height: 72rpx; font-size:26rpx; color:white; border-radius: 36rpx;}
	.list-share text{ margin-right:15rpx;}
	
	.list-music{ background:white; border-radius: 50rpx; overflow: hidden; margin-top:45rpx;}	
	.list-music-title{ height:58rpx; line-height: 58rpx; margin:30rpx 30rpx 70rpx 30rpx;}
	.list-music-title text:nth-child(1){ font-size:58rpx;}
	.list-music-title text:nth-child(2){ font-size:34rpx; margin:0 10rpx 0 25rpx;}
	.list-music-title text:nth-child(3){ font-size:28rpx; color:#b2b2b2;}
	.list-music-item{ display: flex; margin:0 30rpx 70rpx 44rpx; align-items: center;}
	.list-music-top{ width:56rpx; font-size:28rpx; color:#979797;}
	.list-music-song{ flex:1; line-height: 40rpx;}
	.list-music-song view:nth-child(1){ font-size:30rpx; width:70vw; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;}
	.list-music-song view:nth-child(2){ font-size:22rpx; color:#a2a2a2; width:70vw; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;}
	.list-music-song image{ width:34rpx; height:22rpx; margin-right:10rpx;}
	.list-music-item text{ font-size:50rpx; color:#c8c8c8;}
</style>
