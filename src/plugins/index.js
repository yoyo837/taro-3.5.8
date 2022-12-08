import uiSetup from './ui';
import protoSetup from './prototype';
import globalDataSetup from './global-data';

export default app => {
  uiSetup(app);
  globalDataSetup(app);
  protoSetup(app);
};
