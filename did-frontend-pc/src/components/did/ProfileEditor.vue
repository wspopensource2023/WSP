<template>
    <div class="tw-pt-5" style="overflow-y: auto;">
        <div>
            <MetadataZen @editing="editing" :profile="profile"></MetadataZen>
            <div>
                <SortableView ref="sortable" :groupSelector="sortableGroupSelector" :itemSelector="sortableItemSelector"
                    @change="onModuleSorted">
                    <GroupZen @editing="editing" class="draggable-module-group" v-for="(groupItem, index) in getGroups()"
                        :profile="profile" :index="index" :config="groupItem" :key="groupItem">
                        <template #item="item">
                            <div class="draggable-module-item select-none" @mousedown="mousedown" @mousemove="mousemove"
                                @mouseup="mouseup">
                                <ModuleZen :profile="profile" :config="item.item" :groupIndex="index"
                                    :moduleIndex="item.index" @click="
                                        editing({
                                            type: 'profile.editModule',
                                            config: item.item,
                                            groupIndex: index,
                                            moduleIndex: item.index
                                        })
                                        "></ModuleZen>
                            </div>
                        </template>
                    </GroupZen>
                </SortableView>
            </div>
        </div>
    </div>
</template>
<script>
import GroupZen from "@/components/did/modules/Group/Zen.vue";
import SortableView from "@/components/base/SortableView.vue";
import ModuleView from "@/components/did/modules/ModuleView.vue";
import ModuleZen from "@/components/did/modules/ModuleZen.vue";
import IconFont from "@/components/base/IconFont.vue";
import SPIcon from "@/components/base/SPIcon.vue";
import MetadataZen from "@/components/did/modules/Metadata/Zen.vue";
import { PROFILE_CONSTS } from "@/library/consts";
export default {
    components: {
        GroupZen,
        SortableView,
        ModuleView,
        IconFont,
        SPIcon,
        ModuleZen,
        MetadataZen,
    },
    props: {
        profile: {},
    },
    data() {
        return {
            sortableGroupSelector:
                ".draggable-module-group .module-group-container",
            sortableItemSelector: ".draggable-module-item",
            sortableItemHandler: ".draggable-module-item-handler",
        };
    },
    methods: {
        editing(info) {
            this.$emit('editing', info)
        },
        getGroups() {
            return (this.profile?.spec?.children || []).slice(0, 1);
        },
        getItemsCount() {
            const groups = this.getGroups();
            let count = 0;
            for (let item of groups) {
                count += item?.spec?.children?.length || 0;
            }
            return count;
        },
        isSorting(target) {
            const parent = target.closest(this.sortableItemHandler);
            if (parent && parent.length) {
                return true;
            }
            return false;
        },
        mousedown(event) {
            const $element = $(event.srcElement || event.target);
            if (!this.isSorting($element)) {
                return;
            }
            console.log("start...");
            const bindElement = $element
                .closest(this.sortableItemSelector)
                .get(0);
            console.log(bindElement, event.clientX, event.clientX);
            if (!bindElement) return;
            this.$refs.sortable.touchstart(
                event.clientX,
                event.clientY,
                bindElement
            );
        },
        mousemove(event) {
            this.$refs.sortable.touchmove(event, event.clientX, event.clientY);
        },
        mouseup(event) {
            this.$refs.sortable.touchend();
        },
        onModuleSorted(groupId, itemId, position) {
            console.log(
                `groupId=${groupId}, itemId=${itemId}, position.index=${position.index}, position.direction=${position.direction}, position.groupId=${position.groupId}`
            );
            const groups = this.getGroups();
            const group = groups[groupId];
            const targetGroup = groups[position.groupId];
            const item = group.spec.children[itemId];
            group.spec.children.splice(itemId, 1);
            if (groupId === position.groupId && position.index > itemId) {
                position.index--;
            }
            if (position.direction === 0) {
                targetGroup.spec.children.splice(position.index, 0, item);
            }
            if (position.direction === 1) {
                targetGroup.spec.children.splice(position.index + 1, 0, item);
            }
            console.log("config", this.profile);
        },
    },
};
</script>