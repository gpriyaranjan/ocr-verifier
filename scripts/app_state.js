class AppState {
  playing = false;
  editing = false;
  lines = [];
  current = -1;

  dataDir = "";
  imageFileRelPath = "";
  ocrOutputFileRelPath = "";
  editedTextFileRelPath = "";
  
};

const S = new AppState();