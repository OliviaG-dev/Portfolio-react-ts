export interface FriseProps {
    rotation: boolean;
}

export interface DataProjects {
    id: string;
    imagePortrait : string;
    imagesSlide: { src: string; alt: string }[];
    tags: { item: string; style: string }[];
    title: string;
    describe: string;
    link: string;
    text:string;
}

export interface ModalProps {
    showModal: boolean;
    onClose: () => void;
}