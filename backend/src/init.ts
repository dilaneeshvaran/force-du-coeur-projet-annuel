
import { sequelize } from './services/sequelize';
import { User } from './models/user.model';
import { Document } from './models/document.model';

// ... other imports

// Initialize models
User.init({}, { sequelize });
Document.init({}, {sequelize});

// Define associations
User.associate();
Document.associate();

// ... rest of your application initialization