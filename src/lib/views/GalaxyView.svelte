<script lang="ts">
	import AudioPlayer from "../components/AudioPlayer.svelte";
	import CardModal from "../components/CardModal.svelte";
	import GalaxyCanvas from "../components/GalaxyCanvas.svelte";

	import { WORDS_DICT, PLANET_DATA, type PlanetData } from "../data/words";

	interface Props {
		isAudioPlaying: boolean;
		toggleAudio: () => void;
		randomNum: number;
	}

	let { isAudioPlaying, toggleAudio, randomNum }: Props = $props();

	let selectedPlanet = $state<PlanetData | null>(null);
</script>

<main class="relative h-screen w-full overflow-hidden bg-[#05020a]">
	<AudioPlayer isPlaying={isAudioPlaying} {toggleAudio} />

	<GalaxyCanvas
		words={WORDS_DICT}
		planets={PLANET_DATA}
		{randomNum}
		onSelectPlanet={(planet) => (selectedPlanet = planet)}
	/>

	<CardModal planet={selectedPlanet} onClose={() => (selectedPlanet = null)} />
</main>
