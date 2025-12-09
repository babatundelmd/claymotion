
export type AwardType = 'Oscars' | 'Emmys' | 'Golden Globes' | 'Critics Choice' | 'BAFTA' | 'Tonys';

export interface AwardWinner {
    title: string;
    leadCreative: string;
    iconicSceneDescription: string;
}

export interface Nominee {
    title: string;
}

export interface AwardData {
    winner: AwardWinner;
    nominees: Nominee[];
    imageUrl?: string;
}

// Award metadata for UI theming
export interface AwardMeta {
    type: AwardType;
    topCategory: string;
    primaryColor: string;
    secondaryColor: string;
    icon: string;
}

export const AWARD_METADATA: Record<AwardType, AwardMeta> = {
    'Oscars': {
        type: 'Oscars',
        topCategory: 'Best Picture',
        primaryColor: '#d4af37',
        secondaryColor: '#1a1a2e',
        icon: '🏆'
    },
    'Emmys': {
        type: 'Emmys',
        topCategory: 'Outstanding Drama Series',
        primaryColor: '#e0aa3e',
        secondaryColor: '#16213e',
        icon: '📺'
    },
    'Golden Globes': {
        type: 'Golden Globes',
        topCategory: 'Best Motion Picture - Drama',
        primaryColor: '#ffd700',
        secondaryColor: '#0f0f23',
        icon: '🌐'
    },
    'Critics Choice': {
        type: 'Critics Choice',
        topCategory: 'Best Picture',
        primaryColor: '#00d4ff',
        secondaryColor: '#1a1a2e',
        icon: '⭐'
    },
    'BAFTA': {
        type: 'BAFTA',
        topCategory: 'Best Film',
        primaryColor: '#e85d04',
        secondaryColor: '#1d1d1d',
        icon: '🎭'
    },
    'Tonys': {
        type: 'Tonys',
        topCategory: 'Best Musical',
        primaryColor: '#c0c0c0',
        secondaryColor: '#2d132c',
        icon: '🎪'
    }
};