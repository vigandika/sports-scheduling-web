import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: '#6e8fb8',
            secondary: '#1f4e5f', /*50B6B3 99808D C6384A #1f4e5f #79a8a9 */
            third: '#b0bec5',
            accent: '#8c9eff',
            error: '#b71c1c',
          },
        },
      },
});
