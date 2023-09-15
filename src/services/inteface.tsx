export interface FriseProps {
    rotation: boolean;
}

export interface DataProjects {
    id: string;
    imagePortrait : string;
    imagesSlide: { src: string; alt: string }[];
    tags: { item: string; style: string }[];
    title: string;
    link: string;
    text:string;
}