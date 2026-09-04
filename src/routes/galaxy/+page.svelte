<script lang="ts">
	import { onMount, onDestroy } from "svelte";
	import NewAudioPlayer from "$lib/components/NewAudioPlayer.svelte";
	import CardModal from "$lib/components/CardModal.svelte";
	import GalaxyCanvas from "$lib/components/GalaxyCanvas.svelte";
	import { WORDS_DICT, PLANET_DATA, TRACKS, type PlanetData } from "$lib/data/words";
	import { navigateTo } from "$lib/navigation";

	let isAudioPlaying = $state(false);
	let selectedPlanet = $state<PlanetData | null>(null);
	let randomNum = $state(Math.floor(Math.random() * 4) + 1);
	let audioElement: HTMLAudioElement;

	let song = TRACKS[0];

	onMount(() => {
		if (audioElement) {
			audioElement
				.play()
				.then(() => {
					isAudioPlaying = true;
				})
				.catch(() => {
					isAudioPlaying = false;
				});
		}
	});

	onDestroy(() => {
		if (audioElement) {
			audioElement.pause();
			audioElement.src = "";
		}
	});

	function toggleAudio() {
		if (!audioElement) return;
		if (isAudioPlaying) {
			audioElement.pause();
			isAudioPlaying = false;
		} else {
			audioElement.play().catch(() => {});
			isAudioPlaying = true;
		}
	}
</script>

<audio bind:this={audioElement} src={song.audioFile} loop preload="auto"></audio>

<main class="relative h-screen w-full overflow-hidden bg-[#05020a]">
	<button
		onclick={() => navigateTo("/")}
		class="absolute top-6 left-6 z-50 inline-block cursor-pointer text-sm tracking-widest text-pink-400/50 uppercase transition-colors hover:text-pink-400"
	>
		&larr; Volver al menu
	</button>

	<NewAudioPlayer track={song} isPlaying={isAudioPlaying} {toggleAudio} />

	<GalaxyCanvas
		words={WORDS_DICT}
		planets={PLANET_DATA}
		{randomNum}
		onSelectPlanet={(planet) => (selectedPlanet = planet)}
	/>

	<CardModal planet={selectedPlanet} onClose={() => (selectedPlanet = null)} />
</main>
