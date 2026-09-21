<script lang="ts">
	import { resolve } from '$app/paths';
	import { goto } from '$app/navigation';
	import Loader from '$lib/components/Loader.svelte';
	import { fade, scale } from 'svelte/transition';
	import TulipMini from '$lib/components/flowers/TulipMini.svelte';
	import favicon from '$lib/assets/favicon.svg';

	let isLoading = $state(false);
	let progress = $state(0);

	let destination = $state<'galaxy' | 'letter' | 'flowers'>('galaxy');

	async function handleStart(destinationSelected: 'galaxy' | 'letter' | 'flowers') {
		isLoading = true;
		progress = 0;
		destination = destinationSelected;

		for (let i = 0; i <= 100; i += 5) {
			progress = i;
			await new Promise((res) => setTimeout(res, 30));
		}

		if (destinationSelected === 'galaxy') {
			await goto(resolve('/galaxy'));
		} else if (destinationSelected === 'flowers') {
			await goto(resolve('/flowers'));
		} else {
			await goto(resolve('/letters'));
		}
	}

	async function handleGoToFlowers() {
		isLoading = true;
		progress = 0;
		destination = 'flowers';

		for (let i = 0; i <= 100; i += 5) {
			progress = i;
			await new Promise((res) => setTimeout(res, 80));
		}

		await goto(resolve('/flowers'));
	}
</script>

<svelte:head>
    <title>Apoco si?</title>
	<link rel="icon" href={favicon} />
</svelte:head>

<Loader onStart={handleStart} {isLoading} {progress} {destination} />

{#if !isLoading}
	<div transition:fade={{ duration: 300 }} class="fixed right-8 bottom-8 z-50">
		<button
			onclick={handleGoToFlowers}
			in:scale={{ start: 0.8, duration: 300 }}
			class="group flex cursor-pointer items-center justify-center rounded-full p-8 shadow-xl transition-all duration-300 hover:scale-110 active:scale-95"
			title="Ver nuestro jardín de flores"
		>
			<TulipMini index={0} />
		</button>
	</div>
{/if}
