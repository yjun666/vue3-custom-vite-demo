<template>
	<div>
		<!-- 页面打印及调试 -->
		<div class="test-common-scss display-none">asdflkasjdf</div>
		<div class="test-public-scss">asdflkasjdf</div>
		<i class="icon iconfont icon-user"></i>
		<slot :data="slotItem"
			name="slotName"></slot>
		<div>$utils.supplement()==== {{ supplement("") }}</div>
		<div>$utils.uuid()==== {{ uuid() }}</div>
		<div>VITE_CUSTOM_TEST==={{ COMPUTED_VITE_CUSTOM_TEST(1, 2) }}</div>
		<div>NODE_ENV==={{ COMPUTED_NODE_ENV }}</div>
		<div>
			formatDate(new Date(), "y-M-d h:m:s t")==={{formatDate(new Date(), "y-M-d h:m:s t")}}
		</div>
	</div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, computed, ref, inject } from 'vue';
// import { uuid, formatDate, supplement } from '@/utils/function'
const instance: any = getCurrentInstance();
const { uuid, formatDate, supplement } = instance.appContext.config.globalProperties.$utils;
console.log(`import.meta.env.VITE_CUSTOM_TEST===${import.meta.env.VITE_CUSTOM_TEST}`);
console.log(`import.meta.env.MODE===${import.meta.env.MODE}`);
console.log('instance.appContext.config.globalProperties.$utils.uuid()===' + uuid());
console.log('instance.appContext.config.globalProperties.$utils.formatDate()===' + formatDate(new Date(), 'y-M-d h:m:s t'));
let COMPUTED_VITE_CUSTOM_TEST = computed(() => {
	return (a: any, b: any) => {
		console.log(a, b);
		return import.meta.env.VITE_CUSTOM_TEST;
	};
});
let COMPUTED_NODE_ENV = computed(() => {
	return import.meta.env.MODE;
});
let slotItem = ref(0);
setInterval(() => {
	if (slotItem.value > 5) {
		return;
	}
	slotItem.value = slotItem.value + 1;
}, 1000);
</script>
<style lang="scss" scoped>
.test-public-scss {
	color: $link-text-color;
	@extend %flex-center-middle;
	@include flex() {
		flex-direction: column;
	}
}
</style>