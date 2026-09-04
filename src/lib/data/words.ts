import { base } from "$app/paths";
import type { AudioTrack, Letter } from "$lib/types";

export interface PlanetData {
    id: number;
    title: string;
    description: string;
    image: string;
    orbitRadius: number;
    speed: number;
}

export const WORDS_DICT: string[] = [
    "💖 Mi amor", "❤️ Mi vida", "👧 Mi niña", "👑 Mi reina", "👸 Mi princesa",
    "☁️ Mi cielo", "💎 Mi tesoro", "🫶 Mi corazón", "🌹 Mi razón", "😊 Mi felicidad",
    "✨ Mi alegría", "😁 Mi sonrisa", "🧸 Mi calma", "🕊️ Mi paz", "🏡 Mi refugio",
    "🏠 Mi hogar", "🌌 Mi universo", "🌍 Mi mundo", "⭐ Mi estrella",
    "☀️ Mi sol", "🌙 Mi luna", "💡 Mi luz", "😇 Mi angelito", "🍬 Mi bombón",
    "🍯 Mi dulzura", "🍭 Mi caramelito", "🌸 Mi florecita", "🌹 Mi rosita", "💐 Mi preciosa",
    "😍 Mi hermosa", "🌺 Mi linda", "🌷 Mi bonita", "🪆 Mi muñequita", "💝 Mi consentida",
    "🥇 Mi favorita", "🪄 Mi magia", "💭 Mi sueño", "🎨 Mi inspiración", "🌈 Mi esperanza",
    "🍀 Mi suerte", "💰 Mi fortuna", "🧭 Mi destino", "💫 Mi encanto", "🌟 Mi milagro",
    "💍 Mi joyita", "💎 Mi diamantito", "🔴 Mi rubí", "🦪 Mi perlita", "🍫 Mi chocolatito",
    "🍪 Mi galletita", "🧁 Mi pastelito", "🌞 Mi rayito", "✨ Mi brillito", "⭐ Mi estrellita",
    "☁️ Mi nubecita", "🎵 Mi canción", "🎶 Mi melodía", "📝 Mi poema", "📖 Mi cuento",
    "♾️ Mi eternidad", "🎁 Mi mejor regalo", "❤️‍🩹 Mi persona favorita", "🌸 Mi felicidad diaria",
    "😊 Mi razón de sonreír", "💕 Mi amorcito", "🌤️ Mi cielito", "💓 Mi vidita", "🥰 Mi ternurita",
    "💗 Mi cosita hermosa", "☀️ Mi rayito de sol", "🌌 Mi pedacito de cielo", "🌼 Mi pequeña felicidad",
    "💖 Mi corazón bonito", "🌺 Mi florecita preciosa", "👧 Mi chica favorita", "🌍 Mi todo"
];

export const PLANET_DATA: PlanetData[] = [
    {
        id: 1,
        title: "Mi Refugio",
        description: "Hace algunos años hicimos esa casita del fondo, jaja es curioso, no? Hace un mes iniciamos pero inconsciente y consciente ya lo sabíamos... sabíamos que queríamos vivir juntos y yo sé que un día así será, porque sin importar el lugar, tú te has vuelto mi refugio :D y quiero estar 80 billones de años contigo",
        image: `${base}/images/together1.png`,
        orbitRadius: 8,
        speed: 0.005
    },
    {
        id: 2,
        title: "Meliland",
        description: "Hace mucho te di una plaza como un regalo de cumpleaños, pero esa plaza se perdió... bueno no te preocupes, ya lo viste hace unos días, te estoy construyendo una nueva y mejor :D Además no será solo una plaza, será una ciudad que va a crecer con todos los lugares que quiero ver contigo una vez superemos esos 900 km jajaja",
        image: `${base}/images/together2.png`,
        orbitRadius: 13,
        speed: 0.003
    },
    {
        id: 3,
        title: "Sí, Acepto",
        description: "Curioso, no? En tu cumple así de la nada te llevé a ese altar que construí en el server, rodeados de amigos jaja y desde ese día oficialmente ya somos esposos al menos en el mundo del gaming pero... no puedo esperar a que llegue el momento de serlo IRL :D no solo en juegos yo espero que eso sea realidad, una realidad contigo",
        image: `${base}/images/together3.png`,
        orbitRadius: 15,
        speed: 0.002
    },
    {
        id: 4,
        title: "Nuestra Gran Aventura",
        description: "Si bien nuestro viaje apenas comienza, ya estoy emocionado por todo lo que nos falta por vivir, experimentar juntos y navegar contigo hacia nuestro futuro, preparando todo para cuando llegue nuestra pequeña Meli y poder contarle todas las historias que vivimos juntos será una muy bonita vida pero... de momento solo te quiero decir... FELIZ DIA DE LA NOVIA mi niña hermosa :D TE AMOOO MUCHO MUCHO MUCHO MUCHO",
        image: `${base}/images/together4.png`,
        orbitRadius: 18,
        speed: 0.003
    }
];

export const TRACKS: AudioTrack[] = [
    {
        songName: "Compartir",
        artist: "Carla Morrison",
        audioFile: `${base}/music/CarlaMorrison-Compartir.mp3`

    }
];

export const LETTER_DATA: Letter[] = [
    {
        id: "1",
        date: "2026-09-03",
        title: "El Inicio",
        content: [
            {
                type: "text",
                text: "Hola mi niña hermosa,\n\nEste es el primer mensaje de muchos. Quería que tuvieras un rincón especial en el universo que es solo nuestro.\n\nTe amo muchísimo."
            }
        ],
        track: TRACKS[0]
    },
    {
        id: "2",
        date: "2026-10-15",
        title: "Meliland y nuestro futuro",
        content: [
            {
                type: "text",
                text: "Mi niña,\n\nHoy me puse a pensar en todo lo que hemos construido juntos y en todo lo que nos falta por vivir. A veces la distancia de 900 km parece mucho, pero cuando construimos cosas como Meliland, siento que estamos justo uno al lado del otro.\n\nQuiero que sepas que cada día que pasa estoy más seguro de que eres el refugio al que quiero volver siempre. Me imagino cuando superemos esta distancia y podamos visitar en la vida real todos esos lugares que hemos planeado. No será solo una plaza, será una vida entera creciendo juntos.\n\nY hablando de crecer, no puedo evitar emocionarme pensando en el futuro. Desde ese altar que construimos en el server hasta imaginarnos a nuestra pequeña Meli corriendo por ahí. Todo contigo es una aventura increíble.\n\nAsí que aquí estoy, escribiéndote esta carta que parece no tener fin, solo para recordarte lo mucho que te amo. Eres mi universo entero, mi sol, mi luna y todas mis estrellas.\n\nIncluso cuando el texto es ridículamente largo (como este que estoy usando para probar que el scroll del modal funciona a la perfección, jaja), nunca serán suficientes palabras para describir todo lo que me haces sentir. Quiero que sigamos escribiendo nuestra historia, página por página, línea por línea.\n\nTe amo, te amo, te amo. Hoy, mañana y los 80 billones de años que nos quedan por delante.\n\nSiempre tuyo."
            },
            { type: "image", src: "/images/together2.png", align: "center" }
        ],
        track: TRACKS[0]
    },
    {
        id: "3",
        date: "2027-11-20",
        title: "A tu lado",
        content: [{ type: "text", text: "Texto de prueba 3..." }],
        track: TRACKS[0]
    },
    {
        id: "4",
        date: "2026-12-25",
        title: "Un recuerdo especial",
        content: [
            {
                type: "text",
                text: "Mi amor,\n\nHoy quiero compartir contigo este pequeño video. Espero que te guste:"
            },
            { type: "video", src: "https://www.w3schools.com/html/mov_bbb.mp4", align: "center" }
        ],
        track: TRACKS[0]
    }
];
