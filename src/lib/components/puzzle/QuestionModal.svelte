<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { fade, fly, scale } from 'svelte/transition';
	import { backOut } from 'svelte/easing';
	import type { Phase } from '$lib/data/puzzle';
	import type { QuestionSession } from '$lib/state/state.svelte';

	let {
		phase,
		index,
		total,
		session,
		onClose,
		onSubmit,
		onToggleHint
	}: {
		phase: Phase;
		index: number;
		total: number;
		session: QuestionSession;
		onClose: () => void;
		onSubmit: () => void;
		onToggleHint: () => void;
	} = $props();

	const reduced =
		typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
	const ms = (n: number) => (reduced ? 0 : n);

	const focusRing =
		'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c0416]';

	let dialogEl = $state<HTMLDialogElement>();
	let pointerStartedOnBackdrop = false;

	onMount(() => {
		const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
		dialogEl?.showModal();

		return () => {
			if (opener?.isConnected) opener.focus({ preventScroll: true });
		};
	});

	$effect(() => {
		void session.solved;
		tick().then(() =>
			dialogEl?.querySelector<HTMLElement>('[data-autofocus]')?.focus({ preventScroll: true })
		);
	});

	const describedBy = $derived(
		[session.error ? 'answer-error' : null, session.showHint ? 'hint-text' : null]
			.filter(Boolean)
			.join(' ') || undefined
	);
</script>

<dialog
	bind:this={dialogEl}
	aria-labelledby="phase-title"
	aria-describedby={session.solved ? 'reward-text' : 'question-text'}
	class="modal m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-md overflow-y-auto overscroll-contain rounded-3xl border border-purple-500/40 bg-linear-to-b from-[#1f0d35] to-[#0c0416] p-0 text-white shadow-[0_0_60px_rgba(168,85,247,0.35)]"
	class:shake={!!session.error}
	in:scale={{ start: 0.85, duration: ms(300), easing: backOut }}
	out:fly={{ y: 20, duration: ms(200) }}
	oncancel={(event) => {
		event.preventDefault();
		onClose();
	}}
	onpointerdown={(event) => (pointerStartedOnBackdrop = event.target === event.currentTarget)}
	onclick={(event) => {
		if (pointerStartedOnBackdrop && event.target === event.currentTarget) onClose();
	}}
>
	<div class="p-6">
		<div class="flex items-start justify-between gap-4">
			<div>
				<p class="text-xs font-semibold tracking-widest text-fuchsia-300 uppercase">
					→ Corazón {index + 1} de {total}, mi amor
				</p>

				<div class="mt-2 flex gap-1.5" aria-hidden="true">
					{#each { length: total }, i}
						<span
							class="h-1.5 w-6 rounded-full transition-colors {i <= index
								? 'bg-fuchsia-400'
								: 'bg-purple-500/30'}"
						></span>
					{/each}
				</div>
			</div>

			<button
				type="button"
				class="-mt-2 -mr-2 grid h-11 w-11 place-items-center rounded-full text-purple-200 transition hover:bg-purple-500/10 hover:text-white {focusRing}"
				aria-label="Volver al candado"
				onclick={onClose}
			>
				<svg
					class="h-5 w-5"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M6 6l12 12M18 6L6 18" />
				</svg>
			</button>
		</div>

		<h2 id="phase-title" class="mt-3 text-xl font-bold text-purple-100">
			{phase.title}
		</h2>

		{#if session.solved}
			<div class="mt-6 text-center" in:fly={{ y: 10, duration: ms(300) }}>
				<svg
					class="mx-auto block h-14 w-14 drop-shadow-[0_0_12px_rgba(244,114,182,0.7)]"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
					in:scale={{ start: 0.3, duration: ms(500), delay: ms(150), easing: backOut }}
				>
					<path
						d="M18.494 3.801C20.589 5.021 22.063 7.501 21.998 10.393C21.86 16.5 13.5 21 12 21C10.5 21 2.13901 16.5 2.00201 10.393C1.93701 7.5 3.41101 5.022 5.50601 3.8C7.46601 2.658 9.92801 2.652 12 4.337C14.072 2.652 16.534 2.658 18.494 3.8"
						fill="#F472B6"
					/>
				</svg>

				<p
					id="solved-title"
					class="mt-4 text-sm font-semibold tracking-widest text-fuchsia-300 uppercase"
				>
					Muy Bien Amor
				</p>

				<p id="reward-text" class="mt-2 text-base text-purple-100">
					{phase.reward}
				</p>

				<button
					type="button"
					data-autofocus
					aria-describedby="solved-title reward-text"
					class="mt-6 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-purple-600 to-fuchsia-500 px-4 py-3 font-semibold text-white shadow-lg transition hover:brightness-110 active:scale-95 {focusRing}"
					onclick={onClose}
				>
					{#if index === total - 1}
						Abre el candado mi cielo :D
						<svg
							class="h-5 w-5"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							aria-hidden="true"
						>
							<path
								d="M6 22H18C19.1 22 20 21.1 20 20V11C20 9.9 19.1 9 18 9H9V7C9 5.35 10.35 4 12 4C13.65 4 15 5.35 15 7H17C17 4.24 14.76 2 12 2C9.24 2 7 4.24 7 7V9H6C4.9 9 4 9.9 4 11V20C4 21.1 4.9 22 6 22ZM12 14C13.1 14 14 14.9 14 16C13.9979 16.349 13.9045 16.6914 13.7291 16.9932C13.5536 17.2949 13.3023 17.5455 13 17.72V20H11V17.72C10.6977 17.5455 10.4464 17.2949 10.2709 16.9932C10.0955 16.6914 10.0021 16.349 10 16C10 14.9 10.9 14 12 14Z"
								fill="currentColor"
							/>
						</svg>
					{:else}
						Sigamos mi amooor :D
						<span aria-hidden="true">→</span>
					{/if}
				</button>
			</div>
		{:else}
			<form
				class="mt-4 space-y-3"
				onsubmit={(event) => {
					event.preventDefault();
					onSubmit();
				}}
			>
				<label id="question-text" for="answer-input" class="block text-base text-purple-50">
					{phase.question}
				</label>

				<input
					id="answer-input"
					name="answer"
					data-autofocus
					bind:value={session.answer}
					type="text"
					autocomplete="off"
					autocapitalize="none"
					autocorrect="off"
					spellcheck="false"
					enterkeyhint="send"
					placeholder="Dime, mi amor…"
					aria-invalid={session.error ? 'true' : undefined}
					aria-describedby={describedBy}
					class="min-h-12 w-full rounded-xl border border-purple-500/40 bg-black/40 px-4 py-3 text-base text-white placeholder:text-purple-300/60 focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-400/40 focus:outline-none"
				/>

				{#if session.error}
					<p
						id="answer-error"
						class="text-sm text-rose-300"
						role="alert"
						in:fly={{ y: -6, duration: ms(200) }}
					>
						{session.error}
					</p>
				{/if}

				{#if session.showHint}
					<p
						id="hint-text"
						class="flex items-start gap-2 rounded-xl bg-purple-500/10 p-3 text-sm text-purple-200 italic"
						in:fade={{ duration: ms(200) }}
					>
						<svg
							class="mt-0.5 h-5 w-5 shrink-0 text-fuchsia-300"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							aria-hidden="true"
						>
							<path
								d="M4.5 9.766C4.5 5.737 7.874 2.5 12 2.5C16.126 2.5 19.5 5.737 19.5 9.766C19.5 12.12 18.527 14.244 16.705 15.583C16.5935 15.6593 16.5127 15.7727 16.477 15.903C16.423 16.131 16.364 16.392 16.303 16.672C16.2888 16.7394 16.2518 16.7998 16.1982 16.8432C16.1447 16.8865 16.0779 16.9101 16.009 16.91H7.991C7.92212 16.9101 7.8553 16.8865 7.80176 16.8432C7.74823 16.7998 7.71124 16.7394 7.697 16.672C7.636 16.392 7.577 16.131 7.523 15.902C7.48712 15.772 7.40633 15.659 7.295 15.583C5.473 14.243 4.5 12.12 4.5 9.766ZM8.4 18.41C8.35616 18.4102 8.31291 18.42 8.27323 18.4387C8.23356 18.4573 8.19842 18.4844 8.17025 18.518C8.14208 18.5515 8.12157 18.5909 8.11013 18.6332C8.09869 18.6755 8.0966 18.7198 8.104 18.763C8.197 19.319 8.266 19.816 8.287 20.16C8.35 21.201 9.117 22.059 10.142 22.28L10.338 22.323C11.4335 22.5587 12.5665 22.5587 13.662 22.323L13.858 22.28C14.883 22.059 15.65 21.201 15.713 20.16C15.734 19.817 15.803 19.32 15.897 18.763C15.9046 18.7196 15.9026 18.6751 15.8912 18.6326C15.8797 18.5901 15.8592 18.5506 15.8309 18.5169C15.8026 18.4832 15.7673 18.456 15.7274 18.4374C15.6875 18.4188 15.644 18.4091 15.6 18.409L8.4 18.41Z"
								fill="currentColor"
							/>
						</svg>
						<span><span class="sr-only">Una ayudita: </span>{phase.hint}</span>
					</p>
				{/if}

				<div class="flex gap-2 pt-1">
					<button
						type="button"
						aria-expanded={session.showHint}
						aria-controls={session.showHint ? 'hint-text' : undefined}
						class="min-h-11 rounded-xl border border-purple-500/40 px-4 py-3 text-sm text-purple-100 transition hover:bg-purple-500/10 {focusRing}"
						onclick={onToggleHint}
					>
						Pista
					</button>

					<button
						type="submit"
						class="min-h-11 flex-1 rounded-xl bg-linear-to-r from-purple-600 to-fuchsia-500 px-4 py-3 font-semibold text-white shadow-lg transition hover:brightness-110 active:scale-95 {focusRing}"
					>
						Probar
					</button>
				</div>
			</form>
		{/if}
	</div>
</dialog>

<style>
	.modal::backdrop {
		background: rgb(0 0 0 / 0.7);
		backdrop-filter: blur(4px);
		animation: backdrop-in 0.2s ease-out;
	}

	@keyframes backdrop-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.shake {
		animation: shake 0.45s;
	}

	@keyframes shake {
		10%,
		90% {
			transform: translateX(-2px);
		}
		20%,
		80% {
			transform: translateX(4px);
		}
		30%,
		50%,
		70% {
			transform: translateX(-6px);
		}
		40%,
		60% {
			transform: translateX(6px);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.shake,
		.modal::backdrop {
			animation: none;
		}
	}
</style>
