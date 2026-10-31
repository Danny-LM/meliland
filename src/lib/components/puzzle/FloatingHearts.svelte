<script lang="ts">
	import { onDestroy, untrack } from 'svelte';

	type Particle = {
		id: number;
		x: number;
		size: number;
		delay: number;
		drift: number;
		color: string;
	};

	let { burstKey = 0, count = 14 }: { burstKey?: number; count?: number } = $props();

	const colors = ['#FBCFE8', '#F472B6', '#EF4444', '#E9D5FF'];

	let particles = $state<Particle[]>([]);
	let nextId = 0;
	let timers: ReturnType<typeof setTimeout>[] = [];

	function burst(amount: number) {
		const batch = Array.from(
			{ length: amount },
			(): Particle => ({
				id: nextId++,
				x: 5 + Math.random() * 90,
				size: 16 + Math.random() * 22,
				delay: Math.random() * 0.5,
				drift: -40 + Math.random() * 80,
				color: colors[Math.floor(Math.random() * colors.length)]
			})
		);

		particles = [...particles, ...batch];

		const timer = setTimeout(() => {
			const ids = new Set(batch.map((particle) => particle.id));
			particles = particles.filter((particle) => !ids.has(particle.id));
			timers = timers.filter((item) => item !== timer);
		}, 2800);

		timers.push(timer);
	}

	$effect(() => {
		if (burstKey > 0) {
			untrack(() => burst(count));
		}
	});

	onDestroy(() => {
		timers.forEach(clearTimeout);
	});
</script>

{#each particles as particle (particle.id)}
	<svg
		class="floaty"
		viewBox="0 0 24 24"
		width={particle.size}
		height={particle.size}
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		aria-hidden="true"
		style:left="{particle.x}%"
		style:animation-delay="{particle.delay}s"
		style:--drift="{particle.drift}px"
		style:filter="drop-shadow(0 0 6px {particle.color}99)"
	>
		<path
			d="M18.494 3.801C20.589 5.021 22.063 7.501 21.998 10.393C21.86 16.5 13.5 21 12 21C10.5 21 2.13901 16.5 2.00201 10.393C1.93701 7.5 3.41101 5.022 5.50601 3.8C7.46601 2.658 9.92801 2.652 12 4.337C14.072 2.652 16.534 2.658 18.494 3.8"
			fill={particle.color}
		/>
	</svg>
{/each}

<style>
	.floaty {
		position: fixed;
		bottom: -2rem;
		z-index: 60;
		pointer-events: none;
		opacity: 0;
		animation: rise 2s ease-out forwards;
	}

	@keyframes rise {
		0% {
			transform: translate(0, 0) rotate(0deg);
			opacity: 0;
		}
		15% {
			opacity: 1;
		}
		100% {
			transform: translate(var(--drift, 0px), -85vh) rotate(25deg);
			opacity: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.floaty {
			display: none;
		}
	}
</style>
