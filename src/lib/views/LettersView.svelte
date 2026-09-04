<script lang="ts">
	import LettersGrid from "../components/LettersGrid.svelte";
	import LetterModal from "../components/LetterModal.svelte";
	import NewAudioPlayer from "../components/NewAudioPlayer.svelte";
	import type { AudioTrack, Letter } from "../types";
	import { navigateTo } from "$lib/navigation";
	import { onDestroy } from "svelte";
	import { LETTER_DATA } from "../data/words";

	let selectedLetter = $state<Letter | null>(null);

	let currentTrack = $state<AudioTrack | null>(null);
	let isPlaying = $state(false);
	let audioElement: HTMLAudioElement;

	const availableYears = [...new Set(LETTER_DATA.map((l) => l.date.split("-")[0]))].sort(
		(a, b) => Number(b) - Number(a)
	);

	let selectedYear = $state(availableYears[0] || new Date().getFullYear().toString());

	let filteredLetters = $derived(LETTER_DATA.filter((l) => l.date.startsWith(selectedYear)));

	function openLetter(letter: Letter) {
		selectedLetter = letter;

		if (letter.track && letter.track.audioFile !== currentTrack?.audioFile) {
			currentTrack = letter.track;
			isPlaying = true;

			setTimeout(() => {
				if (audioElement) {
					audioElement.play().catch((e) => {
						console.warn("Bloqueado por el navegador", e);
						isPlaying = false;
					});
				}
			}, 50);
		}
	}

	function closeLetter() {
		selectedLetter = null;
	}

	function handleToggle() {
		if (!audioElement) return;
		if (isPlaying) {
			audioElement.pause();
			isPlaying = false;
		} else {
			audioElement.play().catch(() => {});
			isPlaying = true;
		}
	}

	onDestroy(() => {
		if (audioElement) {
			audioElement.pause();
			audioElement.src = "";
		}
	});
</script>

<audio bind:this={audioElement} src={currentTrack?.audioFile} loop preload="auto"></audio>

<main class="h-screen w-full overflow-y-auto bg-[#05020a] p-6 pb-32 text-white md:p-10">
	<button
		onclick={() => navigateTo("/")}
		class="mb-6 inline-block cursor-pointer text-sm tracking-widest text-pink-400/50 uppercase transition-colors hover:text-pink-400"
	>
		&larr; Volver al menu
	</button>

	<h1 class="mb-4 text-center text-2xl font-bold text-pink-400 md:text-3xl">Nuestros Mensajes</h1>

	{#if availableYears.length > 1}
		<div class="mb-8 flex flex-wrap justify-center gap-3">
			{#each availableYears as year (year)}
				<button
					onclick={() => (selectedYear = year)}
					class="cursor-pointer rounded-full px-6 py-1.5 text-sm font-bold tracking-widest transition-all duration-300
                           {selectedYear === year
						? "bg-pink-600 text-white shadow-lg shadow-pink-600/40"
						: "border border-pink-500/30 bg-transparent text-pink-400/70 hover:bg-pink-900/40 hover:text-pink-200"}"
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

	{#if currentTrack}
		<NewAudioPlayer track={currentTrack} {isPlaying} toggleAudio={handleToggle} />
	{/if}
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
