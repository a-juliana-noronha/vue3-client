import { defaultConfig } from '@formkit/vue';
import { generateClasses } from '@formkit/themes';
import { pt } from '@formkit/i18n';

const classes = generateClasses({
  global: {
    messages: 'list-none',
    message: 'p-error',
    inner: 'mb-2',
    label: 'block text-900 text-xl font-medium mb-2'
  }
});

export default defaultConfig({
  config: {
    classes
  },
  locales: { pt },
  locale: 'pt'
});
