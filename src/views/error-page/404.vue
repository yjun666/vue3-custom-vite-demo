<template>
	<div class="wscn-http404-container">
		<div class="wscn-http404">
			<div class="pic-404">
				<img class="pic-404__parent"
					src="@/assets/img/404_images/404.png"
					alt="404">
				<img class="pic-404__child left"
					src="@/assets/img/404_images/404_cloud.png"
					alt="404">
				<img class="pic-404__child mid"
					src="@/assets/img/404_images/404_cloud.png"
					alt="404">
				<img class="pic-404__child right"
					src="@/assets/img/404_images/404_cloud.png"
					alt="404">
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
let message = computed(() => {
	return 'The webmaster said that you can not enter this page...';
});
</script>

<style lang="scss" scoped>
.wscn-http404-container {
	transform: translate(-50%, -50%);
	@include position($T: 40%, $L: 50%);
}
.wscn-http404 {
	position: relative;
	width: 1200px;
	padding: 0 50px;
	overflow: hidden;
	.pic-404 {
		position: relative;
		float: left;
		width: 600px;
		overflow: hidden;
		&__parent {
			width: 100%;
		}
		&__child {
			position: absolute;
			&.left {
				width: 80px;
				top: 17px;
				left: 220px;
				opacity: 0;
				animation-name: cloudLeft;
				animation-duration: 2s;
				animation-timing-function: linear;
				animation-fill-mode: forwards;
				animation-delay: 1s;
			}
			&.mid {
				width: 46px;
				top: 10px;
				left: 420px;
				opacity: 0;
				animation-name: cloudMid;
				animation-duration: 2s;
				animation-timing-function: linear;
				animation-fill-mode: forwards;
				animation-delay: 1.2s;
			}
			&.right {
				width: 62px;
				top: 100px;
				left: 500px;
				opacity: 0;
				animation-name: cloudRight;
				animation-duration: 2s;
				animation-timing-function: linear;
				animation-fill-mode: forwards;
				animation-delay: 1s;
			}
			@keyframes cloudLeft {
				0% {
					top: 17px;
					left: 220px;
					opacity: 0;
				}
				20% {
					top: 33px;
					left: 188px;
					opacity: 1;
				}
				80% {
					top: 81px;
					left: 92px;
					opacity: 1;
				}
				100% {
					top: 97px;
					left: 60px;
					opacity: 0;
				}
			}
			@keyframes cloudMid {
				0% {
					top: 10px;
					left: 420px;
					opacity: 0;
				}
				20% {
					top: 40px;
					left: 360px;
					opacity: 1;
				}
				70% {
					top: 130px;
					left: 180px;
					opacity: 1;
				}
				100% {
					top: 160px;
					left: 120px;
					opacity: 0;
				}
			}
			@keyframes cloudRight {
				0% {
					top: 100px;
					left: 500px;
					opacity: 0;
				}
				20% {
					top: 120px;
					left: 460px;
					opacity: 1;
				}
				80% {
					top: 180px;
					left: 340px;
					opacity: 1;
				}
				100% {
					top: 200px;
					left: 300px;
					opacity: 0;
				}
			}
		}
	}
}
</style>
