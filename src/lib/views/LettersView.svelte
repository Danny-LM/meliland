<script lang="ts">
	import { resolve } from '$app/paths';
	import LettersGrid from '../components/LettersGrid.svelte';
	import LetterModal from '../components/LetterModal.svelte';
	import NewAudioPlayer from '../components/NewAudioPlayer.svelte';
	import type { Letter } from '../types';
	import { onDestroy } from 'svelte';
	import { LETTER_DATA } from '../data/words';
	import { globalAudio } from '$lib/state/audio.svelte';

	let selectedLetter = $state<Letter | null>(null);

	const availableYears = [...new Set(LETTER_DATA.map((l) => l.date.split('-')[0]))].sort(
		(a, b) => Number(b) - Number(a)
	);

	let selectedYear = $state(availableYears[0] || new Date().getFullYear().toString());
	let filteredLetters = $derived(LETTER_DATA.filter((l) => l.date.startsWith(selectedYear)));

	function openLetter(letter: Letter) {
		selectedLetter = letter;
		if (letter.track) {
			globalAudio.setTrack(letter.track);
		}
	}

	function closeLetter() {
		selectedLetter = null;
	}

	onDestroy(() => {
		globalAudio.pause();
	});
</script>

<main class="h-screen w-full overflow-y-auto bg-[#05020a] p-6 pb-32 text-white md:p-10">
	<a
		href={resolve('/')}
		class="mb-6 inline-block cursor-pointer text-sm tracking-widest text-pink-400/50 uppercase transition-colors hover:text-pink-400"
	>
		&larr; Volver al menu
	</a>

	<h1 class="mb-4 text-center text-2xl font-bold text-pink-400 md:text-3xl">Tus Cartitas</h1>

	{#if availableYears.length > 1}
		<div class="mb-8 flex flex-wrap justify-center gap-3">
			{#each availableYears as year (year)}
				<button
					onclick={() => (selectedYear = year)}
					class="cursor-pointer rounded-full px-6 py-1.5 text-sm font-bold tracking-widest transition-all duration-300
                        {selectedYear === year
						? 'bg-pink-600 text-white shadow-lg shadow-pink-600/40'
						: 'border border-pink-500/30 bg-transparent text-pink-400/70 hover:bg-pink-900/40 hover:text-pink-200'}"
				>
					{year}
				</button>
			{/each}
		</div>
	{:else}
		<div class="mb-10"></div>
	{/if}

	<LettersGrid letters={filteredLetters} onLetterClick={openLetter} />

	{#if selectedLetter}
		<LetterModal letter={selectedLetter} onClose={closeLetter} />
	{/if}

	<NewAudioPlayer />
</main>

<style>
	main::-webkit-scrollbar {
		width: 8px;
	}
	main::-webkit-scrollbar-track {
		background: transparent;
	}
	main::-webkit-scrollbar-thumb {
		background-color: #fbcfe8;
		border-radius: 20px;
		border: 2px solid #05020a;
	}
</style>
