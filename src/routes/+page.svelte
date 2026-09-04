<script lang="ts">
	import Loader from "$lib/components/Loader.svelte";
	import { navigateTo } from "$lib/navigation";

	let isLoading = $state(false);
	let progress = $state(0);

	async function handleStart(destination: "galaxy" | "letter") {
		isLoading = true;
		progress = 0;

		for (let i = 0; i <= 100; i += 5) {
			progress = i;
			await new Promise((resolve) => setTimeout(resolve, 30));
		}

		if (destination === "galaxy") {
			await navigateTo("/galaxy");
		} else {
			await navigateTo("/letters");
		}
	}
</script>

<Loader onStart={handleStart} {isLoading} {progress} />
