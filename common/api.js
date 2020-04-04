import { baseUrl } from './config.js';

export function topList(){
	var listIds = ['3' , '0' , '2' , '1' ];
	return new Promise(function(resolve,reject){
		uni.request({
			url: `${baseUrl}/toplist/detail`,
			method: 'GET',
			data: {},
			success: res => {
				let result = res.data.list;
				result.length = 4;
				for(let i=0;i<result.length;i++){
					result[i].listId = listIds[i];
				}
				resolve(result);
			},
			fail: (err) => {
				console.log(err);
			},
			complete: () => {}
		});
	});
}

export function list(listId){
	return uni.request({
		url: `${baseUrl}/top/list?idx=${listId}`,
		method: 'GET'
	});
}