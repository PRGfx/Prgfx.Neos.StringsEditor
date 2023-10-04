import manifest from '@neos-project/neos-ui-extensibility';
import { StringsEditor } from './StringsEditor';

manifest('Prgfx.Neos.StringsEditor:StringsEditor', {}, (globalRegistry) => {
    const editorRegistry = globalRegistry.get('inspector').get('editors');
    editorRegistry.set('Prgfx.Neos.StringsEditor', {
        component: StringsEditor,
    });
});
