const express = require('express');
const router = express.Router();
const fs = require('fs');

const { upload } = require('../../middlewares');

const fileService = require('../../services/file');

router.post('/upload', upload.single('file'), async (req, res, next) => {
  try {
    const { originalname, mimetype, size, path } = req.file;

    const isFileExist = await fileService.findFile({
      fileTitle: originalname,
      size,
    });

    if (isFileExist) {
      return res.status(406).json({
        error: 'File is already exist.',
      });
    }

    const ext = originalname.split('.')[1];

    await fileService.addFile({
      fileTitle: originalname,
      ext,
      mimeType: mimetype,
      size,
      path,
    });

    res.json({
      success: true,
    });
  } catch (error) {
    return next(error);
  }
});

router.get('/list/', async (req, res, next) => {
  try {
    const { page, list_size } = req.query;
    const filesList = await fileService.getFilesList({ page, list_size });

    res.json({
      filesList,
    })
  } catch (error) {
    return next(error);
  }
});

router.delete('/delete/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const file = await fileService.getFile({ id });

    if (!file) {
      return res.status(404).json({
        message: 'File not found.',
      });
    }

    await fs.unlink(file.path, (error) => {
      if (error) {
        throw error;
      }
    });

    await fileService.deleteFile({ id });

    res.json({
      success: true,
    });
  } catch (error) {
    return next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const file = await fileService.getFile({ id });

    if (!file) {
      return res.status(404).json({
        message: 'File not found.',
      });
    }

    res.json(file);
  } catch (error) {
    return next(error);
  }
});

router.get('/download/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { path } = await fileService.downloadFile({ id });

    if (!path) {
      return res.status(404).json({
        message: 'File not found.',
      });
    }

    res.json({
      path,
    });
  } catch {
    return next();
  }
});

router.put('/update/:id', upload.single('file'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const { originalname, mimetype, size, path } = req.file;
    const ext = originalname.split('.')[1];

    const file = await fileService.getFile({ id });

    if (!file) {
      return res.status(404).json({
        message: 'File not found.',
      });
    }

    await fs.unlink(file.path, (error) => {
      if (error) {
        throw error;
      }
    });

    await fileService.updateFile(id, {
      fileTitle: originalname,
      ext,
      mimeType: mimetype,
      size,
      path,
    });

    res.json({
      success: true,
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
