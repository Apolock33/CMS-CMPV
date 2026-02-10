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

export interface LayoutGridSecoes extends Struct.ComponentSchema {
  collectionName: 'components_layout_grid_secoes';
  info: {
    displayName: 'GridSecoes';
    icon: 'dashboard';
  };
  attributes: {
    Eventos: Schema.Attribute.Component<'secao.secao-eventos', false>;
    Noticias: Schema.Attribute.Component<'secao.secao-noticias', false>;
  };
}

export interface LayoutHeader extends Struct.ComponentSchema {
  collectionName: 'components_layout_headers';
  info: {
    displayName: 'Header';
    icon: 'pin';
  };
  attributes: {
    logo: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
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

export interface NavegacaoMenu extends Struct.ComponentSchema {
  collectionName: 'components_navegacao_menus';
  info: {
    displayName: 'Menu';
    icon: 'bulletList';
  };
  attributes: {
    Link: Schema.Attribute.Component<'navegacao.nav', true>;
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

export interface SecaoSecaoEventos extends Struct.ComponentSchema {
  collectionName: 'components_secao_secao_eventos';
  info: {
    displayName: 'SecaoEventos';
    icon: 'moon';
  };
  attributes: {
    descricao: Schema.Attribute.String;
    lista_cards: Schema.Attribute.Component<'conteudo.card-evento', true>;
    titulo: Schema.Attribute.String;
  };
}

export interface SecaoSecaoHero extends Struct.ComponentSchema {
  collectionName: 'components_secao_secao_heroes';
  info: {
    displayName: 'SecaoHero';
    icon: 'crown';
  };
  attributes: {
    Slides: Schema.Attribute.Component<'media.slide-carrosel', false>;
  };
}

export interface SecaoSecaoNoticias extends Struct.ComponentSchema {
  collectionName: 'components_secao_secao_noticias';
  info: {
    displayName: 'SecaoNoticias';
    icon: 'lightbulb';
  };
  attributes: {
    descricao: Schema.Attribute.String;
    lista_cards: Schema.Attribute.Component<'conteudo.card', true>;
    titulo: Schema.Attribute.String;
  };
}

export interface SecaoSecaoRecursos extends Struct.ComponentSchema {
  collectionName: 'components_secao_secao_recursos';
  info: {
    displayName: 'SecaoRecursos';
    icon: 'restaurant';
  };
  attributes: {
    descricao: Schema.Attribute.Text;
    lista_cards: Schema.Attribute.Component<'conteudo.card', true>;
    titulo: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'conteudo.card': ConteudoCard;
      'conteudo.card-evento': ConteudoCardEvento;
      'layout.footer': LayoutFooter;
      'layout.grid-secoes': LayoutGridSecoes;
      'layout.header': LayoutHeader;
      'media.slide-carrosel': MediaSlideCarrosel;
      'navegacao.menu': NavegacaoMenu;
      'navegacao.nav': NavegacaoNav;
      'secao.secao-eventos': SecaoSecaoEventos;
      'secao.secao-hero': SecaoSecaoHero;
      'secao.secao-noticias': SecaoSecaoNoticias;
      'secao.secao-recursos': SecaoSecaoRecursos;
    }
  }
}
