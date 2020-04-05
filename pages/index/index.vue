<template>
	<view class="index">
		<musichead title="网易云音乐" :icon="false"></musichead>
		<view class="container">
			<scroll-view scroll-y="true">
				<view class="index-search" @tap="handleToSearch">
					<text class="iconfont iconsearch"></text>
					<input type="text" value="" placeholder="搜索歌曲" />
				</view>
				<view class="skeleton" v-if="loading">
					<m-for-skeleton
					:avatarSize="200"
					:row="3"
					:title="false"
					:loading="loading"
					isarc="square"
					:titleStyle="{}"
					v-for="(item,key) in 4"
					:key="key">
					</m-for-skeleton>
				</view>
				<view v-else class="index-list">
					<!-- <view class="index-list-item">
						<view class="index-list-img">
							<image src="/static/wangyiyunyinyue.png" mode=""></image>
							<text>测试文字</text>
						</view>
						<view class="index-list-text">
							<view>1.与我无关 - 啊冗</view>
							<view>1.与我无关 - 啊冗</view>
							<view>1.与我无关 - 啊冗</view>
						</view>
					</view> -->
					<view class="index-list-item" v-for="(item,index) in topList" :key="index" @tap="handleToList(item.listId)">
						<view class="index-list-img">
							<image :src="item.coverImgUrl" mode=""></image>
							<text>{{ item.updateFrequency }}</text>
						</view>
						<view class="index-list-text">
							<view v-for="(musicItem , index) in item.tracks" :key="index">{{ index + 1 }}.{{musicItem.first}} - {{musicItem.second}}</view>
							
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import musichead from '../../components/musichead/musichead.vue'
	import '../../common/iconfont.css'
	import { topList } from '../../common/api.js'
	import mForSkeleton from "@/components/m-for-skeleton/m-for-skeleton"
	export default {
		data() {
			return {
				topList : [],
				loading: true
			}
		},
		components: {
			musichead,
			mForSkeleton
		},
		onLoad() {
			topList().then((res)=>{
				if(res.length){
					setTimeout(()=>{
						this.topList = res;
						this.loading = false;
					},2000);
				}
			});
		},
		methods: {
			handleToList(listId){
				uni.navigateTo({
					url: '/pages/list/list?listId=' + listId
				});
			},
			handleToSearch(){
				uni.navigateTo({
					url: '/pages/search/search'
				});
			}
		}
	}
</script>

<style>
	.index-search{ display: flex; background:#f7f7f7; height:73rpx; margin:70rpx 30rpx 30rpx 30rpx; border-radius: 50rpx; align-items: center;}
	.index-search text{ margin:0 27rpx;} 
	.index-search input{ font-size:26rpx; flex:1;}
	.index-list{ margin:0 30rpx;}
	.index-list-item{ display: flex; margin-bottom: 35rpx;}
	.index-list-img{ width:212rpx; height:212rpx; margin-right:20rpx; border-radius: 15rpx; overflow: hidden; position: relative;}
	.index-list-img image{ width:100%; height:100%;}
	.index-list-img text{ position: absolute; font-size:22rpx; color:white; bottom: 15rpx; left:15rpx;}
	.index-list-text{ flex:1; font-size:24rpx; line-height: 68rpx;}
	.index-list-text view{}
</style>
