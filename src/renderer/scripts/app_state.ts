class AppState {
  playing : boolean = false;
  editing : boolean = false;
  lines : string[] = [];
  current : number = -1;

  dataDir : string = "";
  imageFileRelPath : string = "";
  ocrOutputFileRelPath : string = "";
  editedTextFileRelPath : string = "";
  
};

export const S = new AppState();
