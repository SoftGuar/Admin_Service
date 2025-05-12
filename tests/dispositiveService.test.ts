import { DispositiveService } from '../app/services/dispositiveService';
import { DispositiveModel } from '../app/models/dispositive.model';
import { ProductModel } from '../app/models/product.model';

// Mock the entire modules
jest.mock('../app/models/dispositive.model');
jest.mock('../app/models/product.model');

describe('DispositiveService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createDispositive', () => {
    test('should create a dispositive with valid data', async () => {
      const mockProductId = 1;
      const mockProduct = { 
        id: mockProductId, 
        name: 'Test Product', 
        price: 99.99 
      };
      
      const mockDispositiveData = {
        type: 'sensor',
        start_date: new Date('2025-01-01'),
        end_date: new Date('2025-12-31'),
        initial_state: 'ACTIVE',
        MAC: '00:11:22:33:44:55',
        state: 'ACTIVE',
        product_id: mockProductId
      };
      
      const mockCreatedDispositive = { 
        id: 1, 
        ...mockDispositiveData,
        Product: mockProduct
      };

      (ProductModel.findById as jest.Mock).mockResolvedValue(mockProduct);
      (DispositiveModel.create as jest.Mock).mockResolvedValue(mockCreatedDispositive);

      const result = await DispositiveService.createDispositive(mockDispositiveData);

      expect(ProductModel.findById).toHaveBeenCalledWith(mockProductId);
      expect(DispositiveModel.create).toHaveBeenCalledWith(mockDispositiveData);
      expect(result).toEqual(mockCreatedDispositive);
    });

    test('should throw error if product is not found', async () => {
      const mockDispositiveData = {
        type: 'sensor',
        start_date: new Date('2025-01-01'),
        end_date: new Date('2025-12-31'),
        initial_state: 'ACTIVE',
        MAC: '00:11:22:33:44:55',
        state: 'ACTIVE',
        product_id: 999
      };

      (ProductModel.findById as jest.Mock).mockResolvedValue(null);

      await expect(DispositiveService.createDispositive(mockDispositiveData))
        .rejects.toThrow('Product with ID 999 was not found.');
      
      expect(ProductModel.findById).toHaveBeenCalledWith(999);
      expect(DispositiveModel.create).not.toHaveBeenCalled();
    });
  });

  describe('getDispositiveById', () => {
    test('should return a dispositive when it exists', async () => {
      const mockDispositive = {
        id: 1,
        type: 'sensor',
        state: 'ACTIVE',
        product_id: 1
      };

      (DispositiveModel.findById as jest.Mock).mockResolvedValue(mockDispositive);

      const result = await DispositiveService.getDispositiveById(1);

      expect(DispositiveModel.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockDispositive);
    });

    test('should throw error if dispositive is not found', async () => {
      (DispositiveModel.findById as jest.Mock).mockResolvedValue(null);

      await expect(DispositiveService.getDispositiveById(999))
        .rejects.toThrow('Dispositive with ID 999 was not found.');
      
      expect(DispositiveModel.findById).toHaveBeenCalledWith(999);
    });
  });

  describe('getAllDispositives', () => {
    test('should return all dispositives', async () => {
      const mockDispositives = [
        { id: 1, type: 'sensor', product_id: 1 },
        { id: 2, type: 'controller', product_id: 2 }
      ];

      (DispositiveModel.getAll as jest.Mock).mockResolvedValue(mockDispositives);

      const result = await DispositiveService.getAllDispositives();

      expect(DispositiveModel.getAll).toHaveBeenCalled();
      expect(result).toEqual(mockDispositives);
    });
  });

  describe('getDispositivesByProduct', () => {
    test('should return dispositives for a valid product', async () => {
      const mockProductId = 1;
      const mockProduct = { 
        id: mockProductId, 
        name: 'Test Product' 
      };
      
      const mockDispositives = [
        { id: 1, type: 'sensor', product_id: mockProductId },
        { id: 2, type: 'controller', product_id: mockProductId }
      ];

      (ProductModel.findById as jest.Mock).mockResolvedValue(mockProduct);
      (DispositiveModel.findByProduct as jest.Mock).mockResolvedValue(mockDispositives);

      const result = await DispositiveService.getDispositivesByProduct(mockProductId);

      expect(ProductModel.findById).toHaveBeenCalledWith(mockProductId);
      expect(DispositiveModel.findByProduct).toHaveBeenCalledWith(mockProductId);
      expect(result).toEqual(mockDispositives);
    });

    test('should throw error if product is not found', async () => {
      (ProductModel.findById as jest.Mock).mockResolvedValue(null);

      await expect(DispositiveService.getDispositivesByProduct(999))
        .rejects.toThrow('Product with ID 999 was not found.');
      
      expect(ProductModel.findById).toHaveBeenCalledWith(999);
      expect(DispositiveModel.findByProduct).not.toHaveBeenCalled();
    });
  });

  describe('updateDispositive', () => {
    test('should update a dispositive with valid data', async () => {
      const mockExistingDispositive = {
        id: 1,
        type: 'sensor',
        state: 'ACTIVE',
        product_id: 1
      };
      
      const mockUpdateData = {
        type: 'controller',
        state: 'INACTIVE'
      };
      
      const mockUpdatedDispositive = {
        ...mockExistingDispositive,
        ...mockUpdateData
      };

      (DispositiveModel.findById as jest.Mock).mockResolvedValue(mockExistingDispositive);
      (DispositiveModel.update as jest.Mock).mockResolvedValue(mockUpdatedDispositive);

      const result = await DispositiveService.updateDispositive(1, mockUpdateData);

      expect(DispositiveModel.findById).toHaveBeenCalledWith(1);
      expect(DispositiveModel.update).toHaveBeenCalledWith(1, mockUpdateData);
      expect(result).toEqual(mockUpdatedDispositive);
    });

    test('should throw error if dispositive is not found', async () => {
      const mockUpdateData = { type: 'controller' };

      (DispositiveModel.findById as jest.Mock).mockResolvedValue(null);

      await expect(DispositiveService.updateDispositive(999, mockUpdateData))
        .rejects.toThrow('Dispositive with ID 999 was not found.');
      
      expect(DispositiveModel.findById).toHaveBeenCalledWith(999);
      expect(DispositiveModel.update).not.toHaveBeenCalled();
    });

    test('should throw error if updated product_id does not exist', async () => {
      const mockExistingDispositive = {
        id: 1,
        type: 'sensor',
        product_id: 1
      };
      
      const mockUpdateData = {
        product_id: 999
      };

      (DispositiveModel.findById as jest.Mock).mockResolvedValue(mockExistingDispositive);
      (ProductModel.findById as jest.Mock).mockResolvedValue(null);

      await expect(DispositiveService.updateDispositive(1, mockUpdateData))
        .rejects.toThrow('Product with ID 999 was not found.');
      
      expect(DispositiveModel.findById).toHaveBeenCalledWith(1);
      expect(ProductModel.findById).toHaveBeenCalledWith(999);
      expect(DispositiveModel.update).not.toHaveBeenCalled();
    });
  });

  describe('assignUserToDispositive', () => {
    test('should assign user to a dispositive', async () => {
      const mockExistingDispositive = {
        id: 1,
        type: 'sensor',
        user_id: null
      };
      
      const mockAssignData = {
        user_id: 123
      };
      
      const mockUpdatedDispositive = {
        ...mockExistingDispositive,
        user_id: 123
      };

      (DispositiveModel.findById as jest.Mock).mockResolvedValue(mockExistingDispositive);
      (DispositiveModel.assignUser as jest.Mock).mockResolvedValue(mockUpdatedDispositive);

      const result = await DispositiveService.assignUserToDispositive(1, mockAssignData);

      expect(DispositiveModel.findById).toHaveBeenCalledWith(1);
      expect(DispositiveModel.assignUser).toHaveBeenCalledWith(1, mockAssignData);
      expect(result).toEqual(mockUpdatedDispositive);
    });

    test('should throw error if dispositive is not found', async () => {
      const mockAssignData = { user_id: 123 };

      (DispositiveModel.findById as jest.Mock).mockResolvedValue(null);

      await expect(DispositiveService.assignUserToDispositive(999, mockAssignData))
        .rejects.toThrow('Dispositive with ID 999 was not found.');
      
      expect(DispositiveModel.findById).toHaveBeenCalledWith(999);
      expect(DispositiveModel.assignUser).not.toHaveBeenCalled();
    });
  });

  describe('blockDispositive', () => {
    test('should block a dispositive', async () => {
      const mockExistingDispositive = {
        id: 1,
        type: 'sensor',
        state: 'ACTIVE'
      };
      
      const mockBlockData = {
        blocked: true
      };
      
      const mockUpdatedDispositive = {
        ...mockExistingDispositive,
        state: 'BLOCKED'
      };

      (DispositiveModel.findById as jest.Mock).mockResolvedValue(mockExistingDispositive);
      (DispositiveModel.blockDispositive as jest.Mock).mockResolvedValue(mockUpdatedDispositive);

      const result = await DispositiveService.blockDispositive(1, mockBlockData);

      expect(DispositiveModel.findById).toHaveBeenCalledWith(1);
      expect(DispositiveModel.blockDispositive).toHaveBeenCalledWith(1, mockBlockData);
      expect(result).toEqual(mockUpdatedDispositive);
    });

    test('should throw error if dispositive is not found', async () => {
      const mockBlockData = { blocked: true };

      (DispositiveModel.findById as jest.Mock).mockResolvedValue(null);

      await expect(DispositiveService.blockDispositive(999, mockBlockData))
        .rejects.toThrow('Dispositive with ID 999 was not found.');
      
      expect(DispositiveModel.findById).toHaveBeenCalledWith(999);
      expect(DispositiveModel.blockDispositive).not.toHaveBeenCalled();
    });
  });

  describe('deleteDispositive', () => {
    test('should delete a dispositive when it exists', async () => {
      const mockDispositive = {
        id: 1,
        type: 'sensor'
      };

      (DispositiveModel.findById as jest.Mock).mockResolvedValue(mockDispositive);
      (DispositiveModel.delete as jest.Mock).mockResolvedValue({ success: true });

      const result = await DispositiveService.deleteDispositive(1);

      expect(DispositiveModel.findById).toHaveBeenCalledWith(1);
      expect(DispositiveModel.delete).toHaveBeenCalledWith(1);
      expect(result).toEqual({ success: true });
    });

    test('should throw error if dispositive is not found', async () => {
      (DispositiveModel.findById as jest.Mock).mockResolvedValue(null);

      await expect(DispositiveService.deleteDispositive(999))
        .rejects.toThrow('Dispositive with ID 999 was not found.');
      
      expect(DispositiveModel.findById).toHaveBeenCalledWith(999);
      expect(DispositiveModel.delete).not.toHaveBeenCalled();
    });
  });
});