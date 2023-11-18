<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
import { $children } from '@/library/util'

export default {
    props: {
        groupSelector: '',
        itemSelector: '',
    },
    data() {
        return {
            draggingShadowID: this.generateRandomID(10),
            targetShadowID: this.generateRandomID(10),
            groupElements: [],
            elementsTree: [],
            draggingElement: null,
            draggingElementOffsetY: 0,
            draggingElementShadow: null,
            draggingElementStyle: null,
            targetElementShadow: null,
            position: null,
            lock: false,
            moveLock: false,
        }
    },
    methods: {
        reset() {
            this.draggingElementStyle = null;
            this.draggingElementOffsetX = 0;
            this.draggingElementOffsetY = 0;
            this.elementsTree = [];
            this.groupElements = [];
            this.draggingElement = null;
            this.draggingElementShadow = null;
            this.targetElementShadow = null;
            this.position = null;
        },
        touchstart(clientX, clientY, target) {
            console.log('touch start in')
            if (this.lock) {
                return
            };
            console.log('touch start')
            this.lock = true;
            this.moveLock = false;
            this.reset();
            this.prepare();
            this.draggingElement = target;
            const cursorX = clientX;
            const cursorY = clientY;
            const draggingElementRect = this.draggingElement.getBoundingClientRect();
            this.draggingElementOffsetX = cursorX - draggingElementRect.left;
            this.draggingElementOffsetY = cursorY - draggingElementRect.top;
            this.draggingElementShadow = this.createShadowElement(this.draggingElement);
            this.draggingElementShadow.className = this.draggingShadowID;
            this.draggingElementStyle = {
                width: this.draggingElement.style.width,
                transform: this.draggingElement.style.transform,
                zIndex: this.draggingElement.style.zIndex,
            }
            this.draggingElement.style.width = this.draggingElement.clientWidth + 'px';
            this.draggingElement.style.position = 'fixed';
            this.draggingElement.style.zIndex = '99999';
            this.draggingElement.style.left = cursorX - this.draggingElementOffsetX + 'px';
            this.draggingElement.style.top = cursorY - this.draggingElementOffsetY + 'px';
            this.draggingElement.style.transform = 'scale(1.1)';
            this.draggingElement.parentNode.insertBefore(this.draggingElementShadow, this.draggingElement
                .nextSibling);
        },
        touchmove(event, clientX, clientY) {
            if (this.moveLock) return;
            event.preventDefault()
            event.stopPropagation()
            this.moveLock = true;
            if (!this.draggingElement) return;
            const cursorX = clientX;
            const cursorY = clientY;
            this.draggingElement.style.left = cursorX - this.draggingElementOffsetX + 'px';
            this.draggingElement.style.top = cursorY - this.draggingElementOffsetY + 'px';
            this.createTargetShadowNode(cursorX, cursorY)
            this.moveLock = false;
        },
        touchend() {
            console.log('touch end in')
            const draggingElement = this.draggingElement;
            if (!draggingElement) return;
            this.removeDraggingElementShadow();
            console.log('touch end', draggingElement)
            const targetElementShadow = this.targetElementShadow;
            draggingElement.style.position = '';
            draggingElement.style.top = 0;
            draggingElement.style.left = 0;
            draggingElement.style.width = this.draggingElementStyle.width;
            draggingElement.style.transform = this.draggingElementStyle.transform;
            draggingElement.style.zIndex = this.draggingElementStyle.zIndex;
            const position = this.position;
            if (position) {
                const groupId = this.getElementGroupId(draggingElement);
                const itemId = this.getElementItemId(draggingElement);
                this.$emit('change', groupId, itemId, position)
            }
            this.lock = false;
            this.removeTargetElementShadow();
            this.resetPosition();
            this.reset();
        },
        prepare() {
            const parents = document.querySelectorAll(this.groupSelector)
            for (let i = 0; i < parents.length; i++) {
                const parent = parents[i];
                parent.setAttribute('groupId', i);
                this.groupElements.push(parent);
                const elements = []
                const children = $children(parent, this.itemSelector);
                for (let j = 0; j < children.length; j++) {
                    const element = children[j];
                    element.setAttribute('groupId', i)
                    element.setAttribute('itemId', j)
                    elements.push(element);
                }
                this.elementsTree.push(elements)
            }
        },
        getElementItemId(element) {
            return parseInt(element.getAttribute('itemId'))
        },
        getElementGroupId(element) {
            return parseInt(element.getAttribute('groupId'))
        },
        getTargetShadowNodePosition(cursorX, cursorY) {
            let groupId = -1;
            for (let item of this.groupElements) {
                const top = item.getBoundingClientRect().top;
                const bottom = top + item.clientHeight;
                if (cursorY >= top && cursorY <= bottom) {
                    groupId = this.getElementGroupId(item);
                    break;
                }
            }
            if (groupId === -1) {
                return null;
            }
            const elements = this.elementsTree[groupId];
            const [direction, index] = (() => {
                let index = 0;
                let lastIndex = 0;
                for (let i = 0; i < elements.length; i++) {
                    index = i;
                    const element = elements[i];
                    if (this.draggingElement.isEqualNode(element)) {
                        continue;
                    }
                    const top = element.getBoundingClientRect().top;
                    const range = top + element.clientHeight / 2;
                    if (cursorY < range) {
                        return [0, i];
                    }
                    lastIndex = index;
                }
                return [1, lastIndex];
            })()
            const skipIndex = (() => {
                const draggingGroupId = this.getElementGroupId(this.draggingElement);
                const draggingItemId = this.getElementItemId(this.draggingElement);
                if (draggingGroupId !== groupId) {
                    return false;
                }
                if (direction === 0 && index === draggingItemId + 1) {
                    return true;
                }
                if (direction === 1 && index === draggingItemId - 1) {
                    return true;
                }
                return false;
            })()
            if (skipIndex) {
                return
            };
            return {
                groupId,
                direction,
                index
            }
        },
        createShadowElement(element) {
            const node = document.createElement("div");
            node.style.width = element.clientWidth + 'px';
            node.style.height = element.clientHeight + 'px';
            return node;
        },
        resetPosition() {
            for (let items of this.elementsTree) {
                for (let item of items) {
                    item.style.top = '0';
                    item.style.left = '0';
                    item.style.position = '';
                }
            }
        },
        removeTargetElementShadow() {
            const node = document.querySelector(`.${this.targetShadowID}`);
            if (node) {
                node.style.transition = 'height 0.1s ease';
                node.style.height = '0';
                setTimeout(() => {
                    node.parentNode.removeChild(node);
                }, 100);
            }
        },
        removeDraggingElementShadow() {
            const node = this.draggingElementShadow;
            if (node && node.parentNode) {
                node.parentNode.removeChild(node);
            }
        },
        createTargetShadowNode(cursorX, cursorY) {
            const position = this.getTargetShadowNodePosition(cursorX, cursorY);
            let targetElementShadow = this.targetElementShadow;
            if (!position) {
                this.position = position;
                this.removeTargetElementShadow();
                return;
            };
            if (
                this.position &&
                this.position.index === position.index &&
                this.position.direction === position.direction &&
                this.position.groupId === position.groupId
            ) {
                return;
            }
            this.position = position;
            const {
                groupId,
                direction,
                index
            } = position;
            this.removeTargetElementShadow();
            targetElementShadow = this.createShadowElement(this.draggingElement);
            targetElementShadow.className = this.targetShadowID;
            if (direction === 0) {
                const elements = this.elementsTree[groupId];
                if (elements.length === 0) {
                    const groupElement = this.groupElements[groupId]
                    groupElement.appendChild(targetElementShadow);
                } else {
                    const rel = elements[index];
                    rel.parentNode.insertBefore(targetElementShadow, rel);
                }
            }
            if (direction === 1) {
                const elements = this.elementsTree[groupId];
                if (elements.length === 0) {
                    const groupElement = this.groupElements[groupId]
                    groupElement.appendChild(targetElementShadow);
                } else {
                    const rel = elements[index];
                    rel.parentNode.insertBefore(targetElementShadow, rel.nextSibling);
                }
            }
            this.slidedown(targetElementShadow)
            this.targetElementShadow = targetElementShadow;
        },
        slidedown(element) {
            if (element) {
                const height = element.scrollHeight;
                element.style.transition = 'height 0.1s ease';
                element.style.height = '0';
                setTimeout(() => {
                    element.style.height = `${height}px`;
                }, 0);
            }
        },
        generateRandomID(n) {
            let res = "";
            for (let i = 0; i < n; i++) {
                res += Math.floor(Math.random() * 10);
            }
            return 'e_' + res;
        }
    },
}
</script>

<style lang="scss">
@import "@/static/style.css";
</style>