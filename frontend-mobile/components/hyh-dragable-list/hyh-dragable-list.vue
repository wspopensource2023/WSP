<template>
	<view>
		<movable-area class="drag-box" :style="{ height: list.length * dragData.rowHeight + 'px' }">
			<movable-view
				v-for="(item, index) in dragData.dataList"
				:key="index"
				:style="{ height: dragData.rowHeight + 'px' }"
				:class="{ 'drag-active': item.isActive }"
				:data-active="item.isActive ? true : false"
				class="drag-item"
				direction="vertical"
				:disabled="item.disabled"
				:out-of-bounds="true"
				:animation="item.isActive ? false : true"
				:x="item.x"
				:y="item.y"
				@touchstart="touchstart"
				@longpress="longtap(item)"
				@touchmove="touchmove($event, item)"
				@touchend="touchend(item)"
				@change="changeHandler"
			>
				<view class="mv-box " :style="{ transform: 'translate(' + item.left + 'px)' }">
					<view><slot :item="item.data" :index='item.index' name="default"></slot></view>
					<view class="slide-area" @click="slideClick" :style="{ right: -dragData.slideWidth + 'px' }">
						<slot :btnItem="item.data" name="btn"></slot>
					</view>
				</view>
			</movable-view>
		</movable-area>
	</view>
</template>

<script setup>
import { getCurrentInstance, nextTick, onMounted, reactive, watch, defineExpose } from 'vue'

const props = defineProps({
	list: {
		type: Array,
		default: () => []
	},
	clickClose: {
		type: Boolean,
		default: false
	}
})

const dragData = reactive({
	activeItem: null,
	activeY: -1000,
	isDrag: false,
	dragTargetY: 0,
	dataList: [],
	rowHeight: 0,
	dragTargetX: 0,
	slideItem: null,
	slideWidth: 1000,
	// show: true,
	// moreVisible: false
})
let sortedList=[]

watch(
	()=>props.list,
	newList => {
		setList(newList)
	},
	{ deep: true, immediate: true }
)

onMounted(() => {
	// console.log('mounted');
	getRowHeight()
	// 左滑菜单内容延迟显示
	// setTimeout(() => {
	// 	dragData.moreVisible = true;
	// }, 500);
})

defineExpose({ getRowHeight, setList })
const emit = defineEmits(['change'])



function getRowHeight() {
	const selectorQeury=uni.createSelectorQuery().in(getCurrentInstance().ctx)
	new Promise((resolve, reject) => {
			selectorQeury.select('.mv-box')
			.boundingClientRect(rect => {
				// rect.height可以获取元素的行高
				resolve(rect)
			})
			.exec()
	}).then(val => {
		dragData.rowHeight = val.height + 8
		// console.log(dragData.rowHeight);
		setList(props.list)
		// 有可能出现dragbox高度设置失败的可能，所以在list渲染之后手动重新渲染
		// dragData.show = false;
		// nextTick(() => {
		// 	dragData.show = true;
		// });
	})
	new Promise((resolve, reject) => {
			selectorQeury.select('.slide-area')
			.boundingClientRect(rect => {
				resolve(rect)
			})
			.exec()
	}).then(val => {
		dragData.slideWidth = val.width
	})
}

function touchstart(e) {
	// 手指距离顶部的高度
	dragData.dragTargetY = e.touches[0].pageY
	// 手指开始的x值
	dragData.dragTargetX = e.touches[0].pageX
}
function longtap(item) {
	// 保存活跃项
	dragData.activeItem = item
	// 让它可以拖拽
	item.disabled = false
	// 开始拖拽
	dragData.isDrag = true
	// 设置为活跃项
	item.isActive = true
}

let lastTime = 0
function touchmove(e, item) {
	// 手动节流
	// const currentTime = Date.now()
	// if (currentTime - lastTime < 50) return
	// lastTime = currentTime
	// 如果没有进入拖拽状态则判断是不是左右滑动
	if (!dragData.isDrag) {
		// 当前手指的x值
		let newX = e.touches[0].pageX
		// 滑动的距离
		let dx = newX - dragData.dragTargetX
		// 达到阈值判断为左右滑动
		if (dx < -70) {
			// console.log('左滑。。');
			// 如果已经有其他项滑动打开了则先让它归位
			if (dragData.slideItem && item.index !== dragData.slideItem.index) {
				dragData.slideItem.left = 0
			}
			dragData.slideItem = item
			// 滑动的距离由内容的宽度决定
			dragData.slideItem.left = -dragData.slideWidth
		} else if (dx > 50) {
			// console.log('右滑。。');
			// 右滑关闭
			if(dragData.slideItem===item){
				dragData.slideItem.left = 0
			}
		}
		// 阻止执行下面的拖拽逻辑
		return
	}

	// 长按拖拽时手指高度
	let newY = e.touches[0].pageY
	// 计算长按之后滑动的距离
	let d = newY - dragData.dragTargetY
	// console.log(d);
	// 更新手指的位置
	dragData.dragTargetY = newY

	// 拖拽时判断位置并在合适位置进行交换
	// 前一项
	let prevIndex = dragData.activeItem.index - 1
	// 后一项
	let nextIndex = dragData.activeItem.index + 1
	// 判定是否往上拖拽并且未超范围
	if (prevIndex >= 0 && d < 0) {
		let pItem = getItemByIndex(prevIndex)
		if (dragData.activeY>-1000&&dragData.activeY <= pItem.y) {
			// 活跃项跟前一项交换位置
			swapArray(pItem)
		}
	} else if (nextIndex < props.list.length && d > 0) {
		let nItem = getItemByIndex(nextIndex)
		if (dragData.activeY >= nItem.y) {
			swapArray(nItem)
		}
	}
}

function touchend(item) {
	// 如果不是拖拽状态则不需要执行
	if (!dragData.isDrag) return
	// console.log('松手了');
	if(dragData.activeY>-1000){
		dragData.activeItem.y = dragData.activeY
	}
	// 重置操作
	dragData.isDrag = false
	dragData.activeItem.isActive = false
	// 让拖拽项回到正确位置
	nextTick(() => {
		dragData.activeItem.y = dragData.activeItem.index * dragData.rowHeight
		// console.log('guiweila',dragData.activeItem.y);
		dragData.activeItem.disabled = true
		dragData.activeItem = null
		dragData.activeY=-1000
	})
	
	// // 取出排序后的list数据
	// let sortList = [];
	// dragData.dataList.forEach(item => {
	// 	let target = getItemByIndex(item.index).data;
	// 	sortList[item.index] = deepClone(target);
	// });
	if(sortedList.length){		
		// 把还原数据传回父组件
		emit('change', sortedList)
		sortedList=[]
	}
}

// 拖拽组件movable拖拽时的回调
function changeHandler(e) {
	// 数据过滤
	if (e.detail.source === '' || !e.currentTarget.dataset.active) return
	// if (e.currentTarget.dataset.active) {
	// 	dragData.activeY = e.detail.y;
	// }
	dragData.activeY = e.detail.y
	// console.log(dragData.activeY);
}

// 左滑菜单点击复位功能
function slideClick() {
	if (props.clickClose) {
		dragData.slideItem.left = 0
	}
}

// 根据下标找item
function getItemByIndex(index) {
	return dragData.dataList.find(item => {
		return item.index === index
	})
}

//交换位置
function swapArray(item) {
	let index = dragData.activeItem.index
	dragData.activeItem.index = item.index
	item.index = index
	nextTick(() => {
		item.y = item.index * dragData.rowHeight
	})
	// console.log('jiaohuanle');
	// 取出排序后的list数据
	sortedList = []
	dragData.dataList.forEach(dItem => {
		let target = getItemByIndex(dItem.index).data
		sortedList[dItem.index] = deepClone(target)
	})
	
}

// 对数据源list进行加工
function setList(list) {
	dragData.dataList = list.map((item, index) => {
		return {
			// 原来的数据存储在data中
			data: item,
			isActive: false,
			y: index * dragData.rowHeight,
			x: 0,
			index: index,
			disabled: true,
			left: 0
		}
	})
}

// 深克隆
function deepClone(obj) {
	if (obj === null || typeof obj !== 'object') {
		return obj
	}
	let cloneObj = Object.prototype.toString.call(obj) === '[object Array]' ? [] : {}
	for (let i in obj) {
		if (obj.hasOwnProperty(i)) {
			if (typeof obj[i] === 'object' && obj[i] !== null) {
				cloneObj[i] = deepClone(obj[i])
			} else {
				cloneObj[i] = obj[i]
			}
		}
	}
	return cloneObj
}

</script>

<style lang="scss">
.drag-box {
	width: 100%;
	.drag-item {
		width: 100%;
		.mv-box {
			margin-top: -0.5rem;
			position: relative;
			width: 100%;
			transform: translateX(0);
			transition: transform 0.5s;
			.slide-area {
				position: absolute;
				top: 0;
				right: -1000px;
				height: 100%;
			}
		}
	}
}
.drag-active {
	box-shadow: 0 8px 20px 0 #878787;
	transform: scale(1.2);
	z-index: 9 !important;
}
</style>
