export interface AudioTrack {
    songName: string;
    artist: string;
    audioFile: string;
}

export type Alignment = "left" | "center" | "right";

export type ContentBlock =
    | { type: "text"; text: string }
    | { type: "image"; src: string; alt?: string; align?: Alignment }
    | { type: "video"; src: string; alt?: string; align?: Alignment };

export interface Letter {
    id: string;
    date: string;
    title: string;
    content: ContentBlock[];
    track?: AudioTrack;
}
