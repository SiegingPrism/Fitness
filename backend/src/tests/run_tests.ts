import assert from 'node:assert';
import app from '../app.js';
import http from 'node:http';

const startTestServer = () => {
  return new Promise<http.Server>((resolve) => {
    const server = app.listen(0, () => {
      resolve(server);
    });
  });
};

async function runTests() {
  console.log('🧪 Starting Phase 6A.2 & 6A.3 Automated Test Suite...\n');
  const server = await startTestServer();
  const address = server.address() as any;
  const baseUrl = `http://localhost:${address.port}/api/v1`;

  let testsPassed = 0;
  let testsTotal = 0;

  async function test(name: string, fn: () => Promise<void>) {
    testsTotal++;
    try {
      await fn();
      console.log(`  ✅ PASS: ${name}`);
      testsPassed++;
    } catch (err: any) {
      console.error(`  ❌ FAIL: ${name}`);
      console.error(`     Error: ${err.message}`);
    }
  }

  let createdExerciseId = '';
  let createdSlug = '';

  // Test 1: Create Draft
  await test('Admin can create DRAFT exercise with partial fields', async () => {
    const res = await fetch(`${baseUrl}/admin/exercises`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-role': 'ADMIN'
      },
      body: JSON.stringify({
        name: 'Incline Dumbbell Flyes',
        status: 'DRAFT'
      })
    });
    const json: any = await res.json();
    assert.strictEqual(res.status, 201);
    assert.strictEqual(json.success, true);
    assert.strictEqual(json.data.slug, 'incline-dumbbell-flyes');
    assert.strictEqual(json.data.status, 'DRAFT');
    createdExerciseId = json.data._id;
    createdSlug = json.data.slug;
  });

  // Test 2: Reject incomplete ACTIVE exercise
  await test('Rejects ACTIVE publication when required production fields are missing', async () => {
    const res = await fetch(`${baseUrl}/admin/exercises`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-role': 'ADMIN'
      },
      body: JSON.stringify({
        name: 'Incomplete Move',
        status: 'ACTIVE'
      })
    });
    const json: any = await res.json();
    assert.strictEqual(res.status, 400);
    assert.strictEqual(json.success, false);
    assert.ok(json.error.message.includes('Cannot publish ACTIVE exercise'));
  });

  // Test 3: Slug Lookup
  await test('Retrieves exercise by unique slug', async () => {
    const res = await fetch(`${baseUrl}/exercises/slug/${createdSlug}`);
    const json: any = await res.json();
    assert.strictEqual(res.status, 200);
    assert.strictEqual(json.success, true);
    assert.strictEqual(json.data.name, 'Incline Dumbbell Flyes');
  });

  // Test 4: Search & Filters
  await test('Filters exercises by muscle and equipment', async () => {
    const res = await fetch(`${baseUrl}/exercises?muscle=CHEST&equipment=BARBELL`);
    const json: any = await res.json();
    assert.strictEqual(res.status, 200);
    assert.strictEqual(json.success, true);
    assert.ok(Array.isArray(json.data.exercises));
    assert.ok(json.data.exercises.length > 0);
  });

  // Test 5: Search Ranking
  await test('Searches exercises by keyword', async () => {
    const res = await fetch(`${baseUrl}/exercises?search=Bench`);
    const json: any = await res.json();
    assert.strictEqual(res.status, 200);
    assert.strictEqual(json.success, true);
    assert.ok(json.data.exercises.some((e: any) => e.name.includes('Bench')));
  });

  // Test 6: Popular Exercises
  await test('Retrieves popular foundational exercises', async () => {
    const res = await fetch(`${baseUrl}/exercises/popular`);
    const json: any = await res.json();
    assert.strictEqual(res.status, 200);
    assert.strictEqual(json.success, true);
    assert.ok(Array.isArray(json.data));
    assert.ok(json.data.length >= 5);
  });

  // Test 7: Favorite Exercises & Toggle
  await test('Toggles favorite status for an exercise', async () => {
    const toggleRes = await fetch(`${baseUrl}/exercises/ex_1/favorite`, { method: 'POST' });
    const toggleJson: any = await toggleRes.json();
    assert.strictEqual(toggleRes.status, 200);
    assert.strictEqual(toggleJson.success, true);
    assert.ok('isFavorite' in toggleJson.data);

    const favRes = await fetch(`${baseUrl}/exercises/favorites`);
    const favJson: any = await favRes.json();
    assert.strictEqual(favRes.status, 200);
    assert.strictEqual(favJson.success, true);
    assert.ok(Array.isArray(favJson.data));
  });

  // Test 8: Recent Exercises
  await test('Retrieves recently used workout exercises', async () => {
    const res = await fetch(`${baseUrl}/exercises/recent`);
    const json: any = await res.json();
    assert.strictEqual(res.status, 200);
    assert.strictEqual(json.success, true);
    assert.ok(Array.isArray(json.data));
    assert.ok(json.data.length > 0);
  });

  // Test 9: Non-destructive Archiving
  await test('Archives exercise without deleting historical entity', async () => {
    const res = await fetch(`${baseUrl}/admin/exercises/${createdExerciseId}`, {
      method: 'DELETE',
      headers: {
        'x-admin-role': 'ADMIN'
      }
    });
    const json: any = await res.json();
    assert.strictEqual(res.status, 200);
    assert.strictEqual(json.success, true);
    assert.strictEqual(json.data.status, 'ARCHIVED');
  });

  // Test 10: Historical workout compatibility
  await test('Workout session successfully records with archived exercise references', async () => {
    const res = await fetch(`${baseUrl}/workouts/sessions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        athleteId: '665000000000000000000001',
        workoutDayName: 'Push Day',
        totalDurationMinutes: 45,
        totalVolumeKg: 10000,
        loggedSets: [
          {
            setNumber: 1,
            exerciseId: createdExerciseId,
            exerciseName: 'Incline Dumbbell Flyes (Archived)',
            weightKg: 20,
            repsCompleted: 10,
            setType: 'NORMAL'
          }
        ]
      })
    });
    const json: any = await res.json();
    assert.strictEqual(res.status, 201);
    assert.strictEqual(json.success, true);
  });

  server.close();
  console.log(`\n📊 Test Summary: ${testsPassed}/${testsTotal} passed (${Math.round((testsPassed / testsTotal) * 100)}%)`);

  if (testsPassed !== testsTotal) {
    process.exit(1);
  }
}

runTests();
