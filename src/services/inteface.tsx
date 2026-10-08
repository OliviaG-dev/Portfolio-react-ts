
export interface DataProjects {
    id: string;
    imagePortrait : string;
    imagesSlide: { src: string; alt: string }[];
    tags: { item: string; style: string }[];
    title: string;
    describe: string;
    link: string;
    linkGit: string;
    text:string;
    /** Kept in data but not shown on the portfolio */
    hidden?: boolean;
}

export interface ModalProps {
    closeModal: () => void;
    project: DataProjects | null;
}

export interface QuestCardProps {
    onClose?: () => void;
}

export interface Quest {
    title: string;
    objective: string;
    description: string;
    rewards: string[];
}

