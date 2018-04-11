class ImageWrapper {
  constructor(path, date, styles='', description='', blog=null){
    this._path = path;
    this._date = date;
    this._description = description;
    this._blog = blog;
    this._styles = styles;
  }

  compose(parentDoc, width, height){
    if(!this._element){
      if(width < 0 && height < 0){
        return null;
      }
      this._element = new Image(width, height);
      this._element.src = this._path;
      if(this._description !== ''){
        this._element.alt = this._description;
      }
      if(this._styles !== ''){
        this._element.className = this._styles;
      }
    }
    return this._element;
  }


}
