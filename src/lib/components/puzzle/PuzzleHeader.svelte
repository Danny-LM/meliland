<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	let { revealText = false }: { revealText?: boolean } = $props();

	const secret = 'te amo mi amor';

	const toBinary = (text: string) =>
		[...text].map((char) => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');

	const binary = toBinary(secret);

	let mounted = $state(false);
	onMount(() => (mounted = true));
</script>

<div class="min-h-8 mb-6">
	{#key revealText}
		<p
			in:fade={{ duration: 500 }}
			class="font-mono text-[10px] leading-relaxed tracking-widest text-purple-400/30 select-all"
			class:revealed={revealText}
		>
			{revealText ? secret : binary}
		</p>
	{/key}
</div>

<h1
	class="secret-title mb-3 bg-linear-to-r from-purple-300 via-fuchsia-300 to-purple-500 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent md:text-5xl"
>
	Holaaa mi amoor
</h1>

<div class="min-h-6">
	{#if mounted}
		<p
			in:fly={{ y: -10, duration: 300, delay: 150 }}
			class="text-sm font-medium text-purple-300/90 italic md:text-base"
		>
			Estás lista para ver tu otra sorpresa?
		</p>
	{/if}
</div>

<style>
	.revealed {
		font-family: inherit;
		font-size: 0.875rem;
		letter-spacing: 0.05em;
		color: rgb(240 171 252 / 0.9);
	}

	.secret-title {
		animation: glitch 0.3s linear 1;
	}

	@keyframes glitch {
		0% {
			transform: translate(0);
			filter: none;
		}
		20% {
			transform: translate(-3px, 1px) skewX(-6deg);
			filter: hue-rotate(40deg);
		}
		40% {
			transform: translate(3px, -1px) skewX(6deg);
			filter: hue-rotate(-40deg);
		}
		60% {
			transform: translate(-2px, 0);
		}
		80% {
			transform: translate(2px, 1px);
			filter: hue-rotate(20deg);
		}
		100% {
			transform: translate(0);
			filter: none;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.secret-title {
			animation: none;
		}
	}
</style>
