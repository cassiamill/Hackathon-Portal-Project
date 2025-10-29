// Keep tests isolated from external services
process.env.NODE_ENV = 'test';
process.env.SKIP_DB = process.env.SKIP_DB || '1';       // don't connect to Mongo
process.env.FIREBASE_CONFIG = process.env.FIREBASE_CONFIG || '{}'; // don't init Firebase
process.env.PORT = process.env.PORT || '0';             // Supertest doesn't need a fixed port