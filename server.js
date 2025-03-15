import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/index.routes.js';
import rateLimit from 'express-rate-limit';
import { PORT } from './configs/dotenv.config.js';
import { connect_db } from './configs/db.config.js';
import { Image_upload_dir } from './helpers/path_dir.helper.js';

const app = express();

// Middleware setup
app.use(cors());
app.use(helmet());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Rate limiting configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    error: 'Too many requests, please try again later.',
  },
});
app.use(limiter);

// API Routes
app.use('/api', router);

// Static Images
app.use('/api/images', express.static(Image_upload_dir));

// Root
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the API!' });
});

// start server
const start_server = async () => {
  try {
    connect_db();
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

start_server();
