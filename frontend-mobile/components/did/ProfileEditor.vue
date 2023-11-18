<template>
  <div
    style="background: linear-gradient(180deg, #252525 0%, #181818 100%)"
    class="tw-rounded-t-xl tw-text-white tw-px-3 tw-overflow-hidden"
  >
    <div
      class="tw-relative tw-flex tw-flex-row tw-items-center tw-justify-center tw-py-3 tw-text-sm"
    >
      <div>编辑身份资料</div>
      <div class="tw-absolute tw-top-0 tw-right-0">
        <div
          class="tw-relative tw-flex tw-flex-row tw-items-center tw-py-3 tw-opacity-60"
        >
          <div
            @click="editing({})"
            class="tw-flex tw-items-center tw-justify-center tw-w-4 tw-h-4 tw-bg-white tw-bg-opacity-10 tw-rounded-full tw-p-0.5"
          >
            <img
              class="tw-w-3 tw-h-3"
              src="https://static.xxxxxx.com/63d2ad6ca4076d87299a85e2373bb5ad53a73ab1857c51c33930790f5cb3090e"
            />
          </div>
        </div>
      </div>
    </div>
		
		
	// #ifdef H5
    <div style="height: 28rem" class="tw-overflow-y-auto tw-pb-3">
      <MetadataZen @editing="editing" :profile="profile"></MetadataZen>
      <div>
        <SortableView
          ref="sortable"
          :groupSelector="sortableGroupSelector"
          :itemSelector="sortableItemSelector"
          @change="onModuleSorted"
        >
          <GroupZen
            @editing="editing"
            class="draggable-module-group"
            v-for="(groupItem, index) in getGroups()"
            :profile="profile"
            :index="index"
            :config="groupItem"
            :key="groupItem"
          >
            <template #item="item">
              <div
                class="draggable-module-item select-none"
                @touchstart="touchstart($event)"
                @touchmove="touchmove($event)"
                @touchend="touchend"
              >
                <ModuleZen
                  :profile="profile"
                  :config="item.item"
                  :groupIndex="index"
                  :moduleIndex="item.index"
                  @click="
                    editing({
                      type: 'profile.editModule',
                      config: item.item,
                      groupIndex: index,
                      moduleIndex: item.index,
                    })
                  "
                ></ModuleZen>
              </div>
            </template>
          </GroupZen>
        </SortableView>
      </div>
    </div>
	// #endif
		
	// #ifdef MP-WEIXIN
	<div style="height: 28rem" class="tw-overflow-y-auto tw-pb-3">
		<MetadataZen @editing="editing" :profile="profile" ></MetadataZen>
		<div
		  v-for="(groupItem, groupIndex) in firstGroup"
		  :key="groupIndex"
			class="tw-mt-2"
		>
			<hyhDragableList :list="groupItem.spec.children" :clickClose="true" @change="changeHanlder" ref="hyhDragable">
					<template v-slot:default="{ item, index }">
							<ModuleZen
							  :profile="profile"
							  :config="item"
							  :groupIndex="groupIndex"
							  :moduleIndex="index"
							  @clickModuleZen="clickModuleZen({type: 'profile.editModule',
		  config: item,
		  groupIndex: groupIndex,
		  moduleIndex: index,})"
							></ModuleZen>
					</template>
			</hyhDragableList>
			<div class="module-footer tw-mt-2">
				<div class="tw-mt-2">
					<button @click="createModule(groupItem)" hover-class="none"
						class="tw-rounded-xl tw-bg-white tw-bg-opacity-5 hover:tw-bg-opacity-10">
						<div class="tw-text-white tw-text-base tw-flex tw-items-center tw-justify-center tw-py-3.5">
							<img class="tw-w-5 tw-h-5 tw-mr-2"
								src="https://static.xxxxxx.com/mdi/791f815eceab01a3ff62f1e59e8bc6183ed312bf36e84f952c26fb24a679ef9a" />
							<span>添加内容</span>
						</div>
					</button>
				</div>
			</div>
			
		</div>
	</div>
	// #endif
  </div>
	<div>
	    <ModuleCreateModal ref="ModuleCreateModal" :profile="profile" :config="firstGroupItem">
	    </ModuleCreateModal>
	</div>
</template>
<script>
import GroupZen from '@/components/did/modules/Group/Zen.vue'
import SortableView from '@/components/base/SortableView.vue'
import ModuleView from '@/components/did/modules/ModuleView.vue'
import ModuleZen from '@/components/did/modules/ModuleZen.vue'
import IconFont from '@/components/base/IconFont.vue'
import SPIcon from '@/components/base/SPIcon.vue'
import MetadataZen from '@/components/did/modules/Metadata/Zen.vue'
import { PROFILE_CONSTS } from '@/library/consts'
import { $closest } from '@/library/util'
import hyhDragableList from '@/components/hyh-dragable-list/hyh-dragable-list.vue'
import ModuleCreateModal from '@/components/did/modules/ModuleCreateModal.vue'
export default {
  components: {
    GroupZen,
    SortableView,
    ModuleView,
    IconFont,
    SPIcon,
    ModuleZen,
    MetadataZen,
		hyhDragableList,
		ModuleCreateModal
  },
  props: { profile: {}, },
  data() {
    return {
      sortableGroupSelector: '.draggable-module-group .module-group-container',
      sortableItemSelector: '.draggable-module-item',
      sortableItemHandler: '.draggable-module-item-handler',
			firstGroupItem:{},
			firstGroup:[],
			lifeList:[]
    }
  },
  created() {
		this.getFirstGroup()
	},
  methods: {
		createModule(item) {
				this.firstGroupItem = item
		    this.$refs.ModuleCreateModal.show()
		},
		changeHanlder(e) {
				let arr = (this.profile?.spec?.children || []).slice(0, 1)
				arr[0].spec.children = e
		},
		clickModuleZen(info){
			this.$emit('editing', info)
		},
    editing(info) {
      this.$emit('editing', info)
    },
    getGroups() {
      return (this.profile?.spec?.children || []).slice(0, 1)
    },
		getFirstGroup() {
			let arr = (this.profile?.spec?.children || []).slice(0, 1)
			this.firstGroup = JSON.parse(JSON.stringify(arr))
		},
    getItemsCount() {
      const groups = this.getGroups()
      let count = 0
      for (let item of groups) {
        count += item?.spec?.children?.length || 0
      }
      return count
    },
    isSorting(target) {
      return $closest(target, this.sortableItemHandler)
    },
    touchstart(event) {
      console.log('!!!!!touchstart', event, event.srcElement)
      if (!this.isSorting(event.srcElement)) {
        return
      }
      event.preventDefault()
      const cursorX = event.touches[0].clientX
      const cursorY = event.touches[0].clientY
      this.$refs.sortable.touchstart(cursorX, cursorY, event.currentTarget)
    },
    touchmove(event) {
      const cursorX = event.touches[0].clientX
      const cursorY = event.touches[0].clientY
      this.$refs.sortable.touchmove(event, cursorX, cursorY)
    },
    touchend(event) {
      this.$refs.sortable.touchend()
    },
    onModuleSorted(groupId, itemId, position) {
      console.log(
        `groupId=${groupId}, itemId=${itemId}, position.index=${position.index}, position.direction=${position.direction}, position.groupId=${position.groupId}`
      )
      const groups = this.getGroups()
      const group = groups[groupId]
      const targetGroup = groups[position.groupId]
      const item = group.spec.children[itemId]
      group.spec.children.splice(itemId, 1)
      if (groupId === position.groupId && position.index > itemId) {
        position.index--
      }
      if (position.direction === 0) {
        targetGroup.spec.children.splice(position.index, 0, item)
      }
      if (position.direction === 1) {
        targetGroup.spec.children.splice(position.index + 1, 0, item)
      }
      console.log('config', this.profile)
    },
  },
}
</script>

<style lang="scss" scoped>
	.test-container {
	    .item {
	        width: 100%;
	        height: 150rpx;
	        line-height: 150rpx;
	        text-align: center;
	        background-color: beige;
	        border-bottom: 1rpx solid gray;
	    }
	    .btn-area {
	        display: flex;
	        width: 200rpx;
	        height: 150rpx;
	        line-height: 150rpx;
	        .btn {
	            flex-grow: 1;
	            text-align: center;
	        }
	        .btn1 {
	            background-color: pink;
	        }
	        .btn2 {
	            background-color: plum;
	        }
	    }
	}
	
</style>