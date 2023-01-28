export const twinkle = () => {
    let animateTwinkle: any = null;
    let isStart = true;

    // 是否执行动画
    const twinkleFun = (el: any) => {
        if (isStart) {
            animateTwinkle = el.animate(
                [
                    { opacity: 0.2, transform: 'translateX(100px)' },
                    { opacity: 0.4, transform: 'translateX(70px)' },
                    { opacity: 0.6, transform: 'translateX(50px)' },
                    { opacity: 0.8, transform: 'translateX(30px)' },
                    { opacity: 1, transform: 'translateX(0)' },
                    { opacity: 0.8, transform: 'translateX(30px)' },
                    { opacity: 0.6, transform: 'translateX(50px)' },
                    { opacity: 0.4, transform: 'translateX(70px)' },
                    { opacity: 0.2, transform: 'translateX(100px)' }
                ],
                {
                    iterations: Infinity,
                    duration: 1500,
                    fillMode: 'forwards'
                }
            );
        } else {
            if (animateTwinkle) {
                animateTwinkle.cancel();
                animateTwinkle = null;
            }
        }
    };
    return {
        created(el: any) {
            console.log('created');
        },
        beforeMount(el: any) {
            console.log('beforeMounted');
        },
        mounted(el: any, params: any) {
            console.log('mounted', params);
            setTimeout(() => {
                isStart = true;
                twinkleFun(el);
            }, 100);
        },
        beforeUpdate(el: any, params: any) {
            console.log('beforeUpdate', params);
        },
        updated(el: any, params: any) {
            console.log('update', params);
            isStart = params.value.value % 2 === 0;
            twinkleFun(el);
        },

        unmounted() {
            console.log('unmounted');
        },
        beforeUnmount() {
            console.log('beforeUnmount');
        }
    };
};
