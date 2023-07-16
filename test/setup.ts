import dataSource from '../db/data-source';

global.beforeAll(async () => {
  await dataSource.initialize();
  await dataSource.dropDatabase();
  await dataSource.destroy();
});
