<script lang="ts">
	import { resolve } from '$app/paths';
	import { MONTHSARY_DAY, START_DATE, REPLAY_INTRO } from '$lib/config/flowers';
	import { monthsElapsed } from '$lib/utils/date';
	import Seed from '$lib/components/flowers/Seed.svelte';
	import TulipMini from '$lib/components/flowers/TulipMini.svelte';
	import LetterModal from '$lib/components/LetterModal.svelte';
	import Tulip from '$lib/components/flowers/Tulip.svelte';
	import { fade, scale, fly } from 'svelte/transition';
	import type { Letter } from '$lib/types';
	import Envelope from '$lib/components/Envelope.svelte';
	import tulip from '$lib/assets/tulip.svg';

	type SceneState = 'idle' | 'falling' | 'growing' | 'ready';

	let sceneState = $state<SceneState>(REPLAY_INTRO ? 'idle' : 'ready');
	let isLetterOpen = $state(false);
	let totalMinis = $derived(monthsElapsed(START_DATE, MONTHSARY_DAY));
	let minisArray = $derived(Array.from({ length: totalMinis }, (_, i) => i));

	const currentLetter: Letter = {
		id: 'special-flower-letter',
		date: '2026-09-21',
		title: '💛 PARA MI AMOR 💛',
		content: [
			{
				type: 'text',
				text: 'Apoco sí creías que dejaría pasar este día mi amor?'
			},
			{
				type: 'image',
				src: 'https://avatars.fastly.steamstatic.com/dccc6f514456e51a938bc9616586dde886277c69_full.jpg',
				alt: 'apoco si?',
				align: 'center'
			},
			{
				type: 'text',
				text: 'Sé lo mucho que te gustan los tulipanes y también lo mucho que querías que alguien te regalara tus flores amarillas, por eso no quería que este día pasara como si nada. \n\nY aunque esto no era mi plan original (problemitas con el plan original), no quería dejarte sin nada. Aunque fuese pequeño, lo quería hacer para ti, y aunque estamos en el hemisferio norte y para nosotros la primavera ya pasó, igual quería que supieras que me importas con este detalle para ti \n\nPensé en los tulipanes porque sé que te gustan, así que mezclé tus dos cosas preferidas :D y pues espero que te gusten mi amor'
			},
			{
				type: 'image',
				src: 'https://i.pinimg.com/originals/b9/24/a8/b924a80f127186af122ca4a3809784be.jpg',
				alt: 'tulipanes amarillos',
				align: 'center'
			},
			{
				type: 'text',
				text: 'Y quién sabe... quizás algún día tus flores virtuales se vuelvan reales :D'
			}
		]
	};

	function handlePlant() {
		sceneState = 'falling';

		setTimeout(() => {
			sceneState = 'growing';

			setTimeout(() => {
				sceneState = 'ready';
			}, 2500);
		}, 800);
	}
</script>

<svelte:head>
	<title>Your Flowers</title>
	<link rel="icon" href={tulip} />
</svelte:head>

<div
	class="page-cursor relative flex h-dvh w-full flex-col overflow-hidden bg-[#FFF6E3] text-[#2E2412]"
>
	<a
		href={resolve('/')}
		class="absolute top-6 left-6 z-50 inline-block cursor-pointer text-xs font-semibold tracking-widest text-[#8b7355]/70 uppercase transition-colors hover:text-[#5c4033] sm:text-sm"
	>
		&larr; Volver al menú
	</a>

	<!-- TITLE -->
	<div class="z-40 flex shrink-0 flex-col items-center px-4 pt-16 sm:pt-12">
		{#if sceneState === 'ready'}
			<div
				in:fly={{ y: -30, duration: 1000, delay: 200 }}
				class="pointer-events-none flex flex-col items-center gap-1 text-center"
			>
				<h1 class="text-2xl font-bold tracking-tight sm:text-4xl">💛 PARA TI MI AMOOOR 💛</h1>
				<p class="text-xs font-medium opacity-75 sm:text-base">
					porque te lo mereces y mucho mas por iluminar mis dias
				</p>
			</div>
		{/if}
	</div>

	<div class="z-20 flex min-h-0 w-full flex-1 flex-col">
		<div class="relative flex min-h-0 flex-1 items-center justify-center">
			{#if sceneState === 'ready'}
				<div
					in:fly={{ y: 20, duration: 800, delay: 500 }}
					class="pointer-events-auto scale-[0.70] sm:scale-85 md:scale-100"
				>
					<Envelope
						onclick={() => (isLetterOpen = true)}
						heartColor="#E8AD21"
						outlineColor="#FFD751"
						bodyColor="#FFF6E3"
					/>
				</div>
			{/if}
		</div>

		<div class="relative flex min-h-0 flex-[1.3] items-end justify-center">
			{#if sceneState === 'growing' || sceneState === 'ready'}
				<div
					in:scale={{ duration: 1000, start: 0.8 }}
					out:fade
					class="origin-bottom translate-y-8 scale-[0.75] sm:scale-[0.80] md:scale-[0.85]"
				>
					<Tulip isReady={sceneState === 'growing' || sceneState === 'ready'} />
				</div>
			{/if}
		</div>
	</div>

	<!-- GRASS -->
	<div class="relative z-30 h-24 w-full shrink-0 bg-[#4E8B49]">
		{#if sceneState === 'ready'}
			<div
				class="pointer-events-none absolute bottom-6 flex w-full flex-wrap justify-center gap-2 px-4"
			>
				{#each minisArray as index (index)}
					<TulipMini {index} />
				{/each}
			</div>
		{/if}
	</div>

	<!-- SEED -->
	{#if sceneState === 'idle' || sceneState === 'falling'}
		<div class="pointer-events-auto absolute inset-0 z-50 flex items-center justify-center pb-24">
			<Seed isFalling={sceneState === 'falling'} onPlant={handlePlant} />
		</div>
	{/if}

	{#if isLetterOpen}
		<LetterModal letter={currentLetter} onClose={() => (isLetterOpen = false)} />
	{/if}
</div>

<style>
	.page-cursor {
		cursor:
			url('/icon/tulip-cursor.svg') 12 12,
			auto;
	}

	:global(html, body) {
		height: 100%;
		overflow: hidden;
		overscroll-behavior: none;
	}
</style>
