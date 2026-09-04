<script lang="ts">
	import { resolve } from '$app/paths';
	import { goto } from '$app/navigation';
	import Loader from '$lib/components/Loader.svelte';

	let isLoading = $state(false);
	let progress = $state(0);

	async function handleStart(destination: 'galaxy' | 'letter') {
		isLoading = true;
		progress = 0;

		for (let i = 0; i <= 100; i += 5) {
			progress = i;
			await new Promise((res) => setTimeout(res, 30));
		}

		if (destination === 'galaxy') {
			await goto(resolve('/galaxy'));
		} else {
			await goto(resolve('/letters'));
		}
	}
</script>

<Loader onStart={handleStart} {isLoading} {progress} />
