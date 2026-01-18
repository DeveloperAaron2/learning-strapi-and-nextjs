import type { Schema, Struct } from '@strapi/strapi';

export interface ComponentLink extends Struct.ComponentSchema {
  collectionName: 'components_component_links';
  info: {
    displayName: 'Link';
    icon: 'apps';
  };
  attributes: {
    isExternal: Schema.Attribute.Boolean;
    label: Schema.Attribute.String;
    url: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'#'>;
  };
}

export interface LayoutHeroComponent extends Struct.ComponentSchema {
  collectionName: 'components_layout_hero_components';
  info: {
    displayName: 'Hero Component';
    icon: 'alien';
  };
  attributes: {
    heading: Schema.Attribute.String;
    HeroImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    > &
      Schema.Attribute.Required;
    link: Schema.Attribute.Component<'component.link', false>;
    subHeading: Schema.Attribute.Text;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'component.link': ComponentLink;
      'layout.hero-component': LayoutHeroComponent;
    }
  }
}
