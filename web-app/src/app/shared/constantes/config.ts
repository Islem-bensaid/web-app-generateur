export const CONFIG = {
  DEFAULT_LANG: 'en',
  DEFAULT_LOCALE: 'en',
  LANGUAGES: [
    {
      key: 'en',
      label: 'En'



    },
    {
      key: 'fr',
      label: 'Fr'
    },
  ],
  APP_BASE_COLOR: '#35363a',
  PRIVATE_LAYOUT: {
    sidebar: {
      width: '300px',
      'background-color': '#F2F2F2'
    },
    footer: {
      display: true,
      max_height: {
        lt_md: '40px',
        gt_md: '30px',
      },
      min_height: {
        lt_md: '40px',
        gt_md: '30px',
      },
      height: {
        'lt-md': '40px',
        'gt-md': '30px',
      },
    },
    navbar: {
      display: true,
      'max-height': {
        'lt-md': '85px',
        'gt-md': '64px',
      },
      'min-height': {
        'lt-md': '85px',
        'gt-md': '64px',
      },
      height: {
        'lt-md': '85px',
        'gt-md': '64px',
      },
      'background-color': '#eaeaea'
    }
  }
}
