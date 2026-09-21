<script lang="ts">
	let { index } = $props<{
		index: number;
	}>();

	function pseudoRandom(seed: number) {
		const x = Math.sin(seed + 1) * 10000;
		return x - Math.floor(x);
	}

	const leftPos = $derived(Math.floor(pseudoRandom(index * 13) * 85) + 5);
	const bottomPos = $derived(Math.floor(pseudoRandom(index * 29) * 45) + 10);
	const bloomDelay = $derived((pseudoRandom(index * 7) * 1.2).toFixed(2));
</script>

<div
	class="bloom-animation absolute h-8 w-6 origin-bottom sm:h-10 sm:w-8"
	style="
        left: {leftPos}%; 
        bottom: {bottomPos}px; 
        animation-delay: {bloomDelay}s, {index * -0.4}s;
    "
>
	<svg width="25" height="48" viewBox="0 0 25 48" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M17.2608 44.6999C17.2608 46.5231 16.4184 48 15.3802 48C14.3385 48 13.4975 46.5231 13.4975 44.6999V22.2636C13.4975 20.4394 14.3385 18.9586 15.3802 18.9586C16.4177 18.9586 17.2608 20.4394 17.2608 22.2636V44.6999Z"
			fill="#74B269"
		/>
		<path
			d="M15.0951 39.9052C16.4087 31.0295 8.74 21.3372 0.219285 21.3372C-1.41385 30.1774 6.32586 41.7158 15.0951 39.9052Z"
			fill="#74B269"
		/>
		<path
			d="M15.6579 21.1597C5.078 20.8047 11.2555 2.23668 20.2378 0C25.7407 7.17159 27.1608 20.5917 15.6579 21.1597Z"
			fill="#F3CA32"
		/>
		<path
			d="M14.1259 21.1597C24.7058 20.8047 18.5283 2.23668 9.546 0C4.04311 7.17159 2.62299 20.5917 14.1259 21.1597Z"
			fill="#FFD751"
		/>
	</svg>
</div>

<style>
	.bloom-animation {
		animation:
			bloom 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) both,
			miniSway 3s ease-in-out infinite;
	}

	@keyframes bloom {
		0% {
			transform: scale(0) translateY(15px);
			opacity: 0;
		}
		100% {
			transform: scale(1) translateY(0);
			opacity: 1;
		}
	}

	@keyframes miniSway {
		0%,
		100% {
			transform: rotate(-5deg);
		}
		50% {
			transform: rotate(5deg);
		}
	}
</style>
