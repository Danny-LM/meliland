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

export const wrongMessages = [
    'Mmm... no es esa mi amor, intenta de nuevo',
    'Estas cerca mi amor :D',
    'Nope, esa no es, pero tu puedes :D',
];

export const letter: Letter = {
    id: 'moth4-letter',
    date: '2026-10-28',
    title: 'FELIZ 4to MES MI AMOR',
    content: [
        /* ---------- Inicio :D ---------- */
		{ type: 'text', text: 'Hola, mi amooor. Feliz 4to mes juntos :D' },
		{
			type: 'text',
			text: 'Solo quería darte las gracias por hacerme parte de tu vida durante este tiempo, gracias por seguir regalándome tu tiempo, aunque este mes haya sido poco, se aprecia muchísimo, pues, contigo cada momento se vuelve muy especial para mi :D'
		},

		/* ---------- Lo que eres para mi ---------- */
		{
			type: 'text',
			text: 'Eres demasiado importante para mí, te amo muchísimo, te amodoro, te quiero, te deseo lo mejor y te agradezco por hacerme reír y por cruzarte conmigo durante aquella pandemia'
		},
		{
			type: 'text',
			text: 'Eres tan... tan... bonita, linda, valiosa, maravillosa, preciosa, increíble, única y perfecta'
		},
		{
			type: 'text',
			text: 'Tambien quiero decir que me importas, vales la pena, eres suficiente. Así que sí, te mereces todo lo bonito, no te falta nada. Eres un amor de niña, trabajadora, guapísima, y tienes un corazón enormemente precioso'
		},
		{
			type: 'text',
			text: 'Y sí, yo sería Nasa de Tonikawa cuando tuvo ese sueño donde Tsukasita lo ignora y se va, pues yo... sentiría ese mismo vacío si algún día te perdiera'
		},
		{ type: 'image', src: '/images/melidan.png', alt: 'melidan', align: 'center' },

		/* ---------- Songs ---------- */
		{
			type: 'text',
			text: 'Y como a veces las palabras no me alcanzan, tengo unas canciones más para ti, algunas ya las conocías, porque te las dediqué en su momento, pero todavía no estaban en la playlist y quería añadirlas'
		},

		{ type: 'heading', text: 'After Dark - Mr.Kitty' },
		{
			type: 'text',
			text: 'En su momento fue mi favorita y quería que también estuviera en nuestra playlist. Esta canción significa mucho para mí, pues me recuerda a una etapa de mi vida donde quería compartir contigo un pedacito de ella (que ya lo hago :D). De alguna manera, también me gusta pensar que ahora forma parte de nuestra historia :D'
		},

		{ type: 'heading', text: 'Love You Like A Love Song - Selena Gomez' },
		{
			type: 'text',
			text: 'Jaja, esta ya la conoces porque te la dediqué hace tiempo y así te amo yo, con todo y los altibajos. Sé que este mes hemos estado más distantes y te pido perdón por haber estado tan distraído, pero tampoco quise molestarte ahora que estás y seguirás, un poco más ocupada'
		},

		{ type: 'heading', text: 'Sparks - Coldplay' },
		{
			type: 'text',
			text: 'Esta va por lo mucho que te he extrañado: me siento así, un poco triste, pero amándote, jaja, perdón por todas las veces que te hice sentir mal y mil perdones por las veces que me sentiste distante, nunca fue a propósito'
		},

		{ type: 'heading', text: 'Photograph - Ed Sheeran' },
		{
			type: 'text',
			text: 'Esta se la dediqué a Bonny cuando... ammm ya sabes, tiene un significado muy, muy preciado para mí. Sabes lo importante que fue y sigue siendo para mi. Y si... ahora también va para ti porque aprecio muchísimo cada foto y video que me mandas. Tanto, que incluso en el tiempo que dejamos de hablar guardé lo que pude, manteniendo ese amor en esas fotografías'
		},
		{ type: 'image', src: '/images/may.jpg', alt: 'meli serenata', align: 'center' },

		{ type: 'heading', text: 'Contigo - Luis Miguel' },
		{
			type: 'text',
			text: 'Todo lo que quiero hacer contigo, todo lo que me gustaría, aunque esos 900 km nos separan bastante :c pero al menos todos los días que me levanto ahí estás... pues lo primero que hago es ver si tengo un mensaje tuyo o dejarte uno, salvo cuando me levanto re tarde jaja porque primero tengo que darles de comer a mis pobres conejos xd'
		},

		{ type: 'text', text: 'Gracias por estos cuatro meses, te amo mucho mucho mucho mucho mucho mi amooooor :D' }
    ]
};
