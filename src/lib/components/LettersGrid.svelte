<script lang="ts">
	import LetterCard from "./LetterCard.svelte";
	import type { Letter } from "../types";

	interface Props {
		letters: Letter[];
		onLetterClick: (letter: Letter) => void;
	}

	let { letters, onLetterClick }: Props = $props();

	let gridItems = $derived(Array.from({ length: 12 }).map((_, i) => letters[i] || null));
</script>

<div class="mx-auto w-full max-w-6xl px-4 py-8">
	<div class="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-8">
		{#each gridItems as item, index (index)}
			<LetterCard letter={item} onclick={() => item && onLetterClick(item)} />
		{/each}
	</div>
</div>
