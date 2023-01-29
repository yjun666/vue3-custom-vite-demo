export const autoBlur = () => {
    const autoBlurEvent = (el: HTMLElement) => {
        console.log(el);
        el.blur();
    }
    return {
        mounted(el: HTMLElement) {
            console.log('mounted')
            el.addEventListener('click', autoBlurEvent.bind(el, el));
        },
        beforeUnmount(el: HTMLElement) {
            console.log('beforeUnmount')
            el.removeEventListener('click', autoBlurEvent.bind(el, el));
        }
    }
}
