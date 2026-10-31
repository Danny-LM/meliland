<script lang="ts">
	import { onMount } from 'svelte';
	import PuzzleHeader from '$lib/components/puzzle/PuzzleHeader.svelte';
	import LockPanel from '$lib/components/puzzle/LockPanel.svelte';
	import QuestionModal from '$lib/components/puzzle/QuestionModal.svelte';
	import FloatingHearts from '$lib/components/puzzle/FloatingHearts.svelte';
	import LetterModal from '$lib/components/LetterModal.svelte';

	import { phases, letter } from '$lib/data/puzzle';
	import { createPuzzleState } from '$lib/state/state.svelte';

	const game = createPuzzleState(phases);

	let burstKey = $state(0);
    let burstCount = $state(14);

    function celebrate(count = 14) {
        burstCount = count;
        burstKey += 1;
    }

	function closeQuestion() {
		const shouldCelebrate = game.closeSession();

		if (shouldCelebrate) {
			celebrate(26);
		}
	}

	function submitAnswer() {
		if (game.submitAnswer()) {
			celebrate();
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key !== 'Escape') return;

		if (game.letterOpen) {
			game.closeLetter();
		} else if (game.session) {
			closeQuestion();
		}
	}

	onMount(() => {
		game.restoreProgress();
	});

	$effect(() => {
		if (!game.mounted) return;

		game.persist();
	});

	$effect(() => {
		if (!game.lockShake) return;

		const timer = setTimeout(() => {
			game.stopLockShake();
		}, 500);

		return () => clearTimeout(timer);
	});
</script>

<svelte:window onkeydown={handleKeydown} />

<main class="relative h-screen w-full overflow-y-auto bg-[#05020a] p-6 pb-32 text-white md:p-10">
	<div class="glow pointer-events-none fixed inset-0 z-0"></div>

	<div class="relative z-10 mx-auto flex w-full max-w-md flex-col items-center text-center">
		<PuzzleHeader revealText={game.allDone} />

		<LockPanel
			{phases}
			current={game.current}
			allDone={game.allDone}
			lockShake={game.lockShake}
			statusOf={game.statusOf}
			onOpenPhase={game.openPhase}
			onOpenLetter={game.openLetter}
		/>
	</div>
</main>

{#if game.session}
	<QuestionModal
		phase={phases[game.session.phaseIndex]}
		index={game.session.phaseIndex}
		total={phases.length}
		session={game.session}
		onClose={closeQuestion}
		onSubmit={submitAnswer}
		onToggleHint={game.toggleHint}
	/>
{/if}

{#if game.letterOpen}
	<LetterModal
		letter={letter}
		onClose={game.closeLetter}
	/>
{/if}

<FloatingHearts burstKey={burstKey} count={burstCount} />
