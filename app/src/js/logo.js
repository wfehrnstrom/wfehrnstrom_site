class Logo{
  addStyle(newStyle){
    if(!this.style){
      this.style = `${newStyle}`;
    }
    else{
      this.style += ` ${newStyle}`;
    }
  }

  compose(parentDoc){
    if(!this.logo){
      this.logo = parentDoc.createElement('div');
      this.logo.className = `${this.name} ${this.style}`;
      var image = parentDoc.createElement('img');
      image.className = this.style;
      image.alt = this.name;
      console.log(this.dir + this.fileName);
      image.src = this.dir + this.fileName;
      this.logo.appendChild(image);
    }
    return this.logo;
  }

  constructor(name, fileName, style=[], linkTo='', dir='./'){
    this.name = name;
    this.fileName = fileName;
    this.dir = dir;
    if(linkTo !== ''){
      this.linkTo = linkTo;
    }
    var logo = this;
    style.forEach(function(element){
      logo.addStyle(element);
    });
  }
}
