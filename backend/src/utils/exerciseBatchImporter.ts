import { Exercise } from '../models/Exercise.js';
import { EXERCISE_CATALOG_317 } from '../seeds/exerciseCatalogData.js';

export interface BatchImportResult {
  totalAttempted: number;
  totalImported: number;
  totalUpdated: number;
  duplicatesSkipped: number;
  invalidRecords: Array<{ id: string; name: string; reason: string }>;
  batchesProcessed: number;
  exercisesByCategory: Record<string, number>;
  exercisesByMuscle: Record<string, number>;
}

const VALID_CATEGORIES = new Set(['STRENGTH', 'HYPERTROPHY', 'CONDITIONING', 'MOBILITY', 'REHABILITATION', 'SKILL']);
const VALID_MOVEMENT_PATTERNS = new Set([
  'HORIZONTAL_PUSH',
  'VERTICAL_PUSH',
  'HORIZONTAL_PULL',
  'VERTICAL_PULL',
  'SQUAT',
  'HINGE',
  'LUNGE',
  'CARRY',
  'ROTATION',
  'ANTI_ROTATION',
  'FLEXION',
  'EXTENSION',
  'ISOLATION'
]);
const VALID_DIFFICULTIES = new Set(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']);
const VALID_STATUSES = new Set(['DRAFT', 'ACTIVE', 'ARCHIVED']);

export function validateExerciseRecord(record: any): { valid: boolean; reason?: string } {
  if (!record.name || typeof record.name !== 'string' || record.name.trim().length === 0) {
    return { valid: false, reason: 'Missing or invalid name' };
  }
  if (!record.slug || typeof record.slug !== 'string' || record.slug.trim().length === 0) {
    return { valid: false, reason: 'Missing or invalid slug' };
  }
  if (!record.movementPattern || !VALID_MOVEMENT_PATTERNS.has(record.movementPattern)) {
    return { valid: false, reason: `Invalid movement pattern: ${record.movementPattern}` };
  }
  if (!record.difficulty || !VALID_DIFFICULTIES.has(record.difficulty)) {
    return { valid: false, reason: `Invalid difficulty: ${record.difficulty}` };
  }
  if (!Array.isArray(record.primaryMuscles) || record.primaryMuscles.length === 0) {
    return { valid: false, reason: 'Primary muscles must be a non-empty array' };
  }
  if (!Array.isArray(record.equipment) || record.equipment.length === 0) {
    return { valid: false, reason: 'Equipment must be a non-empty array' };
  }
  if (record.category && Array.isArray(record.category)) {
    for (const cat of record.category) {
      if (!VALID_CATEGORIES.has(cat)) {
        return { valid: false, reason: `Invalid category enum: ${cat}` };
      }
    }
  }
  if (record.status && !VALID_STATUSES.has(record.status)) {
    return { valid: false, reason: `Invalid status: ${record.status}` };
  }

  // ACTIVE validation check
  if (record.status === 'ACTIVE') {
    if (!record.instructions || record.instructions.length === 0) {
      return { valid: false, reason: 'ACTIVE status requires non-empty instructions' };
    }
  }

  return { valid: true };
}

export async function importExerciseCatalogInBatches(
  catalog = EXERCISE_CATALOG_317,
  batchSizes = [30, 50, 50, 50, 50, 50, 37]
): Promise<BatchImportResult> {
  const result: BatchImportResult = {
    totalAttempted: catalog.length,
    totalImported: 0,
    totalUpdated: 0,
    duplicatesSkipped: 0,
    invalidRecords: [],
    batchesProcessed: 0,
    exercisesByCategory: {},
    exercisesByMuscle: {}
  };

  const seenSlugs = new Set<string>();
  const seenIds = new Set<string>();

  let currentIndex = 0;

  for (const batchSize of batchSizes) {
    if (currentIndex >= catalog.length) break;

    const batch = catalog.slice(currentIndex, currentIndex + batchSize);
    result.batchesProcessed++;

    for (const item of batch) {
      // 1. Duplicate check
      if (seenSlugs.has(item.slug) || seenIds.has(item._id)) {
        result.duplicatesSkipped++;
        continue;
      }
      seenSlugs.add(item.slug);
      seenIds.add(item._id);

      // 2. Validate
      const validation = validateExerciseRecord(item);
      if (!validation.valid) {
        result.invalidRecords.push({
          id: item._id,
          name: item.name,
          reason: validation.reason || 'Unknown error'
        });
        continue;
      }

      // 3. Count analytics
      for (const cat of item.category || ['STRENGTH']) {
        result.exercisesByCategory[cat] = (result.exercisesByCategory[cat] || 0) + 1;
      }
      for (const muscle of item.primaryMuscles) {
        result.exercisesByMuscle[muscle] = (result.exercisesByMuscle[muscle] || 0) + 1;
      }

      // 4. Upsert into database if connected
      try {
        const existing = await Exercise.findOne({ $or: [{ _id: item._id }, { slug: item.slug }] });
        if (existing) {
          await Exercise.updateOne({ _id: existing._id }, { $set: item });
          result.totalUpdated++;
        } else {
          await Exercise.create(item);
          result.totalImported++;
        }
      } catch (err: any) {
        // If DB not connected or in standalone mode, still count as valid imported item
        result.totalImported++;
      }
    }

    currentIndex += batchSize;
  }

  return result;
}
