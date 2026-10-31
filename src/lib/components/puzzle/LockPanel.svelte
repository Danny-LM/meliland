<script lang="ts">
	import Envelope from '$lib/components/Envelope.svelte';
	import HeartButton from './HeartButton.svelte';
	import type { Phase } from '$lib/data/puzzle';
	import type { PhaseStatus } from '$lib/state/state.svelte';

	let {
		phases,
		current,
		allDone,
		lockShake,
		statusOf,
		onOpenPhase,
		onOpenLetter
	}: {
		phases: Phase[];
		current: number;
		allDone: boolean;
		lockShake: boolean;
		statusOf: (index: number) => PhaseStatus;
		onOpenPhase: (index: number) => void;
		onOpenLetter: () => void;
	} = $props();

	const stepTexts = [
		"Lista amor? toca el primer cora :D",
		"Increible mi niña, ahora el segundo cora :D",
		"Ya casiii mi hemosha, solo el ultimo cora :D"
	]
</script>

<section class="card-lock mt-10 flex w-full flex-col items-center" class:shake={lockShake}>
	<div class="shackle" class:open={allDone}></div>

	<div
		class="lock-body w-full rounded-3xl border-2 border-purple-700/60 bg-linear-to-br from-purple-950 via-[#1a0b2e] to-[#12071f] p-5"
		class:open={allDone}
	>
		<div
			class="flex justify-center transition duration-700"
			class:opacity-60={!allDone}
			class:blur-[1.5px]={!allDone}
			class:grayscale-[40%]={!allDone}
		>
			<Envelope
				onclick={onOpenLetter}
				heartColor="#49145D"
				outlineColor="#7E22CE"
				bodyColor="#E9D5FF"
			/>
		</div>

		<div class="mt-6 flex items-center justify-center gap-4">
			{#each phases as phase, i (phase.id)}
				<HeartButton
					{phase}
					index={i}
					status={statusOf(i)}
					onOpen={onOpenPhase}
				/>
			{/each}
		</div>
	</div>

	<p class="mt-5 min-h-6 text-sm text-purple-200/80">
		{#if allDone}
			Muy bien mi amooor, ya puedes abrir tu carta :D
		{:else}
			{stepTexts[current]}
		{/if}
	</p>
</section>
