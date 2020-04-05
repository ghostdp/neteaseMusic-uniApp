<template>
	<view class="search">
		<musichead title="搜索" :icon="true" :iconBlack="true"></musichead>
		<view class="container">
			<scroll-view scroll-y="true">
				<view class="search-search">
					<text class="iconfont iconsearch"></text>
					<input type="text" placeholder="搜索歌曲" v-model="searchWord" @confirm="handleToSearch" @input="handleToSuggest" />
					<text v-show="searchType == 2" @tap="handleToClose" class="iconfont iconguanbi"></text>
				</view>
				<block v-if="searchType == 1">
					<view class="search-history">
						<view class="search-history-head">
							<text>历史记录</text>
							<text class="iconfont iconlajitong" @tap="handleToClear"></text>
						</view>
						<view class="search-history-list">
							<view v-for="(item,index) in historyList" :key="index" @tap="handleToWord(item)">{{ item }}</view>
						</view>
					</view>
					<view class="search-hot">
						<view class="search-hot-title">热搜榜</view>
						<!-- <view class="search-hot-item">
							<view class="search-hot-top">1</view>
							<view class="search-hot-word">
								<view>
									少年 <image src="../../static/dujia.png" mode="aspectFit"></image>
								</view>
								<view>"少年"这个词实在是太美好了</view>
							</view>
							<text class="search-hot-count">2968644</text>
						</view> -->
						<view class="search-hot-item" v-for="(item,index) in searchHot" :key="index" @tap="handleToWord(item.searchWord)">
							<view class="search-hot-top">{{ index + 1 }}</view>
							<view class="search-hot-word">
								<view>
									{{ item.searchWord }} <image :src="item.iconType ? item.iconUrl : ''" mode="aspectFit"></image>
								</view>
								<view>{{ item.content }}</view>
							</view>
							<text class="search-hot-count">{{ item.score }}</text>
						</view>
					</view>
				</block>
				<block v-else-if="searchType == 2">
					<view class="search-result">
						<!-- <view class="search-result-item">
							<view class="search-result-word">
								<view>少年</view>
								<view>
									<image src="../../static/dujia.png" mode=""></image>
									<image src="../../static/dujia.png" mode=""></image>
									许巍 - 爱如少年
								</view>
							</view>
							<text class="iconfont iconbofang"></text>
						</view> -->
						<view class="search-result-item" v-for="(item,index) in searchList" :key="index" @tap="handleToDetail(item.id)">
							<view class="search-result-word">
								<view>{{ item.name }}</view>
								<view>{{ item.artists[0].name }} - {{ item.album.name }}</view>
							</view>
							<text class="iconfont iconbofang"></text>
						</view>
					</view>
				</block>
				<block v-else-if="searchType == 3">
					<view class="search-suggest">
						<view class="search-suggest-title">搜索"{{ this.searchWord }}"</view>
						<!-- <view class="search-suggest-item">
							<text class="iconfont iconsearch"></text>
							少年抖音
						</view> -->
						<view class="search-suggest-item" v-for="(item,index) in suggestList" :key="index" @tap="handleToWord(item.keyword)">
							<text class="iconfont iconsearch"></text>
							{{ item.keyword }}
						</view>
					</view>
				</block>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import { searchHot , searchWord , searchSuggest } from '../../common/api.js'
	import '../../common/iconfont.css'
	export default {
		data() {
			return {
				searchHot : [],
				searchWord : '',
				historyList : [],
				searchType : 1,
				searchList : [],
				suggestList : []
			}
		},
		onLoad(){
			searchHot().then((res)=>{
				if(res[1].data.code == '200'){
					this.searchHot = res[1].data.data;
				}
			});
			uni.getStorage({
			    key: 'searchHistory',
			    success:(res)=>{
			        this.historyList = res.data;
			    }
			});
		},
		methods: {
			handleToSearch(){
				this.historyList.unshift(this.searchWord);
				this.historyList = [...new Set(this.historyList)];
				if(this.historyList.length > 10){
					this.historyList.length = 10;
				}
				uni.setStorage({
				    key: 'searchHistory',
				    data: this.historyList
				});
				this.getSearchList(this.searchWord);
			},
			handleToClear(){
				uni.removeStorage({
					key:'searchHistory',
					success:()=>{
						this.historyList = [];
					}
				});
			},
			getSearchList(word){
				searchWord(word).then((res)=>{
					if(res[1].data.code == '200'){
						this.searchList = res[1].data.result.songs;
						this.searchType = 2;
					}
				});
			},
			handleToClose(){
				this.searchWord = '';
				this.searchType = 1;
			},
			handleToSuggest(ev){
				let value = ev.detail.value;
				if(!value){
					this.searchType = 1;
					return;
				}
				searchSuggest(value).then((res)=>{
					if(res[1].data.code == '200'){
						this.suggestList = res[1].data.result.allMatch;
						this.searchType = 3;
					}
				});
			},
			handleToWord(word){
				this.searchWord = word;
				this.handleToSearch();
			},
			handleToDetail(songId){
				uni.navigateTo({
					url: '/pages/detail/detail?songId='+songId
				});
			}
		}
	}
</script>

<style scoped>
	.search-search{ display: flex; background:#f7f7f7; height:73rpx; margin:28rpx 30rpx 30rpx 30rpx; border-radius: 50rpx; align-items: center;}
	.search-search text{ margin:0 27rpx;} 
	.search-search input{ font-size:26rpx; flex:1;}
	
	.search-history{ margin:0 30rpx; font-size:26rpx;}
	.search-history-head{ display: flex; justify-content: space-between;}
	.search-history-list{ display: flex; margin-top:36rpx; flex-wrap: wrap;}
	.search-history-list view{ padding:20rpx 40rpx; background:#f7f7f7; border-radius: 50rpx; margin-right:30rpx; margin-bottom: 20rpx;}
	
	.search-hot{ margin:30rpx 30rpx; font-size:26rpx; color:#bebebe;}
	.search-hot-title{}
	.search-hot-item{ display: flex; align-items: center; margin-top: 40rpx;}
	.search-hot-top{ width:60rpx; color:#fb2221; font-size:34rpx;}
	.search-hot-word{ flex:1;}
	.search-hot-word view:nth-child(1){ font-size:36rpx; color:black;}
	.search-hot-word image{ width:48rpx; height:22rpx;}
	.search-hot-count{}
	
	.search-result{ border-top: 2rpx #e5e5e5 solid; padding:30rpx;}
	.search-result-item{ display: flex; align-items: center; border-bottom: 2rpx #e5e5e5 solid; padding-bottom:30rpx; margin-bottom: 30rpx;}
	.search-result-item text{ font-size:50rpx;}
	.search-result-word{ flex:1;}
	.search-result-word view:nth-child(1){ font-size:28rpx; color:#3e6694;}
	.search-result-word view:nth-child(2){ font-size:26rpx;}
	
	.search-suggest{ border-top: 2rpx #e5e5e5 solid; padding:30rpx; font-size:26rpx; }
	.search-suggest-title{ color:#537caa; margin-bottom: 40rpx;}
	.search-suggest-item{ color:#666666; margin-bottom: 70rpx;}
	.search-suggest-item text{ color:#c2c2c2; font-size:26rpx; margin-right:26rpx;}
</style>
