<script lang="ts">
	let { isFalling, onPlant } = $props<{
		isFalling: boolean;
		onPlant: () => void;
	}>();
</script>

<button
	onclick={onPlant}
	disabled={isFalling}
	class="pointer-events-auto inline-block origin-bottom cursor-pointer border-none bg-transparent p-0 transition-all"
	class:animate-fall={isFalling}
	class:animate-float={!isFalling}
	aria-label="Plantar semilla"
>
	<svg width="92" height="101" viewBox="0 0 92 101" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M32.4563 18.9188C34.3181 15.1953 31.656 5.36819 30.1045 0.519807C52.3586 -0.498353 91.7267 37.9559 90.9995 65.1553C90.2722 92.3548 59.582 100.5 42.7096 100.5C25.8372 100.5 -0.489482 92.7911 0.528679 65.1553C1.54684 37.5196 30.1291 23.5733 32.4563 18.9188Z"
			fill="#20130A"
			stroke="black"
		/>
		<path
			d="M33.7286 20.5975C35.4993 17.056 32.9908 6.94806 31.5152 2.33676C52.681 1.36839 89.4792 38.5815 88.7875 64.4509C88.0958 90.3203 58.9063 98.0673 42.859 98.0673C26.8117 98.0673 1.77233 90.7353 2.7407 64.4509C3.70907 38.1665 31.5152 25.0243 33.7286 20.5975Z"
			fill="#BD7B41"
			stroke="black"
		/>
		<path
			d="M84.0567 79.6299C74.373 93.7405 55.1323 97.6918 39.5 97.0001C75.2468 84.8263 77.2649 57.5474 81 41.5001C85.8419 48.8321 94.6774 64.154 84.0567 79.6299Z"
			fill="#A25F2A"
			stroke="#A25F2A"
		/>
	</svg>
</button>

<style>
	.animate-float {
		animation: float 2.5s ease-in-out infinite;
	}

	.animate-fall {
		animation: fallAndSquash 0.85s forwards cubic-bezier(0.25, 1, 0.5, 1);
	}

	@keyframes float {
		0%,
		100% {
			transform: translateY(0) scale(1);
		}
		50% {
			transform: translateY(-8px) scale(1.02);
		}
	}

	@keyframes fallAndSquash {
		0% {
			transform: translateY(0) scale(1);
			opacity: 1;
		}
		75% {
			transform: translateY(42vh) scale(1);
			opacity: 1;
		}
		100% {
			transform: translateY(44vh) scaleY(0.4) scaleX(1.4);
			opacity: 0;
		}
	}
</style>
