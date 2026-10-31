import { matchesAnswer } from '$lib/utils/normalize-answer';
import { wrongMessages } from "$lib/data/puzzle";
import type { Phase } from '$lib/data/puzzle';

export type PhaseStatus = 'locked' | 'available' | 'done';

export type QuestionSession = {
	phaseIndex: number;
	answer: string;
	error: string;
	showHint: boolean;
	solved: boolean;
};

const STORAGE_KEY = 'moth4-puzzle-progress-v1';

export function createPuzzleState(phases: Phase[]) {
	let completed = $state<boolean[]>(phases.map(() => false));
	let session = $state<QuestionSession | null>(null);

	let letterOpen = $state(false);
	let unlockedSeen = $state(false);
	let lockShake = $state(false);

	let mounted = $state(false);

	const current = $derived(completed.indexOf(false));
	const allDone = $derived(current === -1);

	function statusOf(index: number): PhaseStatus {
		if (completed[index]) return 'done';
		return index === current ? 'available' : 'locked';
	}

	function openPhase(index: number): boolean {
		const status = statusOf(index);

		if (status === 'locked') {
			nudgeLock();
			return false;
		}

		session = {
			phaseIndex: index,
			answer: '',
			error: '',
			showHint: false,
			solved: status === 'done'
		};

		return true;
	}

	function closeSession(): boolean {
		session = null;

		if (allDone && !unlockedSeen) {
			unlockedSeen = true;
			return true;
		}

		return false;
	}

	function submitAnswer(): boolean {
		if (!session || session.solved) return false;

		const phase = phases[session.phaseIndex];

		if (!session.answer.trim()) {
			session.error = 'Escribe algo primero mi niña :D';
			return false;
		}

		if (!matchesAnswer(session.answer, phase.answers, phase.exact)) {
			session.error = pick(wrongMessages);

			return false;
		}

		completed[session.phaseIndex] = true;
		session.solved = true;
		session.error = '';

		return true;
	}

	function toggleHint() {
		if (session) {
			session.showHint = !session.showHint;
		}
	}

	function openLetter() {
		if (!allDone) {
			nudgeLock();
			return false;
		}

		letterOpen = true;
		return true;
	}

	function closeLetter() {
		letterOpen = false;
	}

	function resetProgress() {
		completed = phases.map(() => false);
		session = null;
		letterOpen = false;
		unlockedSeen = false;
		lockShake = false;
		persist();
	}

	function restoreProgress() {
		try {
			const saved: unknown = JSON.parse(
				localStorage.getItem(STORAGE_KEY) ?? 'null'
			);

			if (
				Array.isArray(saved) &&
				saved.length === phases.length &&
				saved.every((value) => typeof value === 'boolean')
			) {
				let nextLocked = false;

				completed = saved.map((value) => {
					if (nextLocked || !value) {
						nextLocked = true;
						return false;
					}

					return true;
				});

				unlockedSeen = completed.every(Boolean);
			}
		} catch {
			// 
		}

		mounted = true;
	}

	function persist() {
		if (!mounted) return;

		try {
			localStorage.setItem(
				STORAGE_KEY,
				JSON.stringify(completed)
			);
		} catch {
			// 
		}
	}

	function nudgeLock() {
		lockShake = true;
	}

	function stopLockShake() {
		lockShake = false;
	}

	function pick<T>(items: T[]): T {
		return items[Math.floor(Math.random() * items.length)];
	}

	return {
		get completed() {
			return completed;
		},
		get current() {
			return current;
		},
		get allDone() {
			return allDone;
		},
		get session() {
			return session;
		},
		get letterOpen() {
			return letterOpen;
		},
		get unlockedSeen() {
			return unlockedSeen;
		},
		get lockShake() {
			return lockShake;
		},
		get mounted() {
			return mounted;
		},
		statusOf,
		openPhase,
		closeSession,
		submitAnswer,
		toggleHint,
		openLetter,
		closeLetter,
		resetProgress,
		restoreProgress,
		persist,
		stopLockShake
	};
}
