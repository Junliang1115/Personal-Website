# Hackathon Model Documentation

## Description
This code defines a Mongoose schema for a Hackathon model, which is used to structure and validate data related to hackathon projects in a MongoDB database. The schema includes various fields to capture essential information about each hackathon, such as the name, team details, project specifics, and links to resources.

## Schema Fields

### `hackathonSchema`
Defines the structure of the Hackathon documents in the MongoDB collection.

#### Fields:
- **name**: 
  - **Type**: `String`
  - **Required**: `true`
  - **Unique**: `true`
  - **Description**: The name of the hackathon.

- **projectname**: 
  - **Type**: `String`
  - **Required**: `false`
  - **Description**: The name of the project developed during the hackathon.

- **type**: 
  - **Type**: `String`
  - **Required**: `false`
  - **Description**: The type/category of the hackathon.

- **teamname**: 
  - **Type**: `String`
  - **Required**: `true`
  - **Description**: The name of the team participating in the hackathon.

- **teammate**: 
  - **Type**: `Array of Strings`
  - **Required**: `false`
  - **Description**: An array of names of team members.

- **link**: 
  - **Type**: `String`
  - **Required**: `false`
  - **Description**: A link to the project or hackathon page.

- **description**: 
  - **Type**: `String`
  - **Required**: `false`
  - **Description**: A brief description of the hackathon project.

- **corefeature**: 
  - **Type**: `Array of Objects`
  - **Required**: `false`
  - **Description**: An array of core features of the project, each with a name and details.
  - **Structure**:
    - **name**: `String`
    - **details**: `String`

- **techstack**: 
  - **Type**: `Object`
  - **Required**: `false`
  - **Description**: An object representing the technology stack used in the project.

- **driveUrl**: 
  - **Type**: `String`
  - **Required**: `false`
  - **Description**: A URL to a Google Drive folder or document related to the project.

- **youtubeUrl**: 
  - **Type**: `String`
  - **Required**: `false`
  - **Description**: A URL to a YouTube video showcasing the project.

## Model Creation
### `Hackathon`
- **Description**: A Mongoose model created from the `hackathonSchema` for interacting with the `hackathons` collection in the MongoDB database.

### Usage Example
```javascript
const Hackathon = require('./path/to/hackathonModel');

// Creating a new hackathon entry
const newHackathon = new Hackathon({
    name: 'Innovate2023',
    teamname: 'Team Alpha',
    projectname: 'Smart Home Automation',
    teammate: ['Alice', 'Bob'],
    corefeature: [{ name: 'Voice Control', details: 'Control devices using voice commands' }],
    techstack: { frontend: 'React', backend: 'Node.js' },
    driveUrl: 'https://drive.google.com/example',
    youtubeUrl: 'https://youtube.com/example'
});

// Saving the new hackathon entry
newHackathon.save()
    .then(() => console.log('Hackathon saved successfully!'))
    .catch(err => console.error('Error saving hackathon:', err));
```

## Important Notes
- Ensure that the `name` field is unique to avoid conflicts in the database.
- The `teammate` field can hold multiple entries, allowing for flexible team configurations.
- The `corefeature` field is an array of objects, which allows for detailed descriptions of each feature.

## Debug Log
The code includes a debug log statement that outputs the name of the collection being used:
```javascript
console.log('Hackathon model is using collection:', Hackathon.collection.name);
```

This log can be useful for verifying that the model is correctly configured to interact with the intended MongoDB collection.