export interface MetadataType {
    name: string;
    description: string;
    avatarImageUri: string;
}

export interface IconType {
    id?: string;
    imageUri?: string;
}

export interface OptionsType {
    enabled: boolean;
    icon: IconType;
    name: string
}

export interface ModuleClipboardType {
    options: OptionsType;
    description: string;
    clipboardText: string;
    subTitle: string;
}

export interface ModuleImageType {
    options: OptionsType;
    imageUri: string;
    description: string;
    subTitle: string;
}

export interface ModuleLinkType {
    options: OptionsType;
    uri: string
    subTitle: string;
}

export interface ModuleGroupType {
    options: OptionsType;
}

export interface BackgroundType {
    color?: {
        color?: string;
    }
    image?: {
        uri?: string;
        aero?: number;
    }
    video?: {
        uri?: string;
    }
}

export interface ButtonType {
    theme?: {
        id?: number;
        buttonColor?: string;
        buttonFontColor?: string;
        buttonShadowColor?: string;
    }
}

export interface FontType {
    family?: string;
    color?: string;
}


export interface ThemeType {
    background?: BackgroundType;
    button?: ButtonType;
    font?: FontType;
}

export interface ModuleType {
    group?: ModuleGroupType;
    link?: ModuleLinkType;
    clipboard?: ModuleClipboardType;
    image?: ModuleImageType;
    bilibili?: ModuleBilibiliType;

    douyin?: ModuleDouYinType;
    kuaishou?: ModuleKuaiShouType;
    xiguashipin?: ModuleXiGuaShiPinType;
    jinritoutiao?: ModuleJinRiTouTiaoType;
    dongchedi?: ModuleDongCheDiType;
    acfun?: ModuleAcFunType;
    shipinhao?: ModuleShiPinHaoType;
    zhihu?: ModuleZhiHuType;
    weibo?: ModuleWeiboType;
    haokanshipin?: ModuleHaoKanShiPinType;
    youku?: ModuleYouKuType;
    hupu?: ModuleHuPuType;
    dewu?: ModuleDeWuType;
    jike?: ModuleJiKeType;
}

export interface ModuleBilibiliType extends ModuleClipboardType {
    fans: number;
}

export interface ModuleDouYinType extends ModuleClipboardType {
    fans: number;
}

export interface ModuleKuaiShouType extends ModuleClipboardType {
    fans: number;
}

export interface ModuleXiGuaShiPinType extends ModuleLinkType {
    fans: number;
}

export interface ModuleJinRiTouTiaoType extends ModuleLinkType {
    fans: number;
}

export interface ModuleDongCheDiType extends ModuleLinkType {
    fans: number;
}

export interface ModuleAcFunType extends ModuleLinkType {
    fans: number;
}

export interface ModuleShiPinHaoType extends ModuleLinkType {
    fans: number;
}

export interface ModuleZhiHuType extends ModuleLinkType {
    fans: number;
}

export interface ModuleWeiboType extends ModuleLinkType {
    fans: number;
}

export interface ModuleHaoKanShiPinType extends ModuleLinkType {
    fans: number;
}

export interface ModuleYouKuType extends ModuleLinkType {
    fans: number;
}

export interface ModuleHuPuType extends ModuleLinkType {
    fans: number;
}

export interface ModuleDeWuType extends ModuleLinkType {
    fans: number;
}

export interface ModuleJiKeType extends ModuleLinkType {
    fans: number;
}

export interface ProfileType {
    metadata: MetadataType;
    modules: Array<ModuleType>;
    theme: ThemeType;
}

export interface UserType {
    account_id: string;
    uns: string;
    profile: ProfileType;
    like_count: number;
    mutual_relation_count: number;
    created_one_way_relation_count: number;
    received_one_way_relation_count: number;
    interaction: any;
}