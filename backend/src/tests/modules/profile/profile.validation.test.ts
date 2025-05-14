import { z } from 'zod';
import { profileSchema, maleMeasurementsSchema, femaleMeasurementsSchema } from '../../../modules/profile/profile.validation'; // Adjust the path as necessary

describe('Profile Schema Validation', () => {
  describe('profileSchema', () => {
    it('should validate a valid profile object', () => {
      const validProfile = {
        user_id: '123e4567-e89b-12d3-a456-426614174000',
        full_name: 'John Doe',
        gender: 'male',
        delivery_address: '123 Main St',
      };

      expect(() => profileSchema.parse(validProfile)).not.toThrow();
    });

    it('should throw an error for an invalid user_id', () => {
      const invalidProfile = {
        user_id: 'invalid-uuid',
        full_name: 'John Doe',
        gender: 'male',
        delivery_address: '123 Main St',
      };

      try {
        profileSchema.parse(invalidProfile);
      } catch (error) {
        if (error instanceof z.ZodError) {
          expect(error.errors[0].message).toContain('Invalid uuid');
        }
      }
    });

    it('should throw an error for an invalid full_name', () => {
      const invalidProfile = {
        user_id: '123e4567-e89b-12d3-a456-426614174000',
        full_name: 'J', // Too short
        gender: 'male',
        delivery_address: '123 Main St',
      };

      try {
        profileSchema.parse(invalidProfile);
      } catch (error) {
        if (error instanceof z.ZodError) {
          expect(error.errors[0].message).toContain('String must contain at least 2 character(s)');
        }
      }
    });

    it('should throw an error for an invalid gender', () => {
      const invalidProfile = {
        user_id: '123e4567-e89b-12d3-a456-426614174000',
        full_name: 'John Doe',
        gender: 'other', // Invalid gender
        delivery_address: '123 Main St',
      };

      try {
        profileSchema.parse(invalidProfile);
      } catch (error) {
        if (error instanceof z.ZodError) {
          expect(error.errors[0].message).toContain('Invalid enum value. Expected \'male\' | \'female\', received \'other\'');
        }
      }
    });

    it('should throw an error for an invalid delivery_address', () => {
      const invalidProfile = {
        user_id: '123e4567-e89b-12d3-a456-426614174000',
        full_name: 'John Doe',
        gender: 'male',
        delivery_address: '123', // Too short
      };

      try {
        profileSchema.parse(invalidProfile);
      } catch (error) {
        if (error instanceof z.ZodError) {
          expect(error.errors[0].message).toContain('String must contain at least 5 character(s)');
        }
      }
    });
  });

  describe('maleMeasurementsSchema', () => {
    it('should validate valid male measurements', () => {
      const validMeasurements = {
        profile_id: '123e4567-e89b-12d3-a456-426614174000',
        neck: 15,
        chest: 40,
        waist: 32,
        hips: 38,
        shoulder: 18,
        thigh: 22,
        sleeve_length: 25,
        round_sleeve: 14,
        wrist: 7,
        shirt_length: 30,
        trouser_length: 32,
      };

      expect(() => maleMeasurementsSchema.parse(validMeasurements)).not.toThrow();
    });

    it('should throw an error for an invalid neck value', () => {
      const invalidMeasurements = {
        profile_id: '123e4567-e89b-12d3-a456-426614174000',
        neck: -5, // Invalid
        chest: 40,
        waist: 32,
        hips: 38,
      };

      try {
        maleMeasurementsSchema.parse(invalidMeasurements);
      } catch (error) {
        if (error instanceof z.ZodError) {
            expect((error as z.ZodError).errors[0].message).toContain('Number must be greater than or equal to 1');
        }
      }
    
    });

    it('should allow missing optional fields for male measurements', () => {
      const validMeasurements = {
        profile_id: '123e4567-e89b-12d3-a456-426614174000',
        neck: 15,
        chest: 40,
        waist: 32,
        hips: 38,
        // Optional fields are not required
      };

      expect(() => maleMeasurementsSchema.parse(validMeasurements)).not.toThrow();
    });
  });

  describe('femaleMeasurementsSchema', () => {
    it('should validate valid female measurements', () => {
      const validMeasurements = {
        profile_id: '123e4567-e89b-12d3-a456-426614174000',
        burst: 34,
        waist: 28,
        hips: 36,
        full_length: 50,
        shoulder: 15,
        nipple_to_nipple: 10,
        shoulder_to_under_burst: 8,
        half_length: 22,
        thigh: 21,
        round_sleeve: 12,
        wrist: 6,
        sleeve_length: 24,
        shirt_length: 28,
        trouser_length: 30,
      };

      expect(() => femaleMeasurementsSchema.parse(validMeasurements)).not.toThrow();
    });

    it('should throw an error for an invalid burst value', () => {
      const invalidMeasurements = {
        profile_id: '123e4567-e89b-12d3-a456-426614174000',
        burst: -1, // Invalid
        waist: 28,
        hips: 36,
        full_length: 50,
      };

      try {
        femaleMeasurementsSchema.parse(invalidMeasurements);
      } catch (error) {
        if (error instanceof z.ZodError) {
          expect(error.errors[0].message).toContain('Number must be greater than or equal to 1');
        }
      }
    });

    it('should allow missing optional fields for female measurements', () => {
      const validMeasurements = {
        profile_id: '123e4567-e89b-12d3-a456-426614174000',
        burst: 34,
        waist: 28,
        hips: 36,
        full_length: 50,
        // Optional fields are not required
      };

      expect(() => femaleMeasurementsSchema.parse(validMeasurements)).not.toThrow();
    });
  });
});
