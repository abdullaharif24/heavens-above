const runScript = require('../run');
const satellite = require('../src/satellite');
const iridium = require('../src/iridium');

jest.mock('../src/satellite');
jest.mock('../src/iridium');

describe('run.js', () => {
  describe('runScript', () => {
    afterEach(() => {
      jest.clearAllMocks(); // Reset mock state after each test
    });

    it('should run the run.js script without errors', async () => {
      // Mocking behavior of satellite.getTable and iridium.getTable
      satellite.getTable.mockResolvedValue('Satellite data fetched successfully');
      iridium.getTable.mockResolvedValue('Iridium data fetched successfully');

      // Since runScript doesn't return a promise, you can use toHaveBeenCalled to verify its execution
      await runScript();

      // Assert that the mock functions were called
      expect(satellite.getTable).toHaveBeenCalledTimes(1);
      expect(iridium.getTable).not.toHaveBeenCalled(); // Ensure iridium.getTable wasn't called
    });

    it('should handle errors during execution', async () => {
      // Mocking behavior of satellite.getTable to throw an error
      satellite.getTable.mockRejectedValue(new Error('Error fetching satellite data'));

      // Since runScript doesn't return a promise, you can use toThrowError to verify it throws an error
      await expect(runScript()).rejects.toThrow('Error fetching satellite data');

      // Assert that the mock function was called
      expect(satellite.getTable).toHaveBeenCalledTimes(1);
    });
  });
});
