export const focus = () => {
    return {
        mounted(el: any, params: any) {
            console.log('mounted', params);
            setTimeout(() => {
                el.focus();
            }, 100);
        }
    };
};
