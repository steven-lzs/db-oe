const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  important: true,
  purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        quartz: '#DDD6F3',
        pale_turquoise: '#A8EDEA',

        perfume: '#e0c3fc',
        malibu: '#8ec5fc',

        cosmos: '#fcd1d1',
        soft_peach: '#ece2e1',
        iceberg: '#d3e0dc',
        power_blue: '#aee1e1',

        cameo_pink: '#D4AFB9',
        light_peri: '#D1CFE2',
        wild_blue: '#9CADCE',
        middle_blue: '#7EC4CF',
        max_blue: '#52B2CF',
        raisin_black: '#2D2D34',

        rose: colors.rose,
      },
      height: (theme) => ({
        '1/10': '10%',
        '2/10': '20%',
        '3/10': '30%',
        '4/10': '40%',
        '5/10': '50%',
        '6/10': '60%',
        '7/10': '70%',
        '8/10': '80%',
        '9/10': '90%',
      }),
      boxShadow: {
        black: `2px 2px 1px rgba(0,0,0,0.15),
                4px 4px 2px rgba(0,0,0,0.15),
                6px 6px 4px rgba(0,0,0,0.15),
                8px 8px 8px rgba(0,0,0,0.15),
                10px 10px 16px rgba(0,0,0,0.15)`,
        'inset-black': `inset 2px 2px 1px rgba(0,0,0,0.15),
                        inset 4px 4px 2px rgba(0,0,0,0.15),
                        inset 6px 6px 4px rgba(0,0,0,0.15),
                        inset 8px 8px 8px rgba(0,0,0,0.15)`,
        'pop-black': `inset 2px 2px 1px rgba(0,0,0,0.15),
                        inset 4px 4px 2px rgba(0,0,0,0.15),
                        inset 6px 6px 4px rgba(0,0,0,0.15),
                        inset 8px 8px 8px rgba(0,0,0,0.15), 
                        2px 2px 1px rgba(0,0,0,0.15),
                        4px 4px 2px rgba(0,0,0,0.15),
                        6px 6px 4px rgba(0,0,0,0.15),
                        8px 8px 8px rgba(0,0,0,0.15)`,
        rose: `0px 0px 1px 1px #F43F5E26,
                0px 0px 2px 2px #F43F5E26,
                0px 0px 4px 3px #F43F5E26,
                0px 0px 8px 4px #F43F5E26,
                0px 0px 16px 5px #F43F5E26`,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
