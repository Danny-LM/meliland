<script lang="ts">
	let { isReady = true, mirrored = false } = $props<{
		isReady?: boolean;
		mirrored?: boolean;
	}>();
</script>

<div
	class="relative inline-block h-auto w-60 origin-bottom transition-transform duration-500 sm:w-70"
	style="transform: {mirrored ? 'scaleX(-1)' : 'scaleX(1)'};"
>
	<svg
		width="100%"
		height="100%"
		viewBox="0 0 281 460"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		class="overflow-visible"
	>
		<!--  LEAFS -->
		<g class="tulip-growth" class:is-growing={isReady}>
			<!-- LEFT LEAF -->
			<g class="leaf-left">
				<path
					d="M144.475 322.048C132.033 244.392 51.2169 206.293 1.10576 209.595C-3.92914 244.646 107.461 349.27 144.475 322.048Z"
					fill="#75AE61"
				/>
				<path
					d="M144.475 322.048L1.10574 209.595C-3.92915 244.646 107.461 349.27 144.475 322.048Z"
					fill="#4E8B49"
				/>
			</g>

			<!-- RIGHT LEAF -->
			<g class="leaf-right">
				<path
					d="M131.701 342.818C137.323 264.373 214.508 219.37 264.716 218.289C272.789 252.768 170.948 366.708 131.701 342.818Z"
					fill="#75AE61"
				/>
				<path
					d="M131.701 342.818L264.716 218.289C272.789 252.768 170.948 366.708 131.701 342.818Z"
					fill="#4E8B49"
				/>
			</g>

			<!-- STEAM -->
			<path
				d="M64.9616 121.118C68.5617 119.307 75.4148 125.686 80.2761 135.346L140.068 254.16C140.094 254.211 140.118 254.263 140.143 254.314L181.359 142.448C185.098 132.3 191.186 125.187 194.967 126.58C198.734 127.968 198.76 137.333 195.021 147.481L149.038 272.291C147.2 277.279 146.166 284.086 145.143 289.55V437.406C145.143 449.889 141.884 460 137.868 460C133.838 460 130.584 449.889 130.584 437.406V283.795C130.584 279.817 130.915 276.078 131.495 272.828C130.22 268.612 128.799 264.157 127.062 260.705L67.2702 141.891C62.4089 132.231 61.3762 122.923 64.9616 121.118Z"
				fill="#74B269"
			/>
		</g>

		<!-- LEFT FLOWER -->
		<g class="flower-head-left" class:is-blooming={isReady}>
			<!-- Petal Back -->
			<path
				class="petal petal-back-left"
				d="M81.2114 140.188C160.705 125.617 62.1792 5.6744 52.495 7.44945C42.8107 9.22451 -4.24481 155.851 81.2114 140.188Z"
				fill="#E8AD21"
			/>

			<!-- Petal Midle -->
			<path
				class="petal petal-mid-left"
				d="M82.7244 140.219C24.5859 148.725 38.3709 33.7591 85.005 11.6673C122.747 48.1773 144.911 125.381 82.7244 140.219Z"
				fill="#F3CA32"
			/>

			<!-- Petal Front -->
			<path
				class="petal petal-front-left"
				d="M74.286 141.765C131.662 129.099 77.9993 26.4958 26.5615 22.3794C4.22144 69.9018 10.8797 149.947 74.286 141.765Z"
				fill="#FFD751"
			/>
		</g>

		<!-- RIGHT FLOWER -->
		<g class="flower-head-right" class:is-blooming={isReady}>
			<!-- Petal Back -->
			<path
				class="petal petal-back-right"
				d="M186.6 142.179C110.279 115.598 226.024 12.1722 235.321 15.4106C244.619 18.6489 268.646 170.755 186.6 142.179Z"
				fill="#E8AD21"
			/>

			<!-- Petal Midle -->
			<path
				class="petal petal-mid-right"
				d="M185.1 141.978C241.248 159.294 245.246 43.5741 202.549 14.596C159.657 44.8901 125.923 117.784 185.1 141.978Z"
				fill="#F3CA32"
			/>

			<!-- Petal Front -->
			<path
				class="petal petal-front-right"
				d="M193.202 144.8C138.445 123.489 207.199 30.3229 258.66 34.1388C273.453 84.5236 254.605 162.603 193.202 144.8Z"
				fill="#FFD751"
			/>
		</g>
	</svg>
</div>

<style>
	.tulip-growth {
		transform-origin: 138px 460px;
		transform: scaleY(0);
		transition: transform 1.8s cubic-bezier(0.16, 1, 0.3, 1);
	}
	.tulip-growth.is-growing {
		transform: scaleY(1);
	}

	.leaf-left {
		transform-origin: 144px 322px;
		animation: swayLeafLeft 4s ease-in-out infinite -0.6s;
	}

	.leaf-right {
		transform-origin: 131px 342px;
		animation: swayLeafRight 4s ease-in-out infinite -1.8s;
	}

	.flower-head-left {
		transform-origin: 80px 140px;
		transform: scale(0);
		transition: transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 1.2s; /* Nace cuando el tallo casi termina */
	}
	.flower-head-right {
		transform-origin: 185px 140px;
		transform: scale(0);
		transition: transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 1.4s;
	}

	.flower-head-left.is-blooming,
	.flower-head-right.is-blooming {
		transform: scale(1);
	}

	.petal {
		animation-duration: 4s;
		animation-timing-function: ease-in-out;
		animation-iteration-count: infinite;
	}

	.petal-back-left {
		transform-origin: 80px 140px;
		animation-name: swaySoftLeft;
		animation-delay: 0s;
	}
	.petal-mid-left {
		transform-origin: 80px 140px;
		animation-name: swayMidLeft;
		animation-delay: -0.8s;
	}
	.petal-front-left {
		transform-origin: 80px 140px;
		animation-name: swayFrontLeft;
		animation-delay: -1.6s;
	}

	.petal-back-right {
		transform-origin: 185px 140px;
		animation-name: swaySoftRight;
		animation-delay: -0.4s;
	}
	.petal-mid-right {
		transform-origin: 185px 140px;
		animation-name: swayMidRight;
		animation-delay: -1.2s;
	}
	.petal-front-right {
		transform-origin: 185px 140px;
		animation-name: swayFrontRight;
		animation-delay: -2s;
	}

	@keyframes swaySoftLeft {
		0%,
		100% {
			transform: rotate(0deg);
		}
		50% {
			transform: rotate(-4deg);
		}
	}
	@keyframes swayMidLeft {
		0%,
		100% {
			transform: rotate(0deg);
		}
		50% {
			transform: rotate(5deg);
		}
	}
	@keyframes swayFrontLeft {
		0%,
		100% {
			transform: rotate(0deg);
		}
		50% {
			transform: rotate(-3deg);
		}
	}

	@keyframes swaySoftRight {
		0%,
		100% {
			transform: rotate(0deg);
		}
		50% {
			transform: rotate(4deg);
		}
	}
	@keyframes swayMidRight {
		0%,
		100% {
			transform: rotate(0deg);
		}
		50% {
			transform: rotate(-5deg);
		}
	}
	@keyframes swayFrontRight {
		0%,
		100% {
			transform: rotate(0deg);
		}
		50% {
			transform: rotate(3deg);
		}
	}

	@keyframes swayLeafLeft {
		0%,
		100% {
			transform: rotate(0deg);
		}
		50% {
			transform: rotate(-3deg);
		}
	}

	@keyframes swayLeafRight {
		0%,
		100% {
			transform: rotate(0deg);
		}
		50% {
			transform: rotate(4deg);
		}
	}
</style>
