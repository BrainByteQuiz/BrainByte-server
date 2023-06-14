import express from 'express';
import multer, { Multer } from 'multer';
import uploadImageController from './controllers/image/upload';
import deleteImageController from './controllers/image/delete';

const app = express();
const upload: Multer = multer({ dest: 'uploads/' }); // Destination directory for storing files

app.post('/image', upload.single('file'), uploadImageController);

app.delete('/image/:id', deleteImageController);

app.use('/uploads', express.static('uploads'));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
