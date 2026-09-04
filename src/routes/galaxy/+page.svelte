<script lang="ts">
	import { resolve } from '$app/paths';
	import { onMount, onDestroy } from 'svelte';
	import NewAudioPlayer from '$lib/components/NewAudioPlayer.svelte';
	import CardModal from '$lib/components/CardModal.svelte';
	import GalaxyCanvas from '$lib/components/GalaxyCanvas.svelte';
	import { WORDS_DICT, PLANET_DATA, TRACKS, type PlanetData } from '$lib/data/words';
	import { globalAudio } from '$lib/state/audio.svelte';

	let selectedPlanet = $state<PlanetData | null>(null);
	let randomNum = $state(Math.floor(Math.random() * 4) + 1);
	let song = TRACKS[0];

	onMount(() => {
		globalAudio.setTrack(song);
	});

	onDestroy(() => {
		globalAudio.pause();
	});
</script>

<main class="relative h-screen w-full overflow-hidden bg-[#05020a]">
	<a
		href={resolve('/')}
		class="absolute top-6 left-6 z-50 inline-block cursor-pointer text-sm tracking-widest text-pink-400/50 uppercase transition-colors hover:text-pink-400"
	>
		&larr; Volver al menu
	</a>

	<NewAudioPlayer />

	<GalaxyCanvas
		words={WORDS_DICT}
		planets={PLANET_DATA}
		{randomNum}
		onSelectPlanet={(planet) => (selectedPlanet = planet)}
	/>

	<CardModal planet={selectedPlanet} onClose={() => (selectedPlanet = null)} />
</main>
