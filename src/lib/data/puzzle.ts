import type { Letter } from '$lib/types';

export type Phase = {
    id: string;
    title: string;
    question: string;
    answers: string[];
    exact?: boolean;
    hint: string;
    reward: string;
};

export const phases: Phase[] = [
    {
        id: "1",
        title: "La pieza escondida",
        question: "Armaste el puzzle? :o bueno seguro ya sabes que poner :D",
        answers: ["21"],
        hint: "Mira bien el puzzle, ese ? no esta ahi por casualidad",
        reward: "Sabia que podrias mi amooor :D",
    },
    {
        id: "2",
        title: "Solo nuestro",
        question: "Apoco...",
        answers: ["no","si","shi"],
        exact: true,
        hint: "2",
        reward: "2",
    },
    {
        id: "3",
        title: "Aquella noche",
        question: "Te acuerdas de aquella noche, bueno... solo dime el dia y mes si es asi :D",
        answers: ["28 de junio", "28 junio", "junio 28", "28/06", "28/6", "06/28", "6/28"],
        hint: "3",
        reward: "3",
    },
];

export const letter: Letter = {
    id: 'moth4-letter',
    date: '2026-10-28',
    title: 'FELIZ 4to MES MI AMOR',
    content: []
};

export const wrongMessages = [
    'Mmm... no es esa mi amor, intenta de nuevo',
    'Estas cerca mi amor :D',
    'Nope, esa no es, pero tu puedes :D',
];
