## Data Model Diagram

![Data Model Diagram](https://i.ibb.co/cztg488/Capture.png)

## Project Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd <repository-folder>
```

2. Install Dependencies

```bash
npm install
```

3. Run in development mode:

```bash
npm run start:dev
```

## Environment Variables

```bash

NODE_ENV='dev'
PORT=4000
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API=your_api_key
CLOUDINARY_SECRET=your_api_secret
MONGODB_URL=your_mongodb_url

```

## Logging

- Uses Winston for application logging

- Log files stored in /logs

- Supports dynamic log levels (debug in dev, info in prod)

Example:

```
2025-11-03 05:54:36 [INFO]: Server is running on port 4000
2025-11-03 05:54:37 [INFO]: Connected to MongoDB successfully
```
