export type LayoutQuery = {
  acfOptionsFooter: {
    footer: {
      copyright: string
      disclaimer: string
      sponsors: [
        {
          altText: string
          sourceUrl: string
          title: string
        }
      ]
    }
  }
  acfOptionsSocial: {
    socialMediaLinks: {
      facebook: string
      instagram: string
      twitter: string
    }
  }
  menuItems: {
    nodes: [
      {
        title: string
        url: string
        path: string
      }
    ]
  }
}
