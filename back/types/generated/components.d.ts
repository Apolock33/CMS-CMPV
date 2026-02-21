import type { Schema, Struct } from '@strapi/strapi';

export interface ConteudoCard extends Struct.ComponentSchema {
  collectionName: 'components_conteudo_cards';
  info: {
    displayName: 'card';
    icon: 'dashboard';
  };
  attributes: {
    imagem: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    titulo: Schema.Attribute.String;
  };
}

export interface ConteudoCardCarrossel extends Struct.ComponentSchema {
  collectionName: 'components_conteudo_card_carrossels';
  info: {
    displayName: 'cardCarrossel';
    icon: 'layer';
  };
  attributes: {
    Cards: Schema.Attribute.Component<'conteudo.card', true>;
  };
}

export interface ConteudoCardEvento extends Struct.ComponentSchema {
  collectionName: 'components_conteudo_card_eventos';
  info: {
    displayName: 'cardEvento';
    icon: 'calendar';
  };
  attributes: {
    data_evento: Schema.Attribute.DateTime;
    imagem: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    titulo: Schema.Attribute.String;
  };
}

export interface LayoutFooter extends Struct.ComponentSchema {
  collectionName: 'components_layout_footers';
  info: {
    displayName: 'Footer';
    icon: 'arrowDown';
  };
  attributes: {};
}

export interface LayoutHeader extends Struct.ComponentSchema {
  collectionName: 'components_layout_headers';
  info: {
    displayName: 'Header';
    icon: 'pin';
  };
  attributes: {
    logo: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    MenuNav: Schema.Attribute.Component<'navegacao.menu', true>;
  };
}

export interface MediaSlideCarrosel extends Struct.ComponentSchema {
  collectionName: 'components_media_slide_carrosels';
  info: {
    displayName: 'slideCarrosel';
    icon: 'stack';
  };
  attributes: {
    imagem: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    legenda: Schema.Attribute.Text;
    titulo: Schema.Attribute.String;
  };
}

export interface NavegacaoLink extends Struct.ComponentSchema {
  collectionName: 'components_navegacao_links';
  info: {
    displayName: 'link';
    icon: 'link';
  };
  attributes: {
    nome: Schema.Attribute.String;
    rota: Schema.Attribute.String;
  };
}

export interface NavegacaoMenu extends Struct.ComponentSchema {
  collectionName: 'components_navegacao_menus';
  info: {
    displayName: 'Menu';
    icon: 'bulletList';
  };
  attributes: {
    links: Schema.Attribute.Component<'navegacao.link', true>;
  };
}

export interface NavegacaoNav extends Struct.ComponentSchema {
  collectionName: 'components_navegacao_navs';
  info: {
    displayName: 'nav';
    icon: 'link';
  };
  attributes: {};
}

export interface SecaoHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_secao_hero_sections';
  info: {
    displayName: 'hero Section';
    icon: 'alien';
  };
  attributes: {
    Capa: Schema.Attribute.Media<'images'>;
    descricao: Schema.Attribute.String;
    subtitulo: Schema.Attribute.String;
    titulo: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'conteudo.card': ConteudoCard;
      'conteudo.card-carrossel': ConteudoCardCarrossel;
      'conteudo.card-evento': ConteudoCardEvento;
      'layout.footer': LayoutFooter;
      'layout.header': LayoutHeader;
      'media.slide-carrosel': MediaSlideCarrosel;
      'navegacao.link': NavegacaoLink;
      'navegacao.menu': NavegacaoMenu;
      'navegacao.nav': NavegacaoNav;
      'secao.hero-section': SecaoHeroSection;
    }
  }
}
