export const drag = () => {
    // 实现方法相对简单， 容易控制边界
    const dragFun = (el: HTMLElement, binding: any) => {
        // 通过拖拽header进行拖拽
        const dialogHeaderEl = binding.value.dragHand ? el.querySelector(binding.value.dragHand) : el.querySelector('.drag-hand');
        const dragDom: any = el.querySelector('.draggable');
        const STYLE = {
            position: 'absolute',
            margin: 'initial',
            left: binding.value.dialogLeft || 'auto',
            top: binding.value.dialogTop || 'auto',
            right: binding.value.dialogRight || 'auto',
            bottom: binding.value.dialogBottom || 'auto',
        }
        // 如果垂直居中 设置translateY 样式
        if (binding.value.isMiddle) {
            Object.assign(STYLE, {
                transform: 'translateY(-50%)'
            })
        }
        for (let [key, value] of Object.entries(STYLE)) {
            dragDom.style[key] = value;
        }

        // 设置动态传参过来的style样式， 设置在.draggable上
        for (let [key, value] of Object.entries(binding.value.style || {})) {
            dragDom.style[key] = value;
        }

        // 修改鼠标样式
        dialogHeaderEl.style.cursor = 'move';
        const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null);

        let flag = false;

        dialogHeaderEl.onmousedown = (e: MouseEvent) => {
            const disX = e.clientX; // 鼠标按下时的初始位置
            const disY = e.clientY;

            let styL: number, styT: number;
            if (sty.left.includes('%')) {
                styL = +document.body.clientWidth * (+sty.left.replace(/%/g, '') / 100);
            } else {
                styL = +sty.left.replace(/px/g, '');
            }
            if (sty.top.includes('%')) {
                styT = +document.body.clientHeight * (+sty.top.replace(/%/g, '') / 100);
            } else {
                styT = +sty.top.replace(/px/g, '');
            }

            flag = false;
            document.onmousemove = function (e) {
                const l = e.clientX - disX; // 鼠标的当前位置 - 鼠标的初始位置 = 鼠标的偏移量
                const t = e.clientY - disY;
                let finallyL = l + styL; // 最终位置为鼠标的偏移量 + 弹窗的初始位置
                let finallyT = t + styT;

                // 左右边界控制
                if (finallyL < 0) {
                    // 到了顶部边界
                    finallyL = 0
                } else if (finallyL >= dragDom.offsetParent.clientWidth - dragDom.clientWidth) {
                    // 到了底部边界
                    finallyL = dragDom.offsetParent.clientWidth - dragDom.clientWidth;
                }

                // 上下边界控制
                if (binding.value.isMiddle) {
                    // 如果垂直居中 使用的纵向边界计算方式， 需要考虑translateY 的偏移距离
                    // 垂直居中设置css样式 top: 50%; transform: translateY(-50%)
                    if (finallyT <= dragDom.clientHeight / 2) {
                        finallyT = dragDom.clientHeight / 2;
                    } else if (finallyT >= dragDom.offsetParent.clientHeight - dragDom.clientHeight + dragDom.clientHeight / 2) {
                        finallyT = dragDom.offsetParent.clientHeight - dragDom.clientHeight + dragDom.clientHeight / 2;
                    }
                } else {
                    // 如果没有垂直居中 使用的纵向边界计算方式， 不需要考虑translateY 的偏移距离
                    // 顶部距离仅设置top: 15%;样式
                    if (finallyT < 0) {
                        // 到了顶部边界
                        finallyT = 0
                    } else if (finallyT >= dragDom.offsetParent.clientHeight - dragDom.clientHeight) {
                        // 到了底部边界
                        finallyT = dragDom.offsetParent.clientHeight - dragDom.clientHeight;
                    }
                }

                if (!flag) {
                    // 拖拽时设置right 和 bottom为auto， 拖拽时会写入left和top值， 如果right为20px， 会造成弹窗高度拉高
                    dragDom.style.right = 'auto';
                    dragDom.style.bottom = 'auto';
                    flag = true;
                }
                dragDom.style.left = `${finallyL}px`;
                dragDom.style.top = `${finallyT}px`;

                // binding.value({x:e.pageX,y:e.pageY})
            }

            document.onmouseup = function (e) {
                document.onmousemove = null;
                document.onmouseup = null;
            }
        }
    }

    return {
        updated(el: HTMLElement, params: any) {
            setTimeout(() => {
                // 弹窗隐藏再显示出来重新设置位置， 不保留拖拽的位置
                const dragDom: HTMLElement = (el.querySelector('.draggable') || el.querySelector('.ele-form-dialog') as HTMLElement);
                dragDom.style.left = params.value.dialogLeft || 'auto';
                dragDom.style.top = params.value.dialogTop || 'auto';
                dragDom.style.right = params.value.dialogRight || 'auto';
                dragDom.style.bottom = params.value.dialogBottom || 'auto';
                // dragFun(el, binding);
            }, 220);
        },
        mounted(el: HTMLElement, params: any) {
            dragFun(el, params);
        },
    }
}