const dbService = require('../database');

function deleteFile({ id }) {
  const query = `DELETE FROM files WHERE key_id = '${id}' LIMIT 1`;
  return new Promise((resolve, reject) => {
    dbService.query(query, (error, result) => {
      if (error) {
        reject(error);
      }

      resolve(result.affectedRows);
    });
  });
}

function getFile({ id }) {
  const query = `SELECT * FROM files WHERE key_id = '${id}' LIMIT 1`;
  return new Promise((resolve, reject) => {
    dbService.query(query, (error, result) => {
      if (error) {
        reject(error);
      }

      resolve(result[0]);
    });
  });
}

function downloadFile({ id }) {
  const query = `SELECT path FROM files WHERE key_id = '${id}' LIMIT 1`;
  return new Promise((resolve, reject) => {
    dbService.query(query, (error, result) => {
      if (error) {
        reject(error);
      }

      resolve(result[0]);
    });
  });
}

function findFile({ fileTitle, size }) {
  const query = `SELECT * FROM files WHERE fileTitle = '${fileTitle}' AND size = '${size}' LIMIT 1`;
  return new Promise((resolve, reject) => {
    dbService.query(query, (error, result) => {
      if (error) {
        reject(error);
      }

      resolve(result[0]);
    });
  });
}

function addFile({
  fileTitle,
  ext,
  mimeType,
  size,
  path,
}) {
  const query = `INSERT INTO files (fileTitle, extension, mime, size, path) VALUES ('${fileTitle}', '${ext}', '${mimeType}', '${size}', '${path}')`;
  return new Promise((resolve, reject) => {
    dbService.query(query, (error, result) => {
      if (error) {
        reject(error);
      }

      resolve(result[0]);
    });
  });
}

function updateFile(id, { 
  fileTitle,
  ext,
  mimeType,
  size,
  path,
}) {
  const query = `UPDATE files SET fileTitle = '${fileTitle}', extension = '${ext}', mime = '${mimeType}', size = '${size}', path = '${path}', uploadTime = now() WHERE key_id = '${id}' LIMIT 1`;
  return new Promise((resolve, reject) => {
    dbService.query(query, (error, result) => {
      if (error) {
        reject(error);
      }

      resolve(result);
    });
  });
}

function getFilesList({ page, list_size }) {
  const LIST_SIZE_DB = list_size || 10;
  const OFFSET_SIZE = LIST_SIZE_DB * ((page || 1) - 1);

  const query = `SELECT * FROM files LIMIT ${LIST_SIZE_DB} OFFSET ${OFFSET_SIZE}`;
  return new Promise((resolve, reject) => {
    dbService.query(query, (error, result) => {
      if (error) {
        reject(error);
      }

      resolve(result);
    });
  });
}

module.exports = {
  deleteFile,
  getFile,
  findFile,
  updateFile,
  addFile,
  downloadFile,
  getFilesList,
};
