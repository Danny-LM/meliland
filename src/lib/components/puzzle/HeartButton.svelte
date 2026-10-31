<script lang="ts">
	import { scale } from 'svelte/transition';
	import { backOut } from 'svelte/easing';
	import type { Phase } from '$lib/data/puzzle';
	import type { PhaseStatus } from '$lib/state/state.svelte';

	let {
		phase,
		index,
		status,
		onOpen
	}: {
		phase: Phase;
		index: number;
		status: PhaseStatus;
		onOpen: (index: number) => void;
	} = $props();

	const statusLabel = $derived(
		status === 'done' ? 'completado' : status === 'available' ? 'disponible' : 'bloqueado'
	);
</script>

<button
	type="button"
	class="heart"
	data-state={status}
	aria-label="Corazón {index + 1}: {phase.title} ({statusLabel})"
	aria-disabled={status === 'locked'}
	onclick={() => onOpen(index)}
>
	<svg
		class="shape"
		viewBox="0 0 24 24"
		fill="currentColor"
		aria-hidden="true"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M18.494 3.801C20.589 5.021 22.063 7.501 21.998 10.393C21.86 16.5 13.5 21 12 21C10.5 21 2.13901 16.5 2.00201 10.393C1.93701 7.5 3.41101 5.022 5.50601 3.8C7.46601 2.658 9.92801 2.652 12 4.337C14.072 2.652 16.534 2.658 18.494 3.8"
		/>
	</svg>

	<span class="icon">
		{#key status}
			<span class="pop" in:scale={{ start: 0.4, duration: 300, easing: backOut }}>
				{#if status === 'done'}
					<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M21.546 5.11198C21.8272 5.39327 21.9852 5.77474 21.9852 6.17248C21.9852 6.57023 21.8272 6.95169 21.546 7.23298L10.232 18.547C9.9507 18.8282 9.56924 18.9862 9.1715 18.9862C8.77375 18.9862 8.39229 18.8282 8.111 18.547L2.454 12.89C2.31073 12.7516 2.19646 12.5861 2.11784 12.4031C2.03923 12.2201 1.99785 12.0233 1.99612 11.8241C1.99439 11.6249 2.03234 11.4274 2.10776 11.2431C2.18318 11.0587 2.29456 10.8912 2.4354 10.7504C2.57624 10.6095 2.74372 10.4982 2.92806 10.4227C3.11241 10.3473 3.30993 10.3094 3.5091 10.3111C3.70827 10.3128 3.9051 10.3542 4.0881 10.4328C4.27111 10.5114 4.43663 10.6257 4.575 10.769L9.171 15.365L19.424 5.11198C19.5633 4.97259 19.7287 4.86202 19.9107 4.78657C20.0928 4.71113 20.2879 4.6723 20.485 4.6723C20.6821 4.6723 20.8772 4.71113 21.0592 4.78657C21.2413 4.86202 21.4067 4.97259 21.546 5.11198Z"
							fill-rule="evenodd"
							clip-rule="evenodd"
							fill="currentColor"
						/>
					</svg>
				{:else if status === 'locked'}
					<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M6 22H18C19.1 22 20 21.1 20 20V11C20 9.9 19.1 9 18 9H17V7C17 4.24 14.76 2 12 2C9.24 2 7 4.24 7 7V9H6C4.9 9 4 9.9 4 11V20C4 21.1 4.9 22 6 22ZM13 17.72V20H11V17.72C10.6977 17.5455 10.4464 17.2949 10.2709 16.9932C10.0955 16.6914 10.0021 16.349 10 16C10 14.9 10.9 14 12 14C13.1 14 14 14.9 14 16C13.9979 16.349 13.9045 16.6914 13.7291 16.9932C13.5536 17.2949 13.3023 17.5455 13 17.72ZM9 7C9 5.35 10.35 4 12 4C13.65 4 15 5.35 15 7V9H9V7Z"
							fill="currentColor"
						/>
					</svg>
				{:else}
					<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M6 22H18C19.1 22 20 21.1 20 20V11C20 9.9 19.1 9 18 9H9V7C9 5.35 10.35 4 12 4C13.65 4 15 5.35 15 7H17C17 4.24 14.76 2 12 2C9.24 2 7 4.24 7 7V9H6C4.9 9 4 9.9 4 11V20C4 21.1 4.9 22 6 22ZM12 14C13.1 14 14 14.9 14 16C13.9979 16.349 13.9045 16.6914 13.7291 16.9932C13.5536 17.2949 13.3023 17.5455 13 17.72V20H11V17.72C10.6977 17.5455 10.4464 17.2949 10.2709 16.9932C10.0955 16.6914 10.0021 16.349 10 16C10 14.9 10.9 14 12 14Z"
							fill="currentColor"
						/>
					</svg>
				{/if}
			</span>
		{/key}
	</span>
</button>

<style>
	.heart {
		display: grid;
		place-items: center;
		width: 4.25rem;
		height: 4.25rem;
		transition:
			scale 0.25s,
			filter 0.25s,
			color 0.4s;
	}

	.heart > * {
		grid-area: 1 / 1;
	}

	.shape {
		width: 100%;
		height: 100%;
	}

	.icon {
		display: grid;
		place-items: center;
		color: white;
		filter: drop-shadow(0 1px 3px rgb(0 0 0 / 0.5));
		pointer-events: none;
	}

	.pop {
		display: grid;
		place-items: center;
	}

	.pop svg {
		width: 1.2rem;
		height: 1.2rem;
	}

	.heart[data-state='locked'] {
		color: #3b2150;
		cursor: not-allowed;
	}

	.heart[data-state='locked'] .icon {
		opacity: 0.6;
	}

	.heart[data-state='available'] {
		color: #d946ef;
		cursor: pointer;
		filter: drop-shadow(0 0 10px rgb(217 70 239 / 0.8));
		animation: beat 1.3s ease-in-out infinite;
	}

	.heart[data-state='done'] {
		color: #f472b6;
		cursor: pointer;
		filter: drop-shadow(0 0 8px rgb(244 114 182 / 0.6));
	}

	.heart:hover:not([data-state='locked']) {
		scale: 1.12;
	}

	@keyframes beat {
		0%,
		100% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.08);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.heart {
			animation: none !important;
		}
	}
</style>
